import React, { useState } from 'react';
import { Language } from '../types';
import {
  UserBirthData,
  FullKundaliAnalysis,
  generateExactKundali,
  fetchGeminiKundaliPrediction,
} from '../utils/aiKundaliEngine';
import { audioEngine } from '../utils/audioSynth';
import {
  Sparkles,
  Share2,
  Volume2,
  VolumeX,
  Compass,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Send,
  Printer,
  ChevronDown,
  Key,
  Bot
} from 'lucide-react';

interface AIKundaliPredictorProps {
  currentLang: Language;
  onNavigateTab?: (tab: string) => void;
  onOpenJapaWithMantra?: (mantraTitle: string) => void;
}

export const AIKundaliPredictor: React.FC<AIKundaliPredictorProps> = ({
  currentLang,
  onNavigateTab,
  onOpenJapaWithMantra,
}) => {
  // Input form state
  const [formData, setFormData] = useState<UserBirthData>({
    name: 'राहुल शिंदे',
    gender: 'male',
    birthDate: '1998-05-15',
    birthTime: '08:30',
    birthPlace: 'पुणे, महाराष्ट्र',
    specificQuery: 'माझ्या करिअरमध्ये मोठी प्रगती कधी होईल आणि लग्नाचे योग कधी आहेत?',
    apiKey: '',
  });

  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [activeHouseTab, setActiveHouseTab] = useState<number>(1);
  const [isPlayingMantra, setIsPlayingMantra] = useState<boolean>(false);

  // Computed Kundali Analysis
  const [kundali, setKundali] = useState<FullKundaliAnalysis>(() =>
    generateExactKundali({
      name: 'राहुल शिंदे',
      gender: 'male',
      birthDate: '1998-05-15',
      birthTime: '08:30',
      birthPlace: 'पुणे, महाराष्ट्र',
      specificQuery: 'माझ्या करिअरमध्ये मोठी प्रगती कधी होईल आणि लग्नाचे योग कधी आहेत?',
    })
  );

  // Additional live question state for interactive AI Q&A
  const [interactiveQuestion, setInteractiveQuestion] = useState<string>('');
  const [interactiveAnswer, setInteractiveAnswer] = useState<string | null>(null);
  const [isAskingAI, setIsAskingAI] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    audioEngine.playTempleBell();

    await new Promise((res) => setTimeout(res, 450));

    // 1. Calculate the exact astronomical Kundali
    const calculated = generateExactKundali(formData);

    // 2. If Gemini API key is provided, enrich with real-time generative predictions
    if (formData.apiKey && formData.apiKey.trim()) {
      try {
        const geminiText = await fetchGeminiKundaliPrediction(
          calculated,
          formData.apiKey,
          formData.specificQuery
        );
        if (geminiText) {
          calculated.predictions.specificQueryAnswer = geminiText;
        }
      } catch {
        // Fallback engine remains active
      }
    }

    setKundali(calculated);
    setIsCalculating(false);
    setInteractiveAnswer(null);

    // Play subtle chime on complete
    audioEngine.playNavChime();
  };

  const handleAskAdditionalQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactiveQuestion.trim()) return;

    setIsAskingAI(true);
    const q = interactiveQuestion.trim();

    if (formData.apiKey && formData.apiKey.trim()) {
      const responseText = await fetchGeminiKundaliPrediction(kundali, formData.apiKey, q);
      if (responseText) {
        setInteractiveAnswer(responseText);
        setIsAskingAI(false);
        return;
      }
    }

    // Built-in intelligent Vedic AI logic
    await new Promise((res) => setTimeout(res, 600));
    const lower = q.toLowerCase();
    let reply = '';

    if (lower.includes('लग्न') || lower.includes('विवाह') || lower.includes('marriage')) {
      reply = `💍 **विवाह विषयी विश्लेषण:** आपल्या कुंडलीतील ७ व्या स्थानावर ${kundali.houses[6]?.rulingPlanet} चे नियंत्रण आहे. आपल्या कुंडलीनुसार आगामी वर्ष विवाह संबंध जुळण्यासाठी अतिशय अनुकूल आहे. जोडीदार समजूतदार आणि धर्मनिष्ठ असेल. गुरुवारी विष्णू उपासना करावी.`;
    } else if (lower.includes('नोकरी') || lower.includes('प्रमोशन') || lower.includes('करिअर') || lower.includes('job')) {
      reply = `💼 **करिअर व नोकरी विश्लेषण:** १० व्या कर्म स्थानानुसार पुढील ६ महिन्यांत पदोन्नती किंवा नवीन जबाबदारीचे प्रबळ योग आहेत. रविवारी सूर्यनारायणाला अर्घ्य देणे आणि मारुती स्तोत्र पठण करणे लाभदायक ठरेल.`;
    } else if (lower.includes('व्यवसाय') || lower.includes('व्यापार') || lower.includes('business')) {
      reply = `📈 **व्यवसाय विश्लेषण:** आपल्या कुंडलीतील २ रा व ११ वा भाव अनुकूल असल्याने स्वतंत्र व्यवसायात यश मिळेल. भागीदारीपेक्षा स्वतःच्या नियंत्रणात व्यवसाय वाढवावा. बुधवारी गणपतीला २१ दुर्वा अर्पण कराव्यात.`;
    } else if (lower.includes('आरोग्य') || lower.includes('health')) {
      reply = `🌿 **आरोग्य मार्गदर्शन:** नाडीनुसार पचन आणि वात विकारांची काळजी घ्यावी. रोज सकाळी प्राणायाम आणि महामृत्युंजय मंत्राचा जप केल्यास शारीरिक ऊर्जा व रोगप्रतिकारक शक्ती वाढेल.`;
    } else {
      reply = `🔮 **शास्त्रोक्त मार्गदर्शन:** विचारलेल्या प्रश्नावर आपल्या कुंडलीतील ${kundali.pillars.lagnaSign.name.mr} लग्न आणि ${kundali.pillars.moonSign.name.mr} रास सकारात्मक फल देत आहेत. सकारात्मक विचार ठेवा आणि कुलदेवतेची नित्य सेवा करा, कार्य सिद्धीस जाईल.`;
    }

    setInteractiveAnswer(reply);
    setIsAskingAI(false);
  };

  const handleToggleMantraVoice = () => {
    if (isPlayingMantra) {
      audioEngine.stopSpeaking();
      setIsPlayingMantra(false);
      return;
    }

    setIsPlayingMantra(true);
    audioEngine.playTempleBell();
    audioEngine.playBrahmanChant({
      text: kundali.pillars.beejMantra,
      lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
      withTanpura: true,
      onEnd: () => setIsPlayingMantra(false),
    });
  };

  const handleShareWhatsApp = () => {
    const text = `*सनातन अमृतधारा - वैदिक एआय जन्म कुंडली पत्रिका* 🔮✨\n\n` +
      `👤 *नाव:* ${kundali.user.name}\n` +
      `📅 *जन्म:* ${kundali.user.birthDate} | ${kundali.user.birthTime} (${kundali.user.birthPlace})\n` +
      `🚩 *लग्न रास (Ascendant):* ${kundali.pillars.lagnaSign.name.mr}\n` +
      `🌙 *चंद्र रास (Rashi):* ${kundali.pillars.moonSign.name.mr}\n` +
      `🌟 *जन्म नक्षत्र:* ${kundali.pillars.nakshatra.name.mr} (चरण ${kundali.pillars.pada})\n` +
      `🛡️ *गण:* ${kundali.pillars.gana} | *नाडी:* ${kundali.pillars.nadi}\n` +
      `💎 *भाग्य रत्न:* ${kundali.pillars.luckyGem} (${kundali.pillars.luckyGemMetal})\n` +
      `🪷 *इष्टदेवता:* ${kundali.pillars.ishtadevata}\n` +
      `📿 *सिद्ध मंत्र:* ${kundali.pillars.beejMantra}\n` +
      `🪐 *साडेसाती:* ${kundali.doshas.sadeSati.phaseMr}\n` +
      `🔥 *मंगळ दोष:* ${kundali.doshas.mangalDosha.severity}\n\n` +
      `संपूर्ण एआय कुंडली व १२ भाव विश्लेषण पाहण्यासाठी भेट द्या:\n` +
      `https://sanketmh15.github.io/mantrasetu/`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedHouseDetail = kundali.houses.find((h) => h.houseNumber === activeHouseTab) || kundali.houses[0];

  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
          <span>
            {currentLang === 'en'
              ? 'Vedic Astrology • AI Exact Janam Kundali Predictor'
              : currentLang === 'hi'
              ? 'वैदिक ज्योतिष • एआई जन्म कुंडली एवं संपूर्ण जीवन भविष्यवाणी'
              : 'वैदिक ज्योतिष • एआय जन्म कुंडली व संपूर्ण जीवन भविष्य'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'AI Janam Kundali & 12 Bhavas Prediction'
            : currentLang === 'hi'
            ? 'एआई जन्म कुंडली, ग्रह स्थिति एवं १२ भाव फलकथन'
            : 'एआय जन्म कुंडली, ग्रह स्थिती व १२ भाव भविष्य'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium max-w-2xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'Enter your exact birth date, time, and birthplace. Our Vedic AI engine calculates your Lagna, Moon sign, 12 Bhavas, Doshas, and predicts accurate life guidance.'
            : currentLang === 'hi'
            ? 'अपनी जन्म तिथि, समय एवं स्थान दर्ज करें। हमारा वैदिक एआई इंजन आपकी लग्न, चंद्र राशि, १२ भाव, दोष एवं संपूर्ण जीवन का अचूक फलादेश प्रदान करता है।'
            : 'आपली अचूक जन्मतारीख, वेळ आणि जन्मस्थान प्रविष्ट करा. आमचे वैदिक एआय इंजिन आपले लग्न, रास, १२ भाव, ग्रहयोग, दोष आणि जीवनविषयक अचूक मार्गदर्शन भाकीत करते.'}
        </p>
      </div>

      {/* 2. User Birth Details Form Card */}
      <div className="rounded-3xl bg-white dark:bg-stone-900/90 border-2 border-amber-400/50 dark:border-amber-800/60 p-5 sm:p-8 shadow-xl mb-10 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 flex items-center justify-center font-bold text-lg">
              🕉️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-serifDev text-stone-900 dark:text-white">
                जन्म तपशील प्रविष्ट करा (Enter Birth Details)
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                अचूक कुंडली संगणनासाठी जन्माची तारीख, वेळ आणि ठिकाण महत्त्वाचे आहे.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{showApiKeyInput ? 'API Key लपवा' : 'Gemini Key (वैकल्पिक)'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showApiKeyInput ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                पूर्ण नाव (Full Name):
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="उदा. राहुल शिंदे"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                लिंग (Gender):
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                <option value="male">पुरुष (Male)</option>
                <option value="female">स्त्री (Female)</option>
                <option value="other">इतर (Other)</option>
              </select>
            </div>

            {/* Birth Date */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                जन्मतारीख (Birth Date):
              </label>
              <input
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Birth Time */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                जन्मवेळ (Exact Time):
              </label>
              <input
                type="time"
                required
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Birth Place */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                जन्मस्थान (Place of Birth):
              </label>
              <input
                type="text"
                required
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                placeholder="उदा. पुणे, नाशिक, मुंबई, कोल्हापूर..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Specific Life Question */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                आपला विशेष प्रश्न किंवा चिंता (Specific Question for AI):
              </label>
              <input
                type="text"
                value={formData.specificQuery || ''}
                onChange={(e) => setFormData({ ...formData, specificQuery: e.target.value })}
                placeholder="उदा. माझे लग्न कधी होईल? / सरकारी नोकरी मिळेल का? / व्यवसाय कसा राहील?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Optional Gemini API Key Box */}
          {showApiKeyInput && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold">
                <Key className="w-4 h-4 text-amber-600" />
                <span>Google Gemini API Key (वैकल्पिक):</span>
              </div>
              <input
                type="password"
                value={formData.apiKey || ''}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="AIzaSy... (रिकामे ठेवल्यास अंगभूत वैदिक एआय मॉडेल विश्लेषण करेल)"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-stone-500 dark:text-stone-400">
                आपली की स्थानिक ब्राउझरमध्ये सुरक्षित राहते. जर की नसेल तरीही आमचे शास्त्रोक्त वैदिक अल्गोरिदम १००% अचूक काम करते.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isCalculating}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-saffron-500/30 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isCalculating ? 'एआय कुंडली तयार होत आहे...' : '✨ एआय जन्म कुंडली व भविष्य तयार करा'}</span>
            </button>

            <span className="text-xs text-stone-500 dark:text-stone-400 italic">
              • अचूक नक्षत्र चरण, ग्रह दृष्टी, १२ भाव व साडेसाती विश्लेषण
            </span>
          </div>
        </form>
      </div>

      {/* 3. Generated Kundali Showcase */}
      <div className="space-y-8 animate-fadeIn">
        {/* Profile Card Header */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-500/15 via-white to-amber-500/5 dark:from-stone-900 dark:via-stone-900/80 dark:to-stone-950 border-2 border-amber-400/60 dark:border-amber-700/60 p-5 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-xs font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-widest block font-mono">
                ॥ श्री गणेशाय नमः • वैदिक जन्म पत्रिका ॥
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serifDev text-stone-950 dark:text-white mt-1">
                {kundali.user.name}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium mt-1">
                📅 जन्म: {kundali.user.birthDate} • ⏰ वेळ: {kundali.user.birthTime} • 📍 स्थान: {kundali.user.birthPlace}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>व्हॉट्सॲपवर पाठवा</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold shadow-sm transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>प्रिंट करा</span>
              </button>
            </div>
          </div>

          {/* 8 Key Astrological Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 my-6">
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">लग्न रास (Lagna)</span>
              <p className="text-sm font-extrabold text-amber-700 dark:text-amber-300 mt-0.5">{kundali.pillars.lagnaSign.name.mr}</p>
              <span className="text-[9px] text-stone-400 block">१ ला भाव</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">चंद्र रास (Moon)</span>
              <p className="text-sm font-extrabold text-saffron-600 dark:text-saffron-400 mt-0.5">{kundali.pillars.moonSign.name.mr}</p>
              <span className="text-[9px] text-stone-400 block">मन व प्रवृत्ती</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">सूर्य रास (Sun)</span>
              <p className="text-sm font-extrabold text-yellow-600 dark:text-yellow-400 mt-0.5">{kundali.pillars.sunSign.name.mr}</p>
              <span className="text-[9px] text-stone-400 block">आत्मबल व तेज</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">जन्म नक्षत्र</span>
              <p className="text-sm font-extrabold text-stone-900 dark:text-white mt-0.5 truncate">{kundali.pillars.nakshatra.name.mr}</p>
              <span className="text-[9px] text-stone-400 block">चरण #{kundali.pillars.pada}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">गण (Gana)</span>
              <p className="text-sm font-extrabold text-stone-900 dark:text-white mt-0.5">{kundali.pillars.gana} गण</p>
              <span className="text-[9px] text-stone-400 block">स्वभाव प्रकृती</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">नाडी (Nadi)</span>
              <p className="text-sm font-extrabold text-stone-900 dark:text-white mt-0.5">{kundali.pillars.nadi} नाडी</p>
              <span className="text-[9px] text-stone-400 block">आरोग्य तत्त्व</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">भाग्य रत्न (Gem)</span>
              <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 truncate">{kundali.pillars.luckyGem.split(' ')[0]}</p>
              <span className="text-[9px] text-stone-400 block">{kundali.pillars.luckyGemMetal}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-bold">शुभ वार व रंग</span>
              <p className="text-xs font-extrabold text-amber-700 dark:text-amber-300 mt-1">{kundali.pillars.luckyDay}</p>
              <span className="text-[9px] text-stone-400 block truncate">{kundali.pillars.luckyColors.split(',')[0]}</span>
            </div>
          </div>

          {/* Panchang at Birth Strip */}
          <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-stone-900/80 border border-amber-400/40 text-xs flex flex-wrap items-center justify-between gap-3">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <span>📜 जन्म पंचांग:</span>
              <span className="text-stone-700 dark:text-stone-300 font-medium">तिथी: <strong>{kundali.pillars.tithi}</strong></span>
              <span>•</span>
              <span className="text-stone-700 dark:text-stone-300 font-medium">वार: <strong>{kundali.pillars.vaar}</strong></span>
              <span>•</span>
              <span className="text-stone-700 dark:text-stone-300 font-medium">योग: <strong>{kundali.pillars.yoga}</strong></span>
              <span>•</span>
              <span className="text-stone-700 dark:text-stone-300 font-medium">करण: <strong>{kundali.pillars.karana}</strong></span>
            </span>

            <span className="font-bold text-saffron-700 dark:text-saffron-400">
              शुभ अंक: {kundali.pillars.luckyNumbers}
            </span>
          </div>
        </div>

        {/* 4. Traditional Indian Diamond Kundali Chart & House Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* North Indian Diamond Chart SVG Graphic */}
          <div className="lg:col-span-6 rounded-3xl bg-stone-950 border-2 border-amber-600/60 p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>पारंपरिक उत्तर भारतीय जन्म कुंडली चक्र (Diamond Chart)</span>
              </span>
              <span className="text-[11px] text-stone-400">१२ भाव व नवग्रह स्थान</span>
            </div>

            <div className="relative aspect-square max-w-md mx-auto my-2 select-none">
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
                {/* Outer Square */}
                <rect x="10" y="10" width="380" height="380" fill="#141210" stroke="#B45309" strokeWidth="2.5" />
                
                {/* Cross Diagonals */}
                <line x1="10" y1="10" x2="390" y2="390" stroke="#B45309" strokeWidth="1.8" />
                <line x1="390" y1="10" x2="10" y2="390" stroke="#B45309" strokeWidth="1.8" />

                {/* Inner Diamond */}
                <polygon points="200,10 390,200 200,390 10,200" fill="#1c1815" stroke="#F59E0B" strokeWidth="2" />

                {/* House Labels & Content Overlay in SVG */}
                {/* House 1 (Top Center Diamond) */}
                <g onClick={() => setActiveHouseTab(1)} className="cursor-pointer hover:opacity-80">
                  <text x="200" y="65" textAnchor="middle" fill="#FBBF24" fontSize="12" fontWeight="bold">१ (Lagna)</text>
                  <text x="200" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">{kundali.houses[0]?.signNameMr}</text>
                  <text x="200" y="115" textAnchor="middle" fill="#34D399" fontSize="10">{kundali.houses[0]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 2 (Top Left Triangle) */}
                <g onClick={() => setActiveHouseTab(2)} className="cursor-pointer hover:opacity-80">
                  <text x="105" y="45" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">२</text>
                  <text x="105" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[1]?.signNameMr}</text>
                  <text x="105" y="85" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[1]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 3 (Left Top Triangle) */}
                <g onClick={() => setActiveHouseTab(3)} className="cursor-pointer hover:opacity-80">
                  <text x="50" y="110" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">३</text>
                  <text x="50" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[2]?.signNameMr}</text>
                  <text x="50" y="150" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[2]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 4 (Left Diamond) */}
                <g onClick={() => setActiveHouseTab(4)} className="cursor-pointer hover:opacity-80">
                  <text x="110" y="195" textAnchor="middle" fill="#FBBF24" fontSize="12" fontWeight="bold">४ (सुख)</text>
                  <text x="110" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="11">{kundali.houses[3]?.signNameMr}</text>
                  <text x="110" y="235" textAnchor="middle" fill="#34D399" fontSize="10">{kundali.houses[3]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 5 (Left Bottom Triangle) */}
                <g onClick={() => setActiveHouseTab(5)} className="cursor-pointer hover:opacity-80">
                  <text x="50" y="280" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">५</text>
                  <text x="50" y="300" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[4]?.signNameMr}</text>
                  <text x="50" y="320" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[4]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 6 (Bottom Left Triangle) */}
                <g onClick={() => setActiveHouseTab(6)} className="cursor-pointer hover:opacity-80">
                  <text x="105" y="340" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">६</text>
                  <text x="105" y="360" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[5]?.signNameMr}</text>
                  <text x="105" y="375" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[5]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 7 (Bottom Center Diamond) */}
                <g onClick={() => setActiveHouseTab(7)} className="cursor-pointer hover:opacity-80">
                  <text x="200" y="275" textAnchor="middle" fill="#FBBF24" fontSize="12" fontWeight="bold">७ (जाया)</text>
                  <text x="200" y="300" textAnchor="middle" fill="#FFFFFF" fontSize="11">{kundali.houses[6]?.signNameMr}</text>
                  <text x="200" y="325" textAnchor="middle" fill="#34D399" fontSize="10">{kundali.houses[6]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 8 (Bottom Right Triangle) */}
                <g onClick={() => setActiveHouseTab(8)} className="cursor-pointer hover:opacity-80">
                  <text x="295" y="340" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">८</text>
                  <text x="295" y="360" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[7]?.signNameMr}</text>
                  <text x="295" y="375" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[7]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 9 (Right Bottom Triangle) */}
                <g onClick={() => setActiveHouseTab(9)} className="cursor-pointer hover:opacity-80">
                  <text x="350" y="280" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">९</text>
                  <text x="350" y="300" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[8]?.signNameMr}</text>
                  <text x="350" y="320" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[8]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 10 (Right Diamond) */}
                <g onClick={() => setActiveHouseTab(10)} className="cursor-pointer hover:opacity-80">
                  <text x="290" y="195" textAnchor="middle" fill="#FBBF24" fontSize="12" fontWeight="bold">१० (कर्म)</text>
                  <text x="290" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="11">{kundali.houses[9]?.signNameMr}</text>
                  <text x="290" y="235" textAnchor="middle" fill="#34D399" fontSize="10">{kundali.houses[9]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 11 (Right Top Triangle) */}
                <g onClick={() => setActiveHouseTab(11)} className="cursor-pointer hover:opacity-80">
                  <text x="350" y="110" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">११</text>
                  <text x="350" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[10]?.signNameMr}</text>
                  <text x="350" y="150" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[10]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>

                {/* House 12 (Top Right Triangle) */}
                <g onClick={() => setActiveHouseTab(12)} className="cursor-pointer hover:opacity-80">
                  <text x="295" y="45" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">१२</text>
                  <text x="295" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="10">{kundali.houses[11]?.signNameMr}</text>
                  <text x="295" y="85" textAnchor="middle" fill="#34D399" fontSize="9">{kundali.houses[11]?.planets.map(p => p.symbol).join(' ')}</text>
                </g>
              </svg>
            </div>

            <p className="text-[11px] text-stone-400 text-center mt-2">
              💡 कोणत्याही भावावर क्लिक करा आणि त्याचे सविस्तर विश्लेषण उजवीकडे पाहा.
            </p>
          </div>

          {/* Interactive 12 Bhavas Explainer */}
          <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="text-xs font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>१२ भाव विश्लेषण (Click House to Inspect)</span>
              </span>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                निवडलेला भाव: #{activeHouseTab}
              </span>
            </div>

            {/* Quick 12 Houses Chip Picker */}
            <div className="flex flex-wrap gap-1.5 pb-2">
              {kundali.houses.map((h) => (
                <button
                  key={h.houseNumber}
                  type="button"
                  onClick={() => setActiveHouseTab(h.houseNumber)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeHouseTab === h.houseNumber
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100'
                  }`}
                >
                  #{h.houseNumber} {h.signNameMr}
                </button>
              ))}
            </div>

            {/* Detailed Selected House Insight */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-stone-950 border border-amber-400/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold font-serifDev text-stone-950 dark:text-white">
                  स्थान #{selectedHouseDetail.houseNumber}: {selectedHouseDetail.signNameMr} रास
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-bold">
                  स्वामी: {selectedHouseDetail.rulingPlanet}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                {selectedHouseDetail.significanceMr}
              </p>

              <div className="pt-2 border-t border-amber-300/40 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400 font-bold">
                  या भावात स्थित ग्रह:
                </span>
                <span className="font-extrabold text-saffron-700 dark:text-saffron-400">
                  {selectedHouseDetail.planets.length > 0
                    ? selectedHouseDetail.planets.map((p) => `${p.name} (${p.degree}°) [${p.status}]`).join(', ')
                    : 'कोणताही ग्रह नाही (स्वच्छ भाव)'}
                </span>
              </div>
            </div>

            {/* Planetary Table summary */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                नवग्रह भाव स्थिती व अंश (Planetary Degrees):
              </span>
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
                {kundali.planets.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800"
                  >
                    <span className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <span>{p.symbol}</span>
                      <span>{p.name}</span>
                    </span>
                    <span className="text-stone-500 dark:text-stone-400">
                      भाव #{p.house} ({p.rashiName}) • {p.degree}°
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 5. Doshas Analysis & Shanti Remedies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Manglik Dosha */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${kundali.doshas.mangalDosha.hasDosha ? 'text-amber-500' : 'text-emerald-500'}`} />
                <h4 className="text-sm sm:text-base font-bold font-serifDev text-stone-900 dark:text-white">
                  मांगलिक दोष विश्लेषण (Manglik Status)
                </h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                kundali.doshas.mangalDosha.hasDosha
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {kundali.doshas.mangalDosha.severity}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {kundali.doshas.mangalDosha.descriptionMr}
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-300/40 text-[11px] text-amber-900 dark:text-amber-200 font-medium">
              💡 <strong>उपाय:</strong> {kundali.doshas.mangalDosha.remedyMr}
            </div>
          </div>

          {/* Shani Sade Sati */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${kundali.doshas.sadeSati.isActive ? 'text-amber-500' : 'text-blue-500'}`} />
                <h4 className="text-sm sm:text-base font-bold font-serifDev text-stone-900 dark:text-white">
                  शनि साडेसाती विश्लेषण (Shani Sade Sati)
                </h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                kundali.doshas.sadeSati.isActive
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              }`}>
                {kundali.doshas.sadeSati.isActive ? 'सक्रिय' : 'नाही'}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {kundali.doshas.sadeSati.descriptionMr}
            </p>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-300/40 text-[11px] text-blue-900 dark:text-blue-200 font-medium">
              💡 <strong>उपाय:</strong> {kundali.doshas.sadeSati.remedyMr}
            </div>
          </div>
        </div>

        {/* 6. AI Deep Life Predictions (Full Detailed Sections) */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-stone-50 to-saffron-500/10 dark:from-stone-900 dark:via-stone-950 dark:to-amber-950/40 border-2 border-amber-400/60 dark:border-amber-700/60 p-5 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-amber-300/60 dark:border-stone-800">
            <Bot className="w-6 h-6 text-saffron-600 dark:text-saffron-400" />
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold font-serifDev text-stone-950 dark:text-white">
                एआय ज्योतिषाचार्य महा-भविष्य फलकथन (AI Life Predictions)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                वैदिक ग्रहांचे अंश, दशा आणि भावांच्या संश्लेषणातून तयार केलेले वैयक्तिक फलादेश.
              </p>
            </div>
          </div>

          {/* User's Specific Query Highlight if Present */}
          {kundali.predictions.specificQueryAnswer && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border-2 border-amber-500/60 shadow-md">
              <span className="text-xs font-black text-saffron-800 dark:text-saffron-300 uppercase tracking-widest block mb-1">
                ⭐ आपल्या विचारलेल्या विशेष प्रश्नाचे AI उत्तर:
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white font-serifDev leading-relaxed whitespace-pre-line">
                {kundali.predictions.specificQueryAnswer}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Personality & Nature */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1.5">
              <h4 className="text-sm font-bold font-serifDev text-saffron-700 dark:text-saffron-400 flex items-center gap-1.5">
                <span>👤</span>
                <span>व्यक्तिमत्त्व, स्वभाव व मानसिक प्रवृत्ती:</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {kundali.predictions.personality}
              </p>
            </div>

            {/* 2. Career & Wealth */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1.5">
              <h4 className="text-sm font-bold font-serifDev text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <span>💼</span>
                <span>करिअर, नोकरी, व्यवसाय व धनयोग:</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {kundali.predictions.careerAndWealth}
              </p>
            </div>

            {/* 3. Marriage & Relationships */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1.5">
              <h4 className="text-sm font-bold font-serifDev text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span>💍</span>
                <span>विवाह, कौटुंबिक सुख व जोडीदार:</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {kundali.predictions.marriageAndFamily}
              </p>
            </div>

            {/* 4. Health & Vitality */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1.5">
              <h4 className="text-sm font-bold font-serifDev text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span>🌿</span>
                <span>शारीरिक प्रकृती, आरोग्य व दीर्घायुष्य:</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {kundali.predictions.healthAndVitality}
              </p>
            </div>
          </div>

          {/* 5. Future Outlook & Mahadasha */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-1.5">
                <span>🔮</span>
                <span>आगामी काळाचा अंदाज व चालू विंशोत्तरी महादशा:</span>
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold font-mono">
                दशा: {kundali.currentDasha.mahadasha} • अंतर्दशा: {kundali.currentDasha.antardasha}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {kundali.predictions.upcomingPeriod}
            </p>
          </div>

          {/* 6. Remedial Beej Mantra & Audio Player */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-950 text-white border border-amber-500/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📿</span>
                <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  आपला सिद्ध इष्टदेवता बीजमंत्र (Daily Remedial Mantra)
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleMantraVoice}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:brightness-110 text-white font-bold text-xs shadow transition-all active:scale-95"
              >
                {isPlayingMantra ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingMantra ? 'मंत्र थांबवा' : 'मंत्रोच्चारण ऐका (Big B)'}</span>
              </button>
            </div>

            <p className="text-base sm:text-xl font-bold font-serifDev text-amber-100">
              {kundali.pillars.beejMantra}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-stone-800 text-xs text-stone-300">
              <span>🪷 <strong>इष्टदेवता:</strong> {kundali.pillars.ishtadevata}</span>
              <span>💎 <strong>रत्न:</strong> {kundali.pillars.luckyGem}</span>
              <span>🎨 <strong>शुभ रंग:</strong> {kundali.pillars.luckyColors}</span>

              {onOpenJapaWithMantra ? (
                <button
                  type="button"
                  onClick={() => onOpenJapaWithMantra(kundali.pillars.beejMantra)}
                  className="ml-auto text-amber-400 hover:underline font-bold inline-flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>१०८ जपमाळेत उघडा</span>
                </button>
              ) : onNavigateTab ? (
                <button
                  type="button"
                  onClick={() => onNavigateTab('japa')}
                  className="ml-auto text-amber-400 hover:underline font-bold inline-flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>१०८ जपमाळेत उघडा</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* 7. Interactive "Ask AI Astrologer" Q&A Box */}
        <div className="rounded-3xl bg-white dark:bg-stone-900 border-2 border-amber-400/50 dark:border-amber-800/60 p-5 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
            <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white">
              विचार करा एआय ज्योतिषाचार्यांना (Ask Any Question on Your Kundali)
            </h3>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            आपल्या जन्म पत्रिकेच्या संदर्भातील कोणताही वैयक्तिक प्रश्न येथे विचारा, आमचे AI तात्काळ ग्रहांच्या स्थितीनुसार उत्तर देईल:
          </p>

          <form onSubmit={handleAskAdditionalQuestion} className="flex gap-2">
            <input
              type="text"
              value={interactiveQuestion}
              onChange={(e) => setInteractiveQuestion(e.target.value)}
              placeholder="उदा. माझे नवीन घर घेण्याचे योग कधी आहेत? / मला उच्च शिक्षणासाठी परदेशी जाता येईल का?"
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isAskingAI}
              className="px-5 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs sm:text-sm shadow transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>{isAskingAI ? 'विचार करत आहे...' : 'विचारा'}</span>
            </button>
          </form>

          {interactiveAnswer && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 animate-fadeIn space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>एआय ज्योतिषाचार्य उत्तर:</span>
              </div>
              <p className="text-xs sm:text-sm font-serifDev text-stone-900 dark:text-white leading-relaxed whitespace-pre-line">
                {interactiveAnswer}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

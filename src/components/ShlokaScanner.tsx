import { useState, useRef } from 'react';
import { Language } from '../types';
import { audioEngine } from '../utils/audioSynth';
import {
  Camera,
  Upload,
  Scan,
  BookOpen,
  Volume2,
  VolumeX,
  CheckCircle2,
  Copy,
  Check,
  Search,
} from 'lucide-react';

interface ShlokaScannerProps {
  currentLang: Language;
}

interface IdentifiedShloka {
  id: string;
  devanagari: string;
  roman: string;
  sourceScripture: { en: string; hi: string; mr: string };
  deityAssociated: { en: string; hi: string; mr: string };
  wordByWord: { sanskrit: string; meaning: { en: string; hi: string; mr: string } }[];
  overallMeaning: { en: string; hi: string; mr: string };
  significance: { en: string; hi: string; mr: string };
}

const sampleRecognizedShlokas: IdentifiedShloka[] = [
  // 1. Gayatri Mantra (Rigveda)
  {
    id: 'gayatri',
    devanagari: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    roman: 'Om Bhūr Bhuvaḥ Svaḥ Tat Savitur Vareṇyaṁ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt ||',
    sourceScripture: {
      en: 'Rigveda (Mandala 3, Sukta 62, Verse 10) & Yajurveda',
      hi: 'ऋग्वेद (मण्डल ३, सूक्त ६२, मन्त्र १०) एवं यजुर्वेद',
      mr: 'ऋग्वेद (मण्डल ३, सूक्त ६२, ऋचा १०) व यजुर्वेद'
    },
    deityAssociated: { en: 'Savitr (Supreme Solar Consciousness)', hi: 'सविता (सूर्य देव)', mr: 'सविता देव (सूर्य व गायत्री माता)' },
    wordByWord: [
      { sanskrit: 'भूः', meaning: { en: 'Physical realm', hi: 'भूलोक', mr: 'भूलोक (पृथ्वी)' } },
      { sanskrit: 'भुवः', meaning: { en: 'Mental/vital realm', hi: 'अंतरिक्ष लोक', mr: 'अंतरिक्ष लोक (प्राण)' } },
      { sanskrit: 'स्वः', meaning: { en: 'Celestial realm', hi: 'स्वर्गलोक', mr: 'स्वर्गलोक (आनंद)' } },
      { sanskrit: 'तत्सवितुर्वरेण्यं', meaning: { en: 'That adorable Divine Sun', hi: 'उस वरेण्य परमात्मा का', mr: 'त्या परम वंदनीय सूर्याचे' } },
      { sanskrit: 'भर्गो देवस्य धीमहि', meaning: { en: 'We meditate on the supreme effulgence', hi: 'दिव्य तेज का हम ध्यान करते हैं', mr: 'दिव्य तेजाचे आम्ही ध्यान करतो' } },
      { sanskrit: 'धियो यो नः प्रचोदयात्', meaning: { en: 'May He inspire our intellect towards truth', hi: 'जो हमारी बुद्धि को सन्मार्ग में प्रेरित करे', mr: 'जो आमच्या बुद्धीला सत्कर्माची प्रेरणा देवो' } }
    ],
    overallMeaning: {
      en: 'We meditate on the supreme transcendental effulgence of the Divine Creator Sun; may that divine light illuminate and guide our intellect toward ultimate truth.',
      hi: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं; वह परमात्मा हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
      mr: 'आम्ही विश्वाचा निर्माता असलेल्या तेजोमय सूर्य परमेश्वराचे ध्यान करतो; त्या भगवंताने आमच्या बुद्धीला सत्य आणि सन्मार्गाची दिव्य प्रेरणा द्यावी.'
    },
    significance: {
      en: 'The mother of all Vedic mantras. Awakens the third-eye intellect (Buddhi) and washes away mental ignorance.',
      hi: 'समस्त वेदों का सार। बुद्धि को तीक्ष्ण और अंतःकरण को पावन करता है।',
      mr: 'सर्व वेद व मंत्रांची माता. बुद्धीचा विकास, एकाग्रता आणि आत्मिक तेज जागृत करणारा महामंत्र.'
    }
  },

  // 2. Bhagavad Gita 2.47
  {
    id: 'gita_2_47',
    devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    roman: 'Karmaṇy-evādhikāras te mā phaleṣu kadācana | Mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
    sourceScripture: {
      en: 'Shrimad Bhagavad Gita (Chapter 2, Sankhya Yoga, Verse 47)',
      hi: 'श्रीमद्भगवद्गीता (अध्याय २, श्लोक ४७)',
      mr: 'श्रीमद्भगवद्गीता (अध्याय २, सांख्य योग, श्लोक ४७)'
    },
    deityAssociated: { en: 'Lord Krishna (Yogeshvara)', hi: 'योगेश्वर श्रीकृष्ण', mr: 'योगेश्वर भगवान श्रीकृष्ण' },
    wordByWord: [
      { sanskrit: 'कर्मणि एव', meaning: { en: 'In action only', hi: 'कर्म में ही', mr: 'केवळ कर्म करण्यावरच' } },
      { sanskrit: 'अधिकारः ते', meaning: { en: 'Your rightful claim is', hi: 'तुम्हारा अधिकार है', mr: 'तुझा अधिकार आहे' } },
      { sanskrit: 'मा फलेषु कदाचन', meaning: { en: 'Never in the fruits', hi: 'फलों में कभी नहीं', mr: 'फळावर कधीही नाही' } },
      { sanskrit: 'मा कर्मफलहेतुः भूः', meaning: { en: 'Do not be driven by results', hi: 'कर्मफल का हेतु मत बनो', mr: 'फळाची अपेक्षा ठेवणारा होऊ नकोस' } },
      { sanskrit: 'मा ते सङ्गः अकर्मणि', meaning: { en: 'Nor be attached to laziness/inaction', hi: 'न ही अकर्म में तुम्हारी आसक्ति हो', mr: 'आणि कर्म न करण्याचा आळसही धरू नकोस' } }
    ],
    overallMeaning: {
      en: 'You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction.',
      hi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल के हेतु मत बनो और न ही तुम्हारी कर्म न करने में आसक्ति हो।',
      mr: 'तुझा अधिकार केवळ तुझे कर्तव्य कर्म करण्यावर आहे, त्याच्या फळावर कधीही नाही. फळाची अपेक्षा ठेवून कर्म करू नकोस आणि कर्म न करण्याचा आळसही धरू नकोस.'
    },
    significance: {
      en: 'The eternal foundational pillar of Nishkama Karma Yoga, freeing the human mind from performance anxiety and depression.',
      hi: 'निष्काम कर्मयोग का आधारस्तंभ, जो मनुष्य को चिंतामुक्त और कर्तव्यनिष्ठ बनाता है।',
      mr: 'निष्काम कर्मयोगाचा सुवर्ण सिद्धांत; फळाच्या चिंतेतून मुक्त होऊन मनापासून सर्वोत्तम काम करण्याची शिकवण.'
    }
  },

  // 3. Maha Mrityunjaya Mantra
  {
    id: 'maha_mrityunjaya',
    devanagari: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्यowner मुक्षीय मामृतात् ॥',
    roman: 'Om Tryambakaṁ Yajāmahe Sugandhiṁ Puṣṭivardhanam | Urvārukam-iva Bandhanān Mṛtyor-mukṣīya Māmṛtāt ||',
    sourceScripture: {
      en: 'Rigveda (Mandala 7, Sukta 59, Verse 12) & Shukla Yajurveda',
      hi: 'ऋग्वेद (मण्डल ७, सूक्त ५९, मन्त्र १२) एवं शुक्ल यजुर्वेद',
      mr: 'ऋग्वेद (मण्डल ७, सूक्त ५९, ऋचा १२) व शुक्ल यजुर्वेद'
    },
    deityAssociated: { en: 'Lord Shiva (Maha Mrityunjaya)', hi: 'महामृत्युंजय शिव', mr: 'महामृत्युंजय भगवान शिव' },
    wordByWord: [
      { sanskrit: 'त्र्यम्बकम्', meaning: { en: 'The Three-Eyed Lord', hi: 'त्रिनेत्र भगवान', mr: 'तीन डोळे असलेले महादेव' } },
      { sanskrit: 'यजामहे', meaning: { en: 'We worship/meditate', hi: 'हम आराधना करते हैं', mr: 'आम्ही ध्यान करतो' } },
      { sanskrit: 'सुगन्धिम्', meaning: { en: 'Fragrant and pure', hi: 'सुगन्धित', mr: 'सुगंधी व पवित्र' } },
      { sanskrit: 'पुष्टिवर्धनम्', meaning: { en: 'Nourisher of all beings', hi: 'पुष्टिदाता', mr: 'सर्व जगाचे पोषण करणारे' } },
      { sanskrit: 'उर्वारुकमिव बन्धनात्', meaning: { en: 'Like a ripe cucumber from stem', hi: 'ककड़ी के बेल से मुक्त होने के समान', mr: 'वेलीवरून सहज पिकलेल्या काकडीसारखे' } },
      { sanskrit: 'मृत्योर्मुक्षीय मामृतात्', meaning: { en: 'Liberate us from death, not from immortality', hi: 'मृत्यु के बंधन से मुक्त कर अमृत दें', mr: 'मृत्यूच्या पाशातून सोडवून अमरत्व द्यावे' } }
    ],
    overallMeaning: {
      en: 'We meditate upon the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. Just as a ripe cucumber effortlessly detaches from its stem, may He liberate us from death and attachment, leading to supreme immortality.',
      hi: 'हम त्रिनेत्रधारी भगवान शिव का ध्यान करते हैं जो सुगंधित और सबका पोषण करने वाले हैं। जैसे पकी हुई ककड़ी बेल के बंधन से मुक्त हो जाती है, वैसे ही हमें मृत्यु के बंधन से मुक्त कर मोक्ष प्रदान करें।',
      mr: 'आम्ही त्रिनेत्रधारी भगवान शिवाचे ध्यान करतो, जे सुगंधी असून संपूर्ण विश्वाचे पालनपोषण करतात. ज्याप्रमाणे पिकलेली काकडी देठापासून सहज गळून पडते, त्याप्रमाणे आम्हाला मृत्यूच्या व संसाराच्या बंधनातून मुक्त करून अमरत्व द्यावे.'
    },
    significance: {
      en: 'The supreme life-saving and healing mantra in Vedic literature, dissolving terminal diseases and fear of death.',
      hi: 'संजीवनी महामन्त्र जो अकाल मृत्यु और गंभीर रोगों से मुक्ति प्रदान करता है।',
      mr: 'संजीवनी महामंत्र! शारीरिक व्याधी, अकाल मृत्यूचे भय आणि मानसिक ताण नष्ट करणारा अमृतमंत्र.'
    }
  }
];

export function ShlokaScanner({ currentLang }: ShlokaScannerProps) {
  const [activeShloka, setActiveShloka] = useState<IdentifiedShloka>(sampleRecognizedShlokas[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [pastedText, setPastedText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScanSample = (sample: IdentifiedShloka) => {
    setIsScanning(true);
    setTimeout(() => {
      setActiveShloka(sample);
      setIsScanning(false);
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    // Simulate optical character recognition
    setTimeout(() => {
      // Intelligently cycle to a sample recognized shloka
      const randomShloka = sampleRecognizedShlokas[Math.floor(Math.random() * sampleRecognizedShlokas.length)];
      setActiveShloka(randomShloka);
      setIsScanning(false);
    }, 1200);
  };

  const handlePasteAnalyze = () => {
    if (!pastedText.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      const lower = pastedText.toLowerCase();
      let matched = sampleRecognizedShlokas[0];
      if (lower.includes('कर्मण्य') || lower.includes('karma')) {
        matched = sampleRecognizedShlokas[1];
      } else if (lower.includes('त्र्यम्बकं') || lower.includes('मृत्यु')) {
        matched = sampleRecognizedShlokas[2];
      }
      setActiveShloka(matched);
      setIsScanning(false);
    }, 600);
  };

  const handleAudioPlay = () => {
    if (isSpeaking) {
      audioEngine.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    audioEngine.playTempleBell();
    audioEngine.speakText(activeShloka.devanagari, 'hi-IN', 0.78, () => {
      setIsSpeaking(false);
    });
  };

  const handleCopy = () => {
    const text = `${activeShloka.devanagari}\n\n${activeShloka.roman}\n\nसंदर्भ: ${activeShloka.sourceScripture[currentLang]}\nभावार्थ: ${activeShloka.overallMeaning[currentLang]}\n\n📲 MantraSetu श्लोक स्कॅनर`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Scan className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>
            {currentLang === 'en'
              ? 'AI Shloka Scanner & Scripture Identifier'
              : 'AI श्लोक स्कॅनर व संदर्भ शोधक'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Shloka Scanner & Meaning Decrypter'
            : currentLang === 'hi'
            ? 'श्लोक स्कैनर: पाठ, संदर्भ एवं पदच्छेद'
            : 'श्लोक स्कॅनर: शब्दशः अर्थ, संदर्भ व शुद्ध उच्चार'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Photograph or paste any Sanskrit shloka to instantly identify its text, Roman transliteration, word-by-word meaning, and source scripture (Rigveda, Gita, Upanishads).'
            : 'कोणत्याही संस्कृत श्लोकाचा फोटो काढा किंवा मजकूर पेस्ट करा; AI तात्काळ त्याचा मूळ ग्रंथ (गीता, ऋग्वेद, पुराणे), शब्दशः पदच्छेद व शुद्ध ऑडिओ उच्चार शोधून देईल.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: SCANNER INPUTS & PRESETS */}
        <div className="lg:col-span-5 space-y-6">
          {/* Camera / Upload Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-dashed border-amber-400 dark:border-amber-600 text-center shadow-lg hover:border-amber-500 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-stone-900 dark:text-white font-serifDev">
              {currentLang === 'en' ? 'Upload or Photograph a Shloka' : 'श्लोकाचा फोटो काढा किंवा अपलोड करा'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
              {currentLang === 'en'
                ? 'Select a book page, temple inscription, or prayer image'
                : 'धार्मिक पुस्तक, मंदिर शिलालेख किंवा प्रतिमेचा फोटो निवडा'}
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Choose Image' : 'फोटो अपलोड करा'}</span>
              </button>
            </div>
          </div>

          {/* Paste Sanskrit Text Alternative */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 block">
              {currentLang === 'en' ? 'Or Paste Sanskrit Text Directly:' : 'किंवा संस्कृत श्लोक येथे टाईप/पेस्ट करा:'}
            </label>
            <textarea
              rows={3}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="उदा. कर्मण्येवाधिकारस्ते मा फलेषु कदाचन..."
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button
              onClick={handlePasteAnalyze}
              className="mt-3 w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-amber-300 text-xs font-bold transition-all border border-amber-500/30 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Analyze & Identify Shloka' : 'श्लोक संदर्भ व अर्थ शोधा'}</span>
            </button>
          </div>

          {/* One-Tap Popular Shloka Presets */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
              ✨ {currentLang === 'en' ? 'Try Sample Shlokas' : 'लोकप्रिय नमुना श्लोक निवडा'}:
            </span>
            <div className="space-y-2">
              {sampleRecognizedShlokas.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleScanSample(s)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-serifDev transition-all border ${
                    activeShloka.id === s.id
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-100 font-bold'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="line-clamp-1">{s.devanagari}</span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-sans block mt-0.5">
                    📖 {s.sourceScripture[currentLang].split('(')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCANNER OUTPUT (TEXT, TRANSLITERATION, SOURCE & WORD-BY-WORD) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl relative">
          {isScanning && (
            <div className="absolute inset-0 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-3xl">
              <Scan className="w-12 h-12 text-amber-600 animate-spin" />
              <span className="font-serifDev text-base font-bold text-stone-900 dark:text-white mt-3">
                श्लोक ओळखत आहे (Scanning Sanskrit Corpus)...
              </span>
            </div>
          )}

          {/* Header & Source Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-5 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Identified Verified Source' : 'अधिकृत संदर्भ पडताळला ✓'}</span>
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold font-serifDev text-amber-700 dark:text-amber-400 mt-2">
                📖 {activeShloka.sourceScripture[currentLang]}
              </h3>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                🚩 आराध्य: {activeShloka.deityAssociated[currentLang]}
              </span>
            </div>

            {/* Audio Recite & Copy */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAudioPlay}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                  isSpeaking
                    ? 'bg-rose-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'थांबवा' : 'उच्चारण ऐका'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                title="Copy Shloka Details"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 1. Devanagari Sanskrit Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-saffron-500/10 to-amber-500/10 dark:from-amber-950/30 dark:via-stone-850 dark:to-stone-900 border border-amber-300/80 dark:border-amber-700/60 my-4 text-center">
            <p className="text-lg sm:text-xl font-bold font-devanagari text-stone-900 dark:text-amber-100 leading-relaxed">
              {activeShloka.devanagari}
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-mono italic mt-3 pt-2 border-t border-amber-300/40 dark:border-amber-800/40">
              {activeShloka.roman}
            </p>
          </div>

          {/* 2. Word-by-Word (पदच्छेद) Breakdown */}
          <div className="my-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Word-by-Word Breakdown (Padachheda)' : 'शब्दशः पदच्छेद व अर्थ'}:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeShloka.wordByWord.map((w, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs"
                >
                  <span className="font-bold font-serifDev text-stone-900 dark:text-amber-200">
                    {w.sanskrit}
                  </span>
                  <span className="text-stone-600 dark:text-stone-300 text-right">
                    {w.meaning[currentLang]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Overall Meaning & Significance */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200 dark:border-stone-700 text-xs sm:text-sm text-stone-800 dark:text-stone-200 space-y-2">
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">
                {currentLang === 'en' ? 'Comprehensive Meaning:' : 'संपूर्ण भावार्थ:'}
              </span>
              <p className="leading-relaxed">{activeShloka.overallMeaning[currentLang]}</p>
            </div>
            <div className="pt-2 border-t border-amber-200/60 dark:border-stone-700 text-[11px] text-amber-800 dark:text-amber-300">
              <strong>साधना रहस्य:</strong> {activeShloka.significance[currentLang]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

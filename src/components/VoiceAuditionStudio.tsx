import { useState } from 'react';
import { Play, Pause, Sparkles, CheckCircle2, Key, Info, ShieldCheck, Heart } from 'lucide-react';
import { aiVoiceover, VoiceGender } from '../utils/aiVoiceoverService';
import { audioEngine } from '../utils/audioSynth';
import { Language } from '../types';

interface VoiceAuditionStudioProps {
  currentLang: Language;
  onClose?: () => void;
}

interface AuditionVoice {
  id: string;
  name: string;
  nativeName: string;
  langCode: 'mr' | 'hi';
  gender: VoiceGender;
  role: string;
  roleDescription: string;
  character: string;
  tags: string[];
  defaultSampleText: string;
}

export function VoiceAuditionStudio({ currentLang, onClose }: VoiceAuditionStudioProps) {
  const [activeVoiceId, setActiveVoiceId] = useState<string>('mrunal_mr_narration');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentlyPlayingVoiceId, setCurrentlyPlayingVoiceId] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>('');
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const [sarvamKey, setSarvamKey] = useState<string>(aiVoiceover.getSarvamApiKey());
  const [showKeyInput, setShowKeyInput] = useState<boolean>(!aiVoiceover.getSarvamApiKey());
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  // The 4 Cornerstone Recommended Voices from Architecture Guidelines
  const auditionVoices: AuditionVoice[] = [
    {
      id: 'mrunal_mr_narration',
      name: 'Mrunal',
      nativeName: 'मृणाल',
      langCode: 'mr',
      gender: 'female',
      role: 'Marathi Female Narration (मुख्य मराठी स्त्री स्वर)',
      roleDescription: 'अत्यंत शुद्ध, ओघवती व भावपूर्ण मराठी. संत कथा, नित्य दिनक्रम व दैनंदिन भक्ती संवादासाठी सर्वोत्तम.',
      character: '🌸 भावपूर्ण व शांत (Devotional Serenity)',
      tags: ['मराठी कथा', 'भावार्थ', 'आरती प्रस्तावना'],
      defaultSampleText: 'नमस्ते! सनातन अमृतधारा पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. विठूमाऊली आणि महादेवांच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.'
    },
    {
      id: 'soham_mr_narration',
      name: 'Soham',
      nativeName: 'सोहम',
      langCode: 'mr',
      gender: 'male',
      role: 'Marathi Male Narration (मुख्य मराठी पुरुष स्वर)',
      roleDescription: 'वारकरी संप्रदाय व अष्टविनायक-ज्योतिर्लिंग देवस्थानांच्या इतिहासाला साजेसा धीरगंभीर व आदरयुक्त स्वर.',
      character: '🚩 धीरगंभीर व आदरयुक्त (Solemn Tradition)',
      tags: ['वारकरी दिनक्रम', 'मंदिर इतिहास', 'संत चरित्र'],
      defaultSampleText: 'राम कृष्ण हरी! पंढरपूर पावन आषाढी वारी आणि अष्टविनायक दर्शन यात्रेचा शास्त्रीय क्रम व इतिहास येथे श्रवण करा.'
    },
    {
      id: 'ishita_hi_devotional',
      name: 'Ishita',
      nativeName: 'ईशिता',
      langCode: 'hi',
      gender: 'female',
      role: 'Hindi Female Devotional (मुख्य हिंदी भक्तिमय स्वर)',
      roleDescription: 'मधुर, करुणापूर्ण व सात्त्विक ध्यान स्वर. देवी स्तोत्र भावार्थ व शांत चिंतन वाचनासाठी आदर्श.',
      character: '🪷 मधुर, करुणापूर्ण व सात्त्विक (Compassionate Devotion)',
      tags: ['हिंदी भावार्थ', 'सात्त्विक कथा', 'आरती परिचय'],
      defaultSampleText: 'नमस्कार! सनातन अमृतधारा भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान श्री राम और माता जानकी के आशीर्वाद से आपका दिन शांतिमय हो।'
    },
    {
      id: 'mani_hi_devotional',
      name: 'Mani',
      nativeName: 'मणि',
      langCode: 'hi',
      gender: 'male',
      role: 'Hindi Male Devotional (मुख्य हिंदी पुरोहित स्वर)',
      roleDescription: 'गंभीर मंदिर पुरोहित व वैदिक पंडितजींची आठवण करून देणारा नादब्रह्म संपन्न शास्त्रोक्त स्वर.',
      character: '🕉️ वैदिक पुरोहित व नादब्रह्म (Temple Baritone)',
      tags: ['शास्त्र व्याख्या', 'पौराणिक प्रसंग', 'पर्व माहात्म्य'],
      defaultSampleText: 'हर हर महादेव! बारह ज्योतिर्लिंग एवं सिंहस्थ कुंभ महापर्व के पावन दर्शन व आध्यात्मिक रहस्य में आपका स्वागत है।'
    }
  ];

  const activeVoice = auditionVoices.find((v) => v.id === activeVoiceId) || auditionVoices[0];

  const handlePlayAudition = async (voice: AuditionVoice) => {
    if (isPlaying && currentlyPlayingVoiceId === voice.id) {
      audioEngine.stopSpeaking();
      setIsPlaying(false);
      setCurrentlyPlayingVoiceId(null);
      return;
    }

    audioEngine.stopSpeaking();
    setIsPlaying(false);
    setLoadingVoiceId(voice.id);
    setActiveVoiceId(voice.id);
    audioEngine.playTempleBell();

    const text = customText.trim() ? customText.trim() : voice.defaultSampleText;

    // 1. Try Sarvam Bulbul V4 Flash if key is configured
    if (aiVoiceover.getSarvamApiKey()) {
      try {
        const audioUrl = await aiVoiceover.generateSarvamSpeech({
          text,
          lang: voice.langCode,
          speaker: voice.id,
          gender: voice.gender,
          pace: voice.gender === 'male' ? 0.86 : 0.88
        });

        if (audioUrl) {
          setLoadingVoiceId(null);
          setIsPlaying(true);
          setCurrentlyPlayingVoiceId(voice.id);
          const played = await audioEngine.playHumanAudio(audioUrl, () => {
            setIsPlaying(false);
            setCurrentlyPlayingVoiceId(null);
          });
          if (played) return;
        }
      } catch (err) {
        console.warn('Sarvam V4 Flash audition fallback:', err);
      }
    }

    // 2. High-fidelity Native fallback with matching language & calm pace
    setLoadingVoiceId(null);
    setIsPlaying(true);
    setCurrentlyPlayingVoiceId(voice.id);

    audioEngine.speakText(
      text,
      voice.langCode === 'mr' ? 'mr-IN' : 'hi-IN',
      voice.gender === 'male' ? 0.76 : 0.80,
      () => {
        setIsPlaying(false);
        setCurrentlyPlayingVoiceId(null);
      }
    );
  };

  const handleSetAsDefault = (voice: AuditionVoice) => {
    aiVoiceover.setUserVoiceGender(voice.gender);
    if (voice.langCode === 'mr') {
      aiVoiceover.setMarathiSpeaker(voice.id);
    } else {
      aiVoiceover.setHindiSpeaker(voice.id);
    }
    setSavedSuccess(`${voice.nativeName} (${voice.name}) हा आवाज डिफॉल्ट म्हणून निवडला गेला!`);
    setTimeout(() => setSavedSuccess(null), 3500);
  };

  const handleSaveKey = () => {
    aiVoiceover.setSarvamApiKey(sarvamKey);
    setSavedSuccess('Sarvam API Key यशस्वीरीत्या सेव्ह झाली!');
    setShowKeyInput(false);
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900/40 via-stone-900 to-amber-950/40 border border-amber-500/40 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sarvam Bulbul V4 Flash (bulbul:v4-flash) • Dedicated Devotional Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serifDev">
              {currentLang === 'en' ? 'Devotional Voice Audition Studio' : 'सनातन अमृतधारा — स्वर ऑडिशन दालन'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              अस्सल मराठी व हिंदी भक्ती कथनासाठी ४ मुख्य आवाजांची थेट तुलना करा. उच्चार शुद्धता, भाव आणि गांभीर्य ऐकून आपला आवडता आवाज निवडा.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-amber-500/30 text-xs font-semibold text-amber-200 transition-all flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{aiVoiceover.getSarvamApiKey() ? 'API Key सेट आहे' : 'Sarvam Key टाका'}</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300"
              >
                बंद करा
              </button>
            )}
          </div>
        </div>

        {/* API Key Drawer */}
        {showKeyInput && (
          <div className="mt-5 p-4 rounded-2xl bg-black/60 border border-amber-500/40 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-grow w-full">
              <label className="text-[11px] font-bold text-amber-300 block mb-1">
                Sarvam AI API Subscription Key:
              </label>
              <input
                type="password"
                value={sarvamKey}
                onChange={(e) => setSarvamKey(e.target.value)}
                placeholder="उदा. sk_live_... किंवा api-subscription-key"
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
            <button
              onClick={handleSaveKey}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all flex-shrink-0 mt-3 sm:mt-5"
            >
              सेव्ह करा
            </button>
          </div>
        )}

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-xs font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{savedSuccess}</span>
          </div>
        )}
      </div>

      {/* Sanskrit Architecture Disclaimer (Architecture Pillar #2) */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 mb-8 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-stone-300 leading-relaxed">
          <strong className="block text-amber-300 text-sm font-serifDev mb-0.5">
            महत्त्वाची शास्त्रीय मर्यादा: संस्कृत जप व AI मॉडेल्स
          </strong>
          Sarvam Bulbul V4 Flash हे मॉडेल <strong>मराठी व हिंदी</strong> या भाषांच्या भावपूर्ण कथनासाठी तयार केले आहे. संस्कृत वेद मंत्रोच्चारासाठी कोणतेही सामान्य TTS न वापरता, अमृतधारामध्ये प्रशिक्षित संस्कृत पंडितांचे <strong>सत्यशोधित पारंपरिक ऑडिओ जप (Verified Sanskrit Audio Library)</strong> वापरले जातात.
        </div>
      </div>

      {/* Custom Text Audition Input */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm mb-8">
        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5 flex items-center justify-between">
          <span>स्वर चाचणीसाठी मजकूर (Sample Text to Audition):</span>
          {customText && (
            <button
              onClick={() => setCustomText('')}
              className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-normal"
            >
              मूळ नमुना मजकूर पुनर्स्थापित करा
            </button>
          )}
        </label>
        <textarea
          rows={2}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder={`उदा. ${activeVoice.defaultSampleText}`}
          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 font-serifDev"
        />
      </div>

      {/* 4 Voices Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {auditionVoices.map((voice) => {
          const isSelected = voice.id === activeVoiceId;
          const isThisPlaying = isPlaying && currentlyPlayingVoiceId === voice.id;
          const isLoading = loadingVoiceId === voice.id;

          return (
            <div
              key={voice.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between shadow-md ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400'
              }`}
            >
              <div>
                {/* Top Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                      {voice.langCode === 'mr' ? '🚩 मराठी' : '🕉️ हिंदी'} • {voice.gender === 'male' ? 'पुरुष (Male)' : 'स्त्री (Female)'}
                    </span>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white font-serifDev mt-1 flex items-center gap-2">
                      <span>{voice.nativeName}</span>
                      <span className="text-xs text-stone-500 font-sans font-normal">({voice.name})</span>
                    </h3>
                  </div>

                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                    {voice.id}
                  </span>
                </div>

                {/* Role & Description */}
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                  {voice.role}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                  {voice.roleDescription}
                </p>

                {/* Character feel */}
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800/80 text-[11px] text-stone-700 dark:text-stone-300 mb-4 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span className="font-medium">{voice.character}</span>
                </div>

                {/* Sample Text Preview */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-black/30 border border-amber-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 font-serifDev leading-relaxed mb-4 italic">
                  "{customText.trim() ? customText.trim() : voice.defaultSampleText}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => handlePlayAudition(voice)}
                  disabled={isLoading}
                  className={`flex-grow py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                    isThisPlaying
                      ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                      : 'bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white'
                  }`}
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isThisPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>थांबवा (Pause)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>स्वर ऐका (Audition)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleSetAsDefault(voice)}
                  className="px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-all flex items-center gap-1.5 flex-shrink-0"
                  title="हा आवाज डिफॉल्ट ठेवा"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>निवडा</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evaluation Matrix / Guidance Note */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
        <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-500" />
          <span>स्वर निवडीसाठी मार्गदर्शक निकष (Evaluation Criteria):</span>
        </h4>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>उच्चार शुद्धता (Pronunciation):</strong> मराठीतील 'ळ', 'ज्ञ' (dnya), आणि 'ऋ' (ru) चे उच्चार नैसर्गिक वाटतात का ते तपासा.</li>
          <li><strong>भाव व लय (Emotion & Cadence):</strong> आवाज रोबोटिक वाटण्याऐवजी भक्तीभावाने ओतप्रोत आणि आदरयुक्त वाटतो का?</li>
          <li><strong>गती (Pace):</strong> संथ, शांत व ज्येष्ठ नागरिकांना समजेल अशी गती (०.८६x - ०.८८x) राखली गेली आहे.</li>
        </ul>
      </div>
    </div>
  );
}

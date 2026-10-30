import { useState } from 'react';
import { Language } from '../types';
import {
  vratProceduresDatabase,
  VratProcedure,
} from '../data/vratProceduresData';
import { audioEngine } from '../utils/audioSynth';
import {
  ShieldAlert,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface VratProcedureGuideProps {
  currentLang: Language;
}

export function VratProcedureGuide({ currentLang }: VratProcedureGuideProps) {
  const [selectedVratId, setSelectedVratId] = useState<string>('ekadashi');
  const [isSpeakingSankalpa, setIsSpeakingSankalpa] = useState<boolean>(false);

  const activeVrat: VratProcedure =
    vratProceduresDatabase.find((v) => v.id === selectedVratId) || vratProceduresDatabase[0];

  const handleChantSankalpa = () => {
    if (isSpeakingSankalpa) {
      audioEngine.stopSpeaking();
      setIsSpeakingSankalpa(false);
      return;
    }

    setIsSpeakingSankalpa(true);
    audioEngine.playTempleBell();
    audioEngine.speakText(activeVrat.sankalpaMantra.sanskrit, 'hi-IN', 0.78, () => {
      setIsSpeakingSankalpa(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>
            {currentLang === 'en'
              ? 'Traditional Vrat Science, Sankalpa & Parana'
              : 'शास्त्रोक्त व्रत पद्धती, संकल्प व पारणा विधी'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Vrat Guide: Fasting Procedures & Variations'
            : currentLang === 'hi'
            ? 'व्रत मार्गदर्शक: उपवास विधि, भेद एवं पारणा'
            : 'शास्त्रोक्त व्रत मार्गदर्शक: उपवास विधी, प्रकार व पारणा'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Master traditional fasting disciplines, resolve doubts between Nirjala and Phalahari fasts, learn exact Parana breaking times and Sanskrit Sankalpa mantras.'
            : 'एकादशी, प्रदोष आणि संकष्टीचे शास्त्रोक्त नियम; निर्जला वि. फलाहारी उपवास भेद; ऑडिओ संकल्प मंत्र आणि पारणा (उपवास सोडण्याचा) अचूक मुहूर्त.'}
        </p>
      </div>

      {/* Vrat Selector Pills */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8">
        {vratProceduresDatabase.map((vrat) => {
          const isSelected = vrat.id === selectedVratId;
          return (
            <button
              key={vrat.id}
              onClick={() => {
                setSelectedVratId(vrat.id);
                if (isSpeakingSankalpa) {
                  audioEngine.stopSpeaking();
                  setIsSpeakingSankalpa(false);
                }
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <span>{vrat.name[currentLang]}</span>
            </button>
          );
        })}
      </div>

      {/* Vrat Detail Box */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl mb-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">
              {activeVrat.frequency[currentLang]}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-stone-900 dark:text-white">
              {activeVrat.name[currentLang]}
            </h2>
            <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium block mt-1">
              🚩 {currentLang === 'en' ? 'Presiding Deity' : 'आराध्य देवता'}: {activeVrat.presidingDeity[currentLang]}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-stone-800/60 border border-amber-200 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 max-w-xs">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">
              ✨ {currentLang === 'en' ? 'Spiritual Benefit' : 'फलश्रुती'}:
            </span>
            {activeVrat.benefits[currentLang]}
          </div>
        </div>

        {/* 1. Sankalpa Mantra Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-saffron-500/15 to-amber-500/10 dark:from-amber-950/40 dark:via-stone-900 border border-amber-400/60 dark:border-amber-700/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold font-serifDev text-base sm:text-lg text-amber-950 dark:text-amber-200">
                {currentLang === 'en' ? 'Vedic Sankalpa Mantra' : 'शास्त्रोक्त संकल्प मंत्र (पूजेपूर्वी म्हणावा)'}
              </h3>
            </div>

            <button
              onClick={handleChantSankalpa}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                isSpeakingSankalpa
                  ? 'bg-rose-600 text-white'
                  : 'bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white'
              }`}
            >
              {isSpeakingSankalpa ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeakingSankalpa ? 'थांबवा' : 'मंत्र उच्चार ऐका'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-stone-900/90 border border-amber-300 dark:border-stone-700 my-3">
            <p className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-amber-100 leading-relaxed text-center">
              ॥ {activeVrat.sankalpaMantra.sanskrit} ॥
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 text-center font-mono mt-1 italic">
              {activeVrat.sankalpaMantra.transliteration}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <span className="font-bold text-amber-900 dark:text-amber-300">
              {currentLang === 'en' ? 'Meaning: ' : 'संकल्प अर्थ: '}
            </span>
            {activeVrat.sankalpaMantra.meaning[currentLang]}
          </div>
        </div>

        {/* 2. Fasting Variations (Nirjala vs Phalahari) */}
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-500" />
            <span>{currentLang === 'en' ? 'Traditional Variations & Austerities' : 'उपवासाचे प्रकार व भेद'}:</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeVrat.variations.map((v, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700"
              >
                <h4 className="font-bold text-sm sm:text-base font-serifDev text-amber-800 dark:text-amber-300 mb-1.5">
                  {v.title[currentLang]}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {v.desc[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Parana Rules (उपवास सोडण्याचा विधी व मुहूर्त) */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold font-serifDev text-base sm:text-lg text-emerald-950 dark:text-emerald-200">
              {currentLang === 'en' ? 'Parana Rules (How to Break the Fast)' : 'पारणा विधी (उपवास सोडण्याचा नियम व मुहूर्त)'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                ⏱️ {currentLang === 'en' ? 'Exact Timing' : 'अचूक मुहूर्त'}:
              </span>
              <p className="text-stone-700 dark:text-stone-300">{activeVrat.paranaRules.timing[currentLang]}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                🙏 {currentLang === 'en' ? 'Procedure' : 'शास्त्रोक्त विधी'}:
              </span>
              <p className="text-stone-700 dark:text-stone-300">{activeVrat.paranaRules.procedure[currentLang]}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                🥣 {currentLang === 'en' ? 'First Food' : 'पारणा पदार्थ'}:
              </span>
              <p className="text-stone-700 dark:text-stone-300">{activeVrat.paranaRules.breakingFood[currentLang]}</p>
            </div>
          </div>
        </div>

        {/* 4. Strict Dietary Avoidances */}
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">
              {currentLang === 'en' ? 'Dietary Restrictions' : 'काय टाळावे (वर्ज्य अन्न व चुका)'}:
            </span>
            <p>{activeVrat.fastingRules.diet[currentLang]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


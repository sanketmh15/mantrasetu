import { useState } from 'react';
import { Language } from '../types';
import {
  festivalPrepDatabase,
  FestivalPrep,
} from '../data/festivalPrepData';
import { audioEngine } from '../utils/audioSynth';
import {
  Sparkles,
  Home,
  CheckCircle2,
  Calendar,
  Volume2,
  VolumeX,
  Heart,
  BookOpen,
} from 'lucide-react';

interface FestivalPrepGuideProps {
  currentLang: Language;
}

export function FestivalPrepGuide({ currentLang }: FestivalPrepGuideProps) {
  const [selectedFestivalId, setSelectedFestivalId] = useState<string>('ganesh_chaturthi');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const activeFestival: FestivalPrep =
    festivalPrepDatabase.find((f) => f.id === selectedFestivalId) || festivalPrepDatabase[0];

  const handleSpeakFestival = () => {
    if (isSpeaking) {
      audioEngine.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const homeTips = activeFestival.homePreparation
      .map((h, i) => `घरची पूर्वतयारी ${i + 1}: ${h[currentLang]}`)
      .join('। ');

    const templeTips = activeFestival.templeItemsToBring
      .map((t, i) => `मंदिरात नेण्याचे साहित्य ${i + 1}: ${t[currentLang]}`)
      .join('। ');

    const textToSpeak = `${activeFestival.name[currentLang]}। तिथी: ${activeFestival.tithiAndMonth[currentLang]}। आराध्य: ${activeFestival.deity[currentLang]}। ${homeTips}। ${templeTips}। पारंपारिक नैवेद्य: ${activeFestival.traditionalPrasad[currentLang]}`;

    setIsSpeaking(true);
    audioEngine.speakText(textToSpeak, currentLang === 'en' ? 'en-IN' : 'mr-IN', 0.88, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>
            {currentLang === 'en'
              ? 'Complete Hindu Festival Preparation Companion'
              : 'सण-उत्सव पूर्वतयारी व पूजा मार्गदर्शक'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Festival Preparation & Observance Guide'
            : currentLang === 'hi'
            ? 'पर्व-त्योहार तैयारी एवं पूजन विधि'
            : 'सण-उत्सव पूर्वतयारी, विधी व साहित्य वाटाड्या'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Never forget what to prepare at home, what items to take to the temple, and step-by-step rituals for Ganesh Chaturthi, Maha Shivratri, Ashadhi Ekadashi, and Diwali.'
            : 'सणाच्या आदल्या दिवशी घरात काय तयारी करावी, मंदिरात दर्शनाला जाताना काय सोबत न्यावे आणि उत्सव शास्त्रोक्त पद्धतीने कसा साजरा करावा याचा परिपूर्ण मार्गदर्शक.'}
        </p>
      </div>

      {/* Festival Selection Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {festivalPrepDatabase.map((fest) => {
          const isSelected = fest.id === selectedFestivalId;
          return (
            <button
              key={fest.id}
              onClick={() => {
                setSelectedFestivalId(fest.id);
                if (isSpeaking) {
                  audioEngine.stopSpeaking();
                  setIsSpeaking(false);
                }
              }}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500/15 via-saffron-500/10 to-transparent dark:from-amber-950/50 dark:via-stone-900 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
              }`}
            >
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                {fest.tithiAndMonth[currentLang]}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white font-serifDev line-clamp-1">
                {fest.name[currentLang]}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Festival Detailed Dashboard */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl mb-12">
        {/* Banner with Speech Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{activeFestival.tithiAndMonth[currentLang]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-stone-900 dark:text-white">
              {activeFestival.name[currentLang]}
            </h2>
            <span className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300 block mt-1">
              🚩 {currentLang === 'en' ? 'Presiding Deity' : 'आराध्य देवता'}: {activeFestival.deity[currentLang]}
            </span>
          </div>

          <button
            onClick={handleSpeakFestival}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>
              {isSpeaking
                ? currentLang === 'en'
                  ? 'Stop Voice'
                  : 'आवाज थांबवा'
                : currentLang === 'en'
                ? 'Listen Festival Guide'
                : 'तयारी मार्गदर्शक ऐका'}
            </span>
          </button>
        </div>

        {/* 3 Core Pillar Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 1. What to prepare at home */}
          <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/80 dark:border-stone-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold font-serifDev text-base mb-3">
                <Home className="w-5 h-5 text-amber-600" />
                <span>{currentLang === 'en' ? '1. Home Preparation (घरची तयारी)' : '१. घरची पूर्वतयारी'}</span>
              </div>
              <ul className="space-y-3">
                {activeFestival.homePreparation.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span>{h[currentLang]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-stone-700 text-[11px] text-amber-900 dark:text-amber-300 font-semibold">
              ✨ आदल्या दिवशी पूर्ण करून ठेवावे
            </div>
          </div>

          {/* 2. What to bring to temple */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold font-serifDev text-base mb-3">
                <span>🛕</span>
                <span>{currentLang === 'en' ? '2. Temple Items to Bring' : '२. मंदिरात नेण्याचे साहित्य'}</span>
              </div>
              <ul className="space-y-3">
                {activeFestival.templeItemsToBring.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>{t[currentLang]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-200/60 dark:border-indigo-900/50 text-[11px] text-indigo-900 dark:text-indigo-300 font-semibold">
              🎒 दर्शनासाठी निघण्यापूर्वी बॅग तपासा
            </div>
          </div>

          {/* 3. Traditional Prasad & Bhog */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold font-serifDev text-base mb-3">
                <Heart className="w-5 h-5 text-emerald-600" />
                <span>{currentLang === 'en' ? '3. Traditional Prasad & Bhog' : '३. पारंपरिक नैवेद्य व प्रसाद'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-200 mb-3">
                🍲 {activeFestival.traditionalPrasad[currentLang]}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {activeFestival.spiritualSignificance[currentLang]}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/50 text-[11px] text-emerald-900 dark:text-emerald-300 font-semibold">
              🍯 सात्त्विक, साजूक तुपातील घरगुती नैवेद्य
            </div>
          </div>
        </div>

        {/* Step-by-Step Observance Procedure */}
        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
          <h3 className="font-bold font-serifDev text-stone-900 dark:text-white text-base sm:text-lg mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>{currentLang === 'en' ? 'How to Observe: Step-by-Step Ritual Sequence' : 'उत्सव कसा साजरा करावा - शास्त्रोक्त पायऱ्या'}:</span>
          </h3>
          <div className="space-y-3">
            {activeFestival.observanceSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-start gap-3 text-xs sm:text-sm"
              >
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed">
                  {step[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


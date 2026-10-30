import React, { useState } from 'react';
import { Language } from '../types';
import { weekdayPujaGuideData, getTodayWeekdayPuja } from '../data/weekdayPujaGuide';
import { audioEngine } from '../utils/audioSynth';
import {
  Volume2,
  VolumeX,
  Calendar,
  Compass,
  CheckCircle2,
  Heart,
  ChevronRight,
  Flame,
  Sun,
  Shield
} from 'lucide-react';

interface DailyPujaGuideProps {
  currentLang: Language;
  onNavigateTab?: (tab: string) => void;
  onSelectDeity?: (deityId: string) => void;
}

export const DailyPujaGuide: React.FC<DailyPujaGuideProps> = ({
  currentLang,
  onNavigateTab,
  onSelectDeity,
}) => {
  const todayInfo = getTodayWeekdayPuja();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(todayInfo.dayIndex);
  const [isPlayingMantra, setIsPlayingMantra] = useState(false);

  const activeDay = weekdayPujaGuideData.find((d) => d.dayIndex === selectedDayIndex) || todayInfo;
  const isToday = activeDay.dayIndex === todayInfo.dayIndex;

  const handlePlayMantra = () => {
    if (isPlayingMantra) {
      audioEngine.stopSpeaking();
      setIsPlayingMantra(false);
    } else {
      setIsPlayingMantra(true);
      audioEngine.playTempleBell();
      audioEngine.playBrahmanChant({
        text: activeDay.mantraPractice.devanagari,
        lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
        withTanpura: true,
        onEnd: () => setIsPlayingMantra(false),
      });
    }
  };

  const handleDayChange = (index: number) => {
    audioEngine.stopSpeaking();
    setIsPlayingMantra(false);
    setSelectedDayIndex(index);
  };

  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
      {/* 1. Header with Sacred Aura */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3 shadow-sm">
          <Calendar className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
          <span>
            {currentLang === 'en'
              ? 'Hindu Worship Guide • Day-Wise Deities & Planetary Puja'
              : currentLang === 'hi'
              ? 'वारानुसार देव-देवता एवं ग्रह शांति पूजा विधान'
              : 'वारानुसार देवता व दैनंदिन पूजा विधी दर्शन'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Day-Wise Deity & Puja Schedule'
            : currentLang === 'hi'
            ? 'साप्ताहिक देव उपासना एवं ग्रह पूजा मार्गदर्शिका'
            : 'वारानुसार देवता, ग्रह उपासना व पूजा विधी'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium max-w-2xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'According to Hindu tradition, each day of the week is dedicated to a specific deity, planetary energy, sacred color, offerings, and fasting rules.'
            : currentLang === 'hi'
            ? 'सनातन परंपरा के अनुसार सप्ताह का प्रत्येक दिन विशिष्ट देवी-देवता, नवग्रह ऊर्जा, शुभ रंग एवं विशेष पूजा सामग्री को समर्पित है।'
            : 'सनातन परंपरेनुसार आठवड्यातील प्रत्येक वार एका विशिष्ट देवतेस, ग्रहास, शुभ रंगास व नैवेद्यास समर्पित आहे. आजच्या वाराचे महत्त्व जाणून घ्या.'}
        </p>
      </div>

      {/* 2. Interactive 7-Day Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
        {weekdayPujaGuideData.map((day) => {
          const isSelected = day.dayIndex === selectedDayIndex;
          const isRealToday = day.dayIndex === todayInfo.dayIndex;

          return (
            <button
              key={day.id}
              onClick={() => handleDayChange(day.dayIndex)}
              className={`relative rounded-2xl p-3 sm:p-3.5 text-left transition-all border ${
                isSelected
                  ? 'bg-gradient-to-b from-saffron-500/20 via-amber-500/15 to-transparent dark:from-saffron-950/60 dark:to-stone-900 border-saffron-500 dark:border-saffron-500 shadow-md ring-2 ring-saffron-500/30'
                  : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 hover:border-amber-400 hover:bg-stone-50 dark:hover:bg-stone-800/60'
              }`}
            >
              {isRealToday && (
                <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-saffron-600 text-white shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {currentLang === 'en' ? 'Today' : 'आजचा वार'}
                </span>
              )}

              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl select-none">{day.rulingPlanet.symbol}</span>
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                  style={{ backgroundColor: day.holyColor.hex }}
                  title={day.holyColor.name[currentLang]}
                />
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white font-serifDev truncate">
                {day.dayName[currentLang].split('(')[0]}
              </h4>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate mt-0.5">
                {day.deities.primary[currentLang].split('&')[0].split('व')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* 3. Main Featured Card for the Selected Day */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-stone-50 to-saffron-500/5 dark:from-stone-900 dark:via-stone-950 dark:to-amber-950/30 border border-amber-300/80 dark:border-amber-800/60 p-5 sm:p-8 shadow-xl relative overflow-hidden">
        
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-amber-400 to-red-500" />
        
        {/* Top Badges & Day Heading */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                {activeDay.rulingPlanet.graha} • {activeDay.rulingPlanet.name[currentLang]}
              </span>
              {isToday && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600 text-white animate-pulse">
                  {currentLang === 'en' ? 'Today\'s Sacred Puja' : 'आजचे पावन व्रत'}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serifDev text-stone-950 dark:text-white flex items-center gap-2">
              <span>{activeDay.dayName[currentLang]}</span>
              <span className="text-2xl">{activeDay.icon}</span>
            </h3>
          </div>

          {/* Holy Color Swatch Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <span
              className="w-5 h-5 rounded-full border border-stone-300 dark:border-stone-700 shadow-sm shrink-0"
              style={{ backgroundColor: activeDay.holyColor.hex }}
            />
            <div className="text-left">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">
                {currentLang === 'en' ? 'Holy Attire Color' : 'शुभ वस्त्र व रंग'}
              </span>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 font-serifDev">
                {activeDay.holyColor.name[currentLang]}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Deity Banner */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-saffron-600/15 via-amber-500/10 to-transparent dark:from-saffron-950/40 dark:via-stone-900 border border-saffron-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-widest block mb-0.5">
              {currentLang === 'en' ? 'Presiding Sacred Deities' : 'आजचे प्रमुख उपास्य दैवत'}
            </span>
            <h4 className="text-lg sm:text-xl font-bold font-serifDev text-stone-900 dark:text-white">
              {activeDay.deities.primary[currentLang]}
            </h4>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                {currentLang === 'en' ? 'Associated Deities:' : 'सह-उपासना:'}
              </span>
              {activeDay.deities.associated.map((d, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[11px] font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                >
                  {d[currentLang]}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Action to Visit Deity Shrine in 50 Deities */}
          {activeDay.deities.deityId && onSelectDeity && (
            <button
              onClick={() => {
                onSelectDeity(activeDay.deities.deityId!);
                if (onNavigateTab) {
                  onNavigateTab('god-detail');
                }
              }}
              className="px-4 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold shadow-md hover:shadow-saffron-500/20 transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Explore Sanctuary' : 'देवता दर्शन व जपमाळ'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4. Sacred Mantra & 1-Click Audio Player */}
        <div className="rounded-2xl p-5 sm:p-6 bg-stone-900/90 dark:bg-stone-950 border border-amber-500/40 text-white shadow-inner mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">📿</span>
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                {activeDay.mantraPractice.title[currentLang]}
              </span>
            </div>

            {/* Listen Audio Button */}
            <button
              onClick={handlePlayMantra}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                isPlayingMantra
                  ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 animate-pulse'
                  : 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:brightness-110 text-white border border-amber-300/40 shadow-amber-500/20 active:scale-95'
              }`}
            >
              {isPlayingMantra ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Stop' : 'थांबवा'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                  <span>{currentLang === 'en' ? 'Listen Mantra Chanting' : 'मंत्रोच्चारण ऐका (Big B)'}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-base sm:text-xl font-bold font-serifDev text-amber-100 leading-relaxed">
            {activeDay.mantraPractice.devanagari}
          </p>
          <p className="text-xs text-stone-400 italic mt-1 font-mono">
            {activeDay.mantraPractice.roman}
          </p>
          <p className="text-xs text-stone-300 font-serifDev mt-3 pt-3 border-t border-stone-800 leading-relaxed">
            <strong className="text-amber-400 font-bold">{currentLang === 'en' ? 'Spiritual Essence: ' : 'मंत्राचा अर्थ: '}</strong>
            {activeDay.mantraPractice.meaning[currentLang]}
          </p>
        </div>

        {/* 5. Four Pillars Grid: Offerings, Fasting, Significance & Benefits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Pillar 1: Sacred Offerings */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase mb-2.5">
              <Flame className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Sacred Offerings' : 'पूजेची सामग्री व नैवेद्य'}</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300 font-serifDev">
              {activeDay.sacredOfferings.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item[currentLang]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 2: Fasting & Dietary Rules */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase mb-2.5">
              <Heart className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Fasting & Diet Rules' : 'उपवास व आहार नियम'}</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-serifDev leading-relaxed">
              {activeDay.fastingAndDiet[currentLang]}
            </p>
          </div>

          {/* Pillar 3: Planetary Significance */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase mb-2.5">
              <Sun className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Planetary Energy' : 'ग्रहाचा प्रभाव व महत्त्व'}</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-serifDev leading-relaxed">
              {activeDay.significance[currentLang]}
            </p>
          </div>

          {/* Pillar 4: Divine Blessings & Benefits */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase mb-2.5">
              <Shield className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Divine Blessings' : 'आशीर्वाद व आध्यात्मिक लाभ'}</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-serifDev leading-relaxed">
              {activeDay.benefits[currentLang]}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};


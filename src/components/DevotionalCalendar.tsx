import React, { useState } from 'react';
import { Language } from '../types';
import {
  weeklyVratGuidance,
  majorMaharashtraFestivals,
  getTodayVratGuidance,
  VratDay
} from '../data/devotionalCalendar';
import {
  Calendar,
  Sparkles,
  Sun,
  Flame,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react';

interface DevotionalCalendarProps {
  currentLang: Language;
  onOpenJapaWithMantra: (mantraId: string) => void;
}

export const DevotionalCalendar: React.FC<DevotionalCalendarProps> = ({
  currentLang,
  onOpenJapaWithMantra
}) => {
  const todayGuidance = getTodayVratGuidance();
  const [selectedDayId, setSelectedDayId] = useState<string>(todayGuidance.id);

  const activeDay: VratDay =
    weeklyVratGuidance.find((v) => v.id === selectedDayId) || todayGuidance;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/60 text-amber-300 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {currentLang === 'en'
              ? 'Vedic Muhurat & Maharashtra Devotional Calendar'
              : currentLang === 'hi'
              ? 'दैनिक वार-उपासना एवं सण-उत्सव पंचांग'
              : 'दैनिक वार-दैवत उपासना व सण-उत्सव पंचांग'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-white tracking-tight">
          {currentLang === 'en'
            ? 'Devotional Calendar & Vrat Guide'
            : currentLang === 'hi'
            ? 'पावन दिनदर्शिका एवं नित्य व्रत विधी'
            : 'पावन दिनदर्शिका व नित्य उपासना विधी'}
        </h1>
        <p className="text-xs sm:text-base text-stone-300 mt-2 leading-relaxed">
          {currentLang === 'en'
            ? 'Discover today\'s consecrated deity, auspicious morning and evening rituals, fasting rules, and the major festive tithis of Maharashtra.'
            : currentLang === 'hi'
            ? 'आज के अधिष्ठाता देव, प्रातः एवं सांध्य उपासना नियम, एवं महाराष्ट्र के प्रमुख पावन पर्व।'
            : 'आजचे अधिष्ठाता दैवत, सकाळ-संध्याकाळचे विहित विधी, उपवास नियम आणि महाराष्ट्रातील प्रमुख सण-उत्सव.'}
        </p>
      </div>

      {/* 2. Today's Auspicious Daily Shrine Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#211810] via-[#1a1512] to-[#16120e] border border-amber-700/50 shadow-2xl mb-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 mb-3 shadow-md animate-pulse">
              <Sun className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Today\'s Prescribed Deity' : 'आजचे अधिष्ठाता दैवत'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serifDev text-white">
              {todayGuidance.name[currentLang]}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
              {todayGuidance.significance[currentLang]}
            </p>
          </div>

          <button
            onClick={() => onOpenJapaWithMantra(todayGuidance.recommendedMantraId)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-amber-950 transition-all transform hover:scale-105 shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'Chant Today\'s Mantra (108 Japa)' : 'आजचा जप सुरू करा (१०८ जप)'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* 3. 7-Day Cyclical Week Selector */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block mb-3 text-center sm:text-left">
          {currentLang === 'en' ? 'Explore 7 Days of Devotion (वार-दैवत परम्परा)' : 'आठवड्याचे सातही वार आणि उपासना'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {weeklyVratGuidance.map((vrat) => {
            const isSelected = vrat.id === activeDay.id;
            const isToday = vrat.dayOfWeek === todayGuidance.dayOfWeek;
            return (
              <button
                key={vrat.id}
                onClick={() => setSelectedDayId(vrat.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-600 text-white shadow-lg ring-1 ring-amber-400'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">
                    {vrat.name[currentLang].split('—')[0].trim()}
                  </span>
                  {isToday && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Today" />
                  )}
                </div>
                <span className="text-[11px] text-amber-300 block truncate">
                  {vrat.name[currentLang].split('—')[1]?.trim() || ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Selected Day Worship Guide Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#171513] border border-stone-800 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {currentLang === 'en' ? 'Prescribed Daily Discipline' : 'दैनिक उपासना विधी'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-white mt-1">
              {activeDay.name[currentLang]}
            </h3>
          </div>
          <button
            onClick={() => onOpenJapaWithMantra(activeDay.recommendedMantraId)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700 text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <span>📿</span>
            <span>{currentLang === 'en' ? 'Open Japa with this Mantra' : 'या मंत्राची जपमाळ उघडा'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed my-4">
          {activeDay.significance[currentLang]}
        </p>

        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-6 mb-3 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-saffron-400" />
          <span>{currentLang === 'en' ? 'Recommended Worship Rituals for this Day' : 'आजचे विहित धार्मिक विधी'}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activeDay.prescribedRituals.map((r, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-stone-900/70 border border-stone-800 text-xs text-stone-200 flex items-start gap-2.5"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{r[currentLang]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Major Maharashtra Devotional Festivals */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-white">
            {currentLang === 'en'
              ? 'Major Maharashtra Devotional Festivals & Tithis'
              : currentLang === 'hi'
              ? 'महाराष्ट्र के महापर्व एवं पावन तिथियां'
              : 'महाराष्ट्रातील प्रमुख सण, उत्सव व पावन तिथी'}
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {majorMaharashtraFestivals.map((fest, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/60">
                    {fest.tithi[currentLang]}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {fest.deity[currentLang]}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white font-serifDev mb-2">
                  {fest.name[currentLang]}
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {fest.significance[currentLang]}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-900/30 text-xs">
                <span className="font-semibold text-amber-400 block mb-0.5">
                  🍚 {currentLang === 'en' ? 'Fasting & Prasad Rule:' : 'उपवास व प्रसाद नियम:'}
                </span>
                <span className="text-[11px] text-stone-300 leading-relaxed">
                  {fest.fastingRule[currentLang]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

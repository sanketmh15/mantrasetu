import { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  getDayMuhuratData,
  getCurrentChoghadiyaInfo,
  isRahuKaalActiveNow,
  choghadiyaQualities,
  ChoghadiyaSlot,
} from '../data/muhuratChoghadiya';
import {
  Clock,
  Sun,
  Moon,
  AlertTriangle,
  Sparkles,
  Info,
  ShieldAlert,
} from 'lucide-react';

interface LiveMuhuratChoghadiyaProps {
  currentLang: Language;
}

export function LiveMuhuratChoghadiya({ currentLang }: LiveMuhuratChoghadiyaProps) {
  const [now, setNow] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(() => new Date().getDay());
  const [timeMode, setTimeMode] = useState<'day' | 'night'>('day');

  // Real-time clock tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dayData = getDayMuhuratData(selectedDayIndex);
  const currentChoghadiya = getCurrentChoghadiyaInfo();
  const rahuStatus = isRahuKaalActiveNow();

  const isToday = selectedDayIndex === now.getDay();

  // Format current live time
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const getSlotColorClass = (type: string) => {
    const q = choghadiyaQualities[type];
    if (!q) return 'bg-stone-500 text-white';
    return q.color;
  };

  const getSlotQualityBadge = (type: string) => {
    const q = choghadiyaQualities[type];
    if (!q) return type;
    return q.badge[currentLang];
  };

  const daysOfWeek = [
    { index: 0, mr: 'रविवार (रवि)', hi: 'रविवार (सूर्य)', en: 'Sunday' },
    { index: 1, mr: 'सोमवार (चंद्र)', hi: 'सोमवार (शिव)', en: 'Monday' },
    { index: 2, mr: 'मंगळवार (मंगळ)', hi: 'मंगलवार (हनुमान)', en: 'Tuesday' },
    { index: 3, mr: 'बुधवार (बुध)', hi: 'बुधवार (विठ्ठल)', en: 'Wednesday' },
    { index: 4, mr: 'गुरुवार (गुरु)', hi: 'गुरुवार (विष्णु)', en: 'Thursday' },
    { index: 5, mr: 'शुक्रवार (शुक्र)', hi: 'शुक्रवार (महालक्ष्मी)', en: 'Friday' },
    { index: 6, mr: 'शनिवार (शनि)', hi: 'शनिवार (शनि-मारुती)', en: 'Saturday' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Clock className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span>
            {currentLang === 'en'
              ? 'Real-Time Vedic Clock & Muhurat'
              : currentLang === 'hi'
              ? 'प्रत्यक्ष वैदिक चौघड़िया एवं पञ्चाङ्ग मुहूर्त'
              : 'प्रत्यक्ष वैदिक चौघडिया व शुभ मुहूर्त घड्याळ'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Live Choghadiya & Daily Rahu Kaal'
            : currentLang === 'hi'
            ? 'दैनिक चौघड़िया, राहुकाल एवं शुभ मुहूर्त'
            : 'आजचे प्रत्यक्ष चौघडिया, राहुकाळ व शुभ मुहूर्त'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Accurate astrological windows for auspicious work, travel, buying property, prayers, and avoiding inauspicious hours.'
            : currentLang === 'hi'
            ? 'शुभ कार्य, यात्रा, नवीन संकल्प व पूजेसाठी अचूक काल गणना. अमृत व शुभ काळात केलेले कार्य सिद्धी देते.'
            : 'शुभ कार्य, प्रवास, सोने खरेदी, गृहप्रवेश व पूजेसाठी शास्त्रोक्त वैदिक काल गणना. अमृत व शुभ चौघडियात कार्य सिद्धीस जाते.'}
        </p>

        {/* Live Digital Clock Badge */}
        <div className="mt-5 inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600/10 via-saffron-600/15 to-amber-600/10 dark:from-amber-950/40 dark:via-saffron-950/60 dark:to-amber-950/40 border border-amber-300/80 dark:border-amber-700/60 shadow-lg">
          <div className="flex items-center gap-2 text-stone-900 dark:text-amber-100 font-mono text-xl sm:text-2xl font-black">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>{formattedTime}</span>
          </div>
          <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
            {now.toLocaleDateString(currentLang === 'en' ? 'en-IN' : 'mr-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* 1. REAL-TIME ACTIVE CHOGHADIYA CARD */}
      <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 dark:border-amber-600 bg-gradient-to-br from-white via-amber-50/50 to-orange-50/40 dark:from-stone-900 dark:via-[#1c1611] dark:to-stone-900 p-6 sm:p-8 relative">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-40 h-40 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-amber-200 dark:border-stone-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>
                {currentLang === 'en'
                  ? 'Active Right Now'
                  : currentLang === 'hi'
                  ? 'वर्तमान में सक्रिय चौघड़िया'
                  : 'सध्या चालू असलेले चौघडिया'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white">
                {currentChoghadiya.slot.name[currentLang]}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-sm ${getSlotColorClass(
                  currentChoghadiya.slot.type
                )}`}
              >
                {getSlotQualityBadge(currentChoghadiya.slot.type)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2">
              <span className="font-semibold text-amber-800 dark:text-amber-300">
                {currentLang === 'en' ? 'Ruling Planet: ' : 'स्वामी ग्रह: '}
              </span>
              {currentChoghadiya.slot.rulingPlanet}
            </p>
          </div>

          {/* Time Remaining Ring / Meter */}
          <div className="flex items-center gap-4 bg-white/80 dark:bg-stone-800/80 backdrop-blur-md px-5 py-4 rounded-2xl border border-amber-200 dark:border-stone-700 shadow-md">
            <div className="text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                {currentLang === 'en' ? 'Time Remaining' : currentLang === 'hi' ? 'शेष समय' : 'उर्वरित वेळ'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {currentChoghadiya.timeLeftMinutes}{' '}
                <span className="text-xs font-normal text-stone-600 dark:text-stone-300">
                  {currentLang === 'en' ? 'mins' : 'मिनिटे'}
                </span>
              </div>
            </div>
            <div className="w-24">
              <div className="text-[10px] text-right text-stone-500 dark:text-stone-400 mb-1">
                {currentChoghadiya.progressPercent}%
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-saffron-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${currentChoghadiya.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Significance & Recommendation */}
        <div className="p-4 rounded-2xl bg-amber-100/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-stone-800 dark:text-amber-100 text-sm leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-200 mb-0.5">
              {currentLang === 'en' ? 'Vedic Guidance' : currentLang === 'hi' ? 'वैदिक परामर्श' : 'शास्त्रोक्त फळ व मार्गदर्शन'}:
            </p>
            <p>{currentChoghadiya.slot.significance[currentLang]}</p>
          </div>
        </div>
      </div>

      {/* 2. RAHU KAAL & YAMAGANDA STATUS ALERT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Rahu Kaal Alert */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all shadow-md ${
            rahuStatus.isActive
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className={`w-5 h-5 ${rahuStatus.isActive ? 'text-rose-600 animate-bounce' : 'text-stone-500'}`} />
              <h3 className="font-bold font-serifDev text-base sm:text-lg text-stone-900 dark:text-white">
                {currentLang === 'en' ? 'Rahu Kaal (राहुकाल)' : 'आजचा राहुकाळ'}
              </h3>
            </div>
            {rahuStatus.isActive ? (
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black animate-pulse">
                {currentLang === 'en' ? 'ACTIVE NOW' : 'सध्या चालू आहे'}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold">
                {dayData.rahuKaal.start} - {dayData.rahuKaal.end}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {rahuStatus.isActive
              ? currentLang === 'en'
                ? `Rahu Kaal is active right now for next ${rahuStatus.minutesRemaining} minutes. Strictly avoid starting new work, travel, or financial agreements.`
                : `राहुकाळ सध्या सुरू आहे (उर्वरित ${rahuStatus.minutesRemaining} मिनिटे). नवीन संकल्प, मोठे व्यवहार किंवा प्रवास सुरू करू नका.`
              : currentLang === 'en'
              ? `Today's Rahu Kaal window is ${dayData.rahuKaal.start} to ${dayData.rahuKaal.end}. Avoid beginning auspicious events during this time.`
              : `आजचा राहुकाळ दुपारी/सकाळी ${dayData.rahuKaal.start} ते ${dayData.rahuKaal.end} आहे. या वेळात नवीन कामे सुरू करणे टाळावे.`}
          </p>
        </div>

        {/* Yamaganda & Gulika Kaal */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold font-serifDev text-base sm:text-lg text-stone-900 dark:text-white">
              {currentLang === 'en' ? 'Yamaganda & Gulika Kaal' : 'यमगंड व गुलिक काळ'}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block font-semibold">
                {currentLang === 'en' ? 'Yamaganda' : 'यमगंड काळ'}
              </span>
              <span className="text-sm font-bold text-stone-900 dark:text-white font-mono">
                {dayData.yamaganda.start} - {dayData.yamaganda.end}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block font-semibold">
                {currentLang === 'en' ? 'Gulika Kaal' : 'गुलिक काळ'}
              </span>
              <span className="text-sm font-bold text-stone-900 dark:text-white font-mono">
                {dayData.gulikaKaal.start} - {dayData.gulikaKaal.end}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AUSPICIOUS MUHURAT TIMINGS (Brahma Muhurta, Abhijit, Godhuli) */}
      <div className="mb-10">
        <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>
            {currentLang === 'en'
              ? 'Today’s Blessed Muhurat Windows'
              : currentLang === 'hi'
              ? 'आज के सर्वाधिक शुभ मुहूर्त'
              : 'आजचे अत्यंत पावन व शुभ मुहूर्त'}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Brahma Muhurta */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-200 dark:border-indigo-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                {currentLang === 'en' ? 'Brahma Muhurta' : 'ब्रह्म मुहूर्त (ध्यान-साधना)'}
              </span>
              <span className="text-base">🧘</span>
            </div>
            <div className="text-lg font-black text-indigo-950 dark:text-indigo-100 font-mono">
              {dayData.brahmaMuhurta.start} - {dayData.brahmaMuhurta.end}
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2">
              {currentLang === 'en'
                ? 'Best for meditation, mantra chanting, and intellectual study.'
                : 'प्राणायाम, १०८ नामजप व आत्मचिंतनासाठी सर्वोत्तम पवित्र काळ.'}
            </p>
          </div>

          {/* Abhijit Muhurat */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {currentLang === 'en' ? 'Abhijit Muhurat' : 'अभिजीत मुहूर्त (विजय)'}
              </span>
              <span className="text-base">🏹</span>
            </div>
            <div className="text-lg font-black text-emerald-950 dark:text-emerald-100 font-mono">
              {dayData.abhijitMuhurat.start} - {dayData.abhijitMuhurat.end}
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2">
              {currentLang === 'en'
                ? 'Lord Shiva’s victory hour. Any auspicious act overcomes all flaws.'
                : 'सर्व दोषांचे निवारण करणारा विजय मुहूर्त. नवीन शुभारंभ व खरेदीसाठी उत्तम.'}
            </p>
          </div>

          {/* Godhuli Muhurat */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                {currentLang === 'en' ? 'Godhuli Muhurat' : 'गोधूली मुहूर्त (संध्या आरती)'}
              </span>
              <span className="text-base">🪔</span>
            </div>
            <div className="text-lg font-black text-amber-950 dark:text-amber-100 font-mono">
              {dayData.godhuliMuhurat.start} - {dayData.godhuliMuhurat.end}
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2">
              {currentLang === 'en'
                ? 'Sunset auspicious hour. Ideal for evening aarti and lighting lamps.'
                : 'सूर्यास्ताचा मंगल समय. घरात तुपाचा दिवा लावण्यासाठी व संध्या आरराधेसाठी सर्वोत्तम.'}
            </p>
          </div>

          {/* Amrit Kaal */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border border-rose-200 dark:border-rose-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                {currentLang === 'en' ? 'Amrit Kaal' : 'अमृत काळ (सिद्धी)'}
              </span>
              <span className="text-base">🍯</span>
            </div>
            <div className="text-lg font-black text-rose-950 dark:text-rose-100 font-mono">
              {dayData.amritKaal.start} - {dayData.amritKaal.end}
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2">
              {currentLang === 'en'
                ? 'High planetary blessing. Ideal for religious ceremonies.'
                : 'सर्व ग्रहांची अनुकूलता लाभणारा सर्वोत्तम अमृतमय काल.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. DAY SELECTION TABS & DAY/NIGHT SWITCHER */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Day of Week Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 w-full md:w-auto">
          {daysOfWeek.map((day) => {
            const active = selectedDayIndex === day.index;
            return (
              <button
                key={day.index}
                onClick={() => setSelectedDayIndex(day.index)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {day[currentLang === 'en' ? 'en' : currentLang === 'hi' ? 'hi' : 'mr']}
              </button>
            );
          })}
        </div>

        {/* Day / Night Toggle */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => setTimeMode('day')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              timeMode === 'day'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'Day (दिन चौघड़िया)' : 'दिवसाचे चौघडिया'}</span>
          </button>
          <button
            onClick={() => setTimeMode('night')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              timeMode === 'night'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'Night (रात्रि चौघड़िया)' : 'रात्रीचे चौघडिया'}</span>
          </button>
        </div>
      </div>

      {/* 5. CHOGHADIYA 8-SLOT SEQUENCE TABLE */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xl mb-12">
        <div className="p-4 sm:p-6 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {timeMode === 'day' ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
            <h4 className="font-bold font-serifDev text-stone-900 dark:text-white text-base sm:text-lg">
              {dayData.dayName[currentLang]} -{' '}
              {timeMode === 'day'
                ? currentLang === 'en'
                  ? 'Day Choghadiya (06:00 AM - 06:00 PM)'
                  : 'दिवसाचे ८ चौघडिया (सकाळी ०६:०० ते संध्याकाळी ०६:००)'
                : currentLang === 'en'
                ? 'Night Choghadiya (06:00 PM - 06:00 AM)'
                : 'रात्रीचे ८ चौघडिया (संध्याकाळी ०६:०० ते सकाळी ०६:००)'}
            </h4>
          </div>
          {isToday && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold">
              {currentLang === 'en' ? 'Today' : 'आजचे'}
            </span>
          )}
        </div>

        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {(timeMode === 'day' ? dayData.dayChoghadiya : dayData.nightChoghadiya).map(
            (slot: ChoghadiyaSlot, idx: number) => {
              const formatSlotTime = (h: number, m: number) => {
                const hourFormatted = (h % 12 || 12).toString().padStart(2, '0');
                const minFormatted = m.toString().padStart(2, '0');
                const period = h >= 12 ? 'PM' : 'AM';
                return `${hourFormatted}:${minFormatted} ${period}`;
              };

              const timeRange = `${formatSlotTime(slot.startHour, slot.startMin)} - ${formatSlotTime(
                slot.endHour,
                slot.endMin
              )}`;

              const isCurrent =
                isToday &&
                currentChoghadiya.slot.name.en === slot.name.en &&
                currentChoghadiya.isDay === (timeMode === 'day');

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isCurrent
                      ? 'bg-amber-50/80 dark:bg-amber-950/30 border-l-4 border-amber-500'
                      : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold font-serifDev text-lg text-stone-900 dark:text-white">
                          {slot.name[currentLang]}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${getSlotColorClass(
                            slot.type
                          )}`}
                        >
                          {getSlotQualityBadge(slot.type)}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold animate-pulse">
                            {currentLang === 'en' ? 'LIVE NOW' : 'आता चालू'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {slot.significance[currentLang]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between md:justify-end text-xs sm:text-sm">
                    <div className="text-right">
                      <span className="text-stone-500 dark:text-stone-400 text-[11px] block">
                        {currentLang === 'en' ? 'Time Window' : 'वेळ'}
                      </span>
                      <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                        {timeRange}
                      </span>
                    </div>
                    <div className="text-right min-w-[90px]">
                      <span className="text-stone-500 dark:text-stone-400 text-[11px] block">
                        {currentLang === 'en' ? 'Planet' : 'स्वामी'}
                      </span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 text-xs">
                        {slot.rulingPlanet.split('/')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* 6. VEDIC CHOGHADIYA PHILOSOPHY & GUIDE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white shadow-xl">
        <h4 className="text-lg font-bold font-serifDev text-amber-300 mb-3 flex items-center gap-2">
          <span>📜</span>
          <span>
            {currentLang === 'en'
              ? 'Understanding Choghadiya in Vedic Astrology'
              : currentLang === 'hi'
              ? 'चौघड़िया का महत्त्व एवं नियम'
              : 'चौघडियाचे महत्त्व व शास्त्रशुद्ध नियम'}
          </span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="font-bold text-amber-300 block mb-1">
              {currentLang === 'en' ? 'अमृत, शुभ, लाभ (Auspicious)' : 'अमृत, शुभ, लाभ (उत्तम)'}
            </span>
            <p>
              {currentLang === 'en'
                ? 'Ideal for starting any new venture, spiritual initiation, housewarming, or buying vehicles and gold.'
                : 'नवीन उद्योग, पूजेचा संकल्प, गृहप्रवेश, सोने खरेदी, करार व धार्मिक विधींसाठी हे तीनही चौघडिया अत्यंत फलदायी मानले जातात.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="font-bold text-amber-300 block mb-1">
              {currentLang === 'en' ? 'चर (Movement / Travel)' : 'चर (प्रवास व हालचाल)'}
            </span>
            <p>
              {currentLang === 'en'
                ? 'Neutral for general work, but exceptionally auspicious for journeys, pilgrimages, and vehicles.'
                : 'प्रवास, तीर्थयात्रा, वाहन चालवणे व गतिशील कामांसाठी चर चौघडिया सर्वोत्तम असतो.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="font-bold text-rose-300 block mb-1">
              {currentLang === 'en' ? 'रोग, उद्वेग, काल (Inauspicious)' : 'रोग, उद्वेग, काल (टाळावे)'}
            </span>
            <p>
              {currentLang === 'en'
                ? 'Avoid starting auspicious endeavors or financial investments in these slots to prevent hindrances.'
                : 'या काळात कोणतेही महत्त्वाचे किंवा मांगलिक कार्य सुरू करू नये. केवळ नित्यकर्म व नामस्मरण करावे.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Language } from '../types';
import {
  liveDarshanDatabase,
  LiveDarshanStream,
} from '../data/liveDarshanData';
import { audioEngine } from '../utils/audioSynth';
import {
  Radio,
  ExternalLink,
  Clock,
  MapPin,
  ShieldCheck,
  Bell,
  Heart,
  Share2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface LiveTempleDarshanProps {
  currentLang: Language;
}

export function LiveTempleDarshan({ currentLang }: LiveTempleDarshanProps) {
  const [selectedTempleId, setSelectedTempleId] = useState<string>('siddhivinayak_mumbai');
  const [isBellRinging, setIsBellRinging] = useState<boolean>(false);
  const [prayedCount, setPrayedCount] = useState<number>(108);

  const activeTemple: LiveDarshanStream =
    liveDarshanDatabase.find((t) => t.id === selectedTempleId) ||
    liveDarshanDatabase[0];

  const handleRingBell = () => {
    setIsBellRinging(true);
    audioEngine.playTempleBell();
    setPrayedCount((prev) => prev + 1);
    setTimeout(() => setIsBellRinging(false), 1200);
  };

  const handleShareDarshan = () => {
    const text = `🔴 *${activeTemple.templeName[currentLang] || activeTemple.templeName.mr}* चे थेट लाईव्ह दर्शन:\n${activeTemple.trustWebsiteUrl}\n\nसनातन अमृतधारा वरून दर्शन घ्या: https://sanketmh15.github.io/mantrasetu/`;
    if (navigator.share) {
      navigator.share({ title: activeTemple.templeName.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Live stream link copied!' : 'दर्शनाची लिंक कॉपी झाली!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Live Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-[#1f0a0a] to-stone-950 border border-red-600/30 p-6 sm:p-10 mb-8 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/30 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <span>
              {currentLang === 'en'
                ? 'Official 24x7 Live Temple Darshan'
                : currentLang === 'hi'
                ? 'अधिकृत सीधा मन्दिर दर्शन'
                : 'अधिकृत थेट देवस्थान दर्शन व महाआरती'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Sacred Live Darshan: Holy Shrines of Maharashtra'
              : currentLang === 'hi'
              ? 'साक्षात देवस्थान दर्शन: सिद्धिविनायक, शिर्डी, पंढरपुर व कोल्हापुर'
              : 'साक्षात देवस्थान दर्शन: सिद्धिविनायक, शिर्डी, पंढरपूर व अंबाबाई'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-red-200/80 max-w-3xl leading-relaxed">
            {currentLang === 'en'
              ? 'Take divine blessings from home through verified official live video streams authorized by respected temple trusts. Check daily Kakad Aarti and Shej Aarti timings, offer virtual prayers, and connect to official sansthan services.'
              : currentLang === 'hi'
              ? 'घर बैठे सिद्धिविनायक, साईबाबा, विठ्ठल-रुक्मिणी एवं माता अंबाबाई के साक्षात दर्शन करें। प्रतिदिन की आरती समय सारणी देखें एवं आधिकारिक ट्रस्ट से जुड़ें।'
              : 'घरी बसून घ्या साक्षात श्री सिद्धिविनायक, साईबाबा, पंढरपूरचे विठू माऊली व करवीर निवासिनी अंबाबाईंचे अधिकृत थेट दर्शन. काकड आरती, धूप आरती व शेजारतीचे अचूक वेळापत्रक व भाविकांसाठी ई-प्रणाम.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs text-red-300">
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-red-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {currentLang === 'en' ? 'Verified Official Trust Links' : '१००% अधिकृत देवस्थान ट्रस्ट'}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-red-500/20">
              <Clock className="w-4 h-4 text-amber-400" />
              {currentLang === 'en' ? 'Accurate Aarti Timings' : 'आरती व पूजा वेळापत्रक'}
            </span>
          </div>
        </div>
      </div>

      {/* Temple Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {liveDarshanDatabase.map((temple) => {
          const isSelected = temple.id === activeTemple.id;

          return (
            <button
              key={temple.id}
              onClick={() => setSelectedTempleId(temple.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-500 shadow-lg ring-2 ring-red-500/30'
                  : 'bg-white dark:bg-[#16130f] border-stone-200 dark:border-stone-800 hover:border-red-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  {currentLang === 'en' ? 'LIVE' : 'थेट दर्शन'}
                </span>
                <span className="text-xl">🪷</span>
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-sm sm:text-base line-clamp-1">
                {temple.templeName[currentLang] || temple.templeName.mr}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                {temple.deityName[currentLang] || temple.deityName.mr}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Live Player & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Stream Player Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-black rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative">
            {/* Live Feed Video Embed Container */}
            <div className="relative w-full aspect-video bg-stone-950 flex flex-col items-center justify-center p-6 text-center">
              {/* Responsive Iframe for Official Stream */}
              <iframe
                src={activeTemple.officialFeedUrl}
                title={activeTemple.templeName.mr}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* In case browser blocks or iframe fails, graceful overlay controls */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs tracking-wider backdrop-blur-md shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {currentLang === 'en' ? 'LIVE DARSHAN' : 'थेट प्रक्षेपण'}
                </span>
              </div>
            </div>

            {/* Video Controls / Info Bar */}
            <div className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-serifDev">
                  {activeTemple.templeName[currentLang] || activeTemple.templeName.mr}
                </h2>
                <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  {activeTemple.location}
                </p>
              </div>

              {/* Devotee Virtual Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleRingBell}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isBellRinging
                      ? 'bg-amber-400 text-stone-950 scale-105'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                  title="Ring Virtual Temple Bell"
                >
                  <Bell className={`w-4 h-4 ${isBellRinging ? 'animate-bounce' : ''}`} />
                  <span>{currentLang === 'en' ? 'Ring Temple Bell' : 'घंटा वाजवा'}</span>
                </button>

                <a
                  href={activeTemple.trustWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <span>{currentLang === 'en' ? 'Sansthan Portal' : 'अधिकृत ट्रस्ट'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleShareDarshan}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors"
                  title="Share Live Darshan"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Significance Card */}
          <div className="bg-white dark:bg-[#16130f] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-md">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serifDev flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                {currentLang === 'en'
                  ? 'Devotional Significance & Blessings'
                  : 'या देवस्थानचे माहात्म्य व आशीर्वाद'}
              </span>
            </h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serifDev">
              {activeTemple.significance[currentLang] || activeTemple.significance.mr}
            </p>
          </div>
        </div>

        {/* Right Aarti Schedule & Prayer Counter (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Aarti Schedule */}
          <div className="bg-white dark:bg-[#16130f] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serifDev flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>
                  {currentLang === 'en' ? 'Daily Aarti Timings' : 'दैनिक आरती वेळापत्रक'}
                </span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                नित्यक्रम
              </span>
            </div>

            <div className="space-y-3">
              {activeTemple.dailySchedule.map((aarti, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800/80"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 font-serifDev">
                      {aarti.aartiName}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 font-mono bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900/50">
                    {aarti.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 leading-relaxed">
              * विशेष सण, एकादशी अथवा उत्सवादरम्यान वेळापत्रकात देवस्थान नियमानुसार बदल होऊ शकतात.
            </div>
          </div>

          {/* Devotee Virtual Darshan Count / Sankalpa */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-red-500/10 to-transparent border border-amber-400/30 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 rounded-2xl bg-amber-500 text-stone-950">
                🙏
              </span>
              <div>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
                  {currentLang === 'en' ? 'Devotee E-Pranam' : 'आजचे भाविक ई-प्रणाम'}
                </span>
                <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-mono">
                  {prayedCount} {currentLang === 'en' ? 'Offerings' : 'प्रणाम'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setPrayedCount((prev) => prev + 1)}
              className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>
                {currentLang === 'en' ? 'Offer Virtual Namaskar' : 'चरणी ई-प्रणाम अर्पण करा'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

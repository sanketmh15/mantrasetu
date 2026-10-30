import { useState } from 'react';
import { Language } from '../types';
import {
  rashiDatabase,
  RashiInfo,
  nakshatraDatabase,
  getTodaysNakshatra,
  getDailyRashiForecast,
} from '../data/rashiGuideData';
import { AIKundaliPredictor } from './AIKundaliPredictor';
import { audioEngine } from '../utils/audioSynth';
import {
  Compass,
  Volume2,
  Sparkles,
  Share2,
  Search,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Star
} from 'lucide-react';

interface RashiGuideCalculatorProps {
  currentLang: Language;
  onOpenJapaWithMantra?: (mantraTitle: string) => void;
  onNavigateTab?: (tab: string) => void;
}

type MainTab = 'daily_nakshatra' | 'kundali' | 'all_nakshatras';

export function RashiGuideCalculator({
  currentLang,
  onOpenJapaWithMantra,
  onNavigateTab,
}: RashiGuideCalculatorProps) {
  const [activeTab, setActiveTab] = useState<MainTab>('daily_nakshatra');
  const [selectedRashiId, setSelectedRashiId] = useState<string>('aries');
  const [nameLetterQuery, setNameLetterQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [nakshatraSearch, setNakshatraSearch] = useState<string>('');

  const activeRashi: RashiInfo =
    rashiDatabase.find((r) => r.id === selectedRashiId) || rashiDatabase[0];

  const todaysNakshatra = getTodaysNakshatra();
  const dailyForecast = getDailyRashiForecast(activeRashi.id);

  const handleSelectRashi = (rashiId: string) => {
    audioEngine.stopSpeaking();
    setIsPlayingAudio(false);
    setSelectedRashiId(rashiId);
  };

  const handleAudioMantra = (mantraToSpeak: string) => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    audioEngine.playTempleBell();
    audioEngine.speakText(mantraToSpeak, 'hi-IN', 0.88, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleStartJapa = () => {
    if (onOpenJapaWithMantra) {
      onOpenJapaWithMantra(activeRashi.beejMantra.sanskrit);
    } else if (onNavigateTab) {
      onNavigateTab('japa');
    }
  };

  const handleShareDailyForecast = () => {
    const todayStr = new Date().toLocaleDateString('mr-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const text = `🔮 *सनातन अमृतधारा दैनिक राशीभविष्य व नक्षत्र उपाय*\n` +
      `📅 *दिनांक:* ${todayStr}\n` +
      `🌟 *आजचे नक्षत्र:* ${todaysNakshatra.name.mr} (${todaysNakshatra.deity})\n` +
      `♈ *रास:* ${activeRashi.name[currentLang] || activeRashi.name.mr}\n` +
      `🎨 *आजचा शुभ रंग:* ${dailyForecast.luckyColor.mr}\n` +
      `🔢 *आजचा शुभ अंक:* ${dailyForecast.luckyNumber}\n` +
      `⚡ *ऊर्जा प्रमाण:* ${dailyForecast.energyPercent}%\n` +
      `📜 *आजचा सल्ला:* ${dailyForecast.spiritualGuidance.mr}\n` +
      `⚠️ *काळजी:* ${dailyForecast.cautionNotice.mr}\n` +
      `📿 *१-मिनिटाचा बीजमंत्र उपाय:* ${dailyForecast.remedialMantra}\n\n` +
      `👉 आपले राशीभविष्य व जन्मकुंडली येथे पहा:\nhttps://sanketmh15.github.io/mantrasetu/#rashi`;

    if (navigator.share) {
      navigator.share({ title: activeRashi.name.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Daily forecast copied to clipboard!' : 'आजचे राशीभविष्य क्लिपबोर्डवर कॉपी झाले!');
    }
  };

  // Filter rashis if searching by initial letter
  const matchedRashis = nameLetterQuery.trim()
    ? rashiDatabase.filter((r) =>
        r.nameInitials.toLowerCase().includes(nameLetterQuery.trim().toLowerCase())
      )
    : rashiDatabase;

  const filteredNakshatras = nakshatraSearch.trim()
    ? nakshatraDatabase.filter((n) =>
        n.name.mr.includes(nakshatraSearch.trim()) ||
        n.name.en.toLowerCase().includes(nakshatraSearch.trim().toLowerCase()) ||
        n.rulingPlanet.includes(nakshatraSearch.trim())
      )
    : nakshatraDatabase;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-800/60 text-amber-300 text-xs font-semibold mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>
            {currentLang === 'en'
              ? 'Vedic Astrology • Daily Nakshatras • Janam Kundali'
              : 'वैदिक ज्योतिष • २७ नक्शत्रे • जन्म कुंडली व राशी उपाय'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-white tracking-tight">
          {currentLang === 'en'
            ? 'Daily Nakshatra, Rashi & Kundali Guide'
            : 'आजची दैनिक नक्षत्र पत्रिका, रास उपाय व जन्म कुंडली'}
        </h1>
        
        <p className="mt-2 text-stone-300 text-xs sm:text-base leading-relaxed">
          {currentLang === 'en'
            ? 'Discover today\'s active Nakshatra, lucky colors, 1-minute remedial mantras, and calculate your personalized Vedic Janam Kundali with 12 Bhavas.'
            : 'आजचे चालू नक्षत्र, प्रत्येक राशीचा आजचा भाग्यशाली रंग व शुभ अंक, १-मिनिटाचा बीजमंत्र उपाय आणि आपली मोफत १२ भावांची जन्म कुंडली.'}
        </p>

        {/* 3 Main Mode Selector Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('daily_nakshatra')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border shadow-md ${
              activeTab === 'daily_nakshatra'
                ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white border-amber-300 shadow-amber-900/40 ring-2 ring-amber-400/30'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <span>🔮</span>
            <span>{currentLang === 'en' ? 'Today\'s Rashi & Nakshatra' : 'आजचे राशीभविष्य व नक्षत्र'}</span>
          </button>

          <button
            onClick={() => setActiveTab('kundali')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border shadow-md ${
              activeTab === 'kundali'
                ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white border-amber-300 shadow-amber-900/40 ring-2 ring-amber-400/30'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <span>☸️</span>
            <span>{currentLang === 'en' ? 'AI Janam Kundali Predictor' : 'एआय जन्म कुंडली व १२ भाव भविष्य'}</span>
          </button>

          <button
            onClick={() => setActiveTab('all_nakshatras')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border shadow-md ${
              activeTab === 'all_nakshatras'
                ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white border-amber-300 shadow-amber-900/40 ring-2 ring-amber-400/30'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <span>🌟</span>
            <span>{currentLang === 'en' ? '27 Nakshatras Hub' : 'सर्व २७ नक्षत्रे दर्शन'}</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: DAILY NAKSHATRA & RASHI FORECAST ================= */}
      {activeTab === 'daily_nakshatra' && (
        <div className="space-y-8">
          
          {/* Today's Active Nakshatra Spotlight Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1e1915] via-[#161311] to-[#0e0d0c] border border-amber-800/60 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>
                    {currentLang === 'en' ? 'Today\'s Active Celestial Nakshatra' : 'आजचे चालू नक्षत्र (Live Cosmic Nakshatra)'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{todaysNakshatra.symbol.split(' ')[1] || '🌟'}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-white">
                      {todaysNakshatra.name[currentLang] || todaysNakshatra.name.mr}
                    </h2>
                    <span className="text-xs text-stone-300">
                      नक्षत्र क्र. {todaysNakshatra.number} / २७ • देवता: {todaysNakshatra.deity}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 mt-3 max-w-xl leading-relaxed">
                  <span className="text-amber-300 font-semibold">नक्षत्र प्रभाव: </span>
                  {todaysNakshatra.nature[currentLang] || todaysNakshatra.nature.mr} • स्वामी ग्रह: {todaysNakshatra.rulingPlanet} • गण: {todaysNakshatra.gana}
                </p>
              </div>

              {/* Nakshatra Mantra Audio Chime */}
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-900/40 text-center shrink-0 space-y-2">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-mono block">
                  आजचा नक्षत्र बीजमंत्र
                </span>
                <p className="text-sm font-bold text-amber-300 font-serifDev">
                  {todaysNakshatra.mantra}
                </p>
                <button
                  onClick={() => handleAudioMantra(todaysNakshatra.mantra)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'मंत्र सुरू आहे...' : 'मंत्र ऐका व स्मरण करा'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 12 Rashis Selector Bar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                {currentLang === 'en' ? 'Select Your Moon Sign (Rashi)' : 'आपली रास निवडा (१२ राशी):'}
              </span>

              {/* Initial Letter Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={nameLetterQuery}
                  onChange={(e) => setNameLetterQuery(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Search by name initial...' : 'नावाच्या आद्याक्षरावरून शोधा...'}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {matchedRashis.map((rashi) => {
                const isSelected = rashi.id === selectedRashiId;
                return (
                  <button
                    key={rashi.id}
                    onClick={() => handleSelectRashi(rashi.id)}
                    className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/90 to-saffron-950/80 border-amber-500 text-white shadow-lg ring-1 ring-amber-400/40'
                        : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-800/60 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{rashi.symbolIcon}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate">
                        {rashi.name[currentLang] || rashi.name.mr}
                      </h4>
                      <span className="text-[10px] text-stone-400 block truncate">
                        {rashi.rulingPlanet[currentLang] || rashi.rulingPlanet.mr}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Daily Rashi Spotlight Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1b1714] via-[#13110f] to-[#0c0b0a] border border-amber-800/60 shadow-2xl relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5 mb-6">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl p-3 rounded-2xl bg-stone-950 border border-stone-800 shadow-md">
                  {activeRashi.symbolIcon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-white">
                      {activeRashi.name[currentLang] || activeRashi.name.mr}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 border border-amber-700/60 text-amber-300">
                      {activeRashi.element[currentLang] || activeRashi.element.mr}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    स्वामी ग्रह: {activeRashi.rulingPlanet[currentLang] || activeRashi.rulingPlanet.mr} • इष्टदेवता: {activeRashi.ishtaDevata[currentLang] || activeRashi.ishtaDevata.mr}
                  </p>
                </div>
              </div>

              {/* Energy Badge */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/50 border border-stone-800">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">आजची ऊर्जा पातळी</span>
                  <span className="text-base font-black text-amber-400 font-mono">{dailyForecast.energyPercent}% शुभ ऊर्जा</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-300">
                  ⚡
                </div>
              </div>
            </div>

            {/* Daily Metas: Lucky Color, Lucky Number, Best Muhurat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
                <span className="text-xs text-stone-400 block mb-1">🎨 आजचा भाग्यशाली रंग (Lucky Color)</span>
                <p className="text-sm font-bold text-amber-300">{dailyForecast.luckyColor.mr}</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
                <span className="text-xs text-stone-400 block mb-1">🔢 आजचा शुभ अंक (Lucky Number)</span>
                <p className="text-base font-black text-emerald-400 font-mono">{dailyForecast.luckyNumber}</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
                <span className="text-xs text-stone-400 block mb-1">⏰ शुभ चौघडिया मुहूर्त काळ</span>
                <p className="text-xs font-semibold text-stone-200">{dailyForecast.bestMuhuratTime}</p>
              </div>
            </div>

            {/* Daily Spiritual Guidance & Caution Alert */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>आजचा शास्त्रोक्त सल्ला व मार्गदर्शन:</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {dailyForecast.spiritualGuidance.mr}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>आज काय काळजी घ्यावी? (Daily Caution):</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {dailyForecast.cautionNotice.mr}
                </p>
              </div>
            </div>

            {/* 1-Minute Remedial Beej Mantra */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/70 border border-amber-600/60 mb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>आजचा विशेष १-मिनिटाचा बीजमंत्र उपाय:</span>
                </span>
                <span className="text-[11px] text-stone-400 font-mono">२१ वेळा जप फलदायी</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white font-serifDev">
                {dailyForecast.remedialMantra}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleAudioMantra(dailyForecast.remedialMantra)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'मंत्र पठण सुरू आहे...' : 'हा मंत्र ऑडिओमध्ये ऐका'}</span>
                </button>

                <button
                  onClick={handleStartJapa}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 font-bold text-xs transition-all"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>१०८ जपमाळ उघडा</span>
                </button>
              </div>
            </div>

            {/* Share Today's Forecast on WhatsApp */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800/80">
              <span className="text-xs text-stone-400">
                नावांची शुभ आद्याक्षरे: <strong className="text-stone-200">{activeRashi.nameInitials}</strong>
              </span>

              <button
                onClick={handleShareDailyForecast}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>आजचे राशीभविष्य व्हॉट्सॲपवर पाठवा</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ================= TAB 2: VEDIC JANAM KUNDALI CALCULATOR ================= */}
      {activeTab === 'kundali' && (
        <AIKundaliPredictor
          currentLang={currentLang}
          onNavigateTab={onNavigateTab}
          onOpenJapaWithMantra={onOpenJapaWithMantra}
        />
      )}

      {/* ================= TAB 3: ALL 27 NAKSHATRAS DIRECTORY ================= */}
      {activeTab === 'all_nakshatras' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-white">
                वैदिक २७ नक्षत्रे ज्ञानकोश (All 27 Nakshatras)
              </h3>
              <p className="text-xs text-stone-400">
                प्रत्येक नक्षत्राची देवता, प्रतीक चिन्ह, स्वभाव आणि सिद्ध बीजमंत्र.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={nakshatraSearch}
                onChange={(e) => setNakshatraSearch(e.target.value)}
                placeholder="नक्षत्र किंवा ग्रहाचे नाव शोधा..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNakshatras.map((nak) => (
              <div
                key={nak.number}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#181513] to-[#100e0d] border border-stone-800 hover:border-amber-600/50 transition-all space-y-2.5 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{nak.symbol.split(' ')[1] || '⭐'}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-950 text-amber-300 font-semibold border border-stone-800">
                    नक्षत्र #{nak.number} • {nak.rulingPlanet}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-serifDev">
                    {nak.name[currentLang] || nak.name.mr}
                  </h4>
                  <p className="text-xs text-stone-400">
                    देवता: <strong className="text-stone-200">{nak.deity}</strong> • गण: {nak.gana}
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed bg-black/30 p-2.5 rounded-xl border border-stone-800/80">
                  {nak.nature[currentLang] || nak.nature.mr}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-amber-400 font-serifDev truncate text-[11px]">{nak.mantra}</span>
                  <button
                    onClick={() => handleAudioMantra(nak.mantra)}
                    className="p-1.5 rounded-lg bg-amber-950/80 text-amber-300 hover:bg-amber-900 border border-amber-700/60"
                    title="Listen Mantra"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

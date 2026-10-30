import { useState } from 'react';
import { Language } from '../types';
import { rashiDatabase, RashiInfo } from '../data/rashiGuideData';
import { audioEngine } from '../utils/audioSynth';
import {
  Compass,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  Search,
  Calendar,
  Heart,
} from 'lucide-react';

interface RashiGuideCalculatorProps {
  currentLang: Language;
  onOpenJapaWithMantra?: (mantraTitle: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export function RashiGuideCalculator({
  currentLang,
  onOpenJapaWithMantra,
  onNavigateTab,
}: RashiGuideCalculatorProps) {
  const [selectedRashiId, setSelectedRashiId] = useState<string>('aries');
  const [nameLetterQuery, setNameLetterQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const activeRashi: RashiInfo =
    rashiDatabase.find((r) => r.id === selectedRashiId) || rashiDatabase[0];

  const handleSelectRashi = (rashiId: string) => {
    audioEngine.stopSpeaking();
    setIsPlayingAudio(false);
    setSelectedRashiId(rashiId);
  };

  const handleAudioMantra = () => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    audioEngine.playTempleBell();
    const text = activeRashi.beejMantra.sanskrit;
    audioEngine.speakText(text, 'hi-IN', 0.82, () => {
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

  const handleShareRashi = () => {
    const text = `♈ *माझी जन्मरास: ${activeRashi.name[currentLang] || activeRashi.name.mr}*\nस्वामी: ${activeRashi.rulingPlanet[currentLang] || activeRashi.rulingPlanet.mr}\nइष्टदेवता: ${activeRashi.ishtaDevata[currentLang] || activeRashi.ishtaDevata.mr}\nसिद्ध बीजमंत्र: ${activeRashi.beejMantra.sanskrit}\n\nमंत्रसेतूवर आपली रास व इष्टदेवता मंत्र शोधा:\nhttps://sanketmh15.github.io/mantrasetu/`;
    if (navigator.share) {
      navigator.share({ title: activeRashi.name.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Rashi details copied!' : 'राशी माहिती क्लिपबोर्डवर कॉपी झाली!');
    }
  };

  // Filter rashis if searching by initial letter
  const matchedRashis = nameLetterQuery.trim()
    ? rashiDatabase.filter((r) =>
        r.nameInitials.toLowerCase().includes(nameLetterQuery.trim().toLowerCase())
      )
    : rashiDatabase;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-[#130d22] to-stone-950 border border-purple-500/30 p-6 sm:p-10 mb-8 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 text-purple-300" />
            <span>
              {currentLang === 'en'
                ? 'Vedic Rashi & Ishta Devata Calculator'
                : currentLang === 'hi'
                ? 'वैदिक राशि एवं इष्टदेवता मन्त्र'
                : 'वैदिक जन्मरास, इष्टदेवता व सिद्ध बीजमंत्र'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Find Your Ruling Planet, Ishta Devata & Beej Mantra'
              : currentLang === 'hi'
              ? 'अपनी जन्मराशि, स्वामी ग्रह, इष्टदेव एवं सिद्ध बीजमंत्र जानें'
              : 'आपली जन्मरास, राशी स्वामी, इष्टदेवता व सिद्ध बीजमंत्र'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-purple-200/80 max-w-3xl leading-relaxed">
            {currentLang === 'en'
              ? 'According to Vedic Jyotish, every individual is blessed with an Ishta Devata and Beej Mantra governed by their Janma Rashi. Chanting this sacred mantra daily removes planetary doshas and bestows supreme peace and success.'
              : currentLang === 'hi'
              ? 'जन्मराशि के अनुसार अपने इष्टदेव की उपासना करने से नवग्रहों की अनुकूलता मिलती है और जीवन में सुख-शांति व सफलता की प्राप्ति होती है।'
              : 'वैदिक शास्त्रानुसार प्रत्येकाच्या जन्मराशीवर एका विशिष्ट ग्रहाचे आणि इष्टदेवतेचे अधिष्ठान असते. स्वतःच्या राशीनुसार सिद्ध बीजमंत्राचा १०८ वेळा नित्य जप केल्यास मानसिक शांती, यश व ग्रहदोष निवारण होते.'}
          </p>
        </div>
      </div>

      {/* Name Letter Quick Search Bar */}
      <div className="bg-white dark:bg-[#1a1510] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 sm:p-6 mb-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 mb-1.5">
              <Search className="w-4 h-4 text-purple-500" />
              <span>
                {currentLang === 'en'
                  ? 'Find Rashi by Name Letter (e.g. अ, स, र, म):'
                  : 'नावच्या आद्याक्षरावरून रास शोधा (उदा. अ, क, म, स, र):'}
              </span>
            </label>
            <input
              type="text"
              value={nameLetterQuery}
              onChange={(e) => setNameLetterQuery(e.target.value)}
              placeholder="उदा. 'स' टाकल्यास कुंभ रास दिसेल..."
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-stone-800 dark:text-stone-100"
            />
          </div>

          {nameLetterQuery && (
            <button
              onClick={() => setNameLetterQuery('')}
              className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline self-end sm:self-center"
            >
              फिल्टर काढा
            </button>
          )}
        </div>
      </div>

      {/* 12 Rashis Selector Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
        {matchedRashis.map((rashi) => {
          const isSelected = rashi.id === activeRashi.id;

          return (
            <button
              key={rashi.id}
              onClick={() => handleSelectRashi(rashi.id)}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-lg ring-2 ring-purple-500/30 scale-105'
                  : 'bg-white dark:bg-[#16130f] border-stone-200 dark:border-stone-800 hover:border-purple-300'
              }`}
            >
              <span className="text-3xl sm:text-4xl block mb-1">
                {rashi.symbolIcon}
              </span>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-xs sm:text-sm">
                {rashi.name[currentLang] || rashi.name.mr}
              </h3>
              <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5 line-clamp-1">
                {rashi.rulingPlanet[currentLang] || rashi.rulingPlanet.mr}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Rashi Spotlight Detail Card */}
      <div className="bg-white dark:bg-[#16130f] rounded-3xl border border-purple-300 dark:border-purple-800/60 p-6 sm:p-10 shadow-2xl">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl p-3 rounded-2xl bg-purple-100 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-800">
              {activeRashi.symbolIcon}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                  {activeRashi.element[currentLang] || activeRashi.element.mr}
                </span>
                <span className="text-xs text-stone-500">
                  {activeRashi.sanskritName}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serifDev mt-1">
                {activeRashi.name[currentLang] || activeRashi.name.mr}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareRashi}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-purple-400 text-xs font-bold text-stone-700 dark:text-stone-300 transition-all"
            >
              <Share2 className="w-4 h-4 text-purple-600" />
              <span>{currentLang === 'en' ? 'Share Rashi' : 'शेअर करा'}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* Ruling Planet */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-900/50 border border-amber-200/60 dark:border-stone-800">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
              {currentLang === 'en' ? 'Ruling Planet' : 'राशी स्वामी ग्रह:'}
            </span>
            <p className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-base">
              🪐 {activeRashi.rulingPlanet[currentLang] || activeRashi.rulingPlanet.mr}
            </p>
          </div>

          {/* Ishta Devata */}
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-stone-900/50 border border-purple-200/60 dark:border-stone-800">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
              {currentLang === 'en' ? 'Presiding Ishta Devata' : 'उपास्य इष्टदेवता:'}
            </span>
            <p className="font-bold text-purple-700 dark:text-purple-300 font-serifDev text-base">
              🪷 {activeRashi.ishtaDevata[currentLang] || activeRashi.ishtaDevata.mr}
            </p>
          </div>

          {/* Auspicious Day */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
              {currentLang === 'en' ? 'Auspicious Day' : 'शुभ वार:'}
            </span>
            <p className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-base flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{activeRashi.auspiciousDay[currentLang] || activeRashi.auspiciousDay.mr}</span>
            </p>
          </div>

          {/* Auspicious Color */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
              {currentLang === 'en' ? 'Auspicious Color' : 'भाग्यशाली रंग:'}
            </span>
            <p className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-base">
              🎨 {activeRashi.auspiciousColor[currentLang] || activeRashi.auspiciousColor.mr}
            </p>
          </div>
        </div>

        {/* Sacred Beej Mantra Sanctum */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-100/80 via-amber-50 to-purple-50 dark:from-purple-950/60 dark:via-stone-900 dark:to-purple-900/30 border-2 border-purple-400/80 p-6 sm:p-8 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                {currentLang === 'en'
                  ? 'Your Sacred Vedic Beej Mantra'
                  : 'तुमचा राशीनुसार सिद्ध बीजमंत्र:'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAudioMantra}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isPlayingAudio
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>थांबवा</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>मंत्र उच्चार ऐका</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-black/60 rounded-2xl p-5 border border-purple-200 dark:border-purple-900/60 text-center">
            <p className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-purple-100 font-serifDev tracking-wide leading-relaxed">
              {activeRashi.beejMantra.sanskrit}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-2">
              "{activeRashi.beejMantra.roman}"
            </p>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-4 leading-relaxed font-serifDev">
            <strong className="text-purple-800 dark:text-purple-300 block mb-0.5">
              मंत्र भावार्थ:
            </strong>
            {activeRashi.beejMantra.meaning[currentLang] || activeRashi.beejMantra.meaning.mr}
          </p>

          <div className="mt-6 pt-4 border-t border-purple-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-stone-600 dark:text-stone-400">
              * नित्य सकाळी आंघोळीनंतर या मंत्राचा १०८ वेळा जप केल्यास विशेष लाभ होतो.
            </span>

            <button
              onClick={handleStartJapa}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-amber-600 to-purple-700 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>या मंत्राची १०८ जपमाळ सुरू करा →</span>
            </button>
          </div>
        </div>

        {/* Initials & Personality Traits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
              नामाद्याक्षरे (Name Letters):
            </span>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serifDev">
              {activeRashi.nameInitials}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
              स्वभाव वैशिष्ट्ये (Characteristics):
            </span>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serifDev leading-relaxed">
              {activeRashi.personalityTrait[currentLang] || activeRashi.personalityTrait.mr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

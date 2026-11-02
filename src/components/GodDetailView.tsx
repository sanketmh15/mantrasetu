import React, { useEffect, useState } from 'react';
import { Language, Mantra } from '../types';
import { GodEntry, fiftyGodsList } from '../data/fiftyGods';
import { JapaCounter } from './JapaCounter';
import { DeityImage } from './DeityImage';
import { PlaceImage } from './PlaceImage';
import { audioEngine } from '../utils/audioSynth';
import { getDeityBrahmanAudioUrl, getVoicePersona, setVoicePersona, VoicePersona } from '../utils/brahmanAudioService';
import {
  Sparkles,
  ArrowLeft,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Heart,
  Compass,
  Share2,
  CheckCircle2,
  Maximize2,
  X
} from 'lucide-react';

interface GodDetailViewProps {
  godId: string;
  currentLang: Language;
  onBack: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const GodDetailView: React.FC<GodDetailViewProps> = ({
  godId,
  currentLang,
  onBack,
}) => {
  const god: GodEntry = fiftyGodsList.find((g) => g.id === godId) || fiftyGodsList[0];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(() => getVoicePersona());

  // Stop any active audio when switching deity views
  useEffect(() => {
    return () => {
      audioEngine.stopSpeaking();
    };
  }, [god.id]);

  const handleSelectPersona = (p: VoicePersona) => {
    setSelectedPersona(p);
    setVoicePersona(p);
    audioEngine.setPersona(p);
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      audioEngine.playTempleBell();
      audioEngine.setPersona(selectedPersona);
      const audioUrl = getDeityBrahmanAudioUrl(god.id);
      audioEngine.playBrahmanChant({
        text: god.audioGreetingText,
        audioUrl,
        lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
        withTanpura: true,
        onEnd: () => setIsPlayingAudio(false),
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: god.name[currentLang],
        text: `${god.welcomeGreeting[currentLang]} - ${god.mantra}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${god.name[currentLang]} - ${god.mantra}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Convert deity to Mantra object for 108 Japa Counter
  const godMantraData: Mantra[] = [
    {
      id: `${god.id}-main-mantra`,
      title: god.name,
      devanagari: god.mantra,
      roman: god.mantraRoman,
      phonetic: god.mantraRoman,
      meaning: god.significance,
      significance: god.title,
      recommendedRepetitions: [11, 21, 108],
      category: 'daily',
      source: god.primaryShrine.mr,
    },
  ];

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Back Navigation & Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 text-saffron-600 group-hover:-translate-x-1 transition-transform" />
          <span>{currentLang === 'en' ? 'Back to All 50 Deities' : currentLang === 'hi' ? 'सभी ५० देवी-देवता सूची' : 'सर्व ५० देव-देवता सूचीकडे'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Audio Greeting Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isPlayingAudio
                ? 'bg-saffron-600 text-white border-saffron-400 animate-pulse'
                : 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 border-stone-300 dark:border-stone-800 hover:border-amber-500'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlayingAudio ? (currentLang === 'en' ? 'Stop Voice' : 'आवाज थांबवा') : (currentLang === 'en' ? 'Listen Greeting' : 'पावन अभिवादन ऐका')}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-saffron-600 transition-colors shadow-sm"
            title="Share"
          >
            {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl border border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] bg-stone-950">
          
          {/* Left: Devotional Image of Deity (Responsive, Uncut from Crown to Lotus Feet) */}
          <div className="lg:col-span-5 relative h-[380px] xs:h-[420px] sm:h-[460px] lg:h-auto min-h-[380px] lg:min-h-[500px] overflow-hidden flex items-center justify-center bg-stone-950">
            {/* Ambient Blurred Aura Background */}
            <img
              src={god.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
            />

            {/* Consecrated Uncut Sacred Portrait */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-5 cursor-zoom-in group"
              title={currentLang === 'en' ? 'Click for Fullscreen Sacred Darshan' : 'मोठ्या आकारात संपूर्ण दर्शनासाठी क्लिक करा'}
            >
              <DeityImage
                src={god.image}
                deityId={god.id}
                deityName={god.name[currentLang]}
                alt={god.name[currentLang]}
                className="max-h-full max-w-full w-auto h-full object-contain object-top rounded-2xl shadow-2xl ring-2 ring-amber-500/40 group-hover:scale-[1.02] transition-transform duration-300"
              />

              {/* Fullscreen Darshan Pill for Mobile */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsZoomOpen(true); }}
                className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:bg-amber-600 hover:text-white transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLang === 'en' ? 'Full Darshan' : 'संपूर्ण दर्शन'}</span>
              </button>
            </div>

            {/* Serial Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-black shadow-lg">
              Deity #{god.serialNo < 10 ? `0${god.serialNo}` : god.serialNo}
            </div>
          </div>

          {/* Right: Deity Title, Welcome Greeting & Sacred Mantra */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white relative">
            <div>
              {/* Sacred Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-950/80 border border-saffron-700/60 text-saffron-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
                <span>{god.title[currentLang]}</span>
              </div>

              {/* Deity Grand Name */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serifDev tracking-tight text-white mb-2">
                {god.name[currentLang]}
              </h1>

              {/* Devotional Welcome Greeting */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900/80 to-amber-950/40 border border-amber-600/40 my-4 shadow-inner">
                <div className="flex items-start gap-3">
                  <span className="text-2xl select-none">🪷</span>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      {currentLang === 'en' ? 'Sacred Welcome Greeting' : currentLang === 'hi' ? 'पावन स्वागत संदेश' : 'पावन स्वागत संदेश'}
                    </h4>
                    <p className="text-sm sm:text-base font-serifDev text-amber-100 font-medium leading-relaxed">
                      "{god.welcomeGreeting[currentLang]}"
                    </p>
                    
                    {/* Voice Controls: Play Button & Persona Switcher */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleToggleAudio}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                          isPlayingAudio
                            ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 animate-pulse'
                            : 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white border border-amber-300/40 shadow-amber-500/20'
                        }`}
                      >
                        {isPlayingAudio ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>{currentLang === 'en' ? 'Stop Voice' : 'आवाज थांबवा'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                            <span>
                              {selectedPersona === 'amitabh_bachchan'
                                ? (currentLang === 'en' ? 'Listen (Amitabh Bachchan Voice)' : 'ऐका (अमिताभ बच्चन गंभीर वाणी)')
                                : selectedPersona === 'vedic_brahman'
                                ? (currentLang === 'en' ? 'Listen (Vedic Panditji)' : 'ऐका (वैदिक ब्राह्मण पंडितजी)')
                                : (currentLang === 'en' ? 'Listen (Melodious Voice)' : 'ऐका (मधुर अमृतवाणी)')}
                            </span>
                          </>
                        )}
                      </button>

                      {/* Quick Voice Persona Switcher */}
                      <div className="inline-flex items-center rounded-xl bg-stone-900/90 border border-amber-500/30 p-0.5 text-[11px]">
                        <button
                          onClick={() => handleSelectPersona('amitabh_bachchan')}
                          className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                            selectedPersona === 'amitabh_bachchan'
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-stone-300 hover:text-white'
                          }`}
                          title="Amitabh Bachchan Baritone"
                        >
                          🎙️ बच्चन
                        </button>
                        <button
                          onClick={() => handleSelectPersona('vedic_brahman')}
                          className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                            selectedPersona === 'vedic_brahman'
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-stone-300 hover:text-white'
                          }`}
                          title="Vedic Panditji Chanting"
                        >
                          🪷 पंडितजी
                        </button>
                        <button
                          onClick={() => handleSelectPersona('divine_melodious')}
                          className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                            selectedPersona === 'divine_melodious'
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-stone-300 hover:text-white'
                          }`}
                          title="Melodious Voice"
                        >
                          🔔 मधुर
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beej / Maha Mantra */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 my-3">
                <span className="text-[11px] font-bold text-saffron-400 uppercase tracking-wider block mb-1">
                  {currentLang === 'en' ? 'Sacred Maha Mantra' : 'महामंत्र'}
                </span>
                <p className="text-lg sm:text-xl font-bold font-serifDev text-white">
                  {god.mantra}
                </p>
                <p className="text-xs text-stone-400 italic mt-1">
                  {god.mantraRoman}
                </p>
              </div>
            </div>

            {/* Quick Metadata: Primary Shrine & District */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800 text-xs text-stone-300">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">
                  {currentLang === 'en' ? 'Primary Shrine' : 'प्रमुख तीर्थ'}
                </span>
                <span className="font-semibold text-amber-200 truncate block">
                  {god.primaryShrine[currentLang]}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">
                  {currentLang === 'en' ? 'Divine Vehicle' : 'वाहन'}
                </span>
                <span className="font-semibold text-stone-200">
                  {god.vahana[currentLang]}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">
                  {currentLang === 'en' ? 'Weapons & Symbols' : 'शस्त्र व प्रतीके'}
                </span>
                <span className="font-semibold text-stone-200 truncate block">
                  {god.weaponOrSymbols[currentLang]}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Grid: Interactive 108 Japa Counter & Spiritual Lore / Sacred Place Images */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Col: Dedicated 108 Japa Counter for this Deity */}
        <div className="lg:col-span-6">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📿</span>
              <h3 className="text-2xl font-bold font-serifDev text-stone-900 dark:text-white">
                {currentLang === 'en' ? `108 Japa Mala: ${god.name.en}` : `१०८ जपमाळ: ${god.name[currentLang]}`}
              </h3>
            </div>
            <JapaCounter
              currentLang={currentLang}
              preselectedMantraId={`${god.id}-main-mantra`}
              availableMantras={godMantraData}
            />
          </div>
        </div>

        {/* Right Col: Lore, Offerings, Holy Place Photos & Significance */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 1. Divine Significance & Spiritual Lore */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md">
            <h4 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
              <span>{currentLang === 'en' ? 'Divine Significance & Lore' : 'आध्यात्मिक महत्त्व व कथा'}</span>
            </h4>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              {god.significance[currentLang]}
            </p>
          </div>

          {/* 2. Holy Pilgrimage Place & Temple Photo (Requested in prompt) */}
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md">
            <div className="relative h-60 w-full overflow-hidden">
              <PlaceImage
                src={god.placeImage}
                placeName={god.primaryShrine[currentLang]}
                districtOrRiver={god.districtOrState}
                alt={god.primaryShrine[currentLang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {currentLang === 'en' ? 'Sacred Holy Dham / Temple' : 'पावन तीर्थ क्षेत्र व मंदिर'}
                </span>
                <h4 className="text-lg sm:text-xl font-bold font-serifDev mt-0.5">
                  {god.primaryShrine[currentLang]}
                </h4>
                <p className="text-xs text-stone-300">
                  {god.districtOrState}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Auspicious Offerings & Major Festivals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Offerings */}
            <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-stone-900/70 border border-amber-200 dark:border-stone-800">
              <h5 className="text-sm font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{currentLang === 'en' ? 'Traditional Offerings (नैवेद्य)' : 'प्रिय नैवेद्य व अर्पण'}</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                {god.pujaOfferings.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Festivals */}
            <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-stone-900/70 border border-amber-200 dark:border-stone-800">
              <h5 className="text-sm font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>{currentLang === 'en' ? 'Major Festivals (सण)' : 'प्रमुख सण व उत्सव'}</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                {god.festivals.map((fest, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-500" />
                    <span>{fest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen HD Darshan Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white border-b border-stone-800 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪷</span>
                <span className="font-bold font-serifDev text-base sm:text-lg text-amber-300">
                  {god.name[currentLang]} — {currentLang === 'en' ? 'Sacred Consecrated Darshan' : 'साक्षात पावन दर्शन'}
                </span>
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors shadow-lg"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Uncut HD Murti */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-stone-950 p-2 shadow-2xl border border-amber-500/40">
              <DeityImage
                src={god.image}
                deityId={god.id}
                deityName={god.name[currentLang]}
                alt={god.name[currentLang]}
                className="max-h-[72vh] max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-2xl"
              />
            </div>

            {/* Bottom Footer Info */}
            <div className="mt-3 text-center text-xs text-amber-200/90 font-serifDev">
              <span>॥ {god.mantra} ॥</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

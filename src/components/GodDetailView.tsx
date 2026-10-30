import React, { useEffect, useState } from 'react';
import { Language, Mantra } from '../types';
import { GodEntry, fiftyGodsList } from '../data/fiftyGods';
import { JapaCounter } from './JapaCounter';
import { DeityImage } from './DeityImage';
import { PlaceImage } from './PlaceImage';
import { audioEngine } from '../utils/audioSynth';
import { getDeityBrahmanAudioUrl } from '../utils/brahmanAudioService';
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
  CheckCircle2
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

  // Stop any active audio when switching deity views
  useEffect(() => {
    return () => {
      audioEngine.stopSpeaking();
    };
  }, [god.id]);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      audioEngine.playTempleBell();
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
          
          {/* Left: Devotional Image of Deity */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden">
            <DeityImage
              src={god.image}
              deityId={god.id}
              deityName={god.name[currentLang]}
              alt={god.name[currentLang]}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950/90 via-transparent to-transparent" />
            
            {/* Serial Badge Overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-black shadow-lg">
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
                    
                    {/* Big B Voice Recitation Button */}
                    <button
                      onClick={handleToggleAudio}
                      className={`mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
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
                          <span>{currentLang === 'en' ? 'Listen in Amitabh Bachchan Voice' : 'पावन अभिवादन ऐका (अमिताभ बच्चन व्हॉईस)'}</span>
                        </>
                      )}
                    </button>
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
    </div>
  );
};

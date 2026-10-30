import React, { useState } from 'react';
import { Language } from '../types';
import { vitthalLore, varkariSaints } from '../data/vitthal';
import { audioEngine } from '../utils/audioSynth';
import {
  Compass,
  Sparkles,
  Heart,
  Volume2,
  ChevronDown,
  Layers,
  MapPin,
  Check
} from 'lucide-react';

interface VitthalHeroProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
}

export const VitthalHero: React.FC<VitthalHeroProps> = ({ currentLang, onNavigate }) => {
  const [showIconography, setShowIconography] = useState(false);
  const [showSaints, setShowSaints] = useState(false);
  const [isPlayingMantra, setIsPlayingMantra] = useState(false);

  const handlePlayMantra = () => {
    if (isPlayingMantra) {
      audioEngine.stopSpeaking();
      setIsPlayingMantra(false);
    } else {
      setIsPlayingMantra(true);
      audioEngine.speakText('राम कृष्ण हरि, जय जय राम कृष्ण हरि', 'mr-IN', 0.9, () => {
        setIsPlayingMantra(false);
      });
    }
  };

  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Devotional Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-saffron-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Sacred Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-700/60 text-amber-300 text-xs font-semibold mb-4 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {currentLang === 'en'
              ? 'Phase 2 Deity: Shri Vitthal-Rakhumai (Pandharpur)'
              : currentLang === 'hi'
              ? 'द्वितीय चरण: श्री विठ्ठल-रखुमाई (पंढरपुर)'
              : 'द्वितीय चरण: श्री विठ्ठल-रखुमाई व पंढरपूर वारी महापरंपरा'}
          </span>
        </div>

        {/* Holy Devanagari Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-devanagari text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-saffron-300 to-yellow-200 tracking-tight leading-tight">
          ॥ रामकृष्णहरि ॥
        </h1>

        <h2 className="text-xl sm:text-3xl font-serifDev font-bold text-white mt-2">
          {vitthalLore.name[currentLang]}
        </h2>

        <p className="text-xs sm:text-sm text-amber-300/90 font-medium max-w-2xl mx-auto mt-2">
          {vitthalLore.tagline[currentLang]}
        </p>

        {/* Sacred Geography Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-stone-300">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-800">
            <MapPin className="w-3.5 h-3.5 text-saffron-400" />
            <span>{vitthalLore.sacredTown[currentLang]}</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-800">
            <span>🌊</span>
            <span>{vitthalLore.sacredRiver[currentLang]}</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-800">
            <span>🚩</span>
            <span>{currentLang === 'en' ? 'Ashadhi & Kartiki Ekadashi' : 'आषाढी व कार्तिकी एकादशी'}</span>
          </span>
        </div>

        {/* Central Audio Play & Quick Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handlePlayMantra}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-sm shadow-xl shadow-amber-950 transition-all transform hover:scale-105"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingMantra ? 'animate-bounce text-yellow-200' : ''}`} />
            <span>
              {isPlayingMantra
                ? (currentLang === 'en' ? 'Chanting Ram Krishna Hari...' : 'रामकृष्णहरि गजर चालू...')
                : (currentLang === 'en' ? 'Listen "Ram Krishna Hari"' : 'ऐका "रामकृष्णहरि" गजर')}
            </span>
          </button>

          <button
            onClick={() => onNavigate('wari')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-semibold text-sm shadow-lg transition-all"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{currentLang === 'en' ? 'Wari Palkhi Route Map' : 'पंढरपूर वारी पालखी मार्ग'}</span>
          </button>

          <button
            onClick={() => onNavigate('japa')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-semibold text-sm shadow-lg transition-all"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>{currentLang === 'en' ? '108 Japa Counter' : '१०८ नामस्मरण जप'}</span>
          </button>
        </div>

        {/* Expandable Iconography Accordion */}
        <div className="mt-8 max-w-4xl mx-auto">
          <button
            onClick={() => setShowIconography(!showIconography)}
            className="w-full py-3 px-5 rounded-2xl bg-stone-900/70 border border-stone-800 flex items-center justify-between text-xs sm:text-sm text-stone-300 hover:text-white transition-colors"
          >
            <span className="font-semibold flex items-center gap-2">
              <span>🧱</span>
              <span>
                {currentLang === 'en'
                  ? 'Why does Vitthal stand on a brick with hands on hips? (Iconography Explained)'
                  : currentLang === 'hi'
                  ? 'विठ्ठल विट पर कमर पर हाथ रखकर क्यों खड़े हैं? (दिव्य स्वरूप रहस्य)'
                  : 'विठ्ठल विटेवर कटीवर हात ठेवून का उभा आहे? (रूपरहस्य व पुंडलिक कथा)'}
              </span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showIconography ? 'rotate-180' : ''}`} />
          </button>

          {showIconography && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-left animate-fadeIn">
              {vitthalLore.iconography.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#171513] border border-stone-800 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5">
                    <span className="text-base">{item.symbol}</span>
                    <span>{item.name[currentLang]}</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    {item.meaning[currentLang]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Varkari Saints Accordion */}
        <div className="mt-3 max-w-4xl mx-auto">
          <button
            onClick={() => setShowSaints(!showSaints)}
            className="w-full py-3 px-5 rounded-2xl bg-stone-900/70 border border-stone-800 flex items-center justify-between text-xs sm:text-sm text-stone-300 hover:text-white transition-colors"
          >
            <span className="font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>
                {currentLang === 'en'
                  ? 'The Great Varkari Saints (Dnyaneshwar, Tukaram, Namdev, Eknath, Janabai, Chokhamela)'
                  : currentLang === 'hi'
                  ? 'वारकरी संत परम्परा (ज्ञानेश्वर, तुकाराम, नामदेव, एकनाथ, जनाबाई, चोखामेळा)'
                  : 'संत परंपरा दर्शन (माऊली, तुकोबाराय, नामदेवराय, एकनाथ, जनाबाई, चोखोबाराय)'}
              </span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showSaints ? 'rotate-180' : ''}`} />
          </button>

          {showSaints && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-left animate-fadeIn">
              {varkariSaints.map((saint, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#171513] border border-stone-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-300">{saint.name[currentLang]}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{saint.era}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mb-2">
                    {currentLang === 'en' ? 'Samadhi:' : 'समाधी स्थान:'} {saint.samadhiPlace[currentLang]} • {saint.majorWork[currentLang]}
                  </p>
                  <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800/80 text-[11px] text-stone-300 leading-relaxed">
                    <Check className="w-3 h-3 text-saffron-400 inline mr-1" />
                    {saint.famousTeaching[currentLang]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

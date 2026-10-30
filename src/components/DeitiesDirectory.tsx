import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { fiftyGodsList, GodEntry } from '../data/fiftyGods';
import { audioEngine } from '../utils/audioSynth';
import { DeityImage } from './DeityImage';
import { Search, MapPin, Volume2, Sparkles, ArrowRight } from 'lucide-react';

interface DeitiesDirectoryProps {
  currentLang: Language;
  onSelectGod: (godId: string) => void;
}

export const DeitiesDirectory: React.FC<DeitiesDirectoryProps> = ({
  currentLang,
  onSelectGod,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: { en: 'All 50 Deities (1 to 50)', hi: 'सभी ५० देवी-देवता (१ से ५०)', mr: 'सर्व ५० देव-देवता (१ ते ५०)' } },
    { id: 'kuldaivat', label: { en: 'Maharashtra Kuldaivats', hi: 'महाराष्ट्र के कुलदेवता', mr: 'महाराष्ट्राचे कुलदैवत' } },
    { id: 'trideva', label: { en: 'Trideva & Divine Sons', hi: 'त्रिदेव एवं देवपुत्र', mr: 'त्रिमूर्ती व देवपुत्र' } },
    { id: 'tridevi', label: { en: 'Tridevi & River Goddesses', hi: 'त्रिदेवी एवं पावन नदियां', mr: 'त्रिदेवी व पावन नद्या' } },
    { id: 'dashavatara', label: { en: 'Dashavatara (10 Avatars)', hi: 'दशावतार (१० अवतार)', mr: 'दशावतार (१० अवतार)' } },
    { id: 'shakti_peeth', label: { en: 'Shaktipeeths & Fierce Devis', hi: 'शक्तिपीठ एवं आदिशक्ति', mr: 'शक्तीपीठे व आदिशक्ती' } },
    { id: 'saints', label: { en: 'Saints of Maharashtra', hi: 'महाराष्ट्र के अवधूत संत', mr: 'महाराष्ट्राचे संत व अवधूत' } },
    { id: 'vedic', label: { en: 'Vedic & Celestial Gods', hi: 'वैदिक एवं नवग्रह देवता', mr: 'वैदिक व नवग्रह देव' } },
  ];

  const filteredGods = useMemo(() => {
    return fiftyGodsList.filter((god) => {
      // Category match
      let categoryMatch = false;
      if (selectedCategory === 'all') {
        categoryMatch = true;
      } else if (selectedCategory === 'kuldaivat') {
        categoryMatch = god.category === 'kuldaivat' || god.districtOrState.includes('Maharashtra');
      } else if (selectedCategory === 'trideva') {
        categoryMatch = god.category === 'trideva' || god.id === 'shiva' || god.id === 'vishnu' || god.id === 'brahma' || god.id === 'ganesha' || god.id === 'kartikeya';
      } else if (selectedCategory === 'tridevi') {
        categoryMatch = god.category === 'tridevi' || god.id === 'lakshmi' || god.id === 'parvati' || god.id === 'saraswati' || god.id === 'ganga' || god.id === 'yamuna';
      } else if (selectedCategory === 'dashavatara') {
        categoryMatch = god.category === 'dashavatara';
      } else if (selectedCategory === 'shakti_peeth') {
        categoryMatch = god.category === 'shakti_peeth' || god.id === 'tulja-bhavani' || god.id === 'kolhapur-ambabai';
      } else if (selectedCategory === 'saints') {
        categoryMatch = god.category === 'saints';
      } else if (selectedCategory === 'vedic') {
        categoryMatch = god.category === 'vedic' || god.category === 'mahavira';
      }

      if (!categoryMatch) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchNameEn = god.name.en.toLowerCase().includes(q);
      const matchNameHi = god.name.hi.toLowerCase().includes(q);
      const matchNameMr = god.name.mr.toLowerCase().includes(q);
      const matchShrine = god.primaryShrine.en.toLowerCase().includes(q) || god.primaryShrine.mr.toLowerCase().includes(q);
      const matchMantra = god.mantra.toLowerCase().includes(q) || god.mantraRoman.toLowerCase().includes(q);
      const matchSerial = god.serialNo.toString() === q || `#${god.serialNo}` === q;

      return matchNameEn || matchNameHi || matchNameMr || matchShrine || matchMantra || matchSerial;
    });
  }, [selectedCategory, searchQuery]);

  const handlePlayAudio = (e: React.MouseEvent, god: GodEntry) => {
    e.stopPropagation();
    if (playingAudioId === god.id) {
      audioEngine.stopSpeaking();
      setPlayingAudioId(null);
    } else {
      audioEngine.playTempleBell();
      setPlayingAudioId(god.id);
      audioEngine.speakText(god.audioGreetingText, currentLang === 'en' ? 'en-IN' : currentLang === 'mr' ? 'mr-IN' : 'hi-IN', 0.78, () => {
        setPlayingAudioId(null);
      });
    }
  };

  return (
    <div className="py-4 sm:py-8 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
      {/* Grand Sacred Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/70 border border-saffron-300 dark:border-saffron-800/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400 animate-spin-slow" />
          <span>{currentLang === 'en' ? 'Unified 50 Deities Portal' : currentLang === 'hi' ? 'समस्त ५० देवी-देवता दर्शन' : 'सर्व ५० पावन देव-देवता दर्शन'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serifDev tracking-tight text-stone-900 dark:text-white mb-4">
          {currentLang === 'en'
            ? 'Sacred Deities & Divine Sanctuaries'
            : currentLang === 'hi'
            ? 'पावन ५० देवी-देवता एवं तीर्थ दर्शन'
            : 'पावन ५० देव-देवता व तीर्थ दर्शन'}
        </h1>

        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          {currentLang === 'en'
            ? 'Explore all 50 supreme deities in serial order. Click any deity card to experience their personalized holy shrine, sacred chants, 108 japa mala, and welcome greetings.'
            : currentLang === 'hi'
            ? 'सभी ५० प्रमुख देवी-देवताओं का क्रमानुसार दर्शन करें। किसी भी कार्ड पर क्लिक करके उनके पावन धाम, १०८ जपमाला, मन्त्र एवं आरती का अनुभव करें।'
            : 'सर्व ५० प्रमुख देव-देवतांचे अनुक्रमे दर्शन घ्या. कोणत्याही देवतेच्या कार्डवर क्लिक करून त्यांच्या पावन धाम, १०८ जपमाळ, मंत्र, आरती व आरती स्तोत्रांचे दर्शन घ्या.'}
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === 'en'
                ? 'Search by name (e.g., Ganesha, Vitthal, Khandoba), serial number (#1 to #50), or shrine...'
                : currentLang === 'hi'
                ? 'नाम से खोजें (जैसे गणेश, विठ्ठल, खंडोबा, #1 से #50)...'
                : 'नावाने शोधा (उदा. गणेश, विठ्ठल, खंडोबा, तुळजाभवानी, #१ ते #५०)...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900/90 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-md text-sm sm:text-base transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md shadow-saffron-950/30 scale-105'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-saffron-400'
                }`}
              >
                {cat.label[currentLang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 50 Gods Serial-Wise */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 w-full">
        {filteredGods.map((god) => {
          const isAudioPlaying = playingAudioId === god.id;

          return (
            <div
              key={god.id}
              onClick={() => onSelectGod(god.id)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800/90 hover:border-saffron-500/60 dark:hover:border-saffron-500/60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              {/* Top Image with Badge Overlays */}
              <div className="relative h-40 sm:h-56 w-full overflow-hidden bg-stone-950">
                <DeityImage
                  src={god.image}
                  deityId={god.id}
                  deityName={god.name[currentLang]}
                  alt={god.name[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                {/* Serial Number Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] sm:text-xs font-black tracking-wider shadow-md">
                  #{god.serialNo < 10 ? `0${god.serialNo}` : god.serialNo}
                </div>

                {/* Audio Pronunciation Button */}
                <button
                  onClick={(e) => handlePlayAudio(e, god)}
                  title="Devotional Audio Greeting"
                  className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl backdrop-blur-md border transition-all ${
                    isAudioPlaying
                      ? 'bg-saffron-600 text-white border-saffron-300 animate-pulse'
                      : 'bg-stone-950/70 text-amber-300 border-amber-500/30 hover:bg-saffron-600 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Holy Place Tag */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-[10px] sm:text-[11px] text-amber-200">
                  <span className="flex items-center gap-1 bg-stone-950/80 px-1.5 sm:px-2 py-0.5 rounded-lg border border-amber-900/50 truncate max-w-[90%]">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{god.primaryShrine[currentLang]}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between">
                <div>
                  {/* Deity Name & Title */}
                  <div className="mb-1.5 sm:mb-2">
                    <h3 className="text-sm sm:text-xl font-bold font-serifDev text-stone-900 dark:text-white group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors line-clamp-1">
                      {god.name[currentLang]}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-amber-700 dark:text-amber-400 font-medium line-clamp-1 mt-0.5">
                      {god.title[currentLang]}
                    </p>
                  </div>

                  {/* Sacred Mantra Snippet */}
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-50/70 dark:bg-stone-950/60 border border-amber-200/60 dark:border-amber-950/50 mb-2 sm:mb-3">
                    <p className="text-[10px] sm:text-xs font-serifDev font-semibold text-amber-900 dark:text-amber-300 truncate">
                      {god.mantra}
                    </p>
                  </div>

                  {/* Vahana & Weapon Quick Info */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400 mb-2 sm:mb-4">
                    <div className="truncate">
                      <span className="font-semibold text-stone-800 dark:text-stone-300">
                        {currentLang === 'en' ? 'Vahana: ' : 'वाहन: '}
                      </span>
                      <span className="truncate">{god.vahana[currentLang]}</span>
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-stone-800 dark:text-stone-300">
                        {currentLang === 'en' ? 'Festivals: ' : 'सण: '}
                      </span>
                      <span className="truncate">{god.festivals[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button: Explore God's Page */}
                <div className="pt-2 sm:pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-semibold text-saffron-600 dark:text-saffron-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{currentLang === 'en' ? 'Explore Sanctuary' : currentLang === 'hi' ? 'दर्शन एवं जपमाला' : 'दर्शन व १०८ जपमाळ'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-saffron-100 dark:bg-stone-800 flex items-center justify-center text-saffron-600 dark:text-saffron-400 group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGods.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-stone-900/60 rounded-3xl border border-stone-200 dark:border-stone-800">
          <p className="text-stone-500 text-sm">
            {currentLang === 'en'
              ? 'No deity found matching your search. Try searching for "Ganesha", "Vitthal", or "#1".'
              : 'आपल्या शोधाशी जुळणारी देवता आढळली नाही. "गणेश", "विठ्ठल" किंवा "#१" शोधून पहा.'}
          </p>
        </div>
      )}
    </div>
  );
};

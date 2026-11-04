import React, { useState } from 'react';
import { Language } from '../types';
import { maharashtraJyotirlingas } from '../data/jyotirlingaCircuit';
import { audioEngine } from '../utils/audioSynth';
import { SACRED_PLACE_REGISTRY } from '../utils/sacredPlaceImageRegistry';
import { Navigation, Clock, ExternalLink, Compass, Volume2, Info } from 'lucide-react';

interface JyotirlingaCircuitProps {
  currentLang: Language;
}

export const JyotirlingaCircuit: React.FC<JyotirlingaCircuitProps> = ({ currentLang }) => {
  const [selectedTempleId, setSelectedTempleId] = useState<string>(maharashtraJyotirlingas[0].id);

  const activeTemple = maharashtraJyotirlingas.find((t) => t.id === selectedTempleId) || maharashtraJyotirlingas[0];

  const jyotirlingaSloka = 'सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम् ।\nउज्जयिन्यां महाकालं ओंकारममलेश्वरम् ॥\nपरल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम् ।\nसेतुबन्धे तु रामेशं नागेशं दारुकावने ॥\nवाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे ।\nहिमालये तु केदारं घुश्मेशं च शिवालये ॥';

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800/60 mb-3 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
          <span>{currentLang === 'en' ? 'Sacred Maharashtra Jyotirlingas' : 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंगे'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serifDev text-blue-950 dark:text-blue-100 tracking-wide">
          {currentLang === 'en'
            ? 'The 5 Sacred Jyotirlingas of Maharashtra'
            : currentLang === 'hi'
            ? 'महाराष्ट्र के ५ पावन ज्योतिर्लिंग दर्शन'
            : 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंग दर्शन'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 dark:text-blue-200/90 mt-2 max-w-2xl mx-auto leading-relaxed font-medium">
          {currentLang === 'en'
            ? 'Maharashtra is blessed with 5 of the 12 cosmic Jyotirlingas of India: Trimbakeshwar, Bhimashankar, Grishneshwar, Aundha Nagnath, and Parli Vaijnath.'
            : currentLang === 'hi'
            ? 'भारत के १२ में से ५ ज्योतिर्लिंग महाराष्ट्र की पावन भूमि पर स्थित हैं। इतिहास, दर्शन समय और गूगल मैप्स।'
            : 'भारतातील १२ पैकी ५ पावन ज्योतिर्लिंगे महाराष्ट्रात वास करतात. इतिहास, दर्शन वेळ आणि थेट गुगल मॅप्स.'}
        </p>

        {/* Traditional Sloka Box */}
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-[#172236] dark:via-[#111927] dark:to-[#172236] border-2 border-blue-200 dark:border-blue-800/70 max-w-xl mx-auto text-center shadow-md">
          <p className="text-sm sm:text-base font-bold text-blue-950 dark:text-blue-200 font-devanagari leading-relaxed">
            {jyotirlingaSloka}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => audioEngine.speakText(jyotirlingaSloka, currentLang === 'mr' ? 'mr-IN' : 'hi-IN', 0.72)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs bg-blue-200/80 hover:bg-blue-300 dark:bg-blue-900/60 dark:hover:bg-blue-800 text-blue-950 dark:text-blue-100 border border-blue-400 dark:border-blue-600/60 transition-all shadow-sm font-bold"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-800 dark:text-blue-300" />
              <span>{currentLang === 'en' ? 'Listen Jyotirlinga Sloka' : 'द्वादश ज्योतिर्लिंग श्लोक ऐका'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sequential Horizontal Stepper */}
      <div className="mb-8 p-3 rounded-2xl bg-blue-50/80 dark:bg-[#121c2c] border-2 border-blue-200 dark:border-blue-900/60 overflow-x-auto no-scrollbar shadow-sm">
        <div className="flex items-center gap-2 min-w-max">
          {maharashtraJyotirlingas.map((temple) => {
            const isSelected = temple.id === selectedTempleId;
            return (
              <button
                key={temple.id}
                onClick={() => setSelectedTempleId(temple.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-blue-900/30 scale-105'
                    : 'bg-white dark:bg-[#1c283d] text-stone-800 dark:text-blue-100 border border-blue-200 dark:border-blue-800/60 hover:border-blue-400 hover:text-blue-900'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white text-stone-900' : 'bg-blue-200 dark:bg-blue-950 text-blue-950 dark:text-blue-300'
                }`}>
                  {temple.sequence}
                </span>
                <span>{temple.name[currentLang].replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Temple Spotlight Card with Full Cosmic Devotional Background */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F6FAFF] via-[#EEF5FF] to-[#DFEDFD] dark:from-[#131d2e] dark:via-[#0e1726] dark:to-[#172235] border-2 border-blue-300 dark:border-blue-500/60 shadow-2xl mb-12 relative overflow-hidden transition-all">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-blue-600 text-white shadow-sm">
                {currentLang === 'en' ? `Jyotirlinga #${templeIndiaNumber(activeTemple.jyotirlingaNumberInIndia)} of India` : `भारतातील ${activeTemple.jyotirlingaNumberInIndia} वे ज्योतिर्लिंग`}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-950 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                🌊 {activeTemple.riverAssociation}
              </span>
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200">
                📍 {activeTemple.city}, {activeTemple.district}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-blue-100 font-serifDev mb-2 tracking-wide">
              {activeTemple.name[currentLang]}
            </h3>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 font-bold mb-4 flex items-center gap-1.5">
              <span>🏛️</span>
              <span>{activeTemple.historicalEra}</span>
            </p>

            {/* Significance */}
            <p className="text-sm sm:text-base text-stone-800 dark:text-stone-100 leading-relaxed font-normal mb-5">
              {activeTemple.significance[currentLang]}
            </p>

            {/* Special Feature Callout with Full Distinct Background & High Contrast */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-100/90 dark:bg-[#182844] border-2 border-blue-300 dark:border-blue-600/70 text-xs sm:text-sm mb-5 flex items-start gap-3 shadow-md">
              <Info className="w-5 h-5 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-blue-950 dark:text-blue-200 font-extrabold text-sm mb-1">
                  {currentLang === 'en' ? 'Tradition & Sacred Darshan:' : 'विशेष परंपरा व दर्शन:'}
                </strong>
                <p className="text-blue-950 dark:text-blue-50 font-medium leading-relaxed">
                  {activeTemple.specialTradition[currentLang]}
                </p>
              </div>
            </div>

            {/* How to Reach Details with High Contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm border-t-2 border-blue-200/80 dark:border-blue-900/60 pt-4">
              <div>
                <span className="font-bold text-blue-950 dark:text-blue-300 block mb-0.5">🚆 By Rail:</span>
                <p className="text-stone-800 dark:text-stone-200 font-medium">{activeTemple.howToReach.rail}</p>
              </div>
              <div>
                <span className="font-bold text-blue-950 dark:text-blue-300 block mb-0.5">🚌 By Road:</span>
                <p className="text-stone-800 dark:text-stone-200 font-medium">{activeTemple.howToReach.road}</p>
              </div>
            </div>
          </div>

          {/* Right Action Column with Temple Photo & Full Theme Container */}
          <div className="w-full lg:w-80 p-5 rounded-2xl bg-white/95 dark:bg-[#121c2d] border-2 border-blue-300 dark:border-blue-700/80 flex flex-col justify-between text-center shadow-lg">
            <div>
              {/* Authentic Temple Photo */}
              {SACRED_PLACE_REGISTRY[activeTemple.imageTag]?.imageUrl && (
                <div className="relative h-44 w-full rounded-xl overflow-hidden border-2 border-blue-400/80 dark:border-blue-500/60 shadow-lg mb-4 bg-stone-900 group">
                  <img
                    src={SACRED_PLACE_REGISTRY[activeTemple.imageTag].imageUrl}
                    alt={activeTemple.name[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-blue-950 dark:text-blue-200 bg-white/95 dark:bg-[#0c1422]/90 px-2.5 py-1 rounded-md border border-blue-300 dark:border-blue-500/40 shadow-sm">
                    🔱 {activeTemple.city}
                  </span>
                </div>
              )}

              <span className="text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 font-extrabold block mb-1">
                {currentLang === 'en' ? 'Sanctum Timings' : 'दर्शन वेळ'}
              </span>
              <p className="text-base font-extrabold text-blue-950 dark:text-white flex items-center justify-center gap-1.5 mb-4">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{activeTemple.timings}</span>
              </p>

              <div className="p-3.5 rounded-xl bg-blue-100 dark:bg-[#1a2942] border-2 border-blue-300 dark:border-blue-600/80 text-xs text-left mb-6 shadow-sm">
                <span className="font-extrabold text-blue-950 dark:text-blue-300 block mb-1">🌿 Worship Etiquette:</span>
                <p className="leading-relaxed text-blue-950 dark:text-blue-100 font-medium">
                  {currentLang === 'en'
                    ? 'Fresh unblemished Bilva leaves, pure cold water, and white flowers are traditional offerings to the Shivalinga.'
                    : 'ताजी स्वच्छ बेलाची पाने, थंड पाणी आणि पांढरी फुले शिवलिंगावर अर्पण करावीत.'}
                </p>
              </div>
            </div>

            <a
              href={activeTemple.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्सवर रस्ता पहा'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

        </div>
      </div>

      {/* Grid of All 5 Jyotirlingas */}
      <h3 className="text-xl font-bold text-stone-900 dark:text-white font-serifDev mb-4 flex items-center gap-2">
        <span>🔱</span>
        <span>{currentLang === 'en' ? 'All 5 Maharashtra Jyotirlingas' : 'महाराष्ट्रातील सर्व ५ ज्योतिर्लिंगे'}</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {maharashtraJyotirlingas.map((temple) => {
          const placeImg = SACRED_PLACE_REGISTRY[temple.imageTag]?.imageUrl;
          return (
            <div
              key={temple.id}
              onClick={() => {
                setSelectedTempleId(temple.id);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className={`rounded-2xl border overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                temple.id === selectedTempleId
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                  : 'bg-white dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              {placeImg && (
                <div className="relative h-36 w-full overflow-hidden bg-stone-950 group">
                  <img
                    src={placeImg}
                    alt={temple.name[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {temple.sequence}
                  </span>
                  <span className="absolute bottom-1.5 right-2 text-[10px] text-blue-300 font-medium bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {temple.district}
                  </span>
                </div>
              )}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white text-sm font-serifDev mb-1">
                    {temple.name[currentLang]}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                    {temple.significance[currentLang]}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-blue-800 dark:text-blue-400 font-semibold">
                  <span>{currentLang === 'en' ? 'View Details' : 'तपशील पहा'}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

function templeIndiaNumber(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

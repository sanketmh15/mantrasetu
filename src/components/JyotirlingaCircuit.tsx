import React, { useState } from 'react';
import { Language } from '../types';
import { maharashtraJyotirlingas } from '../data/jyotirlingaCircuit';
import { audioEngine } from '../utils/audioSynth';
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60 mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>{currentLang === 'en' ? 'Sacred Maharashtra Jyotirlingas' : 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंगे'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white tracking-wide">
          {currentLang === 'en'
            ? 'The 5 Sacred Jyotirlingas of Maharashtra'
            : currentLang === 'hi'
            ? 'महाराष्ट्र के ५ पावन ज्योतिर्लिंग दर्शन'
            : 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंग दर्शन'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-2xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'Maharashtra is blessed with 5 of the 12 cosmic Jyotirlingas of India: Trimbakeshwar, Bhimashankar, Grishneshwar, Aundha Nagnath, and Parli Vaijnath.'
            : currentLang === 'hi'
            ? 'भारत के १२ में से ५ ज्योतिर्लिंग महाराष्ट्र की पावन भूमि पर स्थित हैं। इतिहास, दर्शन समय और गूगल मैप्स।'
            : 'भारतातील १२ पैकी ५ पावन ज्योतिर्लिंगे महाराष्ट्रात वास करतात. इतिहास, दर्शन वेळ आणि थेट गुगल मॅप्स.'}
        </p>

        {/* Traditional Sloka Box */}
        <div className="mt-4 p-4 rounded-2xl bg-stone-900/80 border border-blue-900/40 max-w-xl mx-auto text-center shadow-lg">
          <p className="text-sm sm:text-base font-bold text-blue-300 font-devanagari leading-relaxed">
            {jyotirlingaSloka}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => audioEngine.speakText(jyotirlingaSloka, 'hi-IN', 0.85)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentLang === 'en' ? 'Listen Jyotirlinga Sloka' : 'द्वादश ज्योतिर्लिंग श्लोक ऐका'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sequential Horizontal Stepper */}
      <div className="mb-8 p-3 rounded-2xl bg-stone-900 border border-stone-800 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {maharashtraJyotirlingas.map((temple) => {
            const isSelected = temple.id === selectedTempleId;
            return (
              <button
                key={temple.id}
                onClick={() => setSelectedTempleId(temple.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950 scale-105'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white text-stone-900' : 'bg-stone-900 text-blue-400'
                }`}>
                  {temple.sequence}
                </span>
                <span>{temple.name[currentLang].replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Temple Spotlight Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#14161f] to-[#0d0f17] border border-blue-900/40 shadow-2xl mb-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500 text-stone-950">
                {currentLang === 'en' ? `Jyotirlinga #${templeIndiaNumber(activeTemple.jyotirlingaNumberInIndia)} of India` : `भारतातील ${activeTemple.jyotirlingaNumberInIndia} वे ज्योतिर्लिंग`}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-900 text-blue-300 border border-blue-800/60">
                🌊 {activeTemple.riverAssociation}
              </span>
              <span className="text-xs text-stone-400">
                📍 {activeTemple.city}, {activeTemple.district}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serifDev mb-2">
              {activeTemple.name[currentLang]}
            </h3>
            <p className="text-xs text-blue-300/90 font-medium mb-4">
              🏛️ {activeTemple.historicalEra}
            </p>

            {/* Significance */}
            <p className="text-sm text-stone-200 leading-relaxed mb-4">
              {activeTemple.significance[currentLang]}
            </p>

            {/* Special Feature Callout */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs sm:text-sm text-blue-200/90 mb-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-blue-300 mb-0.5">
                  {currentLang === 'en' ? 'Tradition & Sacred Darshan:' : 'विशेष परंपरा व दर्शन:'}
                </strong>
                <p>{activeTemple.specialTradition[currentLang]}</p>
              </div>
            </div>

            {/* How to Reach Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-400 border-t border-stone-800/80 pt-4">
              <div>
                <span className="font-semibold text-stone-300 block mb-0.5">🚆 By Rail:</span>
                <p>{activeTemple.howToReach.rail}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-300 block mb-0.5">🚌 By Road:</span>
                <p>{activeTemple.howToReach.road}</p>
              </div>
            </div>
          </div>

          {/* Right Action Column */}
          <div className="w-full lg:w-72 p-5 rounded-2xl bg-stone-950 border border-stone-800/80 flex flex-col justify-between text-center">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                {currentLang === 'en' ? 'Sanctum Timings' : 'दर्शन वेळ'}
              </span>
              <p className="text-sm font-bold text-white flex items-center justify-center gap-1.5 mb-4">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{activeTemple.timings}</span>
              </p>

              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-200/80 text-left mb-6">
                <span className="font-semibold text-blue-300 block mb-1">🌿 Worship Etiquette:</span>
                <p>
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
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-950 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्सवर रस्ता पहा'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

        </div>
      </div>

      {/* Grid of All 5 Jyotirlingas */}
      <h3 className="text-xl font-bold text-white font-serifDev mb-4 flex items-center gap-2">
        <span>🔱</span>
        <span>{currentLang === 'en' ? 'All 5 Maharashtra Jyotirlingas' : 'महाराष्ट्रातील सर्व ५ ज्योतिर्लिंगे'}</span>
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {maharashtraJyotirlingas.map((temple) => (
          <div
            key={temple.id}
            onClick={() => {
              setSelectedTempleId(temple.id);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              temple.id === selectedTempleId
                ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {temple.sequence}
                </span>
                <span className="text-[10px] text-stone-500">{temple.district}</span>
              </div>
              <h4 className="font-bold text-white text-sm font-serifDev mb-1">
                {temple.name[currentLang]}
              </h4>
              <p className="text-xs text-stone-400 line-clamp-2">
                {temple.significance[currentLang]}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-blue-400 font-medium">
              <span>{currentLang === 'en' ? 'View Details' : 'तपशील पहा'}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

function templeIndiaNumber(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

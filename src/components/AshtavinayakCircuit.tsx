import React, { useState } from 'react';
import { Language } from '../types';
import { ashtavinayakCircuit } from '../data/ashtavinayak';
import { audioEngine } from '../utils/audioSynth';
import { SACRED_PLACE_REGISTRY } from '../utils/sacredPlaceImageRegistry';
import { Navigation, Clock, ExternalLink, Compass, Volume2, Info } from 'lucide-react';

interface AshtavinayakCircuitProps {
  currentLang: Language;
}

export const AshtavinayakCircuit: React.FC<AshtavinayakCircuitProps> = ({ currentLang }) => {
  const [selectedTempleId, setSelectedTempleId] = useState<string>(ashtavinayakCircuit[0].id);

  const activeTemple = ashtavinayakCircuit.find((t) => t.id === selectedTempleId) || ashtavinayakCircuit[0];

  const ashtavinayakSloka = 'स्वस्ति श्री गणनायकं गजमुखं मोरेश्वरं सिद्धिदम् ।\nबल्लाळं मुरुडं विनायक महडं चिंतामणिं थेवरम् ॥\nलेण्याद्रिं गिरिजात्मजं सुवरदं विघ्नेश्वरं ओझरम् ।\nग्रामे रांजणसंस्थितं गणपतिः कुर्यात् सदा मंगलम् ॥';

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60 mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>{currentLang === 'en' ? 'Sacred Maharashtra Pilgrimage' : 'पावन अष्टविनायक यात्रा'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white tracking-wide">
          {currentLang === 'en'
            ? 'The Sacred Ashtavinayak Pilgrimage Circuit'
            : currentLang === 'hi'
            ? 'सम्पूर्ण अष्टविनायक यात्रा दर्शन'
            : 'संपूर्ण अष्टविनायक यात्रा दर्शन'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-2xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'The eight self-manifested (Swayambhu) Ganeshas of Maharashtra in their ancient sacred pilgrimage order: Morgaon → Siddhatek → Pali → Mahad → Theur → Lenyadri → Ozar → Ranjangaon → Morgaon.'
            : currentLang === 'hi'
            ? 'महाराष्ट्र के आठ स्वयंभू गणेश तीर्थों का शास्त्रीय क्रम। मोरगांव से प्रारम्भ होकर पुनः मोरगांव पर ही यात्रा पूर्ण होती है।'
            : 'महाराष्ट्रातील ८ स्वयंभू गणपतींचा शास्त्रीय यात्रा क्रम. मोरगावपासून सुरुवात होऊन सर्व दर्शनांनंतर पुन्हा मोरगावला प्रदक्षिणा पूर्ण होते.'}
        </p>

        {/* Traditional Sloka Box */}
        <div className="mt-4 p-4 rounded-2xl bg-stone-900/80 border border-amber-900/40 max-w-xl mx-auto text-center shadow-lg">
          <p className="text-sm sm:text-base font-bold text-amber-300 font-devanagari leading-relaxed">
            {ashtavinayakSloka}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => audioEngine.speakText(ashtavinayakSloka, 'hi-IN', 0.78)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentLang === 'en' ? 'Listen Ashtavinayak Sloka' : 'अष्टविनायक श्लोक ऐका'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sequential Horizontal Stepper */}
      <div className="mb-8 p-3 rounded-2xl bg-stone-900 border border-stone-800 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {ashtavinayakCircuit.map((temple) => {
            const isSelected = temple.id === selectedTempleId;
            return (
              <button
                key={temple.id}
                onClick={() => setSelectedTempleId(temple.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600 to-saffron-600 text-white shadow-md shadow-amber-950 scale-105'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white text-stone-900' : 'bg-stone-900 text-amber-400'
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
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c1815] to-[#120f0d] border border-amber-900/40 shadow-2xl mb-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-stone-950">
                {currentLang === 'en' ? `Stop #${activeTemple.sequence} in Pilgrimage` : `यात्रेतील ${activeTemple.sequence} वे स्थान`}
              </span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                activeTemple.trunkDirection === 'right'
                  ? 'bg-red-950/80 text-red-300 border-red-700'
                  : 'bg-stone-900 text-stone-300 border-stone-700'
              }`}>
                {activeTemple.trunkDirection === 'right'
                  ? (currentLang === 'en' ? 'Right Trunk (उजवी सोंड)' : 'उजव्या सोंडेचा विनायक')
                  : (currentLang === 'en' ? 'Left Trunk (डावी सोंड)' : 'डाव्या सोंडेचा विनायक')}
              </span>
              <span className="text-xs text-stone-400">
                📍 {activeTemple.city}, {activeTemple.district}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serifDev mb-2">
              {activeTemple.name[currentLang]}
            </h3>
            <p className="text-xs text-amber-300/90 font-medium mb-4">
              🏛️ {activeTemple.historicalEra}
            </p>

            {/* Significance */}
            <p className="text-sm text-stone-200 leading-relaxed mb-4">
              {activeTemple.significance[currentLang]}
            </p>

            {/* Special Feature Callout */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs sm:text-sm text-amber-200/90 mb-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 mb-0.5">
                  {currentLang === 'en' ? 'Special Tradition & Architecture:' : 'विशेष परंपरा व स्थापत्य:'}
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

          {/* Right Action Column with Temple Photo */}
          <div className="w-full lg:w-80 p-5 rounded-2xl bg-stone-950 border border-stone-800/80 flex flex-col justify-between text-center">
            <div>
              {/* Authentic Temple Photo */}
              {SACRED_PLACE_REGISTRY[activeTemple.imageTag]?.imageUrl && (
                <div className="relative h-44 w-full rounded-xl overflow-hidden border border-amber-600/40 shadow-lg mb-4 bg-stone-900 group">
                  <img
                    src={SACRED_PLACE_REGISTRY[activeTemple.imageTag].imageUrl}
                    alt={activeTemple.name[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-amber-300 bg-stone-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                    🏛️ {activeTemple.city}
                  </span>
                </div>
              )}

              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                {currentLang === 'en' ? 'Temple Timings' : 'दर्शन वेळ'}
              </span>
              <p className="text-sm font-bold text-white flex items-center justify-center gap-1.5 mb-4">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{activeTemple.timings}</span>
              </p>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200/80 text-left mb-6">
                <span className="font-semibold text-amber-300 block mb-1">💡 Pilgrimage Tip:</span>
                <p>
                  {activeTemple.sequence === 1
                    ? (currentLang === 'en' ? 'Remember: Pilgrims return to Morgaon after visiting the other 7 shrines to conclude the yatra!' : 'लक्षात ठेवा: उर्वरित ७ देवस्थानांचे दर्शन झाल्यानंतर शेवटी पुन्हा मोरगावला येऊन यात्रेचा समारोप होतो.')
                    : (currentLang === 'en' ? `Next stop after this is Temple #${(activeTemple.sequence % 8) + 1}.` : `या दर्शनानंतर पुढील टप्पा देवस्थान क्रमांक ${(activeTemple.sequence % 8) + 1} आहे.`)}
                </p>
              </div>
            </div>

            <a
              href={activeTemple.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-amber-950 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्सवर रस्ता पहा'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

        </div>
      </div>

      {/* Grid of All 8 Shrines */}
      <h3 className="text-xl font-bold text-white font-serifDev mb-4 flex items-center gap-2">
        <span>🚩</span>
        <span>{currentLang === 'en' ? 'All 8 Ashtavinayak Temples' : 'सर्व आठ अष्टविनायक देवस्थाने'}</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ashtavinayakCircuit.map((temple) => {
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
                  ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                  : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              {placeImg && (
                <div className="relative h-32 w-full overflow-hidden bg-stone-950 group">
                  <img
                    src={placeImg}
                    alt={temple.name[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {temple.sequence}
                  </span>
                  <span className="absolute bottom-1.5 right-2 text-[10px] text-amber-300 font-medium bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {temple.district}
                  </span>
                </div>
              )}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-bold text-white text-sm font-serifDev mb-1">
                    {temple.name[currentLang]}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    {temple.significance[currentLang]}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-amber-400 font-medium">
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

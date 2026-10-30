import React, { useState } from 'react';
import { Language } from '../types';
import { templesData } from '../data/temples';
import { MapPin, Navigation, Clock, Train, Bus, ExternalLink, Search } from 'lucide-react';

interface TempleDirectoryProps {
  currentLang: Language;
}

export const TempleDirectory: React.FC<TempleDirectoryProps> = ({ currentLang }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const states = ['All', 'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Himachal Pradesh'];

  const filteredTemples = templesData.filter((t) => {
    const matchesState = selectedState === 'All' || t.state === selectedState;
    const matchesSearch =
      t.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.mr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
          {currentLang === 'en' ? 'Sacred Shrines & Pilgrimage' : currentLang === 'hi' ? 'तीर्थ दर्शन एवं देवस्थान' : 'तीर्थक्षेत्रे व देवस्थाने'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white mt-1">
          {currentLang === 'en' ? 'Hanuman Temple Directory' : currentLang === 'hi' ? 'श्री हनुमान मंदिर मार्गदर्शिका' : 'श्री मारुती मंदिरे मार्गदर्शिका'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl mx-auto">
          {currentLang === 'en'
            ? 'Discover historical shrines across Maharashtra and India. Verified historical eras, worship traditions, and direct Google Maps navigation links.'
            : currentLang === 'hi'
            ? 'महाराष्ट्र व भारत के प्रसिद्ध जाग्रत हनुमान मंदिर। इतिहास, पूजा परंपरा व मानचित्र दिशा-निर्देश।'
            : 'महाराष्ट्रातील व भारतातील प्रसिद्ध मारुती मंदिरे. इतिहास, परंपरा आणि थेट गुगल मॅप्स मार्गदर्शक.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* State Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedState === st
                  ? 'bg-saffron-600 text-white shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {st === 'All' ? (currentLang === 'en' ? 'All States' : 'सर्व राज्ये') : st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={currentLang === 'en' ? 'Search district or temple...' : 'जिल्हा किंवा मंदिर शोधा...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-saffron-500"
          />
        </div>
      </div>

      {/* Temples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemples.map((temple) => (
          <div
            key={temple.id}
            className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs text-saffron-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{temple.city}, {temple.district} ({temple.state})</span>
                </div>
                <span className="text-[10px] text-stone-500 bg-stone-950 px-2 py-0.5 rounded-full border border-stone-800">
                  {temple.historicalEra}
                </span>
              </div>

              {/* Temple Title */}
              <h3 className="text-xl font-bold text-white font-serifDev mb-2">
                {temple.name[currentLang]}
              </h3>

              {/* Significance */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-3">
                {temple.significance[currentLang]}
              </p>

              {/* Special Tradition */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 text-xs text-stone-300 mb-4">
                <span className="text-amber-400 font-semibold block mb-0.5">
                  {currentLang === 'en' ? 'Special Tradition:' : 'विशेष परंपरा:'}
                </span>
                <p>{temple.specialTradition[currentLang]}</p>
              </div>

              {/* Timings & Reach Details */}
              <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-800/80 pt-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span><strong>Timings:</strong> {temple.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-stone-500" />
                  <span><strong>Rail:</strong> {temple.howToReach.rail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-3.5 h-3.5 text-stone-500" />
                  <span><strong>Road:</strong> {temple.howToReach.road}</span>
                </div>
              </div>
            </div>

            {/* Bottom Maps Link & Source */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[10px] text-stone-500 italic max-w-[200px] truncate" title={temple.verifiedSource}>
                Source: {temple.verifiedSource}
              </span>

              <a
                href={temple.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-saffron-600 hover:bg-saffron-500 text-white shadow-md transition-all whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्सवर पहा'}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {filteredTemples.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No temples found matching your filter</p>
        </div>
      )}

    </div>
  );
};


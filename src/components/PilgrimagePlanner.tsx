import React, { useState } from 'react';
import { Language } from '../types';
import { pilgrimageCircuits, PilgrimageCircuit } from '../data/pilgrimageCircuits';
import { SACRED_PLACE_REGISTRY } from '../utils/sacredPlaceImageRegistry';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Car,
  Utensils,
  ExternalLink,
  Printer,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';

const CIRCUIT_IMAGE_MAP: Record<string, string> = {
  'jyotirlinga-5': SACRED_PLACE_REGISTRY['trimbakeshwar']?.imageUrl || '',
  'ashtavinayak': SACRED_PLACE_REGISTRY['morgaon']?.imageUrl || '',
  'pandharpur-warkari': SACRED_PLACE_REGISTRY['pandharpur']?.imageUrl || '',
  'shaktipeeth-3-half': SACRED_PLACE_REGISTRY['tuljapur']?.imageUrl || '',
  'datta-parikrama': SACRED_PLACE_REGISTRY['akkalkot']?.imageUrl || '',
  'nashik-kumbha-panchavati': SACRED_PLACE_REGISTRY['ramkund']?.imageUrl || '',
};

interface PilgrimagePlannerProps {
  currentLang: Language;
}

export const PilgrimagePlanner: React.FC<PilgrimagePlannerProps> = ({ currentLang }) => {
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>('jyotirlinga-5');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [startingCity, setStartingCity] = useState<string>('Pune');

  const activeCircuit: PilgrimageCircuit =
    pilgrimageCircuits.find((c) => c.id === selectedCircuitId) || pilgrimageCircuits[0];

  const currentDay = activeCircuit.days[activeDayIndex] || activeCircuit.days[0];

  const handleCircuitChange = (id: string) => {
    setSelectedCircuitId(id);
    setActiveDayIndex(0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header & Sacred Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-950/60 border border-saffron-800/60 text-saffron-400 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
          <span>
            {currentLang === 'en'
              ? 'Maharashtra Pilgrimage Route Engine'
              : currentLang === 'hi'
              ? 'महाराष्ट्र तीर्थयात्रा मार्गदर्शक'
              : 'महाराष्ट्र तीर्थयात्रा नियोजन इंजिन'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-white tracking-tight">
          {currentLang === 'en'
            ? 'Plan My Pilgrimage'
            : currentLang === 'hi'
            ? 'तीर्थयात्रा नियोजन एवं मार्गदर्शक'
            : 'पावन तीर्थयात्रा नियोजन'}
        </h1>
        <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
          {currentLang === 'en'
            ? 'Day-by-day optimal routes, darshan timing advice, dress codes, food recommendations, and direct Google Maps navigation across sacred Maharashtra circuits.'
            : currentLang === 'hi'
            ? 'दिवस-दर-दिवस सुगम मार्ग, दर्शन समय परामर्श, नियम, प्रामाणिक खान-पान एवं गुगल मॅप्स नेविगेशन।'
            : 'दिवसानुरूप अचूक मार्ग, दर्शन वेळा, सोवळे नियम, स्थानिक सात्विक खाण्यापिण्याच्या जागा आणि गुगल मॅप्स नेव्हिगेशन.'}
        </p>
      </div>

      {/* 2. Circuit Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {pilgrimageCircuits.map((circuit) => {
          const isSelected = circuit.id === activeCircuit.id;
          const circuitThumb = CIRCUIT_IMAGE_MAP[circuit.id];
          return (
            <button
              key={circuit.id}
              onClick={() => handleCircuitChange(circuit.id)}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm transition-all shadow-md ${
                isSelected
                  ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-saffron-950/50 ring-2 ring-amber-300/60'
                  : 'bg-stone-900/80 text-stone-300 border border-stone-800 hover:bg-stone-800/80 hover:text-white'
              }`}
            >
              {circuitThumb ? (
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-amber-400/50">
                  <img src={circuitThumb} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <span className="text-lg">{circuit.icon}</span>
              )}
              <span>{circuit.name[currentLang]}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Circuit Overview Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1c1815] via-[#14120f] to-[#1a1714] border border-stone-800/80 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-800/50 mb-2">
              {activeCircuit.badge[currentLang]}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serifDev text-white flex items-center gap-3">
              <span>{activeCircuit.icon}</span>
              <span>{activeCircuit.name[currentLang]}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
              {activeCircuit.subtitle[currentLang]}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <Car className="w-4 h-4 text-saffron-400" />
                <span>{activeCircuit.totalDistanceKm} km {currentLang === 'en' ? 'Total Route' : 'एकूण मार्ग'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{activeCircuit.days.length} {currentLang === 'en' ? 'Days Suggested' : 'दिवस सुचवलेले'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-stone-400">{currentLang === 'en' ? 'Start From:' : 'प्रस्थान:'}</span>
                <select
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  className="bg-transparent text-emerald-300 font-semibold text-xs border-none focus:outline-none cursor-pointer"
                >
                  {activeCircuit.startingCities.map((city) => (
                    <option key={city} value={city} className="bg-stone-900 text-stone-200">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Authentic Temple Hero Thumbnail & Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {CIRCUIT_IMAGE_MAP[activeCircuit.id] && (
              <div className="w-full sm:w-56 h-32 rounded-2xl overflow-hidden border border-amber-600/40 shadow-xl relative group">
                <img
                  src={CIRCUIT_IMAGE_MAP[activeCircuit.id]}
                  alt={activeCircuit.name[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  🏛️ {currentLang === 'en' ? 'Sacred Dham' : 'पावन तीर्थ दर्शन'}
                </span>
              </div>
            )}

            <div className="flex flex-col w-full sm:w-auto gap-2.5">
              <a
                href={activeCircuit.googleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-saffron-950 transition-all transform hover:scale-[1.02]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्सवर मार्ग पहा'}</span>
              </a>

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 font-semibold text-xs sm:text-sm transition-all"
              >
                <Printer className="w-4 h-4 text-stone-400" />
                <span>{currentLang === 'en' ? 'Print Itinerary' : 'मार्गपत्रिका प्रिंट करा'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Highlights Drawer */}
        <div className="mt-6 pt-5 border-t border-stone-800/80">
          <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Spiritual Highlights of this Circuit' : 'या तीर्थयात्रेची वैशिष्ट्ये'}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {activeCircuit.highlights.map((h, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/60 text-xs text-stone-300 flex items-start gap-2"
              >
                <ChevronRight className="w-3.5 h-3.5 text-saffron-400 shrink-0 mt-0.5" />
                <span>{h[currentLang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Interactive Day-by-Day Stepper Navigation */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 mb-6">
        {activeCircuit.days.map((day, idx) => {
          const isActive = idx === activeDayIndex;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-950 ring-1 ring-amber-300'
                  : 'bg-stone-900/80 text-stone-400 border border-stone-800 hover:text-stone-200'
              }`}
            >
              <span>{currentLang === 'en' ? `Day ${day.dayNumber}` : `दिवस ${day.dayNumber}`}</span>
              <span className="text-[11px] opacity-75 hidden sm:inline">• {day.distanceKm} km</span>
            </button>
          );
        })}
      </div>

      {/* 5. Active Day Detailed Plan Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#171513] border border-stone-800 shadow-xl mb-10">
        
        {/* Day Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold text-saffron-400 tracking-wider uppercase">
              {currentLang === 'en' ? `Day ${currentDay.dayNumber} Itinerary` : `दिवस ${currentDay.dayNumber} तपशील`}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-white mt-1">
              {currentDay.title[currentLang]}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentDay.route[currentLang]}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs bg-stone-900/80 px-4 py-2 rounded-xl border border-stone-800 self-start sm:self-auto">
            <div>
              <span className="text-stone-400 block">{currentLang === 'en' ? 'Drive' : 'प्रवास'}</span>
              <span className="font-semibold text-white">{currentDay.distanceKm} km ({currentDay.travelTimeHours})</span>
            </div>
            <div className="w-px h-8 bg-stone-800" />
            <div>
              <span className="text-stone-400 block">{currentLang === 'en' ? 'Night Halt' : 'रात्री मुक्काम'}</span>
              <span className="font-semibold text-amber-300">{currentDay.nightHalt[currentLang]}</span>
            </div>
          </div>
        </div>

        {/* 3 Time-Slot Breakdown: Morning, Afternoon, Evening */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* MORNING SLOT */}
          <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-950/70 text-amber-300 border border-amber-800/50 flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>{currentLang === 'en' ? 'Morning Darshan' : 'सकाळचे दर्शन'}</span>
                </span>
                <span className="text-xs text-stone-400 font-mono">{currentDay.morning.time}</span>
              </div>

              <h4 className="text-base font-bold text-white font-serifDev mb-2">
                {currentDay.morning.templeName[currentLang]}
              </h4>

              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                {currentDay.morning.activity[currentLang]}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-900/30 text-xs">
              <span className="font-semibold text-amber-400 block mb-1">
                💡 {currentLang === 'en' ? 'Darshan & Queue Tip:' : 'दर्शन सल्ला व नियम:'}
              </span>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                {currentDay.morning.darshanTips[currentLang]}
              </p>
            </div>
          </div>

          {/* AFTERNOON SLOT */}
          <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-orange-950/70 text-orange-300 border border-orange-800/50 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span>{currentLang === 'en' ? 'Afternoon Sight / Teerth' : 'दुपारचे तीर्थ दर्शन'}</span>
                </span>
                <span className="text-xs text-stone-400 font-mono">{currentDay.afternoon.time}</span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                {currentDay.afternoon.activity[currentLang]}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-orange-900/30 text-xs">
              <span className="font-semibold text-orange-400 block mb-1 flex items-center gap-1">
                <Utensils className="w-3 h-3" />
                <span>{currentLang === 'en' ? 'Prasad & Food Recommendation:' : 'स्थानिक सात्विक खाणपान:'}</span>
              </span>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                {currentDay.afternoon.foodRecommendation[currentLang]}
              </p>
            </div>
          </div>

          {/* EVENING SLOT */}
          <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-950/70 text-indigo-300 border border-indigo-800/50 flex items-center gap-1">
                  <Moon className="w-3 h-3 text-indigo-400" />
                  <span>{currentLang === 'en' ? 'Evening Aarti & Rest' : 'संध्याकाळची आरती व विधी'}</span>
                </span>
                <span className="text-xs text-stone-400 font-mono">{currentDay.evening.time}</span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                {currentDay.evening.activity[currentLang]}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-indigo-900/30 text-xs">
              <span className="font-semibold text-indigo-300 block mb-1">
                📿 {currentLang === 'en' ? 'Prescribed Ritual / Stotra:' : 'विहित नामस्मरण / स्तोत्र:'}
              </span>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                {currentDay.evening.specialRitual[currentLang]}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 6. Pilgrimage Preparation & Practical Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80">
        <h3 className="text-lg sm:text-xl font-bold font-serifDev text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-saffron-400" />
          <span>
            {currentLang === 'en'
              ? 'Essential Pilgrimage Guidelines & What to Carry'
              : currentLang === 'hi'
              ? 'तीर्थयात्रा नियम एवं आवश्यक सामग्री'
              : 'तीर्थयात्रेचे महत्त्वाचे नियम व पूर्वतयारी'}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCircuit.travelTips.map((tip, i) => (
            <div key={i} className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 text-xs text-stone-300 leading-relaxed">
              <span className="text-saffron-400 font-bold block mb-1">✓ {currentLang === 'en' ? `Rule ${i + 1}` : `नियम ${i + 1}`}</span>
              {tip[currentLang]}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import { useState } from 'react';
import { Language } from '../types';
import {
  temple3DDatabase,
  Temple3DModel,
} from '../data/temple3DData';
import { audioEngine } from '../utils/audioSynth';
import {
  Compass,
  Volume2,
  VolumeX,
  Layers,
  MapPin,
} from 'lucide-react';

interface Temple3DExplorerProps {
  currentLang: Language;
}

export function Temple3DExplorer({ currentLang }: Temple3DExplorerProps) {
  const [selectedTempleId, setSelectedTempleId] = useState<string>('trimbakeshwar');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('garbhagriha');
  const [rotationAngle, setRotationAngle] = useState<number>(25);
  const [tiltAngle, setTiltAngle] = useState<number>(18);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isTourPlaying, setIsTourPlaying] = useState<boolean>(false);

  const activeTemple: Temple3DModel =
    temple3DDatabase.find((t) => t.id === selectedTempleId) || temple3DDatabase[0];

  const activeZone =
    activeTemple.zones.find((z) => z.id === selectedZoneId) || activeTemple.zones[0];

  const handleRotate = (delta: number) => {
    setRotationAngle((prev) => (prev + delta) % 360);
  };

  const handleTilt = (delta: number) => {
    setTiltAngle((prev) => Math.max(5, Math.min(50, prev + delta)));
  };

  const handleAudioTour = () => {
    if (isTourPlaying) {
      audioEngine.stopSpeaking();
      setIsTourPlaying(false);
      return;
    }

    setIsTourPlaying(true);
    audioEngine.playTempleBell();
    const script = `${activeTemple.name[currentLang]}। ${activeTemple.description[currentLang]}। गर्भगृह व शिखर रचना: ${activeZone.name[currentLang]}। ${activeZone.meaning[currentLang]}`;

    audioEngine.speakText(script, currentLang === 'en' ? 'en-IN' : 'mr-IN', 0.78, () => {
      setIsTourPlaying(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Compass className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
          <span>
            {currentLang === 'en'
              ? 'Interactive 3D Architectural Temple Sanctum'
              : 'त्रिमितीय (3D) मंदिर वास्तुकला व व्हर्च्युअल दर्शन'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? '3D Temple Explorer & Virtual Parikrama'
            : currentLang === 'hi'
            ? '३D मंदिर अन्वेषण एवं परिक्रमा'
            : '३D मंदिर दर्शन, वास्तुकला व व्हर्च्युअल परिक्रमा'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Explore centuries-old Hemadpanthi basalt temples in full 3D. Rotate angles, inspect the Garbhagriha, Nagara Shikhara, and listen to architectural audio guides.'
            : 'त्र्यंबकेश्वर ज्योतिर्लिंग, पंढरपूर विठ्ठल मंदिर आणि वेरूळच्या कैलास मंदिराची ३D वास्तुकला, शिखर, गर्भगृह व नंदी मंडपाचे ३६०° फिरवून दर्शन घ्या.'}
        </p>
      </div>

      {/* Temple Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {temple3DDatabase.map((temple) => {
          const isSelected = temple.id === selectedTempleId;
          return (
            <button
              key={temple.id}
              onClick={() => {
                setSelectedTempleId(temple.id);
                setSelectedZoneId(temple.zones[0].id);
                if (isTourPlaying) {
                  audioEngine.stopSpeaking();
                  setIsTourPlaying(false);
                }
              }}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500/15 via-saffron-500/10 to-transparent dark:from-amber-950/50 dark:via-stone-900 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{temple.city}</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white font-serifDev line-clamp-1">
                {temple.name[currentLang]}
              </h3>
              <span className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mt-1 block truncate">
                {temple.historicalEra}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 3D INTERACTIVE CANVAS VIEWPORT */}
        <div className="lg:col-span-8 bg-gradient-to-b from-stone-950 via-[#16120e] to-stone-950 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden min-h-[480px] sm:min-h-[540px] flex flex-col justify-between">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Top Canvas Controls Bar */}
          <div className="flex items-center justify-between gap-3 relative z-10 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase font-mono font-bold text-amber-300">
                3D Interactive Viewport: {rotationAngle}°
              </span>
            </div>

            {/* Quick Rotate & Zoom Buttons */}
            <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
              <button
                onClick={() => handleRotate(-30)}
                className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Rotate Left"
              >
                ↺ -30°
              </button>
              <button
                onClick={() => handleRotate(30)}
                className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Rotate Right"
              >
                ↻ +30°
              </button>
              <div className="w-[1px] h-4 bg-stone-700" />
              <button
                onClick={() => handleTilt(8)}
                className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Tilt Up"
              >
                ▲
              </button>
              <button
                onClick={() => handleTilt(-8)}
                className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Tilt Down"
              >
                ▼
              </button>
              <div className="w-[1px] h-4 bg-stone-700" />
              <button
                onClick={() => setZoomLevel((z) => (z >= 1.4 ? 1 : z + 0.2))}
                className="p-1 rounded text-amber-300 hover:text-amber-100 hover:bg-stone-800 font-mono"
                title="Zoom Toggle"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
            </div>
          </div>

          {/* Center 3D Isometric Temple Structure Rendering */}
          <div
            className="my-auto py-8 flex items-center justify-center relative perspective-1000 transition-transform duration-500"
            style={{
              transform: `perspective(900px) rotateX(${tiltAngle}deg) rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Tiered Temple Structure Simulation */}
            <div className="relative w-64 sm:w-72 h-72 sm:h-80 flex flex-col items-center justify-end select-none">
              {/* Golden Pinnacle Kalasha on top of Shikhara */}
              <div className="w-6 h-10 bg-gradient-to-t from-amber-400 via-yellow-300 to-amber-200 rounded-t-full shadow-lg shadow-amber-400/50 animate-pulse relative z-30 flex items-center justify-center">
                <span className="text-[10px]">🚩</span>
              </div>

              {/* Shikhara Pyramid Tiers */}
              <div className="w-16 h-12 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-800 border-2 border-amber-500/40 rounded-t-lg shadow-2xl relative z-20 flex items-center justify-center text-amber-400 text-xs">
                <span>✦</span>
              </div>
              <div className="w-28 h-14 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-800 border-2 border-amber-500/40 rounded-t-lg shadow-2xl relative z-20 flex items-center justify-center text-amber-300 text-xs font-mono">
                <span>॥ ॐ ॥</span>
              </div>
              <div className="w-40 h-16 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-800 border-2 border-amber-500/40 shadow-2xl relative z-20 flex items-center justify-center text-stone-300 text-xs">
                <span>हेमाडपंथी कोरीव काम</span>
              </div>

              {/* Garbhagriha & Mandapa Base Foundation */}
              <div className="w-56 sm:w-64 h-24 bg-gradient-to-b from-stone-900 via-stone-850 to-stone-950 border-2 border-amber-400/60 rounded-xl shadow-2xl relative z-20 flex items-center justify-around px-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-12 border-2 border-dashed border-amber-400/80 rounded-t-full flex items-center justify-center text-amber-300 text-sm animate-pulse">
                    🕉️
                  </div>
                  <span className="text-[10px] text-amber-300 mt-1 font-bold">गर्भगृह</span>
                </div>
                <div className="h-14 w-[1px] bg-stone-700" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-10 border border-stone-600 rounded flex items-center justify-center text-xs text-stone-300">
                    🏛️
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1">सभामंडप</span>
                </div>
                <div className="h-14 w-[1px] bg-stone-700" />
                <div className="flex flex-col items-center">
                  <span className="text-xl">🐂</span>
                  <span className="text-[10px] text-stone-400 mt-0.5">नंदी</span>
                </div>
              </div>

              {/* Elevated Stone Plinth (Jagati / अधिष्ठान) */}
              <div className="w-64 sm:w-72 h-8 bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border-t-2 border-amber-500/50 rounded-b-2xl shadow-2xl mt-1 flex items-center justify-center text-[10px] text-amber-200/80 tracking-widest font-mono">
                अधिष्ठान (BASE PLINTH)
              </div>
            </div>
          </div>

          {/* Bottom Viewport Legend & Audio Tour Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10 relative z-10">
            <div className="text-xs text-stone-400">
              <span className="text-amber-300 font-bold block mb-0.5">
                {activeTemple.architectureType[currentLang]}
              </span>
              <span>{activeTemple.description[currentLang]}</span>
            </div>

            <button
              onClick={handleAudioTour}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all shrink-0 ${
                isTourPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white'
              }`}
            >
              {isTourPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isTourPlaying ? 'मार्गदर्शक थांबवा' : 'वास्तुकला ऑडिओ गाइड'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ARCHITECTURAL HOTSPOTS & SIGNIFICANCE */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl">
            <h3 className="font-bold font-serifDev text-base sm:text-lg text-stone-900 dark:text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>
                {currentLang === 'en' ? 'Architectural Hotspots' : 'मंदिर वास्तुकला दालन व विभाग'}:
              </span>
            </h3>

            <div className="space-y-2">
              {activeTemple.zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-400/30'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-stone-900 dark:text-white font-serifDev">
                        {zone.name[currentLang]}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                          निवडलेले
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                      {zone.meaning[currentLang]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Zone Deep Dive Info */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-stone-900 dark:to-stone-950 border border-amber-200 dark:border-stone-800 shadow-md">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block mb-1">
              ✨ आध्यात्मिक गूढ व रहस्य
            </span>
            <h4 className="font-bold text-lg text-stone-900 dark:text-white font-serifDev mb-2">
              {activeZone.name[currentLang]}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
              {activeZone.meaning[currentLang]}
            </p>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-stone-800/80 border border-amber-200 dark:border-stone-700 text-xs text-amber-900 dark:text-amber-200 font-medium">
              📜 {activeZone.spiritualLore[currentLang]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

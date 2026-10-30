import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Language, Mantra } from '../types';
import { mantrasData } from '../data/mantras';
import { audioEngine } from '../utils/audioSynth';
import { recordChantIncrement, recordMalaCompleted, getStoredJapaStats, JapaStats } from '../utils/storage';
import confetti from 'canvas-confetti';
import { RotateCcw, Volume2, Sparkles, Award, Flame, CheckCircle, VolumeX, Play, Pause, Music } from 'lucide-react';

interface JapaCounterProps {
  currentLang: Language;
  preselectedMantraId?: string;
  availableMantras?: Mantra[];
}

export const JapaCounter: React.FC<JapaCounterProps> = ({ currentLang, preselectedMantraId, availableMantras }) => {
  const activeList = availableMantras || mantrasData;
  const [selectedMantraId, setSelectedMantraId] = useState<string>(preselectedMantraId || activeList[0]?.id || 'om-hanumate-namah');
  const [targetCount, setTargetCount] = useState<number>(108);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [stats, setStats] = useState<JapaStats>(getStoredJapaStats());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const [isTanpuraActive, setIsTanpuraActive] = useState<boolean>(false);
  const [chantPace, setChantPace] = useState<number>(4); // seconds per chant

  const autoChantTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeMantra = activeList.find((m) => m.id === selectedMantraId) || activeList[0];

  useEffect(() => {
    if (preselectedMantraId) {
      setSelectedMantraId(preselectedMantraId);
    } else if (activeList[0]) {
      setSelectedMantraId(activeList[0].id);
    }
  }, [preselectedMantraId, availableMantras]);

  // Clean up Tanpura & auto-timer on unmount
  useEffect(() => {
    return () => {
      if (autoChantTimerRef.current) {
        clearInterval(autoChantTimerRef.current);
      }
      audioEngine.stopTanpura();
    };
  }, []);

  // Handle count increment
  const handleChant = useCallback(() => {
    // 1. Sound feedback
    if (soundEnabled) {
      audioEngine.playBeadClick();
    }

    // 2. Haptic vibration feedback for mobile devices
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {
        // unsupported
      }
    }

    setCurrentCount((prev) => {
      const nextCount = prev + 1;
      const updatedStats = recordChantIncrement(1);
      setStats(updatedStats);

      // Check if target completed
      if (nextCount === targetCount) {
        setIsAutoChanting(false);
        if (autoChantTimerRef.current) {
          clearInterval(autoChantTimerRef.current);
        }

        if (soundEnabled) {
          audioEngine.playTempleBell(587.33); // Authentic brass bell chime
        }

        // Celebrate 108 completion with devotional confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ea580c', '#f59e0b', '#dc2626', '#fbbf24']
          });
        } catch {
          // confetti fallback
        }

        if (targetCount === 108) {
          const completedStats = recordMalaCompleted();
          setStats(completedStats);
        }
      }
      return nextCount;
    });
  }, [soundEnabled, targetCount]);

  // Auto-Chant Loop logic
  useEffect(() => {
    if (isAutoChanting) {
      autoChantTimerRef.current = setInterval(() => {
        handleChant();
      }, chantPace * 1000);
    } else {
      if (autoChantTimerRef.current) {
        clearInterval(autoChantTimerRef.current);
      }
    }

    return () => {
      if (autoChantTimerRef.current) {
        clearInterval(autoChantTimerRef.current);
      }
    };
  }, [isAutoChanting, chantPace, handleChant]);

  // Tanpura Drone toggle
  const toggleTanpura = () => {
    if (isTanpuraActive) {
      audioEngine.stopTanpura();
      setIsTanpuraActive(false);
    } else {
      audioEngine.startTanpura(136.1); // Sacred cosmic OM pitch
      setIsTanpuraActive(true);
    }
  };

  const handleReset = () => {
    setIsAutoChanting(false);
    setCurrentCount(0);
  };

  const progressPercent = Math.min(100, Math.round((currentCount / targetCount) * 100));

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
          {currentLang === 'en' ? 'Digital Japa Mala' : currentLang === 'hi' ? 'डिजिटल जप माला' : 'डिजिटल जपमाळ'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serifDev text-white mt-1">
          {currentLang === 'en' ? 'Mindful 108 Chanting Counter' : currentLang === 'hi' ? '१०८ मन्त्र जप साधना' : '१०८ नामस्मरण जपमाळ'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          {currentLang === 'en'
            ? 'Tap the sacred bead to advance your count. Complete with gentle haptics & bell sound.'
            : currentLang === 'hi'
            ? 'पवित्र मनके पर स्पर्श कर जप की गणना करें। समापन पर मंदिर की घंटी की मंगल ध्वनि।'
            : 'प्रत्येक नामस्मरणानंतर मण्याला स्पर्श करा. १०८ पूर्ण झाल्यावर मंगल घंटा नाद ऐकू येईल.'}
        </p>
      </div>

      {/* Daily Streak & Japa Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
          <div className="flex items-center justify-center gap-1 text-saffron-400 text-xs font-medium">
            <Flame className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Daily Streak' : currentLang === 'hi' ? 'नित्य सातत्य' : 'नित्य सातत्य'}</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-white mt-0.5">{stats.streakDays} {currentLang === 'en' ? 'Days' : 'दिवस'}</p>
        </div>

        <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Today\'s Chants' : currentLang === 'hi' ? 'आज का जप' : 'आजचे नामस्मरण'}</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-white mt-0.5">{stats.todayCount}</p>
        </div>

        <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? '108 Malas' : currentLang === 'hi' ? 'पूर्ण मालाएं' : 'पूर्ण माळा'}</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-white mt-0.5">{stats.completed108Malas}</p>
        </div>
      </div>

      {/* Main Chanting Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c1917] to-[#12100e] border border-stone-800 shadow-2xl text-center relative overflow-hidden">
        
        {/* Mantra Selector */}
        <div className="max-w-md mx-auto mb-6">
          <label className="text-xs text-stone-400 block mb-1.5 font-medium">
            {currentLang === 'en' ? 'Select Mantra for Japa' : currentLang === 'hi' ? 'जप हेतु मन्त्र चुनें' : 'जपासाठी मंत्र निवडा'}
          </label>
          <select
            value={selectedMantraId}
            onChange={(e) => {
              setSelectedMantraId(e.target.value);
              setCurrentCount(0);
            }}
            className="w-full bg-stone-900 text-stone-200 border border-stone-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-saffron-500 font-medium"
          >
            {activeList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title[currentLang]} — {m.devanagari.split('\n')[0]}
              </option>
            ))}
          </select>
        </div>

        {/* Display Current Mantra */}
        <div className="my-4 p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 max-w-lg mx-auto">
          <p className="text-xl sm:text-2xl font-bold text-saffron-300 font-devanagari tracking-wide">
            {activeMantra.devanagari}
          </p>
          <p className="text-xs text-stone-400 mt-1 font-mono">
            {activeMantra.roman}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => audioEngine.speakText(activeMantra.devanagari, 'hi-IN', 0.9)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-saffron-400" />
              <span>{currentLang === 'en' ? 'Listen Pronunciation' : 'उच्चारण ऐका'}</span>
            </button>
          </div>
        </div>

        {/* Target Count Selector */}
        <div className="flex items-center justify-center gap-2 my-4">
          <span className="text-xs text-stone-400 mr-2">
            {currentLang === 'en' ? 'Goal:' : 'लक्ष्य:'}
          </span>
          {[11, 21, 108].map((count) => (
            <button
              key={count}
              onClick={() => {
                setTargetCount(count);
                if (currentCount >= count) setCurrentCount(0);
              }}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
                targetCount === count
                  ? 'bg-saffron-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200'
              }`}
            >
              {count} {currentLang === 'en' ? 'Chants' : 'जप'}
            </button>
          ))}
        </div>

        {/* Chant With Me (अखंड नामस्मरण) & Tanpura Drone Control Bar */}
        <div className="max-w-md mx-auto my-4 p-3 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Play / Pause Auto-Chant */}
          <button
            onClick={() => setIsAutoChanting(!isAutoChanting)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all shadow-md ${
              isAutoChanting
                ? 'bg-amber-500 text-stone-950 animate-pulse'
                : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
            }`}
          >
            {isAutoChanting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            <span>
              {isAutoChanting
                ? (currentLang === 'en' ? 'Chanting...' : 'अखंड सुरू...')
                : (currentLang === 'en' ? 'Auto-Chant' : 'अखंड नामस्मरण')}
            </span>
          </button>

          {/* Tanpura Drone */}
          <button
            onClick={toggleTanpura}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              isTanpuraActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950 ring-1 ring-indigo-300'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700'
            }`}
            title="Cosmic OM Tanpura Drone (136.1 Hz Web Audio)"
          >
            <Music className="w-3.5 h-3.5" />
            <span>
              {isTanpuraActive
                ? (currentLang === 'en' ? 'Tanpura On' : 'तानपुरा चालू')
                : (currentLang === 'en' ? 'Tanpura Drone' : 'तानपुरा नाद')}
            </span>
          </button>

          {/* Pace Selector */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-stone-500">{currentLang === 'en' ? 'Speed:' : 'गती:'}</span>
            {[5, 4, 2.5].map((s) => (
              <button
                key={s}
                onClick={() => setChantPace(s)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                  chantPace === s
                    ? 'bg-saffron-600 text-white'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {s}s
              </button>
            ))}
          </div>
        </div>

        {/* The Sacred Bead / Large Japa Interactive Button */}
        <div className="my-8 flex justify-center">
          <button
            onClick={handleChant}
            className="group relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-2xl focus:outline-none"
            style={{
              background: 'radial-gradient(circle, #ea580c 0%, #9a3412 60%, #431407 100%)',
              boxShadow: '0 0 35px rgba(234, 88, 12, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#fde047"
                strokeWidth="4"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>

            {/* Inner Content */}
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
              {currentCount}
            </span>
            <span className="text-xs sm:text-sm font-medium text-amber-200/90 mt-1">
              / {targetCount}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-white/70 mt-1 font-semibold">
              {currentLang === 'en' ? 'TAP TO CHANT' : currentLang === 'hi' ? 'स्पर्श करें' : 'स्पर्श करा'}
            </span>
          </button>
        </div>

        {/* Completion Message */}
        {currentCount >= targetCount && (
          <div className="my-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/60 max-w-sm mx-auto text-emerald-200 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">
              {currentLang === 'en'
                ? `Completed ${targetCount} chants! Har Har Mahadev 🙏`
                : currentLang === 'hi'
                ? `शुभ! ${targetCount} मन्त्र जप पूर्ण हुए। जय श्रीराम 🙏`
                : `उत्तम! ${targetCount} नामस्मरण पूर्ण झाले. जय श्रीराम 🙏`}
            </span>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 max-w-md mx-auto">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 hover:text-stone-200 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-saffron-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            <span>{soundEnabled ? (currentLang === 'en' ? 'Sound: On' : 'आवाज: चालू') : (currentLang === 'en' ? 'Sound: Off' : 'आवाज: बंद')}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Reset Counter' : 'पुन्हा मोजा'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};


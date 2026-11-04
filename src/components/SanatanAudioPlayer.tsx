import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Sparkles,
  Music,
  Share2,
  Check,
  Repeat,
  ChevronDown
} from 'lucide-react';
import { SANSKRIT_VERIFIED_LIBRARY, SanskritMantraTrack } from '../utils/sanskritAudioLibrary';
import { aiVoiceover, VoiceGender } from '../utils/aiVoiceoverService';
import { audioEngine } from '../utils/audioSynth';
import { Language } from '../types';

interface SanatanAudioPlayerProps {
  currentLang: Language;
  initialTrackId?: string;
}

export function SanatanAudioPlayer({ currentLang, initialTrackId }: SanatanAudioPlayerProps) {
  const [selectedTrack, setSelectedTrack] = useState<SanskritMantraTrack>(() => {
    if (initialTrackId) {
      const match = SANSKRIT_VERIFIED_LIBRARY.find((t) => t.id === initialTrackId);
      if (match) return match;
    }
    return SANSKRIT_VERIFIED_LIBRARY[0];
  });

  const [gender, setGender] = useState<VoiceGender>(aiVoiceover.getUserVoiceGender());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85); // Recommended calm pace
  const [targetRepeatCount, setTargetRepeatCount] = useState<number>(108); // 108 Japa default
  const [currentRepeatCount, setCurrentRepeatCount] = useState<number>(1);
  const [autoRepeatEnabled, setAutoRepeatEnabled] = useState<boolean>(true);
  const [isTanpuraActive, setIsTanpuraActive] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(30);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showTrackDropdown, setShowTrackDropdown] = useState<boolean>(false);

  const timerRef = useRef<any>(null);

  // Sync duration with selected track
  useEffect(() => {
    setDurationSec(selectedTrack.durationSeconds || 30);
    setCurrentTimeSec(0);
    setCurrentRepeatCount(1);
    if (isPlaying) {
      audioEngine.stopSpeaking();
      setIsPlaying(false);
    }
  }, [selectedTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioEngine.stopSpeaking();
      audioEngine.stopTanpura();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stopSpeaking();
      if (isTanpuraActive) audioEngine.stopTanpura();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startChantingCycle(currentRepeatCount);
  };

  const startChantingCycle = (cycle: number) => {
    setIsPlaying(true);
    audioEngine.playTempleBell();

    if (isTanpuraActive) {
      audioEngine.startTanpura(136.1);
    }

    // Progress simulation timer
    setCurrentTimeSec(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentTimeSec((prev) => {
        if (prev >= durationSec) {
          return durationSec;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    // Audio Chanting execution:
    // Architecture rule: Pure Sanskrit chant uses Verified Sanskrit Recording or high-fidelity Brahman chant
    const activeUrl = gender === 'female' ? selectedTrack.audioUrls.female : selectedTrack.audioUrls.male;

    audioEngine.playBrahmanChant({
      text: selectedTrack.devanagari,
      audioUrl: activeUrl,
      lang: 'sa-IN',
      rate: playbackSpeed,
      withTanpura: false,
      onEnd: () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentTimeSec(durationSec);

        // Check Repeat condition
        if (autoRepeatEnabled && cycle < targetRepeatCount) {
          const nextCycle = cycle + 1;
          setCurrentRepeatCount(nextCycle);
          setTimeout(() => {
            startChantingCycle(nextCycle);
          }, 400);
        } else {
          setIsPlaying(false);
          audioEngine.playTempleBell();
          if (isTanpuraActive) audioEngine.stopTanpura();
        }
      }
    });
  };

  const handleGenderChange = (newGender: VoiceGender) => {
    setGender(newGender);
    aiVoiceover.setUserVoiceGender(newGender);
    if (isPlaying) {
      audioEngine.stopSpeaking();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      // Re-trigger current cycle at new pace
      startChantingCycle(currentRepeatCount);
    }
  };

  const handleRepeatCountChange = (count: number) => {
    setTargetRepeatCount(count);
    setCurrentRepeatCount(1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedTrack.title[currentLang] || selectedTrack.title.mr,
        text: `${selectedTrack.title.mr} - ${selectedTrack.devanagari} | सनातन अमृतधारा ऑडिओ जप`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${selectedTrack.title.mr}\n${selectedTrack.devanagari}\n${window.location.href}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Main Glassmorphic Devotional Player Card */}
      <div className="rounded-3xl bg-white dark:bg-[#151210] border border-amber-300/80 dark:border-amber-900/60 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient Cosmic Background Aura */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-saffron-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Track Selector Dropdown */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
          <div className="relative">
            <button
              onClick={() => setShowTrackDropdown(!showTrackDropdown)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-stone-900 border border-amber-300 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-300 shadow-sm hover:border-amber-400 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{selectedTrack.title[currentLang] || selectedTrack.title.mr}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Dropdown Menu */}
            {showTrackDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-800 shadow-2xl p-2 z-50 max-h-80 overflow-y-auto">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-3 py-1 block">
                  पावन संस्कृत मंत्र ग्रंथालय (Verified Recordings)
                </span>
                {SANSKRIT_VERIFIED_LIBRARY.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setSelectedTrack(track);
                      setShowTrackDropdown(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex flex-col ${
                      track.id === selectedTrack.id
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-800 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{track.title[currentLang] || track.title.mr}</span>
                    <span className="text-[11px] font-mono opacity-80 mt-0.5">{track.devanagari.split('\n')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-600 border border-stone-200 dark:border-stone-700 transition-all shadow-sm"
            title="शेअर करा"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Traditional Recitation Badge */}
        <div className="relative z-10 text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 mb-3 shadow-sm">
            🕉️ Traditional Devotional Recitation • सत्यशोधित वैदिक पठण
          </span>

          {/* Deity Name & Titles */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-serifDev mb-1">
            {selectedTrack.title[currentLang] || selectedTrack.title.mr}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium mb-4">
            {selectedTrack.title.en} • {selectedTrack.deityName[currentLang]}
          </p>

          {/* Sacred Devanagari Verse Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-black/40 border border-amber-200 dark:border-amber-900/60 shadow-inner mb-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-900 dark:text-amber-300 font-serifDev tracking-wide leading-relaxed">
              {selectedTrack.devanagari}
            </p>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-mono">
              {selectedTrack.transliteration}
            </p>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic max-w-lg mx-auto">
            "{selectedTrack.meaning[currentLang] || selectedTrack.meaning.mr}"
          </p>
        </div>

        {/* Progress Timeline Scrubber */}
        <div className="relative z-10 mb-6">
          <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden cursor-pointer">
            <div
              className="bg-gradient-to-r from-amber-500 to-saffron-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentTimeSec / durationSec) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 mt-1.5 font-bold">
            <span>{formatTime(currentTimeSec)}</span>
            <span className="text-[11px] text-amber-800 dark:text-amber-400 font-serifDev">
              {targetRepeatCount > 1 && `जप प्रगती: ${currentRepeatCount} / ${targetRepeatCount} वेळा`}
            </span>
            <span>{formatTime(durationSec)}</span>
          </div>
        </div>

        {/* Core Audio Controls (Rewind, Play/Pause, Forward, Restart) */}
        <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 mb-8">
          <button
            onClick={() => {
              setCurrentTimeSec((prev) => Math.max(0, prev - 5));
            }}
            className="p-3 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all shadow-sm"
            title="५ सेकंद मागे"
          >
            <Rewind className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all scale-100 hover:scale-105 active:scale-95 ${
              isPlaying
                ? 'bg-gradient-to-br from-red-600 to-amber-600 ring-4 ring-amber-400/40 animate-pulse'
                : 'bg-gradient-to-br from-amber-500 via-saffron-600 to-amber-700 shadow-amber-900/30'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-9 sm:h-9 fill-white" />
            ) : (
              <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
            )}
          </button>

          <button
            onClick={() => {
              setCurrentTimeSec((prev) => Math.min(durationSec, prev + 5));
            }}
            className="p-3 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all shadow-sm"
            title="५ सेकंद पुढे"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentTimeSec(0);
              setCurrentRepeatCount(1);
              if (isPlaying) startChantingCycle(1);
            }}
            className="p-3 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all shadow-sm"
            title="पुन्हा सुरू करा"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Grid: Voice Gender, Playback Speed, Japa Repetition, Tanpura */}
        <div className="relative z-10 space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          
          {/* 1. Voice Selection (Male / Female Recitation) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <span>स्वर निवड (Voice Selection):</span>
            </span>
            <div className="inline-flex rounded-xl p-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <button
                onClick={() => handleGenderChange('male')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  gender === 'male'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <span>👨 पुरुष (Male Panditji)</span>
              </button>
              <button
                onClick={() => handleGenderChange('female')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  gender === 'female'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <span>👩 स्त्री (Female Chanting)</span>
              </button>
            </div>
          </div>

          {/* 2. Playback Speed Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
              पठण गती (Playback Speed):
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { speed: 0.75, label: '0.75× (गंभीर)' },
                { speed: 0.85, label: '0.85× (शांत)' },
                { speed: 1.0, label: '1.0× (सामान्य)' },
                { speed: 1.25, label: '1.25×' }
              ].map(({ speed, label }) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Japa Repeat Count Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5 text-amber-500" />
              <span>जप संकल्प (Repeat Count):</span>
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 11, 21, 51, 108].map((count) => (
                <button
                  key={count}
                  onClick={() => handleRepeatCountChange(count)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    targetRepeatCount === count
                      ? 'bg-gradient-to-r from-amber-600 to-saffron-600 text-white font-bold shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {count === 108 ? '१०८ (माला)' : `${count}×`}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Auto-Repeat & Tanpura Cosmic Drone Toggles */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={autoRepeatEnabled}
                onChange={(e) => setAutoRepeatEnabled(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
              />
              <span>सतत आवर्तन (Auto-Repeat Enabled)</span>
            </label>

            <button
              onClick={() => {
                const next = !isTanpuraActive;
                setIsTanpuraActive(next);
                if (isPlaying) {
                  if (next) audioEngine.startTanpura(136.1);
                  else audioEngine.stopTanpura();
                }
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isTanpuraActive
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-400'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-500 border border-stone-200 dark:border-stone-800'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-amber-500" />
              <span>१३६.१ Hz तानपुरा {isTanpuraActive ? 'चालू' : 'बंद'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

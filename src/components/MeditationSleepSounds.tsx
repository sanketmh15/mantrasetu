import { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Sparkles,
  Wind,
  Moon,
} from 'lucide-react';

interface MeditationSleepSoundsProps {
  currentLang: Language;
}

type SoundPreset = 'om136' | 'river' | 'bells' | 'tanpura' | 'forest';

export function MeditationSleepSounds({ currentLang }: MeditationSleepSoundsProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<SoundPreset>('om136');
  const [volume, setVolume] = useState<number>(0.65);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(30); // default 30 mins
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(30 * 60);
  const [isBreathingActive] = useState<boolean>(true);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCountdown, setBreathCountdown] = useState<number>(4);

  // Web Audio Context & Nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{ osc?: OscillatorNode; noise?: AudioNode; intervalId?: number }[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  // Initialize Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Stop active sounds cleanly
  const stopAudio = () => {
    activeNodesRef.current.forEach((item) => {
      if (item.osc) {
        try {
          item.osc.stop();
          item.osc.disconnect();
        } catch {
          // ignore
        }
      }
      if (item.noise) {
        try {
          item.noise.disconnect();
        } catch {
          // ignore
        }
      }
      if (item.intervalId) {
        window.clearInterval(item.intervalId);
      }
    });
    activeNodesRef.current = [];
  };

  // Play selected ambient sound preset
  const playPreset = (preset: SoundPreset) => {
    stopAudio();
    const ctx = getAudioContext();
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    if (preset === 'om136') {
      // 136.1 Hz Earth Cosmic OM (C#3) with harmonic overtone (272.2 Hz & 408.3 Hz)
      const freqs = [136.1, 272.2, 68.05];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle beating / breathing LFO
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10 second cycle
        lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        gain.gain.setValueAtTime(i === 0 ? 0.4 : 0.15, ctx.currentTime);
        osc.connect(gain);
        gain.connect(master);

        osc.start();
        lfo.start();
        activeNodesRef.current.push({ osc });
      });
    } else if (preset === 'river') {
      // Generates gentle pink noise filtered for flowing river Chandrabhaga water
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(450, ctx.currentTime);

      const riverGain = ctx.createGain();
      riverGain.gain.setValueAtTime(0.5, ctx.currentTime);

      whiteNoise.connect(lowpass);
      lowpass.connect(riverGain);
      riverGain.connect(master);
      whiteNoise.start();

      activeNodesRef.current.push({ noise: whiteNoise });
    } else if (preset === 'bells') {
      // Periodic resonant brass temple bell chimes (every 8 seconds)
      const playChime = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const c = audioCtxRef.current;
        const m = masterGainRef.current;
        const freqs = [587.33, 880, 1174.66]; // D5, A5, D6
        freqs.forEach((f, idx) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, c.currentTime);
          g.gain.setValueAtTime(0.15 / (idx + 1), c.currentTime);
          g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 3.8);
          osc.connect(g);
          g.connect(m);
          osc.start();
          osc.stop(c.currentTime + 4.0);
        });
      };

      playChime();
      const interval = window.setInterval(playChime, 8000);
      activeNodesRef.current.push({ intervalId: interval });
    } else if (preset === 'tanpura') {
      // Authentic Tanpura Pa-Sa-Sa-Sa drone (G3 196 Hz, C4 261.63 Hz)
      const notes = [196, 261.63, 261.63, 130.81];
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);

        gain.gain.setValueAtTime(0.06, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);

        osc.start();
        activeNodesRef.current.push({ osc });
      });
    } else if (preset === 'forest') {
      // Wind & birds gentle rustle
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(108, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      activeNodesRef.current.push({ osc });
    }
  };

  // Toggle Play / Stop
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      playPreset(activePreset);
      setIsPlaying(true);
      if (timerMinutes) {
        setSecondsRemaining(timerMinutes * 60);
      }
    }
  };

  // Handle preset change
  const handleChangePreset = (preset: SoundPreset) => {
    setActivePreset(preset);
    if (isPlaying) {
      playPreset(preset);
    }
  };

  // Update volume
  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(newVal, audioCtxRef.current.currentTime);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (isPlaying && secondsRemaining !== null && secondsRemaining > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev === null || prev <= 1) {
            // Timer expired: stop playback
            stopAudio();
            setIsPlaying(false);
            return 0;
          }
          // 60-second gentle fade-out
          if (prev <= 60 && masterGainRef.current && audioCtxRef.current) {
            const faded = (prev / 60) * volume;
            masterGainRef.current.gain.setValueAtTime(Math.max(0.001, faded), audioCtxRef.current.currentTime);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, secondsRemaining, volume]);

  // Clean up audio nodes on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Pranayama 4-7-8 Deep Breathing Cycle Timer
  useEffect(() => {
    if (!isBreathingActive) return;
    const interval = setInterval(() => {
      setBreathCountdown((prev) => {
        if (prev > 1) return prev - 1;

        if (breathPhase === 'inhale') {
          setBreathPhase('hold');
          return 7;
        } else if (breathPhase === 'hold') {
          setBreathPhase('exhale');
          return 8;
        } else {
          setBreathPhase('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number | null) => {
    if (totalSeconds === null) return '∞';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const presetsList = [
    {
      id: 'om136' as SoundPreset,
      name: { en: '136.1 Hz Cosmic Om Drone', hi: '१३६.१ हर्ट्ज़ ॐ ध्वनि', mr: '१३६.१ Hz ओंकार वैश्विक नाद' },
      desc: {
        en: 'Earth year resonance (Anahata Chakra) for deep peace and removing anxiety.',
        hi: 'अनाहत चक्र को जाग्रत करने वाली ब्रह्मांडीय ॐ ध्वनि।',
        mr: 'पृथ्वीच्या भ्रमणाशी सुसंगत पावन ओंकार नाद. मानसिक ताण दूर करून गाढ शांतता देतो.'
      },
      icon: '🕉️',
    },
    {
      id: 'river' as SoundPreset,
      name: { en: 'Chandrabhaga Holy River Stream', hi: 'चंद्रभागा पावन प्रवाह', mr: 'चंद्रभागेचा शांत पावन प्रवाह' },
      desc: {
        en: 'Gentle, soothing water stream of sacred Chandrabhaga in Pandharpur.',
        hi: 'पंढरपुर की पावन चंद्रभागा नदी का शांत जल प्रवाह।',
        mr: 'पंढरपूरच्या चंद्रभागा तीरावरील संथ खळाळणारे पावन जल.'
      },
      icon: '🌊',
    },
    {
      id: 'bells' as SoundPreset,
      name: { en: 'Ancient Temple Bells & Chimes', hi: 'मंदिर घंटा एवं मंगल नाद', mr: 'प्राचीन मंदिर घंटा व किलबिलाट' },
      desc: {
        en: 'Authentic brass temple bells echoing peace in the early morning sanctum.',
        hi: 'प्रातःकाल की पावन मंदिर घंटियों की दिव्य गूंज।',
        mr: 'पहाटेच्या काकड आरतीच्या वेळी घुमणाऱ्या पितळी घंटांची मंगल स्पंदने.'
      },
      icon: '🔔',
    },
    {
      id: 'tanpura' as SoundPreset,
      name: { en: 'Vedic Meditative Tanpura (Sa-Pa)', hi: 'वैदिक ध्यान तानपुरा', mr: 'ध्यानमग्न सा-प तानपुरा' },
      desc: {
        en: 'Continuous acoustic Tanpura drone for mantra japa and dhyana.',
        hi: 'नामजप और ध्यान के लिए अखंड शास्त्रीय तानपुरा।',
        mr: 'जप व साधनेसाठी उपयुक्त अखंड शास्त्रीय तानपुऱ्याची स्वरझंकार.'
      },
      icon: '🪕',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Moon className="w-4 h-4 text-indigo-500" />
          <span>
            {currentLang === 'en'
              ? 'Akhand Bhakti Meditation & Sleep Sanctuary'
              : currentLang === 'hi'
              ? 'अखंड भक्ति ध्यान एवं शांत निद्रा'
              : 'अखंड भक्ती ध्यान व गाढ निद्रा साधना'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Spiritual Soundscapes & Sleep Timer'
            : currentLang === 'hi'
            ? 'दिव्य ध्यान ध्वनियां एवं स्लीप टाइमर'
            : 'शांत ध्यान ध्वनी, प्राणायाम व स्लीप टाइमर'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Immerse in pure 136.1 Hz Om vibrations, sacred Chandrabhaga water, and temple bells with automatic 60-second gentle fade-out.'
            : currentLang === 'hi'
            ? '१३६.१ हर्ट्ज़ ॐ ध्वनि, चंद्रभागा का शांत जल और मंदिर की घंटियां। तनावमुक्ति एवं गहरी नींद के लिए।'
            : '१३६.१ Hz ओंकार स्पंदने, चंद्रभागेचा पावन प्रवाह व मंदिरातील घंटा. रात्री झोपताना किंवा ध्यानासाठी ६० सेकंदांच्या हळुवार फेड-आउटसह.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT / MAIN COLUMN: SOUND CONTROLS & PRESETS */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Player Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-stone-900 to-stone-950 text-white shadow-2xl border border-indigo-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Status & Timer readout */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-stone-500'}`} />
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-300">
                  {isPlaying
                    ? currentLang === 'en'
                      ? 'Playing Live Soundscape'
                      : 'अखंड ध्वनी चालू आहे'
                    : currentLang === 'en'
                    ? 'Paused'
                    : 'थांबवले आहे'}
                </span>
              </div>

              {/* Countdown badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            {/* Active Sound Title */}
            <div className="mb-8">
              <span className="text-xs text-indigo-300 block mb-1">
                {currentLang === 'en' ? 'Active Meditation Frequency' : 'सध्या निवडलेला पावन नाद'}:
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-amber-200">
                {presetsList.find((p) => p.id === activePreset)?.name[currentLang]}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-lg">
                {presetsList.find((p) => p.id === activePreset)?.desc[currentLang]}
              </p>
            </div>

            {/* Large Play/Pause & Volume controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
              <button
                onClick={handleTogglePlay}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base shadow-xl transition-all ${
                  isPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40'
                    : 'bg-gradient-to-r from-amber-500 to-saffron-600 hover:from-amber-400 hover:to-saffron-500 text-stone-950 font-black shadow-amber-900/40'
                }`}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
                <span>
                  {isPlaying
                    ? currentLang === 'en'
                      ? 'Stop Ambient Sound'
                      : 'नाद थांबवा'
                    : currentLang === 'en'
                    ? 'Begin Meditation'
                    : 'साधना सुरू करा'}
                </span>
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 w-full sm:w-56">
                <button
                  onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.65)}
                  className="text-stone-300 hover:text-white"
                >
                  {volume === 0 ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-indigo-300" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <span className="text-xs font-mono text-stone-300 w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Sound Presets Selector Cards */}
          <div>
            <h3 className="text-base font-bold font-serifDev text-stone-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                {currentLang === 'en' ? 'Select Spiritual Soundscape' : 'पावन नाद व ध्वनी निवडा'}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presetsList.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleChangePreset(preset.id)}
                    className={`p-4 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500/10 to-indigo-500/15 dark:from-amber-950/40 dark:to-indigo-950/50 border-amber-500 dark:border-amber-500 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-2xl">{preset.icon}</span>
                      <span className="font-bold text-sm text-stone-900 dark:text-white font-serifDev">
                        {preset.name[currentLang]}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                      {preset.desc[currentLang]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sleep Timer Selector */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-stone-900 dark:text-white font-serifDev flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" />
                <span>
                  {currentLang === 'en'
                    ? 'Sleep Timer (Automatic 60s Fade-Out)'
                    : 'स्लीप टाइमर (६० सेकंद हळुवार फेड-आउट)'}
                </span>
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {timerMinutes ? `${timerMinutes} min` : 'Continuous (अखंड)'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[15, 30, 45, 60, 90, null].map((mins, idx) => {
                const isActive = timerMinutes === mins;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setTimerMinutes(mins);
                      setSecondsRemaining(mins ? mins * 60 : null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {mins === null ? (currentLang === 'en' ? 'Continuous ∞' : 'अखंड ∞') : `${mins} ${currentLang === 'en' ? 'mins' : 'मि.'}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRANAYAMA 4-7-8 DEEP BREATHING CIRCLE */}
        <div className="lg:col-span-5">
          <div className="h-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-50 to-amber-50/40 dark:from-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between text-center relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-semibold mb-3">
                <Wind className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {currentLang === 'en'
                    ? '4-7-8 Yogic Breathwork'
                    : '४-७-८ प्राणायाम ध्यान मार्गदर्शक'}
                </span>
              </div>
              <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white">
                {currentLang === 'en' ? 'Mindful Breathing' : 'शांत श्वासोच्छ्वास ध्यान'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-xs mx-auto">
                {currentLang === 'en'
                  ? 'Follow the sacred breathing ring to naturally lower your heart rate and calm your nervous system.'
                  : 'स्क्रीनवरील रिंगच्या तालावर श्वास घ्या, रोखून धरा व हळूच सोडा. मन एकाग्र होईल.'}
              </p>
            </div>

            {/* Animated Expanding/Contracting Breathing Ring */}
            <div className="my-10 flex flex-col items-center justify-center relative">
              <div
                className={`w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 relative shadow-2xl ${
                  breathPhase === 'inhale'
                    ? 'scale-110 border-emerald-400 bg-emerald-500/10 shadow-emerald-500/20'
                    : breathPhase === 'hold'
                    ? 'scale-110 border-amber-400 bg-amber-500/15 shadow-amber-500/30'
                    : 'scale-90 border-indigo-400 bg-indigo-500/10 shadow-indigo-500/20'
                }`}
              >
                {/* Outer glowing pulsing halo */}
                <div
                  className={`absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none ${
                    breathPhase === 'inhale' ? 'bg-emerald-400' : breathPhase === 'hold' ? 'bg-amber-400' : 'bg-indigo-400'
                  }`}
                  style={{ animationDuration: '3s' }}
                />

                <span className="text-3xl mb-1">
                  {breathPhase === 'inhale' ? '🌱' : breathPhase === 'hold' ? '🪷' : '🍃'}
                </span>

                <span className="text-lg font-bold font-serifDev text-stone-900 dark:text-white">
                  {breathPhase === 'inhale'
                    ? currentLang === 'en'
                      ? 'Inhale (श्वास घ्या)'
                      : 'श्वास घ्या (पूरक)'
                    : breathPhase === 'hold'
                    ? currentLang === 'en'
                      ? 'Hold (रोखून धरा)'
                      : 'रोखून धरा (कुंभक)'
                    : currentLang === 'en'
                    ? 'Exhale (हळू सोडा)'
                    : 'हळूच सोडा (रेचक)'}
                </span>

                <span className="text-3xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
                  {breathCountdown}s
                </span>
              </div>
            </div>

            {/* Bottom Breathing Tips */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="font-semibold text-stone-800 dark:text-stone-100 block mb-0.5">
                {currentLang === 'en' ? 'Vedic Shanti Sutra' : 'योगशास्त्र सुभाषित'}:
              </span>
              {currentLang === 'en'
                ? '“Chale vate chalam chittam nischale nischalam bhavet” — When breath is steady, the mind becomes calm and peaceful.'
                : '“चले वाते चलं चित्तं निश्चले निश्चलं भवेत्” — श्वास स्थिर झाला की मन आपोआप शांत व समाधानी होते.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { audioEngine } from '../utils/audioSynth';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Bell,
  X,
  Play
} from 'lucide-react';

interface NamasteGreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const NamasteGreetingModal: React.FC<NamasteGreetingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const greetingTexts = {
    topTag: {
      en: '॥ Om Namah Shivaya • Jai Shri Ram • Ram Krishna Hari ॥',
      hi: '॥ ॐ नमः शिवाय • जय श्री राम • राम कृष्ण हरी ॥',
      mr: '॥ ॐ नमः शिवाय • जय श्री राम • राम कृष्ण हरी ॥',
    },
    title: {
      en: '॥ Divine Namaste • Welcome to Sanatan Amrutdhara ॥',
      hi: '॥ पावन नमस्कार • सनातन अमृतधारा में आपका स्वागतम् ॥',
      mr: '॥ पावन नमस्कार • सनातन अमृतधारामध्ये आपले स्वागतम् ॥',
    },
    subtitle: {
      en: 'Welcome to your peaceful digital sanctuary. May the divine blessings of Lord Shiva, Shri Ram, and Vitthal Mauli illuminate your day with peace, strength, and serenity.',
      hi: 'सनातन अमृतधारा डिजिटल भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान शिव, श्री राम एवं विठुराया के पावन आशीर्वाद से आपका दिन मंगलमय, शांतिमय एवं आरोग्यदायी हो।',
      mr: 'सनातन अमृतधारा डिजिटल भक्तीपीठामध्ये आपले सहर्ष स्वागत आहे. देवाधिदेव महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय, शांत व आनंदाचा जावो.',
    },
    speechText: {
      en: 'Namaskar! Welcome to the Sanatan Amrutdhara Spiritual Portal. May Lord Shiva, Shri Ram, and Vitthal Mauli bless your day with peace, positive energy, and divine grace.',
      hi: 'नमस्कार! सनातन अमृतधारा पावन भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।',
      mr: 'नमस्कार! सनातन अमृतधारा पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.',
    },
    enterBtn: {
      en: 'Enter Sanctuary (प्रवेश करा) 🙏',
      hi: 'दर्शन दालन में प्रवेश करें 🙏',
      mr: 'भक्ती दालनात प्रवेश करा 🙏',
    },
    soundOn: {
      en: 'Sound On',
      hi: 'ध्वनि चालू',
      mr: 'आवाज सुरू',
    },
    soundOff: {
      en: 'Mute',
      hi: 'म्यूट',
      mr: 'शांत',
    },
    dontShow: {
      en: "Don't show again this session",
      hi: 'इस सत्र में पुनः न दिखाएं',
      mr: 'या सत्रात पुन्हा दाखवू नका',
    },
  };

  // Play audio greeting when modal opens
  useEffect(() => {
    if (!isOpen) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    let isCancelled = false;

    const startDevotionalGreeting = async () => {
      try {
        await audioEngine.unlockAudioContext();
        if (isCancelled) return;

        // Ensure video plays
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }

        if (!isAudioMuted) {
          setIsPlayingAudio(true);
          audioEngine.playTempleBell();

          // Wait a gentle moment after bell chime, then recite greeting in Amitabh Bachchan voice
          setTimeout(() => {
            if (isCancelled || isAudioMuted) return;

            audioEngine.playBrahmanChant({
              text: greetingTexts.speechText[currentLang],
              lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
              withTanpura: true,
              rate: 0.78,
              onEnd: () => {
                if (!isCancelled) {
                  setIsPlayingAudio(false);
                }
              },
            });
          }, 600);
        }
      } catch (e) {
        console.warn('Audio greeting auto-start caught:', e);
      }
    };

    const timer = setTimeout(startDevotionalGreeting, 350);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      audioEngine.stopSpeaking();
    };
  }, [isOpen, currentLang]);

  const handleToggleSound = () => {
    if (isAudioMuted || !isPlayingAudio) {
      setIsAudioMuted(false);
      setIsPlayingAudio(true);
      audioEngine.playTempleBell();
      audioEngine.playBrahmanChant({
        text: greetingTexts.speechText[currentLang],
        lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
        withTanpura: true,
        rate: 0.78,
        onEnd: () => setIsPlayingAudio(false),
      });
    } else {
      setIsAudioMuted(true);
      setIsPlayingAudio(false);
      audioEngine.stopSpeaking();
    }
  };

  const handlePlayBellOnly = () => {
    audioEngine.playTempleBell();
  };

  const handlePlayShankhaOnly = () => {
    audioEngine.playShankha();
  };

  const handleEnterApp = () => {
    audioEngine.playTempleBell();
    audioEngine.stopSpeaking();
    if (dontShowAgain) {
      try {
        sessionStorage.setItem('mantrasetu_namaste_dismissed', 'true');
      } catch {}
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      {/* Background Sacred Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/25 via-saffron-600/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-t from-red-600/20 via-amber-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Devotional Greeting Dialog Box */}
      <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-gradient-to-b from-[#1c1712] via-[#14100c] to-[#0c0906] border-2 border-amber-400/70 shadow-[0_0_80px_rgba(245,158,11,0.35)] p-5 sm:p-8 text-center text-white overflow-hidden ring-1 ring-amber-300/30">
        
        {/* Top Decorative Border Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-saffron-500 shadow-sm" />

        {/* Close Button in Top Corner */}
        <button
          onClick={handleEnterApp}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors z-20"
          title="प्रवेश करा / Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Shloka Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-serifDev font-bold tracking-wider mb-4 shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{greetingTexts.topTag[currentLang]}</span>
        </div>

        {/* Centerpiece: Namaste Hands Video Frame */}
        <div className="relative mx-auto w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.45)] ring-4 ring-amber-500/20 mb-5 bg-stone-900 flex items-center justify-center group">
          {!videoError ? (
            <video
              ref={videoRef}
              src="/assets/namaste_hands.mp4"
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            // Fallback hands illustration if video fails to load
            <div className="text-7xl animate-bounce">
              🙏
            </div>
          )}

          {/* Video Inner Vignette & Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Quick Sound Toggle floating badge over video */}
          <button
            onClick={handleToggleSound}
            className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all active:scale-95 ${
              isPlayingAudio
                ? 'bg-amber-600/90 text-white ring-2 ring-amber-300 animate-pulse'
                : 'bg-black/70 text-amber-300 hover:bg-black/90 border border-amber-500/50'
            }`}
            title="Toggle Namaste Voiceover"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white animate-bounce" />
                <span className="text-[11px] font-mono">वाजत आहे</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] font-mono">आवाज चालू करा</span>
              </>
            )}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-3xl font-extrabold font-serifDev text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 tracking-wide mb-2">
          {greetingTexts.title[currentLang]}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-stone-300 font-serifDev leading-relaxed max-w-xl mx-auto mb-6 px-2">
          {greetingTexts.subtitle[currentLang]}
        </p>

        {/* Audio Quick Bar: Live status + Bell & Shankha icons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs">
          <button
            onClick={handleToggleSound}
            className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
              isPlayingAudio
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-500/50'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400" />}
            <span>
              {isPlayingAudio
                ? (currentLang === 'en' ? 'Big B Voice Reciting...' : 'अमिताभ बच्चन व्हॉईस सुरू आहे...')
                : (currentLang === 'en' ? 'Play Amitabh Voiceover' : 'अमिताभ बच्चन आवाजात ऐका')}
            </span>
          </button>

          <button
            onClick={handlePlayBellOnly}
            className="px-3 py-1.5 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/50 flex items-center gap-1.5 transition-all active:scale-95"
            title="मंदिराची घंटा वाजवा"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLang === 'en' ? 'Temple Bell' : 'घंटानाद 🔔'}</span>
          </button>

          <button
            onClick={handlePlayShankhaOnly}
            className="px-3 py-1.5 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/50 flex items-center gap-1.5 transition-all active:scale-95"
            title="पावन शंखनाद करा"
          >
            <span>📯</span>
            <span>{currentLang === 'en' ? 'Shankha' : 'शंखनाद'}</span>
          </button>
        </div>

        {/* Main Golden Enter Button */}
        <div className="space-y-3">
          <button
            onClick={handleEnterApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-500 to-saffron-600 hover:from-saffron-500 hover:via-amber-400 hover:to-saffron-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-amber-900/40 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all ring-2 ring-amber-300/40"
          >
            <span>{greetingTexts.enterBtn[currentLang]}</span>
          </button>

          {/* Session Remember Checkbox */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <label className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-400 hover:text-stone-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-amber-500 cursor-pointer"
              />
              <span>{greetingTexts.dontShow[currentLang]}</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

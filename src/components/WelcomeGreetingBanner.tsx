import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { audioEngine } from '../utils/audioSynth';
import { Sparkles, Volume2, VolumeX, X } from 'lucide-react';

interface WelcomeGreetingBannerProps {
  currentLang: Language;
  activeTab: string;
  selectedGodName?: string;
  selectedGodGreeting?: string;
}

export const WelcomeGreetingBanner: React.FC<WelcomeGreetingBannerProps> = ({
  currentLang,
  activeTab,
  selectedGodName,
  selectedGodGreeting,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlayingAartiSample, setIsPlayingAartiSample] = useState(false);

  const handleToggleAartiSample = () => {
    if (isPlayingAartiSample) {
      audioEngine.stopSpeaking();
      setIsPlayingAartiSample(false);
    } else {
      audioEngine.stopSpeaking();
      setIsSpeaking(false);
      setIsPlayingAartiSample(true);
      audioEngine.playTempleBell();
      audioEngine.playHumanAudio('/audio/amitabh_sample.mp3', () => {
        setIsPlayingAartiSample(false);
      });
    }
  };

  // Determine greeting based on activeTab
  const getGreetingData = () => {
    if (activeTab === 'home') {
      return {
        icon: '🚩',
        title: {
          en: 'Divine Welcome to MantraSetu Spiritual Portal',
          hi: 'मंत्रसेतु पावन भक्ति संकुल में आपका हार्दिक स्वागत है',
          mr: 'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे',
        },
        subtitle: {
          en: 'May your day be blessed with peace, positive energy, and divine grace. "Om Namah Shivaya • Jai Shri Ram • Ram Krishna Hari"',
          hi: 'भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।',
          mr: 'महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.',
        },
        speechText:
          currentLang === 'en'
            ? 'Welcome to the MantraSetu Spiritual Portal. May Lord Shiva, Shri Ram, and Vitthal Mauli bless your day with peace, positive energy, and divine grace.'
            : currentLang === 'hi'
            ? 'मंत्रसेतु पावन भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।'
            : 'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.',
      };
    }

    if (activeTab === 'deities') {
      return {
        icon: '🕉️',
        title: {
          en: 'Unified Sanctuary of All 50 Sacred Deities',
          hi: 'समस्त ५० पावन देवी-देवता दर्शन दालन',
          mr: 'सर्व ५० पावन देव-देवता दर्शन दालन',
        },
        subtitle: {
          en: 'Serial-wise sacred shrines from #01 Lord Ganesha to #50 Mata Kamakhya. Click any deity to explore their holy sanctuary and 108 japa mala.',
          hi: 'गणपति बप्पा से लेकर कुलदेवता एवं शक्तिपीठों तक ५० पावन देवताओं का क्रमानुसार दर्शन करें।',
          mr: 'गणपती बाप्पा, महादेव, विठुराया, जेजुरीचे खंडेराया ते ५० पावन देवतांचे अनुक्रमे दर्शन घ्या व १०८ जपमाळ चालवा.',
        },
        speechText: 'सर्व ५० पावन देव देवता दर्शन दालनात आपले स्वागत आहे. कोणत्याही देवतेवर क्लिक करून दर्शन व जपमाळ सुरू करा.',
      };
    }

    if (activeTab === 'kumbh') {
      return {
        icon: '🌊',
        title: {
          en: 'Har Har Gange! Simhastha Kumbh Mela Maha Parva',
          hi: 'हर हर गंगे! पावन सिंहस्थ कुंभमेळा दर्शन',
          mr: 'हर हर गंगे! सिंहस्थ कुंभमेळा नाशिक-त्र्यंबकेश्वर',
        },
        subtitle: {
          en: 'Welcome to the sacred confluence of River Godavari & Sangam. Explore Shahi Snan dates, 13 Akharas, holy ghats, and emergency routes.',
          hi: 'नाशिक त्र्यंबकेश्वर रामकुंड एवं प्रयागराज पावन संगम पर आपका स्वागत है।',
          mr: 'गोदावरी तीरावरील पावन रामकुंड, त्र्यंबकेश्वर कुशावर्त आणि प्रयागराज संगमावर आपले सहर्ष स्वागत आहे.',
        },
        speechText: 'हर हर गंगे! सिंहस्थ कुंभमेळा नाशिक त्र्यंबकेश्वर व प्रयागराज पावन पर्वात आपले स्वागत आहे.',
      };
    }

    if (activeTab === 'god-detail' && selectedGodName) {
      return {
        icon: '🪷',
        title: {
          en: `Welcome to the Divine Sanctuary of ${selectedGodName}`,
          hi: `${selectedGodName} के पावन धाम में आपका स्वागत है`,
          mr: `${selectedGodName} यांच्या पावन दरबारात आपले स्वागत`,
        },
        subtitle: {
          en: selectedGodGreeting || 'May the divine blessings illuminate your life with peace, health, and wisdom.',
          hi: selectedGodGreeting || 'प्रभु के पावन आशीर्वाद से आपका जीवन सुखमय हो।',
          mr: selectedGodGreeting || 'देवतेच्या पावन आशीर्वादाने आपले जीवन सुख, समाधान व शांतीने उजळून निघो.',
        },
        speechText: selectedGodGreeting || `${selectedGodName} यांच्या पावन चरणी आपले सहर्ष स्वागत.`,
      };
    }

    return null;
  };

  const greeting = getGreetingData();

  // Auto-play welcome greeting whenever Home page is opened
  useEffect(() => {
    setIsVisible(true);
    audioEngine.stopSpeaking();
    setIsSpeaking(false);

    if (!greeting || activeTab !== 'home') return;

    let isCancelled = false;
    let hasSpoken = false;

    const playGreeting = async () => {
      if (isCancelled || hasSpoken) return;
      hasSpoken = true;
      await audioEngine.unlockAudioContext();
      setIsSpeaking(true);
      audioEngine.playTempleBell();
      audioEngine.playBrahmanChant({
        text: greeting.speechText,
        lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
        withTanpura: true,
        rate: 0.78,
        onEnd: () => {
          if (!isCancelled) {
            setIsSpeaking(false);
          }
        },
      });
    };

    // 1. Attempt auto-play after a short comfortable page-settle delay (700ms)
    const timer = setTimeout(() => {
      if (!isCancelled && !hasSpoken) {
        playGreeting();
      }
    }, 700);

    // 2. Gesture fallback: If browser restricts unprompted cold audio before first touch,
    // trigger instantly on the user's very first click, tap, or keypress anywhere on the screen!
    const handleGesture = () => {
      if (!isCancelled && !hasSpoken && !audioEngine.isSpeaking()) {
        playGreeting();
      }
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      audioEngine.stopSpeaking();
      setIsSpeaking(false);
    };
  }, [activeTab, currentLang]);

  const handleSpeak = async () => {
    if (!greeting) return;
    if (isSpeaking) {
      audioEngine.stopSpeaking();
      setIsSpeaking(false);
    } else {
      await audioEngine.unlockAudioContext();
      setIsSpeaking(true);
      audioEngine.playTempleBell();
      audioEngine.playBrahmanChant({
        text: greeting.speechText,
        lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
        withTanpura: true,
        rate: 0.78,
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  if (!greeting || !isVisible) return null;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2 w-full">
      <div className="relative rounded-2xl p-3 sm:p-5 bg-gradient-to-r from-amber-500/15 via-saffron-500/15 to-amber-600/10 dark:from-amber-950/40 dark:via-stone-900/60 dark:to-amber-950/30 border border-amber-300/60 dark:border-amber-700/50 backdrop-blur-md shadow-sm flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all animate-fadeIn w-full">
        
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 to-amber-500 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
            <span>{greeting.icon}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {currentLang === 'en' ? 'Welcome Greeting' : 'पावन अभिवादन'}
              </span>
              {isSpeaking && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 text-[10px] font-bold animate-pulse">
                  <Volume2 className="w-3 h-3 animate-bounce" />
                  {currentLang === 'en' ? 'Big B Speaking...' : 'अमिताभ बच्चन व्हॉईस सुरू आहे...'}
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold font-serifDev text-stone-900 dark:text-white">
              {greeting.title[currentLang]}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-3xl mt-0.5">
              {greeting.subtitle[currentLang]}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Authentic Amitabh Bachchan Aarti Sample Button */}
          <button
            onClick={handleToggleAartiSample}
            title={currentLang === 'en' ? 'Play authentic Amitabh Bachchan Ganpati Aarti sample' : 'अमिताभ बच्चन यांच्या आवाजातील सुखकर्ता दुखहर्ता आरती सॅम्पल ऐका'}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isPlayingAartiSample
                ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-300 animate-pulse'
                : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-amber-300 border border-amber-500/40 active:scale-95'
            }`}
          >
            <span>{isPlayingAartiSample ? '⏹️' : '🎙️'}</span>
            <span className="hidden md:inline">
              {isPlayingAartiSample
                ? (currentLang === 'en' ? 'Aarti Playing...' : 'आरती सुरू आहे...')
                : (currentLang === 'en' ? 'Big B Aarti' : 'अमिताभ बच्चन आरती')}
            </span>
            <span className="md:hidden">
              {isPlayingAartiSample ? 'थांबवा' : 'आरती'}
            </span>
          </button>

          {/* Prominent Amitabh Bachchan Audio Speech Button */}
          <button
            onClick={handleSpeak}
            title={currentLang === 'en' ? 'Listen to Welcome Greeting in Amitabh Bachchan voice' : 'अमिताभ बच्चन यांच्या आवाजात पावन अभिवादन ऐका'}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isSpeaking
                ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 animate-pulse'
                : 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white border border-amber-300/40 shadow-amber-500/20 active:scale-95'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Stop' : 'थांबवा'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-200" />
                <span className="hidden sm:inline">
                  {currentLang === 'en' ? 'Big B Voice' : 'पावन अभिवादन ऐका'}
                </span>
                <span className="sm:hidden">
                  {currentLang === 'en' ? 'Listen' : 'ऐका'}
                </span>
              </>
            )}
          </button>

          {/* Dismiss Button */}
          <button
            onClick={() => {
              audioEngine.stopSpeaking();
              setIsSpeaking(false);
              setIsVisible(false);
            }}
            title="Dismiss"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};


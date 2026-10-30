import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { audioEngine } from '../utils/audioSynth';
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Dices
} from 'lucide-react';

interface DivinePortalOrbProps {
  currentLang: Language;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

interface QuickAction {
  id: string;
  label: { en: string; hi: string; mr: string };
  icon: string;
  color: string;
  badge?: string;
}

const QUICK_PORTALS: QuickAction[] = [
  {
    id: 'live-darshan',
    label: { en: 'Live Darshan', hi: 'सीधा दर्शन', mr: '🔴 थेट दर्शन' },
    icon: '🛕',
    color: 'from-red-600 to-rose-500',
    badge: 'LIVE'
  },
  {
    id: 'japa',
    label: { en: '108 Mala Japa', hi: '१०८ जप माला', mr: '📿 १०८ जप' },
    icon: '📿',
    color: 'from-amber-600 to-saffron-500',
    badge: '१०८'
  },
  {
    id: 'puja',
    label: { en: 'Virtual Puja', hi: 'डिजिटल पूजा', mr: '🪔 पूजा दालन' },
    icon: '🪔',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'rashi',
    label: { en: 'Daily Nakshatra', hi: 'दैनिक नक्षत्र', mr: '🔮 रास-कुंडली' },
    icon: '🔮',
    color: 'from-indigo-600 to-purple-500',
    badge: 'आज'
  },
  {
    id: 'wari',
    label: { en: 'Wari 3D Route', hi: 'वारी ३D मार्ग', mr: '🚩 वारी ३D' },
    icon: '🚩',
    color: 'from-orange-600 to-amber-500',
    badge: '३D'
  },
  {
    id: 'meditation',
    label: { en: 'Sleep & Om Sounds', hi: 'ध्यान व ॐ नाद', mr: '🎧 ध्यान नाद' },
    icon: '🎧',
    color: 'from-cyan-600 to-blue-600'
  }
];

// Curated interesting surprise tabs
const SURPRISE_TABS = [
  { id: 'puja', name: { en: 'Virtual Puja Sanctum', hi: 'डिजिटल पूजा दालन', mr: 'श्री व्हर्च्युअल पूजा दालन' }, blessing: { en: 'May your home be filled with divine light and prosperity! 🪔', mr: 'आपल्या घरात मंगल, शांती आणि समृद्धी नांदो! 🪔', hi: 'आपके घर में सुख, शांति और समृद्धि का वास हो! 🪔' } },
  { id: 'live-darshan', name: { en: 'Live Darshan & Aartis', hi: 'सीधा दर्शन व आरतियां', mr: 'पंढरपूर व शिर्डी थेट दर्शन' }, blessing: { en: 'Darshan of Pandharpur Vitthal and Shirdi Sai! 🔴', mr: 'विठू माऊली व साईबाबांचे थेट पावन दर्शन! 🔴', hi: 'विट्ठल भगवान एवं साईं बाबा का पावन दर्शन! 🔴' } },
  { id: 'wari', name: { en: 'Pandharpur Wari 3D Route', hi: 'पंढरपुर वारी ३D', mr: 'संत ज्ञानेश्वर व तुकाराम महाराज पालखी ३D' }, blessing: { en: 'Experience the holy joy of Warkari pilgrims! 🚩', mr: 'ज्ञानोबा-तुकारामांच्या पावन पालखी सोहळ्याचा आनंद घ्या! 🚩', hi: 'वारकरी संतों की पावन यात्रा का आनंद लें! 🚩' } },
  { id: 'japa', name: { en: '108 Sacred Mala Japa', hi: '१०८ जप माला', mr: '१०८ जप माळ व नामस्मरण' }, blessing: { en: 'Chant divine names with authentic bead resonance! 📿', mr: 'मन शांत करा आणि १०८ वेळा नामस्मरण पूर्ण करा! 📿', hi: 'मन को शांत कर १०८ बार पावन नाम जपें! 📿' } },
  { id: 'rashi', name: { en: 'Daily Nakshatra & Lucky Remedies', hi: 'दैनिक नक्षत्र एवं उपाय', mr: 'आजची नक्षत्र पत्रिका व १-मिनिट उपाय' }, blessing: { en: 'Today’s auspicious color, lucky number & beej mantra! 🔮', mr: 'आजचा शुभ रंग, लकी नंबर आणि १-मिनिटाचा बीजमंत्र उपाय! 🔮', hi: 'आज का शुभ रंग, भाग्यशाली अंक व बीजमंत्र उपाय! 🔮' } },
  { id: 'kundali', name: { en: 'AI Janam Kundali Predictor', hi: 'एआई जन्म कुण्डली एवं भविष्य', mr: 'एआय जन्म कुंडली व १२ भाव भविष्य' }, blessing: { en: 'Predict your exact Vedic birth chart and life guidance! 🔮', mr: 'आपली अचूक जन्म पत्रिका, १२ भाव व एआय जीवन भविष्य जाणून घ्या! 🔮', hi: 'अपनी जन्म कुंडली एवं सटीक भविष्य जानिए! 🔮' } },
  { id: 'ashtavinayak', name: { en: 'Ashtavinayak 8 Ganesha Circuit', hi: 'अष्टविनायक यात्रा', mr: 'पावन अष्टविनायक यात्रा दर्शन' }, blessing: { en: 'May Vighnaharta Ganesha remove all obstacles! 🐘', mr: 'विघ्नहर्ता गणपती बाप्पा आपल्या जीवनातील सर्व संकटे दूर करोत! 🐘', hi: 'विघ्नहर्ता गणेश आपके सभी विघ्न दूर करें! 🐘' } },
  { id: 'jyotirlinga', name: { en: '5 Maharashtra Jyotirlingas', hi: 'महाराष्ट्र ५ ज्योतिर्लिंग', mr: 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंगे' }, blessing: { en: 'Har Har Mahadev! Cosmic blessings of Lord Shiva! 🔱', mr: 'हर हर महादेव! त्र्यंबकेश्वर, भीमाशंकर व घृष्णेश्वर महादेवांचे आशीर्वाद! 🔱', hi: 'हर हर महादेव! भगवान शिव का पावन आशीर्वाद! 🔱' } },
  { id: 'meditation', name: { en: 'Om & Temple Bells Meditation', hi: 'ध्यान व ॐ नाद संगीत', mr: 'अखंड ॐ नाद व मंदिर घंटा ध्वनी' }, blessing: { en: 'Rest in blissful silence and inner peace! 🎧', mr: 'शांत चित्ताने ध्यान करा व मनाला विश्रांती द्या! 🎧', hi: 'शांत मन से ध्यान लगाएं व मानसिक शांति प्राप्त करें! 🎧' } },
  { id: 'stories', name: { en: 'Kids Sanskara Stories', hi: 'बाल संस्कार कथाएँ', mr: 'बाल संस्कार व पौराणिक गोष्टी' }, blessing: { en: 'Inspiring virtues and stories for the whole family! 🧒', mr: 'मुलांसाठी प्रेरणादायी व संस्कारमय सुंदर कथा! 🧒', hi: 'बच्चों के लिए सुंदर संस्कार कथाएं! 🧒' } }
];

export const DivinePortalOrb: React.FC<DivinePortalOrbProps> = ({
  currentLang,
  activeTab,
  onTabChange,
  isSoundEnabled,
  onToggleSound,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [surpriseToast, setSurpriseToast] = useState<{
    name: string;
    blessing: string;
  } | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handlePortalClick = (tabId: string) => {
    if (isSoundEnabled) {
      audioEngine.playNavChime();
    }
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    onTabChange(tabId);
    setIsOpen(false);
  };

  const handleSurpriseMe = () => {
    const randomItem = SURPRISE_TABS[Math.floor(Math.random() * SURPRISE_TABS.length)];
    if (isSoundEnabled) {
      audioEngine.playTempleBell(660);
    }
    if (navigator.vibrate) {
      navigator.vibrate([20, 40, 20]);
    }

    setSurpriseToast({
      name: randomItem.name[currentLang],
      blessing: randomItem.blessing[currentLang],
    });

    setTimeout(() => {
      onTabChange(randomItem.id);
      setIsOpen(false);
    }, 450);

    setTimeout(() => {
      setSurpriseToast(null);
    }, 4500);
  };

  return (
    <>
      {/* Surprise Blessing Floating Toast */}
      {surpriseToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md p-4 rounded-3xl bg-gradient-to-r from-amber-950 via-[#211710] to-stone-950 border-2 border-amber-400 text-white shadow-2xl animate-bounce">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center text-xl shrink-0 shadow-md">
              ✨
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300">
                {currentLang === 'en' ? 'Divine Portal Discovered' : 'आजचे दैवी दालन उघडत आहे'}
              </span>
              <h4 className="text-sm font-bold font-serifDev text-white mt-0.5">
                {surpriseToast.name}
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                {surpriseToast.blessing}
              </p>
            </div>
            <button
              onClick={() => setSurpriseToast(null)}
              className="text-stone-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Speed-Dial Container (भक्ती चक्र) */}
      <div className="fixed bottom-20 md:bottom-8 right-3.5 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
        
        {/* Expanded Speed-Dial Petal Menu */}
        {isOpen && (
          <div className="mb-3 w-64 sm:w-72 rounded-3xl bg-[#15120f]/95 backdrop-blur-xl border border-amber-500/40 shadow-2xl p-3.5 text-white animate-fadeIn space-y-2 ring-1 ring-amber-400/20">
            {/* Header with Close and Sound Toggle */}
            <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs">
              <span className="font-bold font-serifDev text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{currentLang === 'en' ? 'Sacred Quick Wheel' : 'भक्ती चक्र • जलद दर्शन'}</span>
              </span>
              
              <div className="flex items-center gap-1.5">
                {/* Sound Chime Toggle */}
                <button
                  onClick={onToggleSound}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    isSoundEnabled
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                      : 'bg-stone-900 border-stone-700 text-stone-400'
                  }`}
                  title={isSoundEnabled ? 'ध्वनी बंद करा (Mute Chime)' : 'मंदिर ध्वनी सुरू करा (Enable Chime)'}
                >
                  {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Surprise Me Magic Button */}
            <button
              onClick={handleSurpriseMe}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-500 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 border border-amber-300/40 transition-all hover:scale-[1.02] group"
            >
              <Dices className="w-4 h-4 text-amber-200 group-hover:rotate-180 transition-transform duration-500" />
              <span>{currentLang === 'en' ? '🎲 Surprise Divine Portal' : '🎲 आजचे दैवी दालन (Surprise Me)'}</span>
            </button>

            {/* Quick Portal Grid */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {QUICK_PORTALS.map((portal) => {
                const isActive = activeTab === portal.id;
                return (
                  <button
                    key={portal.id}
                    onClick={() => handlePortalClick(portal.id)}
                    className={`p-2 rounded-xl text-left text-xs transition-all flex items-center gap-2 border ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-sm'
                        : 'bg-stone-900/80 hover:bg-stone-800/90 border-stone-800 text-stone-300 hover:text-white'
                    }`}
                  >
                    <span className="text-base shrink-0">{portal.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] leading-tight font-medium">
                        {portal.label[currentLang]}
                      </p>
                      {portal.badge && (
                        <span className="inline-block mt-0.5 text-[8px] font-bold px-1 rounded bg-stone-800 text-amber-300">
                          {portal.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Help Hint */}
            <div className="pt-2 border-t border-stone-800/80 text-[10px] text-stone-400 flex items-center justify-between">
              <span>॥ भक्ती चक्रातून थेट प्रवेश ॥</span>
              <span className="text-amber-400 font-mono">३५+ दालने</span>
            </div>
          </div>
        )}

        {/* The Golden Floating Lotus Trigger Button */}
        <button
          onClick={() => {
            if (isSoundEnabled) audioEngine.playNavChime();
            setIsOpen(!isOpen);
          }}
          className={`relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen
              ? 'bg-stone-900 border-2 border-amber-400 text-white rotate-90 scale-95'
              : 'bg-gradient-to-tr from-saffron-700 via-saffron-500 to-amber-400 border-2 border-amber-200 text-white hover:scale-110'
          }`}
          title="भक्ती चक्र (Sacred Quick Wheel)"
          aria-label="Toggle Sacred Quick Portal Wheel"
        >
          {/* Animated Glow Halo */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-saffron-500/40 animate-ping pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-amber-300" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="text-lg sm:text-2xl select-none transform group-hover:rotate-12 transition-transform">
                🕉️
              </span>
            </div>
          )}

          {/* Floating Tooltip Label */}
          {!isOpen && (
            <span className="absolute -left-20 top-1/2 -translate-y-1/2 hidden group-hover:inline-block px-2 py-1 rounded-lg text-[10px] font-bold bg-stone-950/90 text-amber-300 border border-amber-500/30 whitespace-nowrap shadow-md pointer-events-none">
              भक्ती चक्र ↗
            </span>
          )}
        </button>
      </div>
    </>
  );
};

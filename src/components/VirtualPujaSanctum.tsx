import React, { useState, useEffect, useRef } from 'react';
import { Language, DeityId } from '../types';
import { audioEngine } from '../utils/audioSynth';
import { getMantraBrahmanAudioUrl } from '../utils/brahmanAudioService';
import {
  Sparkles,
  Volume2,
  Square
} from 'lucide-react';

interface VirtualPujaSanctumProps {
  currentLang: Language;
  initialDeityId?: DeityId;
  onNavigateTab?: (tab: string) => void;
}

interface PujaDeity {
  id: DeityId;
  name: { en: string; hi: string; mr: string };
  symbol: string;
  image: string;
  mantra: string;
  flowerType: { en: string; hi: string; mr: string };
  flowerEmoji: string;
  naivedya: { en: string; hi: string; mr: string };
  tilakColor: string;
}

const pujaDeities: PujaDeity[] = [
  {
    id: 'ganesha',
    name: { en: 'Shri Ganesha', hi: 'श्री गणेश', mr: 'श्री गणेश (विघ्नहर्ता)' },
    symbol: '🐘',
    image: 'https://images.unsplash.com/photo-1567591370504-209224856426?auto=format&fit=crop&q=80&w=800',
    mantra: 'ॐ गं गणपतये नमः • सुखकर्ता दुखहर्ता वार्ता विघ्नाची',
    flowerType: { en: 'Red Hibiscus (जास्वंद) & Durva', hi: 'लाल जासवंद एवं दूर्वा', mr: 'लाल जास्वंद व २१ दुर्वांची जुडी' },
    flowerEmoji: '🌺',
    naivedya: { en: '21 Ukadiche Modak', hi: '२१ मोदक भोग', mr: '२१ उकडीचे मोदक व साजूक तूप' },
    tilakColor: 'bg-red-600',
  },
  {
    id: 'shiva',
    name: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'देवाधिदेव महादेव' },
    symbol: '🕉️',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    mantra: 'ॐ नमः शिवाय • ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
    flowerType: { en: 'Bilvapatra (बेलपत्र) & Dhatura', hi: 'बेलपत्र एवं धतूरा', mr: 'त्रिदल पावन बेलपत्र व धोत्रा' },
    flowerEmoji: '🍃',
    naivedya: { en: 'Panchamrit & Sweet Kheer', hi: 'पंचामृत एवं खीर', mr: 'पंचामृत अभिषेक व दुधाची खीर' },
    tilakColor: 'bg-stone-300',
  },
  {
    id: 'vitthal',
    name: { en: 'Lord Vitthal-Rakhumai', hi: 'श्री विट्ठल-रुक्मिणी', mr: 'विठू माऊली व रखुमाई' },
    symbol: '🪷',
    image: 'https://images.unsplash.com/photo-1590076215667-873d32098b95?auto=format&fit=crop&q=80&w=800',
    mantra: 'राम कृष्ण हरी • पुंडलिक वरदे हरी विठ्ठल श्री ज्ञानदेव तुकाराम',
    flowerType: { en: 'Sacred Tulsi Mala (तुळशी माळ)', hi: 'तुलसी माला एवं मंजिरी', mr: 'सुगंधी तुळशी माळ व मंजिरी' },
    flowerEmoji: '🌿',
    naivedya: { en: 'Pandharpur Pedha & Makhan', hi: 'पंढरपुर पेड़ा एवं मक्खन', mr: 'पंढरपूर पेढे व लोणी-साखर' },
    tilakColor: 'bg-amber-300',
  },
  {
    id: 'hanuman',
    name: { en: 'Shri Hanuman', hi: 'श्री हनुमान', mr: 'संकटमोचन श्री हनुमान' },
    symbol: '🚩',
    image: 'https://images.unsplash.com/photo-1608649399878-a669ff8c9ef1?auto=format&fit=crop&q=80&w=800',
    mantra: 'ॐ हं हनुमते नमः • जय जय जय हनुमान गोसाईं कृपा करहु गुरुदेव की नाईं',
    flowerType: { en: 'Rui Leaves & Sindoor Mala', hi: 'आक (रुई) के पत्ते व सिंदूर', mr: 'रुईच्या पानांची माळ व शेंदूर' },
    flowerEmoji: '🏵️',
    naivedya: { en: 'Boondi Ladoo & Betel Leaf (Vida)', hi: 'बूंदी लड्डू एवं पान का बीड़ा', mr: 'मोतीचूर/बुंदी लाडू व पूजेचा विडा' },
    tilakColor: 'bg-orange-600',
  },
];

export const VirtualPujaSanctum: React.FC<VirtualPujaSanctumProps> = ({
  currentLang,
  initialDeityId = 'ganesha',
}) => {
  const [selectedDeityId, setSelectedDeityId] = useState<DeityId>(initialDeityId);
  const activeDeity = pujaDeities.find((d) => d.id === selectedDeityId) || pujaDeities[0];

  // Ritual State
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isAartiWaving, setIsAartiWaving] = useState(false);
  const [isAartiAudioPlaying, setIsAartiAudioPlaying] = useState(false);
  const [flowerShowerCount, setFlowerShowerCount] = useState(0);
  const [isTilakApplied, setIsTilakApplied] = useState(false);
  const [isNaivedyaOffered, setIsNaivedyaOffered] = useState(false);
  const [isShankhaBlowing, setIsShankhaBlowing] = useState(false);
  const [aartiAngle, setAartiAngle] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Aarti Lamp Circular Motion Animation Frame
  useEffect(() => {
    let animId: number;
    if (isAartiWaving || isAartiAudioPlaying) {
      const animate = () => {
        setAartiAngle((prev) => (prev + 0.04) % (Math.PI * 2));
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAartiWaving, isAartiAudioPlaying]);

  // Flower Shower Particle Effect on Canvas
  useEffect(() => {
    if (flowerShowerCount === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedY: number; speedX: number; rotation: number; rotSpeed: number; emoji: string }[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 150,
        size: 20 + Math.random() * 16,
        speedY: 2 + Math.random() * 3.5,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 4,
        emoji: activeDeity.flowerEmoji,
      });
    }

    let frameId: number;
    let elapsedFrames = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      elapsedFrames++;
      if (elapsedFrames < 140) {
        frameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [flowerShowerCount, activeDeity.flowerEmoji]);

  // Handlers for Rituals
  const handleRingBell = () => {
    setIsBellRinging(true);
    audioEngine.playTempleBell();
    setTimeout(() => setIsBellRinging(false), 1200);
  };

  const handleBlowShankha = () => {
    setIsShankhaBlowing(true);
    audioEngine.playShankha();
    setTimeout(() => setIsShankhaBlowing(false), 3800);
  };

  const handleOfferFlowers = () => {
    setFlowerShowerCount((c) => c + 1);
    audioEngine.playBeadClick();
  };

  const handleApplyTilak = () => {
    setIsTilakApplied(true);
    audioEngine.playBeadClick();
  };

  const handleOfferNaivedya = () => {
    setIsNaivedyaOffered(true);
    audioEngine.playTempleBell();
  };

  const handleToggleAarti = () => {
    if (isAartiAudioPlaying) {
      audioEngine.stopSpeaking();
      setIsAartiAudioPlaying(false);
      setIsAartiWaving(false);
    } else {
      setIsAartiAudioPlaying(true);
      setIsAartiWaving(true);
      audioEngine.playTempleBell();

      // For Ganesha, play the authentic Amitabh Bachchan Sukhkarta Dukhharta Aarti recording!
      if (activeDeity.id === 'ganesha') {
        const audioUrl = getMantraBrahmanAudioUrl('sukhkarta-dukhharta');
        audioEngine.playBrahmanChant({
          text: 'सुखकर्ता दुखहर्ता वार्ता विघ्नाची । नुरवी पुरवी प्रेम कृपा जयाची ॥ जय देव जय देव जय मंगलमूर्ती',
          audioUrl,
          lang: 'mr-IN',
          withTanpura: true,
          onEnd: () => {
            setIsAartiAudioPlaying(false);
            setIsAartiWaving(false);
          },
        });
      } else {
        audioEngine.playBrahmanChant({
          text: activeDeity.mantra,
          lang: currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN',
          withTanpura: true,
          onEnd: () => {
            setIsAartiAudioPlaying(false);
            setIsAartiWaving(false);
          },
        });
      }
    }
  };

  const handleResetPuja = () => {
    audioEngine.stopSpeaking();
    setIsAartiAudioPlaying(false);
    setIsAartiWaving(false);
    setIsTilakApplied(false);
    setIsNaivedyaOffered(false);
    setFlowerShowerCount(0);
  };

  // Coordinates for circular aarti waving over the deity
  const aartiX = Math.cos(aartiAngle) * 55;
  const aartiY = Math.sin(aartiAngle) * 25 + 50;

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serifDev font-bold tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentLang === 'en' ? 'Digital Temple Sanctum' : '॥ आभासी ई-पूजा व दैनिक आरती संकुल ॥'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white">
          {currentLang === 'en' ? 'Sacred Virtual E-Puja & Aarti' : 'माझी नित्य ई-पूजा व आरती थाळी'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto mt-1 leading-relaxed">
          {currentLang === 'en'
            ? 'Perform authentic daily puja rituals right from your screen — wave aarti deepak, ring temple bells, offer flowers & naivedya.'
            : 'घरबसल्या किंवा प्रवासात थेट स्क्रीनवर घंटा वाजवा, आरती ओवाळा, दुर्वा-बेलपत्र व मोदकांचा पावन नैवेद्य अर्पण करा.'}
        </p>
      </div>

      {/* 1. Deity Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {pujaDeities.map((deity) => {
          const isSelected = deity.id === selectedDeityId;
          return (
            <button
              key={deity.id}
              onClick={() => {
                setSelectedDeityId(deity.id);
                handleResetPuja();
                audioEngine.playBeadClick();
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap shadow-sm ${
                isSelected
                  ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-amber-900/30 ring-2 ring-amber-300/40 scale-105'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
              }`}
            >
              <span className="text-lg">{deity.symbol}</span>
              <span className="font-serifDev">{deity.name[currentLang]}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Main Sacred Altar & Interactive Screen */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c1611] via-[#120d09] to-[#0a0705] border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.25)] p-4 sm:p-8 text-center text-white mb-8">
        
        {/* Sacred Decorative Gold Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-amber-400 to-red-500 shadow-sm" />

        {/* Shloka Header Pill */}
        <div className="relative z-10 mb-4 inline-block px-4 py-1.5 rounded-xl bg-black/60 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-serifDev font-bold shadow-md">
          {activeDeity.mantra}
        </div>

        {/* Canvas for Falling Flower Petals Overlay */}
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        />

        {/* Center Sanctuary Sanctum Idol Stage */}
        <div className="relative mx-auto w-64 h-72 sm:w-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-amber-400/70 shadow-2xl ring-4 ring-amber-500/20 bg-stone-950 flex items-center justify-center my-4">
          <img
            src={activeDeity.image}
            alt={activeDeity.name[currentLang]}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />

          {/* Sanctum Dark Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Divine Applied Tilak on Deity Forehead */}
          {isTilakApplied && (
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 flex flex-col items-center animate-fadeIn pointer-events-none">
              <span className="w-2.5 h-5 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-pulse" />
              <span className="text-[10px] text-amber-300 font-bold drop-shadow">ॐ</span>
            </div>
          )}

          {/* Offered Naivedya Bowl at Deity Lotus Feet */}
          {isNaivedyaOffered && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-2xl border border-amber-400/60 shadow-xl animate-fadeIn">
              <span className="text-xl">🥥</span>
              <span className="text-xs font-bold text-amber-300 font-serifDev whitespace-nowrap">
                {activeDeity.naivedya[currentLang]}
              </span>
            </div>
          )}

          {/* Swinging Temple Brass Bell (Animation) */}
          <div
            className={`absolute top-2 left-6 text-3xl transition-transform duration-300 pointer-events-none ${
              isBellRinging ? 'rotate-12 scale-125 text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'text-amber-500/60'
            }`}
          >
            🔔
          </div>

          {/* Conch Shell Soundwave Effect */}
          {isShankhaBlowing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-44 h-44 rounded-full border-4 border-amber-400/80 animate-ping" />
              <span className="text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">📯</span>
            </div>
          )}

          {/* Floating Aarti Deepak Lamp (Waving Circular Motion) */}
          <div
            className="absolute z-20 pointer-events-none transition-all duration-75"
            style={{
              transform: `translate(${aartiX}px, ${aartiY}px)`,
              opacity: isAartiWaving || isAartiAudioPlaying ? 1 : 0.4,
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Flame particle glow */}
              <div className="w-6 h-6 rounded-full bg-amber-400 blur-sm animate-ping absolute -top-1" />
              <span className="text-4xl drop-shadow-[0_0_25px_rgba(251,191,36,0.95)]">
                🪔
              </span>
            </div>
          </div>
        </div>

        {/* 3. Interactive Puja Thali Toolbar (Action Buttons) */}
        <div className="relative z-10 pt-4 border-t border-amber-500/30">
          <p className="text-xs text-amber-300/80 uppercase font-bold tracking-widest mb-3">
            {currentLang === 'en' ? 'Touch items to offer rituals' : '॥ पूजा साहित्य अर्पण करा • खालील साधनांवर टॅप करा ॥'}
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-w-3xl mx-auto">
            {/* 1. Ring Bell */}
            <button
              onClick={handleRingBell}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                isBellRinging
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400 animate-pulse'
                  : 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 hover:border-amber-400 text-stone-200'
              }`}
            >
              <span className="text-2xl">🔔</span>
              <span className="text-[11px] font-bold font-serifDev">
                {currentLang === 'en' ? 'Ring Bell' : 'घंटानाद'}
              </span>
            </button>

            {/* 2. Wave Aarti */}
            <button
              onClick={() => setIsAartiWaving(!isAartiWaving)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                isAartiWaving
                  ? 'bg-gradient-to-t from-saffron-700 to-amber-600 border-amber-300 text-white ring-2 ring-amber-300'
                  : 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 hover:border-amber-400 text-stone-200'
              }`}
            >
              <span className="text-2xl">🪔</span>
              <span className="text-[11px] font-bold font-serifDev">
                {isAartiWaving ? (currentLang === 'en' ? 'Waving...' : 'ओवाळत आहे') : (currentLang === 'en' ? 'Wave Aarti' : 'आरती ओवाळा')}
              </span>
            </button>

            {/* 3. Offer Flowers */}
            <button
              onClick={handleOfferFlowers}
              className="p-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-400 text-stone-200 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
            >
              <span className="text-2xl">{activeDeity.flowerEmoji}</span>
              <span className="text-[11px] font-bold font-serifDev">
                {currentLang === 'en' ? 'Offer Flowers' : 'पुष्पवृष्टी'}
              </span>
            </button>

            {/* 4. Apply Tilak */}
            <button
              onClick={handleApplyTilak}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                isTilakApplied
                  ? 'bg-amber-600/30 border-amber-400 text-amber-200'
                  : 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 hover:border-amber-400 text-stone-200'
              }`}
            >
              <span className="text-2xl">✨</span>
              <span className="text-[11px] font-bold font-serifDev">
                {currentLang === 'en' ? 'Chandan Tilak' : 'चंदन लेपन'}
              </span>
            </button>

            {/* 5. Offer Naivedya */}
            <button
              onClick={handleOfferNaivedya}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                isNaivedyaOffered
                  ? 'bg-amber-600/30 border-amber-400 text-amber-200'
                  : 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 hover:border-amber-400 text-stone-200'
              }`}
            >
              <span className="text-2xl">🥥</span>
              <span className="text-[11px] font-bold font-serifDev">
                {currentLang === 'en' ? 'Naivedya' : 'नैवेद्य अर्पण'}
              </span>
            </button>

            {/* 6. Blow Shankha */}
            <button
              onClick={handleBlowShankha}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                isShankhaBlowing
                  ? 'bg-amber-600/40 border-amber-400 text-amber-200 ring-2 ring-amber-300'
                  : 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 hover:border-amber-400 text-stone-200'
              }`}
            >
              <span className="text-2xl">📯</span>
              <span className="text-[11px] font-bold font-serifDev">
                {currentLang === 'en' ? 'Shankha' : 'शंखनाद'}
              </span>
            </button>
          </div>

          {/* Master 1-Click Aarti Audio Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleToggleAarti}
              className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all active:scale-95 ${
                isAartiAudioPlaying
                  ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 animate-pulse'
                  : 'bg-gradient-to-r from-saffron-600 via-amber-500 to-saffron-600 hover:from-saffron-500 hover:to-amber-400 text-white ring-2 ring-amber-300/40 hover:scale-105'
              }`}
            >
              {isAartiAudioPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>{currentLang === 'en' ? 'Stop Aarti' : 'आरती थांबवा'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {activeDeity.id === 'ganesha'
                      ? (currentLang === 'en' ? 'Play Amitabh Bachchan Aarti' : 'अमिताभ बच्चन यांच्या आवाजात आरती सुरू करा')
                      : (currentLang === 'en' ? 'Start Sacred Aarti & Chanting' : 'आरती व महामंत्र सुरू करा')}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={handleResetPuja}
              className="px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 text-xs font-semibold transition-all"
            >
              {currentLang === 'en' ? 'Reset Puja' : 'पूजा रीसेट करा'}
            </button>
          </div>
        </div>

      </div>

      {/* 4. Auspicious Vidhi & Deity Offerings Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase font-bold tracking-wider block mb-1">
            {currentLang === 'en' ? 'Prescribed Flowers & Leaves' : 'उपासनेची प्रिय फुले व पाने'}
          </span>
          <p className="text-sm font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
            <span>{activeDeity.flowerEmoji}</span>
            <span>{activeDeity.flowerType[currentLang]}</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase font-bold tracking-wider block mb-1">
            {currentLang === 'en' ? 'Sacred Naivedya Offering' : 'प्रिय सात्त्विक नैवेद्य'}
          </span>
          <p className="text-sm font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
            <span>🥥</span>
            <span>{activeDeity.naivedya[currentLang]}</span>
          </p>
        </div>
      </div>

    </div>
  );
};

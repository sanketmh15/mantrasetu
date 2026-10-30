import React, { useState, useEffect } from 'react';

interface DeityImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  deityId?: string;
  deityName?: string;
}

const deitySacredMeta: Record<string, { icon: string; beejMantra: string; tilak: string }> = {
  'ganesha': { icon: '🐘', beejMantra: 'ॐ गं गणपतये नमः', tilak: '🔴 रक्तचंदन' },
  'shiva': { icon: '🕉️', beejMantra: 'ॐ नमः शिवाय', tilak: '⚪ त्रिपुंड्र' },
  'parvati': { icon: '🌺', beejMantra: 'ॐ उमाये नमः', tilak: '🔴 सिंदूर' },
  'vishnu': { icon: '🪷', beejMantra: 'ॐ नमो नारायणाय', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'lakshmi': { icon: '🪙', beejMantra: 'ॐ श्रीं महालक्ष्म्यै नमः', tilak: '🔴 कुंकुम' },
  'saraswati': { icon: '🪕', beejMantra: 'ॐ ऐं सरस्वत्यै नमः', tilak: '⚪ श्वेतचंदन' },
  'hanuman': { icon: '🚩', beejMantra: 'ॐ हं हनुमते नमः', tilak: '🟠 शेंदूर' },
  'rama': { icon: '🏹', beejMantra: 'श्री राम जय राम जय जय राम', tilak: '🟡 रामानंदी' },
  'sita': { icon: '🌸', beejMantra: 'ॐ श्री सीतायै नमः', tilak: '🔴 सौभाग्य तिलक' },
  'krishna': { icon: '🪈', beejMantra: 'ॐ नमो भगवते वासुदेवाय', tilak: '🟡 गोपीचंदन' },
  'radha': { icon: '🪷', beejMantra: 'ॐ राधे राधे', tilak: '🟡 गोपीचंदन' },
  'vitthal': { icon: '🪷', beejMantra: 'ॐ नमो भगवते विठ्ठलाय', tilak: '⚪ गोपीचंदन व तुळस' },
  'rakhumai': { icon: '👑', beejMantra: 'ॐ श्री रुक्मिण्यै नमः', tilak: '🔴 कुंकुम' },
  'khandoba': { icon: '⚔️', beejMantra: 'येळकोट येळकोट जय मल्हार', tilak: '🟡 भंडारा' },
  'tulja-bhavani': { icon: '🔱', beejMantra: 'ॐ श्री तुलजा भवान्यै नमः', tilak: '🔴 अष्टगंध कुंकुम' },
  'kolhapur-ambabai': { icon: '👑', beejMantra: 'ॐ श्री अंबाबाई नमः', tilak: '🔴 अष्टगंध' },
  'dattatreya': { icon: '📿', beejMantra: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा', tilak: '⚪ भस्म त्रिपुंड्र' },
  'swami-samarth': { icon: '🌸', beejMantra: 'भिऊ नकोस मी तुझ्या पाठीशी आहे', tilak: '🟡 चंदन अष्टगंध' },
  'sai-baba': { icon: '✨', beejMantra: 'सबका मालिक एक • ॐ साई राम', tilak: '⚪ उदी तिलक' },
  'gajanan-maharaj': { icon: '🌾', beejMantra: 'गण गण गणात बोते', tilak: '🟡 चंदन टिळा' },
  'kartikeya': { icon: '🦚', beejMantra: 'ॐ षण्मुखाय नमः', tilak: '⚪ विभूती' },
  'surya': { icon: '☀️', beejMantra: 'ॐ घृणिः सूर्याय नमः', tilak: '🔴 रक्तचंदन' },
  'chandra': { icon: '🌙', beejMantra: 'ॐ सोमाय नमः', tilak: '⚪ श्वेतचंदन' },
  'kalabhairava': { icon: '🐕', beejMantra: 'ॐ कालभैरवाय नमः', tilak: '⚪ भस्म' },
  'narasimha': { icon: '🦁', beejMantra: 'ॐ उग्रं वीरं महाविष्णुं', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'varaha': { icon: '🐗', beejMantra: 'ॐ वराहाय नमः', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'kurma': { icon: '🐢', beejMantra: 'ॐ कूर्माय नमः', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'matsya': { icon: '🐟', beejMantra: 'ॐ मत्स्याय नमः', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'vamana': { icon: '☂️', beejMantra: 'ॐ वामनाय नमः', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'parashurama': { icon: '🪓', beejMantra: 'ॐ परशुरामाय नमः', tilak: '⚪ त्रिपुंड्र' },
  'kalki': { icon: '🐎', beejMantra: 'ॐ कल्किने नमः', tilak: '🟡 ऊर्ध्वपुंड्र' },
  'brahma': { icon: '🪷', beejMantra: 'ॐ ब्रह्मणे नमः', tilak: '🟡 चंदन' },
  'gayatri': { icon: '☀️', beejMantra: 'ॐ भूर्भुवः स्वः', tilak: '🔴 कुंकुम' },
  'durga': { icon: '🦁', beejMantra: 'ॐ दुं दुर्गायै नमः', tilak: '🔴 सिंदूर' },
  'kali': { icon: '⚡', beejMantra: 'ॐ क्रीं कालिकायै नमः', tilak: '🔴 रक्त सिंदूर' },
  'annapurna': { icon: '🍚', beejMantra: 'ॐ अन्नपूर्णायै नमः', tilak: '🔴 अष्टगंध' },
  'jagannath': { icon: '☸️', beejMantra: 'जय जगन्नाथ बलभद्र सुभद्रा', tilak: '🟡 तिलक' },
  'venkateswara': { icon: '💎', beejMantra: 'ॐ नमो वेङ्कटेशाय', tilak: '⚪ नामा तिरुपती' },
  'ayyappa': { icon: '🔔', beejMantra: 'स्वामीये शरणं अय्यप्पा', tilak: '⚪ भस्म व चंदन' },
  'shani-dev': { icon: '🪨', beejMantra: 'ॐ शं शनैश्चराय नमः', tilak: '🔵 तैल तिलक' },
  'dhanvantari': { icon: '🏺', beejMantra: 'ॐ धन्वन्तरये नमः', tilak: '🟡 चंदन' },
  'kubera': { icon: '💰', beejMantra: 'ॐ यक्षाय कुबेराय नमः', tilak: '🟡 अष्टगंध' },
  'indra': { icon: '⚡', beejMantra: 'ॐ इन्द्राय नमः', tilak: '🟡 चंदन' },
  'agni': { icon: '🔥', beejMantra: 'ॐ अग्नये नमः', tilak: '🔴 रक्तचंदन' },
  'varuna': { icon: '🌊', beejMantra: 'ॐ वरुणाय नमः', tilak: '⚪ श्वेतचंदन' },
  'vayu': { icon: '💨', beejMantra: 'ॐ वायवे नमः', tilak: '⚪ श्वेतचंदन' },
  'yama': { icon: '🐃', beejMantra: 'ॐ यमाय धर्मराजाय नमः', tilak: '⚪ भस्म' },
  'ganga': { icon: '💧', beejMantra: 'ॐ गंगे च यमुने चैव', tilak: '🔴 अष्टगंध' },
  'yamuna': { icon: '🌊', beejMantra: 'जय यमुना मैया', tilak: '🔴 कुंकुम' },
  'kamakhya': { icon: '🌺', beejMantra: 'ॐ कामाख्यायै नमः', tilak: '🔴 कामाख्या सिंदूर' }
};

export const DeityImage: React.FC<DeityImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  deityId = 'ganesha',
  deityName,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const meta = deitySacredMeta[deityId] || { icon: '🪷', beejMantra: '॥ ॐ नमः ॥', tilak: '🟡 अष्टगंध' };

  if (hasError) {
    // Consecrated, authentic Sacred Deity Sanctorum Altarpiece that renders offline
    return (
      <div className={`relative flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#1c140c] via-[#2c1d10] to-[#120e09] text-white p-4 select-none ${className}`}>
        {/* Divine Aura Halo */}
        <div className="absolute w-44 h-44 rounded-full bg-amber-500/25 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute w-24 h-24 rounded-full bg-saffron-500/20 blur-xl pointer-events-none" />

        {/* Sacred Geometry Mandala Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-56 h-56 animate-[spin_160s_linear_infinite]">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#ea580c" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 2" />
            <polygon points="50,10 62,38 90,38 67,54 75,82 50,65 25,82 33,54 10,38 38,38" fill="none" stroke="#f59e0b" strokeWidth="0.7" />
          </svg>
        </div>

        {/* Golden Arch / Prabhavali Border Silhouette */}
        <div className="relative z-10 w-full flex items-center justify-between text-amber-400/80 text-[10px] uppercase font-mono px-1">
          <span className="flex items-center gap-1">🔔 {meta.tilak}</span>
          <span className="text-amber-300 font-bold tracking-wider">॥ साक्षात दर्शनम् ॥</span>
          <span>🔔</span>
        </div>

        {/* Central Deity Murti Emblem with Celestial Golden Glow */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 shadow-2xl flex items-center justify-center text-4xl ring-4 ring-amber-400/60 transform group-hover:scale-110 transition-transform">
            {meta.icon}
          </div>
          <div className="mt-2 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-amber-500/40 text-[11px] font-bold text-amber-200 tracking-wide font-serifDev shadow-inner">
              {meta.beejMantra}
            </span>
          </div>
        </div>

        {/* Deity Sacred Name Footer */}
        <div className="relative z-10 w-full text-center">
          <h4 className="font-bold font-serifDev text-sm sm:text-base text-amber-100 tracking-wide drop-shadow-md">
            {deityName || alt}
          </h4>
          <span className="text-[10px] text-amber-400/90 font-mono tracking-widest uppercase">
            ॥ दिव्य मंगलमूर्ती ॥
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      loading="lazy"
      onError={handleError}
    />
  );
};


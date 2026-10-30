import React, { useState, useEffect } from 'react';
import { DEITY_IMAGE_REGISTRY } from '../utils/deityImageRegistry';

interface DeityImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  deityId?: string;
  deityName?: string;
}

export const DeityImage: React.FC<DeityImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  deityId = 'ganesha',
  deityName,
}) => {
  const regMeta = DEITY_IMAGE_REGISTRY[deityId];
  const [currentSrc, setCurrentSrc] = useState<string>(src || regMeta?.primary || '');
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // When props change, reset attempt index and src
    const initial = src || regMeta?.primary || '';
    setCurrentSrc(initial);
    setAttemptIndex(0);
    setHasError(false);
  }, [src, deityId, regMeta?.primary]);

  const handleError = () => {
    if (attemptIndex === 0) {
      // First fallback: use explicit fallbackSrc or primary registry image
      const nextSrc = (fallbackSrc && fallbackSrc !== currentSrc)
        ? fallbackSrc
        : (regMeta?.primary && regMeta.primary !== currentSrc ? regMeta.primary : regMeta?.fallback);
      
      if (nextSrc && nextSrc !== currentSrc) {
        setAttemptIndex(1);
        setCurrentSrc(nextSrc);
        return;
      }
    }

    if (attemptIndex === 1 && regMeta?.fallback && regMeta.fallback !== currentSrc) {
      // Second fallback: use secondary registry image
      setAttemptIndex(2);
      setCurrentSrc(regMeta.fallback);
      return;
    }

    // If all web images fail, show the sacred consecrated altarpiece
    setHasError(true);
  };

  const meta = regMeta || {
    icon: '🪷',
    beejMantra: '॥ ॐ नमः ॥',
    tilak: '🟡 अष्टगंध'
  };

  if (hasError || !currentSrc) {
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
      loading="lazy"
      onError={handleError}
    />
  );
};

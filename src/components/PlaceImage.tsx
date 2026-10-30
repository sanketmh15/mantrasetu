import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface PlaceImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  placeName?: string;
  districtOrRiver?: string;
}

export const PlaceImage: React.FC<PlaceImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  placeName,
  districtOrRiver,
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

  if (hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#18130e] via-[#241a12] to-[#0e0b08] text-white p-4 select-none ${className}`}>
        {/* Soft Golden Dawn Sky & Water Glow */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-amber-600/20 to-transparent blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 w-48 h-48 rounded-full bg-saffron-600/15 blur-2xl pointer-events-none" />

        {/* Sacred Teerth Top Banner */}
        <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono text-amber-400 px-1">
          <span className="flex items-center gap-1 font-bold">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{districtOrRiver || 'पावन तीर्थ क्षेत्र'}</span>
          </span>
          <span className="text-amber-300 tracking-wider">॥ तीर्थराज ॥</span>
        </div>

        {/* Temple Shikhara & Holy Ghat Silhouette Graphic */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-700 to-saffron-600 flex items-center justify-center text-3xl shadow-xl ring-2 ring-amber-400/50 mb-2 transform group-hover:scale-105 transition-transform">
            🏛️
            <span className="absolute -top-1.5 -right-1.5 text-base">🚩</span>
          </div>

          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-[10px] text-amber-300 font-mono">
            ॥ पवित्र तीर्थ दर्शनम् ॥
          </span>
        </div>

        {/* Place Name and River */}
        <div className="relative z-10 w-full text-center">
          <h4 className="font-bold font-serifDev text-sm sm:text-base text-amber-100 drop-shadow-md">
            {placeName || alt}
          </h4>
          <span className="text-[10px] text-amber-400/80 uppercase font-mono tracking-wider">
            पावन तीर्थक्षेत्र व अमृतस्नान
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


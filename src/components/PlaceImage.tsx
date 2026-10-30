import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { SACRED_PLACE_REGISTRY } from '../utils/sacredPlaceImageRegistry';

interface PlaceImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  placeName?: string;
  districtOrRiver?: string;
}

function resolveAuthenticPlaceUrl(
  inputSrc: string,
  placeName?: string,
  districtOrRiver?: string,
  alt?: string
): string {
  // If the src is already a direct Wikimedia thumb or upload URL and NOT a broken Special:FilePath, use it
  if (inputSrc && !inputSrc.includes('Special:FilePath') && !inputSrc.includes('unsplash.com')) {
    return inputSrc;
  }

  const query = `${inputSrc || ''} ${placeName || ''} ${districtOrRiver || ''} ${alt || ''}`.toLowerCase();

  if (query.includes('morgaon') || query.includes('मोरगाव') || query.includes('मयूरेश्वर')) {
    return SACRED_PLACE_REGISTRY['morgaon'].imageUrl;
  }
  if (query.includes('siddhatek') || query.includes('सिद्धटेक')) {
    return SACRED_PLACE_REGISTRY['siddhatek'].imageUrl;
  }
  if (query.includes('siddhivinayak') || query.includes('सिद्धिविनायक') || query.includes('prabhadevi')) {
    return SACRED_PLACE_REGISTRY['siddhivinayak_mumbai'].imageUrl;
  }
  if (query.includes('pali') || query.includes('पाली') || query.includes('बल्लाळेश्वर')) {
    return SACRED_PLACE_REGISTRY['pali'].imageUrl;
  }
  if (query.includes('mahad') || query.includes('वरदविनायक') || query.includes('वरद')) {
    return SACRED_PLACE_REGISTRY['mahad'].imageUrl;
  }
  if (query.includes('theur') || query.includes('थेऊर') || query.includes('चिंतामणी')) {
    return SACRED_PLACE_REGISTRY['theur'].imageUrl;
  }
  if (query.includes('lenyadri') || query.includes('लेण्याद्री') || query.includes('गिरिजात्मज')) {
    return SACRED_PLACE_REGISTRY['lenyadri'].imageUrl;
  }
  if (query.includes('ozar') || query.includes('ओझर') || query.includes('विघ्नहर')) {
    return SACRED_PLACE_REGISTRY['ozar'].imageUrl;
  }
  if (query.includes('ranjangaon') || query.includes('रांजणगाव') || query.includes('महागणपती')) {
    return SACRED_PLACE_REGISTRY['ranjangaon'].imageUrl;
  }
  if (query.includes('trimbakeshwar') || query.includes('त्र्यंबकेश्वर') || query.includes('nashik') || query.includes('नाशिक')) {
    return SACRED_PLACE_REGISTRY['trimbakeshwar'].imageUrl;
  }
  if (query.includes('bhimashankar') || query.includes('भीमाशंकर')) {
    return SACRED_PLACE_REGISTRY['bhimashankar'].imageUrl;
  }
  if (query.includes('grishneshwar') || query.includes('घृष्णेश्वर') || query.includes('verul') || query.includes('ellora')) {
    return SACRED_PLACE_REGISTRY['grishneshwar'].imageUrl;
  }
  if (query.includes('aundha') || query.includes('औंढा')) {
    return SACRED_PLACE_REGISTRY['aundha_nagnath'].imageUrl;
  }
  if (query.includes('parli') || query.includes('परळी') || query.includes('वैजनाथ')) {
    return SACRED_PLACE_REGISTRY['parli_vaijnath'].imageUrl;
  }
  if (query.includes('pandharpur') || query.includes('पंढरपूर') || query.includes('vitthal') || query.includes('विठ्ठल')) {
    return SACRED_PLACE_REGISTRY['pandharpur'].imageUrl;
  }
  if (query.includes('jejuri') || query.includes('जेजुरी') || query.includes('khandoba') || query.includes('खंडोबा')) {
    return SACRED_PLACE_REGISTRY['jejuri'].imageUrl;
  }
  if (query.includes('tuljapur') || query.includes('तुळजापूर') || query.includes('भवानी')) {
    return SACRED_PLACE_REGISTRY['tuljapur'].imageUrl;
  }
  if (query.includes('kolhapur') || query.includes('कोल्हापूर') || query.includes('महालक्ष्मी') || query.includes('अंबाबाई')) {
    return SACRED_PLACE_REGISTRY['kolhapur'].imageUrl;
  }
  if (query.includes('shirdi') || query.includes('शिर्डी') || query.includes('साई')) {
    return SACRED_PLACE_REGISTRY['shirdi'].imageUrl;
  }
  if (query.includes('akkalkot') || query.includes('अक्कलकोट') || query.includes('स्वामी समर्थ')) {
    return SACRED_PLACE_REGISTRY['akkalkot'].imageUrl;
  }
  if (query.includes('shegaon') || query.includes('शेगाव') || query.includes('गजानन')) {
    return SACRED_PLACE_REGISTRY['shegaon'].imageUrl;
  }
  if (query.includes('ayodhya') || query.includes('अयोध्या') || query.includes('राम जन्म')) {
    return SACRED_PLACE_REGISTRY['ayodhya'].imageUrl;
  }
  if (query.includes('kashi') || query.includes('काशी') || query.includes('varanasi') || query.includes('विश्वनाथ')) {
    return SACRED_PLACE_REGISTRY['kashi'].imageUrl;
  }
  if (query.includes('puri') || query.includes('पुरी') || query.includes('जगन्नाथ')) {
    return SACRED_PLACE_REGISTRY['puri'].imageUrl;
  }
  if (query.includes('badrinath') || query.includes('बद्रीनाथ')) {
    return SACRED_PLACE_REGISTRY['badrinath'].imageUrl;
  }
  if (query.includes('dwarka') || query.includes('द्वारका')) {
    return SACRED_PLACE_REGISTRY['dwarka'].imageUrl;
  }
  if (query.includes('meenakshi') || query.includes('मीनाक्षी') || query.includes('madurai')) {
    return SACRED_PLACE_REGISTRY['madurai'].imageUrl;
  }
  if (query.includes('ramkund') || query.includes('रामकुंड')) {
    return SACRED_PLACE_REGISTRY['ramkund'].imageUrl;
  }
  if (query.includes('kushavarta') || query.includes('कुशावर्त')) {
    return SACRED_PLACE_REGISTRY['kushavarta'].imageUrl;
  }
  if (query.includes('tapovan') || query.includes('तपोवन')) {
    return SACRED_PLACE_REGISTRY['tapovan'].imageUrl;
  }

  // Fallback to Pandharpur Vitthal Mandir or original src
  return inputSrc || SACRED_PLACE_REGISTRY['pandharpur'].imageUrl;
}

export const PlaceImage: React.FC<PlaceImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  placeName,
  districtOrRiver,
}) => {
  const initialResolved = resolveAuthenticPlaceUrl(src, placeName, districtOrRiver, alt);
  const [currentSrc, setCurrentSrc] = useState(initialResolved);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const resolved = resolveAuthenticPlaceUrl(src, placeName, districtOrRiver, alt);
    setCurrentSrc(resolved);
    setHasError(false);
  }, [src, placeName, districtOrRiver, alt]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      // Try resolving directly to Pandharpur or Trimbakeshwar before giving up
      const ultimateFallback = SACRED_PLACE_REGISTRY['pandharpur'].imageUrl;
      if (currentSrc !== ultimateFallback) {
        setCurrentSrc(ultimateFallback);
      } else {
        setHasError(true);
      }
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

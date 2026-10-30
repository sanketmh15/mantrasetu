import { useState, useMemo } from 'react';
import { Language } from '../types';
import {
  ancientTemplesDatabase,
  calculateDistanceKm,
  isTempleOpenNow,
  AncientTemple,
} from '../data/ancientTemplesData';
import { toggleDevotionalBookmark, isBookmarkSaved } from '../utils/storage';
import {
  MapPin,
  Navigation,
  Compass,
  Clock,
  Car,
  Accessibility,
  Home,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Phone,
  Heart,
  Shield,
} from 'lucide-react';

interface NearbyTemplesGuideProps {
  currentLang: Language;
}

export function NearbyTemplesGuide({ currentLang }: NearbyTemplesGuideProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  // Request browser geolocation
  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(
        currentLang === 'en'
          ? 'Geolocation is not supported by your browser.'
          : 'आपल्या ब्राउझरमध्ये लोकेशन सपोर्ट उपलब्ध नाही.'
      );
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocationError(
          currentLang === 'en'
            ? 'Unable to retrieve location. Please allow GPS permission in your browser or select your region below.'
            : 'लोकेशन मिळवता आले नाही. कृपया ब्राउझरमध्ये GPS अनुमती द्या किंवा खालील जिल्हा निवडा.'
        );
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleToggleBookmark = (temple: AncientTemple) => {
    const isAdded = toggleDevotionalBookmark({
      id: temple.id,
      type: 'temple',
      title: temple.name,
      subtitle: { en: `${temple.city}, ${temple.district}`, hi: `${temple.city}, ${temple.district}`, mr: `${temple.city}, ${temple.district}` },
      deityName: temple.deityName[currentLang],
    });
    setBookmarkedMap((prev) => ({ ...prev, [temple.id]: isAdded }));
  };

  // Compute list with distance and filter
  const processedTemples = useMemo(() => {
    return ancientTemplesDatabase
      .map((temple) => {
        let distanceKm: number | null = null;
        if (userLocation) {
          distanceKm = calculateDistanceKm(
            userLocation.lat,
            userLocation.lng,
            temple.latitude,
            temple.longitude
          );
        }
        return { ...temple, distanceKm };
      })
      .filter((temple) => {
        // Search query filter
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          temple.name.mr.toLowerCase().includes(query) ||
          temple.name.en.toLowerCase().includes(query) ||
          temple.district.toLowerCase().includes(query) ||
          temple.deityName.mr.toLowerCase().includes(query);

        // Region filter
        const matchesRegion = selectedRegion === 'all' || temple.region === selectedRegion;

        return matchesQuery && matchesRegion;
      })
      .sort((a, b) => {
        // If GPS is active, sort by nearest distance first
        if (a.distanceKm !== null && b.distanceKm !== null) {
          return a.distanceKm - b.distanceKm;
        }
        return 0;
      });
  }, [userLocation, searchQuery, selectedRegion]);

  const regionOptions = [
    { id: 'all', label: { en: 'All Maharashtra', hi: 'संपूर्ण महाराष्ट्र', mr: 'संपूर्ण महाराष्ट्र' } },
    { id: 'pune_western', label: { en: 'Pune & Western MH', hi: 'पुणे व पश्चिम महाराष्ट्र', mr: 'पुणे, सातारा, कोल्हापूर, सोलापूर' } },
    { id: 'konkan_mumbai', label: { en: 'Konkan & Mumbai', hi: 'कोकण एवं मुंबई', mr: 'मुंबई, कोकण व रत्नागिरी' } },
    { id: 'vidarbha_khandesh', label: { en: 'Nashik & Khandesh', hi: 'नासिक व खानदेश', mr: 'नाशिक, शिर्डी व उत्तर महाराष्ट्र' } },
    { id: 'marathwada', label: { en: 'Marathwada', hi: 'मराठवाड़ा', mr: 'तुळजापूर, संभाजीनगर व मराठवाडा' } },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Navigation className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>
            {currentLang === 'en'
              ? 'GPS Smart Temple Radar & Verified Timings'
              : 'स्मार्ट GPS मंदिर शोधक व पडताळलेली दर्शन वेळ'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Nearby Ancient Temples, Timings & Helpline'
            : currentLang === 'hi'
            ? 'समीपवर्ती प्राचीन मंदिर, दर्शन समय एवं संपर्क'
            : 'जवळची प्राचीन तीर्थक्षेत्रे, थेट दर्शन वेळ व संपर्क'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Discover centuries-old shrines closest to you using GPS. Check verified darshan timings, live open/closed status, trust contact helplines, dress codes, and directions.'
            : 'आपल्या ठिकाणापासून जवळची मंदिरे, अचूक अंतर (किमी), सध्या दर्शन उघडे आहे की बंद, ट्रस्टचा अधिकृत संपर्क क्रमांक, वस्त्रसंहिता व गुगल मॅप्स मार्ग पहा.'}
        </p>

        {/* 1-Click GPS Locator Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetLocation}
            disabled={isLocating}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-sm shadow-lg shadow-amber-900/30 transition-all disabled:opacity-50"
          >
            <Compass className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>
              {isLocating
                ? currentLang === 'en'
                  ? 'Detecting Location...'
                  : 'लोकेशन शोधत आहे...'
                : userLocation
                ? currentLang === 'en'
                  ? 'Location Active ✓'
                  : 'लोकेशन सक्रिय झाले ✓'
                : currentLang === 'en'
                ? 'Find Closest Temples Near Me'
                : 'माझ्या जवळची मंदिरे शोधा (GPS)'}
            </span>
          </button>

          {userLocation && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {currentLang === 'en'
                  ? 'Sorted by shortest travel distance'
                  : 'सर्वात कमी अंतराच्या क्रमाने मांडले आहे'}
              </span>
            </div>
          )}
        </div>

        {locationError && (
          <div className="mt-4 inline-flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-8 p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'en' ? 'Search temple, city, deity...' : 'मंदिर, शहर किंवा आराध्य शोधा...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Region pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {regionOptions.map((reg) => {
            const isSelected = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {reg.label[currentLang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* TEMPLE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedTemples.map((temple: AncientTemple & { distanceKm: number | null }) => {
          const openStatus = isTempleOpenNow(temple.timings);
          const isSaved = bookmarkedMap[temple.id] ?? isBookmarkSaved(temple.id, 'temple');

          return (
            <div
              key={temple.id}
              className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              {/* Card Header & Distance Badge */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {temple.city}, {temple.district}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {temple.distanceKm !== null && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-300 dark:border-emerald-800">
                        ~{temple.distanceKm} km
                      </span>
                    )}

                    {/* Bookmark Heart Button */}
                    <button
                      onClick={() => handleToggleBookmark(temple)}
                      className={`p-1 rounded-full transition-all ${
                        isSaved
                          ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                          : 'text-stone-400 hover:text-rose-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={isSaved ? 'Saved in My Library' : 'Save Temple'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white group-hover:text-amber-600 transition-colors">
                    {temple.name[currentLang]}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                    🚩 {temple.deityName[currentLang]}
                  </span>

                  {/* Live Open / Closed Status Badge */}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                      openStatus.isOpen
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
                    <span>{openStatus.text[currentLang]}</span>
                  </span>
                </div>

                {/* Timings row */}
                <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 mb-2 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{temple.timings}</span>
                </div>

                {/* Architecture Era */}
                <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700 text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block mb-0.5">
                    {currentLang === 'en' ? 'Architecture Style' : 'शिल्पशैली व कालखंड'}:
                  </span>
                  <p className="text-stone-700 dark:text-stone-300">{temple.architectureStyle[currentLang]}</p>
                </div>

                {/* Dress code & phone if available */}
                {temple.dressCode && (
                  <div className="mt-2 text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{temple.dressCode[currentLang]}</span>
                  </div>
                )}

                {/* Aarti Schedule Preview */}
                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-white mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{currentLang === 'en' ? 'Daily Aarti Timings' : 'नित्य आरत्या'}:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {temple.aartiTimings.map((aarti, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-medium"
                      >
                        {aarti}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities Badges (Wheelchair, Parking, Bhakta Niwas) */}
                <div className="mt-4 flex items-center gap-3 text-stone-500 dark:text-stone-400 text-xs">
                  {temple.seniorWheelchair && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400" title="Senior Citizen Wheelchair Ramp Available">
                      <Accessibility className="w-4 h-4" />
                      <span className="text-[10px]">व्हिलचेअर</span>
                    </span>
                  )}
                  {temple.parkingAvailable && (
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400" title="Parking Available">
                      <Car className="w-4 h-4" />
                      <span className="text-[10px]">पार्किंग</span>
                    </span>
                  )}
                  {temple.dharamshalaAvailable && (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400" title="Bhakta Niwas / Dharamshala">
                      <Home className="w-4 h-4" />
                      <span className="text-[10px]">भक्तनिवास</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions: Google Maps & Phone Helpline */}
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
                <a
                  href={temple.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>
                    {currentLang === 'en'
                      ? 'Directions in Maps'
                      : 'गुगल मॅप्स मार्ग'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                {temple.contactPhone && (
                  <a
                    href={`tel:${temple.contactPhone.replace(/\s+/g, '')}`}
                    className="p-2.5 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-emerald-600 hover:text-white text-stone-800 dark:text-stone-200 transition-colors"
                    title={`Call Temple Trust: ${temple.contactPhone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

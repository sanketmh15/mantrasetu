import { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import {
  liveDarshanDatabase,
  specificAartisDatabase,
  LiveDarshanStream,
  AartiVideoItem,
  getSavedCustomVideos,
  saveCustomVideo,
  deleteCustomVideo,
} from '../data/liveDarshanData';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '../utils/youtubeHelper';
import { audioEngine } from '../utils/audioSynth';
import {
  Radio,
  MapPin,
  Bell,
  Heart,
  Share2,
  Calendar,
  Sparkles,
  Flame,
  PlusCircle,
  Play,
  Search,
  Maximize2,
  Minimize2,
  Trash2,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface LiveTempleDarshanProps {
  currentLang: Language;
}

type TabType = 'aarti' | 'darshan' | 'import';

export function LiveTempleDarshan({ currentLang }: LiveTempleDarshanProps) {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<TabType>('aarti');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeityFilter, setSelectedDeityFilter] = useState<string>('all');

  // Currently Active Playing Video (Aarti or Temple Darshan)
  const [activeAarti, setActiveAarti] = useState<AartiVideoItem>(specificAartisDatabase[0]);
  const [activeTemple, setActiveTemple] = useState<LiveDarshanStream>(liveDarshanDatabase[0]);
  const [isVideoTypeAarti, setIsVideoTypeAarti] = useState<boolean>(true);

  // User Custom Saved Videos from localStorage
  const [customVideos, setCustomVideos] = useState<AartiVideoItem[]>([]);

  // Interactive Devotional States
  const [isBellRinging, setIsBellRinging] = useState<boolean>(false);
  const [isAartiWaving, setIsAartiWaving] = useState<boolean>(false);
  const [aartiAngle, setAartiAngle] = useState<number>(0);
  const [prayedCount, setPrayedCount] = useState<number>(108);
  const [isTheatreMode, setIsTheatreMode] = useState<boolean>(false);

  // Custom Link Import Form State
  const [importUrl, setImportUrl] = useState<string>('');
  const [importTitle, setImportTitle] = useState<string>('');
  const [importDeity, setImportDeity] = useState<string>('');
  const [importCategory, setImportCategory] = useState<'aarti' | 'live_darshan'>('aarti');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);

  const playerRef = useRef<HTMLDivElement>(null);

  // Load custom user videos from LocalStorage on mount
  useEffect(() => {
    setCustomVideos(getSavedCustomVideos());
  }, []);

  // Circular motion for floating Aarti deepak when waving is active
  useEffect(() => {
    let animId: number;
    if (isAartiWaving) {
      const animate = () => {
        setAartiAngle((prev) => (prev + 0.05) % (Math.PI * 2));
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAartiWaving]);

  // Ring the virtual temple bell with authentic chime
  const handleRingBell = () => {
    setIsBellRinging(true);
    audioEngine.playTempleBell();
    setPrayedCount((prev) => prev + 1);
    setTimeout(() => setIsBellRinging(false), 1200);
  };

  // Wave Aarti toggle
  const handleToggleWaveAarti = () => {
    if (!isAartiWaving) {
      audioEngine.playTempleBell();
    }
    setIsAartiWaving((prev) => !prev);
  };

  // Play Aarti Video inside Website (NO REDIRECT)
  const handlePlayAarti = (aarti: AartiVideoItem) => {
    setActiveAarti(aarti);
    setIsVideoTypeAarti(true);
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Play Live Darshan Video inside Website (NO REDIRECT)
  const handlePlayDarshan = (temple: LiveDarshanStream) => {
    setActiveTemple(temple);
    setIsVideoTypeAarti(false);
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Import New YouTube Link Form Submission
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl.trim()) return;

    const parsed = extractYouTubeId(importUrl.trim());
    if (!parsed) {
      setImportStatusMessage(
        currentLang === 'en'
          ? '❌ Invalid YouTube Link. Please paste a valid YouTube watch, youtu.be, or live stream URL.'
          : '❌ अवैध YouTube लिंक. कृपया योग्य यूट्यूब व्हिडिओ, youtu.be किंवा लाइव्ह लिंक टाका.'
      );
      return;
    }

    const titleText = importTitle.trim() || (importCategory === 'aarti' ? 'श्री महाआरती' : 'थेट देवस्थान दर्शन');
    const deityText = importDeity.trim() || 'उपास्य दैवत';
    const newVideoId = parsed.id;

    const newItem: AartiVideoItem = {
      id: `custom_${Date.now()}`,
      title: { en: titleText, hi: titleText, mr: titleText },
      deity: { en: deityText, hi: deityText, mr: deityText },
      singer: currentLang === 'en' ? 'User Added Stream' : 'युझरने जोडलेला व्हिडिओ',
      youtubeUrl: importUrl.trim(),
      youtubeVideoId: newVideoId,
      duration: 'भक्ती प्रवाह',
      category: 'custom',
      lyricsSnippet: {
        en: 'User imported devotional video.',
        hi: 'भक्त द्वारा जोड़ी गई पावन आरती अथवा दर्शन।',
        mr: 'भक्ताने जोडलेली पावन आरती अथवा थेट मंदिर दर्शन.'
      },
      icon: '🪔',
      isUserCustom: true
    };

    saveCustomVideo(newItem);
    setCustomVideos(getSavedCustomVideos());
    setActiveAarti(newItem);
    setIsVideoTypeAarti(true);
    setImportStatusMessage(
      currentLang === 'en'
        ? '✅ YouTube link imported successfully! Playing video right now in the website.'
        : '✅ YouTube लिंक यशस्वीरीत्या जोडली गेली! व्हिडिओ थेट वेबसाइटमध्ये प्ले होत आहे.'
    );

    setImportUrl('');
    setImportTitle('');
    setImportDeity('');

    // Scroll to player so user immediately sees their imported video playing with NO REDIRECT
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  };

  // Delete custom video from LocalStorage
  const handleDeleteCustomVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCustomVideo(id);
    setCustomVideos(getSavedCustomVideos());
    if (activeAarti.id === id) {
      setActiveAarti(specificAartisDatabase[0]);
    }
  };

  // Share current video on WhatsApp
  const handleShareVideo = () => {
    const currentTitle = isVideoTypeAarti
      ? (activeAarti.title[currentLang] || activeAarti.title.mr)
      : (activeTemple.templeName[currentLang] || activeTemple.templeName.mr);

    const shareUrl = 'https://sanketmh15.github.io/mantrasetu/';
    const text = `🪔 *सनातन अमृतधारा - पावन आरती व थेट देवस्थान दर्शन* 🪔\n\n` +
      `✨ *${currentTitle}*\n\n` +
      `कोणत्याही रिडायरेक्टशिवाय थेट वेबसाइटवर दर्शन व आरत्या पाहण्यासाठी भेट द्या:\n` +
      `${shareUrl}`;

    if (navigator.share) {
      navigator.share({ title: currentTitle, text }).catch(() => {});
    } else {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  };

  // Active Embed URL calculation
  const currentEmbedUrl = isVideoTypeAarti
    ? getYouTubeEmbedUrl(activeAarti.youtubeVideoId || activeAarti.youtubeUrl, true)
    : getYouTubeEmbedUrl(activeTemple.youtubeVideoId || activeTemple.officialFeedUrl, true);

  // Active display titles
  const currentMediaTitle = isVideoTypeAarti
    ? (activeAarti.title[currentLang] || activeAarti.title.mr)
    : (activeTemple.templeName[currentLang] || activeTemple.templeName.mr);

  const currentDeityName = isVideoTypeAarti
    ? (activeAarti.deity[currentLang] || activeAarti.deity.mr)
    : (activeTemple.deityName[currentLang] || activeTemple.deityName.mr);

  // Filter specific Aartis according to Search & Deity
  const allAartis = [...customVideos, ...specificAartisDatabase];
  const filteredAartis = allAartis.filter((item) => {
    const titleMatch = (item.title[currentLang] || item.title.mr).toLowerCase().includes(searchQuery.toLowerCase());
    const deityMatch = (item.deity[currentLang] || item.deity.mr).toLowerCase().includes(searchQuery.toLowerCase());
    const singerMatch = item.singer.toLowerCase().includes(searchQuery.toLowerCase());
    const textPass = titleMatch || deityMatch || singerMatch;

    if (selectedDeityFilter === 'all') return textPass;
    if (selectedDeityFilter === 'custom') return textPass && item.isUserCustom;
    return textPass && (item.deity.mr.includes(selectedDeityFilter) || item.deity.en.toLowerCase().includes(selectedDeityFilter.toLowerCase()));
  });

  // Filter Live Darshans according to Search
  const filteredTemples = liveDarshanDatabase.filter((t) => {
    const nameMatch = (t.templeName[currentLang] || t.templeName.mr).toLowerCase().includes(searchQuery.toLowerCase());
    const deityMatch = (t.deityName[currentLang] || t.deityName.mr).toLowerCase().includes(searchQuery.toLowerCase());
    const locMatch = t.location.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || deityMatch || locMatch;
  });

  // Unique Deities for Quick Filters
  const deityFilters = [
    { id: 'all', label: { mr: 'सर्व आरत्या', hi: 'सभी आरतियां', en: 'All Aartis' } },
    { id: 'गणेश', label: { mr: '🌺 श्री गणेश', hi: '🌺 श्री गणेश', en: '🌺 Ganesha' } },
    { id: 'महादेव', label: { mr: '🕉️ श्री शंकर', hi: '🕉️ शिव शंकर', en: '🕉️ Shiva' } },
    { id: 'विठ्ठल', label: { mr: '🪷 विठू माऊली', hi: '🪷 विट्ठल', en: '🪷 Vitthal' } },
    { id: 'स्वामी समर्थ', label: { mr: '🌸 स्वामी समर्थ', hi: '🌸 स्वामी समर्थ', en: '🌸 Swami Samarth' } },
    { id: 'दत्त', label: { mr: '🌿 दत्तगुरू', hi: '🌿 दत्तात्रेय', en: '🌿 Dattatreya' } },
    { id: 'मारुती', label: { mr: '🚩 मारुतीराया', hi: '🚩 हनुमान जी', en: '🚩 Hanuman' } },
    { id: 'साईबाबा', label: { mr: '🌅 साईबाबा', hi: '🌅 साईं बाबा', en: '🌅 Sai Baba' } },
    { id: 'custom', label: { mr: '⭐ माझ्या लिंक्स', hi: '⭐ मेरी लिंक्स', en: '⭐ My Links' } },
  ];

  // Coordinates for circular aarti deepak waving
  const aartiX = Math.cos(aartiAngle) * 45;
  const aartiY = Math.sin(aartiAngle) * 20;

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8 w-full">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 border border-amber-500/30 p-5 sm:p-8 mb-6 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <span>
              {currentLang === 'en'
                ? 'Zero-Redirect Devotional Video Portal'
                : currentLang === 'hi'
                ? 'थेट वेबसाइट में आरती एवं सीधा मंदिर दर्शन'
                : 'थेट वेबसाइटमध्ये आरत्या व लाइव्ह मंदिर दर्शन'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight text-amber-100">
            {currentLang === 'en'
              ? 'Sacred Aartis & 24x7 Live Temple Darshan'
              : currentLang === 'hi'
              ? 'पावन आरतियां, काकड आरती एवं साक्षात देवस्थान दर्शन'
              : 'पावन आरत्या, काकड आरती व साक्षात देवस्थान दर्शन'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
            {currentLang === 'en'
              ? 'Watch and listen to authentic specific Aartis and live temple streams directly in your website with ZERO redirect. Import your own favorite YouTube Aarti links anytime.'
              : currentLang === 'hi'
              ? 'यूट्यूब पर रीडायरेक्ट हुए बिना सीधे अपनी वेबसाइट में गणेश, शंकर, विट्ठल, महालक्ष्मी, स्वामी समर्थ आरतियां एवं तीर्थ दर्शन देखें। स्वयं की यूट्यूब लिंक भी जोड़ें।'
              : 'यूट्यूबवर रीडायरेक्ट न होता थेट आपल्या वेबसाइटमध्येच पाहा श्री गणपती, शंकर, विठुराया, महालक्ष्मी, स्वामी समर्थ, मारुती, साईबाबांच्या पावन आरत्या व लाइव्ह मंदिर दर्शन.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] sm:text-xs text-amber-200">
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-amber-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {currentLang === 'en' ? 'No External Redirect (Plays In-Website)' : 'कोणताही रिडायरेक्ट नाही (थेट वेबसाइटमध्ये प्ले)'}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-amber-500/30">
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              {currentLang === 'en' ? 'Import Custom YouTube Links' : 'स्वतःची YouTube लिंक सेव्ह करण्याची सुविधा'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Master Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          {/* Tab 1: Specific Aartis */}
          <button
            onClick={() => setActiveTab('aarti')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'aarti'
                ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>{currentLang === 'en' ? 'Specific Aartis' : '🪔 पावन आरत्या संग्रह'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white">
              {allAartis.length}
            </span>
          </button>

          {/* Tab 2: Live Temple Darshan */}
          <button
            onClick={() => setActiveTab('darshan')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'darshan'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>{currentLang === 'en' ? 'Live Temple Darshan' : '🔴 थेट देवस्थान दर्शन'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white">
              {liveDarshanDatabase.length}
            </span>
          </button>

          {/* Tab 3: Import YouTube Link */}
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'import'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-300" />
            <span>{currentLang === 'en' ? 'Import YouTube Link' : '➕ लिंक जोडा (Import)'}</span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === 'en'
                ? 'Search Aarti or Deity...'
                : 'आरती किंवा देवता शोधा...'
            }
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-white"
          />
        </div>
      </div>

      {/* 3. In-Website Embedded Video Player (NO REDIRECT!) */}
      <div ref={playerRef} className="mb-8">
        <div className={`bg-black rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl relative transition-all ${
          isTheatreMode ? 'fixed inset-4 z-50 flex flex-col bg-stone-950 p-2 border-amber-500' : ''
        }`}>
          
          {/* Header Bar of Video Player */}
          <div className="px-4 py-3 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-b border-stone-800 flex items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2.5 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider block">
                  {isVideoTypeAarti
                    ? (currentLang === 'en' ? 'Sacred Aarti Playback • Zero Redirect' : 'पावन महाआरती • थेट इन-वेबसाइट दर्शन')
                    : (currentLang === 'en' ? 'Official Live Stream • Zero Redirect' : 'अधिकृत थेट मंदिर प्रक्षेपण')}
                </span>
                <h2 className="text-sm sm:text-base font-bold font-serifDev truncate text-stone-100">
                  {currentMediaTitle}
                </h2>
              </div>
            </div>

            {/* Quick Controls on Player Bar */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsTheatreMode(!isTheatreMode)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                title={isTheatreMode ? 'Exit Theatre Mode' : 'Theatre Mode'}
              >
                {isTheatreMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Video Iframe Container (Responsive 16:9) */}
          <div className="relative w-full aspect-video bg-stone-950 overflow-hidden flex items-center justify-center">
            {/* The Embedded YouTube Player - Plays with NO REDIRECT */}
            <iframe
              src={currentEmbedUrl}
              title={currentMediaTitle}
              className="w-full h-full border-0 absolute inset-0 z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Floating Aarti Deepak Waving Effect Overlay */}
            {isAartiWaving && (
              <div
                className="absolute z-20 pointer-events-none transition-transform duration-75 flex flex-col items-center"
                style={{
                  transform: `translate(${aartiX}px, ${aartiY}px)`,
                }}
              >
                <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(245,158,11,1)] animate-pulse">
                  🪔
                </span>
                <span className="text-[9px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-full mt-1 border border-amber-400/40">
                  आरती ओवाळली जात आहे...
                </span>
              </div>
            )}
          </div>

          {/* Devotional Interactive Bar under Player */}
          <div className="p-3.5 sm:p-5 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  {currentDeityName}
                </span>
                {isVideoTypeAarti && (
                  <span className="text-xs text-stone-400 font-mono">
                    🎙️ {activeAarti.singer}
                  </span>
                )}
              </div>
            </div>

            {/* Devotional Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* 1. Ring Bell */}
              <button
                onClick={handleRingBell}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isBellRinging
                    ? 'bg-amber-400 text-stone-950 scale-105'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                }`}
                title="घंटा वाजवा"
              >
                <Bell className={`w-3.5 h-3.5 ${isBellRinging ? 'animate-bounce' : ''}`} />
                <span>{currentLang === 'en' ? 'Ring Bell' : 'घंटा वाजवा'}</span>
              </button>

              {/* 2. Wave Aarti */}
              <button
                onClick={handleToggleWaveAarti}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isAartiWaving
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white ring-2 ring-amber-400 animate-pulse'
                    : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30'
                }`}
                title="आरती ओवाळा"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isAartiWaving
                    ? (currentLang === 'en' ? 'Waving Aarti...' : 'आरती ओवाळत आहे...')
                    : (currentLang === 'en' ? 'Wave Aarti' : 'आरती ओवाळा')}
                </span>
              </button>

              {/* 3. E-Pranam Namaskar */}
              <button
                onClick={() => setPrayedCount((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-300 border border-stone-700 text-xs font-semibold active:scale-95"
                title="ई-प्रणाम अर्पण करा"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                <span>{prayedCount} {currentLang === 'en' ? 'Pranam' : 'प्रणाम'}</span>
              </button>

              {/* 4. WhatsApp Share */}
              <button
                onClick={handleShareVideo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                title="WhatsApp वर शेअर करा"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? 'Share' : 'शेअर करा'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TAB 3: IMPORT YOUTUBE LINK SECTION */}
      {activeTab === 'import' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-8 mb-8 shadow-md">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                {currentLang === 'en' ? 'Import Custom YouTube Video' : 'नवीन आरती किंवा थेट दर्शन लिंक जोडा'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-stone-900 dark:text-white mt-1">
                {currentLang === 'en'
                  ? 'Paste Any YouTube Link to Play In-Website'
                  : 'कोणतीही YouTube लिंक टाका व थेट वेबसाइटमध्ये प्ले करा'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {currentLang === 'en'
                  ? 'The video will play directly in Sanatan Amrutdhara without redirecting to YouTube.'
                  : 'हा व्हिडिओ कोणत्याही रिडायरेक्टशिवाय थेट याच वेबसाइटमध्ये प्ले होईल आणि तुमच्या डिव्हाइसवर कायम सेव्ह राहील.'}
              </p>
            </div>

            {importStatusMessage && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300">
                {importStatusMessage}
              </div>
            )}

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {currentLang === 'en' ? 'YouTube Video or Live Stream URL *' : 'यूट्यूब व्हिडिओ किंवा लाईव्ह स्ट्रीम लिंक (URL) *'}
                </label>
                <input
                  type="text"
                  required
                  value={importUrl}
                  onChange={(e) => {
                    setImportUrl(e.target.value);
                    setImportStatusMessage(null);
                  }}
                  placeholder="https://www.youtube.com/watch?v=... किंवा https://youtu.be/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {currentLang === 'en' ? 'Aarti / Video Title' : 'आरतीचे किंवा दर्शनाचे नाव'}
                  </label>
                  <input
                    type="text"
                    value={importTitle}
                    onChange={(e) => setImportTitle(e.target.value)}
                    placeholder="उदा. माझी आवडती महालक्ष्मी आरती"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {currentLang === 'en' ? 'Deity Name' : 'देवतेचे नाव'}
                  </label>
                  <input
                    type="text"
                    value={importDeity}
                    onChange={(e) => setImportDeity(e.target.value)}
                    placeholder="उदा. श्री गणपती / आई तुळजाभवानी"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {currentLang === 'en' ? 'Category' : 'प्रकार'}
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={importCategory === 'aarti'}
                      onChange={() => setImportCategory('aarti')}
                    />
                    <span>{currentLang === 'en' ? 'Sacred Aarti' : 'पावन आरती'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={importCategory === 'live_darshan'}
                      onChange={() => setImportCategory('live_darshan')}
                    />
                    <span>{currentLang === 'en' ? 'Live Temple Darshan' : 'थेट मंदिर दर्शन'}</span>
                  </label>
                </div>
              </div>

              {/* Instant Live Thumbnail Preview if valid URL */}
              {importUrl.trim() && extractYouTubeId(importUrl.trim()) && (
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center gap-3">
                  <img
                    src={getYouTubeThumbnailUrl(importUrl.trim())}
                    alt="Preview"
                    className="w-20 h-14 object-cover rounded-lg border border-stone-300 dark:border-stone-600"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      ✓ वैध YouTube व्हिडिओ सापडला
                    </span>
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      {importTitle.trim() || 'नवीन भक्ती व्हिडिओ'}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>
                  {currentLang === 'en'
                    ? 'Save & Play In-Website Immediately'
                    : 'लिंक सेव्ह करा व थेट वेबसाइटमध्ये प्ले करा (No Redirect)'}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. TAB 1: SPECIFIC AARTIS COLLECTION GRID */}
      {activeTab === 'aarti' && (
        <div>
          {/* Quick Deity Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
            {deityFilters.map((df) => (
              <button
                key={df.id}
                onClick={() => setSelectedDeityFilter(df.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedDeityFilter === df.id
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                {df.label[currentLang] || df.label.mr}
              </button>
            ))}
          </div>

          {/* Aartis Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAartis.map((aarti) => {
              const isCurrent = isVideoTypeAarti && activeAarti.id === aarti.id;
              const thumb = getYouTubeThumbnailUrl(aarti.youtubeVideoId);

              return (
                <div
                  key={aarti.id}
                  onClick={() => handlePlayAarti(aarti)}
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all hover:shadow-xl group relative ${
                    isCurrent
                      ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video bg-stone-950 overflow-hidden">
                    <img
                      src={thumb}
                      alt={aarti.title.mr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      onError={(e) => {
                        // Fallback placeholder if youtube thumbnail is not available
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    
                    {/* Play Badge Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                        isCurrent
                          ? 'bg-red-600 text-white ring-4 ring-white/40 animate-pulse'
                          : 'bg-amber-500/90 text-stone-950'
                      }`}>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white font-mono font-bold">
                      {aarti.duration}
                    </span>

                    {/* Deity Badge */}
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                      <span>{aarti.icon}</span>
                      <span>{aarti.deity[currentLang] || aarti.deity.mr}</span>
                    </span>

                    {/* Custom User Tag & Delete */}
                    {aarti.isUserCustom && (
                      <button
                        onClick={(e) => handleDeleteCustomVideo(aarti.id, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 hover:bg-red-700 text-white shadow transition-all"
                        title="Delete custom link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h4 className="font-bold font-serifDev text-stone-900 dark:text-stone-100 text-sm line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {aarti.title[currentLang] || aarti.title.mr}
                    </h4>
                    
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
                      🎙️ {aarti.singer}
                    </p>

                    <p className="text-xs text-stone-600 dark:text-stone-300 font-serifDev italic mt-2 line-clamp-2 bg-stone-50 dark:bg-stone-800/50 p-2 rounded-lg border border-stone-100 dark:border-stone-800">
                      "{aarti.lyricsSnippet[currentLang] || aarti.lyricsSnippet.mr}"
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                        {isCurrent ? '▶️ सध्या प्ले होत आहे' : 'वेबसाइटमध्ये प्ले करा'}
                      </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1">
                        <span>ऐका व दर्शन घ्या</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. TAB 2: LIVE TEMPLE DARSHAN SHED */}
      {activeTab === 'darshan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTemples.map((temple) => {
              const isSelected = !isVideoTypeAarti && temple.id === activeTemple.id;

              return (
                <div
                  key={temple.id}
                  onClick={() => handlePlayDarshan(temple)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all hover:shadow-lg ${
                    isSelected
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-500 shadow-md ring-2 ring-red-500/30'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      {currentLang === 'en' ? 'LIVE DARSHAN' : 'थेट दर्शन'}
                    </span>
                    <span className="text-xl">{temple.icon || '🪷'}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-sm sm:text-base line-clamp-1">
                    {temple.templeName[currentLang] || temple.templeName.mr}
                  </h3>
                  
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                    {temple.deityName[currentLang] || temple.deityName.mr}
                  </p>

                  <p className="text-[10px] text-stone-400 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                    {temple.location}
                  </p>

                  <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">
                      {isSelected ? '🔴 लाइव्ह पाहताय' : 'थेट प्रवाह पाहा'}
                    </span>
                    <span className="text-xs text-stone-400">→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Temple Details: Schedule & Significance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
            {/* Daily Aarti Schedule */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 mb-4">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serifDev flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>
                    {currentLang === 'en' ? 'Daily Aarti Schedule' : 'दैनिक आरती वेळापत्रक'}
                  </span>
                </h3>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {activeTemple.templeName[currentLang] || activeTemple.templeName.mr}
                </span>
              </div>

              <div className="space-y-2.5">
                {activeTemple.dailySchedule.map((aarti, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-100 dark:border-stone-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 font-serifDev">
                        {aarti.aartiName}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 font-mono bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900/50">
                      {aarti.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                <span>* सण व उत्सवानुसार वेळेत बदल होऊ शकतो.</span>
                <a
                  href={activeTemple.trustWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>{currentLang === 'en' ? 'Official Sansthan' : 'अधिकृत देवस्थान पोर्टल'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Significance & Blessings */}
            <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serifDev flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>
                    {currentLang === 'en'
                      ? 'Devotional Significance & Blessings'
                      : 'या देवस्थानचे माहात्म्य व आशीर्वाद'}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serifDev">
                  {activeTemple.significance[currentLang] || activeTemple.significance.mr}
                </p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  🙏 घरबसल्या ई-प्रणाम व दर्शन
                </span>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  वरील प्लेयरवर प्ले करून तुम्ही घरबसल्या थेट पावन दर्शन घेऊ शकता. घंटा वाजवून व आरती ओवाळून मनोभावे नमन करा.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { 
  Square, 
  ExternalLink, 
  Copy, 
  Check, 
  Volume2, 
  Bell, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Music2,
  Heart
} from 'lucide-react';
import { getDeityAarti, DeityAartiDetail } from '../data/deityAartisData';
import { audioEngine } from '../utils/audioSynth';
import { Language } from '../types';

interface DeityAartiSectionProps {
  godId: string;
  currentLang: Language;
  deityName?: string;
}

export const DeityAartiSection: React.FC<DeityAartiSectionProps> = ({
  godId,
  currentLang,
  deityName,
}) => {
  const aartiEntry = getDeityAarti(godId);
  const displayName = deityName || aartiEntry.deityName[currentLang === 'en' ? 'en' : currentLang === 'hi' ? 'hi' : 'mr'];
  const [selectedLang, setSelectedLang] = useState<'mr' | 'hi'>(
    currentLang === 'hi' ? 'hi' : 'mr'
  );
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isPlayingChant, setIsPlayingChant] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showRitualGuide, setShowRitualGuide] = useState(false);

  const currentAarti: DeityAartiDetail =
    selectedLang === 'mr' ? aartiEntry.marathi : aartiEntry.hindi;

  // Handle in-app recitation of Aarti lyrics with Tanpura
  const handleToggleRecitation = () => {
    if (isPlayingChant) {
      audioEngine.stopSpeaking();
      setIsPlayingChant(false);
    } else {
      audioEngine.playTempleBell();
      setIsPlayingChant(true);
      const recitationText = `${currentAarti.title}. ${currentAarti.lyrics.join('. ')}`;
      audioEngine.playBrahmanChant({
        text: recitationText,
        lang: selectedLang === 'mr' ? 'mr-IN' : 'hi-IN',
        withTanpura: true,
        onEnd: () => setIsPlayingChant(false),
      });
    }
  };

  const handlePlayBell = () => {
    audioEngine.playTempleBell();
  };

  const handleCopyLyrics = () => {
    const fullText = `${currentAarti.title}\n(${currentAarti.composer})\n\n${currentAarti.lyrics.join('\n')}\n\n॥ सनातन अमृतधारा आरती संग्रह ॥`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed sm:text-base',
    base: 'text-base leading-loose sm:text-lg',
    lg: 'text-lg leading-loose sm:text-xl',
    xl: 'text-xl leading-loose sm:text-2xl',
  };

  return (
    <div id="deity-aarti-section" className="w-full mt-8 rounded-3xl overflow-hidden border border-amber-300/60 dark:border-amber-500/25 bg-gradient-to-b from-amber-50/90 via-white to-orange-50/60 dark:from-stone-900/95 dark:via-stone-950 dark:to-stone-900/90 shadow-xl transition-all">
      {/* Decorative Golden Top Banner */}
      <div className="relative px-5 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/20 shrink-0">
            🪔
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-200 bg-black/20 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                {currentLang === 'en' ? 'Sacred Aarti' : currentLang === 'hi' ? 'पावन आरती संग्रह' : 'खऱ्या पारंपारिक आरत्या'}
              </span>
              <span className="text-xs text-amber-100/90 font-serifDev flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                {displayName}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serifDev mt-1 tracking-tight text-white drop-shadow-sm">
              {currentAarti.title}
            </h3>
          </div>
        </div>

        {/* Dual Language Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 self-start md:self-auto">
          <button
            onClick={() => {
              if (isPlayingChant) audioEngine.stopSpeaking();
              setIsPlayingChant(false);
              setSelectedLang('mr');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-serifDev transition-all flex items-center gap-1.5 ${
              selectedLang === 'mr'
                ? 'bg-white text-saffron-700 shadow-md scale-102'
                : 'text-amber-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🚩</span>
            <span>मराठी आरती</span>
          </button>
          <button
            onClick={() => {
              if (isPlayingChant) audioEngine.stopSpeaking();
              setIsPlayingChant(false);
              setSelectedLang('hi');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-serifDev transition-all flex items-center gap-1.5 ${
              selectedLang === 'hi'
                ? 'bg-white text-saffron-700 shadow-md scale-102'
                : 'text-amber-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🕉️</span>
            <span>हिंदी आरती</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Video + Controls on Left, Sacred Lyrics on Right */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 16:9 YouTube Player, Action Buttons & Info */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* 16:9 Responsive YouTube Embed */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-amber-300/40 dark:border-stone-700 group">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentAarti.youtubeId}?rel=0&modestbranding=1`}
              title={currentAarti.youtubeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* YouTube Video Title Badge */}
          <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 px-1">
            <span className="truncate max-w-[75%] font-medium">
              📺 {currentAarti.youtubeTitle}
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${currentAarti.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold hover:underline shrink-0"
              title="Open directly in YouTube App"
            >
              <span>यूट्यूब ॲप</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Action Control Bar */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* Recite / Listen Button with Tanpura */}
            <button
              onClick={handleToggleRecitation}
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl font-bold font-serifDev text-xs sm:text-sm transition-all shadow-md ${
                isPlayingChant
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white'
              }`}
            >
              {isPlayingChant ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>पठण थांबवा</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>आरती पठण ऐका</span>
                </>
              )}
            </button>

            {/* Temple Bell Chime */}
            <button
              onClick={handlePlayBell}
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl font-bold font-serifDev text-xs sm:text-sm bg-amber-100 hover:bg-amber-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-stone-700 transition-all shadow-sm active:scale-95"
            >
              <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>घंटी नाद (Bell)</span>
            </button>
          </div>

          {/* Composer & Tradition Badge */}
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-stone-900/60 border border-amber-200/80 dark:border-stone-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>रचनाकार व परंपरा:</span>
            </div>
            <p className="text-sm font-semibold font-serifDev text-stone-900 dark:text-stone-100">
              {currentAarti.composer}
            </p>
          </div>

          {/* Spiritual Significance / भावार्थ व माहात्म्य */}
          <div className="p-4 rounded-2xl bg-orange-50/80 dark:bg-stone-900/60 border border-orange-200/80 dark:border-stone-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-800 dark:text-orange-300">
              <Heart className="w-4 h-4 text-red-500" />
              <span>भावार्थ व माहात्म्य (Spiritual Merit):</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serifDev">
              {currentAarti.significance}
            </p>
          </div>

          {/* Toggle Sacred Aarti Vidhi Ritual Accordion */}
          <button
            onClick={() => setShowRitualGuide(!showRitualGuide)}
            className="w-full py-2.5 px-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700/80 transition-all"
          >
            <span className="flex items-center gap-2 font-serifDev">
              <Flame className="w-4 h-4 text-amber-500" />
              {currentLang === 'en' ? 'Sacred Aarti Ritual Guide' : 'आरती ओवाळण्याची योग्य पद्धत व नियम'}
            </span>
            <span className="text-xs text-stone-400">
              {showRitualGuide ? '▲ बंद करा' : '▼ जाणून घ्या'}
            </span>
          </button>

          {showRitualGuide && (
            <div className="p-4 rounded-2xl bg-stone-100/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 space-y-2 animate-fadeIn font-serifDev">
              <p className="font-bold text-amber-700 dark:text-amber-400">
                १. आरती ओवाळण्याचा क्रम:
              </p>
              <p>
                आरती तबक नेहमी घड्याळाच्या काट्याच्या दिशेने (क्लॉकवाईज) ओवाळावे. प्रथम देवाच्या चरणकमलांवर ४ वेळा, नाभीकमलावर २ वेळा, मुखमंडलावर १ वेळा आणि संपूर्ण अंगावर ७ वेळा ॐ च्या आकारात ओवाळावे.
              </p>
              <p className="font-bold text-amber-700 dark:text-amber-400 pt-1">
                २. दीप व कर्पूर:
              </p>
              <p>
                आरतीसाठी गाईचे शुद्ध तूप किंवा शुद्ध कापूर वापरावा. आरती चालू असताना मनोभावे टाळ्या वाजवून जयघोष करावा.
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Complete Verified Devanagari Lyrics Card with Scaler */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex-1 p-5 sm:p-7 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between">
            {/* Top Lyrics Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
                <span className="font-bold font-serifDev text-sm text-stone-800 dark:text-stone-200">
                  {selectedLang === 'mr' ? 'संपूर्ण आरतीचे बोल (मराठी)' : 'सम्पूर्ण आरती के बोल (हिंदी)'}
                </span>
              </div>

              {/* Font Size & Copy Buttons */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-200 dark:border-stone-700 text-xs">
                  <button
                    onClick={() => {
                      if (fontSize === 'xl') setFontSize('lg');
                      else if (fontSize === 'lg') setFontSize('base');
                      else setFontSize('sm');
                    }}
                    disabled={fontSize === 'sm'}
                    className="px-2 py-1 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-40 transition-colors"
                    title="Font Smaller"
                  >
                    A-
                  </button>
                  <span className="px-1.5 text-[10px] font-bold text-stone-400 uppercase">
                    {fontSize}
                  </span>
                  <button
                    onClick={() => {
                      if (fontSize === 'sm') setFontSize('base');
                      else if (fontSize === 'base') setFontSize('lg');
                      else setFontSize('xl');
                    }}
                    disabled={fontSize === 'xl'}
                    className="px-2 py-1 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-40 transition-colors"
                    title="Font Larger"
                  >
                    A+
                  </button>
                </div>

                {/* Copy Lyrics Button */}
                <button
                  onClick={handleCopyLyrics}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-stone-700 border border-amber-200 dark:border-stone-700 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all"
                  title="Copy lyrics"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 dark:text-emerald-400">कॉपी झाले!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-600" />
                      <span>कॉपी</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sacred Lyrics Display */}
            <div className={`space-y-4 font-serifDev text-stone-800 dark:text-stone-200 ${fontSizeClasses[fontSize]}`}>
              {currentAarti.lyrics.map((verse, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 rounded-xl bg-stone-50/70 dark:bg-stone-950/40 border border-stone-200/50 dark:border-stone-800/60 hover:border-amber-400/50 transition-colors"
                >
                  <p className="select-text whitespace-pre-wrap tracking-wide leading-relaxed">
                    {verse}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-5 mt-5 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-2 font-serifDev">
              <span className="flex items-center gap-1.5">
                <Music2 className="w-3.5 h-3.5 text-amber-500" />
                <span>सद्भावनेने आरती गायल्याने मन शांत होऊन घरात सकारात्मक ऊर्जा निर्माण होते.</span>
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                ॥ जय जय सच्‍चिदानंद ॥
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

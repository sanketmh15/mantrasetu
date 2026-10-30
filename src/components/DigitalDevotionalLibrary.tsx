import { useState } from 'react';
import { Language } from '../types';
import {
  digitalLibraryDatabase,
  DigitalBook,
} from '../data/digitalLibraryData';
import { audioEngine } from '../utils/audioSynth';
import { toggleDevotionalBookmark, isBookmarkSaved } from '../utils/storage';
import {
  BookOpen,
  Headphones,
  FileText,
  Search,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Check,
  Bookmark,
  Layers,
  Sparkles,
} from 'lucide-react';

interface DigitalDevotionalLibraryProps {
  currentLang: Language;
  onNavigateTab?: (tab: string) => void;
  onOpenGodDetail?: (godId: string) => void;
}

export function DigitalDevotionalLibrary({ currentLang }: DigitalDevotionalLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [activeBookId, setActiveBookId] = useState<string>('dnyaneshwari');
  const [playingVerseId, setPlayingVerseId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    digitalLibraryDatabase.forEach((b) => {
      map[b.id] = isBookmarkSaved(b.id, 'book');
    });
    return map;
  });

  const subjects = [
    { id: 'all', label: { mr: 'सर्व विषय', hi: 'सभी विषय', en: 'All Subjects' } },
    { id: 'Vedanta & Gita', label: { mr: 'वेदांत व भगवद्गीता', hi: 'वेदांत एवं गीता', en: 'Vedanta & Gita' } },
    { id: 'Sant Sahitya', label: { mr: 'महाराष्ट्र संत साहित्य', hi: 'संत साहित्य', en: 'Sant Sahitya' } },
    { id: 'Ethics & Meditation', label: { mr: 'नीती, आचरण व बोध', hi: 'नीति एवं ध्यान', en: 'Ethics & Meditation' } },
    { id: 'Bhakti & Stotra', label: { mr: 'भक्ती व स्तोत्रे', hi: 'भक्ति एवं स्तोत्र', en: 'Bhakti & Stotra' } },
  ];

  const languages = [
    { id: 'all', label: { mr: 'सर्व भाषा', hi: 'सभी भाषाएँ', en: 'All Languages' } },
    { id: 'mr', label: { mr: 'प्राकृत / मराठी', hi: 'मराठी', en: 'Marathi' } },
    { id: 'sa', label: { mr: 'संस्कृत (Sanskrit)', hi: 'संस्कृत', en: 'Sanskrit' } },
    { id: 'hi', label: { mr: 'हिंदी (Hindi)', hi: 'हिंदी', en: 'Hindi' } },
    { id: 'en', label: { mr: 'English', hi: 'अंग्रेजी', en: 'English' } },
  ];

  const formats = [
    { id: 'all', label: { mr: 'सर्व प्रकार', hi: 'सभी प्रकार', en: 'All Formats' } },
    { id: 'scripture', label: { mr: '📜 धर्मग्रंथ व ओव्या', hi: '📜 शास्त्र ग्रंथ', en: '📜 Scriptures' } },
    { id: 'audiobook', label: { mr: '🎧 श्राव्य ऑडिओ ग्रंथ', hi: '🎧 ऑडियो ग्रन्थ', en: '🎧 Audiobooks' } },
    { id: 'manuscript', label: { mr: '🖋️ हस्तलिखित पोथी', hi: '🖋️ प्राचीन पाण्डुलिपि', en: '🖋️ Manuscripts' } },
  ];

  // Filtering
  const filteredBooks = digitalLibraryDatabase.filter((book) => {
    if (selectedSubject !== 'all' && book.subject !== selectedSubject) return false;
    if (selectedLanguage !== 'all' && book.language !== selectedLanguage) return false;
    if (selectedFormat !== 'all' && book.format !== selectedFormat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle =
        book.title.mr.toLowerCase().includes(q) ||
        book.title.hi.toLowerCase().includes(q) ||
        book.title.en.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchSummary =
        book.summary.mr.toLowerCase().includes(q) ||
        book.summary.en.toLowerCase().includes(q);
      return matchTitle || matchAuthor || matchSummary;
    }
    return true;
  });

  const activeBook: DigitalBook =
    digitalLibraryDatabase.find((b) => b.id === activeBookId) ||
    filteredBooks[0] ||
    digitalLibraryDatabase[0];

  const handleToggleBookmark = (book: DigitalBook) => {
    toggleDevotionalBookmark({
      id: book.id,
      type: 'book',
      title: book.title,
      subtitle: { en: book.author, hi: book.author, mr: book.author },
      deityName: book.subject,
    });
    setBookmarkedIds((prev) => ({ ...prev, [book.id]: !prev[book.id] }));
  };

  const handlePlayVerseAudio = (verseKey: string, text: string) => {
    if (playingVerseId === verseKey) {
      audioEngine.stopSpeaking();
      setPlayingVerseId(null);
      return;
    }
    setPlayingVerseId(verseKey);
    audioEngine.speakText(text, 'mr-IN', 0.78, () => {
      setPlayingVerseId(null);
    });
  };

  const handleCopyVerse = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareBook = (book: DigitalBook) => {
    const text = `📖 *${book.title[currentLang] || book.title.mr}*\nलेखक: ${book.author}\nविषय: ${book.subject}\n\nमराठी भक्तांसाठी सनातन अमृतधारा डिजिटल ग्रंथालय:\nhttps://sanketmh15.github.io/mantrasetu/`;
    if (navigator.share) {
      navigator.share({ title: book.title.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Link copied to clipboard!' : 'माहिती क्लिपबोर्डवर कॉपी झाली!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-[#1e1308] to-stone-950 border border-amber-600/30 p-6 sm:p-10 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>
              {currentLang === 'en'
                ? 'Authorized Digital Granthalaya'
                : currentLang === 'hi'
                ? 'अधिकृत डिजिटल ग्रन्थालय'
                : 'अधिकृत डिजिटल ग्रंथालय व संत साहित्य'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Sacred Digital Library & Sant Literature'
              : currentLang === 'hi'
              ? 'डिजिटल ग्रन्थालय: ज्ञानेश्वरी, दासबोध एवं संत साहित्य'
              : 'डिजिटल ग्रंथालय: ज्ञानेश्वरी, दासबोध, गाथा व गीता'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-3xl leading-relaxed">
            {currentLang === 'en'
              ? 'Immerse yourself in authentic scriptures, audiobooks, and holy manuscripts. Read original Prakrit and Sanskrit verses with line-by-line Marathi, Hindi, and English interpretations, alongside sacred baritone recitation.'
              : currentLang === 'hi'
              ? 'ज्ञानेश्वरी, श्रीमद् दासबोध, तुकाराम गाथा एवं भगवद्गीता के प्रामाणिक श्लोक, ओवियाँ, सरल अनुवाद एवं दिव्य स्वर में श्रवण का अनुभव प्राप्त करें।'
              : 'ज्ञानेश्वरी, ग्रंथराज दासबोध, तुकाराम गाथा, मनाचे श्लोक व भगवद्गीता यांचे प्रामाणिक मूळ चरण, सविस्तर भावार्थ आणि प्राकृत मराठीतील अमृतवाणी ऑडिओ श्रवण.'}
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-serifDev">
                १५,०००+
              </span>
              <p className="text-[11px] text-stone-300 mt-0.5">
                {currentLang === 'en' ? 'Sacred Verses & Ovis' : currentLang === 'hi' ? 'श्लोक व ओवियाँ' : 'मूळ ओव्या व श्लोक'}
              </p>
            </div>
            <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-serifDev">
                ४ प्रमुख
              </span>
              <p className="text-[11px] text-stone-300 mt-0.5">
                {currentLang === 'en' ? 'Languages' : 'भाषा (मराठी, संस्कृत, हिंदी)'}
              </p>
            </div>
            <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-serifDev">
                १००% विनामूल्य
              </span>
              <p className="text-[11px] text-stone-300 mt-0.5">
                {currentLang === 'en' ? 'Ad-Free Devotion' : 'मुक्त व विनामूल्य ग्रंथ'}
              </p>
            </div>
            <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="text-amber-400 font-extrabold text-lg sm:text-xl font-serifDev">
                श्राव्य ऑडिओ
              </span>
              <p className="text-[11px] text-stone-300 mt-0.5">
                {currentLang === 'en' ? 'Voice Narration' : 'शुद्ध उच्चार ऑडिओ'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-[#1a1510] rounded-2xl border border-amber-200 dark:border-amber-900/40 p-4 sm:p-6 mb-8 shadow-md">
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === 'en'
                ? 'Search by book title, sant author, or keywords (e.g. Dnyaneshwari, Dasbodh)...'
                : currentLang === 'hi'
                ? 'ग्रंथ का नाम, संत या लेखक खोजें (उदा. ज्ञानेश्वरी, दासबोध)...'
                : 'ग्रंथाचे नाव, संत किंवा विषय शोधा (उदा. ज्ञानेश्वरी, दासबोध, तुकाराम गाथा)...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="space-y-3">
          {/* Subject Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 whitespace-nowrap flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              {currentLang === 'en' ? 'Subject:' : 'विषय:'}
            </span>
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSubject === sub.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {sub.label[currentLang] || sub.label.mr}
              </button>
            ))}
          </div>

          {/* Language & Format Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800/60">
            {/* Language */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {currentLang === 'en' ? 'Language:' : 'भाषा:'}
              </span>
              {languages.map((lng) => (
                <button
                  key={lng.id}
                  onClick={() => setSelectedLanguage(lng.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedLanguage === lng.id
                      ? 'bg-saffron-600 text-white font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {lng.label[currentLang] || lng.label.mr}
                </button>
              ))}
            </div>

            {/* Format */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar ml-auto">
              {formats.map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedFormat === fmt.id
                      ? 'bg-amber-700 text-white font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {fmt.label[currentLang] || fmt.label.mr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Books Grid + Active Reader Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Books List (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>
                {currentLang === 'en'
                  ? `Available Scriptures (${filteredBooks.length})`
                  : `उपलब्ध धर्मग्रंथ (${filteredBooks.length})`}
              </span>
            </h2>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 dark:bg-stone-900 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800">
              <p className="text-stone-500 text-sm">
                {currentLang === 'en'
                  ? 'No books match the selected filters.'
                  : 'या निकषांशी जुळणारे ग्रंथ उपलब्ध नाहीत. कृपया दुसरे फिल्टर निवडा.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {filteredBooks.map((book) => {
                const isSelected = book.id === activeBook.id;
                const isSaved = bookmarkedIds[book.id];

                return (
                  <div
                    key={book.id}
                    onClick={() => setActiveBookId(book.id)}
                    className={`cursor-pointer rounded-xl sm:rounded-2xl p-3.5 sm:p-4 transition-all border ${
                      isSelected
                        ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-500 shadow-lg ring-1 ring-amber-500/30'
                        : 'bg-white dark:bg-[#16130f] border-stone-200 dark:border-stone-800/80 hover:border-amber-300 dark:hover:border-amber-800/60 shadow-sm'
                    }`}
                  >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800/50">
                        {book.iconEmoji}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                            {book.languageName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            {book.format === 'audiobook' ? '🎧 श्राव्य' : '📜 पोथी'}
                          </span>
                        </div>
                        <h3 className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-base mt-1">
                          {book.title[currentLang] || book.title.mr}
                        </h3>
                        <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                          {book.author}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(book);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isSaved
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-stone-400 hover:text-red-500'
                      }`}
                      title="Bookmark this scripture"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {book.summary[currentLang] || book.summary.mr}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/50 text-[11px] text-stone-500 dark:text-stone-400">
                    <span>
                      {book.totalChapters} {currentLang === 'en' ? 'Chapters / Dashakas' : 'अध्याय / दशक'}
                    </span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      {isSelected ? (currentLang === 'en' ? 'Reading Now →' : 'वाचत आहात →') : (currentLang === 'en' ? 'Open Reader' : 'वाचा')}
                    </span>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>

        {/* Right Column: Active Book Detail & Scripture Reader (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#16130f] rounded-3xl border border-amber-300 dark:border-amber-800/50 p-6 sm:p-8 shadow-xl sticky top-20">
            {/* Header of Active Book */}
            <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeBook.iconEmoji}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serifDev">
                      {activeBook.title[currentLang] || activeBook.title.mr}
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
                      {activeBook.author}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleBookmark(activeBook)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      bookmarkedIds[activeBook.id]
                        ? 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-500'
                        : 'border-stone-200 dark:border-stone-800 hover:border-red-300 text-stone-500'
                    }`}
                    title="Bookmark Granth"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds[activeBook.id] ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleShareBook(activeBook)}
                    className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-500 hover:text-amber-600 transition-all"
                    title="Share Scripture"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Book Metadata Bar */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800">
                  {activeBook.languageName}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                  {activeBook.subject}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                  {activeBook.totalChapters} {currentLang === 'en' ? 'Sections' : 'अध्याय'}
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/30">
                {activeBook.summary[currentLang] || activeBook.summary.mr}
              </p>
            </div>

            {/* Verses Reader */}
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>
                    {currentLang === 'en'
                      ? 'Representative Sacred Verses (पवित्र ओव्या व अर्थ)'
                      : 'प्रतिनिधिक पवित्र ओव्या व सविस्तर भावार्थ'}
                  </span>
                </h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {activeBook.sampleVerses.length} {currentLang === 'en' ? 'Excerpts' : 'उदाहरणे'}
                </span>
              </div>

              {activeBook.sampleVerses.map((verse, idx) => {
                const verseKey = `${activeBook.id}_${idx}`;
                const isPlaying = playingVerseId === verseKey;
                const isCopied = copiedId === verseKey;

                return (
                  <div
                    key={verseKey}
                    className="rounded-2xl border border-amber-200/80 dark:border-amber-800/40 bg-gradient-to-br from-amber-50/30 via-stone-50/20 to-transparent dark:from-stone-900/50 dark:to-transparent p-5 sm:p-6"
                  >
                    {/* Chapter & Actions Header */}
                    <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3 mb-4">
                      <div>
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                          {verse.chapter}
                        </span>
                        <span className="text-[11px] text-stone-500 ml-2">
                          ({verse.verseNo})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePlayVerseAudio(verseKey, verse.originalText)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            isPlaying
                              ? 'bg-red-500 text-white animate-pulse'
                              : 'bg-amber-600 hover:bg-amber-500 text-white'
                          }`}
                          title="Listen with native Marathi/Sanskrit baritone pronunciation"
                        >
                          {isPlaying ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>{currentLang === 'en' ? 'Stop' : 'थांबवा'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{currentLang === 'en' ? 'Recite' : 'ऐका'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopyVerse(verseKey, `${verse.originalText}\n\nभावार्थ: ${verse.meaning.mr}`)}
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
                          title="Copy verse and meaning"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Original Prakrit / Sanskrit Verse in Devanagari */}
                    <div className="bg-amber-100/50 dark:bg-black/40 rounded-xl p-4 border border-amber-200 dark:border-amber-900/50 text-center">
                      <p className="text-base sm:text-lg font-serifDev font-extrabold text-stone-900 dark:text-amber-100 tracking-wide leading-relaxed">
                        {verse.originalText}
                      </p>
                    </div>

                    {/* Multilingual Meanings */}
                    <div className="mt-4 space-y-2">
                      <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        <strong className="text-amber-700 dark:text-amber-400 font-semibold block mb-0.5">
                          {currentLang === 'en'
                            ? 'English Meaning:'
                            : currentLang === 'hi'
                            ? 'हिन्दी भावार्थ:'
                            : 'मराठी सविस्तर भावार्थ:'}
                        </strong>
                        <p className="italic bg-white/60 dark:bg-stone-900/60 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
                          {verse.meaning[currentLang] || verse.meaning.mr}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Offline & Authorized Seal */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                {currentLang === 'en' ? 'Authorized Textual Edition' : 'प्रमाणित शुद्ध पाठ'}
              </span>
              <span className="flex items-center gap-1 text-stone-400">
                <Headphones className="w-3.5 h-3.5" />
                {currentLang === 'en' ? 'Audio Synthesis Ready' : 'ऑडिओ श्रवण सक्षम'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

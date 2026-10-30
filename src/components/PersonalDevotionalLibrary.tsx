import { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  getStoredBookmarks,
  toggleDevotionalBookmark,
  DevotionalBookmark,
} from '../utils/storage';
import {
  Bookmark,
  Heart,
  Wifi,
  WifiOff,
  Trash2,
  ExternalLink,
  Download,
} from 'lucide-react';

interface PersonalDevotionalLibraryProps {
  currentLang: Language;
  onNavigateTab: (tab: string) => void;
  onOpenGodDetail?: (godId: string) => void;
}

export function PersonalDevotionalLibrary({
  currentLang,
  onNavigateTab,
}: PersonalDevotionalLibraryProps) {
  const [bookmarks, setBookmarks] = useState<DevotionalBookmark[]>(getStoredBookmarks);
  const [activeFilter, setActiveFilter] = useState<'all' | 'mantra' | 'chalisa' | 'temple' | 'aarti' | 'recipe'>('all');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Sync bookmarks changes
  useEffect(() => {
    const handleUpdate = () => {
      setBookmarks(getStoredBookmarks());
    };
    window.addEventListener('mantrasetu_bookmarks_updated', handleUpdate);
    return () => window.removeEventListener('mantrasetu_bookmarks_updated', handleUpdate);
  }, []);

  // Monitor online / offline network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRemove = (bookmark: DevotionalBookmark) => {
    toggleDevotionalBookmark(bookmark);
    setBookmarks(getStoredBookmarks());
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `MantraSetu_Devotional_Library_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    if (activeFilter === 'all') return true;
    return b.type === activeFilter;
  });

  const getTargetTab = (type: DevotionalBookmark['type']) => {
    switch (type) {
      case 'mantra': return 'mantras';
      case 'chalisa': return 'chalisa';
      case 'temple': return 'nearby-temples';
      case 'aarti': return 'worship';
      case 'recipe': return 'satvik';
      default: return 'home';
    }
  };

  const getTypeIcon = (type: DevotionalBookmark['type']) => {
    switch (type) {
      case 'mantra': return '🕉️';
      case 'chalisa': return '📖';
      case 'temple': return '🛕';
      case 'aarti': return '🪔';
      case 'recipe': return '🍲';
      default: return '⭐';
    }
  };

  const filters = [
    { id: 'all', label: { en: 'All Saved', hi: 'सभी सुरक्षित', mr: 'सर्व जतन केलेले' }, count: bookmarks.length },
    { id: 'mantra', label: { en: 'Mantras', hi: 'मन्त्र', mr: 'मंत्र' }, count: bookmarks.filter(b => b.type === 'mantra').length },
    { id: 'chalisa', label: { en: 'Chalisas', hi: 'चालीसा', mr: 'चालीसा व स्तोत्रे' }, count: bookmarks.filter(b => b.type === 'chalisa').length },
    { id: 'temple', label: { en: 'Temples', hi: 'मंदिर', mr: 'मंदिरे' }, count: bookmarks.filter(b => b.type === 'temple').length },
    { id: 'aarti', label: { en: 'Aartis', hi: 'आरती', mr: 'आरत्या' }, count: bookmarks.filter(b => b.type === 'aarti').length },
    { id: 'recipe', label: { en: 'Prasad', hi: 'प्रसाद', mr: 'नैवेद्य पाककृती' }, count: bookmarks.filter(b => b.type === 'recipe').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Bookmark className="w-4 h-4 text-amber-600" />
          <span>
            {currentLang === 'en'
              ? 'Personal Devotional Library & Offline Vault'
              : 'माझे वैयक्तिक भक्ती ग्रंथालय व ऑफलाइन संग्रह'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'My Devotional Library & Offline Mode'
            : currentLang === 'hi'
            ? 'मेरा भक्ति पुस्तकालय एवं ऑफलाइन संग्रह'
            : 'माझे वैयक्तिक भक्ती दालन व ऑफलाइन संग्रह'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Access your favorite mantras, chalisas, temples, and aartis instantly. Saved texts remain fully readable offline even in remote pilgrimage sanctums without internet.'
            : 'आपले आवडते मंत्र, स्तोत्रे, मंदिरे व आरत्या एकाच ठिकाणी. इंटरनेट नसतानाही तीर्थक्षेत्रांच्या गाभाऱ्यात किंवा प्रवासात ऑफलाइन वाचनासाठी उपलब्ध.'}
        </p>
      </div>

      {/* Offline Status & Backup Banner */}
      <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-800">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md ${isOnline ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40' : 'bg-amber-600/30 text-amber-400 border border-amber-500/40'}`}>
            {isOnline ? <Wifi className="w-5 h-5 text-emerald-400" /> : <WifiOff className="w-5 h-5 text-amber-400 animate-pulse" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold font-serifDev text-sm sm:text-base">
                {isOnline
                  ? currentLang === 'en'
                    ? 'Connected Online (Offline Vault Active)'
                    : 'ऑनलाइन जोडलेले (ऑफलाइन स्टोरेज सक्रिय)'
                  : currentLang === 'en'
                  ? 'Offline Mode Active'
                  : 'ऑफलाइन मोड सक्रिय आहे'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {isOnline ? '✓ 100% Synced' : 'No Internet Needed'}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {currentLang === 'en'
                ? 'All bookmarks and core prayer texts are cached in device storage for instant offline access.'
                : 'सर्व जतन केलेले मंत्र, स्तोत्रे व नोंदी मोबाईल/कॉम्प्युटरवर सुरक्षित आहेत.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportBackup}
            disabled={bookmarks.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all disabled:opacity-40"
            title="Download JSON Backup"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{currentLang === 'en' ? 'Backup Vault' : 'बॅकअप डाउनलोड करा'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {filters.map((f) => {
          const isSelected = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <span>{f.label[currentLang]}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isSelected ? 'bg-black/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}>
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBookmarks.map((bookmark) => {
            return (
              <div
                key={`${bookmark.type}_${bookmark.id}`}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-2xl">{getTypeIcon(bookmark.type)}</span>
                    <button
                      onClick={() => handleRemove(bookmark)}
                      className="p-1.5 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title={currentLang === 'en' ? 'Remove from Library' : 'ग्रंथालयातून काढा'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white group-hover:text-amber-600 transition-colors">
                    {bookmark.title[currentLang]}
                  </h3>

                  {bookmark.subtitle && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {bookmark.subtitle[currentLang]}
                    </p>
                  )}

                  {bookmark.deityName && (
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mt-2">
                      🚩 {bookmark.deityName}
                    </span>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-400">
                    {new Date(bookmark.addedAt).toLocaleDateString(currentLang === 'en' ? 'en-IN' : 'mr-IN')}
                  </span>

                  <button
                    onClick={() => onNavigateTab(getTargetTab(bookmark.type))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-amber-800 dark:text-amber-300 font-bold text-xs transition-colors"
                  >
                    <span>{currentLang === 'en' ? 'Open' : 'उघडा'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
          <Heart className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white">
            {currentLang === 'en' ? 'Your Devotional Library is Empty' : 'आपले भक्ती ग्रंथालय अद्याप रिकामे आहे'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-md mx-auto">
            {currentLang === 'en'
              ? 'Click the heart icon on any mantra, chalisa, or temple to save it here for instant 1-click and offline access.'
              : 'कोणत्याही मंत्र, चालीसा, आरती किंवा मंदिरावर दिलेल्या मनाच्या (❤️) चिन्हावर क्लिक करा; ते येथे सुरक्षित साठवले जाईल.'}
          </p>
          <button
            onClick={() => onNavigateTab('mantras')}
            className="mt-5 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
          >
            {currentLang === 'en' ? 'Browse Mantras & Prayers' : 'सिद्ध मंत्र व स्तोत्रे पहा'}
          </button>
        </div>
      )}
    </div>
  );
}


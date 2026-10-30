import { useState, useEffect, useRef, useMemo } from 'react';
import { Language } from '../types';
import { fiftyGodsList } from '../data/fiftyGods';
import { mantrasData } from '../data/mantras';
import { ganeshaMantrasData } from '../data/ganeshaMantras';
import { shivaMantrasData } from '../data/shivaMantras';
import { vitthalMantrasData } from '../data/vitthalMantras';
import { ancientTemplesDatabase } from '../data/ancientTemplesData';
import { festivalPrepDatabase } from '../data/festivalPrepData';
import { pujaChecklistsDatabase } from '../data/pujaChecklistsData';
import { satvikRecipesList } from '../data/satvikRecipesData';
import { temple3DDatabase } from '../data/temple3DData';
import { digitalLibraryDatabase } from '../data/digitalLibraryData';
import { childrenStoriesDatabase } from '../data/childrenStoriesData';
import { deitySymbolismDatabase } from '../data/deitySymbolismData';
import { liveDarshanDatabase } from '../data/liveDarshanData';
import { rashiDatabase } from '../data/rashiGuideData';
import { bhajanDatabase } from '../data/bhajanHubData';
import {
  Search,
  X,
  ChevronRight,
} from 'lucide-react';

interface UniversalGlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onNavigateTab: (tab: string) => void;
  onOpenGodDetail?: (godId: string) => void;
}

interface SearchResultItem {
  id: string;
  category: 'deity' | 'mantra' | 'temple' | 'festival' | 'checklist' | 'recipe' | 'book' | 'story' | 'symbol' | 'live' | 'rashi' | 'bhajan';
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  tab: string;
  godId?: string;
}

export function UniversalGlobalSearch({
  isOpen,
  onClose,
  currentLang,
  onNavigateTab,
  onOpenGodDetail,
}: UniversalGlobalSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Combine all mantras
  const allMantras = useMemo(() => {
    return [
      ...mantrasData,
      ...ganeshaMantrasData,
      ...shivaMantrasData,
      ...vitthalMantrasData,
    ];
  }, []);

  // Compute search results across all datasets
  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const list: SearchResultItem[] = [];

    // 1. Search 50 Deities
    fiftyGodsList.forEach((god) => {
      const nameEn = god.name.en.toLowerCase();
      const nameHi = god.name.hi.toLowerCase();
      const nameMr = god.name.mr.toLowerCase();
      const titleEn = god.title.en.toLowerCase();
      const titleMr = god.title.mr.toLowerCase();

      if (
        nameEn.includes(q) ||
        nameHi.includes(q) ||
        nameMr.includes(q) ||
        titleEn.includes(q) ||
        titleMr.includes(q)
      ) {
        list.push({
          id: `god_${god.id}`,
          category: 'deity',
          title: god.name[currentLang],
          subtitle: god.title[currentLang],
          badge: currentLang === 'en' ? '50 Deities' : '५० देव-देवता',
          icon: '🪷',
          tab: 'god-detail',
          godId: god.id,
        });
      }
    });

    // 2. Search Mantras
    allMantras.forEach((m) => {
      const titleEn = m.title.en.toLowerCase();
      const titleHi = m.title.hi.toLowerCase();
      const titleMr = m.title.mr.toLowerCase();
      const deva = m.devanagari.toLowerCase();
      const roman = m.roman.toLowerCase();

      if (
        titleEn.includes(q) ||
        titleHi.includes(q) ||
        titleMr.includes(q) ||
        deva.includes(q) ||
        roman.includes(q)
      ) {
        list.push({
          id: `mantra_${m.id}`,
          category: 'mantra',
          title: m.title[currentLang],
          subtitle: m.devanagari,
          badge: m.source,
          icon: '📿',
          tab: 'mantras',
        });
      }
    });

    // 3. Search Ancient Temples
    ancientTemplesDatabase.forEach((t) => {
      const nameEn = t.name.en.toLowerCase();
      const nameMr = t.name.mr.toLowerCase();
      const city = t.city.toLowerCase();
      const dist = t.district.toLowerCase();

      if (
        nameEn.includes(q) ||
        nameMr.includes(q) ||
        city.includes(q) ||
        dist.includes(q)
      ) {
        list.push({
          id: `temple_${t.id}`,
          category: 'temple',
          title: t.name[currentLang],
          subtitle: `${t.city}, ${t.district} • ${t.historicalEra}`,
          badge: currentLang === 'en' ? 'Historic Temple' : 'प्राचीन मंदिर',
          icon: '🛕',
          tab: 'nearby-temples',
        });
      }
    });

    // 4. Search Festival Preparation
    festivalPrepDatabase.forEach((f) => {
      const nameEn = f.name.en.toLowerCase();
      const nameMr = f.name.mr.toLowerCase();
      const nameHi = f.name.hi.toLowerCase();

      if (nameEn.includes(q) || nameMr.includes(q) || nameHi.includes(q)) {
        list.push({
          id: `festival_${f.id}`,
          category: 'festival',
          title: f.name[currentLang],
          subtitle: f.tithiAndMonth[currentLang],
          badge: currentLang === 'en' ? 'Festival Prep' : 'सण-उत्सव',
          icon: '✨',
          tab: 'festival-prep',
        });
      }
    });

    // 5. Search Puja Checklists
    pujaChecklistsDatabase.forEach((c) => {
      const titleEn = c.title.en.toLowerCase();
      const titleMr = c.title.mr.toLowerCase();

      if (titleEn.includes(q) || titleMr.includes(q)) {
        list.push({
          id: `checklist_${c.id}`,
          category: 'checklist',
          title: c.title[currentLang],
          subtitle: c.subtitle[currentLang],
          badge: currentLang === 'en' ? 'Puja Samagri' : 'पूजा साहित्य यादी',
          icon: '🛒',
          tab: 'checklist',
        });
      }
    });

    // 6. Search Satvik Recipes
    satvikRecipesList.forEach((r) => {
      const titleEn = r.title.en.toLowerCase();
      const titleMr = r.title.mr.toLowerCase();

      if (titleEn.includes(q) || titleMr.includes(q)) {
        list.push({
          id: `recipe_${r.id}`,
          category: 'recipe',
          title: r.title[currentLang],
          subtitle: r.significance[currentLang],
          badge: currentLang === 'en' ? 'Satvik Prasad' : 'सात्विक नैवेद्य',
          icon: '🍲',
          tab: 'satvik',
        });
      }
    });

    // 7. Search Digital Granthalaya Books
    digitalLibraryDatabase.forEach((b) => {
      const titleEn = b.title.en.toLowerCase();
      const titleMr = b.title.mr.toLowerCase();
      const author = b.author.toLowerCase();
      if (titleEn.includes(q) || titleMr.includes(q) || author.includes(q)) {
        list.push({
          id: `book_${b.id}`,
          category: 'book',
          title: b.title[currentLang] || b.title.mr,
          subtitle: `${b.author} • ${b.subject}`,
          badge: currentLang === 'en' ? 'Granthalaya' : 'धर्मग्रंथ',
          icon: b.iconEmoji,
          tab: 'digital-library',
        });
      }
    });

    // 8. Search 3D Temples
    temple3DDatabase.forEach((t) => {
      const nameEn = t.name.en.toLowerCase();
      const nameMr = t.name.mr.toLowerCase();
      if (nameEn.includes(q) || nameMr.includes(q)) {
        list.push({
          id: `3d_${t.id}`,
          category: 'temple',
          title: t.name[currentLang] || t.name.mr,
          subtitle: `${t.city} • ${t.historicalEra}`,
          badge: currentLang === 'en' ? '3D Sanctum' : '३D मंदिर',
          icon: '🏛️',
          tab: 'temple-3d',
        });
      }
    });

    // 9. Search Children Stories
    childrenStoriesDatabase.forEach((s) => {
      const titleEn = s.title.en.toLowerCase();
      const titleMr = s.title.mr.toLowerCase();
      if (titleEn.includes(q) || titleMr.includes(q)) {
        list.push({
          id: `story_${s.id}`,
          category: 'story',
          title: s.title[currentLang] || s.title.mr,
          subtitle: s.moralLesson[currentLang] || s.moralLesson.mr,
          badge: currentLang === 'en' ? 'Kids Story' : 'बाल संस्कार',
          icon: s.iconEmoji,
          tab: 'stories',
        });
      }
    });

    // 10. Search Deity Symbols & Weapons
    deitySymbolismDatabase.forEach((sym) => {
      const nameEn = sym.name.en.toLowerCase();
      const nameMr = sym.name.mr.toLowerCase();
      if (nameEn.includes(q) || nameMr.includes(q)) {
        list.push({
          id: `sym_${sym.id}`,
          category: 'symbol',
          title: sym.name[currentLang] || sym.name.mr,
          subtitle: sym.deityAssociated[currentLang] || sym.deityAssociated.mr,
          badge: currentLang === 'en' ? 'Divine Symbol' : 'देवता प्रतीक',
          icon: sym.symbolIcon,
          tab: 'symbolism',
        });
      }
    });

    // 11. Search Live Darshans
    liveDarshanDatabase.forEach((d) => {
      const nameEn = d.templeName.en.toLowerCase();
      const nameMr = d.templeName.mr.toLowerCase();
      if (nameEn.includes(q) || nameMr.includes(q)) {
        list.push({
          id: `live_${d.id}`,
          category: 'live',
          title: d.templeName[currentLang] || d.templeName.mr,
          subtitle: d.location,
          badge: currentLang === 'en' ? 'Live Stream' : 'थेट दर्शन',
          icon: '🔴',
          tab: 'live-darshan',
        });
      }
    });

    // 12. Search Janma Rashis
    rashiDatabase.forEach((r) => {
      const nameEn = r.name.en.toLowerCase();
      const nameMr = r.name.mr.toLowerCase();
      const initials = r.nameInitials.toLowerCase();
      if (nameEn.includes(q) || nameMr.includes(q) || initials.includes(q)) {
        list.push({
          id: `rashi_${r.id}`,
          category: 'rashi',
          title: r.name[currentLang] || r.name.mr,
          subtitle: `इष्टदेव: ${r.ishtaDevata[currentLang] || r.ishtaDevata.mr} • ${r.rulingPlanet[currentLang] || r.rulingPlanet.mr}`,
          badge: currentLang === 'en' ? 'Vedic Rashi' : 'जन्मरास',
          icon: r.symbolIcon,
          tab: 'rashi',
        });
      }
    });

    // 13. Search Bhajans & Bhupali
    bhajanDatabase.forEach((b) => {
      const titleEn = b.title.en.toLowerCase();
      const titleMr = b.title.mr.toLowerCase();
      const author = b.saintAuthor.toLowerCase();
      if (titleEn.includes(q) || titleMr.includes(q) || author.includes(q)) {
        list.push({
          id: `bhajan_${b.id}`,
          category: 'bhajan',
          title: b.title[currentLang] || b.title.mr,
          subtitle: `${b.saintAuthor} • ${b.categoryLabel[currentLang] || b.categoryLabel.mr}`,
          badge: currentLang === 'en' ? 'Sant Bhajan' : 'भजन/अभंग',
          icon: b.iconEmoji,
          tab: 'bhajan',
        });
      }
    });

    return list.slice(0, 35); // Top 35 results
  }, [query, allMantras, currentLang]);

  if (!isOpen) return null;

  const handleSelectItem = (item: SearchResultItem) => {
    onClose();
    if (item.category === 'deity' && item.godId && onOpenGodDetail) {
      onOpenGodDetail(item.godId);
    } else {
      onNavigateTab(item.tab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-[#181512] rounded-3xl border border-stone-200 dark:border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              currentLang === 'en'
                ? 'Search deities, mantras, temples, festivals, recipes...'
                : 'देवता, मंत्र, स्तोत्र, मंदिरे, सण किंवा पूजा साहित्य शोधा...'
            }
            className="w-full bg-transparent text-base sm:text-lg font-serifDev text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[11px] font-mono text-stone-500 border border-stone-300 dark:border-stone-700">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1 divide-y divide-stone-100 dark:divide-stone-800/60">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-stone-500 dark:text-stone-400">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="font-serifDev text-sm font-semibold text-stone-800 dark:text-stone-200">
                {currentLang === 'en'
                  ? 'Type to search across everything in MantraSetu'
                  : 'मंत्रसेतूमधील सर्व ५० देवता, मंत्र, मंदिरे व सण शोधण्यासाठी टाईप करा'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                {['गणेश', 'महामृत्युंजय', 'पंढरपूर', 'त्र्यंबकेश्वर', 'सत्यनारायण पूजा', 'मोदक', 'एकादशी'].map(
                  (tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between gap-3 hover:bg-amber-500/10 dark:hover:bg-amber-950/40 group pt-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base font-serifDev text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 truncate">
                        {item.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-stone-500 dark:text-stone-400">
              <span className="text-3xl block mb-2">🍃</span>
              <p className="text-sm font-semibold">
                {currentLang === 'en'
                  ? `No matching results found for "${query}"`
                  : `"${query}" साठी कोणतेही निकाल सापडले नाहीत`}
              </p>
              <p className="text-xs mt-1">
                {currentLang === 'en'
                  ? 'Try searching with English, Hindi, or Marathi names'
                  : 'मराठी, हिंदी किंवा इंग्रजीमध्ये नाव बदलून शोधून पहा'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


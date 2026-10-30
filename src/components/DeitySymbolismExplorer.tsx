import { useState } from 'react';
import { Language } from '../types';
import {
  deitySymbolismDatabase,
  SymbolismItem,
} from '../data/deitySymbolismData';
import { audioEngine } from '../utils/audioSynth';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Search,
  Share2,
  Check,
  Shield,
  Layers,
  Info,
} from 'lucide-react';

interface DeitySymbolismExplorerProps {
  currentLang: Language;
}

export function DeitySymbolismExplorer({ currentLang }: DeitySymbolismExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingSanskritId, setPlayingSanskritId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', icon: '✨', label: { mr: 'सर्व प्रतीके', hi: 'सभी प्रतीक', en: 'All Symbols' } },
    { id: 'weapon', icon: '🔱', label: { mr: 'दिव्य आयुधे (Weapons)', hi: 'दिव्य अस्त्र/शस्त्र', en: 'Sacred Weapons' } },
    { id: 'vehicle', icon: '🐂', label: { mr: 'पवित्र वाहने (Vehicles)', hi: 'देव वाहन', en: 'Divine Vahanas' } },
    { id: 'mudra', icon: '✋', label: { mr: 'हस्तमुद्रा (Mudras)', hi: 'हस्त मुद्राएँ', en: 'Sacred Mudras' } },
    { id: 'ornament', icon: '🥁', label: { mr: 'अलंकार व वाद्ये', hi: 'अलंकार एवं वाद्य', en: 'Ornaments & Sound' } },
    { id: 'form', icon: '🔥', label: { mr: 'विशेष स्वरूपे (Forms)', hi: 'विशिष्ट दिव्य रूप', en: 'Divine Forms' } },
  ];

  const filteredItems = deitySymbolismDatabase.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName =
        item.name.mr.toLowerCase().includes(q) ||
        item.name.hi.toLowerCase().includes(q) ||
        item.name.en.toLowerCase().includes(q);
      const matchDeity =
        item.deityAssociated.mr.toLowerCase().includes(q) ||
        item.deityAssociated.en.toLowerCase().includes(q);
      const matchSymbol = item.esotericSymbolism.mr.toLowerCase().includes(q);
      return matchName || matchDeity || matchSymbol;
    }
    return true;
  });

  const handlePlaySanskrit = (id: string, text: string) => {
    if (playingSanskritId === id) {
      audioEngine.stopSpeaking();
      setPlayingSanskritId(null);
      return;
    }
    setPlayingSanskritId(id);
    audioEngine.speakText(text, 'hi-IN', 0.8, () => {
      setPlayingSanskritId(null);
    });
  };

  const handleCopyQuote = (item: SymbolismItem) => {
    const text = `🔱 *${item.name[currentLang] || item.name.mr}*\nदेवता: ${item.deityAssociated[currentLang] || item.deityAssociated.mr}\n\nश्लोक: ${item.scripturalQuote.sanskrit}\nअर्थ: ${item.scripturalQuote.meaning[currentLang] || item.scripturalQuote.meaning.mr}\n\nगूढ अर्थ: ${item.esotericSymbolism[currentLang] || item.esotericSymbolism.mr}\n\nमंत्रसेतू देवप्रतीक रहस्य:\nhttps://mantrasetu.in`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareItem = (item: SymbolismItem) => {
    const text = `🔱 *${item.name[currentLang] || item.name.mr}* चे आध्यात्मिक रहस्य:\n\n${item.esotericSymbolism[currentLang] || item.esotericSymbolism.mr}\n\nमंत्रसेतू: https://mantrasetu.in`;
    if (navigator.share) {
      navigator.share({ title: item.name.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Copied to clipboard!' : 'माहिती क्लिपबोर्डवर कॉपी झाली!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Mystical Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-[#181124] to-stone-950 border border-purple-500/30 p-6 sm:p-10 mb-8 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>
              {currentLang === 'en'
                ? 'Deity Symbolism & Esoteric Iconography'
                : currentLang === 'hi'
                ? 'देवी-देवताओं के आयुध, वाहन एवं मुद्राओं का गूढ़ रहस्य'
                : 'देवतांची दिव्य आयुधे, वाहने, मुद्रा व गूढ प्रतीकशास्त्र'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Divine Symbolism: Weapons, Vahanas & Mudras'
              : currentLang === 'hi'
              ? 'प्रतीक मीमांसा: त्रिशूल, सुदर्शन, नन्दी एवं नटराज'
              : 'प्रतीक मीमांसा: त्रिशूळ, सुदर्शन चक्र, नंदी व नटराज रूप'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-purple-200/80 max-w-3xl leading-relaxed">
            {currentLang === 'en'
              ? 'Hindu iconography is deeply psychological and cosmic. Why does Shiva hold a Trishula? What is the spiritual power behind Vishnu’s Sudarshana Chakra? Why does Nandi stare eternally at the Shivalinga? Uncover the eternal wisdom behind every divine symbol.'
              : currentLang === 'hi'
              ? 'भगवान शिव के त्रिशूल में कौन से तीन गुण समाए हैं? सुदर्शन चक्र हमारे मन के किन विकारों का नाश करता है? अभय मुद्रा का वास्तविक आध्यात्मिक आश्वासन क्या है? जानें सनातन धर्म के हर प्रतीक का वैज्ञानिक एवं आध्यात्मिक रहस्य।'
              : 'महादेवांच्या हातात त्रिशूळ आणि डमरू का असतो? विष्णूंच्या तर्जनीवर फिरणारे सुदर्शन चक्र काय सूचित करते? नंदी महादेवांच्या समोरच का बसलेला असतो? बाप्पाच्या हातात परशू व मोदक का आहेत? प्रत्येक दिव्य प्रतीकामागील गूढ आध्यात्मिक अर्थ जाणून घ्या.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1a1510] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 sm:p-6 mb-8 shadow-md">
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === 'en'
                ? 'Search symbol, weapon, vehicle, or deity (e.g. Trishula, Nandi, Sudarshana, Abhaya)...'
                : currentLang === 'hi'
                ? 'प्रतीक, अस्त्र, वाहन या देवता खोजें (उदा. त्रिशूल, नन्दी, सुदर्शन)...'
                : 'प्रतीक, शस्त्र, वाहन किंवा देवता शोधा (उदा. त्रिशूळ, सुदर्शन, नंदी, डमरू)...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 whitespace-nowrap flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-purple-500" />
            {currentLang === 'en' ? 'Category:' : 'श्रेणी:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label[currentLang] || cat.label.mr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Symbolism Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredItems.map((item) => {
          const isPlaying = playingSanskritId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#16130f] rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-stone-800/80 hover:border-purple-400 dark:hover:border-purple-800/70 p-3.5 sm:p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 group-hover:scale-110 transition-transform">
                      {item.symbolIcon}
                    </span>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                        {item.category.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serifDev mt-1">
                        {item.name[currentLang] || item.name.mr}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                        {item.deityAssociated[currentLang] || item.deityAssociated.mr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyQuote(item)}
                      className="p-2 rounded-xl text-stone-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                      title="Copy Sanskrit quote and meaning"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Check className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShareItem(item)}
                      className="p-2 rounded-xl text-stone-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                      title="Share spiritual insight"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Literal Meaning Card */}
                <div className="text-xs text-stone-600 dark:text-stone-400 mb-3 bg-stone-50 dark:bg-stone-900/60 p-3 rounded-xl border border-stone-100 dark:border-stone-800">
                  <strong className="text-stone-700 dark:text-stone-300 block mb-0.5 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-stone-400" />
                    {currentLang === 'en' ? 'Physical Form:' : 'भौतिक स्वरूप:'}
                  </strong>
                  <p>{item.literalMeaning[currentLang] || item.literalMeaning.mr}</p>
                </div>

                {/* Esoteric Mystical Symbolism */}
                <div className="rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 p-4 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 flex items-center gap-1 mb-1">
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    {currentLang === 'en' ? 'Inner Spiritual Secret:' : 'गूढ आध्यात्मिक अर्थ:'}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-serifDev leading-relaxed">
                    {item.esotericSymbolism[currentLang] || item.esotericSymbolism.mr}
                  </p>
                </div>
              </div>

              {/* Bottom Scriptural Quote */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                    {currentLang === 'en' ? 'Scriptural Sanskrit Proof' : 'प्रमाण संस्कृत श्लोक'}
                  </span>

                  <button
                    onClick={() => handlePlaySanskrit(item.id, item.scripturalQuote.sanskrit)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isPlaying
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 hover:bg-purple-200'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX className="w-3 h-3" />
                        <span>थांबवा</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>ऐका</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-serifDev font-bold text-stone-900 dark:text-purple-100 italic">
                  "{item.scripturalQuote.sanskrit}"
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  {item.scripturalQuote.meaning[currentLang] || item.scripturalQuote.meaning.mr}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

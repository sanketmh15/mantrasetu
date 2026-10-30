import { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  pujaChecklistsDatabase,
  PujaChecklist,
  ChecklistItem,
} from '../data/pujaChecklistsData';
import {
  ShoppingBag,
  CheckCircle2,
  Circle,
  Plus,
  Share2,
  Copy,
  Check,
  Printer,
  Info,
  Trash2,
} from 'lucide-react';

interface PujaShoppingChecklistProps {
  currentLang: Language;
}

export function PujaShoppingChecklist({ currentLang }: PujaShoppingChecklistProps) {
  const [selectedListId, setSelectedListId] = useState<string>('satyanarayan');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mantrasetu_puja_checklist_checked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customItems, setCustomItems] = useState<{ id: string; name: string; quantity: string }[]>(() => {
    try {
      const saved = localStorage.getItem('mantrasetu_puja_checklist_custom');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQty, setNewItemQty] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync checked items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mantrasetu_puja_checklist_checked', JSON.stringify(checkedItems));
    } catch {
      // quota fallback
    }
  }, [checkedItems]);

  // Sync custom items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mantrasetu_puja_checklist_custom', JSON.stringify(customItems));
    } catch {
      // quota fallback
    }
  }, [customItems]);

  const activeChecklist: PujaChecklist =
    pujaChecklistsDatabase.find((c) => c.id === selectedListId) || pujaChecklistsDatabase[0];

  const handleToggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const item = {
      id: `custom_${Date.now()}`,
      name: newItemName.trim(),
      quantity: newItemQty.trim() || '१ नग',
    };
    setCustomItems((prev) => [...prev, item]);
    setNewItemName('');
    setNewItemQty('');
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((i) => i.id !== id));
    setCheckedItems((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleResetChecklist = () => {
    if (window.confirm(currentLang === 'en' ? 'Reset all checked items for this list?' : 'सर्व टिक केलेल्या वस्तू पुन्हा अनचेक करायच्या आहेत का?')) {
      const resetMap: Record<string, boolean> = { ...checkedItems };
      activeChecklist.items.forEach((item) => {
        delete resetMap[item.id];
      });
      customItems.forEach((c) => {
        delete resetMap[c.id];
      });
      setCheckedItems(resetMap);
    }
  };

  // Filter items by category
  const filteredStandardItems = activeChecklist.items.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'essential') return item.essential;
    return item.category === selectedCategory;
  });

  const totalItemsCount = activeChecklist.items.length + customItems.length;
  const checkedItemsCount = [...activeChecklist.items, ...customItems].filter((i) => checkedItems[i.id]).length;
  const progressPercent = totalItemsCount > 0 ? Math.round((checkedItemsCount / totalItemsCount) * 100) : 0;

  // Format text for WhatsApp / Copy
  const generateListText = () => {
    let text = `🛒 *${activeChecklist.title[currentLang]}* 🛒\n`;
    text += `🚩 आराध्य: ${activeChecklist.deityAssociated}\n`;
    text += `📅 तारीख: ${new Date().toLocaleDateString('mr-IN')}\n\n`;
    text += `*साहित्य यादी:*\n`;

    activeChecklist.items.forEach((item) => {
      const isDone = checkedItems[item.id];
      text += `${isDone ? '✅' : '⬜'} ${item.name[currentLang]} (${item.quantity})\n`;
    });

    if (customItems.length > 0) {
      text += `\n*अतिरिक्त साहित्य:*\n`;
      customItems.forEach((c) => {
        const isDone = checkedItems[c.id];
        text += `${isDone ? '✅' : '⬜'} ${c.name} (${c.quantity})\n`;
      });
    }

    text += `\n🙏 *सनातन अमृतधारा (Sanatan Amrutdhara) पूजा साहित्य सहाय्यक* https://sanketmh15.github.io/mantrasetu/`;
    return text;
  };

  const handleShareWhatsApp = () => {
    const text = generateListText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateListText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const categories = [
    { id: 'all', label: { en: 'All Items', hi: 'सभी सामग्री', mr: 'सर्व साहित्य' } },
    { id: 'essential', label: { en: 'Essential Only', hi: 'अनिवार्य', mr: 'अति आवश्यक' } },
    { id: 'samagri', label: { en: 'Pooja Dravya', hi: 'पूजा द्रव्य', mr: 'हळद-कुंकू व द्रव्ये' } },
    { id: 'patra_phool', label: { en: 'Leaves & Flowers', hi: 'पत्र-पुष्प', mr: 'पाने व फुले' } },
    { id: 'naivedya', label: { en: 'Offerings & Prasad', hi: 'नैवेद्य', mr: 'नैवेद्य व प्रसाद' } },
    { id: 'vastr', label: { en: 'Cloth & Janve', hi: 'वस्त्र व जनेऊ', mr: 'वस्त्र व जानवे' } },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <ShoppingBag className="w-4 h-4 text-amber-600" />
          <span>
            {currentLang === 'en'
              ? 'Pooja Shopping Checklist & Grocer Sharing'
              : 'पूजा साहित्य खरेदी यादी व व्हॉट्सॲप शेअर'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Interactive Puja Shopping Checklist'
            : currentLang === 'hi'
            ? 'पूजा सामग्री खरीदारी सूची'
            : 'शास्त्रोक्त पूजा साहित्य खरेदी यादी'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Pre-built, authentic checklists for Satyanarayan, Ganesh Chaturthi, Rudrabhishek, and Daily Worship with 1-click WhatsApp sharing for your local grocer.'
            : 'सत्यनारायण, गणेश चतुर्थी, रुद्राभिषेक व नित्य देवपूजेचे अचूक साहित्य. दुकानात खरेदी करताना टिक करा आणि १-क्लिकमध्ये व्हॉट्सॲपवर पाठवा.'}
        </p>
      </div>

      {/* 1. Ritual / Puja Selector Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {pujaChecklistsDatabase.map((list) => {
          const isSelected = list.id === selectedListId;
          return (
            <button
              key={list.id}
              onClick={() => setSelectedListId(list.id)}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-500/15 via-saffron-500/10 to-transparent dark:from-amber-950/50 dark:via-stone-900 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
              }`}
            >
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                🚩 {list.deityAssociated}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white font-serifDev line-clamp-1">
                {list.title[currentLang]}
              </h3>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 block font-mono">
                {list.items.length} {currentLang === 'en' ? 'items' : 'वस्तू'} • {list.estimatedCostApprox}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Checklist Header, Progress Bar & Actions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold font-serifDev text-stone-900 dark:text-white">
                {activeChecklist.title[currentLang]}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
              {activeChecklist.subtitle[currentLang]}
            </p>
          </div>

          {/* Action Sharing Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Share to WhatsApp' : 'दुकानदारास पाठवा'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी झाले!' : 'यादी कॉपी'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-all"
              title="Print Checklist"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-stone-700 dark:text-stone-300">
              {currentLang === 'en' ? 'Shopping Progress' : 'खरेदी प्रगती'}:{' '}
              <span className="text-amber-600 dark:text-amber-400 font-mono">
                {checkedItemsCount} / {totalItemsCount} {currentLang === 'en' ? 'collected' : 'वस्तू गोळा झाल्या'}
              </span>
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-amber-600 dark:text-amber-400">{progressPercent}%</span>
              <button
                onClick={handleResetChecklist}
                className="text-[11px] text-stone-400 hover:text-rose-500 underline"
              >
                {currentLang === 'en' ? 'Reset All' : 'सर्व रिसेट'}
              </button>
            </div>
          </div>
          <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label[currentLang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Items Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filteredStandardItems.map((item: ChecklistItem) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleToggleItem(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 opacity-80'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-stone-400 hover:text-emerald-500 transition-colors"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-400" />
                  )}
                </button>
                <div>
                  <span
                    className={`text-sm font-semibold font-serifDev block ${
                      isDone
                        ? 'line-through text-stone-500 dark:text-stone-400'
                        : 'text-stone-900 dark:text-white'
                    }`}
                  >
                    {item.name[currentLang]}
                  </span>
                  {item.essential && (
                    <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                      {currentLang === 'en' ? 'Essential' : 'आवश्यक'}
                    </span>
                  )}
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-stone-700 shrink-0">
                {item.quantity}
              </span>
            </div>
          );
        })}

        {/* Custom Items Added by User */}
        {customItems.map((c) => {
          const isDone = !!checkedItems[c.id];
          return (
            <div
              key={c.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 opacity-80'
                  : 'bg-amber-50/40 dark:bg-stone-900 border-amber-300 dark:border-stone-700'
              }`}
            >
              <div
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => handleToggleItem(c.id)}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-400" />
                )}
                <div>
                  <span
                    className={`text-sm font-semibold font-serifDev block ${
                      isDone
                        ? 'line-through text-stone-500 dark:text-stone-400'
                        : 'text-stone-900 dark:text-white'
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400">
                    {currentLang === 'en' ? 'Custom Item' : 'आपण जोडलेली वस्तू'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-stone-700">
                  {c.quantity}
                </span>
                <button
                  onClick={() => handleRemoveCustomItem(c.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Add Custom Item Form */}
      <form
        onSubmit={handleAddCustomItem}
        className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md mb-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="flex-1 w-full">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={currentLang === 'en' ? 'Add extra item (e.g. Fresh Mangoes, 2 Litres Milk)...' : 'अतिरिक्त वस्तू जोडा (उदा. २ लिटर दूध, १ किलो पेढे)...'}
            className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div className="w-full sm:w-36">
          <input
            type="text"
            value={newItemQty}
            onChange={(e) => setNewItemQty(e.target.value)}
            placeholder={currentLang === 'en' ? 'Quantity (e.g. 2 kg)' : 'प्रमाण (उदा. १ डझन)'}
            className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{currentLang === 'en' ? 'Add Item' : 'यादीत जोडा'}</span>
        </button>
      </form>

      {/* 5. Preparation Tips Box */}
      <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-stone-900 border border-amber-200 dark:border-stone-800">
        <h4 className="font-bold text-sm sm:text-base text-amber-900 dark:text-amber-200 font-serifDev flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-amber-600" />
          <span>{currentLang === 'en' ? 'Essential Preparation Tips' : 'पूजा मांडणी व खरेदी महत्त्वपूर्ण सूचना'}:</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
          {activeChecklist.preparationTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
              <span>{tip[currentLang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


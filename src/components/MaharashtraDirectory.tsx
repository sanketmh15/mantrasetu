import React, { useState } from 'react';
import { Language } from '../types';
import { maharashtraDeityDirectory } from '../data/maharashtraDeities';
import { audioEngine } from '../utils/audioSynth';
import { MapPin, Search, Volume2, Shield, Sparkles, Navigation, ExternalLink, Heart } from 'lucide-react';

interface MaharashtraDirectoryProps {
  currentLang: Language;
}

export const MaharashtraDirectory: React.FC<MaharashtraDirectoryProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showKuldaivatOnly, setShowKuldaivatOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: { en: 'All Traditions', hi: 'सभी परंपराएं', mr: 'सर्व परंपरा' } },
    { id: 'ganesha', label: { en: 'Ashtavinayak & Ganesha', hi: 'अष्टविनायक व गणेश', mr: 'अष्टविनायक व गणेश' } },
    { id: 'vitthal_vishnu', label: { en: 'Vitthal & Warkari', hi: 'विट्ठल व वारकरी', mr: 'विठ्ठल व वारकरी' } },
    { id: 'devi_shakti', label: { en: '3.5 Shaktipeeths & Devi', hi: 'साढ़े तीन शक्तिपीठ व देवी', mr: 'साडेतीन शक्तिपीठे व देवी' } },
    { id: 'khandoba', label: { en: 'Khandoba & Malhari', hi: 'खंडोबा व मल्हारी', mr: 'खंडेराया व मल्हारी' } },
    { id: 'shiva', label: { en: 'Jyotirlingas & Shiva', hi: 'ज्योतिर्लिंग व शिव', mr: 'ज्योतिर्लिंगे व शिव' } },
    { id: 'dattatreya', label: { en: 'Dattatreya & Nath', hi: 'दत्तात्रेय व नाथ', mr: 'दत्तात्रेय व नाथ' } },
    { id: 'saints', label: { en: 'Revered Saints (संत)', hi: 'महाराष्ट्र के पावन संत', mr: 'महाराष्ट्रातील पावन संत' } },
    { id: 'gramdevata', label: { en: 'Gramdevatas (ग्रामदैवत)', hi: 'ग्रामदेवता', mr: 'ग्रामदैवते व स्थानिक देव' } },
  ];

  const regions = ['all', 'Western Maharashtra', 'Marathwada', 'Konkan', 'North Maharashtra', 'Vidarbha'];

  const filteredDeities = maharashtraDeityDirectory.filter((d) => {
    const matchesCat = selectedCategory === 'all' || d.traditionCategory === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || d.region === selectedRegion;
    const matchesKul = !showKuldaivatOnly || d.isKuldaivat;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      d.name.en.toLowerCase().includes(q) ||
      d.name.hi.toLowerCase().includes(q) ||
      d.name.mr.toLowerCase().includes(q) ||
      d.district.toLowerCase().includes(q) ||
      d.primaryShrine.en.toLowerCase().includes(q) ||
      d.primaryShrine.mr.toLowerCase().includes(q);

    return matchesCat && matchesRegion && matchesKul && matchesSearch;
  });

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentLang === 'en' ? 'Phase 3 Milestone Foundation' : 'महाराष्ट्र देवस्थान दर्शन'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white tracking-wide">
          {currentLang === 'en'
            ? 'Maharashtra Deity & Devotional Directory'
            : currentLang === 'hi'
            ? 'महाराष्ट्र देवस्थान एवं कुलदेवता मार्गदर्शिका'
            : 'महाराष्ट्र देवस्थान व कुलदैवत दर्शन'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-2xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'From Pandharpur’s Vitthal and the 3.5 Shaktipeeths, to Ashtavinayak, Jejuri’s Khanderaya, Jyotirlingas, and ancient Gramdevatas.'
            : currentLang === 'hi'
            ? 'पंढरपुर के विट्ठल, साढ़े तीन शक्तिपीठ, अष्टविनायक, जेजुरी के खंडेराया, ज्योतिर्लिंग और पावन ग्रामदेवता।'
            : 'पंढरपूरचा विठूराया, साडेतीन शक्तिपीठे, अष्टविनायक, जेजुरीचे खंडेराया, ज्योतिर्लिंगे आणि पावन ग्रामदैवते.'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl mb-8 space-y-3">
        
        {/* Tradition Categories Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-saffron-600 text-white shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat.label[currentLang]}
            </button>
          ))}
        </div>

        {/* Region & Kuldaivat Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800/80">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-stone-500 mr-1 hidden sm:inline">
              {currentLang === 'en' ? 'Region:' : 'विभाग:'}
            </span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                  selectedRegion === reg
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {reg === 'all' ? (currentLang === 'en' ? 'All Regions' : 'सर्व विभाग') : reg}
              </button>
            ))}
          </div>

          {/* Search & Kuldaivat Toggle */}
          <div className="flex items-center gap-2 flex-grow sm:flex-grow-0 justify-end">
            <button
              onClick={() => setShowKuldaivatOnly(!showKuldaivatOnly)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                showKuldaivatOnly
                  ? 'bg-saffron-950 text-saffron-300 border-saffron-700'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showKuldaivatOnly ? 'text-saffron-400 fill-saffron-400' : ''}`} />
              <span>{currentLang === 'en' ? 'Kuldaivats Only' : currentLang === 'hi' ? 'केवल कुलदेवता' : 'केवळ कुलदैवते'}</span>
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={currentLang === 'en' ? 'Search deity or district...' : 'देवता किंवा जिल्हा शोधा...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-saffron-500 w-36 sm:w-48"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Deities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDeities.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs text-saffron-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.district} ({item.region})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.isKuldaivat && (
                    <span className="text-[10px] font-semibold bg-red-950/80 text-red-300 px-2 py-0.5 rounded-full border border-red-800/60">
                      {currentLang === 'en' ? 'Kuldaivat' : 'कुलदैवत'}
                    </span>
                  )}
                  <span className="text-[10px] bg-stone-950 text-stone-400 px-2 py-0.5 rounded-full border border-stone-800 uppercase tracking-wider">
                    {item.traditionCategory.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Title & Shrine */}
              <h3 className="text-xl font-bold text-white font-serifDev mb-1">
                {item.name[currentLang]}
              </h3>
              <p className="text-xs text-amber-300/90 font-medium mb-3">
                📍 {item.primaryShrine[currentLang]}
              </p>

              {/* Significance */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                {item.significance[currentLang]}
              </p>

              {/* Mantra Box */}
              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-0.5">
                    {currentLang === 'en' ? 'Sacred Japa / Jaighosh:' : 'नामघोष व मंत्र:'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-saffron-300 font-devanagari">
                    {item.traditionalMantra}
                  </p>
                </div>

                <button
                  onClick={() => audioEngine.speakText(item.traditionalMantra, 'hi-IN', 0.9)}
                  className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 transition-colors"
                  title="Listen pronunciation"
                >
                  <Volume2 className="w-4 h-4 text-saffron-400" />
                </button>
              </div>
            </div>

            {/* Bottom Maps Navigation */}
            <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {currentLang === 'en' ? 'Verified Shrine of Maharashtra' : 'महाराष्ट्राचे पावन तीर्थक्षेत्र'}
              </span>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(item.primaryShrine.en + ' ' + item.district + ' Maharashtra')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-all shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-saffron-400" />
                <span>{currentLang === 'en' ? 'Directions' : 'नकाशा'}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {filteredDeities.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <Shield className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No deities found matching your filter criteria</p>
        </div>
      )}

    </div>
  );
};


import React, { useState } from 'react';
import { Language } from '../types';
import { glossaryData } from '../data/glossary';
import { X, HelpCircle } from 'lucide-react';

interface CulturalGlossaryProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const CulturalGlossary: React.FC<CulturalGlossaryProps> = ({ isOpen, onClose, currentLang }) => {
  const [selectedTermId, setSelectedTermId] = useState<string>(glossaryData[0].id);

  if (!isOpen) return null;

  const activeItem = glossaryData.find((g) => g.id === selectedTermId) || glossaryData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#181513] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serifDev">
                {currentLang === 'en' ? 'What is this? Cultural Explainer' : currentLang === 'hi' ? 'यह क्या है? सांस्कृतिक शब्दकोश' : 'हे काय आहे? सांस्कृतिक परिचय'}
              </h3>
              <p className="text-xs text-stone-400">
                {currentLang === 'en' ? 'Clear, dignified explanations for beginners and international seekers' : 'साधकांसाठी व अभ्यासकांसाठी पारंपरिक प्रतीकांचा अर्थ'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* Terms Pills */}
          <div className="flex flex-wrap gap-2">
            {glossaryData.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTermId(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  item.id === selectedTermId
                    ? 'bg-saffron-600 text-white shadow-md'
                    : 'bg-stone-900 text-stone-300 border border-stone-800 hover:text-white'
                }`}
              >
                {item.term[currentLang]}
              </button>
            ))}
          </div>

          {/* Active Term Details Card */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-saffron-300 font-serifDev">
                {activeItem.term[currentLang]}
              </h4>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900 text-stone-400 border border-stone-800">
                {activeItem.category}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                {currentLang === 'en' ? 'What it is:' : 'स्वरूप:'}
              </span>
              <p className="text-sm text-stone-300 leading-relaxed">
                {activeItem.explanation[currentLang]}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                {currentLang === 'en' ? 'Traditional Spiritual Symbolism:' : 'पारंपरिक आध्यात्मिक महत्त्व:'}
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {activeItem.traditionalSignificance[currentLang]}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/40 text-center">
          <p className="text-xs text-stone-500">
            {currentLang === 'en'
              ? 'MantraSetu bridges traditional spiritual philosophy with modern intellectual clarity.'
              : 'मंत्रसेतु — प्राचीन भारतीय तत्त्वज्ञान आणि आधुनिक विचारसरणीचा सेतू.'}
          </p>
        </div>

      </div>
    </div>
  );
};


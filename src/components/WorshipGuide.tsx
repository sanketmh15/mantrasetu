import React, { useState } from 'react';
import { Language } from '../types';
import { worshipGuideData } from '../data/worshipGuide';
import { hanumanData } from '../data/hanuman';
import { Sparkles, ShieldAlert, Calendar, Flame, Layers } from 'lucide-react';
import { DailyPujaGuide } from './DailyPujaGuide';

interface WorshipGuideProps {
  currentLang: Language;
  onNavigateTab?: (tab: string) => void;
  onSelectDeity?: (deityId: string) => void;
}

export const WorshipGuide: React.FC<WorshipGuideProps> = ({
  currentLang,
  onNavigateTab,
  onSelectDeity,
}) => {
  const [activeTab, setActiveTab] = useState<'day-wise' | 'daily' | 'tuesday' | 'saturday' | 'offerings'>('day-wise');

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
          {currentLang === 'en' ? 'Authentic Daily Practice & Puja Guide' : currentLang === 'hi' ? 'नित्य देव उपासना एवं पूजा विधान' : 'नित्य देव उपासना व पूजा विधी'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white mt-1">
          {currentLang === 'en' ? 'Sacred Hindu Worship & Day-Wise Puja Guide' : currentLang === 'hi' ? 'वारानुसार देव-देवता एवं दैनिक पूजा मार्गदर्शिका' : 'वारानुसार देव-देवता व दैनिक पूजा मार्गदर्शिका'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Explore authentic day-wise deities, planetary energies, sacred offerings, and simple 7-step worship rituals free from superstition.'
            : currentLang === 'hi'
            ? 'वारानुसार नवग्रह एवं देवी-देवता पूजा, शुभ रंग, विशिष्ट नैवेद्य तथा ७-चरणीय सरल एवं सात्त्विक पूजा पद्धति।'
            : 'आठवड्यातील ७ वारांनुसार विशिष्ट देवता, नवग्रह प्रभाव, शुभ रंग, नैवेद्य आणि सात्त्विक पूजा विधींचे सविस्तर मार्गदर्शन.'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('day-wise')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'day-wise'
              ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-lg shadow-saffron-950 ring-2 ring-amber-400/40'
              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>{currentLang === 'en' ? 'All 7 Days Schedule' : currentLang === 'hi' ? 'वारानुसार ७ दिवस पूजा' : 'वारानुसार ७ दिवस पूजा'}</span>
        </button>

        <button
          onClick={() => setActiveTab('daily')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'daily'
              ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-950'
              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{currentLang === 'en' ? '7-Step Daily Vidhi' : currentLang === 'hi' ? '७-चरणीय दैनिक विधि' : '७-टप्प्यांची नित्य पूजा'}</span>
        </button>

        <button
          onClick={() => setActiveTab('tuesday')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'tuesday'
              ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-950'
              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-red-400" />
          <span>{currentLang === 'en' ? 'Tuesday Worship' : currentLang === 'hi' ? 'मंगलवार साधना' : 'मंगळवार उपासना'}</span>
        </button>

        <button
          onClick={() => setActiveTab('saturday')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'saturday'
              ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-950'
              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>{currentLang === 'en' ? 'Saturday Worship' : currentLang === 'hi' ? 'शनिवार साधना' : 'शनिवार उपासना'}</span>
        </button>

        <button
          onClick={() => setActiveTab('offerings')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'offerings'
              ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-950'
              : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-saffron-400" />
          <span>{currentLang === 'en' ? 'Traditional Offerings' : currentLang === 'hi' ? 'नैवेद्य व सामग्री' : 'नैवेद्य व साहित्य'}</span>
        </button>
      </div>

      {/* Tab 0: Comprehensive Hindu Day-Wise 7 Days Schedule */}
      {activeTab === 'day-wise' && (
        <DailyPujaGuide
          currentLang={currentLang}
          onNavigateTab={onNavigateTab}
          onSelectDeity={onSelectDeity}
        />
      )}

      {/* Tab 1: 7-Step Daily Vidhi */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {worshipGuideData.dailySteps.map((s) => (
            <div key={s.step} className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-saffron-950 text-saffron-400 border border-saffron-800/60 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-stone-100 text-sm sm:text-base font-serifDev">
                    {s.title[currentLang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                    {s.action[currentLang]}
                  </p>
                  <p className="text-xs text-stone-500 mt-2 italic bg-stone-950/40 p-2 rounded-lg border border-stone-800/40">
                    💡 {s.scripturalContext[currentLang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Tuesday Worship */}
      {activeTab === 'tuesday' && (
        <div className="p-6 rounded-3xl bg-stone-900/70 border border-stone-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serifDev">
                {currentLang === 'en' ? 'Tuesday (Mangalwar) Sacred Observance' : currentLang === 'hi' ? 'मंगलवार व्रत एवं पूजा महत्त्व' : 'मंगळवार उपासना महत्त्व'}
              </h3>
              <p className="text-xs text-stone-400">
                {currentLang === 'en' ? 'Associated with vital energy, courage, and overcoming mental fatigue' : currentLang === 'hi' ? 'ओज, तेज और आत्मबल की जागृति' : 'ऊर्जा, उत्साह आणि मनोधैर्य वाढवणारा दिवस'}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {hanumanData.tuesdaySignificance[currentLang]}
          </p>
          <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs sm:text-sm text-stone-300">
            <p className="font-semibold text-saffron-400">
              {currentLang === 'en' ? 'Tuesday Devotional Routine:' : 'मंगळवारची पारंपरिक दिनचर्या:'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-400">
              <li>{currentLang === 'en' ? 'Light a sesame oil or ghee diya in the evening.' : 'संध्याकाळी तिळाच्या तेलाचा किंवा तुपाचा दिवा लावावा.'}</li>
              <li>{currentLang === 'en' ? 'Recite Hanuman Chalisa 3 or 7 times peacefully.' : 'शांतपणे ३ किंवा ७ वेळा हनुमान चालीसेचे पठण करावे.'}</li>
              <li>{currentLang === 'en' ? 'Offer jaggery and roasted chickpeas (Gud-Chana).' : 'गूळ-फुटाण्यांचा सात्त्विक नैवेद्य दाखवावा.'}</li>
              <li>{currentLang === 'en' ? 'Practice truthfulness, humility, and control over angry speech.' : 'राग, कटू शब्द टाळून वाणीत नम्रता आणि संयम ठेवावा.'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Saturday Worship */}
      {activeTab === 'saturday' && (
        <div className="p-6 rounded-3xl bg-stone-900/70 border border-stone-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serifDev">
                {currentLang === 'en' ? 'Saturday (Shaniwar) Sacred Observance' : currentLang === 'hi' ? 'शनिवार उपासना महत्त्व' : 'शनिवार उपासना महत्त्व'}
              </h3>
              <p className="text-xs text-stone-400">
                {currentLang === 'en' ? 'Seeking patience, endurance, and alleviation of hardships' : currentLang === 'hi' ? 'धैर्य, संयम और कष्ट निवारण' : 'धैर्य, संयम आणि संकटनिवारण'}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {hanumanData.saturdaySignificance[currentLang]}
          </p>
          <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs sm:text-sm text-stone-300">
            <p className="font-semibold text-saffron-400">
              {currentLang === 'en' ? 'Saturday Devotional Routine:' : 'शनिवारची पारंपरिक दिनचर्या:'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-400">
              <li>{currentLang === 'en' ? 'Offer mustard or sesame oil with a single black urad dal or betel leaf.' : 'तिळाचे तेल किंवा मोहरीचे तेल मारुतीरायांच्या चरणी अर्पण करावे.'}</li>
              <li>{currentLang === 'en' ? 'Chant "Om Hanumate Namah" 108 times using the digital mala.' : '"ॐ हनुमते नमः" चा १०८ वेळा शांत चित्ताने जप करावा.'}</li>
              <li>{currentLang === 'en' ? 'Feed grains to birds or help a person in physical hardship.' : 'पक्षांना दाणे किंवा गरजू व्यक्तीला यथाशक्ती मदत करावी.'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 4: Traditional Offerings */}
      {activeTab === 'offerings' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {worshipGuideData.offerings.map((offering, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base font-serifDev mb-1 text-saffron-300">
                  {offering.name[currentLang]}
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed mt-2">
                  {offering.purpose[currentLang]}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
                <span className="font-semibold text-stone-300 block mb-0.5">Simple Alternative:</span>
                <p>{offering.alternative[currentLang]}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Non-Superstition Ethical Manifesto Box */}
      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 text-stone-300">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>{currentLang === 'en' ? 'Authentic Faith vs Commercial Superstition' : currentLang === 'hi' ? 'प्रामाणिक श्रद्धा एवं अंधविश्वास मुक्ति' : 'खरा भाव आणि अंधश्रद्धेपासून मुक्ती'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-400">
          {worshipGuideData.principles.map((p, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
              <p className="font-semibold text-stone-200 mb-1">{p.title[currentLang]}</p>
              <p className="leading-relaxed">{p.description[currentLang]}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


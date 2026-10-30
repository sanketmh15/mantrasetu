import React, { useState } from 'react';
import { Language } from '../types';
import { ganeshaData } from '../data/ganesha';
import { Calendar, Compass, BookOpen, ChevronDown, ChevronUp, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

interface GaneshaHeroProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
}

export const GaneshaHero: React.FC<GaneshaHeroProps> = ({ currentLang, onNavigate }) => {
  const [showAllNames, setShowAllNames] = useState(false);

  // Check current day of week (Wednesday is Budhwar, sacred day of Ganesha)
  const todayIndex = new Date().getDay(); // 3 = Wednesday
  const isWednesday = todayIndex === 3;

  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-stone-800">
      {/* Background ambient warm gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-600/20 via-saffron-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Day Significance Notification Banner */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-amber-950/80 to-stone-900 border border-amber-700/50 text-amber-300 shadow-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>
              {isWednesday
                ? (currentLang === 'en' ? 'Today is Wednesday (Budhwar): Sacred day of Ganesha worship' : currentLang === 'hi' ? 'आज बुधवार है: श्री गणेश जी की उपासना का पावन दिवस' : 'आज बुधवार आहे: श्री गणरायांच्या पूजेचा विशेष दिवस')
                : (currentLang === 'en' ? 'Prathama Pujya: Begin every auspicious endeavor with Ganesha' : currentLang === 'hi' ? 'प्रथम पूज्य: प्रत्येक शुभ कार्य का शुभारम्भ गणेश स्मरण से' : 'प्रथम पूज्य: प्रत्येक शुभकार्याची सुरुवात श्रीगणेश स्मरणाने')}
            </span>
          </div>
        </div>

        {/* Deity Hero Title & Sacred Darshan */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Sacred Murti Darshan of Lord Ganesha */}
          <div className="flex justify-center mb-5">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-stone-900 flex flex-col items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Ganapati1.jpg"
                  alt="Lord Ganesha - Riddhi Siddhi Ganapati"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Shree_Siddhivinayak_Temple_Mumbai.jpg/960px-Shree_Siddhivinayak_Temple_Mumbai.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-[11px] font-bold text-amber-200 backdrop-blur-sm shadow-md font-serifDev">
                    ॥ ॐ गं गणपतये नमः ॥
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serifDev text-white tracking-wide">
            {ganeshaData.name[currentLang]}
          </h1>
          <p className="mt-3 text-base sm:text-xl text-amber-300/90 font-medium font-devanagari">
            {ganeshaData.title[currentLang]}
          </p>
          <p className="mt-2 text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto">
            {ganeshaData.tagline[currentLang]}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('ashtavinayak')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-950/50 transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>
                {currentLang === 'en' ? 'Ashtavinayak Circuit' : currentLang === 'hi' ? 'अष्टविनायक यात्रा' : 'अष्टविनायक यात्रा दर्शन'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('japa')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-sm sm:text-base border border-amber-600/40 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>
                {currentLang === 'en' ? '108 Ganesha Japa' : currentLang === 'hi' ? '१०८ गणेश जप' : '१०८ गणेश नामस्मरण'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('mantras')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-stone-300 font-medium text-sm border border-stone-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-stone-400" />
              <span>
                {currentLang === 'en' ? 'Atharvashirsha & Mantras' : currentLang === 'hi' ? 'अथर्वशीर्ष व मन्त्र' : 'अथर्वशीर्ष व मंत्र'}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Vighnaharta (Obstacle Remover)' : 'विघ्नहर्ता'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Ganesha dissolves both inner obstacles (doubt, anger, lethargy) and outer impediments, clearing the path to righteous fulfillment.'
                : 'चित्त के संशय, क्रोध और बाह्य विघ्नों का समूल निवारण कर बुद्धि को सन्मार्ग की दिशा देने वाले भगवान।'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-saffron-950 text-saffron-400 border border-saffron-800/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Buddhi & Siddhi' : 'बुद्धि व सिद्धि'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Accompanied by Buddhi (discriminative intellect) and Siddhi (perfection of capability). He represents deep focus and learning.'
                : 'बुद्धि और सिद्धि के स्वामी। वे गहन श्रवण, एकाग्रता और विवेकपूर्ण निर्णय क्षमता के अधिष्ठाता हैं।'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Swayambhu Ashtavinayak' : 'स्वयंभू अष्टविनायक'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Maharashtra’s 8 holy shrines blessed by ancient sages, Shivaji Maharaj, and the Peshwas, preserving centuries of heritage.'
                : 'महाराष्ट्रातील ८ स्वयंभू देवस्थानांची पावन परंपरा, जी शतकानुशतके भाविकांना प्रेरणा आणि मनःशांती देत आहे.'}
            </p>
          </div>
        </div>

        {/* 12 Sacred Names Drawer */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800/80">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAllNames(!showAllNames)}>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">
                {currentLang === 'en' ? 'The 12 Sacred Names of Lord Ganesha (Sankata Nashana)' : 'श्री गणेश जी के १२ पावन नाम (संकटनाशन)'}
              </h4>
              <p className="text-xs text-stone-400">
                {currentLang === 'en' ? 'Chanted in the morning to dissolve worries and align concentration' : 'संकटमुक्ती आणि एकाग्रतेसाठी नित्य उच्चारली जाणारी १२ पावन नावे'}
              </p>
            </div>
            <button className="text-xs flex items-center gap-1 text-amber-400 font-medium">
              <span>{showAllNames ? (currentLang === 'en' ? 'Collapse' : 'संक्षिप्त') : (currentLang === 'en' ? 'View All' : 'सर्व पहा')}</span>
              {showAllNames ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAllNames && (
            <div className="mt-4 pt-4 border-t border-stone-800/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ganeshaData.names12.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-300 text-sm">{item.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono">{item.roman}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 leading-snug">
                    {item.meaning[currentLang]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};


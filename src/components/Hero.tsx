import React, { useState } from 'react';
import { Language } from '../types';
import { hanumanData } from '../data/hanuman';
import { Sparkles, Calendar, BookOpen, Compass, ChevronDown, ChevronUp, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onNavigate }) => {
  const [showAllNames, setShowAllNames] = useState(false);

  // Check current day of week
  const todayIndex = new Date().getDay(); // 0 = Sun, 2 = Tue, 6 = Sat
  const isTuesday = todayIndex === 2;
  const isSaturday = todayIndex === 6;

  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-stone-800">
      {/* Background ambient spiritual glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-saffron-600/15 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Day Significance Notification Banner */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-saffron-950/80 to-stone-900 border border-saffron-700/50 text-saffron-300 shadow-md">
            <Calendar className="w-4 h-4 text-saffron-400" />
            <span>
              {isTuesday
                ? (currentLang === 'en' ? 'Today is Tuesday: Sacred day of Hanuman worship' : currentLang === 'hi' ? 'आज मंगलवार है: श्री हनुमान जी की उपासना का पावन दिवस' : 'आज मंगळवार आहे: श्री मारुतीरायांच्या पूजेचा विशेष दिवस')
                : isSaturday
                ? (currentLang === 'en' ? 'Today is Saturday: Sacred day of Hanuman worship' : currentLang === 'hi' ? 'आज शनिवार है: श्री हनुमान जी की उपासना का पावन दिवस' : 'आज शनिवार आहे: श्री मारुतीरायांच्या पूजेचा विशेष दिवस')
                : (currentLang === 'en' ? 'Daily Devotion: Remembrance of Lord Rama & Hanuman' : currentLang === 'hi' ? 'नित्य उपासना: श्रीराम व हनुमान जी का पावन स्मरण' : 'नित्य नामस्मरण: श्रीराम व मारुतीरायांचे स्मरण')}
            </span>
          </div>
        </div>

        {/* Deity Hero Title & Sacred Darshan */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Sacred Murti Darshan of Lord Hanuman */}
          <div className="flex justify-center mb-5">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-orange-400/60 shadow-2xl bg-stone-900 flex flex-col items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/01/HANUMAN_LIFTS_HILL.jpg"
                  alt="Lord Hanuman - Sankat Mochan"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/4/46/Hanuman.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-950/90 border border-orange-500/50 text-[11px] font-bold text-orange-200 backdrop-blur-sm shadow-md font-serifDev">
                    ॥ जय श्री राम • जय हनुमान ॥
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serifDev text-white tracking-wide">
            {hanumanData.name[currentLang]}
          </h1>
          <p className="mt-3 text-base sm:text-xl text-saffron-300/90 font-medium font-devanagari">
            {hanumanData.title[currentLang]}
          </p>
          <p className="mt-2 text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto">
            {hanumanData.tagline[currentLang]}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('chalisa')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-saffron-950/50 transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5" />
              <span>
                {currentLang === 'en' ? 'Recite Hanuman Chalisa' : currentLang === 'hi' ? 'हनुमान चालीसा पाठ' : 'हनुमान चालीसा पठण'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('japa')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-sm sm:text-base border border-amber-600/40 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5 text-amber-400" />
              <span>
                {currentLang === 'en' ? '108 Japa Counter' : currentLang === 'hi' ? '१०८ जप माला' : '१०८ जपमाळ'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('worship')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-stone-300 font-medium text-sm border border-stone-800 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-stone-400" />
              <span>
                {currentLang === 'en' ? 'How to Worship' : currentLang === 'hi' ? 'पूजा विधि' : 'पूजा विधी'}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-saffron-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-saffron-950 text-saffron-400 border border-saffron-800/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Nishkama Seva' : currentLang === 'hi' ? 'निष्काम सेवा' : 'निष्काम सेवा'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Infinite power completely free from personal ego. Hanuman teaches that true strength is dedicated to the upliftment of all beings.'
                : currentLang === 'hi'
                ? 'अहंकार से सर्वथा मुक्त अतुलनीय सामर्थ्य। हनुमान जी सिखाते हैं कि सच्चा बल परोपकार और सेवा में ही सार्थक है।'
                : 'अहंकाराचा लवलेश नसलेले अफाट सामर्थ्य. मारुतीराया शिकवतात की खरी ताकद समाजाच्या आणि सत्याच्या सेवेत असते.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-saffron-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Intellect & Grammar' : currentLang === 'hi' ? 'बुद्धिमतां वरिष्ठम्' : 'बुद्धिमंतांत श्रेष्ठ'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Master of nine schools of grammar (Nava-Vyakarana-Pandita). He represents sharp mental focus, eloquence, and calm discernment.'
                : currentLang === 'hi'
                ? 'समस्त वेदों और नौ व्याकरणों के अद्वितीय ज्ञाता। वे शांत बुद्धि, विवेकपूर्ण वाणी और प्रखर एकाग्रता के अधिष्ठाता हैं।'
                : 'नऊ व्याकरण सूत्रांचे गाढे अभ्यासक. ते शांत मन, सुस्पष्ट विचार आणि प्रखर एकाग्रतेचे प्रतीक आहेत.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-saffron-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Authentic Tradition' : currentLang === 'hi' ? 'प्रामाणिक परम्परा' : 'प्रामाणिक परंपरा'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Rooted in Valmiki Ramayana, Ramcharitmanas, and Samarth Ramdas Swami\'s teachings—free from commercial superstitions.'
                : currentLang === 'hi'
                ? 'वाल्मीकि रामायण, श्रीरामचरितमानस और समर्थ परम्परा पर आधारित प्रामाणिक ज्ञान—अंधविश्वास से पूर्णतः मुक्त।'
                : 'वाल्मीकी रामायण, रामचरितमानस आणि समर्थ परंपरेवर आधारलेली अस्सल शिकवण—अंधश्रद्धेला थारा नाही.'}
            </p>
          </div>
        </div>

        {/* 12 Sacred Names Drawer */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800/80">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAllNames(!showAllNames)}>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">
                {currentLang === 'en' ? 'The 12 Sacred Names of Lord Hanuman' : currentLang === 'hi' ? 'श्री हनुमान जी के १२ पावन नाम' : 'श्री मारुतीरायांची १२ पवित्र नावे'}
              </h4>
              <p className="text-xs text-stone-400">
                {currentLang === 'en' ? 'Traditional names recited for courage and clarity before any undertaking' : currentLang === 'hi' ? 'संकल्प और निर्भयता हेतु परम्परागत द्वादश नाम' : 'धैर्य आणि आत्मविश्वासासाठी नित्य उच्चारली जाणारी १२ नावे'}
              </p>
            </div>
            <button className="text-xs flex items-center gap-1 text-saffron-400 font-medium">
              <span>{showAllNames ? (currentLang === 'en' ? 'Collapse' : 'संक्षिप्त') : (currentLang === 'en' ? 'View All' : 'सर्व पहा')}</span>
              {showAllNames ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAllNames && (
            <div className="mt-4 pt-4 border-t border-stone-800/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {hanumanData.names12.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-saffron-300 text-sm">{item.name}</span>
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


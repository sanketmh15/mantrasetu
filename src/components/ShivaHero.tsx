import React, { useState } from 'react';
import { Language } from '../types';
import { shivaData } from '../data/shiva';
import { Calendar, Compass, BookOpen, ChevronDown, ChevronUp, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

interface ShivaHeroProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
}

export const ShivaHero: React.FC<ShivaHeroProps> = ({ currentLang, onNavigate }) => {
  const [showAllJyotirlingas, setShowAllJyotirlingas] = useState(false);

  // Check current day of week (Monday is Somwar, sacred day of Shiva)
  const todayIndex = new Date().getDay(); // 1 = Monday
  const isMonday = todayIndex === 1;

  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-stone-800">
      {/* Background ambient deep indigo/blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/20 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Day Significance Notification Banner */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-950/80 to-stone-900 border border-blue-700/50 text-blue-300 shadow-md">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>
              {isMonday
                ? (currentLang === 'en' ? 'Today is Monday (Somwar): Sacred day of Shiva worship & Bilva offering' : currentLang === 'hi' ? 'आज सोमवार है: भगवान शिव की उपासना एवं जलाभिषेक का पावन दिवस' : 'आज सोमवार आहे: महादेव शंकरांच्या पूजेचा व बेलपत्र अर्पणाचा पावन दिवस')
                : (currentLang === 'en' ? 'Har Har Mahadev: Chanting Maha Mrityunjaya & Om Namah Shivaya' : currentLang === 'hi' ? 'हर हर महादेव: ॐ नमः शिवाय एवं महामृत्युंजय स्मरण' : 'हर हर महादेव: ॐ नमः शिवाय व महामृत्युंजय नामस्मरण')}
            </span>
          </div>
        </div>

        {/* Deity Hero Title & Sacred Darshan */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Sacred Murti Darshan of Lord Shiva */}
          <div className="flex justify-center mb-5">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-blue-400/60 shadow-2xl bg-stone-900 flex flex-col items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Shiva_meditating_Rishikesh.jpg"
                  alt="Lord Shiva Meditating - Har Har Mahadev"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Shiva_Parvati_Ganesha.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950/90 border border-blue-500/50 text-[11px] font-bold text-blue-200 backdrop-blur-sm shadow-md font-serifDev">
                    ॥ ॐ नमः शिवाय ॥
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serifDev text-white tracking-wide">
            {shivaData.name[currentLang]}
          </h1>
          <p className="mt-3 text-base sm:text-xl text-blue-300/90 font-medium font-devanagari">
            {shivaData.title[currentLang]}
          </p>
          <p className="mt-2 text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto">
            {shivaData.tagline[currentLang]}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('jyotirlinga')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-950/50 transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>
                {currentLang === 'en' ? '5 Maharashtra Jyotirlingas' : currentLang === 'hi' ? 'महाराष्ट्र ५ ज्योतिर्लिंग' : 'महाराष्ट्रातील ५ ज्योतिर्लिंगे'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('japa')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-blue-300 font-semibold text-sm sm:text-base border border-blue-600/40 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>
                {currentLang === 'en' ? '108 Maha Mrityunjaya Japa' : currentLang === 'hi' ? '१०८ महामृत्युंजय जप' : '१०८ महामृत्युंजय जप'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('mantras')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-stone-300 font-medium text-sm border border-stone-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-stone-400" />
              <span>
                {currentLang === 'en' ? 'Tandava & Bilvashtakam' : currentLang === 'hi' ? 'शिव तांडव व स्तोत्र' : 'शिव तांडव व बिल्वाष्टक'}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-blue-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Maha Mrityunjaya (Conqueror of Fear)' : 'महामृत्युंजय'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Liberator from physical illness, mental depression, and the dread of mortality through pure awareness.'
                : 'ऋग्वेद का जीवन रक्षक मन्त्र। अकाल मृत्यु, भय और मानसिक संतापों से मुक्ति दिलाने वाले त्र्यम्बक।'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-blue-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/50">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? 'Bholenath (Innocent Grace)' : 'भोलेनाथ'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Pleased by the simplest offerings: a pot of cool water and a single fresh Bilva leaf offered with a sincere heart.'
                : 'केवल निर्मल जल और एक बेलपत्र से भी सहज प्रसन्न होकर समस्त मनोरथ पूर्ण करने वाले दयानिधि।'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-blue-800/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-100 text-sm sm:text-base font-serifDev">
                {currentLang === 'en' ? '5 Maharashtra Jyotirlingas' : 'महाराष्ट्रातील ५ ज्योतिर्लिंगे'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Maharashtra is blessed with nearly half of India\'s 12 Jyotirlingas: Trimbakeshwar, Bhimashankar, Grishneshwar, Aundha, and Parli.'
                : 'भारतातील १२ ज्योतिर्लिंगांपैकी तब्बल ५ पावन ज्योतिर्लिंगे महाराष्ट्राच्या पवित्र भूमीत वास करतात.'}
            </p>
          </div>
        </div>

        {/* 12 Jyotirlingas Drawer */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800/80">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAllJyotirlingas(!showAllJyotirlingas)}>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">
                {currentLang === 'en' ? 'The 12 Sacred Jyotirlingas of India' : 'द्वादश ज्योतिर्लिंग स्तोत्र व दर्शन'}
              </h4>
              <p className="text-xs text-stone-400">
                {currentLang === 'en' ? '5 of India’s 12 Jyotirlingas are consecrated across Maharashtra' : 'भारतातील १२ पैकी ५ ज्योतिर्लिंगे महाराष्ट्रात आहेत'}
              </p>
            </div>
            <button className="text-xs flex items-center gap-1 text-blue-400 font-medium">
              <span>{showAllJyotirlingas ? (currentLang === 'en' ? 'Collapse' : 'संक्षिप्त') : (currentLang === 'en' ? 'View All 12' : 'सर्व १२ पहा')}</span>
              {showAllJyotirlingas ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAllJyotirlingas && (
            <div className="mt-4 pt-4 border-t border-stone-800/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {shivaData.jyotirlingas12.map((item, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border ${
                  item.state === 'Maharashtra'
                    ? 'bg-blue-950/40 border-blue-700/60 ring-1 ring-blue-500/30'
                    : 'bg-stone-900/60 border-stone-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-300 text-sm">{idx + 1}. {item.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      item.state === 'Maharashtra' ? 'bg-blue-900 text-blue-200 font-bold' : 'text-stone-500'
                    }`}>{item.state}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    📍 {item.location}
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

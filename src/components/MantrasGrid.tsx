import React, { useState } from 'react';
import { Language, Mantra } from '../types';
import { mantrasData } from '../data/mantras';
import { audioEngine } from '../utils/audioSynth';
import { getMantraBrahmanAudioUrl } from '../utils/brahmanAudioService';
import { toggleDevotionalBookmark, isBookmarkSaved } from '../utils/storage';
import {
  Volume2,
  Square,
  Compass,
  Heart,
  BookOpen,
  Volume1,
} from 'lucide-react';

interface MantrasGridProps {
  currentLang: Language;
  onOpenJapa: (mantraId: string) => void;
  mantrasList?: Mantra[];
  customTitle?: { en: string; hi: string; mr: string };
}

export const MantrasGrid: React.FC<MantrasGridProps> = ({ currentLang, onOpenJapa, mantrasList, customTitle }) => {
  const [playingMantraId, setPlayingMantraId] = useState<string | null>(null);
  const [isSlowMode, setIsSlowMode] = useState<Record<string, boolean>>({});
  const [expandedBreakdown, setExpandedBreakdown] = useState<Record<string, boolean>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  const list = mantrasList || mantrasData;

  const handlePlay = (mantra: Mantra, slow = false) => {
    if (playingMantraId === mantra.id) {
      audioEngine.stopSpeaking();
      setPlayingMantraId(null);
      return;
    }

    setPlayingMantraId(mantra.id);
    audioEngine.playTempleBell();
    const audioUrl = getMantraBrahmanAudioUrl(mantra.id);
    audioEngine.playBrahmanChant({
      text: mantra.devanagari,
      audioUrl: slow ? undefined : audioUrl, // use speech synthesis for custom slow rate
      lang: currentLang === 'mr' ? 'mr-IN' : 'hi-IN',
      rate: slow ? 0.70 : 0.78,
      withTanpura: true,
      onEnd: () => {
        setPlayingMantraId(null);
      },
    });
  };

  const handleToggleBookmark = (mantra: Mantra) => {
    const isAdded = toggleDevotionalBookmark({
      id: mantra.id,
      type: 'mantra',
      title: mantra.title,
      subtitle: { en: mantra.devanagari, hi: mantra.devanagari, mr: mantra.devanagari },
      deityName: mantra.source,
    });
    setBookmarkedMap((prev) => ({ ...prev, [mantra.id]: isAdded }));
  };

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
          {currentLang === 'en' ? 'Sacred Sound Vibrations & Pronunciation' : currentLang === 'hi' ? 'शुद्ध उच्चारण एवं मन्त्र साधना' : 'शुद्ध उच्चार, सराव व सिद्ध मंत्र'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white mt-1">
          {customTitle ? customTitle[currentLang] : (currentLang === 'en' ? 'Hanuman Mantras, Stotras & Aarti' : currentLang === 'hi' ? 'श्री हनुमान मन्त्र, स्तोत्र एवं आरती' : 'श्री मारुती मंत्र, स्तोत्रे व आरती')}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl mx-auto">
          {currentLang === 'en'
            ? 'Learn authentic Vedic Sanskrit pronunciation with slow-speed practice mode, Roman transliteration, and word-by-word meanings in Marathi, Hindi & English.'
            : 'हळुवार उच्चार सराव, रोमन लिपी, आणि मराठी, हिंदी व इंग्रजी भाषेत ओळनिहाय भावार्थासह सिद्ध मंत्र.'}
        </p>
      </div>

      {/* Grid of Mantras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {list.map((mantra) => {
          const isPlaying = playingMantraId === mantra.id;
          const isSlow = !!isSlowMode[mantra.id];
          const isExpanded = !!expandedBreakdown[mantra.id];
          const isSaved = bookmarkedMap[mantra.id] ?? isBookmarkSaved(mantra.id, 'mantra');

          // Split devanagari words for syllable pronunciation display
          const words = mantra.devanagari.split(' ');

          return (
            <div
              key={mantra.id}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all border flex flex-col justify-between ${
                isPlaying
                  ? 'bg-saffron-950/40 border-saffron-500 shadow-xl shadow-saffron-950/60 ring-1 ring-saffron-500/50'
                  : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div>
                {/* Header Badge & Bookmark Heart */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-saffron-300 bg-saffron-950/80 px-2.5 py-0.5 rounded-full border border-saffron-800/60">
                    {mantra.source}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400 font-mono">
                      {mantra.recommendedRepetitions.join(', ')} {currentLang === 'en' ? 'Reps' : 'जप'}
                    </span>

                    {/* Bookmark Heart Button */}
                    <button
                      onClick={() => handleToggleBookmark(mantra)}
                      className={`p-1.5 rounded-full transition-all ${
                        isSaved
                          ? 'text-rose-500 bg-rose-950/50 hover:bg-rose-900/50'
                          : 'text-stone-400 hover:text-rose-400 hover:bg-stone-800'
                      }`}
                      title={isSaved ? 'Saved in My Library' : 'Save to My Devotional Library'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Mantra Title */}
                <h3 className="text-lg font-bold text-white font-serifDev mb-2">
                  {mantra.title[currentLang]}
                </h3>

                {/* Devanagari Box with Syllable Spacing */}
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 my-3">
                  <p className="text-base sm:text-lg font-bold text-saffron-200 font-devanagari leading-relaxed">
                    {mantra.devanagari}
                  </p>
                  
                  {/* Roman Transliteration with Diacritics */}
                  <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between">
                    <p className="text-xs text-amber-300/90 font-mono italic">
                      {mantra.roman}
                    </p>
                    <span className="text-[10px] text-stone-500 font-sans">
                      [Transliteration]
                    </span>
                  </div>

                  {/* Syllable Breakdown when slow mode is toggled */}
                  {isSlow && (
                    <div className="mt-2.5 pt-2 border-t border-amber-900/40 text-xs text-amber-200 bg-amber-950/30 p-2 rounded-lg">
                      <span className="font-bold text-[10px] uppercase text-amber-400 block mb-1">
                        {currentLang === 'en' ? 'Syllable Pronunciation Guide:' : 'अक्षरशः उच्चार फोड:'}
                      </span>
                      <div className="flex flex-wrap gap-1 font-mono">
                        {words.map((w, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-black/40 border border-amber-500/20">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Meaning in Active Language */}
                <div className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-3">
                  <span className="font-semibold text-stone-400 block mb-0.5 text-[11px] uppercase tracking-wider">
                    {currentLang === 'en' ? 'Meaning:' : currentLang === 'hi' ? 'भावार्थ:' : 'भावार्थ:'}
                  </span>
                  <p>{mantra.meaning[currentLang]}</p>
                </div>

                {/* Word-by-Word & Trilingual Meaning Expansion */}
                {isExpanded && (
                  <div className="mt-3 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-2 animate-fadeIn">
                    <span className="font-bold text-amber-400 text-[11px] block">
                      {currentLang === 'en' ? 'Multilingual Explanations:' : 'त्रिभाषिक सविस्तर अर्थ:'}
                    </span>
                    <div className="space-y-1.5 text-stone-300">
                      <p><strong className="text-amber-300">मराठी:</strong> {mantra.meaning.mr}</p>
                      <p><strong className="text-amber-300">हिन्दी:</strong> {mantra.meaning.hi}</p>
                      <p><strong className="text-amber-300">English:</strong> {mantra.meaning.en}</p>
                    </div>
                  </div>
                )}

                {/* Significance */}
                <div className="mt-3 text-xs text-amber-200/80 bg-amber-950/30 p-2.5 rounded-xl border border-amber-900/30">
                  <span className="font-semibold block mb-0.5 text-amber-400">
                    {currentLang === 'en' ? 'Spiritual Focus:' : 'साधना महत्त्व:'}
                  </span>
                  <p>{mantra.significance[currentLang]}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* Standard Play */}
                  <button
                    onClick={() => handlePlay(mantra, false)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isPlaying && !isSlow
                        ? 'bg-red-950 text-red-200 border border-red-800 hover:bg-red-900'
                        : 'bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white'
                    }`}
                  >
                    {isPlaying && !isSlow ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>{currentLang === 'en' ? 'Stop' : 'थांबवा'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-saffron-400" />
                        <span>{currentLang === 'en' ? 'Normal' : 'उच्चारण'}</span>
                      </>
                    )}
                  </button>

                  {/* Slow Practice Play (0.75x) */}
                  <button
                    onClick={() => {
                      setIsSlowMode((prev) => ({ ...prev, [mantra.id]: !prev[mantra.id] }));
                      handlePlay(mantra, true);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isPlaying && isSlow
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-800/80 text-amber-300 hover:bg-stone-700 border border-amber-500/30'
                    }`}
                    title="0.75x Slow Pronunciation Practice Mode for Beginners"
                  >
                    <Volume1 className="w-3.5 h-3.5" />
                    <span>0.75x {currentLang === 'en' ? 'Slow' : 'सराव'}</span>
                  </button>

                  {/* Word-by-word Toggle */}
                  <button
                    onClick={() => setExpandedBreakdown((prev) => ({ ...prev, [mantra.id]: !prev[mantra.id] }))}
                    className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors"
                    title="Word-by-word multilingual breakdown"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>

                {/* 108 Japa Mode */}
                <button
                  onClick={() => onOpenJapa(mantra.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-saffron-600 hover:bg-saffron-500 text-white shadow-md transition-all ml-auto"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? '108 Japa' : '१०८ जप'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

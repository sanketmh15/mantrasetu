import React, { useState } from 'react';
import { Language } from '../types';
import { hanumanChalisaData } from '../data/chalisa';
import { audioEngine } from '../utils/audioSynth';
import { Play, Pause, Square, Volume2, Search, SlidersHorizontal, BookOpen } from 'lucide-react';

interface ChalisaReaderProps {
  currentLang: Language;
}

export const ChalisaReader: React.FC<ChalisaReaderProps> = ({ currentLang }) => {
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.78);
  const [showRoman, setShowRoman] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Play a single verse
  const handlePlayVerse = (index: number) => {
    const verse = hanumanChalisaData[index];
    if (!verse) return;

    setActiveVerseIndex(index);
    setIsPlaying(true);

    audioEngine.speakText(verse.devanagari, 'hi-IN', playbackSpeed, () => {
      setIsPlaying(false);
      setActiveVerseIndex(null);
    });
  };

  const handleStop = () => {
    audioEngine.stopSpeaking();
    setIsPlaying(false);
    setActiveVerseIndex(null);
  };

  const filteredVerses = hanumanChalisaData.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.devanagari.toLowerCase().includes(q) ||
      v.roman.toLowerCase().includes(q) ||
      v.translation.en.toLowerCase().includes(q) ||
      v.translation.hi.toLowerCase().includes(q) ||
      v.translation.mr.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Title & Description */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
          {currentLang === 'en' ? 'Awadhi Devotional Masterpiece' : currentLang === 'hi' ? 'गोस्वामी तुलसीदास कृत' : 'गोस्वामी तुलसीदास रचित'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold font-serifDev text-white mt-1">
          {currentLang === 'en' ? 'Shri Hanuman Chalisa' : currentLang === 'hi' ? 'श्री हनुमान चालीसा' : 'श्री हनुमान चालीसा'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl mx-auto">
          {currentLang === 'en'
            ? 'Complete 40 Chaupais with Dohas. Authentic line-by-line meanings, Roman phonetics, and clear pronunciation audio.'
            : currentLang === 'hi'
            ? 'दोहा एवं ४० चौपाइयों सहित संपूर्ण पाठ। प्रामाणिक शब्दार्थ, भावार्थ और उच्चारण ध्वनि।'
            : 'दोन दोहे व ४० चौपायांसह संपूर्ण पठण. प्रामाणिक शब्दार्थ, भावार्थ आणि ऑडिओ उच्चार.'}
        </p>
      </div>

      {/* Floating Sticky Audio & Reader Control Bar */}
      <div className="sticky top-20 z-40 p-3 sm:p-4 rounded-2xl bg-[#1a1715]/95 backdrop-blur-md border border-stone-800 shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Audio Controls */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <button
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950 text-red-200 border border-red-800 text-xs font-semibold hover:bg-red-900 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{currentLang === 'en' ? 'Stop' : 'थांबवा'}</span>
              </button>
            ) : (
              <button
                onClick={() => handlePlayVerse(0)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-saffron-600 text-white text-xs font-semibold hover:bg-saffron-500 shadow-md transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentLang === 'en' ? 'Listen from Start' : 'आरंभापासून ऐका'}</span>
              </button>
            )}

            {/* Playback Speed */}
            <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800 text-xs">
              <span className="text-[10px] text-stone-500 px-1 hidden sm:inline">Speed:</span>
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-amber-600 text-white'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Search & Roman Script Toggle */}
          <div className="flex items-center gap-2 flex-grow sm:flex-grow-0 justify-end">
            <button
              onClick={() => setShowRoman(!showRoman)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                showRoman
                  ? 'bg-stone-800 text-saffron-300 border-saffron-800/60'
                  : 'bg-stone-900 text-stone-400 border-stone-800'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{showRoman ? (currentLang === 'en' ? 'Roman: ON' : 'रोमन चालू') : (currentLang === 'en' ? 'Roman: OFF' : 'रोमन बंद')}</span>
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={currentLang === 'en' ? 'Search verse...' : currentLang === 'hi' ? 'खोजें...' : 'शोधा...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-saffron-600 w-32 sm:w-44"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Verses Container */}
      <div className="space-y-4">
        {filteredVerses.map((verse, idx) => {
          const isCurrentActive = activeVerseIndex === idx;
          const isDoha = verse.type === 'doha';

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                isCurrentActive
                  ? 'bg-saffron-950/40 border-saffron-500/80 shadow-lg shadow-saffron-950/50 ring-1 ring-saffron-500/40'
                  : isDoha
                  ? 'bg-amber-950/20 border-amber-900/40 hover:border-amber-700/60'
                  : 'bg-stone-900/50 border-stone-800/80 hover:border-stone-700'
              }`}
            >
              {/* Verse Header Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isDoha
                    ? 'bg-amber-900/40 text-amber-300 border border-amber-700/50'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {isDoha
                    ? (currentLang === 'en' ? 'Doha (Couplet)' : 'दोहा')
                    : (currentLang === 'en' ? `Chaupai ${verse.index}` : `चौपाई ${verse.index}`)}
                </span>

                <button
                  onClick={() => {
                    if (isCurrentActive && isPlaying) {
                      handleStop();
                    } else {
                      handlePlayVerse(idx);
                    }
                  }}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                    isCurrentActive && isPlaying
                      ? 'bg-saffron-600 text-white'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                  title="Listen to this verse"
                >
                  {isCurrentActive && isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-saffron-400" />
                  )}
                  <span className="text-[11px] hidden sm:inline">
                    {isCurrentActive && isPlaying ? 'Playing' : 'Listen'}
                  </span>
                </button>
              </div>

              {/* Devanagari Verse Text */}
              <div className="text-lg sm:text-xl font-bold text-white font-devanagari leading-relaxed tracking-wide">
                {verse.devanagari.split('\n').map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>

              {/* Optional Roman Transliteration for international readers */}
              {showRoman && (
                <div className="mt-2 text-xs sm:text-sm text-saffron-300/80 font-mono leading-relaxed italic">
                  {verse.roman.split('\n').map((line, lIdx) => (
                    <p key={lIdx}>{line}</p>
                  ))}
                </div>
              )}

              {/* Translation in Selected Language */}
              <div className="mt-3 pt-3 border-t border-stone-800/80 text-xs sm:text-sm text-stone-300 leading-relaxed">
                <span className="font-semibold text-stone-400 block mb-0.5 text-[11px] uppercase tracking-wider">
                  {currentLang === 'en' ? 'Meaning:' : currentLang === 'hi' ? 'सरल भावार्थ:' : 'सरल भावार्थ:'}
                </span>
                <p>{verse.translation[currentLang]}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVerses.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No verses found matching "{searchQuery}"</p>
        </div>
      )}

    </div>
  );
};


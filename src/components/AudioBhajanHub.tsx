import { useState, useEffect } from 'react';
import { Language } from '../types';
import { bhajanDatabase, BhajanTrack } from '../data/bhajanHubData';
import { audioEngine } from '../utils/audioSynth';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  Share2,
  Sparkles,
  Layers,
} from 'lucide-react';

interface AudioBhajanHubProps {
  currentLang: Language;
}

export function AudioBhajanHub({ currentLang }: AudioBhajanHubProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('ghanashyama_sundara');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isTanpuraEnabled, setIsTanpuraEnabled] = useState<boolean>(true);

  const activeTrack: BhajanTrack =
    bhajanDatabase.find((b) => b.id === selectedTrackId) || bhajanDatabase[0];

  const categories = [
    { id: 'all', label: { mr: 'सर्व भजने व भूपाळ्या', hi: 'सभी भजन व भूपाळी', en: 'All Tracks' } },
    { id: 'bhupali', label: { mr: '🌅 पहाटेची भूपाळी', hi: '🌅 प्रातः भूपाळी', en: '🌅 Morning Bhupali' } },
    { id: 'abhang', label: { mr: '🪷 संत विठ्ठल अभंग', hi: '🪷 संत अभंग', en: '🪷 Vitthal Abhangas' } },
    { id: 'bhajan', label: { mr: '🌿 दत्त व शिव संकीर्तन', hi: '🌿 दत्त भजन', en: '🌿 Datta & Shiva' } },
  ];

  const filteredTracks = bhajanDatabase.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  // Cleanup audio on unmount or track change
  useEffect(() => {
    return () => {
      audioEngine.stopSpeaking();
      audioEngine.stopTanpura();
    };
  }, []);

  const handleSelectTrack = (trackId: string) => {
    audioEngine.stopSpeaking();
    setIsPlaying(false);
    setSelectedTrackId(trackId);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stopSpeaking();
      if (isTanpuraEnabled) {
        audioEngine.stopTanpura();
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    audioEngine.playTempleBell();

    if (isTanpuraEnabled) {
      audioEngine.startTanpura(136.1);
    }

    // Play lyrics line by line with speech synthesis
    const fullText = activeTrack.lyrics.join(' । ');
    const langCode = 'mr-IN';

    audioEngine.speakText(fullText, langCode, 0.84, () => {
      setIsPlaying(false);
      if (isTanpuraEnabled) {
        audioEngine.stopTanpura();
      }
    });
  };

  const handleToggleTanpura = () => {
    const nextState = !isTanpuraEnabled;
    setIsTanpuraEnabled(nextState);
    if (isPlaying) {
      if (nextState) {
        audioEngine.startTanpura(136.1);
      } else {
        audioEngine.stopTanpura();
      }
    }
  };

  const handleNextTrack = () => {
    const currentIndex = bhajanDatabase.findIndex((t) => t.id === activeTrack.id);
    const nextIndex = (currentIndex + 1) % bhajanDatabase.length;
    handleSelectTrack(bhajanDatabase[nextIndex].id);
  };

  const handleShareBhajan = () => {
    const text = `🎵 *${activeTrack.title[currentLang] || activeTrack.title.mr}*\nरचनाकार: ${activeTrack.saintAuthor}\n\n${activeTrack.lyrics.slice(0, 4).join('\n')}\n\nमंत्रसेतूवर संपूर्ण भजन व भूपाळी ऐका:\nhttps://sanketmh15.github.io/mantrasetu/`;
    if (navigator.share) {
      navigator.share({ title: activeTrack.title.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Bhajan lyrics copied!' : 'भजनाचे बोल क्लिपबोर्डवर कॉपी झाले!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-[#211105] to-stone-950 border border-amber-600/30 p-6 sm:p-10 mb-8 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Music className="w-4 h-4 text-amber-300" />
            <span>
              {currentLang === 'en'
                ? 'Sant Bhajan, Bhupali & Abhang Hub'
                : currentLang === 'hi'
                ? 'संत भजन, भूपाळी एवं अभंग संग्रह'
                : 'संत ज्ञानेश्वर-तुकाराम भजन, अभंग व भूपाळी प्लेअर'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Sacred Marathi Bhupali & Sant Abhang Player'
              : currentLang === 'hi'
              ? 'पहाटेची भूपाळी, विठ्ठल अभंग एवं संत वाणी'
              : 'पहाटेची अमृत भूपाळी, विठ्ठल अभंग व संतवाणी'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-200/80 max-w-3xl leading-relaxed">
            {currentLang === 'en'
              ? 'Immerse in the timeless devotional melodies of Maharashtra. Listen to dawn Bhupalis (Ghanashyama Sundara), immortal Vitthal Abhangas (Roopa Pahata Lochani, Kanada Raja), and divine Datta chants with Tanpura drone.'
              : currentLang === 'hi'
              ? 'प्रभात की पावन भूपाळी, संत तुकाराम व एकनाथ जी के अमर अभंग और तानपुरा नाद के साथ शांत ध्यान का आनंद लें।'
              : 'पहाटेची अमृत भूपाळी “घनश्याम सुंदरा”, संत तुकारामांचे अभंग “रूप पाहता लोचनी”, “कानडा राजा पंढरीचा” आणि “अवघा रंग एक झाला” यांचे सखोल चिंतन, अर्थ व तानपुरा नादासह शांत श्रवण.'}
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-300'
            }`}
          >
            <span>{cat.label[currentLang] || cat.label.mr}</span>
          </button>
        ))}
      </div>

      {/* Main Music Player & Playlist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Playlist (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>
              {currentLang === 'en'
                ? `Devotional Playlist (${filteredTracks.length})`
                : `भक्ती प्लेलिस्ट (${filteredTracks.length})`}
            </span>
          </h2>

          {filteredTracks.map((track) => {
            const isSelected = track.id === activeTrack.id;

            return (
              <div
                key={track.id}
                onClick={() => handleSelectTrack(track.id)}
                className={`cursor-pointer rounded-2xl p-4 transition-all border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-100/90 dark:bg-amber-950/40 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white dark:bg-[#16130f] border-stone-200 dark:border-stone-800 hover:border-amber-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-amber-50 dark:bg-amber-900/30">
                    {track.iconEmoji}
                  </span>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/60 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                      {track.categoryLabel[currentLang] || track.categoryLabel.mr}
                    </span>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-sm mt-1 line-clamp-1">
                      {track.title[currentLang] || track.title.mr}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      {track.saintAuthor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-stone-400">
                    {track.durationEst}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected && isPlaying
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    {isSelected && isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Player & Lyrics Room (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#16130f] rounded-3xl border border-amber-300 dark:border-amber-800/60 p-6 sm:p-8 shadow-2xl sticky top-20">
            {/* Player Header */}
            <div className="border-b border-stone-200 dark:border-stone-800 pb-5 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{activeTrack.iconEmoji}</span>
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      {activeTrack.categoryLabel[currentLang] || activeTrack.categoryLabel.mr}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serifDev mt-2">
                      {activeTrack.title[currentLang] || activeTrack.title.mr}
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
                      {activeTrack.saintAuthor} • {activeTrack.deity[currentLang] || activeTrack.deity.mr}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleShareBhajan}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-500 hover:text-amber-600 transition-all"
                  title="Share Lyrics"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Master Audio Playback Controls */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-stone-900 dark:to-stone-900 border border-amber-200/80 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTogglePlay}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
                      isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>थांबवा</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>भजन सुरू करा</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="p-3 rounded-2xl border border-stone-200 dark:border-stone-700 hover:bg-amber-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                    title="Next Track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.stopSpeaking();
                      setIsPlaying(false);
                      handleTogglePlay();
                    }}
                    className="p-3 rounded-2xl border border-stone-200 dark:border-stone-700 hover:bg-amber-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Tanpura Toggle */}
                <button
                  onClick={handleToggleTanpura}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isTanpuraEnabled
                      ? 'bg-amber-600/10 border-amber-500 text-amber-800 dark:text-amber-300'
                      : 'border-stone-200 dark:border-stone-800 text-stone-400'
                  }`}
                  title="Toggle Tanpura Drone background accompaniment"
                >
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>
                    तानपुरा नाद: {isTanpuraEnabled ? 'चालू' : 'बंद'}
                  </span>
                </button>
              </div>
            </div>

            {/* Lyrics Sheet in Devanagari */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  पवित्र मूळ पद / अभंग रचना:
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    श्रवण चालू आहे...
                  </span>
                )}
              </div>

              <div className="bg-stone-50/70 dark:bg-black/40 rounded-2xl p-6 border border-stone-200 dark:border-stone-800/80 text-center space-y-3">
                {activeTrack.lyrics.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-amber-100 font-serifDev tracking-wide leading-relaxed hover:text-amber-600 transition-colors"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Bhajan Spiritual Meaning */}
            <div className="mt-6 p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-900/60 border border-amber-200/60 dark:border-stone-800">
              <strong className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                {currentLang === 'en' ? 'Spiritual Meaning:' : 'भक्ती भावार्थ व माहात्म्य:'}
              </strong>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serifDev">
                {activeTrack.meaning[currentLang] || activeTrack.meaning.mr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

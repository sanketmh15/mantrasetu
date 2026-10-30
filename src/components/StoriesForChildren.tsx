import { useState } from 'react';
import { Language } from '../types';
import {
  childrenStoriesDatabase,
  ChildStory,
} from '../data/childrenStoriesData';
import { audioEngine } from '../utils/audioSynth';
import {
  Volume2,
  VolumeX,
  Award,
  Heart,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Share2,
  RefreshCw,
  Sun,
  Smile,
} from 'lucide-react';

interface StoriesForChildrenProps {
  currentLang: Language;
}

export function StoriesForChildren({ currentLang }: StoriesForChildrenProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('ganesha_parents_pradakshina');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activityCompleted, setActivityCompleted] = useState<boolean>(false);

  const activeStory: ChildStory =
    childrenStoriesDatabase.find((s) => s.id === selectedStoryId) ||
    childrenStoriesDatabase[0];

  const handleSelectStory = (storyId: string) => {
    audioEngine.stopSpeaking();
    setIsPlayingAudio(false);
    setSelectedStoryId(storyId);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setActivityCompleted(false);
  };

  const handleToggleStoryAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    // Combine story text for narration
    const fullNarration = activeStory.storyParagraphs
      .map((p) => p[currentLang] || p.mr)
      .join(' । ');

    const langCode = currentLang === 'en' ? 'en-US' : currentLang === 'hi' ? 'hi-IN' : 'mr-IN';
    audioEngine.speakText(fullNarration, langCode, 0.88, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleQuizAnswer = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(index);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleShareStory = () => {
    const text = `📖 *${activeStory.title[currentLang] || activeStory.title.mr}*\nदेवता: ${activeStory.deity[currentLang] || activeStory.deity.mr}\n\nसंस्कार बोध: ${activeStory.moralLesson[currentLang] || activeStory.moralLesson.mr}\n\nमुलांसाठी मंत्रसेतू बोधकथा:\nhttps://mantrasetu.in`;
    if (navigator.share) {
      navigator.share({ title: activeStory.title.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Story copied to clipboard!' : 'गोष्ट क्लिपबोर्डवर कॉपी झाली!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Friendly Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-10 mb-8 shadow-xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-3">
            <Smile className="w-4 h-4" />
            <span>
              {currentLang === 'en'
                ? 'Moral Stories for Children'
                : currentLang === 'hi'
                ? 'बच्चों के लिए पौराणिक व संस्कार कथाएँ'
                : 'लहान मुलांसाठी पौराणिक बोधकथा व संस्कार'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Bal Sanskar: Joyful Stories & Values'
              : currentLang === 'hi'
              ? 'बाल संस्कार: रोचक कहानियाँ, ऑडियो एवं प्रश्नमंच'
              : 'बाल संस्कार: सुंदर गोष्टी, श्राव्य ऑडिओ व प्रश्नमंजुषा'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-50 max-w-2xl leading-relaxed">
            {currentLang === 'en'
              ? 'Inspire your children and grandchildren with rich tales of courage, respect for parents, wisdom, and devotion. Complete with interactive quizzes and daily good deeds!'
              : currentLang === 'hi'
              ? 'गणेश जी, बाल हनुमान और भक्त पुंडलिक की प्रेरक कथाएँ। सुंदर चित्रों, दिव्य ऑडियो और मजेदार क्विज के साथ बच्चों में अच्छे संस्कारों का बीजारोपण करें।'
              : 'बाल गणपती, भक्त पुंडलिक आणि बाल मारुती यांच्या रोचक गोष्टी! आई-वडिलांचा आदर, शहाणपण आणि शौर्याचे संस्कार देणाऱ्या गोष्टी, ऑडिओ व मजेदार प्रश्नमंजुषा.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
              ✨ {currentLang === 'en' ? 'Ages 5-14 Years' : '५ ते १४ वयोगटासाठी योग्य'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
              🎧 {currentLang === 'en' ? 'Grandparent Voice Mode' : 'आजी-आजोबांच्या गोष्टींचा गोडवा'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
              🏆 {currentLang === 'en' ? 'Interactive Quiz' : 'बाल प्रश्नमंजुषा व उपक्रम'}
            </span>
          </div>
        </div>
      </div>

      {/* Story Selectors Carousel / Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {childrenStoriesDatabase.map((story) => {
          const isSelected = story.id === activeStory.id;

          return (
            <div
              key={story.id}
              onClick={() => handleSelectStory(story.id)}
              className={`cursor-pointer rounded-2xl p-4 transition-all border flex items-center gap-4 ${
                isSelected
                  ? 'bg-amber-100 dark:bg-amber-950/40 border-amber-500 shadow-md ring-2 ring-amber-400'
                  : 'bg-white dark:bg-[#16130f] border-stone-200 dark:border-stone-800 hover:border-amber-300 shadow-sm'
              }`}
            >
              <span className="text-4xl p-2 rounded-2xl bg-amber-50 dark:bg-amber-900/30">
                {story.iconEmoji}
              </span>
              <div>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  {story.deity[currentLang] || story.deity.mr} • {story.readTime}
                </span>
                <h3 className="font-bold text-stone-900 dark:text-stone-100 font-serifDev text-sm mt-0.5 line-clamp-1">
                  {story.title[currentLang] || story.title.mr}
                </h3>
                <span className="text-[11px] text-stone-500">
                  {story.ageGroup}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Story Reading Room */}
      <div className="bg-white dark:bg-[#16130f] rounded-3xl border border-amber-300 dark:border-amber-800/60 p-6 sm:p-10 shadow-xl mb-8">
        {/* Story Title & Audio Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{activeStory.iconEmoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  {activeStory.deity[currentLang] || activeStory.deity.mr}
                </span>
                <span className="text-xs text-stone-500">
                  ⏱️ {activeStory.readTime} वाचन वेळ
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serifDev mt-1">
                {activeStory.title[currentLang] || activeStory.title.mr}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleStoryAudio}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
                isPlayingAudio
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{currentLang === 'en' ? 'Pause Audio' : 'गोष्ट थांबवा'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{currentLang === 'en' ? 'Listen to Story' : 'गोष्ट ऐका'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareStory}
              className="p-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-600 dark:text-stone-300 hover:text-amber-600 transition-all"
              title="Share this story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {activeStory.storyParagraphs.map((para, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-amber-50/40 dark:bg-stone-900/40 border border-amber-100 dark:border-stone-800/80 hover:border-amber-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-base sm:text-lg text-stone-800 dark:text-stone-200 font-serifDev leading-relaxed">
                  {para[currentLang] || para.mr}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Moral Lesson (संस्कार व बोध) Golden Card */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200/50 dark:from-amber-950/60 dark:via-stone-900 dark:to-amber-900/30 border-2 border-amber-400/80 p-6 sm:p-8 shadow-md">
          <div className="flex items-start gap-4">
            <span className="text-4xl p-2.5 rounded-2xl bg-amber-500 text-white shadow-lg">
              ✨
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {currentLang === 'en' ? 'Moral of the Story' : 'या गोष्टीचा संस्कार व बोध:'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-amber-950 dark:text-amber-100 font-serifDev mt-1">
                {activeStory.moralLesson[currentLang] || activeStory.moralLesson.mr}
              </h3>
            </div>
          </div>
        </div>

        {/* Interactive Children's Quiz (बाल प्रश्नमंजुषा) */}
        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serifDev">
                {currentLang === 'en'
                  ? 'Story Quiz for Kids'
                  : currentLang === 'hi'
                  ? 'बाल प्रश्नमंच: आपने क्या सीखा?'
                  : 'बाल प्रश्नमंजुषा: तुम्हाला गोष्ट समजली का?'}
              </h3>
            </div>
            {quizSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 font-semibold hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {currentLang === 'en' ? 'Try Again' : 'पुन्हा सोडवा'}
              </button>
            )}
          </div>

          <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-800">
            <p className="font-bold text-stone-800 dark:text-stone-200 text-base font-serifDev mb-4">
              ❓ {activeStory.quiz.question[currentLang] || activeStory.quiz.question.mr}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeStory.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizOption === oIdx;
                const isCorrect = oIdx === activeStory.quiz.correctIndex;

                let btnStyle = 'bg-white dark:bg-[#16130f] border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-400';
                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-100 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200';
                  } else {
                    btnStyle = 'opacity-50 border-stone-200 dark:border-stone-800';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={quizSubmitted}
                    onClick={() => handleQuizAnswer(oIdx)}
                    className={`p-4 rounded-xl border text-left font-serifDev font-medium text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt[currentLang] || opt.mr}</span>
                    {quizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {quizSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quiz Result Feedback */}
            {quizSubmitted && (
              <div
                className={`mt-4 p-4 rounded-xl border ${
                  selectedQuizOption === activeStory.quiz.correctIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold font-serifDev">
                  {selectedQuizOption === activeStory.quiz.correctIndex ? (
                    <>
                      <Award className="w-5 h-5 text-emerald-600" />
                      <span>
                        {currentLang === 'en'
                          ? '🎉 Brilliant! Correct Answer!'
                          : '🎉 शाब्बास! तुमचे उत्तर अगदी बरोबर आहे!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 text-amber-600" />
                      <span>
                        {currentLang === 'en'
                          ? 'Almost! Keep learning:'
                          : 'छान प्रयत्न! अचूक स्पष्टीकरण खालीलप्रमाणे आहे:'}
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  {activeStory.quiz.explanation[currentLang] || activeStory.quiz.explanation.mr}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fun Activity / Good Deed Challenge */}
        <div className="mt-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sun className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                {currentLang === 'en' ? 'Today\'s Good Deed Activity' : 'आजचा सुसंस्कार उपक्रम:'}
              </span>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serifDev mt-0.5">
                {activeStory.funActivity[currentLang] || activeStory.funActivity.mr}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivityCompleted((prev) => !prev)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activityCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-stone-800 border border-amber-400 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            {activityCompleted
              ? (currentLang === 'en' ? '✓ Completed Today!' : '✓ आज पूर्ण केले!')
              : (currentLang === 'en' ? 'Mark as Completed' : 'मी आज हे करीन!')}
          </button>
        </div>
      </div>
    </div>
  );
}

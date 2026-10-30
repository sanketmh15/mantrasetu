import { useState } from 'react';
import { Language } from '../types';
import {
  satvikRecipesList,
  fastingRulesDatabase,
  FastingRule,
} from '../data/satvikRecipesData';
import { audioEngine } from '../utils/audioSynth';
import {
  Utensils,
  Sparkles,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
  Heart,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

interface SatvikPrasadFastingGuideProps {
  currentLang: Language;
}

export function SatvikPrasadFastingGuide({ currentLang }: SatvikPrasadFastingGuideProps) {
  const [activeTab, setActiveTab] = useState<'recipes' | 'rules'>('recipes');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('ukadiche-modak');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const selectedRecipe =
    satvikRecipesList.find((r) => r.id === selectedRecipeId) || satvikRecipesList[0];

  const handleSpeakRecipe = () => {
    if (isSpeaking) {
      audioEngine.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const stepsText = selectedRecipe.steps
      .map((s, idx) => `पायरी ${idx + 1}: ${s[currentLang]}`)
      .join('। ');

    const fullText = `${selectedRecipe.title[currentLang]}। आराध्य: ${selectedRecipe.deityAssociated[currentLang]}। ${selectedRecipe.significance[currentLang]}। पाककृती: ${stepsText}। आरोग्य लाभ: ${selectedRecipe.healthTip[currentLang]}`;

    setIsSpeaking(true);
    audioEngine.speakText(fullText, currentLang === 'en' ? 'en-IN' : 'mr-IN', 0.88, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Utensils className="w-4 h-4 text-amber-600" />
          <span>
            {currentLang === 'en'
              ? 'Satvik Temple Prasad & Fasting Science'
              : 'सात्विक नैवेद्य पाककृती व उपवास विज्ञान'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Satvik Prasad Recipes & Upvas Diet Guide'
            : currentLang === 'hi'
            ? 'सात्विक प्रसाद पाक विधि एवं व्रत आहार नियम'
            : 'सात्विक प्रसाद पाककृती व उपवास आहार नियमावली'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Authentic step-by-step temple recipes for Modak, Satyanarayan Sheera, Bhagar, and Panchamrit alongside Ayurvedic fasting rules.'
            : '२१ कळ्यांचे उकडीचे मोदक, सत्यनारायणाचा प्रसादाचा शिरा, एकादशी भगर-आमटी व पंचामृत पाककृती; तसेच उपवासाला काय खावे व काय टाळावे याचे आयुर्वेद शास्त्र.'}
        </p>

        {/* Top View Toggle */}
        <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'recipes'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>
              {currentLang === 'en' ? 'Temple Naivedya Recipes' : 'सात्विक नैवेद्य पाककृती'}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'rules'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {currentLang === 'en' ? 'Fasting (Upvas) Rules' : 'उपवास आहार शास्त्र (काय खावे/टाळावे)'}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: SATVIK RECIPES */}
      {activeTab === 'recipes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Recipe Selection Pills */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold font-serifDev text-stone-900 dark:text-white mb-2 px-1">
              {currentLang === 'en' ? 'Select Divine Recipe' : 'पारंपरिक नैवेद्य निवडा'}:
            </h3>
            {satvikRecipesList.map((rec) => {
              const isSelected = rec.id === selectedRecipeId;
              return (
                <button
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecipeId(rec.id);
                    if (isSpeaking) {
                      audioEngine.stopSpeaking();
                      setIsSpeaking(false);
                    }
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/10 dark:from-amber-950/40 dark:to-orange-950/30 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      🚩 {rec.deityAssociated[currentLang]}
                    </span>
                    <span className="text-[11px] font-mono text-stone-600 dark:text-stone-300">
                      {rec.cookTime}
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-white text-base font-serifDev">
                    {rec.title[currentLang]}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Recipe Display */}
          <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl">
            {/* Header & Speech button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  🚩 {selectedRecipe.deityAssociated[currentLang]}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-stone-900 dark:text-white mt-2">
                  {selectedRecipe.title[currentLang]}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 mt-2 font-medium">
                  <span>⏱️ पूर्वतयारी: {selectedRecipe.prepTime}</span>
                  <span>🔥 शिजवण्याची वेळ: {selectedRecipe.cookTime}</span>
                  <span>🍽️ प्रमाण: {selectedRecipe.servings}</span>
                </div>
              </div>

              {/* Listen to recipe button */}
              <button
                onClick={handleSpeakRecipe}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 ${
                  isSpeaking
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>
                  {isSpeaking
                    ? currentLang === 'en'
                      ? 'Stop Voice'
                      : 'आवाज थांबवा'
                    : currentLang === 'en'
                    ? 'Listen Recipe (Audio)'
                    : 'कृती ऐका (अमिताभ बच्चन व्हॉइस)'}
                </span>
              </button>
            </div>

            {/* Spiritual Significance */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-stone-800 dark:text-amber-100 text-xs sm:text-sm mb-6 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-0.5">
                  {currentLang === 'en' ? 'Sacred Spiritual Significance' : 'धार्मिक व आध्यात्मिक महत्त्व'}:
                </span>
                <p>{selectedRecipe.significance[currentLang]}</p>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-6">
              <h3 className="text-base font-bold font-serifDev text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-500" />
                <span>{currentLang === 'en' ? 'Ingredients Required' : 'लागणारे साहित्य'}:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {ing.name[currentLang]}
                    </span>
                    <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">
                      {ing.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step by Step Method */}
            <div className="mb-6">
              <h3 className="text-base font-bold font-serifDev text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>{currentLang === 'en' ? 'Step-by-Step Cooking Method' : 'पाककृती कृती (पायऱ्या)'}:</span>
              </h3>
              <div className="space-y-3">
                {selectedRecipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50/50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-3 text-xs sm:text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {step[currentLang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Health / Ayurvedic Tip */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 flex items-start gap-3">
              <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950 dark:text-emerald-200 block mb-0.5">
                  {currentLang === 'en' ? 'Ayurvedic Health Benefit' : 'आयुर्वेदिक व आरोग्य लाभ'}:
                </span>
                <p>{selectedRecipe.healthTip[currentLang]}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FASTING RULES (काय खावे VS काय टाळावे) */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 to-saffron-600 text-white shadow-xl">
            <h3 className="text-xl font-bold font-serifDev mb-2">
              {currentLang === 'en'
                ? 'The Science of Hindu Upvas (Fasting)'
                : 'हिंदू उपवासाचे शास्त्रशुद्ध विज्ञान'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-3xl leading-relaxed">
              {currentLang === 'en'
                ? 'Upvas means "Up + Vas" — sitting near the Divine. Fasting gives our digestive fire (Jatharagni) rest, cleanses the gut, and elevates Sattva Guna for meditation.'
                : 'उप + वास म्हणजे ईश्वराच्या समीप राहणे. उपवासात जठराग्नीला हलका आहार देऊन शरीरातील विषद्रव्ये बाहेर काढली जातात आणि मनात सात्विक ऊर्जा जागृत होते.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {fastingRulesDatabase.map((rule: FastingRule, idx: number) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-4 border-b border-stone-100 dark:border-stone-800 pb-2">
                    {rule.category[currentLang]}
                  </h4>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Allowed */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{currentLang === 'en' ? 'Allowed (खावे)' : 'चालणारे पदार्थ'}</span>
                      </span>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {rule.allowedItems.map((item, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prohibited */}
                    <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                      <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 mb-2">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>{currentLang === 'en' ? 'Avoid (वर्ज्य)' : 'वर्ज्य पदार्थ'}</span>
                      </span>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {rule.prohibitedItems.map((item, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Scientific Reason */}
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  <span className="font-semibold text-stone-800 dark:text-stone-100 block mb-0.5">
                    🔬 {currentLang === 'en' ? 'Scientific & Ayurvedic Logic' : 'आयुर्वेद व वैज्ञानिक कारण'}:
                  </span>
                  {rule.scientificReason[currentLang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

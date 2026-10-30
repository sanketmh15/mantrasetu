import React, { useState } from 'react';
import { Language } from '../types';
import { Compass, BookOpen, Shield, Brain, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface IntentSelectorProps {
  currentLang: Language;
  onSelectIntent: (targetTab: string, mantraId?: string) => void;
}

export const IntentSelector: React.FC<IntentSelectorProps> = ({ currentLang, onSelectIntent }) => {
  const [selectedId, setSelectedId] = useState<string>('courage');

  const intents = [
    {
      id: 'courage',
      icon: Shield,
      title: { en: 'Courage & Strength', hi: 'साहस एवं निर्भयता', mr: 'धैर्य आणि निर्भयता' },
      subtitle: { en: 'Overcome fear & inner hesitation', hi: 'भय और संकोच से मुक्ति', mr: 'भीती व संशयावर मात' },
      recommendation: {
        mantra: { en: 'Bhimrupi Maharudra / Maruti Stotra', hi: 'भीमरूपी महारुद्रा मारुति स्तोत्र', mr: 'भीमरूपी महारुद्रा (मारुती स्तोत्र)' },
        explanation: {
          en: 'Composed by Samarth Ramdas Swami, this stotra inspires physical and moral strength, reminding you of the boundless resilience within.',
          hi: 'समर्थ रामदास स्वामी द्वारा रचित यह स्तोत्र मन में अपार ऊर्जा और संकल्प शक्ति का संचार करता है।',
          mr: 'समर्थ रामदास स्वामींनी रचलेले हे स्तोत्र आत्मविश्वास आणि चारित्र्य घडवण्यासाठी अत्यंत प्रभावी आहे.'
        },
        actionTab: 'mantras',
        targetMantraId: 'bhimrupi-maharudra'
      }
    },
    {
      id: 'peace',
      icon: Heart,
      title: { en: 'Inner Peace & Calm', hi: 'मानसिक शांति व स्थिरता', mr: 'मानसिक शांती व समाधान' },
      subtitle: { en: 'Ease anxious & restless thoughts', hi: 'व्यग्र मन को विश्राम', mr: 'अस्वस्थ मनाला विश्रांती' },
      recommendation: {
        mantra: { en: 'Sankat Mochan Hanuman Ashtak', hi: 'संकट मोचन हनुमानाष्टक', mr: 'संकट मोचन हनुमानाष्टक' },
        explanation: {
          en: 'Tulsidas\'s verses remind us that even the darkest circumstances dissolve when approached with heartfelt faith and patience.',
          hi: 'गोस्वामी तुलसीदास जी की यह रचना संकटों में धैर्य और प्रभु की कृपा का शांत आश्वासन देती है।',
          mr: 'कठीण प्रसंगात मन शांत ठेवून धीर धरण्याची प्रेरणा देणारे संत तुलसीदासांचे पावन अष्टक.'
        },
        actionTab: 'mantras',
        targetMantraId: 'sankat-mochan'
      }
    },
    {
      id: 'focus',
      icon: Brain,
      title: { en: 'Study & Mental Focus', hi: 'एकाग्रता एवं अध्ययन', mr: 'अभ्यास व एकाग्रता' },
      subtitle: { en: 'Sharpen intellect & discipline', hi: 'बुद्धि और स्मरण शक्ति', mr: 'स्मरणशक्ती व सुबुद्धी' },
      recommendation: {
        mantra: { en: 'Manojavam Dhyana Sloka & Om Hanumate Namah', hi: 'मनोजवं मारुततुल्यवेगं ध्यान श्लोक', mr: 'मनोजवं ध्यान श्लोक व नामस्मरण' },
        explanation: {
          en: 'Hanuman is praised as "Buddhimatam Varishtham" (foremost among the wise). Chanting before study steadies brainwave states.',
          hi: 'हनुमान जी बुद्धिमानों में अग्रगण्य माने जाते हैं। अध्ययन से पूर्व इस श्लोक का पाठ एकाग्रता बढ़ाता है।',
          mr: 'मारुतीरायांना बुद्धिमंतांचे मुकुटमणी मानले जाते. अभ्यासापूर्वी हा श्लोक म्हटल्याने चित्त एकाग्र होते.'
        },
        actionTab: 'mantras',
        targetMantraId: 'manojavam-maruta-tulya-vegam'
      }
    },
    {
      id: 'daily',
      icon: Compass,
      title: { en: 'Daily Japa Habit', hi: 'दैनिक जप अनुष्ठान', mr: 'नित्य नामस्मरण' },
      subtitle: { en: '108 repetitions with digital mala', hi: '१०८ मनकों का शांत ध्यान', mr: '१०८ मण्यांची नित्य माळ' },
      recommendation: {
        mantra: { en: 'Om Hanumate Namah (108 Mala)', hi: 'ॐ हनुमते नमः (१०८ जप)', mr: 'ॐ हनुमते नमः (१०८ नामस्मरण)' },
        explanation: {
          en: 'Simple, universal, and grounding. A 10-minute daily japa practice resets your nervous system and builds lifelong spiritual discipline.',
          hi: '१० मिनट का दैनिक १०८ नाम जप मन को शांत और जीवन को अनुशासित बनाता है।',
          mr: 'दररोज १०८ वेळा नामस्मरण केल्याने मनाला विलक्षण शांतता आणि प्रसन्नता लाभते.'
        },
        actionTab: 'japa',
        targetMantraId: 'om-hanumate-namah'
      }
    },
    {
      id: 'chalisa',
      icon: BookOpen,
      title: { en: 'Hanuman Chalisa', hi: 'सम्पूर्ण चालीसा पाठ', mr: 'संपूर्ण चालीसा पठण' },
      subtitle: { en: 'The timeless 40 chaupais', hi: '४० चौपाइयों का पावन गान', mr: '४० ओव्यांचे भावपूर्ण पठण' },
      recommendation: {
        mantra: { en: 'Shri Hanuman Chalisa (Line-by-Line)', hi: 'श्री हनुमान चालीसा (अर्थ सहित)', mr: 'श्री हनुमान चालीसा (भावार्थासह)' },
        explanation: {
          en: 'The most recited devotional poem across India. Read with word-by-word meaning, audio, and roman transliteration.',
          hi: 'भारत भर में सर्वाधिक उच्चारित। शब्दार्थ, भावार्थ और स्वर सहित इसका पाठ सर्वोत्तम है।',
          mr: 'भारतातील सर्वात लोकप्रिय स्तोत्र. शब्दांच्या अर्थासह आणि ऑडिओसह पठण करा.'
        },
        actionTab: 'chalisa'
      }
    }
  ];

  const activeIntent = intents.find((i) => i.id === selectedId) || intents[0];

  return (
    <div className="py-10 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
            {currentLang === 'en' ? 'Personalized Spiritual Guidance' : currentLang === 'hi' ? 'मार्गदर्शन' : 'मार्गदर्शन'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serifDev text-white mt-1">
            {currentLang === 'en'
              ? 'Why are you here today?'
              : currentLang === 'hi'
              ? 'आज आपकी क्या आवश्यकता है?'
              : 'आज आपली काय गरज आहे?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            {currentLang === 'en'
              ? 'Select your current focus to discover traditional practices grounded in authentic wisdom.'
              : currentLang === 'hi'
              ? 'अपनी स्थिति अनुसार उपयुक्त परम्परागत मन्त्र व साधना का चयन करें।'
              : 'आपल्या गरजेनुसार योग्य पारंपरिक मंत्र व पठण निवडा.'}
          </p>
        </div>

        {/* Intent Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {intents.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-saffron-950/60 border-saffron-500 shadow-lg shadow-saffron-950/40 ring-1 ring-saffron-500/50'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className={`p-2 rounded-xl inline-block mb-2 ${isSelected ? 'bg-saffron-600 text-white' : 'bg-stone-800 text-stone-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-stone-100 text-xs sm:text-sm">
                    {item.title[currentLang]}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                    {item.subtitle[currentLang]}
                  </p>
                </div>
                {isSelected && (
                  <div className="mt-2 text-saffron-400 flex items-center gap-1 text-[11px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Selected' : 'निवडलेले'}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Card */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-[#181614] to-stone-900 border border-amber-900/40 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                {currentLang === 'en' ? 'Recommended Traditional Practice' : currentLang === 'hi' ? 'अनुशंसित परम्परागत साधना' : 'शिफारस केलेले पारंपरिक पठण'}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mt-1 font-serifDev">
                {activeIntent.recommendation.mantra[currentLang]}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                {activeIntent.recommendation.explanation[currentLang]}
              </p>
              <p className="text-[11px] text-stone-500 mt-2 italic">
                * {currentLang === 'en' ? 'Spiritual practice fosters inner resilience; not presented as a supernatural shortcut.' : currentLang === 'hi' ? 'यह आंतरिक शांति व सामर्थ्य की साधना है, किसी अंधविश्वास का दावा नहीं।' : 'ही आत्मिक बळ मिळवण्याची साधना आहे, कसलाही अंधश्रद्धेचा दावा नाही.'}
              </p>
            </div>

            <button
              onClick={() => onSelectIntent(activeIntent.recommendation.actionTab, activeIntent.recommendation.targetMantraId)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white font-semibold text-sm transition-all whitespace-nowrap shadow-md shadow-saffron-950"
            >
              <span>{currentLang === 'en' ? 'Start Chanting' : currentLang === 'hi' ? 'प्रारम्भ करें' : 'सुरुवात करा'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


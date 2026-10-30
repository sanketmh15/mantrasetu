import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { audioEngine } from '../utils/audioSynth';
import {
  interpretAndExecuteAppCommand,
  AppActionHandlers,
  CommandExecutionResult,
} from '../utils/aiCommandInterpreter';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Settings,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Copy,
  Check,
  Key,
  Command
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: string;
  category?: 'devotional' | 'problem_solving' | 'scripture' | 'general' | 'command_execution';
  executedCommand?: CommandExecutionResult;
}

// 12 Maharashtra-centric languages/dialects
export interface SupportedLang {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const supported12Languages: SupportedLang[] = [
  { id: 'mr', code: 'mr', name: 'Marathi (Standard)', nativeName: 'मराठी (प्रमाण)', flag: '🚩', speechCode: 'mr-IN' },
  { id: 'ahirani', code: 'ahirani', name: 'Ahirani (Khandeshi)', nativeName: 'अहिराणी (खान्देशी)', flag: '🌾', speechCode: 'mr-IN' },
  { id: 'varhadi', code: 'varhadi', name: 'Varhadi (Vidarbha)', nativeName: 'वऱ्हाडी (विदर्भ)', flag: '🪷', speechCode: 'mr-IN' },
  { id: 'malvani', code: 'malvani', name: 'Malvani / Konkani', nativeName: 'मालवणी / कोकणी', flag: '🥥', speechCode: 'mr-IN' },
  { id: 'agri', code: 'agri', name: 'Agri / Koli', nativeName: 'आगरी / कोळी', flag: '🌊', speechCode: 'mr-IN' },
  { id: 'hi', code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { id: 'sa', code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🕉️', speechCode: 'sa-IN' },
  { id: 'en', code: 'en', name: 'English (India)', nativeName: 'English', flag: '🌐', speechCode: 'en-IN' },
  { id: 'gu', code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🪔', speechCode: 'gu-IN' },
  { id: 'kn', code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🌺', speechCode: 'kn-IN' },
  { id: 'te', code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🌻', speechCode: 'te-IN' },
  { id: 'ur', code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🌙', speechCode: 'ur-IN' },
];

interface OverpoweredChatbotProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  appActions: AppActionHandlers;
}

export const OverpoweredChatbot: React.FC<OverpoweredChatbotProps> = ({
  currentLang,
  isOpen,
  onClose,
  appActions,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-1',
        sender: 'assistant',
        text:
          currentLang === 'en'
            ? 'Hari Om! I am your Divine AI Guru & App Controller. Not only can I answer any spiritual, emotional, or life question in 12 languages, but I can also CONTROL THIS ENTIRE APP directly!\n\nTry commands like: "count jap", "open kumbh mela", "open 50 gods", "open swami samarth", "ring temple bell", "blow shankha", "dark mode", or speak to me via the microphone!'
            : currentLang === 'hi'
            ? 'हरि ॐ! मैं आपका दिव्य एआई गुरु व ऐप नियंत्रक हूँ। मैं १२ भाषाओं में आपके सभी आध्यात्मिक व जीवन प्रश्नों के उत्तर देने के साथ-साथ इस ऐप के सभी कार्य भी कर सकता हूँ!\n\nकमांड्स आज़माएँ: "count jap", "कुंभमेला खोलो", "५० देवी-देवता", "स्वामी समर्थ", "घंटी बजाओ", "शंख बजाओ", "डार्क मोड" अथवा माइक से बोलें!'
            : 'हरी ॐ! मी तुमचा दिव्य AI सहाय्यक व ॲप कमांडर आहे. मी १२ भाषांमध्ये अध्यात्म व जीवनविषयक प्रश्नांची उत्तरे देण्यासोबतच या ॲपचे सर्व कार्य स्वतः हाताळू शकतो!\n\nकमांड देऊन पहा: "count jap (जप मोजा)", "कुंभमेळा उघडा", "सर्व ५० देव", "स्वामी समर्थांचे पान", "घंटा वाजवा", "शंख वाजवा", "डार्क मोड", किंवा माईकवर बोलून थेट आदेश द्या!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLang,
        category: 'devotional',
      },
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<SupportedLang>(supported12Languages[0]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingMessageId, setIsSpeakingMessageId] = useState<string | null>(null);
  const [autoSpeakResponse, setAutoSpeakResponse] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('divine_ai_api_key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedVoiceLang.speechCode;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedVoiceLang]);

  const handleToggleMic = () => {
    if (!recognitionRef.current) {
      alert(
        currentLang === 'en'
          ? 'Speech recognition is not supported in this browser. Please use Google Chrome, Edge, or Safari.'
          : 'तुमच्या ब्राऊझरमध्ये व्हॉइस रिकग्निशन उपलब्ध नाही. कृपया Google Chrome किंवा Edge वापरा.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      audioEngine.playBeadClick();
      recognitionRef.current.lang = selectedVoiceLang.speechCode;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('divine_ai_api_key', key);
  };

  // Deep Overpowered Devotional & Life-Counseling Knowledge Engine
  const generateIntelligentAnswer = (query: string, langId: string): string => {
    const q = query.toLowerCase().trim();

    // 1. Kumbh Mela Queries
    if (q.includes('kumbh') || q.includes('कुंभ') || q.includes('शाही स्नान') || q.includes('shahi snan') || q.includes('nashik') || q.includes('त्र्यंबकेश्वर') || q.includes('trimbak')) {
      if (langId === 'mr' || langId === 'ahirani' || langId === 'varhadi' || langId === 'malvani' || langId === 'agri') {
        return `🌊 **सिंहस्थ कुंभमेळा संपूर्ण मार्गदर्शन (नाशिक-त्र्यंबकेश्वर व प्रयागराज):**
1. **सिंहस्थ कुंभमेळा पर्व:** जेव्हा देवगुरु बृहस्पती (गुरू) सिंह राशीत प्रवेश करतात, तेव्हा गोदावरी तीरावर नाशिक-त्र्यंबकेश्वर येथे सिंहस्थ कुंभमेळा भरतो.
2. **शाही स्नान प्रमुख घाटे:**
   - नाशिक: **रामकुंड** (जिथे प्रभू श्रीरामांनी स्नान केले व दशरथांचे श्राद्ध केले).
   - त्र्यंबकेश्वर: **कुशावर्त तीर्थ** (जिथे शैव व वैष्णव आखाड्यांचे नागा साधू पहिले शाही स्नान करतात).
3. **अमृत थेंबांची कथा:** समुद्रमंथनातून निघालेल्या अमृताचे चार थेंब पृथ्वीवर पडले — नाशिक (गोदावरी), प्रयागराज (गंगा-यमुना-सरस्वती संगम), हरिद्वार (गंगा) आणि उज्जैन (शिप्रा नदी).
4. **शाही स्नानाचा नियम:** ब्राह्ममुहूर्तावर गोदावरीत 'ॐ नमः शिवाय' व 'गोदावरी नमोऽस्तु ते' मंत्राने ३ डुबक्या मारून स्नान केल्यास सर्व पापे भस्म होतात व अक्षय पुण्य प्राप्त होते.`;
      }
      return `🌊 **Simhastha Kumbh Mela Complete Guide (Nashik-Trimbakeshwar & Prayagraj):**
1. **Sacred Astrological Alignment:** Occurs when Jupiter (Guru) enters the constellation of Leo (Simha Rashi) and the Sun enters Aries/Leo.
2. **Key Holy Bathing Ghats:**
   - **Ram Kund (Nashik):** The sacred ghat on River Godavari where Lord Rama bathed and performed shraddha rituals.
   - **Kushavarta Kund (Trimbakeshwar):** Where ancient Akharas and Naga Sadhus take the first royal Shahi Snan.
3. **The Four Amrita Sites:** Amrita drops fell at Nashik (Godavari), Prayagraj (Triveni Sangam), Haridwar (Ganga), and Ujjain (Shipra River).
4. **Spiritual Merits:** Taking a dip with a sincere heart cleanses generations of karma and brings mental liberation (Moksha).`;
    }

    // 2. Mental Peace, Anxiety, Grief, Life Dilemmas
    if (q.includes('ताण') || q.includes('भीती') || q.includes('चिंता') || q.includes('त्रास') || q.includes('anxiety') || q.includes('depression') || q.includes('stress') || q.includes('fear') || q.includes('grief')) {
      if (langId === 'mr' || langId === 'ahirani' || langId === 'varhadi' || langId === 'malvani' || langId === 'agri') {
        return `🌸 **मनःशांती, निर्भयता व संकटनिवारण सूत्र:**
1. **अक्कलकोट स्वामी समर्थांचा अभय मंत्र:** *"भिऊ नकोस मी तुझ्या पाठीशी आहे!"* जेव्हा मनात भीती वाटेल, तेव्हा हे वचन ५ वेळा मोठ्याने उच्चारा.
2. **संकटमोचन मारुती स्तोत्र / हनुमान चालीसा:** *"सब सुख लहै तुम्हारी सरना, तुम रक्षक काहू को डर ना।"* दररोज सायंकाळी तिळाच्या तेलाचा दिवा लावून ११ वेळा जप करावा.
3. **प्राणायाम व नामस्मरण:** दीर्घ श्वास घेऊन 'राम कृष्ण हरी' किंवा 'ॐ नमः शिवाय' चा १०८ वेळा शांतपणे जप करा. मेंदूतील तणावाचे संप्रेरक कमी होतात व मन स्थिर होते.
4. **भगवद्गीता मार्गदर्शन (२.४७):** जे तुमच्या हातात आहे ते प्रामाणिकपणे करा, भविष्याची चिंता ईश्वरावर सोपवा. वाईट वेळ कायम टिकत नाही, हेही दिवस निघून जातील!`;
      }
      return `🌸 **Spiritual Wisdom for Inner Peace, Anxiety & Fear Relief:**
1. **The Ultimate Reassurance:** Swami Samarth's eternal promise: *"Bhiu Nakos, Mi Tujhya Pathishi Aahe"* (Fear not, I am right behind you!).
2. **Hanuman's Fearlessness:** Recite the Hanuman Chalisa. Verse 24: *"Bhoot pisaach nikat nahin aavai, Mahavir jab naam sunavai"* dispels darkness, doubt, and phantom anxieties.
3. **The 108 Japa Meditation:** Slow your breath. Chant *"Om Namah Shivaya"* or *"Om Gam Ganapataye Namaha"* with the digital mala. Within 5 minutes, cortical cortisol decreases and peace returns.
4. **Bhagavad Gita 2.47:** Focus purely on your sincere duty today; surrender the weight of the unknown future to the Divine.`;
    }

    // 3. 108 Japa Vidhi & Rules
    if (q.includes('जप') || q.includes('माला') || q.includes('japa') || q.includes('108') || q.includes('नियम') || q.includes('rule')) {
      if (langId === 'mr' || langId === 'ahirani' || langId === 'varhadi' || langId === 'malvani' || langId === 'agri') {
        return `📿 **१०८ नामस्मरण जप करण्याचे शाश्वत नियम:**
1. **१०८ आकड्याचे रहस्य:** आपल्या शरीरात १०८ मुख्य ऊर्जा नाड्या (मर्मस्थाने) असतात. तसेच १२ राशी × ९ नवग्रह = १०८ cosmic alignments होतात.
2. **बोटे वापरण्याची पद्धत:** जप करताना अंगठा (Thumb) आणि मधले बोट (Middle Finger) वापरावे. तर्जनी (Index Finger - अहंकाराचे बोट) माळेला लावू नये.
3. **सुमेरू मणी न ओलांडणे:** माळेतील १०८ वा मुख्य मणी (सुमेरू) आल्यावर माळ उलट फिरवावी, सुमेरू मणी ओलांडू नये.
4. **वेळ व दिशा:** पूर्व किंवा उत्तर दिशेकडे तोंड करून आसनावर बसावे. पहाटे ब्राह्ममुहूर्तावर किंवा सायंकाळी प्रदोषकाळी केलेला जप सर्वाधिक फलदायी ठरतो.`;
      }
      return `📿 **Authentic Vedic Rules for 108 Japa Mala:**
1. **Cosmic Significance:** 108 corresponds to the 108 Upanishads, 12 Zodiacs × 9 Planets, and the 108 vital nadi intersections in the spiritual heart.
2. **Finger Technique:** Use the thumb and middle finger to roll each bead. Never touch the bead with the index finger (symbolizes the ego).
3. **Sumeru Rule:** When you reach the central summit bead (Guru bead/Sumeru), do not cross it. Reverse direction to continue the next cycle.
4. **Ideal Posture:** Face East (morning) or North (meditative focus) sitting on a clean cloth or woolen mat.`;
    }

    // 4. Default Universal Intelligent Counseling
    if (langId === 'mr' || langId === 'ahirani' || langId === 'varhadi' || langId === 'malvani' || langId === 'agri') {
      return `🚩 **आपल्या प्रश्नाचे सखोल व आध्यात्मिक मार्गदर्शन:**
आपण विचारलेल्या विषयावर प्राचीन धर्मग्रंथ आणि व्यावहारिक अनुभवावर आधारित खालील मार्गदर्शन उपयुक्त ठरेल:

1. **सकारात्मक दृष्टिकोन:** जीवनात कोणताही प्रसंग आला तरी मन शांत ठेवून नामस्मरण केल्यास योग्य मार्ग सापडतो.
2. **दैनंदिन उपासना:** रोज सकाळी किंवा संध्याकाळी किमान १० मिनिटे आपल्या कुलदेवतेचे किंवा इष्टदेवतेचे नामस्मरण करावे.
3. **समस्या सोडवण्याचे सूत्र:** समस्येवर विचार करण्यापेक्षा उपायांवर लक्ष केंद्रित करा. जर तुम्हाला याबद्दल अधिक विशिष्ट श्लोक, मंत्र किंवा पूजा विधी हवा असेल तर मला नक्की विचारा!`;
    }

    return `🚩 **Comprehensive Answer to Your Query:**
Regarding your question, here is profound guidance blending ancient spiritual wisdom and modern practical reasoning:

1. **Root Clarity:** Every worldly challenge has a solution when approached with a calm, centered mind rather than emotional reaction.
2. **Spiritual Alignment:** Chanting your chosen deity's mantra for just 5 minutes every morning builds a protective energetic barrier and improves clarity of thought.
3. **Action Step:** Break large dilemmas into smaller actionable tasks. Surrender the anxiety of the outcome to the Divine while giving 100% devotion to the effort. Feel free to ask more specific questions about mantras, rituals, or scripture!`;
  };

  const handleSendMessage = async (overrideText?: string) => {
    const userText = (overrideText || inputQuery).trim();
    if (!userText) return;

    setInputQuery('');
    setIsThinking(true);

    const newUserMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: selectedVoiceLang.code,
    };

    setMessages((prev) => [...prev, newUserMsg]);

    // 1. FIRST PRIORITY: CHECK IF USER HAS GIVEN AN AUTONOMOUS IN-APP COMMAND!
    const commandResult = interpretAndExecuteAppCommand(userText, appActions, currentLang);
    if (commandResult && commandResult.actionExecuted) {
      await new Promise((res) => setTimeout(res, 250));
      const assistantMsgId = `assistant-${Date.now()}`;
      const newAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: commandResult.assistantResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: selectedVoiceLang.code,
        category: 'command_execution',
        executedCommand: commandResult,
      };

      setIsThinking(false);
      setMessages((prev) => [...prev, newAssistantMsg]);

      if (autoSpeakResponse) {
        handleSpeakMessage(assistantMsgId, commandResult.assistantResponse);
      }
      return;
    }

    // 2. IF NOT AN IN-APP COMMAND: PROCEED WITH DEEP COUNSELING & CHAT
    let replyText = '';

    if (apiKey.trim()) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an overpowered spiritual AI guide and universal genius named MantraSetu Divine AI. Answer in ${selectedVoiceLang.name} language with deep compassion, scriptural accuracy, and practical life problem solving. User asks: ${userText}`
                  }
                ]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch {
        // Fallback to built-in knowledge engine
      }
    }

    if (!replyText) {
      // Use built-in offline knowledge engine
      await new Promise((res) => setTimeout(res, 600));
      replyText = generateIntelligentAnswer(userText, selectedVoiceLang.id);
    }

    const assistantMsgId = `assistant-${Date.now()}`;
    const newAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: selectedVoiceLang.code,
      category: 'devotional',
    };

    setIsThinking(false);
    setMessages((prev) => [...prev, newAssistantMsg]);

    // Auto-speak if enabled
    if (autoSpeakResponse) {
      handleSpeakMessage(assistantMsgId, replyText);
    }
  };

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (isSpeakingMessageId === msgId) {
      audioEngine.stopSpeaking();
      setIsSpeakingMessageId(null);
    } else {
      setIsSpeakingMessageId(msgId);
      audioEngine.speakText(text, selectedVoiceLang.speechCode, 1.0, () => {
        setIsSpeakingMessageId(null);
      });
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Autonomous App Control Pills (Commands that execute in-app actions live)
  const appCommandPills = [
    { label: '📅 वारानुसार पूजा (Day Puja)', cmd: 'open day puja' },
    { label: '📿 count jap', cmd: 'count jap' },
    { label: '🌊 open kumbh mela', cmd: 'open kumbh mela' },
    { label: '🪷 open 50 gods', cmd: 'open 50 gods' },
    { label: '🔔 ring bell', cmd: 'ring bell' },
    { label: '📯 blow shankha', cmd: 'blow shankha' },
    { label: '🌙 dark mode', cmd: 'dark mode' },
    { label: '☀️ light mode', cmd: 'light mode' },
    { label: '📖 open chalisa', cmd: 'open chalisa' },
    { label: '🌸 open swami samarth', cmd: 'open swami samarth' },
    { label: '🪷 open vitthal', cmd: 'open vitthal' },
    { label: '🕉️ open shiva', cmd: 'open shiva' },
  ];

  const quickPrompts = [
    { label: { en: 'Kumbh Mela 2027 Dates', mr: 'कुंभमेळा शाही स्नान' }, text: 'कुंभमेळा शाही स्नान आणि गोदावरी स्नानाचे नियम काय आहेत?' },
    { label: { en: 'Overcome Stress & Fear', mr: 'मनःशांती व ताणमुक्ती' }, text: 'माझ्या मनातील ताण आणि भीती कशी घालवू?' },
    { label: { en: '108 Japa Rules', mr: '१०८ जपमाळेचे नियम' }, text: '१०८ जप करण्याचे नियम आणि बोटे कशी वापरावीत?' },
    { label: { en: 'Khandoba Jejuri Story', mr: 'जेजुरी खंडोबाचा इतिहास' }, text: 'जेजुरीच्या खंडेरायाचा इतिहास आणि भंडाऱ्याचे महत्त्व काय आहे?' },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-white dark:bg-[#14120f] border border-stone-300 dark:border-stone-800 rounded-3xl overflow-hidden ${
        isMaximized
          ? 'inset-2 sm:inset-6'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[490px] h-[670px] max-h-[88vh]'
      }`}
    >
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-700 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg shadow-inner ring-1 ring-white/30">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold tracking-tight">
                {currentLang === 'en' ? 'Divine AI Commander & Guide' : 'दिव्य AI कमांडर व व्हॉइस असिस्टंट'}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] text-amber-100 flex items-center gap-1">
              <span>{selectedVoiceLang.flag}</span>
              <span>{selectedVoiceLang.nativeName}</span>
              <span>• बोलून किंवा टाईप करून ॲप चालवा</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Settings / API Key */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
            title="Settings & API Key"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Maximize Toggle */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors hidden sm:block"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel (API Key & Voice Controls) */}
      {showSettings && (
        <div className="p-4 bg-amber-50 dark:bg-stone-900 border-b border-amber-200 dark:border-stone-800 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Gemini / OpenAI API Key (Optional)</span>
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-stone-400 hover:text-stone-600 text-xs"
            >
              Close
            </button>
          </div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => handleSaveApiKey(e.target.value)}
            placeholder="Paste API key here (works offline without key too)"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs"
          />
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={autoSpeakResponse}
                onChange={(e) => setAutoSpeakResponse(e.target.checked)}
                className="rounded accent-saffron-600"
              />
              <span>{currentLang === 'en' ? 'Auto-speak AI responses' : 'उत्तरे आपोआप बोलून दाखवा'}</span>
            </label>
            <button
              onClick={() => setMessages([])}
              className="text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* 12-Language Dialect Selector Bar */}
      <div className="px-3 py-2 bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-stone-500 shrink-0">
          {currentLang === 'en' ? 'Dialect:' : 'भाषा:'}
        </span>
        {supported12Languages.map((lang) => {
          const isSelected = selectedVoiceLang.id === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => {
                setSelectedVoiceLang(lang);
                audioEngine.playBeadClick();
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                isSelected
                  ? 'bg-saffron-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-saffron-400'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-stone-50/50 dark:bg-[#12100d]/90">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          const isSpeaking = isSpeakingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs shadow-sm ${
                  isAssistant
                    ? 'bg-gradient-to-tr from-amber-600 to-saffron-500 text-white'
                    : 'bg-stone-800 text-amber-300'
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm relative group ${
                  isAssistant
                    ? 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-sm'
                    : 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white rounded-tr-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Interactive Action Execution Card (If AI executed an in-app command) */}
                {msg.executedCommand && (
                  <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/60 border border-amber-500/50 text-amber-200 shadow-md">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                      <span>॥ आदेश संपन्न • Live In-App Action Executed ॥</span>
                    </div>

                    {msg.executedCommand.actionType === 'COUNT_JAPA' && (
                      <div className="space-y-2">
                        <div className="text-xs text-stone-300 flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded-lg border border-amber-900/40">
                          <span>आजचे एकूण जप (Total Today):</span>
                          <span className="font-bold text-amber-300 text-sm">
                            {msg.executedCommand.actionDetails?.totalToday || 1}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              appActions.incrementJapa(1);
                              appActions.playTempleBell();
                              handleSendMessage('count 1 more jap');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                          >
                            <span>📿</span>
                            <span>+१ पुन्हा मोजा (Count Another)</span>
                          </button>
                          <button
                            onClick={() => {
                              appActions.navigateTab('japa');
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs border border-amber-500/30 flex items-center gap-1"
                          >
                            <span>पूर्ण जपमाळ उघडा ➔</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {msg.executedCommand.actionType === 'NAVIGATE_TAB' && (
                      <div className="mt-1">
                        <button
                          onClick={() => onClose()}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                        >
                          <span>{msg.executedCommand.actionDetails?.tabName || 'दालन'} उघडा व पहा ➔</span>
                        </button>
                      </div>
                    )}

                    {msg.executedCommand.actionType === 'OPEN_DEITY' && (
                      <div className="mt-1">
                        <button
                          onClick={() => onClose()}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                        >
                          <span>{msg.executedCommand.actionDetails?.godName || 'देवता'} पावन दर्शन घ्या ➔</span>
                        </button>
                      </div>
                    )}

                    {msg.executedCommand.actionType === 'PLAY_SOUND' && (
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => {
                            if (msg.executedCommand?.actionDetails?.soundType === 'bell') {
                              appActions.playTempleBell();
                            } else {
                              appActions.playShankha();
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                        >
                          <span>🔔 पुन्हा वाजवा (Play Again)</span>
                        </button>
                        <button
                          onClick={() => appActions.stopAudio()}
                          className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
                        >
                          <span>🔇 आवाज बंद</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer of message */}
                <div
                  className={`flex items-center justify-between gap-3 mt-2 pt-1 border-t text-[10px] ${
                    isAssistant
                      ? 'border-stone-100 dark:border-stone-800 text-stone-400'
                      : 'border-white/20 text-amber-100'
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  {isAssistant && (
                    <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      {/* TTS Voice Button */}
                      <button
                        onClick={() => handleSpeakMessage(msg.id, msg.text)}
                        title="Listen to this response"
                        className={`p-1 rounded-md transition-colors ${
                          isSpeaking ? 'text-saffron-600 animate-pulse' : 'hover:text-stone-700 dark:hover:text-stone-200'
                        }`}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Copy text"
                        className="p-1 rounded-md hover:text-stone-700 dark:hover:text-stone-200"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>
              {currentLang === 'en'
                ? 'Divine AI is executing command...'
                : 'दिव्य AI आज्ञा पालन करत आहे...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Autonomous In-App Command Pills (Live clickable actions) */}
      <div className="px-3 py-1.5 bg-amber-50/70 dark:bg-stone-900/90 border-t border-amber-200/50 dark:border-stone-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 shrink-0 flex items-center gap-1">
          <Command className="w-3 h-3" />
          <span>कमांड्स:</span>
        </span>
        {appCommandPills.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.cmd)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-amber-300/60 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 text-[11px] font-semibold whitespace-nowrap hover:bg-amber-100 dark:hover:bg-stone-700 hover:border-amber-500 active:scale-95 transition-all shadow-2xs"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-3 py-1.5 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-stone-400 shrink-0">
          प्रश्न:
        </span>
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setInputQuery(p.text);
              audioEngine.playBeadClick();
            }}
            className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-[11px] whitespace-nowrap hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            {p.label[currentLang === 'en' ? 'en' : 'mr']}
          </button>
        ))}
      </div>

      {/* Input Bar with Mic & Send */}
      <div className="p-3 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          {/* Mic Button (Voice Assistant) */}
          <button
            onClick={handleToggleMic}
            title={isListening ? 'Listening... Click to stop' : `Speak in ${selectedVoiceLang.name}`}
            className={`p-2.5 rounded-2xl transition-all shadow-md ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-400/30'
                : 'bg-amber-100 dark:bg-stone-800 text-amber-800 dark:text-amber-300 hover:bg-amber-200'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              isListening
                ? `Listening in ${selectedVoiceLang.nativeName}... बोलणे सुरू ठेवा`
                : currentLang === 'en'
                ? `Enter command or ask anything... (e.g. 'count jap', 'open kumbh')`
                : `कमांड द्या किंवा प्रश्न विचारा... (उदा. 'जप कर', 'कुंभमेळा उघडा')`
            }
            className="flex-grow px-3.5 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white disabled:opacity-40 transition-all shadow-md active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

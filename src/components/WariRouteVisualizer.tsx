import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { dnyaneshwarPalkhiRoute, tukaramPalkhiRoute, vitthalLore, WariHalt } from '../data/vitthal';
import { audioEngine } from '../utils/audioSynth';
import {
  MapPin,
  ExternalLink,
  Volume2,
  Sparkles,
  Award,
  Footprints,
  Share2,
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bell,
  Music,
  ShieldCheck,
  Send
} from 'lucide-react';

interface WariRouteVisualizerProps {
  currentLang: Language;
}

type PalkhiId = 'dnyaneshwar' | 'tukaram';

interface VarkariScheduleItem {
  time: string;
  title: { en: string; hi: string; mr: string };
  desc: { en: string; hi: string; mr: string };
  icon: string;
}

interface ChecklistItem {
  id: string;
  name: { en: string; hi: string; mr: string };
  category: { en: string; hi: string; mr: string };
}

const varkariSchedule: VarkariScheduleItem[] = [
  {
    time: '03:30 AM – 05:00 AM',
    title: {
      en: 'Kakad Aarti & Bhupali',
      hi: 'काकड आरती एवं भूपाळी',
      mr: 'पहाटेची काकड आरती व भूपाळी',
    },
    desc: {
      en: 'Varkaris wake up in Brahma Muhurta, take holy bath, and sing sweet awakening Bhupalis to Vitthal Mauli.',
      hi: 'ब्रह्म मुहूर्त में जागरण, स्नान और विठू माऊली के पावन काकड आरती व भूपाळी का सामूहिक गायन।',
      mr: 'ब्रह्ममुहूर्तावर जागरण, शुचिर्भूत स्नान आणि तंबोरा-टाळांच्या मंजुळ नादात माऊलींच्या जागृतीची भूपाळी गायन.',
    },
    icon: '🪔',
  },
  {
    time: '06:00 AM – 11:00 AM',
    title: {
      en: 'Prasthan & Morning Walk with Haripath',
      hi: 'पालखी प्रस्थान एवं प्रातः पदयात्रा',
      mr: 'पालखी प्रस्थान व सकाळची वाटचाल (हरिपाठ)',
    },
    desc: {
      en: 'Tutaari sounds signal the departure. Hundreds of Dindis walk rhythmically while reciting Sant Dnyaneshwar\'s Haripath.',
      hi: 'तुतारी की ललकार के साथ प्रस्थान। "हरिपाठ" और "ज्ञानोबा माऊली तुकाराम" के अखंड गजर के साथ कदमताल।',
      mr: 'कर्णमधुर तुतारीच्या नादाने पालखीचे प्रस्थान. शेकडो दिंड्या शिस्तीत पुढे सरकताना अखंड हरिपाठ व नामघोष चालतो.',
    },
    icon: '🚩',
  },
  {
    time: '11:00 AM – 02:00 PM',
    title: {
      en: 'Mid-day Halt, Prasad & Bhopala Aarti',
      hi: 'दुपहरी विसावा, महाप्रसाद एवं आरती',
      mr: 'दुपारचा विसावा, न्याहारी व दुपारची आरती',
    },
    desc: {
      en: 'The Palkhi halts at designated farms/temple groves. Villagers offer warm Satvik meals (Khichdi, Bhakri) to all pilgrims.',
      hi: 'छायादार वृक्षों व खेतों में विश्राम। स्थानीय ग्रामीण प्रेमभाव से वारकरियों को भाकरी-पिठलं व खिचड़ी का महाप्रसाद बांटते हैं।',
      mr: 'निसर्गरम्य शेतात किंवा पावन मंदिरात विसावा. परिसरातील ग्रामस्थ प्रेमाने भाकरी, ठेचा, पुरणपोळी व खिचडीचे महाअन्नदान करतात.',
    },
    icon: '🍲',
  },
  {
    time: '03:30 PM – 06:30 PM',
    title: {
      en: 'Afternoon Journey & Ringan Excitement',
      hi: 'अपराह्न वाटचाल एवं रिंगण सोहळा',
      mr: 'दुपारनंतरची वाटचाल व रिंगण सोहळा',
    },
    desc: {
      en: 'Dindis march with saffron Patakas waving high. On scheduled days, thrilling Gol and Ubhe Ringans take place.',
      hi: 'भगवा ध्वज लहराते हुए आगे बढ़ना। निर्धारित पड़ावों पर अद्भूत गोल एवं उभे रिंगण समारोह संपन्न होता है।',
      mr: 'दुपारच्या प्रहरानंतर चैतन्यमय वाटचाल. ठरलेल्या दिवशी नयनरम्य गोल रिंगण व उभे रिंगण सोहळे संपन्न होतात.',
    },
    icon: '🐎',
  },
  {
    time: '07:00 PM – 08:30 PM',
    title: {
      en: 'Evening Camp Arrival & Samaj Aarti',
      hi: 'सायंकालीन मुक्काम एवं समाज आरती',
      mr: 'मुक्कामी आगमन, धुपारती व भव्य समाज आरती',
    },
    desc: {
      en: 'Arrival at the night camp ground. All Dindi chiefs and lakhs of pilgrims gather for the majestic Samaj Aarti.',
      hi: 'रात्रि पड़ाव पर प्रवेश। लाखों दीपों की ज्योति के बीच सभी दिंडी प्रमुख मिलकर समाज आरती करते हैं।',
      mr: 'मुक्कामाच्या तंबूत आगमन. मानाच्या सर्व दिंड्यांचे विणेकरी आणि लाखो भाविक एकत्र येऊन सामूहिक समाज आरती करतात.',
    },
    icon: '✨',
  },
  {
    time: '09:00 PM – 12:00 AM',
    title: {
      en: 'Keertan, Bharud & Night Jagar',
      hi: 'कीर्तन, भारुड एवं रात्रि जागरण',
      mr: 'रात्रीचे कीर्तन, लोकशिक्षणात्मक भारुड व जागर',
    },
    desc: {
      en: 'Eminent Varkari Keertankars preach saint philosophy. Devotees dance with Chipli and Taal in pure ecstasy.',
      hi: 'प्रख्यात कीर्तनकारों द्वारा संत वचनों की मीमांसा और भारुड गायन। आत्मिक आनंद में लीन होकर वारकरी नृत्य करते हैं।',
      mr: 'अनेक राहुट्यांमध्ये नामवंत कीर्तनकारांचे रसाळ कीर्तन, संत एकनाथांचे लोकजागृतीपर भारुड आणि भक्तीचा अखंड जागर.',
    },
    icon: '📿',
  },
];

const initialChecklist: ChecklistItem[] = [
  { id: 'pataka', name: { en: 'Saffron Pataka (Flag) & Staff', hi: 'भगवा ध्वज (पताका)', mr: 'मानाची भगवी पताका (ध्वज)' }, category: { en: 'Sacred Gear', hi: 'पवित्र सामग्री', mr: 'भक्ती साहित्य' } },
  { id: 'tulsi', name: { en: 'Tulsi Kanthi Mala & Gopichandan', hi: 'तुलसी कंठी माला व गोपीचंदन', mr: 'तुळशीची कंठी माळ व गोपीचंदन' }, category: { en: 'Sacred Gear', hi: 'पवित्र सामग्री', mr: 'भक्ती साहित्य' } },
  { id: 'taal', name: { en: 'Brass Taal (Cymbals) or Chipli', hi: 'कांस्य टाळ अथवा चिपळी', mr: 'टाळ किंवा चिपळ्या' }, category: { en: 'Sacred Gear', hi: 'पवित्र सामग्री', mr: 'भक्ती साहित्य' } },
  { id: 'dress', name: { en: '2 Sets Pure White Cotton Kurta/Dhoti or Saree', hi: 'श्वेत सूती वस्त्र (धोती/कुर्ता)', mr: '२ जोड पांढरा सुती कुर्ता-पायजमा / साडी' }, category: { en: 'Clothing', hi: 'वस्त्र', mr: 'पोशाख' } },
  { id: 'rain', name: { en: 'Lightweight Raincoat / Poncho & Umbrella', hi: 'हल्का रेनकोट अथवा छतरी', mr: 'हलका रेनकोट / छत्री (पावसापासून संरक्षणासाठी)' }, category: { en: 'Weather Protection', hi: 'मौसम सुरक्षा', mr: 'हवामान रक्षण' } },
  { id: 'bag', name: { en: 'Waterproof Backpack with Rain Cover', hi: 'वॉटरप्रूफ बैकपैक', mr: 'वॉटरप्रूफ बॅग किंवा कव्हर' }, category: { en: 'Luggage', hi: 'सामान', mr: 'सामान' } },
  { id: 'medical', name: { en: 'First Aid Kit (Band-aids, Pain Spray, ORS, Cotton)', hi: 'प्राथमिक चिकित्सा किट (पेन रिलीफ, ओआरएस)', mr: 'प्रथमोपचार किट (पायदुखी मलम, ओआरएस, बँडेज, गोळ्या)' }, category: { en: 'Health & Care', hi: 'स्वास्थ्य', mr: 'आरोग्य काळजी' } },
  { id: 'bedding', name: { en: 'Lightweight Mat, Sheet & Inflatable Pillow', hi: 'हल्की चटाई व चादर', mr: 'हलकी सतरंजी, चादर व हलके पांघरूण' }, category: { en: 'Night Stay', hi: 'विश्राम', mr: 'मुक्काम सोय' } },
  { id: 'footwear', name: { en: 'Comfortable Walking Sandals / Canvas Shoes', hi: 'आरामदायक पादुका / सैंडल', mr: 'आरामदायी सँडल्स किंवा पायी चालण्याचे पादत्राणे' }, category: { en: 'Footwear', hi: 'पादुका', mr: 'पादत्राणे' } },
  { id: 'torch', name: { en: 'LED Torch / Power Bank & Identification Card', hi: 'टॉर्च, पावर बैंक एवं पहचान पत्र', mr: 'टॉर्च, मोबाईल पॉवर बँक व आधार कार्ड' }, category: { en: 'Essentials', hi: 'आवश्यक', mr: 'महत्त्वाचे' } },
];

export const WariRouteVisualizer: React.FC<WariRouteVisualizerProps> = ({ currentLang }) => {
  const [activeRouteId, setActiveRouteId] = useState<PalkhiId>('dnyaneshwar');
  const activeRoute = activeRouteId === 'dnyaneshwar' ? dnyaneshwarPalkhiRoute : tukaramPalkhiRoute;
  const [selectedHalt, setSelectedHalt] = useState<WariHalt>(activeRoute[0]);
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'ringan' | 'snan'>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sanatan_amrutdhara_wari_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // When active route changes, reset selected halt to first stop
  useEffect(() => {
    setSelectedHalt(activeRoute[0]);
  }, [activeRouteId]);

  const handlePlayChant = (type: 'dnyanoba' | 'ramkrishna' | 'pundalik' | 'bell') => {
    if (activeAudioPlaying === type) {
      audioEngine.stopSpeaking();
      setActiveAudioPlaying(null);
      return;
    }

    audioEngine.stopSpeaking();
    setActiveAudioPlaying(type);

    if (type === 'bell') {
      audioEngine.playTempleBell();
      setTimeout(() => setActiveAudioPlaying(null), 2500);
      return;
    }

    let speechText = '';
    if (type === 'dnyanoba') {
      speechText = 'ज्ञानोबा माऊली तुकाराम, ज्ञानोबा माऊली तुकाराम!';
    } else if (type === 'ramkrishna') {
      speechText = 'राम कृष्ण हरी, जय जय राम कृष्ण हरी! राम कृष्ण हरी, जय जय राम कृष्ण हरी!';
    } else if (type === 'pundalik') {
      speechText = 'पुंडलिक वरदे हरी विठ्ठल, श्री ज्ञानदेव तुकाराम! पंढरीनाथ महाराज की जय!';
    }

    audioEngine.playTempleBell();
    audioEngine.speakText(speechText, 'mr-IN', 0.88, () => {
      setActiveAudioPlaying(null);
    });
  };

  const handleToggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('sanatan_amrutdhara_wari_checklist', JSON.stringify(updated));
      } catch {
        // quota
      }
      return updated;
    });
  };

  const handleShareHalt = () => {
    const text = `🚩 *${selectedHalt.location[currentLang] || selectedHalt.location.mr}* — मुक्काम क्र. ${selectedHalt.stopNumber} / ${activeRoute.length}\n` +
      `📍 जिल्हा: ${selectedHalt.district} | अंतर: ${selectedHalt.distanceFromStartKm} किमी\n` +
      `✨ महत्त्व: ${selectedHalt.significance[currentLang] || selectedHalt.significance.mr}\n\n` +
      (selectedHalt.ringanType !== 'none' ? `🐎 *विशेष रिंगण:* ${selectedHalt.ringanType === 'gol' ? 'पवित्र गोल रिंगण सोहळा' : 'भव्य उभे रिंगण सोहळा'}\n\n` : '') +
      `🚩 *सनातन अमृतधारा पंढरपूर वारी महामार्ग:*\nhttps://sanketmh15.github.io/mantrasetu/`;

    if (navigator.share) {
      navigator.share({ title: selectedHalt.location.mr, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(currentLang === 'en' ? 'Halt details copied to clipboard!' : 'मुक्कामाची माहिती क्लिपबोर्डवर कॉपी झाली!');
    }
  };

  const handleShareChecklist = () => {
    const totalCount = initialChecklist.length;
    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    let text = `🚩 *सनातन अमृतधारा पंढरपूर वारी पूर्वतयारी साहित्य यादी*\n` +
      `माझी तयारी: ${completedCount}/${totalCount} साहित्य पूर्ण\n\n`;

    initialChecklist.forEach((item) => {
      const isDone = !!checkedItems[item.id];
      text += `${isDone ? '✅' : '⬜'} ${item.name.mr} (${item.category.mr})\n`;
    });

    text += `\n📲 आपली वारी पूर्वतयारी सनातन अमृतधारावर तपासा: https://sanketmh15.github.io/mantrasetu/`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Distance calculations
  const totalKm = activeRoute[activeRoute.length - 1].distanceFromStartKm;
  const currentKm = selectedHalt.distanceFromStartKm;
  const remainingKm = Math.max(0, totalKm - currentKm);
  const progressPercent = Math.min(100, Math.round((currentKm / totalKm) * 100));

  const filteredHalts = activeRoute.filter((halt) => {
    if (filterType === 'ringan') return halt.ringanType !== 'none';
    if (filterType === 'snan') return halt.location.mr.includes('स्नान') || halt.location.en.toLowerCase().includes('bath');
    return true;
  });

  const currentIndex = activeRoute.findIndex((h) => h.stopNumber === selectedHalt.stopNumber);
  const handlePrevHalt = () => {
    if (currentIndex > 0) setSelectedHalt(activeRoute[currentIndex - 1]);
  };
  const handleNextHalt = () => {
    if (currentIndex < activeRoute.length - 1) setSelectedHalt(activeRoute[currentIndex + 1]);
  };

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* 1. Grand Sacred Header */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-950/90 to-saffron-950/90 border border-amber-600/50 text-amber-300 text-xs font-semibold mb-3.5 shadow-lg">
          <Footprints className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>
            {currentLang === 'en'
              ? 'World\'s Largest Annual Walking Pilgrimage • UNESCO Living Heritage'
              : currentLang === 'hi'
              ? 'विश्व की विशालतम वार्षिक पदयात्रा • ८०० वर्ष पावन परंपरा'
              : 'जगातील सर्वात मोठी वार्षिक पायी पदयात्रा • ८०० वर्षांची समता परंपरा'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serifDev text-white tracking-tight leading-tight">
          {currentLang === 'en'
            ? 'Pandharpur Wari Palkhi Marg'
            : currentLang === 'hi'
            ? 'श्री क्षेत्र पंढरपुर वारी पालखी महामार्ग दर्शन'
            : 'आषाढी वारी पालखी महामार्ग व रिंगण दर्शन'}
        </h1>
        
        <p className="text-xs sm:text-base text-stone-300 mt-2.5 max-w-3xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'Experience the sacred route to Pandharpur following Sant Dnyaneshwar Maharaj and Sant Tukaram Maharaj Palkhis through Dive Ghat, Neera Snan, and the thrilling Ringan ceremonies.'
            : currentLang === 'hi'
            ? 'आळंदी एवं देहू से पंढरपुर तक पावन पालखी मार्ग—दिवे घाट की विहंगम चढ़ाई, नीरा नदी स्नान एवं अद्भूत अश्व रिंगण समारोह।'
            : 'आळंदी व देहू ते पंढरपूर पावन पालखी मार्ग—दिवे घाटाची विहंगम चढण, नीरा स्नान आणि अंगावर रोमांच उभे करणारे अश्वाचे गोल व उभे रिंगण सोहळे.'}
        </p>

        {/* Route Selector Tabs (Dnyaneshwar vs Tukaram) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setActiveRouteId('dnyaneshwar')}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border shadow-md ${
              activeRouteId === 'dnyaneshwar'
                ? 'bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 text-white border-amber-300 shadow-amber-900/40 ring-2 ring-amber-400/30'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <span>🚩</span>
            <span>
              {currentLang === 'en'
                ? 'Sant Dnyaneshwar Maharaj Palkhi (Alandi - 255 km)'
                : 'संत ज्ञानेश्वर महाराज पालखी (आळंदी ते पंढरपूर - २५५ किमी)'}
            </span>
          </button>

          <button
            onClick={() => setActiveRouteId('tukaram')}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border shadow-md ${
              activeRouteId === 'tukaram'
                ? 'bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 text-white border-amber-300 shadow-amber-900/40 ring-2 ring-amber-400/30'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <span>🚩</span>
            <span>
              {currentLang === 'en'
                ? 'Sant Tukaram Maharaj Palkhi (Dehu - 280 km)'
                : 'जगद्गुरू संत तुकाराम महाराज पालखी (देहू ते पंढरपूर - २८० किमी)'}
            </span>
          </button>
        </div>

        {/* Audio Chants Bar */}
        <div className="mt-4 p-3 rounded-2xl bg-[#141210] border border-stone-800 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto shadow-inner">
          <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
            <Music className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Varkari Gajar:' : 'वारी गजर नाद:'}</span>
          </span>

          <button
            onClick={() => handlePlayChant('dnyanoba')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              activeAudioPlaying === 'dnyanoba'
                ? 'bg-amber-500 text-black border-amber-300 animate-pulse'
                : 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>ज्ञानोबा माऊली तुकाराम</span>
          </button>

          <button
            onClick={() => handlePlayChant('ramkrishna')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              activeAudioPlaying === 'ramkrishna'
                ? 'bg-amber-500 text-black border-amber-300 animate-pulse'
                : 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>राम कृष्ण हरी</span>
          </button>

          <button
            onClick={() => handlePlayChant('pundalik')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              activeAudioPlaying === 'pundalik'
                ? 'bg-amber-500 text-black border-amber-300 animate-pulse'
                : 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>पुंडलिक वरदे हरी विठ्ठल</span>
          </button>

          <button
            onClick={() => handlePlayChant('bell')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-800/60 hover:bg-amber-900 flex items-center gap-1.5"
            title="Play Temple Bell"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>मंदिर घंटा</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1c1815] to-[#12100e] border border-stone-800 text-center shadow-md">
          <span className="text-[11px] text-stone-400 block font-medium">{currentLang === 'en' ? 'Total Route Distance' : 'एकूण पायी अंतर'}</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5">{totalKm} km</p>
          <span className="text-[11px] text-stone-400">{activeRoute.length} {currentLang === 'en' ? 'Palkhi Halts' : 'पावन मुक्काम'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1c1815] to-[#12100e] border border-stone-800 text-center shadow-md">
          <span className="text-[11px] text-stone-400 block font-medium">{currentLang === 'en' ? 'Pilgrim Count' : 'वारकरी भाविक'}</span>
          <p className="text-xl sm:text-2xl font-bold text-saffron-400 mt-0.5">१५,००,०००+</p>
          <span className="text-[11px] text-stone-400">{currentLang === 'en' ? 'Varkari Devotees' : 'श्रद्धाळू माऊली'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1c1815] to-[#12100e] border border-stone-800 text-center shadow-md">
          <span className="text-[11px] text-stone-400 block font-medium">{currentLang === 'en' ? 'Tradition Age' : 'परंपरा वय'}</span>
          <p className="text-xl sm:text-2xl font-bold text-yellow-400 mt-0.5">८००+ वर्षे</p>
          <span className="text-[11px] text-stone-400">{currentLang === 'en' ? 'Since 13th Century' : '१३ व्या शतकापासून'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1c1815] to-[#12100e] border border-stone-800 text-center shadow-md">
          <span className="text-[11px] text-stone-400 block font-medium">{currentLang === 'en' ? 'Ringan Ceremonies' : 'रिंगण सोहळे'}</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5">
            {activeRoute.filter((h) => h.ringanType !== 'none').length} {currentLang === 'en' ? 'Grand Ringans' : 'भव्य रिंगणे'}
          </p>
          <span className="text-[11px] text-stone-400">गोल व उभे रिंगण</span>
        </div>
      </div>

      {/* 3. Live Interactive Progress Tracker */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#171513] border border-amber-900/40 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300 font-serifDev text-sm">
              {selectedHalt.location[currentLang] || selectedHalt.location.mr}
            </span>
            <span className="text-stone-400">
              (मुक्काम #{selectedHalt.stopNumber} / {activeRoute.length})
            </span>
          </div>
          <div className="flex items-center gap-3 text-stone-300 font-mono text-[11px]">
            <span>प्रस्थान: {currentKm} km</span>
            <span className="text-amber-500 font-bold">•</span>
            <span className="text-emerald-400 font-semibold">पंढरपूर बाकी: {remainingKm} km</span>
          </div>
        </div>

        {/* Progress Bar with Indicator */}
        <div className="w-full h-3 rounded-full bg-stone-900 overflow-hidden relative border border-stone-800">
          <div
            className="h-full bg-gradient-to-r from-saffron-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2">
          <span>{activeRouteId === 'dnyaneshwar' ? 'आळंदी (प्रस्थान)' : 'देहू (प्रस्थान)'} (0 km)</span>
          <span className="text-amber-300 font-bold">{progressPercent}% पंढरीची वाटचाल पूर्ण</span>
          <span>श्री क्षेत्र पंढरपूर ({totalKm} km) 🚩</span>
        </div>
      </div>

      {/* 4. Interactive Halts Stepper & Detailed Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Halts Vertical Stepper with Filter */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              {currentLang === 'en' ? `${activeRoute.length} Sacred Palkhi Halts` : `सर्व ${activeRoute.length} पावन पालखी मुक्काम`}
            </span>
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2 py-0.5 rounded-lg font-semibold transition-all ${
                  filterType === 'all' ? 'bg-amber-500 text-black' : 'bg-stone-900 text-stone-400 hover:text-white'
                }`}
              >
                सर्व
              </button>
              <button
                onClick={() => setFilterType('ringan')}
                className={`px-2 py-0.5 rounded-lg font-semibold transition-all ${
                  filterType === 'ringan' ? 'bg-amber-500 text-black' : 'bg-stone-900 text-stone-400 hover:text-white'
                }`}
              >
                🐎 रिंगण
              </button>
              <button
                onClick={() => setFilterType('snan')}
                className={`px-2 py-0.5 rounded-lg font-semibold transition-all ${
                  filterType === 'snan' ? 'bg-amber-500 text-black' : 'bg-stone-900 text-stone-400 hover:text-white'
                }`}
              >
                🌊 स्नान
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
            {filteredHalts.map((halt) => {
              const isSelected = halt.stopNumber === selectedHalt.stopNumber;
              return (
                <button
                  key={halt.stopNumber}
                  onClick={() => setSelectedHalt(halt)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-950/90 to-saffron-950/80 border-amber-500 text-white shadow-lg ring-1 ring-amber-400/30'
                      : 'bg-stone-900/60 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {halt.stopNumber}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-200">
                        {halt.location[currentLang] || halt.location.mr}
                      </h4>
                      <span className="text-[11px] text-stone-400">
                        {halt.district} • {halt.distanceFromStartKm} km
                      </span>
                    </div>
                  </div>

                  {halt.ringanType !== 'none' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-saffron-950/90 border border-saffron-700/60 text-saffron-300 shrink-0">
                      {halt.ringanType === 'gol' ? '🐎 गोल रिंगण' : '⚡ उभे रिंगण'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Halt Spotlight Card */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1e1915] via-[#151210] to-[#0d0c0a] border border-amber-800/50 shadow-2xl relative overflow-hidden">
            
            {/* Top Navigation Bar with Next / Prev */}
            <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-700/60 flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentLang === 'en'
                    ? `Stop #${selectedHalt.stopNumber} of ${activeRoute.length}`
                    : `मुक्काम क्र. ${selectedHalt.stopNumber} / ${activeRoute.length}`}
                </span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevHalt}
                  disabled={currentIndex === 0}
                  className="p-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-800"
                  title="Previous Halt"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextHalt}
                  disabled={currentIndex === activeRoute.length - 1}
                  className="p-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-800"
                  title="Next Halt"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-white mb-2">
              {selectedHalt.location[currentLang] || selectedHalt.location.mr}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-4 font-mono">
              <span className="px-2.5 py-0.5 rounded-lg bg-stone-900 border border-stone-800 text-amber-300 font-bold">
                जिल्हा: {selectedHalt.district}
              </span>
              <span>•</span>
              <span className="text-stone-300">
                {selectedHalt.distanceFromStartKm} km {currentLang === 'en' ? 'from starting point' : 'प्रस्थानापासून अंतर'}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                पंढरपूर अंतर: {remainingKm} km
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 bg-stone-950/40 p-4 rounded-2xl border border-stone-800/80">
              {selectedHalt.significance[currentLang] || selectedHalt.significance.mr}
            </p>

            {/* Special Ringan Details if applicable */}
            {selectedHalt.ringanType !== 'none' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-saffron-950/60 border border-amber-600/50 mb-6 shadow-inner">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>
                    {selectedHalt.ringanType === 'gol'
                      ? (currentLang === 'en' ? 'Sacred Gol Ringan (Circular Horse Sprint Ceremony)' : 'पवित्र गोल रिंगण सोहळा')
                      : (currentLang === 'en' ? 'Grand Ubhe Ringan (Straight Horse Sprint at Wakhari)' : 'भव्य उभे रिंगण सोहळा (वाखरी)')}
                  </span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {selectedHalt.ringanType === 'gol'
                    ? (currentLang === 'en'
                        ? 'Lakhs of Varkaris form a massive circular boundary. Sant Dnyaneshwar\'s / Sant Tukaram\'s consecrated riderless horse (Mauli\'s Ashwa) gallops at lightning speed inside the circle. Devotees take the dust touched by its hooves to their forehead as sacred prasad.'
                        : 'लाखो वारकरी शिस्तीत भव्य गोल कडे करतात. माऊलींचा स्वार नसलेला पावन अश्व विजेच्या वेगाने वर्तुळातून धाव घेतो. अश्वाच्या टापांखालील धूळ कपाळी लावण्यासाठी वारकऱ्यांची गर्दी होते. या क्षणी अवघा आसमंत टाळ-मृदंगाच्या गजराने दुमदुमतो.')
                    : (currentLang === 'en'
                        ? 'On the eve of Ashadhi Ekadashi at Wakhari, all Dindis stand in two parallel straight lines stretching for miles. The sacred horse bursts forth in a straight gallop straight towards Pandharpur amid thunderous cheers of "Dnyanoba Mauli Tukaram"!'
                        : 'वाखरीच्या मैदानात दोन्ही बाजूंना मैलोन्मैल वारकऱ्यांच्या रांगा उभ्या राहतात. माऊलींचा व तुकोबारायांचा अश्व विजेच्या वेगाने सरळ पंढरपूरच्या दिशेने धाव घेतो. अवघा आसमंत "ज्ञानोबा माऊली तुकाराम" च्या जयघोषाने दुमदुमून जातो!')}
                </p>
              </div>
            )}

            {/* Special Dive Ghat Highlight if Stop 3 in Dnyaneshwar Palkhi */}
            {activeRouteId === 'dnyaneshwar' && selectedHalt.stopNumber === 3 && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-700/40 mb-6 text-xs text-stone-200">
                <span className="font-bold text-amber-300 block mb-1 flex items-center gap-1.5">
                  <span>⛰️</span>
                  <span>दिवे घाटाची विहंगम चढण (Dive Ghat Elevation 700m):</span>
                </span>
                <p className="leading-relaxed text-stone-300">
                  हडपसर ओलांडून सासवडकडे जाताना दिवे घाटातून लाखो वारकरी जेव्हा पायी चढतात, तेव्हा घाटातील वळणावळणावर भगव्या पताकांचे अथांग महासागर पाहायला मिळते. वारीतील हे सर्वात नयनरम्य दृश्य मानले जाते.
                </p>
              </div>
            )}

            {/* Varkari Traditions & Values */}
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 mb-6">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? 'Core Varkari Values at this Halt' : 'वारकरी शिस्त व परंपरा'}</span>
              </h4>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <span className="text-saffron-400 font-bold">•</span>
                  <span>{vitthalLore.theWariTradition.varkariPrinciples[0][currentLang]}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-saffron-400 font-bold">•</span>
                  <span>{vitthalLore.theWariTradition.varkariPrinciples[1][currentLang]}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: WhatsApp Share & Google Maps Navigation */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleShareHalt}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Share Halt on WhatsApp' : 'या मुक्कामाची माहिती शेअर करा'}</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHalt.location.mr + ' ' + selectedHalt.district + ' Maharashtra')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-xs transition-all"
              >
                <ExternalLink className="w-4 h-4 text-stone-400" />
                <span>{currentLang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्स लोकेशन'}</span>
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* 5. Varkari 24-Hour Daily Schedule (वारकरी दिनक्रम) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#191613] to-[#110f0e] border border-amber-900/40 shadow-xl">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'The Spiritual Routine' : 'वारकरी नित्य दिनक्रम'}</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serifDev text-white mt-1">
            {currentLang === 'en' ? '24-Hour Daily Schedule in Wari' : 'वारीतील पावन २४ तासांचा शिस्तबद्ध दिनक्रम'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            लाखो वारकऱ्यांची वाटचाल ही कोणत्याही पोलिसांशिवाय अवघ्या जगात एकमेव अशी शिस्तबद्ध व शांततापूर्ण साधना मानली जाते.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {varkariSchedule.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800/80 hover:border-amber-600/40 transition-all space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-950 text-amber-300 font-semibold border border-stone-800">
                  {item.time}
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-100 font-serifDev">
                {item.title[currentLang] || item.title.mr}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {item.desc[currentLang] || item.desc.mr}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Varkari Yatra Preparation Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141210] border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{currentLang === 'en' ? 'Pilgrim Guide & Checklist' : 'वारी पूर्वतयारी व साहित्य मार्गदर्शक'}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-white mt-1">
              {currentLang === 'en' ? 'Varkari Yatra Kit & Health Packing List' : 'वारीला जाताना सोबत बाळगावयाचे आवश्यक साहित्य'}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              पायी वारी सुखकर होण्यासाठी वारकरी परंपरेनुसार आवश्यक गोष्टींची तपासणी करा:
            </p>
          </div>

          <button
            onClick={handleShareChecklist}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'Share List on WhatsApp' : 'व्हॉट्सॲपवर साहित्य यादी पाठवा'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {initialChecklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleToggleCheck(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isChecked
                    ? 'bg-amber-950/40 border-amber-600/60 text-white shadow-sm'
                    : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                }`}
              >
                <button
                  type="button"
                  className="shrink-0 text-amber-400"
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-600" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${isChecked ? 'line-through text-stone-400' : 'text-stone-200'}`}>
                    {item.name[currentLang] || item.name.mr}
                  </p>
                  <span className="text-[10px] text-amber-400/80 font-mono">
                    {item.category[currentLang] || item.category.mr}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

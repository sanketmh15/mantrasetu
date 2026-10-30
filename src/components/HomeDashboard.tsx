import React, { useState } from 'react';
import { Language, DeityId, ThemeMode, TextSize, AuthUser } from '../types';
import { getTodayVratGuidance } from '../data/devotionalCalendar';
import { getStoredJapaStats } from '../utils/storage';
import { DailyPujaGuide } from './DailyPujaGuide';
import { audioEngine } from '../utils/audioSynth';
import {
  Sparkles,
  Flame,
  Award,
  Sun,
  Moon,
  ChevronRight,
  User,
  Crown,
  LogOut,
  ShieldCheck,
  Compass,
  Volume2,
  Square
} from 'lucide-react';

interface HomeDashboardProps {
  currentLang: Language;
  activeDeity: DeityId;
  onSelectDeity: (deity: DeityId) => void;
  onNavigateTab: (tab: string) => void;
  onOpenGodDetail?: (godId: string) => void;
  currentTheme: ThemeMode;
  onToggleTheme: () => void;
  textSize: TextSize;
  onChangeTextSize: (size: TextSize) => void;
  currentUser?: AuthUser | null;
  onOpenAuthModal?: () => void;
  onOpenNamaste?: () => void;
  onLogout?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  currentLang,
  activeDeity,
  onSelectDeity,
  onNavigateTab,
  onOpenGodDetail,
  currentTheme,
  onToggleTheme,
  textSize,
  onChangeTextSize,
  currentUser,
  onOpenAuthModal,
  onOpenNamaste,
  onLogout,
}) => {
  const todayGuidance = getTodayVratGuidance();
  const japaStats = getStoredJapaStats();
  const [isPlayingAmitabhSample, setIsPlayingAmitabhSample] = useState(false);

  const handleToggleAmitabhSample = () => {
    if (isPlayingAmitabhSample) {
      audioEngine.stopSpeaking();
      setIsPlayingAmitabhSample(false);
    } else {
      audioEngine.stopSpeaking();
      setIsPlayingAmitabhSample(true);
      audioEngine.playTempleBell();
      audioEngine.playHumanAudio('/audio/amitabh_sample.mp3', () => {
        setIsPlayingAmitabhSample(false);
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return currentLang === 'en' ? 'Good Morning (Shubh Prabhat)' : currentLang === 'hi' ? 'शुभ प्रभात' : 'शुभ सकाळ';
    } else if (hour < 17) {
      return currentLang === 'en' ? 'Good Afternoon (Shubh Dupahar)' : currentLang === 'hi' ? 'शुभ दोपहर' : 'शुभ दुपार';
    } else {
      return currentLang === 'en' ? 'Good Evening (Shubh Sandhya)' : currentLang === 'hi' ? 'शुभ संध्या' : 'शुभ सांज';
    }
  };

  const deitiesList = [
    {
      id: 'hanuman' as DeityId,
      name: { en: 'Shri Hanuman', hi: 'श्री हनुमान', mr: 'श्री मारुती / हनुमान' },
      tagline: { en: 'Courage, Protection & Strength', hi: 'बल, बुद्धि एवं भयमुक्ति', mr: 'बळ, बुद्धी व संकटमुक्ती' },
      symbol: '🚩',
      color: 'from-orange-500 to-amber-600',
      badge: { en: 'Phase 1 Core', hi: 'संकटमोचन', mr: 'संकटमोचन' },
      routeTab: 'god-detail',
    },
    {
      id: 'ganesha' as DeityId,
      name: { en: 'Shri Ganesha', hi: 'श्री गणेश', mr: 'श्री गणेश' },
      tagline: { en: 'Wisdom, New Beginnings & Ashtavinayak', hi: 'बुद्धि, प्रथम पूज्य व अष्टविनायक', mr: 'बुद्धी, मंगलकार्याची सुरुवात व अष्टविनायक' },
      symbol: '🐘',
      color: 'from-amber-500 to-yellow-600',
      badge: { en: 'Phase 2 Ashtavinayak', hi: 'विघ्नहर्ता', mr: 'विघ्नहर्ता' },
      routeTab: 'god-detail',
    },
    {
      id: 'shiva' as DeityId,
      name: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'श्री महादेव' },
      tagline: { en: 'Inner Peace, Healing & 5 Jyotirlingas', hi: 'महामृत्युंजय एवं ५ ज्योतिर्लिंग', mr: 'महामृत्युंजय, शांती व ५ ज्योतिर्लिंगे' },
      symbol: '🕉️',
      color: 'from-blue-600 to-indigo-700',
      badge: { en: '5 Jyotirlingas', hi: 'भोलेनाथ', mr: 'महाकाल' },
      routeTab: 'god-detail',
    },
    {
      id: 'vitthal' as DeityId,
      name: { en: 'Lord Vitthal-Rakhumai', hi: 'श्री विठ्ठल-रखुमाई', mr: 'श्री विठ्ठल-रखुमाई' },
      tagline: { en: 'Devotion, Pandharpur Wari & Saints', hi: 'प्रेमभक्ति, आषाढी वारी व संत परम्परा', mr: 'प्रेमभक्ती, आषाढी वारी व संत परंपरा' },
      symbol: '🪷',
      color: 'from-yellow-500 to-amber-600',
      badge: { en: 'Wari Tradition', hi: 'विठू माऊली', mr: 'विठू माऊली' },
      routeTab: 'god-detail',
    },
  ];

  const userInterestCards = [
    {
      id: 'deities',
      title: { en: 'Unified 50 Deities Sanctuary', hi: 'समस्त ५० पावन देवी-देवता दर्शन', mr: 'सर्व ५० पावन देव-देवता दर्शन' },
      description: {
        en: 'Serial-wise sacred directory of 50 deities with dedicated 108 japa malas, holy shrines, lore, and welcome greetings.',
        hi: 'गणेश, शिव, विष्णु, कुलदैवत से लेकर ५० देवताओं का क्रमानुसार दर्शन एवं जपमाला।',
        mr: 'गणेश, महादेव, विठ्ठल, खंडेराया, तुळजाभवानी ते सर्व ५० देवतांचे अनुक्रमे दर्शन व १०८ जपमाळ.',
      },
      icon: '🕉️',
      badge: { en: '50 Deities Portal', hi: '५० देवता', mr: 'सर्व ५० देव-देवता' },
      tab: 'deities',
    },
    {
      id: 'japa',
      title: { en: '108 Japa Mala Counter', hi: '१०८ जप माला साधना', mr: '१०८ नामस्मरण जपमाळ' },
      description: {
        en: 'Mindful digital counting with authentic Tanpura drone, gentle haptics, and brass temple bell.',
        hi: 'तानपुरा ध्वनि एवं मंगल घंटा नाद के साथ १०८ मन्त्र जप साधना।',
        mr: 'तानपुऱ्याच्या शांत नादात, मण्यांच्या स्पर्शाने व मंगल घंटा नादाने १०८ नामस्मरण.',
      },
      icon: '📿',
      badge: { en: 'Chant With Me', hi: 'अखंड नामस्मरण', mr: 'अखंड नामस्मरण' },
      tab: 'japa',
    },
    {
      id: 'chalisa',
      title: { en: 'Hanuman Chalisa & Holy Stotras', hi: 'हनुमान चालीसा व स्तोत्र पाठ', mr: 'चालीसा, स्तोत्रे व ग्रंथ वाचन' },
      description: {
        en: 'Verse-by-verse devotional reading with word-by-word meanings and audio recitation.',
        hi: 'अर्थ, भावार्थ एवं शुद्ध उच्चारण सहित चालीसा एवं स्तोत्र वाचन।',
        mr: 'प्रत्येक ओवीचा सुलभ अर्थ, भावार्थ आणि ऑडिओ उच्चारणासह वाचन.',
      },
      icon: '📖',
      badge: { en: 'Scriptures', hi: 'पवित्र ग्रंथ', mr: 'पवित्र ग्रंथ' },
      tab: activeDeity === 'hanuman' ? 'chalisa' : activeDeity === 'ganesha' ? 'ashtavinayak' : activeDeity === 'shiva' ? 'jyotirlinga' : 'wari',
    },
    {
      id: 'pilgrimage',
      title: { en: 'Plan My Pilgrimage', hi: 'तीर्थयात्रा नियोजन', mr: 'पावन तीर्थयात्रा नियोजन' },
      description: {
        en: 'Day-by-day optimal driving itineraries for 5 Jyotirlingas, Ashtavinayak, and 3.5 Shaktipeeths with Google Maps.',
        hi: '५ ज्योतिर्लिंग, अष्टविनायक व साडेतीन शक्तिपीठ यात्रा हेतु सुगम मार्ग एवं दर्शन सलाह।',
        mr: '५ ज्योतिर्लिंगे, अष्टविनायक व साडेतीन शक्तिपीठे यात्रेचे दिवसानिहाय नियोजन व गुगल मॅप्स.',
      },
      icon: '🧭',
      badge: { en: 'Route Engine', hi: 'तीर्थ मार्गदर्शक', mr: 'तीर्थ मार्गदर्शक' },
      tab: 'pilgrimage',
    },
    {
      id: 'calendar',
      title: { en: 'Devotional Calendar & Panchang', hi: 'दिनदर्शिका एवं पावन पंचांग', mr: 'पावन दिनदर्शिका व पंचांग' },
      description: {
        en: 'Today\'s ruling deity, Ekadashi, Pradosh, Sankashti, and major Maharashtra festivals with fasting rules.',
        hi: 'दैनिक वार-उपासना, एकादशी, प्रदोष, संकष्टी एवं व्रत नियम।',
        mr: 'आजचे वार-दैवत, एकादशी, प्रदोष, संकष्टी व सण-उत्सवांचे शास्त्रोक्त नियम.',
      },
      icon: '📅',
      badge: { en: 'Tithi & Vrat', hi: 'पर्व व तिथी', mr: 'पर्व व तिथी' },
      tab: 'calendar',
    },
    {
      id: 'maharashtra',
      title: { en: 'Maharashtra 36-District Temples', hi: 'महाराष्ट्र ३६ जिले देवस्थान दर्शन', mr: 'महाराष्ट्र ३६ जिल्हे देवस्थान दर्शन' },
      description: {
        en: 'Explore historic temples, Gramdevatas, and Kuldaivats across Konkan, Paschim, Khandesh, Marathwada & Vidarbha.',
        hi: 'महाराष्ट्र के ३६ जिलों के प्रसिद्ध मंदिर, कुलदैवत एवं ग्रामदेवता सूची।',
        mr: 'महाराष्ट्रातील सर्व ३६ जिल्ह्यांतील मंदिरे, ग्रामदेवता व कुलदैवतांची सविस्तर माहिती.',
      },
      icon: '🗺️',
      badge: { en: '36 Districts', hi: 'संपूर्ण महाराष्ट्र', mr: 'संपूर्ण महाराष्ट्र' },
      tab: 'maharashtra',
    },
    {
      id: 'worship',
      title: { en: 'Daily Puja Vidhi & Aartis', hi: 'नित्य देवपूजा विधि एवं आरती', mr: 'नित्य देवपूजा विधी व आरत्या' },
      description: {
        en: 'Authentic guidance for Panchopachara home worship, deep-jyoti lighting, and traditional aarti collection.',
        hi: 'घर पर नित्य पंचोपचार पूजा विधि, दीप प्रज्वलन मन्त्र एवं संपूर्ण आरती संग्रह।',
        mr: 'घरातील नित्य पंचोपचार पूजा, दिवा लावण्याचा मंत्र आणि सर्व देवी-देवतांच्या आरत्या.',
      },
      icon: '🪔',
      badge: { en: 'Puja Guide', hi: 'पूजा विधी', mr: 'पूजा विधी' },
      tab: 'worship',
    },
    {
      id: 'kumbh',
      title: { en: 'Simhastha Kumbh Mela', hi: 'नाशिक-त्र्यंबकेश्वर सिंहस्थ कुम्भ', mr: 'नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा' },
      description: {
        en: 'Shahi Snan dates, 13 Akharas, holy Godavari ghats, and Virtual Snan Sankalpa for home prayer.',
        hi: 'शाही स्नान तिथियां, १३ पावन अखाड़े, गोदावरी कुण्ड एवं घर बैठे अमृत स्नान संकल्प।',
        mr: 'शाही स्नान तिथी, १३ पावन आखाडे, कुशावर्त व रामकुंड दर्शन आणि घरबसल्या अमृत स्नान संकल्प.',
      },
      icon: '🔱',
      badge: { en: 'Simhastha Kumbh', hi: 'अमृत पर्व', mr: 'अमृत पर्व' },
      tab: 'kumbh',
    },
    {
      id: 'puja',
      title: { en: 'Interactive Virtual E-Puja & Aarti Sanctum', hi: 'डिजिटल ई-पूजा एवं आरती गाभारा', mr: 'डिजिटल ई-पूजा व आरती गाभारा' },
      description: {
        en: 'Circular wave aarti deepak, ring brass temple bell, shower flower petals, apply chandan tilak, blow shankhanaad, and Big B aarti.',
        hi: 'आरती थाली घुमाएं, घंटी व शंख बजाएं, पुष्प वर्षा, तिलक अर्पण एवं बच्चन जी की आरती।',
        mr: 'आरतीची थाळी फिरवा, घंटा व शंखनाद करा, फुलांची उधळण, चंदन टिळा, मोदक नैवेद्य व महानायक अमिताभ बच्चन यांच्या आवाजातील आरती.',
      },
      icon: '🪔',
      badge: { en: 'Feature 1 • E-Puja', hi: 'ई-पूजा', mr: '🪔 प्रत्यक्ष ई-पूजा' },
      tab: 'puja',
    },
    {
      id: 'choghadiya',
      title: { en: 'Live Vedic Choghadiya & Rahu Kaal', hi: 'प्रत्यक्ष वैदिक चौघड़िया एवं राहुकाल', mr: 'आजचे प्रत्यक्ष चौघडिया व राहुकाळ' },
      description: {
        en: 'Real-time Vedic clock with active Amrit/Shubh slots, remaining minutes countdown, Rahu Kaal live alert, and Brahma Muhurta.',
        hi: 'वर्तमान में सक्रिय अमृत/शुभ मुहूर्त, राहुकाल चेतावनी, शेष समय एवं दिन-रात्रि चौघड़िया।',
        mr: 'सध्या चालू असलेले अमृत/शुभ/लाभ चौघडिया, शिल्लक मिनिटांची उलटी गणना, राहुकाळ थेट इशारा व ब्रह्म मुहूर्त.',
      },
      icon: '⏰',
      badge: { en: 'Feature 3 • Real-Time Clock', hi: 'मुहूर्त घड़ी', mr: '⏰ थेट चौघडिया' },
      tab: 'choghadiya',
    },
    {
      id: 'meditation',
      title: { en: '24x7 Bhakti Sounds & Sleep Timer', hi: 'अखंड ध्यान ध्वनियां एवं स्लीप टाइमर', mr: 'अखंड भक्ती ध्यान नाद व स्लीप टाइमर' },
      description: {
        en: '136.1 Hz Cosmic Om resonance, holy Chandrabhaga stream, temple bells, and 4-7-8 Pranayama breathing circle with gentle fade-out.',
        hi: '१३६.१ हर्ट्ज़ ॐ ध्वनि, चंद्रभागा का शांत जल, मंदिर घंटियां एवं गहरी नींद के लिए स्लीप टाइमर।',
        mr: '१३६.१ Hz ओंकार वैश्विक नाद, चंद्रभागेचा पावन प्रवाह, मंदिर घंटा व ४-७-८ प्राणायाम रिंगसह ६० सेकंद फेड-आउट स्लीप टाइमर.',
      },
      icon: '🎧',
      badge: { en: 'Feature 5 • Sleep Sanctuary', hi: 'शांत निद्रा', mr: '🎧 ध्यान व निद्रा' },
      tab: 'meditation',
    },
    {
      id: 'status-card',
      title: { en: '1-Click WhatsApp Status Card Generator', hi: 'व्हाट्सएप स्टेटस एवं सुविचार कार्ड', mr: '१-क्लिक व्हॉट्सॲप स्टेटस व सुविचार कार्ड' },
      description: {
        en: '9:16 vertical story cards with today’s tithi, presiding deity, Sant Tukaram-Dnyaneshwar quotes, your name, and direct 1-tap WhatsApp sharing.',
        hi: 'आज का वार, देवता, संत विचार और अपने नाम के साथ ९:१६ व्हाट्सएप स्टेटस कार्ड बनाएं।',
        mr: 'आजचा वार, आराध्य देवता, संत ज्ञानेश्वर-तुकारामांचे विचार व आपल्या नावासह ९:१६ व्हॉट्सॲप स्टेटस कार्ड बनवा व पाठवा.',
      },
      icon: '📲',
      badge: { en: 'Feature 6 • 1-Click Share', hi: 'स्टेटस कार्ड', mr: '📲 व्हॉट्सॲप स्टेटस' },
      tab: 'status-card',
    },
    {
      id: 'nearby-temples',
      title: { en: 'Nearby Ancient Temples GPS Navigator', hi: 'समीपवर्ती प्राचीन मंदिर एवं GPS मार्गदर्शक', mr: 'जवळची प्राचीन तीर्थक्षेत्रे व GPS वाटाड्या' },
      description: {
        en: 'Automatic distance calculation to 12+ historic shrines, Hemadpanthi architecture era, aarti schedules, wheelchair access, and Google Maps.',
        hi: 'निकटतम प्राचीन मंदिर दूरी, आरती समय, वरिष्ठ नागरिक व्हीलचेयर सुविधा एवं गूगल मैप्स।',
        mr: 'आपल्यापासून अचूक अंतर (किमी), हेमाडपंथी शिल्पशैली, नित्य आरत्या, व्हिलचेअर सुविधा व थेट गुगल मॅप्स मार्ग.',
      },
      icon: '🧭',
      badge: { en: 'Feature 7 • GPS Radar', hi: 'तीर्थ रडार', mr: '🧭 तीर्थ GPS वाटाड्या' },
      tab: 'nearby-temples',
    },
    {
      id: 'satvik',
      title: { en: 'Satvik Prasad Recipes & Fasting Diet Guide', hi: 'सात्विक प्रसाद पाक विधि एवं व्रत आहार', mr: 'सात्विक प्रसाद पाककृती व उपवास नियमावली' },
      description: {
        en: 'Authentic Ukadiche Modak, Satyanarayan Sheera, Ekadashi Bhagar & Amti recipes with Ayurvedic fasting rules (allowed vs prohibited).',
        hi: '२१ कणियों के उकडीचे मोदक, सत्यनारायण शीरा, एकादशी भगर एवं व्रत में क्या खाएं और क्या न खाएं।',
        mr: '२१ कळ्यांचे उकडीचे मोदक, सत्यनारायणाचा प्रसादाचा शिरा, एकादशी भगर-आमटी व उपवासाला काय खावे/टाळावे याचे शास्त्र.',
      },
      icon: '🍲',
      badge: { en: 'Feature 9 • Ayurvedic Guide', hi: 'व्रत आहार', mr: '🍲 सात्विक पाककृती' },
      tab: 'satvik',
    },
    {
      id: 'checklist',
      title: { en: 'Puja Shopping Checklist & Grocer List', hi: 'पूजा सामग्री खरीदारी सूची', mr: 'पूजा साहित्य खरेदी यादी व व्हॉट्सॲप' },
      description: {
        en: 'Interactive checkable list for Satyanarayan, Ganesh Chaturthi & Rudrabhishek with 1-click WhatsApp grocer sharing.',
        hi: 'सत्यनारायण, गणेश चतुर्थी व रुद्राभिषेक पूजा सामग्री की सूची; दुकानदारों को सीधे व्हाट्सएप पर भेजें।',
        mr: 'सत्यनारायण, गणेश प्राणप्रतिष्ठा व रुद्राभिषेकाचे संपूर्ण साहित्य; दुकानात जाताना टिक करा व १-क्लिकमध्ये व्हॉट्सॲपवर पाठवा.',
      },
      icon: '🛒',
      badge: { en: 'Shopping Checklist', hi: 'सामग्री सूची', mr: '🛒 खरेदी यादी' },
      tab: 'checklist',
    },
    {
      id: 'festival-prep',
      title: { en: 'Festival Preparation & Observance Guide', hi: 'सण-त्योहार पूर्व तैयारी एवं पूजन विधि', mr: 'सण-उत्सव पूर्वतयारी व विधी वाटाड्या' },
      description: {
        en: 'Step-by-step guidance on what to prepare at home 1 day prior, what items to take to the temple, and traditional naivedya.',
        hi: 'सण के पूर्व घर पर क्या तैयार रखें, मंदिर में क्या ले जाएं और पारंपरिक नैवेद्य भोग।',
        mr: 'सणाच्या आदल्या दिवशी घरात काय तयारी करावी, मंदिरात काय सोबत न्यावे आणि उत्सव शास्त्रोक्त कसा साजरा करावा.',
      },
      icon: '✨',
      badge: { en: 'Festival Companion', hi: 'त्योहार तैयारी', mr: '✨ सण पूर्वतयारी' },
      tab: 'festival-prep',
    },
    {
      id: 'vrat',
      title: { en: 'Vrat Guide: Sankalpa, Vidhi & Parana', hi: 'शास्त्रोक्त व्रत, संकल्प एवं पारणा समय', mr: 'शास्त्रोक्त व्रत, संकल्प व पारणा विधी' },
      description: {
        en: 'Nirjala vs Phalahari fasting rules, audio Vedic Sankalpa mantra, and exact city-wise Parana breaking time.',
        hi: 'एकादशी, प्रदोष एवं संकष्टी व्रत के नियम, ऑडियो संकल्प मन्त्र एवं पारणा का सही समय।',
        mr: 'एकादशी, प्रदोष व संकष्टीचे शास्त्रोक्त नियम, ऑडिओ संकल्प मंत्र आणि पारणा (उपवास सोडण्याचा) अचूक मुहूर्त.',
      },
      icon: '🛡️',
      badge: { en: 'Vrat Science', hi: 'व्रत विज्ञान', mr: '🛡️ व्रत विधी' },
      tab: 'vrat',
    },
    {
      id: 'library',
      title: { en: 'Personal Devotional Library & Offline Vault', hi: 'व्यक्तिगत भक्ति पुस्तकालय एवं ऑफलाइन संग्रह', mr: 'माझे भक्ती दालन व ऑफलाइन संग्रह' },
      description: {
        en: 'Save your favorite mantras, stotras, temples, and aartis with 1-click heart icon. Fully readable offline without internet.',
        hi: 'अपने प्रिय मन्त्र, चालीसा, आरती व मंदिरों को सुरक्षित रखें। इंटरनेट के बिना भी ऑफलाइन उपलब्ध।',
        mr: 'आपले आवडते मंत्र, स्तोत्रे, मंदिरे व आरत्या १-क्लिकमध्ये जतन करा. तीर्थक्षेत्रात इंटरनेट नसतानाही ऑफलाइन उपलब्ध.',
      },
      icon: '❤️',
      badge: { en: 'Offline Vault', hi: 'ऑफलाइन लाइब्रेरी', mr: '❤️ माझे ग्रंथालय' },
      tab: 'library',
    },
    {
      id: 'temple-3d',
      title: { en: '3D Temple Explorer & Virtual Sanctum', hi: '3D मन्दिर दर्शन एवं वास्तुकला', mr: 'त्रिमितीय ३D मंदिर दर्शन व वास्तुकला' },
      description: {
        en: 'Interactive 360° rotation and zoom of ancient stone temples (Trimbakeshwar, Kailasa, Pandharpur) with architectural zone audio tours.',
        hi: 'त्र्यंबकेश्वर, कैलास एवं पंढरपुर मंदिरों का ३६०° ३डी दर्शन, गर्भगृह व शिखर वास्तुकला का परिचय।',
        mr: 'त्र्यंबकेश्वर, वेरुळचे कैलास व पंढरपूर मंदिरांचे ३६०° फिरवून ३D दर्शन, गर्भगृह, शिखर व सभामंडपाची वास्तुकला माहिती.',
      },
      icon: '🏛️',
      badge: { en: '3D Virtual Tour', hi: '3D मन्दिर', mr: '🏛️ ३D दर्शन' },
      tab: 'temple-3d',
    },
    {
      id: 'wallpaper',
      title: { en: 'Devotional Wallpaper & Status Creator', hi: 'भक्ति वॉलपेपर एवं डीपी क्रिएटर', mr: 'भक्ती वॉलपेपर, स्टेटस व डीपी स्टुडिओ' },
      description: {
        en: 'Generate ultra-HD 4K mobile and desktop wallpapers with sacred deity art, Sanskrit shlokas, and custom devotee name.',
        hi: '४K गुणवत्ता में भगवान के वॉलपेपर, संस्कृत श्लोक एवं अपने नाम के साथ एक क्लिक में डाउनलोड करें।',
        mr: 'आपल्या लाडक्या देवतेचे 4K मोबाईल वॉलपेपर, पवित्र संस्कृत श्लोक व स्वतःचे नाव टाकून १-क्लिकमध्ये मोफत डाऊनलोड करा.',
      },
      icon: '🖼️',
      badge: { en: 'HD Wallpaper Studio', hi: 'वॉलपेपर', mr: '🖼️ वॉलपेपर स्टुडिओ' },
      tab: 'wallpaper',
    },
    {
      id: 'scanner',
      title: { en: 'Shloka Scanner & Instant Translation', hi: 'श्लोक स्कैनर: फोटो से पहचान एवं अर्थ', mr: 'कॅमेरा श्लोक स्कॅनर व शुद्ध उच्चार' },
      description: {
        en: 'Upload or photograph any shloka to instantly detect Sanskrit text, Roman transliteration, word-by-word meaning, and voice recitation.',
        hi: 'श्लोक का फोटो लें या अपलोड करें; मूल पाठ, आईएस्टी, अर्थ, स्रोत ग्रन्थ एवं शुद्ध उच्चारण प्राप्त करें।',
        mr: 'कोणत्याही पुस्तकातील श्लोकाचा फोटो काढा किंवा पेस्ट करा; त्याचा ग्रंथ संदर्भ, मराठी भावार्थ व शुद्ध उच्चार ऐका.',
      },
      icon: '📷',
      badge: { en: 'Shloka OCR Scanner', hi: 'श्लोक स्कैनर', mr: '📷 श्लोक स्कॅनर' },
      tab: 'scanner',
    },
    {
      id: 'digital-library',
      title: { en: 'Digital Scriptures Library (Granthalaya)', hi: 'डिजिटल ग्रन्थालय: ज्ञानेश्वरी, दासबोध व गाथा', mr: 'डिजिटल ग्रंथालय: ज्ञानेश्वरी, दासबोध व गाथा' },
      description: {
        en: 'Explore authorized texts of Dnyaneshwari, Dasbodh, Tukaram Gatha, and Bhagavad Gita with audio recitation and multilingual meanings.',
        hi: 'ज्ञानेश्वरी, दासबोध, तुकाराम गाथा एवं भगवद्गीता के प्रामाणिक श्लोक, ओवियाँ, सरल अनुवाद एवं दिव्य स्वर श्रवण।',
        mr: 'ज्ञानेश्वरी, ग्रंथराज दासबोध, तुकाराम गाथा व श्रीमद्भगवद्गीता यांचे प्रामाणिक मूळ चरण, सविस्तर भावार्थ व ऑडिओ श्रवण.',
      },
      icon: '📜',
      badge: { en: 'Authorized Scriptures', hi: 'संत साहित्य', mr: '📜 संत साहित्य' },
      tab: 'digital-library',
    },
    {
      id: 'stories',
      title: { en: 'Stories for Children: Bal Sanskar', hi: 'बाल संस्कार: रोचक कहानियाँ एवं क्विज', mr: 'मुलांसाठी संस्कार बोधकथा व बाल क्विज' },
      description: {
        en: 'Illustrated stories of Bal Ganesha, Bhakta Pundalik, and Young Hanuman with moral lessons, grandparents audio mode, and fun activities.',
        hi: 'बच्चों के लिए बाल गणेश, पुंडलिक व हनुमान जी की प्रेरणादायक कहानियाँ, प्रश्नमंच एवं दैनिक सुसंस्कार।',
        mr: 'बाल गणपती, भक्त पुंडलिक व मारुतीरायांच्या गोष्टी, संस्कार बोध, आजी-आजोबा ऑडिओ आणि मजेदार बाल प्रश्नमंजुषा.',
      },
      icon: '🧒',
      badge: { en: 'Bal Sanskar', hi: 'बाल संस्कार', mr: '🧒 बाल संस्कार' },
      tab: 'stories',
    },
    {
      id: 'symbolism',
      title: { en: 'Deity Symbolism: Weapons, Vahanas & Mudras', hi: 'देवता प्रतीक मीमांसा: अस्त्र, वाहन व मुद्रा', mr: 'देवता प्रतीक मीमांसा: अस्त्रे, वाहने व मुद्रा' },
      description: {
        en: 'Understand why Shiva holds Trishula & Damaru, the power of Sudarshana Chakra, Nandi Bull, and cosmic Nataraja dance form.',
        hi: 'त्रिशूल, सुदर्शन चक्र, नन्दी एवं नटराज स्वरूप का वैज्ञानिक, दार्शनिक एवं आध्यात्मिक रहस्य जानें।',
        mr: 'त्रिशूळ, सुदर्शन चक्र, नंदी, डमरू, अभय मुद्रा आणि नटराजांच्या तांडव स्वरूपामागील गूढ अध्यात्म रहस्य.',
      },
      icon: '🔱',
      badge: { en: 'Esoteric Wisdom', hi: 'प्रतीक रहस्य', mr: '🔱 प्रतीक रहस्य' },
      tab: 'symbolism',
    },
    {
      id: 'live-darshan',
      title: { en: '24x7 Official Live Temple Darshan', hi: 'सीधा मन्दिर दर्शन: सिद्धिविनायक, शिर्डी व पंढरपुर', mr: 'थेट मंदिर दर्शन: सिद्धिविनायक, शिर्डी व पंढरपूर' },
      description: {
        en: 'Watch official live streams authorized by respected temple trusts, daily Kakad/Shej Aarti schedules, and offer virtual namaskar.',
        hi: 'सिद्धिविनायक, साईबाबा, विठ्ठल-रुक्मिणी एवं कोल्हापुर अम्बाबाबू का आधिकारिक लाइव दर्शन व आरती समय।',
        mr: 'सिद्धिविनायक, शिर्डी साईबाबा, पंढरपूरचे विठ्ठल-रुक्मिणी व कोल्हापूर अंबाबाईंचे अधिकृत थेट दर्शन व आरती वेळापत्रक.',
      },
      icon: '🔴',
      badge: { en: 'Official Live Stream', hi: 'सीधा दर्शन', mr: '🔴 थेट दर्शन' },
      tab: 'live-darshan',
    },
    {
      id: 'rashi',
      title: { en: 'Janma Rashi, Ishta Devata & Beej Mantra', hi: 'जन्मराशि, इष्टदेवता एवं सिद्ध बीजमंत्र', mr: 'जन्मरास, इष्टदेवता व सिद्ध बीजमंत्र' },
      description: {
        en: 'Discover your ruling planet, presiding deity, lucky color, and personal Vedic Beej Mantra according to your zodiac sign.',
        hi: 'अपनी राशि के अनुसार स्वामी ग्रह, इष्टदेव, शुभ रंग और सिद्ध बीजमंत्र जानें एवं १०८ जप साधना करें।',
        mr: 'आपल्या १२ राशींनुसार आराध्य दैवत, राशी स्वामी, शुभ रंग व सिद्ध बीजमंत्र शोधा आणि १-क्लिकमध्ये १०८ जपमाळ सुरू करा.',
      },
      icon: '♈',
      badge: { en: 'Vedic Rashi Guide', hi: 'राशि मन्त्र', mr: '♈ राशी व इष्टदेवता' },
      tab: 'rashi',
    },
    {
      id: 'bhajan',
      title: { en: 'Sant Bhajan, Bhupali & Abhang Hub', hi: 'संत भजन, प्रभात भूपाळी एवं अभंग', mr: 'संत ज्ञानेश्वर-तुकाराम भजन व भूपाळी प्लेअर' },
      description: {
        en: 'Listen to dawn Bhupali (Ghanashyama Sundara), immortal Vitthal Abhangas, and Datta chants with Tanpura drone accompaniment.',
        hi: 'प्रभात की पावन भूपाळी, संत तुकाराम जी के अमर अभंग और तानपुरा नाद के साथ शांत ध्यान का आनंद लें।',
        mr: 'पहाटेची अमृत भूपाळी घनश्याम सुंदरा, रूप पाहता लोचनी, कानडा राजा पंढरीचा व तानपुरा नादासह संतवाणीचे शांत श्रवण.',
      },
      icon: '🎵',
      badge: { en: 'Bhajan & Bhupali', hi: 'संत वाणी', mr: '🎵 भजन व भूपाळी' },
      tab: 'bhajan',
    },
    {
      id: 'reminders',
      title: { en: 'Daily Suprabhatam & Aarti Notification Alarm', hi: 'दैनिक सुप्रभातम एवं आरती स्मरण अलार्म', mr: 'दैनिक सुप्रभातम व महाआरती स्मरण' },
      description: {
        en: 'Receive automated notifications on your phone for Brahma Muhurta (5:30 AM), auspicious Choghadiya (8:00 AM), and evening Aarti (7:00 PM).',
        hi: 'ब्रह्म मुहूर्त, दैनिक अमृत चौघड़िया एवं सायंकाल महाआरती के समय अपने फोन पर स्वचालित पावन स्मरण प्राप्त करें।',
        mr: 'पहाटे ५:३० ब्रह्म मुहूर्त, सकाळी ८:०० अमृत चौघडिया आणि संध्याकाळी ७:०० महाआरतीची आपल्या मोबाईलवर आपोआप सूचना.',
      },
      icon: '🔔',
      badge: { en: 'Daily Alarm', hi: 'दैनिक स्मरण', mr: '🔔 दैनिक स्मरण' },
      tab: 'reminders',
    },
  ];

  return (
    <div className="py-3 sm:py-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
      
      {/* 1. Welcoming Top Greeting & Senior Citizen Accessibility Bar */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/10 via-saffron-500/10 to-amber-500/10 border border-amber-600/30 shadow-lg mb-6 sm:mb-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🙏</span>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
                {getGreeting()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white">
              {currentLang === 'en'
                ? 'Welcome to MantraSetu'
                : currentLang === 'hi'
                ? 'मन्त्रसेतु डिजिटल भक्तीपीठ'
                : 'मंत्रसेतू डिजिटल भक्तीपीठामध्ये आपले स्वागत'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {currentLang === 'en'
                ? 'Your peaceful, non-commercial digital companion for authentic mantras, 108 japa, pilgrimage routes, and Maharashtra\'s sacred traditions.'
                : currentLang === 'hi'
                ? 'प्रामाणिक मन्त्र, १०८ जप, तीर्थयात्रा नियोजन एवं महाराष्ट्र देवस्थान दर्शन हेतु आपका पावन डिजिटल साथी।'
                : 'प्रामाणिक मंत्र, १०८ नामस्मरण जपमाळ, तीर्थयात्रा नियोजन व महाराष्ट्र देवस्थान दर्शनासाठी आपली हक्काची डिजिटल जागा.'}
            </p>
          </div>

          {/* Quick Senior Citizen Tools: Light/Dark Mode & Large Text */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto bg-stone-100 dark:bg-stone-900 p-2 rounded-2xl border border-stone-200 dark:border-stone-800">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-sm border border-stone-200 dark:border-stone-700 hover:border-amber-500"
              title="Toggle Light / Dark Mode"
            >
              {currentTheme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentLang === 'en' ? 'Light Mode' : 'प्रकाशमय'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{currentLang === 'en' ? 'Dark Mode' : 'रात्री'}</span>
                </>
              )}
            </button>

            {/* Namaste Greeting Video Trigger */}
            {onOpenNamaste && (
              <button
                onClick={onOpenNamaste}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-amber-500/20 to-saffron-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/50 hover:bg-amber-500/30 shadow-sm active:scale-95"
                title={currentLang === 'en' ? 'Watch Namaste Greeting Video' : 'पावन नमस्ते स्वागत पहा'}
              >
                <span>🙏</span>
                <span className="font-serifDev">{currentLang === 'en' ? 'Namaste' : 'पावन नमस्ते'}</span>
              </button>
            )}

            {/* Font Size Toggle for Elders */}
            <div className="flex items-center bg-stone-200 dark:bg-stone-950 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => onChangeTextSize('normal')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  textSize === 'normal'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Standard Text Size"
              >
                अ
              </button>
              <button
                onClick={() => onChangeTextSize('large')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  textSize === 'large'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Large Text for Seniors"
              >
                अ+
              </button>
              <button
                onClick={() => onChangeTextSize('xlarge')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  textSize === 'xlarge'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Extra Large Text for Seniors"
              >
                अ++
              </button>
            </div>
          </div>

        </div>

        {/* Today's Auspicious Muhurat Spotlight */}
        <div className="mt-5 pt-4 border-t border-amber-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {currentLang === 'en' ? 'Today\'s Auspicious Deity:' : 'आजचे वार-दैवत:'}
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-300">
              {todayGuidance.name[currentLang]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('worship')}
              className="text-saffron-600 dark:text-saffron-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{currentLang === 'en' ? 'View Day-Wise Puja Guide' : 'वारानुसार पूजा मार्गदर्शिका पहा'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 1.25. Legendary Amitabh Bachchan Devotional Voiceover Showcase */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/80 to-stone-900 border border-amber-500/50 shadow-xl mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 text-white w-full">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-saffron-500 flex items-center justify-center text-2xl shadow-lg ring-2 ring-amber-300/40 shrink-0">
            🎙️
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm sm:text-base font-bold font-serifDev text-amber-300">
                {currentLang === 'en'
                  ? 'Legendary Amitabh Bachchan Devotional Voice'
                  : '॥ महानायक अमिताभ बच्चन यांच्या भारदस्त आवाजातील पावन गजर ॥'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Official Sample
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1 max-w-xl leading-relaxed">
              {currentLang === 'en'
                ? 'Experience the iconic baritone voice reciting "Sukhakarta Dukhaharta" Aarti with authentic spiritual resonance.'
                : '"सुखकर्ता दुखहर्ता वार्ता विघ्नाची..." अमिताभ बच्चन यांच्या भारदस्त, गंभीर व मंत्रमुग्ध करणाऱ्या स्वरातील अस्सल आरती सॅम्पल ऐका.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleAmitabhSample}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 active:scale-95 ${
            isPlayingAmitabhSample
              ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 animate-pulse'
              : 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white ring-1 ring-amber-300/50 hover:scale-105'
          }`}
        >
          {isPlayingAmitabhSample ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>{currentLang === 'en' ? 'Stop Aarti' : 'आरती थांबवा'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-200" />
              <span>{currentLang === 'en' ? 'Play Amitabh Voice Sample' : 'अमिताभ बच्चन व्हॉईस सॅम्पल ऐका'}</span>
            </>
          )}
        </button>
      </div>

      {/* 1.5 Devotee Account, Login & Logout Hub */}
      {currentUser ? (
        <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/15 via-stone-900/60 to-amber-500/10 border border-amber-500/40 shadow-lg mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 animate-fadeIn w-full">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-saffron-600 text-white flex items-center justify-center text-xl shadow-md ring-1 ring-amber-300/40">
              {currentUser.avatar || (currentUser.role === 'admin' ? '👑' : '🙏')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-serifDev text-stone-900 dark:text-white">
                  ॥ स्वागतम्, {currentUser.name} ॥
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  {currentUser.role === 'admin' ? '👑 मुख्य अ‍ॅडमिन (Creator)' : '📿 पावन साधक'}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                खाते: {currentUser.phone || currentUser.email || 'Devotee Account'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => onNavigateTab('admin')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>अ‍ॅडमिन कमांड सेंटर उघडा</span>
              </button>
            )}

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              title="खात्यातून बाहेर पडा (Logout)"
            >
              <LogOut className="w-4 h-4 text-red-200" />
              <span>लॉगआउट करा (Logout)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-saffron-500/10 via-amber-500/15 to-orange-500/10 border border-saffron-500/30 shadow-md mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 animate-fadeIn w-full">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-600 text-white flex items-center justify-center text-xl shadow-md ring-1 ring-amber-300/40">
              <span>👤</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
                <span>साधक व अ‍ॅडमिन लॉगिन (Devotee & Admin Login)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 max-w-xl leading-relaxed">
                आपले १०८ नामस्मरण जप, संकल्प, आवडते मंत्र व कुंभमेळा नोंदी सुरक्षित ठेवण्यासाठी लॉगिन करा.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105 border border-amber-300/40"
            >
              <User className="w-3.5 h-3.5 text-amber-200" />
              <span>साधक लॉगिन करा (Phone OTP / Google)</span>
            </button>

            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              title="Restricted for app creator"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>अ‍ॅडमिन (Only for Me)</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Choose Your Deity / आपली इष्टदेवता निवडा */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
              {currentLang === 'en' ? 'Step 1: Choose Your Deity' : 'पायरी १: आपली इष्टदेवता निवडा'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serifDev text-stone-900 dark:text-white">
              {currentLang === 'en' ? 'Devotional Shrines (देवस्थान दर्शन)' : 'इष्टदेवता दर्शन व उपासना'}
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('deities')}
            className="text-xs font-bold text-saffron-600 dark:text-saffron-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? 'All 50 Deities Portal' : 'सर्व ५० देव-देवता दर्शन दालन'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full">
          {deitiesList.map((deity) => {
            const isSelected = deity.id === activeDeity;

            const handleGoToShrine = () => {
              onSelectDeity(deity.id);
              if (onOpenGodDetail) {
                onOpenGodDetail(deity.id);
              } else {
                onNavigateTab('god-detail');
              }
            };

            const handleSelectAsIshta = () => {
              onSelectDeity(deity.id);
              audioEngine.playTempleBell();
            };

            return (
              <div
                key={deity.id}
                className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-left transition-all border relative overflow-hidden group shadow-md flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-50 to-orange-50/40 dark:from-amber-950/40 dark:to-stone-900 border-amber-500 ring-2 ring-amber-400/60 shadow-lg scale-[1.01]'
                    : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                {/* Clickable Card Header & Info */}
                <div
                  onClick={handleSelectAsIshta}
                  className="cursor-pointer"
                  title={currentLang === 'en' ? 'Click to select as active deity' : 'इष्टदेवता म्हणून निवडण्यासाठी टॅप करा'}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-2xl sm:text-3xl p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-stone-100 dark:bg-stone-800 shadow-sm">
                      {deity.symbol}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold truncate max-w-[80px] sm:max-w-none ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {isSelected
                        ? currentLang === 'en'
                          ? 'Active ✓'
                          : 'निवडलेले ✓'
                        : deity.badge[currentLang]}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                    {deity.name[currentLang]}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 mt-0.5 sm:mt-1 leading-snug line-clamp-2">
                    {deity.tagline[currentLang]}
                  </p>
                </div>

                {/* Bottom Action Area (Always navigable & clickable!) */}
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-200 dark:border-stone-800/80 space-y-1.5">
                  <button
                    onClick={handleGoToShrine}
                    className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white ring-1 ring-amber-300/40'
                        : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    <span>
                      {isSelected
                        ? currentLang === 'en'
                          ? 'Enter Shrine ➔'
                          : 'दर्शनासाठी जा ➔'
                        : currentLang === 'en'
                        ? 'Enter ➔'
                        : 'दर्शन ➔'}
                    </span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  {!isSelected && (
                    <button
                      onClick={handleSelectAsIshta}
                      className="w-full py-1 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-stone-800/50 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>📿</span>
                      <span className="truncate">{currentLang === 'en' ? 'Set as Active' : 'इष्टदेवता निवडा'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. What Would You Like to Do Today? (User Interest & Action Cards) */}
      <div className="mb-12">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
            {currentLang === 'en' ? 'Step 2: Choose Your Devotional Activity' : 'पायरी २: आज आपण काय करू इच्छिता?'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serifDev text-stone-900 dark:text-white">
            {currentLang === 'en' ? 'Devotional Pathways & Features' : 'माझी आवड व साधना दालन'}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 w-full">
          {userInterestCards.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigateTab(item.tab)}
              className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl">{item.icon}</span>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 truncate max-w-[85px] sm:max-w-none">
                    {item.badge[currentLang]}
                  </span>
                </div>

                <h3 className="text-xs sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors mb-1 sm:mb-2 line-clamp-2 min-h-[30px] sm:min-h-0">
                  {item.title[currentLang]}
                </h3>

                <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-300 leading-snug mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {item.description[currentLang]}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] sm:text-xs font-bold text-saffron-600 dark:text-saffron-400">
                <span>{currentLang === 'en' ? 'Open' : 'सुरू करा'}</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Daily Sadhana & Chanting Progress Widget */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#171513] border border-stone-200 dark:border-stone-800 shadow-lg mb-8 sm:mb-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
              {currentLang === 'en' ? 'Personal Practice' : 'माझी नित्य साधना'}
            </span>
            <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mt-0.5">
              {currentLang === 'en' ? 'Today\'s Devotional Sadhana' : 'दैनिक नामस्मरण सातत्य'}
            </h3>
          </div>

          <button
            onClick={() => onNavigateTab('japa')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
          >
            <span>📿</span>
            <span>{currentLang === 'en' ? 'Open 108 Japa' : '१०८ जप सुरू करा'}</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-saffron-600 dark:text-saffron-400 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Daily Streak' : 'नित्य सातत्य'}</span>
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-white">{japaStats.streakDays} {currentLang === 'en' ? 'Days' : 'दिवस'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Today\'s Chants' : 'आजचे नामस्मरण'}</span>
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-white">{japaStats.todayCount}</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? '108 Malas' : 'पूर्ण माळा'}</span>
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-white">{japaStats.completed108Malas}</p>
          </div>
        </div>
      </div>

      {/* 4.5. Authentic Hindu Day-Wise Deity & Puja Schedule Guide */}
      <DailyPujaGuide
        currentLang={currentLang}
        onNavigateTab={onNavigateTab}
        onSelectDeity={(deityId) => {
          onSelectDeity(deityId as DeityId);
        }}
      />

      {/* 5. Sant Thought of the Day (संत विचार) */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-amber-50 dark:bg-stone-900/60 border border-amber-200 dark:border-stone-800 text-center w-full">
        <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-2">
          {currentLang === 'en' ? 'Daily Sant Thought' : 'आजचे पावन संत वचन'}
        </span>
        <blockquote className="text-base sm:text-lg font-serifDev text-stone-900 dark:text-stone-100 font-medium max-w-2xl mx-auto italic">
          {currentLang === 'en'
            ? '"Trees, creepers, and forest beings are our true kinfolk; in sincere devotion to God, pure peace blossoms within."'
            : currentLang === 'hi'
            ? '"वृक्षवल्ली आम्हां सोयरीं वनचरें — प्रकृति एवं प्राणिमात्र से प्रेम ही सच्ची ईश्वर भक्ति है।"'
            : '"वृक्षवल्ली आम्हां सोयरीं वनचरें, पक्षी ही सुस्वरें आळविती | आनंदाचे डोही आनंद तरंग, आनंदचि अंग आपुलिया ||"'}
        </blockquote>
        <span className="text-xs text-stone-600 dark:text-stone-400 mt-2 block font-semibold">
          — {currentLang === 'en' ? 'Jagadguru Sant Tukaram Maharaj' : 'जगद्गुरू संत तुकाराम महाराज'}
        </span>
      </div>

    </div>
  );
};

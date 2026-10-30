import React, { useState, useEffect, useRef } from 'react';
import { Language, DeityId, ThemeMode, AuthUser } from '../types';
import {
  Compass,
  Sparkles,
  BookOpen,
  MapPin,
  Heart,
  HelpCircle,
  Layers,
  Smartphone,
  Navigation,
  Calendar,
  Sun,
  Moon,
  Flame,
  Bot,
  User,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
  Bookmark,
  Camera,
  Radio,
  Image,
  Smile,
  Shield,
  Music,
  Bell,
  Footprints,
  Menu,
  X,
  SlidersHorizontal,
  Dices,
  Volume2,
  VolumeX,
  History,
  Keyboard,
  LucideIcon
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type TabCategory = 'darshan' | 'bhakti' | 'yatra' | 'panchang' | 'literature' | 'tools';

export interface TabItem {
  id: string;
  label: Record<Language, string>;
  desc: Record<Language, string>;
  icon: LucideIcon;
  category: TabCategory;
  badge?: string;
}

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenGlossary: () => void;
  activeDeity?: DeityId;
  onDeityChange?: (deity: DeityId) => void;
  currentTheme: ThemeMode;
  onToggleTheme: () => void;
  onOpenChatbot?: () => void;
  onOpenNamaste?: () => void;
  onOpenSearch?: () => void;
  onOpenAuthModal?: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onGoBack?: () => void;
}

// Complete 35 functional tabs with verified IDs matching App.tsx
export const ALL_SANATAN_TABS: TabItem[] = [
  // 1. Darshan & Temples
  {
    id: 'home',
    label: { en: 'Dashboard', hi: 'मुख्य दालन', mr: 'मुख्य दालन' },
    desc: { en: 'Daily puja, nakshatra, auspicious timings & home', hi: 'आज की पूजा, दैनिक नक्षत्र व समग्र भक्ति केंद्र', mr: 'आजची पूजा, दैनिक नक्षत्र, शुभ चौघडिया व समग्र भक्ती केंद्र' },
    icon: Sparkles,
    category: 'darshan'
  },
  {
    id: 'deities',
    label: { en: '50 Deities', hi: '५० देवी-देवता', mr: 'सर्व ५० देव-देवता' },
    desc: { en: 'Complete 50 Hindu Deities scriptures and worship', hi: '५० प्रमुख देवी-देवताओं का सम्पूर्ण शास्त्रोक्त परिचय', mr: 'महाराष्ट्रातील व भारतातील ५० प्रमुख देव-देवतांची शास्त्रोक्त माहिती व उपासना' },
    icon: Heart,
    category: 'darshan',
    badge: '५० देव'
  },
  {
    id: 'live-darshan',
    label: { en: 'Live Darshan & Aartis', hi: 'सीधा दर्शन व आरतियां', mr: '🔴 थेट दर्शन व आरत्या' },
    desc: { en: 'Live temple darshan & daily aartis without redirect', hi: 'प्रमुख मन्दिरों का सीधा दर्शन और आरतियां बिना री-डायरेक्ट', mr: 'पंढरपूर, सिद्धिविनायक, तुळजापूर, शिर्डी थेट दर्शन व नित्य आरत्या' },
    icon: Radio,
    category: 'darshan',
    badge: 'LIVE'
  },
  {
    id: 'temple-3d',
    label: { en: '3D Temples', hi: '3D मन्दिर दर्शन', mr: '🏛️ ३D मंदिर दर्शन' },
    desc: { en: 'Interactive 3D temple visualization & pradakshina', hi: 'भव्य 3D मन्दिर स्थापत्य व परिक्रमा अनुभव', mr: 'भव्य ३D मंदिर स्थापत्य दर्शन व प्रदक्षिणा अनुभव' },
    icon: Compass,
    category: 'darshan'
  },
  {
    id: 'ashtavinayak',
    label: { en: 'Ashtavinayak Yatra', hi: 'अष्टविनायक यात्रा', mr: '🐘 अष्टविनायक यात्रा' },
    desc: { en: 'Sacred 8 Ganesha shrines of Maharashtra with route & history', hi: 'महाराष्ट्र के ८ स्वयम्भू गणपति मन्दिरों का इतिहास व मार्ग', mr: 'महाराष्ट्रातील ८ स्वयंभू गणपती मंदिरांचा नकाशा, इतिहास व पूजा क्रम' },
    icon: Compass,
    category: 'darshan'
  },
  {
    id: 'jyotirlinga',
    label: { en: '12 Jyotirlinga', hi: '१२ ज्योतिर्लिंग', mr: '🔱 १२ ज्योतिर्लिंग' },
    desc: { en: '12 sacred Shiva Jyotirlingas across India', hi: 'भारत के १२ पावन ज्योतिर्लिंग, महिमा व पूजा विधि', mr: 'भारतातील १२ पावन ज्योतिर्लिंगे, कथा, पूजा विधी व माहिती' },
    icon: Shield,
    category: 'darshan'
  },
  {
    id: 'temples',
    label: { en: 'Hanuman Temples', hi: 'हनुमान मन्दिर', mr: '🚩 हनुमान मंदिरे' },
    desc: { en: 'Samarth Ramdas 11 Maruti and prominent Hanuman shrines', hi: 'समर्थ रामदास स्वामी स्थापित ११ मारुति व पावन मन्दिर', mr: 'समर्थ रामदास स्वामी स्थापित ११ मारुती व प्रसिद्ध हनुमान मंदिरे' },
    icon: Flame,
    category: 'darshan'
  },
  {
    id: 'symbolism',
    label: { en: 'Deity Symbols', hi: 'प्रतीक मीमांसा', mr: '🔱 देव प्रतीक रहस्य' },
    desc: { en: 'Spiritual significance of divine weapons, vehicles & symbols', hi: 'देवताओं के आयुध, वाहन, आभूषण व उनका आध्यात्मिक अर्थ', mr: 'देवांची आयुधे, वाहने, चिन्हे व त्यांचे गहन आध्यात्मिक रहस्य' },
    icon: Shield,
    category: 'darshan'
  },

  // 2. Bhakti & Sadhana
  {
    id: 'japa',
    label: { en: '108 Mala', hi: '१०८ जप माला', mr: '१०८ जपमाळ' },
    desc: { en: 'Digital 108 japa mala counter with haptic & sound', hi: 'डिजिटल १०८ जपमाला काउण्टर, संकल्प व ध्वनि कम्पन', mr: 'डिजिटल नामस्मरण जपमाळ, १०८ मणी गणना, संकल्प व ध्वनी कंपन' },
    icon: Compass,
    category: 'bhakti',
    badge: '१०८'
  },
  {
    id: 'chalisa',
    label: { en: 'Chalisa & Stotras', hi: 'चालीसा व स्तोत्र', mr: 'चालीसा व स्तोत्रे' },
    desc: { en: 'Sacred chalisas and stotras with audio and verses', hi: 'हनुमान चालीसा, शिव ताण्डव, गणेश स्तोत्र अर्थ सहित', mr: 'हनुमान चालीसा, शिव तांडव, गणेश स्तोत्र व अर्थसहित पठण' },
    icon: BookOpen,
    category: 'bhakti'
  },
  {
    id: 'mantras',
    label: { en: 'Mantras & Aartis', hi: 'मन्त्र व आरती', mr: 'मंत्र व आरती' },
    desc: { en: 'Vedic mantras and traditional authentic aartis', hi: 'वैदिक बीजमन्त्र, सुखकर्ता दुखहर्ता व सम्पूर्ण आरतियां', mr: 'वैदिक बीजमंत्र, सुखकर्ता दुखहर्ता, घालीन लोटांगण संपूर्ण आरत्या' },
    icon: Layers,
    category: 'bhakti'
  },
  {
    id: 'puja',
    label: { en: 'Virtual E-Puja', hi: 'ई-पूजा एवं आरती', mr: '🪔 ई-पूजा व आरती' },
    desc: { en: 'Interactive virtual puja with bell, shankh, dhoop & flowers', hi: 'घण्टा, शंख, धूप, दीप, पुष्प अर्पण कर डिजिटल पूजा', mr: 'घरी बसून डिजिटल घंटा, शंख, धूप, दीप, फुले अर्पण करून पूजा करा' },
    icon: Flame,
    category: 'bhakti'
  },
  {
    id: 'bhajan',
    label: { en: 'Bhajan & Bhupali', hi: 'भजन व भूपाळी', mr: '🎵 भजन व भूपाळी' },
    desc: { en: 'Morning bhupalis, abhangs and devotional music', hi: 'प्रभात भूपाली, अभंग, विट्ठल भजन व संत वाणी ऑडियो', mr: 'प्रभात भूपाळी, अभंग, विठ्ठल भजने व संत वाणी ऑडिओ' },
    icon: Music,
    category: 'bhakti'
  },
  {
    id: 'vrat',
    label: { en: 'Vrat Guide', hi: 'व्रत मार्गदर्शक', mr: '🛡️ शास्त्रोक्त व्रत विधी' },
    desc: { en: 'Scriptural fasting rules, Ekadashi, Sankashti & Vrats', hi: 'एकादशी, संकष्टी, प्रदोष, वैभव लक्ष्मी व्रत विधि व नियम', mr: 'एकादशी, संकष्टी, प्रदोष, वैभव लक्ष्मी व्रतांचे नियम व उद्यापन' },
    icon: BookOpen,
    category: 'bhakti'
  },
  {
    id: 'worship',
    label: { en: 'Day-Wise Puja', hi: 'वार पूजा विधि', mr: '🗓️ वारानुसार पूजा' },
    desc: { en: 'Weekday puja guide from Sunday to Saturday with rituals', hi: 'सोमवार से रविवार: प्रत्येक वार के देवता, मन्त्र व विधि', mr: 'सोमवार ते रविवार: प्रत्येक वाराची देवता, पूजा विधी, मंत्र व नैवेद्य' },
    icon: Calendar,
    category: 'bhakti'
  },

  // 3. Pilgrimage & Maharashtra
  {
    id: 'wari',
    label: { en: 'Pandharpur Wari', hi: 'पंढरपुर वारी', mr: '🚩 पंढरपूर वारी' },
    desc: { en: 'Live Pandharpur Wari pilgrimage route, stops and history', hi: 'संत ज्ञानेश्वर व तुकाराम महाराज पालखी मार्ग व वारी महिमा', mr: 'संत ज्ञानेश्वर व तुकाराम महाराज पालखी मार्ग, मुक्काम व वारी महिमा' },
    icon: Footprints,
    category: 'yatra',
    badge: 'माउली'
  },
  {
    id: 'kumbh',
    label: { en: 'Kumbh Mela', hi: 'कुम्भ मेला', mr: '🌊 सिंहस्थ कुंभमेळा' },
    desc: { en: 'Nashik-Trimbakeshwar Simhastha Kumbh Mela dates & guide', hi: 'नासिक-त्र्यम्बकेश्वर सिंहस्थ कुम्भ स्नान तिथियां व अखाड़े', mr: 'नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा शाही स्नान तारखा व आखाडे' },
    icon: Flame,
    category: 'yatra'
  },
  {
    id: 'maharashtra',
    label: { en: 'Maharashtra Darshan', hi: 'महाराष्ट्र दर्शन', mr: '🚩 महाराष्ट्र दर्शन' },
    desc: { en: 'Sacred pilgrimage destinations and saints shrines of Maharashtra', hi: 'महाराष्ट्र के प्रमुख शक्तिपीठ, सन्त समाधि स्थल व तीर्थ', mr: 'महाराष्ट्रातील प्रमुख शक्तिपीठे, संत समाधी स्थाने व तीर्थे' },
    icon: MapPin,
    category: 'yatra'
  },
  {
    id: 'pilgrimage',
    label: { en: 'Pilgrimage Planner', hi: 'तीर्थ नियोजन', mr: '🧭 तीर्थ नियोजन' },
    desc: { en: 'Comprehensive pilgrimage planning, routes and distance', hi: 'तीर्थयात्रा की योजना, दूरी व सम्पूर्ण मार्गदर्शक', mr: 'तीर्थयात्रेचे नियोजन, अंतर, राहण्याची व्यवस्था व मार्गदर्शक' },
    icon: Navigation,
    category: 'yatra'
  },
  {
    id: 'nearby-temples',
    label: { en: 'Nearby Temples', hi: 'समीपवर्ती मंदिर', mr: '📍 जवळची मंदिरे' },
    desc: { en: 'Find ancient and historic temples located near you', hi: 'अपने निकटवर्ती प्राचीन व ऐतिहासिक मन्दिर खोजें', mr: 'आपल्या आजूबाजूला असलेली ऐतिहासिक व प्राचीन मंदिरे शोधा' },
    icon: Navigation,
    category: 'yatra'
  },

  // 4. Panchang & Astrology
  {
    id: 'calendar',
    label: { en: 'Panchang Calendar', hi: 'पंचांग', mr: '📅 दिनदर्शिका पंचांग' },
    desc: { en: 'Traditional Hindu panchang with tithi, nakshatra & festivals', hi: 'तिथि, वार, नक्षत्र, योग, करण व सूर्योदय-सूर्यास्त', mr: 'तिथी, वार, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त व सण-उत्सव' },
    icon: Calendar,
    category: 'panchang'
  },
  {
    id: 'choghadiya',
    label: { en: 'Live Choghadiya', hi: 'चौघड़िया व राहुकाल', mr: '⏰ चौघडिया व राहुकाळ' },
    desc: { en: 'Live auspicious Choghadiya timings and Rahu Kaal periods', hi: 'आज के अमृत, शुभ, लाभ मुहूर्त व राहुकाल समय', mr: 'आजचे अमृत, शुभ, लाभ मुहूर्त व अशुभ राहुकाळ वेळ' },
    icon: Sun,
    category: 'panchang',
    badge: 'मुहूर्त'
  },
  {
    id: 'rashi',
    label: { en: 'Daily Nakshatra', hi: 'दैनिक नक्षत्र', mr: '🔮 आजची नक्षत्र पत्रिका' },
    desc: { en: 'Daily nakshatra horoscope, lucky color, number & remedies', hi: 'दैनिक नक्षत्र पत्रिका, भाग्यशाली रंग, शुभ अंक व १-मिनट उपाय', mr: 'दैनिक नक्षत्र पत्रिका, भाग्यशाली रंग, शुभ अंक व १-मिनिट बीजमंत्र उपाय' },
    icon: Compass,
    category: 'panchang',
    badge: 'रास'
  },
  {
    id: 'kundali',
    label: { en: 'AI Janam Kundali', hi: 'एआई जन्म कुण्डली', mr: '🔮 एआय जन्म कुंडली' },
    desc: { en: 'AI-predicted exact Vedic Kundali, 12 Bhavas, planetary chart & life predictions', hi: 'एआई द्वारा सटीक जन्म पत्रिका, १२ भाव, ग्रह विश्लेषण एवं संपूर्ण जीवन भविष्यवाणी', mr: 'एआय-आधारित अचूक वैदिक जन्म कुंडली, १२ भाव आकृती, ग्रह विश्लेषण व संपूर्ण जीवन भविष्य' },
    icon: Sparkles,
    category: 'panchang',
    badge: 'AI'
  },
  {
    id: 'festival-prep',
    label: { en: 'Festival Prep', hi: 'त्योहार तैयारी', mr: '✨ सण-उत्सव पूर्वतयारी' },
    desc: { en: 'Preparation checklists and rituals for major Hindu festivals', hi: 'गणेशोत्सव, दीपावली, नवरात्रि पूर्व तैयारी मार्गदर्शक', mr: 'गणेशोत्सव, दिवाळी, नवरात्र, महाशिवरात्र पूर्वतयारी मार्गदर्शक' },
    icon: Sparkles,
    category: 'panchang'
  },
  {
    id: 'reminders',
    label: { en: 'Daily Reminders', hi: 'दैनिक स्मरण', mr: '🔔 दैनिक स्मरण' },
    desc: { en: 'Automated notification reminders for daily puja & aarti', hi: 'प्रात:-सायं पूजा, आरती व नामस्मरण का दैनिक रिमाइंडर', mr: 'सकाळ-संध्याकाळ पूजा, आरती व नामस्मरणाचे स्वयंचलित स्मरण' },
    icon: Bell,
    category: 'panchang'
  },

  // 5. Scriptures & Stories
  {
    id: 'digital-library',
    label: { en: 'Scriptures Library', hi: 'संत साहित्य ग्रन्थालय', mr: '📜 संत साहित्य व गीता' },
    desc: { en: 'Bhagavad Gita, Dnyaneshwari, Dasbodh & saint literature', hi: 'श्रीमद्भगवद्गीता, दासबोध, ज्ञानेश्वरी, मनाचे श्लोक', mr: 'श्रीमद्भगवद्गीता, दासबोध, ज्ञानेश्वरी, मनाचे श्लोक व संत साहित्य' },
    icon: BookOpen,
    category: 'literature'
  },
  {
    id: 'stories',
    label: { en: 'Kids Sanskara Stories', hi: 'बाल संस्कार कथाएँ', mr: '🧒 बाल संस्कार गोष्टी' },
    desc: { en: 'Moral and inspiring mythological stories for children', hi: 'बच्चों के लिए प्रेरणादायक पौराणिक व संत कथाएं', mr: 'मुलांसाठी प्रेरणादायी पौराणिक व संत कथा, संस्कार व बोध' },
    icon: Smile,
    category: 'literature'
  },
  {
    id: 'scanner',
    label: { en: 'Shloka Scanner', hi: 'श्लोक स्कैनर', mr: '📷 श्लोक स्कॅनर' },
    desc: { en: 'Scan Sanskrit/Marathi shlokas via camera for meaning', hi: 'कैमरे से श्लोक स्कैन कर तुरंत अर्थ व उच्चारण प्राप्त करें', mr: 'कॅमेऱ्याने श्लोक किंवा स्तोत्र स्कॅन करून अर्थ व उच्चार मिळवा' },
    icon: Camera,
    category: 'literature'
  },
  {
    id: 'library',
    label: { en: 'Offline Library', hi: 'मेरी लाइब्रेरी (ऑफलाइन)', mr: '❤️ माझे भक्ती दालन' },
    desc: { en: 'Saved favorite mantras, stotras and aartis accessible offline', hi: 'सहेजे गए मन्त्र, चालीसा व आरतियां बिना इंटरनेट पढ़ें', mr: 'आपले जतन केलेले आवडते मंत्र, चालीसा व आरत्या ऑफलाइन वाचा' },
    icon: Bookmark,
    category: 'literature'
  },

  // 6. Devotional Tools
  {
    id: 'meditation',
    label: { en: 'Meditation & Sleep', hi: 'ध्यान एवं निद्रा', mr: '🎧 अखंड ध्यान नाद' },
    desc: { en: 'Continuous Om chant, temple bells, flute and meditation sleep sounds', hi: 'ॐ नाद, मन्दिर घंटी, वंशी व ध्यान-निद्रा शान्त संगीत', mr: 'ॐ ओंकार ध्वनी, मंदिर घंटा, नदी प्रवाह व ध्यान संगीत' },
    icon: Moon,
    category: 'tools'
  },
  {
    id: 'status-card',
    label: { en: 'WhatsApp Status', hi: 'स्टेटस कार्ड', mr: '📲 व्हॉट्सॲप स्टेटस' },
    desc: { en: 'Create and share divine morning status cards on WhatsApp', hi: 'व्हाट्सएप पर शेयर करने हेतु सुविचार व सुप्रभात कार्ड', mr: 'रोज सकाळी मित्र व परिवाराला पाठवण्यासाठी सुंदर भक्ती स्टेटस कार्ड' },
    icon: Smartphone,
    category: 'tools'
  },
  {
    id: 'wallpaper',
    label: { en: 'Wallpaper Studio', hi: 'वॉलपेपर क्रिएटर', mr: '🖼️ वॉलपेपर स्टुडिओ' },
    desc: { en: 'Download high-definition devotional wallpapers for your phone', hi: 'मोबाइल के लिए मनमोहक एचडी देव वॉलपेपर डाउनलोड करें', mr: 'मोबाईलसाठी एचडी देव वॉलपेपर डाउनलोड व कस्टमाईज करा' },
    icon: Image,
    category: 'tools'
  },
  {
    id: 'checklist',
    label: { en: 'Puja Checklist', hi: 'पूजा सामग्री सूची', mr: '🛒 पूजा साहित्य यादी' },
    desc: { en: 'Comprehensive grocery & samagri checklists for pujas', hi: 'सत्यनारायण, गृहप्रवेश, गणपति पूजा सामग्री की सूची', mr: 'सत्यनारायण, गृहप्रवेश, गणपती पूजेच्या साहित्याची सविस्तर यादी' },
    icon: ShoppingBag,
    category: 'tools'
  },
  {
    id: 'satvik',
    label: { en: 'Satvik Prasad', hi: 'सात्विक प्रसाद', mr: '🍲 सात्विक प्रसाद' },
    desc: { en: 'Authentic pure vegetarian Satvik prasad and naivedya recipes', hi: 'देवताओं के भोग हेतु पारम्परिक सात्विक प्रसाद व्यंजन', mr: 'देवाच्या नैवेद्याच्या पारंपारिक व सात्विक पाककृती' },
    icon: Layers,
    category: 'tools'
  },
  {
    id: 'store',
    label: { en: 'Satvik Store', hi: 'सात्विक भण्डार', mr: '🛍️ सात्विक भांडार' },
    desc: { en: 'Sacred tulsi malas, ashtagandha, camphor and puja items', hi: 'शुद्ध कपूर, अष्टगन्ध, तुलसी माला व पूजा सामग्री भण्डार', mr: 'शुद्ध कापूर, अष्टगंध, तुळशी माळ व पूजा साहित्य भांडार' },
    icon: ShoppingBag,
    category: 'tools'
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', label: { en: 'All Tabs (35+)', mr: '🌟 सर्व दालने (३५+)', hi: '🌟 सभी अनुभाग (३५+)' } },
  { id: 'darshan', label: { en: 'Darshan & Temples', mr: '🕉️ देव व मंदिरे', hi: '🕉️ दर्शन व देवालय' } },
  { id: 'bhakti', label: { en: 'Bhakti & Sadhana', mr: '📿 भक्ती व साधना', hi: '📿 भक्ति व साधना' } },
  { id: 'yatra', label: { en: 'Pilgrimage & Wari', mr: '🚩 तीर्थ व वारी', hi: '🚩 तीर्थ व वारी' } },
  { id: 'panchang', label: { en: 'Panchang & Muhurat', mr: '📅 पंचांग व रास', hi: '📅 पंचांग व मुहूर्त' } },
  { id: 'literature', label: { en: 'Scriptures', mr: '📜 संत साहित्य', hi: '📜 संत साहित्य' } },
  { id: 'tools', label: { en: 'Devotional Tools', mr: '🎨 भक्ती साधने', hi: '🎨 भक्ति साधन' } }
] as const;

export const SURPRISE_PORTAL_LIST = [
  { id: 'puja', name: { en: 'Virtual Puja Sanctum', hi: 'डिजिटल पूजा दालन', mr: 'श्री व्हर्च्युअल पूजा दालन' }, blessing: { en: 'May your home be blessed with divine light! 🪔', mr: 'आपल्या घरात मंगल, शांती आणि समृद्धी नांदो! 🪔', hi: 'आपके घर में सुख, शांति का वास हो! 🪔' } },
  { id: 'live-darshan', name: { en: 'Live Darshan & Aartis', hi: 'सीधा दर्शन व आरतियां', mr: 'पंढरपूर व शिर्डी थेट दर्शन' }, blessing: { en: 'Darshan of Pandharpur Vitthal and Shirdi Sai! 🔴', mr: 'विठू माऊली व साईबाबांचे थेट पावन दर्शन! 🔴', hi: 'विट्ठल भगवान एवं साईं बाबा का पावन दर्शन! 🔴' } },
  { id: 'wari', name: { en: 'Pandharpur Wari 3D Route', hi: 'पंढरपुर वारी ३D', mr: 'संत ज्ञानेश्वर व तुकाराम महाराज पालखी ३D' }, blessing: { en: 'Experience the holy joy of Warkari pilgrims! 🚩', mr: 'ज्ञानोबा-तुकारामांच्या पावन पालखी सोहळ्याचा आनंद घ्या! 🚩', hi: 'वारकरी संतों की पावन यात्रा का आनंद लें! 🚩' } },
  { id: 'japa', name: { en: '108 Sacred Mala Japa', hi: '१०८ जप माला', mr: '१०८ जप माळ व नामस्मरण' }, blessing: { en: 'Chant divine names with authentic bead resonance! 📿', mr: 'मन शांत करा आणि १०८ वेळा नामस्मरण पूर्ण करा! 📿', hi: 'मन को शांत कर १०८ बार पावन नाम जपें! 📿' } },
  { id: 'rashi', name: { en: 'Daily Nakshatra & Lucky Remedies', hi: 'दैनिक नक्षत्र एवं उपाय', mr: 'आजची नक्षत्र पत्रिका व १-मिनिट उपाय' }, blessing: { en: 'Today’s auspicious color, lucky number & beej mantra! 🔮', mr: 'आजचा शुभ रंग, लकी नंबर आणि १-मिनिटाचा बीजमंत्र उपाय! 🔮', hi: 'आज का शुभ रंग, भाग्यशाली अंक व बीजमंत्र उपाय! 🔮' } },
  { id: 'kundali', name: { en: 'AI Janam Kundali Predictor', hi: 'एआई जन्म कुण्डली एवं भविष्य', mr: 'एआय जन्म कुंडली व १२ भाव भविष्य' }, blessing: { en: 'Discover your exact birth chart and life predictions! 🔮', mr: 'आपली अचूक जन्म पत्रिका, १२ भाव व एआय जीवन भविष्य जाणून घ्या! 🔮', hi: 'अपनी जन्म कुंडली एवं सटीक भविष्य जानिए! 🔮' } },
  { id: 'ashtavinayak', name: { en: 'Ashtavinayak 8 Ganesha Circuit', hi: 'अष्टविनायक यात्रा', mr: 'पावन अष्टविनायक यात्रा दर्शन' }, blessing: { en: 'May Vighnaharta Ganesha remove all obstacles! 🐘', mr: 'विघ्नहर्ता गणपती बाप्पा आपल्या जीवनातील सर्व संकटे दूर करोत! 🐘', hi: 'विघ्नहर्ता गणेश आपके सभी विघ्न दूर करें! 🐘' } },
  { id: 'jyotirlinga', name: { en: '5 Maharashtra Jyotirlingas', hi: 'महाराष्ट्र ५ ज्योतिर्लिंग', mr: 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंगे' }, blessing: { en: 'Har Har Mahadev! Cosmic blessings of Lord Shiva! 🔱', mr: 'हर हर महादेव! त्र्यंबकेश्वर, भीमाशंकर व घृष्णेश्वर महादेवांचे आशीर्वाद! 🔱', hi: 'हर हर महादेव! भगवान शिव का पावन आशीर्वाद! 🔱' } },
  { id: 'meditation', name: { en: 'Om & Temple Bells Meditation', hi: 'ध्यान व ॐ नाद संगीत', mr: 'अखंड ॐ नाद व मंदिर घंटा ध्वनी' }, blessing: { en: 'Rest in blissful silence and inner peace! 🎧', mr: 'शांत चित्ताने ध्यान करा व मनाला विश्रांती द्या! 🎧', hi: 'शांत मन से ध्यान लगाएं व मानसिक शांति प्राप्त करें! 🎧' } },
  { id: 'stories', name: { en: 'Kids Sanskara Stories', hi: 'बाल संस्कार कथाएँ', mr: 'बाल संस्कार व पौराणिक गोष्टी' }, blessing: { en: 'Inspiring virtues and stories for the whole family! 🧒', mr: 'मुलांसाठी प्रेरणादायी व संस्कारमय सुंदर कथा! 🧒', hi: 'बच्चों के लिए सुंदर संस्कार कथाएं! 🧒' } }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenGlossary,
  currentTheme,
  onToggleTheme,
  onOpenChatbot,
  onOpenNamaste,
  onOpenSearch,
  onOpenAuthModal,
  currentUser,
  onLogout,
  onGoBack,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaSearchQuery, setMegaSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Sound chime state (persisted)
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sanatan_nav_sound_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  // Recent visited tabs history
  const [recentTabIds, setRecentTabIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sanatan_recent_tabs');
      return saved ? JSON.parse(saved) : ['live-darshan', 'japa', 'puja', 'wari'];
    } catch {
      return ['live-darshan', 'japa', 'puja', 'wari'];
    }
  });

  // Surprise Blessing Toast
  const [surpriseToast, setSurpriseToast] = useState<{
    name: string;
    blessing: string;
  } | null>(null);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sanatan_nav_sound_enabled', String(next));
      } catch {}
      if (next) audioEngine.playNavChime();
      return next;
    });
  };

  const updateRecentTabs = (tabId: string) => {
    try {
      const stored = localStorage.getItem('sanatan_recent_tabs');
      let recents: string[] = stored ? JSON.parse(stored) : [];
      recents = [tabId, ...recents.filter((id) => id !== tabId)].slice(0, 6);
      localStorage.setItem('sanatan_recent_tabs', JSON.stringify(recents));
      setRecentTabIds(recents);
    } catch {}
  };

  const handleSurpriseMe = () => {
    const randomItem = SURPRISE_PORTAL_LIST[Math.floor(Math.random() * SURPRISE_PORTAL_LIST.length)];
    if (isSoundEnabled) {
      audioEngine.playTempleBell(660);
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([20, 30, 20]);
    }

    setSurpriseToast({
      name: randomItem.name[currentLang],
      blessing: randomItem.blessing[currentLang],
    });

    setTimeout(() => {
      handleTabClick(randomItem.id);
    }, 400);

    setTimeout(() => {
      setSurpriseToast(null);
    }, 4500);
  };

  // Global hotkeys for keyboard navigation
  useEffect(() => {
    const handleGlobalHotkeys = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === '1') {
        handleTabClick('home');
      } else if (e.key === '2') {
        handleTabClick('deities');
      } else if (e.key === '3') {
        handleTabClick('japa');
      } else if (e.key === '4') {
        handleTabClick('live-darshan');
      } else if (e.key === '5') {
        handleTabClick('puja');
      } else if (e.key === 'w' || e.key === 'W') {
        handleTabClick('wari');
      } else if (e.key === 'r' || e.key === 'R') {
        handleSurpriseMe();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key === '?') {
        setIsShortcutsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalHotkeys);
    return () => window.removeEventListener('keydown', handleGlobalHotkeys);
  }, [isSoundEnabled]);

  // Auto-scroll active tab into horizontal view
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  // Handle BeforeInstallPrompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard shortcut: Escape closes mega menu & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsMoreDropdownOpen(false);
        setIsProfileMenuOpen(false);
        setIsShortcutsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert(currentLang === 'en' 
        ? 'To install this app on your phone: Tap browser menu (⋮) and select "Add to Home Screen" or "Install App".'
        : 'मोबाईलवर ॲप इन्स्टॉल करण्यासाठी: ब्राऊझरच्या मेन्यूवर (⋮) क्लिक करून "Add to Home Screen" किंवा "Install App" निवडा.');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const amount = direction === 'left' ? -280 : 280;
      tabsContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'auth_login_action') {
      onOpenAuthModal?.();
      return;
    }
    if (tabId === 'auth_logout_action') {
      onLogout?.();
      return;
    }

    if (isSoundEnabled) {
      audioEngine.playNavChime();
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }

    updateRecentTabs(tabId);
    onTabChange(tabId);
    setIsMegaMenuOpen(false);
    setIsMoreDropdownOpen(false);
  };

  // Dedicated Login / Logout tab button for direct visibility
  const authTab = currentUser
    ? {
        id: 'auth_logout_action',
        label: { en: 'Logout', hi: 'लॉगआउट', mr: `🚪 लॉगआउट (${currentUser.name.split(' ')[0]})` },
        icon: LogOut,
      }
    : {
        id: 'auth_login_action',
        label: { en: 'Devotee Login', hi: 'भक्त प्रवेश', mr: '👤 भक्त लॉगिन' },
        icon: User,
      };

  // Filtered tabs for Mega Menu
  const filteredMegaTabs = ALL_SANATAN_TABS.filter((tab) => {
    const matchesCategory = activeCategoryFilter === 'all' || tab.category === activeCategoryFilter;
    if (!matchesCategory) return false;

    if (!megaSearchQuery.trim()) return true;
    const query = megaSearchQuery.toLowerCase();
    const labelMr = tab.label.mr.toLowerCase();
    const labelHi = tab.label.hi.toLowerCase();
    const labelEn = tab.label.en.toLowerCase();
    const descMr = tab.desc.mr.toLowerCase();
    const descEn = tab.desc.en.toLowerCase();

    return (
      labelMr.includes(query) ||
      labelHi.includes(query) ||
      labelEn.includes(query) ||
      descMr.includes(query) ||
      descEn.includes(query) ||
      tab.id.includes(query)
    );
  });

  // Top 6 primary tabs for desktop navbar
  const primaryDesktopTabs = ALL_SANATAN_TABS.slice(0, 7);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#14120f]/95 backdrop-blur-md border-b border-stone-800 shadow-xl w-full max-w-full">
        {/* Main Navbar Top Row */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2">
            
            {/* Brand Logo & Back Button & All Sections Trigger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Universal Back Button when inside any sub-tab */}
              {activeTab !== 'home' && (
                <button
                  onClick={() => {
                    if (isSoundEnabled) audioEngine.playNavChime();
                    onGoBack ? onGoBack() : onTabChange('home');
                  }}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 shrink-0"
                  title={currentLang === 'en' ? 'Go back one step' : 'मागील पानावर जा (मागे जा)'}
                  aria-label="Go Back"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <span className="font-serifDev">{currentLang === 'en' ? 'Back' : 'मागे जा'}</span>
                </button>
              )}

              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg ring-1 cursor-pointer transition-all bg-gradient-to-tr from-saffron-700 via-saffron-500 to-amber-400 shadow-saffron-900/30 ring-amber-300/40 hover:scale-105"
                onClick={() => handleTabClick('home')}
                title="सनातन अमृतधारा - मुख्य दालन"
              >
                <span className="text-lg sm:text-2xl select-none">🕉️</span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className="text-base sm:text-xl font-bold tracking-tight text-white font-serifDev cursor-pointer hover:text-amber-300 transition-colors"
                    onClick={() => handleTabClick('home')}
                  >
                    {currentLang === 'en' ? 'Sanatan Amrutdhara' : 'सनातन अमृतधारा'}
                  </span>

                  {/* 50 Deities Quick Shortcut Pill */}
                  <button
                    onClick={() => handleTabClick('deities')}
                    className={`hidden md:inline-flex px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all items-center gap-1 border ${
                      activeTab === 'deities' || activeTab === 'god-detail'
                        ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white border-amber-300 shadow-sm'
                        : 'bg-stone-900 text-amber-300 border-amber-500/40 hover:bg-stone-800'
                    }`}
                  >
                    <span>🪷</span>
                    <span>{currentLang === 'en' ? '50 Deities' : '५० देव-देवता'}</span>
                  </button>

                  {/* High Visibility "सर्व दालने (All Sections)" Pill Button */}
                  <button
                    onClick={() => setIsMegaMenuOpen(true)}
                    className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 shadow-sm transition-all hover:scale-105"
                    title="सर्व ३५+ भक्ती दालनांची सूची उघडा (View All 35+ Sections)"
                  >
                    <Menu className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-serifDev">{currentLang === 'en' ? 'All Sections' : 'सर्व दालने'}</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-black font-extrabold">
                      35+
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 hidden sm:block">
                  {currentLang === 'en' ? 'Complete 35+ Devotional Portals, Simhastha Kumbh & 50 Deities' : 'सर्व ५० देव-देवता, पंचांग, थेट दर्शन व ३५+ भक्ती दालने'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links with 'More' Dropdown */}
            <nav className="hidden xl:flex items-center gap-1 relative" ref={moreDropdownRef}>
              {primaryDesktopTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-saffron-600/25 text-saffron-400 border border-saffron-500/40 shadow-inner'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-saffron-400' : 'text-stone-400'}`} />
                    <span>{tab.label[currentLang]}</span>
                  </button>
                );
              })}

              {/* 'More Sections' Dropdown Button */}
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-bold text-amber-300 bg-stone-900/90 border border-amber-500/30 hover:border-amber-400 hover:bg-stone-800 transition-all shadow-sm"
                title="अधिक दालने पहा"
              >
                <span>{currentLang === 'en' ? 'More...' : 'अधिक दालने'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
              </button>

              {/* Desktop Quick Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-[#171410] border border-amber-500/40 shadow-2xl p-3 z-50 animate-fadeIn space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      {currentLang === 'en' ? 'Quick Category Jump' : 'जलद दालन निवड'}
                    </span>
                    <button
                      onClick={() => {
                        setIsMoreDropdownOpen(false);
                        setIsMegaMenuOpen(true);
                      }}
                      className="text-[11px] text-saffron-400 hover:underline font-bold"
                    >
                      {currentLang === 'en' ? 'View All (35+) ↗' : 'सर्व ३५+ दालने ↗'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto no-scrollbar">
                    {ALL_SANATAN_TABS.slice(7).map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all ${
                            isActive
                              ? 'bg-saffron-600/30 text-saffron-300 border border-saffron-500/40 font-bold'
                              : 'bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-white'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{tab.label[currentLang]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </nav>

            {/* Right Controls: Search, AI Guru, Auth Profile, Theme, Install & Language */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Universal Global Search Trigger Button */}
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 hover:border-amber-400 shadow-sm transition-all"
                  title="Search Deities, Mantras, Temples, Festivals (Ctrl + K)"
                >
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-stone-300">
                    {currentLang === 'en' ? 'Search' : 'शोधा'}
                  </span>
                  <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono text-stone-400 border border-stone-800">
                    Ctrl K
                  </kbd>
                </button>
              )}

              {/* Namaste Greeting Video Modal Trigger */}
              {onOpenNamaste && (
                <button
                  onClick={onOpenNamaste}
                  className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-200 bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 shadow-sm transition-all transform hover:scale-105"
                  title={currentLang === 'en' ? 'Watch Namaste Greeting' : 'पावन नमस्ते स्वागत पहा'}
                >
                  <span className="text-sm">🙏</span>
                  <span className="hidden md:inline font-serifDev">
                    {currentLang === 'en' ? 'Namaste' : 'नमस्ते'}
                  </span>
                </button>
              )}

              {/* Overpowered AI Guru Assistant Trigger Button */}
              {onOpenChatbot && (
                <button
                  onClick={onOpenChatbot}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 shadow-md shadow-saffron-950 transition-all transform hover:scale-105 border border-amber-300/40"
                  title="Divine AI Guru & Voice Assistant (12 Languages)"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-200" />
                  <span className="hidden sm:inline">
                    {currentLang === 'en' ? 'AI Guru' : 'दिव्य AI'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                </button>
              )}

              {/* Devotee Authentication Trigger Button & Dropdown */}
              {currentUser ? (
                <div className="flex items-center gap-1.5">
                  <div className="relative" ref={profileMenuRef}>
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 transition-all shadow-sm"
                      title="Profile & Settings"
                    >
                      <span className="text-sm">{currentUser.avatar || '🙏'}</span>
                      <span className="max-w-[70px] sm:max-w-[90px] truncate font-medium">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3 h-3 text-stone-400" />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#171410] border border-amber-500/30 shadow-2xl p-3 z-50 text-white animate-fadeIn space-y-2">
                        <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {currentUser.name}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                              {currentUser.ishtaDevata || 'साधक'}
                            </span>
                          </div>
                          {currentUser.userId && (
                            <p className="text-[11px] font-mono text-saffron-400 font-bold">
                              @{currentUser.userId}
                            </p>
                          )}
                          <p className="text-[11px] text-stone-400 font-mono truncate">
                            {currentUser.phone || currentUser.email || 'Devotee Account'}
                          </p>
                          {currentUser.district && (
                            <p className="text-[10px] text-amber-400/80">
                              📍 {currentUser.district}
                            </p>
                          )}
                        </div>

                        {/* Logout Button inside dropdown */}
                        <button
                          onClick={() => {
                            onLogout?.();
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-red-950/60 hover:text-red-300 text-stone-300 text-xs font-semibold flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5 text-red-400" />
                          <span>लॉगआउट करा (Sign Out)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 1-Click Logout Button in Top Bar */}
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-red-100 bg-red-600/80 hover:bg-red-500 border border-red-400/50 transition-all shadow-md hover:scale-105"
                    title="लॉगआउट करा (Logout)"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-200" />
                    <span className="hidden sm:inline">लॉगआउट</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 shadow-md border border-amber-300 ring-2 ring-amber-400/40 transition-all hover:scale-105"
                  title="भक्त व साधक लॉगिन (User Login)"
                >
                  <User className="w-3.5 h-3.5 text-amber-200" />
                  <span>{currentLang === 'en' ? 'Devotee Login' : 'भक्त प्रवेश'}</span>
                </button>
              )}

              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                title={currentTheme === 'light' ? 'Switch to Dark Mode (रात्री ध्यान)' : 'Switch to Light Mode (प्रकाशमय)'}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-500 transition-all shadow-sm"
              >
                {currentTheme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden lg:inline text-xs font-medium">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden lg:inline text-xs font-medium">Dark</span>
                  </>
                )}
              </button>

              {/* Install App Button */}
              <button
                onClick={handleInstallClick}
                title="Install App on Phone / Desktop"
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 shadow-md shadow-saffron-950 transition-all ${
                  isInstallable ? 'animate-pulse ring-1 ring-amber-300' : ''
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-200" />
                <span className="hidden sm:inline">
                  {currentLang === 'en' ? 'Install' : 'इन्स्टॉल'}
                </span>
              </button>

              {/* Cultural Explainer Help Button */}
              <button
                onClick={onOpenGlossary}
                title="What is this? Cultural term explainer"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-200 bg-amber-950/40 border border-amber-800/50 hover:bg-amber-900/40 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline">
                  {currentLang === 'en' ? 'Help' : 'मदत'}
                </span>
              </button>

              {/* Compact Language Switcher */}
              <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800 shrink-0">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-md font-medium transition-all ${
                    currentLang === 'en'
                      ? 'bg-saffron-600 text-white shadow-sm font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange('hi')}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-md font-medium transition-all ${
                    currentLang === 'hi'
                      ? 'bg-saffron-600 text-white shadow-sm font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => onLanguageChange('mr')}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-md font-medium transition-all ${
                    currentLang === 'mr'
                      ? 'bg-saffron-600 text-white shadow-sm font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Devotional Category Quick Switcher & Fun Controls */}
        <div className="bg-stone-900/90 border-t border-stone-800/80 px-2 sm:px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {/* Category Quick Filter Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryFilter(cat.id);
                    if (isSoundEnabled) audioEngine.playNavChime();
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-saffron-500 text-stone-950 font-bold shadow-sm scale-105 ring-1 ring-amber-300/50'
                      : 'bg-stone-950/80 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <span>{cat.label[currentLang]}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Icons: Surprise Me, Sound Chime, Keyboard Shortcuts */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Surprise Me Magic Discovery Button */}
            <button
              onClick={handleSurpriseMe}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-500 hover:from-amber-500 hover:to-saffron-500 text-white shadow-sm shadow-amber-950 transition-all hover:scale-105 border border-amber-300/40"
              title={currentLang === 'en' ? 'Surprise Divine Portal (Press R)' : '🎲 आजचे दैवी दालन (R दाबा)'}
            >
              <Dices className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">{currentLang === 'en' ? 'Surprise Me' : 'दैवी शोध'}</span>
              <span className="sm:hidden">शोध</span>
            </button>

            {/* Sound Chime Toggle */}
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-full border text-xs transition-colors ${
                isSoundEnabled
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 hover:bg-amber-500/30'
                  : 'bg-stone-950 border-stone-800 text-stone-500 hover:text-stone-300'
              }`}
              title={isSoundEnabled ? 'मंदिर ध्वनी सुरू (Sound ON - Press M to mute)' : 'मंदिर ध्वनी बंद (Sound MUTED - Press M to unmute)'}
            >
              {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Keyboard Shortcuts Guide Button */}
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-300 hover:border-amber-500/40 text-[10px] transition-colors"
              title="Keyboard Shortcuts (Press ?)"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Enhanced Horizontal Scroll Navigation Bar with Left & Right Arrow Buttons */}
        <div className="relative border-t border-stone-800/80 bg-stone-950/95 w-full">
          <div className="max-w-7xl mx-auto flex items-center px-1 sm:px-3">
            
            {/* Scroll Left Button for Desktop / Tablet */}
            <button
              onClick={() => scrollTabs('left')}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-stone-700 hover:border-amber-400 shrink-0 shadow-md transition-all mr-1.5 hover:scale-105"
              title="मागील टॅब (Scroll Left)"
              aria-label="Scroll Tabs Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick Trigger for All Sections in Tab Strip */}
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 shrink-0 mr-1.5 transition-all shadow-sm"
              title="सर्व ३५+ दालने सूची उघडा"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'All (35+)' : '☰ सर्व दालने'}</span>
            </button>

            {/* Horizontal Tabs Scrollable Container */}
            <div
              ref={tabsContainerRef}
              className="flex overflow-x-auto scroll-smooth py-2 px-1 gap-2 flex-grow items-center scrollbar-thin"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {ALL_SANATAN_TABS.filter((tab) => {
                if (activeCategoryFilter === 'all') return true;
                return tab.category === activeCategoryFilter;
              }).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    data-tab-id={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-all shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 text-white shadow-md font-bold ring-2 ring-amber-300/50 scale-105'
                        : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-600 hover:text-white hover:bg-stone-800/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-100' : 'text-amber-400'}`} />
                    <span>{tab.label[currentLang]}</span>
                    {tab.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                        isActive
                          ? 'bg-black/30 text-amber-200'
                          : tab.badge === 'LIVE'
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Show All Reset Button when category filtered */}
              {activeCategoryFilter !== 'all' && (
                <button
                  onClick={() => {
                    setActiveCategoryFilter('all');
                    if (isSoundEnabled) audioEngine.playNavChime();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 shrink-0 transition-all"
                >
                  <span>🌟 {currentLang === 'en' ? 'Show All Tabs (35+)' : 'सर्व ३५+ दालने दाखवा'}</span>
                </button>
              )}

              {/* Login / Logout action in scroll strip */}
              <button
                key={authTab.id}
                data-tab-id={authTab.id}
                onClick={() => handleTabClick(authTab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap font-bold transition-all shrink-0 ${
                  authTab.id === 'auth_login_action'
                    ? 'bg-gradient-to-r from-amber-600 to-saffron-600 text-white border border-amber-300 animate-pulse shadow-md'
                    : 'bg-red-950/70 text-red-200 border border-red-800 hover:bg-red-900 shadow-sm'
                }`}
              >
                <authTab.icon className="w-3.5 h-3.5" />
                <span>{authTab.label[currentLang]}</span>
              </button>
            </div>

            {/* Scroll Right Button for Desktop / Tablet */}
            <button
              onClick={() => scrollTabs('right')}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-stone-700 hover:border-amber-400 shrink-0 shadow-md transition-all ml-1.5 hover:scale-105"
              title="पुढील टॅब (Scroll Right)"
              aria-label="Scroll Tabs Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          MEGA MENU DRAWER (ALL 35+ TABS DIRECTORY & SEARCH MODAL)
          Accessible from any screen size, keyboard, or touch
          ============================================================ */}
      {isMegaMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-fadeIn">
          <div
            className="w-full max-w-3xl bg-[#13110e] border-l border-stone-800 h-full flex flex-col shadow-2xl text-stone-100 overflow-hidden animate-slideLeft"
            role="dialog"
            aria-modal="true"
            aria-label="All Sections Directory"
          >
            {/* Mega Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center text-xl shadow-md">
                  🕉️
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-serifDev text-white flex items-center gap-2">
                    <span>{currentLang === 'en' ? 'All Devotional Portals (35+)' : 'सर्व ३५+ भक्ती दालने व सेवा'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      सनातन अमृतधारा
                    </span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {currentLang === 'en'
                      ? 'Browse, search and access any feature or sacred shrine directly'
                      : 'कोणत्याही देवस्थान, पूजा, पंचांग किंवा साहित्यात एका क्लिकवर प्रवेश करा'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMegaMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-red-400 text-stone-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="बंद करा (Close - Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="p-3 sm:p-4 border-b border-stone-800/80 bg-stone-900/40">
              <div className="relative">
                <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={
                    currentLang === 'en'
                      ? 'Search tabs (e.g., Aarti, Wari, Kundali, 108 Mala, Jyotirlinga)...'
                      : 'दालन शोधा (उदा. थेट दर्शन, वारी, चालीसा, कुंडली, १०८ जप, पंचांग)...'
                  }
                  value={megaSearchQuery}
                  onChange={(e) => setMegaSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm text-stone-200 placeholder-stone-500 outline-none transition-all"
                  autoFocus
                />
                {megaSearchQuery && (
                  <button
                    onClick={() => setMegaSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Pills Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mt-3 pt-1">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategoryFilter(cat.id);
                      if (isSoundEnabled) audioEngine.playNavChime();
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategoryFilter === cat.id
                        ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {cat.label[currentLang]}
                  </button>
                ))}
              </div>

              {/* Recently Visited Portals Strip */}
              {recentTabIds.length > 0 && (
                <div className="pt-2.5 mt-2.5 border-t border-stone-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 shrink-0">
                    <History className="w-3 h-3 text-amber-400" />
                    <span>{currentLang === 'en' ? 'Recently Visited:' : 'नुकतेच पाहिलेले:'}</span>
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {recentTabIds.map((tabId) => {
                      const tabObj = ALL_SANATAN_TABS.find((t) => t.id === tabId);
                      if (!tabObj) return null;
                      const Icon = tabObj.icon;
                      return (
                        <button
                          key={tabId}
                          onClick={() => handleTabClick(tabId)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-400/60 text-stone-300 hover:text-white transition-all shadow-sm"
                        >
                          <Icon className="w-3 h-3 text-amber-400" />
                          <span>{tabObj.label[currentLang]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Surprise Me Magic Discovery Banner */}
              <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between gap-2">
                <span className="text-[11px] text-amber-200/90 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentLang === 'en' ? 'Discover something sacred today:' : 'नवीन पावन दालन अनुभवायचे आहे?'}</span>
                </span>
                <button
                  onClick={handleSurpriseMe}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                >
                  <Dices className="w-3.5 h-3.5 text-amber-200" />
                  <span>{currentLang === 'en' ? 'Surprise Me' : '🎲 आजचे दैवी दालन'}</span>
                </button>
              </div>
            </div>

            {/* Results Grid List */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-3 custom-scrollbar">
              <div className="flex items-center justify-between text-xs text-stone-400 px-1 pb-1">
                <span>
                  {currentLang === 'en'
                    ? `Showing ${filteredMegaTabs.length} sections`
                    : `एकूण ${filteredMegaTabs.length} दालने उपलब्ध`}
                </span>
                <span className="text-[11px] text-amber-400/80">
                  {currentLang === 'en' ? 'Tap any card to open' : 'कोणत्याही कार्डवर टॅप करून उघडा'}
                </span>
              </div>

              {filteredMegaTabs.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <span className="text-3xl block mb-2">🔍</span>
                  <p className="font-semibold text-sm">
                    {currentLang === 'en' ? 'No sections found matching your search.' : 'या नावाने कोणतेही दालन आढळले नाही.'}
                  </p>
                  <button
                    onClick={() => {
                      setMegaSearchQuery('');
                      setActiveCategoryFilter('all');
                    }}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold"
                  >
                    {currentLang === 'en' ? 'Reset Filters' : 'सर्व दालने पुन्हा पहा'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredMegaTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`p-3 rounded-2xl text-left transition-all border flex items-start gap-3 group hover:scale-[1.01] ${
                          isActive
                            ? 'bg-gradient-to-r from-saffron-950/70 via-stone-900 to-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                            : 'bg-stone-950/70 hover:bg-stone-900 border-stone-800/80 hover:border-amber-500/40'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                            isActive
                              ? 'bg-gradient-to-tr from-saffron-600 to-amber-500 text-white shadow-sm'
                              : 'bg-stone-900 text-amber-400 border border-stone-800 group-hover:border-amber-400 group-hover:text-amber-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <div className="flex items-center justify-between gap-1">
                            <h3 className={`text-xs sm:text-sm font-bold truncate ${
                              isActive ? 'text-amber-300 font-serifDev' : 'text-stone-200 group-hover:text-white'
                            }`}>
                              {tab.label[currentLang]}
                            </h3>
                            {isActive ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/30 text-amber-300 shrink-0">
                                {currentLang === 'en' ? 'Active' : 'सक्रिय'}
                              </span>
                            ) : tab.badge ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-stone-800 text-stone-300 shrink-0">
                                {tab.badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-2 leading-relaxed">
                            {tab.desc[currentLang]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mega Drawer Footer */}
            <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-stone-950 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span>🕉️</span>
                <span className="text-stone-400">
                  {currentLang === 'en' ? 'Sanatan Amrutdhara Platform' : 'सनातन अमृतधारा - अखंड ज्ञान व भक्ती'}
                </span>
              </div>
              <button
                onClick={() => setIsMegaMenuOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors"
              >
                {currentLang === 'en' ? 'Close' : 'बंद करा'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MOBILE BOTTOM NAVIGATION DOCK (FIXED AT SCREEN BOTTOM)
          Offers 1-thumb access to core screens + full mega drawer
          ============================================================ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14120f]/95 backdrop-blur-xl border-t border-stone-800/90 py-1.5 px-3 flex items-center justify-around shadow-2xl safe-area-bottom"
        aria-label="Mobile Bottom Navigation"
      >
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-xl text-[10px] font-medium transition-all ${
            activeTab === 'home'
              ? 'text-saffron-400 font-bold scale-105'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>{currentLang === 'en' ? 'Home' : 'मुख्य'}</span>
        </button>

        <button
          onClick={() => handleTabClick('deities')}
          className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-xl text-[10px] font-medium transition-all ${
            activeTab === 'deities' || activeTab === 'god-detail'
              ? 'text-saffron-400 font-bold scale-105'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span>{currentLang === 'en' ? '50 Deities' : '५० देव'}</span>
        </button>

        <button
          onClick={() => handleTabClick('japa')}
          className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-xl text-[10px] font-medium transition-all ${
            activeTab === 'japa'
              ? 'text-saffron-400 font-bold scale-105'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>{currentLang === 'en' ? '108 Mala' : '१०८ जप'}</span>
        </button>

        <button
          onClick={() => handleTabClick('live-darshan')}
          className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-xl text-[10px] font-medium transition-all ${
            activeTab === 'live-darshan'
              ? 'text-saffron-400 font-bold scale-105'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Radio className="w-5 h-5 mb-0.5 text-red-500 animate-pulse" />
          <span>{currentLang === 'en' ? 'Live' : 'दर्शन'}</span>
        </button>

        {/* Mega Drawer Trigger in Mobile Bottom Bar */}
        <button
          onClick={() => setIsMegaMenuOpen(true)}
          className="flex flex-col items-center justify-center py-0.5 px-2 rounded-xl text-[10px] font-bold text-amber-300 transition-all hover:scale-105"
        >
          <div className="relative">
            <Menu className="w-5 h-5 mb-0.5 text-amber-400" />
            <span className="absolute -top-1 -right-2 px-1 rounded-full text-[8px] bg-amber-500 text-black font-extrabold">
              35
            </span>
          </div>
          <span>{currentLang === 'en' ? 'All (35+)' : 'सर्व दालने'}</span>
        </button>
      </nav>

      {/* Floating Surprise Blessing Notification Toast */}
      {surpriseToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md p-4 rounded-3xl bg-gradient-to-r from-amber-950 via-[#211710] to-stone-950 border-2 border-amber-400 text-white shadow-2xl animate-bounce">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center text-xl shrink-0 shadow-md">
              ✨
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300">
                {currentLang === 'en' ? 'Divine Portal Discovered' : 'आजचे दैवी दालन उघडत आहे'}
              </span>
              <h4 className="text-sm font-bold font-serifDev text-white mt-0.5">
                {surpriseToast.name}
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                {surpriseToast.blessing}
              </p>
            </div>
            <button
              onClick={() => setSurpriseToast(null)}
              className="text-stone-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Dialog Modal */}
      {isShortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#171410] border border-amber-500/40 p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold font-serifDev text-base text-amber-300">
                  {currentLang === 'en' ? 'Quick Keyboard Hotkeys' : 'कीबोर्ड शॉर्टकट्स'}
                </h3>
              </div>
              <button
                onClick={() => setIsShortcutsOpen(false)}
                className="w-7 h-7 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">Ctrl + K</span>
                <span className="font-semibold text-amber-300">शोधा (Universal Search)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">1</span>
                <span className="font-semibold text-amber-300">मुख्य दालन (Dashboard)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">2</span>
                <span className="font-semibold text-amber-300">सर्व ५० देव-देवता</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">3</span>
                <span className="font-semibold text-amber-300">१०८ जप माळ</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">4</span>
                <span className="font-semibold text-amber-300">🔴 थेट दर्शन व आरत्या</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">5</span>
                <span className="font-semibold text-amber-300">🪔 व्हर्च्युअल पूजा दालन</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">W</span>
                <span className="font-semibold text-amber-300">🚩 पंढरपूर वारी ३D</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">R</span>
                <span className="font-semibold text-amber-300">🎲 आजचे दैवी दालन (Surprise Me)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300">M</span>
                <span className="font-semibold text-amber-300">🔔 मंदिर ध्वनी चालू/बंद</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsShortcutsOpen(false)}
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold text-xs transition-colors"
              >
                समजले (Got it)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

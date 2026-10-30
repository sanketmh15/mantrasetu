import { Language, ThemeMode, TextSize } from '../types';

export interface CommandExecutionResult {
  actionExecuted: boolean;
  actionType?: 
    | 'COUNT_JAPA'
    | 'RESET_JAPA'
    | 'NAVIGATE_TAB'
    | 'OPEN_DEITY'
    | 'CHANGE_LANGUAGE'
    | 'SET_THEME'
    | 'SET_TEXT_SIZE'
    | 'PLAY_SOUND'
    | 'STOP_AUDIO'
    | 'OPEN_GLOSSARY';
  actionDetails?: {
    tab?: string;
    tabName?: string;
    godId?: string;
    godName?: string;
    targetLang?: Language;
    theme?: ThemeMode;
    textSize?: TextSize;
    soundType?: 'bell' | 'shankha' | 'tanpura_start' | 'tanpura_stop';
    countAmount?: number;
    totalToday?: number;
  };
  assistantResponse: string;
}

export interface AppActionHandlers {
  navigateTab: (tab: string) => void;
  openGodDetail: (godId: string) => void;
  changeLanguage: (lang: Language) => void;
  setTheme: (theme: ThemeMode) => void;
  setTextSize: (size: TextSize) => void;
  incrementJapa: (amount?: number) => { count: number; todayTotal: number };
  resetJapa: () => void;
  playTempleBell: () => void;
  playShankha: () => void;
  startTanpura: () => void;
  stopTanpura: () => void;
  stopAudio: () => void;
  openGlossary: () => void;
  openLoginModal?: () => void;
  logout?: () => void;
  getAppState: () => {
    activeTab: string;
    currentLang: Language;
    theme: ThemeMode;
    selectedGodId: string;
  };
}

// 50 Deity Keywords Mapping
const deityKeywords: Record<string, { id: string; nameEn: string; nameMr: string; nameHi: string; keywords: string[] }> = {
  ganesha: { id: 'ganesha', nameEn: 'Lord Ganesha', nameMr: 'श्री गणेश', nameHi: 'भगवान गणेश', keywords: ['ganesh', 'ganesha', 'ganpati', 'गणेश', 'गणपती', 'बाप्पा', 'विघ्नहर्ता', 'लंबोदर'] },
  shiva: { id: 'shiva', nameEn: 'Lord Shiva', nameMr: 'भगवान शिव', nameHi: 'भगवान शिव', keywords: ['shiva', 'shiv', 'mahadev', 'shankar', 'शिव', 'महादेव', 'शंकर', 'भोलेनाथ', 'कैलासपती'] },
  parvati: { id: 'parvati', nameEn: 'Mata Parvati', nameMr: 'माता पार्वती', nameHi: 'माता पार्वती', keywords: ['parvati', 'uma', 'gauri', 'पार्वती', 'उमा', 'गौरी'] },
  vishnu: { id: 'vishnu', nameEn: 'Lord Vishnu', nameMr: 'भगवान विष्णू', nameHi: 'भगवान विष्णु', keywords: ['vishnu', 'narayan', 'विष्णू', 'विष्णु', 'नारायण', 'श्रीहरी', 'वैकुंठ'] },
  lakshmi: { id: 'lakshmi', nameEn: 'Mata Lakshmi', nameMr: 'माता लक्ष्मी', nameHi: 'माता लक्ष्मी', keywords: ['lakshmi', 'laxmi', 'लक्ष्मी', 'महालक्ष्मी', 'कमलवासिनी'] },
  saraswati: { id: 'saraswati', nameEn: 'Mata Saraswati', nameMr: 'माता सरस्वती', nameHi: 'माता सरस्वती', keywords: ['saraswati', 'sharada', 'सरस्वती', 'शारदा', 'विद्यादेवी'] },
  hanuman: { id: 'hanuman', nameEn: 'Lord Hanuman', nameMr: 'श्री हनुमान', nameHi: 'श्री हनुमान', keywords: ['hanuman', 'maruti', 'bajrangbali', 'मारुती', 'हनुमान', 'बजरंगबली', 'अंजनीपुत्र'] },
  rama: { id: 'rama', nameEn: 'Lord Rama', nameMr: 'प्रभू श्रीराम', nameHi: 'भगवान श्रीराम', keywords: ['rama', 'ram', 'ramachandra', 'राम', 'श्रीराम', 'रामचंद्र', 'अयोध्यापती'] },
  sita: { id: 'sita', nameEn: 'Mata Sita', nameMr: 'माता सीता', nameHi: 'माता सीता', keywords: ['sita', 'seeta', 'janaki', 'सीता', 'जानकी', 'सीतामाई'] },
  krishna: { id: 'krishna', nameEn: 'Lord Krishna', nameMr: 'श्रीकृष्ण', nameHi: 'भगवान श्रीकृष्ण', keywords: ['krishna', 'kanha', 'govind', 'कृष्ण', 'श्रीकृष्ण', 'कान्हा', 'गोपाळ', 'द्वारकाधीश'] },
  radha: { id: 'radha', nameEn: 'Mata Radha', nameMr: 'राधारानी', nameHi: 'राधारानी', keywords: ['radha', 'radharani', 'राधा', 'राधारानी', 'वृंदावन'] },
  vitthal: { id: 'vitthal', nameEn: 'Lord Vitthal', nameMr: 'श्री विठ्ठल', nameHi: 'भगवान विट्ठल', keywords: ['vitthal', 'vithoba', 'pandurang', 'विठ्ठल', 'विठोबा', 'पांडुरंग', 'माउली', 'पंढरपूर'] },
  rakhumai: { id: 'rakhumai', nameEn: 'Mata Rakhumai', nameMr: 'माता रखुमाई', nameHi: 'माता रुक्मिणी', keywords: ['rakhumai', 'rukmini', 'रखुमाई', 'रुक्मिणी'] },
  khandoba: { id: 'khandoba', nameEn: 'Lord Khandoba', nameMr: 'श्री खंडोबा (जेजुरी)', nameHi: 'भगवान खंडोबा', keywords: ['khandoba', 'jejuri', 'malhari', 'खंडोबा', 'जेजुरी', 'मल्हारी', 'यळकोट'] },
  'tulja-bhavani': { id: 'tulja-bhavani', nameEn: 'Mata Tulja Bhavani', nameMr: 'आई तुळजाभवानी', nameHi: 'मां तुलजा भवानी', keywords: ['tulja', 'bhavani', 'तुळजाभवानी', 'तुळजापूर', 'भवानी', 'कुलस्वामिनी'] },
  'kolhapur-ambabai': { id: 'kolhapur-ambabai', nameEn: 'Kolhapur Ambabai', nameMr: 'कोल्हापूर अंबाबाई', nameHi: 'कोल्हापुर महालक्ष्मी', keywords: ['kolhapur', 'ambabai', 'कोल्हापूर', 'अंबाबाई', 'करवीर निवासिनी'] },
  dattatreya: { id: 'dattatreya', nameEn: 'Lord Dattatreya', nameMr: 'श्री दत्तात्रेय', nameHi: 'भगवान दत्तात्रेय', keywords: ['datta', 'dattatreya', 'दत्त', 'दत्तात्रेय', 'गुरुदेव दत्त', 'दिगंबरा'] },
  'swami-samarth': { id: 'swami-samarth', nameEn: 'Swami Samarth', nameMr: 'श्री स्वामी समर्थ (अक्कलकोट)', nameHi: 'स्वामी समर्थ', keywords: ['swami', 'swami samarth', 'akkalkot', 'स्वामी', 'स्वामी समर्थ', 'अक्कलकोट', 'भिऊ नकोस'] },
  'sai-baba': { id: 'sai-baba', nameEn: 'Sai Baba of Shirdi', nameMr: 'शिर्डी साई बाबा', nameHi: 'शिरडी साईं बाबा', keywords: ['sai', 'sai baba', 'shirdi', 'साई', 'साई बाबा', 'शिर्डी'] },
  'gajanan-maharaj': { id: 'gajanan-maharaj', nameEn: 'Sant Gajanan Maharaj', nameMr: 'संत गजानन महाराज (शेगाव)', nameHi: 'संत गजानन महाराज', keywords: ['gajanan', 'gajanan maharaj', 'shegaon', 'गजानन', 'गजानन महाराज', 'शेगाव', 'गणात बोते'] },
  kartikeya: { id: 'kartikeya', nameEn: 'Lord Kartikeya', nameMr: 'कार्तिकेय (मुरुगन)', nameHi: 'भगवान कार्तिकेय', keywords: ['kartikeya', 'murugan', 'skanda', 'कार्तिकेय', 'मुरुगन', 'स्कंद'] },
  surya: { id: 'surya', nameEn: 'Lord Surya Dev', nameMr: 'सूर्यनारायण', nameHi: 'भगवान सूर्य', keywords: ['surya', 'sun', 'सूर्य', 'सूर्यनारायण', 'भास्कर'] },
  chandra: { id: 'chandra', nameEn: 'Lord Chandra Dev', nameMr: 'चंद्रदेव', nameHi: 'भगवान चंद्रदेव', keywords: ['chandra', 'moon', 'चंद्र', 'सोम'] },
  kalabhairava: { id: 'kalabhairava', nameEn: 'Lord Kalabhairava', nameMr: 'कालभैरव', nameHi: 'कालभैरव', keywords: ['kalabhairava', 'bhairav', 'कालभैरव', 'भैरव'] },
  narasimha: { id: 'narasimha', nameEn: 'Lord Narasimha', nameMr: 'भगवान नृसिंह', nameHi: 'भगवान नृसिंह', keywords: ['narasimha', 'narsimha', 'नरसिंह', 'नृसिंह'] },
  shani: { id: 'shani-dev', nameEn: 'Lord Shani Dev', nameMr: 'शनिदेव (शिंगणापूर)', nameHi: 'शनिदेव', keywords: ['shani', 'shani dev', 'shingnapur', 'शनि', 'शनिदेव', 'शिंगणापूर'] },
  jagannath: { id: 'jagannath', nameEn: 'Lord Jagannath', nameMr: 'श्री जगन्नाथ पुरी', nameHi: 'भगवान जगन्नाथ', keywords: ['jagannath', 'puri', 'जगन्नाथ', 'पुरी धाम'] },
  venkateswara: { id: 'venkateswara', nameEn: 'Lord Venkateswara', nameMr: 'तिरुपती बालाजी', nameHi: 'तिरुपति बालाजी', keywords: ['tirupati', 'balaji', 'venkateswara', 'तिरुपती', 'बालाजी', 'वेंकटेश्वर'] },
  ayyappa: { id: 'ayyappa', nameEn: 'Lord Ayyappa', nameMr: 'स्वामी अय्यप्पा', nameHi: 'स्वामी अय्यप्पा', keywords: ['ayyappa', 'sabarimala', 'अय्यप्पा', 'सबरीमाला'] },
  durga: { id: 'durga', nameEn: 'Mata Durga', nameMr: 'आई जगदंबा दुर्गा', nameHi: 'मां दुर्गा', keywords: ['durga', 'mahadurga', 'दुर्गा', 'जगदंबा', 'महिषासुरमर्दिनी'] },
  kali: { id: 'kali', nameEn: 'Mata Mahakali', nameMr: 'महाकाली', nameHi: 'मां काली', keywords: ['kali', 'mahakali', 'काली', 'महाकाली'] },
  ganga: { id: 'ganga', nameEn: 'Mata Ganga', nameMr: 'गंगा माता', nameHi: 'गंगा मैया', keywords: ['ganga', 'ganges', 'गंगा', 'गंगामाता', 'हर हर गंगे'] },
  yamuna: { id: 'yamuna', nameEn: 'Mata Yamuna', nameMr: 'यमुना माता', nameHi: 'यमुना मैया', keywords: ['yamuna', 'यमुना', 'कालिंदी'] }
};

// Tabs Mapping
const tabKeywords: Record<string, { id: string; nameEn: string; nameMr: string; nameHi: string; keywords: string[] }> = {
  home: { id: 'home', nameEn: 'Home Dashboard', nameMr: 'मुख्य दालन', nameHi: 'मुख्य पृष्ठ', keywords: ['home', 'home page', 'dash', 'dashboard', 'घर', 'मुख्य', 'होम', 'सुरुवात'] },
  kumbh: { id: 'kumbh', nameEn: 'Simhastha Kumbh Mela', nameMr: 'सिंहस्थ कुंभमेळा मार्गदर्शक', nameHi: 'सिंहस्थ कुंभमेला', keywords: ['kumbh', 'kumbh mela', 'simhastha', 'कुंभ', 'कुंभमेळा', 'कुंभमेला', 'सिंहस्थ', 'शाही स्नान', 'नाशिक कुंभ'] },
  deities: { id: 'deities', nameEn: 'All 50 Deities Portal', nameMr: 'सर्व ५० देव-देवता दालन', nameHi: 'समस्त ५० देवी-देवता', keywords: ['50 gods', 'all gods', 'fifty gods', 'deities', 'gods', '५० देव', 'सर्व देव', 'देवता', 'सर्व देवता', 'देव दालन'] },
  japa: { id: 'japa', nameEn: '108 Japa Counter', nameMr: '१०८ जपमाळ काउंटर', nameHi: '१०८ जप माला काउंटर', keywords: ['japa', 'jap', 'mala', 'counter', 'जप', 'जपमाळ', 'जप काउंटर', 'माळ', 'नामस्मरण'] },
  chalisa: { id: 'chalisa', nameEn: 'Hanuman Chalisa', nameMr: 'हनुमान चालीसा', nameHi: 'हनुमान चालीसा', keywords: ['chalisa', 'hanuman chalisa', 'चालीसा', 'हनुमान चालीसा'] },
  mantras: { id: 'mantras', nameEn: 'Mantras & Stotras', nameMr: 'मंत्र, स्तोत्रे व आरती', nameHi: 'मन्त्र एवं स्तोत्र', keywords: ['mantras', 'stotras', 'मंत्र', 'स्तोत्र', 'आरती', 'मंत्र दालन'] },
  ashtavinayak: { id: 'ashtavinayak', nameEn: 'Ashtavinayak Circuit', nameMr: 'अष्टविनायक तीर्थयात्रा', nameHi: 'अष्टविनायक यात्रा', keywords: ['ashtavinayak', '8 ganesh', 'अष्टविनायक', 'मोरगाव', 'थेऊर', 'ओझर'] },
  jyotirlinga: { id: 'jyotirlinga', nameEn: 'Maharashtra 5 Jyotirlingas', nameMr: 'महाराष्ट्रातील ५ ज्योतिर्लिंगे', nameHi: '५ ज्योतिर्लिंग', keywords: ['jyotirlinga', '5 jyotirlinga', 'ज्योतिर्लिंग', 'त्र्यंबकेश्वर', 'भीमाशंकर', 'घृष्णेश्वर'] },
  wari: { id: 'wari', nameEn: 'Pandharpur Wari Route', nameMr: 'पंढरपूर वारी पालखी मार्ग', nameHi: 'पंढरपुर वारी', keywords: ['wari', 'vaari', 'वारी', 'पालखी', 'संत तुकाराम पालखी', 'ज्ञानेश्वर पालखी', 'आषाढी वारी'] },
  calendar: { id: 'calendar', nameEn: 'Devotional Calendar & Panchang', nameMr: 'भक्ती कॅलेंडर व पंचांग', nameHi: 'पंचांग एवं कैलेंडर', keywords: ['calendar', 'panchang', 'कॅलेंडर', 'पंचांग', 'एकादशी', 'संष्टी', 'तिथी'] },
  pilgrimage: { id: 'pilgrimage', nameEn: 'Pilgrimage Planner', nameMr: 'तीर्थयात्रा नियोजन', nameHi: 'तीर्थयात्रा योजना', keywords: ['pilgrimage', 'planner', 'तीर्थयात्रा', 'नियोजन', 'प्रवास प्लॅनर'] },
  worship: { 
    id: 'worship', 
    nameEn: 'Day-Wise Puja & Daily Worship Guide', 
    nameMr: 'वारानुसार देवता व पूजा विधी', 
    nameHi: 'वार अनुसार दैनिक पूजा विधि', 
    keywords: [
      'worship', 'puja', 'pooja', 'पूजा', 'उपासना', 'विधी', 'पूजा पद्धत', 
      'वार पूजा', 'वारानुसार', 'वारानुसार पूजा', 'आजचा वार', 'आजची पूजा', 
      'day puja', 'weekday puja', 'today puja', 'daily puja', 'daily worship'
    ] 
  },
  temples: { id: 'temples', nameEn: 'Historic Temples Directory', nameMr: 'ऐतिहासिक मंदिरे सूची', nameHi: 'मंदिर सूची', keywords: ['temple', 'temples', 'मंदिरे', 'मंदिर', 'दर्शन'] },
  maharashtra: { id: 'maharashtra', nameEn: 'Maharashtra Spiritual Heritage', nameMr: 'महाराष्ट्र आध्यात्मिक वारसा', nameHi: 'महाराष्ट्र दर्शन', keywords: ['maharashtra', 'महाराष्ट्र', 'संस्कृती', 'वारसा'] },
  puja: { id: 'puja', nameEn: 'Interactive Virtual E-Puja Sanctum', nameMr: 'डिजिटल ई-पूजा व आरती गाभारा', nameHi: 'डिजिटल ई-पूजा एवं आरती', keywords: ['puja', 'arti', 'aarti', 'e-puja', 'virtual puja', 'आरती', 'ई-पूजा', 'गाभारा', 'दीप दर्शन'] },
  choghadiya: { id: 'choghadiya', nameEn: 'Live Choghadiya & Rahu Kaal', nameMr: 'प्रत्यक्ष चौघडिया व राहुकाळ', nameHi: 'दैनिक चौघड़िया एवं राहुकाल', keywords: ['choghadiya', 'muhurat', 'rahu kaal', 'rahu', 'चौघडिया', 'मुहूर्त', 'राहुकाळ', 'राहुकाल', 'शुभ वेळ'] },
  meditation: { id: 'meditation', nameEn: 'Akhand Bhakti Sounds & Sleep Timer', nameMr: 'अखंड ध्यान नाद व स्लीप टाइमर', nameHi: 'अखंड ध्यान ध्वनियां एवं स्लीप टाइमर', keywords: ['meditation', 'sleep', 'sound', 'sounds', 'om drone', 'ambient', 'ध्यान', 'निद्रा', 'झोप', 'नाद', 'ओंकार'] },
  'status-card': { id: 'status-card', nameEn: 'Devotional WhatsApp Status Card', nameMr: '१-क्लिक व्हॉट्सॲप स्टेटस कार्ड', nameHi: 'व्हाट्सएप स्टेटस कार्ड', keywords: ['status', 'whatsapp status', 'status card', 'story', 'स्टेटस', 'व्हॉट्सॲप स्टेटस', 'सुविचार कार्ड'] },
  'nearby-temples': { id: 'nearby-temples', nameEn: 'Nearby Ancient Temples GPS Guide', nameMr: 'जवळची प्राचीन मंदिरे व GPS', nameHi: 'समीपवर्ती प्राचीन मंदिर', keywords: ['nearby', 'nearby temples', 'gps', 'closest temple', 'जवळची मंदिरे', 'मंदिर शोध', 'समीपवर्ती मंदिर'] },
  satvik: { id: 'satvik', nameEn: 'Satvik Prasad Recipes & Fasting Guide', nameMr: 'सात्विक प्रसाद पाककृती व उपवास नियम', nameHi: 'सात्विक प्रसाद एवं व्रत नियम', keywords: ['prasad', 'recipes', 'upvas', 'fasting', 'modak', 'sheera', 'प्रसाद', 'पाककृती', 'उपवास', 'मोदक', 'शिरा', 'नैवेद्य'] },
  checklist: { id: 'checklist', nameEn: 'Puja Shopping Checklist', nameMr: 'पूजा साहित्य खरेदी यादी', nameHi: 'पूजा सामग्री सूची', keywords: ['checklist', 'shopping', 'samagri', 'puja items', 'पूजा साहित्य', 'खरेदी', 'सामग्री यादी', 'पूजा सामान'] },
  'festival-prep': { id: 'festival-prep', nameEn: 'Festival Preparation & Observance Guide', nameMr: 'सण-उत्सव पूर्वतयारी व विधी', nameHi: 'त्योहार तैयारी एवं विधि', keywords: ['festival', 'festival prep', 'त्योहार', 'सण', 'उत्सव', 'सण तयारी', 'तयारी'] },
  vrat: { id: 'vrat', nameEn: 'Traditional Vrat Science & Sankalpa Guide', nameMr: 'शास्त्रोक्त व्रत व संकल्प विधी', nameHi: 'व्रत विधि एवं संकल्प', keywords: ['vrat', 'fast', 'sankalpa', 'parana', 'व्रत', 'संकल्प', 'पारणा', 'एकादशी व्रत', 'प्रदोष व्रत'] },
  library: { id: 'library', nameEn: 'Personal Devotional Library & Offline Vault', nameMr: 'माझे भक्ती ग्रंथालय व ऑफलाइन', nameHi: 'मेरी भक्ति लाइब्रेरी', keywords: ['library', 'bookmark', 'favorite', 'offline', 'ग्रंथालय', 'माझे दालन', 'आवडते', 'ऑफलाइन'] },
  'temple-3d': { id: 'temple-3d', nameEn: '3D Temple Explorer', nameMr: '३D मंदिर दर्शन', nameHi: '3D मन्दिर दर्शन', keywords: ['3d', '3d temple', 'virtual tour', '३d', '३डी', 'त्रिमितीय', 'शिखर दर्शन', 'वास्तुकला'] },
  wallpaper: { id: 'wallpaper', nameEn: 'Devotional Wallpaper Creator', nameMr: 'वॉलपेपर स्टुडिओ', nameHi: 'वॉलपेपर क्रिएटर', keywords: ['wallpaper', 'status creator', 'dp', 'वॉलपेपर', 'फोटो', 'डीपी', 'वॉलपेपर डाऊनलोड'] },
  scanner: { id: 'scanner', nameEn: 'Shloka Scanner & OCR', nameMr: 'श्लोक स्कॅनर', nameHi: 'श्लोक स्कैनर', keywords: ['scan', 'scanner', 'ocr', 'shloka scanner', 'स्कॅनर', 'स्कॅन', 'श्लोक स्कॅनर', 'कॅमेरा'] },
  'digital-library': { id: 'digital-library', nameEn: 'Digital Granthalaya', nameMr: 'डिजिटल संत साहित्य ग्रंथालय', nameHi: 'डिजिटल ग्रन्थालय', keywords: ['dnyaneshwari', 'dasbodh', 'gatha', 'scripture', 'ज्ञानेश्वरी', 'दासबोध', 'तुकाराम गाथा', 'ग्रंथ', 'पोथी'] },
  stories: { id: 'stories', nameEn: 'Stories for Children', nameMr: 'बाल संस्कार बोधकथा', nameHi: 'बाल संस्कार कथाएँ', keywords: ['story', 'stories', 'kids', 'children', 'गोष्ट', 'गोष्टी', 'बाल संस्कार', 'मुलांसाठी', 'बोधकथा'] },
  symbolism: { id: 'symbolism', nameEn: 'Deity Symbolism Explorer', nameMr: 'देवता प्रतीक रहस्य', nameHi: 'प्रतीक मीमांसा', keywords: ['symbol', 'weapon', 'mudra', 'trishula', 'chakra', 'प्रतीक', 'त्रिशूळ', 'सुदर्शन', 'नंदी', 'आयुध', 'मुद्रा'] },
  'live-darshan': { id: 'live-darshan', nameEn: '24x7 Live Temple Darshan', nameMr: 'थेट मंदिर दर्शन', nameHi: 'सीधा मन्दिर दर्शन', keywords: ['live', 'live darshan', 'stream', 'थेट दर्शन', 'लाईव्ह', 'लाईव्ह दर्शन', 'सिद्धिविनायक लाईव्ह', 'शिर्डी लाईव्ह'] },
  rashi: { id: 'rashi', nameEn: 'Rashi & Beej Mantra', nameMr: 'राशी व इष्टदेवता', nameHi: 'राशि एवं इष्टदेवता', keywords: ['rashi', 'zodiac', 'beej mantra', 'रास', 'राशी', 'जन्मरास', 'मेष', 'वृषभ', 'इष्टदेवता', 'बीजमंत्र'] },
  bhajan: { id: 'bhajan', nameEn: 'Bhajan & Bhupali Hub', nameMr: 'भजन व भूपाळी', nameHi: 'भजन एवं भूपाळी', keywords: ['bhajan', 'bhupali', 'abhang', 'घनश्याम सुंदरा', 'भूपाळी', 'अभंग', 'भजन', 'कानडा राजा'] },
  reminders: { id: 'reminders', nameEn: 'Daily Reminders & Alarm', nameMr: 'दैनिक स्मरण सूचना', nameHi: 'दैनिक स्मरण', keywords: ['reminder', 'notification', 'alarm', 'रिमाइंडर', 'सूचना', 'अलार्म', 'स्मरण'] },
  admin: { id: 'admin', nameEn: 'Admin Command Center', nameMr: 'अ‍ॅडमिन कमांड केंद्र', nameHi: 'प्रशासक कमांड सेंटर', keywords: ['admin', 'admin panel', 'अ‍ॅडमिन', 'प्रशासक', 'मालक लॉगिन', 'admin login', 'admin portal'] }
};

/**
 * Checks if the user query contains a direct command to control the app,
 * executes the appropriate handler, and returns a rich response.
 */
export function interpretAndExecuteAppCommand(
  rawQuery: string,
  handlers: AppActionHandlers,
  currentLang: Language
): CommandExecutionResult | null {
  const q = rawQuery.toLowerCase().trim();

  // 0. LOGIN & LOGOUT COMMANDS
  if (q.includes('login') || q.includes('लॉगिन') || q.includes('sign in') || q.includes('साइन इन') || q.includes('प्रवेश')) {
    handlers.openLoginModal?.();
    const text =
      currentLang === 'en'
        ? '👤 Authentication portal opened! Log in with Phone OTP or Google.'
        : currentLang === 'hi'
        ? '👤 लॉगिन दालन खोल दिया गया है! फोन ओटीपी या गूगल से लॉगिन करें।'
        : '👤 लॉगिन दालन उघडले आहे! मोबाईल नंबर ओटीपी किंवा गुगलने लॉगिन करा.';

    return {
      actionExecuted: true,
      assistantResponse: text,
    };
  }

  if (q.includes('logout') || q.includes('लॉगआउट') || q.includes('sign out') || q.includes('साइन आउट') || q.includes('बाहेर पडा')) {
    handlers.logout?.();
    handlers.playTempleBell();
    const text =
      currentLang === 'en'
        ? '🚪 Logged out successfully. May divine blessings remain with you!'
        : currentLang === 'hi'
        ? '🚪 सफलतापूर्वक लॉगआउट कर दिया गया है। प्रभु की कृपा बनी रहे!'
        : '🚪 आपण यशस्वीरित्या लॉगआउट झाला आहात. ईश्वर आपले कल्याण करो!';

    return {
      actionExecuted: true,
      assistantResponse: text,
    };
  }

  // 1. JAPA COUNTING COMMANDS (e.g. "count jap", "जप कर", "start japa", "108 jap", "click count")
  const isJapaCountCommand =
    q.includes('count jap') ||
    q.includes('count japa') ||
    q.includes('do jap') ||
    q.includes('start japa') ||
    q.includes('start jap') ||
    q.includes('1 jap') ||
    q.includes('one jap') ||
    q.includes('जप कर') ||
    q.includes('जप मोज') ||
    q.includes('एक जप') ||
    q.includes('जप सुरू') ||
    q.includes('जप वाढवा') ||
    q.includes('माळ ओढा') ||
    q.includes('नामस्मरण कर') ||
    q.includes('जप गिनो') ||
    q.includes('जप करो') ||
    q.includes('click count') ||
    q.includes('click jap') ||
    q === 'jap' ||
    q === 'japa' ||
    q === 'जप';

  if (isJapaCountCommand) {
    const res = handlers.incrementJapa(1);
    handlers.playTempleBell();

    const text =
      currentLang === 'en'
        ? `🚩 Command Executed! Recorded 1 sacred Japa chant for you. Today's total: ${res.todayTotal} chants. May your spiritual strength increase!`
        : currentLang === 'hi'
        ? `🚩 आदेश संपन्न! आपके लिए १ पावन नाम जप गिना गया है। आज का कुल जप: ${res.todayTotal}। प्रभु की कृपा आप पर बनी रहे!`
        : `🚩 आदेश मान्य! तुमच्यासाठी १ पावन नामस्मरण जप मोजण्यात आला आहे. आजचा एकूण जप: ${res.todayTotal}। ईश्वर आपल्या सर्व मनोकामना पूर्ण करो!`;

    return {
      actionExecuted: true,
      actionType: 'COUNT_JAPA',
      actionDetails: {
        countAmount: 1,
        totalToday: res.todayTotal,
      },
      assistantResponse: text,
    };
  }

  // 2. RESET JAPA COMMAND
  if (q.includes('reset jap') || q.includes('reset counter') || q.includes('जप रीसेट') || q.includes('जप मिटवा')) {
    handlers.resetJapa();
    const text =
      currentLang === 'en'
        ? '🔄 Japa Mala counter has been reset to 0. You are ready for a fresh new Mala.'
        : currentLang === 'hi'
        ? '🔄 जप माला काउंटर ० पर रीसेट कर दिया गया है। नई माला का शुभारंभ करें।'
        : '🔄 जपमाळ काउंटर ० वर रीसेट करण्यात आला आहे. आपण नव्या उत्साहाने नवीन माळ सुरू करू शकता.';

    return {
      actionExecuted: true,
      actionType: 'RESET_JAPA',
      assistantResponse: text,
    };
  }

  // 3. SOUND & AUDIO COMMANDS (Temple Bell, Shankha, Tanpura, Stop Audio)
  if (q.includes('bell') || q.includes('घंटा') || q.includes('घंटानाद') || q.includes('ring bell')) {
    handlers.playTempleBell();
    const text =
      currentLang === 'en'
        ? '🔔 Divine brass temple bell has been sounded. Experience the purifying vibrations!'
        : currentLang === 'hi'
        ? '🔔 पावन मंदिर की पीतल की घंटी बजा दी गई है। सकारात्मक ऊर्जा का अनुभव करें।'
        : '🔔 मंदिराची पवित्र पितळी घंटा वाजवली आहे! या मांगलिक नादाने परिसर पावन झाला आहे.';

    return {
      actionExecuted: true,
      actionType: 'PLAY_SOUND',
      actionDetails: { soundType: 'bell' },
      assistantResponse: text,
    };
  }

  if (q.includes('shankha') || q.includes('conch') || q.includes('शंख') || q.includes('शंखनाद')) {
    handlers.playShankha();
    const text =
      currentLang === 'en'
        ? '📯 Sacred Conch (Shankhanaad) blown! Dispelling negative energies and awakening divine consciousness.'
        : currentLang === 'hi'
        ? '📯 पावन शंखनाद कर दिया गया है! समस्त नकारात्मकता का शमन और चेतना का जागरण।'
        : '📯 पावन शंखनाद करण्यात आला आहे! सर्व नकारात्मक ऊर्जेचा नाश होऊन दिव्य चेतना जागृत झाली आहे.';

    return {
      actionExecuted: true,
      actionType: 'PLAY_SOUND',
      actionDetails: { soundType: 'shankha' },
      assistantResponse: text,
    };
  }

  if (q.includes('stop audio') || q.includes('stop sound') || q.includes('mute') || q.includes('शांत व्हा') || q.includes('आवाज बंद') || q.includes('थांबा')) {
    handlers.stopAudio();
    handlers.stopTanpura();
    const text =
      currentLang === 'en'
        ? '🔇 All audio playback and voice recitation has been paused.'
        : currentLang === 'hi'
        ? '🔇 सभी ध्वनि एवं उच्चारण बंद कर दिए गए हैं।'
        : '🔇 सर्व ध्वनी आणि आवाज थांबवण्यात आले आहेत.';

    return {
      actionExecuted: true,
      actionType: 'STOP_AUDIO',
      assistantResponse: text,
    };
  }

  // 4. THEME & DARK MODE COMMANDS
  if (q.includes('dark mode') || q.includes('dark theme') || q.includes('डार्क मोड') || q.includes('काळी थीम') || q.includes('काळोख')) {
    handlers.setTheme('dark');
    const text =
      currentLang === 'en'
        ? '🌙 Dark Theme activated! Easy on the eyes for tranquil nighttime meditation.'
        : currentLang === 'hi'
        ? '🌙 डार्क मोड सक्रिय कर दिया गया है! रात्रि कालीन साधना हेतु सर्वोत्तम।'
        : '🌙 डार्क मोड (Dark Mode) सुरू करण्यात आला आहे! रात्रीच्या शांत नामस्मरणासाठी डोळ्यांना सुखद.';

    return {
      actionExecuted: true,
      actionType: 'SET_THEME',
      actionDetails: { theme: 'dark' },
      assistantResponse: text,
    };
  }

  if (q.includes('light mode') || q.includes('light theme') || q.includes('लाईट मोड') || q.includes('उजेड')) {
    handlers.setTheme('light');
    const text =
      currentLang === 'en'
        ? '☀️ Light Theme activated with radiant golden warmth.'
        : currentLang === 'hi'
        ? '☀️ लाइट मोड सक्रिय कर दिया गया है।'
        : '☀️ लाईट मोड (Light Mode) सुरू करण्यात आला आहे.';

    return {
      actionExecuted: true,
      actionType: 'SET_THEME',
      actionDetails: { theme: 'light' },
      assistantResponse: text,
    };
  }

  // 5. TEXT SIZE (Senior Citizen Mode)
  if (q.includes('large text') || q.includes('big text') || q.includes('मोठे अक्षर') || q.includes('ज्येष्ठ नागरिक') || q.includes('senior')) {
    handlers.setTextSize('large');
    const text =
      currentLang === 'en'
        ? '👓 Senior Citizen Large Text mode activated for clear, comfortable reading.'
        : currentLang === 'hi'
        ? '👓 वरिष्ठ नागरिकों हेतु बड़े अक्षर (Large Text) सक्रिय कर दिए गए हैं।'
        : '👓 ज्येष्ठ नागरिकांसाठी मोठे अक्षर (Large Text) सुरू करण्यात आले आहे, ज्यामुळे वाचन सुलभ होईल.';

    return {
      actionExecuted: true,
      actionType: 'SET_TEXT_SIZE',
      actionDetails: { textSize: 'large' },
      assistantResponse: text,
    };
  }

  if (q.includes('normal text') || q.includes('मूळ आकार') || q.includes('सामान्य अक्षर')) {
    handlers.setTextSize('normal');
    const text =
      currentLang === 'en'
        ? 'Standard text size restored.'
        : currentLang === 'hi'
        ? 'सामान्य अक्षर आकार पुनर्संचयित किया गया।'
        : 'सामान्य अक्षराचा आकार पूर्ववत करण्यात आला.';

    return {
      actionExecuted: true,
      actionType: 'SET_TEXT_SIZE',
      actionDetails: { textSize: 'normal' },
      assistantResponse: text,
    };
  }

  // 6. LANGUAGE SWITCH COMMANDS
  if (q.includes('marathi') || q.includes('मराठी करा') || q.includes('मराठी भाषा') || q.includes('switch to marathi')) {
    handlers.changeLanguage('mr');
    return {
      actionExecuted: true,
      actionType: 'CHANGE_LANGUAGE',
      actionDetails: { targetLang: 'mr' },
      assistantResponse: '🚩 आदेश मान्य! ॲपची भाषा आता मराठी (Marathi) मध्ये सेट केली आहे. जय महाराष्ट्र!',
    };
  }

  if (q.includes('hindi') || q.includes('हिंदी करो') || q.includes('हिंदी भाषा') || q.includes('switch to hindi')) {
    handlers.changeLanguage('hi');
    return {
      actionExecuted: true,
      actionType: 'CHANGE_LANGUAGE',
      actionDetails: { targetLang: 'hi' },
      assistantResponse: '🇮🇳 आदेश संपन्न! ऐप की भाषा अब हिन्दी (Hindi) में कर दी गई है।',
    };
  }

  if (q.includes('english') || q.includes('इंग्रजी करा') || q.includes('switch to english') || q.includes('english language')) {
    handlers.changeLanguage('en');
    return {
      actionExecuted: true,
      actionType: 'CHANGE_LANGUAGE',
      actionDetails: { targetLang: 'en' },
      assistantResponse: '🌐 Command complete! Application language switched to English.',
    };
  }

  // 7. SPECIFIC DEITY NAVIGATION COMMAND (e.g. "open ganesha", "विठ्ठलाचे पान उघडा", "show swami samarth")
  const isNavGodQuery =
    q.includes('open') ||
    q.includes('show') ||
    q.includes('go to') ||
    q.includes('navigate') ||
    q.includes('उघडा') ||
    q.includes('दाखवा') ||
    q.includes('ने') ||
    q.includes('जा') ||
    q.includes('दालन') ||
    q.includes('पान');

  for (const godKey of Object.keys(deityKeywords)) {
    const meta = deityKeywords[godKey];
    const matched = meta.keywords.some((kw) => q.includes(kw));
    if (matched) {
      // If explicit navigation word is present or strong god query
      if (isNavGodQuery || q === meta.id || meta.keywords.some((kw) => q === kw)) {
        handlers.openGodDetail(meta.id);
        const name = currentLang === 'en' ? meta.nameEn : currentLang === 'hi' ? meta.nameHi : meta.nameMr;
        const text =
          currentLang === 'en'
            ? `🪷 Command Executed! Navigated to the sacred abode of ${name}. View divine lore, offerings, 108 Japa, and holy shrine photos.`
            : currentLang === 'hi'
            ? `🪷 आदेश संपन्न! आपके लिए ${name} का पावन दर्शन पृष्ठ खोल दिया गया है।`
            : `🪷 आदेश मान्य! मी आपल्यासाठी ${name} यांचे पावन दर्शन दालन उघडले आहे. आपण येथे १०८ जप, कथा, आणि तीर्थक्षेत्राचे दर्शन घेऊ शकता.`;

        return {
          actionExecuted: true,
          actionType: 'OPEN_DEITY',
          actionDetails: {
            godId: meta.id,
            godName: name,
          },
          assistantResponse: text,
        };
      }
    }
  }

  // 8. TAB NAVIGATION COMMANDS (e.g. "open kumbh mela", "कुंभमेळा उघडा", "open 50 gods", "open chalisa")
  for (const tabKey of Object.keys(tabKeywords)) {
    const meta = tabKeywords[tabKey];
    const matched = meta.keywords.some((kw) => q.includes(kw));
    if (matched) {
      if (isNavGodQuery || meta.keywords.some((kw) => q === kw)) {
        handlers.navigateTab(meta.id);
        const name = currentLang === 'en' ? meta.nameEn : currentLang === 'hi' ? meta.nameHi : meta.nameMr;
        const text =
          currentLang === 'en'
            ? `🗺️ Command Executed! Switched to '${name}'.`
            : currentLang === 'hi'
            ? `🗺️ आदेश संपन्न! '${name}' अनुभाग खोल दिया गया है।`
            : `🗺️ आदेश मान्य! मी आपल्यासाठी '${name}' दालन उघडले आहे.`;

        return {
          actionExecuted: true,
          actionType: 'NAVIGATE_TAB',
          actionDetails: {
            tab: meta.id,
            tabName: name,
          },
          assistantResponse: text,
        };
      }
    }
  }

  // 9. CULTURAL GLOSSARY
  if (q.includes('glossary') || q.includes('कोश') || q.includes('वारसा शब्द') || q.includes('संस्कृती कोश')) {
    handlers.openGlossary();
    const text =
      currentLang === 'en'
        ? '📖 Cultural Glossary opened! Explore deep spiritual terminology of Maharashtra.'
        : currentLang === 'hi'
        ? '📖 सांस्कृतिक शब्दकोश खोल दिया गया है।'
        : '📖 सांस्कृतिक शब्दकोश उघडण्यात आला आहे!';

    return {
      actionExecuted: true,
      actionType: 'OPEN_GLOSSARY',
      assistantResponse: text,
    };
  }

  // No specific command matched; proceed with deep AI counseling/conversation
  return null;
}


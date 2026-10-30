import { MultilingualText } from '../types';

export interface LiveDarshanStream {
  id: string;
  templeName: MultilingualText;
  deityName: MultilingualText;
  location: string;
  officialFeedUrl: string; // Authorized Official YouTube / Streaming Embed
  youtubeVideoId?: string; // Direct YouTube video or stream ID for flawless embed
  trustWebsiteUrl: string;
  dailySchedule: { aartiName: string; time: string }[];
  isAuthorized: boolean;
  significance: MultilingualText;
  icon?: string;
}

export interface AartiVideoItem {
  id: string;
  title: MultilingualText;
  deity: MultilingualText;
  singer: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  duration: string;
  category: 'aarti' | 'kakad_aarti' | 'live_darshan' | 'custom';
  lyricsSnippet: MultilingualText;
  icon: string;
  holyColor?: string;
  isUserCustom?: boolean;
}

export const liveDarshanDatabase: LiveDarshanStream[] = [
  // 1. Shri Siddhivinayak Temple, Prabhadevi Mumbai
  {
    id: 'siddhivinayak_mumbai',
    templeName: {
      en: 'Shri Siddhivinayak Temple, Mumbai',
      hi: 'श्री सिद्धिविनायक मंदिर, मुम्बई',
      mr: 'श्री सिद्धिविनायक मंदिर, प्रभादेवी मुंबई'
    },
    deityName: { en: 'Lord Siddhivinayak', hi: 'श्री सिद्धिविनायक', mr: 'श्री सिद्धिविनायक बाप्पा' },
    location: 'Prabhadevi, Mumbai, Maharashtra',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8W7s8Wb7Lz2Z9U2nE2sFwQ',
    youtubeVideoId: 'HFsWD539TxQ',
    trustWebsiteUrl: 'https://www.siddhivinayak.org',
    dailySchedule: [
      { aartiName: 'काकड आरती (Kakad Aarti)', time: '05:30 AM' },
      { aartiName: 'श्री दर्शन व अभिषेक (Abhishek)', time: '06:00 AM' },
      { aartiName: 'दुपारची महाआरती (Noon Aarti)', time: '12:15 PM' },
      { aartiName: 'संध्या आरती (Evening Aarti)', time: '07:30 PM' },
      { aartiName: 'शेजारती (Shej Aarti)', time: '09:50 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'Right-curved trunk (Navasacha Ganpati) that fulfills all righteous wishes of devotees across the globe.',
      hi: 'उजवी सोंड वाले नवसाचा गणपती, जो भक्तों की हर मनोकामना पूर्ण करते हैं।',
      mr: 'उजव्या सोंडेचा नवसाला पावणारा सिद्धिविनायक बाप्पा. देश-विदेशातील करोडो भाविकांचे श्रद्धास्थान.'
    },
    icon: '🌺'
  },

  // 2. Shri Saibaba Sansthan, Shirdi
  {
    id: 'shirdi_sai',
    templeName: {
      en: 'Shri Saibaba Sansthan, Shirdi',
      hi: 'श्री साईबाबा संस्थान, शिर्डी',
      mr: 'श्री साईबाबा संस्थान, शिर्डी'
    },
    deityName: { en: 'Shri Sai Baba', hi: 'श्री साईं बाबा', mr: 'सद्गुरू साईबाबा' },
    location: 'Shirdi, Ahmednagar, Maharashtra',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC9989wJ9P-Q84K_L0oH3J0g',
    youtubeVideoId: 'kYx4u6VqVlQ',
    trustWebsiteUrl: 'https://sai.org.in',
    dailySchedule: [
      { aartiName: 'काकड आरती (Kakad Aarti)', time: '04:30 AM' },
      { aartiName: 'माध्यान्ह आरती (Madhyahna Aarti)', time: '12:00 PM' },
      { aartiName: 'धूप आरती (Dhoop Aarti)', time: '06:30 PM' },
      { aartiName: 'शेजारती (Shej Aarti)', time: '10:30 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'The holy Samadhi Mandir of Sai Baba preaching "Sabka Malik Ek" and "Shraddha & Saburi".',
      hi: '"सबका मालिक एक" और "श्रद्धा व सबूरी" का दिव्य संदेश देने वाले साईं बाबा का समाधि मंदिर।',
      mr: '"सबका मालिक एक" व "श्रद्धा आणि सबुरी" चा पावन संदेश देणाऱ्या साईनाथांचे पावन समाधी मंदिर.'
    },
    icon: '🌸'
  },

  // 3. Shri Vitthal Rukmini Mandir, Pandharpur
  {
    id: 'pandharpur_vitthal_live',
    templeName: {
      en: 'Pandharpur Shri Vitthal Rukmini Mandir',
      hi: 'श्री विट्ठल रुक्मिणी मंदिर, पंढरपुर',
      mr: 'श्री विठ्ठल-रुक्मिणी मंदिर, पंढरपूर'
    },
    deityName: { en: 'Lord Vitthal-Rakhumai', hi: 'विट्ठल-रुक्मिणी', mr: 'विठू माऊली व रखुमाई' },
    location: 'Pandharpur, Solapur, Maharashtra',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCc2V-xZ3fF8pB1-gU2yT4cA',
    youtubeVideoId: 'zwAh50Vyv-8',
    trustWebsiteUrl: 'https://vitthalrukminimandir.org',
    dailySchedule: [
      { aartiName: 'काकड आरती व भूपाळी (Kakad Aarti)', time: '04:00 AM' },
      { aartiName: 'नित्य पूजा व पंचामृत स्नान', time: '04:30 AM' },
      { aartiName: 'दुपारची महापूजा व नैवेद्य (Maha Naivedya)', time: '11:00 AM' },
      { aartiName: 'धूप आरती (Dhoop Aarti)', time: '06:45 PM' },
      { aartiName: 'शेजारती (Shej Aarti)', time: '11:00 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'Direct live darshan of the lotus feet of Lord Panduranga standing on the sacred brick for 28 yugas.',
      hi: '२८ युगों से ईंट पर विराजमान भगवान विट्ठल के साक्षात चरण दर्शन।',
      mr: '२८ युगे विटेवर उभ्या असलेल्या सावळ्या विठूरायाचे व रखुमाईचे थेट पावन दर्शन.'
    },
    icon: '🪷'
  },

  // 4. Shri Mahalakshmi Ambabai, Kolhapur
  {
    id: 'kolhapur_ambabai_live',
    templeName: {
      en: 'Shri Mahalakshmi Ambabai Mandir, Kolhapur',
      hi: 'श्री महालक्ष्मी अम्बाबाबू मंदिर, कोल्हापुर',
      mr: 'श्री करवीर निवासिनी महालक्ष्मी अंबाबाई, कोल्हापूर'
    },
    deityName: { en: 'Mata Mahalakshmi (Ambabai)', hi: 'माता महालक्ष्मी (अम्बाबाई)', mr: 'आई अंबाबाई महालक्ष्मी' },
    location: 'Kolhapur, Maharashtra',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC7t6R5pQ8bN4Z2e1xK3rG8A',
    youtubeVideoId: 'ydKIx3Ky4K8',
    trustWebsiteUrl: 'https://mahalaxmikolhapur.com',
    dailySchedule: [
      { aartiName: 'काकड आरती (Kakad Aarti)', time: '05:00 AM' },
      { aartiName: 'पंचामृत अभिषेक व अलंकार पूजा', time: '08:30 AM' },
      { aartiName: 'दुपारची आरती (Noon Aarti)', time: '12:00 PM' },
      { aartiName: 'धूप आरती (Dhoop Aarti)', time: '07:30 PM' },
      { aartiName: 'शेजारती (Shej Aarti)', time: '10:00 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'One of the prime 51 Shaktipeethas where King of Gods and Sages pray for cosmic prosperity and courage.',
      hi: 'प्रसिद्ध शक्तिपीठ जहां माता महालक्ष्मी के दर्शन से समस्त दरिद्रता का नाश होता है।',
      mr: 'महाराष्ट्रातील प्रमुख साडेतीन शक्तिपीठांपैकी एक; करवीर निवासिनी आई अंबाबाईचे दर्शन दारिद्र्य दूर करते.'
    },
    icon: '🪔'
  },

  // 5. Shri Tuljabhavani Mandir, Tuljapur
  {
    id: 'tuljapur_bhavani_live',
    templeName: {
      en: 'Shri Tuljabhavani Temple, Tuljapur',
      hi: 'श्री तुलजाभवानी मंदिर, तुलजापुर',
      mr: 'श्री कुलस्वामिनी तुळजाभवानी मंदिर, तुळजापूर'
    },
    deityName: { en: 'Mata Tuljabhavani', hi: 'माता तुलजाभवानी', mr: 'आई तुळजाभवानी' },
    location: 'Tuljapur, Dharashiv (Osmanabad), Maharashtra',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8W7s8Wb7Lz2Z9U2nE2sFwQ',
    youtubeVideoId: 'ydKIx3Ky4K8',
    trustWebsiteUrl: 'https://tuljabhavani.org',
    dailySchedule: [
      { aartiName: 'चरणतीर्थ व अभिषेक पूजा', time: '05:00 AM' },
      { aartiName: 'सकाळची महाआरती (Morning Aarti)', time: '08:30 AM' },
      { aartiName: 'धूप आरती व नैवेद्य (Dhoop Aarti)', time: '07:00 PM' },
      { aartiName: 'शेजारती (Shej Aarti)', time: '09:30 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'Family deity of Chhatrapati Shivaji Maharaj who blessed him with the Bhavani Talwar to establish Hindavi Swarajya.',
      hi: 'छत्रपति शिवाजी महाराज की कुलदेवी जिन्होंने हिन्दवी स्वराज्य स्थापना हेतु भवानी तलवार प्रदान की थी।',
      mr: 'छत्रपती शिवाजी महाराजांची कुलस्वामिनी; अखंड महाराष्ट्राचे प्रेरणास्थान व स्वराज्य अधिष्ठात्री देवी.'
    },
    icon: '🚩'
  },

  // 6. Shri Mahakaleshwar Jyotirlinga, Ujjain
  {
    id: 'ujjain_mahakal_live',
    templeName: {
      en: 'Shri Mahakaleshwar Jyotirlinga, Ujjain',
      hi: 'श्री महाकालेश्वर ज्योतिर्लिंग, उज्जैन',
      mr: 'श्री महाकालेश्वर ज्योतिर्लिंग, उज्जैन (भस्म आरती)'
    },
    deityName: { en: 'Lord Mahakaleshwar', hi: 'महाकाल शिव', mr: 'देवाधिदेव महाकाल' },
    location: 'Ujjain, Madhya Pradesh',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8W7s8Wb7Lz2Z9U2nE2sFwQ',
    youtubeVideoId: 'kYx4u6VqVlQ',
    trustWebsiteUrl: 'https://shrimahakaleshwar.com',
    dailySchedule: [
      { aartiName: 'प्रसिद्ध भस्म आरती (World-Famous Bhasma Aarti)', time: '04:00 AM' },
      { aartiName: 'नैवेद्य आरती (Naivedya Aarti)', time: '10:30 AM' },
      { aartiName: 'संध्या आरती (Evening Aarti)', time: '05:00 PM' },
      { aartiName: 'शयन आरती (Shayan Aarti)', time: '10:30 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'South-facing (Dakshinmukhi) Jyotirlinga conquering death itself, where the eternal Bhasma Aarti is performed.',
      hi: 'काल के भी काल दक्षिणमुखी महाकालेश्वर, जिनकी दिव्य भस्म आरती से अकाल मृत्यु का भय समाप्त होता है।',
      mr: 'मृत्यूवर विजय मिळवणारे दक्षिणमुखी ज्योतिर्लिंग; रोज पहाटे होणाऱ्या भस्म आरतीने जन्म-मृत्यूच्या चक्रातून मुक्ती मिळते.'
    },
    icon: '🕉️'
  },

  // 7. Shri Kashi Vishwanath Dham, Varanasi
  {
    id: 'kashi_vishwanath_live',
    templeName: {
      en: 'Shri Kashi Vishwanath Dham, Varanasi',
      hi: 'श्री काशी विश्वनाथ धाम, वाराणसी',
      mr: 'श्री काशी विश्वनाथ ज्योतिर्लिंग व गंगा आरती, वाराणसी'
    },
    deityName: { en: 'Lord Vishwanath & Maa Ganga', hi: 'काशी विश्वनाथ एवं मां गंगा', mr: 'काशी विश्वनाथ व गंगा माई' },
    location: 'Varanasi, Uttar Pradesh',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8W7s8Wb7Lz2Z9U2nE2sFwQ',
    youtubeVideoId: 'QKf_JPbN6Lw',
    trustWebsiteUrl: 'https://shrikashivishwanath.org',
    dailySchedule: [
      { aartiName: 'मंगला आरती (Mangala Aarti)', time: '03:00 AM' },
      { aartiName: 'भोग आरती (Bhog Aarti)', time: '11:15 AM' },
      { aartiName: 'सप्तर्षि आरती (Saptarishi Aarti)', time: '07:00 PM' },
      { aartiName: 'दशाश्वमेध घाट भव्य गंगा आरती', time: '07:15 PM' },
      { aartiName: 'शयन आरती (Shayan Aarti)', time: '10:30 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'The eternal City of Light (Mokshadayi Kashi) standing upon the Trishula of Lord Shiva.',
      hi: 'भगवान शिव के त्रिशूल पर बसी मोक्षदायिनी काशी, जहां दर्शन मात्र से भवबंधन से मुक्ति मिलती है।',
      mr: 'भगवान शंकराच्या त्रिशूलावर वसलेली मोक्षनगरी काशी; विश्वनाथ दर्शन व गंगा आरतीने संपूर्ण पापमुक्ती लाभते.'
    },
    icon: '🔱'
  },

  // 8. Shri Trimbakeshwar Jyotirlinga, Nashik
  {
    id: 'trimbakeshwar_nashik_live',
    templeName: {
      en: 'Shri Trimbakeshwar Jyotirlinga, Nashik',
      hi: 'श्री त्र्यम्बकेश्वर ज्योतिर्लिंग, नाशिक',
      mr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग, नाशिक (गोदावरी उगम)'
    },
    deityName: { en: 'Trimbakeshwar (Brahma-Vishnu-Mahesh)', hi: 'त्र्यम्बकेश्वर शिव', mr: 'ब्रह्मा-विष्णू-महेश त्रिमुखी ज्योतिर्लिंग' },
    location: 'Trimbak, Nashik, Maharashtra',
    officialFeedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8W7s8Wb7Lz2Z9U2nE2sFwQ',
    youtubeVideoId: 'kYx4u6VqVlQ',
    trustWebsiteUrl: 'https://trimbakeshwartrust.com',
    dailySchedule: [
      { aartiName: 'काकड आरती व गोदावरी पूजा', time: '05:30 AM' },
      { aartiName: 'सुवर्ण मुकुट अलंकार महापूजा', time: '01:00 PM' },
      { aartiName: 'संध्या आरती (Evening Aarti)', time: '07:00 PM' },
      { aartiName: 'शेजारती (Shej Aarti)', time: '09:00 PM' }
    ],
    isAuthorized: true,
    significance: {
      en: 'Unique three-faced Jyotirlinga representing Brahma, Vishnu, and Rudra, origin of holy river Godavari.',
      hi: 'ब्रह्मा, विष्णु एवं महेश के त्रिमुख स्वरूप वाला अद्वितीय ज्योतिर्लिंग एवं दक्षिण गंगा गोदावरी का उद्गम स्थल।',
      mr: 'ब्रह्मा, विष्णू व महेश या तिन्ही देवांचे त्रिमुखी स्वरूप असणारे पावन ज्योतिर्लिंग व पवित्र गोदावरी नदीचा उगम.'
    },
    icon: '🌿'
  }
];

export const specificAartisDatabase: AartiVideoItem[] = [
  // 1. Ganpati Sukhkarta Dukhharta - Amitabh Bachchan
  {
    id: 'ganesh_sukhkarta_amitabh',
    title: {
      en: 'Sukhkarta Dukhharta (Shri Siddhivinayak Aarti - Amitabh Bachchan)',
      hi: 'सुखकर्ता दुःखहर्ता (श्री सिद्धिविनायक महाआरती - अमिताभ बच्चन)',
      mr: 'सुखकर्ता दुःखहर्ता (सिद्धिविनायक महाआरती - अमिताभ बच्चन)'
    },
    deity: { en: 'Lord Ganesha', hi: 'श्री गणेश', mr: 'श्री गणेश बाप्पा' },
    singer: 'Amitabh Bachchan (अमिताभ बच्चन)',
    youtubeUrl: 'https://www.youtube.com/watch?v=HFsWD539TxQ',
    youtubeVideoId: 'HFsWD539TxQ',
    duration: '४:१५ मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Sukhkarta dukh-harta varta vighnachi, Nurvi purvi prema kripa jayachi...',
      hi: 'सुखकर्ता दुखहर्ता वार्ता विघ्नाची, नुरवी पुरवी प्रेम कृपा जयाची...',
      mr: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची, नुरवी पुरवी प्रेम कृपा जयाची । सर्वांगी सुंदर उटी शेंदुराची, कंठी झळके माळ मुक्ताफळांची ॥'
    },
    icon: '🌺',
    holyColor: '#DC2626'
  },

  // 2. Ganpati Sukhkarta Dukhharta - Traditional Lyrical
  {
    id: 'ganesh_sukhkarta_classic',
    title: {
      en: 'Sukhkarta Dukhharta Varta Vighnachi (Traditional Aarti with Lyrics)',
      hi: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची (पारंपरिक गणेश आरती)',
      mr: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची (पारंपरिक संपूर्ण आरती)'
    },
    deity: { en: 'Lord Ganesha', hi: 'श्री गणेश जी', mr: 'विघ्नहर्ता श्री गणेश' },
    singer: 'Traditional Temple Singers (पारंपरिक मंदिर स्वर)',
    youtubeUrl: 'https://www.youtube.com/watch?v=XhZ2Wl5h0Ko',
    youtubeVideoId: 'XhZ2Wl5h0Ko',
    duration: '३:४५ मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Jaya deva jaya deva jaya Mangalamurti, Darshanamatre mana-kamana purti...',
      hi: 'जय देव जय देव जय मंगलमूर्ती, दर्शनमात्रे मन कामना पूर्ती...',
      mr: 'जय देव जय देव जय मंगलमूर्ती, दर्शनमात्रे मन कामना पूर्ती जय देव जय देव ॥'
    },
    icon: '🚩',
    holyColor: '#EA580C'
  },

  // 3. Vitthal Aarti - Yei Oh Vitthale
  {
    id: 'vitthal_yei_oh',
    title: {
      en: 'Yei Oh Vitthale Majhe Mauli Ye (Pandharpur Vitthal Aarti)',
      hi: 'येई ओ विठ्ठले माझे माऊली ये (पंढरपुर विट्ठल आरती)',
      mr: 'येई ओ विठ्ठले माझे माऊली ये (पंढरपूर विठुराया महाआरती)'
    },
    deity: { en: 'Lord Vitthal-Rakhumai', hi: 'विट्ठल-रुक्मिणी', mr: 'विठू माऊली व रखुमाई' },
    singer: 'Suresh Wadkar & Anuradha Paudwal',
    youtubeUrl: 'https://www.youtube.com/watch?v=zwAh50Vyv-8',
    youtubeVideoId: 'zwAh50Vyv-8',
    duration: '४:३० मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Yei oh Vitthale majhe mauli ye, Nidhanikya pancha-arati karina gaurave...',
      hi: 'येई ओ विठ्ठले माझे माऊली ये, निधनीक पंचारती करीन गौरवे...',
      mr: 'येई ओ विठ्ठले माझे माऊली ये । निढळावरी कर ठेवुनी वाट मी पाहें ॥'
    },
    icon: '🪷',
    holyColor: '#16A34A'
  },

  // 4. Shiva Aarti - Lavthavti Vikrala
  {
    id: 'shiva_lavthavti',
    title: {
      en: 'Lavthavti Vikrala Brahmandi Mala (Shri Shiva Mahadeva Aarti)',
      hi: 'लवथवती विक्राळा ब्रह्मांडी माळा (श्री शिव महाआरती)',
      mr: 'लवथवती विक्राळा ब्रह्मांडी माळा (देवाधिदेव महादेव आरती)'
    },
    deity: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'देवाधिदेव महादेव' },
    singer: 'Anuradha Paudwal (अनुराधा पौडवाल)',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYx4u6VqVlQ',
    youtubeVideoId: 'kYx4u6VqVlQ',
    duration: '४:१० मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Lavthavti vikrala brahmandi mala, Vishemukhi bhali jhale tripur-ari...',
      hi: 'लवथवती विक्राळा ब्रह्मांडी माळा, विषे कंठ काळा त्रिनेत्री ज्वाळा...',
      mr: 'लवथवती विक्राळा ब्रह्मांडी माळा । वीषे कंठ काळा त्रिनेत्री ज्वाळा ॥ लावण्यसुंदर मस्तकी बाळे । तेथुनिया जल निर्मळ वाहे झुळझुळा ॥'
    },
    icon: '🕉️',
    holyColor: '#0284C7'
  },

  // 5. Shri Swami Samarth Aarti - Akkalkot
  {
    id: 'swami_samarth_aarti',
    title: {
      en: 'Aarti Swami Samartha (Akkalkot Swami Samarth Maharaj Aarti)',
      hi: 'आरती स्वामी समर्था (श्री स्वामी समर्थ महाराज आरती)',
      mr: 'आरती स्वामी समर्था (जय जय स्वामी समर्थ - अक्कलकोट)'
    },
    deity: { en: 'Shri Swami Samarth', hi: 'श्री स्वामी समर्थ', mr: 'श्री स्वामी समर्थ महाराज' },
    singer: 'Suresh Wadkar (सुरेश वाडकर)',
    youtubeUrl: 'https://www.youtube.com/watch?v=ibfxTYpgqAQ',
    youtubeVideoId: 'ibfxTYpgqAQ',
    duration: '५:०० मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Aarti Swami Samartha, bhakta kalpataru karunakara...',
      hi: 'आरती स्वामी समर्था, भक्त कल्पतरू करुणाकरा...',
      mr: 'जय जय स्वामी समर्था, आरती ओंवाळूं सद्गुरूनाथा । भक्त कल्पतरू कृपावंता, तारक संसारीं ॥'
    },
    icon: '🌸',
    holyColor: '#EAB308'
  },

  // 6. Datta Aarti - Trigunatmak Trimurti
  {
    id: 'datta_trigunatmak',
    title: {
      en: 'Trigunatmak Traimurti Datt Ha Jana (Shri Gurudev Datta Aarti)',
      hi: 'त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा (श्री गुरुदेव दत्त आरती)',
      mr: 'त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा (श्रीदत्तप्रभू महाआरती)'
    },
    deity: { en: 'Lord Dattatreya', hi: 'भगवान दत्तात्रेय', mr: 'श्री गुरुदेव दत्त' },
    singer: 'Ajit Kadkade & Sanjivani (अजित कडकडे)',
    youtubeUrl: 'https://www.youtube.com/watch?v=ydKIx3Ky4K8',
    youtubeVideoId: 'ydKIx3Ky4K8',
    duration: '४:४० मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Trigunatmak traimurti Datt ha jana, Triguni avatar lila vishva bhavana...',
      hi: 'त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा, त्रिगुणी अवतार लीला विश्व भावना...',
      mr: 'त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा । त्रिगुणी अवतार लीला विश्व भावना ॥'
    },
    icon: '🌿',
    holyColor: '#F59E0B'
  },

  // 7. Hanuman Aarti - Satrane Uddane
  {
    id: 'hanuman_satrane',
    title: {
      en: 'Satrane Uddane Hunkar Vadani (Shri Maruti Hanuman Aarti)',
      hi: 'सत्राणे उड्डाणे हुंकार वदनी (संकटमोचन श्री हनुमान आरती)',
      mr: 'सत्राणे उड्डाणे हुंकार वदनी (समर्थ रामदास रचित मारुती आरती)'
    },
    deity: { en: 'Lord Hanuman', hi: 'श्री हनुमान जी', mr: 'संकटमोचन मारुतीराया' },
    singer: 'Ravindra Sathe (रवींद्र साठे)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Gm1lALQQ9mQ',
    youtubeVideoId: 'Gm1lALQQ9mQ',
    duration: '३:५० मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Satrane uddane hunkar vadani, Kapi-kula bhushan purna abhaya daani...',
      hi: 'सत्राणे उड्डाणे हुंकार वदनी, कपिकुळ भूषण पूर्ण अभय दानी...',
      mr: 'सत्राणे उड्डाणे हुंकार वदनी । करि डळमळ भूमंडळ सिंधूजल गगनी ॥ कडकडाटिले ब्रम्हांड धाके कांपे यम ॥'
    },
    icon: '🚩',
    holyColor: '#DC2626'
  },

  // 8. Shirdi Sai Baba Kakad Aarti
  {
    id: 'sai_kakad_aarti',
    title: {
      en: 'Shirdi Saibaba Kakad Aarti (Sacred Dawn Aarti - 4:30 AM)',
      hi: 'शिर्डी साईबाबा काकड आरती (पहाटे की पावन अमृत काकड आरती)',
      mr: 'शिर्डी साईबाबा काकड आरती (पहाटे ४:३० ची पावन काकड आरती)'
    },
    deity: { en: 'Shri Sai Baba', hi: 'श्री साईं बाबा', mr: 'सद्गुरू साईनाथ' },
    singer: 'Pramod Medhi (Shirdi Mandir Pujari स्वर)',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYx4u6VqVlQ',
    youtubeVideoId: 'kYx4u6VqVlQ',
    duration: '१२:०० मिनिटे',
    category: 'kakad_aarti',
    lyricsSnippet: {
      en: 'Jodoniya kar dohnhi charani thevila matha, Pahat jhalee baap utha Sai natha...',
      hi: 'जोडोनिया कर दोन्ही चरणी ठेविला माथा, प्रभात झाली बापा उठा साई नाथा...',
      mr: 'जोडोनिया कर दोन्ही चरणी ठेविला माथा । काय वर्णू आरती सद्गुरू साईनाथा ॥'
    },
    icon: '🌅',
    holyColor: '#EA580C'
  },

  // 9. Shirdi Sai Baba Dhoop Aarti (Evening)
  {
    id: 'sai_dhoop_aarti',
    title: {
      en: 'Shirdi Saibaba Dhoop Aarti (Sacred Twilight Sandhya Aarti)',
      hi: 'शिर्डी साईबाबा धूप आरती (संध्याकालीन आरती)',
      mr: 'शिर्डी साईबाबा धूप आरती (संध्याकाळची पवित्र आरती)'
    },
    deity: { en: 'Shri Sai Baba', hi: 'श्री साईं बाबा', mr: 'सद्गुरू साईबाबा' },
    singer: 'Pramod Medhi & Sansthan Bhaktas',
    youtubeUrl: 'https://www.youtube.com/watch?v=QKf_JPbN6Lw',
    youtubeVideoId: 'QKf_JPbN6Lw',
    duration: '८:२० मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Aarti Sai Baba, saukhyadaataar jeeva, charan rajaatali dhyava daasa visava...',
      hi: 'आरती साई बाबा, सौख्यदातार जीवा, चरण रजातली द्यावा दासा विसावा...',
      mr: 'आरती साई बाबा । सौख्यदातार जीवा ॥ चरणरजातली । द्यावा दासा विसावा ॥'
    },
    icon: '🪔',
    holyColor: '#D97706'
  },

  // 10. Sant Dnyaneshwar Aarti - Aarti Gyanraja
  {
    id: 'dnyaneshwar_aarti_gyanraja',
    title: {
      en: 'Aarti Gyanraja Maha-Kaivalya Teja (Sant Dnyaneshwar Aarti)',
      hi: 'आरती ज्ञानराजा महाकैवल्यतेजा (संत ज्ञानेश्वर माऊली आरती)',
      mr: 'आरती ज्ञानराजा महाकैवल्यतेजा (संत ज्ञानेश्वर माऊली आरती)'
    },
    deity: { en: 'Sant Dnyaneshwar Maharaj', hi: 'संत ज्ञानेश्वर', mr: 'माऊली संत ज्ञानेश्वर' },
    singer: 'Ajit Kadkade / Traditional Alandi Sansthan',
    youtubeUrl: 'https://www.youtube.com/watch?v=VeTisBeRoZY',
    youtubeVideoId: 'VeTisBeRoZY',
    duration: '४:४५ मिनिटे',
    category: 'aarti',
    lyricsSnippet: {
      en: 'Aarti Gyanraja maha-kaivalya teja, Seveeti saadhuka sant manu vaaje...',
      hi: 'आरती ज्ञानराजा महाकैवल्यतेजा, सेवती साधु संत मनु वाजे...',
      mr: 'आरती ज्ञानराजा । महाकैवल्यतेजा ॥ सेविती साधुसंत । म्हणती जय जय बोला ॥'
    },
    icon: '📜',
    holyColor: '#7C3AED'
  }
];

const CUSTOM_VIDEOS_STORAGE_KEY = 'sanatan_custom_devotional_videos';

/**
 * Retrieves user-imported custom YouTube Aarti/Darshan links from LocalStorage.
 */
export function getSavedCustomVideos(): AartiVideoItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_VIDEOS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load custom devotional videos:', err);
    return [];
  }
}

/**
 * Saves a new user-imported custom YouTube Aarti/Darshan link into LocalStorage.
 */
export function saveCustomVideo(item: AartiVideoItem): void {
  try {
    const existing = getSavedCustomVideos();
    const updated = [item, ...existing.filter((v) => v.id !== item.id)];
    localStorage.setItem(CUSTOM_VIDEOS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save custom devotional video:', err);
  }
}

/**
 * Deletes a user-imported custom YouTube link.
 */
export function deleteCustomVideo(id: string): void {
  try {
    const existing = getSavedCustomVideos();
    const filtered = existing.filter((v) => v.id !== id);
    localStorage.setItem(CUSTOM_VIDEOS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete custom devotional video:', err);
  }
}

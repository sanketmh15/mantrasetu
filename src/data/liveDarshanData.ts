export interface LiveDarshanStream {
  id: string;
  templeName: { en: string; hi: string; mr: string };
  deityName: { en: string; hi: string; mr: string };
  location: string;
  officialFeedUrl: string; // Authorized Official YouTube / Streaming Embed
  trustWebsiteUrl: string;
  dailySchedule: { aartiName: string; time: string }[];
  isAuthorized: boolean;
  significance: { en: string; hi: string; mr: string };
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
    }
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
    }
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
    }
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
    }
  }
];


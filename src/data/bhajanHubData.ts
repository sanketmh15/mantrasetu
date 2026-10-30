export interface BhajanTrack {
  id: string;
  title: { en: string; hi: string; mr: string };
  category: 'bhupali' | 'abhang' | 'bhajan' | 'aarti';
  categoryLabel: { en: string; hi: string; mr: string };
  saintAuthor: string;
  deity: { en: string; hi: string; mr: string };
  iconEmoji: string;
  durationEst: string;
  lyrics: string[];
  meaning: { en: string; hi: string; mr: string };
  audioUrl?: string;
}

export const bhajanDatabase: BhajanTrack[] = [
  // 1. Ghanashyama Sundara Bhupali
  {
    id: 'ghanashyama_sundara',
    title: {
      en: 'Ghanashyama Sundara Shreedhara',
      hi: 'घनश्याम सुंदरा श्रीधरा (भूपाळी)',
      mr: 'घनश्याम सुंदरा श्रीधरा अरुणोदय झाला'
    },
    category: 'bhupali',
    categoryLabel: { en: 'Morning Bhupali', hi: 'प्रातः भूपाळी', mr: 'पहाटेची अमृत भूपाळी' },
    saintAuthor: 'Sant Eknath Maharaj (संत एकनाथ महाराज)',
    deity: { en: 'Lord Krishna / Vitthal', hi: 'श्रीकृष्ण / विट्ठल', mr: 'श्री विठ्ठल-कृष्ण' },
    iconEmoji: '🌅',
    durationEst: '३:४५ मिनिटे',
    lyrics: [
      'घनश्याम सुंदरा श्रीधरा अरुणोदय झाला ।',
      'उठी लवकरि वनमाळी उदयाचळी मित्र आला ॥',
      'आनंदरूप पूर्ण निष्काम परब्रह्म ।',
      'मायातीत निराकार सुखाचा विश्राम ॥',
      'गोपीगोपाळ गाई वासरांसवे खेळती ।',
      'मधुर मुरलीचा नाद ऐकुनि मुनी ध्याती ॥',
      'एका जनार्दनी शरण आले तव चरणी ।',
      'दर्शन देई कृपावंता संसाराच्या तरणी ॥'
    ],
    meaning: {
      en: 'O dark-hued radiant Lord Shreedhara! The dawn has broken and the sun has crested the horizon. Awaken, O divine protector, and shower your graceful morning blessings upon all creation.',
      hi: 'हे मेघश्याम श्रीधर! प्रभात हो चुकी है और पूर्व दिशा में सूर्य उदित हो गया है। हे वनमाली! जागिए और समस्त सृष्टि पर अपनी करुणामयी दृष्टि डालिए।',
      mr: 'हे मेघवर्ण सावळे विठ्ठला! पूर्व दिशेला सूर्य उगवला आहे, प्रभात झाली आहे. उठ बा वनमाळी, सर्व गोप-गोपी आणि भक्त तुझ्या मंगल दर्शनाची वाट पाहत आहेत.'
    }
  },

  // 2. Uth Pandharichya Raya
  {
    id: 'uth_pandharichya_raya',
    title: {
      en: 'Uth Pandharichya Raya (Kakad Aarti)',
      hi: 'उठ पंढरीच्या राया (काकड आरती)',
      mr: 'उठ पंढरीच्या राया प्रभात झाली बापा'
    },
    category: 'bhupali',
    categoryLabel: { en: 'Kakad Aarti Bhupali', hi: 'काकड आरती', mr: 'काकड आरती भूपाळी' },
    saintAuthor: 'Sant Namdev Maharaj (संत नामदेव महाराज)',
    deity: { en: 'Lord Vitthal-Rakhumai', hi: 'श्री विट्ठल-रुक्मिणी', mr: 'विठू माऊली व रखुमाई' },
    iconEmoji: '🪷',
    durationEst: '४:१० मिनिटे',
    lyrics: [
      'उठ पंढरीच्या राया प्रभात झाली बापा ।',
      'दर्शन द्यावे आम्हा मिटवावे पापा ॥',
      'टाळ मृदुंग वाजे वैष्णवांचे मेळे ।',
      'चंद्रभागेच्या तीरी आनंद उधळे ॥',
      'रखुमाई संगे उभी विटेवरी मूर्ती ।',
      'नामा म्हणे शरण आलो मी तव कीर्ती ॥'
    ],
    meaning: {
      en: 'Awaken, O Sovereign King of Pandharpur! Dawn has arrived. Bestow upon us your holy lotus-feet darshan and wash away all worldly sorrows.',
      hi: 'हे पंढरपुर के स्वामी! प्रभात हो गई है। जागिए और भक्तों को अपने साक्षात चरण-दर्शन देकर उद्धार कीजिए।',
      mr: 'पंढरीच्या राया, आता दिवस उजाडला आहे. भक्तांचे पाप-ताप नाहीसे करण्यासाठी जागे व्हा आणि विटेवर उभे राहून आम्हाला मंगल दर्शन द्या.'
    }
  },

  // 3. Roopa Pahata Lochani
  {
    id: 'roopa_pahata_lochani',
    title: {
      en: 'Roopa Pahata Lochani (Haripath)',
      hi: 'रूप पाहता लोचनी (हरिपाठ अभंग)',
      mr: 'रूप पाहता लोचनी सुख झाले वो साजणी'
    },
    category: 'abhang',
    categoryLabel: { en: 'Sant Tukaram Abhang', hi: 'तुकाराम अभंग', mr: 'संत तुकाराम अभंग' },
    saintAuthor: 'Jagadguru Sant Tukaram Maharaj (संत तुकाराम)',
    deity: { en: 'Lord Vitthal', hi: 'श्री विट्ठल', mr: 'श्री विठ्ठल' },
    iconEmoji: '👁️',
    durationEst: '३:१५ मिनिटे',
    lyrics: [
      'रूप पाहता लोचनी । सुख झाले वो साजणी ॥',
      'तो हा विठ्ठल बरवा । तो हा माधव बरवा ॥',
      'बहुता सुकृताची जोडी । म्हणुनी विठ्ठली आवडी ॥',
      'सर्व सुखाचे आगर । बाप रखुमादेवीवरु ॥'
    ],
    meaning: {
      en: 'Looking upon this enchanting form with my eyes, supreme bliss overflowed within me, O friend! How exquisitely beautiful is this beloved Vitthala, the fountainhead of all happiness.',
      hi: 'नेत्रों से प्रभु का रूप देखते ही परम आनंद की अनुभूति हुई! यह विट्ठल कितना सुंदर है; अनेक जन्मों के पुण्यों के फलस्वरूप ही इस रूप में प्रेम उत्पन्न हुआ है।',
      mr: 'डोळे भरून विठ्ठलाचे ते सावळे रूप पाहताच असीम आनंदाची प्राप्ती झाली. हा विठ्ठल सर्व सुखांचे आगार आहे, अनेक जन्मांच्या पुण्याईने हे सुख लाभले आहे.'
    }
  },

  // 4. Kanada Raja Pandharicha
  {
    id: 'kanada_raja_pandharicha',
    title: {
      en: 'Kanada Raja Pandharicha',
      hi: 'कानडा राजा पंढरीचा',
      mr: 'कानडा राजा पंढरीचा वेदांनाही नाही कळला'
    },
    category: 'abhang',
    categoryLabel: { en: 'Immortal Abhang', hi: 'अमर अभंग', mr: 'अमर विठ्ठल अभंग' },
    saintAuthor: 'G. D. Madgulkar (ग. दि. माडगूळकर)',
    deity: { en: 'Lord Panduranga', hi: 'श्री पांडुरंग', mr: 'पांडुरंग विठ्ठल' },
    iconEmoji: '👑',
    durationEst: '५:०० मिनिटे',
    lyrics: [
      'कानडा राजा पंढरीचा । वेदांनाही नाही कळला अंत पार याचा ॥',
      'निराकार तो निर्गुण ईश्वर । झाला साकार भक्ताचा कैवारी ॥',
      'पुंडलिकाच्या भेटीसाठी । उभा राहिला विटेवरी पाठी ॥',
      'टाळ कुटे नाम घोष चाले । अवघे विश्व भक्तीने नाहे ॥'
    ],
    meaning: {
      en: 'The unfathomable, timeless Sovereign of Pandhari whose infinite depth even the ancient Vedas could not comprehend; He stands waiting on a brick solely out of boundless love for his devotee Pundalika.',
      hi: 'पंढरी का वह अद्वितीय राजा, जिसकी महिमा वेदों के भी पार है। भक्त पुंडलिक के प्रेम के लिए वह आज भी विट पर अडोल खड़ा है।',
      mr: 'वेदांनाही ज्याचा पार कळला नाही, असा हा पंढरीचा राजा केवळ भक्ताच्या प्रेमापोटी २८ युगे विटेवर हात कटीवर ठेवून उभा आहे.'
    }
  },

  // 5. Avagha Ranga Eka Jhala
  {
    id: 'avagha_ranga_eka_jhala',
    title: {
      en: 'Avagha Ranga Eka Jhala',
      hi: 'अवघा रंग एक झाला',
      mr: 'अवघा रंग एक झाला रंगी रंगला श्रीरंग'
    },
    category: 'abhang',
    categoryLabel: { en: 'Sant Soyarabai Abhang', hi: 'सोयराबाई अभंग', mr: 'संत सोयराबाई अभंग' },
    saintAuthor: 'Sant Soyarabai (संत सोयराबाई)',
    deity: { en: 'Lord Vitthal (Shriranga)', hi: 'श्रीरंग विट्ठल', mr: 'श्रीरंग विठू माऊली' },
    iconEmoji: '🌈',
    durationEst: '४:२० मिनिटे',
    lyrics: [
      'अवघा रंग एक झाला । रंगी रंगला श्रीरंग ॥',
      'मी तू पणाची झाली बोचणी । एक तत्त्वी विसावली ॥',
      'पाहता पाहता पाहणे हरपले । ध्यानी ध्याता ध्यान विरले ॥',
      'सोयरा म्हणे विठ्ठल पायी । शरण आले मी तव ठायी ॥'
    ],
    meaning: {
      en: 'All separate colors have dissolved into one singular celestial hue; the entire universe is immersed in divine Shriranga. Duality has vanished.',
      hi: 'संसार के सारे रंग एक हो गए हैं और सम्पूर्ण चेतना भगवान श्रीरंग के रंग में रंग गई है। "मैं" और "तू" का भेद पूरी तरह मिट गया है।',
      mr: 'सर्व विश्व एकाच भगवंतमय रंगात रंगून गेले आहे. मी आणि तू असा कोणताही भेद उरलेला नाही, केवळ विठ्ठलमय आनंद उरला आहे.'
    }
  },

  // 6. Digambara Digambara Shripada Vallabha
  {
    id: 'digambara_datta_bhajan',
    title: {
      en: 'Digambara Digambara Shripada Vallabha',
      hi: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा',
      mr: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा'
    },
    category: 'bhajan',
    categoryLabel: { en: 'Gurudev Datta Bhajan', hi: 'दत्त भजन', mr: 'दत्त संकीर्तन' },
    saintAuthor: 'Traditional Datta Sampradaya (दत्त संप्रदाय)',
    deity: { en: 'Lord Dattatreya', hi: 'भगवान दत्तात्रेय', mr: 'श्री गुरुदेव दत्त' },
    iconEmoji: '🌿',
    durationEst: '५:३० मिनिटे',
    lyrics: [
      'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा ।',
      'दत्त दिगंबरा श्रीपाद वल्लभ दिगंबरा ॥',
      'गुरुब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।',
      'गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः ॥',
      'गाणगापूरचे पावन धाम । नरसिंह सरस्वतीचे नाम ॥',
      'स्मर्तृगामी जो कृपाळू । भक्तांचा जो रक्षणहारू ॥'
    ],
    meaning: {
      en: 'Eternal chant of Lord Dattatreya and Shripada Shrivallabha, the Supreme Guru who manifests immediately wherever a sincere heart remembers Him.',
      hi: 'परमगुरु दत्तात्रेय और श्रीपाद श्रीवल्लभ का दिव्य नामस्मरण, जो स्मरण करते ही भक्ताभय देने चले आते हैं।',
      mr: 'स्मरण करताच भक्ताच्या मदतीला धावून येणाऱ्या कृपादयाळू गुरुदेव दत्तात्रेयांचा व श्रीपाद श्रीवल्लभांचा अखंड मंगल नामघोष.'
    }
  }
];

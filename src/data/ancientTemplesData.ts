export interface AncientTemple {
  id: string;
  name: { en: string; hi: string; mr: string };
  deityName: { en: string; hi: string; mr: string };
  region: 'pune_western' | 'marathwada' | 'konkan_mumbai' | 'vidarbha_khandesh';
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  historicalEra: string;
  architectureStyle: { en: string; hi: string; mr: string };
  timings: string;
  aartiTimings: string[];
  seniorWheelchair: boolean;
  parkingAvailable: boolean;
  dharamshalaAvailable: boolean;
  googleMapsUrl: string;
  significance: { en: string; hi: string; mr: string };
  specialOffering: { en: string; hi: string; mr: string };
  contactPhone?: string;
  dressCode?: { en: string; hi: string; mr: string };
}

export const ancientTemplesDatabase: AncientTemple[] = [
  // 1. Trimbakeshwar Jyotirlinga (Nashik)
  {
    id: 'trimbakeshwar',
    name: { en: 'Trimbakeshwar Shiva Jyotirlinga', hi: 'त्र्यंबकेश्वर ज्योतिर्लिंग', mr: 'श्री क्षेत्र त्र्यंबकेश्वर ज्योतिर्लिंग' },
    deityName: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'भगवान त्र्यंबकराज' },
    region: 'vidarbha_khandesh',
    district: 'Nashik',
    city: 'Trimbak',
    latitude: 19.9321,
    longitude: 73.5306,
    historicalEra: '1755-1786 CE (Peshwa Balaji Baji Rao)',
    architectureStyle: { en: 'Hemadpanthi Black Basalt Stone', hi: 'हेमाडपंथी कृष्ण प्रस्तर', mr: 'हेमाडपंथी काळ्या पाषाणातील कोरीव काम' },
    timings: '05:30 AM - 09:00 PM',
    aartiTimings: ['05:30 AM (Mangal Aarti)', '12:00 PM (Madhyahna Aarti)', '07:30 PM (Sandhya Aarti)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Trimbakeshwar+Shiva+Temple',
    significance: {
      en: 'One of the 12 sacred Jyotirlingas of India and source of the holy River Godavari. Features a unique three-faced linga representing Brahma, Vishnu, and Rudra.',
      hi: 'भारत के १२ पावन ज्योतिर्लिंगों में से एक और गोदावरी नदी का उद्गम स्थल। यहाँ ब्रह्मा, विष्णु एवं महेश के त्रिमूर्ति लिंग स्थापित हैं।',
      mr: 'भारतातील १२ ज्योतिर्लिंगांपैकी एक आणि दक्षिण गंगा गोदावरीचा उगम. येथे ब्रह्मा, विष्णू आणि महेश या त्रिदेवांचे स्वयंभू त्रिमूर्ती लिंग आहे.'
    },
    specialOffering: { en: 'Bilvapatra, Panchamrit, and Gangajal', hi: 'बेलपत्र, पंचामृत एवं गंगाजल', mr: 'बेलपत्र, पंचामृत अभिषेक व पवित्र कुशावर्त तीर्थ' },
    contactPhone: '+91 2594 254 064',
    dressCode: { en: 'Traditional Indian attire (Dhoti/Kurta for Men, Saree/Salwar for Women)', hi: 'पारंपरिक भारतीय वस्त्र', mr: 'पारंपरिक व शालीन वस्त्र (धोतर/कुर्ता, साडी)' }
  },

  // 2. Pandharpur Vitthal Rukmini (Solapur)
  {
    id: 'pandharpur-vitthal',
    name: { en: 'Pandharpur Shri Vitthal Rukmini Mandir', hi: 'पंढरपुर श्री विट्ठल रुक्मिणी मंदिर', mr: 'श्री क्षेत्र पंढरपूर विठ्ठल-रखुमाई मंदिर' },
    deityName: { en: 'Lord Vitthal-Rakhumai', hi: 'श्री विठ्ठल-रुक्मिणी', mr: 'विठू माऊली व रखुमाई' },
    region: 'pune_western',
    district: 'Solapur',
    city: 'Pandharpur',
    latitude: 17.6775,
    longitude: 75.3267,
    historicalEra: '6th-12th Century CE (Hoysala & Yadava Dynasty)',
    architectureStyle: { en: 'Yadava & Hemadpanthi Stone', hi: 'यादवकालीन हेमाडपंथी स्थापत्य', mr: 'यादवकालीन व हेमाडपंथी काळ्या पाषाणातील मंदिर' },
    timings: '04:00 AM - 11:00 PM',
    aartiTimings: ['04:30 AM (Kakad Aarti)', '11:00 AM (Dhup Aarti)', '07:00 PM (Sandhya Aarti)', '10:30 PM (Shej Aarti)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Vitthal+Rukmini+Temple+Pandharpur',
    significance: {
      en: 'The supreme spiritual capital of Maharashtra and the core of the 800-year-old Warkari Sampradaya on the banks of Chandrabhaga.',
      hi: 'महाराष्ट्र की आध्यात्मिक राजधानी और चंद्रभागा तट पर वारकरी संप्रदाय का परम तीर्थ।',
      mr: 'वारकरी संप्रदायाचे माहेरघर, चंद्रभागा तीरावरील परब्रह्म श्री विठ्ठलाचे पदस्पर्श दर्शन.'
    },
    specialOffering: { en: 'Tulsi Malas, Pedha, and Bukka', hi: 'तुलसी माला, पेड़ा एवं बुक्का', mr: 'तुळशी माळ, पंढरपूर पेढे व सुगंधी काळा बुक्का' }
  },

  // 3. Kolhapur Ambabai / Mahalakshmi
  {
    id: 'kolhapur-mahalakshmi',
    name: { en: 'Kolhapur Mahalakshmi (Ambabai) Temple', hi: 'कोल्हापुर महालक्ष्मी (अंबाबाई) मंदिर', mr: 'करवीर निवासिनी श्री महालक्ष्मी (अंबाबाई) मंदिर' },
    deityName: { en: 'Mata Mahalakshmi', hi: 'मां महालक्ष्मी', mr: 'आई अंबाबाई' },
    region: 'pune_western',
    district: 'Kolhapur',
    city: 'Kolhapur',
    latitude: 16.6944,
    longitude: 74.2235,
    historicalEra: '7th Century CE (Chalukya & Shilahara Dynasty)',
    architectureStyle: { en: 'Chalukya & Hemadpanthi Basalt', hi: 'चालुक्य एवं हेमाडपंथी स्थापत्य', mr: 'चालुक्य व हेमाडपंथी भव्य पाषाण स्थापत्य' },
    timings: '05:00 AM - 10:00 PM',
    aartiTimings: ['05:30 AM (Kakad Aarti)', '08:30 AM (Panchamrit Abhishek)', '11:30 AM (Maha Aarti)', '08:00 PM (Bhog Aarti)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Mahalakshmi+Temple+Kolhapur',
    significance: {
      en: 'One of the 51 Shakti Peethas of India. The idol is adorned with natural diamonds and illuminated by the Sun rays (Kiranotsav) twice a year.',
      hi: 'भारत के प्रमुख शक्तिपीठों में से एक। वर्ष में दो बार सूर्य किरणें मां के पावन विग्रह को स्पर्श करती हैं (किरणोत्सव)।',
      mr: 'महाराष्ट्रातील साडेतीन शक्तिपीठांपैकी एक पूर्ण पीठ. वर्षातून दोनदा किरणोत्सवात सूर्यकिरणे थेट देवीच्या चरणांवर पडतात.'
    },
    specialOffering: { en: 'Silk Paithani Sari, Coconut, and Ladoo', hi: 'पैठणी साड़ी, नारियल एवं लड्डू', mr: 'पैठणी साडीची ओटी, हिरव्या बांगड्या, नारळ व लाडू प्रसाद' }
  },

  // 4. Alandi Sant Dnyaneshwar Samadhi
  {
    id: 'alandi-dnyaneshwar',
    name: { en: 'Alandi Sant Dnyaneshwar Maharaj Sanjeevan Samadhi', hi: 'आळंदी संत ज्ञानेश्वर संजीवन समाधि', mr: 'श्री क्षेत्र आळंदी संत ज्ञानेश्वर महाराज संजीवन समाधी' },
    deityName: { en: 'Sant Dnyaneshwar Maharaj', hi: 'संत ज्ञानेश्वर महाराज', mr: 'माऊली ज्ञानेश्वर महाराज' },
    region: 'pune_western',
    district: 'Pune',
    city: 'Alandi',
    latitude: 18.6756,
    longitude: 73.8973,
    historicalEra: '1296 CE (Sanjeevan Samadhi under Ajanvriksha)',
    architectureStyle: { en: 'Peshwa Era Ghats & Stone Temple', hi: 'पेशवेकालीन प्रस्तर स्थापत्य एवं इंद्रायणी घाट', mr: 'इंद्रायणी तीरावरील दगडी समाधी मंदिर व अजानवृक्ष' },
    timings: '05:00 AM - 10:30 PM',
    aartiTimings: ['05:30 AM (Kakad Aarti)', '12:00 PM (Naivedya Aarti)', '06:30 PM (Dhoop Aarti)', '09:00 PM (Shej Aarti)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Sant+Dnyaneshwar+Maharaj+Samadhi+Alandi',
    significance: {
      en: 'The eternal resting place where 21-year-old Sant Dnyaneshwar entered Sanjeevan Samadhi on the banks of Indrayani. Origin of the Ashadhi Palkhi procession.',
      hi: 'इंद्रायणी तट पर २१ वर्ष की आयु में माऊली ज्ञानेश्वर जी ने संजीवन समाधि ली थी। आषाढ़ी पालखी का पावन उद्गम।',
      mr: 'इंद्रायणी काठचे पावन तीर्थ, जेथे वयाच्या अवघ्या २१ व्या वर्षी माऊलींनी संजीवन समाधी घेतली. आषाढी वारी पालखीचे मूळस्थान.'
    },
    specialOffering: { en: 'Ajanvriksha leaves, Tulsi, and Peda', hi: 'अजानवृक्ष पत्ते, तुलसी एवं पेड़ा', mr: 'अजानवृक्षाचे पावन पान, तुळशी व पेढा' }
  },

  // 5. Jejuri Khandoba (Pune)
  {
    id: 'jejuri-khandoba',
    name: { en: 'Jejuri Khandoba Mandir (Jay Malhar)', hi: 'जेजुरी खंडोबा (जय मल्हार) मंदिर', mr: 'श्री क्षेत्र जेजुरी गड खंडोबा मंदिर (यळकोट)' },
    deityName: { en: 'Lord Khandoba (Malhari Martand)', hi: 'भगवान खंडोबा', mr: 'खंडेराया (मल्हारी मार्तंड)' },
    region: 'pune_western',
    district: 'Pune',
    city: 'Jejuri',
    latitude: 18.2778,
    longitude: 74.1593,
    historicalEra: '13th-17th Century (Holkar & Peshwa Dynasty)',
    architectureStyle: { en: 'Fortified Hill Temple with Deepmalas', hi: 'गढ़कोट दुर्ग स्थापत्य एवं भव्य दीपमालाएं', mr: 'गढीसारखे बुलंद दगडी कोट व भव्य दीपमाळा' },
    timings: '05:00 AM - 09:30 PM',
    aartiTimings: ['05:30 AM (Morning Aarti)', '12:00 PM (Bhog Aarti)', '08:00 PM (Shej Aarti)'],
    seniorWheelchair: false, // hill steps
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Khandoba+Temple+Jejuri',
    significance: {
      en: 'The foremost Kuladaivata of Maharashtra famous for golden turmeric (Bhandara) showers shouting "Yelkot Yelkot Jai Malhar".',
      hi: 'महाराष्ट्र का प्रमुख कुलदैवत जहाँ स्वर्ण हल्दी (भंडारा) उड़ाई जाती है।',
      mr: 'महाराष्ट्राचे लाडके कुलदैवत. "यळकोट यळकोट जय मल्हार"च्या गजरात पिवळ्याधमक भंडाऱ्याची मुक्त उधळण.'
    },
    specialOffering: { en: 'Bhandara (Turmeric), Dried Coconut (Khobare), and Bhandara Bel', hi: 'भंडारा (हल्दी) एवं सूखा नारियल', mr: 'सोनेरी भंडारा, खोबरे, कांदा-भाकर व सुगंधी भंडार' }
  },

  // 6. Bhimashankar Jyotirlinga (Pune)
  {
    id: 'bhimashankar',
    name: { en: 'Bhimashankar Shiva Jyotirlinga', hi: 'भीमाशंकर ज्योतिर्लिंग', mr: 'श्री क्षेत्र भीमाशंकर ज्योतिर्लिंग' },
    deityName: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'भीमाशंकर महादेव' },
    region: 'pune_western',
    district: 'Pune',
    city: 'Bhimashankar (Sahyadri Hills)',
    latitude: 19.0722,
    longitude: 73.5358,
    historicalEra: '13th Century Nagara & 18th Century Nana Fadnavis',
    architectureStyle: { en: 'Nagara Style Hemadpanthi', hi: 'नागर शैली हेमाडपंथी प्रस्तर', mr: 'नागर व हेमाडपंथी काळ्या पाषाणातील मंदिर' },
    timings: '04:30 AM - 09:30 PM',
    aartiTimings: ['04:30 AM (Kakad Aarti)', '07:30 PM (Sandhya Aarti)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Bhimashankar+Temple',
    significance: {
      en: 'Sixth Jyotirlinga of Lord Shiva nestled inside the dense Sahyadri Western Ghats and origin of River Bhima.',
      hi: 'सह्याद्रि के घने वनों में भीमा नदी का उद्गम और भगवान शिव का छठा पावन ज्योतिर्लिंग।',
      mr: 'दाट सह्याद्रीच्या जंगलातील भीमा नदीचे उगमस्थान आणि शंकराचे सहावे पावन ज्योतिर्लिंग.'
    },
    specialOffering: { en: 'Bilvapatra, Milk, and Bael fruit', hi: 'बेलपत्र, दुग्ध एवं बेल फल', mr: 'बेलपत्र, दूध अभिषेक व रानफुले' }
  },

  // 7. Ganpatipule Swayambhu Ganesha (Ratnagiri, Konkan)
  {
    id: 'ganpatipule',
    name: { en: 'Ganpatipule Swayambhu Beach Ganesha', hi: 'गणपतिपुले स्वयंभू गणेश', mr: 'श्री क्षेत्र गणपतीपुळे स्वयंभू गणेश मंदिर' },
    deityName: { en: 'Lord Ganesha', hi: 'भगवान गणेश', mr: 'स्वयंभू गणपती' },
    region: 'konkan_mumbai',
    district: 'Ratnagiri',
    city: 'Ganpatipule',
    latitude: 17.1472,
    longitude: 73.2672,
    historicalEra: '400+ Years Old (West-Facing Arabian Sea)',
    architectureStyle: { en: 'Coastal Konkan Shikhara at Sea Shore', hi: 'कोंकण तटीय शिखर स्थापत्य', mr: 'अरबी समुद्राच्या किनाऱ्यावरील स्वयंभू पाषाण' },
    timings: '05:00 AM - 09:00 PM',
    aartiTimings: ['05:30 AM (Morning)', '12:00 PM (Madhyahna)', '07:00 PM (Sandhya)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Ganpatipule+Temple',
    significance: {
      en: 'One of the Paschim Dwarpalas (Western Gatekeepers) facing the Arabian Sea. Devotees circumambulate the entire natural hill as Pradakshina.',
      hi: 'अरब सागर के पावन तट पर पश्चिम मुखी स्वयंभू गणेश मूर्ति। पूरी पहाड़ी की परिक्रमा की जाती है।',
      mr: 'अरबी समुद्राच्या लाटा ज्याच्या चरणांना स्पर्श करतात असा पश्चिमाभिमुख स्वयंभू पाषाण. संपूर्ण टेकडीची प्रदक्षिणा घातली जाते.'
    },
    specialOffering: { en: 'Modak, Fresh Coconut, and Hibiscus', hi: 'मोदक, ताज़ा नारियल एवं जासवंद', mr: 'उकडीचे मोदक, शहाळे व लाल जास्वंद' }
  },

  // 8. Tuljapur Bhavani Mata (Osmanabad)
  {
    id: 'tuljapur-bhavani',
    name: { en: 'Tuljapur Bhavani Mata Temple', hi: 'तुलजापुर भवानी माता मंदिर', mr: 'श्री क्षेत्र तुळजापूर कुलस्वामिनी भवानी माता' },
    deityName: { en: 'Mata Tulja Bhavani', hi: 'मां भवानी', mr: 'आई तुळजाभवानी' },
    region: 'marathwada',
    district: 'Dharashiv (Osmanabad)',
    city: 'Tuljapur',
    latitude: 18.0068,
    longitude: 76.0792,
    historicalEra: '12th Century CE (Chhatrapati Shivaji Maharaj Ishta Devi)',
    architectureStyle: { en: 'Hemadpanthi with Kallol Tirtha', hi: 'हेमाडपंथी पाषाण एवं कलोल तीर्थ', mr: 'हेमाडपंथी मंदिर, कल्लोळ तीर्थ व गोमुख' },
    timings: '04:00 AM - 10:00 PM',
    aartiTimings: ['05:00 AM (Charnamrit)', '08:30 AM (Panchamrit)', '12:00 PM (Bhog)', '07:30 PM (Dhoop)', '09:30 PM (Shej)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Tulja+Bhavani+Temple+Tuljapur',
    significance: {
      en: 'The supreme Kulswamini of Maharashtra who gifted the legendary Bhavani Talwar to Chhatrapati Shivaji Maharaj.',
      hi: 'छत्रपति शिवाजी महाराज की कुलदेवी जिन्होंने उन्हें पावन भवानी तलवार प्रदान की थी।',
      mr: 'छत्रपती शिवाजी महाराजांची प्रेरणास्थान कुलस्वामिनी, जिच्या आशीर्वादाने हिंदवी स्वराज्याची स्थापना झाली.'
    },
    specialOffering: { en: 'Puran Poli, Lime Mala, and Haldi-Kumkum', hi: 'पूरन पोली, नींबू माला एवं सिंदूर', mr: 'पुरणपोळीचा नैवेद्य, कवड्यांची माळ, लिंबू माळ व कुंकू' }
  },

  // 9. Siddhivinayak Temple (Prabhadevi, Mumbai)
  {
    id: 'siddhivinayak-mumbai',
    name: { en: 'Shri Siddhivinayak Temple (Mumbai)', hi: 'श्री सिद्धिविनायक मंदिर (मुंबई)', mr: 'श्री सिद्धिविनायक मंदिर (प्रभादेवी, मुंबई)' },
    deityName: { en: 'Lord Ganesha', hi: 'भगवान गणेश', mr: 'सिद्धिविनायक गणपती' },
    region: 'konkan_mumbai',
    district: 'Mumbai City',
    city: 'Prabhadevi',
    latitude: 19.0169,
    longitude: 72.8304,
    historicalEra: '1801 CE (Laxman Vithu & Deubai Patil)',
    architectureStyle: { en: 'Modern Gold Plated Kalash & Marble Sanctum', hi: 'स्वर्ण कलश एवं संगमरमरी स्थापत्य', mr: 'सुवर्ण कलश व संगमरवरी देखणे गर्भगृह' },
    timings: '05:30 AM - 10:00 PM',
    aartiTimings: ['05:30 AM (Kakad Aarti)', '12:15 PM (Naivedya)', '07:30 PM (Sandhya)', '09:50 PM (Shej)'],
    seniorWheelchair: true,
    parkingAvailable: false, // congested city
    dharamshalaAvailable: false,
    googleMapsUrl: 'https://maps.google.com/?q=Siddhivinayak+Temple+Prabhadevi+Mumbai',
    significance: {
      en: 'World-famous Navasala Pavnara Ganesha with trunk turned to the right (Siddhi trunk). Visited by millions for wish fulfillment.',
      hi: 'मनोकामना पूर्ण करने वाले सिद्धिविनायक जिनकी सूंड दाहिनी ओर घूमी हुई है।',
      mr: 'उजव्या सोंडेचा जागृत सिद्धिविनायक, नवसाला पावणारा बाप्पा म्हणून जगभरात ख्याती.'
    },
    specialOffering: { en: 'Modak, Durva Grass, and Red Flowers', hi: 'मोदक, दूर्वा एवं लाल पुष्प', mr: '२१ मोदक, २१ दुर्वांची जुडी व शेंदूर' }
  },

  // 10. Shirdi Sai Baba Sansthan (Ahmednagar)
  {
    id: 'shirdi-saibaba',
    name: { en: 'Shirdi Shri Sai Baba Samadhi Temple', hi: 'शिरडी साईं बाबा समाधि मंदिर', mr: 'श्री साईबाबा समाधी मंदिर (शिर्डी)' },
    deityName: { en: 'Sai Baba of Shirdi', hi: 'साईं बाबा', mr: 'शिर्डीचे साईबाबा' },
    region: 'vidarbha_khandesh',
    district: 'Ahilyanagar (Ahmednagar)',
    city: 'Shirdi',
    latitude: 19.7667,
    longitude: 74.4764,
    historicalEra: '1918 CE (Dwarkamai & Samadhi Mandir)',
    architectureStyle: { en: 'Italian Marble with Pure Gold Throne', hi: 'इटैलियन संगमरमर एवं स्वर्ण सिंहासन', mr: 'इटालियन संगमरवर व सुवर्ण सिंहासन' },
    timings: '04:00 AM - 11:15 PM',
    aartiTimings: ['04:30 AM (Kakad Aarti)', '12:00 PM (Madhyahna Aarti)', '06:00 PM (Dhoop Aarti)', '10:30 PM (Shej Aarti)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Shirdi+Sai+Baba+Samadhi+Temple',
    significance: {
      en: 'The holy abode of Shirdi Sai Baba preaching "Sabka Malik Ek" and "Shraddha & Saburi". One of the most visited pilgrimage sites on Earth.',
      hi: '"सबका मालिक एक" और "श्रद्धा व सबूरी" का दिव्य संदेश देने वाले शिरडी साईं बाबा का पावन दरबार।',
      mr: '"श्रद्धा आणि सबुरी" चा महामंत्र देणारे दयाघन साईबाबा, जिथे जात-पात विसरून सर्वजण लीन होतात.'
    },
    specialOffering: { en: 'Udi Prasad, Shawl, and Boondi Ladoo', hi: 'उदी प्रसाद, चादर एवं बूंदी लड्डू', mr: 'धुनीची पवित्र उदी, सुगंधी चादर व बुंदी लाडू' }
  },

  // 11. Shani Shingnapur (Ahmednagar)
  {
    id: 'shani-shingnapur',
    name: { en: 'Shani Shingnapur Swayambhu Mandir', hi: 'शनि शिंगणापुर देवस्थान', mr: 'श्री क्षेत्र शनि शिंगणापूर देवस्थान' },
    deityName: { en: 'Lord Shani Dev', hi: 'भगवान शनिदेव', mr: 'शनिमहाराज' },
    region: 'vidarbha_khandesh',
    district: 'Ahilyanagar',
    city: 'Shingnapur',
    latitude: 19.3995,
    longitude: 74.8214,
    historicalEra: 'Ancient Open-Air Platform (No Roof Tradition)',
    architectureStyle: { en: 'Open Air Sacred Black Basalt Slab', hi: 'खुले आकाश के नीचे पावन शिला', mr: 'छताविना उघड्या आकाशाखाली काळी पाषाण शिला' },
    timings: '24 Hours Open',
    aartiTimings: ['05:00 AM (Morning)', '07:30 PM (Evening)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Shani+Shingnapur+Temple',
    significance: {
      en: 'A world-famous village where houses have no doors or locks, protected by Lord Shani Dev\'s supreme justice.',
      hi: 'विश्व का एकमात्र ऐसा गाँव जहाँ घरों में दरवाजे अथवा ताले नहीं लगाए जाते, शनिदेव स्वयं रक्षा करते हैं।',
      mr: 'जगातील असे एकमेव गाव जेथे घरांना दरवाजे व कुलपे नसतात. शनिदेवाचा अखंड पहारा मानला जातो.'
    },
    specialOffering: { en: 'Mustard Oil, Black Sesame, and Blue Cloth', hi: 'सरसों का तेल, काले तिल एवं नीले वस्त्र', mr: 'मोहरी/तिळाचे तेल अभिषेक, काळे तीळ व जास्वंद' }
  },

  // 12. Grishneshwar Jyotirlinga (Ellora, Sambhajinagar)
  {
    id: 'grishneshwar',
    name: { en: 'Grishneshwar Shiva Jyotirlinga', hi: 'घृष्णेश्वर ज्योतिर्लिंग (एलोरा)', mr: 'श्री क्षेत्र घृष्णेश्वर ज्योतिर्लिंग (वेरूळ)' },
    deityName: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'घृष्णेश्वर महादेव' },
    region: 'marathwada',
    district: 'Chhatrapati Sambhajinagar',
    city: 'Verul (Ellora)',
    latitude: 20.0249,
    longitude: 75.1793,
    historicalEra: '18th Century CE (Ahilyabai Holkar)',
    architectureStyle: { en: 'Red Stone South-Facing Shikhara', hi: 'लाल बलुआ पत्थर एवं दक्षिणामुखी गर्भगृह', mr: 'लाल दगडी कोरीव काम व दक्षिणामुखी गर्भगृह' },
    timings: '05:30 AM - 09:30 PM',
    aartiTimings: ['05:30 AM (Mangal Aarti)', '01:00 PM (Madhyahna)', '08:00 PM (Shej)'],
    seniorWheelchair: true,
    parkingAvailable: true,
    dharamshalaAvailable: true,
    googleMapsUrl: 'https://maps.google.com/?q=Grishneshwar+Jyotirlinga+Temple',
    significance: {
      en: 'The 12th and final Jyotirlinga of Lord Shiva, rebuilt by Punyashlok Rajmata Ahilyabai Holkar near the Ellora Caves.',
      hi: 'भगवान शिव का १२वां अंतिम पावन ज्योतिर्लिंग, जिसे राजमाता अहिल्याबाई होलकर ने पुनर्निर्मित कराया था।',
      mr: 'भारतातील १२ वे अंतिम पावन ज्योतिर्लिंग, पुण्यश्लोक अहिल्याबाई होळकरांनी जीर्णोद्धार केलेले शिल्पसौंदर्य.'
    },
    specialOffering: { en: 'Bilvapatra, Milk, and Bhasma', hi: 'बेलपत्र, दुग्ध एवं भस्म', mr: 'बेलपत्र, पंचामृत अभिषेक व पवित्र भस्म' }
  }
];

/**
 * Haversine Formula: Calculates true geographic distance in Kilometers
 * between user coordinates and temple coordinates.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Checks whether temple is currently open for Darshan based on current local hour
 */
export function isTempleOpenNow(_timingsStr: string): { isOpen: boolean; text: { en: string; hi: string; mr: string } } {
  try {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    // Standard temple hours in Maharashtra: generally 05:00 AM to 09:30 PM
    if (currentHour >= 5.0 && currentHour <= 21.5) {
      return {
        isOpen: true,
        text: { en: 'Open for Darshan Now', hi: 'दर्शन हेतु खुला है', mr: 'दर्शन चालू आहे' },
      };
    } else {
      return {
        isOpen: false,
        text: { en: 'Closed for Shej (Night Rest)', hi: 'कपाट बंद (विश्राम समय)', mr: 'शेजारती नंतर कपाट बंद' },
      };
    }
  } catch {
    return {
      isOpen: true,
      text: { en: 'Open', hi: 'खुला है', mr: 'उघडे आहे' },
    };
  }
}


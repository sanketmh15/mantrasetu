import { MultilingualText } from '../types';

export interface DayPlan {
  dayNumber: number;
  title: MultilingualText;
  route: MultilingualText;
  distanceKm: number;
  travelTimeHours: string;
  nightHalt: MultilingualText;
  morning: {
    time: string;
    activity: MultilingualText;
    templeName: MultilingualText;
    darshanTips: MultilingualText;
  };
  afternoon: {
    time: string;
    activity: MultilingualText;
    foodRecommendation: MultilingualText;
    templeName?: MultilingualText;
  };
  evening: {
    time: string;
    activity: MultilingualText;
    specialRitual: MultilingualText;
    templeName?: MultilingualText;
  };
}

export interface PilgrimageCircuit {
  id: string;
  name: MultilingualText;
  subtitle: MultilingualText;
  icon: string;
  badge: MultilingualText;
  totalDistanceKm: number;
  recommendedDays: number[];
  highlights: MultilingualText[];
  startingCities: string[];
  days: DayPlan[];
  travelTips: MultilingualText[];
  googleMapsRouteUrl: string;
}

export const pilgrimageCircuits: PilgrimageCircuit[] = [
  {
    id: 'jyotirlinga-5',
    name: {
      en: '5 Maharashtra Jyotirlingas Circuit',
      hi: 'महाराष्ट्र के ५ ज्योतिर्लिंग यात्रा',
      mr: 'महाराष्ट्रातील ५ पावन ज्योतिर्लिंग दर्शन यात्रा',
    },
    subtitle: {
      en: 'Trimbakeshwar • Bhimashankar • Grishneshwar • Aundha Nagnath • Parli Vaijnath',
      hi: 'त्र्यंबकेश्वर • भीमाशंकर • घृष्णेश्वर • औंढा नागनाथ • परळी वैजनाथ',
      mr: 'त्र्यंबकेश्वर • भीमाशंकर • घृष्णेश्वर • औंढा नागनाथ • परळी वैजनाथ',
    },
    icon: '🔱',
    badge: {
      en: 'Most Sacred Shaiva Circuit',
      hi: 'परम पावन शैव यात्रा',
      mr: 'सर्वात पवित्र शैव तीर्थयात्रा',
    },
    totalDistanceKm: 1150,
    recommendedDays: [3, 4, 5],
    startingCities: ['Pune', 'Mumbai', 'Nashik', 'Chhatrapati Sambhajinagar'],
    highlights: [
      {
        en: 'Godavari source at Trimbak Kushavarta and ancient 3-faced Linga',
        hi: 'त्र्यंबकेश्वर कुशावर्त एवं तीन मुखों वाले दुर्लभ ज्योतिर्लिंग दर्शन',
        mr: 'कुशावर्त तीरावर गोदावरी उगम आणि त्रिमुखाचे स्वयंभू लिंग दर्शन',
      },
      {
        en: 'Bhimashankar surrounded by lush Sahyadri hills & Bhima river origin',
        hi: 'सघन सह्याद्रि वनों में भीमा नदी उद्गम व भीमाशंकर ज्योतिर्लिंग',
        mr: 'सह्याद्रीच्या निसर्गरम्य अरण्यात भीमा नदीचा उगम व भीमाशंकर दर्शन',
      },
      {
        en: 'Grishneshwar adjacent to Ellora world heritage caves',
        hi: 'एलोरा विश्व धरोहर गुफाओं के समीप अहिल्याबाई होळकर निर्मित घृष्णेश्वर',
        mr: 'वेरुळ लेण्यांजवळ पुण्यश्लोक अहिल्याबाई होळकरांनी जीर्णोद्धार केलेले घृष्णेश्वर',
      },
      {
        en: 'Aundha Nagnath where Sant Namdev sang & the temple turned',
        hi: 'औंढा नागनाथ जहां संत नामदेव के कीर्तन पर मंदिर घूमा था',
        mr: 'संत नामदेवांच्या कीर्तनाने फिरलेले अतिप्राचीन औंढा नागनाथ',
      },
      {
        en: 'Parli Vaijnath atop the Meru hill associated with Dhanvantari',
        hi: 'मेरू पर्वत पर स्थित वैद्यनाथ जहां अमृत व औषधियों का वास है',
        mr: 'मेरू टेकडीवर वसलेले धन्वंतरी व अमृताशी संबंधित परळी वैजनाथ',
      },
    ],
    days: [
      {
        dayNumber: 1,
        title: {
          en: 'Day 1: Nashik & Trimbakeshwar Darshan',
          hi: 'दिवस १: नाशिक व त्र्यंबकेश्वर दर्शन',
          mr: 'दिवस १: नाशिक व त्र्यंबकेश्वर दर्शन',
        },
        route: {
          en: 'Pune/Mumbai → Nashik → Trimbakeshwar (Halt)',
          hi: 'पुणे/मुंबई → नाशिक → त्र्यंबकेश्वर (रात्र मुक्काम)',
          mr: 'पुणे/मुंबई → नाशिक → त्र्यंबकेश्वर (रात्री मुक्काम)',
        },
        distanceKm: 210,
        travelTimeHours: '4.5 - 5 hrs',
        nightHalt: {
          en: 'Trimbakeshwar or Nashik City',
          hi: 'त्र्यंबकेश्वर अथवा नाशिक नगर',
          mr: 'त्र्यंबकेश्वर अथवा नाशिक शहर',
        },
        morning: {
          time: '06:00 AM - 11:00 AM',
          templeName: {
            en: 'Shri Trimbakeshwar Jyotirlinga & Kushavarta Kunda',
            hi: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग व कुशावर्त कुण्ड',
            mr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग व कुशावर्त कुंड',
          },
          activity: {
            en: 'Early morning holy bath at Kushavarta Kunda, followed by VIP or general line darshan of the three-faced Linga (Brahma, Vishnu, Mahesh).',
            hi: 'कुशावर्त कुण्ड में पवित्र स्नान, तत्पश्चात त्रिमुख ज्योतिर्लिंग का दर्शन।',
            mr: 'कुशावर्त कुंडात पवित्र स्नान, त्यानंतर ब्रह्मा-विष्णु-महेश त्रिमुखी स्वयंभू लिंगाचे दर्शन.',
          },
          darshanTips: {
            en: 'Early morning (6:00 AM) abhishek line moves fastest. Wear traditional dhoti/kurta for inner sanctum entry.',
            hi: 'प्रातः ६ बजे की अभिषेक पंक्ति सबसे सुगम है। गर्भगृह हेतु पारंपरिक वस्त्र अनिवार्य हैं।',
            mr: 'सकाळी ६ वाजता अभिषेक रांग लवकर होते. गर्भगृहासाठी सोवळे/धोतर अनिवार्य.',
          },
        },
        afternoon: {
          time: '01:00 PM - 04:00 PM',
          activity: {
            en: 'Visit Panchavati in Nashik: Kalaram Temple, Sita Gumpha, and Ramkund on Godavari.',
            hi: 'नाशिक पंचवटी दर्शन: काळाराम मंदिर, सीता गुंफा व रामकुंड।',
            mr: 'नाशिक पंचवटी दर्शन: काळाराम मंदिर, सीता गुंफा व गोदावरी रामकुंड दर्शन.',
          },
          foodRecommendation: {
            en: 'Authentic Maharashtrian misal-pav and traditional bhakri meal in Panchavati.',
            hi: 'पंचवटी में पारम्परिक महाराष्ट्रीयन मिसळ-पाव व ज्वारी भाकरी थाली।',
            mr: 'पंचवटी परिसरातील पारंपरिक झणझणीत मिसळ आणि ज्वारीची भाकरी.',
          },
        },
        evening: {
          time: '06:30 PM - 08:30 PM',
          templeName: {
            en: 'Godavari Ganga Aarti at Ramkund',
            hi: 'रामकुण्ड गोदावरी महाआरती',
            mr: 'रामकुंड गोदावरी महाआरती',
          },
          activity: {
            en: 'Experience the illuminated evening Godavari Maha-Aarti at Ramkund with floating clay lamps.',
            hi: 'रामकुण्ड पर दीपदान के साथ संध्या गोदावरी महाआरती का दर्शन।',
            mr: 'रामकुंडावर दीप प्रज्वलित करून होणारी सायंकाळची भव्य गोदावरी आरती पहा.',
          },
          specialRitual: {
            en: 'Chant Godavari Stotra & Maha Mrityunjaya Mantra on the river banks.',
            hi: 'गोदावरी तट पर महामृत्युंजय मन्त्र जप।',
            mr: 'नदीकाठी महामृत्युंजय मंत्राचा जप.',
          },
        },
      },
      {
        dayNumber: 2,
        title: {
          en: 'Day 2: Bhimashankar Jyotirlinga in Sahyadri Forests',
          hi: 'दिवस २: सह्याद्रि वनों में भीमाशंकर दर्शन',
          mr: 'दिवस २: सह्याद्रीच्या कुशीत भीमाशंकर दर्शन',
        },
        route: {
          en: 'Trimbakeshwar → Sangamner → Manchar → Bhimashankar (Halt)',
          hi: 'त्र्यंबकेश्वर → संगमनेर → मंचर → भीमाशंकर (मुक्काम)',
          mr: 'त्र्यंबकेश्वर → संगमनेर → मंचर → भीमाशंकर (मुक्काम)',
        },
        distanceKm: 235,
        travelTimeHours: '5.5 hrs',
        nightHalt: {
          en: 'Bhimashankar MTDC or Manchar / Narayangaon',
          hi: 'भीमाशंकर अथवा मंचर/नारायणगांव',
          mr: 'भीमाशंकर अथवा मंचर/नारायणगाव',
        },
        morning: {
          time: '06:00 AM - 12:00 PM',
          templeName: {
            en: 'Shri Bhimashankar Temple & Wildlife Sanctuary',
            hi: 'श्री भीमाशंकर ज्योतिर्लिंग मंदिर',
            mr: 'श्री भीमाशंकर ज्योतिर्लिंग मंदिर व अभयारण्य',
          },
          activity: {
            en: 'Scenic drive through Sahyadri ghats. Descend stone steps to the Nagara-style black stone 13th century temple.',
            hi: 'सह्याद्रि घाट मार्ग से यात्रा। प्राचीन हेमाडपंथी पाषाण मंदिर में भीमाशंकर का जलाभिषेक।',
            mr: 'सह्याद्री घाटातून प्रवास करून हेमाडपंथी काळ्या पाषाणातील मंदिरात भीमाशंकराचे दर्शन व जलाभिषेक.',
          },
          darshanTips: {
            en: 'Carry light woollens as the dense forest ghat remains misty and cool throughout the year.',
            hi: 'जंगल क्षेत्र में सदैव शीतल हवाएं रहती हैं, हल्के गर्म वस्त्र साथ रखें।',
            mr: 'अरण्यात गारवा असल्याने सोबत हलके गरम कपडे ठेवावेत. पायऱ्या उतरताना सावध राहा.',
          },
        },
        afternoon: {
          time: '01:30 PM - 04:00 PM',
          activity: {
            en: 'Visit the origin spring of the sacred Bhima River (Bhimarathi) and Kamalja Mata shrine.',
            hi: 'भीमा नदी के उद्गम कुण्ड व कमलजा माता मंदिर का दर्शन।',
            mr: 'भीमा नदीचे मूळ उगमस्थान आणि कमलजा माता मंदिराचे दर्शन.',
          },
          foodRecommendation: {
            en: 'Local pithla-bhakri, thecha, and fresh forest wild honey from local vendors.',
            hi: 'स्थानिक पिठलं-भाकरी, ठेचा और वन का शुद्ध शहद।',
            mr: 'गरमागरम पिठलं-भाकरी, खरडा/ठेचा आणि शुद्ध रानटी मध.',
          },
        },
        evening: {
          time: '07:00 PM - 08:30 PM',
          activity: {
            en: 'Attend peaceful night Shayan Aarti at Bhimashankar surrounded by the whispering forest.',
            hi: 'रात्रि शयन आरती में सहभागिता व शांत ध्यान।',
            mr: 'रात्रीची शांत शयन आरती व मंदिरात ध्यानधारणा.',
          },
          specialRitual: {
            en: 'Chant Rudrashtakam inside the stone sabhamandap.',
            hi: 'पाषाण सभामंडप में रुद्राष्टकम् पाठ।',
            mr: 'पाषाणी सभामंडपात रुद्राष्टकाचे पठण.',
          },
        },
      },
      {
        dayNumber: 3,
        title: {
          en: 'Day 3: Grishneshwar & Ellora Heritage',
          hi: 'दिवस ३: घृष्णेश्वर ज्योतिर्लिंग एवं वेरुळ दर्शन',
          mr: 'दिवस ३: घृष्णेश्वर ज्योतिर्लिंग व वेरुळ दर्शन',
        },
        route: {
          en: 'Bhimashankar → Alephata → Ahmednagar → Ellora/Grishneshwar',
          hi: 'भीमाशंकर → अहमदनगर → वेरुळ/घृष्णेश्वर',
          mr: 'भीमाशंकर → अहमदनगर → वेरुळ/घृष्णेश्वर',
        },
        distanceKm: 270,
        travelTimeHours: '6 hrs',
        nightHalt: {
          en: 'Chhatrapati Sambhajinagar (Aurangabad)',
          hi: 'छत्रपति संभाजीनगर (औरंगाबाद)',
          mr: 'छत्रपती संभाजीनगर',
        },
        morning: {
          time: '07:00 AM - 12:30 PM',
          templeName: {
            en: 'Shri Grishneshwar Jyotirlinga (12th Jyotirlinga)',
            hi: 'श्री घृष्णेश्वर ज्योतिर्लिंग (द्वादश ज्योतिर्लिंग)',
            mr: 'श्री घृष्णेश्वर ज्योतिर्लिंग (१२ वे ज्योतिर्लिंग)',
          },
          activity: {
            en: 'Enter the sanctum built by Ahilyabai Holkar using red basalt stone. Male devotees enter bare-chested as per ancient Agamic rule.',
            hi: 'अहिल्याबाई होळकर द्वारा निर्मित लाल पाषाण मंदिर में प्रवेश। पुरुषों हेतु पारंपरिक अर्धनग्न नियम।',
            mr: 'पुण्यश्लोक अहिल्याबाईंनी बांधलेल्या तांबड्या पाषाणातील मंदिरात दर्शन. पुरुषांसाठी सोवळे नियम.',
          },
          darshanTips: {
            en: 'Men must remove shirts/vests to enter the garbhagriha. You can touch and offer Bilva leaves directly to the Linga.',
            hi: 'गर्भगृह में पुरुषों को ऊपरी वस्त्र उतारने होते हैं। लिंग पर सीधे बिल्वपत्र अर्पण संभव है।',
            mr: 'गर्भगृहात पुरुषांना अंगरखा काढावा लागतो. शिवलिंगाला थेट बिल्वपत्र अर्पण करता येते.',
          },
        },
        afternoon: {
          time: '01:30 PM - 04:30 PM',
          activity: {
            en: 'Explore Ellora Cave 16 (Kailasa Temple), the world\'s largest monolithic rock-cut Shiva temple.',
            hi: 'विश्व प्रसिद्ध कैलास मंदिर (गुफा १६) का दर्शन, जो अखण्ड पाषाण को तराश कर बना है।',
            mr: 'एकाच अखंड खडकातून कोरलेले जगातील आश्चर्य — कैलास मंदिर (गुंफा १६) दर्शन.',
          },
          foodRecommendation: {
            en: 'Thali meals near Ellora and authentic Sambhajinagar naankhaliya or dal-baati.',
            hi: 'वेरुळ के समीप पारंपरिक भोजन अथवा दाल-बाटी।',
            mr: 'वेरुळ परिसरातील शाकाहारी जेवण किंवा अस्सल मराठवाडी जेवण.',
          },
        },
        evening: {
          time: '06:00 PM - 08:00 PM',
          activity: {
            en: 'Shivalaya Teerth parikrama and evening Sandhya Aarti at Grishneshwar.',
            hi: 'शिवालय तीर्थ परिक्रमा व संध्या आरती।',
            mr: 'शिवालय तीर्थ परिक्रमा व घृष्णेश्वर संध्या आरती.',
          },
          specialRitual: {
            en: 'Offer 108 Bilva leaves while reciting Bilvashtakam.',
            hi: 'बिल्वाष्टकम् के साथ १०८ बिल्वपत्र अर्पण।',
            mr: 'बिल्वाष्टकासह १०८ बेलपत्रे अर्पण.',
          },
        },
      },
      {
        dayNumber: 4,
        title: {
          en: 'Day 4: Aundha Nagnath in Marathwada',
          hi: 'दिवस ४: औंढा नागनाथ दर्शन (मराठवाडा)',
          mr: 'दिवस ४: औंढा नागनाथ दर्शन (हिंगोली)',
        },
        route: {
          en: 'Sambhajinagar → Jalna → Jintur → Aundha Nagnath (Hingoli)',
          hi: 'संभाजीनगर → जालना → जिंतूर → औंढा नागनाथ (हिंगोली)',
          mr: 'संभाजीनगर → जालना → जिंतूर → औंढा नागनाथ (हिंगोली)',
        },
        distanceKm: 215,
        travelTimeHours: '4.5 hrs',
        nightHalt: {
          en: 'Nanded or Parli',
          hi: 'नांदेड अथवा परळी',
          mr: 'नांदेड अथवा परळी',
        },
        morning: {
          time: '07:30 AM - 12:00 PM',
          templeName: {
            en: 'Shri Aundha Nagnath Temple',
            hi: 'श्री औंढा नागनाथ ज्योतिर्लिंग',
            mr: 'श्री औंढा नागनाथ ज्योतिर्लिंग',
          },
          activity: {
            en: 'Descend to the underground sanctum (garbhagriha) to touch the swayambhu Nagesh Linga.',
            hi: 'भूमिगत गर्भगृह में उतरकर स्वयंभू नागेश ज्योतिर्लिंग का स्पर्श व दुग्धाभिषेक।',
            mr: 'तळघरातील गुप्त गर्भगृहात उतरून स्वयंभू नागनाथ ज्योतिर्लिंगाचे थेट स्पर्श दर्शन.',
          },
          darshanTips: {
            en: 'The sanctum is subterranean and narrow; queue patiently. Visit the back where the temple rotated for Sant Namdev.',
            hi: 'गर्भगृह भूमिगत है अतः धैर्य रखें। मंदिर के पीछे वह स्थान देखें जहां संत नामदेव का चमत्कार हुआ था।',
            mr: 'गर्भगृह तळघरात असल्याने सावकाश उतरावे. संत नामदेवांच्या कीर्तनाने पश्चिमेस फिरलेले गोपूर आवर्जून पहा.',
          },
        },
        afternoon: {
          time: '01:00 PM - 03:30 PM',
          activity: {
            en: 'Explore the intricate 13th-century Yadava-era outer stone carvings depicting Mahabharata & Ramayana.',
            hi: 'यादवकालीन अद्वितीय पाषाण मूर्तिकला का अवलोकन।',
            mr: 'यादवकालीन मंदिराच्या बाहेरील भिंतींवरील अप्रतिम रामायण-महाभारत शिल्पपट पहा.',
          },
          foodRecommendation: {
            en: 'Traditional Marathwada jowar bhakri, shenga chutney (peanut garlic powder), and sweet shrikhand.',
            hi: 'ज्वारी भाकरी, शेंगदाणा लसूण चटणी व मराठवाडी सात्विक भोजन।',
            mr: 'मराठवाडी ज्वारीची भाकरी, शेंगदाणा-लसूण चटणी आणि सात्विक जेवण.',
          },
        },
        evening: {
          time: '05:30 PM - 08:30 PM',
          activity: {
            en: 'Drive to Nanded or Parli. Visit Sachkhand Gurudwara in Nanded if halting there.',
            hi: 'नांदेड अथवा परळी प्रस्थान। नांदेड मुक्काम होने पर हुजूर साहिब दर्शन।',
            mr: 'परळी अथवा नांदेडकडे प्रस्थान. नांदेडमध्ये मुक्काम असल्यास सचखंड गुरुद्वारा दर्शन.',
          },
          specialRitual: {
            en: 'Chant Lingashtakam during evening twilight.',
            hi: 'प्रदोष काल में लिंगाष्टकम् का पाठ।',
            mr: 'प्रदोष वेळी लिंगाष्टकाचे पठण.',
          },
        },
      },
      {
        dayNumber: 5,
        title: {
          en: 'Day 5: Parli Vaijnath & Return',
          hi: 'दिवस ५: परळी वैजनाथ ज्योतिर्लिंग एवं यात्रा समापन',
          mr: 'दिवस ५: परळी वैजनाथ दर्शन व तीर्थयात्रा सांगता',
        },
        route: {
          en: 'Aundha / Nanded → Parli Vaijnath → Beed → Pune / Mumbai',
          hi: 'औंढा / नांदेड → परळी वैजनाथ → बीड → पुणे / मुंबई',
          mr: 'नांदेड / औंढा → परळी वैजनाथ → बीड → पुणे / मुंबई',
        },
        distanceKm: 380,
        travelTimeHours: '7.5 hrs',
        nightHalt: {
          en: 'Return Home with Divine Blessings',
          hi: 'महादेव के आशीर्वाद के साथ गृह वापसी',
          mr: 'महादेवाच्या पावन आशीर्वादाने घरी परत',
        },
        morning: {
          time: '06:00 AM - 10:30 AM',
          templeName: {
            en: 'Shri Parli Vaijnath Temple on Meru Hill',
            hi: 'श्री परळी वैजनाथ ज्योतिर्लिंग',
            mr: 'श्री परळी वैजनाथ ज्योतिर्लिंग (मेरू पर्वत)',
          },
          activity: {
            en: 'Climb the broad stone steps to the hill temple. Devotees touch the Salunkha and offer holy bilva and water for health and vitality.',
            hi: 'मेरू पर्वत पर पाषाण सीढ़ियां चढ़कर वैद्यनाथ दर्शन। आरोग्य एवं दीर्घायु हेतु विशेष जलाभिषेक।',
            mr: 'मेरू टेकडीवरील पायऱ्या चढून वैद्यनाथ मंदिरात आरोग्य व दीर्घायुष्यासाठी रुद्राभिषेक व दर्शन.',
          },
          darshanTips: {
            en: 'Parli temple allows devotees to personally touch the Jyotirlinga. Best to complete darshan by 9:30 AM before afternoon heat.',
            hi: 'परळी में ज्योतिर्लिंग को दोनों हाथों से स्पर्श करने की अनुमति है। प्रातःकाल दर्शन सर्वोत्तम।',
            mr: 'परळीत ज्योतिर्लिंगाला दोन्ही हातांनी स्पर्श करून नमन करता येते. सकाळी लवकर दर्शन घेणे उत्तम.',
          },
        },
        afternoon: {
          time: '11:30 AM - 02:00 PM',
          activity: {
            en: 'Visit Harihar Teerth kunda where both Hari (Vishnu) and Hara (Shiva) are worshipped together.',
            hi: 'हरिहर तीर्थ कुंड दर्शन जहां हरि और हर का एकत्व है।',
            mr: 'हरी आणि हर यांच्या ऐक्याचे प्रतीक असलेल्या हरिहर तीर्थाचे दर्शन.',
          },
          foodRecommendation: {
            en: 'Puran poli meal or local Maharashtrian bhojan in Parli town.',
            hi: 'परळी नगर में पुरणपोळी व पारम्परिक भोजन।',
            mr: 'परळीतील प्रसिद्ध पुरणपोळी व सात्विक मराठवाडी महाप्रसाद.',
          },
        },
        evening: {
          time: '03:00 PM onwards',
          activity: {
            en: 'Comfortable return drive via Beed-Ahmednagar highway to Pune/Mumbai, concluding the 5 Jyotirlinga Mahayatra.',
            hi: '५ ज्योतिर्लिंग महायात्रा की पूर्णता के साथ वापसी यात्रा।',
            mr: '५ ज्योतिर्लिंग महायात्रेची सांगता करून बीड-नगर महामार्गाने परतीचा प्रवास.',
          },
          specialRitual: {
            en: 'Chant Dwadasha Jyotirlinga Stotram to conclude the pilgrimage.',
            hi: 'द्वादश ज्योतिर्लिंग स्तोत्र के साथ यात्रा पूर्णता संकल्प।',
            mr: 'द्वादश ज्योतिर्लिंग स्तोत्र पठण करून तीर्थयात्रेची सांगता.',
          },
        },
      },
    ],
    travelTips: [
      {
        en: 'Hire a dedicated cab or use own vehicle for the best comfort over the 1,150 km route across 3 divisions.',
        hi: '१,१५० किमी की इस विस्तृत यात्रा हेतु निजी वाहन अथवा समर्पित टैक्सी सर्वोत्तम है।',
        mr: '१,१५० किमीच्या या भव्य मार्गासाठी स्वतःची गाडी किंवा भाड्याने ट्रॅव्हल टॅक्सी सोयीची पडते.',
      },
      {
        en: 'Keep traditional dhoti/kurta for men as Trimbakeshwar and Grishneshwar have strict garbhagriha attire rules.',
        hi: 'त्र्यंबकेश्वर व घृष्णेश्वर गर्भगृह में दर्शन हेतु धोती/कुर्ता रखना आवश्यक है।',
        mr: 'त्र्यंबकेश्वर व घृष्णेश्वर गर्भगृह प्रवेशासाठी पुरुषांनी सोवळे/धोतर सोबत ठेवावे.',
      },
      {
        en: 'Maha Shivratri and Shravan Mondays see queues of 6-12 hours; plan off-peak weekdays for peaceful darshan.',
        hi: 'श्रावण सोमवार एवं महाशिवरात्रि पर अत्यधिक भीड़ होती है; शांत दर्शन हेतु सामान्य कार्यदिवस चुनें।',
        mr: 'श्रावणी सोमवार व महाशिवरात्रीला प्रचंड गर्दी असते; शांत दर्शनासाठी सामान्य दिवसांत नियोजन करावे.',
      },
    ],
    googleMapsRouteUrl: 'https://www.google.com/maps/dir/Trimbakeshwar/Bhimashankar/Grishneshwar+Temple/Aundha+Nagnath/Parli+Vaijnath',
  },
  {
    id: 'ashtavinayak-8',
    name: {
      en: '8 Ashtavinayak Circuit',
      hi: 'श्री अष्टविनायक यात्रा',
      mr: 'श्री अष्टविनायक पावन तीर्थयात्रा',
    },
    subtitle: {
      en: 'Morgaon • Siddhatek • Pali • Mahad • Theur • Lenyadri • Ozar • Ranjangaon • Morgaon',
      hi: 'मोरगांव • सिद्धटेक • पाली • महड • थेऊर • लेण्याद्री • ओझर • रांजणगांव • मोरगांव',
      mr: 'मोरगाव • सिद्धटेक • पाली • महड • थेऊर • लेण्याद्री • ओझर • रांजणगाव • मोरगाव',
    },
    icon: '🐘',
    badge: {
      en: 'Prescribed Scriptural Sequence',
      hi: 'शास्त्रोक्त क्रमबद्ध यात्रा',
      mr: 'शास्त्रोक्त क्रमबद्ध पावन यात्रा',
    },
    totalDistanceKm: 650,
    recommendedDays: [2, 3],
    startingCities: ['Pune', 'Mumbai', 'Nashik', 'Satara'],
    highlights: [
      {
        en: 'Starts and concludes at Mayureshwar Morgaon as per Ganesha Purana',
        hi: 'गणेश पुराण के अनुसार मोरगांव से आरम्भ और मोरगांव में ही पूर्णता',
        mr: 'गणेश पुराणातील नियमानुसार मोरगावहून सुरू होऊन मोरगावलाच पूर्ण होणारी यात्रा',
      },
      {
        en: 'Only mountain-cave Ganapati at Lenyadri (283 carved steps)',
        hi: 'लेण्याद्री की २८३ सीढ़ियां चढ़कर गुफा में गिरिजात्मज गणेश',
        mr: 'लेण्याद्रीच्या २८३ पायऱ्या चढून बौद्ध लेणीत वसलेले गिरिजात्मज',
      },
      {
        en: 'Gold crest and deepastambha at Ozar Vighneshwar along Kukadi river',
        hi: 'कुकडी नदी तट पर स्वर्ण कलश शोभित विघ्नेश्वर ओझर',
        mr: 'कुकडी नदीच्या काठी सोन्याचा कळस व दीपमाळांनी सजलेले ओझर विघ्नेश्वर',
      },
    ],
    days: [
      {
        dayNumber: 1,
        title: {
          en: 'Day 1: Morgaon, Siddhatek & Theur',
          hi: 'दिवस १: मोरगांव, सिद्धटेक व थेऊर',
          mr: 'दिवस १: मोरगाव, सिद्धटेक व थेऊर',
        },
        route: {
          en: 'Pune → Morgaon (1) → Siddhatek (2) → Theur (3) → Pune (Halt)',
          hi: 'पुणे → मोरगांव (१) → सिद्धटेक (२) → थेऊर (३) → पुणे (मुक्काम)',
          mr: 'पुणे → मोरगाव (१) → सिद्धटेक (२) → थेऊर (३) → पुणे (मुक्काम)',
        },
        distanceKm: 210,
        travelTimeHours: '5 hrs',
        nightHalt: {
          en: 'Pune City or Hadapsar',
          hi: 'पुणे नगर अथवा हडपसर',
          mr: 'पुणे शहर अथवा हडपसर',
        },
        morning: {
          time: '06:00 AM - 11:30 AM',
          templeName: {
            en: '1. Shri Mayureshwar (Morgaon) & 2. Shri Siddhivinayak (Siddhatek)',
            hi: '१. श्री मयूरेश्वर (मोरगांव) व २. श्री सिद्धिविनायक (सिद्धटेक)',
            mr: '१. श्री मयूरेश्वर (मोरगाव) व २. श्री सिद्धिविनायक (सिद्धटेक)',
          },
          activity: {
            en: 'Take holy sankalpa at Morgaon facing the Nandi before Ganapati. Then drive to Bhima river banks at Siddhatek (the only right-trunk Ganesha).',
            hi: 'मोरगांव में यात्रा संकल्प, फिर सिद्धटेक में दक्षिणमुखी सूंड़ वाले सिद्धिविनायक दर्शन।',
            mr: 'मोरगावात नंदीच्या मागे असणाऱ्या मयूरेश्वरासमोर यात्रेचा संकल्प, नंतर भीमा नदीकाठी सिद्धटेकला उजव्या सोंडेच्या सिद्धिविनायकाचे दर्शन.',
          },
          darshanTips: {
            en: 'Siddhatek pradakshina hill is 1 km round; do if time permits.',
            hi: 'सिद्धटेक पहाड़ी की १ किमी परिक्रमा अत्यंत पुण्यकारी है।',
            mr: 'सिद्धटेकच्या टेकडीची १ किमी प्रदक्षिणा अत्यंत पुण्यदायी मानली जाते.',
          },
        },
        afternoon: {
          time: '01:00 PM - 04:30 PM',
          templeName: {
            en: '3. Shri Chintamani (Theur)',
            hi: '३. श्री चिंतामणि (थेऊर)',
            mr: '३. श्री चिंतामणी (थेऊर)',
          },
          activity: {
            en: 'Darshan of Chintamani at the confluence of Mula-Mutha rivers, where Madhavrao Peshwa spent his final days.',
            hi: 'मुळा-मुठा संगम पर चिंतामणि दर्शन, जहां माधवराव पेशवा ने ध्यान किया था।',
            mr: 'मुळा-मुठा संगमावर वसलेल्या चिंतामणी गणपतीचे दर्शन. माधवराव पेशव्यांचे ध्यानस्थान पहा.',
          },
          foodRecommendation: {
            en: 'Traditional thalipeeth, khawa pedhas of Theur, and sugarcane juice.',
            hi: 'थेऊर के प्रसिद्ध पेड़े एवं पारम्परिक थालीपीठ।',
            mr: 'थेऊरचे प्रसिद्ध खव्याचे पेढे आणि गरमागरम थालीपीठ.',
          },
        },
        evening: {
          time: '06:00 PM - 08:30 PM',
          activity: {
            en: 'Return to Pune, rest and prepare for early morning mountain climb at Lenyadri.',
            hi: 'पुणे आगमन, विश्राम एवं अगले दिवस लेण्याद्री चढ़ाई की तैयारी।',
            mr: 'पुण्यात मुक्काम, विश्रांती आणि दुसऱ्या दिवशी लेण्याद्री चढण्याची पूर्वतयारी.',
          },
          specialRitual: {
            en: 'Recite Ganesha Atharvashirsha with family in the evening.',
            hi: 'संध्या समय परिवार सहित अथर्वशीर्ष पाठ।',
            mr: 'संध्याकाळी सहकुटुंब गणपती अथर्वशीर्षाचे पठण.',
          },
        },
      },
      {
        dayNumber: 2,
        title: {
          en: 'Day 2: Lenyadri, Ozar & Ranjangaon',
          hi: 'दिवस २: लेण्याद्री, ओझर व रांजणगांव',
          mr: 'दिवस २: लेण्याद्री, ओझर व रांजणगाव',
        },
        route: {
          en: 'Pune → Lenyadri (4) → Ozar (5) → Ranjangaon (6) → Khopoli/Pune',
          hi: 'पुणे → लेण्याद्री (४) → ओझर (५) → रांजणगांव (६) → खोपोली',
          mr: 'पुणे → लेण्याद्री (४) → ओझर (५) → रांजणगाव (६) → खोपोली',
        },
        distanceKm: 240,
        travelTimeHours: '5.5 hrs',
        nightHalt: {
          en: 'Khopoli or Talegaon',
          hi: 'खोपोली अथवा तलेगांव',
          mr: 'खोपोली अथवा तळेगाव',
        },
        morning: {
          time: '06:30 AM - 11:30 AM',
          templeName: {
            en: '4. Shri Girijatmak (Lenyadri) & 5. Shri Vighneshwar (Ozar)',
            hi: '४. श्री गिरिजात्मज (लेण्याद्री) व ५. श्री विघ्नेश्वर (ओझर)',
            mr: '४. श्री गिरिजात्मज (लेण्याद्री) व ५. श्री विघ्नेश्वर (ओझर)',
          },
          activity: {
            en: 'Climb 283 steps in the morning shade to Cave 7 at Lenyadri. Then drive 15 km to Ozar along the riverside.',
            hi: 'लेण्याद्री की २८३ सीढ़ियां चढ़कर गुफा मंदिर दर्शन। फिर १५ किमी दूर ओझर में विघ्नेश्वर दर्शन।',
            mr: 'सकाळी सावलीत लेण्याद्रीच्या २८३ पायऱ्या चढून गुंफेत गिरिजात्मज दर्शन, नंतर १५ किमीवर ओझर विघ्नेश्वर दर्शन.',
          },
          darshanTips: {
            en: 'Lenyadri has active langurs; do not carry loose prasad or plastic packets openly in hands.',
            hi: 'लेण्याद्री में बंदर हैं, प्रसाद व थैले सुरक्षित रखें।',
            mr: 'लेण्याद्रीवर वानर असल्याने हातात उघडा प्रसाद किंवा पिशव्या नेऊ नका.',
          },
        },
        afternoon: {
          time: '01:00 PM - 04:30 PM',
          templeName: {
            en: '6. Shri Mahaganapati (Ranjangaon)',
            hi: '६. श्री महागणपति (रांजणगांव)',
            mr: '६. श्री महागणपती (रांजणगाव)',
          },
          activity: {
            en: 'Darshan of the mighty Mahaganapati facing east, seated on a lotus, who blessed Lord Shiva before battling Tripurasura.',
            hi: 'रांजणगांव में महागणपति दर्शन, जिनकी कृपा से शिवजी ने त्रिपुरासुर का वध किया था।',
            mr: 'त्रिपुरासुराचा वध करण्यापूर्वी भगवान शंकराने ज्यांची पूजा केली, त्या रांजणगावच्या महागणपतीचे दर्शन.',
          },
          foodRecommendation: {
            en: 'Temple trust bhojan or traditional Maharashtrian meals on Pune-Nagar highway.',
            hi: 'रांजणगांव में मंदिर महाप्रसाद अथवा राजमार्ग पर भोजन।',
            mr: 'रांजणगाव मंदिर परिसरातील अन्नछत्र किंवा अस्सल महाराष्ट्रीयन जेवण.',
          },
        },
        evening: {
          time: '06:00 PM - 08:30 PM',
          activity: {
            en: 'Drive towards Konkan foothills (Khopoli) for Day 3 Konkan temples.',
            hi: 'तृतीय दिवस हेतु कोंकण तलहटी (खोपोली) प्रस्थान।',
            mr: 'तिसऱ्या दिवशीच्या कोकण गणपतींसाठी खोपोली किंवा पालीच्या दिशेने प्रवास.',
          },
          specialRitual: {
            en: 'Sing Sukhakarta Dukhaharta Aarti.',
            hi: 'सुखकर्ता दुखहर्ता महाआरती।',
            mr: 'सुखकर्ता दुःखहर्ता आरती सामूहिक गाणे.',
          },
        },
      },
      {
        dayNumber: 3,
        title: {
          en: 'Day 3: Mahad, Pali & Completion at Morgaon',
          hi: 'दिवस ३: महड, पाली एवं मोरगांव में पूर्णता',
          mr: 'दिवस ३: महड, पाली व मोरगावात महायात्रेची पूर्णता',
        },
        route: {
          en: 'Khopoli → Mahad (7) → Pali (8) → Morgaon (Completion) → Pune',
          hi: 'खोपोली → महड (७) → पाली (८) → मोरगांव (समापन) → पुणे',
          mr: 'खोपोली → महड (७) → पाली (८) → मोरगाव (सांगता) → पुणे',
        },
        distanceKm: 260,
        travelTimeHours: '6 hrs',
        nightHalt: {
          en: 'Home with Ashtavinayak Blessings',
          hi: 'अष्टविनायक कृपा के साथ गृह वापसी',
          mr: 'अष्टविनायकाच्या आशीर्वादाने आनंदाने घरी परत',
        },
        morning: {
          time: '06:30 AM - 11:30 AM',
          templeName: {
            en: '7. Shri Varadvinayak (Mahad) & 8. Shri Ballaleshwar (Pali)',
            hi: '७. श्री वरदविनायक (महड) व ८. श्री बल्लाळेश्वर (पाली)',
            mr: '७. श्री वरदविनायक (महड) व ८. श्री बल्लाळेश्वर (पाली)',
          },
          activity: {
            en: 'Visit Mahad where an eternal flame (Nandadeep) has burned since 1892. Then visit Pali, the only Ganesha named after a devotee (Ballal).',
            hi: 'महड में १८९२ से अखंड प्रज्वलित नंदादीप दर्शन। फिर पाली में भक्त बल्लाळ के नाम पर स्थित बल्लाळेश्वर।',
            mr: '१८९२ पासून अखंड तेवणाऱ्या महडच्या नंदादीपासह वरदविनायक दर्शन. नंतर भक्ताचे नाव धारण करणारे एकमेव पालीचे बल्लाळेश्वर दर्शन.',
          },
          darshanTips: {
            en: 'At Mahad, devotees can personally enter the garbhagriha to touch the idol\'s feet.',
            hi: 'महड में भक्त गर्भगृह में जाकर चरण स्पर्श कर सकते हैं।',
            mr: 'महडमध्ये भक्तांना गर्भगृहात स्वतः मूर्तीला स्पर्श करून नमस्कार करता येतो.',
          },
        },
        afternoon: {
          time: '01:30 PM - 05:00 PM',
          templeName: {
            en: 'Final Conclusion: Shri Mayureshwar (Morgaon)',
            hi: 'यात्रा पूर्णता: श्री मयूरेश्वर (मोरगांव)',
            mr: 'यात्रेची शास्त्रोक्त सांगता: श्री मयूरेश्वर (मोरगाव)',
          },
          activity: {
            en: 'Return to Morgaon to complete the sacred Ashtavinayak loop. Offer coconuts, modaks, and thank the Lord for completing the yatra safely.',
            hi: 'शास्त्रोक्त नियम अनुसार पुनः मोरगांव पहुंचकर यात्रा का समापन। मोदक एवं नारियल अर्पण।',
            mr: 'शास्त्रोक्त विधीनुसार पुन्हा मोरगावला पोहोचून यात्रेची सांगता. मोदक व श्रीफळ अर्पण करून कृतज्ञता व्यक्त करणे.',
          },
          foodRecommendation: {
            en: 'Ukdiche Modak (steamed jaggery-coconut dumplings) and pure ghee varan-bhat.',
            hi: 'पारम्परिक उकडीचे मोदक एवं वरण-भात।',
            mr: 'उकडीचे गरम मोदक, तूप आणि गरमागरम वरण-भात.',
          },
        },
        evening: {
          time: '06:30 PM onwards',
          activity: {
            en: 'Return to Pune or Mumbai with Ashtavinayak prasad and profound peace.',
            hi: 'अष्टविनायक कृपा प्रसाद लेकर सुखद वापसी।',
            mr: 'अष्टविनायकाचा पावन प्रसाद घेऊन शांत मनाने घराकडे परतीचा प्रवास.',
          },
          specialRitual: {
            en: 'Sankalpa Samapti (Completion offering) with 21 Durva sprigs.',
            hi: '२१ दूर्वा अर्पण कर संकल्प पूर्ति।',
            mr: '२१ दुर्वा अर्पण करून यात्रेचा संकल्प पूर्ण करणे.',
          },
        },
      },
    ],
    travelTips: [
      {
        en: 'Follow the traditional order: Morgaon → Siddhatek → Theur → Lenyadri → Ozar → Ranjangaon → Mahad → Pali → Morgaon.',
        hi: 'पारंपरिक क्रम: मोरगांव → सिद्धटेक → थेऊर → लेण्याद्री → ओझर → रांजणगांव → महड → पाली → मोरगांव।',
        mr: 'शास्त्रोक्त क्रम: मोरगाव → सिद्धटेक → थेऊर → लेण्याद्री → ओझर → रांजणगाव → महड → पाली → मोरगाव सांगता.',
      },
      {
        en: 'Angaraki Chaturthi sees massive crowds of over 200,000 pilgrims at Morgaon and Theur.',
        hi: 'अंगारकी संकष्टी पर लाखों भक्त आते हैं, सामान्य दिनों में शांत दर्शन प्राप्त होता है।',
        mr: 'अंगारकी संकष्टीला अफाट गर्दी असते; शांत दर्शनासाठी सामान्य शनिवार-रविवार किंवा इतर वारी जावे.',
      },
    ],
    googleMapsRouteUrl: 'https://www.google.com/maps/dir/Morgaon/Siddhatek/Theur/Lenyadri/Ozar/Ranjangaon/Mahad/Pali/Morgaon',
  },
  {
    id: 'shaktipeeth-3half',
    name: {
      en: '3.5 Shaktipeeth of Maharashtra Circuit',
      hi: 'महाराष्ट्र के ३.५ शक्तिपीठ महायात्रा',
      mr: 'महाराष्ट्रातील साडेतीन शक्तिपीठे पावन महायात्रा',
    },
    subtitle: {
      en: 'Kolhapur Mahalakshmi • Tuljapur Bhavani • Mahur Renuka Mata • Saptashrungi Vani (Half)',
      hi: 'कोल्हापुर महालक्ष्मी • तुलजापुर भवानी • माहूर रेणुका माता • सप्तशृंगी वणी (अर्धपीठ)',
      mr: 'कोल्हापूर महालक्ष्मी • तुळजापूर भवानी • माहूर रेणुका माता • सप्तशृंगी वणी (अर्धे पीठ)',
    },
    icon: '🌺',
    badge: {
      en: 'Kulswamini Divine Circuit',
      hi: 'कुलस्वामिनी दर्शन यात्रा',
      mr: 'कुलस्वामिनी पावन महायात्रा',
    },
    totalDistanceKm: 1280,
    recommendedDays: [4, 5],
    startingCities: ['Pune', 'Mumbai', 'Kolhapur', 'Sambhajinagar'],
    highlights: [
      {
        en: 'Ambabai at Kolhapur where Kiranotsav (sun rays falling on idol) occurs',
        hi: 'करवीर निवासिनी श्री महालक्ष्मी अंबाबाई, जहां किरणोत्सव होता है',
        mr: 'करवीर निवासिनी अंबाबाई, जिथे वर्षातून दोनदा थेट मूर्तीवर किरणोत्सव होतो',
      },
      {
        en: 'Chhatrapati Shivaji Maharaj\'s patron deity Tulja Bhavani in Osmanabad',
        hi: 'छत्रपति शिवाजी महाराज की कुलस्वामिनी मां तुलजा भवानी',
        mr: 'छत्रपती शिवाजी महाराजांना पाठीशी घालणारी कुलस्वामिनी तुळजाभवानी',
      },
      {
        en: 'Mata Renuka atop the Sahyadri peak at Mahur (birthplace of Dattatreya)',
        hi: 'माहूर गढ पर रेणुका माता पीठ व भगवान दत्तात्रेय जन्मस्थान',
        mr: 'माहूरगडावर वसलेले रेणुका मातेचे पूर्ण पीठ व श्रीदत्त प्रभूंची शयनभूमी',
      },
      {
        en: 'Saptashrungi at Vani perched among 7 mountain horns with 18-armed idol',
        hi: 'सात शिखरों के मध्य स्थित १८ भुजाओं वाली महिषासुरमर्दिनी सप्तशृंगी माता',
        mr: 'सात शिखरांच्या कड्यावर वसलेली १८ हातांची महिषासुरमर्दिनी सप्तशृंगी देवी (अर्धे पीठ)',
      },
    ],
    days: [
      {
        dayNumber: 1,
        title: {
          en: 'Day 1: Karveer Nivasini Shri Mahalakshmi (Kolhapur)',
          hi: 'दिवस १: करवीर निवासिनी श्री महालक्ष्मी अंबाबाई (कोल्हापुर)',
          mr: 'दिवस १: करवीर निवासिनी श्री महालक्ष्मी अंबाबाई (कोल्हापूर)',
        },
        route: {
          en: 'Pune / Mumbai → Satara → Karad → Kolhapur (Halt)',
          hi: 'पुणे / मुंबई → सातारा → कराड → कोल्हापुर (मुक्काम)',
          mr: 'पुणे / मुंबई → सातारा → कराड → कोल्हापूर (मुक्काम)',
        },
        distanceKm: 240,
        travelTimeHours: '4.5 hrs',
        nightHalt: {
          en: 'Kolhapur City',
          hi: 'कोल्हापुर नगर',
          mr: 'कोल्हापूर शहर',
        },
        morning: {
          time: '06:00 AM - 11:30 AM',
          templeName: {
            en: 'Shri Ambabai / Mahalakshmi Temple, Kolhapur',
            hi: 'श्री अंबाबाई / महालक्ष्मी मंदिर, कोल्हापुर',
            mr: 'श्री अंबाबाई / महालक्ष्मी मंदिर, कोल्हापूर',
          },
          activity: {
            en: 'Morning Kakad aarti and darshan of the monolithic gemstone idol crowned with Cobra hood and Shiva Linga on top.',
            hi: 'प्रातः दर्शन, जहां मां के मुकुट पर शिवलिंग सुशोभित है।',
            mr: 'सकाळची काकड आरती व मस्तकावर शिवलिंग धारण केलेल्या स्वयंभू अंबाबाईचे पावन दर्शन.',
          },
          darshanTips: {
            en: 'Wear traditional Indian attire. Buy genuine Kolhapuri saaj garland from authorized stalls.',
            hi: 'पारंपरिक वस्त्र धारण करें। कोल्हापुरी साज अर्पण अत्यंत शुभ माना जाता है।',
            mr: 'पारंपरिक पोषाख परिधान करावा. देवीला अर्पण करण्यासाठी कोल्हापुरी साज व खण-नारळ पूजा.',
          },
        },
        afternoon: {
          time: '01:00 PM - 04:30 PM',
          activity: {
            en: 'Visit Rankala Lake, New Palace museum, and Jyotiba temple (Wadi Ratnagiri) 18 km away.',
            hi: 'रंकाळा तलाव, छत्रपति शाहू न्यू पॅलेस एवं वाडी रत्नागिरी जोतिबा दर्शन।',
            mr: 'रंकाळा तलाव, न्यू पॅलेस संग्रहालय आणि १८ किमीवरील वाडी रत्नागिरीच्या दख्खनचा राजा जोतिबाचे दर्शन.',
          },
          foodRecommendation: {
            en: 'Authentic Kolhapuri tambda & pandhra rassa (veg thali options with solkadhi & jowar bhakri).',
            hi: 'सोलकढी, ज्वारी भाकरी व कोल्हापुरी सात्विक भोजन।',
            mr: 'अस्सल कोल्हापुरी सोलकढी, ज्वारीची भाकरी आणि झणझणीत शाकाहारी ताट.',
          },
        },
        evening: {
          time: '07:30 PM - 09:00 PM',
          activity: {
            en: 'Witness the grand Palakhi procession of Ambabai inside the illuminated stone courtyard on Friday/Navratri.',
            hi: 'भव्य पालखी सोहळा व महाआरती दर्शन।',
            mr: 'मंदिर प्रांगणात होणारा भव्य पालखी सोहळा व मनमोहक संध्या आरती पहा.',
          },
          specialRitual: {
            en: 'Chant Mahalakshmi Ashtakam.',
            hi: 'महालक्ष्म्यष्टकम् स्तोत्र पाठ।',
            mr: 'श्री महालक्ष्मी अष्टकम् पठण.',
          },
        },
      },
      {
        dayNumber: 2,
        title: {
          en: 'Day 2: Tuljapur Bhavani Mata (Dharashiv)',
          hi: 'दिवस २: मां तुलजा भवानी दर्शन (धाराशिव)',
          mr: 'दिवस २: आई तुळजाभवानी दर्शन (धाराशिव/उस्मानाबाद)',
        },
        route: {
          en: 'Kolhapur → Miraj → Pandharpur → Solapur → Tuljapur (Halt)',
          hi: 'कोल्हापुर → पंढरपुर → सोलापुर → तुलजापुर (मुक्काम)',
          mr: 'कोल्हापूर → पंढरपूर → सोलापूर → तुळजापूर (मुक्काम)',
        },
        distanceKm: 310,
        travelTimeHours: '6 hrs',
        nightHalt: {
          en: 'Tuljapur or Solapur',
          hi: 'तुलजापुर अथवा सोलापुर',
          mr: 'तुळजापूर अथवा सोलापूर',
        },
        morning: {
          time: '06:00 AM - 12:00 PM',
          templeName: {
            en: 'Shri Tulja Bhavani Temple, Tuljapur',
            hi: 'श्री तुलजा भवानी मंदिर, तुलजापुर',
            mr: 'श्री तुळजाभवानी मंदिर, तुळजापूर',
          },
          activity: {
            en: 'Descend to the ancient temple courtyard via Ghat Shila. Take darshan of Chhatrapati Shivaji Maharaj\'s Kulswamini wielding 8 weapons.',
            hi: 'घाटशीला मार्ग से मंदिर प्रांगण प्रवेश। अष्टभुजा महिषासुरमर्दिनी मां तुलजा भवानी का दर्शन।',
            mr: 'घाटशिळेवरून मंदिरात प्रवेश. छत्रपती शिवाजी महाराजांना भवानी तलवार देणाऱ्या अष्टभुजा तुळजाभवानीचे दर्शन.',
          },
          darshanTips: {
            en: 'Offer puran-poli or pedhas. Visit Kallol Teerth and Gomukhi Teerth inside the premises.',
            hi: 'कल्लोळ तीर्थ व गोमुखी तीर्थ में दर्शन।',
            mr: 'कल्लोळ तीर्थ व गोमुख तीर्थाचे दर्शन घ्यावे. देवीला पुरणपोळीचा नैवेद्य अर्पण करतात.',
          },
        },
        afternoon: {
          time: '01:00 PM - 04:00 PM',
          activity: {
            en: 'Visit the historic Ghat Shila temple where Lord Rama received blessings while searching for Sita.',
            hi: 'घाटशीला मंदिर दर्शन जहां श्रीराम ने मां भवानी की आराधना की थी।',
            mr: 'प्रभू श्रीरामाने सीता शोधताना विश्रांती घेतलेल्या ऐतिहासिक घाटशिळा मंदिराचे दर्शन.',
          },
          foodRecommendation: {
            en: 'Tuljapur famous kanda-bhaji, puran poli, and Solapuri shenga chutney.',
            hi: 'तुलजापुर पुरणपोळी एवं सोलापुरी शेंगदाणा चटणी।',
            mr: 'तुळजापूरची प्रसिद्ध पुरणपोळी आणि सोलापुरी शेंगदाणा चटणी भाकरी.',
          },
        },
        evening: {
          time: '07:00 PM - 08:30 PM',
          activity: {
            en: 'Attend the divine Chaughada & night Shayan aarti of Bhavani Mata.',
            hi: 'चौघडा वादन एवं रात्रि शयन आरती।',
            mr: 'पारंपरिक संबळ-चौघडा वादनात होणारी रात्रीची शयन आरती अनुभवा.',
          },
          specialRitual: {
            en: 'Sing "Aai Raja Udo Udo" and Bhavani Ashtakam.',
            hi: '"आई राजा उदो उदो" जयघोष एवं भवानी अष्टकम् पाठ।',
            mr: '"आई राजा उदो उदो" जयघोष व भवानी अष्टकाचे पठण.',
          },
        },
      },
      {
        dayNumber: 3,
        title: {
          en: 'Day 3: Mata Renuka on Mahur Gad',
          hi: 'दिवस ३: माहूर गढ रेणुका माता पीठ',
          mr: 'दिवस ३: माहूरगडावरील माता रेणुका पीठ',
        },
        route: {
          en: 'Tuljapur → Latur → Nanded → Kinwat → Mahur (Halt)',
          hi: 'तुलजापुर → लातूर → नांदेड → माहूर (मुक्काम)',
          mr: 'तुळजापूर → लातूर → नांदेड → किनवट → माहूर (मुक्काम)',
        },
        distanceKm: 340,
        travelTimeHours: '6.5 hrs',
        nightHalt: {
          en: 'Mahur Sansthan Bhaktiniwas or Nanded',
          hi: 'माहूर संस्थान भक्तनिवास अथवा नांदेड',
          mr: 'माहूर संस्थान भक्तनिवास अथवा नांदेड',
        },
        morning: {
          time: '06:30 AM - 12:00 PM',
          templeName: {
            en: 'Shri Renuka Mata Temple atop Mahurgad',
            hi: 'श्री रेणुका माता मंदिर, माहूरगढ',
            mr: 'श्री रेणुका माता मंदिर, माहूरगड',
          },
          activity: {
            en: 'Climb the steps of the lush hill fort to behold Mata Renuka\'s natural vermilion rock-face idol (Matrumukh).',
            hi: 'माहूरगढ पहाड़ी पर माता रेणुका के मातृमुख स्वरूप का दर्शन एवं पान-सुपारी अर्पण।',
            mr: 'माहूरगडाच्या निसर्गरम्य टेकडीवर मातेच्या मातृमुखाचे पावन शेंदूरचर्चित दर्शन व विड्याचे पान अर्पण.',
          },
          darshanTips: {
            en: 'Devotees traditionally offer betel leaf (paan) with catechu to Mata Renuka.',
            hi: 'माहूर में माता को विशेष रूप से पान का बीड़ा अर्पण किया जाता है।',
            mr: 'माहूरला देवीला आवर्जून पानाचा विडा अर्पण करण्याची परंपरा आहे.',
          },
        },
        afternoon: {
          time: '01:30 PM - 04:30 PM',
          activity: {
            en: 'Visit Anusaya Mata Temple and Datta Shikhar where Lord Dattatreya comes to sleep every night.',
            hi: 'माता अनसूया मंदिर एवं दत्त शिखर दर्शन जहां श्रीदत्त की निद्रा स्थली है।',
            mr: 'माता अनसूया मंदिर आणि भगवान दत्तात्रेयांची विश्रामभूमी असलेल्या दत्त शिखराचे दर्शन.',
          },
          foodRecommendation: {
            en: 'Mahur Sansthan Prasadalaya mahaprasad (wholesome dal, rice, sweet sheera).',
            hi: 'माहूर संस्थान का शुद्ध महाप्रसाद।',
            mr: 'माहूर संस्थान अन्नछत्रातील शुद्ध व सात्विक महाप्रसाद.',
          },
        },
        evening: {
          time: '06:00 PM - 08:00 PM',
          activity: {
            en: 'Sunset over Sahyadri ranges from Mahur fort ramparts.',
            hi: 'माहूर किले से विहंगम सूर्यास्त दर्शन व ध्यान।',
            mr: 'माहूरगडावरून दिसणारा विहंगम सूर्यास्त व संध्याकाळी नामस्मरण.',
          },
          specialRitual: {
            en: 'Recite Renuka Stotram and Dattatreya Stotra.',
            hi: 'रेणुका स्तोत्र व दत्त प्रभू का ध्यान।',
            mr: 'रेणुका स्तोत्र व श्रीदत्त बावन्नीचे पठण.',
          },
        },
      },
      {
        dayNumber: 4,
        title: {
          en: 'Day 4: Saptashrungi Nivasini (Half Shaktipeeth, Vani)',
          hi: 'दिवस ४: सप्तशृंगी निवासिनी दर्शन (अर्धपीठ, वणी)',
          mr: 'दिवस ४: सप्तशृंगी निवासिनी दर्शन (अर्धे पीठ, वणी-नाशिक)',
        },
        route: {
          en: 'Mahur → Pusad → Washim → Malegaon → Vani / Saptashrungi',
          hi: 'माहूर → वाशिम → मालेगांव → वणी / सप्तशृंगी',
          mr: 'माहूर → वाशीम → मालेगाव → वणी / सप्तशृंगी गड',
        },
        distanceKm: 390,
        travelTimeHours: '7 hrs',
        nightHalt: {
          en: 'Saptashrungi Gad or Nashik City',
          hi: 'सप्तशृंगी गड अथवा नाशिक नगर',
          mr: 'सप्तशृंगी गड अथवा नाशिक शहर',
        },
        morning: {
          time: '07:00 AM - 12:30 PM',
          templeName: {
            en: 'Shri Saptashrungi Devi Temple (500 steps or Funicular Trolley)',
            hi: 'श्री सप्तशृंगी देवी मंदिर, वणी (फ्यूनिक्युलर ट्रॉली अथवा ५०० सीढ़ियां)',
            mr: 'श्री सप्तशृंगी देवी मंदिर, वणी (रोपवे / फ्युनिक्युलर ट्रॉली किंवा ५०० पायऱ्या)',
          },
          activity: {
            en: 'Ascend to the breathtaking cliff cave. Behold the monumental 8-foot tall idol with 18 hands holding divine weapons.',
            hi: 'ऊंचे पर्वत कगार पर १८ भुजाओं वाली महिषासुरमर्दिनी मां सप्तशृंगी का भव्य ८ फुट विग्रह दर्शन।',
            mr: 'कड्यावर वसलेल्या मंदिरात १८ हातांमध्ये शस्त्रे धारण केलेल्या ८ फूट उंच भव्य स्वयंभू महिषासुरमर्दिनीचे दर्शन.',
          },
          darshanTips: {
            en: 'A modern Funicular Ropeway Trolley is available for elderly and children to avoid 500 steep steps.',
            hi: 'वरिष्ठ नागरिकों हेतु अत्याधुनिक फ्यूनिक्युलर ट्रॉली उपलब्ध है।',
            mr: 'वृद्ध व लहान मुलांसाठी आधुनिक फ्युनिक्युलर ट्रॉली (केबल कार) सोय उपलब्ध आहे.',
          },
        },
        afternoon: {
          time: '01:30 PM - 04:00 PM',
          activity: {
            en: 'Visit the Markandeya Rishi hill opposite Saptashrungi where the sage composed Durga Saptashati.',
            hi: 'मार्कण्डेय ऋषि पहाड़ी दर्शन जहां दुर्गा सप्तशती की रचना हुई थी।',
            mr: 'समोरील मार्कंडेय ऋषींच्या टेकडीचे दर्शन, जिथे दुर्गा सप्तशती रचली गेली.',
          },
          foodRecommendation: {
            en: 'Nashik-style jowar bhakri, sev bhaji, and Sansthan mahaprasad.',
            hi: 'नाशिक शेव भाजी, भाकरी एवं संस्थान महाप्रसाद।',
            mr: 'स्थानिक शेवभाजी, भाकरी आणि सप्तशृंगी संस्थानचा महाप्रसाद.',
          },
        },
        evening: {
          time: '06:00 PM onwards',
          activity: {
            en: 'Conclude the 3.5 Shaktipeeth Mahayatra with Devi Aarti and drive to Nashik / Pune / Mumbai.',
            hi: 'साडेतीन शक्तिपीठ यात्रा की संपूर्णता के साथ मंगल वापसी।',
            mr: 'साडेतीन शक्तिपीठ महायात्रेची सांगता करून सुखद परतीचा प्रवास.',
          },
          specialRitual: {
            en: 'Chant Durga Suktam and Mahishasuramardini Stotram.',
            hi: 'महिषासुरमर्दिनी स्तोत्र पाठ।',
            mr: 'अयि गिरिनंदिनी (महिषासुरमर्दिनी स्तोत्र) चे सामूहिक गायन.',
          },
        },
      },
    ],
    travelTips: [
      {
        en: 'The 3.5 Shaktipeeth circuit spans four corners of Maharashtra (Kolhapur in South, Tuljapur in Marathwada, Mahur in Vidarbha border, Saptashrungi in North). Plan at least 4 full days.',
        hi: 'यह यात्रा सम्पूर्ण महाराष्ट्र में फैली है; कम से कम ४ से ५ दिन का समय अवश्य रखें।',
        mr: 'साडेतीन शक्तिपीठे महाराष्ट्राच्या चारही दिशांत (दक्षिण, मराठवाडा, विदर्भ सीमा व उत्तर) असल्याने किमान ४ ते ५ दिवस नियोजन करा.',
      },
      {
        en: 'Funicular trolley at Saptashrungi saves immense time and effort for families.',
        hi: 'सप्तशृंगी पर फ्यूनिक्युलर ट्रॉली से समय एवं श्रम दोनों की बचत होती है।',
        mr: 'सप्तशृंगी येथे ट्रॉली वापरल्यास वेळ आणि ५०० पायऱ्यांचा श्रम वाचतो.',
      },
    ],
    googleMapsRouteUrl: 'https://www.google.com/maps/dir/Kolhapur/Tuljapur/Mahur/Saptashrungi+Temple',
  },
];

import { MultilingualText } from '../types';

export interface WeekdayPujaInfo {
  dayIndex: number; // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  id: string;
  dayName: MultilingualText;
  canonicalSummary: MultilingualText;
  shortDeities: MultilingualText;
  rulingPlanet: {
    name: MultilingualText;
    symbol: string;
    graha: string;
  };
  deities: {
    primary: MultilingualText;
    associated: MultilingualText[];
    deityId?: string; // links to 50 deities or core deity
  };
  holyColor: {
    name: MultilingualText;
    hex: string;
    colorClass: string;
  };
  sacredOfferings: MultilingualText[];
  mantraPractice: {
    title: MultilingualText;
    devanagari: string;
    roman: string;
    meaning: MultilingualText;
  };
  fastingAndDiet: MultilingualText;
  significance: MultilingualText;
  benefits: MultilingualText;
  icon: string;
}

export const weekdayPujaGuideData: WeekdayPujaInfo[] = [
  {
    dayIndex: 0,
    id: 'sunday-surya-khandoba',
    dayName: {
      en: 'Sunday (Raviwar)',
      hi: 'रविवार (Sunday)',
      mr: 'रविवार (Sunday)',
    },
    canonicalSummary: {
      en: 'Lord Surya and Khandoba. On this day, water Arghya is offered to the Sun and Mallari Martanda (Khandoba) is worshipped with turmeric.',
      hi: 'सूर्यदेव एवं खंडोबा। इस दिन भगवान सूर्य को अर्घ्य दिया जाता है और मल्हारी मार्तंड (खंडोबा) की भक्ति की जाती है।',
      mr: 'सूर्यदेव आणि खंडोबा. या दिवशी सूर्याला अर्घ्य दिले जाते आणि मल्हारी मार्तंडाची (खंडोबा) भक्ती केली जाते.',
    },
    shortDeities: {
      en: 'Surya & Khandoba',
      hi: 'सूर्यदेव आणि खंडोबा',
      mr: 'सूर्यदेव आणि खंडोबा',
    },
    rulingPlanet: {
      name: { en: 'Sun (Surya)', hi: 'भगवान सूर्य (रवि)', mr: 'सूर्यनारायण (रवि)' },
      symbol: '☀️',
      graha: 'Surya Graha',
    },
    deities: {
      primary: {
        en: 'Lord Surya and Lord Khandoba',
        hi: 'सूर्यदेव एवं खंडोबा',
        mr: 'सूर्यदेव आणि खंडोबा',
      },
      associated: [
        { en: 'Lord Khandoba (Jejuri)', hi: 'मार्तंड भैरव (खंडोबा)', mr: 'जेजुरीचे खंडेराया (मल्हारी मार्तंड)' },
        { en: 'Gayatri Mata', hi: 'गायत्री माता', mr: 'गायत्री माता' },
      ],
      deityId: 'surya',
    },
    holyColor: {
      name: { en: 'Red, Copper, Saffron', hi: 'लाल, तांबिया, केसरिया', mr: 'लाल, भगवा, तांबूस' },
      hex: '#EA580C',
      colorClass: 'from-orange-600 to-amber-600',
    },
    sacredOfferings: [
      { en: 'Arghya (pure water in a copper vessel) at sunrise', hi: 'प्रातः सूर्योदय समय तांबे के लोटे से जल अर्घ्य', mr: 'सूर्योदयावेळी तांब्याच्या पात्रातून सूर्याला जल अर्घ्य' },
      { en: 'Red flowers (hibiscus, rose), red sandalwood (rakta-chandana)', hi: 'लाल कनेर/गुड़हल पुष्प एवं लाल चन्दन तिलक', mr: 'तांबडी जास्वंद, लाल फुले आणि रक्तचंदन' },
      { en: 'Jaggery, wheat preparations, and Bhandara (turmeric for Khandoba)', hi: 'गुड़, गेहूं का हलवा एवं खंडोबा भंडारा (हल्दी)', mr: 'गूळ-गव्हाचा नैवेद्य आणि खंडेरायाचा भंडारा (हळद)' },
    ],
    mantraPractice: {
      title: { en: 'Surya Gayatri & Aditya Hridayam', hi: 'सूर्य गायत्री एवं आदित्य हृदय', mr: 'सूर्य गायत्री व खंडेराया बीजमंत्र' },
      devanagari: 'ॐ आदित्याय विद्महे प्रभाकराय धीमहि। तन्नो सूर्यः प्रचोदयात्॥ येळकोट येळकोट जय मल्हार!',
      roman: 'Om Aadityaaya Vidmahe Prabhaakaraaya Dheemahi, Tanno Sooryah Prachodayaat. Yelkot Yelkot Jai Malhar!',
      meaning: {
        en: 'May the radiant Sun God illuminate our intellect, grant vibrant health, vitality, and dispels all darkness; Hail Lord Khandoba!',
        hi: 'भगवान सूर्य हमारी बुद्धि को प्रखर करें, तेज व आरोग्य दें; मल्हारी मार्तंड खंडेराया की जय हो।',
        mr: 'तेजस्वी सूर्यनारायण आमच्या बुद्धीला सन्मार्ग दाखवो, उत्तम आरोग्य व तेज देवो; मल्हारी मार्तंड खंडेरायाचा अखंड जयजयकार असो.',
      },
    },
    fastingAndDiet: {
      en: 'Observe a single meal before sunset without salt and oil. Avoid heavy food.',
      hi: 'सूर्यास्त से पूर्व एक समय नमक एवं तेल रहित भोजन करें। सात्विक आहार लें।',
      mr: 'सूर्यास्तापूर्वी अळणी (मीठ व तेल नसलेले) सात्विक एकवेळ जेवण करावे.',
    },
    significance: {
      en: 'Sunday worship activates the solar energy within the body, boosting leadership, eye health, bone strength, and grants Khandoba\'s family protection.',
      hi: 'रविवार सूर्य व खंडोबा उपासना से तेज, नेत्र ज्योति, आत्मबल एवं कुल की रक्षा होती है।',
      mr: 'या दिवशी सूर्याला अर्घ्य दिले जाते आणि मल्हारी मार्तंडाची (खंडोबा) भक्ती केली जाते. यामुळे तेज, आरोग्य व कुलसंरक्षण लाभते.',
    },
    benefits: {
      en: 'Vitality, leadership radiance, relief from chronic illnesses, and Khandoba blessings.',
      hi: 'आरोग्य, ओज, तेज, पितृदोष निवारण एवं कुलदेवता कृपा।',
      mr: 'उत्तम आरोग्य, तेज, आत्मबळ, पितृदोष निवारण व खंडेरायाची कृपा.',
    },
    icon: '☀️',
  },
  {
    dayIndex: 1,
    id: 'monday-shiva',
    dayName: {
      en: 'Monday (Somwar)',
      hi: 'सोमवार (Monday)',
      mr: 'सोमवार (Monday)',
    },
    canonicalSummary: {
      en: 'Lord Shiva (Mahadeva). This day is exceptionally sacred for Shiva worship, offering fresh Bilva (bael) leaves and raw milk.',
      hi: 'भगवान शिव (महादेव)। यह दिन शंकर जी की उपासना हेतु अत्यंत पवित्र माना जाता है। इस दिन महादेव को बेलपत्र अर्पित किया जाता है।',
      mr: 'भगवान शिव (महादेव). हा वार शंकराची उपासना करण्यासाठी अत्यंत पवित्र मानला जातो. या दिवशी महादेवाला बेल वाहिली जाते.',
    },
    shortDeities: {
      en: 'Lord Shiva (Mahadeva)',
      hi: 'भगवान शिव (महादेव)',
      mr: 'भगवान शिव (महादेव)',
    },
    rulingPlanet: {
      name: { en: 'Moon (Chandra)', hi: 'चन्द्र देव', mr: 'चंद्र देव' },
      symbol: '🌙',
      graha: 'Chandra Graha',
    },
    deities: {
      primary: {
        en: 'Lord Shiva (Mahadeva)',
        hi: 'भगवान शिव (महादेव)',
        mr: 'भगवान शिव (महादेव)',
      },
      associated: [
        { en: 'Goddess Parvati', hi: 'माता पार्वती', mr: 'माता पार्वती' },
        { en: 'Chandra Dev (Moon)', hi: 'चंद्र देव', mr: 'चंद्र देव' },
        { en: '12 Jyotirlingas', hi: 'द्वादश ज्योतिर्लिंग', mr: '१२ ज्योतिर्लिंगे' },
      ],
      deityId: 'shiva',
    },
    holyColor: {
      name: { en: 'Pure White, Silver, Milk White', hi: 'श्वेत, चांदी, दूधिया', mr: 'शुभ्र पांढरा, रुपेरी' },
      hex: '#F8FAFC',
      colorClass: 'from-slate-200 to-sky-300 text-stone-900',
    },
    sacredOfferings: [
      { en: 'Abhishek of cold pure water, raw cow milk, and honey on Shivling', hi: 'शिवलिंग पर शीतल जल, कच्चा दूध, शहद व पंचामृत अभिषेक', mr: 'शिवलिंगावर शीतल जल, गाईचे कच्चे दूध, मध व पंचामृताचा अभिषेक' },
      { en: 'Fresh Bilva (Bael) leaves offered with "Om Namah Shivaya"', hi: 'अखंड तीन पत्तों वाला बिल्वपत्र ॐ नमः शिवाय बोलकर अर्पण', mr: 'त्रिदल अखंड बेलपत्र "ॐ नमः शिवाय" म्हणून उलटे अर्पण करणे' },
      { en: 'White flowers (Dhatura, Jasmine, Lotus), Bhasma (sacred ash)', hi: 'धतूरा, श्वेत मदार पुष्प, भस्म एवं सफेद चंदन', mr: 'धोत्रा, पांढरी फुले, विभूती/भस्म व पांढरे चंदन' },
    ],
    mantraPractice: {
      title: { en: 'Maha Mrityunjaya & Shiva Panchakshara', hi: 'महामृत्युंजय एवं पंचाक्षर मन्त्र', mr: 'महामृत्युंजय व शिवाष्टक मंत्र' },
      devanagari: 'ॐ नमः शिवाय। ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
      roman: 'Om Namah Shivaaya. Om Tryambakam Yajaamahe Sugandhim Pushtivardhanam, Urvaarukamiva Bandhanaan Mrityor Muksheeya Maamritaat.',
      meaning: {
        en: 'I bow to Lord Shiva. We worship the Three-Eyed One who nourishes all beings. May He liberate us from death into immortality.',
        hi: 'हम त्रिनेत्रधारी शिव की आराधना करते हैं जो सबका पोषण करते हैं। वे हमें मृत्यु एवं भय से मुक्त कर अमरत्व प्रदान करें।',
        mr: 'आम्ही त्रिनेत्रधारी महादेवाची आराधना करतो. ते सर्वांचे पोषण करतात व अकाली मृत्यू, भय आणि रोगांपासून मुक्ती देतात.',
      },
    },
    fastingAndDiet: {
      en: 'Fasting from morning until twilight. Consume fruits, milk, curd, or Sabudana in the evening.',
      hi: 'सायंकाल तक उपवास रखें। रात्रि में फलाहार, दूध, पंचामृत अथवा सात्विक आहार लें।',
      mr: 'संध्याकाळपर्यंत उपवास ठेवावा. रात्री फलाहार, दूध किंवा साबुदाणा सात्विक आहार घ्यावा.',
    },
    significance: {
      en: 'Monday Shiva worship calms the restless mind, cures anxiety, removes negative planetary moon effects, and grants marital bliss.',
      hi: 'सोमवार शिव पूजन से मन को स्थिरता मिलती है, तनाव मिटता है और महादेव की परम कृपा प्राप्त होती है।',
      mr: 'हा वार शंकराची उपासना करण्यासाठी अत्यंत पवित्र मानला जातो. या दिवशी महादेवाला बेल वाहिली जाते.',
    },
    benefits: {
      en: 'Mental peace, healing from anxiety, longevity, and happy family life.',
      hi: 'मानसिक शांति, तनाव मुक्ति, उत्तम स्वास्थ्य एवं अकाल मृत्यु से रक्षा।',
      mr: 'मानसिक शांती, रोगांपासून मुक्ती, दीर्घायुष्य व सुखी संसार.',
    },
    icon: '🕉️',
  },
  {
    dayIndex: 2,
    id: 'tuesday-ganesha-hanuman-durga',
    dayName: {
      en: 'Tuesday (Mangalwar)',
      hi: 'मंगळवार (Tuesday)',
      mr: 'मंगळवार (Tuesday)',
    },
    canonicalSummary: {
      en: 'Lord Ganesha, Lord Hanuman, and Goddess Durga. Newly married women observe Mangalagauri puja on this day.',
      hi: 'श्री गणपति, हनुमान एवं देवी दुर्गा। तथा नवविवाहित महिलाएं इस दिन मंगलागौरी की पूजा करती हैं।',
      mr: 'श्री गणपती, हनुमान आणि देवी दुर्गा. तसेच नवविवाहित महिला या दिवशी मंगळागौरीची पूजा करतात.',
    },
    shortDeities: {
      en: 'Ganesha, Hanuman & Durga',
      hi: 'श्री गणपती, हनुमान व दुर्गा',
      mr: 'श्री गणपती, हनुमान आणि देवी दुर्गा',
    },
    rulingPlanet: {
      name: { en: 'Mars (Mangala)', hi: 'मंगल देव', mr: 'मंगळ ग्रह' },
      symbol: '🔴',
      graha: 'Mangala Graha',
    },
    deities: {
      primary: {
        en: 'Lord Ganesha, Lord Hanuman and Goddess Durga',
        hi: 'श्री गणपति, हनुमान एवं देवी दुर्गा',
        mr: 'श्री गणपती, हनुमान आणि देवी दुर्गा',
      },
      associated: [
        { en: 'Goddess Mangalagauri', hi: 'माता मंगलागौरी', mr: 'माता मंगळागौरी (नववधूंसाठी)' },
        { en: 'Goddess Tulja Bhavani', hi: 'माता भवानी', mr: 'आई तुळजाभवानी व नवदुर्गा' },
      ],
      deityId: 'hanuman',
    },
    holyColor: {
      name: { en: 'Deep Red, Sindoor Orange', hi: 'गहरा लाल, सिंदूरी नारंगी', mr: 'तांबडा लाल, शेंदरी नारंगी' },
      hex: '#DC2626',
      colorClass: 'from-red-600 to-rose-700',
    },
    sacredOfferings: [
      { en: 'Sindoor (sacred vermilion) and sesame/mustard oil to Hanuman', hi: 'हनुमान जी को सिंदूर एवं चमेली/तिल का तेल अर्पण', mr: 'मारुतीरायाला शेंदूर व तिळाच्या तेलाचा लेप' },
      { en: '21 Durva grass shoots and Modaks for Lord Ganesha', hi: 'श्री गणेश जी को २१ दूर्वा एवं मोदक का भोग', mr: 'श्री गणेशाला २१ दुर्वांची जुडी आणि मोदकांचा नैवेद्य' },
      { en: 'Garland of Akra (Calotropis/Rui) leaves for Hanuman; red flowers for Durga', hi: 'आकड़े के पत्तों की माला एवं लाल गुड़हल पुष्प', mr: 'रुईच्या पानांची माळ, तांबडे जास्वंद व मंगळागौरीची १६ पत्री' },
    ],
    mantraPractice: {
      title: { en: 'Ganesha & Hanuman Chalisa', hi: 'गणेश स्तोत्र एवं हनुमान चालीसा', mr: 'गणेश स्तोत्र व मारुती स्तोत्र' },
      devanagari: 'ॐ गं गणपतये नमः। ॐ हं हनुमते रुद्रात्मकाय हुं फट्। ॐ दुं दुर्गायै नमः॥',
      roman: 'Om Gam Ganapataye Namah. Om Ham Hanumate Rudraatmakaaya Hum Phat. Om Dum Durgaayai Namah.',
      meaning: {
        en: 'Salutations to auspicious Ganesha, fearsome defender Hanuman, and supreme Mother Durga who removes all danger.',
        hi: 'विघ्नहर्ता गणेश, संकटमोचक हनुमान और दुष्टनाशिनी मां दुर्गा को बारंबार नमन।',
        mr: 'विघ्नहर्ता गणेश, संकटमोचन मारुतीराया आणि संकटनाशिनी आई दुर्गेला कोटी कोटी वंदन.',
      },
    },
    fastingAndDiet: {
      en: 'Fasting until sunset. Take sweet food (fruits, halwa). Mangalagauri fasting for married women.',
      hi: 'सूर्यास्त तक व्रत रखें। शाम को मीठा फलाहार लें। नवविवाहित महिलाएं मंगलागौरी व्रत करें।',
      mr: 'सूर्यास्तापर्यंत उपवास ठेवावा. संध्याकाळी गोड फलाहार करावा. नवविवाहित महिला मंगळागौरीचे व्रत करतात.',
    },
    significance: {
      en: 'Lord Ganesha removes hurdles, Hanuman shields from fear and Mars affliction, and Durga grants strength and marital prosperity through Mangalagauri.',
      hi: 'मंगलवार व्रत से मांगलिक दोष शांत होता है, कर्ज मुक्ति मिलती है और अखंड सौभाग्य प्राप्त होता है।',
      mr: 'श्री गणपती, हनुमान आणि देवी दुर्गा. तसेच नवविवाहित महिला या दिवशी मंगळागौरीची पूजा करतात.',
    },
    benefits: {
      en: 'Courage, victory over obstacles, debt clearance, and Mangal Dosha relief.',
      hi: 'साहस, कर्ज मुक्ति, अखंड सौभाग्य एवं शत्रुओं पर विजय।',
      mr: 'धैर्य, कर्जमुक्ती, संकटांवर विजय, अखंड सौभाग्य व मंगळ दोष शांती.',
    },
    icon: '🚩',
  },
  {
    dayIndex: 3,
    id: 'wednesday-vitthal-budh',
    dayName: {
      en: 'Wednesday (Budhwar)',
      hi: 'बुधवार (Wednesday)',
      mr: 'बुधवार (Wednesday)',
    },
    canonicalSummary: {
      en: 'Lord Vitthal and planet Mercury (Budha). This day is dedicated to Lord Vitthal, the sacred embodiment of Lord Vishnu.',
      hi: 'विठ्ठल एवं बुध ग्रह। यह वार भगवान विष्णु के रूप विठूमाऊली (विट्ठल) को समर्पित है।',
      mr: 'विठ्ठल आणि बुध ग्रह. हा वार भगवान विष्णूंचे रूप असलेल्या विठुरायाला समर्पित आहे.',
    },
    shortDeities: {
      en: 'Vitthal & Mercury (Budha)',
      hi: 'विठ्ठल आणि बुध ग्रह',
      mr: 'विठ्ठल आणि बुध ग्रह',
    },
    rulingPlanet: {
      name: { en: 'Mercury (Budha)', hi: 'बुध देव', mr: 'बुध ग्रह' },
      symbol: '💚',
      graha: 'Budha Graha',
    },
    deities: {
      primary: {
        en: 'Lord Vitthal and planet Mercury (Budha)',
        hi: 'विठ्ठल एवं बुध ग्रह',
        mr: 'विठ्ठल आणि बुध ग्रह',
      },
      associated: [
        { en: 'Lord Krishna / Panduranga', hi: 'पांडुरंग श्रीहरि', mr: 'पांडुरंग रखुमाई' },
        { en: 'Lord Ganesha', hi: 'श्री गणेश', mr: 'श्री गणेश' },
      ],
      deityId: 'vitthal',
    },
    holyColor: {
      name: { en: 'Emerald Green, Parrot Green', hi: 'हरा, तोतिया हरा', mr: 'हिरवा, पोपटपंची' },
      hex: '#16A34A',
      colorClass: 'from-emerald-600 to-green-700',
    },
    sacredOfferings: [
      { en: 'Fresh Tulsi leaves and holy garland for Lord Vitthal', hi: 'भगवान विट्ठल-कृष्ण को तुलसी दल एवं मंजरी', mr: 'विठुरायाला तुळशीची मंजिरी, तुळशीहार व पेढे' },
      { en: 'Green whole Moong dal and jaggery', hi: 'साबुत हरी मूंग की दाल एवं गुड़ का भोग', mr: 'हिरवे अख्खे मूग आणि गूळ' },
      { en: 'Fresh green Durva grass and Modaks for Lord Ganesha', hi: 'श्री गणेश को २१ दूर्वा एवं मोदक', mr: 'श्री गणेशाला २१ कोवळ्या दुर्वा व मोदक' },
    ],
    mantraPractice: {
      title: { en: 'Vitthal Gajar & Budha Gayatri', hi: 'विट्ठल गजर एवं बुध गायत्री', mr: 'विठ्ठल गजर व बुध मंत्र' },
      devanagari: 'राम कृष्ण हरी, जय जय राम कृष्ण हरी। ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
      roman: 'Ram Krishna Hari, Jai Jai Ram Krishna Hari. Om Braam Breem Broum Sah Budhaaya Namah.',
      meaning: {
        en: 'Hail Supreme Lord Vitthal, Rama, and Krishna; Salutations to Mercury for sharp intelligence and auspicious speech.',
        hi: 'परमब्रह्म विट्ठल, राम व कृष्ण का अखंड गजर तथा बुद्धिदाता बुध देव को नमन।',
        mr: 'परब्रह्म पांडुरंग, श्रीराम व श्रीकृष्णाचा अखंड गजर आणि बुद्धीदाता बुध ग्रहाला वंदन.',
      },
    },
    fastingAndDiet: {
      en: 'Fasting with green-themed fruits and meals. Moong dal khichdi or fruit diet.',
      hi: 'हरे मूंग, फल अथवा सात्विक आहार लें। वाणी में मधुरता रखें।',
      mr: 'हिरवे मूग, फळे अथवा सात्विक खिचडी घ्यावी. वाणीत नम्रता व गोडवा ठेवावा.',
    },
    significance: {
      en: 'Lord Vitthal is the beloved soul of Maharashtra. Wednesday worship sharpens memory, business acumen, and showers the motherly grace of Vithoba.',
      hi: 'यह वार भगवान विष्णु के रूप विठूमाऊली को समर्पित है। इससे बुद्धि, वाणी और व्यापार में सफलता मिलती है।',
      mr: 'विठ्ठल आणि बुध ग्रह. हा वार भगवान विष्णूंचे रूप असलेल्या विठुरायाला समर्पित आहे.',
    },
    benefits: {
      en: 'Intellect, eloquence in speech, business growth, and spiritual devotion.',
      hi: 'विद्या, बुद्धि, व्यापार में लाभ एवं विट्ठल कृपा।',
      mr: 'विद्या, बुद्धिमत्ता, व्यापारात भरभराट व विठू माऊलींची वात्सल्यमयी कृपा.',
    },
    icon: '🪷',
  },
  {
    dayIndex: 4,
    id: 'thursday-dattatreya-vishnu',
    dayName: {
      en: 'Thursday (Guruwar)',
      hi: 'गुरुवार (Thursday)',
      mr: 'गुरुवार (Thursday)',
    },
    canonicalSummary: {
      en: 'Lord Dattatreya and Lord Vishnu. Reading of holy Guru Charitra and devoted worship of Swami Samarth or Sai Baba is performed.',
      hi: 'दत्तगुरु एवं भगवान विष्णु। इस दिन गुरुचरित्र का पठन और स्वामी समर्थ या साईं बाबा की उपासना की जाती है।',
      mr: 'दत्तगुरू आणि भगवान विष्णू. या दिवशी गुरुचरित्राचे वाचन आणि स्वामी समर्थ किंवा साईबाबांची उपासना केली जाते.',
    },
    shortDeities: {
      en: 'Dattatreya & Lord Vishnu',
      hi: 'दत्तगुरू आणि भगवान विष्णू',
      mr: 'दत्तगुरू आणि भगवान विष्णू',
    },
    rulingPlanet: {
      name: { en: 'Jupiter (Brihaspati / Guru)', hi: 'गुरु बृहस्पति', mr: 'बृहस्पति (गुरु ग्रह)' },
      symbol: '🟡',
      graha: 'Guru Graha',
    },
    deities: {
      primary: {
        en: 'Lord Dattatreya and Lord Vishnu',
        hi: 'दत्तगुरु एवं भगवान विष्णु',
        mr: 'दत्तगुरू आणि भगवान विष्णू',
      },
      associated: [
        { en: 'Shri Swami Samarth (Akkalkot)', hi: 'श्री स्वामी समर्थ महाराज', mr: 'श्री स्वामी समर्थ महाराज (अक्कलकोट)' },
        { en: 'Shirdi Saibaba & Gajanan Maharaj', hi: 'साईं बाबा एवं गजानन महाराज', mr: 'शिर्डी साईबाबा व शेगावचे गजानन महाराज' },
      ],
      deityId: 'dattatreya',
    },
    holyColor: {
      name: { en: 'Bright Yellow, Saffron Gold', hi: 'पीला, स्वर्णिम केसरिया', mr: 'पिवळा, सोनेरी भगवा' },
      hex: '#EAB308',
      colorClass: 'from-amber-400 to-yellow-500 text-stone-900',
    },
    sacredOfferings: [
      { en: 'Chana dal (split Bengal gram) with jaggery or pure cow ghee', hi: 'चने की दाल एवं गुड़ का भोग', mr: 'हरभऱ्याची भिजवलेली डाळ व गूळ' },
      { en: 'Yellow flowers (marigold, yellow lotus), bananas, and turmeric', hi: 'पीले पुष्प (गेंदा), केले एवं हल्दी', mr: 'झेंडूची पिवळी फुले, पिकलेली केळी व हळद' },
      { en: 'Lighting pure cow ghee lamp under Audumbar or Tulsi tree', hi: 'औदुंबर अथवा तुलसी के समीप गाय के शुद्ध घी का दीपक', mr: 'औदुंबराखाली किंवा तुळशीपुढे गाईच्या साजूक तुपाचा दिवा' },
    ],
    mantraPractice: {
      title: { en: 'Vishnu & Swami Samarth Naam', hi: 'विष्णु मंत्र एवं स्वामी समर्थ गजर', mr: 'गुरु मंत्र व स्वामी समर्थ जप' },
      devanagari: 'ॐ नमो भगवते वासुदेवाय। श्री स्वामी समर्थ जय जय स्वामी समर्थ॥ दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा॥',
      roman: 'Om Namo Bhagavate Vaasudevaaya. Shri Swami Samarth Jai Jai Swami Samarth. Digambaraa Digambaraa Shreepaada Vallabha Digambaraa.',
      meaning: {
        en: 'Salutations to Lord Vasudeva; victory to Sadguru Swami Samarth; "Fear not, I am always behind you!"',
        hi: 'भगवान वासुदेव को नमन तथा सद्गुरु स्वामी समर्थ का स्मरण जो कहते हैं "डरो मत, मैं सदैव तुम्हारे साथ हूँ।"',
        mr: 'भगवान विष्णूंना नमन आणि "भिऊ नकोस मी तुझ्या पाठीशी आहे" अशी ग्वाही देणाऱ्या स्वामी समर्थांचा जयघोष.',
      },
    },
    fastingAndDiet: {
      en: 'Fasting with yellow-colored satvik food (khichdi with turmeric, besan sweets, milk). Do not consume salt or sour foods.',
      hi: 'पीले फल, चने की दाल से बनी सामग्री का सात्विक आहार लें। नमक एवं खट्टे पदार्थों का त्याग करें।',
      mr: 'पिवळ्या रंगाचे सात्विक अन्न, डाळीचे पदार्थ किंवा केळी घ्यावी. मीठ व आंबट पदार्थ वर्ज्य करावे.',
    },
    significance: {
      en: 'Thursday connects you with Divine Guru guidance, fulfills auspicious marriages, removes spiritual obstacles, and blesses with prosperity.',
      hi: 'इस दिन गुरुचरित्र का पठन और स्वामी समर्थ या साईं बाबा की उपासना की जाती है।',
      mr: 'दत्तगुरू आणि भगवान विष्णू. या दिवशी गुरुचरित्राचे वाचन आणि स्वामी समर्थ किंवा साईबाबांची उपासना केली जाते.',
    },
    benefits: {
      en: 'Guru blessings, prosperous marriage, spiritual wisdom, and good fortune.',
      hi: 'गुरु कृपा, विवाह योग, ज्ञान, समृद्धि एवं उच्च भाग्य।',
      mr: 'गुरुमंत्र प्राप्ती, विवाह कार्य सिद्धी, आध्यात्मिक ज्ञान व समृद्धी.',
    },
    icon: '🌸',
  },
  {
    dayIndex: 5,
    id: 'friday-mahalakshmi-ambabai',
    dayName: {
      en: 'Friday (Shukrawar)',
      hi: 'शुक्रवार (Friday)',
      mr: 'शुक्रवार (Friday)',
    },
    canonicalSummary: {
      en: 'Goddess Mahalakshmi and Devi Ambabai. Known for all Goddess (Shakti) worship and the sacred Vaibhav Lakshmi Vrat.',
      hi: 'महालक्ष्मी एवं देवी अंबाबाई। यह वार सर्व देवियों (शक्ति) की पूजा और वैभव लक्ष्मी व्रत हेतु जाना जाता है।',
      mr: 'महालक्ष्मी आणि देवी अंबाबाई. हा वार सर्व देवींच्या (शक्ती) पूजेसाठी आणि वैभव लक्ष्मी व्रतासाठी ओळखला जातो.',
    },
    shortDeities: {
      en: 'Mahalakshmi & Devi Ambabai',
      hi: 'महालक्ष्मी आणि देवी अंबाबाई',
      mr: 'महालक्ष्मी आणि देवी अंबाबाई',
    },
    rulingPlanet: {
      name: { en: 'Venus (Shukra)', hi: 'शुक्र देव', mr: 'शुक्र ग्रह' },
      symbol: '🤍',
      graha: 'Shukra Graha',
    },
    deities: {
      primary: {
        en: 'Goddess Mahalakshmi and Devi Ambabai',
        hi: 'महालक्ष्मी एवं देवी अंबाबाई',
        mr: 'महालक्ष्मी आणि देवी अंबाबाई',
      },
      associated: [
        { en: 'Kolhapur Ambabai (Mahalakshmi)', hi: 'कोल्हापुर महालक्ष्मी', mr: 'करवीर निवासिनी श्री अंबाबाई (कोल्हापूर)' },
        { en: 'Tulja Bhavani & Renuka Mata', hi: 'तुळजाभवानी व रेणुका माता', mr: 'तुळजापूरची भवानी व माहूरची रेणुका' },
      ],
      deityId: 'mahalakshmi',
    },
    holyColor: {
      name: { en: 'Silver White, Rose Pink, Bright Red', hi: 'गुलाबी, श्वेत, लाल', mr: 'गुलाबी, शुभ्र पांढरा, लाल' },
      hex: '#EC4899',
      colorClass: 'from-pink-500 to-rose-600',
    },
    sacredOfferings: [
      { en: 'White or pink fragrant lotus, rose, jasmine flowers', hi: 'कमल, गुलाब, मोगरा पुष्प एवं सुगंधित इत्र', mr: 'कमळ, गुलाब, मोगऱ्याची फुले आणि सुगंधी अत्तर' },
      { en: 'Kheer (sweet rice pudding), milk sweets, coconut', hi: 'चावल की खीर, मिश्री, मखाने एवं नारियल', mr: 'तांदळाची गोड खीर, खडीसाखर, पेढे आणि नारळ' },
      { en: 'Oti offering (blouse piece, coconut, betel leaf, supari, kumkum)', hi: 'मां को खण-नारियल से ओटी भरना एवं कुमकुम अर्पण', mr: 'आई जगदंबेची खण-नारळाने ओटी भरणे व कुंकुमार्चन' },
    ],
    mantraPractice: {
      title: { en: 'Mahalakshmi Ashtakam & Shri Suktam', hi: 'महालक्ष्मी अष्टकम् एवं श्री सूक्त', mr: 'महालक्ष्मी अष्टक व कनकधारा स्तोत्र' },
      devanagari: 'ॐ श्रीं ह्रीं क्लीं श्रीं सिद्धलक्ष्म्यै नमः। नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते॥',
      roman: 'Om Shreem Hreem Kleem Shreem Siddhalakshmyai Namah. Namastestu Mahaamaaye Shreepeethe Surapoojite.',
      meaning: {
        en: 'Salutations to Great Mother Mahalakshmi, the giver of auspicious wealth and happiness, worshipped by celestial beings.',
        hi: 'समस्त देवों द्वारा पूजित, सौभाग्य एवं ऐश्वर्य प्रदाता माता महालक्ष्मी को कोटि-कोटि वंदन।',
        mr: 'सर्व देवांनी वंदिलेल्या, अष्टैश्वर्य व सौभाग्य देणाऱ्या आदिमाता महालक्ष्मीला माझा साष्टांग नमस्कार.',
      },
    },
    fastingAndDiet: {
      en: 'Observe Vaibhav Lakshmi or Santoshi Mata fasting. Consume sweet milk, kheer, fruits. Strictly avoid sour items (lemon, curd, tamarind).',
      hi: 'वैभव लक्ष्मी अथवा संतोषी माता व्रत रखें। खट्टे पदार्थों (नींबू, इमली) का त्याग करें। खीर का प्रसाद लें।',
      mr: 'वैभव लक्ष्मी किंवा संतोषी माता उपवास करावा. आंबट पदार्थ (लिंबू, दही, चिंच) अजिबात खाऊ नये. खीर किंवा गोड जेवण करावे.',
    },
    significance: {
      en: 'Goddess Mahalakshmi and Devi Ambabai. Revered for all Goddess (Shakti) worship and the sacred Vaibhav Lakshmi Vrat.',
      hi: 'यह वार सर्व देवियों (शक्ति) की पूजा और वैभव लक्ष्मी व्रत हेतु जाना जाता है।',
      mr: 'महालक्ष्मी आणि देवी अंबाबाई. हा वार सर्व देवींच्या (शक्ती) पूजेसाठी आणि वैभव लक्ष्मी व्रतासाठी ओळखला जातो.',
    },
    benefits: {
      en: 'Wealth, family harmony, beauty, luxury, and debt clearance.',
      hi: 'अखंड लक्ष्मी, पारिवारिक सुख, ऐश्वर्य एवं आकर्षण।',
      mr: 'अखंड लक्ष्मी, घरात सुख-समृद्धी, आरोग्य व सौभाग्य प्राप्ती.',
    },
    icon: '🪔',
  },
  {
    dayIndex: 6,
    id: 'saturday-shani-hanuman',
    dayName: {
      en: 'Saturday (Shaniwar)',
      hi: 'शनिवार (Saturday)',
      mr: 'शनिवार (Saturday)',
    },
    canonicalSummary: {
      en: 'Lord Shani and Lord Hanuman. To alleviate Saturn afflictions, Hanuman Chalisa is recited and sesame/mustard oil is offered to Shani Dev.',
      hi: 'शनिदेव एवं हनुमान। शनि का प्रकोप कम करने हेतु इस दिन हनुमान चालीसा का पाठ किया जाता है और शनिदेव को तेल अर्पित किया जाता है।',
      mr: 'शनिदेव आणि हनुमान. शनीचा कोप कमी करण्यासाठी या दिवशी हनुमान चालिसाचे वाचन केले जाते आणि शनिदेवाला तेल अर्पण केले जाते.',
    },
    shortDeities: {
      en: 'Shani Dev & Hanuman',
      hi: 'शनिदेव आणि हनुमान',
      mr: 'शनिदेव आणि हनुमान',
    },
    rulingPlanet: {
      name: { en: 'Saturn (Shani)', hi: 'शनि देव', mr: 'शनि ग्रह' },
      symbol: '🪐',
      graha: 'Shani Graha',
    },
    deities: {
      primary: {
        en: 'Lord Shani and Lord Hanuman',
        hi: 'शनिदेव एवं हनुमान',
        mr: 'शनिदेव आणि हनुमान',
      },
      associated: [
        { en: 'Bhairav Dev', hi: 'कालभैरव', mr: 'कालभैरव' },
        { en: 'Pashupati Shiva', hi: 'पशुपतिनाथ शिव', mr: 'पशुपतीनाथ' },
      ],
      deityId: 'hanuman',
    },
    holyColor: {
      name: { en: 'Deep Navy Blue, Charcoal Black', hi: 'गहरा नीला, काला', mr: 'गडद निळा, काळा' },
      hex: '#1E293B',
      colorClass: 'from-slate-800 to-zinc-950 text-white',
    },
    sacredOfferings: [
      { en: 'Pure mustard oil or black sesame (til) oil offered on Shani / Hanuman idol', hi: 'शनि देव अथवा हनुमान जी पर सरसों/तिल के तेल का अभिषेक', mr: 'शनिदेवावर किंवा मारुतीरायावर तिळाचे किंवा मोहरीचे तेल अर्पण' },
      { en: 'Black sesame seeds (kaale til), black gram (urad dal), iron nails', hi: 'काले तिल, साबुत उड़द, लोहे की कील एवं काले वस्त्र', mr: 'काळे तीळ, काळी उडीद डाळ, लोखंडी खिळा व काळे कापड' },
      { en: 'Garland of Rui leaves and Sindoor for Lord Hanuman', hi: 'हनुमान जी को सिंदूर एवं रुई (आक) के पत्तों की माला', mr: 'मारुतीरायाला शेंदूर व रुईच्या पानांची माळ' },
    ],
    mantraPractice: {
      title: { en: 'Shani Shanti & Hanuman Chalisa', hi: 'शनि महामन्त्र एवं हनुमान चालीसा', mr: 'शनि महामंत्र व मारुती स्तोत्र' },
      devanagari: 'ॐ शं शनैश्चराय नमः। मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्॥',
      roman: 'Om Sham Shanaishcharaaya Namah. Manojavam Maarutatulyavegam Jitendriyam Buddhimataam Varishtham.',
      meaning: {
        en: 'Salutations to Lord Shanaishchara (Saturn); and to Hanuman, swift as wind, conqueror of senses and supreme among the wise.',
        hi: 'न्यायप्रिय शनिदेव को नमन तथा पवनपुत्र बुद्धिमान हनुमान जी को वंदन जो साढ़ेसाती व समस्त संकटों को हर लेते हैं।',
        mr: 'कर्मफळदाता शनिदेवाला नमन आणि साडेसाती व संकटे नाहीशी करणाऱ्या वज्रदेही मारुतीरायाला साष्टांग वंदन.',
      },
    },
    fastingAndDiet: {
      en: 'Fasting until twilight. Consume khichdi made of black urad dal or sesame food. Avoid salt, liquor, meat, and deceit.',
      hi: 'शाम तक व्रत रखें। काली उड़द की दाल की खिचड़ी अथवा तिल का सात्विक आहार लें। असत्य और अन्याय से बचें।',
      mr: 'संध्याकाळपर्यंत उपवास करावा. काळ्या उडदाची खिचडी किंवा तिळाचे पदार्थ खावेत. खोटेपणा व अधर्म टाळावा.',
    },
    significance: {
      en: 'Lord Shani and Lord Hanuman. To reduce Saturn afflictions, Hanuman Chalisa is recited and sesame/mustard oil is offered to Shani Dev.',
      hi: 'शनिदेव एवं हनुमान। शनि का प्रकोप कम करने हेतु इस दिन हनुमान चालीसा का पाठ किया जाता है और शनिदेव को तेल अर्पित किया जाता है।',
      mr: 'शनिदेव आणि हनुमान. शनीचा कोप कमी करण्यासाठी या दिवशी हनुमान चालिसाचे वाचन केले जाते आणि शनिदेवाला तेल अर्पण केले जाते.',
    },
    benefits: {
      en: 'Relief from Shani Sade-Sati, legal trouble clearance, longevity, and endurance.',
      hi: 'शनि साढ़ेसाती शमन, संकट मुक्ति, न्याय विजय एवं दीर्घायु।',
      mr: 'शनी साडेसाती निवारण, कोर्ट-कचेरी व संकटांतून मुक्ती, दीर्घायुष्य.',
    },
    icon: '🪐',
  },
];

export function getTodayWeekdayPuja(): WeekdayPujaInfo {
  const currentDayIndex = new Date().getDay(); // 0 to 6
  const found = weekdayPujaGuideData.find((d) => d.dayIndex === currentDayIndex);
  return found || weekdayPujaGuideData[0];
}

export function getWeekdayPujaByIndex(dayIndex: number): WeekdayPujaInfo {
  const found = weekdayPujaGuideData.find((d) => d.dayIndex === dayIndex);
  return found || weekdayPujaGuideData[0];
}

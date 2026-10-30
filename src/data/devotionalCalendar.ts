import { MultilingualText } from '../types';

export interface VratDay {
  id: string;
  name: MultilingualText;
  deityId: 'hanuman' | 'ganesha' | 'shiva' | 'vitthal';
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
  significance: MultilingualText;
  prescribedRituals: MultilingualText[];
  recommendedMantraId: string;
}

export interface UpcomingFestival {
  name: MultilingualText;
  dateStr: string;
  deity: MultilingualText;
  tithi: MultilingualText;
  significance: MultilingualText;
  fastingRule: MultilingualText;
}

export const weeklyVratGuidance: VratDay[] = [
  {
    id: 'monday-shiva',
    name: { en: 'Somwar (Monday) — Shiva & Chandra Vrat', hi: 'सोमवार — शिव व्रत', mr: 'सोमवार — भगवान शिव उपासना' },
    deityId: 'shiva',
    dayOfWeek: 1,
    significance: {
      en: 'Mondays are consecrated to Lord Shiva and Chandra (Moon). Fasting on Mondays calms the mental agitation and grants peace and longevity.',
      hi: 'सोमवार देवाधिदेव महादेव एवं चन्द्र देव को समर्पित है। यह मानसिक शान्ति एवं स्वास्थ्य प्रदाता है।',
      mr: 'सोमवार हा महादेवाचा वार मानला जातो. या दिवशी शिवलिंगावर जलाभिषेक व बिल्वपत्र अर्पण केल्याने मानसिक शांती लाभते.',
    },
    prescribedRituals: [
      { en: 'Abhishek on Shiva Linga with cold water, raw milk, and honey', hi: 'शिवलिंग पर पंचामृत एवं शीतल जल धारा', mr: 'शिवलिंगावर शीतल जल, कच्चे दूध व मधाचा अभिषेक' },
      { en: 'Offering fresh three-leaflet Bilva leaves with Om Namah Shivaya', hi: 'ॐ नमः शिवाय बोलते हुए त्रिदल बिल्वपत्र अर्पण', mr: 'त्रिदल बेलपत्र ॐ नमः शिवाय म्हणून उलटे अर्पण करणे' },
      { en: 'Chant 108 Maha Mrityunjaya Mantra for protection', hi: '१०८ महामृत्युंजय मन्त्र जप', mr: 'आरोग्य व संरक्षणासाठी १०८ महामृत्युंजय मंत्र जप' },
    ],
    recommendedMantraId: 'maha-mrityunjaya-mantra',
  },
  {
    id: 'tuesday-hanuman-ganesha',
    name: { en: 'Mangalwar (Tuesday) — Hanuman & Ganesha Vrat', hi: 'मंगलवार — हनुमान एवं गणेश व्रत', mr: 'मंगळवार — श्री मारुती व श्री गणेश उपासना' },
    deityId: 'hanuman',
    dayOfWeek: 2,
    significance: {
      en: 'Tuesdays are auspicious for Lord Hanuman and Lord Ganesha. Removes obstacles, grants courage, and neutralizes malefic Mangala dosha.',
      hi: 'मंगलवार संकटमोचक हनुमान जी एवं विघ्नहर्ता गणेश जी को समर्पित है। भय व बाधाओं का शमन करता है।',
      mr: 'मंगळवार हा मारुतीराया व श्री गणेशाचा पावन वार आहे. सर्व विघ्ने, भय व संकटांचा नाश होऊन धैर्य लाभते.',
    },
    prescribedRituals: [
      { en: 'Recite Hanuman Chalisa 3, 7, or 11 times with deep focus', hi: 'हनुमान चालीसा का ३, ७ अथवा ११ बार पाठ', mr: 'हनुमान चालीसा व मारुती स्तोत्राचे ३ किंवा ११ वेळा पठण' },
      { en: 'Apply sacred Sindoor (vermilion) and light sesame/mustard oil lamp', hi: 'सिंदूर अर्पण एवं तिल तेल का दीपक', mr: 'मारुतीरायाला शेंदूर व तिळाच्या तेलाचा दिवा लावणे' },
      { en: 'Offer 21 fresh Durva grass and Red Hibiscus to Ganesha', hi: 'श्री गणेश को २१ दूर्वा एवं लाल गुड़हल पुष्प', mr: 'श्री गणेशाला २१ दुर्वांची जुडी व तांबडे जास्वंद अर्पण' },
    ],
    recommendedMantraId: 'om-hanumate-namah',
  },
  {
    id: 'wednesday-ganesha',
    name: { en: 'Budhwar (Wednesday) — Ganesha Budhi Vrat', hi: 'बुधवार — श्री गणेश बुद्धि व्रत', mr: 'बुधवार — श्री गणेश बुद्धी उपासना' },
    deityId: 'ganesha',
    dayOfWeek: 3,
    significance: {
      en: 'Wednesdays are governed by Budha (intellect) and Lord Ganesha. Enhances wisdom, student memory, and business prosperity.',
      hi: 'बुधवार बुद्धि प्रदाता श्री गणेश को समर्पित है। विद्या, वाणी व व्यापार में वृद्धि हेतु उत्तम।',
      mr: 'बुधवार हा बुद्धीची देवता श्री गणेशाचा वार आहे. विद्या, अभ्यास, एकाग्रता आणि व्यवसायात यश प्राप्त होते.',
    },
    prescribedRituals: [
      { en: 'Chant Ganesha Atharvashirsha once or 11 times', hi: 'गणपति अथर्वशीर्ष का सस्वर पाठ', mr: 'गणपती अथर्वशीर्षाचे शांत व एकाग्र चित्ताने पठण' },
      { en: 'Offer steamed Modaks or Jaggery-Coconut prasad', hi: 'मोदक अथवा गुड़-खोपरा नैवेद्य', mr: 'उकडीचे मोदक किंवा गूळ-खोबऱ्याचा नैवेद्य अर्पण' },
      { en: 'Chant "Om Gam Ganapataye Namaha" 108 times', hi: 'ॐ गं गणपतये नमः १०८ बार जप', mr: '१०८ वेळा "ॐ गं गणपतये नमः" नामस्मरण' },
    ],
    recommendedMantraId: 'om-gam-ganapataye-namaha',
  },
  {
    id: 'thursday-guru-vitthal',
    name: { en: 'Guruwar (Thursday) — Dattatreya, Guru & Vishnu Vrat', hi: 'गुरुवार — दत्तात्रेय एवं श्रीहरि व्रत', mr: 'गुरुवार — श्रीदत्तप्रभू व विठ्ठल उपासना' },
    deityId: 'vitthal',
    dayOfWeek: 4,
    significance: {
      en: 'Dedicated to Lord Dattatreya, the Divine Guru, and Lord Vishnu. Cultivates inner guidance, spiritual discrimination, and humility.',
      hi: 'परमगुरु भगवान दत्तात्रेय एवं श्रीहरि विष्णु को समर्पित। ज्ञान, भक्ति एवं गुरु कृपा प्राप्ति का दिन।',
      mr: 'गुरुवार हा त्रिमूर्ती श्रीदत्तप्रभू व सद्गुरूंचा पावन वार आहे. ज्ञान, वैराग्य व अंतःकरणातील शुद्धता वाढीस लागते.',
    },
    prescribedRituals: [
      { en: 'Chant "Digambara Digambara Shripada Vallabha Digambara"', hi: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा नामस्मरण', mr: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा चा अखंड गजर' },
      { en: 'Light ghee lamp under Audumbar (cluster fig) or Tulsi plant', hi: 'औदुंबर अथवा तुलसी के समीप घी का दीपक', mr: 'तुळशीपुढे किंवा औदुंबराखाली गाईच्या तुपाचा दिवा लावणे' },
      { en: 'Recite Gurucharitra chapters or Dattatreya Stotra', hi: 'गुरुचरित्र अथवा दत्त बावन्नी पाठ', mr: 'गुरुचरित्राचे वाचन किंवा दत्त स्तोत्राचे पठण' },
    ],
    recommendedMantraId: 'ram-krishna-hari',
  },
  {
    id: 'friday-devi',
    name: { en: 'Shukrawar (Friday) — Kulswamini Mahalakshmi & Bhavani Vrat', hi: 'शुक्रवार — कुलस्वामिनी महालक्ष्मी व भवानी व्रत', mr: 'शुक्रवार — कुलस्वामिनी आई जगदंबा उपासना' },
    deityId: 'hanuman', // general devi
    dayOfWeek: 5,
    significance: {
      en: 'Dedicated to Divine Mother Shakti (Ambabai, Tulja Bhavani, Mahalakshmi, Renuka). Bestows family well-being, radiance, and abundance.',
      hi: 'मां आद्यशक्ति कुलस्वामिनी का परम पावन दिवस। गृह शांति, समृद्धि एवं शक्ति प्रदाता।',
      mr: 'शुक्रवार हा आई कुलस्वामिनी (तुळजाभवानी, अंबाबाई, सप्तशृंगी) चा वार आहे. घरात समृद्धी व शांतता नांदते.',
    },
    prescribedRituals: [
      { en: 'Offer Oti (blouse piece, coconut, betel leaves, turmeric-kumkum) to Devi', hi: 'मां को खण-नारियल से ओटी अर्पण एवं कुंकुमार्चन', mr: 'कुलस्वामिनीला खण-नारळाने ओटी भरणे व कुंकुमार्चन' },
      { en: 'Chant Mahishasuramardini Stotram or Mahalakshmi Ashtakam', hi: 'महिषासुरमर्दिनी स्तोत्र अथवा महालक्ष्म्यष्टकम्', mr: 'श्री महालक्ष्मी अष्टक किंवा महिषासुरमर्दिनी स्तोत्र पठण' },
      { en: 'Light sweet scented dhoop incense at twilight', hi: 'संध्या समय सुगन्धित धूप-दीप प्रज्वलन', mr: 'सायंकाळी घरात गुग्गुळ किंवा उदबत्तीचा धूप दाखवणे' },
    ],
    recommendedMantraId: 'om-hanumate-namah',
  },
  {
    id: 'saturday-hanuman-shani',
    name: { en: 'Shaniwar (Saturday) — Hanuman Shani Peeda Nivaran Vrat', hi: 'शनिवार — संकटमोचन हनुमान व शनि व्रत', mr: 'शनिवार — श्री मारुती उपासना व शनि शांती' },
    deityId: 'hanuman',
    dayOfWeek: 6,
    significance: {
      en: 'Saturday is sacred to Lord Hanuman. According to Ramayana, Hanuman liberated Shani Dev from Ravana\'s prison, gaining a divine promise that devotees of Hanuman shall never be troubled by Shani sade-sati.',
      hi: 'हनुमान जी ने रावण की कैद से शनिदेव को मुक्त कराया था, अतः शनिवार को हनुमान आराधना से शनि पीड़ा शांत होती है।',
      mr: 'शनिवार हा मारुतीरायाचा मुख्य वार आहे. हनुमंतांनी शनीदेवांची रावणाच्या कैदेतून मुक्तता केल्याने, हनुमंतांच्या भक्तांना शनीचा त्रास होत नाही असा वर आहे.',
    },
    prescribedRituals: [
      { en: 'Visit Maruti temple and offer mustard or sesame oil on idol', hi: 'मारुति मंदिर में तेल एवं सिंदूर अर्पण', mr: 'मारुती मंदिरात जाऊन तेलाचा अभिषेक व शेंदूर अर्पण' },
      { en: 'Recite Samarth Ramdas Swami\'s "Maruti Stotra" and Hanuman Chalisa', hi: 'समर्थ रामदास स्वामी विरचित मारुती स्तोत्र पाठ', mr: 'समर्थ रामदास स्वामींचे "भीमरूपी महारुद्रा" मारुती स्तोत्र पठण' },
      { en: 'Feed birds and stray animals with selfless compassion', hi: 'दीन-दुखियों एवं मूक पशु-पक्षियों की सेवा', mr: 'पशू-पक्ष्यांना अन्न-पाणी देणे व दानधर्म करणे' },
    ],
    recommendedMantraId: 'bheemroopi-maruti-stotra',
  },
  {
    id: 'sunday-surya',
    name: { en: 'Raviwar (Sunday) — Surya Narayan & Khandoba Vrat', hi: 'रविवार — सूर्य नारायण एवं खंडोबा व्रत', mr: 'रविवार — श्री सूर्यनारायण व मल्हारी मार्तंड (खंडोबा) उपासना' },
    deityId: 'shiva',
    dayOfWeek: 0,
    significance: {
      en: 'Dedicated to Lord Surya (Sun), the soul of the universe, and Lord Khandoba (Martand Bhairav, solar manifestation of Shiva in Maharashtra).',
      hi: 'जगत आत्मा भगवान सूर्य एवं महाराष्ट्र के कुलदैवत मार्तण्ड भैरव (खंडोबा) को समर्पित। तेज एवं आरोग्य वर्धक।',
      mr: 'रविवार हा प्रत्यक्ष जगन्नियंता सूर्यनारायण आणि महाराष्ट्राचे कुलदैवत जेजुरीच्या खंडेरायाचा (मार्तंड भैरव) पावन वार आहे.',
    },
    prescribedRituals: [
      { en: 'Offer Arghya (water in copper vessel) to morning rising Sun with Gayatri Mantra', hi: 'प्रातः उदीयमान सूर्य को तांबे के पात्र से जल अर्घ्य', mr: 'सकाळी उगवत्या सूर्याला तांब्याच्या पात्रातून अर्घ्य देणे व गायत्री मंत्र जप' },
      { en: 'Chant Aditya Hridaya Stotram for vitality and self-confidence', hi: 'आदित्य हृदय स्तोत्र का पाठ', mr: 'प्रभू श्रीरामाने अगस्त्य ऋषींकडून ग्रहण केलेले आदित्य हृदय स्तोत्र पठण' },
      { en: 'Chant "Yelkot Yelkot Jai Malhar" with yellow turmeric powder', hi: 'मार्तण्ड भैरव ध्यान एवं भंडारा वन्दन', mr: 'येळकोट येळकोट जय मल्हारचा जयघोष व भंडाऱ्याला वंदन' },
    ],
    recommendedMantraId: 'om-namah-shivaya',
  },
];

export const majorMaharashtraFestivals: UpcomingFestival[] = [
  {
    name: { en: 'Ashadhi Ekadashi (Devshayani Ekadashi)', hi: 'आषाढी एकादशी (देवशयनी एकादशी)', mr: 'आषाढी एकादशी (महाएकादशी)' },
    dateStr: 'Ashadha Shukla Ekadashi',
    deity: { en: 'Lord Vitthal & Rakhumai', hi: 'श्री विठ्ठल-रखुमाई', mr: 'श्री विठ्ठल-रखुमाई' },
    tithi: { en: 'Ashadha Shukla 11', hi: 'आषाढ़ शुक्ल एकादशी', mr: 'आषाढ शुद्ध एकादशी' },
    significance: {
      en: 'The grand culmination of the Pandharpur Wari. Millions bathe in Chandrabhaga. Lord Vishnu enters Yoga Nidra for Chaturmas.',
      hi: 'पंढरपुर वारी का महासंगम। भगवान विष्णु चातुर्मास शयन में प्रवेश करते हैं।',
      mr: 'पंढरपूर वारीचा महासोहळा. चंद्रभागेत लाखो वारकऱ्यांचे स्नान. चातुर्मासाचा प्रारंभ.',
    },
    fastingRule: {
      en: 'Strict fruit/sabudana fast, overnight vigil with Harinaam Japa',
      hi: 'अन्न वर्जित, फलाहार एवं रात्रिकालीन अखंड हरिनाम जागरण',
      mr: 'कडक उपवास (फराळ), रात्री भजन-कीर्तन व अखंड हरिनाम जागरण',
    },
  },
  {
    name: { en: 'Ganesh Chaturthi (Ganeshotsav)', hi: 'गणेश चतुर्थी (महागणेशोत्सव)', mr: 'श्री गणेश चतुर्थी (गणेशोत्सव प्रारंभ)' },
    dateStr: 'Bhadrapada Shukla Chaturthi',
    deity: { en: 'Lord Ganesha', hi: 'भगवान श्री गणेश', mr: 'श्री गणेश (विघ्नहर्ता)' },
    tithi: { en: 'Bhadrapada Shukla 4', hi: 'भाद्रपद शुक्ल चतुर्थी', mr: 'भाद्रपद शुद्ध चतुर्थी' },
    significance: {
      en: 'Pranapratishtha of eco-friendly clay idols at home and sarvajanik mandals across Maharashtra. 10 days of divine celebration.',
      hi: 'महाराष्ट्र का महापर्व। घरों व मण्डलों में पार्थिव गणेश स्थापना एवं १० दिवसीय महापूजन।',
      mr: 'महाराष्ट्राचा महाउत्सव. घरोघरी व सार्वजनिक मंडळांत पार्थिव श्री गणेशाची प्राणप्रतिष्ठा. १० दिवस अखंड आरती व अथर्वशीर्ष पठण.',
    },
    fastingRule: {
      en: 'Modak and coconut prasad, joyful fasting until afternoon puja',
      hi: 'मोदक एवं पंचामृत महाप्रसाद, मध्याह्न पूजा के उपरांत प्रसाद ग्रहण',
      mr: 'उकडीचे मोदक, दुपारच्या पूजेनंतर महाप्रसाद',
    },
  },
  {
    name: { en: 'Maha Shivratri', hi: 'महाशिवरात्रि', mr: 'महाशिवरात्री' },
    dateStr: 'Magha Krishna Chaturdashi',
    deity: { en: 'Lord Shiva', hi: 'देवाधिदेव महादेव', mr: 'श्री महादेव / त्र्यंबकेश्वर' },
    tithi: { en: 'Magha Krishna 14', hi: 'माघ कृष्ण चतुर्दशी', mr: 'माघ वद्य चतुर्दशी' },
    significance: {
      en: 'The cosmic night of Shiva Tandava and divine Lingodbhava. 4 Pahar night-long continuous Abhishek with Bilva leaves.',
      hi: 'शिव-पार्वती विवाह एवं लिंगोद्भव की परम पावन महारात्रि। चार पहर महापूजा।',
      mr: 'परम पावन शिवरात्र. रात्रभर चारही प्रहरांत रुद्राभिषेक, बेलपत्र अर्पण व जागरण.',
    },
    fastingRule: {
      en: 'Complete fast or milk/fruits only, water without salt, night vigil',
      hi: 'निराहार अथवा फलाहार, संपूर्ण रात्रि शिव ध्यान एवं जागरण',
      mr: 'कडक उपवास, रात्रभर शिव तांडव व महामृत्युंजय मंत्राचे जागरण',
    },
  },
  {
    name: { en: 'Hanuman Jayanti', hi: 'श्री हनुमान जन्मोत्सव', mr: 'श्री हनुमान जन्मोत्सव' },
    dateStr: 'Chaitra Purnima (Sunrise)',
    deity: { en: 'Lord Hanuman', hi: 'श्री पवनपुत्र हनुमान', mr: 'श्री मारुतीराया' },
    tithi: { en: 'Chaitra Shukla 15', hi: 'चैत्र शुक्ल पूर्णिमा', mr: 'चैत्र शुद्ध पौर्णिमा (सूर्योदय)' },
    significance: {
      en: 'Celebrated exactly at sunrise with collective recitation of Hanuman Chalisa and distribution of ginger-dry coriander (sunthavada) prasad.',
      hi: 'प्रातः सूर्योदय वेला में जन्मोत्सव, सामूहिक हनुमान चालीसा पाठ एवं सुंठवडा प्रसाद।',
      mr: 'सकाळी बरोबर सूर्योदयाच्या वेळी जन्मकाळ सोहळा, सुंठवडा वाटप व ११ वेळा सामूहिक मारुती स्तोत्र पठण.',
    },
    fastingRule: {
      en: 'Bhakti fast until sunrise puja, offering Boondi and Pan prasad',
      hi: 'सूर्योदय पूजा पर्यन्त उपवास, बूंदी व सिंदूर अर्पण',
      mr: 'सूर्योदयापर्यंत उपवास, जन्म सोहळ्यानंतर सुंठवडा प्रसाद ग्रहण',
    },
  },
  {
    name: { en: 'Kartiki Ekadashi (Prabodhini Ekadashi)', hi: 'कार्तिकी एकादशी (प्रबोधिनी)', mr: 'कार्तिकी एकादशी (पंढरपूर)' },
    dateStr: 'Kartika Shukla Ekadashi',
    deity: { en: 'Lord Vitthal & Tulsi Mata', hi: 'श्री विठ्ठल एवं तुलसी विवाह', mr: 'श्री विठ्ठल-रखुमाई व तुळशी विवाह प्रारंभ' },
    tithi: { en: 'Kartika Shukla 11', hi: 'कार्तिक शुक्ल एकादशी', mr: 'कार्तिक शुद्ध एकादशी' },
    significance: {
      en: 'Second largest pilgrimage to Pandharpur. Marks the awakening of Lord Vishnu and the commencement of sacred Tulsi Vivah across Maharashtra.',
      hi: 'पंढरपुर का द्वितीय महामेला। चातुर्मास समाप्ति एवं तुलसी विवाह का शुभारम्भ।',
      mr: 'पंढरपूरची दुसरी मोठी वारी. चातुर्मास समाप्ती आणि घरोघरी पावन तुळशी विवाहाचा मंगल प्रारंभ.',
    },
    fastingRule: {
      en: 'Sacred Ekadashi fast, Haripath recital, lighting lamps around Tulsi Vrindavan',
      hi: 'एकादशी व्रत एवं तुलसी वृन्दावन में दीपदान',
      mr: 'एकादशी उपवास, विठ्ठल नामस्मरण व तुळशी वृंदावनात त्रिपुर वात लावणे',
    },
  },
];

export function getTodayVratGuidance(): VratDay {
  const dayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon...
  return weeklyVratGuidance.find((v) => v.dayOfWeek === dayIndex) || weeklyVratGuidance[1];
}

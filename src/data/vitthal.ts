import { MultilingualText } from '../types';

export interface VarkariSaint {
  name: MultilingualText;
  era: string;
  birthPlace: MultilingualText;
  samadhiPlace: MultilingualText;
  majorWork: MultilingualText;
  famousTeaching: MultilingualText;
}

export interface WariHalt {
  stopNumber: number;
  location: MultilingualText;
  district: string;
  significance: MultilingualText;
  distanceFromStartKm: number;
  ringanType?: 'gol' | 'ubhe' | 'none';
}

export const vitthalLore = {
  name: {
    en: 'Lord Vitthal (Vithoba / Pandurang)',
    hi: 'भगवान विठ्ठल (पाण्डुरंग / विठोबा)',
    mr: 'श्री विठ्ठल-रखुमाई (पांडुरंग / विठू माऊली)',
  },
  tagline: {
    en: 'The Eternal Deity of Compassion Standing on a Brick for His Devotee',
    hi: 'भक्त पुण्डलीक हेतु विट पर खड़े करुणावतार भगवान',
    mr: 'भक्त पुंडलिकासाठी युगे अठ्ठावीस विटेवर उभा असलेला जगाचा कैवारी',
  },
  sacredTown: {
    en: 'Pandharpur (Dakshin Kashi), Solapur District, Maharashtra',
    hi: 'पंढरपुर (दक्षिण काशी), सोलापूर जिला, महाराष्ट्र',
    mr: 'पंढरपूर (दक्षिण काशी), सोलापूर जिल्हा, महाराष्ट्र',
  },
  sacredRiver: {
    en: 'Chandrabhaga (Crescent Bhima River)',
    hi: 'चंद्रभागा (अर्धचंद्राकार भीमा नदी)',
    mr: 'चंद्रभागा (अर्धचंद्राकार वाहणारी पावन भीमा नदी)',
  },
  iconography: [
    {
      symbol: '🧱',
      name: { en: 'Standing on a Brick (Vitevari Ubha)', hi: 'विट पर खड़े (विटेवरी)', mr: 'विटेवरी उभा' },
      meaning: {
        en: 'When Pundalik was selflessly serving his elderly parents, Krishna arrived. Pundalik threw a brick for the Lord to stand upon so his parental service would not be interrupted. Vitthal stood with hands on hips, waiting unconditionally.',
        hi: 'माता-पिता की सेवा में लीन पुण्डलीक ने प्रभु के विश्राम हेतु ईंट फेंकी। भगवान भक्त के प्रेम व माता-पिता की सेवा का सम्मान करते हुए सदैव विट पर खड़े रहे।',
        mr: 'मातृ-पितृ सेवेत लीन असलेल्या पुंडलिकाने भगवंताला थांबण्यासाठी वीट भिरकावली. भक्ताच्या सेवेचा मान ठेवून विठ्ठल युगे अठ्ठावीस दोन्ही हात कमरेवर ठेवून उभा आहे.',
      },
    },
    {
      symbol: '🙌',
      name: { en: 'Hands on Hips (Katevari Kar)', hi: 'कमर पर हाथ (कटिवर कर)', mr: 'कटेवरी कर' },
      meaning: {
        en: 'Indicates that the ocean of material worldly suffering (Bhavasagara) is only waist-deep for those who surrender in loving devotion.',
        hi: 'दर्शाता है कि परमात्मा की शरण में आने पर संसार रूपी भवसागर मात्र कमर जितना गहरा रह जाता है।',
        mr: 'दर्शवतो की, विठ्ठलाच्या नामाचा आश्रय घेणाऱ्या भक्तांसाठी हा संसाररूपी भवसागर केवळ कमरेइतकाच उथळ उरतो.',
      },
    },
    {
      symbol: '🌿',
      name: { en: 'Tulsi Mala & Kaustubha Jewel', hi: 'तुलसी माला एवं कौस्तुभ मणि', mr: 'तुळशीची माळ व कौस्तुभ मणी' },
      meaning: {
        en: 'Adorned with sacred basil beads beloved to Vishnu, and the luminous Kaustubha gem on His chest, symbolizing pure spiritual consciousness.',
        hi: 'वक्षस्थल पर तुलसी की मंजरी व कौस्तुभ मणि, जो शुद्ध चेतना एवं प्रेमाभक्ति का प्रतीक है।',
        mr: 'गळ्यात तुळशीची मंजिरी-माळ आणि वक्षस्थळावर कौस्तुभ मणी, जे परमतत्त्वाचे व निस्सीम भक्तीचे लक्षण आहे.',
      },
    },
    {
      symbol: '🐟',
      name: { en: 'Fish-Shaped Earrings (Makara Kundala)', hi: 'मकर कुंडल', mr: 'मकर कुंडले' },
      meaning: {
        en: 'Fish move freely in deep water without drowning; similarly, a devotee lives in the material world without being contaminated by worldly desire.',
        hi: 'मत्स्य रूपी कुंडल संकेत करते हैं कि जल में रहकर भी कमल अथवा मत्स्य अलिप्त रहते हैं, वैसे ही सांसारिक मोह से मुक्त रहना चाहिए।',
        mr: 'पाण्यात असूनही मत्स्य जसा जलमुक्त राहतो, तसेच संसारात राहूनही मोहापासून अलिप्त राहण्याची शिकवण मकर कुंडले देतात.',
      },
    },
  ],
  theWariTradition: {
    title: {
      en: 'The 800-Year-Old Pandharpur Wari Tradition',
      hi: '८०० वर्ष प्राचीन पंढरपुर आषाढी वारी परंपरा',
      mr: '८०० वर्षांची देदीप्यमान पंढरपूर आषाढी वारी महापरंपरा',
    },
    description: {
      en: 'The Wari is the world\'s largest and oldest continuous annual walking pilgrimage, where over 1.5 million pilgrims (Varkaris) walk 250+ kilometers on foot with padukas of Sant Dnyaneshwar and Sant Tukaram to Pandharpur on Ashadhi Ekadashi.',
      hi: 'वारी विश्व की सबसे विशाल एवं प्राचीन पैदल तीर्थयात्रा है, जिसमें १५ लाख से अधिक वारकरी संतों की पालखी के साथ २५० किमी पैदल चलकर पंढरपुर पहुंचते हैं।',
      mr: 'वारी ही जगातील सर्वात भव्य, शांततापूर्ण व समतेची पदयात्रा आहे. दरवर्षी आषाढी एकादशीला १५ लाखांहून अधिक वारकरी संत ज्ञानेश्वर व संत तुकाराम महाराजांच्या पालखीसोबत २५०+ किमी पायी चालतात.',
    },
    varkariPrinciples: [
      {
        en: 'Absolute Equality: Caste, gender, wealth, and status dissolve completely; all greet each other by touching feet and saying "Mauli".',
        hi: 'परम समता: जाति, वर्ग व पद का कोई भेद नहीं; सभी एक-दूसरे को "माऊली" कहकर नमन करते हैं।',
        mr: 'परम समता: जात, पात, धर्म, श्रीमंत-गरीब असा कोणताही भेद नसून प्रत्येक वारकरी एकमेकांच्या पाया पडून "माऊली" म्हणून आलिंगन देतो.',
      },
      {
        en: 'Simplicity & Non-Violence: Strict vegetarian food, truth, avoidance of alcohol/tobacco, wearing Tulsi mala and carrying saffron Pataka flag.',
        hi: 'अहिंसा एवं सादगी: सात्विक शाकाहार, गले में तुलसी माला, भगवा ध्वज एवं मुख में अखंड रामकृष्णहरि जप।',
        mr: 'सादगी व अहिंसा: गळ्यात तुळशीची माळ, कपाळी गोपीचंदन, खांद्यावर भगवी पताका आणि मुखी अखंड "रामकृष्णहरि" नामघोष.',
      },
      {
        en: 'Joyous Devotion (Bhakti-Ananda): Taal, Chipli, Mridanga, and spontaneous Abhanga singing erase all physical fatigue.',
        hi: 'आनंदमय भक्ति: टाळ, मृदंग एवं अभंग गायन से मीलों की पैदल यात्रा का कोई श्रम अनुभव नहीं होता।',
        mr: 'भक्तीचा आनंद: टाळ-मृदंगाचा गजर, चिपळ्यांचा नाद आणि संत अभंग गायनामुळे शेकडो मैलांच्या पायी प्रवासाचा कसलाही थकवा जाणवत नाही.',
      },
    ],
  },
};

export const varkariSaints: VarkariSaint[] = [
  {
    name: { en: 'Sant Dnyaneshwar Maharaj (Mauli)', hi: 'संत ज्ञानेश्वर महाराज (माऊली)', mr: 'संत ज्ञानेश्वर महाराज (माऊली)' },
    era: '1275 – 1296 CE',
    birthPlace: { en: 'Apegaon, Chhatrapati Sambhajinagar', hi: 'आपेगांव', mr: 'आपेगाव, छत्रपती संभाजीनगर' },
    samadhiPlace: { en: 'Alandi (Indrayani River bank), Pune', hi: 'आळंदी (पुणे)', mr: 'आळंदी (इंद्रायणी काठ, पुणे)' },
    majorWork: { en: 'Dnyaneshwari (Bhavarth Deepika), Amritanubhav, Haripath', hi: 'ज्ञानेश्वरी, अमृतानुभव, हरिपाठ', mr: 'भावार्थदीपिका (ज्ञानेश्वरी), अमृतानुभव, हरिपाठ, पसायदान' },
    famousTeaching: {
      en: 'Composed the immortal Pasayadan praying for universal benevolence and the removal of darkness from all minds at the age of 15.',
      hi: '१५ वर्ष की आयु में सम्पूर्ण विश्व के कल्याण हेतु अमर "पसायदान" की रचना की।',
      mr: 'वयाच्या अवघ्या १५ व्या वर्षी अवघ्या विश्वाच्या कल्याणासाठी "जे खळांची व्यंकटी सांडो" हे अमर पसायदान मागितले.',
    },
  },
  {
    name: { en: 'Sant Tukaram Maharaj', hi: 'संत तुकाराम महाराज', mr: 'जगद्गुरू संत तुकाराम महाराज' },
    era: '1608 – 1650 CE',
    birthPlace: { en: 'Dehu, Pune', hi: 'देहू', mr: 'देहू, पुणे' },
    samadhiPlace: { en: 'Vaikuntha Gaman from Dehu', hi: 'देहू (वैकुंठ गमन)', mr: 'देहू (इंद्रायणी काठ, वैकुंठ गमन)' },
    majorWork: { en: 'Tukaram Gatha (over 4,500 sublime Abhangas)', hi: 'तुकाराम गाथा (४,५००+ अभंग)', mr: 'तुकाराम गाथा (४,५०० हून अधिक ओजस्वी अभंग)' },
    famousTeaching: {
      en: '"Tree, creepers, and wild animals are our kinfolk." Championed fearless social reform and pure devotion.',
      hi: '"वृक्षवल्ली आम्हां सोयरीं वनचरें" — पर्यावरण प्रेम एवं पाखंड विहीन सत्य भक्ति का उपदेश।',
      mr: '"वृक्षवल्ली आम्हां सोयरीं वनचरें" — निसर्गप्रेम, समता व ढोंगावर प्रहार करणारी परखड सत्यनिष्ठा.',
    },
  },
  {
    name: { en: 'Sant Namdev Maharaj', hi: 'संत नामदेव महाराज', mr: 'संत नामदेव महाराज' },
    era: '1270 – 1350 CE',
    birthPlace: { en: 'Narsi Namdev, Hingoli', hi: 'नरसी नामदेव', mr: 'नरसी नामदेव, हिंगोली' },
    samadhiPlace: { en: 'First step of Pandharpur temple (Namdev Payari)', hi: 'पंढरपुर (नामदेव पायरी)', mr: 'पंढरपूर मंदिराची पहिली पायरी (नामदेव पायरी)' },
    majorWork: { en: 'Namdev Gatha, 61 hymns included in Guru Granth Sahib', hi: 'नामदेव गाथा, गुरु ग्रंथ साहिब में ६१ शबद', mr: 'नामदेव गाथा, शीख धर्मग्रंथ "गुरु ग्रंथ साहिब" मध्ये ६१ पदे समाविष्ट' },
    famousTeaching: {
      en: 'Carried the Bhagavata devotion across North India to Punjab, unifying the nation through divine love.',
      hi: 'महाराष्ट्र से पंजाब तक भागवत धर्म की पताका फहराई।',
      mr: 'महाराष्ट्रातील भागवत धर्म थेट पंजाबपर्यंत नेऊन राष्ट्रीय एकात्मतेचा पाया रचला.',
    },
  },
  {
    name: { en: 'Sant Eknath Maharaj', hi: 'संत एकनाथ महाराज', mr: 'संत एकनाथ महाराज' },
    era: '1533 – 1599 CE',
    birthPlace: { en: 'Paithan, Chhatrapati Sambhajinagar', hi: 'पैठण', mr: 'पैठण, छत्रपती संभाजीनगर' },
    samadhiPlace: { en: 'Paithan (Godavari River bank)', hi: 'पैठण (गोदावरी तट)', mr: 'पैठण (गोदावरी काठ)' },
    majorWork: { en: 'Eknathi Bhagavata, Bhavartha Ramayana, Bharuds', hi: 'एकनाथी भागवत, भावार्थ रामायण, भारुडे', mr: 'एकनाथी भागवत, भावार्थ रामायण, लोकशिक्षणात्मक भारुडे' },
    famousTeaching: {
      en: 'Exemplified supreme compassion by feeding Ganga water to a dying donkey on pilgrimage, seeing God in all beings.',
      hi: 'तीर्थयात्रा में गोदावरी/गंगा जल प्यासे गधे को पिलाकर प्राणिमात्र में ईश्वर दर्शन की पराकाष्ठा दिखाई।',
      mr: 'काशीहून आणलेले गंगेचे पावन पाणी तहानलेल्या गाढवाला पाजून प्राणिमात्रामध्ये पांडुरंग पाहण्याची पराकाष्ठा शिकवली.',
    },
  },
  {
    name: { en: 'Sant Janabai', hi: 'संत जनाबाई', mr: 'संत जनाबाई' },
    era: '1258 – 1350 CE',
    birthPlace: { en: 'Gangakhed, Parbhani', hi: 'गंगाखेड', mr: 'गंगाखेड, परभणी' },
    samadhiPlace: { en: 'Pandharpur', hi: 'पंढरपुर', mr: 'पंढरपूर' },
    majorWork: { en: 'Janabai Abhangas', hi: 'जनाबाई अभंग', mr: 'जनाबाईंचे अभंग' },
    famousTeaching: {
      en: 'Experienced Vitthal as her mother assisting in household grinding and washing: "दळिता कांडिता तुज गाईन अनंता".',
      hi: 'गृहकार्य करते हुए भी ईश्वर का सान्निध्य अनुभव किया; विठ्ठल को सखी व माता माना।',
      mr: 'दळण-कांडण करतानाही विठ्ठल आपल्या मदतीला येतो असा अखंड सख्यभक्तीचा अलौकिक अनुभव मांडला.',
    },
  },
  {
    name: { en: 'Sant Chokhamela', hi: 'संत चोखामेळा', mr: 'संत चोखोबाराय' },
    era: '13th – 14th Century CE',
    birthPlace: { en: 'Mehkar, Buldhana', hi: 'मेहकर', mr: 'मेहकर, बुलढाणा' },
    samadhiPlace: { en: 'Front of Pandharpur temple', hi: 'पंढरपुर मंदिर प्रांगण', mr: 'पंढरपूर मंदिर महाद्वारासमोर' },
    majorWork: { en: 'Chokhamela Abhangas', hi: 'चोखामेळा अभंग', mr: 'चोखोबांचे अभंग' },
    famousTeaching: {
      en: '"Sugarcane may be crooked, but its juice is not crooked. A human body may be humble, but the inner soul is pure divine."',
      hi: '"ऊस डोंगा परी रस नव्हे डोंगा" — बाह्य रूप नहीं, अंतःकरण की शुद्धता ही सच्ची भक्ति है।',
      mr: '"ऊस डोंगा परी रस नव्हे डोंगा, काय भुललासी वरलीया रंगा" — बाह्य जाती-रूपापेक्षा अंतःकरणातील शुद्ध भक्ती श्रेष्ठ आहे.',
    },
  },
];

export const dnyaneshwarPalkhiRoute: WariHalt[] = [
  { stopNumber: 1, location: { en: 'Alandi (Prasthan)', hi: 'आळंदी (प्रस्थान)', mr: 'आळंदी (प्रस्थान)' }, district: 'Pune', distanceFromStartKm: 0, significance: { en: 'Sanjeevan Samadhi of Sant Dnyaneshwar on Indrayani bank', hi: 'माऊली संजीवन समाधी से प्रस्थान', mr: 'इंद्रायणी काठाहून माऊलींच्या संजीवन समाधी मंदिरातून प्रस्थान' }, ringanType: 'none' },
  { stopNumber: 2, location: { en: 'Pune City (Bhavani Peth)', hi: 'पुणे नगर', mr: 'पुणे (भवानी पेठ/पालखी विठोबा)' }, district: 'Pune', distanceFromStartKm: 25, significance: { en: 'Grand 2-day combined halt with Tukaram Maharaj Palkhi', hi: 'तुकाराम महाराज पालखी के साथ संयुक्त विश्राम', mr: 'तुकाराम महाराज व माऊली पालखीचा भव्य संगम व २ दिवसांचा मुक्काम' }, ringanType: 'none' },
  { stopNumber: 3, location: { en: 'Saswad (Dive Ghat Climb)', hi: 'सासवड (दिवे घाट)', mr: 'सासवड (दिवे घाट)' }, district: 'Pune', distanceFromStartKm: 55, significance: { en: 'Breathtaking sight of 1 million Varkaris climbing Dive Ghat', hi: 'दिवे घाट चढ़ाई का विहंगम दृश्य', mr: 'दिवे घाटातून लाखो वारकऱ्यांची वारी चढतानाचा डोळ्यांचे पारणे फेडणारा नजराणा' }, ringanType: 'none' },
  { stopNumber: 4, location: { en: 'Jejuri (Khandoba Bhumi)', hi: 'जेजुरी', mr: 'जेजुरी' }, district: 'Pune', distanceFromStartKm: 75, significance: { en: 'Turmeric-sprinkled Khandoba temple hill stop', hi: 'भंडारा (हल्दी) नगरी जेजुरी में स्वागत', mr: 'येळकोट येळकोट जय मल्हारच्या गजरात भंडाऱ्याची मुक्त उधळण' }, ringanType: 'none' },
  { stopNumber: 5, location: { en: 'Lonand (Neera River Bath)', hi: 'लोणंद (नीरा स्नान)', mr: 'लोणंद (नीरा स्नान)' }, district: 'Satara', distanceFromStartKm: 105, significance: { en: 'Holy bath of padukas at Neera Snan Ghat', hi: 'नीरा नदी में पादुका स्नान', mr: 'नीरा नदीच्या तीरावर माऊलींच्या पादुकांचे पवित्र स्नान' }, ringanType: 'none' },
  { stopNumber: 6, location: { en: 'Taradgaon', hi: 'तरडगांव', mr: 'तरडगाव' }, district: 'Satara', distanceFromStartKm: 125, significance: { en: 'Midway halt in Phaltan taluka', hi: 'फलटण तालुका मुक्काम', mr: 'फलटण तालुक्यातील शांत मुक्काम' }, ringanType: 'none' },
  { stopNumber: 7, location: { en: 'Phaltan', hi: 'फलटण', mr: 'फलटण' }, district: 'Satara', distanceFromStartKm: 145, significance: { en: 'Historic kingdom of Mahanubhava and Nimbalakar dynasty', hi: 'ऐतिहासिक फलटण नगर मुक्काम', mr: 'ऐतिहासिक फलटण नगरीत भव्य स्वागत' }, ringanType: 'none' },
  { stopNumber: 8, location: { en: 'Barad', hi: 'बरड', mr: 'बरड' }, district: 'Satara', distanceFromStartKm: 165, significance: { en: 'Satara-Solapur district border entry', hi: 'सोलापूर सीमा प्रवेश', mr: 'सातारा सोडून सोलापूर जिल्ह्यात पावन प्रवेश' }, ringanType: 'none' },
  { stopNumber: 9, location: { en: 'Natepute', hi: 'नातेपुते', mr: 'नातेपुते' }, district: 'Solapur', distanceFromStartKm: 185, significance: { en: 'First Gol Ringan (Circular Horse Run)', hi: 'प्रथम गोल रिंगण', mr: 'वारीतील पाहिले गोल रिंगण — माऊलींच्या अश्वाची भरारी' }, ringanType: 'gol' },
  { stopNumber: 10, location: { en: 'Malshiras', hi: 'माळशिरस', mr: 'माळशिरस' }, district: 'Solapur', distanceFromStartKm: 205, significance: { en: 'Baji Rao Well halt and holy chants', hi: 'बाजीराव विहीर विश्राम', mr: 'बाजीराव विहीर विश्रांती' }, ringanType: 'none' },
  { stopNumber: 11, location: { en: 'Velapur (Thakur Bua Samadhi)', hi: 'वेळापूर', mr: 'वेळापूर' }, district: 'Solapur', distanceFromStartKm: 220, significance: { en: 'Second Gol Ringan', hi: 'द्वितीय गोल रिंगण', mr: 'दुसरे गोल रिंगण' }, ringanType: 'gol' },
  { stopNumber: 12, location: { en: 'Bhandishegaon', hi: 'भंडीशेगांव', mr: 'भंडीशेगाव' }, district: 'Solapur', distanceFromStartKm: 235, significance: { en: 'Third Gol Ringan on flat plains', hi: 'तृतीय गोल रिंगण', mr: 'तिसरे गोल रिंगण' }, ringanType: 'gol' },
  { stopNumber: 13, location: { en: 'Wakhari (Ubhe Ringan)', hi: 'वाखरी (उभे रिंगण)', mr: 'वाखरी (भव्य उभे रिंगण)' }, district: 'Solapur', distanceFromStartKm: 245, significance: { en: 'Famous Vertical Horse Sprint (Ubhe Ringan) before entering Pandharpur', hi: 'भव्य उभे रिंगण जहां अश्व तीव्र गति से दौड़ता है', mr: 'पंढरपूरच्या वेशीवर होणारे प्रसिद्ध उभे रिंगण, जिथे माऊलींचा अश्व विजेच्या वेगाने धावतो' }, ringanType: 'ubhe' },
  { stopNumber: 14, location: { en: 'Pandharpur (Chandrabhaga)', hi: 'श्री क्षेत्र पंढरपुर (समापन)', mr: 'श्री क्षेत्र पंढरपूर (चंद्रभागा स्नान व दर्शन)' }, district: 'Solapur', distanceFromStartKm: 255, significance: { en: 'Ashadhi Ekadashi Mahapuja, holy Chandrabhaga dip, and darshan of Vitthal-Rakhumai', hi: 'आषाढी एकादशी महापूजा व विठ्ठल दर्शन', mr: 'आषाढी एकादशीची महापूजा, चंद्रभागेत पवित्र स्नान व विठ्ठल-रखुमाईचे पावन दर्शन' }, ringanType: 'none' },
];

export const tukaramPalkhiRoute: WariHalt[] = [
  { stopNumber: 1, location: { en: 'Dehu (Prasthan)', hi: 'देहू (प्रस्थान)', mr: 'देहू (प्रस्थान)' }, district: 'Pune', distanceFromStartKm: 0, significance: { en: 'Holy departure from Indrayani bank and Vaikuntha Gaman temple of Sant Tukaram', hi: 'तुकोबाराय वैकुंठ गमन पावन भूमि से प्रस्थान', mr: 'इंद्रायणी काठाहून जगद्गुरू तुकोबारायांच्या वैकुंठ गमन मंदिर प्रांगणातून प्रस्थान' }, ringanType: 'none' },
  { stopNumber: 2, location: { en: 'Akurdi', hi: 'आकुर्डी (पुणे)', mr: 'आकुर्डी (विठ्ठल मंदिर)' }, district: 'Pune', distanceFromStartKm: 15, significance: { en: 'First night halt at historic Vitthal Temple Akurdi', hi: 'आकुर्डी विठ्ठल मंदिर प्रथम मुक्काम', mr: 'आकुर्डी येथील ऐतिहासिक विठ्ठल मंदिरात पहिला मुक्काम' }, ringanType: 'none' },
  { stopNumber: 3, location: { en: 'Pune City (Nivdungya Vithoba)', hi: 'पुणे नगर', mr: 'पुणे (निवडुंग्या विठोबा, नाना पेठ)' }, district: 'Pune', distanceFromStartKm: 35, significance: { en: 'Grand 2-day combined halt with Sant Dnyaneshwar Palkhi', hi: 'पुणे शहर में दो दिवसीय संयुक्त मुक्काम', mr: 'पुण्यात माऊली पालखीसोबत ऐतिहासिक संगम व २ दिवसांचा भव्य मुक्काम' }, ringanType: 'none' },
  { stopNumber: 4, location: { en: 'Loni Kalbhor', hi: 'लोणी काळभोर', mr: 'लोणी काळभोर' }, district: 'Pune', distanceFromStartKm: 55, significance: { en: 'Departure from Pune outskirts along Solapur Highway', hi: 'पुणे से आगे सोलापूर मार्ग मुक्काम', mr: 'पुणे शहरातून सोलापूर महामार्गावर मार्गक्रमण' }, ringanType: 'none' },
  { stopNumber: 5, location: { en: 'Yavat (Bhairavnath)', hi: 'यवत', mr: 'यवत (भैरवनाथ मंदिर)' }, district: 'Pune', distanceFromStartKm: 80, significance: { en: 'Historic halt at Bhairavnath temple in Daund taluka', hi: 'यवत पावन मुक्काम', mr: 'दौंड तालुक्यातील यवत येथे पावन मुक्काम' }, ringanType: 'none' },
  { stopNumber: 6, location: { en: 'Varvand', hi: 'वरवंड', mr: 'वरवंड' }, district: 'Pune', distanceFromStartKm: 105, significance: { en: 'Peaceful rural halt with massive community meals (Annadana)', hi: 'वरवंड ग्राम मुक्काम एवं विशाल अन्नदान', mr: 'वरवंड ग्रामस्थांतर्फे लाखो वारकऱ्यांचे भव्य अन्नदान' }, ringanType: 'none' },
  { stopNumber: 7, location: { en: 'Undawadi', hi: 'उंडवडी', mr: 'उंडवडी (बारामती)' }, district: 'Pune', distanceFromStartKm: 130, significance: { en: 'Entry into historic Baramati countryside', hi: 'बारामती क्षेत्र में प्रवेश', mr: 'बारामती परिसरामध्ये निसर्गरम्य मुक्काम' }, ringanType: 'none' },
  { stopNumber: 8, location: { en: 'Baramati (Sharda Ground)', hi: 'बारामती', mr: 'बारामती (शारदा प्रांगण)' }, district: 'Pune', distanceFromStartKm: 150, significance: { en: 'Massive civic reception and Samaj Aarti at Baramati', hi: 'बारामती नगरी में ऐतिहासिक स्वागत', mr: 'बारामती नगरीत लाखो भाविकांच्या उपस्थितीत भव्य समाज आरती' }, ringanType: 'none' },
  { stopNumber: 9, location: { en: 'Sansar (Belwandi)', hi: 'सणसर', mr: 'सणसर (इंदापूर)' }, district: 'Pune', distanceFromStartKm: 170, significance: { en: 'Rural devotional stay in sugarcane belt', hi: 'सणसर पावन विश्राम', mr: 'इंदापूर तालुक्यातील सणसर येथे पारंपरिक मुक्काम' }, ringanType: 'none' },
  { stopNumber: 10, location: { en: 'Nimgaon Ketki', hi: 'निमगाव केतकी', mr: 'निमगाव केतकी' }, district: 'Pune', distanceFromStartKm: 190, significance: { en: 'Holy halt before entering Indapur town', hi: 'निमगांव पावन विश्राम', mr: 'इंदापूरच्या वेशीवर निमगाव केतकीत विसावा' }, ringanType: 'none' },
  { stopNumber: 11, location: { en: 'Indapur (First Gol Ringan)', hi: 'इंदापूर (गोल रिंगण)', mr: 'इंदापूर (प्रथम गोल रिंगण)' }, district: 'Pune', distanceFromStartKm: 210, significance: { en: 'First breathtaking circular horse run of Sant Tukaram Palkhi', hi: 'तुकाराम महाराज पालखी का प्रथम गोल रिंगण', mr: 'तुकोबारायांच्या पालखी सोहळ्याचे पहिले थरारक गोल रिंगण' }, ringanType: 'gol' },
  { stopNumber: 12, location: { en: 'Sarati (Neera Bath)', hi: 'सराटी (नीरा स्नान)', mr: 'सराटी (नीरा स्नान घाट)' }, district: 'Pune', distanceFromStartKm: 225, significance: { en: 'Holy bath of Tukaram Maharaj padukas at Neera river bank', hi: 'नीरा नदी में पवित्र पादुका स्नान', mr: 'नीरा नदीच्या तीरावर तुकोबारायांच्या पादुकांचे पवित्र स्नान' }, ringanType: 'none' },
  { stopNumber: 13, location: { en: 'Akluj (Second Gol Ringan)', hi: 'अकलूज (गोल रिंगण)', mr: 'अकलूज (सदाशिवनगर गोल रिंगण)' }, district: 'Solapur', distanceFromStartKm: 240, significance: { en: 'Second grand Gol Ringan and enthusiastic welcome in Solapur district', hi: 'अकलूज में द्वितीय गोल रिंगण सोहळा', mr: 'अकलूज-सदाशिवनगर येथे अफाट उत्साहात दुसरे भव्य गोल रिंगण' }, ringanType: 'gol' },
  { stopNumber: 14, location: { en: 'Borgaon', hi: 'बोरगाव', mr: 'बोरगाव' }, district: 'Solapur', distanceFromStartKm: 250, significance: { en: 'Malshiras taluka halt before moving to Pandharpur border', hi: 'बोरगांव मुक्काम', mr: 'माळशिरस तालुक्यातील शांत मुक्काम' }, ringanType: 'none' },
  { stopNumber: 15, location: { en: 'Pirachi Kuroli', hi: 'पिराची कुरोली', mr: 'पिराची कुरोली' }, district: 'Solapur', distanceFromStartKm: 260, significance: { en: 'Third Gol Ringan on sacred soil', hi: 'तृतीय गोल रिंगण', mr: 'पंढरपूर तालुक्यात प्रवेश व तिसरे गोल रिंगण' }, ringanType: 'gol' },
  { stopNumber: 16, location: { en: 'Wakhari (Ubhe Ringan & Palkhi Confluence)', hi: 'वाखरी (उभे रिंगण व मिलन)', mr: 'वाखरी (उभे रिंगण व पालखी मिलन)' }, district: 'Solapur', distanceFromStartKm: 270, significance: { en: 'Historic confluence with Sant Dnyaneshwar Palkhi & electrifying Ubhe Ringan', hi: 'माऊली पालखी के साथ पावन मिलन एवं उभे रिंगण', mr: 'माऊली व तुकोबारायांच्या पालखीचे पावन मिलन व अखेरचे भव्य उभे रिंगण' }, ringanType: 'ubhe' },
  { stopNumber: 17, location: { en: 'Pandharpur (Chandrabhaga)', hi: 'श्री क्षेत्र पंढरपुर (समापन)', mr: 'श्री क्षेत्र पंढरपूर (समापन)' }, district: 'Solapur', distanceFromStartKm: 280, significance: { en: 'Joyous climax of Wari, holy Chandrabhaga dip, and darshan of Vitthal-Rakhumai', hi: 'चंद्रभागा स्नान व विठ्ठल दर्शन', mr: 'चंद्रभागेत स्नान, नगरप्रदक्षिणा आणि विठू माऊलीचे पावन दर्शन' }, ringanType: 'none' },
];

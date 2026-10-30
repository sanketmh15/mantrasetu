import { MultilingualText } from '../types';

export interface MaharashtraDeityEntry {
  id: string;
  name: MultilingualText;
  traditionCategory: 'shiva' | 'ganesha' | 'vitthal_vishnu' | 'devi_shakti' | 'khandoba' | 'dattatreya' | 'gramdevata' | 'saints';
  primaryShrine: MultilingualText;
  district: string;
  region: 'Konkan' | 'Western Maharashtra' | 'North Maharashtra' | 'Marathwada' | 'Vidarbha';
  significance: MultilingualText;
  traditionalMantra: string;
  isKuldaivat: boolean;
}

export const maharashtraDeityDirectory: MaharashtraDeityEntry[] = [
  // ==========================================
  // WESTERN MAHARASHTRA (पश्चिम महाराष्ट्र / देश)
  // ==========================================
  {
    id: 'mayureshwar-morgaon',
    name: { en: 'Mayureshwar Ganapati', hi: 'मयूरेश्वर गणपति', mr: 'श्री मयूरेश्वर (मोरगाव)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Morgaon Mayureshwar Temple', hi: 'मोरगांव मयूरेश्वर मंदिर', mr: 'मयूरेश्वर मंदिर, मोरगाव' },
    district: 'Pune',
    region: 'Western Maharashtra',
    significance: {
      en: 'First and foremost shrine of the Ashtavinayak pilgrimage. Riding a peacock, he vanquished demon Sindhu.',
      hi: 'अष्टविनायक यात्रा का प्रथम व प्रमुख मंदिर। मयूरारूढ़ गणपति ने यहाँ सिंधुरासुर का वध किया था।',
      mr: 'अष्टविनायक यात्रेतील प्रथम गणपती. मोरावर आरूढ होऊन सिंधू दैत्याचा वध करणारे स्वयंभू देवस्थान.'
    },
    traditionalMantra: 'ॐ गं गणपतये नमः',
    isKuldaivat: true,
  },
  {
    id: 'khandoba-jejuri',
    name: { en: 'Khandoba / Martand Bhairav', hi: 'खंडोबा (जेजुरी)', mr: 'खंडेराया / मल्हारी मार्तंड (जेजुरी)' },
    traditionCategory: 'khandoba',
    primaryShrine: { en: 'Jejuri Khandoba Mandir', hi: 'जेजुरी खंडोबा मंदिर (सोने की जेजुरी)', mr: 'जेजुरी गड, पुणे' },
    district: 'Pune',
    region: 'Western Maharashtra',
    significance: {
      en: 'The supreme Kuldaivat of Maharashtra, celebrated with the showering of turmeric (Bhandara). Avatar of Shiva who defeated demons Mani and Malla.',
      hi: 'महाराष्ट्र के सर्वाधिक जनसमुदाय के कुलदेवता। "यळकोट यळकोट जय मल्हार" व स्वर्ण भंडार से पूजित।',
      mr: 'महाराष्ट्राचे कुलदैवत. "येळकोट येळकोट जय मल्हार" आणि पिवळ्याधमक भंडाऱ्याची उधळण होणारी सोन्याची जेजुरी.'
    },
    traditionalMantra: 'यळकोट यळकोट जय मल्हार • सदानंदाचा येळकोट',
    isKuldaivat: true,
  },
  {
    id: 'bhimashankar-pune',
    name: { en: 'Bhimashankar Jyotirlinga', hi: 'भीमाशंकर ज्योतिर्लिंग', mr: 'श्री भीमाशंकर ज्योतिर्लिंग' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Bhimashankar Mandir', hi: 'भीमाशंकर मंदिर (भीमा नदी उद्गम)', mr: 'भीमाशंकर मंदिर, खेड-पुणे' },
    district: 'Pune',
    region: 'Western Maharashtra',
    significance: {
      en: 'Jyotirlinga set amidst dense Sahyadri Western Ghats forests. Origin of Bhima river and abode of the giant squirrel (Shekru).',
      hi: 'सह्याद्रि के घने वनों में स्थित पावन ज्योतिर्लिंग। भीमा नदी का उद्गम स्थल।',
      mr: 'सह्याद्रीच्या दाट अरण्यात वसलेले पावन ज्योतिर्लिंग. भीमा नदीचे उगमस्थान आणि महाराष्ट्राचा राज्यप्राणी शेकरूचे अभयारण्य.'
    },
    traditionalMantra: 'ॐ नमः शिवाय • ॐ भीमाशंकराय नमः',
    isKuldaivat: false,
  },
  {
    id: 'sant-dnyaneshwar-alandi',
    name: { en: 'Sant Dnyaneshwar Mauli', hi: 'संत ज्ञानेश्वर माउली', mr: 'संत ज्ञानेश्वर माउली (आळंदी)' },
    traditionCategory: 'saints',
    primaryShrine: { en: 'Alandi Sanjeevan Samadhi', hi: 'आळंदी संजीवन समाधि मंदिर', mr: 'संजीवन समाधी मंदिर, आळंदी' },
    district: 'Pune',
    region: 'Western Maharashtra',
    significance: {
      en: 'Author of Bhavartha Dipika (Dnyaneshwari) and Amrutanubhav. Entered Sanjeevan Samadhi at age 21 on the banks of Indrayani.',
      hi: 'भावार्थदीपिका (ज्ञानेश्वरी) के रचयिता। २१ वर्ष की आयु में इंद्रायणी तट पर संजीवन समाधि में प्रविष्ट हुए।',
      mr: 'ज्ञानेश्वरी व अमृतानुभवाचे रचनाकार. वयाच्या अवघ्या २१ व्या वर्षी इंद्रायणी काठी संजीवन समाधी घेतली.'
    },
    traditionalMantra: 'माउली ज्ञानेश्वर महाराज की जय',
    isKuldaivat: false,
  },
  {
    id: 'sant-tukaram-dehu',
    name: { en: 'Jagadguru Sant Tukaram Maharaj', hi: 'संत तुकाराम महाराज', mr: 'जगद्गुरू संत तुकाराम महाराज (देहू)' },
    traditionCategory: 'saints',
    primaryShrine: { en: 'Dehu Gatha Mandir & Vaikunth Gaman', hi: 'देहू गाथा मंदिर', mr: 'गाथा मंदिर व वैकुंठ गमन स्थळ, देहू' },
    district: 'Pune',
    region: 'Western Maharashtra',
    significance: {
      en: 'Supreme Warkari saint poet whose Abhangas define Marathi spirituality, social equality, and pure devotion to Vitthal.',
      hi: 'वारकरी परंपरा के महान संत कवि जिनके अभंग महाराष्ट्र के सामाजिक समरसता व शुद्ध भक्ति के आधार हैं।',
      mr: 'अभंगवाणीने समाज प्रबोधन करणारे जगद्गुरू संत. देहू येथून सदेह वैकुंठ गमन झाल्याची अलौकिक परंपरा.'
    },
    traditionalMantra: 'तुकाराम तुकाराम • ज्ञानोबा माउली तुकाराम',
    isKuldaivat: false,
  },
  {
    id: 'vitthal-pandharpur',
    name: { en: 'Lord Vitthal / Pandurang', hi: 'श्री विट्ठल / पांडुरंग', mr: 'श्री विठ्ठल-रुक्मिणी (पंढरपूर)' },
    traditionCategory: 'vitthal_vishnu',
    primaryShrine: { en: 'Pandharpur Vitthal-Rukmini Mandir', hi: 'पंढरपुर विट्ठल-रुक्मिणी मंदिर', mr: 'विठ्ठल रुक्मिणी मंदिर, पंढरपूर' },
    district: 'Solapur',
    region: 'Western Maharashtra',
    significance: {
      en: 'The soul of Maharashtra’s devotional culture. Stands with arms akimbo on a brick for devotee Pundalik on the banks of Chandrabhaga.',
      hi: 'महाराष्ट्र की भक्ति चेतना के प्राण। भक्त पुंडलिक के लिए चंद्रभागा तट पर ईंट पर कटि पर हाथ रखे खड़े कृपानिधि।',
      mr: 'महाराष्ट्राचे आराध्य दैवत. भक्त पुंडलिकासाठी चंद्रभागेच्या तीरावर विटेवर समचरण उभा असलेला पांडुरंग.'
    },
    traditionalMantra: 'राम कृष्ण हरि • ॐ नमो भगवते वासुदेवाय',
    isKuldaivat: true,
  },
  {
    id: 'swami-samarth-akkalkot',
    name: { en: 'Shri Swami Samarth Maharaj', hi: 'श्री स्वामी समर्थ महाराज (अक्कलकोट)', mr: 'श्री स्वामी समर्थ महाराज (अक्कलकोट)' },
    traditionCategory: 'dattatreya',
    primaryShrine: { en: 'Akkalkot Swami Samarth Vatavruksha Mandir', hi: 'अक्कलकोट वटवृक्ष मंदिर', mr: 'वटवृक्ष मंदिर, अक्कलकोट' },
    district: 'Solapur',
    region: 'Western Maharashtra',
    significance: {
      en: 'Incarnation of Lord Dattatreya who gave the reassuring message to all seekers: "भिऊ नकोस, मी तुझ्या पाठीशी आहे" (Fear not, I am behind you).',
      hi: 'भगवान दत्तात्रेय के साक्षात अवतार। जिन्होंने अभय वचन दिया: "डरो मत, मैं सदैव तुम्हारे साथ हूँ।"',
      mr: 'दत्तात्रेयांचे साक्षात अवतार. ज्यांनी "भिऊ नकोस, मी तुझ्या पाठीशी आहे" हा अभयमंत्र भक्तांच्या अंतःकरणात रुजवला.'
    },
    traditionalMantra: 'श्री स्वामी समर्थ जय जय स्वामी समर्थ',
    isKuldaivat: true,
  },
  {
    id: 'siddheshwar-solapur',
    name: { en: 'Siddheshwar Mandir (Solapur)', hi: 'सिद्धेश्वर मंदिर (सोलापुर)', mr: 'श्री सिद्धेश्वर मंदिर (सोलापूर)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Solapur Lake Siddheshwar Temple', hi: 'सोलापुर झील सिद्धेश्वर मंदिर', mr: 'सिद्धेश्वर मंदिर, सोलापूर तलाव' },
    district: 'Solapur',
    region: 'Western Maharashtra',
    significance: {
      en: 'Consecrated by the 12th-century Lingayat saint Shri Siddharameshwar. Famous for the grand Makar Sankranti Gadda Yatra with sacred Nandi poles.',
      hi: '१२वीं सदी के सिद्ध योगी सिद्धरामेश्वर की तपोभूमि। मकर संक्रांति पर भव्य गड्डा यात्रा (नंदी ध्वज मेला)।',
      mr: '१२ व्या शतकातील शिवयोगी सिद्धरामेश्वरांचे पावन देवस्थान. मकर संक्रांतीला भरणारी भव्य गड्डा यात्रा आणि नंदीध्वज मिरवणूक.'
    },
    traditionalMantra: 'ॐ नमः शिवाय • हर हर महादेव',
    isKuldaivat: true,
  },
  {
    id: 'mahalakshmi-ambabai-kolhapur',
    name: { en: 'Mahalakshmi (Ambabai)', hi: 'आई महालक्ष्मी (अम्बाबाबाई)', mr: 'आई महालक्ष्मी / अंबाबाई (कोल्हापूर)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Kolhapur Mahalakshmi Mandir', hi: 'कोल्हापुर महालक्ष्मी मंदिर', mr: 'श्री महालक्ष्मी मंदिर, कोल्हापूर' },
    district: 'Kolhapur',
    region: 'Western Maharashtra',
    significance: {
      en: 'Complete Shaktipeeth (Karveer Nivasini). Sun rays touch the feet of the deity directly twice a year (Kiranotsav).',
      hi: 'करवीर निवासिनी पूर्ण शक्तिपीठ। वर्ष में दो बार सूर्य की किरणें सीधे गर्भगृह में माता के श्रीचरणों को स्पर्श करती हैं।',
      mr: 'करवीर निवासिनी पूर्ण शक्तिपीठ. वर्षातून दोनदा थेट सूर्यकिरणे देवीच्या मूर्तीवर पडण्याचा अलौकिक किरणोत्सव.'
    },
    traditionalMantra: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
    isKuldaivat: true,
  },
  {
    id: 'jyotiba-wadi-ratnagiri',
    name: { en: 'Jyotiba (Kedarling)', hi: 'ज्योतिबा (केदारलिंग)', mr: 'श्री जोतिबा (वाडी रत्नागिरी, कोल्हापूर)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Wadi Ratnagiri Jyotiba Mandir', hi: 'ज्योतिबा मंदिर, कोल्हापुर', mr: 'जोतिबा देवस्थान, वाडी रत्नागिरी' },
    district: 'Kolhapur',
    region: 'Western Maharashtra',
    significance: {
      en: 'Incarnation of Brahma, Vishnu, and Maheshwar combined (Kedarling). Celebrated with pink gulal and massive sacred poles (Sasans).',
      hi: 'ब्रह्मा, विष्णु, महेश के तेज स्वरूप केदारलिंग। चैत्र पूर्णिमा पर लाखों की संख्या में सासन काठी का महामेला।',
      mr: 'ब्रह्मा, विष्णू, महेशांचे एकत्रित तेज असलेले केदारलिंग. गुलालाची मुक्त उधळण आणि भव्य सासनकाठ्यांचे देवस्थान.'
    },
    traditionalMantra: 'चांगभलं चांगभलं जोतिबाच्या नावानं चांगभलं',
    isKuldaivat: true,
  },
  {
    id: 'narsobawadi-dattatreya',
    name: { en: 'Nrusinhawadi (Narsobawadi Datta Peetha)', hi: 'नृसिंहवाडी दत्त क्षेत्र', mr: 'नृसिंहवाडी (नरसोबाची वाडी)' },
    traditionCategory: 'dattatreya',
    primaryShrine: { en: 'Narsobawadi Datta Paduka Mandir', hi: 'कृष्णा-पंचगंगा संगम दत्त पादुका मंदिर', mr: 'कृष्णा-पंचगंगा संगम, नरसोबावाडी' },
    district: 'Kolhapur',
    region: 'Western Maharashtra',
    significance: {
      en: 'Second incarnation of Lord Dattatreya, Shri Nrusinha Saraswati Swami, meditated here for 12 years under an Audumbar tree at the sacred confluence.',
      hi: 'दत्तात्रेय के द्वितीय अवतार श्री नृसिंह सरस्वती की १२ वर्ष की तपोभूमि। कृष्णा-पंचगंगा के पावन संगम पर स्थित पादुका तीर्थ।',
      mr: 'श्रीपाद श्रीवल्लभ यांच्यानंतरचे दुसरे दत्तावतार श्री नृसिंह सरस्वती यांची १२ वर्षांची तपोभूमी. कृष्णा-पंचगंगा संगमावरील जागृत पादुका.'
    },
    traditionalMantra: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा',
    isKuldaivat: true,
  },
  {
    id: 'kalubai-mandhradevi',
    name: { en: 'Kalubai (Kaleshwari)', hi: 'काळुबाई (मांढरदेवी)', mr: 'आई काळूबाई (मांढरदेवी, वाई)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Mandhradevi Kalubai Temple', hi: 'मांढरदेवी काळुबाई मंदिर', mr: 'काळूबाई मंदिर, मांढरदेव (वाई)' },
    district: 'Satara',
    region: 'Western Maharashtra',
    significance: {
      en: 'High hilltop shrine overlooking the Krishna valley. Fierce protector against demonic energies and revered Kuldevi across rural Maharashtra.',
      hi: 'सतारा के मांढरगढ़ पर्वत शिखर पर स्थित। नकारात्मक ऊर्जा व विघ्नों से रक्षा करने वाली जागृत कुलदेवी।',
      mr: 'वाई तालुक्यातील मांढरगडावर वसलेली अत्यंत जागृत आणि लाखो भाविकांचे श्रद्धास्थान असलेली देवी.'
    },
    traditionalMantra: 'आई काळूबाईच्या नावानं चांगभलं',
    isKuldaivat: true,
  },
  {
    id: 'shikhar-shinganapur-shiva',
    name: { en: 'Shikhar Shinganapur Mahadev', hi: 'शिखर शिंगणापुर महादेव', mr: 'शिखर शिंगणापूर शंभू महादेव' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Shikhar Shinganapur Temple', hi: 'शिखर शिंगणापुर मंदिर', mr: 'शिखर शिंगणापूर, माण-सातारा' },
    district: 'Satara',
    region: 'Western Maharashtra',
    significance: {
      en: 'The Kuldaivat of the historic Bhosale Maratha royal dynasty, including Chhatrapati Shivaji Maharaj. Perched high on a rocky plateau.',
      hi: 'छत्रपति शिवाजी महाराज के भोसले वंश के कुलदेवता। दुर्गम पहाड़ी शिखर पर स्थित प्राचीन स्वयंभू शिवलिंग।',
      mr: 'छत्रपती शिवाजी महाराजांच्या भोसले घराण्याचे कुलदैवत. उंच शिखरावर वसलेले अत्यंत जागृत शंभू महादेवांचे स्थान.'
    },
    traditionalMantra: 'हर हर महादेव • शंभू महादेव प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'audumbar-sangli',
    name: { en: 'Audumbar Datta Kshetra', hi: 'औदुंबर दत्त क्षेत्र', mr: 'श्री क्षेत्र औदुंबर' },
    traditionCategory: 'dattatreya',
    primaryShrine: { en: 'Audumbar Temple on Krishna River', hi: 'कृष्णा तट औदुंबर मंदिर', mr: 'औदुंबर मंदिर, तासगाव-सांगली' },
    district: 'Sangli',
    region: 'Western Maharashtra',
    significance: {
      en: 'Peaceful Datta sanctuary on the shaded banks of the Krishna River, associated with Sage Bhuvaneshwar and Nrusinha Saraswati.',
      hi: 'कृष्णा नदी के पावन तट पर औदुंबर वृक्षों की शीतल छाया में स्थित ध्यान व शांति का प्रमुख केंद्र।',
      mr: 'कृष्णा नदीच्या शांत काठावर औदुंबराच्या सावलीत वसलेले दत्त भक्तांचे परम शांत तीर्थक्षेत्र.'
    },
    traditionalMantra: 'गुरुदेव दत्त • ॐ नमो भगवते दत्तात्रेयाय',
    isKuldaivat: true,
  },
  {
    id: 'battis-shirala-nagoba',
    name: { en: 'Battis Shirala (Nag Devata)', hi: 'बत्तीस शिराळा (नागोबा)', mr: 'बत्तीस शिराळा (नागदेवता)' },
    traditionCategory: 'gramdevata',
    primaryShrine: { en: 'Shirala Nag Mandir', hi: 'शिराळा नाग मंदिर', mr: 'नागोबा मंदिर, बत्तीस शिराळा' },
    district: 'Sangli',
    region: 'Western Maharashtra',
    significance: {
      en: 'World-famous for the peaceful Nag Panchami festival where live cobras were traditionally revered without harming them, demonstrating harmony with nature.',
      hi: 'नागपंचमी पर सजीव सर्प पूजा की सदियों पुरानी परंपरा। प्रकृति व जीवमात्र के प्रति अहिंसा का पावन संदेश।',
      mr: 'नागपंचमीच्या दिवशी जिवंत नागांची पूजा करण्याची जगप्रसिद्ध परंपरा असलेले ऐतिहासिक गाव.'
    },
    traditionalMantra: 'ॐ नवकुलाय नमः • श्री नागदेवता प्रसन्न',
    isKuldaivat: false,
  },

  // ==========================================
  // MARATHWADA (मराठवाडा)
  // ==========================================
  {
    id: 'tulja-bhavani-tuljapur',
    name: { en: 'Tulja Bhavani Mata', hi: 'आई तुलजा भवानी', mr: 'आई तुळजाभवानी (तुळजापूर)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Tuljapur Bhavani Mandir', hi: 'तुलजापुर भवानी मंदिर', mr: 'श्री तुळजाभवानी मंदिर, तुळजापूर' },
    district: 'Dharashiv',
    region: 'Marathwada',
    significance: {
      en: 'Complete Shaktipeeth. The Kulswamini of Chhatrapati Shivaji Maharaj and millions of households across Maharashtra.',
      hi: 'महाराष्ट्र की पूर्ण शक्तिपीठ। छत्रपति शिवाजी महाराज की कुलस्वामिनी जिन्होंने उन्हें भवानी तलवार का आशीष दिया।',
      mr: 'महाराष्ट्राचे प्रमुख पूर्ण शक्तिपीठ. छत्रपती शिवाजी महाराजांचे कुलदैवत आणि महाराष्ट्राची कुलस्वामिनी.'
    },
    traditionalMantra: 'ॐ श्री तुलजाभवानी देव्यै नमः • आई उदो उदो',
    isKuldaivat: true,
  },
  {
    id: 'grishneshwar-sambhajinagar',
    name: { en: 'Grishneshwar Jyotirlinga', hi: 'घृष्णेश्वर ज्योतिर्लिंग', mr: 'श्री घृष्णेश्वर ज्योतिर्लिंग (वेरूळ)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Grishneshwar Mandir, Ellora', hi: 'घृष्णेश्वर मंदिर (एलोरा गुफाओं के पास)', mr: 'घृष्णेश्वर मंदिर, वेरूळ' },
    district: 'Chhatrapati Sambhajinagar',
    region: 'Marathwada',
    significance: {
      en: 'The 12th and final Jyotirlinga of India, restored by Punyashlok Rajmata Ahilyabai Holkar. Located adjacent to the UNESCO Ellora Caves.',
      hi: 'भारत का १२वाँ व अंतिम ज्योतिर्लिंग। पुण्यश्लोक अहिल्याबाई होळकर द्वारा पुनर्निर्मित पावन धाम।',
      mr: 'भारतातील १२ वे अंतिम ज्योतिर्लिंग. पुण्यश्लोक अहिल्यादेवी होळकरांनी पुनर्बांधणी केलेले, वेरूळ लेण्यांशेजारील पवित्र क्षेत्र.'
    },
    traditionalMantra: 'ॐ घृष्णेश्वराय नमः',
    isKuldaivat: false,
  },
  {
    id: 'bhadra-maruti-khuldabad',
    name: { en: 'Bhadra Maruti (Khuldabad)', hi: 'भद्रा मारुति (खुलताबाद)', mr: 'श्री भद्रा मारुती (खुलताबाद)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Khuldabad Bhadra Maruti Mandir', hi: 'खुलताबाद भद्रा मारुति मंदिर', mr: 'भद्रा मारुती मंदिर, खुलताबाद' },
    district: 'Chhatrapati Sambhajinagar',
    region: 'Marathwada',
    significance: {
      en: 'One of only two shrines in India with Hanuman depicted in Bhavasamadhi reclining (sleeping) posture. He rested here listening to King Bhadrasena singing Rama’s praises.',
      hi: 'भारत में केवल दो मंदिरों में से एक जहाँ हनुमान जी निद्रामग्न (शयन मुद्रा) में विश्राम कर रहे हैं।',
      mr: 'भारतातील दुर्मीळ निद्रिस्त (झोपलेल्या) मुद्रेतील मारुतीरायांची मूर्ती. राजा भद्रसेनचे रामभजन ऐकताना हनुमंत येथे तल्लीन झाले होते.'
    },
    traditionalMantra: 'ॐ भद्र मारुतये नमः • जय श्रीराम',
    isKuldaivat: false,
  },
  {
    id: 'renuka-mata-mahur',
    name: { en: 'Renuka Mata', hi: 'माता रेणुका (माहूर)', mr: 'माता रेणुकादेवी (माहूर)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Mahurgad Renuka Mandir', hi: 'माहूरगढ़ रेणुका मंदिर', mr: 'श्री रेणुकामाता मंदिर, माहूरगड' },
    district: 'Nanded',
    region: 'Marathwada',
    significance: {
      en: 'Complete Shaktipeeth. Mother of Lord Parashurama; located amidst the Sahyadri hilltops where Dattatreya rests.',
      hi: 'पूर्ण शक्तिपीठ। भगवान परशुराम की पावन माता। यहाँ माता के केवल मुख विग्रह का दर्शन होता है।',
      mr: 'पूर्ण शक्तिपीठ. भगवान परशुरामांची जन्मदात्री माता. माहूरगडावर देवीच्या केवळ तांदळा (मुख) रूपाची पूजा होते.'
    },
    traditionalMantra: 'ॐ श्री रेणुका देव्यै नमः',
    isKuldaivat: true,
  },
  {
    id: 'parli-vaijnath-beed',
    name: { en: 'Parli Vaijnath Jyotirlinga', hi: 'परली वैजनाथ ज्योतिर्लिंग', mr: 'श्री परळी वैजनाथ ज्योतिर्लिंग' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Parli Vaijnath Temple on Meru Parvat', hi: 'परली वैद्यनाथ मंदिर', mr: 'वैद्यनाथ मंदिर, परळी-बीड' },
    district: 'Beed',
    region: 'Marathwada',
    significance: {
      en: 'One of the 12 Jyotirlingas, revered as Vaidyanath (the Supreme Cosmic Healer). Ravana rested the Shiva linga here while returning from Kailash.',
      hi: 'द्वादश ज्योतिर्लिंगों में से एक। भगवान शिव "वैद्यनाथ" (समस्त रोगों के महा-चिकित्सक) रूप में पूजित।',
      mr: '१२ ज्योतिर्लिंगांपैकी एक. सर्व रोगांचे निवारण करणारे "वैद्यनाथ" म्हणून प्रसिद्ध. रावण कैलासावरून लिंग नेताना येथे थांबला होता.'
    },
    traditionalMantra: 'ॐ वैद्यनाथाय नमः',
    isKuldaivat: false,
  },
  {
    id: 'aundha-nagnath-hingoli',
    name: { en: 'Aundha Nagnath Jyotirlinga', hi: 'औंढा नागनाथ ज्योतिर्लिंग', mr: 'श्री औंढा नागनाथ ज्योतिर्लिंग' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Aundha Nagnath Temple', hi: 'औंढा नागनाथ मंदिर', mr: 'नागनाथ मंदिर, औंढा-हिंगोली' },
    district: 'Hingoli',
    region: 'Marathwada',
    significance: {
      en: 'The 8th Jyotirlinga of India, built by Yudhishthira during the Pandavas\' forest exile. Saint Namdev sang kirtans here, and the entire temple miraculously turned to face him.',
      hi: 'भारत का आठवाँ ज्योतिर्लिंग। संत नामदेव के कीर्तन पर जब पुजारियों ने रोका, तो संपूर्ण मंदिर स्वयं नामदेव जी की ओर घूम गया था।',
      mr: 'भारतातील ८ वे ज्योतिर्लिंग. संत नामदेवांच्या कीर्तनाला गर्दी झाल्यावर मंदिराने स्वतः नामदेवांकडे मुख फिरवले असा अलौकिक इतिहास.'
    },
    traditionalMantra: 'ॐ नागनाथाय नमः',
    isKuldaivat: false,
  },
  {
    id: 'matsyodari-devi-jalna',
    name: { en: 'Matsyodari Devi (Ambad)', hi: 'मत्स्योदरी देवी (अंबड)', mr: 'मत्स्योदरी देवी (अंबड, जालना)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Ambad Matsyodari Hill Temple', hi: 'अंबड मत्स्योदरी मंदिर', mr: 'मत्स्योदरी टेकडी मंदिर, अंबड' },
    district: 'Jalna',
    region: 'Marathwada',
    significance: {
      en: 'The temple is situated on a hill shaped like a fish (Matsya). Celebrated during Navratri across Marathwada as an ancient Jagrut Shakti shrine.',
      hi: 'मछली के आकार की पहाड़ी पर स्थित। मराठवाड़ा की अत्यंत प्राचीन व जाग्रत शक्तिपीठ।',
      mr: 'माशाच्या आकाराच्या टेकडीवर वसलेले अत्यंत प्राचीन व जागृत देवीचे मंदिर.'
    },
    traditionalMantra: 'ॐ मत्स्योदरी देव्यै नमः',
    isKuldaivat: true,
  },
  {
    id: 'nilkantheshwar-latur',
    name: { en: 'Nilkantheshwar (Nilanga)', hi: 'नीलकंठेश्वर (निलंगा)', mr: 'श्री नीलकंठेश्वर (निलंगा)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Nilanga Hemadpanthi Shiva Mandir', hi: 'निलंगा प्राचीन शिव मंदिर', mr: 'नीलकंठेश्वर मंदिर, निलंगा-लातूर' },
    district: 'Latur',
    region: 'Marathwada',
    significance: {
      en: 'Masterpiece of Hemadpanthi and Chalukyan stone architecture with intricately carved dancing apsaras, elephants, and a deep, tranquil underground sanctum.',
      hi: 'चालुक्य एवं हेमाडपंथी स्थापत्य कला का अनुपम संगम। गर्भगृह में शांत शीतल स्वयंभू शिवलिंग।',
      mr: 'चालुक्य व हेमाडपंथी स्थापत्याचा अप्रतिम नमुना. गर्भगृहात खोलवर वसलेला शांत स्वयंभू शिवलिंग.'
    },
    traditionalMantra: 'ॐ नीलकंठाय नमः',
    isKuldaivat: false,
  },
  {
    id: 'sant-janabai-gangakhed',
    name: { en: 'Sant Janabai Sansthan', hi: 'संत जनाबाई (गंगाखेड)', mr: 'संत जनाबाई समाधी मंदिर (गंगाखेड)' },
    traditionCategory: 'saints',
    primaryShrine: { en: 'Godavari banks Gangakhed Mandir', hi: 'गंगाखेड जनाबाई मंदिर', mr: 'गोदावरी काठ, गंगाखेड-परभणी' },
    district: 'Parbhani',
    region: 'Marathwada',
    significance: {
      en: 'Birthplace and samadhi of Warkari saint poetess Janabai. Her abhangas celebrate how Lord Vitthal personally assisted her in sweeping, cooking, and grinding grain.',
      hi: 'वारकरी संत जनाबाई की पावन भूमि। जिनके प्रेम में स्वयं विट्ठल झाड़ू लगाने और अनाज पीसने आते थे।',
      mr: 'संत कवयित्री जनाबाईंचे पावन तीर्थक्षेत्र. ज्यांच्या भक्तीत साक्षात पांडुरंग दळण दळायला आणि झाडलोट करायला धावून आले.'
    },
    traditionalMantra: 'विठ्ठल विठ्ठल गजर नामाचा',
    isKuldaivat: false,
  },

  // ==========================================
  // KONKAN (कोकण)
  // ==========================================
  {
    id: 'ballaleshwar-pali',
    name: { en: 'Ballaleshwar (Pali)', hi: 'बल्लाळेश्वर (पाली)', mr: 'श्री बल्लाळेश्वर (पाली)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Pali Ballaleshwar Temple', hi: 'पाली बल्लाळेश्वर मंदिर', mr: 'बल्लाळेश्वर मंदिर, पाली' },
    district: 'Raigad',
    region: 'Konkan',
    significance: {
      en: 'The only Ganesha named after his earnest child devotee Ballala. Demonstrates God’s love for sincere, unshakeable devotion.',
      hi: 'एकमात्र गणपति जिनका नाम उनके बाल भक्त बल्लाळ के नाम पर है। सच्ची भक्ति का सर्वोच्च प्रमाण।',
      mr: 'आपल्या निस्सीम बालभक्त बल्लाळाच्या नावाने ओळखले जाणारे एकमेव अष्टविनायक देवस्थान.'
    },
    traditionalMantra: 'ॐ नमो बल्लाळेश्वराय नमः',
    isKuldaivat: false,
  },
  {
    id: 'varadvinayak-mahad',
    name: { en: 'Varadvinayak (Mahad)', hi: 'वरदविनायक (महाड)', mr: 'श्री वरदविनायक (महड/महाड)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Mahad Varadvinayak Mandir', hi: 'महाड वरदविनायक मंदिर', mr: 'वरदविनायक मंदिर, महड-रायगड' },
    district: 'Raigad',
    region: 'Konkan',
    significance: {
      en: 'Ashtavinayak shrine where the holy Nandadeep lamp has been burning continuously since 1892. Devotees may enter the sanctum directly.',
      hi: 'अष्टविनायक तीर्थ जहाँ सन् १८९२ से नंदादीप अखंड जल रहा है। भक्त स्वयं गर्भगृह में चरण छू सकते हैं।',
      mr: '१८९२ सालापासून अखंड नंदादीप तेवत असणारे अष्टविनायक तीर्थ. भाविकांना गर्भगृहात जाऊन चरणस्पर्श करण्याची मुभा.'
    },
    traditionalMantra: 'ॐ वरदविनायकाय नमः',
    isKuldaivat: false,
  },
  {
    id: 'harihareshwar-raigad',
    name: { en: 'Harihareshwar (Dakshin Kashi)', hi: 'हरिहरेश्वर (दक्षिण काशी)', mr: 'श्री क्षेत्र हरिहरेश्वर (दक्षिण काशी)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Harihareshwar Arabian Sea Temple', hi: 'हरिहरेश्वर समुद्र तट मंदिर', mr: 'हरिहरेश्वर मंदिर व प्रदक्षिणा मार्ग, रायगड' },
    district: 'Raigad',
    region: 'Konkan',
    significance: {
      en: 'Surrounded by four holy hills: Harihareshwar, Harshinachal, Bramhadri, and Pushpadri. Famous for the dramatic seaside pradakshina path carved through cliff rocks.',
      hi: 'दक्षिण काशी के रूप में विख्यात। चार पर्वत शिखरों और अरब सागर की लहरों के मध्य समुद्र तटीय शैल प्रदक्षिणा मार्ग।',
      mr: 'दक्षिण काशी म्हणून प्रसिद्ध. चार टेकड्यांच्या कुशीत आणि समुद्राच्या लाटांच्या साक्षीने खडकातून जाणारा विलोभनीय प्रदक्षिणा मार्ग.'
    },
    traditionalMantra: 'ॐ हरिहराय नमः • ॐ नमः शिवाय',
    isKuldaivat: true,
  },
  {
    id: 'ganpatipule-ratnagiri',
    name: { en: 'Ganpatipule (Swayambhu Ganpati)', hi: 'गणपतिपुळे (स्वयंभू गणपति)', mr: 'श्री स्वयंभू गणपती (गणपतीपुळे)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Ganpatipule Beach Temple', hi: 'गणपतिपुळे समुद्र तट मंदिर', mr: 'गणपतीपुळे समुद्रकिनारा, रत्नागिरी' },
    district: 'Ratnagiri',
    region: 'Konkan',
    significance: {
      en: '400-year-old self-manifested monolith idol on clean white sands facing west (Paschim Dwar Devata), guarding the Konkan coast. The entire hill is circumambulated.',
      hi: 'अरब सागर के तट पर ४०० वर्ष पुराना पश्चिममुखी स्वयंभू गणेश विग्रह। संपूर्ण पहाड़ी की परिक्रमा की जाती है।',
      mr: 'कोकणच्या रुपेरी वाळूत पश्चिमाभिमुख असलेला ४०० वर्षे जुना स्वयंभू गणपती. संपूर्ण टेकडीची प्रदक्षिणा घातली जाते.'
    },
    traditionalMantra: 'ॐ गं गणपतये नमः • पश्चिम द्वार देवता प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'marleshwar-ratnagiri',
    name: { en: 'Marleshwar (Cave Shiva & Dhareshwar)', hi: 'मार्लेश्वर (गुफा शिव मंदिर)', mr: 'श्री मार्लेश्वर (गुहा व धोध, संगमेश्वर)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Marleshwar Cave Temple', hi: 'मार्लेश्वर गुफा व जलप्रपात', mr: 'मार्लेश्वर गुहा मंदिर, देवरुख-रत्नागिरी' },
    district: 'Ratnagiri',
    region: 'Konkan',
    significance: {
      en: 'Shiva temple situated deep inside a natural cave with venomous cobras that live harmoniously with priests, set against the roaring Dhareshwar waterfall.',
      hi: 'प्राकृतिक गुफा में स्थित जहाँ सर्प बिना किसी को हानि पहुँचाए विचरण करते हैं। समीप ही भव्य धारेश्वर जलप्रपात है।',
      mr: 'नैसर्गिक गुहेमध्ये वसलेले शिवलिंग, जिथे शांतपणे वावरणारे नाग कोणालाही इजा करत नाहीत. शेजारीच कोसळणारा धारेश्वर धबधबा.'
    },
    traditionalMantra: 'ॐ नमः शिवाय • मार्लेश्वर प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'kunkeshwar-sindhudurg',
    name: { en: 'Kunkeshwar (Konkan Kashi)', hi: 'कुणकेश्वर (कोंकण काशी)', mr: 'श्री कुणकेश्वर मंदिर (देवगड)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Kunkeshwar Shore Temple', hi: 'कुणकेश्वर समुद्र तट मंदिर', mr: 'कुणकेश्वर समुद्रकिनारा, देवगड-सिंधुदुर्ग' },
    district: 'Sindhudurg',
    region: 'Konkan',
    significance: {
      en: 'Magnificent shoreline Shiva temple constructed in 1100 CE by Yadava rulers. Famous for being saved by a foreign merchant whose ship survived a cyclone.',
      hi: 'सन् ११०० में निर्मित। अरब सागर के तट पर विशाल मंदिर, जिसे कोंकण की काशी कहा जाता है।',
      mr: '११०० सालातील यादवकालीन भव्य मंदिर. समुद्राच्या लाटा थेट मंदिराच्या पायऱ्यांना स्पर्श करतात, याला कोकणची काशी म्हणतात.'
    },
    traditionalMantra: 'ॐ कुणकेश्वराय नमः • हर हर महादेव',
    isKuldaivat: true,
  },
  {
    id: 'vetal-devata',
    name: { en: 'Vetal / Vetoba', hi: 'वेताळ / वेतोबा (कोकण)', mr: 'वेतोबा / वेताळ (आरवली, कोकण)' },
    traditionCategory: 'gramdevata',
    primaryShrine: { en: 'Aravoli Vetoba Mandir, Vengurla', hi: 'आरवली वेतोबा मंदिर (वेंगुर्ला, सिंधुदुर्ग)', mr: 'वेतोबा मंदिर, आरवली (वेंगुर्ला, सिंधुदुर्ग)' },
    district: 'Sindhudurg',
    region: 'Konkan',
    significance: {
      en: 'The king of spirits worshipped as a benevolent night-watchman guardian. Devotees offer giant handmade leather footwear (Chappals) as he patrols village borders at night.',
      hi: 'कोंकण का अत्यंत जागृत रक्षक देव। मान्यता है कि वे रात्रि में गांव की पहरेदारी करते हैं, अतः उन्हें चमड़े के कोल्हापुरी जूते अर्पित किए जाते हैं।',
      mr: 'कोकणातील आरवलीचा जागृत वेतोबा. रात्री गावाची राखण करतो अशी श्रद्धा असल्याने भाविक त्याला मोठ्या आकाराच्या चामडी चपलांचा जोडा अर्पण करतात.'
    },
    traditionalMantra: 'श्री देव वेतोबा प्रसन्न',
    isKuldaivat: false,
  },
  {
    id: 'mumbadevi-mumbai',
    name: { en: 'Mumbadevi Mata', hi: 'मुंबादेवी माता', mr: 'आई मुंबादेवी (मुंबईची ग्रामदेवता)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Bhuleshwar Mumbadevi Mandir', hi: 'भुलेश्वर मुंबादेवी मंदिर', mr: 'मुंबादेवी मंदिर, भुलेश्वर-मुंबई' },
    district: 'Mumbai City',
    region: 'Konkan',
    significance: {
      en: 'The 500-year-old patron goddess from whom the metropolis of Mumbai derives its very name ("Mumba" + "Aai"). The Kuldevi of Koli fishermen.',
      hi: 'मुंबई महानगर को अपना पावन नाम ("मुंबा" + "आई") देने वाली ५०० वर्ष पुरानी अधिष्ठात्री ग्रामदेवी।',
      mr: 'मुंबई शहराला नाव देणारी ("मुंबा" + "आई" = मुंबई) ५०० वर्षांची प्राचीन अधिष्ठात्री देवी आणि कोळी बांधवांची कुलस्वामिनी.'
    },
    traditionalMantra: 'ॐ मुम्बादेव्यै नमः • आई मुंबादेवी प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'siddhivinayak-prabhadevi',
    name: { en: 'Siddhivinayak (Prabhadevi)', hi: 'सिद्धिविनायक (प्रभादेवी)', mr: 'श्री सिद्धिविनायक (प्रभादेवी, मुंबई)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Prabhadevi Siddhivinayak Mandir', hi: 'प्रभादेवी सिद्धिविनायक मंदिर', mr: 'सिद्धिविनायक मंदिर, प्रभादेवी' },
    district: 'Mumbai Suburban',
    region: 'Konkan',
    significance: {
      en: 'Consecrated in 1801 CE by Deubai Patil. World-famous wish-fulfilling deity with right-turned trunk, visited by millions weekly.',
      hi: '१८०१ में स्थापित। दाहिनी सूंड़ वाले नवसाला पावणारे सिद्धिविनायक, जिनके दर्शन हेतु देश-विदेश से श्रद्धालु आते हैं।',
      mr: '१८०१ मध्ये देऊबाई पाटील यांनी बांधलेले नवसाला पावणारे विश्वप्रसिद्ध देवस्थान. उजव्या सोंडेचा सुवर्ण कळस असलेले मंदिर.'
    },
    traditionalMantra: 'ॐ गं गणपतये नमः • सिद्धिविनायक नमो नमः',
    isKuldaivat: false,
  },
  {
    id: 'vajreshwari-palghar',
    name: { en: 'Vajreshwari Devi & Ganeshpuri', hi: 'वज्रेश्वरी देवी एवं गणेशपुरी', mr: 'आई वज्रेश्वरी व गणेशपुरी (पालघर)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Vajreshwari Fort Temple', hi: 'वज्रेश्वरी किला मंदिर व गर्म जल कुण्ड', mr: 'वज्रेश्वरी गड व गरम पाण्याचे कुंड' },
    district: 'Palghar',
    region: 'Konkan',
    significance: {
      en: 'Fierce aspect of Parvati who wields Indra\'s thunderbolt (Vajra) to slay demon Kalikut. Famous for natural medicinal hot sulphur water springs (Kundas).',
      hi: 'इंद्र के वज्र को धारण करने वाली पराक्रमी देवी। मंदिर के समीप औषधीय प्राकृतिक गर्म जल के पवित्र कुंड स्थित हैं।',
      mr: 'इंद्राचे वज्र धारण करून दैत्याचा संहार करणारी वज्रेश्वरी. परिसरात औषधी गुणधर्म असलेले नैसर्गिक गरम पाण्याचे कुंड आहेत.'
    },
    traditionalMantra: 'ॐ वज्रेश्वर्यै नमः • आई वज्रेश्वरी प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'ambarnath-shiva-thane',
    name: { en: 'Ambarnath Shiva Temple', hi: 'अंबरनाथ शिव मंदिर', mr: 'अंबरनाथ प्राचीन शिव मंदिर (ठाणे)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Ambarnath 11th Century Temple', hi: 'अंबरनाथ वालधुनी नदी तट मंदिर', mr: 'प्राचीन शिव मंदिर, अंबरनाथ' },
    district: 'Thane',
    region: 'Konkan',
    significance: {
      en: 'Built in 1060 CE by the Silhara dynasty. A national monument of extraordinary Hemadpanthi rock carvings, with an underground linga submerged in spring water.',
      hi: 'सन् १०६० में शिलाहार राजाओं द्वारा निर्मित। अद्वितीय पत्थर की नक्काशी व भूमिगत जलमग्न शिवलिंग।',
      mr: 'इ.स. १०६० मधील शिलाहार राजांच्या काळातील अप्रतिम कोरीव दगडी मंदिर. गर्भगृहात भूगर्भातील झऱ्याच्या पाण्यात शिवलिंग असते.'
    },
    traditionalMantra: 'ॐ नमः शिवाय • अंबरनाथाय नमः',
    isKuldaivat: false,
  },

  // ==========================================
  // NORTH MAHARASHTRA / KHANDESH (उत्तर महाराष्ट्र)
  // ==========================================
  {
    id: 'trimbakeshwar-nashik',
    name: { en: 'Trimbakeshwar Jyotirlinga', hi: 'त्र्यंबकेश्वर ज्योतिर्लिंग', mr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Trimbakeshwar Mandir', hi: 'त्र्यंबकेश्वर मंदिर (गोदावरी उद्गम)', mr: 'त्र्यंबकेश्वर मंदिर, नाशिक' },
    district: 'Nashik',
    region: 'North Maharashtra',
    significance: {
      en: 'One of the 12 sacred Jyotirlingas. Unique three-faced linga representing Brahma, Vishnu, and Rudra; origin of the sacred Godavari River.',
      hi: 'द्वादश ज्योतिर्लिंगों में से एक। त्रिदेव (ब्रह्मा, विष्णु, रुद्र) का त्रिमूर्ति शिवलिंग एवं दक्षिण गंगा गोदावरी का उद्गम।',
      mr: '१२ ज्योतिर्लिंगांपैकी एक. ब्रह्मा, विष्णू आणि महेश या तिन्ही देवांची तीन मुखे असलेला अनोखा लिंग. पवित्र गोदावरीचे उगमस्थान.'
    },
    traditionalMantra: 'ॐ त्र्यंबकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
    isKuldaivat: false,
  },
  {
    id: 'saptashrungi-vani',
    name: { en: 'Saptashrungi Nivasini', hi: 'सप्तशृंगी देवी (वणी)', mr: 'सप्तशृंगी निवासिनी (वणी)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Saptashrungi Gad Temple', hi: 'सप्तशृंगी गढ़ मंदिर, वणी', mr: 'सप्तशृंग गड, वणी-नाशिक' },
    district: 'Nashik',
    region: 'North Maharashtra',
    significance: {
      en: 'The Half (Ardh) Shaktipeeth completing Maharashtra’s 3.5 Shaktipeethas. 8-foot-tall murti carved with 18 arms in a cliff cave.',
      hi: 'महाराष्ट्र के साढ़े तीन शक्तिपीठों की अर्ध पीठ। सात पर्वतों के मध्य १८ भुजाओं वाली महिषासुरमर्दिनी।',
      mr: 'साडेतीन शक्तिपीठांपैकी अर्धे शक्तिपीठ. सात शिखरांच्या कुशीत गुहेमध्ये १८ हातांची भव्य स्वयंभू मूर्ती.'
    },
    traditionalMantra: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
    isKuldaivat: true,
  },
  {
    id: 'kalaram-mandir-nashik',
    name: { en: 'Kalaram Mandir (Panchavati)', hi: 'कालाराम मंदिर (पंचवटी)', mr: 'श्री काळाराम मंदिर (पंचवटी, नाशिक)' },
    traditionCategory: 'vitthal_vishnu',
    primaryShrine: { en: 'Panchavati Kalaram Temple', hi: 'पंचवटी कालाराम मंदिर', mr: 'काळाराम मंदिर, पंचवटी' },
    district: 'Nashik',
    region: 'North Maharashtra',
    significance: {
      en: 'Built in 1782 from solid black stone. Lord Rama, Sita, and Lakshmana lived in this Panchavati grove during their 14-year exile.',
      hi: '१७८२ में काले पत्थरों से निर्मित। त्रेतायुग में श्रीराम ने अपने वनवास का समय इसी पावन पंचवटी में व्यतीत किया था।',
      mr: 'काळ्या पाषाणात बांधलेले भव्य मंदिर. वनवास काळात प्रभू श्रीराम, सीता व लक्ष्मण पंचवटीत राहिले होते.'
    },
    traditionalMantra: 'श्रीराम जय राम जय जय राम',
    isKuldaivat: true,
  },
  {
    id: 'shirdi-sai-baba',
    name: { en: 'Shri Sai Baba (Shirdi)', hi: 'साईं बाबा (शिरडी)', mr: 'श्री साईबाबा (शिर्डी)' },
    traditionCategory: 'saints',
    primaryShrine: { en: 'Shirdi Samadhi Mandir', hi: 'शिरडी समाधि मंदिर', mr: 'समाधी मंदिर, शिर्डी-अहिल्यानगर' },
    district: 'Ahilyanagar',
    region: 'North Maharashtra',
    significance: {
      en: 'The universal saint who taught "सबका मालिक एक" (God is One for all) and the twin virtues of Shraddha (faith) and Saburi (patience).',
      hi: 'सर्वधर्म समभाव और "सबका मालिक एक" का अमर संदेश देने वाले सद्गुरु। श्रद्धा और सबूरी के दाता।',
      mr: '"सबका मालिक एक" आणि श्रद्धा-सबुरीची शिकवण देणारे कलियुगातील महान संत.'
    },
    traditionalMantra: 'ॐ साईं राम • ॐ श्री साईनाथाय नमः',
    isKuldaivat: false,
  },
  {
    id: 'shani-shingnapur',
    name: { en: 'Shani Shingnapur', hi: 'शनि शिंगणापुर', mr: 'श्री शनेश्वर देवस्थान (शनिशिंगणापूर)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Open Sky Shani Mandir', hi: 'खुले आकाश तले स्वयंभू शनि शिला', mr: 'शनिशिंगणापूर, नेवासा-अहिल्यानगर' },
    district: 'Ahilyanagar',
    region: 'North Maharashtra',
    significance: {
      en: 'Self-manifested black stone of Shani Dev under the open sky. Unique village where houses traditionally have no doors or locks due to total trust in Shani\'s protection.',
      hi: 'खुले आकाश के नीचे विराजमान स्वयंभू पाषाण। बिना दरवाजों और तालों वाला विश्वप्रसिद्ध गांव।',
      mr: 'उघड्या आकाशाखाली असलेली काळ्या पाषाणाची स्वयंभू मूर्ती. घरांना दरवाजे नसलेले जगातील एकमेव सुरक्षित गाव.'
    },
    traditionalMantra: 'ॐ शं शनैश्चराय नमः • शनिदेव प्रसन्न',
    isKuldaivat: false,
  },
  {
    id: 'padmalaya-jalgaon',
    name: { en: 'Padmalaya Ganpati', hi: 'पद्मालय गणपति (जलगांव)', mr: 'श्री क्षेत्र पद्मालय (एरंडोल, जळगाव)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Lotus Lake Padmalaya Mandir', hi: 'पद्मालय कमल सरोवर मंदिर', mr: 'पद्मालय गणपती मंदिर' },
    district: 'Jalgaon',
    region: 'North Maharashtra',
    significance: {
      en: 'One of the two-and-a-half Ganpatis of Khandesh. Unique shrine with two Swayambhu Ganesha murtis (Aamod and Pramod) situated beside a lake of blooming lotuses.',
      hi: 'खानदेश के ढाई गणपति पीठों में से एक। आमोद और प्रमोद नामक दो स्वयंभू गणेश प्रतिमाएं कमल सरोवर के पास स्थित हैं।',
      mr: 'साडेतीन गणपतींपैकी अर्धे पीठ. आमोद व प्रमोद नावाच्या दोन स्वयंभू गणपतींच्या मूर्ती असलेले निसर्गरम्य कमळ तळे.'
    },
    traditionalMantra: 'ॐ गं गणपतये नमः • आमोद-प्रमोदाय नमः',
    isKuldaivat: false,
  },
  {
    id: 'toranmal-gorakhnath-nandurbar',
    name: { en: 'Toranmal Gorakhnath', hi: 'तोरणमाळ गोरखनाथ (नंदुरबार)', mr: 'तोरणमाळ गोरखनाथ मंदिर (नंदुरबार)' },
    traditionCategory: 'dattatreya',
    primaryShrine: { en: 'Toranmal Satpura Plateau', hi: 'सतपुड़ा तोरणमाळ गुफा मंदिर', mr: 'तोरणमाळ पठार, नंदुरबार' },
    district: 'Nandurbar',
    region: 'North Maharashtra',
    significance: {
      en: 'High hill retreat in the Satpura mountain ranges where Nath saint Guru Gorakhnath performed deep penance. Annual Mahashivratri mela attracts thousands from tribal regions.',
      hi: 'सतपुड़ा पर्वत श्रृंखला के शिखर पर गुरु गोरखनाथ की तपोस्थली गुफा। महाशिवरात्रि पर आदिवासी समाज का विशाल मेला।',
      mr: 'सातपुड्याच्या पर्वतरांगांमधील नवनाथांचे प्रमुख स्थान. गुरु गोरखनाथांची तपोभूमी असलेले थंड हवेचे ठिकाण.'
    },
    traditionalMantra: 'आदेश आदेश • ॐ शिव गोरक्ष',
    isKuldaivat: false,
  },
  {
    id: 'laling-shiva-dhule',
    name: { en: 'Laling Fort Shiva Mandir', hi: 'लालिंग शिव मंदिर (धुले)', mr: 'लालिंग किल्ला शिवमंदिर (धुळे)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Laling Hilltop Fort', hi: 'लालिंग दुर्ग मंदिर', mr: 'लालिंग किल्ला, धुळे' },
    district: 'Dhule',
    region: 'North Maharashtra',
    significance: {
      en: 'Ancient hill fortress temple from the Faruqi dynasty era with an underground spring that flows continuously even during hot Khandesh summers.',
      hi: 'खानदेश के प्राचीन दुर्ग पर स्थित ऐतिहासिक शिव मंदिर, जहाँ वर्ष भर प्राकृतिक जलधारा बहती है।',
      mr: 'धुळ्याजवळील ऐतिहासिक लालिंग किल्ल्यावरील प्राचीन शिवमंदिर, जिथे बारमाही पाण्याचा झरा वाहतो.'
    },
    traditionalMantra: 'ॐ नमः शिवाय',
    isKuldaivat: false,
  },

  // ==========================================
  // VIDARBHA (विदर्भ)
  // ==========================================
  {
    id: 'gajanan-maharaj-shegaon',
    name: { en: 'Sant Shri Gajanan Maharaj', hi: 'संत गजानन महाराज (शेगांव)', mr: 'संत गजानन महाराज (शेगाव)' },
    traditionCategory: 'saints',
    primaryShrine: { en: 'Shegaon Anand Sagar & Samadhi Mandir', hi: 'शेगांव समाधि मंदिर', mr: 'आनंद सागर व समाधी मंदिर, शेगाव' },
    district: 'Buldhana',
    region: 'Vidarbha',
    significance: {
      en: 'The Saint-Yogi of Vidarbha whose chant "गणि गण गणात बोते" emphasizes the unity of the individual soul with the Supreme Divine.',
      hi: 'विदर्भ के परमहंस संत। जिनका मन्त्र "गणि गण गणात बोते" आत्मा और परमात्मा के एकत्व का बोध कराता है।',
      mr: 'विदर्भाचे प्रति पंढरपूर मानले जाणारे शेगाव. "गणि गण गणात बोते" हा आत्मज्ञानाचा मंत्र देणारे परमहंस.'
    },
    traditionalMantra: 'गणि गण गणात बोते • श्री गजानन जय गजानन',
    isKuldaivat: false,
  },
  {
    id: 'tekdi-ganesh-nagpur',
    name: { en: 'Tekdi Ganesh (Nagpur)', hi: 'टेकड़ी गणेश (नागपुर)', mr: 'श्री टेकडी गणपती (नागपूर)' },
    traditionCategory: 'ganesha',
    primaryShrine: { en: 'Sitabuldi Hill Tekdi Ganesh Mandir', hi: 'सीताबर्डी टेकड़ी गणेश मंदिर', mr: 'सीताबर्डी टेकडी, नागपूर' },
    district: 'Nagpur',
    region: 'Vidarbha',
    significance: {
      en: 'Over 250-year-old self-manifested Ganesha idol situated on Sitabuldi hillock in central Nagpur. Patron deity of the Bhonsle rulers of Nagpur.',
      hi: 'नागपुर का सबसे प्रतिष्ठित २५० वर्ष पुराना स्वयंभू गणेश मंदिर। भोसले राजाओं का इष्ट देव।',
      mr: 'नागपूरचे ग्रामदैवत आणि २५० वर्षांचा इतिहास असलेले स्वयंभू देवस्थान. भोसले घराण्याचे कुलदैवत.'
    },
    traditionalMantra: 'ॐ गं गणपतये नमः • टेकडी गणेश प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'ramtek-nagpur',
    name: { en: 'Ramtek (Lord Rama Hill Temple)', hi: 'रामटेक श्रीराम मंदिर (नागपुर)', mr: 'श्रीराम मंदिर, रामटेक (नागपूर)' },
    traditionCategory: 'vitthal_vishnu',
    primaryShrine: { en: 'Ramtek Gad Temple', hi: 'रामटेक गढ़ मंदिर', mr: 'रामटेक गड मंदिर, नागपूर' },
    district: 'Nagpur',
    region: 'Vidarbha',
    significance: {
      en: 'Lord Rama rested on this hill during his exile before continuing to Dandakaranya. Poet Kalidasa composed his masterpiece Meghaduta here on these cloud-draped hills.',
      hi: 'प्रभु श्रीराम के वनवास कालीन पावन विश्राम की स्थली। महाकवि कालिदास ने यहीं "मेघदूत" महाकाव्य की रचना की थी।',
      mr: 'प्रभू श्रीरामांचे वनवासातील विश्रामस्थान. महाकवी कालिदासांनी याच टेकडीवर "मेघदूत" महाकाव्याची रचना केली.'
    },
    traditionalMantra: 'जय जय राम कृष्ण हरि • जय श्रीराम',
    isKuldaivat: true,
  },
  {
    id: 'ambadevi-amravati',
    name: { en: 'Ambadevi & Ekvira (Amravati)', hi: 'अंबादेवी एवं एकवीरा मंदिर', mr: 'श्री अंबादेवी व एकवीरा (अमरावती)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Amravati City Central Temple', hi: 'अमरावती अंबादेवी मंदिर', mr: 'अंबादेवी मंदिर, अमरावती' },
    district: 'Amravati',
    region: 'Vidarbha',
    significance: {
      en: 'Ancient shrine mentioned in the Srimad Bhagavatam. Princess Rukmini prayed here before Lord Krishna carried her away on his chariot for their divine wedding.',
      hi: 'श्रीमद्भागवत में वर्णित प्राचीन मंदिर। यहीं माता रुक्मिणी ने पूजन किया था, जिसके उपरांत श्रीकृष्ण ने उनका हरण कर द्वारका ले गए।',
      mr: 'श्रीमद्भागवतातील ऐतिहासिक देवस्थान. रुक्मिणी हरणापूर्वी माता रुक्मिणीने याच मंदिरात अंबादेवीची पूजा केली होती.'
    },
    traditionalMantra: 'ॐ अंबादेव्यै नमः • आई अंबादेवी प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'rajrajeshwar-akola',
    name: { en: 'Rajrajeshwar Mandir (Akola)', hi: 'राजराजेश्वर शिव मंदिर (अकोला)', mr: 'श्री राजराजेश्वर मंदिर (अकोला)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Akola City Shiva Mandir', hi: 'अकोला राजराजेश्वर मंदिर', mr: 'राजराजेश्वर मंदिर, अकोला' },
    district: 'Akola',
    region: 'Vidarbha',
    significance: {
      en: 'Ancient Shiva shrine from the Hemadpanthi era. Thousands of Kawad pilgrims carry holy Narmada and local river waters on Mondays of Shravan.',
      hi: 'अकोला का ऐतिहासिक व जागृत शिव मंदिर। श्रावण मास में कांवड़ियों द्वारा नर्मदा जल से महाभिषेक।',
      mr: 'अकोल्याचे ग्रामदैवत. श्रावण महिन्यात हजारो कावडधारी नर्मदा नदीचे पवित्र जल आणून येथे महाअभिषेक करतात.'
    },
    traditionalMantra: 'ॐ नमः शिवाय • राजराजेश्वराय नमः',
    isKuldaivat: true,
  },
  {
    id: 'markanda-mahadev-gadchiroli',
    name: { en: 'Markanda Mahadev (Gadchiroli)', hi: 'मार्कंडा महादेव (गढ़चिरोली)', mr: 'मार्कंडा देवस्थान (चामोर्शी, गडचिरोली)' },
    traditionCategory: 'shiva',
    primaryShrine: { en: 'Wainganga River Markanda Temple', hi: 'वैनगंगा तट मार्कंडेय मंदिर', mr: 'वैनगंगा नदीकाठ, मार्कंडा' },
    district: 'Gadchiroli',
    region: 'Vidarbha',
    significance: {
      en: 'Known as the "Khajuraho of Vidarbha". Where Sage Markandeya was saved from Yama by Lord Shiva. 8th-century clustered stone temples set along the north-flowing Wainganga.',
      hi: '"विदर्भ का खजुराहो"। ऋषि मार्कंडेय को अकाल मृत्यु से भगवान शिव ने यहीं जीवनदान दिया था। उत्तरवाहिनी वैनगंगा तट पर स्थित।',
      mr: '"विदर्भाचे खजुराहो" म्हणून प्रसिद्ध. भगवान शंकरांनी बाल मार्कंडेयाचे यमराजापासून रक्षण केले ते पवित्र स्थान. उत्तरवाहिनी वैनगंगा नदीचा परिसर.'
    },
    traditionalMantra: 'महामृत्युंजय मन्त्र • ॐ नमः शिवाय',
    isKuldaivat: true,
  },
  {
    id: 'mahakali-chandrapur',
    name: { en: 'Mahakali Mandir (Chandrapur)', hi: 'महाकाली मंदिर (चंद्रपुर)', mr: 'आई महाकाली मंदिर (चंद्रपूर)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Chandrapur Ancient Fort Temple', hi: 'चंद्रपुर महाकाली मंदिर', mr: 'महाकाली मंदिर, चंद्रपूर' },
    district: 'Chandrapur',
    region: 'Vidarbha',
    significance: {
      en: 'Built in the 16th century by Gond Queen Rani Hirai. The reclining idol of Mahakali inside the cave-like underground sanctum attracts millions during Chaitra Navratri.',
      hi: 'गोंड रानी हिराई द्वारा १६वीं सदी में निर्मित। गर्भगृह में माता की शयन मुद्रा की दुर्लभ प्राचीन प्रतिमा।',
      mr: 'गोंड राजांच्या काळातील १६ व्या शतकातील अत्यंत जागृत मंदिर. चैत्र नवरात्रात लाखो भाविकांचे श्रद्धास्थान.'
    },
    traditionalMantra: 'ॐ क्रीं कालिकायै नमः • आई महाकाली प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'washim-balaji',
    name: { en: 'Balaji Mandir (Washim)', hi: 'श्री बालाजी मंदिर (वाशिम)', mr: 'श्री बालाजी मंदिर (वाशीम)' },
    traditionCategory: 'vitthal_vishnu',
    primaryShrine: { en: 'Washim Balaji Sansthan', hi: 'वाशिम बालाजी मंदिर', mr: 'बालाजी मंदिर, वाशीम' },
    district: 'Washim',
    region: 'Vidarbha',
    significance: {
      en: 'Ancient Vatsagulma tirtha dating back to the Vakataka dynasty. Constructed in 1779 with an idol recovered from the sacred Padmatirtha tank.',
      hi: 'वाकाटक कालीन वत्सगुल्म तीर्थ। पद्मातीर्थ सरोवर से प्राप्त दिव्य विग्रह सन् १७७९ में प्रतिष्ठित किया गया।',
      mr: 'वाकाटकांची प्राचीन राजधानी वत्सगुल्म. १७७९ मध्ये पद्मातीर्थ तलावातून प्रकट झालेली भगवान विष्णूंची सुरेख मूर्ती.'
    },
    traditionalMantra: 'ॐ नमो नारायणाय • श्री व्यंकटेशाय नमः',
    isKuldaivat: true,
  },
  {
    id: 'geetai-mandir-wardha',
    name: { en: 'Geetai Mandir (Wardha)', hi: 'गीताइ मंदिर (वर्धा)', mr: 'गीताइ मंदिर (गोपुरी, वर्धा)' },
    traditionCategory: 'saints',
    primaryShrine: { en: 'Gopuri Vinoba Ashram', hi: 'गोपुरी विनोबा आश्रम', mr: 'गोपुरी, वर्धा' },
    district: 'Wardha',
    region: 'Vidarbha',
    significance: {
      en: 'A unique roofless temple made of 18 stones from various parts of India, representing the 18 chapters of the Bhagavad Gita translated into Marathi ("Geetai") by Acharya Vinoba Bhave.',
      hi: 'आचार्य विनोबा भावे द्वारा स्थापित। १८ शिलारूप अध्यायों से निर्मित आकाश-युक्त खुला शांत ध्यान मंदिर।',
      mr: 'आचार्य विनोबा भाव्यांनी रचलेल्या "गीताइ"चे अनोखे मंदिर. १८ अध्यायांचे १८ दगड खुल्या आकाशाखाली ध्यानासाठी रचले आहेत.'
    },
    traditionalMantra: 'ॐ नमो भगवते वासुदेवाय',
    isKuldaivat: false,
  },
  {
    id: 'kelapur-jagadamba-yavatmal',
    name: { en: 'Jagadamba Mata (Kelapur)', hi: 'जगदम्बा माता (केलापुर, यवतमाळ)', mr: 'आई जगदंबा देवी (केळापूर, यवतमाळ)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Kelapur National Highway Temple', hi: 'केलापुर जगदम्बा मंदिर', mr: 'जगदंबा मंदिर, पांढरकवडा-यवतमाळ' },
    district: 'Yavatmal',
    region: 'Vidarbha',
    significance: {
      en: 'Ancient Shakti shrine on the Maharashtra-Telangana border near Pandharkawada, celebrated as the Kuldevi of farming and tribal communities.',
      hi: 'महाराष्ट्र-तेलंगाना सीमा पर स्थित अत्यंत प्राचीन व सिद्ध देवी मंदिर।',
      mr: 'महाराष्ट्र-तेलंगणा सीमेवरील प्राचीन व जागृत शक्तिपीठ. लाखो भाविकांचे कुलदैवत.'
    },
    traditionalMantra: 'ॐ जगदम्बायै नमः • आई जगदंबा प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'korambhi-devi-bhandara',
    name: { en: 'Korambhi Devi (Bhandara)', hi: 'कोरंभी देवी (भंडारा)', mr: 'आई कोरंभी देवी (भंडारा)' },
    traditionCategory: 'devi_shakti',
    primaryShrine: { en: 'Wainganga Cliffside Temple', hi: 'वैनगंगा तट पहाड़ी मंदिर', mr: 'कोरंभी टेकडी, वैनगंगा काठ-भंडारा' },
    district: 'Bhandara',
    region: 'Vidarbha',
    significance: {
      en: 'High hilltop temple overlooking the meandering curves of the Wainganga River. Revered as the maternal protector of all neighboring farming villages.',
      hi: 'वैनगंगा नदी के विहंगम दृश्य के सम्मुख पहाड़ी पर स्थित वात्सल्यमयी ग्रामदेवी।',
      mr: 'वैनगंगा नदीच्या तीरावर निसर्गरम्य टेकडीवर वसलेले भक्तांचे तारणहार देवस्थान.'
    },
    traditionalMantra: 'आई कोरंभी प्रसन्न',
    isKuldaivat: true,
  },
  {
    id: 'suryadeo-gondia',
    name: { en: 'Suryadeo Mandir (Gondia)', hi: 'सूर्यदेव मंदिर (गोंदिया)', mr: 'सूर्यदेव मंदिर (गोरेगाव, गोंदिया)' },
    traditionCategory: 'gramdevata',
    primaryShrine: { en: 'Goregaon Suryadeo Hills', hi: 'गोरेगांव सूर्यदेव पहाड़ी', mr: 'सूर्यदेव टेकडी, गोंदिया' },
    district: 'Gondia',
    region: 'Vidarbha',
    significance: {
      en: 'One of the rare sun temples of central India, situated amidst thick Sal and Teak forests of the Gondia district.',
      hi: 'मध्य भारत का दुर्लभ सूर्य मंदिर, जो घने वनों और पहाड़ियों के मध्य स्थित है।',
      mr: 'गोंदियाच्या जंगलांच्या कुशीत वसलेले मध्य भारतातील दुर्मिळ व प्राचीन सूर्यमंदिर.'
    },
    traditionalMantra: 'ॐ सूर्याय नमः • ॐ घृणिः सूर्य आदित्याय नमः',
    isKuldaivat: false,
  }
];

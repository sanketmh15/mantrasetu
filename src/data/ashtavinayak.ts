import { Temple } from '../types';

export interface AshtavinayakTemple extends Temple {
  sequence: number;
  trunkDirection: 'left' | 'right';
  specialFeature: string;
}

export const ashtavinayakCircuit: AshtavinayakTemple[] = [
  {
    id: 'ashtavinayak-1-morgaon',
    sequence: 1,
    name: {
      en: '1. Shri Mayureshwar (Morgaon)',
      hi: '१. श्री मयूरेश्वर (मोरगांव)',
      mr: '१. श्री मयूरेश्वर (मोरगाव)'
    },
    trunkDirection: 'left',
    specialFeature: 'First and final shrine; peacock mount, 4 minaret-style bastions representing universal harmony',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Morgaon',
    historicalEra: 'Bahmani & Maratha Era Architecture (Patronized by Moraya Gosavi)',
    significance: {
      en: 'The starting and concluding shrine of the Ashtavinayak Yatra. Ganesha rode a peacock (Mayura) to defeat the demon Sindhu. The temple has a unique stone Nandi sitting in front of Ganesha.',
      hi: 'अष्टविनायक यात्रा का प्रथम व अंतिम पड़ाव। मयूरारूढ़ गणपति ने यहाँ सिंधुरासुर का वध किया था। गर्भगृह के सामने नंदी की दुर्लभ उपस्थिति।',
      mr: 'अष्टविनायक यात्रेचा आरंभ आणि समारोप होणारे मुख्य स्थान. मोरावर आरूढ होऊन सिंधू दैत्याचा संहार केला. मंदिरासमोर नंदीची वैशिष्ट्यपूर्ण मूर्ती आहे.'
    },
    specialTradition: {
      en: 'The yatra is completed only after returning to Morgaon after visiting the other 7 shrines.',
      hi: 'सातों मंदिरों के दर्शन के उपरांत पुनः मोरगांव आकर ही यात्रा पूर्ण मानी जाती है।',
      mr: 'उरलेल्या ७ गणपतींचे दर्शन घेतल्यानंतर पुन्हा मोरगावला येऊन नमस्कार केल्यावरच अष्टविनायक यात्रा पूर्ण मानली जाते.'
    },
    timings: '05:00 AM - 10:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Mayureshwar+Temple+Morgaon+Pune',
    howToReach: {
      rail: 'Jejuri Railway Station (17 km) or Pune Junction (65 km)',
      road: 'Via Pune-Hadapsar-Saswad-Jejuri-Morgaon route (frequent buses)',
      air: 'Pune International Airport (70 km)'
    },
    verifiedSource: 'Ganesha Purana & Chinchwad Devasthan Trust records',
    imageTag: 'morgaon'
  },
  {
    id: 'ashtavinayak-2-siddhatek',
    sequence: 2,
    name: {
      en: '2. Shri Siddhivinayak (Siddhatek)',
      hi: '२. श्री सिद्धिविनायक (सिद्धटेक)',
      mr: '२. श्री सिद्धिविनायक (सिद्धटेक)'
    },
    trunkDirection: 'right',
    specialFeature: 'Only Ashtavinayak with trunk turned to the right (Dakshinabhimukhi)',
    state: 'Maharashtra',
    district: 'Ahilyanagar',
    city: 'Siddhatek',
    historicalEra: 'Punyashlok Ahilyabai Holkar rebuilt the main temple sanctum',
    significance: {
      en: 'Situated on the banks of the sacred Bhima river. Lord Vishnu meditated here for thousands of years and obtained divine Siddhi from Ganesha to defeat demons Madhu and Kaitabha.',
      hi: 'भीमा नदी के तट पर स्थित। भगवान विष्णु ने यहाँ सिद्धि प्राप्त कर मधु-कैटभ का संहार किया था। उजव्या (दाहिनी) सूंड़ वाले शक्तिशाली विनायक।',
      mr: 'भीमा नदीच्या काठी वसलेले पवित्र स्थान. भगवान विष्णूंनी येथे तपश्चर्या करून सिद्धी प्राप्त केली. अष्टविनायकांपैकी उजव्या सोंडेचा हा एकमेव गणपती.'
    },
    specialTradition: {
      en: 'The hillock pradakshina (circumambulation) of the temple is about 1 km and considered spiritually profound.',
      hi: 'मंदिर के पहाड़ी टीले की १ किमी की प्रदक्षिणा अत्यंत पुण्यदायी मानी जाती है।',
      mr: 'टेकडीभोवती सुमारे १ किमी अंतराची प्रदक्षिणा घालण्याची येथे विशेष परंपरा आहे.'
    },
    timings: '05:30 AM - 09:30 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Siddhivinayak+Temple+Siddhatek+Ahmednagar',
    howToReach: {
      rail: 'Daund Junction (18 km)',
      road: 'Easily accessible from Daund and Shirur via state transport',
      air: 'Pune International Airport (95 km)'
    },
    verifiedSource: 'Mudgala Purana & Ahilyabai Holkar Trust archives',
    imageTag: 'siddhatek'
  },
  {
    id: 'ashtavinayak-3-pali',
    sequence: 3,
    name: {
      en: '3. Shri Ballaleshwar (Pali)',
      hi: '३. श्री बल्लाळेश्वर (पाली)',
      mr: '३. श्री बल्लाळेश्वर (पाली)'
    },
    trunkDirection: 'left',
    specialFeature: 'Only temple named after a devotee (Ballal); features a massive historic bell captured from the Portuguese',
    state: 'Maharashtra',
    district: 'Raigad',
    city: 'Pali',
    historicalEra: 'Fortified by Morobada Fadnis in 1780 CE',
    significance: {
      en: 'Named after young devotee Ballal who was tied to a tree by townsfolk for his relentless worship of Ganesha. Pleased by his unshakeable faith, Ganesha appeared and permanently took his devotee\'s name.',
      hi: 'एकमात्र मंदिर जिसका नाम भगवान के अनन्य बाल भक्त बल्लाळ के नाम पर पड़ा। भगवान ने भक्त के प्रेम को स्वयं से बड़ा मानकर यह नाम स्वीकार किया।',
      mr: 'आपल्या निस्सीम बालभक्त बल्लाळाच्या नावाने ओळखले जाणारे एकमेव मंदिर. भक्ताच्या प्रेमापोटी देवाने स्वतःला भक्ताचे नाव दिले.'
    },
    specialTradition: {
      en: 'Sun rays illuminate the idol directly during winter sunrises (Dakshinayan).',
      hi: 'शीतकाल में सूर्योदय की किरणें सीधे गणपति के श्रीविग्रह पर पड़ती हैं।',
      mr: 'मंदिरात चिमाजी आप्पांनी पोर्तुगिजांकडून आणलेली भव्य ऐतिहासिक घंटा पाहायला मिळते.'
    },
    timings: '05:30 AM - 10:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Ballaleshwar+Temple+Pali+Raigad',
    howToReach: {
      rail: 'Roha Railway Station (30 km) or Khopoli (40 km)',
      road: 'Located off the Mumbai-Goa Highway via Nagothane or Khopoli',
      air: 'Chhatrapati Shivaji Maharaj International Airport Mumbai (110 km)'
    },
    verifiedSource: 'Raigad Heritage Gazette & Ballaleshwar Devasthan',
    imageTag: 'pali'
  },
  {
    id: 'ashtavinayak-4-mahad',
    sequence: 4,
    name: {
      en: '4. Shri Varadvinayak (Mahad)',
      hi: '४. श्री वरदविनायक (महाड)',
      mr: '४. श्री वरदविनायक (महड/महाड)'
    },
    trunkDirection: 'left',
    specialFeature: 'The sacred Nandadeep oil lamp has been burning continuously since 1892 CE without going out',
    state: 'Maharashtra',
    district: 'Raigad',
    city: 'Mahad (Khalapur)',
    historicalEra: 'Subhedar Ramji Mahadev Biwalkar built the stone temple in 1725 CE',
    significance: {
      en: 'The Giver of Auspicious Boons (Varada). Devotees are permitted to enter the sanctum sanctorum directly and perform their own personal puja and touch the deity’s feet.',
      hi: 'समस्त मनोरथ पूर्ण करने वाले वरदाता विनायक। श्रद्धालु स्वयं गर्भगृह में जाकर चरण स्पर्श कर सकते हैं।',
      mr: 'भक्तांच्या सर्व मनोकामना पूर्ण करणारे वरदविनायक. भाविकांना स्वतः गर्भगृहात जाऊन मूर्तीला स्पर्श करून पूजा करण्याची मुभा आहे.'
    },
    specialTradition: {
      en: 'The eternal Nandadeep flame has remained lit day and night for over 130 years.',
      hi: 'सन् १८९२ से यहाँ का पावन नंदादीप अखंड रूप से प्रज्वलित है।',
      mr: 'येथील नंदादीप १८९२ सालापासून अखंड तेवत आहे.'
    },
    timings: '05:00 AM - 09:30 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Varadvinayak+Temple+Mahad+Khalapur',
    howToReach: {
      rail: 'Karjat Railway Station (25 km) or Khopoli (6 km)',
      road: 'Near Mumbai-Pune Expressway Khopoli exit',
      air: 'Mumbai Airport (80 km)'
    },
    verifiedSource: 'Khalapur Historical Records',
    imageTag: 'mahad'
  },
  {
    id: 'ashtavinayak-5-theur',
    sequence: 5,
    name: {
      en: '5. Shri Chintamani (Theur)',
      hi: '५. श्री चिंतामणि (थेऊर)',
      mr: '५. श्री चिंतामणी (थेऊर)'
    },
    trunkDirection: 'left',
    specialFeature: 'Jewel of Peace; Samadhi meditation palace of Peshwa Madhavrao I',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Theur',
    historicalEra: 'Peshwa Era (Confluence of Mula, Mutha, and Bhima rivers)',
    significance: {
      en: 'Ganesha retrieved the sacred wish-fulfilling Chintamani jewel for Sage Kapila from the greedy King Gana. Worshipped for banishing mental restlessness and anxiety.',
      hi: 'ऋषि कपिल हेतु चिंतामणि रत्न पुनः प्राप्त कराने वाले देव। मन की व्यग्रता, तनाव व चिंताओं का समूल निवारण करने वाले।',
      mr: 'ऋषी कपिलांसाठी चिंतामणी रत्न परत मिळवून देणारे विनायक. मनातील चिंता, नैराश्य व अस्वस्थता दूर करणारे परम शांत स्थान.'
    },
    specialTradition: {
      en: 'Peshwa Madhavrao I spent his final contemplative days here, and his wife Ramabai committed Sati here on the riverbank.',
      hi: 'थोरले पेशवा माधवराव की परम साधना स्थली और उनकी पत्नी रमाबाई का सती स्मारक।',
      mr: 'थोरले माधवराव पेशव्यांचे ध्यानस्थ समाधी मंदिर आणि रमाबाईंचे पावन स्मारक.'
    },
    timings: '05:30 AM - 10:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Chintamani+Temple+Theur+Pune',
    howToReach: {
      rail: 'Pune Junction (25 km)',
      road: 'On Pune-Solapur highway route with regular PMPML city buses from Pune',
      air: 'Pune Airport (20 km)'
    },
    verifiedSource: 'Peshwa Daftar & Chintamani Devasthan Theur',
    imageTag: 'theur'
  },
  {
    id: 'ashtavinayak-6-lenyadri',
    sequence: 6,
    name: {
      en: '6. Shri Girijatmaj (Lenyadri)',
      hi: '६. श्री गिरिजात्मज (लेण्याद्री)',
      mr: '६. श्री गिरिजात्मज (लेण्याद्री)'
    },
    trunkDirection: 'left',
    specialFeature: 'Only Ashtavinayak situated on a mountain inside ancient Buddhist rock-cut caves; 307 stone steps',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Junnar',
    historicalEra: '1st - 3rd Century CE (Cave 7 of Junnar Rock Cave Complex)',
    significance: {
      en: 'Born of the Mountain Daughter Parvati (Girija-Atmaja). Mother Parvati performed intense penance for 12 years on this cliff to beget Ganesha as her son.',
      hi: 'माता पार्वती (गिरिजा) के तप से प्रकट हुए आत्मज। लेण्याद्री पर्वत की गुफा संख्या ७ में स्थित अद्भुत शैल मंदिर।',
      mr: 'माता गिरिजेचे (पार्वतीचे) सुपुत्र. लेण्याद्री पर्वताच्या ३०७ पायऱ्या चढून गुहेमध्ये अखंड खडकात कोरलेले निसर्गरम्य देवस्थान.'
    },
    specialTradition: {
      en: 'No electric lighting is installed inside the cave sanctum; illuminated purely by daylight and oil lamps, offering pure silence.',
      hi: 'गुफा गर्भगृह में कोई कृत्रिम बिजली का प्रकाश नहीं; केवल सूर्य के प्रकाश व दीपों से पावन दर्शन।',
      mr: 'गर्भगृहात विजेचा दिवा नसून नैसर्गिक सूर्यप्रकाशात आणि दिव्यांच्या उजेडात दर्शन होते.'
    },
    timings: '06:00 AM - 06:30 PM (Closes at sunset for mountain safety)',
    googleMapsUrl: 'https://maps.google.com/?q=Girijatmaj+Temple+Lenyadri+Junnar',
    howToReach: {
      rail: 'Pune Railway Station (95 km) or Kalyan (130 km)',
      road: 'Near Junnar town; frequent ST buses from Pune and Mumbai',
      air: 'Pune Airport (90 km)'
    },
    verifiedSource: 'Archaeological Survey of India (ASI) & Lenyadri Trust',
    imageTag: 'lenyadri'
  },
  {
    id: 'ashtavinayak-7-ozar',
    sequence: 7,
    name: {
      en: '7. Shri Vighneshwar (Ozar)',
      hi: '७. श्री विघ्नेश्वर (ओझर)',
      mr: '७. श्री विघ्नेश्वर (ओझर)'
    },
    trunkDirection: 'left',
    specialFeature: 'Golden pinnacle (Shikhara) and emerald-studded eyes on the banks of Kukadi river',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Ozar (Junnar)',
    historicalEra: 'Renovated by Chimaji Appa after his victory over Portuguese at Vasai',
    significance: {
      en: 'Subdued the demon Vighnasur (the personification of obstacles and chaos). Ganesha spared his life on the condition that the demon would never trouble those who chant Ganesha\'s name.',
      hi: 'विघ्नासूर राक्षस का दमन करने वाले देव। चिमाजी आप्पा ने वसई विजय के पश्चात इस मंदिर के स्वर्ण शिखर का निर्माण कराया।',
      mr: 'विघ्नासुराचा पराभव करून त्याला शरण आणणारे विघ्नेश्वर. चिमाजी आप्पांनी वसईच्या विजयानंतर येथील सुवर्ण कळस चढवला.'
    },
    specialTradition: {
      en: 'Surrounded by protective stone ramparts and beautiful river banks on the Kukadi.',
      hi: 'कुकडी नदी के शांत तट पर स्थित भव्य दीपमालाओं से सुसज्जित मंदिर।',
      mr: 'कुकडी नदीच्या विस्तीर्ण पात्रावर वसलेले, भव्य दीपमाळांनी शोभून दिसणारे मंदिर.'
    },
    timings: '05:00 AM - 10:30 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Vighnaharta+Ganpati+Temple+Ozar+Junnar',
    howToReach: {
      rail: 'Pune Junction (85 km)',
      road: 'Just 12 km from Junnar or Lenyadri on the Narayangaon-Ozar highway',
      air: 'Pune Airport (80 km)'
    },
    verifiedSource: 'Chimaji Appa Historical Inscriptions & Junnar Records',
    imageTag: 'ozar'
  },
  {
    id: 'ashtavinayak-8-ranjangaon',
    sequence: 8,
    name: {
      en: '8. Shri Mahaganapati (Ranjangaon)',
      hi: '८. श्री महागणपति (रांजणगांव)',
      mr: '८. श्री महागणपती (रांजणगाव)'
    },
    trunkDirection: 'left',
    specialFeature: 'Most formidable form; 10 trunks and 20 hands (Mahotkata) depicted in original lore',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Ranjangaon',
    historicalEra: 'Peshwa Madhavrao constructed the sanctum; earlier tradition from Treta Yuga',
    significance: {
      en: 'Invoked by Lord Shiva himself before battle to defeat the demon Tripurasura. Shiva worshipped Mahaganapati to obtain the divine bow and chariot.',
      hi: 'त्रिपुरासुर के वध से पूर्व स्वयं भगवान शिव ने यहाँ महागणपति की आराधना कर विजय का आशीर्वाद प्राप्त किया था।',
      mr: 'त्रिपुरासुराचा वध करण्यापूर्वी साक्षात भगवान शंकरांनी ज्यांची आराधना केली ते महागणपती. अत्यंत प्रभावी आणि सामर्थ्यवान रूप.'
    },
    specialTradition: {
      en: 'The idol faces east with a broad, serene forehead and is aligned with the morning equinox sun rays.',
      hi: 'पूर्वमुखी भव्य विग्रह, जिस पर सूर्य की किरणें प्रात:काल सीधे सुशोभित होती हैं।',
      mr: 'अतिशय भव्य, मनमोहक आणि पूर्वमुखी मूर्ती. अष्टविनायक यात्रेचा आठवा महत्त्वाचा टप्पा.'
    },
    timings: '05:30 AM - 10:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Mahaganapati+Temple+Ranjangaon+Pune',
    howToReach: {
      rail: 'Pune Junction (50 km)',
      road: 'Directly on Pune-Nagar (Ahmednagar) state highway with buses every 15 minutes',
      air: 'Pune Airport (45 km)'
    },
    verifiedSource: 'Ganesha Purana (Upasana Khanda) & Ranjangaon Devasthan',
    imageTag: 'ranjangaon'
  }
];


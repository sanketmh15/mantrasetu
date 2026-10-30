import { MultilingualText } from '../types';
import { DEITY_IMAGE_REGISTRY } from '../utils/deityImageRegistry';

export interface GodEntry {
  serialNo: number;
  id: string;
  name: MultilingualText;
  title: MultilingualText;
  category: 'trideva' | 'tridevi' | 'kuldaivat' | 'dashavatara' | 'shiva_avatars' | 'shakti_peeth' | 'mahavira' | 'vedic' | 'saints';
  image: string;
  placeImage: string;
  primaryShrine: MultilingualText;
  districtOrState: string;
  mantra: string;
  mantraRoman: string;
  vahana: MultilingualText;
  weaponOrSymbols: MultilingualText;
  welcomeGreeting: MultilingualText;
  audioGreetingText: string;
  significance: MultilingualText;
  festivals: string[];
  pujaOfferings: string[];
}

const rawFiftyGodsList: GodEntry[] = [
  // 1. Lord Ganesha
  {
    serialNo: 1,
    id: 'ganesha',
    name: { en: 'Lord Ganesha', hi: 'भगवान श्री गणेश', mr: 'श्री विघ्नहर्ता गणेश', sa: 'श्रीगणेशः' },
    title: { en: 'Remover of Obstacles & God of Wisdom', hi: 'विघ्नहर्ता एवं बुद्धिदाता', mr: 'सुखकर्ता, दुःखहर्ता व अष्टविनायक' },
    category: 'trideva',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raja_Ravi_Varma_-_Mahabharata_-_Ganesha.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Siddhivinayak_temple_mumbai.jpg?width=800',
    primaryShrine: { en: 'Morgaon Mayureshwar / Siddhivinayak Mumbai', hi: 'सिद्धिविनायक मुंबई / मोरगांव', mr: 'सिद्धिविनायक मुंबई / मोरगाव अष्टविनायक' },
    districtOrState: 'Maharashtra',
    mantra: 'ॐ गं गणपतये नमः',
    mantraRoman: 'Om Gam Ganapataye Namaha',
    vahana: { en: 'Mushaka (Mouse)', hi: 'मूषक', mr: 'मूषक (उंदीर)' },
    weaponOrSymbols: { en: 'Parashu (Axe), Pasha (Noose), Modaka', hi: 'परशु, पाश, मोदक', mr: 'परशु, पाश, अंकुश, मोदक' },
    welcomeGreeting: {
      en: 'Ganapati Bappa Morya! Welcome to the sacred abode of Lord Ganesha.',
      hi: 'गणपति बप्पा मोरया! भगवान श्री गणेश के पावन सान्निध्य में आपका स्वागत है।',
      mr: 'गणपती बाप्पा मोरया! मंगलमूर्ती श्री गणेशाच्या पावन चरणी आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! विघ्नहर्ता गणेश आपल्या सर्व संकटांचे निवारण करोत.',
    significance: {
      en: 'Prathama Pujya (first worshipped among all deities). Embodiment of intellect, auspicious beginnings, and remover of all hindrances.',
      hi: 'सर्वप्रथम पूज्य देव, रिद्धि-सिद्धि के दाता और सभी विघ्नों के विनाशक।',
      mr: 'सर्व कार्यात प्रथम वंदनीय. बुद्धिची देवता, रिद्धी-सिद्धीचे पती आणि सर्व संकटांचे निवारण करणारे आराध्य दैवत.'
    },
    festivals: ['Ganesh Chaturthi', 'Angaraki Sankashti', 'Ganesh Jayanti'],
    pujaOfferings: ['21 Modaks', 'Durva Grass (२१ दुर्वा)', 'Red Hibiscus (जास्वंद)', 'Sindoor']
  },

  // 2. Lord Shiva
  {
    serialNo: 2,
    id: 'shiva',
    name: { en: 'Lord Shiva', hi: 'भगवान महादेव शिव', mr: 'श्री कैलासपती महादेव शिव', sa: 'श्रीमहादेवः' },
    title: { en: 'The Supreme Transformer & Lord of Kailash', hi: 'देवाधिदेव महादेव', mr: 'लयकर्ता, त्रिलोचना, महामृत्युंजय' },
    category: 'trideva',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shiva_sitting_on_tiger_skin.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Trimbakeshwar_Temple,_Nashik.jpg?width=800',
    primaryShrine: { en: 'Trimbakeshwar / Kashi Vishwanath / Kedarnath', hi: 'काशी विश्वनाथ / त्र्यंबकेश्वर', mr: 'त्र्यंबकेश्वर नाशिक / काशी विश्वनाथ' },
    districtOrState: 'Nashik / Varanasi / Himalayas',
    mantra: 'ॐ नमः शिवाय • ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
    mantraRoman: 'Om Namah Shivaya • Om Tryambakam Yajamahe',
    vahana: { en: 'Nandi (Sacred Bull)', hi: 'नंदी बैल', mr: 'नंदी' },
    weaponOrSymbols: { en: 'Trishula (Trident), Damru, Crescent Moon, Ganga', hi: 'त्रिशूल, डमरू, चंद्र, गंगा', mr: 'त्रिशूळ, डमरू, भस्म, रुद्राक्ष' },
    welcomeGreeting: {
      en: 'Har Har Mahadev! Om Namah Shivaya! Welcome to the realm of Lord Shiva.',
      hi: 'हर हर महादेव! ॐ नमः शिवाय! देवाधिदेव महादेव के पावन धाम में आपका स्वागत है।',
      mr: 'हर हर महादेव! ॐ नमः शिवाय! कैलासपती महादेवांच्या पावन सान्निध्यात आपले स्वागत.'
    },
    audioGreetingText: 'ॐ नमः शिवाय! हर हर महादेव! देवाधिदेव महादेव आपले कल्याण करोत आणि अमरत्व व शांती प्रदान करोत.',
    significance: {
      en: 'The cosmic dancer (Nataraja) and master of ascetic meditation. Conqueror of death and bestower of liberation (Moksha).',
      hi: 'सृष्टि के संहारक एवं पुनर्जन्म के स्वामी, महाकाल और परमकल्याणकारी महादेव।',
      mr: 'सृष्टीचे लयकार, भोळे सांब, पंचमहाभूतांचे अधिपती आणि कैलासवासी शिवशंकर.'
    },
    festivals: ['Maha Shivratri', 'Shravan Somwar', 'Pradosha Vrat'],
    pujaOfferings: ['Bilva Patra (बेलपत्र)', 'Dhatura', 'Ganga Jal', 'Bhasma', 'Panchamrit']
  },

  // 3. Mata Parvati
  {
    serialNo: 3,
    id: 'parvati',
    name: { en: 'Mata Parvati', hi: 'माता पार्वती', mr: 'आई पार्वती / उमा', sa: 'पार्वती' },
    title: { en: 'The Divine Mother & Supreme Shakti', hi: 'आदिशक्ति एवं जगन्माता', mr: 'सकळ विश्वाची माता व आदिशक्ती' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parvati_by_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi_Amman_Temple_Madurai.jpg?width=800',
    primaryShrine: { en: 'Meenakshi Amman Madurai / Mansa Devi', hi: 'मीनाक्षी सुंदरेश्वर / शक्तिपीठ', mr: 'मीनाक्षी सुंदरेश्वर मदुरै / शक्तीपीठे' },
    districtOrState: 'Tamil Nadu / Pan-India',
    mantra: 'ॐ उमाये नमः • ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
    mantraRoman: 'Om Umaye Namaha',
    vahana: { en: 'Lion / Tiger', hi: 'सिंह', mr: 'सिंह / वाघ' },
    weaponOrSymbols: { en: 'Lotus, Mirror, Trident, Trishula', hi: 'कमल, त्रिशूल', mr: 'कमळ, दर्पण, त्रिशूळ' },
    welcomeGreeting: {
      en: 'Jai Mata Di! Welcome to the protective grace of Mother Parvati.',
      hi: 'जय माता दी! जगन्माता पार्वती के वात्सल्यमयी सान्निध्य में आपका स्वागत है।',
      mr: 'आई जगदंबेचा विजय असो! माता पार्वतीच्या मातृमय कृपेने आपले जीवन उजळून निघो.'
    },
    audioGreetingText: 'जय माता दी! आदिशक्ती जगन्माता पार्वती आपले सदैव रक्षण करोत.',
    significance: {
      en: 'The goddess of fertility, devotion, and divine feminine strength. Consort of Shiva and mother of Ganesha and Kartikeya.',
      hi: 'प्रेम, मातृत्व और शक्ति की अधिष्ठात्री देवी। शिव की अर्धांगिनी और गणेश-कार्तिकेय की जननी।',
      mr: 'मातृत्व, भक्ती आणि तपश्चर्येचे मूर्तिमंत रूप. गणेशाची माता आणि भगवान शंकराची अर्धांगिनी.'
    },
    festivals: ['Gauri Puja', 'Hartalika Teej', 'Navratri'],
    pujaOfferings: ['Haldi-Kumkum', 'Green Bangles', 'Sweet Rice Kheer', 'Pomegranate']
  },

  // 4. Lord Vishnu
  {
    serialNo: 4,
    id: 'vishnu',
    name: { en: 'Lord Vishnu', hi: 'भगवान श्री हरि विष्णु', mr: 'भगवान विष्णू / नारायण', sa: 'श्रीमन्नारायणः' },
    title: { en: 'The Supreme Preserver & Protector of the Universe', hi: 'जगतपालक श्री हरि नारायण', mr: 'विश्वाचे प्रतिपालक, शेषशायी नारायण' },
    category: 'trideva',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishnu_Sheshashayi_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Badrinath_Temple_Uttarakhand.jpg?width=800',
    primaryShrine: { en: 'Badrinath Dham / Sri Ranganathaswamy', hi: 'बद्रीनाथ धाम / तिरुपति बालाजी', mr: 'बद्रीनाथ धाम / श्री रंगनाथस्वामी' },
    districtOrState: 'Uttarakhand / Tamil Nadu',
    mantra: 'ॐ नमो भगवते वासुदेवाय • ॐ विष्णवे नमः',
    mantraRoman: 'Om Namo Bhagavate Vasudevaya',
    vahana: { en: 'Garuda (Divine Eagle)', hi: 'गरुड़ देव', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Sudarshana Chakra, Shankha (Conch), Gada (Mace), Padma (Lotus)', hi: 'शंख, चक्र, गदा, पद्म', mr: 'शंख, सुदर्शन चक्र, कौमोदकी गदा, कमळ' },
    welcomeGreeting: {
      en: 'Om Namo Narayanaya! Welcome to the divine realm of Lord Maha Vishnu.',
      hi: 'ॐ नमो नारायणाय! जगतपालक श्री हरि विष्णु के पावन धाम में आपका स्वागत है।',
      mr: 'ॐ नमो भगवते वासुदेवाय! श्री विष्णूंच्या परम पावन चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ नमो नारायणाय! जगतपालक भगवान विष्णू आपल्या जीवनात सुख, शांती व समाधान देवोत.',
    significance: {
      en: 'The sustainer of cosmic order (Dharma). Reclines on Sheshanaga in the Ocean of Milk (Kshira Sagara). Incarnates in 10 avatars to destroy adharma.',
      hi: 'धर्म की रक्षा के लिए युगों-युगों में दशावतार धारण करने वाले परमेश्वर।',
      mr: 'सृष्टीचे पालनकर्ते. अधर्माचा नाश करून धर्माची पुनर्स्थापना करण्यासाठी १० अवतार घेणारे परमेश्वर.'
    },
    festivals: ['Vaikuntha Ekadashi', 'Anant Chaturdashi', 'Devshayani & Prabodhini Ekadashi'],
    pujaOfferings: ['Tulsi Leaves (तुळस)', 'Yellow Silk Pitambara', 'Yellow Flowers', 'Panchamrit']
  },

  // 5. Mata Lakshmi
  {
    serialNo: 5,
    id: 'lakshmi',
    name: { en: 'Mata Lakshmi', hi: 'माता महालक्ष्मी', mr: 'आई महालक्ष्मी', sa: 'महालक्ष्मीः' },
    title: { en: 'Goddess of Wealth, Fortune & Prosperity', hi: 'धन, धान्य व समृद्धि की देवी', mr: 'ऐश्वर्य, वैभव व सौभाग्याची अधिष्ठात्री' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raja_Ravi_Varma_-_Goddess_Lakshmi.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahalaxmi_Temple,_Kolhapur.jpg?width=800',
    primaryShrine: { en: 'Kolhapur Mahalaxmi (Ambabai) / Tiruchanur', hi: 'कोल्हापुर महालक्ष्मी मंदिर / तिरुपति', mr: 'करवीर निवासिनी अंबाबाई, कोल्हापूर' },
    districtOrState: 'Kolhapur, Maharashtra',
    mantra: 'ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय प्रचुर धन देहि देहि क्लीं ह्रीं श्रीं ॐ',
    mantraRoman: 'Om Shreem Maha Lakshmyai Namaha',
    vahana: { en: 'Owl (Uluka) & White Elephant (Gaja)', hi: 'उल्लू एवं ऐरावत हाथी', mr: 'उलूक (घुबड) व ऐरावत हत्ती' },
    weaponOrSymbols: { en: 'Pink Lotus, Kalasha with Coins, Abhaya Mudra', hi: 'कमल, सुवर्ण कलश', mr: 'गुलाबी कमळ, सोन्याची नाणी, अमृत कलश' },
    welcomeGreeting: {
      en: 'Shubh Labh! Welcome to the radiant presence of Mata Mahalakshmi.',
      hi: 'शुभ लाभ! माता महालक्ष्मी के पावन सान्निध्य में आपका स्वागत है।',
      mr: 'जय महालक्ष्मी माता! माता महालक्ष्मीच्या आशीर्वादाने आपल्या घरी सुख-समृद्धी नांदो.'
    },
    audioGreetingText: 'ॐ श्रीं महालक्ष्म्यै नमः! आई महालक्ष्मीच्या कृपेने आपल्या घरात सदैव सुख, शांती व ऐश्वर्य नांदो.',
    significance: {
      en: 'Consort of Lord Vishnu. Emerged from Samudra Manthan. Bestower of Ashta-Lakshmi boons: wealth, wisdom, courage, grain, progeny, and victory.',
      hi: 'समुद्र मंथन से प्रादुर्भूत, अष्टलक्ष्मी प्रदाता और विष्णु की नित्य सहचरी।',
      mr: 'समुद्रमंथनातून प्रकट झालेली विश्वाची धनदात्री, अष्टलक्ष्मींचे रूप आणि भगवान विष्णूंची अर्धांगिनी.'
    },
    festivals: ['Diwali Lakshmi Pujan', 'Varalakshmi Vratam', 'Kojagiri Purnima', 'Margashirsha Guruvar'],
    pujaOfferings: ['Lotus Flowers', 'Silver Coins', 'Kheer', 'Panchamrit', 'Kunku']
  },

  // 6. Mata Saraswati
  {
    serialNo: 6,
    id: 'saraswati',
    name: { en: 'Mata Saraswati', hi: 'माता सरस्वती', mr: 'आई सरस्वती', sa: 'सरस्वती' },
    title: { en: 'Goddess of Knowledge, Music, Arts & Wisdom', hi: 'विद्या, कला एवं संगीत की अधिष्ठात्री', mr: 'विद्या, कला, संगीत व वाणीची देवता' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raja_Ravi_Varma_-_Goddess_Saraswati.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Basar_Saraswathi_Temple.jpg?width=800',
    primaryShrine: { en: 'Basar Gnana Saraswathi / Sharada Peeth', hi: 'बासर सरस्वती मंदिर / शृंगेरी शारदा पीठ', mr: 'बासर ज्ञान सरस्वती / शृंगेरी शारदा पीठ' },
    districtOrState: 'Telangana / Karnataka',
    mantra: 'ॐ ऐं सरस्वत्यै नमः • या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता',
    mantraRoman: 'Om Aim Saraswatyai Namaha',
    vahana: { en: 'Hamsa (White Swan) & Peacock', hi: 'हंस एवं मयूर', mr: 'हंस व मयूर' },
    weaponOrSymbols: { en: 'Veena, Vedas (Pustaka), Japamala, Sphatika Mala', hi: 'वीणा, वेद पुस्तक, स्फटिक माला', mr: 'वीणा, ग्रंथ (वेद), स्फटिक जपमाळ' },
    welcomeGreeting: {
      en: 'Om Aim Saraswatyai Namaha! Welcome to the temple of pure wisdom and learning.',
      hi: 'विद्यां ददाति विनयं! माता सरस्वती के ज्ञानमय पावन सान्निध्य में आपका स्वागत है।',
      mr: 'या कुन्देन्दुतुषारहारधवला! विद्यादायिनी आई सरस्वतीच्या पावन चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ ऐं सरस्वत्यै नमः! वाग्देवी सरस्वती आपल्या वाणीत आणि बुद्धीत ज्ञानाचा दिव्य प्रकाश देवोत.',
    significance: {
      en: 'The cosmic flow of divine speech (Vak), intellect (Buddhi), and creative eloquence. Dressed in spotless white representing ultimate purity.',
      hi: 'शुद्ध ज्ञान, संगीत, विवेक और काव्य की देवी। अज्ञान के अंधकार को मिटाने वाली।',
      mr: 'सकळ कला आणि ६४ विद्यांची जननी. अज्ञानाचा अंधकार दूर करून बुद्धीला प्रगल्भ करणारी ज्ञानदेवता.'
    },
    festivals: ['Vasant Panchami', 'Navratri Saraswati Puja', 'Vijayadashami Vidyarambham'],
    pujaOfferings: ['White & Yellow Flowers', 'Books & Pens', 'Panchamrit', 'Boondi Ladoo']
  },

  // 7. Lord Hanuman
  {
    serialNo: 7,
    id: 'hanuman',
    name: { en: 'Lord Hanuman', hi: 'पवनपुत्र श्री हनुमान', mr: 'संकटमोचन मारुतीराया', sa: 'हनुमान्' },
    title: { en: 'Sankat Mochan & Embodiment of Devotion', hi: 'संकटमोचन, अष्टसिद्धि नौ निधि के दाता', mr: 'रुद्रावतार, रामभक्त, महावीर मारुती' },
    category: 'mahavira',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_revealing_Rama_and_Sita_in_his_heart.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shree_Kashtabhanjan_Dev_Hanumanji_Temple_Salangpur.jpg?width=800',
    primaryShrine: { en: 'Sankat Mochan Varanasi / Kashtbhanjan Dev Salangpur / Jakhu', hi: 'संकटमोचन वाराणसी / साळंगपुर', mr: 'सारंगपूर कष्टभंजन देव / संकटमोचन वाराणसी' },
    districtOrState: 'Gujarat / UP',
    mantra: 'ॐ हं हनुमते नमः • मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्',
    mantraRoman: 'Om Ham Hanumate Namaha • Manojavam Marutatulyavegam',
    vahana: { en: 'Wind (Vayu) / Self-propelled (Can fly)', hi: 'वायुदेव / स्वयं गतिमान', mr: 'पवन (वायुपुत्र)' },
    weaponOrSymbols: { en: 'Gada (Golden Mace), Dronagiri Mountain', hi: 'गदा, संजीवनी पर्वत', mr: 'सुवर्ण गदा, द्रोणागिरी पर्वत' },
    welcomeGreeting: {
      en: 'Jai Shri Ram! Jai Bajrangbali! Welcome to the fortress of strength and devotion.',
      hi: 'जय श्री राम! जय बजरंगबली! संकटमोचन हनुमान जी के पावन शरण में आपका स्वागत है।',
      mr: 'जय श्रीराम! जय बजरंगबली! संकटमोचन मारुतीरायांच्या चरणी आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'जय श्री राम! ॐ हं हनुमते नमः! पवनपुत्र हनुमान आपले सर्व संकट, भय व दुःखांचे निवारण करोत.',
    significance: {
      en: 'Avatar of Lord Shiva, greatest devotee of Sri Rama. Master of 8 Siddhis and 9 Nidhis. Protector from fears, negativities, and obstacles.',
      hi: 'बल, बुद्धि, विद्या और अगाध भक्ति के सागर। शनिदेव के ताप से मुक्ति दिलाने वाले।',
      mr: 'रुद्रावतार, रामभक्तीचे सर्वोच्च प्रतीक, अष्टसिद्धी व नवनिधींचे दाता आणि सर्व संकटांचे निवारण करणारे बलशाली मारुती.'
    },
    festivals: ['Hanuman Jayanti', 'Tuesdays & Saturdays Vrat'],
    pujaOfferings: ['Sindoor (शेंदूर)', 'Rui/Aak Flower Garland (रुईची माळ)', 'Urad Vada / Betel Leaves (विडा)', 'Jaggery & Roasted Gram']
  },

  // 8. Lord Rama
  {
    serialNo: 8,
    id: 'rama',
    name: { en: 'Lord Sri Rama', hi: 'मर्यादा पुरुषोत्तम प्रभु श्री राम', mr: 'प्रभू श्रीरामचंद्र', sa: 'श्रीरामचन्द्रः' },
    title: { en: 'Embodiment of Righteousness & 7th Avatar of Vishnu', hi: 'मर्यादा पुरुषोत्तम, अयोध्यापति', mr: 'मर्यादा पुरुषोत्तम, कोदंडधारी राम' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raja_Ravi_Varma_-_Rama_Conquers_Varuna.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg?width=800',
    primaryShrine: { en: 'Ram Mandir Ayodhya / Kalaram Mandir Nashik', hi: 'श्री राम जन्मभूमि अयोध्या / काळाराम नाशिक', mr: 'अयोध्या राम जन्मभूमी / काळाराम मंदिर नाशिक' },
    districtOrState: 'Ayodhya, UP / Nashik, Maharashtra',
    mantra: 'श्री राम जय राम जय जय राम • ॐ रां रामाय नमः',
    mantraRoman: 'Shri Ram Jaya Ram Jaya Jaya Ram',
    vahana: { en: 'Divine Chariot', hi: 'दिव्य रथ', mr: 'दिव्य रथ' },
    weaponOrSymbols: { en: 'Kodanda (Bow) & Arrow', hi: 'कोदण्ड धनुष एवं बाण', mr: 'कोदंड धनुष्य व बाण' },
    welcomeGreeting: {
      en: 'Jai Shri Ram! Welcome to the sacred realm of Maryada Purushottam Lord Rama.',
      hi: 'जय श्री राम! मर्यादा पुरुषोत्तम प्रभु श्री राम के पावन चरणों में आपका स्वागत है।',
      mr: 'जय श्रीराम! प्रभू श्रीरामांच्या पावन चरणी आपले सहर्ष स्वागत. राम राज्य आपले जीवन सुखी करो.'
    },
    audioGreetingText: 'श्री राम जय राम जय जय राम! प्रभू श्रीरामचंद्रांचे पावन आशीर्वाद आपल्या जीवनात धर्म व शांती आणोत.',
    significance: {
      en: 'Seventh avatar of Vishnu. The perfect son, husband, king, and upholder of cosmic moral order (Dharma). Vanquished Ravana.',
      hi: 'सत्य, धर्म और त्याग के उच्चतम आदर्श। अधर्मी रावण का संहार कर धर्म की विजय पताका फहराने वाले।',
      mr: 'विष्णूचा सातवा अवतार. आदर्श राजा, सत्यवादी पुत्र आणि रावणाचा वध करून धर्म प्रस्थापित करणारे मर्यादा पुरुषोत्तम.'
    },
    festivals: ['Ram Navami', 'Diwali (Arrival at Ayodhya)', 'Dussehra / Vijayadashami'],
    pujaOfferings: ['Tulsi Leaves', 'Panakam (Jaggery-Pepper water)', 'Yellow Flowers', 'Peda']
  },

  // 9. Mata Sita
  {
    serialNo: 9,
    id: 'sita',
    name: { en: 'Mata Sita', hi: 'माता सीता / जानकी', mr: 'आई सीता माता', sa: 'सीता' },
    title: { en: 'Goddess of Devotion, Purity & Earthly Grace', hi: 'भूमिपुत्री, जनकनंदिनी, त्याग की प्रतिमूर्ति', mr: 'जनकनंदिनी, वैदेही, पातिव्रत्याचे मूर्तिमंत रूप' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sita_Bhumi_Pravesh_by_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Janaki_Mandir%2C_Janakpur%2C_Nepal.jpg?width=800',
    primaryShrine: { en: 'Janakpur Dham / Sitamarhi', hi: 'जनकपुर धाम / सीतामढ़ी', mr: 'जनकपूर धाम (नेपाळ) / सीतामढी' },
    districtOrState: 'Bihar / Nepal',
    mantra: 'ॐ श्री सीतायै नमः • ॐ जानकीवल्लभाय नमः',
    mantraRoman: 'Om Shri Sitayai Namaha',
    vahana: { en: 'Earth (Dharani Devi)', hi: 'धरती माता', mr: 'पृथ्वी माता' },
    weaponOrSymbols: { en: 'Lotus, Divine Grace, Purity', hi: 'कमल, शील', mr: 'कमळ, पातिव्रत्य' },
    welcomeGreeting: {
      en: 'Jai Sita Ram! Welcome to the compassionate presence of Mother Sita.',
      hi: 'जय सिया राम! माता जानकी के पावन वात्सल्य में आपका स्वागत है।',
      mr: 'जय सियाराम! जनकनंदिनी सीतामातेच्या परम पवित्र चरणी आपले स्वागत.'
    },
    audioGreetingText: 'जय सियाराम! माता सीता व प्रभू श्रीरामांचे कृपाशीर्वाद आपल्या कुटुंबावर सदैव राहोत.',
    significance: {
      en: 'Avatar of Goddess Lakshmi, daughter of Mother Earth. Embodiment of unwavering endurance, chastity, and selfless devotion.',
      hi: 'त्याग, धैर्य और पातिव्रत्य की पराकाष्ठा। साक्षात महालक्ष्मी की अवतारी।',
      mr: 'आई पृथ्वीची कन्या, महालक्ष्मीचा अवतार. अढळ धैर्य आणि त्यागाचे प्रतीक.'
    },
    festivals: ['Sita Navami', 'Vivaha Panchami'],
    pujaOfferings: ['Red Chunari', 'Lotus', 'Kheer', 'Turmeric & Kumkum']
  },

  // 10. Lord Krishna
  {
    serialNo: 10,
    id: 'krishna',
    name: { en: 'Lord Sri Krishna', hi: 'भगवान श्रीकृष्ण', mr: 'श्रीकृष्ण / द्वारकाधीश', sa: 'श्रीकृष्णः' },
    title: { en: 'The Supreme Personality & Speaker of Bhagavad Gita', hi: 'योगेश्वर, द्वारकाधीश, माखनचोर', mr: 'जगद्गुरू, बाळकृष्ण, मुरलीधर' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raja_Ravi_Varma_-_Krishna_playing_flute.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dwarkadhish_Temple%2C_Dwarka.jpg?width=800',
    primaryShrine: { en: 'Dwarkadhish Temple / Banke Bihari Vrindavan / Udupi', hi: 'द्वारकाधीश गुजरात / बांके बिहारी वृन्दावन', mr: 'द्वारकाधीश गुजरात / बांकेबिहारी वृंदावन' },
    districtOrState: 'Gujarat / UP',
    mantra: 'ॐ क्लीं कृष्णाय नमः • हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे, हरे राम हरे राम राम राम हरे हरे',
    mantraRoman: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
    vahana: { en: 'Garuda / Kamadhenu Cow', hi: 'गरुड़ एवं कामधेनु गौमाता', mr: 'गरुड व कामधेनू गाय' },
    weaponOrSymbols: { en: 'Flute (Bansuri), Peacock Feather (Mayur Pankh), Sudarshana Chakra', hi: 'बांसुरी, मोरपंख, सुदर्शन चक्र', mr: 'मुरली, मोरपीस, सुदर्शन चक्र, माखन' },
    welcomeGreeting: {
      en: 'Radhe Radhe! Hare Krishna! Welcome to the blissful leela of Lord Krishna.',
      hi: 'राधे राधे! हरे कृष्णा! योगेश्वर भगवान श्रीकृष्ण के आनंदमय सान्निध्य में आपका स्वागत है।',
      mr: 'राधे कृष्ण! हरे कृष्ण! जगद्गुरू श्रीकृष्णांच्या लीलाभूमीमध्ये आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'हरे कृष्ण हरे राम! भगवान श्रीकृष्ण आपल्याला ज्ञानाचा प्रकाश आणि भगवद्गीतेचा कर्मयोग प्रदान करोत.',
    significance: {
      en: 'Eighth avatar of Vishnu. Delivered the immortal wisdom of Bhagavad Gita on Kurukshetra. Embodiment of love, joy, diplomacy, and cosmic truth.',
      hi: 'कुरुक्षेत्र के मैदान में श्रीमद्भगवद्गीता का अमर उपदेश देने वाले जगद्गुरु।',
      mr: 'विष्णूचा आठवा पूर्ण अवतार. कुरुक्षेत्रावर गीतेचे अमर ज्ञान देणारे जगद्गुरू आणि भक्तांचे रक्षक.'
    },
    festivals: ['Janmashtami', 'Gopashtami', 'Radhashtami', 'Holi'],
    pujaOfferings: ['Makhan-Mishri (माखन-मिश्री)', 'Tulsi Dal', 'Peda', 'Yellow Flowers']
  },

  // 11. Mata Radha
  {
    serialNo: 11,
    id: 'radha',
    name: { en: 'Mata Radha', hi: 'राधारानी / किशोरी जी', mr: 'राधा राणी', sa: 'राधा' },
    title: { en: 'Supreme Goddess of Pure Divine Love & Bhakti', hi: 'ह्लादिनी शक्ति, बरसाने वाली', mr: 'प्रेमाची अधिष्ठात्री, ह्लादिनी शक्ती' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Radha_Krishna_by_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Prem_Mandir_Vrindavan_Night_View.jpg?width=800',
    primaryShrine: { en: 'Radha Rani Mandir Barsana / Vrindavan', hi: 'बरसाना राधारानी मंदिर / वृन्दावन', mr: 'बरसाना राधाराणी मंदिर, मथुरा' },
    districtOrState: 'Mathura, UP',
    mantra: 'ॐ रां राधिकायै नमः • राधे राधे जय श्री कृष्णा',
    mantraRoman: 'Om Ram Radhikayai Namaha',
    vahana: { en: 'Swan / Celestial Chariot', hi: 'हंस', mr: 'हंस' },
    weaponOrSymbols: { en: 'Lotus, Chhatra of Love', hi: 'कमल', mr: 'कमळ व प्रेमभावाचे रूप' },
    welcomeGreeting: {
      en: 'Radhe Radhe! Welcome to the divine nectar of Sri Radha Rani.',
      hi: 'राधे राधे! श्रीजी किशोरी जी के पावन प्रेममय धाम में आपका स्वागत है।',
      mr: 'राधे राधे! श्रीराधारानीच्या पावन प्रेमाच्या सान्निध्यात आपले स्वागत.'
    },
    audioGreetingText: 'राधे राधे! राधारानी आपल्या अंतःकरणात प्रभू भक्तीचा निर्मळ प्रवाह निर्माण करोत.',
    significance: {
      en: 'The eternal soul of Krishna (Hladini Shakti). Krishna plays the flute only to call Radha. Without Radha, Krishna worship is incomplete.',
      hi: 'श्रीकृष्ण की आत्मा, पराभक्ति का सर्वोच्च शिखर।',
      mr: 'श्रीकृष्णाची ह्लादिनी शक्ती. भक्तीचे सर्वोच्च रूप, ज्यांच्या स्मरणाशिवाय कृष्णाची पूजा पूर्ण होत नाही.'
    },
    festivals: ['Radhashtami', 'Lathmar Holi Barsana'],
    pujaOfferings: ['Malpua', 'Rabdi', 'Lotus', 'Fragrant Ittar']
  },

  // 12. Lord Vitthal / Vithoba
  {
    serialNo: 12,
    id: 'vitthal',
    name: { en: 'Lord Vitthal (Vithoba)', hi: 'श्री विठ्ठल (पांडुरंग)', mr: 'श्री विठ्ठल - रखुमाई (पंढरपूर)', sa: 'विठ्ठलः' },
    title: { en: 'Supreme Deity of Maharashtra Warkari Sampradaya', hi: 'पंढरीनाथ पांडुरंग, भक्त पुंडलिक वरदा', mr: 'कटेवर हात ठेवून विटेवर उभा असणारा पांडुरंग' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vithoba_Gutenberg.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vitthal_Temple%2C_Pandharpur.jpg?width=800',
    primaryShrine: { en: 'Vithoba Temple Pandharpur, Solapur', hi: 'पंढरपुर विठ्ठल-रुक्मिणी मंदिर, सोलापुर', mr: 'श्री विठ्ठल रुक्मिणी मंदिर, पंढरपूर' },
    districtOrState: 'Solapur, Maharashtra',
    mantra: 'राम कृष्ण हरी • ॐ नमो भगवते वासुदेवाय • जय जय राम कृष्ण हरी',
    mantraRoman: 'Ram Krishna Hari • Pundalika Varada Hari Vitthal',
    vahana: { en: 'Garuda', hi: 'गरुड़', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Standing on a Brick (Veet), Hands on Hips (Katiwar Hath), Kaustubha Mani', hi: 'ईंट पर खड़े, कमर पर हाथ, कौस्तुभ मणि', mr: 'विटेवर पाय, कटीवर हात, गळ्यात तुळशीची माळ' },
    welcomeGreeting: {
      en: 'Pundalika Varada Hari Vitthal! Shri Dnyandev Tukaram! Welcome to the sacred soil of Pandhari.',
      hi: 'पुंडलिक वरदा हरि विठ्ठल! श्री ज्ञानदेव तुकाराम! पंढरीनाथ महाराज की जय!',
      mr: 'पुंडलिक वरदा हरी विठ्ठल! श्री ज्ञानदेव तुकाराम! पंढरीच्या विठुरायाच्या चरणी आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'राम कृष्ण हरी! पुंडलिक वरदा हरी विठ्ठल! माऊली विठुरायांचे प्रेममय आशीर्वाद आपल्या पाठीशी सदैव राहोत.',
    significance: {
      en: 'The beloved mother-father (Mauli) of millions of Maharashtrian warkaris. Stood on a brick thrown by devotee Pundalik to wait forever.',
      hi: 'महाराष्ट्र की वारकरी परंपरा के प्राण। भक्त पुंडलिक के मातृ-पितृ भक्ति से प्रसन्न होकर विट पर युगों से खड़े।',
      mr: 'वारकरी संप्रदायाचे हृदय. भक्त पुंडलिकाच्या मातृ-पितृ भक्तीसाठी विटेवर २८ युगे उभा असलेला दीनदुबळ्यांचा कैवारी.'
    },
    festivals: ['Ashadhi Ekadashi', 'Kartiki Ekadashi', 'Maghi Ekadashi', 'Gopalkala'],
    pujaOfferings: ['Tulsi Mala (तुळशीची माळ)', 'Pedhe', 'Abhir-Bukka (बुक्का)', 'Makhan']
  },

  // 13. Mata Rakhumai / Rukmini
  {
    serialNo: 13,
    id: 'rakhumai',
    name: { en: 'Mata Rakhumai (Rukmini)', hi: 'माता रुक्मिणी (रखुमाई)', mr: 'आई रखुमाई (रुक्मिणी माता)', sa: 'रुक्मिणी' },
    title: { en: 'Consort of Vitthal & Queen of Pandharpur', hi: 'विठ्ठल की पटरानी', mr: 'पंढरीची राणी, विठूरायाची सावली' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vitthala.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vitthal_Temple%2C_Pandharpur.jpg?width=800',
    primaryShrine: { en: 'Rukmini Mandir, Pandharpur', hi: 'रुक्मिणी मंदिर, पंढरपुर', mr: 'श्री रुक्मिणी मंदिर, पंढरपूर' },
    districtOrState: 'Solapur, Maharashtra',
    mantra: 'ॐ श्रीं क्लीं रुक्मिणी वल्लभाय स्वाहा • जय रखुमाई माऊली',
    mantraRoman: 'Om Shreem Kleem Rukmini Vallabhaya Swaha',
    vahana: { en: 'Garuda', hi: 'गरुड़', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Lotus, Traditional Maharashtrian Paithani & Nath', hi: 'कमल, पैठणी, नथ', mr: 'कमळ, पैठणी साडी, कोल्हापुरी साज, नथ' },
    welcomeGreeting: {
      en: 'Jai Rakhumai Mauli! Welcome to Mother Rukmini’s compassionate presence.',
      hi: 'जय रखुमाई माऊली! माता रुक्मिणी के पावन धाम में आपका स्वागत है।',
      mr: 'आई रखुमाईच्या चरणी वंदन! पंढरीच्या राणीचे आशीर्वाद आपल्या परिवाराला लाभोत.'
    },
    audioGreetingText: 'जय रखुमाई माऊली! आई रखुमाई आपल्या जीवनात अखंड सुख, समाधान व सौभाग्य देवोत.',
    significance: {
      en: 'First queen of Lord Krishna in Dwarka and supreme queen in Pandharpur. Receptive to the silent prayers of mothers and families.',
      hi: 'भगवान द्वारकाधीश की पटरानी और साक्षात लक्ष्मी स्वरूपा।',
      mr: 'श्रीकृष्णाची पटरानी आणि साक्षात महालक्ष्मीचे रूप. वारकऱ्यांची प्रेमळ आई.'
    },
    festivals: ['Rukmini Vivah', 'Ashadhi Ekadashi', 'Kartiki Ekadashi'],
    pujaOfferings: ['Paithani Sarees', 'Green Glass Bangles', 'Panchamrit', 'Kunku']
  },

  // 14. Lord Khandoba (Jejuri)
  {
    serialNo: 14,
    id: 'khandoba',
    name: { en: 'Lord Khandoba (Malhari Martand)', hi: 'मल्हारी मार्तंड खंडेराव (जेजुरी)', mr: 'सोन्याची जेजुरी - खंडेराया / मल्हारी मार्तंड', sa: 'मल्लारिः' },
    title: { en: 'Supreme Kuldaivat of Maharashtra & Avatar of Shiva', hi: 'महाराष्ट्र के कुलदेवता, भण्डारा के स्वामी', mr: 'सदानंदाचा येळकोट, भंडाऱ्याची उधळण होणारा देव' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khandoba.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khandoba_temple_Pune.jpg?width=800',
    primaryShrine: { en: 'Khandoba Temple, Jejuri Gad, Pune', hi: 'जेजुरी खंडोबा मंदिर, पुणे', mr: 'जेजुरी गड, पुरंदर, पुणे' },
    districtOrState: 'Pune, Maharashtra',
    mantra: 'येळकोट येळकोट जय मल्हार • सदानंदाचा येळकोट',
    mantraRoman: 'Yelkote Yelkote Jai Malhar • Sadanandacha Yelkote',
    vahana: { en: 'Neela Ghora (Blue/White Horse)', hi: 'नीला घोड़ा', mr: 'निळा घोडा' },
    weaponOrSymbols: { en: 'Khadga (Sword), Trishula, Bhandara (Turmeric Powder)', hi: 'खड्ग (तलवार), त्रिशूल, हल्दी भण्डारा', mr: 'खांडा (तलवार), त्रिशूळ, पिवळाधमक भंडारा' },
    welcomeGreeting: {
      en: 'Yelkote Yelkote Jai Malhar! Sadanandacha Yelkote! Welcome to the Golden Fort of Jejuri.',
      hi: 'यळकोट यळकोट जय मल्हार! सदानंदाचा येळकोट! सोनेरी जेजुरी गडावर आपले स्वागत आहे।',
      mr: 'येळकोट येळकोट जय मल्हार! सदानंदाचा येळकोट! सोन्याच्या जेजुरी गडावर आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'येळकोट येळकोट जय मल्हार! सदानंदाचा येळकोट! कुलदैवत खंडेराया आपल्या संपूर्ण कुळाचे रक्षण करोत.',
    significance: {
      en: 'Fierce avatar of Shiva who vanquished the demons Mani and Malla. Worshipped with showers of bright yellow turmeric (Bhandara).',
      hi: 'मणि-मल्ल दैत्यों का संहार करने वाले भगवान शिव के वीर अवतार।',
      mr: 'महाराष्ट्राच्या बहुजन समाजाचे कुलदैवत. मणी-मल्ल राक्षसांचा वध करून भक्तांना अभय देणारे मल्हारी मार्तंड.'
    },
    festivals: ['Champa Shashthi', 'Somvati Amavasya', 'Khandoba Yatra'],
    pujaOfferings: ['Bhandara Turmeric (हळद)', 'Kh खोबरे (Dry Coconut pieces)', 'Onion-Brinjal Bharit (वांग्याचे भरीत)', 'Rodga / Poli']
  },

  // 15. Mata Tulja Bhavani (Tuljapur)
  {
    serialNo: 15,
    id: 'tulja-bhavani',
    name: { en: 'Mata Tulja Bhavani', hi: 'माता तुलजा भवानी (उस्मानाबाद/धाराशिव)', mr: 'आई तुळजाभवानी (तुळजापूर)', sa: 'भवानी' },
    title: { en: 'Kulswamini of Maharashtra & Patron Deity of Chhatrapati Shivaji Maharaj', hi: 'छत्रपति शिवाजी महाराज की कुलस्वामिनी', mr: 'महाराष्ट्राची कुलस्वामिनी, शिवरायांना भवानी तलवार देणारी माता' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tulja_Bhavani_Devi.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tulja_Bhavani_Mandir,_Tuljapur.jpg?width=800',
    primaryShrine: { en: 'Tuljapur Bhavani Temple, Dharashiv', hi: 'तुळजापुर मंदिर, धाराशिव', mr: 'तुळजापूर भवानी माता मंदिर, धाराशिव' },
    districtOrState: 'Dharashiv, Maharashtra',
    mantra: 'ॐ श्रीं ह्रीं क्लीं श्री तुळजाभवानी दैव्यै नमः • उदो बोला उदो अंबाबाई माऊलीचा हो',
    mantraRoman: 'Udo Bola Udo Ambabai Maulicha Ho • Jai Bhavani Jai Shivaji',
    vahana: { en: 'Simha (Lion)', hi: 'सिंह', mr: 'सिंह' },
    weaponOrSymbols: { en: 'Trishula, Khadga, Chakra, Shankha (Ashtabhuja)', hi: 'त्रिशूल, खड्ग, चक्र (अष्टभुजा)', mr: 'अष्टभुजा, त्रिशूळ, भवानी तलवार, महिषासुरमर्दिनी' },
    welcomeGreeting: {
      en: 'Jai Bhavani! Jai Shivaji! Welcome to the sacred Shaktipeeth of Tuljapur.',
      hi: 'जय भवानी! जय शिवाजी! उदो बोला उदो तुळजाभवानी मातेच्या चरणी आपले स्वागत आहे।',
      mr: 'उदो बोला उदो अंबाबाई माउलीचा हो! जय भवानी, जय शिवाजी! आई तुळजाभवानीच्या दरबारात आपले स्वागत.'
    },
    audioGreetingText: 'उदो बोला उदो अंबाबाई माउलीचा हो! कुलस्वामिनी आई तुळजाभवानी आपल्या पाठीशी सदैव उभी राहोत.',
    significance: {
      en: 'One of the three and a half Shaktipeeths of Maharashtra. Blessed Chhatrapati Shivaji Maharaj with the divine Bhavani sword.',
      hi: 'महाराष्ट्र के साढ़े तीन शक्तिपीठों में से एक। महिषासुरमर्दिनी स्वरूप।',
      mr: 'महाराष्ट्राच्या साडेतीन शक्तीपीठांपैकी एक पूर्ण पीठ. छत्रपती शिवाजी महाराजांना हिंदवी स्वराज्य स्थापनेची प्रेरणा देणारी कुलस्वामिनी.'
    },
    festivals: ['Khandenavami / Dussehra', 'Chaitra Purnima Yatra', 'Shardiya Navratri'],
    pujaOfferings: ['Puran Poli', 'Haldi-Kunku', 'Kapur (Camphor)', 'Chunari & Bangles']
  },

  // 16. Mata Kolhapur Ambabai / Mahalakshmi
  {
    serialNo: 16,
    id: 'kolhapur-ambabai',
    name: { en: 'Kolhapur Mahalaxmi (Ambabai)', hi: 'करवीर निवासिनी अंबाबाई (कोल्हापुर)', mr: 'करवीर निवासिनी आई अंबाबाई (कोल्हापूर)', sa: 'करवीरमहालक्ष्मीः' },
    title: { en: 'Supreme Shaktipeeth & Jewel of Karveer', hi: 'करवीर पीठ की साक्षात महालक्ष्मी', mr: 'दक्षिण काशी कोल्हापूरची कुलस्वामिनी' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahalaxmi_of_Kolhapur.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahalaxmi_Temple,_Kolhapur.jpg?width=800',
    primaryShrine: { en: 'Shri Ambabai Mahalaxmi Mandir, Kolhapur', hi: 'कोल्हापुर महालक्ष्मी मंदिर', mr: 'श्री महालक्ष्मी अंबाबाई मंदिर, कोल्हापूर' },
    districtOrState: 'Kolhapur, Maharashtra',
    mantra: 'ॐ नमः कमलवासिन्यै नारायण्यै नमो नमः • ॐ महालक्ष्म्यै नमः',
    mantraRoman: 'Om Namah Kamalavasinyai Narayanyai Namo Namaha',
    vahana: { en: 'Lion', hi: 'सिंह', mr: 'सिंह' },
    weaponOrSymbols: { en: 'Mhalunga (Citrus fruit), Kaumodaki Gada, Khetaka (Shield), Panapatra', hi: 'गदा, ढाल, म्हाळुंग', mr: 'म्हाळुंग फळ, गदा, ढाल, पानपात्र' },
    welcomeGreeting: {
      en: 'Jai Ambabai! Welcome to the golden sanctum of Karveer Nivasini Mahalakshmi.',
      hi: 'जय अंबाबाई! करवीर निवासिनी महालक्ष्मी के पावन दरगाह में आपका स्वागत है।',
      mr: 'आई अंबाबाईचा उदो उदो! करवीर निवासिनी कोल्हापूरच्या महालक्ष्मी चरणी आपले स्वागत.'
    },
    audioGreetingText: 'आई अंबाबाईचा उदो उदो! करवीर निवासिनी महालक्ष्मी आपल्या जीवनात अखंड ऐश्वर्य व समृद्धी देवोत.',
    significance: {
      en: 'Major Shaktipeeth where rays of the setting sun directly touch the deity twice a year (Kiranotsav). Holds immense spiritual authority.',
      hi: 'किरणोत्सव के लिए विख्यात पावन शक्तिपीठ। जहाँ वर्ष में दो बार सूर्य किरणें देवी के चरणों का स्पर्श करती हैं।',
      mr: 'वर्षातून दोनदा होणारा विहंगम किरणोत्सव सोहळा. जिथे मावळत्या सूर्याची किरणे साक्षात देवीच्या चरणांचे व मुखाचे दर्शन घेतात.'
    },
    festivals: ['Kiranotsav (Jan/Feb & Nov)', 'Navratri Rathotsav', 'Deepavali'],
    pujaOfferings: ['Saaz (Kolhapuri Saaz)', 'Green Paithani', 'Peda', 'Flowers']
  },

  // 17. Lord Dattatreya
  {
    serialNo: 17,
    id: 'dattatreya',
    name: { en: 'Lord Dattatreya', hi: 'गुरुदेव भगवान दत्तात्रेय', mr: 'श्री गुरुदेव दत्त', sa: 'दत्तात्रेयः' },
    title: { en: 'Unified Trinity of Brahma, Vishnu & Shiva', hi: 'त्रिदेव स्वरूप आदिगुरु', mr: 'ब्रह्मा, विष्णू, महेश यांचे एकत्रित स्वरूप' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dattatreya_by_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renuka_Mata_Mahurgad.jpg?width=800',
    primaryShrine: { en: 'Mahur Gad / Gangapur / Narsobawadi / Girnar', hi: 'गाणगापुर / नृसिंहवाडी / माहूर', mr: 'नृसिंहवाडी, कोल्हापूर / गाणगापूर / माहूर गड' },
    districtOrState: 'Kolhapur / Nanded / Karnataka',
    mantra: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा • ॐ द्रां दत्तात्रेयाय नमः',
    mantraRoman: 'Digambara Digambara Shripada Vallabha Digambara',
    vahana: { en: '4 Dogs (Representing 4 Vedas) & Kamadhenu Cow', hi: '४ श्वान (चार वेद) एवं कामधेनु', mr: '४ श्वान (चार वेद) व कामधेनू गाय' },
    weaponOrSymbols: { en: 'Japamala, Kamandalu, Trishula, Damru, Shankha, Chakra (6 hands)', hi: 'त्रिशूल, डमरू, शंख, चक्र, कमंडलु, जपमाला', mr: 'त्रिशूळ, डमरू, शंख, चक्र, कमंडलू, जपमाळ (षड्भुज)' },
    welcomeGreeting: {
      en: 'Digambara Digambara Shripad Vallabh Digambara! Welcome to the sanctuary of Gurudev Datta.',
      hi: 'श्री गुरुदेव दत्त! दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा! पावन सान्निध्य में स्वागत है।',
      mr: 'अवधूत चिंतन श्री गुरुदेव दत्त! दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा! दत्त महाराजांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'अवधूत चिंतन श्री गुरुदेव दत्त! भगवान दत्तात्रेय आपल्या सर्व संकटांचे निवारण करून सद्बुद्धी व आत्मशांती देवोत.',
    significance: {
      en: 'Son of Sage Atri and Anasuya. The ultimate universal Guru who learnt wisdom from 24 natural gurus (wind, earth, water, fire, etc.).',
      hi: 'प्रकृति के २४ तत्वों को अपना गुरु मानकर ज्ञान का मार्ग दिखाने वाले आदिगुरु।',
      mr: 'महर्षी अत्री आणि माता अनुसूया यांचे चिरंजीव. विश्वातील २४ गुरूंकडून बोध घेणारे ज्ञानसूर्य.'
    },
    festivals: ['Datta Jayanti (Margashirsha Purnima)', 'Guru Purnima'],
    pujaOfferings: ['Audumbar Leaves (औदुंबर पाने)', 'Pedhe', 'Gulab Jamun', 'Dhoop']
  },

  // 18. Swami Samarth Maharaj (Akkalkot)
  {
    serialNo: 18,
    id: 'swami-samarth',
    name: { en: 'Swami Samarth Maharaj', hi: 'अक्कलकोट स्वामी समर्थ महाराज', mr: 'श्री स्वामी समर्थ महाराज (अक्कलकोट)', sa: 'स्वामिसमर्थः' },
    title: { en: 'Incarnation of Lord Dattatreya & Ocean of Compassion', hi: 'भिऊ नकोस मी तुझ्या पाठीशी आहे', mr: '"भिऊ नकोस, मी तुझ्या पाठीशी आहे" - अक्कलकोटचे अवधूत' },
    category: 'saints',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Swami_Samarth.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shree_swami_samarth_Akkalkot.jpg?width=800',
    primaryShrine: { en: 'Akkalkot Swami Samarth Vatavruksha Mandir, Solapur', hi: 'अक्कलकोट वटवृक्ष मंदिर', mr: 'वटवृक्ष स्वामी समर्थ मंदिर, अक्कलकोट' },
    districtOrState: 'Solapur, Maharashtra',
    mantra: 'श्री स्वामी समर्थ जय जय स्वामी समर्थ',
    mantraRoman: 'Shri Swami Samarth Jai Jai Swami Samarth',
    vahana: { en: 'Spiritual Radiance', hi: 'आत्मतेज', mr: 'अवधूत स्वरूप' },
    weaponOrSymbols: { en: 'Vatavruksha (Banyan Tree), Paduka, Kafni', hi: 'वटवृक्ष, पादुका, कफनी', mr: 'वटवृक्ष, पादुका, काठी, चिमटा' },
    welcomeGreeting: {
      en: 'Bhiu Nakos Mi Tujhya Pathishi Aahe! Shri Swami Samarth! Welcome to the grace of Swami.',
      hi: 'भिऊ नकोस मी तुझ्या पाठीशी आहे! श्री स्वामी समर्थ महाराज की जय!',
      mr: 'भिऊ नकोस, मी तुझ्या पाठीशी आहे! श्री स्वामी समर्थ जय जय स्वामी समर्थ! अक्कलकोट चरणी आपले स्वागत.'
    },
    audioGreetingText: 'भिऊ नकोस, मी तुझ्या पाठीशी आहे! श्री स्वामी समर्थ जय जय स्वामी समर्थ! स्वामी महाराज आपले सदैव रक्षण करोत.',
    significance: {
      en: 'The eternal Datta avatar who reassured all distressed souls: "Do not fear, I am standing right behind you." Performed countless miracles.',
      hi: '"डरो मत, मैं सदैव तुम्हारे साथ हूँ" - भक्तों के जीवन से भय को सदा के लिए मिटाने वाले समर्थ गुरु।',
      mr: 'भक्तांना अथांग संकटातही जीवन जगण्याचे बळ देणारे परब्रह्म. "भिऊ नकोस मी तुझ्या पाठीशी आहे" हा त्यांचा अमर मंत्र आहे.'
    },
    festivals: ['Swami Samarth Prakat Din (Chaitra Shuddha Dwitiya)', 'Punyatithi (Chaitra Vadya Trayodashi)'],
    pujaOfferings: ['Besan Ladoo', 'Puran Poli', 'Sweet Pan', 'Chafekar Flowers']
  },

  // 19. Sai Baba of Shirdi
  {
    serialNo: 19,
    id: 'sai-baba',
    name: { en: 'Sai Baba of Shirdi', hi: 'शिर्डी के साईं बाबा', mr: 'शिर्डीचे साईबाबा', sa: 'साईनाथः' },
    title: { en: 'Saint of Universal Unity & Compassion', hi: 'सबका मालिक एक • श्रद्धा और सबुरी', mr: 'सबका मालिक एक • श्रद्धा आणि सबुरी' },
    category: 'saints',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shirdi_Sai_Baba_and_devotees.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shirdi_Sai_Baba_Samadhi.jpg?width=800',
    primaryShrine: { en: 'Shirdi Sai Baba Sansthan, Ahmednagar (Ahilyanagar)', hi: 'शिर्डी साईं मंदिर', mr: 'श्री साईबाबा समाधी मंदिर, शिर्डी' },
    districtOrState: 'Ahilyanagar, Maharashtra',
    mantra: 'ॐ साईं राम • ॐ शिर्डी वासाय विद्महे सच्चिदानंदाय धीमहि तन्नो साईं प्रचोदयात्',
    mantraRoman: 'Om Sai Ram • Sabka Malik Ek',
    vahana: { en: 'Horse Shyamkarna', hi: 'श्यामकर्ण घोड़ा', mr: 'श्यामकर्ण घोडा' },
    weaponOrSymbols: { en: 'Udi (Sacred Ash), Satka, Kafni, Chillim', hi: 'उदी (पवित्र भस्म), सटका, कफनी', mr: 'धुनीची उदी, कफनी, सटका, चिलीम' },
    welcomeGreeting: {
      en: 'Om Sai Ram! Sabka Malik Ek! Welcome to the sacred ground of Shirdi.',
      hi: 'ॐ साईं राम! सबका मालिक एक! शिर्डी के पावन धाम में आपका स्वागत है।',
      mr: 'ॐ साईं राम! सबका मालिक एक! शिर्डीच्या पावन भूमीमध्ये आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'ॐ साईं राम! श्रद्धा आणि सबुरीचा मार्ग दाखवणारे शिर्डीचे साईबाबा आपल्या सर्व मनोकामना पूर्ण करोत.',
    significance: {
      en: 'Taught the divine virtues of Shraddha (Faith) and Saburi (Patience). United people of all religions under one truth: God is One.',
      hi: 'सर्वधर्म समभाव और दीन-दुखियों की सेवा के प्रतीक।',
      mr: 'श्रद्धा आणि सबुरीची शिकवण देऊन सर्व मानवजातीला एका धाग्यात गुंफणारे परम कारुणिक संत.'
    },
    festivals: ['Ram Navami Shirdi', 'Guru Purnima', 'Sai Punyatithi (Vijayadashami)'],
    pujaOfferings: ['Champa Flowers', 'Halwa', 'Khichdi', 'Shawl']
  },

  // 20. Sant Gajanan Maharaj (Shegaon)
  {
    serialNo: 20,
    id: 'gajanan-maharaj',
    name: { en: 'Sant Gajanan Maharaj', hi: 'शेगांव के संत गजानन महाराज', mr: 'श्री संत गजानन महाराज (शेगाव)', sa: 'गजाननमहोदयः' },
    title: { en: 'The Great Ascetic & Saint of Vidarbha', hi: 'गणी गण गणात बोते', mr: '"गणी गण गणात बोते" - विदर्भाचे संतसूर्य' },
    category: 'saints',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gajanan_maharaj.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gajanan_maharaj_Temple_image.jpg?width=800',
    primaryShrine: { en: 'Gajanan Maharaj Samadhi Mandir, Shegaon, Buldhana', hi: 'शेगांव गजानन महाराज मंदिर', mr: 'श्री गजानन महाराज समाधी मंदिर, शेगाव, बुलढाणा' },
    districtOrState: 'Buldhana, Maharashtra',
    mantra: 'गणी गण गणात बोते • ॐ श्री गजाननाय नमः',
    mantraRoman: 'Gani Gana Ganat Bote • Om Shri Gajananaaya Namaha',
    vahana: { en: 'Divine Surrender', hi: 'वैराग्य', mr: 'वैराग्य' },
    weaponOrSymbols: { en: 'Chillum, Earthen Pot (Tumdi), Bhakar and Green Chillies', hi: 'तुमड़ी, चिलम, ज्वार की भाकरी', mr: 'मातीची तुमडी, चिलीम, पिठलं-भाकरी' },
    welcomeGreeting: {
      en: 'Gani Gana Ganat Bote! Welcome to the holy soil of Shegaon.',
      hi: 'गणी गण गणात बोते! संत गजानन महाराज के पावन चरणों में आपका स्वागत है।',
      mr: 'गणी गण गणात बोते! शेगावच्या संत गजानन महाराजांच्या पावन चरणी आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'गणी गण गणात बोते! संत गजानन महाराजांच्या कृपेने आपले जीवन साधे, शांत व पवित्र होवो.',
    significance: {
      en: 'Appeared in Shegaon as a detached Brahmgyani. His chant "Gani Gana Ganat Bote" signifies that the individual soul and cosmic soul are one.',
      hi: 'विदर्भ के महान सिद्ध संत जिन्होंने जीव और ब्रह्म की एकता का संदेश दिया।',
      mr: '"जीव आणि ब्रह्म एकच आहेत" हा संदेश देणारे साक्षात परमहंस योगी.'
    },
    festivals: ['Gajanan Maharaj Prakat Din (Magh Vadya Saptami)', 'Rishi Panchami Punyatithi'],
    pujaOfferings: ['Jowar Bhakri with Pithla', 'Green Chilli Thecha (ठेचा)', 'Sweet Boondi']
  },

  // 21. Lord Kartikeya / Murugan
  {
    serialNo: 21,
    id: 'kartikeya',
    name: { en: 'Lord Kartikeya (Murugan / Skanda)', hi: 'भगवान कार्तिकेय (मुरुगन / स्कंद)', mr: 'श्री कार्तिकेय / मुरुगन स्वामी', sa: 'कार्तिकेयः' },
    title: { en: 'Commander of Divine Armies & Son of Shiva-Parvati', hi: 'देवसेनापति स्कंद', mr: 'देवसेनेचे सरसेनापती, ज्ञानाचे अधिपती' },
    category: 'trideva',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Murugan_by_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Palani_Murugan_Temple_Hill.jpg?width=800',
    primaryShrine: { en: 'Palani Murugan / Tiruchendur / Kartik Swami Temple Pune', hi: 'पलानी मुरुगन / कार्तिक स्वामी पुणे', mr: 'कार्तिक स्वामी मंदिर, पर्वती पुणे / पलानी' },
    districtOrState: 'Pune, Maharashtra / Tamil Nadu',
    mantra: 'ॐ शरवणभवाय नमः • ॐ कार्तिकेयाय नमः',
    mantraRoman: 'Om Sharavana Bhavaya Namaha',
    vahana: { en: 'Mayura (Paravani Peacock)', hi: 'मयूर (मोर)', mr: 'मयूर (मोर)' },
    weaponOrSymbols: { en: 'Vel (Divine Spear), Bow', hi: 'वेल (दिव्य भाला)', mr: 'वेल (दिव्य भाला/शक्ती)' },
    welcomeGreeting: {
      en: 'Vetrivel Muruganukku Haroharohara! Welcome to the valorous presence of Lord Murugan.',
      hi: 'ॐ शरवणभवाय नमः! देवसेनापति कार्तिकेय के पावन धाम में आपका स्वागत है।',
      mr: 'हर हर मुरुगन! देवसेनापती कार्तिकेय स्वामींच्या पावन चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ शरवणभवाय नमः! भगवान कार्तिकेय आपल्याला शौर्य, ज्ञान आणि संकटांवर विजय मिळवण्याची शक्ती देवोत.',
    significance: {
      en: 'Vanquished the invincible demon Tarakasura. Embodiment of youth, spiritual courage, and profound Vedic knowledge.',
      hi: 'तारकासुर का वध करने वाले, ज्ञान और साहस के प्रतीक।',
      mr: 'तारकासुराचा वध करणारे, बुद्धिमत्ता आणि युद्धकौशल्याचे अद्वितीय अधिपती.'
    },
    festivals: ['Thaipusam', 'Skanda Sashti', 'Kartik Purnima'],
    pujaOfferings: ['Panchamrit (Palani Panchamirtham)', 'Rose Flowers', 'Milk']
  },

  // 22. Lord Surya Dev
  {
    serialNo: 22,
    id: 'surya',
    name: { en: 'Lord Surya Dev (Sun God)', hi: 'भगवान सूर्य देव', mr: 'भगवान सूर्यनारायण', sa: 'सूर्यनारायणः' },
    title: { en: 'Soul of the Universe & Dispeller of Darkness', hi: 'प्रत्यक्ष देवता, जगत के चक्षु', mr: 'प्रत्यक्ष देवता, दिनकर, विश्वाचे प्राण' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Surya_in_his_chariot.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Konark_Sun_Temple%2C_Odisha.jpg?width=800',
    primaryShrine: { en: 'Konark Sun Temple Odisha / Modhera Gujarat', hi: 'कोणार्क सूर्य मंदिर / मोढेरा', mr: 'कोणार्क सूर्य मंदिर, ओडिशा' },
    districtOrState: 'Odisha / Gujarat',
    mantra: 'ॐ सूर्याय नमः • ॐ घृणि सूर्याय नमः • गायत्री मन्त्र',
    mantraRoman: 'Om Ghrinih Suryaya Namaha • Om Suryaya Namaha',
    vahana: { en: 'Chariot drawn by 7 Horses (7 Rays of Light / 7 Days)', hi: 'सात घोड़ों का रथ', mr: 'सात घोड्यांचा दिव्य रथ' },
    weaponOrSymbols: { en: 'Golden Lotus in both hands, Chakra, Wheel of Time', hi: 'कमल, कालचक्र', mr: 'कमळ, कालचक्र, तेजोमय प्रभा' },
    welcomeGreeting: {
      en: 'Om Suryaya Namaha! Welcome to the radiant warmth of Lord Surya.',
      hi: 'ॐ सूर्याय नमः! प्रत्यक्ष देव सूर्यनारायण के पावन तेज में आपका स्वागत है।',
      mr: 'ॐ घृणि सूर्याय नमः! प्रत्यक्ष देवता सूर्यनारायणाचे तेज आपले जीवन निरोगी व प्रकाशित करो.'
    },
    audioGreetingText: 'ॐ सूर्याय नमः! भगवान सूर्यनारायण आपल्याला उत्तम आरोग्य, तेज आणि यश प्रदान करोत.',
    significance: {
      en: 'The only visibly manifest deity (Pratyaksha Daivam). Source of all light, energy, photosynthesis, seasons, and life on Earth.',
      hi: 'समस्त ब्रह्मांड के ऊर्जादाता, नेत्र और आरोग्य के स्वामी।',
      mr: 'जगातील सर्व प्राणिमात्रांच्या जीवनाचा मुख्य आधार, रोगनाशक आणि तेज देणारे प्रत्यक्ष देव.'
    },
    festivals: ['Makar Sankranti', 'Chhath Puja', 'Ratha Saptami'],
    pujaOfferings: ['Copper Arghya with Water & Roli', 'Red Flowers (जास्वंद)', 'Jaggery-Wheat Ladoo']
  },

  // 23. Lord Chandra Dev
  {
    serialNo: 23,
    id: 'chandra',
    name: { en: 'Lord Chandra Dev (Moon God)', hi: 'भगवान चंद्र देव', mr: 'भगवान चंद्रदेव (सोम)', sa: 'चन्द्रः' },
    title: { en: 'Lord of the Mind, Nectar & Oceans', hi: 'मन के कारक, औषधियों के स्वामी', mr: 'मनाचा कारक, अमृताचा अधिपती, सोम' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chandra_Dev_Moon_God_Hindu.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Somnath_temple.jpg?width=800',
    primaryShrine: { en: 'Somnath Jyotirlinga / Thingalur Chandran Temple', hi: 'सोमनाथ ज्योतिर्लिंग गुजरात', mr: 'सोमनाथ ज्योतिर्लिंग, गुजरात' },
    districtOrState: 'Gujarat / Tamil Nadu',
    mantra: 'ॐ सों सोमाय नमः • ॐ चं चन्द्रमसे नमः',
    mantraRoman: 'Om Som Somaya Namaha',
    vahana: { en: 'Chariot drawn by 10 White Antelopes / Horses', hi: '१० श्वेत हिरण/घोड़ों का रथ', mr: '१० पांढऱ्या हरणांचा रथ' },
    weaponOrSymbols: { en: 'Club, Lotus, Nectar pot (Amrit)', hi: 'गदा, कमल, अमृत कलश', mr: 'गदा, कमळ, अमृत कलश' },
    welcomeGreeting: {
      en: 'Om Somaya Namaha! Welcome to the soothing serenity of Lord Chandra.',
      hi: 'ॐ चं चन्द्रमसे नमः! शीतलता एवं मानसिक शांति के प्रदाता चंद्र देव के सान्निध्य में स्वागत है।',
      mr: 'ॐ सोमाय नमः! मनाला शांती आणि शीतलता देणाऱ्या चंद्रदेवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ चं चन्द्रमसे नमः! चंद्रदेवांच्या कृपेने आपल्या मनात सदैव शांती, समाधान आणि शीतलता राहो.',
    significance: {
      en: 'Rules over human emotions, mind (Manas), tides of the ocean, and vegetative medicinal plants (Oshadhi). Adorns Shiva’s locks.',
      hi: 'मन के अधिष्ठाता, समुद्र ज्वार-भाटा और औषधियों के पोषक।',
      mr: 'मानवी मनाचे कारक, समुद्राच्या भरती-ओहोटीचे नियंत्रक आणि भगवान शंकराच्या जटांमधील भूषण.'
    },
    festivals: ['Sharad Purnima (Kojagiri)', 'Sankashti Chaturthi Moonrise', 'Karwa Chauth'],
    pujaOfferings: ['White Milk Rice Kheer', 'Silver items', 'White Flowers', 'Moti (Pearl)']
  },

  // 24. Lord Kalabhairava
  {
    serialNo: 24,
    id: 'kalabhairava',
    name: { en: 'Lord Kalabhairava', hi: 'भगवान कालभैरव (काशी के कोतवाल)', mr: 'काळभैरवनाथ / काशीचे कोतवाल', sa: 'कालभैरवः' },
    title: { en: 'Fierce Guardian of Time & Kotwal of Kashi', hi: 'समय के अधिपति, काशी के संरक्षक', mr: 'काळाचा अधिपती, काशीचे कोतवाल व भैरवनाथ' },
    category: 'shiva_avatars',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bhairava_standing_with_dog.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kashi_Vishwanath_Temple_Varanasi.jpg?width=800',
    primaryShrine: { en: 'Kalabhairav Mandir Varanasi / Ujjain Kaal Bhairav', hi: 'काशी कालभैरव / उज्जैन भैरव', mr: 'काशी कालभैरव मंदिर / उज्जैन काळभैरव' },
    districtOrState: 'Varanasi, UP / Ujjain, MP',
    mantra: 'ॐ कालभैरवाय नमः • ॐ भं भैरवाय नमः • कालभैरवाष्टकम्',
    mantraRoman: 'Om Kaalabhairavaya Namaha',
    vahana: { en: 'Shvana (Black Dog)', hi: 'काला श्वान (कुत्ता)', mr: 'काळा श्वान (कुत्रा)' },
    weaponOrSymbols: { en: 'Trishula, Kapala (Skull Cup), Damru, Danda', hi: 'त्रिशूल, कपाल, डमरू', mr: 'त्रिशूळ, कपाल, डमरू, दंड' },
    welcomeGreeting: {
      en: 'Jai Kalabhairava! Welcome to the protective realm of the Lord of Time.',
      hi: 'जय कालभैरव! काशी के रक्षक कोतवाल भैरवनाथ के दरबार में आपका स्वागत है।',
      mr: 'काळभैरवनाथाच्या नावाने चांगभलं! काशीच्या कोतवालाच्या पावन चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ कालभैरवाय नमः! कालभैरवनाथ आपले सर्व भय, नकारात्मक ऊर्जा आणि संकटांपासून रक्षण करोत.',
    significance: {
      en: 'Fierce manifestation of Lord Shiva associated with annihilation of ego, fear, and mastery over irreversible Time (Kala).',
      hi: 'अहंकार और भय के संहारक, काल को भी नियंत्रित करने वाले महादेव के रुद्र स्वरूप।',
      mr: 'काळाचे स्वामी, पापांचे नाशक आणि भक्तांना निर्भय बनवणारे साक्षात महादेवांचे उग्र रूप.'
    },
    festivals: ['Kalabhairav Jayanti (Kalashtami)', 'Sundays Puja'],
    pujaOfferings: ['Mustard Oil (मोहरीचे तेल)', 'Black Sesame (काळे तीळ)', 'Urad Vada', 'Chunari']
  },

  // 25. Lord Narasimha
  {
    serialNo: 25,
    id: 'narasimha',
    name: { en: 'Lord Narasimha', hi: 'भगवान नृसिंह (नरसिंह)', mr: 'भगवान नृसिंह (नरसिंह अवतार)', sa: 'नृसिंहः' },
    title: { en: 'The Half-Man Half-Lion 4th Avatar of Vishnu', hi: 'भक्त प्रह्लाद के रक्षक, हिरण्यकश्यपु संहारक', mr: 'भक्त प्रल्हादाचे रक्षक, स्तंभातून प्रकट झालेले भगवान' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lakshmi_Narasimha_sculpture_Halebidu.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ahobilam_Narasimha_Temple.jpg?width=800',
    primaryShrine: { en: 'Ahobilam / Simhachalam / Nira Narsingpur Pune', hi: 'अहोबिलम / नीरा नरसिंहपुर पुणे', mr: 'नीरा नरसिंहपूर (पुणे-सोलापूर) / अहोबिलम' },
    districtOrState: 'Pune, Maharashtra / Andhra Pradesh',
    mantra: 'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम् । नृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम् ॥',
    mantraRoman: 'Ugram Veeram Maha Vishnum Jvalantam Sarvato Mukham',
    vahana: { en: 'Garuda / Self-manifest', hi: 'गरुड़', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Sharp Claws (Nakh), Sudarshana Chakra, Shankha', hi: 'दिव्य नख, चक्र, शंख', mr: 'तीक्ष्ण नखे, सुदर्शन चक्र, शंख' },
    welcomeGreeting: {
      en: 'Jai Lakshmi Narasimha! Welcome to the fortress of instant protection.',
      hi: 'जय नरसिंह भगवान! भक्त प्रह्लाद के रक्षक के पावन सान्निध्य में आपका स्वागत है।',
      mr: 'जय नरसिंह भगवान! भक्तांच्या हाकेला स्तंभातून धावून येणाऱ्या नृसिंहांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ उग्रं वीरं महाविष्णुं नृसिंहं नमाम्यहम्! भगवान नृसिंह आपल्या सर्व संकटांचे क्षणात निवारण करोत.',
    significance: {
      en: 'Burst from a stone pillar to protect child devotee Prahlada and vanquish tyrant Hiranyakashipu at twilight without violating any cosmic boons.',
      hi: 'भक्त की रक्षा के लिए खम्भे को चीरकर प्रकट होने वाले करुणामय एवं अदम्य भगवान।',
      mr: 'भक्ताच्या शब्दाचे रक्षण करण्यासाठी स्तंभातून प्रकट झालेले आणि अहंकारी हिरण्यकश्यपूचा वध करणारे परम दयाळू रक्षक.'
    },
    festivals: ['Narasimha Jayanti (Vaishakh Shukla Chaturdashi)'],
    pujaOfferings: ['Panakam (गुळ-सुंठ पाणी)', 'Pomegranate', 'Red Hibiscus', 'Tulsi']
  },

  // 26. Lord Varaha
  {
    serialNo: 26,
    id: 'varaha',
    name: { en: 'Lord Varaha', hi: 'भगवान वराह', mr: 'भगवान वराह अवतार', sa: 'वराहः' },
    title: { en: 'The Boar Avatar & Rescuer of Earth (Bhudevi)', hi: 'पृथ्वी के उद्धारक, तृतीय अवतार', mr: 'समुद्रातून पृथ्वीला वर काढणारे विष्णूंचे ३ रे रूप' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Varaha_Avatar_Udayagiri_Caves.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tirumala_Venkateswara_Temple_Gopuram.jpg?width=800',
    primaryShrine: { en: 'Sri Varahaswami Temple Tirumala / Bhu Varaha Srimushnam', hi: 'तिरुपति वराहस्वामी मंदिर', mr: 'तिरुपती वराहस्वामी मंदिर' },
    districtOrState: 'Andhra Pradesh',
    mantra: 'ॐ नमो भगवते वराहाय रूपाय भूः पतये नमः',
    mantraRoman: 'Om Namo Bhagavate Varahaya Bhu Pataye Namaha',
    vahana: { en: 'Garuda', hi: 'गरुड़', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Tusks lifting Bhudevi, Sudarshana Chakra, Gada', hi: 'दाढ़ों पर पृथ्वी, चक्र', mr: 'सुळे, सुदर्शन चक्र, कौमोदकी गदा' },
    welcomeGreeting: {
      en: 'Om Varahaya Namaha! Welcome to the divine presence of the savior of Mother Earth.',
      hi: 'ॐ वराहाय नमः! भूदेवी के उद्धारक भगवान वराह के चरणों में आपका स्वागत है।',
      mr: 'ॐ वराहाय नमः! पृथ्वी मातेचे रक्षण करणाऱ्या भगवान वराहांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ वराहाय नमः! भगवान वराह आपल्या जीवनातील सर्व संकटांमधून आपली सुटका करोत.',
    significance: {
      en: 'Defeated demon Hiranyaksha who had dragged Earth into the cosmic ocean depths. Restored Earth back to its orbit on his tusks.',
      hi: 'हिरण्याक्ष का वध कर पृथ्वी को रसातल से बाहर निकालने वाले।',
      mr: 'हिरण्याक्षाचा वध करून पाताळात बुडालेल्या पृथ्वीला आपल्या सुळ्यांवर वर काढणारे विष्णूंचे रूप.'
    },
    festivals: ['Varaha Jayanti (Bhadrapada Shukla Tritiya)'],
    pujaOfferings: ['Roots and Tubers', 'Tulsi', 'Yellow cloth']
  },

  // 27. Lord Kurma
  {
    serialNo: 27,
    id: 'kurma',
    name: { en: 'Lord Kurma (The Tortoise)', hi: 'भगवान कूर्म अवतार', mr: 'भगवान कूर्म अवतार (कासव)', sa: 'कूर्मः' },
    title: { en: 'The Steady Foundation of Samudra Manthan', hi: 'समुद्र मंथन के आधार, द्वितीय अवतार', mr: 'मंथनाचा आधारस्तंभ, विष्णूंचे २ रे रूप' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kurma_avatar_Samudra_Manthan.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Kurmam_Temple.jpg?width=800',
    primaryShrine: { en: 'Sri Kurmam Temple, Srikakulam', hi: 'श्रीकूर्मम मंदिर, आंध्र प्रदेश', mr: 'श्रीकूर्मम मंदिर, श्रीकाकुलम' },
    districtOrState: 'Andhra Pradesh',
    mantra: 'ॐ कूर्माय नमः • ॐ आं ह्रीं क्रों कूर्मासनाय नमः',
    mantraRoman: 'Om Kurmaya Namaha',
    vahana: { en: 'Aquatic / Steady Shell', hi: 'कवच', mr: 'कवच' },
    weaponOrSymbols: { en: 'Mount Mandara on back, Chakra, Shankha', hi: 'मंदराचल पर्वत पीठ पर, शंख, चक्र', mr: 'मंदार पर्वत, शंख, चक्र' },
    welcomeGreeting: {
      en: 'Om Kurmaya Namaha! Welcome to the symbol of stability, patience, and endurance.',
      hi: 'ॐ कूर्माय नमः! स्थिरता एवं धैर्य के प्रतीक भगवान कूर्म के सान्निध्य में स्वागत है।',
      mr: 'ॐ कूर्माय नमः! अढळ स्थिरता आणि धैर्याचे प्रतीक भगवान कूर्मांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ कूर्माय नमः! भगवान कूर्म आपल्या जीवनात अढळ स्थिरता आणि संयम प्रदान करोत.',
    significance: {
      en: 'Supported Mount Mandara on his colossal shell during the cosmic churning of the ocean (Samudra Manthan) which produced Amrita and Goddess Lakshmi.',
      hi: 'समुद्र मंथन के समय मंदराचल पर्वत को अपनी पीठ पर धारण करने वाले।',
      mr: 'समुद्रमंथनाच्या वेळी मंदार पर्वताचा भार आपल्या पाठीवर पेलून अमृताची निर्मिती सुकर करणारे.'
    },
    festivals: ['Kurma Jayanti (Vaishakh Purnima)'],
    pujaOfferings: ['Lotus', 'Tulsi', 'Panchamrit']
  },

  // 28. Lord Matsya
  {
    serialNo: 28,
    id: 'matsya',
    name: { en: 'Lord Matsya (The Fish)', hi: 'भगवान मत्स्य अवतार', mr: 'भगवान मत्स्य अवतार (मासा)', sa: 'मत्स्यः' },
    title: { en: 'The First Avatar & Savior of Vedas from Deluge', hi: 'प्रलय से वेदों के रक्षक, प्रथम अवतार', mr: 'महाप्रलयातून सृष्टी व वेदांचे रक्षण करणारे १ ले रूप' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Matsya_Avatar_saving_the_Vedas.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nagalapuram_Veda_Narayana_Temple.jpg?width=800',
    primaryShrine: { en: 'Matsya Narayana Temple Nagalapuram / Bet Dwarka', hi: 'नागलापुरम मत्स्य मंदिर', mr: 'नागलापुरम मत्स्य मंदिर / बेट द्वारका' },
    districtOrState: 'Andhra Pradesh / Gujarat',
    mantra: 'ॐ मत्स्यरूपाय नमः • ॐ नमो भगवते महामत्स्याय',
    mantraRoman: 'Om Matsyarupaya Namaha',
    vahana: { en: 'Cosmic Ocean', hi: 'प्रलय जल', mr: 'जल' },
    weaponOrSymbols: { en: 'Horn guiding Manu’s boat, Vedas retrieved from Hayagriva', hi: 'सींग, शंख, चक्र, वेद', mr: 'शंख, चक्र, चार वेद' },
    welcomeGreeting: {
      en: 'Om Matsyarupaya Namaha! Welcome to the savior of primordial wisdom.',
      hi: 'ॐ मत्स्यरूपाय नमः! महाप्रलय से वेदों की रक्षा करने वाले श्री हरि के सान्निध्य में स्वागत है।',
      mr: 'ॐ मत्स्यरूपाय नमः! महाप्रलयातून ज्ञानाचे रक्षण करणाऱ्या मत्स्य नारायणांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ मत्स्यरूपाय नमः! भगवान मत्स्य आपल्या बुद्धीचे व ज्ञानाचे सर्व संकटांपासून रक्षण करोत.',
    significance: {
      en: 'Guided King Satyavrata (Manu) and the Saptarishis through the cosmic deluge in a boat tied to his horn; vanquished Shankhasura to retrieve the Vedas.',
      hi: 'प्रलय काल में मनु की नौका को पार लगाने वाले और हयग्रीव से वेद उद्धार करने वाले।',
      mr: 'महाप्रलयातून मनुच्या नौकेचे रक्षण करून शंखासुराकडून वेदांचे रक्षण करणारे विष्णूंचे पहिले रूप.'
    },
    festivals: ['Matsya Jayanti (Chaitra Shukla Tritiya)'],
    pujaOfferings: ['Pure Water', 'Tulsi', 'Yellow flowers']
  },

  // 29. Lord Vamana
  {
    serialNo: 29,
    id: 'vamana',
    name: { en: 'Lord Vamana (Trivikrama)', hi: 'भगवान वामन (त्रिविक्रम)', mr: 'भगवान वामन (त्रिविक्रम अवतार)', sa: 'वामनः' },
    title: { en: 'The Dwarf Brahmin who Measured the Cosmos in Three Strides', hi: 'तीन पग में त्रिलोक नापने वाले, पांचवां अवतार', mr: 'तीन पावलांत तिन्ही लोक व्यापणारे विष्णूंचे ५ वे रूप' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vamana_and_Bali_painting.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vamana_Temple_Khajuraho.jpg?width=800',
    primaryShrine: { en: 'Thrikkakara Temple Kerala / Vamana Temple Khajuraho', hi: 'थ्रिक्काकरा मंदिर केरल', mr: 'थ्रिक्काकरा वामन मंदिर, केरळ' },
    districtOrState: 'Kerala / MP',
    mantra: 'ॐ वामनाय नमः • ॐ नमो भगवते त्रिविक्रमाय',
    mantraRoman: 'Om Vamanaya Namaha • Om Trivikramaya Namaha',
    vahana: { en: 'None (Walks with umbrella)', hi: 'छत्र व कमंडलु', mr: 'छत्री व कमंडलू' },
    weaponOrSymbols: { en: 'Wooden umbrella (Chhatra), Kamandalu, Shaligram', hi: 'छतरी, कमंडलु', mr: 'पळसाचा दंड, छत्री, कमंडलू' },
    welcomeGreeting: {
      en: 'Om Vamanaya Namaha! Welcome to Trivikrama who conquered pride through humility.',
      hi: 'ॐ वामनाय नमः! राजा बलि के उद्धारक भगवान वामन के पावन धाम में आपका स्वागत है।',
      mr: 'ॐ वामनाय नमः! अहंकाराचा नाश करून भक्तीचा मान राखणाऱ्या वामन देवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ वामनाय नमः! भगवान वामन आपल्या जीवनातील अहंकार दूर करून नम्रतेचे तेज प्रदान करोत.',
    significance: {
      en: 'Asked King Mahabali for 3 paces of land. With one step covered Earth, second heaven, and third placed on Bali’s head, granting him immortality in Sutala.',
      hi: 'राजा बलि का अहंकार मिटाकर उन्हें पाताल का राज्य और अमरता प्रदान करने वाले।',
      mr: 'राजा बळीकडून तीन पावले भूमी दान मागून एका पावलात पृथ्वी, दुसऱ्यात स्वर्ग आणि तिसऱ्या पावलाने बळीराजाला अमरत्व देणारे.'
    },
    festivals: ['Vamana Dwadashi', 'Onam Festival Kerala'],
    pujaOfferings: ['Curd Rice', 'Tulsi', 'Yellow flowers']
  },

  // 30. Lord Parashurama
  {
    serialNo: 30,
    id: 'parashurama',
    name: { en: 'Lord Parashurama', hi: 'भगवान परशुराम', mr: 'भगवान परशुराम (चिरंजीवी)', sa: 'परशुरामः' },
    title: { en: 'The Warrior Sage & Creator of Konkan Coast', hi: 'अन्याय के संहारक, कोंकण भूमि के निर्माता', mr: 'कोंकण भूमीचे निर्माते, चिरंजीवी वीर मुनी' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parashurama_with_axe.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parashuram_Temple_Chiplun.jpg?width=800',
    primaryShrine: { en: 'Parashuram Mandir Chiplun, Ratnagiri / Pajaka', hi: 'चिपळूण परशुराम मंदिर, रत्नागिरी', mr: 'श्री परशुराम मंदिर, चिपळूण (रत्नागिरी - कोकण)' },
    districtOrState: 'Ratnagiri, Maharashtra',
    mantra: 'ॐ जामदग्न्याय विद्महे महावीराय धीमहि तन्नो परशुरामः प्रचोदयात्',
    mantraRoman: 'Om Jamadagnyaya Vidmahe Parashuramah Prachodayat',
    vahana: { en: 'Self / Tiger skin', hi: 'व्याघ्र चर्म', mr: 'व्याघ्र चर्म' },
    weaponOrSymbols: { en: 'Parashu (Battle Axe gifted by Shiva), Dhanush', hi: 'परशु (फरसा), धनुष', mr: 'परशु (कुऱ्हाड), धनुष्यबाण' },
    welcomeGreeting: {
      en: 'Jai Parashurama! Welcome to the sacred creator of Aparanta (Konkan).',
      hi: 'जय परशुराम! कोंकण भूमि के स्रष्टा भगवान परशुराम के चरणों में आपका स्वागत है।',
      mr: 'जय परशुराम! कोंकण भूमीचे उद्धारक चिरंजीवी भगवान परशुरामांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ परशुरामाय नमः! भगवान परशुराम आपल्याला अधर्माविरुद्ध लढण्याचे शौर्य व ज्ञान प्रदान करोत.',
    significance: {
      en: 'Sixth avatar of Vishnu, born to Sage Jamadagni and Renuka. Reclaimed the entire western Konkan strip from the sea by shooting an arrow.',
      hi: 'समुद्र को पीछे हटाकर सुंदर कोंकण भूमि का निर्माण करने वाले अमर योद्धा मुनि।',
      mr: 'बाण मारून समुद्राला मागे हटवून पावन कोंकण भूमीची निर्मिती करणारे, जमदग्नी ऋषींचे सुपुत्र.'
    },
    festivals: ['Akshaya Tritiya (Parashuram Jayanti)'],
    pujaOfferings: ['Kheer', 'Betel nut (सुपारी)', 'Coconut', 'Yellow flowers']
  },

  // 31. Lord Kalki
  {
    serialNo: 31,
    id: 'kalki',
    name: { en: 'Lord Kalki', hi: 'भगवान कल्कि (भविष्य अवतार)', mr: 'भगवान कल्कि (दहावा भावी अवतार)', sa: 'कल्किः' },
    title: { en: 'The Tenth Prophesied Avatar & End of Kali Yuga', hi: 'कलयुग के अंत में धर्म की पुनर्स्थापना करने वाले', mr: 'कलियुगाचा अंत करून सत्ययुग आणणारे १० वे रूप' },
    category: 'dashavatara',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kalki_Avatar_on_horse.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient_Temple_Uttar_Pradesh.jpg?width=800',
    primaryShrine: { en: 'Kalki Mandir Sambhal, UP / Jaipur', hi: 'संभल कल्कि धाम, उत्तर प्रदेश', mr: 'संभल कल्कि धाम, उत्तर प्रदेश' },
    districtOrState: 'Sambhal, UP',
    mantra: 'ॐ कल्किने नमः • ॐ क्लीं कल्कि अवताराय नमः',
    mantraRoman: 'Om Kalkine Namaha',
    vahana: { en: 'Devadatta (Winged White Horse)', hi: 'देवदत्त श्वेत अश्व', mr: 'देवदत्त पांढरा घोडा' },
    weaponOrSymbols: { en: 'Blazing Sword of Righteousness (Ratnamala)', hi: 'तेजोमय खड्ग (तलवार)', mr: 'तेजोमय तळपणारी तलवार' },
    welcomeGreeting: {
      en: 'Om Kalkine Namaha! Welcome to the harbinger of the Golden Age (Satya Yuga).',
      hi: 'ॐ कल्किने नमः! सतयुग के आगमन के अग्रदूत भगवान कल्कि के सान्निध्य में स्वागत है।',
      mr: 'ॐ कल्किने नमः! कलियुगातील अंधकार दूर करून सत्ययुगाची पहाट आणणाऱ्या प्रभू कल्कींच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ कल्किने नमः! भगवान कल्कि आपल्या जीवनातील सर्व वाईट विचारांचा संहार करून सत्याची स्थापना करोत.',
    significance: {
      en: 'Prophesied to appear riding the white horse Devadatta to annihilate corruption, adharma, and darkness, ushering in the new Satya Yuga.',
      hi: 'कलियुग के अंत में दुष्टों का संहार कर पुनः सत्य और धर्म की स्थापना करने वाले।',
      mr: 'कलियुगाच्या अंती दुष्ट प्रवृत्तींचा विनाश करून पुन्हा रामराज्य व सत्ययुग आणणारा भावी अवतार.'
    },
    festivals: ['Kalki Jayanti (Bhadrapada Shukla Saptami)'],
    pujaOfferings: ['White Sweets', 'Tulsi', 'Camphor']
  },

  // 32. Lord Brahma
  {
    serialNo: 32,
    id: 'brahma',
    name: { en: 'Lord Brahma', hi: 'भगवान ब्रह्मा (सृष्टिकर्ता)', mr: 'भगवान ब्रह्मदेव (सृष्टीचे निर्माता)', sa: 'ब्रह्मा' },
    title: { en: 'The Cosmic Creator & Grandfather of All Beings', hi: 'सृष्टि के रचयिता, चतुर्मुख प्रजापति', mr: 'चतुर्मुख, विश्वाचे विधाता' },
    category: 'trideva',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brahma_sculpture_Pashupatinath.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brahma_Temple_Pushkar.jpg?width=800',
    primaryShrine: { en: 'Brahma Temple Pushkar, Rajasthan', hi: 'पुष्कर ब्रह्मा मंदिर, राजस्थान', mr: 'पुष्कर ब्रह्मा मंदिर, राजस्थान' },
    districtOrState: 'Pushkar, Rajasthan',
    mantra: 'ॐ ब्रह्मणे नमः • ॐ चतुराननाय विद्महे कमण्डलुधराय धीमहि तन्नो ब्रह्मा प्रचोदयात्',
    mantraRoman: 'Om Brahmane Namaha',
    vahana: { en: 'Hamsa (White Swan)', hi: 'हंस', mr: 'राजहंस' },
    weaponOrSymbols: { en: 'Four Vedas in hands, Kamandalu, Japamala, Sruk (Ladle)', hi: 'चार वेद, कमंडलु, अक्षमाला', mr: 'चार वेद, कमंडलू, जपमाळ' },
    welcomeGreeting: {
      en: 'Om Brahmane Namaha! Welcome to the source of cosmic creation and universal design.',
      hi: 'ॐ ब्रह्मणे नमः! संपूर्ण सृष्टि के रचयिता पितामह ब्रह्मा जी के चरणों में आपका स्वागत है।',
      mr: 'ॐ ब्रह्मणे नमः! या संपूर्ण विश्वाचे सृजन करणाऱ्या पितामह ब्रह्मदेवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ ब्रह्मणे नमः! भगवान ब्रह्मदेव आपल्या जीवनात नवनिर्मिती आणि ज्ञानाचे शुभ मार्ग खुले करोत.',
    significance: {
      en: 'Born from the lotus emanating from Vishnu’s navel. Chanted the four Vedas from his four heads to manifest all physical dimensions.',
      hi: 'भगवान विष्णु की नाभि-कमल से उत्पन्न, वेदों के उद्गाता और समस्त जीवों के पितामह।',
      mr: 'विष्णूच्या नाभीकमळातून प्रकट झालेले, चार मुखांतून चार वेदांचे गायन करून सृष्टीची रचना करणारे.'
    },
    festivals: ['Kartik Purnima Pushkar Mela'],
    pujaOfferings: ['White flowers', 'Kheer', 'Lotus']
  },

  // 33. Mata Gayatri
  {
    serialNo: 33,
    id: 'gayatri',
    name: { en: 'Mata Gayatri', hi: 'माता गायत्री (वेदमाता)', mr: 'आई गायत्री माता (वेदमाता)', sa: 'गायत्री' },
    title: { en: 'Mother of the Vedas & Illuminator of Intellect', hi: 'सद्बुद्धि की देवी, पंचमुखी वेदमाता', mr: 'वेदमाता, विश्वाची बुद्धी प्रदीप्त करणारी माता' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gayatri_Mata_five_headed.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shantikunj_Haridwar_Ashram.jpg?width=800',
    primaryShrine: { en: 'Gayatri Tapobhumi Mathura / Shantikunj Haridwar', hi: 'शांतिकुंज हरिद्वार / मथुरा', mr: 'शांतीकुंज हरिद्वार / मथुरा' },
    districtOrState: 'Haridwar, Uttarakhand',
    mantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    mantraRoman: 'Om Bhur Bhuvah Swah Tat Savitur Varenyam Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat',
    vahana: { en: 'Hamsa (Swan)', hi: 'हंस', mr: 'हंस' },
    weaponOrSymbols: { en: 'Five faces (Panchamukhi), Shankha, Chakra, Lotus, Kamandalu', hi: 'पंचमुख, शंख, चक्र, कमल, कमंडलु', mr: 'पाच मुखे, शंख, चक्र, कमळ, ज्ञानमुद्रा' },
    welcomeGreeting: {
      en: 'Om Bhur Bhuvah Swah! Welcome to the mother of all mantras and eternal wisdom.',
      hi: 'ॐ भूर्भुवः स्वः! वेदमाता गायत्री के पावन प्रकाश में आपका स्वागत है।',
      mr: 'ॐ भूर्भुवः स्वः! सकळ वेदांची माता गायत्री देवीच्या ज्ञानमय चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं! वेदमाता गायत्री आपल्या बुद्धीला प्रकाशाची व सत्याची दिशा देवोत.',
    significance: {
      en: 'The Gayatri Mantra is the most sacred verse in the Rigveda. Chanting it purifies the consciousness, activates the higher intellect, and destroys sins.',
      hi: 'वेदों का सार, मानव बुद्धि को सन्मार्ग पर प्रेरित करने वाली परम चेतना।',
      mr: 'सकळ वेदांचे सार. या मंत्राच्या जपाने बुद्धी तेजस्वी होते आणि सर्व पापांचे क्षालन होते.'
    },
    festivals: ['Gayatri Jayanti (Jyeshtha Shukla Ekadashi)'],
    pujaOfferings: ['Yellow Mustard', 'Ghee Lamp', 'Yellow flowers', 'Panchamrit']
  },

  // 34. Mata Durga
  {
    serialNo: 34,
    id: 'durga',
    name: { en: 'Mata Durga (Mahishasuramardini)', hi: 'माता दुर्गा (महिषासुरमर्दिनी)', mr: 'आई दुर्गा माता (महिषासुरमर्दिनी)', sa: 'दुर्गा' },
    title: { en: 'Invincible Protector & Destroyer of Demonic Forces', hi: 'दुर्गतिनाशिनी, अष्टभुजा शेरावाली', mr: 'दुर्गतिनाशिनी, सिंहारूढ अष्टभुजा माता' },
    category: 'shakti_peeth',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Durga_Mahishasuramardini_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vaishno_Devi_Bhavan_Katra.jpg?width=800',
    primaryShrine: { en: 'Vaishno Devi Katra / Kamakhya / Mysore Chamundeshwari', hi: 'वैष्णो देवी कटरा / चामुंडेश्वरी मैसूर', mr: 'वैष्णोदेवी कटरा / चामुंडेश्वरी मैसूर' },
    districtOrState: 'Jammu & Kashmir / Karnataka',
    mantra: 'ॐ दुं दुर्गायै नमः • सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥',
    mantraRoman: 'Sarva Mangala Mangalye Shive Sarvartha Sadhike • Om Dum Durgayai Namaha',
    vahana: { en: 'Lion / Tiger (Simhavahini)', hi: 'सिंह / बाघ', mr: 'सिंह (सिंहावर स्वार)' },
    weaponOrSymbols: { en: 'Trishula piercing Mahishasura, Sudarshana Chakra, Sword, Bow, Arrow, Conch', hi: 'त्रिशूल, चक्र, तलवार, धनुष', mr: 'त्रिशूळ, चक्र, खड्ग, धनुष्यबाण' },
    welcomeGreeting: {
      en: 'Jai Mata Di! Welcome to the invincible shield of Mother Durga.',
      hi: 'जय माता दी! शेरावाली माँ दुर्गा के पावन दरबार में आपका स्वागत है।',
      mr: 'सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके! आई दुर्गेच्या पावन चरणी आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'जय माता दी! सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके! आई दुर्गा आपल्या जीवनातील सर्व दुष्ट संकटांचा नाश करोत.',
    significance: {
      en: 'Created by the concentrated energy of all Gods to defeat the shape-shifting demon Mahishasura whom no man or god could conquer.',
      hi: 'समस्त देवताओं के सम्मिलित तेज से प्रकट, दुष्टों का संहार और भक्तों की रक्षा करने वाली।',
      mr: 'सर्व देवांच्या एकत्रित तेजातून निर्माण झालेली, महिषासुराचा वध करून विश्वाला अभय देणारी जगदंबा.'
    },
    festivals: ['Shardiya Navratri', 'Chaitra Navratri', 'Durgashtami'],
    pujaOfferings: ['Red Chunari', 'Haldi-Kunku', 'Coconut', 'Halwa-Puri', 'Pomegranate']
  },

  // 35. Mata Mahakali
  {
    serialNo: 35,
    id: 'kali',
    name: { en: 'Mata Mahakali', hi: 'माता महाकाली (कालिका)', mr: 'आई महाकाली', sa: 'महाकाली' },
    title: { en: 'Destroyer of Darkness, Time & Ego', hi: 'अहंकार एवं काल की संहारक', mr: 'अहंकार व अन्यायाचा नाश करणारी प्रचंड शक्ती' },
    category: 'shakti_peeth',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kali_by_Raja_Ravi_Varma.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dakshineswar_Temple_Kolkata.jpg?width=800',
    primaryShrine: { en: 'Kalighat Mandir Kolkata / Dakshineswar / Pavagadh', hi: 'कालीघाट कोलकाता / दक्षिणेश्वर', mr: 'कालीघाट कोलकाता / दक्षिणेश्वर / पावागड' },
    districtOrState: 'West Bengal / Gujarat',
    mantra: 'ॐ क्रीं कालिकायै नमः • ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
    mantraRoman: 'Om Kreem Kalikayai Namaha',
    vahana: { en: 'Preta / Stands on Shiva’s chest in supreme realization', hi: 'महादेव की छाती पर चरण', mr: 'भगवान शंकरांच्या छातीवर पाय' },
    weaponOrSymbols: { en: 'Kharga (Scimitar), Severed Head, Kapala Bowl, Garland of Skulls', hi: 'खड्ग, खप्पर, मुंडमाला', mr: 'खड्ग (तलवार), खप्पर, मुंडमाळा, अभयमुद्रा' },
    welcomeGreeting: {
      en: 'Jai Maha Kali! Welcome to the boundless transformative power of the Divine Mother.',
      hi: 'जय माँ काली! भय और अज्ञान के विनाशक माँ काली के चरणों में आपका स्वागत है।',
      mr: 'जय महाकाली! अज्ञान आणि अहंकाराचा नाश करणाऱ्या आई महाकालीच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ क्रीं कालिकायै नमः! आई महाकाली आपल्या जीवनातील सर्व नकारात्मकता व भय क्षणात भस्म करोत.',
    significance: {
      en: 'The raw, unfiltered feminine energy of the cosmos that swallows all illusions and grants immediate spiritual liberation to true devotees.',
      hi: 'काल और मृत्यु से परे, सत्य की रक्षा करने वाली और भक्तों को अभय प्रदान करने वाली।',
      mr: 'काळाचाही संहार करणारी, दुष्ट राक्षसांचे निर्दालन करणारी आणि भक्तांचे असीम मायेने रक्षण करणारी माता.'
    },
    festivals: ['Kali Puja (Diwali Night)', 'Kaal Ratri (7th day of Navratri)'],
    pujaOfferings: ['Red Hibiscus Garland (रक्त जास्वंद)', 'Mustard Lamp', 'Kheer', 'Sweets']
  },

  // 36. Mata Annapurna
  {
    serialNo: 36,
    id: 'annapurna',
    name: { en: 'Mata Annapurna', hi: 'माता अन्नपूर्णा (काशी)', mr: 'आई अन्नपूर्णा माता (काशी)', sa: 'अन्नपूर्णा' },
    title: { en: 'Goddess of Nourishment & Food Security', hi: 'अन्न एवं पोषण की अधिष्ठात्री', mr: 'अन्नदात्री, भुकेलेल्यांना तृप्त करणारी माता' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Annapurna_feeding_Shiva.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Varanasi_Ghats_and_Temples.jpg?width=800',
    primaryShrine: { en: 'Annapurna Mandir Varanasi / Horanadu Karnataka', hi: 'काशी अन्नपूर्णा मंदिर', mr: 'काशी अन्नपूर्णा मंदिर, वाराणसी' },
    districtOrState: 'Varanasi, UP',
    mantra: 'अन्नपूर्णे सदा पूर्णे शङ्करप्राणवल्लभे । ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति ॥',
    mantraRoman: 'Annapurne Sada Purne Shankara Pranavallabhe',
    vahana: { en: 'Divine Throne in Kashi', hi: 'स्वर्ण सिंहासन', mr: 'सुवर्ण सिंहासन' },
    weaponOrSymbols: { en: 'Golden Ladle (Karavi) and Food Bowl feeding Lord Shiva', hi: 'स्वर्ण कलछी एवं अन्न पात्र', mr: 'सुवर्ण पळी व अन्नपात्र' },
    welcomeGreeting: {
      en: 'Annapurne Sada Purne! Welcome to the mother whose kitchen never runs empty.',
      hi: 'माता अन्नपूर्णा की जय! जिनके कृपा से संसार में कोई भूखा नहीं रहता।',
      mr: 'अन्नपूर्णे सदा पूर्णे! कधीही अन्न कमी पडू न देणाऱ्या अन्नपूर्णा मातेच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'अन्नपूर्णे सदा पूर्णे शङ्करप्राणवल्लभे! अन्नपूर्णा मातेच्या आशीर्वादाने आपल्या घरात सदैव अन्न व धनधान्य भरलेले राहो.',
    significance: {
      en: 'An avatar of Parvati. Fed Lord Shiva in Kashi when he assumed the form of a wandering mendicant to show that food is Brahman.',
      hi: 'साक्षात महादेव को भी भिक्षा प्रदान करने वाली, अन्न और जीवनदायिनी शक्ति।',
      mr: 'साक्षात भगवान शंकरांना भिक्षा वाढून अन्न हेच परब्रह्म आहे हे सिद्ध करणारी जगाची अन्नदात्री.'
    },
    festivals: ['Annakoot / Govardhan Puja', 'Chaitra Annapurna Vrat'],
    pujaOfferings: ['Cooked Rice', 'Grains (धान्य)', 'Kheer', 'Panchamrit']
  },

  // 37. Lord Jagannath (Puri)
  {
    serialNo: 37,
    id: 'jagannath',
    name: { en: 'Lord Jagannath', hi: 'भगवान जगन्नाथ (पुरी)', mr: 'श्री जगन्नाथ (जगताचा नाथ - पुरी)', sa: 'जगन्नाथः' },
    title: { en: 'Lord of the Universe & King of Nilachala', hi: 'जगत के नाथ, महाप्रभु पुरी', mr: 'जगताचा स्वामी, रथयात्रेचा अधिपती' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jagannath_Balabhadra_Subhadra.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jagannath_Temple_Puri_front.jpg?width=800',
    primaryShrine: { en: 'Jagannath Puri Dham, Odisha (One of 4 Char Dhams)', hi: 'जगन्नाथ मंदिर पुरी, ओडिशा', mr: 'श्री जगन्नाथ धाम, पुरी, ओडिशा' },
    districtOrState: 'Puri, Odisha',
    mantra: 'जगन्नाथ स्वामी नयनपथगामी भवतु मे • ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय स्वाहा',
    mantraRoman: 'Jagannatha Swami Nayana Patha Gami Bhavatu Me',
    vahana: { en: 'Nandighosha Ratha (Grand Wooden Chariot)', hi: 'नंदीघोष रथ', mr: 'नंदीघोष रथ' },
    weaponOrSymbols: { en: 'Sudarshana Chakra, Round compassionate eyes, Neem wooden form (Daru Brahma)', hi: 'दारु ब्रह्म, गोल नेत्र', mr: 'दारू ब्रह्म, मोठे गोल डोळे' },
    welcomeGreeting: {
      en: 'Jai Jagannath! Welcome to the sacred shore of Puri Nilachala.',
      hi: 'जय जगन्नाथ! महाप्रभु जगन्नाथ के पावन धाम पुरी में आपका स्वागत है।',
      mr: 'जय जगन्नाथ! जगताचा स्वामी भगवान जगन्नाथांच्या पुरी धाममध्ये आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'जगन्नाथ स्वामी नयनपथगामी भवतु मे! भगवान जगन्नाथ आपल्या जीवनातील सर्व दुःखांचे निवारण करोत.',
    significance: {
      en: 'One of the four sacred Char Dhams. Celebrated with the world-famous Ratha Yatra where the Lord comes out to the streets to bless everyone regardless of caste or creed.',
      hi: 'चार धामों में से एक, विश्व प्रसिद्ध रथयात्रा के अधिपति और महाप्रसाद के दाता।',
      mr: 'चार पावन धामांपैकी एक. जात-पात विसरून सर्व भक्तांना दर्शन देण्यासाठी रस्त्यावर येणारा एकमेव देव.'
    },
    festivals: ['Puri Ratha Yatra (Ashadha Shukla Dwitiya)', 'Snana Yatra', 'Chandan Yatra'],
    pujaOfferings: ['Mahaprasad (५६ भोग)', 'Khaja (खाजा मिठाई)', 'Tulsi']
  },

  // 38. Lord Venkateswara / Balaji (Tirupati)
  {
    serialNo: 38,
    id: 'venkateswara',
    name: { en: 'Lord Venkateswara (Tirupati Balaji)', hi: 'भगवान तिरुपति बालाजी (श्री वेंकटेश्वर)', mr: 'तिरुपती बालाजी (श्री व्यंकटेश)', sa: 'वेङ्कटेश्वरः' },
    title: { en: 'Lord of the Seven Hills (Saptagiri) & Kaliyuga Varada', hi: 'कलियुग के प्रत्यक्ष देव, सात पहाड़ियों के स्वामी', mr: 'कलियुगातील वरदहस्त, सप्तगिरींचे अधिपती' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lord_Venkateswara_Tirupati_Balaji.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tirumala_Venkateswara_Temple_Gopuram.jpg?width=800',
    primaryShrine: { en: 'Tirumala Venkateswara Temple, Tirupati', hi: 'तिरुमला वेंकटेश्वर मंदिर, तिरुपति', mr: 'श्री तिरुमला व्यंकटेश मंदिर, तिरुपती' },
    districtOrState: 'Tirupati, Andhra Pradesh',
    mantra: 'ॐ श्री वेंकटेशाय नमः • गोविंदा गोविंदा • ॐ नमो नारायणाय',
    mantraRoman: 'Govinda Govinda • Om Shri Venkateshaya Namaha',
    vahana: { en: 'Garuda Vahana', hi: 'गरुड़', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Sudarshana Chakra, Shankha, Kati Hasta, Varada Mudra, Diamond Crown', hi: 'शंख, चक्र, हीरों का मुकुट', mr: 'शंख, चक्र, हिऱ्यांचा मुकुट, वक्षस्थळावर पद्मावती' },
    welcomeGreeting: {
      en: 'Govinda Govinda! Venkataramana Govinda! Welcome to Tirumala Saptagiri.',
      hi: 'गोविंदा गोविंदा! भगवान तिरुपति बालाजी के पावन सान्निध्य में आपका स्वागत है।',
      mr: 'गोविंदा गोविंदा! व्यंकटरमणा गोविंदा! तिरुपती बालाजींच्या पावन दरबारात आपले स्वागत.'
    },
    audioGreetingText: 'गोविंदा गोविंदा! भगवान व्यंकटेश आपल्या सर्व मनोकामना पूर्ण करोत आणि आपल्या घराला समृद्धी देवोत.',
    significance: {
      en: 'Kaliyuga avatar of Lord Vishnu residing on the Venkatadri hills to relieve humanity from debts, sins, and tribulations. Famous for Tirupati Ladoo.',
      hi: 'कलियुग में भक्तों की पुकार तुरंत सुनने वाले और संपूर्ण ब्रह्मांड के धन-वैभव के दाता।',
      mr: 'कलियुगातील प्रत्यक्ष कल्पवृक्ष. भक्तांच्या संकटात धावून येणारे आणि पापे भस्म करणारे देव.'
    },
    festivals: ['Brahmotsavam (Sep/Oct)', 'Vaikunta Ekadashi', 'Rathasaptami'],
    pujaOfferings: ['Tirupati Ladoo', 'Tulsi Mala', 'Yellow Pitambar', 'Coins/Hundi offering']
  },

  // 39. Lord Ayyappa (Sabarimala)
  {
    serialNo: 39,
    id: 'ayyappa',
    name: { en: 'Lord Ayyappa (Swami Ayyappan)', hi: 'स्वामी अय्यप्पा (शबरीमला)', mr: 'स्वामी अय्यप्पा (शबरीमला)', sa: 'अय्यप्पः' },
    title: { en: 'Hariharaputra & Lord of the 18 Holy Steps', hi: 'हरिहरपुत्र, १८ पावन सीढ़ियों के स्वामी', mr: 'हरी व हराचे एकत्रित रूप, १८ पायऱ्यांचे स्वामी' },
    category: 'kuldaivat',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lord_Ayyappa_Swami_Sabarimala.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sabarimala_Ayyappa_Temple_Sanctum.jpg?width=800',
    primaryShrine: { en: 'Sabarimala Temple, Pathanamthitta, Kerala', hi: 'शबरीमला मंदिर, केरल', mr: 'शबरीमला मंदिर, केरळ' },
    districtOrState: 'Kerala',
    mantra: 'स्वामिये शरणम अय्यप्पा • ॐ भूतनाथाय विद्महे भवपुत्राय धीमहि तन्नो शास्ता प्रचोदयात्',
    mantraRoman: 'Swamiye Saranam Ayyappa',
    vahana: { en: 'Puli (Tigress)', hi: 'बाघिन', mr: 'वाघीण' },
    weaponOrSymbols: { en: 'Bow & Arrow, Bell tied around neck (Manikantha), Yogic posture with Bandha', hi: 'धनुष-बाण, गले में घंटी, योग मुद्रा', mr: 'धनुष्यबाण, गळ्यात सुवर्ण घंटा (मणिकंठ)' },
    welcomeGreeting: {
      en: 'Swamiye Saranam Ayyappa! Welcome to the sacred hills of Sabarimala.',
      hi: 'स्वामिये शरणम अय्यप्पा! भगवान अय्यप्पा के पावन सान्निध्य में आपका स्वागत है।',
      mr: 'स्वामिये शरणम अय्यप्पा! हरी-हराचे पुत्र स्वामी अय्यप्पांच्या पावन चरणी आपले स्वागत.'
    },
    audioGreetingText: 'स्वामिये शरणम अय्यप्पा! भगवान अय्यप्पा आपल्या जीवनात कठोर तप, संयम आणि मुक्तीची अनुभूती देवोत.',
    significance: {
      en: 'Born of the union of Shiva and Mohini (Vishnu). Emphasizes strict 41-day Vratam of celibacy, simplicity, and non-violence. Sees all pilgrims as one (Tat Tvam Asi).',
      hi: 'तपस्या, ब्रह्मचर्य और आत्मसंयम के सर्वोच्च आदर्श।',
      mr: 'भगवान शंकर आणि मोहिनी (विष्णू) यांचे सुपुत्र. ४१ दिवसांचे कठोर व्रत पाळून भक्तांना आत्मज्ञान देणारे.'
    },
    festivals: ['Makaravilakku (Jan 14)', 'Mandala Pooja (Nov-Dec)'],
    pujaOfferings: ['Ghee in Coconut (नेय्यभिषेकम)', 'Appam & Aravana Payasam', 'Camphor']
  },

  // 40. Lord Shani Dev (Shingnapur)
  {
    serialNo: 40,
    id: 'shani-dev',
    name: { en: 'Lord Shani Dev', hi: 'भगवान शनि देव (शनि शिंगणापुर)', mr: 'श्री शनिदेव (शनि शिंगणापूर)', sa: 'शनैश्चरः' },
    title: { en: 'Dispenser of Karma, Justice & Discipline', hi: 'कर्मफलदाता, सूर्यपुत्र', mr: 'कर्मफळदाता, सूर्यपुत्र, न्यायाची देवता' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shani_Dev_Iconography.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shani_Shingnapur_Temple_Platform.jpg?width=800',
    primaryShrine: { en: 'Shani Shingnapur, Ahilyanagar (Ahmednagar), Maharashtra', hi: 'शनि शिंगणापुर मंदिर, महाराष्ट्र', mr: 'शनि शिंगणापूर, अहिल्यानगर (महाराष्ट्र)' },
    districtOrState: 'Ahilyanagar, Maharashtra',
    mantra: 'ॐ शं शनैश्चराय नमः • ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    mantraRoman: 'Om Sham Shanaishcharaya Namaha',
    vahana: { en: 'Kaka (Crow) / Vulture / Buffalo', hi: 'कौआ (काक)', mr: 'कावळा (काक)' },
    weaponOrSymbols: { en: 'Black Stone Pillar, Bow, Arrow, Trishula, Danda', hi: 'काली पाषाण शिला, त्रिशूल', mr: 'काळा पाषाण, त्रिशूळ, बाण' },
    welcomeGreeting: {
      en: 'Om Sham Shanaishcharaya Namaha! Welcome to the court of supreme cosmic justice.',
      hi: 'ॐ शं शनैश्चराय नमः! न्याय के देवता कर्मफलदाता शनिदेव के चरणों में आपका स्वागत है।',
      mr: 'ॐ शं शनैश्चराय नमः! न्यायाची देवता कर्मफळदाता शनिदेवांच्या पावन चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ शं शनैश्चराय नमः! शनिदेव आपल्या चांगल्या कर्मांना न्याय देवोत आणि सर्व पीडा व संकटांतून मुक्त करोत.',
    significance: {
      en: 'Son of Surya and Chhaya. Rewards good actions and chastises evil. Shani Shingnapur village has no locks or doors due to divine protection.',
      hi: 'न्यायप्रिय न्यायाधीश, जो मनुष्य को उसके कर्मों के अनुसार उचित फल देते हैं।',
      mr: 'सूर्य व छाया यांचे सुपुत्र. कर्माचा न्याय करणारे. शनि शिंगणापूरमध्ये घरांना दारे नसतानाही चोरी होत नाही हे त्यांचे साक्षात प्रमाण.'
    },
    festivals: ['Shani Amavasya', 'Saturdays Oil Abhishekam', 'Shani Jayanti (Jyeshtha Amavasya)'],
    pujaOfferings: ['Mustard / Sesame Oil (काळे तेल)', 'Black Sesame (काळे तीळ)', 'Black Cloth', 'Iron Horseshoe']
  },

  // 41. Lord Dhanvantari
  {
    serialNo: 41,
    id: 'dhanvantari',
    name: { en: 'Lord Dhanvantari', hi: 'भगवान धन्वन्तरि (आयुर्वेद के जनक)', mr: 'भगवान धन्वंतरी (आयुर्वेदाचे जनक)', sa: 'धन्वन्तरिः' },
    title: { en: 'God of Ayurvedic Medicine & Physician of the Devas', hi: 'आरोग्य एवं आयुर्वेद के देवता', mr: 'आरोग्यदाता, देववैद्य, अमृत कलशधारी' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhanvantari_holding_Amrita_pot.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nelluvai_Dhanwanthari_Temple.jpg?width=800',
    primaryShrine: { en: 'Nelluvai Dhanwanthari Temple Kerala / Coimbatore', hi: 'नेल्लुवाई धन्वंतरि मंदिर, केरल', mr: 'नेल्लुवाई धन्वंतरी मंदिर, केरळ' },
    districtOrState: 'Kerala',
    mantra: 'ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये अमृतकलशहस्ताय सर्वभयविनाशाय सर्वरोगनिवारणाय',
    mantraRoman: 'Om Namo Bhagavate Dhanvantaraye Amrita Kalasha Hastaya',
    vahana: { en: 'Garuda', hi: 'गरुड़', mr: 'गरुड' },
    weaponOrSymbols: { en: 'Amrita Kalasha (Nectar Pot), Leech (Jalauka), Shankha, Chakra', hi: 'अमृत कलश, जोंक, शंख, चक्र', mr: 'अमृत कलश, जलौका (जळू), शंख, चक्र' },
    welcomeGreeting: {
      en: 'Om Dhanvantaraye Namaha! Welcome to the divine fountain of eternal health and healing.',
      hi: 'ॐ धन्वन्तरये नमः! आरोग्य और आयुर्वेद के प्रदाता भगवान धन्वन्तरि के सान्निध्य में स्वागत है।',
      mr: 'ॐ धन्वन्तरये नमः! सर्वांना निरोगी व दीर्घायुष्य देणाऱ्या देववैद्य धन्वंतरींच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ धन्वन्तरये नमः! भगवान धन्वंतरी आपल्या जीवनातील सर्व आजार व व्याधी दूर करून परिपूर्ण आरोग्य देवोत.',
    significance: {
      en: 'Avatar of Vishnu who emerged from the cosmic churning of the Ocean (Samudra Manthan) holding the pot of celestial nectar (Amrita) and texts of Ayurveda.',
      hi: 'समुद्र मंथन से अमृत कलश लेकर प्रकट होने वाले देवताओं के वैद्यराज।',
      mr: 'समुद्रमंथनातून हातामध्ये अमृत कलश घेऊन प्रकट झालेले विश्वाचे पहिले वैद्यराज आणि आयुर्वेदाचे जनक.'
    },
    festivals: ['Dhanteras (Dhanvantari Trayodashi - Start of Diwali)'],
    pujaOfferings: ['Medicinal Herbs (तुळस, कडुलिंब)', 'Brass/Copper Utensils', 'Coriander Seeds (धणे)', 'Jaggery']
  },

  // 42. Lord Kubera
  {
    serialNo: 42,
    id: 'kubera',
    name: { en: 'Lord Kubera', hi: 'भगवान कुबेर (धनाध्यक्ष)', mr: 'कुबेर देव (धनाध्यक्ष व खजिनदार)', sa: 'कुबेरः' },
    title: { en: 'Treasurer of the Gods & Lord of Hidden Wealth', hi: 'स्वर्ग के कोषाध्यक्ष, उत्तर दिशा के स्वामी', mr: 'देवांचा खजिनदार, उत्तर दिशेचा दिक्पाल' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kubera_statue_ancient_sculpture.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jageshwar_Dham_Temples_Almora.jpg?width=800',
    primaryShrine: { en: 'Dhopeshwar Mandir Alandi / Jageshwar Dham Almora', hi: 'जागेश्वर धाम अल्मोड़ा / पुष्पक विमान', mr: 'जागेश्वर धाम / कुबेर मंदिर' },
    districtOrState: 'Uttarakhand',
    mantra: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा ॥',
    mantraRoman: 'Om Yakshaya Kuberaya Vaishravanaya Dhanadhanyadhipataye',
    vahana: { en: 'Nara (Man) / Mongoose (Nakula) spitting gems', hi: 'नर / नेवला', mr: 'मनुष्य / मुंगूस (रत्ने ओकणारे)' },
    weaponOrSymbols: { en: 'Gada, Pot of Jewels, Pomegranate, Mongoose', hi: 'गदा, रत्नपात्र, नेवला', mr: 'गदा, रत्नांचा हंडा, डाळिंब' },
    welcomeGreeting: {
      en: 'Om Kuberaya Namaha! Welcome to the guardian of prosperity, treasures, and resources.',
      hi: 'ॐ यक्षाय कुबेराय नमः! धन-वैभव के रक्षक कुबेर देव के सान्निध्य में आपका स्वागत है।',
      mr: 'ॐ कुबेराय नमः! विश्वाच्या संपत्तीचे रक्षण करणारे धनाध्यक्ष कुबेरदेवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ कुबेराय नमः! कुबेर देवांच्या कृपेने आपल्या घरात धन, धान्य आणि समृद्धीची कधीही कमतरता भासू नये.',
    significance: {
      en: 'King of Yakshas and regent of the North. Trusted banker to Lord Venkateswara during his wedding with Padmavathi.',
      hi: 'उत्तर दिशा के दिक्पाल और कुबेर निधि के स्वामी।',
      mr: 'उत्तर दिशेचे दिक्पाल आणि साक्षात तिरुपती बालाजींना विवाहप्रसंगी कर्ज देणारे धनाध्यक्ष.'
    },
    festivals: ['Dhanteras', 'Diwali Lakshmi-Kubera Puja'],
    pujaOfferings: ['Gold / Silver Coins', 'Kheer', 'Yellow flowers', 'Dhoop']
  },

  // 43. Lord Indra
  {
    serialNo: 43,
    id: 'indra',
    name: { en: 'Lord Indra (Devraj Indra)', hi: 'देवराज इंद्र', mr: 'देवराज इंद्र (स्वर्गाधिपती)', sa: 'इन्द्रः' },
    title: { en: 'King of the Devas, God of Lightning, Storms & Rains', hi: 'देवताओं के राजा, वज्रधर', mr: 'देवांचा राजा, स्वर्गाचा अधिपती, वज्रपाणी' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indra_on_Airavata_elephant.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indore_Rajwada_Heritage.jpg?width=800',
    primaryShrine: { en: 'Indreshwar Temple Indore / Kangra', hi: 'इंद्रेश्वर मंदिर, इंदौर', mr: 'इंद्रेश्वर मंदिर, इंदूर' },
    districtOrState: 'Madhya Pradesh',
    mantra: 'ॐ इंद्राय नमः • ॐ सहस्रनेत्राय विद्महे वज्रहस्ताय धीमहि तन्नो इंद्रः प्रचोदयात्',
    mantraRoman: 'Om Indraya Namaha',
    vahana: { en: 'Airavata (Four-tusked White Elephant)', hi: 'ऐरावत हाथी', mr: 'ऐरावत पांढरा हत्ती' },
    weaponOrSymbols: { en: 'Vajra (Thunderbolt crafted from Sage Dadhichi’s bone), Rainbow (Indradhanush)', hi: 'वज्र, धनुष', mr: 'वज्र, धनुष्य, इंद्रधनुष्य' },
    welcomeGreeting: {
      en: 'Om Indraya Namaha! Welcome to the radiant presence of the King of the Celestials.',
      hi: 'ॐ इंद्राय नमः! देवराज इंद्र के पावन सान्निध्य में आपका स्वागत है।',
      mr: 'ॐ इंद्राय नमः! स्वर्गाचे अधिपती आणि पावसाचे देव देवराज इंद्रांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ इंद्राय नमः! देवराज इंद्रांच्या आशीर्वादाने पर्जन्याची कृपा होवो आणि सर्वत्र भरभराट नांदो.',
    significance: {
      en: 'Most celebrated hero of the Rigveda. Defeated the drought dragon Vritra with the Vajra to release the waters to humanity.',
      hi: 'ऋग्वेद के प्रमुख देवता, वृत्रासुर का वध कर वर्षा कराने वाले।',
      mr: 'ऋग्वेदातील प्रमुख देवता. वृत्रासुराचा वध करून पृथ्वीवर जलधारा मुक्त करणारे वज्रधारी देवराज.'
    },
    festivals: ['Indra Jatra', 'Govardhan Puja (Indra’s surrender)'],
    pujaOfferings: ['Soma / Pure Water', 'Ghee Lamp', 'Yellow flowers']
  },

  // 44. Lord Agni Dev
  {
    serialNo: 44,
    id: 'agni',
    name: { en: 'Lord Agni Dev', hi: 'भगवान अग्नि देव', mr: 'भगवान अग्निदेव (पावक)', sa: 'अग्निः' },
    title: { en: 'Divine Messenger & Acceptor of All Sacrifices', hi: 'यज्ञमुख, पावक, हव्यवाहन', mr: 'यज्ञाचा स्वामी, सर्व आहुती देवांपर्यंत पोहोचवणारे पावक' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Agni_God_of_Fire_Hindu.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arunachalesvara_Temple_Tiruvannamalai.jpg?width=800',
    primaryShrine: { en: 'Agneeswarar Temple Kanjanoor / Tiruvannamalai (Agni Lingam)', hi: 'अरुणाचलम अग्नि लिंगम / तिरुवन्नामलाई', mr: 'अरुणाचलम अग्नि लिंगम, तिरुवण्णामलाई' },
    districtOrState: 'Tamil Nadu',
    mantra: 'ॐ अग्नये नमः • अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥',
    mantraRoman: 'Agnimile Purohitam Yajnasya Devam Ritvijam',
    vahana: { en: 'Mesha (Ram / Male Sheep)', hi: 'मेष (बकरा/भेड़)', mr: 'मेष (मेंढा)' },
    weaponOrSymbols: { en: 'Seven tongues of flame, Flaming spear, Jwala', hi: 'सप्तज्वाला, ज्वाला दंड', mr: 'सात अग्नीच्या जिभा, सुवर्ण ज्वाला' },
    welcomeGreeting: {
      en: 'Om Agnaye Namaha! Welcome to the sacred flame of transformation and purity.',
      hi: 'ॐ अग्नये नमः! पवित्र पावक अग्निदेव के सान्निध्य में आपका स्वागत है।',
      mr: 'ॐ अग्नये नमः! सर्व अशुद्धी भस्म करून पवित्रता देणाऱ्या अग्निदेवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ अग्नये नमः! अग्निदेव आपल्या आतील तामसिक विचार भस्म करून ज्ञानाचा यज्ञ प्रज्वलित करोत.',
    significance: {
      en: 'The very first word of the Rigveda. Agni is the mouth of all deities; offerings put in sacred fire reach the respective gods.',
      hi: 'समस्त देवताओं का मुख, यज्ञों के साक्षी और ऋग्वेद के प्रथम मंत्र के देवता।',
      mr: 'ऋग्वेदाचे पहिले अक्षर ज्यांच्या नावाने सुरू होते. यज्ञातील सर्व आहुती देवांपर्यंत पोहोचवणारे दूत.'
    },
    festivals: ['Holi Fire', 'Yajna / Havan Ceremonies'],
    pujaOfferings: ['Pure Cow Ghee (गायीचे तूप)', 'Samidha wood', 'Havan Samagri', 'Camphor']
  },

  // 45. Lord Varuna
  {
    serialNo: 45,
    id: 'varuna',
    name: { en: 'Lord Varuna', hi: 'भगवान वरुण देव', mr: 'भगवान वरुणदेव (जलाधिपती)', sa: 'वरुणः' },
    title: { en: 'Lord of the Oceans, Waters & Cosmic Moral Law (Rta)', hi: 'जल एवं समुद्र के स्वामी, पाशधारी', mr: 'समुद्र, नद्या व जलाचे अधिपती' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Varuna_God_of_Oceans_Makara.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Somnath_temple.jpg?width=800',
    primaryShrine: { en: 'Varunadeva Temple Karachi / Udupi / Puri Shore', hi: 'वरुण मंदिर', mr: 'वरुण मंदिर / समुद्रतीर्थ' },
    districtOrState: 'Coastal India',
    mantra: 'ॐ वरुणाय नमः • ॐ जलबिंबाय विद्महे नीलपुरुषाय धीमहि तन्नो वरुणः प्रचोदयात्',
    mantraRoman: 'Om Varunaya Namaha',
    vahana: { en: 'Makara (Sea Monster / Crocodile-like creature)', hi: 'मकर', mr: 'मकर (जलचर)' },
    weaponOrSymbols: { en: 'Pasha (Noose of moral truth), Conch, Kalasha', hi: 'पाश, शंख, जलपात्र', mr: 'पाश (दोरी), शंख, जलकुंभ' },
    welcomeGreeting: {
      en: 'Om Varunaya Namaha! Welcome to the sovereign of oceans, rains, and cosmic law.',
      hi: 'ॐ वरुणाय नमः! समस्त जलराशियों के स्वामी वरुण देव के पावन सान्निध्य में स्वागत है।',
      mr: 'ॐ वरुणाय नमः! सर्व नद्या, समुद्र आणि जलाचे स्वामी वरुणदेवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ वरुणाय नमः! वरुणदेव आपल्या जीवनात शुद्धता, जीवनशक्ती आणि समृद्धी प्रदान करोत.',
    significance: {
      en: 'Regulates water cycle, clouds, and celestial oceans. Guardian of cosmic truth who binds untruth with his unbreakable noose.',
      hi: 'जल के स्वामी और सृष्टि के नैतिक नियमों (ऋत) के संरक्षक।',
      mr: 'पृथ्वीवरील सर्व जलाचे नियंत्रण करणारे आणि विश्वातील नैतिक नियमांचे (ऋत) रक्षण करणारे देव.'
    },
    festivals: ['Narali Purnima (Coconut Day in Maharashtra)', 'Jhulelal Jayanti (Cheti Chand)'],
    pujaOfferings: ['Coconut (नारळ अर्पण)', 'Ganga Jal', 'White Flowers', 'Sugar']
  },

  // 46. Lord Vayu Dev
  {
    serialNo: 46,
    id: 'vayu',
    name: { en: 'Lord Vayu Dev', hi: 'भगवान वायु देव (पवनदेव)', mr: 'भगवान वायुदेव (पवनदेव / प्राण)', sa: 'वायुः' },
    title: { en: 'God of the Wind, Breath of Life (Prana) & Father of Hanuman', hi: 'प्राणवायु के स्वामी, हनुमान जी के पिता', mr: 'प्राणवायूचे स्वामी, मारुतीरायांचे पिता' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vayu_God_of_Wind_Hindu.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Srikalahasti_Temple_Gopuram.jpg?width=800',
    primaryShrine: { en: 'Srikalahasti Temple (Vayu Lingam), Andhra Pradesh', hi: 'श्रीकालहस्ती वायु लिंगम, आंध्र प्रदेश', mr: 'श्रीकालहस्ती मंदिर (वायू लिंग), आंध्र प्रदेश' },
    districtOrState: 'Andhra Pradesh',
    mantra: 'ॐ वायवे नमः • ॐ वातवे नमः • ॐ पवनाय नमः',
    mantraRoman: 'Om Vayave Namaha • Om Pavanaya Namaha',
    vahana: { en: 'Gazelle / Antelope (Swift Deer)', hi: 'मृग (हिरण)', mr: 'हरिण (मृग)' },
    weaponOrSymbols: { en: 'Dhvaja (Flag), Ankusha, Fan', hi: 'ध्वजा, अंकुश', mr: 'ध्वज, अंकुश, वायू चक्र' },
    welcomeGreeting: {
      en: 'Om Vayave Namaha! Welcome to the lord of breath, movement, and life itself.',
      hi: 'ॐ वायवे नमः! समस्त प्राण ऊर्जा के स्रोत पवनदेव के पावन सान्निध्य में स्वागत है।',
      mr: 'ॐ वायवे नमः! शरीरातील प्राणवायू आणि चैतन्याचे स्रोत पवनदेवांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ वायवे नमः! वायुदेव आपल्या शरीरातील प्राणशक्ती आणि उत्साह सदैव जागृत ठेवोत.',
    significance: {
      en: 'Sustains every living being as the 5 vital Pranas (Prana, Apana, Vyana, Udana, Samana). Spiritual father of Lord Hanuman and Bhima.',
      hi: 'जीवों के श्वास-प्रश्वास के स्वामी और महावीर हनुमान के जनक।',
      mr: 'शरीरातील पंचप्राणांचे अधिपती आणि संकटमोचन मारुतीरायांचे परम पिता.'
    },
    festivals: ['Shivratri at Srikalahasti', 'Hanuman Jayanti'],
    pujaOfferings: ['Incense sticks (अगरबत्ती)', 'White flowers', 'Camphor']
  },

  // 47. Lord Yama (Dharmaraja)
  {
    serialNo: 47,
    id: 'yama',
    name: { en: 'Lord Yama (Dharmaraja)', hi: 'यमराज (धर्मराज)', mr: 'यमराज / धर्मराज', sa: 'यमः' },
    title: { en: 'God of Cosmic Justice, Death & Sovereign of Dharma', hi: 'धर्मराज, सत्य एवं न्याय के देवता', mr: 'धर्मराज, काळाचे नियमक, न्यायाचे देव' },
    category: 'vedic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yama_Lord_of_Dharma_and_Death.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yamunotri_Temple_Uttarakhand.jpg?width=800',
    primaryShrine: { en: 'Yama Temple Srivanjiyam Tamil Nadu / Yamunotri', hi: 'यमुना तट यम मंदिर', mr: 'यमराज मंदिर, श्रीवांचियम / यमुनोत्री' },
    districtOrState: 'Tamil Nadu / Uttarakhand',
    mantra: 'ॐ यमाय नमः • ॐ धर्मराजाय विद्महे दण्डधराय धीमहि तन्नो यमः प्रचोदयात्',
    mantraRoman: 'Om Yamaya Namaha • Om Dharmarajaya Namaha',
    vahana: { en: 'Mahisha (Black Water Buffalo)', hi: 'काला भैंसा', mr: 'रेडा (रेडा/म्हैस)' },
    weaponOrSymbols: { en: 'Pasha (Noose), Gada (Mace), Danda (Rod of Justice)', hi: 'पाश, कालदंड, गदा', mr: 'पाश (दोरी), कालदंड, गदा' },
    welcomeGreeting: {
      en: 'Om Dharmarajaya Namaha! Welcome to the incorruptible judge of truth and mortal life.',
      hi: 'ॐ धर्मराजाय नमः! निष्पक्ष न्याय और सत्य के देवता यमराज के चरणों में आपका स्वागत है।',
      mr: 'ॐ धर्मराजाय नमः! सत्य आणि निष्पक्ष न्यायाचे प्रतीक धर्मराज यमांच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'ॐ धर्मराजाय नमः! धर्मराज यम आपल्याला सदैव सत्याच्या आणि धर्माच्या मार्गावर चालण्याची बुद्धी देवोत.',
    significance: {
      en: 'Son of Surya and brother of Yamuna and Shani. Taught the supreme mysteries of the immortal soul (Atman) to young Nachiketa in the Katha Upanishad.',
      hi: 'कठोपनिषद् में नचिकेता को आत्मज्ञान देने वाले और सत्य के परम रक्षक।',
      mr: 'कठोपनिषदामध्ये नचिकेताला आत्म्याचे गूढ अमर ज्ञान देणारे महान गुरु आणि सूर्यपुत्र.'
    },
    festivals: ['Yama Deepam (Dhanteras night)', 'Bhai Dooj (Bhav-Bij)'],
    pujaOfferings: ['Four-wick Oil Lamp (चौमुखी दिवा)', 'Black Sesame', 'Urad Dal']
  },

  // 48. Mata Ganga
  {
    serialNo: 48,
    id: 'ganga',
    name: { en: 'Mata Ganga', hi: 'माँ गंगा (सुरसरि)', mr: 'आई गंगा माता (भागीरथी)', sa: 'गङ्गा' },
    title: { en: 'Sacred Purifier River of Heaven & Mother of Salvation', hi: 'मोक्षदायिनी, पतितपावनी, भागीरथी', mr: 'मोक्षदायिनी, पापहारिणी, स्वर्गातून आलेली नदी' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ganga_goddess_on_makara.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gangotri_Temple_Uttarakhand.jpg?width=800',
    primaryShrine: { en: 'Gangotri Dham / Haridwar Har Ki Pauri / Kashi Ghats', hi: 'गंगोत्री / हरिद्वार / वाराणसी', mr: 'गंगोत्री धाम / हरिद्वार हर की पौरी / काशी' },
    districtOrState: 'Uttarakhand / UP',
    mantra: 'ॐ नमो भगवत्यै काश्यावासाय गङ्गायै नमः • हर हर गंगे, नमामि गंगे',
    mantraRoman: 'Har Har Gange • Om Namo Gangayai Namaha',
    vahana: { en: 'Makara (Crocodile)', hi: 'मकर', mr: 'मकर (जलचर)' },
    weaponOrSymbols: { en: 'Water Pot (Purna Kumbha), Lotus, Flowing crystalline currents', hi: 'अमृत कलश, श्वेत कमल', mr: 'अमृत कलश, कमळ' },
    welcomeGreeting: {
      en: 'Har Har Gange! Welcome to the purifying celestial currents of Mother Ganga.',
      hi: 'हर हर गंगे! पतितपावनी माँ गंगा के पावन जल में आपका स्वागत है।',
      mr: 'हर हर गंगे! पतितपावनी मोक्षदायिनी आई गंगेच्या पावन धारेत आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'हर हर गंगे! नमामि गंगे! आई गंगेच्या पावन स्नानाने आपले सर्व पाप व चिंता धुऊन निघोत.',
    significance: {
      en: 'Brought down from the heavens by King Bhagiratha’s relentless penance. Caught by Lord Shiva in his matted locks to save Earth from her torrential fall.',
      hi: 'राजा भगीरथ की तपस्या से पृथ्वी पर अवतरित, शिव की जटाओं से प्रवाहित मोक्षदायिनी।',
      mr: 'भगीरथाच्या तपश्चर्येने स्वर्गातून पृथ्वीवर उतरलेली आणि महादेवांच्या जटांमधून शांत होऊन वाहणारी मोक्षदायिनी.'
    },
    festivals: ['Ganga Dussehra', 'Kumbh Mela', 'Kartik Purnima Dev Deepawali'],
    pujaOfferings: ['Floating Leaf Lamps (दीपदान)', 'Milk', 'Flowers', 'Panchamrit']
  },

  // 49. Mata Yamuna
  {
    serialNo: 49,
    id: 'yamuna',
    name: { en: 'Mata Yamuna (Kalindi)', hi: 'माँ यमुना (कालिंदी)', mr: 'आई यमुना माता (कालिंदी)', sa: 'यमुना' },
    title: { en: 'Goddess of Divine Love & Krishna’s Eternal Stream', hi: 'सूर्यपुत्री, कृष्णप्रिया, यम की बहन', mr: 'सूर्यपुत्री, श्रीकृष्णाची लाडकी कालिंदी' },
    category: 'tridevi',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yamuna_goddess_sculpture.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yamunotri_Temple_Uttarakhand.jpg?width=800',
    primaryShrine: { en: 'Yamunotri Dham / Mathura Vishram Ghat / Vrindavan', hi: 'यमुनोत्री धाम / मथुरा विश्राम घाट', mr: 'यमुनोत्री धाम / मथुरा विश्राम घाट' },
    districtOrState: 'Uttarakhand / UP',
    mantra: 'ॐ यमुनाथायै नमः • ॐ सूर्यतनयायै नमः • यमुनाष्टकम्',
    mantraRoman: 'Om Yamunathayai Namaha • Namami Yamunam Aham',
    vahana: { en: 'Kurma (Tortoise)', hi: 'कछुआ (कूर्म)', mr: 'कासव (कूर्म)' },
    weaponOrSymbols: { en: 'Lotus, Kalasha, Blue Waters', hi: 'कमल, जलपात्र', mr: 'कमळ, अमृतपात्र, निळेशार पाणी' },
    welcomeGreeting: {
      en: 'Jai Yamuna Maiya! Welcome to the sacred waters of Sri Krishna’s transcendental pastimes.',
      hi: 'जय यमुना मैया! भगवान श्रीकृष्ण की परम प्रिय माँ कालिंदी के पावन तट पर स्वागत है।',
      mr: 'जय यमुना मैया! श्रीकृष्णाच्या बाळलीलांची साक्षीदार आई यमुनेच्या चरणी आपले स्वागत.'
    },
    audioGreetingText: 'जय यमुना मैया! आई यमुनेच्या कृपेने आपल्या अंतःकरणात श्रीकृष्णाची अनन्य भक्ती निर्माण होवो.',
    significance: {
      en: 'Daughter of Surya and sister of Yama. Bathing in Yamuna protects devotees from the fear of death and grants eternal Krishna Prema.',
      hi: 'सूर्य की पुत्री और यमराज की प्रिय बहन। यमुना स्नान से अकाल मृत्यु का भय समाप्त होता है।',
      mr: 'सूर्यदेव व संज्ञेची कन्या, यमराजांची बहीण. यमुनेमध्ये स्नान करणाऱ्याला यमयातनेचे भय राहत नाही.'
    },
    festivals: ['Yamuna Chhath', 'Bhai Dooj', 'Kumbh Mela Sangam'],
    pujaOfferings: ['Blue Lotus', 'Kheer', 'Deep Daan', 'Chunari']
  },

  // 50. Mata Kamakhya Devi
  {
    serialNo: 50,
    id: 'kamakhya',
    name: { en: 'Mata Kamakhya Devi', hi: 'माता कामाख्या देवी (गुवाहाटी)', mr: 'आई कामाख्या देवी (गुवाहाटी, आसाम)', sa: 'कामाख्या' },
    title: { en: 'Supreme Shakti of Desire, Creation & Regeneration', hi: 'महाशक्तिपीठ, तंत्र विद्या की सर्वोच्च अधिष्ठात्री', mr: 'सर्वोच्च तांत्रिक शक्तीपीठ, सृजनाची देवता' },
    category: 'shakti_peeth',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kamakhya_Devi_Icon.jpg?width=800',
    placeImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kamakhya_Temple_Guwahati_Assam.jpg?width=800',
    primaryShrine: { en: 'Kamakhya Temple Nilachal Hills, Guwahati, Assam', hi: 'नीलाचल पर्वत कामाख्या मंदिर, गुवाहाटी', mr: 'कामाख्या मंदिर, नीलाचल पर्वत, गुवाहाटी (आसाम)' },
    districtOrState: 'Guwahati, Assam',
    mantra: 'कामाख्ये कामसम्पन्ने कामेश्वरि हरप्रिये । कामनाम देहि मे नित्यं कामेश्वरि नमोऽस्तु ते ॥',
    mantraRoman: 'Kamakhye Kamasampanne Kameshvari Harapriye',
    vahana: { en: 'Lion and Corpse', hi: 'सिंह', mr: 'सिंह' },
    weaponOrSymbols: { en: 'Natural spring in cave sanctum, Red Cloth (Raktavastra), Trishula', hi: 'रक्त वस्त्र, प्राकृतिक जल स्रोत', mr: 'नैसर्गिक पाषाण जलस्रोत, लाल वस्त्र' },
    welcomeGreeting: {
      en: 'Jai Maa Kamakhya! Welcome to the primordial seat of Shakti and cosmic rejuvenation.',
      hi: 'जय माँ कामाख्या! नीलाचल पर्वत स्थित सिद्ध शक्तिपीठ में आपका स्वागत है।',
      mr: 'जय माता कामाख्या! नीलाचल पर्वतावरील आद्य शक्तीपीठाच्या दरबारात आपले सहर्ष स्वागत.'
    },
    audioGreetingText: 'कामाख्ये कामसम्पन्ने कामेश्वरि हरप्रिये! आई कामाख्या आपल्या सर्व सात्विक इच्छा पूर्ण करून आपल्याला सामर्थ्य देवोत.',
    significance: {
      en: 'The prime of the 51 Shaktipeeths where Sati’s Yoni fell. Celebrates the sacred creative power of Mother Earth during the Ambubachi Mela.',
      hi: '५१ शक्तिपीठों में सर्वोपरि तांत्रिक पीठ। सृजन शक्ति और मातृत्व का पावन केंद्र।',
      mr: '५१ शक्तीपीठांपैकी प्रमुख पीठ. पृथ्वीच्या प्रजनन व नवनिर्मिती शक्तीचा उत्सव साजरा करणारे अद्भूत देवस्थान.'
    },
    festivals: ['Ambubachi Mela (June)', 'Navratri Puja'],
    pujaOfferings: ['Raktavastra (Red Silk Cloth)', 'Red Hibiscus', 'Kumkum', 'Sweet Payasam']
  }
];

export const fiftyGodsList: GodEntry[] = rawFiftyGodsList.map((god) => ({
  ...god,
  image: DEITY_IMAGE_REGISTRY[god.id]?.primary || god.image
}));


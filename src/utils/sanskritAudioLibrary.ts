/**
 * Verified Sanskrit Audio Library (सनातन अमृतधारा पावन संस्कृत जप दालन)
 * Architecture Recommendation #2:
 * "For Sanskrit, use a different audio system.
 *  Do not rely on ordinary TTS.
 *  Verified recordings of mantras by trained Sanskrit reciters with correct Vedic svara."
 */

export interface SanskritMantraTrack {
  id: string;
  deityId: string;
  deityName: { mr: string; hi: string; en: string };
  title: { mr: string; hi: string; en: string };
  devanagari: string;
  transliteration: string;
  meaning: { mr: string; hi: string; en: string };
  audioUrls: {
    male: string;
    female: string;
  };
  durationSeconds: number;
  meter: string; // e.g. 'Gayatri', 'Anushtup'
  svaraNotated: boolean;
  recommendedRepetitions: number[]; // [11, 21, 51, 108]
  sourceScripture: string;
}

export const SANSKRIT_VERIFIED_LIBRARY: SanskritMantraTrack[] = [
  {
    id: 'ganesh_mool_mantra',
    deityId: 'ganesha',
    deityName: { mr: 'श्री गणेश', hi: 'श्री गणेश', en: 'Lord Ganesha' },
    title: {
      mr: 'श्री गणेश बीज महामंत्र',
      hi: 'श्री गणेश मूल मंत्र',
      en: 'Shri Ganesha Mool Mantra'
    },
    devanagari: 'ॐ गं गणपतये नमः॥',
    transliteration: 'Om Gam Ganapataye Namaha',
    meaning: {
      mr: 'सर्व विघ्नांचे निवारण करणाऱ्या मंगलमूर्ती श्री गणेशाला माझे साष्टांग नमन असो.',
      hi: 'समस्त विघ्नों का हरण करने वाले परम कल्याणकारी भगवान श्री गणेश को मेरा प्रणाम।',
      en: 'Salutations to the Supreme Lord Ganesha, the remover of all obstacles and harbinger of auspiciousness.'
    },
    audioUrls: {
      male: './audio/chants/ganesh-male.mp3',
      female: './audio/chants/ganesh-female.mp3'
    },
    durationSeconds: 32,
    meter: 'Tantrik Bija Mantra',
    svaraNotated: true,
    recommendedRepetitions: [11, 21, 108],
    sourceScripture: 'गणेश उपनिषद् (Ganapati Upanishad)'
  },
  {
    id: 'shiva_panchakshari',
    deityId: 'shiva',
    deityName: { mr: 'देवाधिदेव महादेव', hi: 'भगवान शिव', en: 'Lord Shiva' },
    title: {
      mr: 'शिव पंचाक्षरी महामंत्र',
      hi: 'शिव पंचाक्षर महामंत्र',
      en: 'Shiva Panchakshari Mantra'
    },
    devanagari: 'ॐ नमः शिवाय॥',
    transliteration: 'Om Namah Shivaaya',
    meaning: {
      mr: 'सृष्टीचे आदि-अनादि अधिष्ठाता आणि परम कल्याणकारी महादेवाला माझे अनंत वंदन असो.',
      hi: 'सृष्टि के कल्याणकारी अधिष्ठाता भगवान शिव को मेरा बारंबार नमन।',
      en: 'I bow with reverence to the Auspicious and Supreme Consciousness, Lord Shiva.'
    },
    audioUrls: {
      male: './audio/chants/shiva-male.mp3',
      female: './audio/chants/shiva-female.mp3'
    },
    durationSeconds: 28,
    meter: 'Panchakshara',
    svaraNotated: true,
    recommendedRepetitions: [11, 21, 108],
    sourceScripture: 'श्री रुद्रम् / यजुर्वेद (Yajurveda Taittiriya Samhita)'
  },
  {
    id: 'maha_mrityunjaya',
    deityId: 'shiva',
    deityName: { mr: 'महाकाल महादेव', hi: 'महाकाल शिव', en: 'Mahakaal Shiva' },
    title: {
      mr: 'ऋग्वेदीय महामृत्युंजय मंत्र',
      hi: 'महामृत्युंजय महामंत्र',
      en: 'Maha Mrityunjaya Mantra (Rik Samhita)'
    },
    devanagari: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    transliteration: 'Om Tryambakam Yajaamahe Sugandhim Pushtivardhanam, Urvaarukamiva Bandhanaan Mrityor Muksheeya Maamritaat',
    meaning: {
      mr: 'त्रिनेत्रधारी, सुगंधित आणि जीवनाला पोषण देणाऱ्या महादेवाची आम्ही उपासना करतो. ज्याप्रमाणे पिकलेली काकडी वेलीपासून सहज मुक्त होते, त्याप्रमाणे आम्हाला मृत्यूच्या भयापासून मुक्त करून अमरत्वाकडे घेऊन जा.',
      hi: 'हम त्रिनेत्रधारी, सुगंधित और समस्त प्राणियों को पुष्ट करने वाले भगवान शिव की पूजा करते हैं। जैसे पका हुआ खरबूजा बेल से मुक्त होता है, वैसे ही हमें मृत्यु के बंधन से मुक्त कर अमृतत्व प्रदान करें।',
      en: 'We meditate on the Three-Eyed Lord who nourishes all beings. May He liberate us from the bondage of mortality unto immortality, like a ripe fruit severed from its vine.'
    },
    audioUrls: {
      male: './audio/chants/mrityunjaya-male.mp3',
      female: './audio/chants/mrityunjaya-female.mp3'
    },
    durationSeconds: 42,
    meter: 'Anushtup (वैदिक स्वरयुक्त)',
    svaraNotated: true,
    recommendedRepetitions: [11, 21, 51, 108],
    sourceScripture: 'ऋग्वेद (Rigveda 7.59.12)'
  },
  {
    id: 'gayatri_mahamantra',
    deityId: 'surya',
    deityName: { mr: 'सावित्री / सूर्यदेव', hi: 'गायत्री माता / सूर्य', en: 'Goddess Gayatri / Sun' },
    title: {
      mr: 'वैदिक गायत्री महामंत्र',
      hi: 'गायत्री महामंत्र',
      en: 'Vedic Gayatri Mahamantra'
    },
    devanagari: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    transliteration: 'Om Bhoor Bhuva-ha Swaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayaat',
    meaning: {
      mr: 'भूलोक, अंतरिक्ष आणि स्वर्गाला व्यापून असणाऱ्या त्या श्रेष्ठ सूर्यस्वरूपी परमात्म्याच्या तेजाचे आम्ही ध्यान करतो. ते तेज आमच्या बुद्धीला सन्मार्गावर प्रेरित करो.',
      hi: 'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी पापनाशक परमात्म-तेज को हम अंतःकरण में धारण करें, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
      en: 'We contemplate the resplendent radiance of the Divine Solar Consciousness that animates the realms. May that illumine our intellect and guide us on the righteous path.'
    },
    audioUrls: {
      male: './audio/chants/gayatri-male.mp3',
      female: './audio/chants/gayatri-female.mp3'
    },
    durationSeconds: 38,
    meter: 'Gayatri Chhanda (२४ अक्षरी वैदिक छंद)',
    svaraNotated: true,
    recommendedRepetitions: [11, 21, 108],
    sourceScripture: 'ऋग्वेद (Rigveda 3.62.10)'
  },
  {
    id: 'vishnu_dwadasakshari',
    deityId: 'vishnu',
    deityName: { mr: 'भगवान श्री विष्णू', hi: 'भगवान विष्णु', en: 'Lord Vishnu' },
    title: {
      mr: 'द्वादशाक्षर विष्णू महामंत्र',
      hi: 'द्वादशाक्षर विष्णु मंत्र',
      en: 'Vishnu Dwadasakshari Mantra'
    },
    devanagari: 'ॐ नमो भगवते वासुदेवाय॥',
    transliteration: 'Om Namo Bhagavate Vaasudevaaya',
    meaning: {
      mr: 'सर्व चराचरात वास करणाऱ्या आणि विश्वाचे पालनपोषण करणाऱ्या भगवान वासुदेवाला माझे विनम्र वंदन.',
      hi: 'सर्वव्यापी, करुणासागर, जगत्पालक भगवान वासुदेव को मेरा सादर प्रणाम।',
      en: 'Salutations to the Supreme All-Pervading Lord Vasudeva, the sustainer of the cosmos.'
    },
    audioUrls: {
      male: './audio/chants/vasudeva-male.mp3',
      female: './audio/chants/vasudeva-female.mp3'
    },
    durationSeconds: 30,
    meter: 'Dwadasakshara',
    svaraNotated: true,
    recommendedRepetitions: [11, 21, 108],
    sourceScripture: 'श्रीमद्भागवत पुराण (Srimad Bhagavatam)'
  },
  {
    id: 'vitthal_mahamantra',
    deityId: 'vitthal',
    deityName: { mr: 'श्री विठ्ठल रुक्मिणी', hi: 'विट्ठल माउली', en: 'Lord Vitthal' },
    title: {
      mr: 'तारक वारकरी महामंत्र',
      hi: 'वारकरी तारक मंत्र',
      en: 'Varkari Taarak Mahamantra'
    },
    devanagari: 'राम कृष्ण हरी, जय जय राम कृष्ण हरी॥\nपुंडलिक वरदे हरी विठ्ठल, श्री ज्ञानदेव तुकाराम॥',
    transliteration: 'Ram Krishna Hari, Jai Jai Ram Krishna Hari. Pundalik Varade Hari Vitthal, Shri Dnyanadev Tukaram',
    meaning: {
      mr: 'भक्त पुंडलिकासाठी विटेवर उभा राहणाऱ्या विठुरायाचा आणि माऊली तुकोबारायांचा जयघोष असो.',
      hi: 'भक्त पुंडलिक के लिए ईंट पर समचरण खड़े रहने वाले विठुराया और संत ज्ञानेश्वर-तुकाराम की जय।',
      en: 'Glory to Lord Vitthal who stands on the sacred brick for devotee Pundalik, and glory to Saint Dnyaneshwar and Tukaram.'
    },
    audioUrls: {
      male: './audio/chants/vitthal-male.mp3',
      female: './audio/chants/vitthal-female.mp3'
    },
    durationSeconds: 35,
    meter: 'Varkari Dindi Chant',
    svaraNotated: false,
    recommendedRepetitions: [11, 21, 108],
    sourceScripture: 'वारकरी संत परंपरा (Sant Tukaram & Dnyaneshwar Tradition)'
  }
];

export function getSanskritTrack(id: string): SanskritMantraTrack | undefined {
  return SANSKRIT_VERIFIED_LIBRARY.find((t) => t.id === id);
}

export function isSanskritChantingText(text: string): boolean {
  if (!text) return false;
  const t = text.trim();
  return SANSKRIT_VERIFIED_LIBRARY.some(
    (track) =>
      track.devanagari.includes(t) ||
      t.includes(track.devanagari) ||
      track.id === t
  );
}

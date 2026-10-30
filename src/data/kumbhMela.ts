import { MultilingualText } from '../types';

export interface KumbhSite {
  id: string;
  name: MultilingualText;
  river: MultilingualText;
  state: string;
  astrologicalSign: MultilingualText;
  significance: MultilingualText;
  nextYear: string;
  imageIcon: string;
  image: string;
}

export interface ShahiSnanDay {
  parvName: MultilingualText;
  tithiDate: MultilingualText;
  primaryLocation: MultilingualText;
  significance: MultilingualText;
  participatingAkharas: MultilingualText;
}

export interface AkharaInfo {
  name: MultilingualText;
  sect: 'Shaiva' | 'Vaishnava' | 'Udasin';
  deity: MultilingualText;
  headquarters: string;
  description: MultilingualText;
}

export interface HolyGhat {
  name: MultilingualText;
  location: MultilingualText;
  river: string;
  speciality: MultilingualText;
  rules: MultilingualText;
  image: string;
}

export const kumbhMelaLore = {
  title: {
    en: 'Simhastha Kumbh Mela Nashik-Trimbakeshwar',
    hi: 'सिंहस्थ कुम्भ मेला नाशिक-त्र्यंबकेश्वर',
    mr: 'नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळा',
  },
  subtitle: {
    en: 'The Divine Gathering of Amrita on the Banks of Sacred Godavari',
    hi: 'गोदावरी के पावन तट पर अमृत कुम्भ का महापर्व',
    mr: 'दक्षिण गंगेच्या पावन तीरावर भरणारा जगातील सर्वांत मोठा अमृतकुंभ सोहळा',
  },
  celestialSignificance: {
    en: 'When Jupiter (Brihaspati) enters the zodiac sign of Leo (Simha Rashi) and the Sun and Moon are in alignment, the waters of the Godavari River are sanctified by drops of cosmic Amrita (nectar of immortality) that fell during the Samudra Manthan.',
    hi: 'जब गुरु (बृहस्पति) सिंह राशि में प्रवेश करते हैं और सूर्य-चन्द्रमा का विशिष्ट योग बनता है, तब समुद्र मंथन के अमृत की पावन बूंदें गोदावरी में समाहित मानी जाती हैं।',
    mr: 'जेव्हा देवगुरू बृहस्पती सिंह राशीत प्रवेश करतात (सिंहस्थ पर्व), तेव्हा समुद्रमंथनातून निघालेल्या अमृताचे थेंब गोदावरीच्या तीरावर पडल्याने या पाण्याला साक्षात अमरत्व प्राप्त होते अशी अनादी श्रद्धा आहे.',
  },
  samudraManthanStory: {
    en: 'During the churning of the cosmic ocean (Samudra Manthan) by the Devas and Asuras, Lord Dhanvantari emerged carrying the golden pot of Amrita (Kumbha). As Garuda and the Devas flew across Bharatavarsha to protect it, drops of divine nectar fell at four sanctified places: Nashik (Godavari), Prayagraj (Sangam), Haridwar (Ganga), and Ujjain (Kshipra).',
    hi: 'देवताओं और असुरों के समुद्र मंथन से भगवान धन्वंतरि अमृत कलश लेकर प्रकट हुए। अमृत की रक्षा हेतु गमन करते समय चार पावन स्थानों पर अमृत की बूंदें गिरीं: नाशिक, प्रयागराज, हरिद्वार एवं उज्जैन।',
    mr: 'देव आणि दानवांच्या समुद्रमंथनातून भगवान धन्वंतरी अमृताचा सुवर्ण कुंभ घेऊन प्रकट झाले. असुरांपासून अमृताचे रक्षण करताना चार पावन स्थळांवर अमृतबिंदू सांडले: नाशिक (गोदावरी), प्रयागराज (त्रिवेणी संगम), हरिद्वार (गंगा) आणि उज्जैन (क्षिप्रा नदी).',
  },
  historicPeshwaSettlement: {
    en: 'In 1789 CE, to preserve peace between Shaiva Sannyasis and Vaishnava Bairagis, Peshwa Sawai Madhavrao arranged a historic agreement: Shaiva Akharas hold their royal procession and Shahi Snan at Kushavarta Kund in Trimbakeshwar, while Vaishnava Bairagi Akharas perform theirs at Ramkund in Nashik.',
    hi: '१७८९ में पेशवा सवाई माधवराव द्वारा शैव और वैष्णव अखाड़ों के मध्य ऐतिहासिक समझौता हुआ: शैव अखाड़े त्र्यंबकेश्वर कुशावर्त में एवं वैष्णव अखाड़े नाशिक रामकुण्ड में शाही स्नान करते हैं।',
    mr: 'इ.स. १७८९ मध्ये पेशवे सवाई माधवरावांनी शैव आणि वैष्णव आखाड्यांमध्ये सुसंवाद घडवून आणला: शैव संन्यासी व नागा साधूंचे शाही स्नान त्र्यंबकेश्वरच्या कुशावर्त कुंडात, तर वैष्णव बैरागी आखाड्यांचे शाही स्नान नाशिकच्या रामकुंडावर परंपरेने होते.',
  },
};

export const fourKumbhSites: KumbhSite[] = [
  {
    id: 'nashik',
    name: { en: 'Nashik-Trimbakeshwar', hi: 'नाशिक-त्र्यंबकेश्वर', mr: 'नाशिक-त्र्यंबकेश्वर' },
    river: { en: 'Godavari (Dakshin Ganga)', hi: 'गोदावरी (दक्षिण गंगा)', mr: 'गोदावरी (दक्षिण गंगा)' },
    state: 'Maharashtra',
    astrologicalSign: {
      en: 'Jupiter & Sun in Leo (Simha Rashi)',
      hi: 'गुरु एवं सूर्य सिंह राशि में',
      mr: 'गुरू आणि सूर्य सिंह राशीत प्रवेश'
    },
    significance: {
      en: 'Kushavarta Kund and Ramkund; birthplace of Godavari; dual Shaiva-Vaishnava tradition.',
      hi: 'गोदावरी का उद्गम; कुशावर्त व रामकुण्ड; शैव-वैष्णव समरसता।',
      mr: 'गोदावरी उगमस्थान; त्र्यंबकेश्वर ज्योतिर्लिंग व पंचवटी रामकुंड; शैव-वैष्णव शाही स्नान.'
    },
    nextYear: 'Simhastha Kumbh',
    imageIcon: '🔱',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Trimbakeshwar_Temple,_Nashik.jpg?width=800',
  },
  {
    id: 'prayagraj',
    name: { en: 'Prayagraj (Triveni Sangam)', hi: 'प्रयागराज (त्रिवेणी संगम)', mr: 'प्रयागराज (त्रिवेणी संगम)' },
    river: { en: 'Triveni Sangam (Ganga, Yamuna, Saraswati)', hi: 'त्रिवेणी संगम (गंगा, यमुना, सरस्वती)', mr: 'त्रिवेणी संगम (गंगा, यमुना, गुप्त सरस्वती)' },
    state: 'Uttar Pradesh',
    astrologicalSign: {
      en: 'Jupiter in Taurus & Sun in Capricorn (Magha Month)',
      hi: 'गुरु वृषभ में एवं सूर्य मकर राशि में (माघ मास)',
      mr: 'गुरू वृषभ राशीत व सूर्य मकर राशीत (माघ मास)'
    },
    significance: {
      en: 'The King of all Pilgrimages (Teerthraj); grandest assembly of over 100 million pilgrims.',
      hi: 'समस्त तीर्थों के राजा (तीर्थराज); विश्व का सबसे विशाल धार्मिक समागम।',
      mr: 'सर्व तीर्थांचा राजा "तीर्थराज प्रयाग"; कोट्यवधी भाविकांचे अमृतस्नान.'
    },
    nextYear: 'Maha Kumbh',
    imageIcon: '🌊',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kumbh_Mela_at_Prayag.jpg?width=800',
  },
  {
    id: 'haridwar',
    name: { en: 'Haridwar (Brahmakund)', hi: 'हरिद्वार (ब्रह्मकुण्ड)', mr: 'हरिद्वार (हर की पौडी)' },
    river: { en: 'Ganga (Himalayan Descent)', hi: 'गंगा (हर की पौड़ी)', mr: 'गंगा नदी (हर की पौडी)' },
    state: 'Uttarakhand',
    astrologicalSign: {
      en: 'Jupiter in Aquarius & Sun in Aries',
      hi: 'गुरु कुम्भ में एवं सूर्य मेष राशि में',
      mr: 'गुरू कुंभ राशीत व सूर्य मेष राशीत'
    },
    significance: {
      en: 'Where Ganga enters the plains from the Himalayas at Har Ki Pauri.',
      hi: 'हिमालय से उतरकर मां गंगा का मैदानी भाग में प्रथम पावन चरण।',
      mr: 'हिमालयातून उतरून गंगेचे मैदानी भागात प्रथम आगमन होणारे हर की पौडी.'
    },
    nextYear: 'Kumbh Mela',
    imageIcon: '🏔️',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Har-ki-Pauri_Ghat,_Haridwar.jpg?width=800',
  },
  {
    id: 'ujjain',
    name: { en: 'Ujjain (Mahakaleshwar)', hi: 'उज्जैन (महाकालेश्वर)', mr: 'उज्जैन (महाकाळेश्वर)' },
    river: { en: 'Kshipra River', hi: 'क्षिप्रा नदी', mr: 'क्षिप्रा नदी' },
    state: 'Madhya Pradesh',
    astrologicalSign: {
      en: 'Jupiter in Leo & Sun in Aries (Vaisakha Month)',
      hi: 'गुरु सिंह राशि में एवं सूर्य मेष में (वैशाख मास)',
      mr: 'गुरू सिंह राशीत व सूर्य मेष राशीत (वैशाख मास)'
    },
    significance: {
      en: 'Simhastha Kumbh at Ramghat on Kshipra; Jyotirlinga Mahakaleshwar presiding deity.',
      hi: 'क्षिप्रा तट पर रामघाट; कालों के काल महाकाल की छत्रछाया।',
      mr: 'क्षिप्रा नदीकाठी रामघाटावर भरणारा सिंहस्थ; महाकाळेश्वराचे पावन अधिष्ठान.'
    },
    nextYear: 'Simhastha Kumbh',
    imageIcon: '⚡',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahakaleshwar_temple_Ujjain.jpg?width=800',
  },
];

export const shahiSnanDays: ShahiSnanDay[] = [
  {
    parvName: {
      en: 'First Shahi Snan (Dhwajarohan & Shravan Purnima)',
      hi: 'प्रथम शाही स्नान (ध्वजारोहण एवं श्रावण पूर्णिमा)',
      mr: 'पहिले शाही स्नान (ध्वजारोहण व श्रावणी पौर्णिमा)',
    },
    tithiDate: {
      en: 'Shravan Shukla Purnima (Raksha Bandhan Day)',
      hi: 'श्रावण शुक्ल पूर्णिमा',
      mr: 'श्रावण शुद्ध पौर्णिमा (नारळी पौर्णिमा)',
    },
    primaryLocation: {
      en: 'Trimbakeshwar (Kushavarta) & Nashik (Ramkund)',
      hi: 'त्र्यंबकेश्वर कुशावर्त एवं नाशिक रामकुण्ड',
      mr: 'त्र्यंबकेश्वर (कुशावर्त) व नाशिक (रामकुंड)',
    },
    significance: {
      en: 'Sacred flag hoisting (Dhwajarohan) of the Akharas, initiating the auspicious Kumbh bathing period with blowing of conches.',
      hi: 'अखाड़ों का पावन ध्वजारोहण, शंखनाद एवं कुंभ स्नान पर्व का औपचारिक शुभारंभ।',
      mr: 'आखाड्यांचे मंगल धर्मध्वजारोहण, शंखनाद आणि सिंहस्थ कुंभपर्वाचा अधिकृत पावन प्रारंभ.',
    },
    participatingAkharas: {
      en: 'All 13 Akharas in regal traditional sequence with silver palanquins',
      hi: 'चांदी की पालकियों व छत्र-चामर के साथ १३ अखाड़ों की शोभायात्रा',
      mr: 'चांदीच्या पालख्या व छत्र-चामरासह सर्व १३ आखाड्यांची भव्य शाही मिरवणूक',
    },
  },
  {
    parvName: {
      en: 'Second Shahi Snan (Main Parv / Somvati Amavasya)',
      hi: 'द्वितीय शाही स्नान (मुख्य महास्नान पर्व - सोमवती अमावास्या)',
      mr: 'दुसरे महा शाही स्नान (मुख्य महापर्व - भाद्रपद/सोमवती अमावस्या)',
    },
    tithiDate: {
      en: 'Bhadrapada Krishna Amavasya (Sarva Pitri Amavasya)',
      hi: 'भाद्रपद कृष्ण अमावास्या',
      mr: 'भाद्रपद वद्य अमावस्या (सर्वपित्री / सोमवती अमावस्या)',
    },
    primaryLocation: {
      en: 'Ramkund & Kushavarta Kund (Simultaneous)',
      hi: 'रामकुण्ड एवं कुशावर्त कुण्ड (एकरूप)',
      mr: 'रामकुंड व कुशावर्त कुंड (लाखो साधूंचे महास्नान)',
    },
    significance: {
      en: 'The single most spiritually potent moment of the entire Simhastha Kumbh. It is believed that bathing on this tithi frees one from ancestral debt and cycles of rebirth.',
      hi: 'सम्पूर्ण सिंहस्थ का सर्वोच्च पावन क्षण। इस दिन स्नान से जन्म-जन्मांतर के पापों एवं पितृऋण से मुक्ति मिलती है।',
      mr: 'सिंहस्थातील सर्वांत पवित्र व सर्वोच्च क्षण. या दिवशी गोदावरीत स्नान केल्याने अनंत जन्मांचे पातक नष्ट होऊन मोक्ष मिळतो अशी श्रद्धा आहे.',
    },
    participatingAkharas: {
      en: 'Naga Babas, Mahamandaleshwars, Acharyas, and over 5 million pilgrims',
      hi: 'नागा साधु, महामंडलेश्वर, आचार्य एवं ५० लाख से अधिक श्रद्धालु',
      mr: 'नागा साधू, महामंडलेश्वर, आचार्य आणि ५० लाखांहून अधिक भाविकांचे महास्नान',
    },
  },
  {
    parvName: {
      en: 'Third Shahi Snan (Vaman Dwadashi / Parv Samapti)',
      hi: 'तृतीय शाही स्नान (वामन द्वादशी / पर्व पूर्णता)',
      mr: 'तिसरे शाही स्नान (वामन द्वादशी / अमृतस्नान सांगता)',
    },
    tithiDate: {
      en: 'Bhadrapada Shukla Dwadashi',
      hi: 'भाद्रपद शुक्ल द्वादशी',
      mr: 'भाद्रपद शुद्ध द्वादशी (वामन जयंती पर्व)',
    },
    primaryLocation: {
      en: 'Kushavarta Kund (Trimbak) & Ramkund (Nashik)',
      hi: 'कुशावर्त कुण्ड एवं रामकुण्ड',
      mr: 'कुशावर्त कुंड व रामकुंड',
    },
    significance: {
      en: 'Marks the fulfillment of the Simhastha vows. Sannyasis offer thanksgiving prayers to Lord Kapaleshwar and Trimbakeshwar.',
      hi: 'सिंहस्थ संकल्प की पूर्णाहुति। साधु-संतों द्वारा भगवान त्र्यंबकेश्वर एवं कपालिलेश्वर का आभार पूजन।',
      mr: 'सिंहस्थ व्रत संकल्पाची सांगता. साधू-संतांकडून भगवान त्र्यंबकेश्वर व कपालेश्वराची कृतज्ञता पूजा.',
    },
    participatingAkharas: {
      en: 'Vaishnava and Shaiva Akharas conclude with sacred Dhwaja Avatarana',
      hi: 'वैष्णव एवं शैव अखाड़ों द्वारा धर्मध्वजा को नमन व सांगता',
      mr: 'सर्व आखाड्यांकडून धर्मध्वजेला वंदन करून सिंहस्थ पर्वाची सांगता',
    },
  },
];

export const thirteenAkharas: AkharaInfo[] = [
  // 7 SHAIVA AKHARAS (Trimbakeshwar Snan)
  {
    name: { en: 'Shri Panch Dashnam Juna Akhara', hi: 'श्री पंच दशनाम जूना अखाड़ा', mr: 'श्री पंच दशनाम जुना आखाडा' },
    sect: 'Shaiva',
    deity: { en: 'Lord Dattatreya & Rudra', hi: 'भगवान दत्तात्रेय एवं महारुद्र', mr: 'भगवान दत्तात्रेय व रुद्र' },
    headquarters: 'Varanasi / Haridwar',
    description: {
      en: 'The largest and most ancient Akhara, renowned for its fearless Naga ascetics and deep Himalayan tapasya.',
      hi: 'सबसे विशाल एवं प्राचीन अखाड़ा, जो अपने नागा साधुओं एवं कठोर तपस्या हेतु विख्यात है।',
      mr: 'सर्वात मोठा व प्राचीन आखाडा; नागा साधूंची शौर्यपरंपरा आणि हिमालयातील कठोर तपश्चर्येसाठी प्रसिद्ध.',
    },
  },
  {
    name: { en: 'Shri Panchayati Akhara Niranjani', hi: 'श्री पंचायती अखाड़ा निरंजनी', mr: 'श्री पंचायती आखाडा निरंजनी' },
    sect: 'Shaiva',
    deity: { en: 'Lord Kartikeya (Skanda)', hi: 'भगवान कार्तिकेय (मुरुगन)', mr: 'भगवान कार्तिकेय (स्कंद)' },
    headquarters: 'Prayagraj',
    description: {
      en: 'Second largest Shaiva Akhara, known for profound Sanskrit scholarship, discipline, and grand royal processions.',
      hi: 'विद्वत्ता, अनुशासन एवं भव्य शाही जुलूस हेतु प्रसिद्ध अखाड़ा।',
      mr: 'संस्कृत विद्वत्ता, आध्यात्मिक शिस्त आणि भव्य राजेशाही मिरवणुकांसाठी ख्यातकीर्त.',
    },
  },
  {
    name: { en: 'Shri Panchayati Akhara Mahanirvani', hi: 'श्री पंचायती अखाड़ा महानिर्वाणी', mr: 'श्री पंचायती आखाडा महानिर्वाणी' },
    sect: 'Shaiva',
    deity: { en: 'Lord Kapila Mahamuni', hi: 'भगवान कपिल मुनि', mr: 'भगवान कपिल महामुनी' },
    headquarters: 'Haridwar',
    description: {
      en: 'Associated with the historic Bhasma Aarti at Mahakaleshwar and deep devotion to Shiva.',
      hi: 'महाकालेश्वर भस्म आरती से सम्बद्ध एवं शिव भक्ति में लीन संन्यासियों का संघ।',
      mr: 'महाकाळेश्वर भस्म आरतीशी संबंधित आणि शिवोपासनेत लीन असणारा प्रतिष्ठित आखाडा.',
    },
  },
  {
    name: { en: 'Shri Shambhu Panch Atal Akhara', hi: 'श्री शंभू पंच अटल अखाड़ा', mr: 'श्री शंभू पंच अटल आखाडा' },
    sect: 'Shaiva',
    deity: { en: 'Lord Ganesha', hi: 'भगवान श्री गणेश', mr: 'विघ्नहर्ता श्री गणेश' },
    headquarters: 'Varanasi',
    description: {
      en: 'Established in the 7th century, worshipping Lord Ganesha as their presiding commander.',
      hi: '७वीं शताब्दी में स्थापित, जो श्री गणेश को अपने सेनापति के रूप में पूजते हैं।',
      mr: '७ व्या शतकातील आखाडा; श्री गणेशाला आपले आराध्य दैवत मानून धर्मरक्षण करणारे संन्यासी.',
    },
  },
  {
    name: { en: 'Shri Panch Avahan Akhara', hi: 'श्री पंच आवाहन अखाड़ा', mr: 'श्री पंच आवाहन आखाडा' },
    sect: 'Shaiva',
    deity: { en: 'Lord Dattatreya & Gajanana', hi: 'भगवान दत्तात्रेय एवं गजानन', mr: 'श्रीदत्तप्रभू व गजानन' },
    headquarters: 'Varanasi',
    description: {
      en: 'One of the earliest martial monk orders, deeply linked with Juna Akhara.',
      hi: 'अत्यंत प्राचीन अखाड़ा, जो जूना अखाड़े के साथ शाही स्नान में सम्मिलित होता है।',
      mr: 'अतिप्राचीन आखाडा, जो जुना आखाड्यासोबत सिंहस्थात प्रथम स्नान करतो.',
    },
  },
  {
    name: { en: 'Shri Panch Anand Akhara', hi: 'श्री पंच आनंद अखाड़ा', mr: 'श्री पंच आनंद आखाडा' },
    sect: 'Shaiva',
    deity: { en: 'Lord Surya (Sun)', hi: 'भगवान भुवन भास्कर सूर्य', mr: 'भगवान सूर्यनारायण' },
    headquarters: 'Varanasi',
    description: {
      en: 'Worships the Sun as Brahman, emphasizing solar energy and mental clarity.',
      hi: 'भगवान सूर्य को प्रत्यक्ष ब्रह्म मानकर साधना करने वाला संन्यासी आखाड़ा।',
      mr: 'सूर्याला साक्षात परब्रह्म मानून तपश्चर्या करणारा तेजस्वी आखाडा.',
    },
  },
  {
    name: { en: 'Shri Panch Agni Akhara', hi: 'श्री पंच अग्नि अखाड़ा', mr: 'श्री पंच अग्नी आखाडा' },
    sect: 'Shaiva',
    deity: { en: 'Gayatri Mata & Agni Dev', hi: 'गायत्री माता एवं अग्नि देव', mr: 'गायत्री माता व अग्नी देव' },
    headquarters: 'Girnar / Gujarat',
    description: {
      en: 'Composed primarily of celibate Brahmachari scholars dedicated to perpetual Havana and Gayatri Japa.',
      hi: 'अखंड गायत्री जप एवं पवित्र अग्निहोत्र करने वाले ब्रह्मचारी साधुओं का संघ।',
      mr: 'अखंड गायत्री जप आणि पवित्र अग्निहोत्र यज्ञ करणारे ब्रह्मचारी साधू.',
    },
  },

  // 3 VAISHNAVA BAIRAGI ANI AKHARAS (Nashik Ramkund Snan)
  {
    name: { en: 'All India Shri Panch Nirmohi Ani Akhara', hi: 'अखिल भारतीय श्री पंच निर्मोही अनि अखाड़ा', mr: 'अखिल भारतीय श्री पंच निर्मोही अनि आखाडा' },
    sect: 'Vaishnava',
    deity: { en: 'Lord Hanuman (Maruti)', hi: 'पवनपुत्र श्री हनुमान', mr: 'श्री मारुतीराया' },
    headquarters: 'Ayodhya',
    description: {
      en: 'The foremost Vaishnava warrior order under the flag of Lord Hanuman, famed for discipline and devotion.',
      hi: 'श्री हनुमान जी के ध्वज तले वैष्णव बैरागियों का प्रमुख अखाड़ा।',
      mr: 'श्री हनुमंतांच्या ध्वजाखाली संघटित झालेला वैष्णव संप्रदायाचा प्रमुख आखाडा.',
    },
  },
  {
    name: { en: 'Shri Panch Digambar Ani Akhara', hi: 'श्री पंच दिगंबर अनि अखाड़ा', mr: 'श्री पंच दिगंबर अनि आखाडा' },
    sect: 'Vaishnava',
    deity: { en: 'Lord Rama & Sita', hi: 'सियावर रामचन्द्र', mr: 'प्रभू श्रीरामचंद्र' },
    headquarters: 'Ayodhya',
    description: {
      en: 'Known as the "King of Vaishnava Akharas" with thousands of decorated silver palanquins during Simhastha.',
      hi: 'वैष्णव अखाड़ों में राजा की उपाधि प्राप्त, जो भव्य रजत छत्रों सहित स्नान करते हैं।',
      mr: 'वैष्णव आखाड्यांमध्ये राजा मानला जाणारा आखाडा; चांदीच्या छत्र-पालख्यांसह रामकुंडावर शाही स्नान.',
    },
  },
  {
    name: { en: 'Shri Panch Nirvani Ani Akhara', hi: 'श्री पंच निर्वाणी अनि अखाड़ा', mr: 'श्री पंच निर्वाणी अनि आखाडा' },
    sect: 'Vaishnava',
    deity: { en: 'Lord Hanuman & Krishna', hi: 'श्री हनुमान एवं श्रीकृष्ण', mr: 'श्री हनुमान व श्रीकृष्ण' },
    headquarters: 'Ayodhya',
    description: {
      en: 'Revered Vaishnava order noted for master archers and deep study of Valmiki Ramayana.',
      hi: 'धनुर्विद्या एवं वाल्मीकि रामायण के मर्मज्ञ वैष्णव साधुओं का पावन संघ।',
      mr: 'वाल्मीकि रामायण व भागवत धर्माचे अभ्यासक असणाऱ्या वैष्णव साधूंचा आखाडा.',
    },
  },

  // 3 UDASIN & NIRMAL AKHARAS
  {
    name: { en: 'Shri Panchayati Akhara Bada Udasin', hi: 'श्री पंचायती अखाड़ा बड़ा उदासीन', mr: 'श्री पंचायती आखाडा बडा उदासीन' },
    sect: 'Udasin',
    deity: { en: 'Bhagwan Shri Chandradev (Son of Guru Nanak)', hi: 'भगवान श्री चंद्रदेव जी', mr: 'भगवान श्री चंद्रदेव (गुरू नानक यांचे सुपुत्र)' },
    headquarters: 'Prayagraj',
    description: {
      en: 'Founded by Sri Chand, combining Vedic Sanatana wisdom with selfless community kitchen (langar) service.',
      hi: 'वैदिक ज्ञान एवं विशाल अन्नक्षेत्र (लंगर) सेवा हेतु विख्यात।',
      mr: 'वैदिक ज्ञान आणि लाखो भाविकांसाठी अविरत चालणाऱ्या मोफत अन्नछत्रासाठी प्रसिद्ध.',
    },
  },
  {
    name: { en: 'Shri Panchayati Akhara Naya Udasin', hi: 'श्री पंचायती अखाड़ा नया उदासीन', mr: 'श्री पंचायती आखाडा नया उदासीन' },
    sect: 'Udasin',
    deity: { en: 'Bhagwan Shri Chandradev', hi: 'भगवान श्री चंद्रदेव जी', mr: 'भगवान श्री चंद्रदेव' },
    headquarters: 'Haridwar',
    description: {
      en: 'Branch of the Udasin order dedicated to meditation, Pranayama, and scriptural learning.',
      hi: 'ध्यान, प्राणायाम एवं शास्त्राध्ययन में समर्पित उदासीन साधुओं का आखाड़ा।',
      mr: 'ध्यान, प्राणायाम आणि वेदाध्ययनात लीन असणारा तपस्वी आखाडा.',
    },
  },
  {
    name: { en: 'Shri Nirmal Panchayati Akhara', hi: 'श्री निर्मल पंचायती अखाड़ा', mr: 'श्री निर्मल पंचायती आखाडा' },
    sect: 'Udasin',
    deity: { en: 'Guru Granth Sahib & Dasham Granth', hi: 'श्री गुरु ग्रंथ साहिब', mr: 'श्री गुरु ग्रंथ साहिब' },
    headquarters: 'Haridwar / Patiala',
    description: {
      en: 'Established by Guru Gobind Singh in 1700 to educate Sikh saints in Sanskrit scriptures at Kashi.',
      hi: 'गुरु गोविंद सिंह जी द्वारा काशी में संस्कृत एवं वेदों के अध्ययन हेतु स्थापित पावन परम्परा।',
      mr: 'गुरू गोविंद सिंग यांनी १७०० मध्ये संस्कृत व वेदान्त शिक्षणासाठी स्थापन केलेली पावन परंपरा.',
    },
  },
];

export const holyGhatsOfNashik: HolyGhat[] = [
  {
    name: { en: 'Ramkund (Godavari Snan)', hi: 'रामकुण्ड (गोदावरी)', mr: 'रामकुंड (पवित्र गोदावरी स्नान)' },
    location: { en: 'Panchavati, Nashik City', hi: 'पंचवटी, नाशिक', mr: 'पंचवटी, नाशिक शहर' },
    river: 'Godavari',
    speciality: {
      en: 'Where Lord Rama bathed during exile and immersed the ashes of King Dasharatha. Water dissolves bone calcium instantly.',
      hi: 'वनवास काल में श्रीराम का स्नान स्थल। यहां राजा दशरथ का श्राद्ध हुआ था।',
      mr: 'प्रभू श्रीरामांचे स्नानस्थान. येथे राजा दशरथांचे अस्थी विसर्जन झाले होते. अस्थी काही तासांत पाण्यात विरघळतात अशी अनुभूती.',
    },
    rules: {
      en: 'Wear modest clothing. Do not use chemical soap or shampoo in the sacred river.',
      hi: 'पवित्र नदी में साबुन अथवा शैम्पू का प्रयोग पूर्णतः वर्जित है।',
      mr: 'नदीत साबण किंवा शॅम्पू वापरण्यास सक्त मनाई आहे. पात्रात कचरा टाकू नये.',
    },
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ramkund_Nashik.jpg?width=800',
  },
  {
    name: { en: 'Kushavarta Teerth Kunda', hi: 'कुशावर्त तीर्थ कुण्ड', mr: 'कुशावर्त तीर्थ कुंड' },
    location: { en: 'Trimbakeshwar Temple Town', hi: 'त्र्यंबकेश्वर नगर', mr: 'त्र्यंबकेश्वर मंदिर परिसर' },
    river: 'Godavari (Origin Spring)',
    speciality: {
      en: 'Sage Gautama created this pool using Kusha grass to bring Godavari to earth after resolving the cow curse (Go-hatya prayaschitta).',
      hi: 'ऋषि गौतम ने कुशा घास की बाड़ बनाकर गोदावरी को यहां प्रकट किया था।',
      mr: 'गौतम ऋषींनी कुशाच्या (दर्भ) साहाय्याने गोदावरीला अडवून प्रकट केलेले पावन कुंड. सर्व पापांचे क्षालन करणारे तीर्थ.',
    },
    rules: {
      en: 'Strictly traditional attire. Men perform bath in dhoti; women in saree/salwar.',
      hi: 'पारंपरिक वस्त्र अनिवार्य। कुण्ड में सीधे छलांग लगाना वर्जित है।',
      mr: 'सोवळे किंवा पारंपरिक पोषाख अनिवार्य. कुंडाच्या पायऱ्यांवरून सावधपणे स्नान करावे.',
    },
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kushawart,_Trimbakeshwar_in_Maharashtra_state,_India.jpg?width=800',
  },
  {
    name: { en: 'Tapovan & Lakshmana Kund', hi: 'तपोवन एवं लक्ष्मण कुण्ड', mr: 'तपोवन व लक्ष्मण कुंड' },
    location: { en: 'Nashik outskirts (Confluence of Kapila & Godavari)', hi: 'तपोवन (कपिला-गोदावरी संगम)', mr: 'तपोवन (कपिला व गोदावरी संगम)' },
    river: 'Kapila & Godavari',
    speciality: {
      en: 'Where Lakshmana severed the nose of Surpanakha. Dense groves where ancient rishis did intense penance.',
      hi: 'ऋषियों की तपोभूमि जहां लक्ष्मण जी ने शूर्पणखा का मानमर्दन किया था।',
      mr: 'ऋषीमुनींचे तपश्चर्या स्थान आणि जिथे लक्ष्मणाने शूर्पणखेचे नाक कापले होते ते ऐतिहासिक ठिकाण.',
    },
    rules: {
      en: 'Peaceful meditative zone. Ideal for Japa and solitary contemplation.',
      hi: 'शांत एवं ध्यान योग्य क्षेत्र। जप एवं परिक्रमा हेतु उत्तम।',
      mr: 'अत्यंत शांत परिसर; नामस्मरण, जप व साधनेसाठी अतिशय योग्य.',
    },
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tapovan_nashik.jpg?width=800',
  },
  {
    name: { en: 'Kapaleshwar Mahadev (No Nandi)', hi: 'कपालेश्वर महादेव', mr: 'कपालेश्वर महादेव मंदिर' },
    location: { en: 'Opposite Ramkund, Nashik', hi: 'रामकुण्ड के सम्मुख', mr: 'रामकुंडासमोर, नाशिक' },
    river: 'Godavari Overlook',
    speciality: {
      en: 'The world\'s only Shiva temple without a Nandi bull idol outside. Lord Shiva considers Nandi as his Guru here who guided Him to cleanse the Brahma-hatya dosha in Ramkund.',
      hi: 'विश्व का एकमात्र शिव मंदिर जहां नंदी की मूर्ति नहीं है; क्योंकि शिवजी ने नंदी को गुरु माना था।',
      mr: 'जगातील एकमेव शिवमंदिर जिथे महादेवाच्या समोर नंदी नाही. कारण नंदीने शंकराला ब्रह्महत्येचे पातक धुण्यासाठी रामकुंडाचा मार्ग दाखवल्याने, शिवाने नंदीला गुरू मानले.',
    },
    rules: {
      en: 'Climb 50 stone steps. Devotees offer bilva leaves directly.',
      hi: 'सीढ़ियां चढ़कर दर्शन। बिल्वपत्र अर्पण।',
      mr: 'पायऱ्या चढून दर्शन. थेट शिवलिंगाला जल व बेलपत्र अर्पण.',
    },
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panchavati-Ramkund.jpg?width=800',
  },
];

export const godavariStotramDevanagari = `॥ श्री गोदावरी स्तोत्रम् ॥
गौतमीये तटस्थानां नराणां मुक्तिदायिनी ।
पापापहारिणी पुण्या गोदावरी नमोऽस्तु ते ॥ १ ॥

सह्यपादसमुद्भूते शङ्करस्य जटाधरे ।
त्र्यम्बकप्रियकल्याणि गोदावरी नमोऽस्तु ते ॥ २ ॥

रामतीर्थे च ये स्नाताः कुशावर्ते च ये नराः ।
ते यान्ति ब्रह्मणः स्थानं गोदावरी नमोऽस्तु ते ॥ ३ ॥

भागीरथीसमे देवि दक्षिणस्यां दिशि स्थिते ।
सर्वकामप्रदे मातर्गोदावरी नमोऽस्तु ते ॥ ४ ॥`;

export const godavariStotramMeaning: MultilingualText = {
  en: 'O Mother Godavari, who grants liberation to those dwelling on Gautami banks, who destroys all sins, salutations to You! Born of the Sahyadri foothills, carrying the grace of Shiva\'s locks, beloved to Trimbakeshwar—salutations to You! Those who bathe at Ramkund and Kushavarta attain the supreme abode of Brahman.',
  hi: 'हे मां गोदावरी! जो गौतमी तट के प्राणियों को मुक्ति प्रदान करती हैं, समस्त पापों का नाश करती हैं, आपको वन्दन! सह्याद्रि से उत्पन्न, त्र्यंबकेश्वर की प्रिय कल्याणी मां गोदावरी को नमस्कार! जो रामकुण्ड एवं कुशावर्त में स्नान करते हैं, वे परमधाम प्राप्त करते हैं।',
  mr: 'हे पापहारिणी, पुण्यदात्री गोदावरी माते, तुला कोटी कोटी नमस्कार! सह्याद्रीच्या कुशीत उगम पावून महादेवाच्या जटेतून प्रकटलेल्या, त्र्यंबकेश्वराची कृपा असलेल्या माते, तुला नमन असो! जे रामकुंडात व कुशावर्तात पवित्र स्नान करतात, त्यांना परब्रह्माचे स्थान प्राप्त होते.',
};


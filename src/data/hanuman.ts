import { MultilingualText } from '../types';

export interface HanumanInfo {
  name: MultilingualText;
  title: MultilingualText;
  tagline: MultilingualText;
  names12: { name: string; roman: string; meaning: MultilingualText }[];
  stories: { title: MultilingualText; summary: MultilingualText; scripture: string }[];
  significance: MultilingualText;
  tuesdaySignificance: MultilingualText;
  saturdaySignificance: MultilingualText;
}

export const hanumanData: HanumanInfo = {
  name: {
    en: 'Lord Hanuman',
    hi: 'श्री हनुमान',
    mr: 'श्री हनुमान (मारुती)',
  },
  title: {
    en: 'The Embodiment of Courage, Selfless Devotion & Humility',
    hi: 'साहस, निःस्वार्थ भक्ति और विनम्रता के प्रतीक',
    mr: 'शौर्य, निःस्वार्थ भक्ती आणि नम्रतेचे प्रतीक',
  },
  tagline: {
    en: 'One-stop authentic digital devotional guide — Learn, Chant, Worship & Discover.',
    hi: 'एक संपूर्ण प्रामाणिक डिजिटल भक्ति मार्गदर्शक — शिका, जप करा, पूजा करा आणि जाणून घ्या.',
    mr: 'एक परिपूर्ण प्रामाणिक डिजिटल भक्ती मार्गदर्शक — शिका, नामस्मरण करा, पूजा करा आणि जाणा.',
  },
  names12: [
    {
      name: 'ॐ हनुमान',
      roman: 'Om Hanuman',
      meaning: {
        en: 'One with a prominent jaw; resilient against all weapons',
        hi: 'विशिष्ट हनुवटी असलेले; सर्व संकटांवर मात करणारे',
        mr: 'दृढ हनुवटी असलेले; संकटांवर मात करणारे अजिंक्य'
      }
    },
    {
      name: 'ॐ अञ्जनीसुत',
      roman: 'Om Anjanisuta',
      meaning: {
        en: 'Son of Mata Anjana',
        hi: 'माता अंजना के प्रिय पुत्र',
        mr: 'माता अंजनीचे सुपुत्र'
      }
    },
    {
      name: 'ॐ वायुपुत्र',
      roman: 'Om Vayuputra',
      meaning: {
        en: 'Born through the divine blessing of the Wind God (Pavandev)',
        hi: 'पवनदेव के दिव्य अनुग्रह से उत्पन्न',
        mr: 'पवनदेवांच्या कृपेने जन्मलेले'
      }
    },
    {
      name: 'ॐ महाबल',
      roman: 'Om Mahabala',
      meaning: {
        en: 'Possessor of boundless physical and spiritual strength',
        hi: 'असीम शारीरिक व आत्मिक बल से संपन्न',
        mr: 'अतुलनीय शारीरिक व आत्मिक शक्तीचे स्वामी'
      }
    },
    {
      name: 'ॐ रामेष्ट',
      roman: 'Om Rameshta',
      meaning: {
        en: 'Deeply beloved to Lord Rama',
        hi: 'प्रभु श्रीराम के परम प्रिय',
        mr: 'प्रभू श्रीरामांचे अत्यंत लाडके'
      }
    },
    {
      name: 'ॐ फाल्गुनसख',
      roman: 'Om Phalgunasakha',
      meaning: {
        en: 'Friend and protector of Arjuna (on his chariot banner in Mahabharata)',
        hi: 'अर्जुन के सखा व रथध्वज रक्षक',
        mr: 'अर्जुनाचे सखा व रथध्वजावरील रक्षक'
      }
    },
    {
      name: 'ॐ पिङ्गाक्ष',
      roman: 'Om Pingaksha',
      meaning: {
        en: 'Having radiant, reddish-golden eyes full of focused alertness',
        hi: 'तेजस्वी तांबूस-सुवर्ण नेत्रांचे धनी',
        mr: 'तेजस्वी सुवर्ण वर्णीय दृष्टी असणारे'
      }
    },
    {
      name: 'ॐ अमितविक्रम',
      roman: 'Om Amitavikrama',
      meaning: {
        en: 'Of immeasurable courage and heroic valor',
        hi: 'असीम पराक्रम और निर्भयता के प्रतीक',
        mr: 'अमर्याद पराक्रम आणि निर्भयतेचे मूर्तिमंत रूप'
      }
    },
    {
      name: 'ॐ उदधिक्रमण',
      roman: 'Om Udadhi-kramana',
      meaning: {
        en: 'The one who leaped across the vast ocean in a single bound',
        hi: 'विशाल महासागर को एक छलांग में लांघने वाले',
        mr: 'विशाल महासागर एका उड्डाणात पार करणारे'
      }
    },
    {
      name: 'ॐ सीताशोकविनाशन',
      roman: 'Om Sita-shoka-vinashana',
      meaning: {
        en: 'The redeemer who removed the sorrow of Mother Sita in Ashoka Vatika',
        hi: 'माता सीता के दुःख व संताप का हरण करने वाले',
        mr: 'अशोक वाटिकेत माता सीतेचे दुःख दूर करणारे'
      }
    },
    {
      name: 'ॐ लक्ष्मणप्राणदाता',
      roman: 'Om Lakshmana-pranadata',
      meaning: {
        en: 'Bringer of the Sanjeevani herb who revived Lakshmana',
        hi: 'संजीवनी बूटी लाकर लक्ष्मण जी को नवजीवन देने वाले',
        mr: 'संजीवनी आणून लक्ष्मणाला जीवनदान देणारे'
      }
    },
    {
      name: 'ॐ दशग्रीवदर्पहा',
      roman: 'Om Dashagriva-darpaha',
      meaning: {
        en: 'The crusher of the arrogance and pride of ten-headed Ravana',
        hi: 'दशानन रावण के अहंकार का मर्दन करने वाले',
        mr: 'दहा तोंडांच्या रावणाचा अहंकार चक्काचूर करणारे'
      }
    }
  ],
  stories: [
    {
      title: {
        en: 'The Flight Across the Ocean & Surasa Encounter',
        hi: 'महासागर लंघन और सुरसा की परीक्षा',
        mr: 'समुद्र उल्लंघन आणि सुरसा परीक्षा',
      },
      summary: {
        en: 'When searching for Sita, Hanuman faced the sea serpent Surasa. Instead of fighting with raw brute force, he expanded his size, then became as tiny as a thumb to enter her mouth and emerge instantly, proving that true courage combines humility and sharp intellect.',
        hi: 'सीता जी की खोज में जब सुरसा ने मार्ग रोका, तो हनुमान जी ने केवल बल नहीं अपितु बुद्धि का प्रयोग किया। पहले अपना रूप विशाल किया, फिर अंगुष्ठ मात्र सूक्ष्म होकर उसके मुख में प्रवेश कर बाहर आए। यह सिखाता है कि शक्ति के साथ विवेक परम आवश्यक है।',
        mr: 'सीतामाईंच्या शोधात जाताना सुरसेने वाट अडवली. हनुमंतांनी केवळ बळाचा वापर न करता बुद्धी चातुर्य दाखवले. प्रथम शरीर अक्राळविक्राळ केले, नंतर अंगठ्याएवढे सूक्ष्म होऊन तिच्या मुखात जाऊन बाहेर आले. सामर्थ्यासोबत नम्रता आणि बुद्धिमत्ता कशी असावी याचे हे उत्तम उदाहरण आहे.'
      },
      scripture: 'Valmiki Ramayana, Sundara Kanda (Sarga 1)'
    },
    {
      title: {
        en: 'Lifting the Dronagiri Mountain for Sanjeevani',
        hi: 'संजीवनी बूटी हेतु द्रोणागिरि पर्वत उठाना',
        mr: 'संजीवनी वनस्पतीसाठी द्रोणागिरी पर्वत उचलणे',
      },
      summary: {
        en: 'When Lakshmana was gravely wounded, the physician Sushena requested the luminous Sanjeevani herb before dawn. Unable to identify the exact herb among the glowing flora, Hanuman lifted the entire mountain and flew across India without losing a single moment, placing duty and devotion above hesitation.',
        hi: 'लक्ष्मण जी के मूर्छित होने पर जब संजीवनी बूटी की पहचान में संदेह हुआ, तो हनुमान जी ने समय व्यर्थ किए बिना पूरा पर्वत ही उठा लिया। यह दिखाता है कि जब लक्ष्य महत्वपूर्ण हो, तो संशय छोड़कर पूर्ण समर्पण से कार्य करना चाहिए।',
        mr: 'लक्ष्मण मूर्छित असताना सुषेण वैद्यांनी सूर्योदयापूर्वी संजीवनी आणण्यास सांगितले. औषधी ओळखण्यात वेळ न दवडता हनुमंतांनी संपूर्ण द्रोणागिरी पर्वतच उचलून आणला. कर्तव्य आणि भक्तीमध्ये कसलाही संकोच नसावा याचे हे आदर्श प्रतीक आहे.'
      },
      scripture: 'Ramcharitmanas, Lanka Kanda'
    }
  ],
  significance: {
    en: 'In Indian spiritual thought, Hanuman represents the pinnacle of Nishkama Seva (selfless action without ego), infinite physical resilience, deep Vedic knowledge (he is described as Nava-Vyakarana-Pandita - master of nine schools of grammar), and supreme meditation.',
    hi: 'भारतीय आध्यात्मिक परंपरा में श्री हनुमान निष्काम सेवा, अहंकाररहित अतुलनीय बल, तथा नौ व्याकरणों के अद्वितीय ज्ञाता (नवव्याकरणपण्डित) के रूप में पूजे जाते हैं।',
    mr: 'भारतीय अध्यात्मात श्री मारुतीराया हे निष्काम सेवेचे, अहंकाराचा लवलेश नसलेल्या महाबलाचे आणि नऊ व्याकरण सूत्रांचे गाढे अभ्यासक (नवव्याकरणपंडित) मानले जातात.'
  },
  tuesdaySignificance: {
    en: 'Tuesday (Mangalwar) is dedicated to Hanuman. Mars (Mangala) governs energy, courage, and vitality, of which Hanuman is the presiding protector, instilling discipline and overcoming mental anxieties.',
    hi: 'मंगलवार श्री हनुमान जी की उपासना का विशेष दिन है। मंगल ग्रह साहस, ऊर्जा और ओज का कारक है, जिसके संरक्षक देवता हनुमान जी माने जाते हैं।',
    mr: 'मंगळवार हा मारुतीरायांच्या उपासनेचा मुख्य वार आहे. मंगळ ग्रह ऊर्जा आणि साहसाचे प्रतीक आहे, ज्यांचे विघ्नहर्ता मारुती मानले जातात.'
  },
  saturdaySignificance: {
    en: 'Saturday (Shaniwar) is celebrated for Hanuman worship due to the Puranic tradition where Hanuman freed Shani Dev from Ravana\'s captivity; in gratitude, Shani assured benevolence to all who sincerely remember Hanuman.',
    hi: 'शनिवार को हनुमान उपासना विशेष फलदायी मानी जाती है। मान्यता है कि हनुमान जी ने शनिदेव को रावण के बंधन से मुक्त कराया था, जिससे शनिदेव ने उनके भक्तों पर कृपा का वचन दिया।',
    mr: 'शनिवार मारुती उपासनेसाठी अत्यंत पवित्र मानला जातो. रावणाच्या कैदेतून शनिदेवांची सुटका मारुतीरायांनी केली होती, म्हणून हनुमंत भक्तांना शनिपीडेपासून अभय मिळते अशी श्रद्धा आहे.'
  }
};


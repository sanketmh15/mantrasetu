export interface Temple3DModel {
  id: string;
  name: { en: string; hi: string; mr: string };
  city: string;
  historicalEra: string;
  architectureType: { en: string; hi: string; mr: string };
  description: { en: string; hi: string; mr: string };
  modelType: 'hemadpanthi' | 'dravidian' | 'nagara' | 'vesara' | 'rock_cut';
  zones: {
    id: string;
    name: { en: string; hi: string; mr: string };
    meaning: { en: string; hi: string; mr: string };
    spiritualLore: { en: string; hi: string; mr: string };
    coordinate: { x: number; y: number; z: number };
  }[];
  audioTourScript: { en: string; hi: string; mr: string };
}

export const temple3DDatabase: Temple3DModel[] = [
  // 1. Trimbakeshwar Shiva Jyotirlinga (Nashik)
  {
    id: 'trimbakeshwar',
    name: {
      en: 'Trimbakeshwar Shiva Jyotirlinga',
      hi: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
      mr: 'श्री क्षेत्र त्र्यंबकेश्वर ज्योतिर्लिंग'
    },
    city: 'Trimbak, Nashik',
    historicalEra: '1755-1786 CE (Peshwa Balaji Baji Rao)',
    architectureType: {
      en: 'Nagara Hemadpanthi Basalt Stone',
      hi: 'नागर हेमाडपंथी कृष्ण प्रस्तर',
      mr: 'हेमाडपंथी नागर शैली काळा पाषाण'
    },
    description: {
      en: 'Historic Jyotirlinga shrine carved entirely from black basalt stone. Features an imposing 5-tiered Nagara Shikhara, intricately sculpted Mandapa pillars, and the sacred Kushavarta Tirtha kund.',
      hi: 'काले प्रस्तर से निर्मित भव्य ज्योतिर्लिंग मंदिर। इसमें ५-स्तरीय नागर शिखर, अलंकृत मण्डप और पवित्र कुशावर्त कुण्ड विद्यमान हैं।',
      mr: 'काळ्या पाषाणातील अप्रतिम कोरीवकाम, ५ मजली भव्य नागर शिखर, सभामंडप आणि ब्रह्मगिरी पर्वताच्या पायथ्याशी असलेले पवित्र कुशावर्त कुंड.'
    },
    modelType: 'hemadpanthi',
    zones: [
      {
        id: 'garbhagriha',
        name: { en: 'Garbhagriha (Sanctum Sanctorum)', hi: 'गर्भगृह (मूल लिंग स्थल)', mr: 'गर्भगृह (त्रिमूर्ती लिंग)' },
        meaning: {
          en: 'The innermost sacred womb chamber housing the natural depression with three thumb-sized Lingams of Brahma, Vishnu, and Shiva.',
          hi: 'अंतरतम पावन कक्ष जहां ब्रह्मा, विष्णु और महेश के त्रिदेव रूपी तीन स्वयंभू लिंग विराजित हैं।',
          mr: 'ज्या गर्भाशयात ब्रह्मा, विष्णू आणि महेशाचे तीन अंगठ्याएवढे स्वयंभू लिंग आहेत असा पावन गाभारा.'
        },
        spiritualLore: {
          en: 'Continuous spring of Godavari water naturally trickles over the three Lingams.',
          hi: 'गोदावरी का पावन जल निरंतर त्रिदेव लिंगों को अभिषिक्त करता है।',
          mr: 'गंगा गोदावरीचा उगम या पावन लिंगातून अखंड झिरपतो अशी भाविकांची श्रद्धा आहे.'
        },
        coordinate: { x: 50, y: 70, z: 0 }
      },
      {
        id: 'shikhara',
        name: { en: 'Nagara Shikhara (Temple Spire)', hi: 'नागर शिखर', mr: 'नागर शिखर व सुवर्ण कळस' },
        meaning: {
          en: 'Towering pyramidal spire symbolizing Mount Meru, adorned with miniature Urushringa spires and a golden Kalasha on top.',
          hi: 'मेरु पर्वत का प्रतीक विशाल शिखर, जिस पर उरुशृंग और सुवर्ण कलश स्थापित हैं।',
          mr: 'मेरु पर्वताचे प्रतीक असलेले आकाशाकडे झेपावणारे दगडी शिखर, त्यावर सुवर्ण कळस व ध्वज फडकतो.'
        },
        spiritualLore: {
          en: 'Channelizes cosmic prana from ether down to the consecrated deity idol.',
          hi: 'ब्रह्मांडीय ऊर्जा को गर्भगृह के ज्योतिर्लिंग तक संकेंद्रित करता है।',
          mr: 'आकाशातील वैश्विक ऊर्जा ग्रहण करून गर्भगृहातील लिंगावर केंद्रित करण्याचे काम शिखर करते.'
        },
        coordinate: { x: 50, y: 15, z: 0 }
      },
      {
        id: 'mandapa',
        name: { en: 'Gudhamandapa (Pillared Hall)', hi: 'गूढ़मण्डप (सभा मण्डप)', mr: 'सभामंडप व कोरीव खांब' },
        meaning: {
          en: 'Massive closed pillared hall supported by monolithic basalt stone pillars depicting mythological scenes.',
          hi: 'काले पत्थरों के नक्काशीदार खंभों पर टिका विशाल सभा मंडप।',
          mr: 'काळ्या पाषाणातील एकाश्म खांबांवर तोललेला भव्य सभामंडप जिथे भाविक नामस्मरण करतात.'
        },
        spiritualLore: {
          en: 'Where devotees gather for collective Vedic kirtan, japa, and viewing the divine aarti.',
          hi: 'जहाँ भक्तजन सामूहिक जप, कीर्तन और आरती दर्शन करते हैं।',
          mr: 'जिथे भक्तगण एकत्र येऊन नामजप, शिवस्तुती आणि काकड आरतीचे दर्शन घेतात.'
        },
        coordinate: { x: 50, y: 50, z: 40 }
      },
      {
        id: 'nandi_mandapa',
        name: { en: 'Nandi Pavilion', hi: 'नन्दी मण्डप', mr: 'नंदी मंडप' },
        meaning: {
          en: 'Detached porch housing the sacred marble and stone Nandi Bull facing directly into Lord Shiva’s eyes.',
          hi: 'भगवान शिव के सम्मुख अविचल दृष्टि से ध्यानमग्न नन्दी जी का मंडप।',
          mr: 'महादेवाच्या लिंगाकडे अखंड एकटक पाहणारा, भक्ती व संयमाचे प्रतीक असलेला पावन नंदी.'
        },
        spiritualLore: {
          en: 'Whispering prayers into Nandi’s ears directly conveys human heartfelt wishes to Mahadeva.',
          hi: 'नन्दी के कानों में कही प्रार्थना सीधे शिवजी तक पहुँचती है।',
          mr: 'नंदीच्या कानात बोललेली मनोकामना थेट महादेवाच्या चरणी पोहोचते अशी सनातन परंपरा आहे.'
        },
        coordinate: { x: 50, y: 80, z: 70 }
      }
    ],
    audioTourScript: {
      en: 'Welcome to the 3D Virtual Sanctum of Trimbakeshwar Jyotirlinga. Observe the black basalt stone masonry built by Peshwa Nana Saheb. Notice the 5-tiered spire rising above the sanctum sanctorum where the trimurti linga of Brahma, Vishnu, and Rudra rests.',
      hi: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग के त्रि-आयामी दर्शन में आपका स्वागत है। पेशवा काल में काले पाषाण से निर्मित इस मंदिर के शिखर और गर्भगृह का अवलोकन करें, जहाँ त्रिदेव लिंग साक्षात विद्यमान हैं।',
      mr: 'श्री क्षेत्र त्र्यंबकेश्वर ज्योतिर्लिंगाच्या ३D व्हर्च्युअल दर्शन दालनात आपले स्वागत आहे. पेशवेकालीन काळ्या पाषाणातील कोरीव काम, भव्य शिखर आणि गर्भगृहातील स्वयंभू त्रिमूर्ती लिंगाचे मनोभावे दर्शन घ्या.'
    }
  },

  // 2. Pandharpur Vitthal Rukmini Mandir
  {
    id: 'pandharpur',
    name: {
      en: 'Pandharpur Shri Vitthal Rukmini Mandir',
      hi: 'पंढरपुर श्री विट्ठल रुक्मिणी मंदिर',
      mr: 'श्री क्षेत्र पंढरपूर विठ्ठल-रखुमाई मंदिर'
    },
    city: 'Pandharpur, Solapur',
    historicalEra: '12th Century CE (Yadava & Hoysala Architecture)',
    architectureType: {
      en: 'Yadava Stone Architecture',
      hi: 'यादवकालीन प्रस्तर स्थापत्य',
      mr: 'यादवकालीन काळ्या पाषाणातील कोरीव काम'
    },
    description: {
      en: 'The heart of Maharashtra’s Varkari tradition along the holy Chandrabhaga River. Includes the Namdev Payari, Solakhambi Mandap, Chaukhambi, and the inner sanctum where Lord Vitthala stands upon a brick.',
      hi: 'चंद्रभागा तट पर स्थित वारकरी सम्प्रदाय का सर्वोच्च तीर्थ। नामदेव पायरी, सोलहखंभी मंडप और विट्ठल-रखुमाई का पावन गर्भगृह।',
      mr: 'चंद्रभागेच्या तीरावरील वारकरी संतांचे माहेरघर. संत नामदेव पायरी, १६ खांबी सभामंडप, ४ खांबी गाभारा व विटेवर उभी असलेली विठू माऊली.'
    },
    modelType: 'rock_cut',
    zones: [
      {
        id: 'namdev_payari',
        name: { en: 'Sant Namdev Payari (Sacred Step)', hi: 'संत नामदेव पायरी', mr: 'संत नामदेव पायरी' },
        meaning: {
          en: 'The very first entrance step where Sant Namdev Maharaj took Samadhi so that the dust of all visiting devotees’ feet blesses him eternally.',
          hi: 'मंदिर की प्रथम सीढ़ी जहां संत नामदेव जी ने समाधि ली ताकि संतों और भक्तों के चरणों की धूल उन्हें प्राप्त हो।',
          mr: 'मंदिराची पहिली पायरी जिथे संत नामदेव महाराजांनी संतांच्या चरणधुळीसाठी समाधी घेतली.'
        },
        spiritualLore: {
          en: 'Devotees bow their head on this step before entering the sanctum.',
          hi: 'दर्शनार्थी भीतर प्रवेश से पूर्व इस पावन पायरी पर मस्तक टेकते हैं।',
          mr: 'मंदिरात प्रवेश करताना प्रत्येक भाविक आदराने नामदेव पायरीला स्पर्श करून नतमस्तक होतो.'
        },
        coordinate: { x: 50, y: 90, z: 90 }
      },
      {
        id: 'solakhambi',
        name: { en: 'Solakhambi Mandap (16-Pillared Hall)', hi: 'सोलहखंभी मण्डप', mr: 'सोळाखांबी मंडप' },
        meaning: {
          en: 'Historic Yadava period assembly hall resting on 16 stone pillars adorned with avatars of Vishnu and scenes from Bhagavata.',
          hi: '१६ नक्काशीदार प्रस्तर स्तंभों पर आधारित ऐतिहासिक सभा कक्ष।',
          mr: '१६ नक्षीदार पाषाणी खांबांवर आधारलेला ऐतिहासिक मंडप जिथे अखंड भजन-कीर्तन चालते.'
        },
        spiritualLore: {
          en: 'Garuda Pillar (Garud Khamb) is situated here, embraced by all Varkaris.',
          hi: 'यहीं प्रसिद्ध गरुड़ स्तंभ स्थापित है जिसे वारकरी प्रेम से आलिंगन देते हैं।',
          mr: 'येथे प्रसिद्ध गरुड खांब आहे, ज्याला मिठी मारून वारकरी माऊलीचे स्मरण करतात.'
        },
        coordinate: { x: 50, y: 65, z: 45 }
      },
      {
        id: 'vitthal_garbha',
        name: { en: 'Vitthal Sanctum (Charan Sparsh)', hi: 'विट्ठल गर्भगृह', mr: 'विठ्ठल गर्भगृह (चरण स्पर्श)' },
        meaning: {
          en: 'The inner sanctum where Lord Vitthala stands on a brick (Vitevari) with hands on hips, flanked by Goddess Rakhumai.',
          hi: 'कर-कटाक्षा विट्ठल की दिव्य मूर्ति जो विट्ठल भक्त पुंडलिक की भेंट की हुई ईंट पर विराजमान है।',
          mr: 'भक्त पुंडलिकाने फेकलेल्या विटेवर कमरेवर हात ठेवून उभा असलेला सावळा विठ्ठल.'
        },
        spiritualLore: {
          en: 'The only major temple in India where devotees can touch their head directly to the feet (Charan Sparsh) of the Supreme Deity regardless of caste or creed.',
          hi: 'सम्पूर्ण भारत का एकमात्र तीर्थ जहाँ प्रत्येक भक्त साक्षात भगवान के श्रीचरणों में मस्तक टेक सकता है।',
          mr: 'भारतातील एकमेव तीर्थक्षेत्र जिथे सर्व जाती-धर्माच्या भाविकांना देवाच्या पायांवर डोके ठेवता येते.'
        },
        coordinate: { x: 50, y: 50, z: 0 }
      }
    ],
    audioTourScript: {
      en: 'Step into the 3D model of Pandharpur Vitthal Temple. Walk past the sacred Namdev Payari, enter the 16-pillared Solakhambi hall, and view the divine lotus feet of Lord Panduranga standing on the sacred brick.',
      hi: 'पंढरपुर विट्ठल मंदिर के ३D दर्शन में प्रवेश करें। नामदेव पायरी को नमन करते हुए सोलहखंभी मंडप और गरुड़ स्तंभ से होकर विट्ठल जी के चरणों का ध्यान करें।',
      mr: 'पंढरपूर विठ्ठल मंदिराच्या ३D दर्शन दालनात पाऊल ठेवा. नामदेव पायरी, सोळाखांबी मंडप, गरुड खांब आणि विटेवर उभ्या असलेल्या विठू माऊलीचे पावन दर्शन घ्या.'
    }
  },

  // 3. Kailasa Temple Ellora (Rock-Cut Monolith)
  {
    id: 'kailasa_ellora',
    name: {
      en: 'Kailasa Temple Ellora (Cave 16)',
      hi: 'कैलाश मन्दिर एलोरा (गुफा १६)',
      mr: 'वेरूळचे कैलास मंदिर (लेणी क्रमांक १६)'
    },
    city: 'Chhatrapati Sambhajinagar',
    historicalEra: '8th Century CE (Rashtrakuta King Krishna I)',
    architectureType: {
      en: 'Dravidian Monolithic Rock-Cut Architecture',
      hi: 'एकल प्रस्तर द्रविड़ स्थापत्य',
      mr: 'जगातील एकमेव अखंड खडकात वरून खाली कोरलेले महामंदिर'
    },
    description: {
      en: 'The world’s largest monolithic rock-cut structure carved top-to-bottom out of a single volcanic basalt cliff, excavating over 200,000 tons of rock without modern machinery.',
      hi: 'एक ही विशाल चट्टान को ऊपर से नीचे की ओर काटकर निर्मित विश्व का सबसे अद्भुत प्रस्तर मन्दिर।',
      mr: 'जगातील सर्वात मोठे आश्चर्य! एकाच अखंड डोंगरात वरून खाली २००,००० टन दगड कोरून काढलेले कैलास मंदिर.'
    },
    modelType: 'rock_cut',
    zones: [
      {
        id: 'shikhara_ellora',
        name: { en: '3-Tier Dravidian Vimana (32m high)', hi: 'द्रविड़ विमान शिखर', mr: '३२ मीटर उंच द्रविड शैलीतील विमान शिखर' },
        meaning: {
          en: 'Modeled after Mount Kailasa, adorned with thousands of carved deities, gandharvas, and celestial guardians.',
          hi: 'कैलाश पर्वत के समान भव्य शिखर, जो सूक्ष्म मूर्तिकला से आच्छादित है।',
          mr: 'कैलास पर्वताची प्रतिकृती, ज्यावर शेकडो देव-देवता, यक्ष व गंधर्वांची शिल्पे कोरलेली आहेत.'
        },
        spiritualLore: {
          en: 'Architects began carving from the pinnacle downwards with absolute zero tolerance for structural error.',
          hi: 'शिल्पकारों ने शिखर से प्रारम्भ कर नीचे की ओर खुदाई की, जिसमें भूल की कोई गुंजाइश नहीं थी।',
          mr: 'शिल्पकारांनी सर्वात आधी शिखराचा कळस कोरला आणि खाली उतरत गर्भगृह व खांब कोरले.'
        },
        coordinate: { x: 50, y: 15, z: 0 }
      },
      {
        id: 'ravan_shaking_kailash',
        name: { en: 'Ravana Shaking Mount Kailasa Panel', hi: 'रावण अनुग्रह मूर्ति', mr: 'रावणाचे कैलास तोलन शिल्प' },
        meaning: {
          en: 'World-famous dramatic relief sculpture showing multi-armed Ravana attempting to shake Mount Kailasa while Shiva anchors it with a toe press.',
          hi: 'विश्वविख्यात प्रस्तर चित्र जहां रावण कैलाश हिलाने का प्रयास करता है और शिवजी अंगूठे से पर्वत स्थिर करते हैं।',
          mr: 'दहा तोंडांचा रावण दोन्ही हातांनी कैलास पर्वत हलवण्याचा प्रयत्न करतोय आणि शिवाने केवळ पायाच्या अंगठ्याने पर्वत स्थिर केला आहे.'
        },
        spiritualLore: {
          en: 'Teaches that human ego, no matter how powerful, is easily humbled by divine grace.',
          hi: 'यह अहंकार के दमन और प्रभु कृपा की सर्वोच्च विजय का प्रतीक है।',
          mr: 'अहंकाराचे दमन आणि ईश्वराची अथांग शक्ती दर्शवणारे जगातील सर्वोत्तम शिल्प.'
        },
        coordinate: { x: 75, y: 60, z: 30 }
      }
    ],
    audioTourScript: {
      en: 'Witness the engineering marvel of Ellora Cave 16: Kailasa Temple. Carved vertically downwards from basalt mountain in the 8th century by the Rashtrakutas.',
      hi: 'एलोरा के विश्व प्रसिद्ध कैलाश मन्दिर का त्रि-आयामी अन्वेषण करें। ८वीं शताब्दी में राष्ट्रकूट राजाओं द्वारा एक ही चट्टान को तराशकर बनाया गया अजूबा।',
      mr: 'वेरूळच्या लेणी १६ मधील कैलास मंदिराचे ३D दर्शन करा. एकाच अखंड पाषाणात वरून खाली कोरलेले हे जगातील सर्वात मोठे स्थापत्य आश्चर्य आहे.'
    }
  }
];


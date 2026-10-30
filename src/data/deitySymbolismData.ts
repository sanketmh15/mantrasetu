export interface SymbolismItem {
  id: string;
  name: { en: string; hi: string; mr: string };
  category: 'weapon' | 'vehicle' | 'mudra' | 'ornament' | 'form';
  deityAssociated: { en: string; hi: string; mr: string };
  symbolIcon: string;
  literalMeaning: { en: string; hi: string; mr: string };
  esotericSymbolism: { en: string; hi: string; mr: string };
  scripturalQuote: {
    sanskrit: string;
    meaning: { en: string; hi: string; mr: string };
  };
}

export const deitySymbolismDatabase: SymbolismItem[] = [
  // 1. Trishula (Trident)
  {
    id: 'trishula',
    name: { en: 'Trishula (Sacred Trident)', hi: 'त्रिशूल', mr: 'त्रिशूळ' },
    category: 'weapon',
    deityAssociated: { en: 'Lord Shiva & Goddess Durga', hi: 'भगवान शिव एवं माँ दुर्गा', mr: 'भगवान शिव व माता दुर्गा' },
    symbolIcon: '🔱',
    literalMeaning: {
      en: 'A three-pronged golden spear held by Lord Shiva and Goddess Durga.',
      hi: 'तीन शूलों वाला दिव्य अस्त्र।',
      mr: 'तीन पाते असलेले अस्त्र.'
    },
    esotericSymbolism: {
      en: 'Represents mastery over the 3 Gunas (Sattva, Rajas, Tamas), 3 Nadis (Ida, Pingala, Sushumna), 3 times (Past, Present, Future), and 3 states of consciousness (Waking, Dreaming, Deep Sleep). When Shiva wields it, he annihilates ignorance across all three realms.',
      hi: 'यह तीनों गुणों (सत्त्व, रज, तम), तीनों कालों (भूत, वर्तमान, भविष्य) और तीनों नाड़ियों (इड़ा, पिंगला, सुषुम्ना) पर पूर्ण विजय का प्रतीक है।',
      mr: 'सत्त्व, रज आणि तम या तीन गुणांचे नियंत्रण; भूत, वर्तमान व भविष्य या तीन काळांचे नियमन; आणि इडा, पिंगळा व सुषुम्ना या तीन नाड्यांच्या संतुलनाचे प्रतीक.'
    },
    scripturalQuote: {
      sanskrit: 'त्रिशूलं च त्रिगुणातीतं त्रैकालिकं शिवप्रदम्।',
      meaning: {
        en: 'The Trishula transcends all three gunas, spans all three times, and brings supreme auspiciousness.',
        hi: 'त्रिशूल तीनों गुणों से परे, त्रिकालदर्शी एवं परम कल्याणकारी है।',
        mr: 'त्रिशूळ तिन्ही गुणांपलीकडचे, तिन्ही काळांना जिंकणारे आणि परम कल्याण करणारे आहे.'
      }
    }
  },

  // 2. Sudarshana Chakra
  {
    id: 'sudarshana_chakra',
    name: { en: 'Sudarshana Chakra (Cosmic Discus)', hi: 'सुदर्शन चक्र', mr: 'सुदर्शन चक्र' },
    category: 'weapon',
    deityAssociated: { en: 'Lord Vishnu & Shri Krishna', hi: 'भगवान विष्णु एवं श्रीकृष्ण', mr: 'भगवान विष्णू व श्रीकृष्ण' },
    symbolIcon: '☸️',
    literalMeaning: {
      en: 'The razor-sharp spinning celestial discus resting on Lord Vishnu’s index finger with 108 million serrated spokes.',
      hi: 'भगवान विष्णु की तर्जनी पर घूमता हुआ तेजोमय चक्र।',
      mr: 'भगवान विष्णूंच्या तर्जनीवर फिरणारे तेजोमय व अमोघ चक्र.'
    },
    esotericSymbolism: {
      en: '"Su + Darshana" means "Auspicious Vision / Divine Perspective". It cuts through illusion (Maya), ego, and demonic tendencies at the speed of thought, restoring Dharma across creation.',
      hi: 'सु + दर्शन का अर्थ है सत्य और पवित्र दृष्टि। यह अहंकार और अज्ञान रूपी राक्षसों का क्षण भर में संहार करता है।',
      mr: "सु + दर्शन म्हणजे 'सत्य व मंगलकारी दृष्टी'. ते मनातील अहंकार, वासना व अधर्माचे क्षणात निर्दालन करून धर्मसंस्थापना करते."
    },
    scripturalQuote: {
      sanskrit: 'सुदर्शनं महाचक्रं सर्वदुष्टनिवारणम्।',
      meaning: {
        en: 'The great Sudarshana wheel dispels all wicked energies and shields righteous seekers.',
        hi: 'सुदर्शन चक्र सभी दुष्ट प्रवृत्तियों का शमन कर भक्तों की रक्षा करता है।',
        mr: 'सुदर्शन चक्र सर्व दुष्टांचे निर्दालन करून भक्तांचे रक्षण करते.'
      }
    }
  },

  // 3. Nandi the Bull
  {
    id: 'nandi_bull',
    name: { en: 'Nandi Bull (Embodiment of Devotion)', hi: 'नन्दी बैल (भक्ति का प्रतीक)', mr: 'नंदी (अढळ भक्तीचे प्रतीक)' },
    category: 'vehicle',
    deityAssociated: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'भगवान महादेव' },
    symbolIcon: '🐂',
    literalMeaning: {
      en: 'The sacred white hump-backed bull sitting eternally in front of Shiva’s sanctum.',
      hi: 'शिवलिंग के सम्मुख अविचल ध्यानमग्न बैठा श्वेत वृषभ।',
      mr: 'शिवमंदिरात महादेवाच्या पिंडीसमोर शांतपणे बसलेला नंदी.'
    },
    esotericSymbolism: {
      en: 'Represents patient waiting, focused single-mindedness (Dhyana), and mastery of raw animalistic instincts. Nandi never sleeps or looks away; he waits forever in loving contemplation of Mahadeva.',
      hi: 'यह पूर्ण समर्पण, एकाग्रता और धैर्य का प्रतीक है। नन्दी की दृष्टि शिवजी से कभी विचलित नहीं होती।',
      mr: 'नंदी म्हणजे अखंड प्रतीक्षा, संयम आणि विषयांवर मिळवलेला विजय. तो कधीही डोळे दुसरीकडे फिरवत नाही; त्याचे संपूर्ण लक्ष केवळ शिवावर असते.'
    },
    scripturalQuote: {
      sanskrit: 'नन्दीश्वरो महाभागः शिवभक्तिपरायणः।',
      meaning: {
        en: 'Lord Nandi is supremely blessed, completely absorbed in the love of Lord Shiva.',
        hi: 'नन्दीश्वर परम भाग्यशाली हैं, जो शिवभक्ति में सदैव लीन रहते हैं।',
        mr: 'नंदीश्वर हे अत्यंत भाग्यवान आहेत, जे सदैव शिवभक्तीत लीन असतात.'
      }
    }
  },

  // 4. Abhaya Mudra (Gesture of Fearlessness)
  {
    id: 'abhaya_mudra',
    name: { en: 'Abhaya Mudra (Hand of Fearlessness)', hi: 'अभय मुद्रा (भयमुक्ति)', mr: 'अभय मुद्रा (निर्भयतेचा आशीर्वाद)' },
    category: 'mudra',
    deityAssociated: { en: 'Shiva, Vishnu, Ganesha, Hanuman & Durga', hi: 'समस्त देवी-देवता', mr: 'सर्व ५० देवी-देवता' },
    symbolIcon: '✋',
    literalMeaning: {
      en: 'Right hand raised upright to chest height, palm facing outwards with fingers joined.',
      hi: 'सीधा हाथ ऊपर उठाकर हथेली सामने की ओर खुली रखना।',
      mr: 'उजवा हात छातीजवळ वर करून तळहात समोरच्या दिशेने भक्तांकडे रोखणे.'
    },
    esotericSymbolism: {
      en: 'Translates to: "Do not fear! I am here to protect you." It transmits spiritual tranquility, dissolves anxiety, and assures that under divine shelter, no harm can touch the soul.',
      hi: 'इसका अर्थ है: "डरो मत, मैं तुम्हारी रक्षा कर रहा हूँ।" यह मन से भय, तनाव और असुरक्षा को मिटाती है।',
      mr: 'याचा अर्थ: “भिऊ नकोस, मी तुझ्या पाठीशी आहे!” हे देवाचे भक्ताला दिलेले निर्भयतेचे व संरक्षणाचे आश्वासन आहे.'
    },
    scripturalQuote: {
      sanskrit: 'अभयं सर्वभूतेभ्यो ददाम्येतद् व्रतं मम।',
      meaning: {
        en: 'To give fearlessness to all surrendered souls is my eternal sacred vow.',
        hi: 'सभी शरणागत जीवों को अभय प्रदान करना मेरा परम व्रत है।',
        mr: 'माझ्या चरणी येणाऱ्या सर्व जीवांना निर्भय करणे हे माझे अखंड व्रत आहे.'
      }
    }
  },

  // 5. Damaru (Cosmic Drum of Creation)
  {
    id: 'damaru',
    name: { en: 'Damaru (Drum of Primordial Sound)', hi: 'डमरू (नादब्रह्म)', mr: 'डमरू (आद्य नादब्रह्म)' },
    category: 'ornament',
    deityAssociated: { en: 'Lord Shiva', hi: 'भगवान शिव (नटराज)', mr: 'भगवान महादेव व नटराज' },
    symbolIcon: '🥁',
    literalMeaning: {
      en: 'An hourglass-shaped percussion drum with two ends and a striker bead on cords.',
      hi: 'शिवजी के हाथ में सुशोभित डमरू।',
      mr: 'महादेवाच्या हातात असलेले दुतर्फा नाद करणारे डमरू.'
    },
    esotericSymbolism: {
      en: 'The sound produced by Damaru gave birth to the 14 Maheshwara Sutras — the phonetic foundation of Sanskrit and the universe. The upward triangle is masculine (Purusha), the downward triangle is feminine (Prakriti). Their center meeting creates cosmic vibration.',
      hi: 'डमरू के १४ बार बजने से ही माहेश्वर सूत्रों और संस्कृत व्याकरण की उत्पत्ति हुई। यह सृष्टि के स्पंदन का प्रतीक है।',
      mr: 'डमरूच्या नादातून १४ महेश्वर सूत्रे व संस्कृत भाषेची उत्पत्ती झाली. विश्वाचा आरंभ ध्वनी आणि स्पंदनातून झाला हे डमरू शिकवते.'
    },
    scripturalQuote: {
      sanskrit: 'नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम्।',
      meaning: {
        en: 'At the conclusion of the cosmic dance, King Nataraja sounded his drum fourteen times.',
        hi: 'तांडव नृत्य के अंत में नटराज ने १४ बार डमरू बजाकर संसार को नाद प्रदान किया।',
        mr: 'आनंद तांडवाच्या शेवटी नटराजांनी १४ वेळा डमरू वाजवून विश्वात नादब्रह्म निर्माण केले.'
      }
    }
  },

  // 6. Nataraja (The Cosmic Dancer)
  {
    id: 'nataraja_form',
    name: { en: 'Lord Nataraja (Cosmic Dance Form)', hi: 'नटराज (सृष्टि के दिव्य नर्तक)', mr: 'नटराज (आनंद तांडव स्वरूप)' },
    category: 'form',
    deityAssociated: { en: 'Lord Shiva', hi: 'भगवान शिव', mr: 'भगवान शिवशंकर' },
    symbolIcon: '🔥',
    literalMeaning: {
      en: 'Shiva dancing within a circular ring of fire (Prabhavali), standing on one leg upon dwarf Apasmara.',
      hi: 'अग्नि चक्र के भीतर एक पैर पर अपस्मार दैत्य पर नृत्य करते हुए शिव।',
      mr: 'अग्निकंकणाच्या आत एका पायावर अपस्मार राक्षसाला पायाखाली दाबून आनंद तांडव करणारे शिवाचे रूप.'
    },
    esotericSymbolism: {
      en: 'The five sacred cosmic acts: Creation (Damaru), Preservation (Abhaya mudra), Destruction (Flame), Concealment (foot resting on dwarf of ignorance), and Grace/Liberation (lifted left foot pointed to heart).',
      hi: 'यह सृष्टि, स्थिति, संहार, तिरोभाव और अनुग्रह — इन पांचों ब्रह्मांडीय क्रियाओं का सजीव प्रकटीकरण है।',
      mr: 'सृष्टीची उत्पत्ती (डमरू), स्थिती (अभय मुद्रा), संहार (अग्नी), तिरोभाव (अज्ञानाचा पाडाव) आणि मोक्ष (वर उचललेला डावा पाय) यांचे हे विहंगम दृश्य आहे.'
    },
    scripturalQuote: {
      sanskrit: 'संसारदावानलदग्धजीवं कारुण्यदृष्ट्या परिपाति शंभुः।',
      meaning: {
        en: 'With a glance of compassionate grace, Shambhu liberates souls engulfed in worldly forest fires.',
        hi: 'शंभु अपनी करुणामयी दृष्टि से संसार ताप में जलते जीवों का उद्धार करते हैं।',
        mr: 'शिव आपल्या करुणेने संसाराच्या तापात जळणाऱ्या जीवांना मुक्ती प्रदान करतात.'
      }
    }
  }
];

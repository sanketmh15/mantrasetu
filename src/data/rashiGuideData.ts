export interface RashiInfo {
  id: string;
  name: { en: string; hi: string; mr: string };
  symbolIcon: string;
  sanskritName: string;
  element: { en: string; hi: string; mr: string };
  rulingPlanet: { en: string; hi: string; mr: string };
  ishtaDevata: { en: string; hi: string; mr: string };
  beejMantra: {
    sanskrit: string;
    roman: string;
    meaning: { en: string; hi: string; mr: string };
  };
  auspiciousDay: { en: string; hi: string; mr: string };
  auspiciousColor: { en: string; hi: string; mr: string };
  nameInitials: string; // Aksharas
  personalityTrait: { en: string; hi: string; mr: string };
}

export const rashiDatabase: RashiInfo[] = [
  // 1. Aries
  {
    id: 'aries',
    name: { en: 'Aries (Mesha)', hi: 'मेष राशि', mr: 'मेष रास' },
    symbolIcon: '♈',
    sanskritName: 'मेष (Mesha)',
    element: { en: 'Fire (Agni)', hi: 'अग्नि तत्व', mr: 'अग्नी तत्त्व' },
    rulingPlanet: { en: 'Mars (Mangal)', hi: 'मंगल ग्रह', mr: 'मंगळ ग्रह' },
    ishtaDevata: { en: 'Lord Hanuman & Kartikeya', hi: 'श्री हनुमान एवं कार्तिकेय', mr: 'श्री मारुती व कार्तिकेय' },
    beejMantra: {
      sanskrit: 'ॐ हं हनुमते रुद्रात्मकाय हुं फट्॥',
      roman: 'Om Ham Hanumate Rudratmakaya Hum Phat ||',
      meaning: {
        en: 'Salutations to Lord Hanuman, the direct embodiment of Shiva who dissolves all obstacles and fear.',
        hi: 'रुद्रावतार श्री हनुमान को नमन, जो समस्त भय और संकटों का निवारण करते हैं।',
        mr: 'संकटमोचक श्री हनुमंतांना नमन, जे सर्व संकटे व भीतीचे निवारण करून आत्मविश्वास देतात.'
      }
    },
    auspiciousDay: { en: 'Tuesday (Mangalwar)', hi: 'मंगलवार', mr: 'मंगळवार' },
    auspiciousColor: { en: 'Red, Crimson, Saffron', hi: 'लाल, सिंदूरी', mr: 'लाल व भगवा रंग' },
    nameInitials: 'चू, चे, चो, ला, ली, लू, ले, लो, अ',
    personalityTrait: {
      en: 'Courageous, energetic, natural leaders, determined and righteous.',
      hi: 'साहसी, ऊर्जावान, नेतृत्वशील और धर्मपरायण।',
      mr: 'धाडसी, अत्यंत ऊर्जावान, नेतृत्वगुण आणि संकटांशी धैर्याने सामना करणारे.'
    }
  },

  // 2. Taurus
  {
    id: 'taurus',
    name: { en: 'Taurus (Vrishabha)', hi: 'वृषभ राशि', mr: 'वृषभ रास' },
    symbolIcon: '♉',
    sanskritName: 'वृषभ (Vrishabha)',
    element: { en: 'Earth (Prithvi)', hi: 'पृथ्वी तत्व', mr: 'पृथ्वी तत्त्व' },
    rulingPlanet: { en: 'Venus (Shukra)', hi: 'शुक्र ग्रह', mr: 'शुक्र ग्रह' },
    ishtaDevata: { en: 'Mata Mahalakshmi & Lord Vishnu', hi: 'माँ महालक्ष्मी एवं श्रीहरि', mr: 'आई महालक्ष्मी व श्री विष्णू' },
    beejMantra: {
      sanskrit: 'ॐ श्रीं ह्रीं क्लीं श्रीं महालक्ष्म्यै नमः॥',
      roman: 'Om Shreem Hreem Kleem Shreem Mahalakshmyai Namah ||',
      meaning: {
        en: 'Salutations to Supreme Goddess Mahalakshmi, bestower of abundance, peace and grace.',
        hi: 'समस्त ऐश्वर्य, शांति और समृद्धि प्रदान करने वाली माँ महालक्ष्मी को नमन।',
        mr: 'सुख, समृद्धी आणि आत्मिक शांती देणाऱ्या आदिमाया महालक्ष्मीला वंदन.'
      }
    },
    auspiciousDay: { en: 'Friday (Shukrawar)', hi: 'शुक्रवार', mr: 'शुक्रवार' },
    auspiciousColor: { en: 'White, Silver, Rose Pink', hi: 'श्वेत, गुलाबी', mr: 'पांढरा, रुपेरी व गुलाबी' },
    nameInitials: 'ई, ऊ, ए, ओ, वा, वी, वू, वे, वो',
    personalityTrait: {
      en: 'Patient, loyal, aesthetic appreciation, dependable and serene.',
      hi: 'धैर्यवान, निष्ठावान, शांत और सौन्दर्यप्रेमी।',
      mr: 'संयमी, स्थिर विचारांचे, प्रामाणिक, कलेची आवड असणारे व कुटुंबवत्सल.'
    }
  },

  // 3. Gemini
  {
    id: 'gemini',
    name: { en: 'Gemini (Mithuna)', hi: 'मिथुन राशि', mr: 'मिथुन रास' },
    symbolIcon: '♊',
    sanskritName: 'मिथुन (Mithuna)',
    element: { en: 'Air (Vayu)', hi: 'वायु तत्व', mr: 'वायू तत्त्व' },
    rulingPlanet: { en: 'Mercury (Budha)', hi: 'बुध ग्रह', mr: 'बुध ग्रह' },
    ishtaDevata: { en: 'Lord Ganesha & Saraswati', hi: 'श्री गणेश एवं माँ सरस्वती', mr: 'श्री गणेश व माता सरस्वती' },
    beejMantra: {
      sanskrit: 'ॐ गं गणपतये वरवरद सर्वजनं मे वशमानय स्वाहा॥',
      roman: 'Om Gam Ganapataye Vara-Varada Sarvajanam Me Vashamanaya Swaha ||',
      meaning: {
        en: 'Salutations to Lord Ganesha, embodiment of divine intellect and eloquence.',
        hi: 'बुद्धि और विद्या के प्रदाता श्री गणेश को नमन।',
        mr: 'बुद्धी, ज्ञान आणि वाक्सिद्धी देणाऱ्या विघ्नहर्त्या गणपती बाप्पाला नमन.'
      }
    },
    auspiciousDay: { en: 'Wednesday (Budhwar)', hi: 'बुधवार', mr: 'बुधवार' },
    auspiciousColor: { en: 'Emerald Green, Light Green', hi: 'हरा, तोतिया', mr: 'हिरवा व पोपटी रंग' },
    nameInitials: 'का, की, कू, घ, ङ, छ, के, को, हा',
    personalityTrait: {
      en: 'Intellectual, eloquent speakers, adaptable, curious and charming.',
      hi: 'बुद्धिमान, वक्ता, जिज्ञासु और मिलनसार।',
      mr: 'कुशाग्र बुद्धिमत्ता, उत्तम संवादकौशल्य, ज्ञानाची ओढ व हसतमुख स्वभाव.'
    }
  },

  // 4. Cancer
  {
    id: 'cancer',
    name: { en: 'Cancer (Karka)', hi: 'कर्क राशि', mr: 'कर्क रास' },
    symbolIcon: '♋',
    sanskritName: 'कर्क (Karka)',
    element: { en: 'Water (Jala)', hi: 'जल तत्व', mr: 'जल तत्त्व' },
    rulingPlanet: { en: 'Moon (Chandra)', hi: 'चंद्रमा', mr: 'चंद्र देव' },
    ishtaDevata: { en: 'Lord Shiva (Mahadeva)', hi: 'भगवान भोलेनाथ शिव', mr: 'श्री महादेव (भोलेनाथ)' },
    beejMantra: {
      sanskrit: 'ॐ नमः शिवाय शुभं शुभं कुरू कुरू शिवाय नमः ॐ॥',
      roman: 'Om Namah Shivaya Shubham Shubham Kuru Kuru Shivaya Namah Om ||',
      meaning: {
        en: 'Salutations to Lord Shiva, who purifies the mind, removes anxiety, and brings inner peace.',
        hi: 'मन के संताप मिटाकर परम शांति देने वाले भगवान शिव को नमन।',
        mr: 'मनाला शीतलता व मानसिक शांती प्रदान करणाऱ्या दयाळू महादेवाला वंदन.'
      }
    },
    auspiciousDay: { en: 'Monday (Somwar)', hi: 'सोमवार', mr: 'सोमवार' },
    auspiciousColor: { en: 'Pearl White, Cream, Silver', hi: 'दूधिया सफेद, चांदी', mr: 'पांढरा, मोती व रुपेरी' },
    nameInitials: 'ही, हू, हे, हो, डा, डी, डू, डे, डो',
    personalityTrait: {
      en: 'Deeply emotional, caring, intuitive, devoted to family and protective.',
      hi: 'अत्यंत संवेदनशील, स्नेही, सहृदय और परिवारप्रेमी।',
      mr: 'हृदयाने अत्यंत हळवे, दयाळू, कुटुंबावर निस्सीम प्रेम करणारे व भक्तीभाव.'
    }
  },

  // 5. Leo
  {
    id: 'leo',
    name: { en: 'Leo (Simha)', hi: 'सिंह राशि', mr: 'सिंह रास' },
    symbolIcon: '♌',
    sanskritName: 'सिंह (Simha)',
    element: { en: 'Fire (Agni)', hi: 'अग्नि तत्व', mr: 'अग्नी तत्त्व' },
    rulingPlanet: { en: 'Sun (Surya)', hi: 'सूर्य देव', mr: 'सूर्यनारायण' },
    ishtaDevata: { en: 'Lord Surya & Lord Vishnu', hi: 'भगवान सूर्यनारायण एवं विष्णु', mr: 'भगवान सूर्यनारायण व श्री विष्णू' },
    beejMantra: {
      sanskrit: 'ॐ घृणिः सूर्याय नमः। ॐ नमो नारायणाय॥',
      roman: 'Om Ghrinih Suryaya Namah | Om Namo Narayanaya ||',
      meaning: {
        en: 'Salutations to Surya and Narayana, the supreme source of life, health, glory and radiance.',
        hi: 'जीवन, आरोग्य, तेज और यश के प्रदाता भगवान सूर्यनारायण को नमन।',
        mr: 'आरोग्य, तेज आणि विश्वाला जीवन देणाऱ्या सूर्यनारायणाला नमन.'
      }
    },
    auspiciousDay: { en: 'Sunday (Raviwar)', hi: 'रविवार', mr: 'रविवार' },
    auspiciousColor: { en: 'Golden, Saffron, Bright Orange', hi: 'स्वर्ण, केसरिया', mr: 'सोनेरी व भगवा रंग' },
    nameInitials: 'मा, मी, मू, मे, मो, टा, टी, टू, टे',
    personalityTrait: {
      en: 'Magnanimous, charismatic, bold, generous and high self-respect.',
      hi: 'प्रतापी, उदार, आत्मविश्वासी और प्रभावशाली।',
      mr: 'स्वाभिमानी, तेजस्वी व्यक्तिमत्त्व, दिलदार स्वभाव व समाजप्रिय.'
    }
  },

  // 6. Virgo
  {
    id: 'virgo',
    name: { en: 'Virgo (Kanya)', hi: 'कन्या राशि', mr: 'कन्या रास' },
    symbolIcon: '♍',
    sanskritName: 'कन्या (Kanya)',
    element: { en: 'Earth (Prithvi)', hi: 'पृथ्वी तत्व', mr: 'पृथ्वी तत्त्व' },
    rulingPlanet: { en: 'Mercury (Budha)', hi: 'बुध ग्रह', mr: 'बुध ग्रह' },
    ishtaDevata: { en: 'Lord Vitthal & Mata Gayatri', hi: 'भगवान विट्ठल एवं माँ गायत्री', mr: 'श्री विठू माऊली व गायत्री माता' },
    beejMantra: {
      sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
      roman: 'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat ||',
      meaning: {
        en: 'May the radiant divine illumination purify our intellect and guide us on righteous paths.',
        hi: 'हे दिव्य प्रकाश! हमारी बुद्धि को सत्य और सत्कर्म की ओर प्रेरित करो।',
        mr: 'सद्बुद्धी, पवित्र विचार आणि आत्मिक सामर्थ्य देणाऱ्या गायत्री मंत्राचे ध्यान.'
      }
    },
    auspiciousDay: { en: 'Wednesday (Budhwar)', hi: 'बुधवार', mr: 'बुधवार' },
    auspiciousColor: { en: 'Dark Green, Jade, Parrot Green', hi: 'गहरा हरा', mr: 'गडद हिरवा व पिस्ता रंग' },
    nameInitials: 'टो, पा, पी, पू, ष, ण, ठ, पे, पो',
    personalityTrait: {
      en: 'Analytical, sincere, service-oriented, organized and humble.',
      hi: 'विश्लेषक, कर्तव्यनिष्ठ, व्यवस्थित और सेवाभावी।',
      mr: 'बारीक गोष्टींचे सूक्ष्म निरीक्षण, शिस्तप्रिय, कर्तव्यदक्ष व परोपकारी.'
    }
  },

  // 7. Libra
  {
    id: 'libra',
    name: { en: 'Libra (Tula)', hi: 'तुला राशि', mr: 'तूळ रास' },
    symbolIcon: '♎',
    sanskritName: 'तुला (Tula)',
    element: { en: 'Air (Vayu)', hi: 'वायु तत्व', mr: 'वायू तत्त्व' },
    rulingPlanet: { en: 'Venus (Shukra)', hi: 'शुक्र ग्रह', mr: 'शुक्र ग्रह' },
    ishtaDevata: { en: 'Mata Durga & Mata Mahalakshmi', hi: 'माँ दुर्गा एवं माँ लक्ष्मी', mr: 'आई तुळजाभवानी व दुर्गामाता' },
    beejMantra: {
      sanskrit: 'ॐ जयन्ती मङ्गला काली भद्रकाली कपालिनी। दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥',
      roman: 'Om Jayanti Mangala Kali Bhadrakali Kapalini | Durga Kshama Shiva Dhatri Swaha Swadha Namo-stu Te ||',
      meaning: {
        en: 'Salutations to auspicious Divine Mother Durga, who grants justice, harmony and protects her children.',
        hi: 'कल्याणमयी माँ जगदंबा को नमन, जो जीवन में संतुलन और सुरक्षा देती हैं।',
        mr: 'जीवनात न्याय, संतुलन आणि संकटांपासून संरक्षण देणाऱ्या कुलस्वामिनी भवानी मातेला वंदन.'
      }
    },
    auspiciousDay: { en: 'Friday (Shukrawar)', hi: 'शुक्रवार', mr: 'शुक्रवार' },
    auspiciousColor: { en: 'White, Cream, Sky Blue', hi: 'श्वेत, आसमानी', mr: 'पांढरा, फिकट निळा व चंदेरी' },
    nameInitials: 'रा, री, रू, रे, रो, ता, ती, तू, ते',
    personalityTrait: {
      en: 'Balanced, diplomatic, justice-loving, graceful and peaceful.',
      hi: 'न्यायप्रिय, संतुलित, शान्तिप्रिय और मिलनसार।',
      mr: 'न्यायप्रिय, समतोल विचार, सर्वांशी सलोख्याने वागणारे व रसिक स्वभाव.'
    }
  },

  // 8. Scorpio
  {
    id: 'scorpio',
    name: { en: 'Scorpio (Vrishchika)', hi: 'वृश्चिक राशि', mr: 'वृश्चिक रास' },
    symbolIcon: '♏',
    sanskritName: 'वृश्चिक (Vrishchika)',
    element: { en: 'Water (Jala)', hi: 'जल तत्व', mr: 'जल तत्त्व' },
    rulingPlanet: { en: 'Mars (Mangal)', hi: 'मंगल ग्रह', mr: 'मंगळ ग्रह' },
    ishtaDevata: { en: 'Lord Hanuman & Kalabhairava', hi: 'श्री हनुमान एवं कालभैरव', mr: 'श्री हनुमान व कालभैरव' },
    beejMantra: {
      sanskrit: 'ॐ नमो भगवते आञ्जनेयाय महाबलाय स्वाहा॥',
      roman: 'Om Namo Bhagavate Anjaneyaya Mahabalaya Swaha ||',
      meaning: {
        en: 'Salutations to the supremely powerful Anjaneya, who annihilates negative energies and grants resilience.',
        hi: 'महाबली पवनपुत्र हनुमान को नमन, जो नकारात्मक शक्तियों का नाश करते हैं।',
        mr: 'अतुलनीय पराक्रमी मारुतीरायाला नमन, जे सर्व वाईट शक्तींचा नाश करतात.'
      }
    },
    auspiciousDay: { en: 'Tuesday (Mangalwar)', hi: 'मंगलवार', mr: 'मंगळवार' },
    auspiciousColor: { en: 'Deep Red, Maroon, Ochre', hi: 'गहरा लाल, मैरून', mr: 'गडद लाल व शेंदरी' },
    nameInitials: 'तो, ना, नी, नू, ने, नो, या, यी, यू',
    personalityTrait: {
      en: 'Intense, intuitive, resilient, deeply loyal and spiritually profound.',
      hi: 'दृढ़ निश्चयी, रहस्यदर्शी, साहसी और निष्ठावान।',
      mr: 'अढळ आत्मविश्वास, अंतर्ज्ञान, प्रबळ इच्छाशक्ती व संकटावर मात करण्याची जिद्द.'
    }
  },

  // 9. Sagittarius
  {
    id: 'sagittarius',
    name: { en: 'Sagittarius (Dhanu)', hi: 'धनु राशि', mr: 'धनु रास' },
    symbolIcon: '♐',
    sanskritName: 'धनु (Dhanu)',
    element: { en: 'Fire (Agni)', hi: 'अग्नि तत्व', mr: 'अग्नी तत्त्व' },
    rulingPlanet: { en: 'Jupiter (Brihaspati / Guru)', hi: 'बृहस्पति (गुरु)', mr: 'देवगुरू बृहस्पती' },
    ishtaDevata: { en: 'Lord Rama & Lord Dattatreya', hi: 'प्रभु श्रीराम एवं गुरु दत्तात्रेय', mr: 'प्रभू श्रीराम व श्री दत्तात्रेय' },
    beejMantra: {
      sanskrit: 'ॐ श्रीं रां रामाय नमः। ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
      roman: 'Om Shreem Ram Ramaya Namah | Om Gram Greem Graum Sah Gurave Namah ||',
      meaning: {
        en: 'Salutations to Maryada Purushottam Shri Rama and divine Guru Brihaspati, bestower of wisdom.',
        hi: 'प्रभु श्रीराम और देवगुरु बृहस्पति को नमन, जो ज्ञान और धर्म का मार्ग दिखाते हैं।',
        mr: 'मर्यादा पुरुषोत्तम श्रीराम व गुरुदेव दत्तात्रेयांना नमन, जे ज्ञान व मोक्षाचा मार्ग दाखवतात.'
      }
    },
    auspiciousDay: { en: 'Thursday (Guruwar)', hi: 'गुरुवार', mr: 'गुरुवार' },
    auspiciousColor: { en: 'Yellow, Saffron, Gold', hi: 'पीला, स्वर्णिम', mr: 'पिवळा व सोनेरी रंग' },
    nameInitials: 'ये, यो, भा, भी, भू, धा, फा, ढा, भे',
    personalityTrait: {
      en: 'Optimistic, philosophical, truthful, generous and seeker of higher truth.',
      hi: 'आशावादी, दार्शनिक, सत्यवादी और धार्मिक।',
      mr: 'सत्यप्रिय, आशावादी दृष्टिकोन, परोपकारी, धार्मिक वृत्ती व ज्ञानाची आस.'
    }
  },

  // 10. Capricorn
  {
    id: 'capricorn',
    name: { en: 'Capricorn (Makara)', hi: 'मकर राशि', mr: 'मकर रास' },
    symbolIcon: '♑',
    sanskritName: 'मकर (Makara)',
    element: { en: 'Earth (Prithvi)', hi: 'पृथ्वी तत्व', mr: 'पृथ्वी तत्त्व' },
    rulingPlanet: { en: 'Saturn (Shani)', hi: 'शनि देव', mr: 'शनिदेव महाराज' },
    ishtaDevata: { en: 'Lord Shiva & Shani Dev', hi: 'भगवान शिव एवं शनिदेव', mr: 'भगवान महादेव व शनिदेव' },
    beejMantra: {
      sanskrit: 'ॐ शं शनैश्चराय नमः। ॐ त्र्यम्बकं यजामहे॥',
      roman: 'Om Sham Shanaishcharaya Namah | Om Tryambakam Yajamahe ||',
      meaning: {
        en: 'Salutations to Lord Shani and Three-Eyed Mahadeva, who reward righteous karma and endurance.',
        hi: 'कर्मफलदाता शनिदेव और महाकाल शिव को नमन, जो सत्य निष्ठा का फल देते हैं।',
        mr: 'कर्मफलदाते शनिदेव व महामृत्युंजय शिवाला नमन, जे कष्टाला यश देतात.'
      }
    },
    auspiciousDay: { en: 'Saturday (Shaniwar)', hi: 'शनिवार', mr: 'शनिवार' },
    auspiciousColor: { en: 'Royal Blue, Navy, Dark Grey', hi: 'नीला, श्याम वर्ण', mr: 'गडद निळा व काळा रंग' },
    nameInitials: 'भो, जा, जी, खी, खू, खे, खो, गा, गी',
    personalityTrait: {
      en: 'Disciplined, hardworking, realistic, patient and persistent.',
      hi: 'अनुशासित, कर्मठ, धैर्यवान और व्यावहारिक।',
      mr: 'कठोर परिश्रमी, शिस्तबद्ध, संयमी, जबाबदारीची जाणीव असणारे व विश्वासू.'
    }
  },

  // 11. Aquarius
  {
    id: 'aquarius',
    name: { en: 'Aquarius (Kumbha)', hi: 'कुम्भ राशि', mr: 'कुंभ रास' },
    symbolIcon: '♒',
    sanskritName: 'कुम्भ (Kumbha)',
    element: { en: 'Air (Vayu)', hi: 'वायु तत्व', mr: 'वायू तत्त्व' },
    rulingPlanet: { en: 'Saturn (Shani)', hi: 'शनि देव', mr: 'शनिदेव महाराज' },
    ishtaDevata: { en: 'Lord Hanuman & Lord Shiva', hi: 'श्री हनुमान एवं भोलेनाथ', mr: 'श्री मारुती व भगवान शिव' },
    beejMantra: {
      sanskrit: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
      roman: 'Om Pram Preem Praum Sah Shanaishcharaya Namah ||',
      meaning: {
        en: 'Salutations to the cosmic purifier Saturn, awakening selfless service and spiritual vision.',
        hi: 'कल्याणकारी शनिदेव को नमन, जो निस्वार्थ सेवा और उच्च चेतना प्रदान करते हैं।',
        mr: 'आत्मशुद्धी व समाजसेवेची प्रेरणा देणाऱ्या शनिदेवांना व महादेवाला वंदन.'
      }
    },
    auspiciousDay: { en: 'Saturday (Shaniwar)', hi: 'शनिवार', mr: 'शनिवार' },
    auspiciousColor: { en: 'Electric Blue, Sky Blue, Violet', hi: 'आसमानी, जामुनी', mr: 'आकाशी निळा व जांभळा' },
    nameInitials: 'गू, गे, गो, सा, सी, सू, से, सो, दा',
    personalityTrait: {
      en: 'Visionary, progressive, humanitarian, original and noble-minded.',
      hi: 'दूरदर्शी, परोपकारी, मौलिक और स्वतंत्र विचारक।',
      mr: 'दूरदृष्टी, समाजसुधारक वृत्ती, स्वतंत्र विचारसरणी व विशाल अंतःकरण.'
    }
  },

  // 12. Pisces
  {
    id: 'pisces',
    name: { en: 'Pisces (Meena)', hi: 'मीन राशि', mr: 'मीन रास' },
    symbolIcon: '♓',
    sanskritName: 'मीन (Meena)',
    element: { en: 'Water (Jala)', hi: 'जल तत्व', mr: 'जल तत्त्व' },
    rulingPlanet: { en: 'Jupiter (Brihaspati / Guru)', hi: 'बृहस्पति (गुरु)', mr: 'देवगुरू बृहस्पती' },
    ishtaDevata: { en: 'Lord Vishnu & Swami Samarth', hi: 'भगवान श्रीहरि विष्णु एवं स्वामी समर्थ', mr: 'भगवान विष्णू व स्वामी समर्थ' },
    beejMantra: {
      sanskrit: 'ॐ नमो नारायणाय। ॐ श्री स्वामी समर्थाय नमः॥',
      roman: 'Om Namo Narayanaya | Om Shri Swami Samarthaya Namah ||',
      meaning: {
        en: 'Salutations to Supreme Narayana and Akkalkot Swami Samarth: "Fear not, I am with you."',
        hi: 'परमपिता नारायण एवं अक्कलकोट स्वामी समर्थ को नमन: "भिऊ नकोस, मी तुझ्या पाठीशी आहे।"',
        mr: 'सर्वव्यापी श्री विष्णू व स्वामी समर्थांना नमन: "भिऊ नकोस, मी तुझ्या पाठीशी आहे."'
      }
    },
    auspiciousDay: { en: 'Thursday (Guruwar)', hi: 'गुरुवार', mr: 'गुरुवार' },
    auspiciousColor: { en: 'Golden Yellow, Saffron, Orange', hi: 'पीला, नारंगी', mr: 'हळदी पिवळा व केशरी रंग' },
    nameInitials: 'दी, दू, थ, झ, ञ, दे, दो, चा, ची',
    personalityTrait: {
      en: 'Compassionate, spiritually inclined, imaginative, kind and forgiving.',
      hi: 'करुणामयी, आध्‍यात्मिक, क्षमाशील और परोपकारी।',
      mr: 'असीम करुणा, अध्यात्म व भक्तीची तीव्र ओढ, दयाळू व निःस्वार्थी वृत्ती.'
    }
  }
];

export interface NakshatraInfo {
  number: number;
  id: string;
  name: { en: string; hi: string; mr: string };
  rulingPlanet: string;
  deity: string;
  symbol: string;
  gana: 'देव' | 'मनुष्य' | 'राक्षस';
  nature: { en: string; hi: string; mr: string };
  mantra: string;
}

export const nakshatraDatabase: NakshatraInfo[] = [
  { number: 1, id: 'ashwini', name: { en: 'Ashwini', hi: 'अश्विनी', mr: 'अश्विनी' }, rulingPlanet: 'केतू', deity: 'अश्विनीकुमार (आरोग्य देव)', symbol: 'अश्वाचे मुख 🐴', gana: 'देव', nature: { en: 'Swift, healing, dynamic', hi: 'आरोग्यवर्धक, शीघ्रगामी', mr: 'आरोग्यदायक, वेगवान व उत्साही' }, mantra: 'ॐ अश्विनीकुमाराभ्यां नमः॥' },
  { number: 2, id: 'bharani', name: { en: 'Bharani', hi: 'भरणी', mr: 'भरणी' }, rulingPlanet: 'शुक्र', deity: 'यमराज (धर्मराज)', symbol: 'योनी / त्रिकोण 🔺', gana: 'मनुष्य', nature: { en: 'Transformative, disciplined', hi: 'परिवर्तनशील, दृढसंकल्प', mr: 'परिवर्तनशील, सहनशील व संयमी' }, mantra: 'ॐ यमाय नमः॥' },
  { number: 3, id: 'krittika', name: { en: 'Krittika', hi: 'कृत्तिका', mr: 'कृत्तिका' }, rulingPlanet: 'सूर्य', deity: 'अग्निदेव', symbol: 'ज्वाला / सुरी 🔥', gana: 'राक्षस', nature: { en: 'Fiery, purificatory, radiant', hi: 'तेजस्वी, शुद्धिकारक', mr: 'तेजस्वी, शुद्धिकारक व सत्यनिष्ठ' }, mantra: 'ॐ अग्नये नमः॥' },
  { number: 4, id: 'rohini', name: { en: 'Rohini', hi: 'रोहिणी', mr: 'रोहिणी' }, rulingPlanet: 'चंद्र', deity: 'ब्रह्मदेव (प्रजापती)', symbol: 'रथ / गाडा 🛞', gana: 'मनुष्य', nature: { en: 'Fertile, artistic, charming', hi: 'सौंदर्यवान, कलाप्रेमी', mr: 'सौभाग्यवर्धक, कलाप्रेमी व सृजनशील' }, mantra: 'ॐ ब्रह्मणे नमः॥' },
  { number: 5, id: 'mrigashirsha', name: { en: 'Mrigashirsha', hi: 'मृगशीर्ष', mr: 'मृगशीर्ष' }, rulingPlanet: 'मंगळ', deity: 'चंद्र (सोम)', symbol: 'हरणाचे मस्तक 🦌', gana: 'देव', nature: { en: 'Searching, curious, gentle', hi: 'जिज्ञासु, सौम्य', mr: 'शोधक वृत्ती, जिज्ञासू व शांत' }, mantra: 'ॐ सोमाय नमः॥' },
  { number: 6, id: 'ardra', name: { en: 'Ardra', hi: 'आर्द्रा', mr: 'आर्द्रा' }, rulingPlanet: 'राहू', deity: 'रुद्र (शिव)', symbol: 'अश्रू थेंब / हिरा 💧', gana: 'मनुष्य', nature: { en: 'Intense, emotional cleansing', hi: 'भावनाप्रधान, पराक्रमी', mr: 'पराक्रमी, भावनिक शुद्धता व प्रखर' }, mantra: 'ॐ रुद्राय नमः॥' },
  { number: 7, id: 'punarvasu', name: { en: 'Punarvasu', hi: 'पुनर्वसु', mr: 'पुनर्वसु' }, rulingPlanet: 'गुरु', deity: 'अदिती (देवमाता)', symbol: 'धनुष्य बाण 🏹', gana: 'देव', nature: { en: 'Nurturing, restorative, prosperous', hi: 'पुनरुत्थान, दयाळू', mr: 'पुनरुत्थानात्मक, दयाळू व संपन्न' }, mantra: 'ॐ अदित्यै नमः॥' },
  { number: 8, id: 'pushya', name: { en: 'Pushya (King of Nakshatras)', hi: 'पुष्य (नक्षत्रराज)', mr: 'पुष्य (नक्षत्रराज)' }, rulingPlanet: 'शनि', deity: 'बृहस्पती (देवगुरू)', symbol: 'कमळ / गायीचे कास 🌸', gana: 'देव', nature: { en: 'Supreme auspicious, nourishing', hi: 'महाकल्याणकारी, समृद्धिकारक', mr: 'सर्वोत्तम मंगलकारी, समृद्धी व ज्ञान' }, mantra: 'ॐ बृहस्पतये नमः॥' },
  { number: 9, id: 'ashlesha', name: { en: 'Ashlesha', hi: 'आश्लेषा', mr: 'आश्लेषा' }, rulingPlanet: 'बुध', deity: 'नागदेव / सर्प', symbol: 'गुंडाळलेला सर्प 🐍', gana: 'राक्षस', nature: { en: 'Mystical, intuitive, protective', hi: 'गूढ, कुशाग्र', mr: 'गूढ ज्ञानी, तीक्ष्ण बुद्धी व रक्षक' }, mantra: 'ॐ सर्पेभ्यो नमः॥' },
  { number: 10, id: 'magha', name: { en: 'Magha', hi: 'मघा', mr: 'मघा' }, rulingPlanet: 'केतू', deity: 'पितर (पूर्वज)', symbol: 'राजसिंहासन 👑', gana: 'राक्षस', nature: { en: 'Royal, authoritative, ancestral', hi: 'राजसी, नेतृत्व', mr: 'राजेशाही, पूर्वजांचा आशीर्वाद व नेतृत्व' }, mantra: 'ॐ पितृभ्यो नमः॥' },
  { number: 11, id: 'purvaphalguni', name: { en: 'Purva Phalguni', hi: 'पूर्वा फाल्गुनी', mr: 'पूर्वा फाल्गुनी' }, rulingPlanet: 'शुक्र', deity: 'भग (सौभाग्य देव)', symbol: 'झोपाळा / पलंग 🛋️', gana: 'मनुष्य', nature: { en: 'Joyous, loving, luxurious', hi: 'आनंदमय, रसिक', mr: 'आनंदमय, प्रेमळ व सुखकारक' }, mantra: 'ॐ भगाय नमः॥' },
  { number: 12, id: 'uttaraphalguni', name: { en: 'Uttara Phalguni', hi: 'उत्तरा फाल्गुनी', mr: 'उत्तरा फाल्गुनी' }, rulingPlanet: 'सूर्य', deity: 'अर्यमा (मित्रता देव)', symbol: 'पलंगाचे पाय 🛏️', gana: 'मनुष्य', nature: { en: 'Generous, noble, dependable', hi: 'परोपकारी, सत्यवादी', mr: 'परोपकारी, सत्यवचनी व दिलदार' }, mantra: 'ॐ अर्यम्णे नमः॥' },
  { number: 13, id: 'hasta', name: { en: 'Hasta', hi: 'हस्त', mr: 'हस्त' }, rulingPlanet: 'चंद्र', deity: 'सविता (सूर्यदेव)', symbol: 'उघडा हात / हस्त ✋', gana: 'देव', nature: { en: 'Skillful, healing, crafting', hi: 'शिल्पकार, हस्तकला', mr: 'कौशल्यवान, हस्तकला व सेवाभावी' }, mantra: 'ॐ सवित्रे नमः॥' },
  { number: 14, id: 'chitra', name: { en: 'Chitra', hi: 'चित्रा', mr: 'चित्रा' }, rulingPlanet: 'मंगळ', deity: 'विश्वकर्मा (शिल्प देव)', symbol: 'चमकणारा मोती 🪞', gana: 'राक्षस', nature: { en: 'Brilliant, creative, architect', hi: 'तेजोमय, शिल्पी', mr: 'तेजस्वी, नवनिर्माता व कलात्मक' }, mantra: 'ॐ विश्वकर्मणे नमः॥' },
  { number: 15, id: 'swati', name: { en: 'Swati', hi: 'स्वाती', mr: 'स्वाती' }, rulingPlanet: 'राहू', deity: 'वायूदेव', symbol: 'पावसाचा थेंब / अंकुर 🌱', gana: 'देव', nature: { en: 'Independent, gentle, free', hi: 'स्वतंत्र, सौम्य', mr: 'स्वतंत्र विचार, सौम्य व प्रगतीशील' }, mantra: 'ॐ वायवे नमः॥' },
  { number: 16, id: 'vishakha', name: { en: 'Vishakha', hi: 'विशाखा', mr: 'विशाखा' }, rulingPlanet: 'गुरु', deity: 'इंद्राग्नी', symbol: 'तोरण / विजय कमान 🏛️', gana: 'राक्षस', nature: { en: 'Focused, triumphant, ambitious', hi: 'विजयी, लक्ष्यनिष्ठ', mr: 'लक्ष्यवेधी, विजयी व महत्त्वाकांक्षी' }, mantra: 'ॐ इंद्राग्निभ्यां नमः॥' },
  { number: 17, id: 'anuradha', name: { en: 'Anuradha', hi: 'अनुराधा', mr: 'अनुराधा' }, rulingPlanet: 'शनि', deity: 'मित्र (स्नेह देव)', symbol: 'कमळ 🪷', gana: 'देव', nature: { en: 'Devoted, harmonious, pure', hi: 'भक्तिमय, मैत्रीपूर्ण', mr: 'भक्तिमय, मैत्रीनिष्ठ व मधुर स्वभावी' }, mantra: 'ॐ मित्राय नमः॥' },
  { number: 18, id: 'jyeshtha', name: { en: 'Jyeshtha', hi: 'ज्येष्ठा', mr: 'ज्येष्ठा' }, rulingPlanet: 'बुध', deity: 'इंद्रदेव (सुरेश)', symbol: 'छत्री / कुंडल 🛡️', gana: 'राक्षस', nature: { en: 'Eldest, protector, heroic', hi: 'ज्येष्ठ, संरक्षक', mr: 'ज्येष्ठ, संरक्षक व धैर्यशील' }, mantra: 'ॐ इंद्राय नमः॥' },
  { number: 19, id: 'mula', name: { en: 'Mula', hi: 'मूल', mr: 'मूळ' }, rulingPlanet: 'केतू', deity: 'निरृती (मूळ देवी)', symbol: 'मुळांचा जुडगा 🌿', gana: 'राक्षस', nature: { en: 'Root investigator, penetrating', hi: 'गहन अन्वेषक, दार्शनिक', mr: 'मुळापर्यंत शोध घेणारा, तत्वज्ञानी' }, mantra: 'ॐ निरृतये नमः॥' },
  { number: 20, id: 'purvashadha', name: { en: 'Purvashadha', hi: 'पूर्वाषाढा', mr: 'पूर्वाषाढा' }, rulingPlanet: 'शुक्र', deity: 'आपः (जल देवी)', symbol: 'सूप / हस्तिदंत 🌊', gana: 'मनुष्य', nature: { en: 'Invincible, patient, purifying', hi: 'अपराजित, जलतत्व', mr: 'अपराजित, सहनशील व पवित्र मनाचे' }, mantra: 'ॐ अद्द्भ्यो नमः॥' },
  { number: 21, id: 'uttarashadha', name: { en: 'Uttarashadha', hi: 'उत्तराषाढा', mr: 'उत्तराषाढा' }, rulingPlanet: 'सूर्य', deity: 'विश्वेदेव', symbol: 'हत्तीचा दात 🐘', gana: 'मनुष्य', nature: { en: 'Victory-granting, virtuous', hi: 'धर्मनिष्ठ, अंतिम विजयी', mr: 'धर्मनिष्ठ, अंतिम विजय प्राप्त करणारे' }, mantra: 'ॐ विश्वेभ्यो देवेभ्यो नमः॥' },
  { number: 22, id: 'shravana', name: { en: 'Shravana (Listening)', hi: 'श्रवण', mr: 'श्रवण' }, rulingPlanet: 'चंद्र', deity: 'भगवान विष्णू', symbol: 'कान / ३ पावले 👂', gana: 'देव', nature: { en: 'Wisdom, sacred listener, studious', hi: 'ज्ञानपिपासु, श्रवणभक्ति', mr: 'श्रवणभक्ती, ज्ञानपिपासू व गुरुभक्त' }, mantra: 'ॐ विष्णवे नमः॥' },
  { number: 23, id: 'dhanishtha', name: { en: 'Dhanishtha', hi: 'धनिष्ठा', mr: 'धनिष्ठा' }, rulingPlanet: 'मंगळ', deity: 'अष्ट वसू', symbol: 'मृदंग / बासरी 🥁', gana: 'राक्षस', nature: { en: 'Wealthy, musical, generous', hi: 'समृद्ध, संगीतप्रेमी', mr: 'वैभवशाली, संगीतप्रेमी व उदार' }, mantra: 'ॐ वसुभ्यो नमः॥' },
  { number: 24, id: 'shatabhisha', name: { en: 'Shatabhisha (100 Physicians)', hi: 'शतभिषा', mr: 'शतभिषा' }, rulingPlanet: 'राहू', deity: 'वरुणदेव (जलराशी)', symbol: 'वर्तुळ / १०० तारे ⭕', gana: 'राक्षस', nature: { en: 'Healer, mystical, visionary', hi: 'वैद्य, रहस्यमयी', mr: 'आरोग्यदाता, गुप्त विद्या व दूरदृष्टी' }, mantra: 'ॐ वरुणाय नमः॥' },
  { number: 25, id: 'purvabhadrapada', name: { en: 'Purva Bhadrapada', hi: 'पूर्वाभाद्रपदा', mr: 'पूर्वाभाद्रपदा' }, rulingPlanet: 'गुरु', deity: 'अजैकपाद (रुद्र रूप)', symbol: 'तलवार / खाट ⚔️', gana: 'मनुष्य', nature: { en: 'Fiery ascetic, deeply spiritual', hi: 'तपस्वी, गूढ साधक', mr: 'तपस्वी वृत्ती, प्रखर साधक व परोपकारी' }, mantra: 'ॐ अजैकपदे नमः॥' },
  { number: 26, id: 'uttarabhadrapada', name: { en: 'Uttara Bhadrapada', hi: 'उत्तराभाद्रपदा', mr: 'उत्तराभाद्रपदा' }, rulingPlanet: 'शनि', deity: 'अहिर्बुध्न्य (समुद्र शेषनाग)', symbol: 'दोन तोंड असलेला सर्प 🐍', gana: 'मनुष्य', nature: { en: 'Profound peace, contemplative', hi: 'शांत, ध्यानमग्न', mr: 'शांत चित्त, समाधानी व अंतर्मुख' }, mantra: 'ॐ अहिर्बुध्न्याय नमः॥' },
  { number: 27, id: 'revati', name: { en: 'Revati (Final Bliss)', hi: 'रेवती', mr: 'रेवती' }, rulingPlanet: 'बुध', deity: 'पूषा (पोषणकर्ता देव)', symbol: 'मासा / मृदंग 🐟', gana: 'देव', nature: { en: 'Nourishing, protective, graceful', hi: 'कल्याणकारी, पोषणीय', mr: 'कल्याणकारी, संपूर्णता देणारे व प्रेमळ' }, mantra: 'ॐ पूष्णे नमः॥' },
];

/**
 * Calculates current day's active Nakshatra deterministically
 */
export function getTodaysNakshatra(date: Date = new Date()): NakshatraInfo {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffDays = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  // Moon spends ~1 day per nakshatra in 27.3 day cycle
  const nakshatraIndex = (diffDays * 13 + date.getDate()) % 27;
  return nakshatraDatabase[nakshatraIndex];
}

export interface DailyForecast {
  luckyColor: { en: string; hi: string; mr: string };
  luckyNumber: string;
  remedialMantra: string;
  energyPercent: number;
  spiritualGuidance: { en: string; hi: string; mr: string };
  cautionNotice: { en: string; hi: string; mr: string };
  bestMuhuratTime: string;
}

/**
 * Returns dynamic day-wise astrological forecast for a given Rashi
 */
export function getDailyRashiForecast(rashiId: string, date: Date = new Date()): DailyForecast {
  const dayOfWeek = date.getDay(); // 0-6
  const dateNum = date.getDate();

  const colors = [
    { en: 'Crimson Red & Amber', hi: 'लाल एवं सिंदूरी', mr: 'केशरी व लाल' },
    { en: 'Pure Pearl White & Cream', hi: 'श्वेत एवं दूधिया', mr: 'पांढरा व रुपेरी' },
    { en: 'Emerald Green & Mint', hi: 'हरा एवं धानी', mr: 'हिरवा व पोपटी' },
    { en: 'Golden Yellow & Turmeric', hi: 'पीला एवं सुनहरा', mr: 'हळदी पिवळा व सोनेरी' },
    { en: 'Ocean Blue & Lavender', hi: 'नीला एवं जामुनी', mr: 'आकाशी निळा व जांभळा' },
    { en: 'Copper Saffron & Rose', hi: 'ताम्र एवं गुलाबी', mr: 'गुलाबी व भगवा' },
    { en: 'Silvery Grey & Almond', hi: 'धूसर एवं बादामी', mr: 'बदामी व करडा' },
  ];

  const luckyColor = colors[(dayOfWeek + dateNum) % colors.length];
  const num1 = ((dateNum * 3 + dayOfWeek) % 9) + 1;
  const num2 = ((num1 + 4) % 9) + 1;
  const luckyNumber = `${num1} आणि ${num2}`;
  const energyPercent = 78 + ((dateNum * 7 + dayOfWeek * 5) % 21); // 78% to 98%

  const guidanceMap: Record<string, { en: string; hi: string; mr: string }> = {
    aries: {
      en: 'High vitality today. Excellent for initiating new tasks and chanting Hanuman Chalisa in the morning.',
      hi: 'आज आत्मविश्वास उच्च रहेगा। प्रातः काल हनुमान चालीसा का पाठ करें, कार्यों में सफलता मिलेगी।',
      mr: 'आज आत्मविश्वास व कार्यऊर्जा उत्तम राहील. सकाळी मारुती स्तोत्र किंवा हनुमान चालीसा पठण करा, रखडलेली कामे मार्गी लागतील.',
    },
    taurus: {
      en: 'Favorable for wealth and peace. Light a cow ghee lamp before Mata Mahalakshmi and speak politely.',
      hi: 'आर्थिक स्थिति में शुभता आएगी। महालक्ष्मी के सम्मुख घी का दीप प्रज्वलित करें।',
      mr: 'आर्थिक लाभाचे योग आहेत. महालक्ष्मीसमोर गाईच्या तुपाचा दिवा लावा व कुटुंबात गोड बोला, शांतता नांदेल.',
    },
    gemini: {
      en: 'Sharp intellect today. Chant "Om Gam Ganapataye Namah" 11 times before making business discussions.',
      hi: 'बुद्धि कौशल्य से कार्य सिद्ध होंगे। विघ्नहर्ता गणेश जी का नामस्मरण करें।',
      mr: 'बुद्धी व संवादाचे कौशल्य उत्तम साथ देईल. गणपती बाप्पाला दुर्वा अर्पण करून "ॐ गं गणपतये नमः" चा जप करा.',
    },
    cancer: {
      en: 'Mental peace will flourish. Offer pure water to Shivling and avoid unnecessary overthinking.',
      hi: 'मन में शांति रहेगी। शिवलिंग पर जल अर्पण करें और व्यर्थ चिंताओं से बचें।',
      mr: 'मानसिक शांती लाभेल. महादेवाच्या पिंडीवर जलाभिषेक करा आणि अनाठायी चिंता करणे टाळा.',
    },
    leo: {
      en: 'Respect and leadership will shine. Offer Arghya to Surya Dev with copper vessel at sunrise.',
      hi: 'मान-सम्मान में वृद्धि होगी। प्रातः काल तांबे के लोटे से सूर्य देव को अर्घ्य दें।',
      mr: 'समाजात मान-सन्मान वाढेल. सकाळी तांब्याच्या पात्रातून सूर्यनारायणाला अर्घ्य द्या, तेज व आरोग्य लाभेल.',
    },
    virgo: {
      en: 'Meticulous day. Feed green grass to a cow or chant Vishnu Sahasranama for career breakthroughs.',
      hi: 'कार्यक्षेत्र में उत्तम सफलता। गौमाता को हरा चारा खिलाएं अथवा विष्णु स्मरण करें।',
      mr: 'नियोजनबद्ध कामात मोठे यश मिळेल. गाईला हिरवा चारा द्या किंवा "ॐ नमो भगवते वासुदेवाय" चा जप करा.',
    },
    libra: {
      en: 'Harmony in relationships. Cultivate patience and chant Gayatri Mantra 24 times.',
      hi: 'संबंधों में मधुरता आएगी। धैर्य रखें और २४ बार गायत्री मंत्र का शांत मन से जप करें।',
      mr: 'नात्यांमध्ये सलोखा वाढेल. कोणत्याही वादात पडू नका, २४ वेळा गायत्री मंत्राचा एकाग्रतेने जप करा.',
    },
    scorpio: {
      en: 'Strong spiritual intuition. Chant Mahamrityunjaya Mantra for protection and inner strength.',
      hi: 'आध्यात्मिक अंतर्दृष्टि बढ़ेगी। महामृत्युंजय मंत्र का पाठ संकटों से रक्षा करेगा।',
      mr: 'आध्यात्मिक अनुभूती प्रबळ होईल. महामृत्युंजय मंत्राचा जप करा, नकारात्मक शक्तींपासून संरक्षण मिळेल.',
    },
    sagittarius: {
      en: 'Blessings of elders and gurus. Apply saffron tilak and chant "Om Gurave Namah".',
      hi: 'गुरुजनों और संतों का आशीर्वाद मिलेगा। मस्तक पर केसर चंदन लगाएं।',
      mr: 'गुरूंचे व वडीलधाऱ्यांचे आशीर्वाद मिळतील. कपाळावर केशर-चंदनाचा टिळा लावा व गुरुमंत्राचा जप करा.',
    },
    capricorn: {
      en: 'Hard work will pay dividends. Help the needy and light a sesame oil lamp in evening.',
      hi: 'परिश्रम का उत्तम फल मिलेगा। सांध्य काल में तिल के तेल का दीपक जलाएं।',
      mr: 'कष्टाचे चीज होईल. गरजूंना मदत करा आणि संध्याकाळी पिंपळाजवळ किंवा मारुती मंदिरात तिळाच्या तेलाचा दिवा लावा.',
    },
    aquarius: {
      en: 'New positive ideas. Chanting "Om Sham Shanaishcharaya Namah" brings immense stability.',
      hi: 'नवीन योजनाओं में प्रगति। शनि देव का नामस्मरण मानसिक स्थिरता देगा।',
      mr: 'नवीन कल्पनांना गती मिळेल. शनी देवाच्या बीजमंत्राचा जप करा, विनाकारण होणारी धावपळ शांत होईल.',
    },
    pisces: {
      en: 'Deep divine grace. Recite "Shri Swami Samarth" or Vitthal Naam Smaran for peace and joy.',
      hi: 'ईश्वर कृपा से मन प्रसन्न रहेगा। श्री स्वामी समर्थ अथवा विठ्ठल नाम जपें।',
      mr: 'ईश्वरी कृपेचा वर्षाव होईल. "श्री स्वामी समर्थ जय जय स्वामी समर्थ" किंवा विठूनामाचा गजर करा, मन शांत होईल.',
    },
  };

  const cautionMap: Record<string, { en: string; hi: string; mr: string }> = {
    aries: { en: 'Avoid driving in hurry or reacting in anger.', hi: 'वाहन चलाते समय जल्दबाजी न करें।', mr: 'घाईगडबडीत वाहन चालवणे किंवा रागात निर्णय घेणे टाळा.' },
    taurus: { en: 'Refrain from lending big money to strangers today.', hi: 'उधार लेन-देन से बचें।', mr: 'आज कोणालाही मोठी उसने रक्कम देणे टाळा.' },
    gemini: { en: 'Do not spread hearsay rumors or skip meals.', hi: 'अफवाहों पर ध्यान न दें।', mr: 'ऐकीव गोष्टींवर विश्वास ठेवून वाद घालू नका.' },
    cancer: { en: 'Guard against emotional sensitivity impacting work.', hi: 'भावुक होकर कोई बड़ा निर्णय न लें।', mr: 'अतिभावूक होऊन कोणताही आर्थिक किंवा कौटुंबिक निर्णय घेऊ नका.' },
    leo: { en: 'Keep ego aside when dealing with family members.', hi: 'अहंकार को पारिवारिक संवाद में न आने दें।', mr: 'घरातील ज्येष्ठ व्यक्तींशी बोलताना अहंकार मध्ये येऊ देऊ नका.' },
    virgo: { en: 'Avoid over-analyzing small flaws of teammates.', hi: 'छोटी बातों में अधिक दोष न निकालें।', mr: 'इतरांच्या छोट्या चुकांवर चिडचिड करणे टाळा.' },
    libra: { en: 'Do not compromise your values for temporary pleasing.', hi: 'दूसरों को प्रसन्न करने हेतु मूल्यों से समझौता न करें।', mr: 'कोणाला खूश करण्यासाठी चुकीच्या गोष्टीला होकार देऊ नका.' },
    scorpio: { en: 'Keep secret spiritual practices confidential.', hi: 'अपनी योजनाओं को गुप्त रखें।', mr: 'आपल्या महत्त्वाच्या योजना व साधना कोणाजवळही जाहीर करू नका.' },
    sagittarius: { en: 'Double-check travel itinerary and train timings.', hi: 'यात्रा समय और सामान की पुनः जांच करें।', mr: 'प्रवासाचे नियोजन व सामान दोनदा तपासून घ्या.' },
    capricorn: { en: 'Avoid working late night sacrificing rest.', hi: 'अत्यधिक श्रम से स्वास्थ्य पर ध्यान दें।', mr: 'अति श्रमामुळे आरोग्याकडे दुर्लक्ष करू नका, पुरेशी झोप घ्या.' },
    aquarius: { en: 'Do not procrastinate important legal documents.', hi: 'कागजी कार्यों को कल पर न टालें।', mr: 'सरकारी किंवा कायदेशीर कागदपत्रांचे काम पुढे ढकलू नका.' },
    pisces: { en: 'Stay grounded and avoid daydreaming during work hours.', hi: 'कल्पना लोक से निकलकर यथार्थ पर ध्यान दें।', mr: 'कामाच्या वेळी एकाग्रता ढळू देऊ नका.' },
  };

  const remedialMantras: Record<string, string> = {
    aries: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥ (२१ वेळा)',
    taurus: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥ (२१ वेळा)',
    gemini: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥ (२१ वेळा)',
    cancer: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः॥ (२१ वेळा)',
    leo: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥ (२१ वेळा)',
    virgo: 'ॐ बुं बुधाय नमः। ॐ नमो नारायणाय॥ (२१ वेळा)',
    libra: 'ॐ शुं शुक्राय नमः। ॐ श्रीं महालक्ष्म्यै नमः॥ (२१ वेळा)',
    scorpio: 'ॐ अं अंगारकाय नमः। ॐ हनुमते नमः॥ (२१ वेळा)',
    sagittarius: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥ (२१ वेळा)',
    capricorn: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥ (२१ वेळा)',
    aquarius: 'ॐ शं शनैश्चराय नमः। ॐ नमः शिवाय॥ (२१ वेळा)',
    pisces: 'ॐ बृं बृहस्पतये नमः। ॐ स्वामी समर्थाय नमः॥ (२१ वेळा)',
  };

  return {
    luckyColor,
    luckyNumber,
    remedialMantra: remedialMantras[rashiId] || 'ॐ नमः शिवाय॥',
    energyPercent,
    spiritualGuidance: guidanceMap[rashiId] || guidanceMap.aries,
    cautionNotice: cautionMap[rashiId] || cautionMap.aries,
    bestMuhuratTime: 'सकाळी ०८:३० ते १०:०० (शुभ) अथवा दुपारी १२:१५ ते ०१:४५ (अमृत)',
  };
}

// ----------------- VEDIC JANAM KUNDALI ENGINE -----------------

export interface KundaliInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
}

export interface KundaliHouse {
  houseNumber: number; // 1 to 12
  signName: string; // e.g. मेष
  rulingPlanet: string;
  significance: string;
  planetsHere: string[];
}

export interface KundaliResult {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  lagnaSign: RashiInfo;
  moonSign: RashiInfo;
  nakshatra: NakshatraInfo;
  pada: number;
  gana: 'देव' | 'मनुष्य' | 'राक्षस';
  nadi: 'आद्य' | 'मध्य' | 'अंत्य';
  varna: string;
  auspiciousLetters: string;
  luckyGem: string;
  luckyDay: string;
  luckyColor: string;
  ishtadevata: string;
  houses: KundaliHouse[];
  sadeSatiStatus: {
    isActive: boolean;
    phase: string;
    description: string;
  };
  remedialGuide: {
    gemstoneRecommendation: string;
    dailyPujaAdvice: string;
    fastingDay: string;
  };
}

export function calculateJanamKundali(input: KundaliInput): KundaliResult {
  const dateObj = new Date(input.birthDate || '1995-01-01');
  const [hourStr, minStr] = (input.birthTime || '12:00').split(':');
  const hour = parseInt(hourStr || '12', 10);
  const min = parseInt(minStr || '0', 10);

  // Month & Day calculations for Moon Sign
  const month = dateObj.getMonth(); // 0-11
  const day = dateObj.getDate();

  // Moon sign index roughly shifts ~2.25 days per sign
  const moonIndex = (month + Math.floor(day / 2.5)) % 12;
  const moonSign = rashiDatabase[moonIndex];

  // Ascendant / Lagna rotates 360 deg every 24 hours (1 sign every 2 hours)
  const lagnaIndex = (Math.floor(hour / 2) + month) % 12;
  const lagnaSign = rashiDatabase[lagnaIndex];

  // Nakshatra (27 total, moon stays ~1 day in each)
  const nakshatraIndex = (day * 3 + month * 2) % 27;
  const nakshatra = nakshatraDatabase[nakshatraIndex];
  const pada = (min % 4) + 1;

  // Gana & Nadi
  const gana = nakshatra.gana;
  const nadis: ('आद्य' | 'मध्य' | 'अंत्य')[] = ['आद्य', 'मध्य', 'अंत्य'];
  const nadi = nadis[(nakshatra.number + pada) % 3];

  const varnas = ['ब्राह्मण (ज्ञान)', 'क्षत्रिय (शौर्य)', 'वैश्य (व्यापार)', 'शूद्र (सेवा)'];
  const varna = varnas[(moonIndex + lagnaIndex) % 4];

  // Letters
  const initialsList = moonSign.nameInitials.split(', ');
  const auspiciousLetters = initialsList.slice(0, 4).join(', ');

  // 12 Bhavas setup starting from Lagna
  const houseSignificances = [
    'तनु भाव (शरीर, रूप, व्यक्तिमत्त्व, आरोग्य)',
    'धन भाव (संपत्ती, कुटुंब, वाणी, आर्थिक लाभ)',
    'सहज भाव (भावंडे, धाडस, पराक्रम, संवाद)',
    'सुख भाव (माता, घर, जमीन, वाहन, मानसिक शांती)',
    'सुत भाव (विद्या, बुद्धी, संतान, अध्यात्म)',
    'रिपु भाव (शत्रू, रोग, स्पर्धा, कर्जमुक्ती)',
    'जाया भाव (पती/पत्नी, वैवाहिक सुख, भागीदारी)',
    'मृत्यू भाव (आयुष्य, गूढ ज्ञान, वारसा, परिवर्तन)',
    'धर्म भाव (भाग्य, तीर्थयात्रा, धर्म, उच्च ज्ञान)',
    'कर्म भाव (व्यवसाय, अधिकार, प्रतिष्ठा, पितृसुख)',
    'लाभ भाव (इच्छापूर्ती, मोठा धनलाभ, मित्र परिवार)',
    'व्यय भाव (मोक्ष, परदेश प्रवास, दान, खर्च)'
  ];

  // Deterministically place 9 grahas across 12 houses
  const allPlanets = ['रवि ☀️', 'चंद्र 🌙', 'मंगळ ♂️', 'बुध ☿', 'गुरु ♃', 'शुक्र ♀', 'शनि ♄', 'राहू ☊', 'केतू ☋'];
  const housePlanets: Record<number, string[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
  };

  allPlanets.forEach((p, idx) => {
    const targetHouse = ((idx * 3 + day + hour) % 12) + 1;
    housePlanets[targetHouse].push(p);
  });

  const houses: KundaliHouse[] = [];
  for (let i = 1; i <= 12; i++) {
    const signIndex = (lagnaIndex + i - 1) % 12;
    houses.push({
      houseNumber: i,
      signName: rashiDatabase[signIndex].name.mr,
      rulingPlanet: rashiDatabase[signIndex].rulingPlanet.mr,
      significance: houseSignificances[i - 1],
      planetsHere: housePlanets[i] || []
    });
  }

  // Check Sade Sati status (Shani currently in Kumbha/Meena)
  const isSadeSati = ['capricorn', 'aquarius', 'pisces'].includes(moonSign.id);
  const phase = moonSign.id === 'capricorn' ? 'अंतिम चरण (उतरती साडेसाती)' : moonSign.id === 'aquarius' ? 'मध्य चरण (शिखर साडेसाती)' : moonSign.id === 'pisces' ? 'प्रथम चरण (चढती साडेसाती)' : 'सक्रिय नाही';

  const gems: Record<string, string> = {
    aries: 'पोवळे (Red Coral) - तांब्यात अथवा सोन्यात',
    taurus: 'हिरा (Diamond) अथवा पांढरा ओपल',
    gemini: 'पाचू (Emerald) - करंगळीत चांदीमध्ये',
    cancer: 'मोती (Natural Pearl) - चांदीच्या अंगठीत',
    leo: 'माणिक (Ruby) - सोन्याच्या अंगठीत अनामिकेत',
    virgo: 'पाचू (Emerald) - कास्य किंवा चांदीत',
    libra: 'पांढरा ओपल (Opal) अथवा जरकन',
    scorpio: 'पोवळे (Red Coral) - अनामिकेत मंगळवारी',
    sagittarius: 'पुष्कराज (Yellow Sapphire) - सोन्यात तर्जनीत',
    capricorn: 'नीलम (Blue Sapphire) अथवा अमेथिस्ट',
    aquarius: 'नीलम (Blue Sapphire) किंवा जांभळा खडा',
    pisces: 'पुष्कराज (Yellow Sapphire) - गुरुवारी',
  };

  return {
    name: input.name || 'साधक',
    birthDate: input.birthDate,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace || 'महाराष्ट्र',
    lagnaSign,
    moonSign,
    nakshatra,
    pada,
    gana,
    nadi,
    varna,
    auspiciousLetters,
    luckyGem: gems[lagnaSign.id] || 'पाचू अथवा स्फटिक',
    luckyDay: lagnaSign.auspiciousDay.mr,
    luckyColor: lagnaSign.auspiciousColor.mr,
    ishtadevata: moonSign.ishtaDevata.mr,
    houses,
    sadeSatiStatus: {
      isActive: isSadeSati,
      phase,
      description: isSadeSati
        ? 'सध्या शनिदेवाचा प्रभाव चालू आहे. रोज संध्याकाळी मारुती स्तोत्र व शनि मंत्राचा जप केल्यास सर्व कार्ये सिद्धीस जातील.'
        : 'सध्या साडेसातीचा थेट प्रभाव नाही. शुभ ग्रहांचे अनुकूल फळ मिळेल.'
    },
    remedialGuide: {
      gemstoneRecommendation: `${gems[lagnaSign.id] || 'पोवळे'} धारण केल्याने जीवनशक्ती व आत्मविश्वास वाढेल.`,
      dailyPujaAdvice: `रोज सकाळी ${moonSign.ishtaDevata.mr} यांचे स्मरण करून "${moonSign.beejMantra.sanskrit}" चा २१ वेळा जप करा.`,
      fastingDay: `आठवड्यातील ${moonSign.auspiciousDay.mr} हा वार तुमच्यासाठी सर्वाधिक फलदायी आहे.`
    }
  };
}



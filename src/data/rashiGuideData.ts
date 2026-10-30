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


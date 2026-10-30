import { WorshipStep, MultilingualText } from '../types';

export interface WorshipGuideData {
  dailySteps: WorshipStep[];
  offerings: { name: MultilingualText; purpose: MultilingualText; alternative: MultilingualText }[];
  principles: { title: MultilingualText; description: MultilingualText }[];
}

export const worshipGuideData: WorshipGuideData = {
  dailySteps: [
    {
      step: 1,
      title: {
        en: 'Cleanliness & Purity (Physical & Mental Cleanliness)',
        hi: 'स्वच्छता (शरीर व मन की पवित्रता)',
        mr: 'स्वच्छता (शारीरिक व मानसिक शुचिता)'
      },
      action: {
        en: 'Take a fresh bath or wash your hands, feet, and face with clean water. Wear clean, simple, comfortable clothing.',
        hi: 'स्नान करें अथवा स्वच्छ जल से हाथ, पैर व मुख धोएं। सादे और स्वच्छ वस्त्र धारण करें।',
        mr: 'स्नान करून किंवा स्वच्छ पाण्याने हात-पाय-तोंड धुवून शुचिर्भूत व्हावे. साधे आणि स्वच्छ वस्त्र परिधान करावे.'
      },
      scripturalContext: {
        en: 'External cleanliness prepares the body for quiet, focused mental reflection.',
        hi: 'बाह्य स्वच्छता मन को एकाग्र और शांत करने की पूर्व-तैयारी है।',
        mr: 'शारीरिक स्वच्छता मनाला एकाग्र आणि शांत करण्यासाठी आवश्यक आहे.'
      }
    },
    {
      step: 2,
      title: {
        en: 'Asana (Dedicated Sacred Space)',
        hi: 'आसन (पवित्र स्थान निर्धारण)',
        mr: 'आसन (शांत व पवित्र जागेची निवड)'
      },
      action: {
        en: 'Sit in a quiet space facing East (symbol of illumination) or North. Use a clean cloth or woolen mat (Asana).',
        hi: 'पूर्व अथवा उत्तर दिशा की ओर मुख करके एक स्वच्छ आसन पर बैठें।',
        mr: 'पूर्व किंवा उत्तर दिशेकडे तोंड करून स्वच्छ आसनावर बसावे.'
      },
      scripturalContext: {
        en: 'Sitting on an elevated mat prevents ground cold from distracting the nervous system during meditation.',
        hi: 'आसन पृथ्वी की ऊर्जा को संतुलित रख ध्यान में स्थिरता लाता है।',
        mr: 'आसनामुळे शरीराला स्थिरता लाभते आणि ध्यानात मन रमत.'
      }
    },
    {
      step: 3,
      title: {
        en: 'Deepa & Dhoop (Lighting the Lamp)',
        hi: 'दीप प्रज्वलन एवं धूप',
        mr: 'दीप प्रज्वलन आणि धूप'
      },
      action: {
        en: 'Light a traditional oil or ghee lamp. Oil of sesame (Til) or mustard is traditionally favored in Hanuman worship.',
        hi: 'तिल के तेल अथवा गाय के शुद्ध घी का दीपक जलाएं और सुगंधित धूप अर्पित करें।',
        mr: 'तिळाच्या तेलाचा किंवा गाईच्या तुपाचा दिवा लावावा आणि सात्त्विक अगरबत्ती किंवा धूप दाखवावा.'
      },
      scripturalContext: {
        en: 'The flame signifies dispelling ignorance and awakening inner knowledge.',
        hi: 'दीपक अज्ञान के अंधकार को दूर कर अंतःकरण में ज्ञान का प्रकाश जगाता है।',
        mr: 'दिवा म्हणजे अज्ञानाचा अंधकार दूर करून अंतरात ज्ञानाचा प्रकाश चेतवणारे प्रतीक.'
      }
    },
    {
      step: 4,
      title: {
        en: 'Sri Rama Smarana (Remembering Rama First)',
        hi: 'श्रीराम स्मरण (सर्वप्रथम राम नाम)',
        mr: 'श्रीराम स्मरण (प्रथम श्रीराम नाम)'
      },
      action: {
        en: 'Recite "Jai Shri Ram" or "Shri Ram Jai Ram Jai Jai Ram" 3 to 11 times. Tradition teaches that Hanuman is most delighted when Rama is remembered.',
        hi: 'हनुमान जी की पूजा से पूर्व कम से कम ३ बार "जय श्रीराम" या "श्रीराम जय राम जय जय राम" का उच्चारण करें।',
        mr: 'मारुती पूजेच्या सुरुवातीला किमान ३ वेळा "जय श्रीराम" किंवा "श्रीराम जय राम जय जय राम" असा नामघोष करावा. कारण हनुमंताला श्रीरामांचे नाव अत्यंत प्रिय आहे.'
      },
      scripturalContext: {
        en: 'Hanuman\'s entire consciousness is dissolved in Rama; honoring his beloved master connects you directly with his grace.',
        hi: 'हनुमान जी का हृदय श्रीराम नाम में ही बसता है, अतः राम स्मरण से वे सहज ही प्रसन्न होते हैं।',
        mr: 'हनुमंतांचे हृदय अखंड रामाच्या भक्तीत रंगलेले असते, त्यामुळे रामनामामुळे हनुमंत त्वरित पाठीशी उभे राहतात.'
      }
    },
    {
      step: 5,
      title: {
        en: 'Naivedya (Simple Sincere Offering)',
        hi: 'नैवेद्य (सादा एवं सात्त्विक भोग)',
        mr: 'नैवेद्य (साधा व सात्त्विक प्रसाद)'
      },
      action: {
        en: 'Offer simple satvik food: jaggery and roasted chickpeas (Gud-Chana), bananas, soaked dates, or pure fresh water.',
        hi: 'गुड़ और भुने चने, केला, तुलसी पत्र अथवा केवल निर्मल जल का सात्विक भोग लगाएं।',
        mr: 'गूळ-फुटाणे, केळी, पेढे किंवा केवळ ताजे शुद्ध पाणी नैवेद्य म्हणून भावपूर्वक अर्पण करावे.'
      },
      scripturalContext: {
        en: 'Bhakti is measured by the purity of the heart, never by the cost of the offering.',
        hi: 'भगवान केवल श्रद्धा और प्रेम के भूखे हैं, किसी भव्य आडंबर के नहीं।',
        mr: 'भगवंतांना बाह्य डामडौलापेक्षा अंतःकरणातील शुद्ध प्रेम आणि भाव प्रिय असतो.'
      }
    },
    {
      step: 6,
      title: {
        en: 'Japa & Patha (Chanting & Reading)',
        hi: 'जप एवं पाठ (चालीसा अथवा मन्त्र)',
        mr: 'जप व पठण (चालीसा किंवा मंत्र)'
      },
      action: {
        en: 'Read the Hanuman Chalisa or chant "Om Hanumate Namah" with mindful repetition (11, 21, or 108 counts using the digital mala).',
        hi: 'शांत मन से हनुमान चालीसा का पाठ करें अथवा "ॐ हनुमते नमः" का ११, २१ या १०८ बार जप करें।',
        mr: 'शांत चित्ताने हनुमान चालीसेचे पठण करावे किंवा "ॐ हनुमते नमः" मंत्राचा ११, २१ अथवा १०८ वेळा जप करावा.'
      },
      scripturalContext: {
        en: 'Sound vibrations (Spanda) align the breath, steady heart variability, and cultivate mental resilience.',
        hi: 'मन्त्रों का पावन नाद श्वास को नियंत्रित कर मन को निर्भयता प्रदान करता है।',
        mr: 'मंत्रांच्या उच्चारणामुळे श्वास शांत होतो, मन स्थिर होते आणि आत्मिक धैर्य वाढते.'
      }
    },
    {
      step: 7,
      title: {
        en: 'Samarpan & Prarthana (Concluding Prayer)',
        hi: 'समर्पण एवं प्रार्थना',
        mr: 'समर्पण व प्रार्थना'
      },
      action: {
        en: 'Bow with folded hands. Pray: "May I be granted the strength to act righteously, speak truth, protect the weak, and remain humble."',
        hi: 'हाथ जोड़कर प्रार्थना करें: "हे पवनसुत! मुझे सत्य मार्ग पर चलने का बल, विवेक और विनम्रता प्रदान कीजिए।"',
        mr: 'हात जोडून लीन होऊन प्रार्थना करावी: "हे मारुतीराया! मला सत्य आणि न्यायाच्या मार्गावर चालण्याचे बळ, सुबुद्धी आणि नम्रता द्या."'
      },
      scripturalContext: {
        en: 'True devotion culminates in moral strength and compassionate service to living beings (Nishkama Seva).',
        hi: 'सच्ची भक्ति का अंतिम लक्ष्य सेवा भाव और नैतिक आचरण की शक्ति प्राप्त करना है।',
        mr: 'खऱ्या भक्तीचे अंतिम फळ म्हणजे परोपकार, चारित्र्य आणि समाजाची निष्काम सेवा करण्याची वृत्ती.'
      }
    }
  ],
  offerings: [
    {
      name: { en: 'Jaggery & Roasted Chana', hi: 'गुड़ और भुने चने', mr: 'गूळ आणि भाजलेले फुटाणे' },
      purpose: {
        en: 'The traditional simple nourishment offered to Hanuman across rural and urban India.',
        hi: 'भारत भर में हनुमान जी को अत्यंत प्रिय पारंपरिक और पौष्टिक भोग।',
        mr: 'भारतभरात मारुतीरायांना अर्पण केला जाणारा पारंपरिक, आरोग्यदायी आणि अत्यंत सात्त्विक नैवेद्य.'
      },
      alternative: { en: 'Any fresh fruit (especially banana) or dry dates', hi: 'केला अथवा सूखे खजूर', mr: 'केळी किंवा खारीक' }
    },
    {
      name: { en: 'Sindoor (Vermilion paste with Jasmine/Til oil)', hi: 'सिंदूर व चमेली का तेल', mr: 'शेंदूर आणि तिळाचे तेल' },
      purpose: {
        en: 'Symbolizes total surrender and devotion, originating from the story of Hanuman applying sindoor all over his body for Rama\'s long life.',
        hi: 'माता सीता को मांग में सिंदूर लगाते देख, राम जी के कल्याण हेतु संपूर्ण देह पर सिंदूर लेपन का प्रतीक।',
        mr: 'सीतामाईंना भांगात शेंदूर भरताना पाहून प्रभू श्रीरामांच्या दीर्घायुष्यासाठी स्वतःच्या संपूर्ण देहाला शेंदूर फासल्याची भक्तीकथा.'
      },
      alternative: { en: 'Pure sandal paste (Chandan) applied on the forehead', hi: 'मस्तक पर चंदन का तिलक', mr: 'कपाळावर चंदनाचा टिळा' }
    },
    {
      name: { en: 'Betel Leaves (Paan / Vida)', hi: 'पान का बीड़ा', mr: 'नागवेलीच्या पानांचा विडा' },
      purpose: {
        en: 'Signifies taking a solemn vow (Bida uthana) to carry out a noble moral duty without wavering.',
        hi: 'धर्म और कर्तव्य के मार्ग पर अडिग रहने के संकल्प का प्रतीक।',
        mr: 'कर्तव्याच्या आणि सत्याच्या मार्गावर ठाम राहण्याच्या प्रतिज्ञेचे प्रतीक.'
      },
      alternative: { en: 'Clean Tulsi leaf offered with folded hands', hi: 'तुलसी दल', mr: 'तुळशीचे पान' }
    }
  ],
  principles: [
    {
      title: {
        en: 'Devotion is Character, Not a Business Transaction',
        hi: 'भक्ति अंतःकरण का समर्पण है, कोई व्यापार नहीं',
        mr: 'भक्ती म्हणजे आत्मिक समर्पण, कोणताही व्यवहार नव्हे'
      },
      description: {
        en: 'Traditional worship is meant to strengthen moral courage, discipline, and emotional equilibrium. It does not replace honest hard work, medical care, or practical wisdom.',
        hi: 'प्रामाणिक पूजा मन को धैर्य, शुचिता और सद्बुद्धि देती है। यह कर्म और परिश्रम का विकल्प नहीं, अपितु कर्म करने की शक्ति का स्रोत है।',
        mr: 'पूजाअर्चा ही मनाला धैर्य, विवेक आणि संयम मिळवून देण्यासाठी असते. ती प्रत्यक्ष प्रयत्न, अभ्यास किंवा कष्टांची जागा घेत नाही, तर कष्ट करण्याचे बळ देते.'
      }
    },
    {
      title: {
        en: 'Simplicity Transcends Ritual Ostentation',
        hi: 'आडंबर से कहीं श्रेष्ठ है सादगी और प्रेम',
        mr: 'डामडौलापेक्षा साधेपणा आणि शुद्ध भाव श्रेष्ठ'
      },
      description: {
        en: 'A single cup of clean water and a sincere prayer uttered with mindful devotion is vastly superior to expensive, elaborate rituals performed with ego.',
        hi: 'अहंकार से किए गए बहुमूल्य अनुष्ठानों की तुलना में सच्चे हृदय से अर्पित एक घूंट जल भी ईश्वर को अधिक प्रिय है।',
        mr: 'अहंकाराने केलेल्या महागड्या विधींपेक्षा निर्मळ अंतःकरणाने अर्पण केलेले एक तुळशीपत्र देवाला अधिक प्रिय असते.'
      }
    }
  ]
};


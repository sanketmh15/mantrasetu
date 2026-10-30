export interface VratProcedure {
  id: string;
  name: { en: string; hi: string; mr: string };
  presidingDeity: { en: string; hi: string; mr: string };
  frequency: { en: string; hi: string; mr: string };
  variations: {
    title: { en: string; hi: string; mr: string };
    desc: { en: string; hi: string; mr: string };
  }[];
  sankalpaMantra: {
    sanskrit: string;
    transliteration: string;
    meaning: { en: string; hi: string; mr: string };
  };
  fastingRules: {
    diet: { en: string; hi: string; mr: string };
    disciplines: { en: string; hi: string; mr: string }[];
  };
  paranaRules: {
    timing: { en: string; hi: string; mr: string };
    procedure: { en: string; hi: string; mr: string };
    breakingFood: { en: string; hi: string; mr: string };
  };
  benefits: { en: string; hi: string; mr: string };
}

export const vratProceduresDatabase: VratProcedure[] = [
  // 1. Ekadashi Vrat (एकादशी महाव्रत)
  {
    id: 'ekadashi',
    name: {
      en: 'Ekadashi Mahavrat (All 24 Ekadashis)',
      hi: 'एकादशी महाव्रत (सम्पूर्ण २४ एकादशी)',
      mr: 'एकादशी महाव्रत (आषाढी, कार्तिकी व २४ एकादशी)'
    },
    presidingDeity: {
      en: 'Lord Vishnu / Shri Vitthal',
      hi: 'भगवान श्री विष्णु / विट्ठल',
      mr: 'भगवान श्रीविष्णू / विठू माऊली'
    },
    frequency: {
      en: 'Twice a month (Shukla & Krishna 11th Tithi)',
      hi: 'माह में दो बार (शुक्ल एवं कृष्ण एकादशी)',
      mr: 'महिन्यातून दोनदा (शुक्ल व कृष्ण पक्षातील ११ वी तिथी)'
    },
    variations: [
      {
        title: { en: 'Nirjala (Waterless Fast)', hi: 'निर्जला व्रत', mr: 'निर्जला उपवास (विनापाणी)' },
        desc: {
          en: 'Highest spiritual austerity: No food or water consumed from sunrise to next morning sunrise. Strictly observed on Nirjala Jyeshtha Ekadashi.',
          hi: 'सूर्योदय से अगले सूर्योदय तक जल की एक बूंद भी ग्रहण नहीं की जाती। ज्येष्ठ शुक्ल निर्जला एकादशी पर विशेष।',
          mr: 'सूर्योदयापासून दुसऱ्या दिवसाच्या सूर्योदयापर्यंत अन्न व पाण्याचा थेंबही न घेता केला जाणारा कडक उपवास. ज्येष्ठ निर्जला एकादशीला विशेष महत्त्व.'
        }
      },
      {
        title: { en: 'Sajala / Phalahari (Fruit & Milk)', hi: 'फलाहारी व्रत', mr: 'फलाहारी व दुग्धाहारी उपवास' },
        desc: {
          en: 'Most common variation: Water, milk, fresh fruits, nuts, and satvik Bhagar (Samo rice) or Sabudana.',
          hi: 'दूध, फल, मेवे और सात्विक भगर अथवा साबूदाना खिचड़ी का एक समय सेवन।',
          mr: 'पाणी, दूध, फळे, सुकामेवा आणि दुपारी सात्विक भगर-आमटी किंवा साबुदाणा घेऊन केला जाणारा उपवास.'
        }
      }
    ],
    sankalpaMantra: {
      sanskrit: 'मम सर्वपापक्षयपूर्वक श्रीविष्णुप्रीत्यर्थम् एकादशीव्रतं करिष्ये। अद्य निराहारो भूत्वा श्वो भोक्ष्येऽच्युत संनिधौ॥',
      transliteration: 'Mama sarvapāpakṣayapūrvaka śrīviṣṇuprītyartham ekādaśīvrataṁ kariṣye. Adya nirāhāro bhūtvā śvo bhokṣye\'cyuta saṁnidhau.',
      meaning: {
        en: 'I resolve to observe this holy Ekadashi fast to wash away all negative sins and please Lord Vishnu. Remaining fasting today, I shall partake food tomorrow in the divine presence of Achyuta.',
        hi: 'समस्त पापों के नाश एवं श्रीविष्णु की प्रसन्नता हेतु मैं एकादशी व्रत का संकल्प करता हूँ। आज निराहार रहकर कल भगवान के सान्निध्य में भोजन ग्रहण करूँगा।',
        mr: 'माझ्या सर्व पापांचा क्षय होऊन भगवान विष्णूंची कृपा लाभावी यासाठी मी हे एकादशी व्रत करत आहे. आज निराहार राहून उद्या प्रभूच्या चरणी उपवास सोडेन.'
      }
    },
    fastingRules: {
      diet: {
        en: 'Strictly avoid all grains, rice, wheat, corn, lentils, beans, onions, and garlic.',
        hi: 'सभी अनाज, चावल, गेहूं, दालें, प्याज और लहसुन पूर्णतः वर्जित हैं।',
        mr: 'तांदूळ (भात), गहू, ज्वारी, बाजरी, सर्व डाळी व कडधान्ये, कांदा-लसूण पूर्णपणे वर्ज्य आहेत.'
      },
      disciplines: [
        { en: 'Avoid sleep during day hours and practice Vishnu Sahasranama chanting.', hi: 'दिन में शयन न करें और विष्णु सहस्रनाम का पाठ करें।', mr: 'दुपारी झोपू नये आणि विष्णू सहस्रनाम किंवा तुकाराम गाथा वाचन करावे.' },
        { en: 'Maintain inner mental silence, truthful speech, and avoid anger.', hi: 'मौन, सत्य वचन और क्रोध से मुक्ति रखें।', mr: 'मनात शांतता, सत्य भाषण व कोणावरही राग न करता नामस्मरण ठेवावे.' }
      ]
    },
    paranaRules: {
      timing: {
        en: 'Must be broken on Dwadashi tithi before Harivasara concludes (strictly within morning muhurat).',
        hi: 'द्वादशी के दिन सूर्योदय के उपरांत हरिवासर समाप्त होने से पूर्व।',
        mr: 'द्वादशी तिथी संपण्यापूर्वी व सूर्योदयानंतर योग्य मुहूर्तावर (हरिवासर संपल्यावर).'
      },
      procedure: {
        en: 'Take a morning bath, offer Tulsi water to Lord Vishnu, and break fast after feeding a cow or offering dakshina.',
        hi: 'स्नान कर भगवान विष्णु को भोग लगाएं, गौ माता को भोजन देकर व्रत खोलें।',
        mr: 'स्नान करून विष्णूला दुधाचा/खिरीचा नैवेद्य दाखवावा, गाईला घास द्यावा आणि त्यानंतर पारणा करावी.'
      },
      breakingFood: {
        en: 'Fresh milk, soaked raisins, boiled rice, and simple satvik dal.',
        hi: 'कच्चा दूध, भीगी किशमिश, सादा भात और मूंग दाल।',
        mr: 'दूध, खजूर, पोहे किंवा सात्त्विक वरण-भात.'
      }
    },
    benefits: {
      en: 'Cleanses toxins from gut and cells, balances metabolism, and leads to ultimate spiritual emancipation.',
      hi: 'शारीरिक शोधन, मानसिक शांति और आध्यात्मिक उन्नति।',
      mr: 'पचनसंस्थेचे संपूर्ण शुद्धीकरण, मनाची एकाग्रता व मोक्षाची प्राप्ती.'
    }
  },

  // 2. Pradosh Vrat (प्रदोष व्रत)
  {
    id: 'pradosh',
    name: {
      en: 'Pradosh Vrat (Shiva Sandhya Vrat)',
      hi: 'प्रदोष व्रत (त्रयोदशी शिव साधना)',
      mr: 'प्रदोष व्रत (त्रयोदशी संध्याकाळ शिव उपासना)'
    },
    presidingDeity: {
      en: 'Lord Shiva & Mata Parvati',
      hi: 'भगवान शिव एवं माता पार्वती',
      mr: 'भगवान महादेव व माता पार्वती'
    },
    frequency: {
      en: 'Twice a month (Trayodashi Tithi at twilight)',
      hi: 'माह में दो बार (शुक्ल व कृष्ण त्रयोदशी)',
      mr: 'महिन्यातून दोनदा (शुक्ल व कृष्ण त्रयोदशीच्या संध्याकाळी)'
    },
    variations: [
      {
        title: { en: 'Som Pradosh (Monday)', hi: 'सोम प्रदोष', mr: 'सोम प्रदोष (सोमवारी येणारा)' },
        desc: {
          en: 'Auspicious for peace of mind, removing mental depression, and fulfilling heartfelt desires.',
          hi: 'मानसिक शांति, चंद्र दोष निवारण और मनोकामना पूर्ति हेतु अत्यंत फलदायी।',
          mr: 'मानसिक शांतता, आरोग्याची प्राप्ती व मनातील शुभ इच्छा पूर्ण होण्यासाठी अत्यंत फलदायी.'
        }
      },
      {
        title: { en: 'Bhauma / Mangal Pradosh (Tuesday)', hi: 'भौम प्रदोष', mr: 'भौम प्रदोष (मंगळवारी येणारा)' },
        desc: {
          en: 'Removes financial debts, legal disputes, and physical health ailments.',
          hi: 'कर्ज मुक्ति, मुकदमों में विजय और स्वास्थ्य लाभ हेतु सर्वोत्तम।',
          mr: 'कर्जमुक्ती, जमिनीचे वाद मिटणे आणि शारीरिक रोगांतून मुक्तीसाठी सर्वोत्तम.'
        }
      },
      {
        title: { en: 'Shani Pradosh (Saturday)', hi: 'शनि प्रदोष', mr: 'शनि प्रदोष (शनिवारी येणारा)' },
        desc: {
          en: 'Alleviates Saturn Sade Sati distress, chronic obstacles, and child-related prayers.',
          hi: 'शनि की साढ़ेसाती के कष्टों से मुक्ति एवं संतान सुख हेतु।',
          mr: 'शनिच्या साडेसातीचा त्रास कमी होण्यासाठी व संतती सौख्यासाठी पावन मानला जातो.'
        }
      }
    ],
    sankalpaMantra: {
      sanskrit: 'संसारभयनाशाय सर्वपापहराय च। त्रयोदश्यां प्रदोषे तु शिवपूजां करोम्यहम्॥',
      transliteration: 'Saṁsārabhayanāśāya sarvapāpaharāya ca. Trayodaśyāṁ pradoṣe tu śivapūjāṁ karomyaham.',
      meaning: {
        en: 'To destroy the fears of worldly existence and eradicate all accumulated sins, I perform this Shiva worship on Trayodashi Pradosh.',
        hi: 'संसार के भय से मुक्ति और समस्त पापों के नाश के लिए मैं त्रयोदशी के प्रदोष काल में भगवान शिव की पूजा करता हूँ।',
        mr: 'संसारातील सर्व भीती व संकटांचा नाश होण्यासाठी आणि पापांच्या मुक्तीसाठी मी त्रयोदशीला प्रदोष काळात महादेवाची पूजा करतो.'
      }
    },
    fastingRules: {
      diet: {
        en: 'Observe fast from sunrise until evening Pradosh time (45 mins before and after sunset). Take single meal after Shiva aarti.',
        hi: 'सूर्योदय से प्रदोष काल तक उपवास रखें। संध्या पूजा के पश्चात सात्विक फलाहार ग्रहण करें।',
        mr: 'सूर्योदयापासून संध्याकाळच्या सूर्यास्तापर्यंत उपवास ठेवावा. संध्याकाळी महादेवाची पूजा व अभिषेक झाल्यावरच फलाहार घ्यावा.'
      },
      disciplines: [
        { en: 'Bathe before sunset and wear clean white or saffron clothes for Shiva Puja.', hi: 'सूर्यास्त पूर्व स्नान कर श्वेत वस्त्र धारण करें।', mr: 'सूर्यास्तापूर्वी स्नान करून धुतलेले स्वच्छ पांढरे वस्त्र परिधान करावे.' }
      ]
    },
    paranaRules: {
      timing: {
        en: 'Immediately after the Pradosh evening Shiva puja and aarti conclude (around 7:30 PM).',
        hi: 'संध्याकालीन शिव पूजा एवं आरती के तुरंत उपरांत।',
        mr: 'संध्याकाळी महादेवाची आरती व अभिषेक पूर्ण झाल्यावर (साधारण संध्याकाळी ७:३० वाजता).'
      },
      procedure: {
        en: 'Offer milk and Bilva leaf to Shivling, take charanamrit, and consume light satvik food.',
        hi: 'शिवलिंग पर दूध-बेलपत्र अर्पित कर चरणामृत लें और सात्विक आहार लें।',
        mr: 'शिवलिंगाचे तीर्थ व पंचामृत प्राशन करून हलका फलाहार करावा.'
      },
      breakingFood: {
        en: 'Warm milk, fruits, makhana, or rock-salt sabudana/bhagar.',
        hi: 'दूध, फल, मखाना अथवा सेंधा नमक युक्त सात्विक भोजन।',
        mr: 'गरम दूध, ताजी फळे, मखाना किंवा सेंधव मिठातील भगर.'
      }
    },
    benefits: {
      en: 'Destroys fear of premature death, bestows family harmony, peace, and health.',
      hi: 'अकाल मृत्यु के भय से मुक्ति, दांपत्य सुख और आरोग्य लाभ।',
      mr: 'अकाल मृत्यूच्या भीतीचे निवारण, कुटुंबात सुसंवाद आणि उत्तम आरोग्य लाभते.'
    }
  },

  // 3. Sankashti Chaturthi (संकष्टी चतुर्थी)
  {
    id: 'sankashti',
    name: {
      en: 'Sankashti Chaturthi Vrat (Obstacle Removal)',
      hi: 'संकष्टी चतुर्थी व्रत (विघ्न विनाशक व्रत)',
      mr: 'संकष्टी चतुर्थी व्रत (संकटमोचन गणेश उपासना)'
    },
    presidingDeity: {
      en: 'Lord Ganesha (Vighnaharta)',
      hi: 'भगवान श्री गणेश',
      mr: 'श्री गणेश (विघ्नहर्ता बाप्पा)'
    },
    frequency: {
      en: 'Monthly (Krishna Paksha 4th Tithi, up to Moonrise)',
      hi: 'माह में एक बार (कृष्ण पक्ष चतुर्थी - चंद्रोदय तक)',
      mr: 'प्रत्येक महिन्याच्या वद्य (कृष्ण) चतुर्थीला (चंद्रोदयापर्यंत)'
    },
    variations: [
      {
        title: { en: 'Angaraki Sankashti (Falling on Tuesday)', hi: 'अंगारकी संकष्टी', mr: 'अंगारकी संकष्टी चतुर्थी (मंगळवारी येणारी)' },
        desc: {
          en: 'Extremely powerful: Equal to performing all 21 Sankashti fasts throughout the year. Dedicated to Angarak (Mars) blessing.',
          hi: 'वर्ष भर के २१ संकष्टी व्रतों का फल अकेले प्रदान करने वाला परम पावन व्रत।',
          mr: 'वर्षातील सर्व २१ संकष्टींचे पुण्य एकट्या अंगारकीने मिळते. मंगळ ग्रहाचे दोष दूर होऊन सर्व संकटांचे निवारण होते.'
        }
      }
    ],
    sankalpaMantra: {
      sanskrit: 'गणेशपूजनं कृत्वा संकष्टहरणाय च। चंद्रोदये प्रदास्यामि अर्घ्यं विघ्नविनाशकम्॥',
      transliteration: 'Gaṇeśapūjanaṁ kṛtvā saṅkaṣṭaharaṇāya ca. Candrodaye pradāsyāmi arghyaṁ vighnavināśakam.',
      meaning: {
        en: 'Having worshipped Lord Ganesha for removal of troubles, I shall offer holy water arghya to the rising moon tonight.',
        hi: 'संकटों के निवारण हेतु श्री गणेश की पूजा कर, मैं चंद्रोदय के समय पवित्र अर्घ्य अर्पित करूँगा।',
        mr: 'माझ्या आयुष्यातील संकटांचा नाश होण्यासाठी गणेशाची पूजा करून, रात्री चंद्रोदयानंतर चंद्राला अर्घ्य देऊन उपवास सोडेन.'
      }
    },
    fastingRules: {
      diet: {
        en: 'Strict fasting until moonrise. Only water and milk allowed during day; food taken only after sighting the moon and offering arghya.',
        hi: 'चंद्रोदय तक उपवास। चंद्र दर्शन और अर्घ्य के बाद ही भोजन ग्रहण करें।',
        mr: 'चंद्रोदयापर्यंत कडक उपवास. रात्री चंद्र दिसल्यावर चंद्राला व गणपतीला दुर्वा-अक्षतांचे अर्घ्य देऊनच भोजन घ्यावे.'
      },
      disciplines: [
        { en: 'Recite Sankat Nashan Ganesha Stotra 11 times.', hi: 'संकटनाशन गणेश स्तोत्र का ११ बार पाठ करें।', mr: 'संकटनाशन गणेश स्तोत्राचे ११ वेळा मनोभावे पठण करावे.' }
      ]
    },
    paranaRules: {
      timing: {
        en: 'Strictly at the exact local moonrise time (check app calendar for daily city-wise moonrise).',
        hi: 'स्थानीय चंद्रोदय के सही समय पर।',
        mr: 'कॅलेंडरमध्ये दिलेल्या त्या त्या दिवसाच्या अचूक चंद्रोदयाच्या वेळी.'
      },
      procedure: {
        en: 'Offer water, raw rice (akshata), and chandan to the Moon. Perform Ganesha aarti, offer Modak, then partake dinner.',
        hi: 'चंद्रमा को जल, अक्षत और चंदन का अर्घ्य दें; गणपति आरती के बाद मोदक का भोग लगाकर पारणा करें।',
        mr: 'तांब्यात पाणी, दुर्वा व गंध घेऊन चंद्राला तीनदा अर्घ्य द्यावे, बाप्पाला मोदकांचा नैवेद्य दाखवून मगच भोजन करावे.'
      },
      breakingFood: {
        en: 'Modak, pure vegetarian satvik dinner without onion and garlic.',
        hi: 'मोदक और बिना प्याज-लहसुन का शुद्ध सात्विक भोजन।',
        mr: 'उकडीचे किंवा तळणीचे मोदक, वरण-भात व सात्त्विक जेवण.'
      }
    },
    benefits: {
      en: 'Relieves from acute mental anxiety, court cases, education bottlenecks, and career impediments.',
      hi: 'सभी विघ्नों का अंत, मानसिक तनाव से मुक्ति और कार्यों में सफलता।',
      mr: 'संकटांतून सुटका, मुलांच्या शिक्षणातील अडचणी दूर होणे आणि कामात यश लाभणे.'
    }
  }
];


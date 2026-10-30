export interface FestivalPrep {
  id: string;
  name: { en: string; hi: string; mr: string };
  tithiAndMonth: { en: string; hi: string; mr: string };
  deity: { en: string; hi: string; mr: string };
  homePreparation: { en: string; hi: string; mr: string }[];
  templeItemsToBring: { en: string; hi: string; mr: string }[];
  observanceSteps: { en: string; hi: string; mr: string }[];
  traditionalPrasad: { en: string; hi: string; mr: string };
  spiritualSignificance: { en: string; hi: string; mr: string };
}

export const festivalPrepDatabase: FestivalPrep[] = [
  // 1. Ganesh Chaturthi
  {
    id: 'ganesh_chaturthi',
    name: {
      en: 'Ganesh Chaturthi (Vinayaka Chavithi)',
      hi: 'गणेश चतुर्थी (विनायक चतुर्थी)',
      mr: 'श्री गणेश चतुर्थी (गणपती बाप्पा आगमन)'
    },
    tithiAndMonth: {
      en: 'Bhadrapada Shukla Chaturthi',
      hi: 'भाद्रपद शुक्ल चतुर्थी',
      mr: 'भाद्रपद शुक्ल चतुर्थी'
    },
    deity: {
      en: 'Lord Ganesha (Vighnaharta)',
      hi: 'भगवान श्री गणेश',
      mr: 'श्री गणेश (विघ्नहर्ता बाप्पा)'
    },
    homePreparation: [
      {
        en: 'Thoroughly clean the home and erect a decorated altar / Makhar in the North-East or East corner.',
        hi: 'घर की पूर्ण सफाई करें और पूर्व या ईशान कोण में सुंदर मखर या वेदी सजाएं।',
        mr: 'घर स्वच्छ करून ईशान्य किंवा पूर्व कोपऱ्यात सुंदर मखर व चौरंग मांडून त्यावर लाल किंवा पिवळे वस्त्र पसरावे.'
      },
      {
        en: 'Prepare the sacred steaming mixture for 21 authentic Ukadiche Modaks with fresh grated coconut and jaggery.',
        hi: 'ताजे नारियल व गुड़ से २१ उकडीचे मोदक बनाने की तैयारी पहले से कर लें।',
        mr: 'ओले खोबरे, गूळ व वेलची पूड घालून २१ उकडीच्या मोदकांचे सारण व इंद्रायणी तांदळाची उकड तयार ठेवावी.'
      },
      {
        en: 'Arrange unbroken Durva grass bunches, red Hibiscus flowers, betel leaves, and Patrika leaves.',
        hi: '२१ दुर्वा की जुडी, लाल गुड़हल के फूल, पान के पत्ते और पत्री पहले ही एकत्र कर लें।',
        mr: '२१ दुर्वांची जुडी, ताजी लाल जास्वंदीची फुले, विड्याची पाने व २१ प्रकारच्या पत्री स्वच्छ धुवून ठेवाव्यात.'
      }
    ],
    templeItemsToBring: [
      {
        en: 'Brass aarti plate with cotton wicks and pure ghee lamp.',
        hi: 'घी का दीपक, रुई की बत्ती एवं आरती की थाली।',
        mr: 'साजूक तुपाचा दिवा, कापूर व पितळी आरतीची थाळी.'
      },
      {
        en: 'Fresh 21 Durva grass bunches and red hibiscus flowers.',
        hi: '२१ दुर्वा एवं लाल जासवंत पुष्प।',
        mr: '२१ दुर्वांची जुडी व जास्वंदीचा ताजा हार.'
      },
      {
        en: 'Whole coconut (Shreefal) with raw rice (Akshata) and Gur-Khobra offering.',
        hi: 'नारियल, अक्षत एवं गुड़-नारियल का नैवेद्य।',
        mr: 'पाण्याचे श्रीफळ (नारळ), अक्षता व गुळ-खोबऱ्याचा नैवेद्य.'
      }
    ],
    observanceSteps: [
      {
        en: 'Bring the clay idol covered with a sacred yellow or red cloth while chanting “Ganpati Bappa Morya”.',
        hi: '“गणपति बप्पा मोरया” के जयघोष के साथ प्रतिमा को लाल वस्त्र से ढककर घर लाएं।',
        mr: '“गणपती बाप्पा मोरया” च्या मंगल जयघोषात मूर्तीवर वस्त्र झाकून घरात आणावी.'
      },
      {
        en: 'Perform Shodashopachara Pranaprathishta with Atharvashirsha recitation and Abhishek.',
        hi: 'अथर्वशीर्ष पाठ के साथ षोडशोपचार प्राणप्रतिष्ठा एवं अभिषेक संपन्न करें।',
        mr: 'शास्त्रोक्त मंत्रांनी किंवा गणपती अथर्वशीर्ष पठणासह षोडशोपचार प्राणप्रतिष्ठा व अभिषेक करावा.'
      },
      {
        en: 'Offer 21 Durva, apply red sindoor, and present 21 hot steamed Modaks with ghee.',
        hi: '२१ दुर्वा अर्पित करें, सिंदूर लगाएं और गरमा-गरम २१ मोदक का नैवेद्य लगाएं।',
        mr: 'बाप्पाच्या चरणी २१ दुर्वा, लाल जास्वंद व शेंदूर वाहून साजूक तुपाची धार सोडून २१ मोदकांचा नैवेद्य दाखवावा.'
      },
      {
        en: 'Recite Samarth Ramdas Swami’s “Sukhakarta Dukhaharta” aarti with the entire family.',
        hi: 'परिवार सहित “सुखकर्ता दुखहर्ता” आरती गाएं और मंगल आशीर्वाद प्राप्त करें।',
        mr: 'समर्थ रामदास स्वामी विरचित "सुखकर्ता दुखहर्ता" आरती सर्वांनी मिळून टाळ्यांच्या गजरात म्हणावी.'
      }
    ],
    traditionalPrasad: {
      en: '21 Steamed Ukadiche Modaks, Panchamrit, and Kheer',
      hi: '२१ उकडीचे मोदक, पंचामृत एवं खीर',
      mr: '२१ उकडीचे मोदक, पंचामृत, साजूक तूप व गूळ-खोबरे'
    },
    spiritualSignificance: {
      en: 'Removes all obstacles from intellect and ventures, ushering in auspiciousness, peace, and wisdom.',
      hi: 'समस्त विघ्नों का नाश कर जीवन में रिद्धि-सिद्धि और सद्बुद्धि का संचार करता है।',
      mr: 'बुद्धीचा विकास, कार्यातील सर्व विघ्नांचे निवारण आणि घरात मंगलमय शांतीचा वास होतो.'
    }
  },

  // 2. Maha Shivratri
  {
    id: 'maha_shivratri',
    name: {
      en: 'Maha Shivratri (Great Night of Shiva)',
      hi: 'महाशिवरात्रि (भगवान शिव की महारात्रि)',
      mr: 'महाशिवरात्र (देवाधिदेव महादेवाची पावन रात्र)'
    },
    tithiAndMonth: {
      en: 'Magha / Phalguna Krishna Chaturdashi',
      hi: 'माघ / फाल्गुन कृष्ण चतुर्दशी',
      mr: 'माघ वद्य (कृष्ण) चतुर्दशी'
    },
    deity: {
      en: 'Lord Shiva & Goddess Parvati',
      hi: 'भगवान शिव एवं माता पार्वती',
      mr: 'देवाधिदेव महादेव व माता पार्वती'
    },
    homePreparation: [
      {
        en: 'Clean the home altar, arrange raw cow milk, curd, honey, sugar, and sacred bhasma.',
        hi: 'पूजा स्थल साफ करें; कच्चा दूध, दही, शहद, गंगाजल और शुद्ध भस्म तैयार रखें।',
        mr: 'घर स्वच्छ करून शिवलिंग स्नानासाठी गोमूत्र, गंगाजल, कच्चे दूध, मध व शुद्ध भस्म तयार ठेवावे.'
      },
      {
        en: 'Collect 108 unbroken 3-leaf Bilva leaves and wash them gently with water.',
        hi: '१०८ अखंड त्रिदल बेलपत्र धोकर स्वच्छ वस्त्र पर रखें।',
        mr: '१०८ अखंड त्रिदल बेलाची पाने स्वच्छ धुवून ठेवावीत (फाटलेली वा कीड लागलेली पाने घेऊ नयेत).'
      },
      {
        en: 'Prepare fasting foods such as Bhagar (Samo rice), peanuts, and boiled sweet potatoes.',
        hi: 'उपवास हेतु भगर, मूंगफली और उबले शकरकंद तैयार करें।',
        mr: 'उपवासासाठी सात्विक भगर, शेंगदाण्याची आमटी, खजूर व उकडलेले रताळे तयार ठेवावे.'
      }
    ],
    templeItemsToBring: [
      {
        en: 'Brass lota with pure water / raw cow milk and Gangajal.',
        hi: 'जल एवं गंगाजल युक्त तांबे अथवा पीतल का लोटा।',
        mr: 'कच्चे दूध व गंगाजल भरलेले तांब्याचे/पितळी पात्र.'
      },
      {
        en: 'Belpatra (Bilva leaves), Dhatura fruit, white flowers, and sacred Vibhuti.',
        hi: 'बेलपत्र, धतूरा, सफेद फूल और भस्म।',
        mr: 'बेलाची पाने, धोतऱ्याचे फूल/फळ, पांढरी फुले व शुद्ध भस्म.'
      },
      {
        en: 'Ghee deepak or camphor for temple aarti.',
        hi: 'घी का दीपक व कपूर।',
        mr: 'साजूक तुपाचा दिवा व कापूर.'
      }
    ],
    observanceSteps: [
      {
        en: 'Observe full-day water or phalahari fast from sunrise with Mahamrityunjaya chanting.',
        hi: 'सूर्योदय से उपवास रखें और “ॐ नमः शिवाय” का अखंड जप करें।',
        mr: 'पहाटे सूर्योदयापासून निराहार किंवा फलाहारी उपवास ठेवून “ॐ नमः शिवाय” चा अखंड जप करावा.'
      },
      {
        en: 'Perform 4-Pahar continuous Abhishek during the night with milk, curd, ghee, and honey.',
        hi: 'रात्रि में चारों प्रहर में दुग्ध, दही, घृत और मधु से शिवलिंग अभिषेक करें।',
        mr: 'रात्रीच्या चार प्रहरांत क्रमशः दूध, दही, तूप व मधाने शिवलिंगावर रुद्राभिषेक करावा.'
      },
      {
        en: 'Offer Bilvapatra chanting "Om Namah Shivaya" with smooth side touching the lingam.',
        hi: 'चिकनी सतह शिवलिंग की ओर रखकर बेलपत्र अर्पित करें।',
        mr: 'प्रत्येक बेलपत्र वाहताना बेलाची गुळगुळीत बाजू पिंडीवर ठेवून प्रार्थना करावी.'
      },
      {
        en: 'Break fast (Parana) next morning after sunrise following morning bath and Shiva darshan.',
        hi: 'अगली सुबह स्नान और शिव दर्शन के उपरांत पारणा करें।',
        mr: 'दुसऱ्या दिवशी सकाळी स्नान करून महादेवाला नैवेद्य दाखवल्यानंतरच उपवास सोडावा (पारणा).'
      }
    ],
    traditionalPrasad: {
      en: 'Panchamrit, Thandai, Makhana Kheer, and Dry Fruits',
      hi: 'पंचामृत, मखाना खीर एवं ठंडाई',
      mr: 'पंचामृत, खडीसाखर, मखाना खीर व फलाहार'
    },
    spiritualSignificance: {
      en: 'Awakens inner consciousness, burns negative karmas, and grants liberation (Moksha).',
      hi: 'पापों का क्षय, आत्मिक शांति और मोक्ष की प्राप्ति।',
      mr: 'मनातील नकारात्मकतेचा नाश, आत्मिक शांती व भगवान शंकरांच्या कृपेने दीर्घायुष्य लाभते.'
    }
  },

  // 3. Ashadhi Ekadashi
  {
    id: 'ashadhi_ekadashi',
    name: {
      en: 'Ashadhi Ekadashi (Devshayani Ekadashi)',
      hi: 'आषाढ़ी एकादशी (देवशयनी एकादशी)',
      mr: 'आषाढी एकादशी (पंढरपूर महावारी सोहळा)'
    },
    tithiAndMonth: {
      en: 'Ashadha Shukla Ekadashi',
      hi: 'आषाढ़ शुक्ल एकादशी',
      mr: 'आषाढ शुक्ल एकादशी'
    },
    deity: {
      en: 'Lord Vitthal & Rakhumai',
      hi: 'श्री विट्ठल-रुक्मिणी (पांडुरंग)',
      mr: 'श्री विठू माऊली व रखुमाई'
    },
    homePreparation: [
      {
        en: 'Clean the prayer room, adorn Lord Vitthal’s photo with fragrant Tulsi garland.',
        hi: 'घर के पूजा स्थल को स्वच्छ कर विट्ठल जी को तुलसी माला पहनाएं।',
        mr: 'देवघर स्वच्छ करून विठ्ठल-रखुमाईच्या मूर्तीला किंवा तसबिरीला सुगंधी तुळशीचा हार घालावा.'
      },
      {
        en: 'Avoid all grains, pulses, and non-satvik foods for the entire household.',
        hi: 'घर में सभी अनाज, दाल एवं तामसिक भोजन पूर्णतः वर्जित रखें।',
        mr: 'घरात कोणतेही अन्नधान्य, डाळी किंवा कांदा-लसूण पूर्णपणे वर्ज्य ठेवावे.'
      },
      {
        en: 'Play or chant “Ram Krishna Hari” and Sant Dnyaneshwar’s Haripath.',
        hi: '“राम कृष्ण हरि” और हरिपाठ का श्रवण एवं पाठ करें।',
        mr: 'सकाळपासून घरात “राम कृष्ण हरि” नामगजर व संत ज्ञानेश्वर महाराजांचा हरिपाठ लावावा.'
      }
    ],
    templeItemsToBring: [
      {
        en: 'Fresh green Tulsi leaves garland (Tulsichi Maal).',
        hi: 'ताजी तुलसी दल की माला।',
        mr: 'विठू माऊलीसाठी तुळशीची माळ व मंजिरी.'
      },
      {
        en: 'Peda / Makhana / Fruit offerings.',
        hi: 'पेड़ा, मखाना अथवा ताजे फल।',
        mr: 'गायीच्या दुधाचा पेढा, खडीसाखर व ताजी फळे.'
      },
      {
        en: 'Sandalwood paste (Gopichandan or Ashtagandha).',
        hi: 'गोपीचंदन अथवा अष्टगंध।',
        mr: 'कपाळावर लावण्यासाठी गोपीचंदन टिळा.'
      }
    ],
    observanceSteps: [
      {
        en: 'Observe strict fasting with Bhagar, boiled potatoes, and fruits.',
        hi: 'भगर, उबले आलू और फलों से एकादशी का पावन व्रत रखें।',
        mr: 'दिवसभर सात्विक फलाहार किंवा भगर-आमटीचा उपवास ठेवावा.'
      },
      {
        en: 'Perform morning and evening Aarti of Lord Vitthal chanting abhangas.',
        hi: 'प्रातः एवं संध्या काल में संतों के अभंग गाते हुए विट्ठल जी की आरती करें।',
        mr: 'सकाळी व संध्याकाळी “येई ओ विठ्ठले माझे माऊली ये” ही आरती व संतांचे अभंग म्हणावेत.'
      },
      {
        en: 'Perform mental darshan of Pandharpur Chandrabhaga snan.',
        hi: 'पंढरपुर चंद्रभागा स्नान एवं वारी का मानसिक स्मरण करें।',
        mr: 'पंढरपूरच्या पावन चंद्रभागा स्नानाचे व वारीचे मनोमन स्मरण करून संतांना वंदन करावे.'
      },
      {
        en: 'Perform Parana on Dwadashi morning after offering milk/kheer to Lord Vishnu.',
        hi: 'द्वादशी के दिन प्रातः भगवान को भोग लगाकर पारणा संपन्न करें।',
        mr: 'द्वादशीच्या दिवशी सकाळी खीर किंवा पोह्यांचा नैवेद्य दाखवून पारणा करावी.'
      }
    ],
    traditionalPrasad: {
      en: 'Bhagar (Samo Rice), Shengdana Amti, Sabudana Khichdi, and Milk',
      hi: 'भगर, मूंगफली की कढ़ी, साबूदाना खिचड़ी एवं फल',
      mr: 'वरीचे तांदूळ (भगर), शेंगदाण्याची आमटी, खजूर, दूध व फळे'
    },
    spiritualSignificance: {
      en: 'Bestows liberation from rebirth cycle and fills life with pure selfless divine love (Bhakti).',
      hi: 'पुनर्जन्म के चक्र से मुक्ति एवं जीवन में निस्वार्थ भक्ति का संचार।',
      mr: 'अहंकाराचा नाश, ईश्वर भक्तीचा आनंद आणि संतांच्या कृपेने जीवनात समाधान लाभते.'
    }
  },

  // 4. Diwali & Lakshmi Pujan
  {
    id: 'lakshmi_pujan',
    name: {
      en: 'Diwali Lakshmi Pujan (Festival of Lights)',
      hi: 'दीपावली महालक्ष्मी पूजन',
      mr: 'दिवाळी महालक्ष्मी पूजन (अमावास्या धनलक्ष्मी पूजा)'
    },
    tithiAndMonth: {
      en: 'Ashwin / Kartika Amavasya (Pradosh Kaal)',
      hi: 'कार्तिक / आश्विन अमावस्या (प्रदोष काल)',
      mr: 'आश्विन वद्य (कृष्ण) अमावास्या'
    },
    deity: {
      en: 'Goddess Mahalakshmi, Lord Ganesha & Kuber',
      hi: 'माता महालक्ष्मी, श्री गणेश एवं कुबेर देव',
      mr: 'माता महालक्ष्मी, श्री गणेश व धनपती कुबेर'
    },
    homePreparation: [
      {
        en: 'Deeply clean the house, decorate entrance with mango leaf toran and vibrant rangoli with footsteps.',
        hi: 'घर की पूर्ण सफाई करें, मुख्य द्वार पर आम का तोरण और लक्ष्मी जी के चरण चिह्नों वाली रंगोली बनाएं।',
        mr: 'घर स्वच्छ करून मुख्य दारावर झेंडू-आंब्याचे तोरण बांधावे व लक्ष्मीच्या पावलांची सुबक रांगोळी काढावी.'
      },
      {
        en: 'Arrange brass lamps, earthen diyas with sesame oil or ghee, and red velvet cloth for the altar.',
        hi: 'मिट्टी के दीपक, तिल का तेल/घी और वेदी पर लाल वस्त्र बिछाएं।',
        mr: 'मातीचे दिवे, समई, तीळ तेल व साजूक तूप, आणि चौरंगावर घालण्यासाठी लाल मखमली वस्त्र तयार ठेवावे.'
      },
      {
        en: 'Procure gold/silver coins, new accounts books (Chopda), coriander seeds (Dhanyaka), and fresh broom (Kharata).',
        hi: 'सोने/चांदी के सिक्के, बही-खाता, साबुत धनिया और नई झाड़ू की व्यवस्था करें।',
        mr: 'नवे सोन्या-चांदीचे नाणे, वह्या (हिशोब वही), अखंड धने, बत्तासे व नवीन केरसुणी (लक्ष्मी स्वरूप) तयार ठेवावी.'
      }
    ],
    templeItemsToBring: [
      {
        en: 'Pink lotus flower (Kamal Phool) or red roses.',
        hi: 'गुलाबी कमल पुष्प अथवा लाल गुलाब।',
        mr: 'गुलाबी कमळाचे फूल किंवा लाल सुगंधी गुलाबांचा हार.'
      },
      {
        en: 'Batasha, puffed rice (Lahi), and pure milk sweets.',
        hi: 'बताशे, धान की खील (लाही) और पेड़ा।',
        mr: 'धान्याची साळीची लाही, बत्तासे व साजूक दुधाचे पेढे.'
      },
      {
        en: 'Ghee lamps to light in the temple courtyard.',
        hi: 'मंदिर प्रांगण में प्रज्वलित करने हेतु घी के दीप।',
        mr: 'मंदिराच्या प्रांगणात लावण्यासाठी तुपाचे दिवे.'
      }
    ],
    observanceSteps: [
      {
        en: 'Perform puja strictly during auspicious Pradosh / Sthir Lagna (Vrishabha or Simha Lagna).',
        hi: 'प्रदोष काल अथवा स्थिर लग्न (वृषभ/सिंह लग्न) में ही पूजन संपन्न करें।',
        mr: 'शुभ प्रदोष काळात किंवा वृषभ स्थिर लग्नातच संध्याकाळी लक्ष्मीपूजन करावे.'
      },
      {
        en: 'Bathe coins and idols with milk and water, apply ashtagandha, and offer pink lotus.',
        hi: 'महालक्ष्मी की प्रतिमा एवं सिक्कों को पंचामृत स्नान कराएं और कमल पुष्प चढ़ाएं।',
        mr: 'महालक्ष्मी व गणपती मूर्तीला तसेच नाण्यांना स्नान घालून कुंकू, अष्टगंध व गुलाबी कमळ अर्पण करावे.'
      },
      {
        en: 'Worship the new broom (Kharata) by applying haldi-kunkoo and offering lahi-batasha.',
        hi: 'नई झाड़ू का भी हल्दी-कुमकुम से पूजन करें, जो दरिद्रता का नाश करती है।',
        mr: 'नवीन केरसुणीला (झाडू) हळद-कुंकू लावून व लाही वाहून पूजन करावे, कारण ती घरातील अलक्ष्मी दूर करते.'
      },
      {
        en: 'Light earthen diyas across every corner of the house, balconies, and near Tulsi vrindavan.',
        hi: 'घर के हर कोने, बालकनी और तुलसी के पास पंक्तिबद्ध दीपक जलाएं।',
        mr: 'घरातील सर्व कोपऱ्यांत, तुळशीजवळ व अंगणात दिव्यांची सुंदर आरास प्रज्वलित करावी.'
      }
    ],
    traditionalPrasad: {
      en: 'Salichi Lahi, Batashe, Peda, Kheer, and Panchamrit',
      hi: 'धान की खील, बताशे, खीर एवं पेड़ा',
      mr: 'साळीच्या लाह्या, बत्तासे, पंचामृत, पेढे व डाळिंब'
    },
    spiritualSignificance: {
      en: 'Dispels poverty and darkness, welcoming permanent wealth, prosperity, and righteous abundance.',
      hi: 'दारिद्र्य का नाश होकर घर में सुख, शांति एवं स्थायी लक्ष्मी का वास होता है।',
      mr: 'दारिद्र्य व अज्ञानाचा अंधकार दूर होऊन घरात अखंड सुख, शांती व सत्कार्याची समृद्धी नांदते.'
    }
  }
];


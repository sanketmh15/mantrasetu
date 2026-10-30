export interface ChecklistItem {
  id: string;
  name: { en: string; hi: string; mr: string };
  quantity: string;
  category: 'samagri' | 'vastr' | 'patra_phool' | 'naivedya' | 'other';
  essential: boolean;
}

export interface PujaChecklist {
  id: string;
  title: { en: string; hi: string; mr: string };
  subtitle: { en: string; hi: string; mr: string };
  deityAssociated: string;
  estimatedCostApprox: string;
  items: ChecklistItem[];
  preparationTips: { en: string; hi: string; mr: string }[];
}

export const pujaChecklistsDatabase: PujaChecklist[] = [
  // 1. Shri Satyanarayan Mahapuja
  {
    id: 'satyanarayan',
    title: {
      en: 'Shri Satyanarayan Mahapuja Samagri List',
      hi: 'श्री सत्यनारायण महापूजा सामग्री सूची',
      mr: 'श्री सत्यनारायण महापूजा साहित्य यादी'
    },
    subtitle: {
      en: 'Complete checklist for household Satyanarayan Katha, Puja, and Prasad preparation',
      hi: 'घर पर सत्यनारायण पूजा एवं कथा हेतु प्रामाणिक सामग्री',
      mr: 'घरातील मंगल सत्यनारायण पूजा, चौरंग मांडणी व सव्वा वाटी प्रसादासाठी लागणारे संपूर्ण साहित्य'
    },
    deityAssociated: 'भगवान श्रीविष्णू / सत्यनारायण',
    estimatedCostApprox: '₹१००० - ₹१५००',
    items: [
      { id: 'halad_kunku', name: { en: 'Turmeric & Kumkum (Haldi-Kunkoo)', hi: 'हल्दी एवं कुमकुम', mr: 'हळद व कुंकू' }, quantity: '५० ग्रॅम प्रत्येक', category: 'samagri', essential: true },
      { id: 'gulal_bukka', name: { en: 'Gulal, Bukka, & Rangoli', hi: 'गुलाल, अबीर व रंगोली', mr: 'गुलाल, काळा बुक्का व रांगोळी' }, quantity: '१ पाकीट', category: 'samagri', essential: true },
      { id: 'ashtagandha', name: { en: 'Sandalwood Paste / Ashtagandha', hi: 'अष्टगंध एवं शुद्ध चंदन', mr: 'अष्टगंध व शुद्ध केशर चंदन' }, quantity: '१ डबी', category: 'samagri', essential: true },
      { id: 'akshata', name: { en: 'Unbroken Rice (Akshata)', hi: 'अखंड अक्षत', mr: 'अखंड तांदूळ (अक्षता)' }, quantity: '१ किलो', category: 'samagri', essential: true },
      { id: 'supari', name: { en: 'Betel Nuts (Pooja Supari)', hi: 'पूजा सुपारी', mr: 'पूजेच्या सुपाऱ्या' }, quantity: '२५ ते ३० नग', category: 'samagri', essential: true },
      { id: 'nagwel_pan', name: { en: 'Fresh Betel Leaves (Vidyachi Paane)', hi: 'ताजे पान के पत्ते', mr: 'नागवेलीची विड्याची पाने' }, quantity: '५० पाने', category: 'patra_phool', essential: true },
      { id: 'naral', name: { en: 'Water Coconuts with Husk (Shreefal)', hi: 'जलयुक्त जटा वाले नारियल', mr: 'शहाळे/पाणी असलेले नारळ' }, quantity: '५ नग', category: 'samagri', essential: true },
      { id: 'dhoop_kapur', name: { en: 'Dhoop, Agarbatti & Camphor (Kapur)', hi: 'धूप, अगरबत्ती एवं भीमसेनी कपूर', mr: 'धूपकांडी, अगरबत्ती व भीमसेनी कापूर' }, quantity: '१ पाकीट', category: 'samagri', essential: true },
      { id: 'tup_tel', name: { en: 'Pure Cow Ghee & Oil for Lamps', hi: 'गाय का शुद्ध घी व तिल तेल', mr: 'गायीचे साजूक तूप व दिव्यासाठी तेल' }, quantity: '२५० ग्रॅम', category: 'samagri', essential: true },
      { id: 'vata', name: { en: 'Cotton Wicks (Phool Vata & Lamb Vata)', hi: 'रुई की बत्तियां', mr: 'कापसाच्या फुलवाती व लांब वाती' }, quantity: '२ पाकिटे', category: 'samagri', essential: true },
      { id: 'janve_jod', name: { en: 'Sacred Threads (Yajnopavita / Janve)', hi: 'यज्ञोपवीत (जनेऊ)', mr: 'जानव्याची जोड' }, quantity: '२ जोड', category: 'vastr', essential: true },
      { id: 'vastr_peet', name: { en: 'Yellow / Red Cotton Altar Cloth (Chaurang Vastra)', hi: 'पीला अथवा लाल वेदी वस्त्र', mr: 'चौरंगावर घालण्यासाठी पिवळे/लाल वस्त्र' }, quantity: '१.२५ मीटर', category: 'vastr', essential: true },
      { id: 'blouse_piece', name: { en: 'Khan / Blouse Piece for Oti', hi: 'ओटीसाठी खण व वस्त्र', mr: 'ओटीसाठी खण व ब्लाऊज पीस' }, quantity: '१ नग', category: 'vastr', essential: true },
      { id: 'toran_aamba', name: { en: 'Mango Leaves (Aambyachi Paane) for Kalash', hi: 'आम के पत्ते', mr: 'कलशासाठी आंब्याची पाने' }, quantity: '१ डहाळी (५-७ पाने)', category: 'patra_phool', essential: true },
      { id: 'phool_har', name: { en: 'Fresh Flower Garlands & Loose Petals', hi: 'फूल माला एवं सुगंधी पुष्प', mr: 'फुलांचे हार व सुटी सुगंधी फुले' }, quantity: '२ हार + पाव किलो फुले', category: 'patra_phool', essential: true },
      { id: 'tulsi_dal', name: { en: 'Fresh Tulsi Leaves (Tulsidal)', hi: 'ताजा तुलसी दल', mr: 'ताजी तुळशीची पाने व मंजिरी' }, quantity: '१ वाटी', category: 'patra_phool', essential: true },
      { id: 'durva', name: { en: 'Durva Grass for Ganpati', hi: 'दुर्वा दल', mr: '२१ दुर्वांची जुडी' }, quantity: '२ जुड्या', category: 'patra_phool', essential: true },
      { id: 'panchamrit', name: { en: 'Panchamrit (Milk, Curd, Ghee, Honey, Sugar)', hi: 'पंचामृत सामग्री', mr: 'पंचामृत (दूध, दही, तूप, मध, साखर)' }, quantity: '१ वाटी', category: 'naivedya', essential: true },
      { id: 'panch_khadya', name: { en: 'Dry Fruits (Panchkhadya - Kharik, Badam, Kaju, etc.)', hi: 'पंचमेवा / पंचखाद्य', mr: 'पंचखाद्य (खारक, बदाम, काजू, खोबरे, खसखस)' }, quantity: '१०० ग्रॅम', category: 'naivedya', essential: true },
      { id: 'sheera_samagri', name: { en: 'Prasad Ingredients (1.25 cup Rava, Ghee, Sugar, Milk, Banana)', hi: 'सवा वाटी शीरा प्रसाद सामग्री', mr: 'प्रसादासाठी सव्वा वाटी रवा, तूप, साखर, दूध व पिकलेली केळी' }, quantity: 'सव्वा माप', category: 'naivedya', essential: true },
      { id: 'panch_phale', name: { en: '5 Varieties of Fresh Seasonal Fruits', hi: '५ प्रकार के ऋतु फल', mr: '५ प्रकारची फळे (केळी, सफरचंद, पेरू, डाळिंब इ.)' }, quantity: '५ प्रकार', category: 'naivedya', essential: true },
      { id: 'attar', name: { en: 'Natural Attar / Sugandhi Dravya', hi: 'प्राकृतिक इत्र', mr: 'गुलाब/मोगरा अत्तर' }, quantity: '१ लहान बाटली', category: 'samagri', essential: false },
    ],
    preparationTips: [
      {
        en: 'Set up the wooden Chaurang in East or North-East direction with a fresh yellow cloth.',
        hi: 'चौरंग को पूर्व या उत्तर-पूर्व दिशा में स्थापित करें और पीला वस्त्र बिछाएं।',
        mr: 'चौरंग पूर्व किंवा ईशान्य दिशेला ठेवून त्यावर पिवळे वस्त्र पसरावे.'
      },
      {
        en: 'Prepare the sacred 1.25 portion Sheera using equal parts of pure cow ghee, rava, sugar, milk, and chopped banana.',
        hi: 'सवा वाटी सूजी, घी, चीनी, दूध और केले से शुद्ध सात्विक प्रसाद तैयार करें।',
        mr: 'सव्वा वाटी रवा, साजूक तूप, साखर, दूध आणि बारीक चिरलेली केळी घालून सत्यनारायणाचा प्रसिद्ध मऊ प्रसाद तयार करावा.'
      },
      {
        en: 'Ensure Tulsi dal is offered to Lord Satyanarayan with every chapter and naivedya.',
        hi: 'प्रत्येक अध्याय एवं भोग के साथ भगवान विष्णु को तुलसी दल अवश्य अर्पित करें।',
        mr: 'सत्यनारायणाच्या प्रत्येक अध्यायाच्या समाप्तीस व नैवेद्यावर तुळशीपत्र आवर्जून ठेवावे.'
      }
    ]
  },

  // 2. Ganesh Pratishtha / Chaturthi Puja
  {
    id: 'ganesh_pratishtha',
    title: {
      en: 'Ganesh Chaturthi Pratishtha Samagri List',
      hi: 'श्री गणेश प्राणप्रतिष्ठा पूजन सामग्री',
      mr: 'श्री गणेश प्राणप्रतिष्ठा व नित्य पूजा साहित्य'
    },
    subtitle: {
      en: 'Checklist for welcoming and establishing Bappa at home',
      hi: 'गणपति बाप्पा के आगमन एवं स्थापना हेतु सम्पूर्ण सूची',
      mr: 'गणपती बाप्पाच्या स्वागतासाठी व विधिवत प्राणप्रतिष्ठेसाठी लागणारे संपूर्ण साहित्य'
    },
    deityAssociated: 'श्री गणपती बाप्पा',
    estimatedCostApprox: '₹८०० - ₹१२००',
    items: [
      { id: 'rakta_chandan', name: { en: 'Red Sandalwood (Rakta Chandan) & Sindoor', hi: 'रक्तचंदन एवं सिंदूर', mr: 'रक्तचंदन व शेंदूर' }, quantity: '१ डबी', category: 'samagri', essential: true },
      { id: 'halad_kunkoo', name: { en: 'Haldi & Kumkum', hi: 'हल्दी व कुमकुम', mr: 'हळद-कुंकू' }, quantity: '५० ग्रॅम', category: 'samagri', essential: true },
      { id: 'durva_21', name: { en: '21 Durva Grass Sprigs', hi: '२१ दुर्वा दल', mr: '२१ दुर्वांची जुडी (तीन पाती)' }, quantity: '५ जुड्या', category: 'patra_phool', essential: true },
      { id: 'jaswand_phool', name: { en: 'Red Hibiscus (Jaswand) & Red Flowers', hi: 'लाल गुड़हल (जासवंत) पुष्प', mr: 'लाल जास्वंदीची फुले व तांबडी फुले' }, quantity: '११-२१ फुले', category: 'patra_phool', essential: true },
      { id: 'modak_21', name: { en: '21 Steamed or Fried Modaks', hi: '२१ उकडीचे अथवा तले हुए मोदक', mr: '२१ उकडीचे/तळणीचे मोदक' }, quantity: '२१ नग', category: 'naivedya', essential: true },
      { id: 'janve', name: { en: 'Yajnopavita (Janve) for Ganesha', hi: 'गणेश जी के लिए जनेऊ', mr: 'गणपती बाप्पासाठी जानवे' }, quantity: '१ जोड', category: 'vastr', essential: true },
      { id: 'red_vastra', name: { en: 'Red Silk / Cotton Cloth for Altar', hi: 'लाल वस्त्र (आसन हेतु)', mr: 'लाल वस्त्र (पाट/चौरंगासाठी)' }, quantity: '१ मीटर', category: 'vastr', essential: true },
      { id: 'panchamrit', name: { en: 'Panchamrit for Abhishek', hi: 'अभिषेक हेतु पंचामृत', mr: 'अभिषेकासाठी पंचामृत' }, quantity: '१ वाटी', category: 'naivedya', essential: true },
      { id: 'attar_gulab', name: { en: 'Rose Attar (Gulab Itra)', hi: 'गुलाब इत्र', mr: 'गुलाब अत्तर' }, quantity: '१ लहान बाटली', category: 'samagri', essential: true },
      { id: 'naral_shreefal', name: { en: 'Coconuts', hi: 'नारियल', mr: 'पाण्याचे नारळ' }, quantity: '२ नग', category: 'samagri', essential: true },
      { id: 'dhoop_aarti', name: { en: 'Dhoop, Camphor & Aarti Lamp', hi: 'धूप, भीमसेनी कपूर व आरती दीप', mr: 'धूप, कापूर व आरती निरंजन' }, quantity: '१ संच', category: 'samagri', essential: true },
    ],
    preparationTips: [
      {
        en: 'Never offer Tulsi leaves to Lord Ganesha, as per Ganesha Purana scriptural traditions.',
        hi: 'गणेश जी को कभी भी तुलसी दल अर्पित न करें।',
        mr: 'गणपती बाप्पाला कधीही तुळशीपत्र वाहू नये (केवळ भाद्रपद शुक्ल चतुर्थीच्या दिवशी अंगारक विधी वगळता).'
      },
      {
        en: 'Keep 21 Durva sprigs washed with pure water and tied in pairs of two.',
        hi: '२१ दुर्वा को स्वच्छ जल से धोकर जोड़े बनाकर तैयार रखें।',
        mr: 'दुर्वा स्वच्छ धुवून दोन-दोनच्या जोडीने २१ दुर्वा बाप्पाच्या मस्तकावर अर्पण कराव्यात.'
      }
    ]
  },

  // 3. Rudrabhishek & Shiva Puja
  {
    id: 'rudrabhishek',
    title: {
      en: 'Maha Shivratri & Rudrabhishek Samagri List',
      hi: 'महाशिवरात्रि एवं रुद्राभिषेक सामग्री सूची',
      mr: 'महाशिवरात्र व लघुरुद्र अभिषेक साहित्य यादी'
    },
    subtitle: {
      en: 'Everything needed for Shivling Abhishek, Bilva offering, and Bhasma arpan',
      hi: 'शिवलिंग अभिषेक, बेलपत्र, भस्म एवं रुद्राभिषेक की संपूर्ण सामग्री',
      mr: 'शिवलिंग अभिषेक, त्रिदल बेलपत्र, भस्म व रुद्राभिषेकासाठी लागणारे शास्त्रोक्त साहित्य'
    },
    deityAssociated: 'भगवान शिव / महादेव',
    estimatedCostApprox: '₹६०० - ₹१०००',
    items: [
      { id: 'bilvapatra', name: { en: 'Unbroken 3-Leaf Bilva Leaves (Belpatra)', hi: 'अखंड त्रिदल बेलपत्र', mr: 'अखंड त्रिदल बेलपत्रे' }, quantity: '१०८ पाने', category: 'patra_phool', essential: true },
      { id: 'shuddha_bhasma', name: { en: 'Pure Vibhuti / Sacred Bhasma', hi: 'शुद्ध भस्म / विभूति', mr: 'शुद्ध गोमय भस्म / विभूती' }, quantity: '१ पाकीट', category: 'samagri', essential: true },
      { id: 'shvet_chandan', name: { en: 'White Sandalwood Paste (Shvet Chandan)', hi: 'श्वेत चंदन', mr: 'पांढरे सुगंधी चंदन' }, quantity: '१ डबी', category: 'samagri', essential: true },
      { id: 'gangajal', name: { en: 'Holy Ganga River Water (Gangajal)', hi: 'पवित्र गंगाजल', mr: 'पवित्र गंगाजल' }, quantity: '१ बाटली', category: 'samagri', essential: true },
      { id: 'dudh_dahi', name: { en: 'Cow Raw Milk & Fresh Curd', hi: 'गाय का कच्चा दूध एवं ताजा दही', mr: 'गायीचे कच्चे दूध व ताजे दही' }, quantity: '५०० मिली', category: 'naivedya', essential: true },
      { id: 'shuddha_madh', name: { en: 'Pure Honey (Madh)', hi: 'शुद्ध शहद', mr: 'शुद्ध मध' }, quantity: '५० ग्रॅम', category: 'naivedya', essential: true },
      { id: 'dhatura_phool', name: { en: 'Dhatura Fruit & White Flowers', hi: 'धतूरा फल एवं श्वेत पुष्प', mr: 'धोत्रा फळ, फूल व पांढरी फुले' }, quantity: '२ नग + फुले', category: 'patra_phool', essential: true },
      { id: 'janeu_vastra', name: { en: 'White Yajnopavita & White Cloth', hi: 'श्वेत जनेऊ एवं सफेद वस्त्र', mr: 'पांढरे जानवे व पांढरे वस्त्र' }, quantity: '१ संच', category: 'vastr', essential: true },
      { id: 'attar_hina', name: { en: 'Natural Attar / Sugandhi Dravya', hi: 'इत्र (अतर)', mr: 'अत्तर' }, quantity: '१ लहान बाटली', category: 'samagri', essential: true },
      { id: 'shakar_khadisakhar', name: { en: 'Rock Sugar / Khadi Sakhar', hi: 'मिश्री (खड़ी शक्कर)', mr: 'खडीसाखर' }, quantity: '१०० ग्रॅम', category: 'naivedya', essential: true },
    ],
    preparationTips: [
      {
        en: 'Ensure Bilva leaves are smooth side touching the Shiva Lingam, not torn or pest-eaten.',
        hi: 'बेलपत्र का चिकना भाग शिवलिंग की ओर करके अर्पित करें।',
        mr: 'बेलपत्राची गुळगुळीत बाजू शिवलिंगावर टेकवून "ॐ नमः शिवाय" म्हणत अर्पण करावी.'
      },
      {
        en: 'Never offer Kumkum, Ketaki flowers, or Champak flowers to Lord Shiva.',
        hi: 'शिवलिंग पर कुमकुम अथवा केतकी के फूल कभी न चढ़ाएं।',
        mr: 'शिवलिंगावर कुंकू, हळद किंवा केतकीची फुले वाहणे शास्त्रात निषिद्ध मानले आहे. केवळ भस्म व पांढरे चंदन लावावे.'
      }
    ]
  },

  // 4. Daily Home Puja Essentials
  {
    id: 'daily_puja',
    title: {
      en: 'Nitya Devpuja (Daily Home Worship) Essentials',
      hi: 'नित्य देवपूजा (दैनिक घरेलू पूजा) सामग्री',
      mr: 'नित्य देवपूजा दैनिक आवश्यक साहित्य'
    },
    subtitle: {
      en: 'Essential checklist for everyday morning Panchopachara prayer',
      hi: 'प्रातःकाल की नित्य पंचोपचार पूजा की बुनियादी सामग्री',
      mr: 'दररोज सकाळी देवघरात नित्य पंचोपचार पूजा करण्यासाठी लागणारे मूलभूत साहित्य'
    },
    deityAssociated: 'कुलदैवत, इष्टदेव व ग्रामदैवत',
    estimatedCostApprox: '₹२०० - ₹४०० (महिना)',
    items: [
      { id: 'tamhan_panchpatra', name: { en: 'Brass Tamhan, Panchpatra & Pali', hi: 'तांबे-पीतल ताम्हन व पंचपात्र', mr: 'ताम्हण, पंचपात्र व पळी' }, quantity: '१ संच', category: 'other', essential: true },
      { id: 'niranjan_ghanta', name: { en: 'Brass Bell & Single-Wick Lamp (Niranjan)', hi: 'पूजा घंटी व निरंजन दीप', mr: 'पितळी घंटा व निरंजन' }, quantity: '१ संच', category: 'other', essential: true },
      { id: 'samai_tel', name: { en: 'Brass Samai & Til Oil / Ghee', hi: 'समई एवं तिल तेल / घी', mr: 'पितळी समई, तेल व वाती' }, quantity: '१ संच', category: 'samagri', essential: true },
      { id: 'halad_kunkoo_chandan', name: { en: 'Daily Haldi, Kunkoo & Chandan', hi: 'हल्दी, कुमकुम व चंदन', mr: 'हळद, कुंकू व गंध (अष्टगंध)' }, quantity: '१ डबी', category: 'samagri', essential: true },
      { id: 'akshata_shvet', name: { en: 'Daily Akshata (Rice)', hi: 'अक्षता', mr: 'अक्षता' }, quantity: '१ लहान वाटी', category: 'samagri', essential: true },
      { id: 'taza_phool_tulsi', name: { en: 'Fresh Garden Flowers & Tulsi leaves', hi: 'ताजे पुष्प व तुलसी', mr: 'ताजी फुले व तुळशीपत्र' }, quantity: 'नित्य ताजी', category: 'patra_phool', essential: true },
      { id: 'naivedya_sakhar_kheera', name: { en: 'Simple Naivedya (Sugar / Jaggery / Milk)', hi: 'दैनिक नैवेद्य (गुड़ / मिश्री / दूध)', mr: 'गुळ-खोबरे किंवा खडीसाखर नैवेद्य' }, quantity: 'नित्य ताजे', category: 'naivedya', essential: true },
      { id: 'dhoop_kapur', name: { en: 'Camphor for daily Aarti', hi: 'आरती हेतु कपूर', mr: 'कापूर व अगरबत्ती' }, quantity: '१ पाकीट', category: 'samagri', essential: true },
    ],
    preparationTips: [
      {
        en: 'Perform snana (bath), wear fresh clothes, sit facing East or North.',
        hi: 'स्नान कर शुद्ध वस्त्र धारण करें और पूर्व या उत्तर की ओर मुख करके बैठें।',
        mr: 'शुचिर्भूत होऊन पूर्व किंवा उत्तर दिशेकडे तोंड करून बसावे.'
      },
      {
        en: 'Light the deepak first before starting Abhishek and mantra chanting.',
        hi: 'पूजा प्रारम्भ करने से पूर्व सर्वप्रथम मंगल दीप प्रज्वलित करें।',
        mr: 'पूजेला प्रारंभ करण्यापूर्वी सर्वप्रथम दिवा प्रज्वलित करून नमस्कार करावा.'
      }
    ]
  }
];


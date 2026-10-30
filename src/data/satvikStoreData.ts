export interface StoreProduct {
  id: string;
  name: { en: string; hi: string; mr: string };
  category: 'mala' | 'puja_samagri' | 'vessel_murti' | 'scriptures' | 'varkari';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: { en: string; hi: string; mr: string };
  description: { en: string; hi: string; mr: string };
  spiritualBenefit: { en: string; hi: string; mr: string };
  inStock: boolean;
  imageIcon: string;
  specifications: { en: string; hi: string; mr: string }[];
}

export const storeCategories = [
  { id: 'all', label: { en: 'All Items', hi: 'सभी सामग्री', mr: 'सर्व साहित्य' }, icon: '🪷' },
  { id: 'mala', label: { en: 'Sacred Malas & Rudraksha', hi: 'जपमाला एवं रुद्राक्ष', mr: 'जपमाळा व रुद्राक्ष' }, icon: '📿' },
  { id: 'puja_samagri', label: { en: 'Puja Samagri & Dhoop', hi: 'पूजा सामग्री व धूप', mr: 'पूजा साहित्य व अष्टगंध' }, icon: '🪔' },
  { id: 'vessel_murti', label: { en: 'Brass & Copper Vessels', hi: 'ताम्र एवं पीतल पात्र', mr: 'तांब्या-पितळेची भांडी' }, icon: '🔔' },
  { id: 'scriptures', label: { en: 'Sacred Scriptures (Granth)', hi: 'पवित्र धर्मग्रन्थ', mr: 'पावन धर्मग्रंथ व पोथी' }, icon: '📖' },
  { id: 'varkari', label: { en: 'Varkari Bhakti Gear', hi: 'वारकरी भक्ति संच', mr: 'वारकरी भक्ती संच' }, icon: '🚩' },
];

export const satvikProducts: StoreProduct[] = [
  {
    id: 'tulsi-mala-108',
    name: {
      en: 'Original Vrindavan Tulsi Kanthi Mala (108 Beads)',
      hi: 'मूल वृन्दावन तुलसी कंठी माला (१०८ मनके)',
      mr: 'वृंदावन अस्सल तुळशी कंठी माळ (१०८ मणी)',
    },
    category: 'mala',
    price: 299,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 384,
    badge: { en: 'Best Seller', hi: 'सर्वाधिक लोकप्रिय', mr: 'अतिशय लोकप्रिय' },
    description: {
      en: 'Handcrafted from sacred Vrindavan basil wood. Worn for mental tranquility, devotion, and divine protection of Lord Vishnu & Vitthal.',
      hi: 'पवित्र वृन्दावन की तुलसी काष्ठ से हस्तनिर्मित। भगवान विष्णु व विठ्ठल कृपा, चित्त शुद्धि एवं शांति हेतु।',
      mr: 'पवित्र वृंदावन येथील अस्सल तुळशीच्या लाकडापासून हस्तनिर्मित. गळ्यात धारण केल्याने मानसिक शांती, एकाग्रता आणि विठूमाऊलीची कृपा लाभते.',
    },
    spiritualBenefit: {
      en: 'Protects from negative vibrations, balances the throat chakra, and deepens mantra japa.',
      hi: 'नकारात्मक ऊर्जा से रक्षा, कंठ चक्र का शोधन और नामस्मरण में अगाध एकाग्रता।',
      mr: 'नकारात्मक लहरींपासून रक्षण, कंठ शुद्धि आणि नामस्मरणामध्ये मन स्थिर होते.',
    },
    inStock: true,
    imageIcon: '🌿',
    specifications: [
      { en: 'Material: Pure Vrindavan Tulsi Wood', hi: 'सामग्री: शुद्ध तुलसी काष्ठ', mr: 'साहित्य: १००% अस्सल वृंदावन तुळस' },
      { en: 'Bead Count: 108 + 1 Guru Bead', hi: 'मनके: १०८ + १ सुमेरु', mr: 'मणी संख्या: १०८ + १ मेरु मणी' },
      { en: 'Cord: High-grade holy cotton knotting', hi: 'धागा: मजबूत सूती धागा', mr: 'दोरा: मजबूत पवित्र सुती धाग्यात गुंफण' },
    ],
  },
  {
    id: 'nepali-rudraksha-5mukhi',
    name: {
      en: 'Authentic 5-Mukhi Nepali Rudraksha Mala (Lab Certified)',
      hi: 'मूल ५-मुखी नेपाली रुद्राक्ष माला (प्रमाणित)',
      mr: 'अस्सल ५-मुखी नेपाळी रुद्राक्ष माळ (लॅब प्रमाणित)',
    },
    category: 'mala',
    price: 599,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 512,
    badge: { en: 'Consecrated', hi: 'अभिमंत्रित', mr: 'अभिमंत्रित' },
    description: {
      en: 'Genuine Nepali Panchamukhi Rudraksha beads. Associated with Lord Shiva (Kalagni Rudra). Controls blood pressure, dissolves stress, and enhances spiritual awareness.',
      hi: 'नेपाल के पावन रुद्राक्ष वृक्षों से प्राप्त पंचमुखी रुद्राक्ष। भगवान शिव कृपा एवं मानसिक तनाव मुक्ति हेतु।',
      mr: 'नेपाळच्या हिमालयातील अस्सल ५-मुखी रुद्राक्ष. महादेवाच्या कृपेने मन शांत राहते, रक्तदाब नियंत्रणात राहण्यास मदत होते व सकारात्मक ऊर्जा मिळते.',
    },
    spiritualBenefit: {
      en: 'Calms the nervous system, bestows health, long life, and spiritual illumination.',
      hi: 'हृदय व मन को शांति, दीर्घायु एवं शिव कृपा की प्राप्ति।',
      mr: 'मानसिक ताणतणाव नाहीसा होतो, दीर्घायुष्य व सदाचार अंगी बाणतो.',
    },
    inStock: true,
    imageIcon: '🔱',
    specifications: [
      { en: 'Origin: Nepal Foothills', hi: 'उत्पत्ति: नेपाल', mr: 'मूळ स्थान: नेपाळ' },
      { en: 'Mukhi: 5-Faced Natural Grooves', hi: 'मुख: ५ मुखी प्राकृतिक', mr: 'स्वरूप: नैसर्गिक ५-मुखी' },
      { en: 'Certificate: Authenticity Lab Card Included', hi: 'प्रमाणपत्र: लैब सर्टिफिकेट सम्मिलित', mr: 'प्रमाणपत्र: अधिकृत लॅब टेस्ट कार्ड' },
    ],
  },
  {
    id: 'pure-sphatik-mala',
    name: {
      en: 'Clear Quartz Sphatik Mala (Cooled for Japa)',
      hi: 'शुद्ध स्फटिक जपमाला (शीतल प्रभाव)',
      mr: 'शुद्ध स्फटिक जपमाळ (१०८ मणी - शीतलता व शांती)',
    },
    category: 'mala',
    price: 399,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 219,
    description: {
      en: 'Natural Himalayan clear quartz crystal. Exceptional for Saraswati, Gayatri, and Mahalakshmi japa, dissipating body heat and cultivating supreme focus.',
      hi: 'प्राकृतिक हिमालयन स्फटिक। गायत्री एवं सरस्वती मंत्र जप हेतु सर्वश्रेष्ठ, शरीर को शीतलता प्रदान करती है।',
      mr: 'नैसर्गिक हिमालयातील पारदर्शक स्फटिक मणी. गायत्री मंत्र, सरस्वती व महालक्ष्मी जपासाठी सर्वोत्तम. शरीरातील उष्णता कमी करून मन शांत करते.',
    },
    spiritualBenefit: {
      en: 'Enhances memory, sharpens intellect, and brings diamond-like clarity to prayers.',
      hi: 'मेधा शक्ति में वृद्धि, बौद्धिक तीक्ष्णता एवं एकाग्रता।',
      mr: 'स्मरणशक्ती वाढवते, बुद्धीला तेज देते व एकाग्रता वाढवते.',
    },
    inStock: true,
    imageIcon: '💎',
    specifications: [
      { en: 'Stone: 100% Natural Clear Quartz', hi: 'पत्थर: प्राकृतिक स्फटिक', mr: 'खडा: १००% अस्सल नैसर्गिक स्फटिक' },
      { en: 'Bead Size: 7mm polished cut', hi: 'आकार: ७ मिमी पॉलिश', mr: 'मणी आकार: ७ मिमी' },
    ],
  },
  {
    id: 'ashtagandha-chandan-set',
    name: {
      en: 'Royal Ashtagandha & Pure Gopi Chandan Tilak Set',
      hi: 'शाही अष्टगंध एवं शुद्ध गोपीचंदन तिलक संच',
      mr: 'शाही अष्टगंध व शुद्ध गोपीचंदन टिळा संच',
    },
    category: 'puja_samagri',
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 430,
    badge: { en: 'Temple Grade', hi: 'मंदिर स्तर', mr: 'शुद्ध सुगंध' },
    description: {
      en: 'Authentic 8-fragrance Ashtagandha (Sandalwood, Saffron, Camphor, Musk, etc.) and holy Dwarka Gopi Chandan for daily forehead tilak.',
      hi: 'आठ पावन सुगन्धों से निर्मित अष्टगंध व द्वारका की पावन गोपीचंदन बट्टी। नित्य माथे पर तिलक लगाने हेतु।',
      mr: '८ सुगंधी द्रव्यांनी (चंदन, केशर, कापूर, कस्तुरी) युक्त अस्सल अष्टगंध आणि द्वारकेचे पावन गोपीचंदन. कपाळावर टिळा लावल्याने आज्ञा चक्र जागृत होते.',
    },
    spiritualBenefit: {
      en: 'Cools the Ajna chakra, improves concentration, and radiates divine aura.',
      hi: 'आज्ञा चक्र को शीतलता और दैवीय आभा का संचार।',
      mr: 'आज्ञा चक्राला शीतलता, डोकेदुखीपासून आराम आणि सात्विक तेज.',
    },
    inStock: true,
    imageIcon: '🪔',
    specifications: [
      { en: 'Quantity: 50g Ashtagandha + 2 Gopi Chandan Sticks', hi: 'मात्रा: ५० ग्राम + २ बट्टी', mr: 'प्रमाण: ५० ग्रॅम अष्टगंध + २ गोपीचंदन कांड्या' },
      { en: 'Fragrance: 100% Chemical-free Vedic herbs', hi: 'सुगंध: वैदिक जड़ी-बूटियाँ', mr: 'सुगंध: नैसर्गिक केशर-चंदन सुगंध' },
    ],
  },
  {
    id: 'ghee-diya-wicks',
    name: {
      en: 'Pure Desi Cow Ghee Diya Wicks (Pack of 100)',
      hi: 'शुद्ध देशी गौ घृत बाती (१०० बत्ती डिब्बी)',
      mr: 'शुद्ध देशी गाईच्या तुपाची वात (१०० तयार वाती डबी)',
    },
    category: 'puja_samagri',
    price: 249,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 640,
    badge: { en: 'Ready to Light', hi: 'झटपट दीप', mr: 'तयार दीपवात' },
    description: {
      en: 'Pure A2 Cow Ghee infused cotton wicks with organic camphor. Ready to light instantly for morning puja and evening aarti. Burns steadily for 30+ minutes.',
      hi: 'देशी गाय के शुद्ध घी से भीगी हुई कपास बत्तियां। ३० मिनट से अधिक अखंड दीप प्रज्वलन।',
      mr: 'अस्सल देशी गाईच्या तुपात व कापूरात मुरवलेल्या तयार कापूस वाती. रोज सकाळी व संध्याकाळी आरतीसाठी तयार, ३० मिनिटांहून अधिक शांत तेवत राहतात.',
    },
    spiritualBenefit: {
      en: 'Purifies home environment, attracts positive energy, and pleases Mata Lakshmi.',
      hi: 'घर के वातावरण की शुद्धि, वास्तु दोष निवारण और माँ लक्ष्मी का वास।',
      mr: 'घरातील नकारात्मक लहरी नष्ट होतात, घरात सात्विक ऊर्जा पसरते.',
    },
    inStock: true,
    imageIcon: '🔥',
    specifications: [
      { en: 'Count: 100 ready-to-use wicks', hi: 'संख्या: १०० बत्तियां', mr: 'संख्या: १०० तयार वाती' },
      { en: 'Burn Time: 30–35 minutes each', hi: 'समय: ३०-३५ मिनट', mr: 'तेवण्याचा काळ: ३० ते ३५ मिनिटे' },
    ],
  },
  {
    id: 'brass-garuda-bell',
    name: {
      en: 'Handcrafted Brass Garuda Temple Bell (Ghanti)',
      hi: 'हस्तनिर्मित पीतल गरुड़ घंटी',
      mr: 'हस्तनिर्मित नक्षीदार पितळी गरुड घंटा (पावन ध्वनी)',
    },
    category: 'vessel_murti',
    price: 349,
    originalPrice: 550,
    rating: 4.8,
    reviewsCount: 185,
    description: {
      en: 'Pure solid brass puja bell adorned with Lord Garuda on top. Emits a resonant, sustained ringing tone that dispels negative energy.',
      hi: 'शीर्ष पर भगवान गरुड़ की प्रतिमा युक्त ठोस पीतल घंटी। दीर्घकालिक गूंजने वाला पवित्र नाद।',
      mr: 'वरच्या बाजूला भगवान गरुडाची पावन मूर्ती असलेली भरीव पितळी घंटा. घंटेचा खणखणीत नाद घरातील अशुद्ध ऊर्जा दूर करून देवत्व आकर्षित करतो.',
    },
    spiritualBenefit: {
      en: 'The sound of the bell creates spiritual vibrations, welcoming the gods and driving away dark forces.',
      hi: 'घंटी की ध्वनि से देवताओं का आह्वान और अनिष्ट शक्तियों का पलायन होता है।',
      mr: '"आगमनेन तु देवानां गमनेन तु रक्षसाम्" — देवतेचे आगमन व विघ्नांचे निवारण.',
    },
    inStock: true,
    imageIcon: '🔔',
    specifications: [
      { en: 'Material: Heavy Pure Brass', hi: 'सामग्री: शुद्ध पीतल', mr: 'धातू: १००% भरीव पितळ' },
      { en: 'Height: 5.5 inches', hi: 'ऊंचाई: ५.५ इंच', mr: 'उंची: ५.५ इंच' },
    ],
  },
  {
    id: 'copper-puja-thali-set',
    name: {
      en: 'Pure Copper Vedic Puja Thali & Panchapatra Set (5 Pieces)',
      hi: 'शुद्ध तांबे की वैदिक पूजा थाली एवं पंचपात्र संच (५ वस्तुएं)',
      mr: 'शुद्ध तांब्याची वैदिक पूजा थाळी व पंचपात्र संच (५ वस्तू संच)',
    },
    category: 'vessel_murti',
    price: 699,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 298,
    badge: { en: 'Traditional', hi: 'पारंपरिक', mr: 'शास्त्रोक्त' },
    description: {
      en: 'Complete 100% pure copper set including engraved Thali, Panchapatra with Pali spoon, Chandan Vati, and Diya for authentic daily ritual.',
      hi: 'नक्काशीदार ताम्र थाली, पंचपात्र, पाली, दीपक एवं चंदन कटोरी युक्त सम्पूर्ण पंचामृत संच।',
      mr: 'नक्षीदार तांब्याची थाळी, पंचपात्र, आचमनी पाली, दिवा आणि गंध वाटी असा संपूर्ण ५ वस्तूंचा संच. तांबे हे देवांच्या पूजेसाठी सर्वाधिक पवित्र मानले जाते.',
    },
    spiritualBenefit: {
      en: 'Copper has natural antibacterial properties and supreme spiritual purity prescribed in Agamas.',
      hi: 'ताम्र पात्र में रखा जल अमृत तुल्य और शास्त्र सम्मत पावन माना गया है।',
      mr: 'तांब्यातील तीर्थ आणि पंचामृत अत्यंत पवित्र व आरोग्यदायी असते.',
    },
    inStock: true,
    imageIcon: '🪙',
    specifications: [
      { en: 'Contents: Thali, Panchapatra, Pali, Diya, Vati', hi: 'वस्तुएं: ५ पावन पात्र', mr: 'समाविष्ट: थाळी, पंचपात्र, आचमनी, दिवा, वाटी' },
      { en: 'Metal: 100% Pure Virgin Copper', hi: 'धातु: शुद्ध तांबा', mr: 'धातू: १००% अस्सल तांबे' },
    ],
  },
  {
    id: 'varkari-taal-chipli',
    name: {
      en: 'Authentic Varkari Bronze Taal & Wooden Chipli Set',
      hi: 'अस्सल वारकरी कांस्य टाळ एवं काष्ठ चिपळी संच',
      mr: 'अस्सल वारकरी कांस्य टाळ व लाकडी चिपळ्या संच',
    },
    category: 'varkari',
    price: 499,
    originalPrice: 799,
    rating: 5.0,
    reviewsCount: 420,
    badge: { en: 'Varkari Pure', hi: 'वारकरी गौरव', mr: 'वारकरी परंपरा' },
    description: {
      en: 'Traditional hand-forged bell metal (Kansa) cymbals used in Pandharpur Wari and Haripath, paired with polished Sheesham wood Chiplis.',
      hi: 'पंढरपुर वारी एवं भजन में बजने वाले प्रामाणिक कांस्य टाळ व शीशम चिपळी। कर्णप्रिय खनकदार नाद।',
      mr: 'पंढरपूर वारी व हरिपाठात वाजवले जाणारे अस्सल कांस्य धातूचे खणखणीत टाळ आणि सुबक लाकडी चिपळ्या. भजन गाताना हाताला एक वेगळाच ताल व चैतन्य मिळते.',
    },
    spiritualBenefit: {
      en: 'Rhythmic clapping of Taal purifies mind, dissolves depression, and unites soul with Vitthal.',
      hi: 'टाळ की लयबद्ध ध्वनि से मन का अवसाद मिटता है और भक्ति रस की वर्षा होती है।',
      mr: 'टाळांच्या तालाने मनातील चिंता दूर होते आणि देहभान हरपून नामस्मरण होते.',
    },
    inStock: true,
    imageIcon: '🎵',
    specifications: [
      { en: 'Metal: Resonant Kansa (Bell Bronze)', hi: 'धातु: कांस्य (कांसा)', mr: 'धातू: खणखणीत कांस्य (कासे)' },
      { en: 'Weight: Heavy weighted for authentic tone', hi: 'वजन: प्रामाणिक भारदस्त', mr: 'वजन: योग्य वजनाचे पारंपारिक टाळ' },
    ],
  },
  {
    id: 'dnyaneshwari-granth-hardbound',
    name: {
      en: 'Shri Dnyaneshwari (Bhavartha Deepika - Hardbound Marathi)',
      hi: 'श्री ज्ञानेश्वरी (भावार्थ दीपिका - सार्थ मराठी ग्रन्थ)',
      mr: 'श्री ज्ञानेश्वरी पावन ग्रंथ (सार्थ मराठी भावार्थदीपिका - सजिल्द प्रत)',
    },
    category: 'scriptures',
    price: 450,
    originalPrice: 650,
    rating: 5.0,
    reviewsCount: 710,
    badge: { en: 'Spiritual Gem', hi: 'अमर ग्रन्थ', mr: 'अमर ग्रंथ' },
    description: {
      en: 'Sant Dnyaneshwar Maharaj’s immortal Marathi commentary on the Bhagavad Gita. Complete 18 Adhyayas with word-to-word Marathi translation.',
      hi: 'संत ज्ञानेश्वर महाराज विरचित अमर ग्रन्थ। भगवद्गीता के १८ अध्यायों का रसाळ मराठी भावार्थ।',
      mr: 'संत ज्ञानेश्वर महाराजांनी वयाच्या अवघ्या १६ व्या वर्षी रचलेली मराठीतील अमृतमयी गीता टीका. संपूर्ण १८ अध्याय, ओवी व सोपा मराठी भावार्थ.',
    },
    spiritualBenefit: {
      en: 'Reading even one Ovi daily eliminates worldly sorrow and grants supreme wisdom.',
      hi: 'नित्य एक ओवी का पठन भी जीवन में असीम शांति एवं आत्मज्ञान प्रदान करता है।',
      mr: 'नित्य ज्ञानेश्वरी वाचनाने घरातील संकटे निवारण होऊन आत्मशांती लाभते.',
    },
    inStock: true,
    imageIcon: '📖',
    specifications: [
      { en: 'Pages: 920 pages (Gold foil hardbound)', hi: 'पृष्ठ: ९२० सजिल्द', mr: 'पृष्ठे: ९२० (सजिल्द बांधणी, सोनेरी अक्षरे)' },
      { en: 'Language: Classical Marathi Ovi + Modern Simple Marathi', hi: 'भाषा: ओवी व सरल मराठी', mr: 'भाषा: मूळ ओवी व सोपा मराठी अर्थ' },
    ],
  },
  {
    id: 'tukaram-gatha-complete',
    name: {
      en: 'Shri Tukaram Gatha (Complete 4,500 Abhangas with Meaning)',
      hi: 'श्री तुकाराम गाथा (सम्पूर्ण ४,५०० अभंग संग्रह)',
      mr: 'श्री तुकाराम गाथा (अखंड ४,५०० अभंग - सविस्तर सार्थ आवृत्ती)',
    },
    category: 'scriptures',
    price: 499,
    originalPrice: 750,
    rating: 4.9,
    reviewsCount: 480,
    description: {
      en: 'The definitive sacred collection of Jagadguru Sant Tukaram Maharaj’s divine Abhangas. Complete with indices and explanations.',
      hi: 'जगद्गुरु संत तुकाराम महाराज के साक्षात्कारी अभंगों का पावन महासागर।',
      mr: 'जगद्गुरू संत तुकाराम महाराजांचे सर्व ४,५०० अभंग. आचार, विचार, समता आणि विठ्ठल भक्तीचा अलौकिक साठा.',
    },
    spiritualBenefit: {
      en: 'Gives fearlessness, moral clarity, and unbroken loving devotion to God.',
      hi: 'निर्भयता, सत्यनिष्ठा और ईश्वर में अनन्य प्रेम का संचार।',
      mr: 'सत्य, निर्भयता आणि पांडुरंगाच्या चरणी लीन होण्याची शक्ती मिळते.',
    },
    inStock: true,
    imageIcon: '📜',
    specifications: [
      { en: 'Abhanga Count: 4,500+ Authentic Verses', hi: 'अभंग: ४,५००+', mr: 'अभंग संख्या: ४,५०० हून अधिक' },
      { en: 'Binding: Premium Deluxe Hardcover', hi: 'जिल्द: सुंदर हार्डकवर', mr: 'बांधणी: मजबूत डिलक्स हार्डबाउंड' },
    ],
  },
  {
    id: 'saffron-varkari-pataka',
    name: {
      en: 'Consecrated Saffron Varkari Pataka (Wari Flag with Sacred Print)',
      hi: 'पावन भगवा वारकरी ध्वज (पताका)',
      mr: 'मानाची भगवी वारकरी पताका (वारी ध्वज)',
    },
    category: 'varkari',
    price: 149,
    originalPrice: 250,
    rating: 4.8,
    reviewsCount: 310,
    description: {
      en: 'Sacred double-pointed saffron silk flag with "Om Namo Bhagawate Vasudevaya" and Vitthal-Mauli emblem. Carried in Wari or placed at home temple.',
      hi: 'विठ्ठल-माऊली के पावन चिह्नों से सुशोभित भगवा रेशमी ध्वज। घर के मंदिर अथवा पदयात्रा हेतु।',
      mr: 'दोन टोक असलेली सात्विक रेशमी भगवी पताका. खांद्यावर किंवा घराच्या देवघरात फडकावण्यासाठी अत्यंत मंगलकारी मानली जाते.',
    },
    spiritualBenefit: {
      en: 'Symbol of surrender, selflessness, and the eternal victory of Dharma.',
      hi: 'समर्पण, त्याग और धर्म की विजय का पावन प्रतीक।',
      mr: 'अहंकाराचे विसर्जन करून भक्तीचा विजय दर्शवणारा पवित्र ध्वज.',
    },
    inStock: true,
    imageIcon: '🚩',
    specifications: [
      { en: 'Fabric: Premium Silky Saffron Blend', hi: 'कपड़ा: रेशमी भगवा', mr: 'कापड: चमकदार सात्विक भगवे रेशमी' },
      { en: 'Size: 3.5 ft x 2 ft Standard Dindi size', hi: 'आकार: ३.५ फूट x २ फूट', mr: 'आकार: ३.५ फूट x २ फूट' },
    ],
  },
];


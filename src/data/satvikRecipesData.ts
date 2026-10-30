export interface SatvikRecipe {
  id: string;
  title: { en: string; hi: string; mr: string };
  category: 'naivedya' | 'upvas' | 'sweet' | 'panchamrit';
  prepTime: string;
  cookTime: string;
  servings: string;
  deityAssociated: { en: string; hi: string; mr: string };
  significance: { en: string; hi: string; mr: string };
  ingredients: { name: { en: string; hi: string; mr: string }; quantity: string }[];
  steps: { en: string; hi: string; mr: string }[];
  healthTip: { en: string; hi: string; mr: string };
}

export interface FastingRule {
  category: { en: string; hi: string; mr: string };
  allowedItems: string[];
  prohibitedItems: string[];
  scientificReason: { en: string; hi: string; mr: string };
}

export const satvikRecipesList: SatvikRecipe[] = [
  // 1. Ukadiche Modak
  {
    id: 'ukadiche-modak',
    title: { en: 'Authentic Maharashtrian Ukadiche Modak', hi: 'पारंपरिक उकडीचे मोदक', mr: 'पारंपरिक सुगंधी उकडीचे मोदक (२१ कळ्यांचे)' },
    category: 'naivedya',
    prepTime: '25 min',
    cookTime: '15 min',
    servings: '11-21 Modaks',
    deityAssociated: { en: 'Lord Ganesha (गणपती बाप्पा)', hi: 'भगवान गणेश', mr: 'श्री गणेश (गणपती बाप्पा)' },
    significance: {
      en: 'The supreme sacred offering to Lord Ganesha. Symbolizes sweet divine wisdom enveloped in pure white consciousness (pure steamed rice flour).',
      hi: 'गणेश जी का परम प्रिय भोग। २१ कणियों का मोदक जीवन में विघ्नमुक्ति और मंगलकारी बुद्धि का प्रतीक है।',
      mr: 'गणपती बाप्पाचा सर्वात लाडका नैवेद्य. २१ कळ्यांचा मऊ उकडीचा मोदक आणि त्यावर साजूक तुपाची धार हा महाराष्ट्राचा मंगल संस्कार आहे.'
    },
    ingredients: [
      { name: { en: 'Aromatic Indrayani/Ambemohar Rice Flour', hi: 'आंबेमोहर चावल का बारीक आटा', mr: 'आंबेमोहर/इंद्रायणी सुवासिक तांदळाची बारीक पिठी' }, quantity: '२ वाट्या' },
      { name: { en: 'Fresh Grated Coconut', hi: 'ताज़ा कसा हुआ नारियल', mr: 'ओले खोवलेले खोबरे' }, quantity: '२ वाट्या' },
      { name: { en: 'Organic Jaggery (Gul)', hi: 'बारीक गुड़', mr: 'सेंद्रिय पिवळा गूळ (चिरलेला)' }, quantity: '१ ते १.२५ वाटी' },
      { name: { en: 'Pure Cow Ghee', hi: 'गाय का शुद्ध घी', mr: 'गायीचे साजूक तूप' }, quantity: '२ चमचे' },
      { name: { en: 'Cardamom & Nutmeg Powder', hi: 'इलायची व जायफल पाउडर', mr: 'वेलची व जायफळ पूड' }, quantity: '१ छोटा चमचा' },
      { name: { en: 'Warm Water + Milk', hi: 'गुनगुना पानी व दूध', mr: '२ वाट्या पाणी + २ चमचे दूध' }, quantity: '२ वाट्या' }
    ],
    steps: [
      {
        en: 'Boil water with a pinch of salt, 2 drops of milk, and 1 tsp ghee. Gradually add rice flour stirring continuously without lumps. Cover and steam (Ukad) for 5 minutes on low flame.',
        hi: 'पानी में चुटकी भर नमक, दूध व घी डालकर उबालें। तांदळाचे पीठ डालकर हिलाएं और ५ मिनट ढककर भाप (उकड) दें।',
        mr: 'पाण्यात चिमूटभर मीठ, २ चमचे दूध आणि १ चमचा तूप घालून उकळी आणा. गॅस मंद करून तांदळाची पिठी हळूहळू घाला व न गुठळ्या होता ढवळा. झाकण ठेवून ५ मिनिटे छान उकड काढा.'
      },
      {
        en: 'For stuffing (Saran): Heat 1 tsp ghee, add grated coconut and jaggery. Cook until jaggery melts and mixture thickens gently. Stir in cardamom and nutmeg powder.',
        hi: 'सारण तैयार करें: पैन में घी गर्म कर कसा नारियल व गुड़ मिलाएं। गाढ़ा होने पर इलायची पाउडर मिलाएं।',
        mr: 'सारण तयार करा: कढईत १ चमचा तूप गरम करून किसलेले खोबरे व गूळ परता. गूळ विरघळून सारण मऊ झाले की त्यात वेलची-जायफळ पूड मिसळा.'
      },
      {
        en: 'Knead the warm dough with water and ghee until completely smooth and crack-free.',
        hi: 'उकड़ को गुनगुने पानी का हाथ लगाकर एकदम चिकना व मुलायम गूंथ लें।',
        mr: 'उकड परातीत काढून पाण्याचा व तुपाचा हात लावून मऊसूत, एकजीव मळून घ्या जेणेकरून मोदकाला तडे जाणार नाहीत.'
      },
      {
        en: 'Shape round pedhas, flatten into thin cups (pari), shape 21 pleats, fill Saran stuffing, bring edges together to a pointed apex.',
        hi: 'लोई बनाकर पतली कटोरी का आकार दें, २१ कलियां बनाएं, सारण भरें और ऊपर से बंद करें।',
        mr: 'पिठाची छोटी पारी बनवून बोटांच्या सहाय्याने पातळ वाटी करा. २१ कळ्या पाडा, मधोमध सारण भरा आणि हळुवार टोक एकत्र आणून मोदक बंद करा.'
      },
      {
        en: 'Dip in water and steam for 10-12 minutes on banana leaf / haldi leaf. Serve hot with a golden stream of pure cow ghee.',
        hi: 'केले के पत्ते पर रखकर १०-१२ मिनट भाप में पकाएं। ऊपर से शुद्ध देसी घी डालकर भोग लगाएं।',
        mr: 'चाळणीत हळदीचे किंवा केळीचे पान ठेवून १०-१२ मिनिटे वाफवून घ्या. गरम मोदकावर साजूक तुपाची धार सोडून बाप्पाला नैवेद्य दाखवा.'
      }
    ],
    healthTip: {
      en: 'Steamed food without deep frying. Jaggery purifies blood and coconut provides healthy fats.',
      hi: 'बिना तेल-तलने का भाप से बना सुपाच्य सात्विक आहार।',
      mr: 'तेलाविना वाफवलेला सात्त्विक आहार. गूळ व खोबरे शरीरास ऊर्जा आणि रोगप्रतिकारशक्ती देतात.'
    }
  },

  // 2. Satyanarayan Mahaprasad Sheera
  {
    id: 'satyanarayan-sheera',
    title: { en: 'Shri Satyanarayan Mahaprasad Sheera (Sawa-Vati Proportion)', hi: 'श्री सत्यनारायण सवा-प्रमाण महाप्रसाद शीरा', mr: 'श्री सत्यनारायण पूजा सवा-प्रमाणाचा मखमली महाप्रसाद शिरा' },
    category: 'naivedya',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: '10-12 Devotees',
    deityAssociated: { en: 'Lord Vishnu / Satyanarayan', hi: 'भगवान श्री सत्यनारायण', mr: 'भगवान श्री सत्यनारायण (श्रीविष्णू)' },
    significance: {
      en: 'Prepared strictly according to ancient "Sawa" (1.25) proportions: 1.25 cup Rava, 1.25 cup Ghee, 1.25 cup Sugar, 1.25 cup Milk. Blessed with Tulsi and banana pieces.',
      hi: 'सवा भाग के पवित्र अनुपात (सवा वाटी रवा, घी, शक्कर, दूध) से बना महाप्रसाद।',
      mr: 'स्कंद पुराणातील सत्यनारायण व्रतानुसार सवा वाटी रवा, सवा वाटी साजूक तूप, सवा वाटी साखर आणि सवा वाटी दूध या पवित्र प्रमाणातील महाप्रसाद.'
    },
    ingredients: [
      { name: { en: 'Semolina (Rava / Suji)', hi: 'बारीक सूजी (रवा)', mr: 'बारीक रवा' }, quantity: '१.२५ वाटी (सवा वाटी)' },
      { name: { en: 'Pure Desi Cow Ghee', hi: 'शुद्ध देशी घी', mr: 'गायीचे साजूक तूप' }, quantity: '१.२५ वाटी (सवा वाटी)' },
      { name: { en: 'Sugar / Khaand', hi: 'खड़ी शक्कर', mr: 'साखर' }, quantity: '१.२५ वाटी (सवा वाटी)' },
      { name: { en: 'Boiling Hot Milk', hi: 'उबलता हुआ दूध', mr: 'उकळते दूध' }, quantity: '२.५ ते ३ वाट्या' },
      { name: { en: 'Ripe Banana (Finely chopped)', hi: 'पका केला टुकड़ों में', mr: 'पिकलेले केळे (बारीक चकत्या)' }, quantity: '१ नग' },
      { name: { en: 'Cashews, Almonds, Raisins, Charoli', hi: 'काजू, बादाम, किशमिश, चारोली', mr: 'काजू, बदाम, मनुके, चारोळी' }, quantity: '२ चमचे' },
      { name: { en: 'Sacred Tulsi Leaves (तुळशीपत्र)', hi: 'तुलसी पत्र', mr: 'पावन तुळशीपत्र' }, quantity: '५-७ पाने' }
    ],
    steps: [
      {
        en: 'Heat pure cow ghee in a heavy kadhai, roast cashews and raisins and remove. Add banana pieces into the ghee and roast for 1 minute.',
        hi: 'कड़ाही में घी गर्म कर काजू-किशमिश भूनें, फिर कटे केले डालकर हल्के भूनें।',
        mr: 'कढईत साजूक तूप गरम करून काजू, बदाम, मनुके तळून बाजूला काढा. त्याच तुपात केळ्याच्या चकत्या १ मिनिट परतून घ्या.'
      },
      {
        en: 'Add semolina (Rava) to the ghee and roast on gentle low heat for 12-15 minutes until it turns aromatic, golden pink and ghee separates.',
        hi: 'धीमी आंच पर रवा को १२-१५ मिनट सुनहरा व सुगंधित होने तक भूनें।',
        mr: 'आता रवा घालून मंद आचेवर सलग १२-१५ मिनिटे गुलाबी रंगावर खमंग भाजा. रव्यातून तूप सुटू लागेल व सुवास दरवळेल.'
      },
      {
        en: 'Pour boiling hot milk carefully. Stir continuously to prevent lumps until the semolina absorbs all milk and becomes soft and velvety.',
        hi: 'उबलता हुआ दूध डालकर लगातार हिलाएं जब तक सूजी दूध सोख न ले।',
        mr: 'यात उकळते गरम दूध हळूहळू ओता आणि रवा दुधात छान मऊ होईपर्यंत ढवळा. २ मिनिटे झाकण ठेवून वाफ काढा.'
      },
      {
        en: 'Add sugar, roasted nuts, and cardamom powder. Stir well until sugar dissolves into a glistening velvet prasad.',
        hi: 'शक्कर व सूखे मेवे मिलाकर ढक दें। ऊपर से तुलसी पत्र अर्पित करें।',
        mr: 'शेवटी साखर आणि तळलेला सुकामेवा मिसळा. साखर विरघळल्यावर शिरा चमकदार होतो. शेवटी वरून पावन तुळशीपत्र वाहून नैवेद्य दाखवा.'
      }
    ],
    healthTip: {
      en: 'Nutrient-rich holy prasad with wholesome unrefined ghee and dry fruits.',
      hi: 'सात्विक, शक्तिवर्धक एवं पाचन में सुगम।',
      mr: 'गायीचे साजूक तूप आणि केळ्यामुळे शरीराला त्वरित सात्त्विक ऊर्जा मिळते.'
    }
  },

  // 3. Ekadashi Bhagar (Variche Tandul) & Shengdana Amti
  {
    id: 'ekadashi-bhagar-amti',
    title: { en: 'Ekadashi Variche Tandul (Bhagar) & Shengdana Amti', hi: 'एकादशी भगर एवं मूंगफली आमटी', mr: 'एकादशी विशेष वरीचे तांदूळ (भगर) व दाण्याची घट्ट आमटी' },
    category: 'upvas',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: '3-4 Persons',
    deityAssociated: { en: 'Lord Vitthal / Ekadashi Vrat', hi: 'भगवान विट्ठल (एकादशी व्रत)', mr: 'विठू माऊली (आषाढी / कार्तिकी एकादशी)' },
    significance: {
      en: 'The classic Maharashtrian Ekadashi fasting staple. Light on the stomach, highly nourishing, and adheres strictly to fasting guidelines.',
      hi: 'एकादशी एवं महाशिवरात्रि का मुख्य उपवास आहार। पाचक, पौष्टिक एवं सात्विक।',
      mr: 'वारकरी परंपरेतील एकादशी व्रताचा मुख्य सात्त्विक फराळ. पचायला अत्यंत हलका आणि दिवसभर ऊर्जा देणारा आहार.'
    },
    ingredients: [
      { name: { en: 'Barnyard Millet (Variche Tandul / Bhagar)', hi: 'भगर (सामक चावल)', mr: 'वरीचे तांदूळ (भगर)' }, quantity: '१ वाटी' },
      { name: { en: 'Roasted Peanuts Powder', hi: 'भुनी मूंगफली का कूट', mr: 'भाजलेल्या शेंगदाण्याचा कूट' }, quantity: '१ वाटी' },
      { name: { en: 'Green Chillies & Cumin (Jeera)', hi: 'हरी मिर्च एवं जीरा', mr: 'हिरव्या मिरच्या व जिरे' }, quantity: '२ चमचे' },
      { name: { en: 'Rock Salt (Sendha Namak)', hi: 'सेंधा नमक (उपवास मीठ)', mr: 'सेंधव मीठ' }, quantity: 'चवीनुसार' },
      { name: { en: 'Cow Ghee for Tadka', hi: 'देसी घी तड़का', mr: 'साजूक तूप फोडणीसाठी' }, quantity: '२ चमचे' },
      { name: { en: 'Boiled Potato & Fresh Coconut', hi: 'उबला आलू व नारियल', mr: 'उकडलेला बटाटा व ओले खोबरे' }, quantity: 'अर्धी वाटी' }
    ],
    steps: [
      {
        en: 'For Bhagar: Wash Variche Tandul cleanly. In a pan heat 1 tbsp ghee, add cumin and green chillies. Add bhagar, roast for 2 mins, then add 2.5 cups hot water and rock salt. Cook on low flame until fluffy.',
        hi: 'घी में जीरा व हरी मिर्च तड़काएं। भगर डालकर भूनें, फिर गर्म पानी व सेंधा नमक डालकर ढककर पकाएं।',
        mr: 'भगर बनवणे: वरीचे तांदूळ स्वच्छ धुवून घ्या. पातेल्यात तूप गरम करून जिरे व मिरचीची फोडणी द्या. भगर २ मिनिटे परता, अडीच वाट्या गरम पाणी व सेंधव मीठ घालून मऊ भातासारखी शिजवून घ्या.'
      },
      {
        en: 'For Amti: In a mixer grind roasted peanut powder, 2 green chillies, and warm water. In a pot heat 1 tbsp ghee, add cumin, pour the peanut mixture, add boiled potato slices and kokum/lemon for tanginess.',
        hi: 'आमटी: मूंगफली कूट, मिर्च व पानी का घोल बनाएं। घी में जीरा डालकर घोल पकाएं, उबला आलू व सेंधा नमक मिलाएं।',
        mr: 'आमटी बनवणे: शेंगदाण्याचा कूट आणि मिरच्या पाणी घालून थोडे वाटून घ्या. पातेल्यात तुपाची फोडणी देऊन हे मिश्रण ओता, उकडलेल्या बटाट्याच्या फोडी आणि आंबटपणासाठी आमसूल/कोकम घाला.'
      },
      {
        en: 'Simmer the amti for 5 minutes until creamy and aromatic. Serve hot with steamed Bhagar.',
        hi: '५ मिनट उबालें। गरमागरम भगर के साथ परोसें।',
        mr: 'आमटीला छान उकळी फुटू द्या. गरम वरीच्या भातावर ही दाण्याची आमटी घालून उपवासाला आनंद घ्या.'
      }
    ],
    healthTip: {
      en: 'High in fiber, gluten-free, low glycemic index, perfect for sustained fasting stamina.',
      hi: 'ग्लूटेन-मुक्त, फाइबर से भरपूर और रक्त शर्करा नियंत्रित रखने वाला उत्तम उपवास भोजन।',
      mr: 'फायबरयुक्त आणि ग्लुटेन-फ्री असल्यामुळे रक्तातील साखर वाढत नाही आणि थकवा येत नाही.'
    }
  },

  // 4. Panchamrit (Holy Nectar for Abhishek)
  {
    id: 'panchamrit',
    title: { en: 'Pavitra Panchamrit (Divine 5 Nectars)', hi: 'पवित्र पंचामृत विधि', mr: 'पवित्र पंचामृत (अभिषेक व नैवेद्य)' },
    category: 'panchamrit',
    prepTime: '5 min',
    cookTime: '0 min',
    servings: '5-6 Persons',
    deityAssociated: { en: 'All Deities (Shivling, Ganesha, Vitthal)', hi: 'समस्त देवी-देवता अभिषेक', mr: 'सर्व पावन देव-देवता' },
    significance: {
      en: 'The five sacred nectars: Milk (purity), Curd (prosperity), Honey (sweetness), Ghee (strength), and Sugar (bliss). Used for holy Abhishek and consumed as divine Prasad.',
      hi: 'दूध, दही, घी, शहद एवं शर्करा का पावन संगम। शिवलिंग व गणेश जी के अभिषेक हेतु अनिवार्य।',
      mr: 'दूध (पवित्रता), दही (समृद्धी), तूप (आरोग्य), मध (माधुर्य) आणि साखर (आनंद) या पंचामृताने देवाला स्नान घातले जाते व ते तीर्थ म्हणून प्राशन केले जाते.'
    },
    ingredients: [
      { name: { en: 'Raw Cow Milk (Unboiled)', hi: 'गाय का कच्चा दूध', mr: 'गायीचे ताजे कच्चे दूध' }, quantity: '१ वाटी' },
      { name: { en: 'Fresh Cow Curd (Dahi)', hi: 'ताज़ा दही', mr: 'ताजे गोड दही' }, quantity: '२ मोठे चमचे' },
      { name: { en: 'Pure Honey (Madh)', hi: 'शुद्ध शहद (मध)', mr: 'शुद्ध मध' }, quantity: '१ चमचा' },
      { name: { en: 'Pure Desi Cow Ghee', hi: 'गाय का शुद्ध घी', mr: 'गायीचे साजूक तूप' }, quantity: '१ छोटा चमचा' },
      { name: { en: 'Sugar / Mishri Powder', hi: 'मिश्री / शक्कर', mr: 'साखर / खडीसाखर पूड' }, quantity: '१ चमचा' }
    ],
    steps: [
      {
        en: 'Take a silver, brass, or copper cup. Add fresh cow milk first.',
        hi: 'चांदी अथवा पीतल के पात्र में पहले कच्चा गाय का दूध लें।',
        mr: 'चांदीच्या किंवा पितळी पात्रात प्रथम ताजे गायीचे दूध घ्या.'
      },
      {
        en: 'Add fresh curd, pure honey, cow ghee, and sugar in exact order.',
        hi: 'क्रमशः दही, शहद, घी एवं शर्करा मिलाएं।',
        mr: 'त्यात क्रमाने ताजे दही, शुद्ध मध, साजूक तूप आणि साखर घाला.'
      },
      {
        en: 'Stir gently with a clean Tulsi leaf or silver spoon while chanting "Om Namah Shivaya" or "Om Gam Ganapataye Namaha".',
        hi: 'तुलसी दल से धीरे-धीरे मिलाते हुए मंत्रोच्चार करें।',
        mr: 'तुळशीच्या पानाने किंवा चांदीच्या चमच्याने हळुवार एकत्र करा. देवाला अभिषेक करून उरलेले पंचामृत सर्वांना तीर्थ म्हणून वाटा.'
      }
    ],
    healthTip: {
      en: 'Potent Ayurvedic probiotic powerhouse and immunity rejuvenator.',
      hi: 'आयुर्वेदिक दृष्टि से सर्वोत्तम रोगप्रतिरोधक रसायन।',
      mr: 'आयुर्वेदानुसार पंचामृत शरीराची रोगप्रतिकारशक्ती आणि चेतना जागृत करणारे सात्त्विक रसायन आहे.'
    }
  }
];

export const fastingGuidelines: FastingRule[] = [
  {
    category: {
      en: 'Grains & Flours (अन्न व धान्य)',
      hi: 'अन्न एवं आटा',
      mr: 'धान्य व पिठे'
    },
    allowedItems: [
      'वरीचे तांदूळ (भगर / सामक)',
      'साबुदाणा (Sago)',
      'राजगिरा (Amaranth / राजगिरा पीठ)',
      'शिंगाड्याचे पीठ (Water Chestnut Flour)'
    ],
    prohibitedItems: [
      'गहू व मैदा (Wheat & Maida)',
      'तांदूळ (White Rice)',
      'ज्वारी, बाजरी, मका',
      'कोणत्याही डाळी व कडधान्ये (Lentils)'
    ],
    scientificReason: {
      en: 'Fasting rests the digestive system. Heavy complex grains require high digestive fire which fasting aims to minimize.',
      hi: 'उपवास पाचन तंत्र को विश्राम देता है। भारी अनाज से पाचन पर बोझ बढ़ता है।',
      mr: 'उपवासाने पचनसंस्थेला विश्रांती मिळते. जड धान्यांमुळे पित्त व सुस्ती वाढते, तर भगर व राजगिरा पचायला सुलभ असतात.'
    }
  },
  {
    category: {
      en: 'Spices & Salt (मसाले व मीठ)',
      hi: 'मसाले एवं नमक',
      mr: 'मसाले व मीठ'
    },
    allowedItems: [
      'सेंधव मीठ (Rock Salt / Sendha Namak)',
      'जिरे (Cumin)',
      'काळे मिरे (Black Pepper)',
      'हिरवी मिरची (Green Chilli)',
      'आले (Ginger)'
    ],
    prohibitedItems: [
      'समुद्री पांढरे मीठ (Common Table Salt)',
      'हळद (Turmeric)',
      'मोहरी (Mustard Seeds)',
      'हिंग व गरम मसाला',
      'धने व मेथी'
    ],
    scientificReason: {
      en: 'Rock salt is unrefined and balances body electrolytes without increasing water retention or blood pressure during fasts.',
      hi: 'सेंधा नमक प्राकृतिक खनिज तत्वों से युक्त होता है और रक्तचाप को स्थिर रखता है।',
      mr: 'सेंधव मीठ हे नैसर्गिक पाषाणातून मिळते, ते शरीरातील पाणी टिकवून ठेवते आणि रक्तदाब नियंत्रणात ठेवते.'
    }
  },
  {
    category: {
      en: 'Vegetables & Prohibited Foods (भाज्या व वर्ज्य पदार्थ)',
      hi: 'सब्जियां एवं वर्ज्य',
      mr: 'भाज्या व वर्ज्य पदार्थ'
    },
    allowedItems: [
      'उकडलेला बटाटा (Potato)',
      'रताळे (Sweet Potato)',
      'भोपळा (Bottle gourd / Dudhi)',
      'काकडी (Cucumber)',
      'ताजे खोबरे व सर्व ताजी फळे'
    ],
    prohibitedItems: [
      'लसूण व कांदा (Garlic & Onion - strictly prohibited)',
      'वांगे, टोमॅटो, शेवगा',
      'पालेभाज्या (Leafy greens on Ekadashi)',
      'मशरूम व मांसाहार'
    ],
    scientificReason: {
      en: 'Onion and garlic are Rajasic and Tamasic, provoking anger, restlessness, and passion, counteracting the inner tranquility of fasting.',
      hi: 'प्याज और लहसुन तामसिक प्रवृत्ति बढ़ाते हैं, जिससे मन की एकाग्रता भंग होती है।',
      mr: 'कांदा आणि लसूण हे तामसिक असतात. त्यांच्या सेवनाने कामवासना व राग वाढतो, ज्यामुळे नामस्मरणातील मनाची एकाग्रता ढळते.'
    }
  }
];

export const fastingRulesDatabase = fastingGuidelines;

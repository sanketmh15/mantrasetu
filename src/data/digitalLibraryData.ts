export interface DigitalBook {
  id: string;
  title: { en: string; hi: string; mr: string };
  author: string;
  language: 'mr' | 'sa' | 'hi' | 'en';
  languageName: string;
  subject: 'Vedanta & Gita' | 'Sant Sahitya' | 'Bhakti & Stotra' | 'Puranas & Itihasa' | 'Ethics & Meditation';
  format: 'scripture' | 'audiobook' | 'manuscript';
  totalChapters: number;
  iconEmoji: string;
  summary: { en: string; hi: string; mr: string };
  sampleVerses: {
    chapter: string;
    verseNo: string;
    originalText: string;
    meaning: { en: string; hi: string; mr: string };
  }[];
}

export const digitalLibraryDatabase: DigitalBook[] = [
  // 1. Shrimad Dnyaneshwari (Bhavarth Deepika)
  {
    id: 'dnyaneshwari',
    title: {
      en: 'Shrimad Bhavarth Deepika (Dnyaneshwari)',
      hi: 'श्रीमद् भावार्थ दीपिका (ज्ञानेश्वरी)',
      mr: 'श्रीमद् भावार्थ दीपिका (ज्ञानेश्वरी)'
    },
    author: 'Sant Dnyaneshwar Maharaj (संत ज्ञानेश्वर माऊली)',
    language: 'mr',
    languageName: 'प्राकृत मराठी (Prakrit Marathi)',
    subject: 'Vedanta & Gita',
    format: 'scripture',
    totalChapters: 18,
    iconEmoji: '📜',
    summary: {
      en: 'Composed in 1290 CE at Nevasa on the banks of Pravara. The monumental commentary translating the 700 verses of Bhagavad Gita into 9,033 radiant Marathi Ovis.',
      hi: '१२९० ई. में नेवासा में रचित। श्रीमद्भगवद्गीता के ७०० श्लोकों का ९,०३३ ओवियों में किया गया अमर भाष्य।',
      mr: 'इ.स. १२९० मध्ये नेवासा येथे पैस खांबाला टेकून लिहिलेला ग्रंथ. गीतेच्या ७०० श्लोकांवर ९,०३३ प्राकृत मराठी ओव्यांचे अमृतासारखे भाष्य.'
    },
    sampleVerses: [
      {
        chapter: 'अध्याय १८ (पसायदान)',
        verseNo: 'ओवी १७९४-१७९८',
        originalText: 'आता विश्वात्मके देवे । येणे वाग्यज्ञे तोषावे । तोषोनि मज द्यावे । पसायदान हे ॥ जे खळांची व्यंकटी सांडो । तया सत्कर्मी रती वाढो । भूतां परस्परे पडो । मैत्र जीवांचे ॥',
        meaning: {
          en: 'Now may the Divine Soul of the Universe be pleased with this literary sacrifice of mine, and bestow upon me this blessing: May the crookedness of the wicked fall away, may their love for noble deeds blossom, and may all living beings cultivate heartfelt friendship with one another.',
          hi: 'अब इस वाग्यज्ञ से विश्वात्मा प्रसन्न होकर मुझे यह पसायदान दें: दुष्टों की कुटिलता नष्ट हो, सत्कर्म में उनकी प्रीति बढ़े, और सम्पूर्ण प्राणियों में परस्पर अगाध मैत्री हो।',
          mr: 'आता या ज्ञानयज्ञाने विश्वात्मक परमेश्वर संतुष्ट होवो आणि मला हे पसायदान देवो: दुर्जनांचे दुष्टपण गळून पडो, सत्कर्माची आवड वाढो, आणि सर्व प्राण्यांमध्ये जिवाभावाची मैत्री निर्माण होवो.'
        }
      }
    ]
  },

  // 2. Shri Dasbodh
  {
    id: 'dasbodh',
    title: {
      en: 'Shri Dasbodh (Grantharaj Dasbodh)',
      hi: 'श्री दासबोध',
      mr: 'ग्रंथराज श्रीमद् दासबोध'
    },
    author: 'Samarth Ramdas Swami (समर्थ रामदास स्वामी)',
    language: 'mr',
    languageName: 'मराठी (Marathi)',
    subject: 'Ethics & Meditation',
    format: 'audiobook',
    totalChapters: 20, // 20 Dashakas, 200 Samasas
    iconEmoji: '🛡️',
    summary: {
      en: 'Dictated at Shivthar Ghal cave. A masterwork combining non-dual Vedanta with practical living, spiritual effort (Prapancha and Paramartha), duty, and courage.',
      hi: 'शिवथर घल की गुफा में समर्थ रामदास द्वारा रचित। प्रपंच और परमार्थ का अद्भुत संतुलन सिखाने वाला व्यावहारिक ग्रंथ।',
      mr: 'शिवथर घळीत समर्थांनी कल्याण स्वामींना सांगितलेला ग्रंथराज. प्रपंच आणि परमार्थ दोन्ही नेटके कसे करावे, प्रयत्नवाद आणि आत्मज्ञान शिकवणारा अद्वितीय ग्रंथ.'
    },
    sampleVerses: [
      {
        chapter: 'दशक १, समास १ (ग्रंभारंभ लक्षण)',
        verseNo: 'ओवी १',
        originalText: 'श्रोते व्हावे सावधान । आता सांगतो उत्तम गुण । जेणेकरिता बाणे खूण । सर्वज्ञपणाची ॥ प्रपंची जो सावधान । तोचि परमार्थ करील जाण ।',
        meaning: {
          en: 'O listeners, pay heed! I now expound noble virtues which awaken universal awareness. He who is diligent and righteous in practical life is truly fit for supreme spiritual wisdom.',
          hi: 'हे श्रोताओं! सावधान होकर सुनो, मैं उन उत्तम गुणों का वर्णन कर रहा हूँ जिनसे ज्ञान की प्राप्ति होती है। जो सांसारिक कर्तव्य में सजग है, वही सच्चा पारमार्थिक है।',
          mr: 'श्रोत्यांनी एकाग्र चित्ताने ऐकावे, मी अशा उत्तम गुणांचे विवेचन करतो ज्यामुळे शहाणपण प्राप्त होते. जो आपल्या संसारात सावध असतो, तोच खऱ्या अर्थाने परमार्थात यशस्वी होतो.'
        }
      }
    ]
  },

  // 3. Sant Tukaram Maharajanche Abhang (Gatha)
  {
    id: 'tukaram_gatha',
    title: {
      en: 'Sant Tukaram Maharaj Gatha (4,500 Abhangas)',
      hi: 'संत तुकाराम गाथा',
      mr: 'संत तुकाराम महाराज गाथा (४,५०० अभंग)'
    },
    author: 'Jagadguru Sant Tukaram Maharaj (जगद्गुरू संत तुकाराम महाराज)',
    language: 'mr',
    languageName: 'मराठी (Marathi)',
    subject: 'Sant Sahitya',
    format: 'manuscript',
    totalChapters: 1, // Single massive compendium
    iconEmoji: '🪕',
    summary: {
      en: 'The legendary compendium of 4,500 devotional poems that miraculously floated back ashore dry from the waters of Indrayani River after 13 days.',
      hi: 'इंद्रायणी नदी में डुबाए जाने पर भी १३ दिन बाद जो जल पर तैरती हुई प्रकट हुई, ऐसे ४,५०० अभंगों का पावन संग्रह।',
      mr: 'इंद्रायणीच्या डोहात बुडवूनही १३ दिवसांनी कोरडी बाहेर आलेली अमृतवाणी! सामान्यांच्या जगण्याला ईश्वरी भक्तीचे पंख देणारे साडेचार हजार अभंग.'
    },
    sampleVerses: [
      {
        chapter: 'अभंग संग्रह',
        verseNo: 'अभंग १',
        originalText: 'जे का रंजले गांजले । त्यांसी म्हणे जो आपुले । तोचि साधू ओळखावा । देव तेथेचि जाणावा ॥',
        meaning: {
          en: 'He who embraces the distressed, down-trodden, and suffering as his own kin — recognize him alone as a true saint; God dwells right there.',
          hi: 'जो दुखियों और पीड़ितों को अपना मानकर गले लगाता है, वही सच्चा संत है और ईश्वर वहीं साक्षात वास करते हैं।',
          mr: 'जो दुःखी, कष्टी व उपेक्षितांना प्रेमाने आपले मानतो, त्यालाच खरा साधू समजावे; देव मंदिरात नसून अशा संतांच्या अंतःकरणात साक्षात वास करतो.'
        }
      }
    ]
  },

  // 4. Shrimad Bhagavad Gita (Sanskrit Original)
  {
    id: 'bhagavad_gita',
    title: {
      en: 'Shrimad Bhagavad Gita (700 Verses)',
      hi: 'श्रीमद्भगवद्गीता (मूल संस्कृत श्लोक)',
      mr: 'श्रीमद्भगवद्गीता (मूळ संस्कृत श्लोक व अर्थ)'
    },
    author: 'Bhagavan Veda Vyasa (भगवान वेदव्यास)',
    language: 'sa',
    languageName: 'संस्कृत (Sanskrit)',
    subject: 'Vedanta & Gita',
    format: 'scripture',
    totalChapters: 18,
    iconEmoji: '🏹',
    summary: {
      en: 'The eternal song of God spoken by Lord Krishna to Arjuna on the battlefield of Kurukshetra, illuminating Karma Yoga, Bhakti Yoga, and Jnana Yoga.',
      hi: 'कुरुक्षेत्र की रणभूमि में भगवान श्रीकृष्ण द्वारा अर्जुन को दिया गया आत्मज्ञान और कर्मयोग का शाश्वत संदेश।',
      mr: 'कुरुक्षेत्रावर भगवान श्रीकृष्णांनी अर्जुनाला सांगितलेले कर्मयोग, भक्तियोग व ज्ञानयोगाचे शाश्वत अमृत तत्त्वज्ञान.'
    },
    sampleVerses: [
      {
        chapter: 'अध्याय २ (सांख्य योग)',
        verseNo: 'श्लोक ४७',
        originalText: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
        meaning: {
          en: 'You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction.',
          hi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फल में कभी नहीं। अतः फल की इच्छा से कर्म मत करो और न ही कर्म त्याग में आसक्ति रखो।',
          mr: 'तुझा अधिकार केवळ तुझे कर्तव्य कर्म करण्यावर आहे, त्याच्या फळावर कधीही नाही. फळाची अपेक्षा ठेवून कर्म करू नकोस आणि कर्म न करण्याचा आळसही धरू नकोस.'
        }
      }
    ]
  }
];


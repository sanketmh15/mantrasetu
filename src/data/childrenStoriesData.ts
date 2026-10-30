export interface ChildStory {
  id: string;
  title: { en: string; hi: string; mr: string };
  deity: { en: string; hi: string; mr: string };
  ageGroup: string;
  iconEmoji: string;
  readTime: string;
  storyParagraphs: { en: string; hi: string; mr: string }[];
  moralLesson: { en: string; hi: string; mr: string };
  audioNarrationText: { en: string; hi: string; mr: string };
  quiz: {
    question: { en: string; hi: string; mr: string };
    options: { en: string; hi: string; mr: string }[];
    correctIndex: number;
    explanation: { en: string; hi: string; mr: string };
  };
  funActivity: { en: string; hi: string; mr: string };
}

export const childrenStoriesDatabase: ChildStory[] = [
  // 1. Bal Ganesha Pradakshina
  {
    id: 'ganesha_parents_pradakshina',
    title: {
      en: 'Bal Ganesha & The Race Around The Universe',
      hi: 'बाल गणेश और ब्रह्मांड की परिक्रमा',
      mr: 'बाल गणपती आणि जगाची प्रदक्षिणा'
    },
    deity: { en: 'Lord Ganesha', hi: 'श्री गणेश', mr: 'श्री गणेश बाप्पा' },
    ageGroup: '५ ते १२ वर्षे',
    iconEmoji: '🐘',
    readTime: '३ मिनिटे',
    storyParagraphs: [
      {
        en: 'Once upon a time, Sage Narada brought a divine fruit of wisdom to Mount Kailash. Both young Ganesha and his elder brother Kartikeya wished to have it.',
        hi: 'एक बार देवर्षि नारद कैलास पर्वत पर एक दिव्य फल लेकर आए। बाल गणेश और बड़े भाई कार्तिकेय दोनों ने उस फल को पाने की इच्छा व्यक्त की।',
        mr: 'एके दिवशी देवर्षी नारद कैलास पर्वतावर एक अतिशय सुंदर ज्ञानाचे फळ घेऊन आले. बाल गणपती आणि त्यांचे मोठे बंधू कार्तिकेय दोघांनाही ते हवे होते.'
      },
      {
        en: 'Lord Shiva and Mata Parvati announced a race: “Whoever flies around the entire universe three times and returns first shall receive the fruit.”',
        hi: 'भगवान शिव और माता पार्वती ने एक शर्त रखी: “जो सम्पूर्ण ब्रह्मांड की तीन बार परिक्रमा कर सबसे पहले लौटेगा, वही यह फल पाएगा।”',
        mr: 'महादेव व माता पार्वती म्हणाले: “जो कोणी संपूर्ण जगाची तीन वेळा सर्वात आधी प्रदक्षिणा घालून येईल, त्याला हे ज्ञानफळ मिळेल.”'
      },
      {
        en: 'Kartikeya immediately hopped onto his swift peacock (Mayura) and flew at lightning speed into space across galaxies and stars.',
        hi: 'कार्तिकेय अपने तीव्र मयूर वाहन पर सवार होकर बिजली की गति से ब्रह्मांड नापने निकल पड़े।',
        mr: 'कार्तिकेय लगेच आपल्या वेगाने उडणाऱ्या मोरावर बसले आणि आकाशात वाऱ्याच्या वेगाने पृथ्वीची प्रदक्षिणा करायला निघून गेले.'
      },
      {
        en: 'Wise little Ganesha had a tiny mouse. He smiled, walked gently around his loving mother Parvati and father Shiva three times with folded hands, and bowed deeply.',
        hi: 'बुद्धिमान बाल गणेश ने अपने नन्हे मूषक की चिंता नहीं की। उन्होंने माता-पिता शिव-पार्वती के चारों ओर हाथ जोड़कर श्रद्धा से तीन परिक्रमाएं कीं।',
        mr: 'आपल्या छोट्या गणपती बाप्पाकडे उंदीरमामा होते. बाप्पाने विचार केला आणि प्रेमाने आई पार्वती व वडील महादेवांच्या भोवती हात जोडून तीन प्रदक्षिणा घातल्या.'
      },
      {
        en: 'Ganesha said: “My parents represent my entire universe! Worshipping you is greater than flying across all creation.” Overjoyed, Shiva and Parvati awarded the divine fruit to Ganesha!',
        hi: 'गणेश जी ने कहा: “माता-पिता के चरणों में ही सम्पूर्ण ब्रह्मांड समाया है!” यह सुनकर शिव-पार्वती अत्यंत प्रसन्न हुए और फल गणेश जी को दिया।',
        mr: 'बाप्पा म्हणाले: “माझे आई-वडील हेच माझे संपूर्ण जग आहेत!” हे ऐकून महादेव व पार्वतीमाता खूप सुखावल्या आणि त्यांनी ते ज्ञानाचे फळ गणपती बाप्पाला दिले!'
      }
    ],
    moralLesson: {
      en: 'Parents are the highest form of divinity in the world. Respecting, loving, and listening to parents is greater than all the wealth and fame.',
      hi: 'माता-पिता ही इस संसार में साक्षात ईश्वर हैं। उनका आदर और सेवा करना ही सबसे बड़ा धर्म है।',
      mr: 'आपले आई-वडील हेच आपले खरे दैवत असतात. आई-वडिलांचा आदर करणे आणि त्यांची सेवा करणे हे जगात सर्वात मोठे पुण्य आहे.'
    },
    audioNarrationText: {
      en: 'Listen to the inspiring story of Bal Ganesha. Once on Mount Kailash, Sage Narada brought a divine fruit...',
      hi: 'बाल गणेश की यह पावन कथा सुनिए। कैलास पर्वत पर देवर्षि नारद एक दिव्य फल लाए...',
      mr: 'ऐका बाल गणपती बाप्पाची ही गोड गोष्ट. एकदा कैलास पर्वतावर देवर्षी नारद ज्ञानाचे फळ घेऊन आले...'
    },
    quiz: {
      question: {
        en: 'Around whom did Bal Ganesha take three circumambulations (Pradakshina)?',
        hi: 'बाल गणेश ने किसकी तीन परिक्रमाएं कीं?',
        mr: 'बाल गणपतीने कोणाच्या भोवती तीन प्रदक्षिणा घातल्या?'
      },
      options: [
        { en: 'Around Mount Meru', hi: 'मेरु पर्वत', mr: 'मेरु पर्वताभोवती' },
        { en: 'Around his Parents (Shiva & Parvati)', hi: 'माता-पिता (शिव-पार्वती)', mr: 'आपले आई-वडील (शिव व पार्वती)' },
        { en: 'Around the Sun', hi: 'सूर्य देव', mr: 'सूर्याभोवती' },
        { en: 'Around the Oceans', hi: 'समुद्र', mr: 'समुद्राभोवती' }
      ],
      correctIndex: 1,
      explanation: {
        en: 'Ganesha knew that parents embody the entire universe!',
        hi: 'गणेश जी जानते थे कि माता-पिता के चरणों में ही सारा संसार है!',
        mr: 'कारण आई-वडिलांच्या चरणांतच संपूर्ण जग सामावले आहे!'
      }
    },
    funActivity: {
      en: 'Today, give your parents a warm hug, touch their feet with love, and say "Thank you for taking care of me"!',
      hi: 'आज अपने माता-पिता के चरण स्पर्श कर उन्हें धन्यवाद कहें और उनके चेहरे पर मुस्कान लाएं!',
      mr: 'आज घरी आपल्या आई-बाबांच्या पाया पडून त्यांना सांगा: "तुम्ही माझे खरे देव आहात, थँक्यू!"'
    }
  },

  // 2. Bhakta Pundalik and Vitthal
  {
    id: 'bhakta_pundalik',
    title: {
      en: 'Bhakta Pundalik & The Sacred Brick of Pandharpur',
      hi: 'भक्त पुंडलिक और पंढरपुर की पावन ईंट',
      mr: 'भक्त पुंडलिक आणि पंढरपूरची पावन वीट'
    },
    deity: { en: 'Lord Vitthal (Panduranga)', hi: 'भगवान विट्ठल', mr: 'विठू माऊली' },
    ageGroup: '६ ते १४ वर्षे',
    iconEmoji: '🪷',
    readTime: '३ मिनिटे',
    storyParagraphs: [
      {
        en: 'In ancient Maharashtra, near the banks of Chandrabhaga River, lived a devoted youth named Pundalik, who served his elderly parents day and night with immense love.',
        hi: 'चंद्रभागा नदी के तट पर पुंडलिक नाम का एक युवक रहता था, जो अपने वृद्ध माता-पिता की दिन-रात अनन्य सेवा करता था।',
        mr: 'चंद्रभागा नदीच्या तीरावर पुंडलिक नावाचा एक मुलगा राहत होता. तो आपल्या म्हातार्‍या आई-वडिलांची दिवसरात्र खूप प्रेमाने सेवा करायचा.'
      },
      {
        en: 'Seeing his pure devotion to parents, Lord Krishna himself came from Vaikuntha down to Pundalik’s doorstep to meet him and give him blessings.',
        hi: 'पुंडलिक की मातृ-पितृ भक्ति देखकर साक्षात भगवान श्रीकृष्ण वैकुंठ से चलकर उसके द्वार पर पधारे।',
        mr: 'पुंडलिकाची ही सेवा पाहून प्रत्यक्ष भगवान श्रीकृष्ण वैकुंठातून चालत पुंडलिकाच्या घराच्या दाराशी आले.'
      },
      {
        en: 'When the Lord called: “Pundalik, I have arrived!”, Pundalik was busy pressing his father’s tired feet. Without stopping his service, Pundalik tossed a brick outside and said: “O Lord, please stand on this brick until I finish serving my parents!”',
        hi: 'भगवान ने द्वार से पुकारा, लेकिन पुंडलिक पिता के चरण दबाने में मग्न था। उसने एक ईंट भगवान की ओर सरकाते हुए कहा: “प्रभो! माता-पिता की सेवा पूरी होने तक इस ईंट पर खड़े रहें!”',
        mr: 'देवाने हाक मारली: “पुंडलिका, मी आलोय!” पण पुंडलिक आई-बाबांचे पाय चेपत होता. त्याने दाराबाहेर एक वीट भिरकावली आणि म्हणाला: “देवा, माझी सेवा पूर्ण होईपर्यंत या विटेवर उभा राहा!”'
      },
      {
        en: 'The Supreme Lord of the universe smiled and stood patiently upon the brick with hands on his hips. Centuries passed, but Lord Vitthala still stands there waiting for his loving devotee!',
        hi: 'भगवान मुस्कराए और कमर पर हाथ रखकर उस ईंट पर खड़े हो गए। सदियां बीत गईं, विट्ठल आज भी अपने भक्त की प्रतीक्षा में विटेवर खड़े हैं!',
        mr: 'भगवंतांना पुंडलिकाच्या सेवेचे कौतुक वाटले. देवाने कमरेवर दोन्ही हात ठेवले आणि ते विटेवर उभे राहिले. आज २८ युगे झाली तरी विठू माऊली त्या विटेवर भक्तांसाठी उभी आहे!'
      }
    ],
    moralLesson: {
      en: 'Selfless service done with pure heart is so mighty that even God waits willingly at the doorstep of the devotee.',
      hi: 'सच्ची सेवा और कर्तव्यनिष्ठा के सम्मुख साक्षात ईश्वर भी नतमस्तक हो जाते हैं।',
      mr: 'मनापासून केलेली आई-वडिलांची व गरजवंतांची सेवा इतकी महान असते की प्रत्यक्ष देवालाही भक्ताच्या दारात थांबावे लागते.'
    },
    audioNarrationText: {
      en: 'Listen to the beautiful lore of Bhakta Pundalik and Lord Vitthal standing on a brick in Pandharpur...',
      hi: 'सुनिए भक्त पुंडलिक और पंढरपुर के विट्ठल की पावन कथा...',
      mr: 'ऐका भक्त पुंडलिक आणि विटेवर उभ्या राहिलेल्या विठू माऊलीची ही सुंदर कथा...'
    },
    quiz: {
      question: {
        en: 'Why did Pundalik throw a brick for Lord Krishna to stand upon?',
        hi: 'पुंडलिक ने भगवान को खड़े रहने के लिए ईंट क्यों दी?',
        mr: 'पुंडलिकाने देवाला उभे राहण्यासाठी वीट का फेकली?'
      },
      options: [
        { en: 'He was angry', hi: 'वह क्रोधित था', mr: 'तो रागावला होता' },
        { en: 'He was busy serving his parents and didn’t want the Lord to stand in mud', hi: 'वह माता-पिता की सेवा में मग्न था और नहीं चाहता था कि भगवान कीचड़ में खड़े हों', mr: 'तो आई-वडिलांची सेवा करत होता आणि देवाला चिखलात उभे राहू द्यायचे नव्हते' },
        { en: 'He had no chairs', hi: 'उसके पास कुर्सी नहीं थी', mr: 'त्याच्याकडे खुर्ची नव्हती' }
      ],
      correctIndex: 1,
      explanation: {
        en: 'Duty to parents came first, yet he gave a clean brick so God’s feet would not touch wet soil.',
        hi: 'कर्तव्य सर्वोपरि था, और उसने भगवान के पवित्र चरणों के लिए सूखी ईंट दी।',
        mr: 'कर्तव्य सर्वात मोठे होते, म्हणून देवाला उभे राहण्यासाठी त्याने सुकी वीट दिली.'
      }
    },
    funActivity: {
      en: 'Draw a picture of Lord Vitthal standing on a brick with hands on hips and write "Ram Krishna Hari" on it!',
      hi: 'विट्ठल जी का चित्र बनाकर उस पर "राम कृष्ण हरि" लिखें!',
      mr: 'विटेवर कमरेवर हात ठेवून उभ्या असलेल्या विठू माऊलीचे सुंदर चित्र काढा आणि त्यावर "राम कृष्ण हरि" लिहा!'
    }
  },

  // 3. Young Hanuman and the Golden Sun
  {
    id: 'young_hanuman_sun',
    title: {
      en: 'Young Hanuman Leaping For The Sun',
      hi: 'बाल हनुमान और सूर्य फल की छलांग',
      mr: 'बाल मारुती आणि आकाशातील सोनेरी सूर्य'
    },
    deity: { en: 'Lord Hanuman', hi: 'श्री हनुमान', mr: 'श्री मारुतीराय' },
    ageGroup: '४ ते १० वर्षे',
    iconEmoji: '🚩',
    readTime: '२ मिनिटे',
    storyParagraphs: [
      {
        en: 'When child Hanuman woke up one morning, he felt very hungry. He looked out of his cave and saw a bright, glowing, round golden fruit rising in the eastern sky.',
        hi: 'एक सुबह जब बाल हनुमान जागे, तो उन्हें बहुत भूख लगी। पूर्व दिशा में उन्होंने चमकता हुआ लाल-सुनहरा गोला देखा।',
        mr: 'एकदा सकाळी बाल मारुती झोपेतून उठले आणि त्यांना खूप भूक लागली होती. त्यांनी आकाशात पाहिले, तर पूर्वेला एक मोठा, चकाकणारा, लाल-पिवळा गोळा दिसला.'
      },
      {
        en: 'Thinking it was a ripe, delicious mango, young Hanuman took a mighty leap! He flew through clouds, higher and higher towards the sun, fearless and joyful.',
        hi: 'उसे एक पका हुआ मीठा फल समझकर पवनपुत्र हनुमान ने बादलों को चीरते हुए आकाश की ओर विशाल छलांग लगाई!',
        mr: 'त्यांना वाटले ते पिकलेले गोड आंबा फळ आहे! बाल मारुतीने जोरदार उडी मारली आणि ते ढगांच्या पार आकाशात सूर्याच्या दिशेने झेपावले.'
      },
      {
        en: 'Seeing the fearless child, the gods were amazed at his extraordinary strength, courage, and pure innocence. Lord Brahma later blessed him with invincibility and wisdom.',
        hi: 'बालक का असीम साहस देखकर समस्त देवगण चकित रह गए और देवताओं ने उन्हें असीम शक्ति व अमरता का वरदान दिया।',
        mr: 'त्यांचे अफाट बळ व निष्पाप धाडस पाहून सर्व देव चकित झाले. पुढे जाऊन सर्व देवांनी हनुमंताला कधीही पराभूत न होण्याचे व बुद्धीचे वरदान दिले.'
      }
    ],
    moralLesson: {
      en: 'Fearlessness, courage, and physical health come from a pure heart and dedicated discipline.',
      hi: 'निर्भयता, असीम साहस और शक्ति शुद्ध मन और सच्चे संकल्प से प्राप्त होती है।',
      mr: 'धाडस, निर्भयता आणि शारीरिक बळ हे चांगल्या विचारांतून आणि व्यायामातून मिळते.'
    },
    audioNarrationText: {
      en: 'Listen to the exciting adventure of child Hanuman leaping into the sky towards the sun...',
      hi: 'सुनिए बाल हनुमान की यह रोमांचक कथा...',
      mr: 'ऐका बाल मारुतीची आकाशात झेप घेण्याची ही शूर कथा...'
    },
    quiz: {
      question: {
        en: 'What did young Hanuman mistake the morning Sun for?',
        hi: 'बाल हनुमान ने सूर्य को क्या समझा था?',
        mr: 'बाल मारुतीला सकाळचा सूर्य काय वाटला?'
      },
      options: [
        { en: 'A golden football', hi: 'गेंद', mr: 'चेंडू' },
        { en: 'A ripe delicious sweet fruit (mango)', hi: 'मीठा फल (आम)', mr: 'पिकलेले गोड फळ (आंबा)' },
        { en: 'A shining star', hi: 'तारा', mr: 'तारा' }
      ],
      correctIndex: 1,
      explanation: {
        en: 'Hanuman thought it was a giant delicious breakfast fruit!',
        hi: 'हनुमान जी को लगा कि वह कोई स्वादिष्ट फल है!',
        mr: 'कारण भुकेने व्याकूळ झालेल्या मारुतीला तो गोड आंबा वाटला!'
      }
    },
    funActivity: {
      en: 'Do 5 surya namaskars or deep stretches today to stay strong and energetic like Lord Hanuman!',
      hi: 'हनुमान जी के समान बलवान बनने के लिए आज ५ सूर्य नमस्कार करें!',
      mr: 'मारुतीरायासारखे शक्तिशाली बनण्यासाठी आज ५ सूर्यनमस्कार घाला!'
    }
  }
];


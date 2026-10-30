import { MultilingualText } from '../types';

export interface GaneshaInfo {
  name: MultilingualText;
  title: MultilingualText;
  tagline: MultilingualText;
  names12: { name: string; roman: string; meaning: MultilingualText }[];
  stories: { title: MultilingualText; summary: MultilingualText; scripture: string }[];
  significance: MultilingualText;
  chaturthiSignificance: MultilingualText;
  ashtavinayakSignificance: MultilingualText;
}

export const ganeshaData: GaneshaInfo = {
  name: {
    en: 'Lord Ganesha',
    hi: 'श्री गणेश',
    mr: 'श्री गणेश (विनायक)',
  },
  title: {
    en: 'The Lord of Beginnings, Supreme Intellect & Remover of Obstacles',
    hi: 'विघ्नहर्ता, बुद्धिदाता एवं प्रथम पूज्य भगवान गणेश',
    mr: 'विघ्नहर्ता, बुद्धीदाता व प्रथम पूज्य श्री गणेश',
  },
  tagline: {
    en: 'Prathama Pujya — Sacred Mantras, Atharvashirsha, Aartis, and the Complete Ashtavinayak Pilgrimage Circuit.',
    hi: 'प्रथम पूज्य — पावन मन्त्र, अथर्वशीर्ष, आरती एवं सम्पूर्ण अष्टविनायक यात्रा दर्शन।',
    mr: 'प्रथम पूज्य — पावन मंत्र, अथर्वशीर्ष, आरत्या आणि संपूर्ण अष्टविनायक तीर्थदर्शन.',
  },
  names12: [
    {
      name: 'ॐ वक्रतुण्डाय नमः',
      roman: 'Om Vakratundaya Namah',
      meaning: {
        en: 'The Lord with the curved trunk, who redirects straying minds back to righteousness',
        hi: 'वक्र सूंड़ वाले, जो भटके हुए चित्त को सन्मार्ग की ओर मोड़ते हैं',
        mr: 'वाकडी सोंड असणारे, जे भकटलेल्या मनाला सन्मार्गावर आणतात'
      }
    },
    {
      name: 'ॐ एकदन्ताय नमः',
      roman: 'Om Ekadantaya Namah',
      meaning: {
        en: 'The Single-Tusked One, who broke his tusk to transcribe the monumental Mahabharata',
        hi: 'एक दांत वाले, जिन्होंने महाभारत लेखन हेतु अपना दन्त समर्पित किया',
        mr: 'एक दात असणारे, ज्यांनी महाभारत लिहिण्यासाठी स्वतःचा दात अर्पण केला'
      }
    },
    {
      name: 'ॐ कृष्णपिङ्गाक्षाय नमः',
      roman: 'Om Krishna-pingakshaya Namah',
      meaning: {
        en: 'The One with dark, reddish-golden compassionate eyes',
        hi: 'काले और भूरे-लाल तेजस्वी व करुणामयी नेत्रों वाले',
        mr: 'काळ्या व तांबूस तेजस्वी दृष्टीने भक्तांवर कृपा करणारे'
      }
    },
    {
      name: 'ॐ गजवक्त्राय नमः',
      roman: 'Om Gajavaktraya Namah',
      meaning: {
        en: 'The Elephant-Faced One, symbolizing supreme wisdom and contemplative listening',
        hi: 'गजमुख, जो गहन श्रवण व सूक्ष्म ज्ञान के प्रतीक हैं',
        mr: 'हत्तीचे मुख असणारे, जे सखोल श्रवण आणि उच्च ज्ञानाचे प्रतीक आहेत'
      }
    },
    {
      name: 'ॐ लम्बोदराय नमः',
      roman: 'Om Lambodaraya Namah',
      meaning: {
        en: 'The Large-Bellied Lord, containing the entire cosmos and digesting all life experiences with calm',
        hi: 'विशाल उदर वाले, जो संपूर्ण ब्रह्मांड और जीवन के समस्त अनुभवों को शांत चित्त से समाहित करते हैं',
        mr: 'विशाल उदर असणारे, जे संपूर्ण विश्व आणि सर्व सुख-दुःखांना शांतपणे पोटात सामावून घेतात'
      }
    },
    {
      name: 'ॐ विकटाय नमः',
      roman: 'Om Vikataya Namah',
      meaning: {
        en: 'The Formidable Vanquisher of all arrogance and injustice',
        hi: 'अहंकार और अधर्म का मर्दन करने वाले विकट वीर',
        mr: 'अहंकार आणि संकटांचा संहार करणारे पराक्रमी'
      }
    },
    {
      name: 'ॐ विघ्नराजाय नमः',
      roman: 'Om Vighnarajaya Namah',
      meaning: {
        en: 'The Sovereign Master and remover of all internal and external obstacles',
        hi: 'समस्त विघ्नों व बाधाओं के अधिपति व निवारक',
        mr: 'सर्व विघ्ने आणि संकटे दूर करणारे विघ्नहर्ता'
      }
    },
    {
      name: 'ॐ धूम्रवर्णाय नमः',
      roman: 'Om Dhumravarnaya Namah',
      meaning: {
        en: 'The Smoke-Hued Lord, who dispels the blinding smoke of delusion and anger',
        hi: 'धुएं के समान वर्ण वाले, जो मोह व क्रोध के अंधकार को नष्ट करते हैं',
        mr: 'धुरासारखा वर्ण असणारे, जे अज्ञानाचा अंधकार दूर करतात'
      }
    },
    {
      name: 'ॐ भालचन्द्राय नमः',
      roman: 'Om Bhalachandraya Namah',
      meaning: {
        en: 'The Lord adorned with the cool crescent moon upon his forehead, bestowing peaceful intellect',
        hi: 'जिनके मस्तक पर शीतलता प्रदाता चन्द्रमा विराजमान है',
        mr: 'ज्यांच्या मस्तकावर शांत चंद्रकोर शोभून दिसते'
      }
    },
    {
      name: 'ॐ विनायकाय नमः',
      roman: 'Om Vinayakaya Namah',
      meaning: {
        en: 'The Peerless Leader who has no master above Him',
        hi: 'अनुपम नायक, जिनका कोई अन्य स्वामी नहीं है',
        mr: 'अद्वितीय नायक, ज्यांच्यावर कोणाचेही नियंत्रण नाही असे स्वतंत्र'
      }
    },
    {
      name: 'ॐ गणपतये नमः',
      roman: 'Om Ganapataye Namah',
      meaning: {
        en: 'The Supreme Commander of all divine hosts and cosmic elements',
        hi: 'समस्त गणों व ऊर्जाओं के स्वामी',
        mr: 'सर्व गणांचे आणि प्रकृतीचे अधिपती'
      }
    },
    {
      name: 'ॐ गजाननाय नमः',
      roman: 'Om Gajananaaya Namah',
      meaning: {
        en: 'The Benevolent One with the noble countenance of an elephant',
        hi: 'हाथी के समान शांत, गंभीर व ज्ञानवान मुख वाले',
        mr: 'हत्तीसारखे शांत, गंभीर आणि ज्ञानी रूप असणारे'
      }
    }
  ],
  stories: [
    {
      title: {
        en: 'The Cosmic Circumambulation (Pradakshina of Parents)',
        hi: 'माता-पिता की ब्रह्मांडीय प्रदक्षिणा',
        mr: 'माता-पित्यांची विश्वप्रदक्षिणा',
      },
      summary: {
        en: 'When challenged by brother Kartikeya to race around the universe to win the divine fruit of wisdom, Kartikeya flew on his peacock. Ganesha mindfully circumambulated his parents, Lord Shiva and Mother Parvati, declaring: "The parents in whom all the worlds reside are my entire universe." He was crowned first of all gods.',
        hi: 'जब ब्रह्मांड की परिक्रमा की परीक्षा हुई, तो कार्तिकेय मयूर पर उड़ चले। गणपति ने शांत भाव से माता पार्वती और पिता शिव की प्रदक्षिणा कर कहा: "समस्त संसार माता-पिता में ही समाहित है।" उनकी इस विवेकपूर्ण भक्ति से प्रसन्न होकर उन्हें प्रथम पूज्य का पद मिला।',
        mr: 'ब्रह्मांड प्रदक्षिणेच्या स्पर्धेत कार्तिकेय मोरावर बसून निघाले, तर गणरायांनी शांतपणे माता पार्वती व पिता महादेवांची प्रदक्षिणा केली आणि सांगितले: "माझे संपूर्ण विश्व माझ्या आई-वडिलांच्या चरणांशी आहे." त्यांच्या या बुद्धिमत्तेने त्यांना प्रथम पूज्यतेचा मान मिळवून दिला.'
      },
      scripture: 'Shiva Purana & Ganesha Purana'
    },
    {
      title: {
        en: 'The Broken Tusk and the Scribing of Mahabharata',
        hi: 'दन्त-भंग और महाभारत का पावन लेखन',
        mr: 'एकदंत आणि महाभारताचे अखंड लेखन',
      },
      summary: {
        en: 'When Sage Vyasa sought a scribe of lightning intellect to record the Mahabharata without pause, Ganesha agreed on the condition that Vyasa must dictate continuously without stopping. When Ganesha\'s quill broke amidst the dictation, rather than interrupting the sacred flow, he broke off his own right tusk to continue writing, proving that duty transcends physical attachment.',
        hi: 'महर्षि वेदव्यास के महाभारत काव्य को लिपिबद्ध करने के लिए जब लेखनी टूट गई, तो ज्ञान के प्रवाह को रुकने न देने हेतु गणेश जी ने अपना दाहिना दांत तोड़कर उससे लेखन जारी रखा। यह सिखाता है कि महान लक्ष्य हेतु त्याग अनिवार्य है।',
        mr: 'महर्षी व्यासांनी रचलेले महाभारत लिहिताना बोरू तुटला, परंतु ज्ञानाचा अखंड प्रवाह थांबू नये म्हणून गणेशाने स्वतःचा दात तोडून त्याने अखंड लेखन केले. कर्तव्यासाठी सर्वस्वाचा त्याग करण्याची ही अमर शिकवण आहे.'
      },
      scripture: 'Mahabharata (Adi Parva)'
    }
  ],
  significance: {
    en: 'In Vedic philosophy, Ganesha represents the Muladhara Chakra (the root foundation of energy and consciousness), the Pranava sound "Om", and the harmonious integration of Macrocosm (Elephant) and Microcosm (Mouse/Mushaka). Every Hindu ritual, ceremony, and journey begins with invocation to Him.',
    hi: 'वेदांत में श्री गणेश मूलाधार चक्र के अधिष्ठाता और ओंकार (प्रणव) स्वरूप हैं। वे हाथी के विशाल ज्ञान और मूषक की सूक्ष्म एकाग्रता के समन्वय हैं। किसी भी कार्य का शुभारंभ उन्हीं के स्मरण से होता है।',
    mr: 'अध्यात्मशास्त्रात श्री गणेश हे मूलाधार चक्राचे अधिष्ठाता आणि ओंकार स्वरूप आहेत. ते हत्तीचे अथांग ज्ञान आणि उंदराची सूक्ष्म एकाग्रता यांचे सुंदर प्रतीक आहेत. म्हणूनच प्रत्येक शुभकार्याची सुरुवात श्रीगणेशाने होते.'
  },
  chaturthiSignificance: {
    en: 'Sankashti Chaturthi (celebrated on the 4th day after full moon) and Angarika Chaturthi (when Chaturthi falls on a Tuesday) are sacred fast days observed for clearing obstacles and attaining mental peace.',
    hi: 'संकष्टी चतुर्थी और अंगारकी चतुर्थी (मंगलवार को पड़ने वाली चतुर्थी) मानसिक क्लेशों और विघ्नों के निवारण हेतु विशेष साधना दिवस हैं।',
    mr: 'संकष्टी चतुर्थी आणि अंगारकी चतुर्थी (मंगळवारी येणारी चतुर्थी) ही संकटांवर मात करण्यासाठी आणि मनःशांतीसाठी लाखो भाविकांचे अत्यंत श्रद्धेचे व्रत आहे.'
  },
  ashtavinayakSignificance: {
    en: 'Maharashtra\'s sacred Ashtavinayak circuit comprises eight self-manifested (Swayambhu) Ganesha shrines in Pune, Raigad, and Ahilyanagar districts, traditionally undertaken in a prescribed divine sequence.',
    hi: 'महाराष्ट्र के आठ स्वयंभू गणेश मंदिरों की पावन यात्रा (अष्टविनायक) सनातन संस्कृति का अत्यंत पूजनीय तीर्थ परिपथ है।',
    mr: 'महाराष्ट्रातील ८ स्वयंभू गणपतींचे पावन दर्शन म्हणजे अष्टविनायक यात्रा. पुणे, रायगड आणि अहिल्यानगर जिल्ह्यातील या देवस्थानांची यात्रा एका विशिष्ट क्रमाने पूर्ण केली जाते.'
  }
};


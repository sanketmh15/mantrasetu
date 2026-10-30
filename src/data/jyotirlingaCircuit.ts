import { Temple } from '../types';

export interface JyotirlingaTemple extends Temple {
  sequence: number;
  jyotirlingaNumberInIndia: number;
  riverAssociation: string;
}

export const maharashtraJyotirlingas: JyotirlingaTemple[] = [
  {
    id: 'jyotirlinga-trimbakeshwar',
    sequence: 1,
    jyotirlingaNumberInIndia: 10,
    name: {
      en: '1. Shri Trimbakeshwar Jyotirlinga',
      hi: '१. श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
      mr: '१. श्री त्र्यंबकेश्वर ज्योतिर्लिंग (नाशिक)'
    },
    riverAssociation: 'Godavari (Dakshin Ganga) origin from Brahmagiri Mountain',
    state: 'Maharashtra',
    district: 'Nashik',
    city: 'Trimbak',
    historicalEra: 'Peshwa Balaji Baji Rao (Nanasaheb Peshwa) rebuilt in black basalt (1755–1786 CE)',
    significance: {
      en: 'One of the most sacred of all 12 Jyotirlingas. Unique three-faced linga representing the Holy Trinity: Brahma, Vishnu, and Rudra, each crowned with jewels. The origin of the sacred Godavari River.',
      hi: 'द्वादश ज्योतिर्लिंगों में अद्वितीय। यहाँ शिवलिंग में ब्रह्मा, विष्णु और महेश तीनों की तीन मुखी पिंड विराजमान है। दक्षिण गंगा गोदावरी का पावन उद्गम।',
      mr: 'भारतातील १२ ज्योतिर्लिंगांपैकी अत्यंत महत्त्वाचे स्थान. येथे शिवलिंगामध्ये ब्रह्मा, विष्णू आणि रुद्र अशी तिन्ही देवांची तीन मुखे आहेत. पवित्र गोदावरी नदीचे उगमस्थान.'
    },
    specialTradition: {
      en: 'The Trimbakeshwar linga is adorned with the golden jewel-studded crown of the Peshwas every Monday between 4:00 PM and 5:00 PM.',
      hi: 'प्रत्येक सोमवार को अपराह्न ४ से ५ बजे शिवलिंग पर पेशवाओं द्वारा अर्पित ऐतिहासिक स्वर्ण मुकुट सुशोभित किया जाता है।',
      mr: 'दर सोमवारी दुपारी ४ ते ५ या वेळेत शिवलिंगावर ऐतिहासिक पेशवेकालीन सुवर्ण मुकुट चढवून विशेष दर्शन घडवले जाते.'
    },
    timings: '05:30 AM - 09:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Trimbakeshwar+Shiva+Temple+Nashik',
    howToReach: {
      rail: 'Nashik Road Railway Station (38 km)',
      road: 'Continuous city & state transport buses from CBS Nashik (28 km)',
      air: 'Nashik Ozar Airport (55 km)'
    },
    verifiedSource: 'Shiva Purana (Koti Rudra Samhita) & Trimbakeshwar Devasthan Trust',
    imageTag: 'trimbakeshwar'
  },
  {
    id: 'jyotirlinga-bhimashankar',
    sequence: 2,
    jyotirlingaNumberInIndia: 6,
    name: {
      en: '2. Shri Bhimashankar Jyotirlinga',
      hi: '२. श्री भीमाशंकर ज्योतिर्लिंग',
      mr: '२. श्री भीमाशंकर ज्योतिर्लिंग (खेड-पुणे)'
    },
    riverAssociation: 'Bhima River Origin (Chandrabhaga flows towards Pandharpur)',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Bhimashankar (Khed/Ambegaon)',
    historicalEra: 'Chimaji Appa (18th Century) with ancient 13th Century Nagara foundations',
    significance: {
      en: 'Perched in the misty Western Ghats within the dense Bhimashankar Wildlife Sanctuary. Lord Shiva manifested here as a colossal column of light to vanquish the tyrant demon Bhima.',
      hi: 'सह्याद्रि के वनों में भीमाशंकर वन्यजीव अभयारण्य के मध्य स्थित। अत्याचारी राक्षस भीम के वध हेतु भगवान शिव यहाँ ज्योति स्वरूप में प्रकट हुए थे।',
      mr: 'सह्याद्रीच्या निबिड अरण्यात भीमाशंकर अभयारण्याच्या कुशीत वसलेले ज्योतिर्लिंग. भीमा राक्षसाचा संहार करून महादेवांनी येथे विश्राम केला होता.'
    },
    specialTradition: {
      en: 'Surrounded by ancient sacred groves (Devrais) and home to the giant flying squirrel (Shekru), Maharashtra’s state animal.',
      hi: 'प्राचीन देवराइयों से घिरा शांत तपोवन, जहाँ से भीमा नदी का उद्गम होता है।',
      mr: 'प्राचीन देवरायांनी वेढलेले निसर्गरम्य स्थान, जिथून भीमा नदी उगम पावून पुढे पंढरपूरला चंद्रभागा बनते.'
    },
    timings: '04:30 AM - 09:30 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Bhimashankar+Jyotirlinga+Temple+Pune',
    howToReach: {
      rail: 'Pune Junction (110 km) or Manchar (60 km)',
      road: 'Direct MSRTC buses from Shivajinagar Pune and Kalyan Mumbai',
      air: 'Pune International Airport (105 km)'
    },
    verifiedSource: 'Shiva Purana & Maharashtra Forest Heritage Records',
    imageTag: 'bhimashankar'
  },
  {
    id: 'jyotirlinga-grishneshwar',
    sequence: 3,
    jyotirlingaNumberInIndia: 12,
    name: {
      en: '3. Shri Grishneshwar Jyotirlinga',
      hi: '३. श्री घृष्णेश्वर ज्योतिर्लिंग',
      mr: '३. श्री घृष्णेश्वर ज्योतिर्लिंग (वेरूळ)'
    },
    riverAssociation: 'Shivalaya Sarovar & Yelganga stream near Ellora',
    state: 'Maharashtra',
    district: 'Chhatrapati Sambhajinagar',
    city: 'Verul (Ellora)',
    historicalEra: 'Restored by Maloji Raje Bhosale (Shivaji\'s grandfather) and rebuilt by Punyashlok Ahilyabai Holkar (18th Century)',
    significance: {
      en: 'The 12th and final Jyotirlinga of India. According to the Shiva Purana, a devout woman named Ghushma worshipped Shiva by immersing 101 lingas daily; pleased by her devotion, Shiva permanently manifested here.',
      hi: 'भारत का १२वाँ व अंतिम ज्योतिर्लिंग। शिवभक्त घुश्मा की अनन्य भक्ति पर प्रसन्न होकर महादेव यहाँ साक्षात प्रकट हुए थे। लाल पत्थरों का भव्य स्थापत्य।',
      mr: 'भारतातील १२ वे अंतिम ज्योतिर्लिंग. शिवभक्त घुष्माच्या भक्तीवर प्रसन्न होऊन महादेवांनी येथे वास केला. लाल दगडात कोरलेले पुण्यश्लोक अहिल्यादेवींचे अप्रतिम मंदिर.'
    },
    specialTradition: {
      en: 'Located just 1 km from the world-famous UNESCO Ellora Caves and the monolithic rock-cut Kailash Temple.',
      hi: 'विश्वप्रसिद्ध एलोरा की गुफाओं और कैलाश मंदिर के समीप स्थित।',
      mr: 'युनेस्कोच्या जगप्रसिद्ध वेरूळ लेण्यांच्या आणि कैलास मंदिराच्या अगदी शेजारी वसलेले पावन क्षेत्र.'
    },
    timings: '05:30 AM - 09:30 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Grishneshwar+Jyotirlinga+Temple+Ellora',
    howToReach: {
      rail: 'Chhatrapati Sambhajinagar Railway Station (30 km)',
      road: 'Via Sambhajinagar-Daulatabad-Verul Highway route',
      air: 'Chhatrapati Sambhajinagar Airport (35 km)'
    },
    verifiedSource: 'Shiva Purana (Koti Rudra Samhita, Chapter 32)',
    imageTag: 'grishneshwar'
  },
  {
    id: 'jyotirlinga-aundha-nagnath',
    sequence: 4,
    jyotirlingaNumberInIndia: 8,
    name: {
      en: '4. Shri Aundha Nagnath Jyotirlinga',
      hi: '४. श्री औंढा नागनाथ ज्योतिर्लिंग',
      mr: '४. श्री औंढा नागनाथ ज्योतिर्लिंग (हिंगोली)'
    },
    riverAssociation: 'Aundha Lake & Purna river basin',
    state: 'Maharashtra',
    district: 'Hingoli',
    city: 'Aundha Nagnath',
    historicalEra: 'Originally consecrated by Pandava King Yudhishthira; Hemadpanthi structures from Seuna Yadavas',
    significance: {
      en: 'The 8th Jyotirlinga of India, set in the ancient forest of Darukavana. Underground sanctum sanctorum requiring descending stone steps. The temple famously rotated to face Saint Namdev during his devotion.',
      hi: 'दारुकावन में स्थित भारत का आठवाँ ज्योतिर्लिंग। भूमिगत गर्भगृह। संत नामदेव के कीर्तन पर संपूर्ण मंदिर के दिशा बदलने की अमर कथा।',
      mr: 'दारुकावनातील ८ वे ज्योतिर्लिंग. पायऱ्या उतरून खोल गर्भगृहात जावे लागते. संत नामदेवांच्या भक्तीमुळे संपूर्ण मंदिराने आपली दिशा फिरवली असा अलौकिक इतिहास.'
    },
    specialTradition: {
      en: 'Features magnificent exterior stone bas-reliefs depicting scenes from the Mahabharata and Ramayana.',
      hi: 'मंदिर की बाहरी भित्तियों पर महाभारत व रामायण के प्रसंगों का सजीव पाषाण अंकन।',
      mr: 'मंदिराच्या बाहेरील भिंतींवर महाभारत आणि रामायणातील प्रसंग कोरलेले अत्यंत विलोभनीय दगडी शिल्पकाम.'
    },
    timings: '04:00 AM - 10:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Aundha+Nagnath+Jyotirlinga+Temple+Hingoli',
    howToReach: {
      rail: 'Parbhani Junction (50 km) or Hingoli (25 km)',
      road: 'Easily accessible via buses from Nanded, Parbhani, and Hingoli',
      air: 'Nanded Airport (65 km)'
    },
    verifiedSource: 'Shiva Purana & Warkari Bhaktavijaya records',
    imageTag: 'aundha-nagnath'
  },
  {
    id: 'jyotirlinga-parli-vaijnath',
    sequence: 5,
    jyotirlingaNumberInIndia: 5,
    name: {
      en: '5. Shri Parli Vaijnath Jyotirlinga',
      hi: '५. श्री परली वैजनाथ ज्योतिर्लिंग',
      mr: '५. श्री परळी वैजनाथ ज्योतिर्लिंग (बीड)'
    },
    riverAssociation: 'Brahmaruka & Godavari tributary streams on Meru Parvat',
    state: 'Maharashtra',
    district: 'Beed',
    city: 'Parli',
    historicalEra: 'Punyashlok Ahilyabai Holkar renovated the temple sanctum in 1706 CE',
    significance: {
      en: 'Revered as the Cosmic Healer (Vaidyanatha). According to tradition, Ravana placed the Shiva lingam on this mountain summit on his journey back to Lanka, where it established itself permanently.',
      hi: 'समस्त व्याधियों के महा-चिकित्सक वैद्यनाथ। रावण द्वारा लंका ले जाते समय यहाँ लिंग स्थापित होने की पावन पौराणिक गाथा।',
      mr: 'सर्व प्रकारच्या व्याधींचे निवारण करणारे "वैद्यनाथ". रावण कैलासावरून शिवलिंग लंकेकडे नेत असताना येथे थांबला आणि लिंग येथेच स्थिर झाले.'
    },
    specialTradition: {
      en: 'The Lingam is positioned inside a deep, cool brass-lined pit where devotees are encouraged to offer Abhishek with pure water directly.',
      hi: 'पीतल के कुण्ड में शीतल जल से भक्तों द्वारा सीधे जलाभिषेक करने की पावन परंपरा।',
      mr: 'पितळी चौकोनी कुंडात असलेल्या शिवलिंगावर भाविकांना स्वतःच्या हाताने जलाभिषेक करण्याची सुंदर परंपरा.'
    },
    timings: '05:00 AM - 09:30 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Parli+Vaijnath+Jyotirlinga+Temple+Beed',
    howToReach: {
      rail: 'Parli Vaijnath Railway Station (2 km)',
      road: 'Major road junction with buses from Beed, Latur, and Nanded',
      air: 'Latur Airport (70 km) or Nanded Airport (100 km)'
    },
    verifiedSource: 'Shiva Purana & Ahilyabai Holkar Memorial Trust',
    imageTag: 'parli-vaijnath'
  }
];

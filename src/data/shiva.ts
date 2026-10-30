import { MultilingualText } from '../types';

export interface ShivaInfo {
  name: MultilingualText;
  title: MultilingualText;
  tagline: MultilingualText;
  jyotirlingas12: { name: string; location: string; state: string }[];
  stories: { title: MultilingualText; summary: MultilingualText; scripture: string }[];
  significance: MultilingualText;
  mondaySignificance: MultilingualText;
  pradoshSignificance: MultilingualText;
}

export const shivaData: ShivaInfo = {
  name: {
    en: 'Lord Shiva (Mahadev)',
    hi: 'भगवान शिव (महादेव)',
    mr: 'देवाधिदेव महादेव (शिवशंभू)',
  },
  title: {
    en: 'The Supreme Ascetic, Auspicious Destroyer of Darkness & Lord of Cosmic Dance',
    hi: 'कल्याणकारी देवाधिदेव, महामृत्युंजय एवं नटराज',
    mr: 'कल्याणकारी देवाधिदेव, महामृत्युंजय व नटराज शिवशंभू',
  },
  tagline: {
    en: 'Har Har Mahadev — Maha Mrityunjaya Japa, Shiva Tandava, Bilvashtakam, and the 5 Sacred Jyotirlingas of Maharashtra.',
    hi: 'हर हर महादेव — महामृत्युंजय मन्त्र, शिव तांडव, बिल्वाष्टकम एवं महाराष्ट्र के पावन ५ ज्योतिर्लिंग दर्शन।',
    mr: 'हर हर महादेव — महामृत्युंजय मंत्र, शिव तांडव, बिल्वाष्टक आणि महाराष्ट्रातील ५ पावन ज्योतिर्लिंगे.',
  },
  jyotirlingas12: [
    { name: 'Somnath', location: 'Prabhas Patan, Saurashtra', state: 'Gujarat' },
    { name: 'Mallikarjuna', location: 'Srisailam', state: 'Andhra Pradesh' },
    { name: 'Mahakaleshwar', location: 'Ujjain (Shipra River)', state: 'Madhya Pradesh' },
    { name: 'Omkareshwar', location: 'Mandhata Island (Narmada River)', state: 'Madhya Pradesh' },
    { name: 'Kedarnath', location: 'Himalayas, Garhwal (Mandakini River)', state: 'Uttarakhand' },
    { name: 'Bhimashankar', location: 'Sahyadri Hills, Khed (Bhima River)', state: 'Maharashtra' },
    { name: 'Kashi Vishwanath', location: 'Varanasi (Ganga River)', state: 'Uttar Pradesh' },
    { name: 'Trimbakeshwar', location: 'Brahmagiri, Nashik (Godavari Origin)', state: 'Maharashtra' },
    { name: 'Baidyanath / Parli Vaijnath', location: 'Parli, Beed', state: 'Maharashtra' },
    { name: 'Nageshwar / Aundha Nagnath', location: 'Aundha, Hingoli', state: 'Maharashtra' },
    { name: 'Rameshwaram', location: 'Rameswaram Island', state: 'Tamil Nadu' },
    { name: 'Grishneshwar', location: 'Verul, Ellora Caves', state: 'Maharashtra' }
  ],
  stories: [
    {
      title: {
        en: 'The Drinking of Halahala Poison (Neelkantha)',
        hi: 'हलाहल विषपान और नीलकंठ स्वरूप',
        mr: 'हलाहल विषप्राशन आणि नीलकंठ अवतार',
      },
      summary: {
        en: 'During the churning of the cosmic ocean (Samudra Manthan), a deadly poison capable of annihilating all creation emerged first. While all gods and demons fled in terror, Lord Shiva compassionately held the poison in his throat without swallowing it, turning his throat blue (Neelkantha) and protecting the cosmos.',
        hi: 'समुद्र मंथन के समय जब सृष्टि को भस्म करने वाला कालकूट विष प्रकट हुआ, तो महादेव ने सम्पूर्ण सृष्टि के कल्याण हेतु उसे अपने कंठ में धारण कर लिया। इससे उनका कंठ नीला पड़ गया और वे "नीलकंठ" कहलाए।',
        mr: 'समुद्रमंथनातून निघालेल्या हलाहल विषाच्या ज्वाळांनी संपूर्ण सृष्टी होरपळू लागली तेव्हा देवांच्या प्रार्थनेवरून महादेवांनी ते विष स्वतःच्या कंठात धारण केले. त्यामुळे त्यांचा कंठ निळा झाला आणि ते "नीलकंठ" म्हणून वंदिले गेले.'
      },
      scripture: 'Srimad Bhagavata Purana (Skandha 8) & Shiva Purana'
    },
    {
      title: {
        en: 'The Descent of the Sacred Ganga (Gangadhara)',
        hi: 'गंगावतरण और गंगाधर स्वरूप',
        mr: 'गंगावतरण आणि जटांमध्ये गंगाधारण',
      },
      summary: {
        en: 'When the celestial river Ganga agreed to descend to earth through King Bhagiratha\'s severe penance, her torrential velocity threatened to shatter the planet. Shiva absorbed the colossal torrent effortlessly into his matted locks (Jata), releasing her as a gentle, purifying stream across India.',
        hi: 'राजा भगीरथ की तपस्या पर जब स्वर्ग से गंगा का तीव्र वेग पृथ्वी को विदीर्ण करने को तत्पर था, तब महादेव ने गंगा को अपनी जटाओं में समेटकर शांत किया और पृथ्वी पर पवित्र धारा के रूप में प्रवाहित किया।',
        mr: 'स्वर्गातून वेगाने कोसळणाऱ्या गंगेचा भार पृथ्वी पेलू शकणार नाही हे पाहून महादेवांनी तिला आपल्या जटांमध्ये सामावून घेतले आणि शांत करून पृथ्वीवर पवित्र प्रवाह सोडला; म्हणूनच त्यांना "गंगाधर" म्हणतात.'
      },
      scripture: 'Valmiki Ramayana (Balakanda) & Mahabharata'
    }
  ],
  significance: {
    en: 'Shiva is pure Sat-Chit-Ananda (Truth-Consciousness-Bliss). He represents the dissolution of ego, the silence of deep meditation (Samadhi), and eternal compassion (Bholenath). He is worshipped through the sacred Linga, Bilva leaves, cold water, and the holy ashes of Bhasma.',
    hi: 'भगवान शिव निर्गुण निराकार ब्रह्म के साकार प्रतीक हैं। वे अहंकार के संहारक, ध्यान की पराकाष्ठा और सरलता के सागर हैं। शिवलिंग पर केवल शुद्ध जल और एक बेलपत्र से भी वे सहज प्रसन्न होते हैं।',
    mr: 'भगवान शिव हे अहंकार आणि अज्ञानाचा नाश करणारे आणि ध्यानाची पराकाष्ठा असणारे दयाळू देव आहेत. शिवलिंगावर केवळ शुद्ध पाणी आणि बेलाचे एक पान अर्पण केले तरी ते प्रसन्न होतात.'
  },
  mondaySignificance: {
    en: 'Monday (Somwar) is ruled by Soma (the Moon), which rests upon Shiva\'s forehead. Dedicated to seeking mental calm, removing emotional depression, and cultivating peace.',
    hi: 'सोमवार भगवान शिव की उपासना का विशेष दिन है। चन्द्रमा को मस्तक पर धारण करने वाले भोलेनाथ चित्त को शीतलता और शांति प्रदान करते हैं।',
    mr: 'सोमवार हा महादेवांचा पावन वार आहे. मस्तकावर चंद्रकोर धारण करणारे शिवशंभू मनाला शांती आणि शीतलता देतात.'
  },
  pradoshSignificance: {
    en: 'Pradosha (the twilight period on the 13th lunar day of both waxing and waning fortnights) is the sacred hour when Shiva performs the joyful cosmic dance (Ananda Tandava) on Mount Kailash.',
    hi: 'त्रयोदशी तिथि का प्रदोष काल अत्यंत सिद्ध माना जाता है। इस संध्या वेला में महादेव कैलाश पर आनंद तांडव करते हैं और समस्त संकटों का निवारण करते हैं।',
    mr: 'त्रयोदशीचा प्रदोष काळ हा महादेवांच्या पूजेसाठी अत्यंत फलदायी मानला जातो. या वेळी महादेव कैलासावर आनंद तांडव करतात अशी श्रद्धा आहे.'
  }
};

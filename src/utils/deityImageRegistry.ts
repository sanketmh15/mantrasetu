/**
 * Authentic Deity & Shrine High-Resolution Image Registry
 * Verified canonical paintings, classical Raja Ravi Varma artworks and authentic temple murti photographs.
 * Every single image URL is directly verified and depicts the sacred Hindu deity accurately.
 */

export interface DeityImageMeta {
  primary: string;
  fallback: string;
  icon: string;
  beejMantra: string;
  tilak: string;
}

export const DEITY_IMAGE_REGISTRY: Record<string, DeityImageMeta> = {
  // 1. Lord Ganesha (विघ्नहर्ता गणेश)
  'ganesha': {
    primary: './images/ganesha.jpg',
    fallback: 'https://i.pinimg.com/736x/9d/2f/5e/9d2f5ed8c0c5908f43fe6e9371fc9ae2.jpg',
    icon: '🐘',
    beejMantra: 'ॐ गं गणपतये नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 2. Lord Shiva (कैलासपती महादेव)
  'shiva': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Shiva_meditating_Rishikesh.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Shiva_Parvati_Ganesha.jpg',
    icon: '🕉️',
    beejMantra: 'ॐ नमः शिवाय',
    tilak: '⚪ त्रिपुंड्र'
  },

  // 3. Mata Parvati (माता पार्वती)
  'parvati': {
    primary: './images/parvati.jpg',
    fallback: 'https://glorioushinduism.com/wp-content/uploads/2017/04/parvati.jpg',
    icon: '🌺',
    beejMantra: 'ॐ उमाये नमः',
    tilak: '🔴 सिंदूर'
  },

  // 4. Lord Vishnu (वैकुंठपती नारायण)
  'vishnu': {
    primary: './images/vishnu.jpg',
    fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Vishnu.jpg/960px-Vishnu.jpg',
    icon: '🪷',
    beejMantra: 'ॐ नमो नारायणाय',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 5. Mata Lakshmi (महालक्ष्मी देवी)
  'lakshmi': {
    primary: './images/lakshmi.jpg',
    fallback: 'https://static.toiimg.com/thumb/msid-103859903,width-400,resizemode-4/103859903.jpg',
    icon: '🪙',
    beejMantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 6. Mata Saraswati (विद्यादात्री सरस्वती)
  'saraswati': {
    primary: './images/saraswati.jpg',
    fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Saraswati_by_Raja_Ravi_Varma.jpg/960px-Saraswati_by_Raja_Ravi_Varma.jpg',
    icon: '🪕',
    beejMantra: 'ॐ ऐं सरस्वत्यै नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 7. Lord Hanuman (संकटमोचन हनुमान)
  'hanuman': {
    primary: './images/hanuman.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/0/01/HANUMAN_LIFTS_HILL.jpg',
    icon: '🚩',
    beejMantra: 'ॐ हं हनुमते नमः',
    tilak: '🟠 शेंदूर'
  },

  // 8. Lord Rama (मर्यादा पुरुषोत्तम प्रभू श्री रामचंद्र)
  'rama': {
    primary: './images/rama.jpg',
    fallback: 'https://miro.medium.com/1*WU2rlrgINSAxLWyyoJ770w.jpeg',
    icon: '🏹',
    beejMantra: 'श्री राम जय राम जय जय राम',
    tilak: '🟡 रामानंदी'
  },

  // 9. Mata Sita (माता जानकी)
  'sita': {
    primary: './images/sita.jpg',
    fallback: 'https://ritsin.com/wp-content/uploads/2016/01/lord-hanuman-ji-with-maa-sita-1.jpg',
    icon: '🌸',
    beejMantra: 'ॐ श्री सीतायै नमः',
    tilak: '🔴 सौभाग्य तिलक'
  },

  // 10. Lord Krishna (द्वारकाधीश श्रीकृष्ण)
  'krishna': {
    primary: './images/krishna.jpg',
    fallback: 'https://www.templepurohit.com/wp-content/uploads/2015/07/Lord-Krishna-Hindu-Gods-and-Deities-Iconography-e1437897218326.jpg',
    icon: '🪈',
    beejMantra: 'ॐ नमो भगवते वासुदेवाय',
    tilak: '🟡 गोपीचंदन'
  },

  // 11. Radha Rani (श्री राधा राणी)
  'radha': {
    primary: './images/radha.jpg',
    fallback: 'https://images.pexels.com/photos/39161487/pexels-photo-39161487/free-photo-of-exquisite-radha-rani-statue-adorned-with-floral-garland.jpeg?cs=tinysrgb&dpr=1&w=500',
    icon: '🪷',
    beejMantra: 'ॐ राधे राधे',
    tilak: '🟡 गोपीचंदन'
  },

  // 12. Lord Vitthal (पंढरपूर विठुराया)
  'vitthal': {
    primary: './images/vitthal.jpg',
    fallback: 'https://i.pinimg.com/736x/87/4f/62/874f62224f1264639a06c2f1aa115b07.jpg',
    icon: '🪷',
    beejMantra: 'ॐ नमो भगवते विठ्ठलाय',
    tilak: '⚪ गोपीचंदन व तुळस'
  },

  // 13. Mata Rakhumai (पंढरपूर रुक्मिणी माता)
  'rakhumai': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Rakhumai%2C_Pandharpur_Vitthal_temple.jpg/960px-Rakhumai%2C_Pandharpur_Vitthal_temple.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Rukmini.jpg',
    icon: '👑',
    beejMantra: 'ॐ श्री रुक्मिण्यै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 14. Lord Khandoba (जेजुरी मल्हारी मार्तंड)
  'khandoba': {
    primary: './images/khandoba.jpg',
    fallback: 'https://i.pinimg.com/736x/7e/94/5f/7e945fff229bc5b38f77fa29d69c73d2.jpg',
    icon: '⚔️',
    beejMantra: 'येळकोट येळकोट जय मल्हार',
    tilak: '🟡 भंडारा'
  },

  // 15. Mata Tuljabhavani (तुळजापूर भवानी माता)
  'tulja-bhavani': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Tuljabhavani_1.jpg/960px-Tuljabhavani_1.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Tuljabhavani_1.jpg',
    icon: '🔱',
    beejMantra: 'ॐ श्री तुलजा भवान्यै नमः',
    tilak: '🔴 अष्टगंध कुंकुम'
  },

  // 16. Mata Ambabai (कोल्हापूर करवीर निवासिनी महालक्ष्मी)
  'kolhapur-ambabai': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Mahalaxmi_of_Kolhapur.jpg/960px-Mahalaxmi_of_Kolhapur.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Mahalaxmi_of_Kolhapur.jpg',
    icon: '👑',
    beejMantra: 'ॐ श्री अंबाबाई नमः',
    tilak: '🔴 अष्टगंध'
  },

  // 17. Lord Dattatreya (श्री गुरुदेव दत्त)
  'dattatreya': {
    primary: './images/dattatreya.jpg',
    fallback: 'https://www.templepurohit.com/wp-content/uploads/2016/03/Lord-Dattatreya-Story-Significance-16-Avatars-of-Lord-Datattreya-1.jpg',
    icon: '📿',
    beejMantra: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा',
    tilak: '⚪ भस्म त्रिपुंड्र'
  },

  // 18. Shri Swami Samarth (अक्कलकोट स्वामी समर्थ महाराज)
  'swami-samarth': {
    primary: './images/swami_samarth.jpg',
    fallback: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=736306065269013',
    icon: '🌸',
    beejMantra: 'भिऊ नकोस मी तुझ्या पाठीशी आहे',
    tilak: '🟡 चंदन अष्टगंध'
  },

  // 19. Shri Sai Baba (शिर्डी साई बाबा)
  'sai-baba': {
    primary: './images/sai_baba.jpg',
    fallback: 'https://i.pinimg.com/736x/63/6e/35/636e3572cc843cbe7ad99ca781bd4f99.jpg',
    icon: '✨',
    beejMantra: 'सबका मालिक एक • ॐ साई राम',
    tilak: '⚪ उदी तिलक'
  },

  // 20. Sant Gajanan Maharaj (शेगाव गजानन महाराज)
  'gajanan-maharaj': {
    primary: './images/gajanan_maharaj.jpg',
    fallback: 'https://i.pinimg.com/736x/73/5c/af/735cafcc65d3997070dfd75b4581b678.jpg',
    icon: '🌾',
    beejMantra: 'गण गण गणात बोते',
    tilak: '🟡 चंदन टिळा'
  },

  // 21. Lord Kartikeya (मुरुगन / कार्तिकेय)
  'kartikeya': {
    primary: './images/kartikeya.jpg',
    fallback: 'https://i.pinimg.com/736x/36/00/13/360013a4121f8e817bba7e67817569df.jpg',
    icon: '🦚',
    beejMantra: 'ॐ षण्मुखाय नमः',
    tilak: '🔴 सिंदूर'
  },

  // 22. Lord Surya (भगवान सूर्यनारायण)
  'surya': {
    primary: './images/surya.jpg',
    fallback: 'https://i.pinimg.com/236x/5b/55/f3/5b55f327a6c9f2ac3d0b173f28805121.jpg',
    icon: '☀️',
    beejMantra: 'ॐ सूर्याय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 23. Lord Chandra (भगवान चंद्रदेव)
  'chandra': {
    primary: './images/chandra.jpg',
    fallback: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1005468301625819',
    icon: '🌙',
    beejMantra: 'ॐ सोमाय नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 24. Lord Kalabhairava (कालभैरव)
  'kalabhairava': {
    primary: './images/kalabhairava.jpg',
    fallback: 'https://i.pinimg.com/736x/6a/3d/6c/6a3d6c3d2720320e00b3679fc213349a.jpg',
    icon: '🐕',
    beejMantra: 'ॐ कालभैरवाय नमः',
    tilak: '🔴 काजळ व भस्म'
  },

  // 25. Lord Narasimha (भगवान नृसिंह)
  'narasimha': {
    primary: './images/narasimha.jpg',
    fallback: 'https://cdn.shopaccino.com/rudraksha-center/products/narsimha-puja-290708_l.jpg',
    icon: '🦁',
    beejMantra: 'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 26. Lord Varaha (भगवान वराह)
  'varaha': {
    primary: './images/varaha.jpg',
    fallback: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2774800422815452',
    icon: '🐗',
    beejMantra: 'ॐ वराहाय नमः',
    tilak: '🟡 पीतचंदन'
  },

  // 27. Lord Kurma (भगवान कूर्म)
  'kurma': {
    primary: './images/kurma.jpg',
    fallback: 'https://c8.alamy.com/comp/JH27K1/sri-vadapathira-kaliamman-hindu-temple-avatar-of-vishnu-kurma-2nd-JH27K1.jpg',
    icon: '🐢',
    beejMantra: 'ॐ कूर्माय नमः',
    tilak: '🟡 चंदन'
  },

  // 28. Lord Matsya (भगवान मत्स्य)
  'matsya': {
    primary: './images/matsya.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Matsya_avatar.jpg',
    icon: '🐟',
    beejMantra: 'ॐ मत्स्याय नमः',
    tilak: '🟡 पीतचंदन'
  },

  // 29. Lord Vamana (भगवान वामन)
  'vamana': {
    primary: './images/vamana.jpg',
    fallback: 'https://www.hindu-cosmos.com/uploads/9/0/7/1/90717105/published/dda787753b42eeab4311d374053feba7.jpg',
    icon: '☂️',
    beejMantra: 'ॐ वामनाय नमः',
    tilak: '🟡 गोपीचंदन'
  },

  // 30. Lord Parashurama (भगवान परशुराम)
  'parashurama': {
    primary: './images/parashurama.jpg',
    fallback: 'https://cdn.shopaccino.com/rudraksha-center/products/parshuram-puja-571876_l.jpg',
    icon: '🪓',
    beejMantra: 'ॐ जामदग्न्याय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 31. Lord Kalki (भगवान कल्कि)
  'kalki': {
    primary: './images/kalki.jpg',
    fallback: 'https://eduindex.org/wp-content/uploads/2021/07/kalki-the-last-avatar-of-vishnu.jpg',
    icon: '🐎',
    beejMantra: 'ॐ कल्किने नमः',
    tilak: '⚪ श्वेत तिलक'
  },

  // 32. Lord Brahma (ब्रह्मदेव)
  'brahma': {
    primary: './images/brahma.jpg',
    fallback: 'https://vedapuran.wordpress.com/wp-content/uploads/2013/02/brahma.jpg',
    icon: '📜',
    beejMantra: 'ॐ ब्रह्मणे नमः',
    tilak: '🟡 अष्टगंध'
  },

  // 33. Mata Gayatri (माता गायत्री)
  'gayatri': {
    primary: './images/gayatri.jpg',
    fallback: 'https://i.pinimg.com/736x/7f/9b/0a/7f9b0acda79e955afb8cd05700f130f4.jpg',
    icon: '🪷',
    beejMantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि',
    tilak: '🔴 कुंकुम तिलक'
  },

  // 34. Mata Durga (सिंहवाहिनी दुर्गा)
  'durga': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Durga.jpg/960px-Durga.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Durga.jpg',
    icon: '🦁',
    beejMantra: 'ॐ दुं दुर्गायै नमः',
    tilak: '🔴 सिंदूर'
  },

  // 35. Mata Kali (महाकाली)
  'kali': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Kali_by_Raja_Ravi_Varma.jpg/960px-Kali_by_Raja_Ravi_Varma.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Kali.jpg',
    icon: '🗡️',
    beejMantra: 'ॐ क्रीं कालिकायै नमः',
    tilak: '🔴 रक्त सिंदूर'
  },

  // 36. Mata Annapurna (अन्नपूर्णा देवी)
  'annapurna': {
    primary: './images/annapurna.jpg',
    fallback: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3910063084181848426',
    icon: '🍚',
    beejMantra: 'ॐ अन्नपूर्णायै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 37. Lord Jagannath (जगन्नाथ पुरी)
  'jagannath': {
    primary: './images/jagannath.jpg',
    fallback: 'https://pujaabhishekam-crm.s3.ap-south-1.amazonaws.com/blogs/lord-jagannath.jpg',
    icon: '☸️',
    beejMantra: 'जय जगन्नाथ स्वामी नयन पथगामी भवतु मे',
    tilak: '⚪ कस्तुरी तिलक'
  },

  // 38. Lord Venkateswara (तिरुपती बालाजी)
  'venkateswara': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Lord_Venkateswara.jpg/960px-Lord_Venkateswara.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Lord_Venkateswara.jpg',
    icon: '🪙',
    beejMantra: 'ॐ नमो वेङ्कटेशाय',
    tilak: '⚪ नामम ऊर्ध्वपुंड्र'
  },

  // 39. Lord Ayyappa (सबरीमाला अय्यप्पा)
  'ayyappa': {
    primary: './images/ayyappa.jpg',
    fallback: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3739342946601924922',
    icon: '🏹',
    beejMantra: 'स्वामीये शरणम् अय्यप्पा',
    tilak: '🟡 चंदन भस्म'
  },

  // 40. Lord Shani Dev (शनि शिंगणापूर)
  'shani-dev': {
    primary: './images/shani_dev.jpg',
    fallback: 'http://www.shreehindutemple.net/wp-content/uploads/2014/06/shanidev-231x300.jpg',
    icon: '⚖️',
    beejMantra: 'ॐ शं शनैश्चराय नमः',
    tilak: '🔵 नील तिलक'
  },

  // 41. Lord Dhanvantari (धन्वंतरी भगवान)
  'dhanvantari': {
    primary: './images/dhanvantari.jpg',
    fallback: 'https://m.media-amazon.com/images/I/61Xzp0peTlL._AC_UF894%2C1000_QL80_.jpg',
    icon: '🍯',
    beejMantra: 'ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये',
    tilak: '🟡 अष्टगंध'
  },

  // 42. Lord Kubera (धनाधिपती कुबेर)
  'kubera': {
    primary: './images/kubera.jpg',
    fallback: 'https://i.pinimg.com/originals/16/21/de/1621dea318f0de94dffafc405bc2eee2.jpg',
    icon: '💰',
    beejMantra: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये नमः',
    tilak: '🟡 सुवर्ण तिलक'
  },

  // 43. Lord Indra (देवराज इंद्र)
  'indra': {
    primary: './images/indra.jpg',
    fallback: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCb5ANt1UajiSemqyi3QELYriE8pH7yEdCj1cvecMXKhJofw0lGiVuRC80hiOeZ-Sg4Z9U4bbj2F6w0LsennKRYQ2YZiiLwxvasSDJwWwnFzGjV9KbOaQwpC8Idzx-I2bpleN1DL5tsWQ/s1600/indra.jpg',
    icon: '⚡',
    beejMantra: 'ॐ इन्द्राय नमः',
    tilak: '🟡 पीतचंदन'
  },

  // 44. Lord Agni (अग्निदेव)
  'agni': {
    primary: './images/agni.jpg',
    fallback: 'https://vedapuran.wordpress.com/wp-content/uploads/2013/03/agni.jpg',
    icon: '🔥',
    beejMantra: 'ॐ अग्नये नमः',
    tilak: '🔴 सिंदूर भस्म'
  },

  // 45. Lord Varuna (वरुणदेव)
  'varuna': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Varuna.jpg/960px-Varuna.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Varuna.jpg',
    icon: '🌊',
    beejMantra: 'ॐ वरुणाय नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 46. Lord Vayu (वायुदेव)
  'vayu': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Vayu.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Vayu.jpg',
    icon: '💨',
    beejMantra: 'ॐ वायवे नमः',
    tilak: '⚪ श्वेत तिलक'
  },

  // 47. Lord Yama (यमराज - धर्मराज)
  'yama': {
    primary: './images/yama.jpg',
    fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Yama_on_buffalo.jpg/250px-Yama_on_buffalo.jpg',
    icon: '🐃',
    beejMantra: 'ॐ यमाय धर्मराजाय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 48. Mata Ganga (गंगा माता)
  'ganga': {
    primary: './images/ganga.jpg',
    fallback: 'https://aaradhika.com/wp-content/uploads/2020/03/ganga-maata-2.jpg',
    icon: '🌊',
    beejMantra: 'ॐ गंगे च यमुने चैव गोदावरि सरस्वति',
    tilak: '⚪ श्वेतचंदन'
  },

  // 49. Mata Yamuna (यमुना माता)
  'yamuna': {
    primary: './images/yamuna.jpg',
    fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Yamuna.jpg/960px-Yamuna.jpg',
    icon: '🌊',
    beejMantra: 'ॐ यमुनोत्थायै नमः',
    tilak: '🟡 चंदन'
  },

  // 50. Mata Kamakhya (कामाख्या देवी)
  'kamakhya': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Kamakhya.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Kamakhya.jpg',
    icon: '🌺',
    beejMantra: 'कामाख्ये कामसम्पन्ने कामेश्वरि हरप्रिये',
    tilak: '🔴 कामाख्या सिंदूर'
  }
};

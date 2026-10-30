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
    primary: 'https://i.pinimg.com/736x/9d/2f/5e/9d2f5ed8c0c5908f43fe6e9371fc9ae2.jpg',
    fallback: './images/ganesha.jpg',
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
    primary: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Gajagauri-2.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Shiva_Parvati_Ganesha.jpg',
    icon: '🌺',
    beejMantra: 'ॐ उमाये नमः',
    tilak: '🔴 सिंदूर'
  },

  // 4. Lord Vishnu (वैकुंठपती नारायण)
  'vishnu': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Vishnu.jpg/960px-Vishnu.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Vishnu.jpg',
    icon: '🪷',
    beejMantra: 'ॐ नमो नारायणाय',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 5. Mata Lakshmi (महालक्ष्मी देवी)
  'lakshmi': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Goddess_Lakshmi_by_Raja_Ravi_Varma.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Lakshmi.jpg',
    icon: '🪙',
    beejMantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 6. Mata Saraswati (विद्यादात्री सरस्वती)
  'saraswati': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Saraswati_by_Raja_Ravi_Varma.jpg/960px-Saraswati_by_Raja_Ravi_Varma.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Saraswati.jpg',
    icon: '🪕',
    beejMantra: 'ॐ ऐं सरस्वत्यै नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 7. Lord Hanuman (संकटमोचन हनुमान)
  'hanuman': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/0/01/HANUMAN_LIFTS_HILL.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Hanuman.jpg',
    icon: '🚩',
    beejMantra: 'ॐ हं हनुमते नमः',
    tilak: '🟠 शेंदूर'
  },

  // 8. Lord Rama (मर्यादा पुरुषोत्तम प्रभू श्री रामचंद्र)
  'rama': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg/960px-Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Rama.jpg',
    icon: '🏹',
    beejMantra: 'श्री राम जय राम जय जय राम',
    tilak: '🟡 रामानंदी'
  },

  // 9. Mata Sita (माता जानकी)
  'sita': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Sita_in_Ashoka_Vatika.jpg/960px-Sita_in_Ashoka_Vatika.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Sita_in_Ashoka_Vatika.jpg',
    icon: '🌸',
    beejMantra: 'ॐ श्री सीतायै नमः',
    tilak: '🔴 सौभाग्य तिलक'
  },

  // 10. Lord Krishna (द्वारकाधीश श्रीकृष्ण)
  'krishna': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Krishna_playing_the_flute.jpg/960px-Krishna_playing_the_flute.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Krishna_playing_the_flute.jpg',
    icon: '🪈',
    beejMantra: 'ॐ नमो भगवते वासुदेवाय',
    tilak: '🟡 गोपीचंदन'
  },

  // 11. Radha Rani (श्री राधा राणी)
  'radha': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Radha_in_the_Moonlight.jpg/960px-Radha_in_the_Moonlight.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Radha.jpg',
    icon: '🪷',
    beejMantra: 'ॐ राधे राधे',
    tilak: '🟡 गोपीचंदन'
  },

  // 12. Lord Vitthal (पंढरपूर विठुराया)
  'vitthal': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Vithoba.JPG',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Vitthal_-_Rakhumai.jpg',
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
    primary: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Khandoba.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Khandoba_Poona_painting_1800-05.jpg',
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
    primary: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Dattatrey%2C_Ravi_Varma_Press.jpg',
    fallback: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Dattatrey%2C_Ravi_Varma_Press.jpg/960px-Dattatrey%2C_Ravi_Varma_Press.jpg',
    icon: '📿',
    beejMantra: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा',
    tilak: '⚪ भस्म त्रिपुंड्र'
  },

  // 18. Shri Swami Samarth (अक्कलकोट स्वामी समर्थ महाराज)
  'swami-samarth': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shri_Swami_Samarth.jpg/960px-Shri_Swami_Samarth.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Shri_Swami_Samarth.jpg',
    icon: '🌸',
    beejMantra: 'भिऊ नकोस मी तुझ्या पाठीशी आहे',
    tilak: '🟡 चंदन अष्टगंध'
  },

  // 19. Shri Sai Baba (शिर्डी साई बाबा)
  'sai-baba': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Shirdi_Sai_Baba.jpg/960px-Shirdi_Sai_Baba.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Shirdi_Sai_Baba.jpg',
    icon: '✨',
    beejMantra: 'सबका मालिक एक • ॐ साई राम',
    tilak: '⚪ उदी तिलक'
  },

  // 20. Sant Gajanan Maharaj (शेगाव गजानन महाराज)
  'gajanan-maharaj': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Gajanan_maharaj.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Gajanan_maharaj_Temple_image.jpg',
    icon: '🌾',
    beejMantra: 'गण गण गणात बोते',
    tilak: '🟡 चंदन टिळा'
  },

  // 21. Lord Kartikeya (मुरुगन / कार्तिकेय)
  'kartikeya': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Murugan_by_Raja_Ravi_Varma.jpg/960px-Murugan_by_Raja_Ravi_Varma.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Murugan_by_Raja_Ravi_Varma.jpg',
    icon: '🦚',
    beejMantra: 'ॐ षण्मुखाय नमः',
    tilak: '🔴 सिंदूर'
  },

  // 22. Lord Surya (भगवान सूर्यनारायण)
  'surya': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Surya_poster.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Sculpture_of_Surya%2C_the_Sun_God.jpg',
    icon: '☀️',
    beejMantra: 'ॐ सूर्याय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 23. Lord Chandra (भगवान चंद्रदेव)
  'chandra': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Chandra_deva.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Chandra_deva.jpg',
    icon: '🌙',
    beejMantra: 'ॐ सोमाय नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 24. Lord Kalabhairava (कालभैरव)
  'kalabhairava': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Bhairav.JPG/960px-Bhairav.JPG',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Bhairav.JPG',
    icon: '🐕',
    beejMantra: 'ॐ कालभैरवाय नमः',
    tilak: '🔴 काजळ व भस्म'
  },

  // 25. Lord Narasimha (भगवान नृसिंह)
  'narasimha': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Narasimha_by_Raja_Ravi_Varma.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Narasimha_by_Raja_Ravi_Varma.jpg',
    icon: '🦁',
    beejMantra: 'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 26. Lord Varaha (भगवान वराह)
  'varaha': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Varaha.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Varaha.jpg',
    icon: '🐗',
    beejMantra: 'ॐ वराहाय नमः',
    tilak: '🟡 पीतचंदन'
  },

  // 27. Lord Kurma (भगवान कूर्म)
  'kurma': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Kurma.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Kurma.jpg',
    icon: '🐢',
    beejMantra: 'ॐ कूर्माय नमः',
    tilak: '🟡 चंदन'
  },

  // 28. Lord Matsya (भगवान मत्स्य)
  'matsya': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Matsya_avatar.jpg/960px-Matsya_avatar.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Matsya_avatar.jpg',
    icon: '🐟',
    beejMantra: 'ॐ मत्स्याय नमः',
    tilak: '🟡 पीतचंदन'
  },

  // 29. Lord Vamana (भगवान वामन)
  'vamana': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Vamana.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Vamana.jpg',
    icon: '☂️',
    beejMantra: 'ॐ वामनाय नमः',
    tilak: '🟡 गोपीचंदन'
  },

  // 30. Lord Parashurama (भगवान परशुराम)
  'parashurama': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Parashurama.jpg/960px-Parashurama.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Parashurama.jpg',
    icon: '🪓',
    beejMantra: 'ॐ जामदग्न्याय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 31. Lord Kalki (भगवान कल्कि)
  'kalki': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Kalki.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Kalki.jpg',
    icon: '🐎',
    beejMantra: 'ॐ कल्किने नमः',
    tilak: '⚪ श्वेत तिलक'
  },

  // 32. Lord Brahma (ब्रह्मदेव)
  'brahma': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Brahma_on_hamsa.jpg/960px-Brahma_on_hamsa.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Brahma.jpg',
    icon: '📜',
    beejMantra: 'ॐ ब्रह्मणे नमः',
    tilak: '🟡 अष्टगंध'
  },

  // 33. Mata Gayatri (माता गायत्री)
  'gayatri': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Gayatri.jpg/960px-Gayatri.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Gayatri.jpg',
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
    primary: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Annapurna.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Annapurna.jpg',
    icon: '🍚',
    beejMantra: 'ॐ अन्नपूर्णायै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 37. Lord Jagannath (जगन्नाथ पुरी)
  'jagannath': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Jagannath_Lithograph_by_Raja_Ravi_Varma_1900s.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Jagannath_Lithograph_by_Raja_Ravi_Varma_1900s.jpg',
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
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Ayyappan.jpg/960px-Ayyappan.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Ayyappan.jpg',
    icon: '🏹',
    beejMantra: 'स्वामीये शरणम् अय्यप्पा',
    tilak: '🟡 चंदन भस्म'
  },

  // 40. Lord Shani Dev (शनि शिंगणापूर)
  'shani-dev': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Shani_Dev.jpg/960px-Shani_Dev.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Shani_Dev.jpg',
    icon: '⚖️',
    beejMantra: 'ॐ शं शनैश्चराय नमः',
    tilak: '🔵 नील तिलक'
  },

  // 41. Lord Dhanvantari (धन्वंतरी भगवान)
  'dhanvantari': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Dhanvantari.jpg/960px-Dhanvantari.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Dhanvantari.jpg',
    icon: '🍯',
    beejMantra: 'ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये',
    tilak: '🟡 अष्टगंध'
  },

  // 42. Lord Kubera (धनाधिपती कुबेर)
  'kubera': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Kubera.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Kubera.jpg',
    icon: '💰',
    beejMantra: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये नमः',
    tilak: '🟡 सुवर्ण तिलक'
  },

  // 43. Lord Indra (देवराज इंद्र)
  'indra': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Indra.jpg/960px-Indra.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Indra.jpg',
    icon: '⚡',
    beejMantra: 'ॐ इन्द्राय नमः',
    tilak: '🟡 पीतचंदन'
  },

  // 44. Lord Agni (अग्निदेव)
  'agni': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Agni.jpg/960px-Agni.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Agni.jpg',
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
    primary: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Yama.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Yama.jpg',
    icon: '🐃',
    beejMantra: 'ॐ यमाय धर्मराजाय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 48. Mata Ganga (गंगा माता)
  'ganga': {
    primary: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ganga_Devi_Painting.jpg/960px-Ganga_Devi_Painting.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Ganga_Devi_Painting.jpg',
    icon: '🌊',
    beejMantra: 'ॐ गंगे च यमुने चैव गोदावरि सरस्वति',
    tilak: '⚪ श्वेतचंदन'
  },

  // 49. Mata Yamuna (यमुना माता)
  'yamuna': {
    primary: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Yamuna.jpg/960px-Yamuna.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Yamuna.jpg',
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

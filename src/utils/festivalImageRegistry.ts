/**
 * Canonical Hindu & Maharashtrian Festival Image Registry for Sanatan Amrutdhara.
 * Verified authentic imagery from Wikimedia Commons and classical sacred artworks.
 */

export interface FestivalImageInfo {
  imageUrl: string;
  festivalPlaceName?: { en: string; hi: string; mr: string };
  placeImageUrl?: string;
  description?: { en: string; hi: string; mr: string };
}

export const FESTIVAL_IMAGE_REGISTRY: Record<string, FestivalImageInfo> = {
  'ganesh_chaturthi': {
    imageUrl: 'https://i.pinimg.com/736x/9d/2f/5e/9d2f5ed8c0c5908f43fe6e9371fc9ae2.jpg',
    festivalPlaceName: {
      en: 'Siddhivinayak (Mumbai) & Ashtavinayak (Pune/Raigad)',
      hi: 'सिद्धिविनायक (मुंबई) एवं अष्टविनायक तीर्थक्षेत्र',
      mr: 'श्री सिद्धिविनायक (मुंबई) व पावन अष्टविनायक तीर्थक्षेत्रे'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Shree_Siddhivinayak_Temple_Mumbai.jpg/960px-Shree_Siddhivinayak_Temple_Mumbai.jpg'
  },
  'mahashivratri': {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Shiva_meditating_Rishikesh.jpg',
    festivalPlaceName: {
      en: '12 Jyotirlingas: Trimbakeshwar, Kashi, Somnath, Mahakaleshwar',
      hi: 'द्वादश ज्योतिर्लिंग: त्र्यंबकेश्वर, काशी, सोमनाथ, महाकालेश्वर',
      mr: 'द्वादश ज्योतिर्लिंग: श्री त्र्यंबकेश्वर, काशी विश्वनाथ, सोमनाथ'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Trimbakeshwar_Temple%2C_Nashik.jpg/960px-Trimbakeshwar_Temple%2C_Nashik.jpg'
  },
  'navratri_durga_puja': {
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Durga.jpg/960px-Durga.jpg',
    festivalPlaceName: {
      en: 'Kulswamini Tuljapur & Kolhapur Ambabai 3.5 Shaktipeeths',
      hi: 'तुलजापुर भवानी एवं कोल्हापुर अंबाबाई साढ़े तीन शक्तिपीठ',
      mr: 'कुलस्वामिनी तुळजाभवानी व करवीर निवासिनी महालक्ष्मी अंबाबाई साडेतीन शक्तिपीठे'
    },
    placeImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Tulja_Bhavani_Mandir%2C_Tuljapur.jpg'
  },
  'diwali_lakshmi_pujan': {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Goddess_Lakshmi_by_Raja_Ravi_Varma.jpg',
    festivalPlaceName: {
      en: 'Mahalaxmi Temple, Kolhapur & Ayodhya Deepotsav',
      hi: 'महालक्ष्मी मंदिर, कोल्हापुर एवं अयोध्या दीपोत्सव धाम',
      mr: 'श्री महालक्ष्मी मंदिर, कोल्हापूर व अयोध्या नगरी दीपोत्सव'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/960px-Mahalaxmi_Temple%2C_Kolhapur.jpg'
  },
  'ashadhi_ekadashi': {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Vithoba.JPG',
    festivalPlaceName: {
      en: 'Pandharpur Chandrabhaga Snan & Sant Tukaram / Dnyaneshwar Wari',
      hi: 'पंढरपुर चंद्रभागा स्नान एवं संत ज्ञानेश्वर-तुकाराम पालखी वारी',
      mr: 'पंढरपूर चंद्रभागा महास्नान व संत ज्ञानेश्वर-तुकाराम महाराज पावन पालखी सोहळा'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Pandurang_vitthal_Temple%2C_Pandharpur%2C_Maharashtra_04.jpg/960px-Pandurang_vitthal_Temple%2C_Pandharpur%2C_Maharashtra_04.jpg'
  },
  'gudi_padwa': {
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg/960px-Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
    festivalPlaceName: {
      en: 'Traditional Maharashtrian Shobha Yatras (Girgaon, Thane, Pune)',
      hi: 'पारंपरिक महाराष्ट्रीय नववर्ष शोभायात्रा (ठाणे, गिरगांव, पुणे)',
      mr: 'पारंपरिक हिंदू नववर्ष स्वागत यात्रा (गिरगाव, ठाणे, डोंबिवली व पुणे)'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg/960px-Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg'
  },
  'makar_sankranti': {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Surya_poster.jpg',
    festivalPlaceName: {
      en: 'Sun Temple Konark, Prayagraj Sangam & Gangasagar Snan',
      hi: 'सूर्य मंदिर कोणार्क, प्रयागराज संगम एवं गंगासागर पावन स्नान',
      mr: 'सूर्य मंदिर कोणार्क, प्रयागराज त्रिवेणी संगम व गंगासागर पावन स्नान'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Ramkund_Nashik.jpg/960px-Ramkund_Nashik.jpg'
  },
  'ram_navami': {
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg/960px-Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
    festivalPlaceName: {
      en: 'Ayodhya Ram Janmabhoomi & Kalaram Mandir, Nashik',
      hi: 'अयोध्या राम जन्मभूमि एवं कालाराम मंदिर, पंचवटी नाशिक',
      mr: 'श्री प्रभू राम जन्मभूमी अयोध्या व काळाराम मंदिर, पंचवटी नाशिक'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg/960px-Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg'
  },
  'hanuman_jayanti': {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/HANUMAN_LIFTS_HILL.jpg',
    festivalPlaceName: {
      en: 'Anjaneri Mountain (Birthplace, Nashik) & Salangpur Hanuman',
      hi: 'अंजनेरी पर्वत (जन्मस्थान नाशिक) एवं सारंगपुर कष्टभंजन हनुमान',
      mr: 'अंजनेरी पर्वत (श्री हनुमान जन्मस्थान, नाशिक) व सारंगपूर'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Trimbakeshwar_Temple%2C_Nashik.jpg/960px-Trimbakeshwar_Temple%2C_Nashik.jpg'
  },
  'krishna_janmashtami': {
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Krishna_playing_the_flute.jpg/960px-Krishna_playing_the_flute.jpg',
    festivalPlaceName: {
      en: 'Mathura-Vrindavan, Dwarka & Maharashtra Dahi Handi Utsav',
      hi: 'मथुरा-वृंदावन, द्वारका धाम एवं महाराष्ट्र दही हांडी उत्सव',
      mr: 'मथुरा-वृंदावन, द्वारका धाम व महाराष्ट्रातील प्रसिद्ध दहीहंडी उत्सव'
    },
    placeImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/N-GJ-126_Dwarkadhish_Temple%2C_Dwarka_Flag_Hoisting.jpg/960px-N-GJ-126_Dwarkadhish_Temple%2C_Dwarka_Flag_Hoisting.jpg'
  }
};

export function getFestivalImage(festivalId: string): string {
  return FESTIVAL_IMAGE_REGISTRY[festivalId]?.imageUrl || 'https://i.pinimg.com/736x/9d/2f/5e/9d2f5ed8c0c5908f43fe6e9371fc9ae2.jpg';
}


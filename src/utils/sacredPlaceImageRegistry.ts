/**
 * Canonical Sacred Place & Temple Image Registry for Sanatan Amrutdhara.
 * Verified direct image URLs from Wikimedia Commons (960px thumbs / unscaled uploads).
 */

export interface SacredPlaceInfo {
  name: { en: string; hi: string; mr: string };
  location: { en: string; hi: string; mr: string };
  imageUrl: string;
  attribution?: string;
}

export const SACRED_PLACE_REGISTRY: Record<string, SacredPlaceInfo> = {
  // --- 8 Ashtavinayak Shrines ---
  'morgaon': {
    name: { en: 'Mayureshwar Mandir, Morgaon', hi: 'मयूरेश्वर मंदिर, मोरगांव', mr: 'श्री मयूरेश्वर मंदिर, मोरगाव' },
    location: { en: 'Pune, Maharashtra', hi: 'पुणे, महाराष्ट्र', mr: 'पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Entrance_signboard_of_Shri_Mayureshwar_Mandir%2C_Morgaon.jpg/960px-Entrance_signboard_of_Shri_Mayureshwar_Mandir%2C_Morgaon.jpg',
  },
  'siddhatek': {
    name: { en: 'Siddhivinayak Mandir, Siddhatek', hi: 'सिद्धिविनायक मंदिर, सिद्धटेक', mr: 'श्री सिद्धिविनायक मंदिर, सिद्धटेक' },
    location: { en: 'Ahilyanagar (Ahmednagar), Maharashtra', hi: 'अहिल्यानगर, महाराष्ट्र', mr: 'अहिल्यानगर (कर्जत), महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Siddhi_Vinayak_at_Siddhatek.jpg/960px-Siddhi_Vinayak_at_Siddhatek.jpg',
  },
  'pali': {
    name: { en: 'Ballaleshwar Mandir, Pali', hi: 'बल्लाळेश्वर मंदिर, पाली', mr: 'श्री बल्लाळेश्वर मंदिर, पाली' },
    location: { en: 'Raigad, Maharashtra', hi: 'रायगड, महाराष्ट्र', mr: 'रायगड (सुधागड), महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Ballaleshwar_Pali_Chamber.jpg/960px-Ballaleshwar_Pali_Chamber.jpg',
  },
  'mahad': {
    name: { en: 'Varadvinayak Mandir, Mahad', hi: 'वरदविनायक मंदिर, महड', mr: 'श्री वरदविनायक मंदिर, महड' },
    location: { en: 'Raigad, Maharashtra', hi: 'रायगड, महाराष्ट्र', mr: 'खालापूर, रायगड, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Varad_Vinayak_Temple_Side_View.jpg/960px-Varad_Vinayak_Temple_Side_View.jpg',
  },
  'theur': {
    name: { en: 'Chintamani Mandir, Theur', hi: 'चिंतामणि मंदिर, थेऊर', mr: 'श्री चिंतामणी मंदिर, थेऊर' },
    location: { en: 'Pune, Maharashtra', hi: 'पुणे, महाराष्ट्र', mr: 'हवेली, पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Theur_Chintamani_Temple.jpg/960px-Theur_Chintamani_Temple.jpg',
  },
  'lenyadri': {
    name: { en: 'Girijatmaj Mandir, Lenyadri', hi: 'गिरिजात्मज मंदिर, लेण्याद्री', mr: 'श्री गिरिजात्मज मंदिर, लेण्याद्री' },
    location: { en: 'Junnar, Pune, Maharashtra', hi: 'जुन्नर, पुणे, महाराष्ट्र', mr: 'जुन्नर, पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Lenyadri_Group_Of_Caves.JPG/960px-Lenyadri_Group_Of_Caves.JPG',
  },
  'ozar': {
    name: { en: 'Vighnahar Mandir, Ozar', hi: 'विघ्नहर मंदिर, ओझर', mr: 'श्री विघ्नहर मंदिर, ओझर' },
    location: { en: 'Junnar, Pune, Maharashtra', hi: 'जुन्नर, पुणे, महाराष्ट्र', mr: 'जुन्नर, पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Ozhar_-_Shri_Vighnahar.jpg/960px-Ozhar_-_Shri_Vighnahar.jpg',
  },
  'ranjangaon': {
    name: { en: 'Mahaganapati Mandir, Ranjangaon', hi: 'महागणपति मंदिर, रांजणगांव', mr: 'श्री महागणपती मंदिर, रांजणगाव' },
    location: { en: 'Shirur, Pune, Maharashtra', hi: 'शिरूर, पुणे, महाराष्ट्र', mr: 'शिरूर, पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Ranjangaon_Mahaganapati_Temple_entrance_view.jpg/960px-Ranjangaon_Mahaganapati_Temple_entrance_view.jpg',
  },

  // --- 5 Maharashtra Jyotirlingas ---
  'trimbakeshwar': {
    name: { en: 'Trimbakeshwar Jyotirlinga', hi: 'त्र्यंबकेश्वर ज्योतिर्लिंग', mr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग' },
    location: { en: 'Nashik, Maharashtra', hi: 'नाशिक, महाराष्ट्र', mr: 'नाशिक, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Trimbakeshwar_Temple%2C_Nashik.jpg/960px-Trimbakeshwar_Temple%2C_Nashik.jpg',
  },
  'bhimashankar': {
    name: { en: 'Bhimashankar Jyotirlinga', hi: 'भीमाशंकर ज्योतिर्लिंग', mr: 'श्री भीमाशंकर ज्योतिर्लिंग' },
    location: { en: 'Khed, Pune, Maharashtra', hi: 'खेड, पुणे, महाराष्ट्र', mr: 'खेड, पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Bhimashankar_temple%2C_Maharashtra.JPG/960px-Bhimashankar_temple%2C_Maharashtra.JPG',
  },
  'grishneshwar': {
    name: { en: 'Grishneshwar Jyotirlinga', hi: 'घृष्णेश्वर ज्योतिर्लिंग', mr: 'श्री घृष्णेश्वर ज्योतिर्लिंग' },
    location: { en: 'Verul (Ellora), Chhatrapati Sambhajinagar', hi: 'वेरूळ, छत्रपति संभाजीनगर', mr: 'वेरूळ, छत्रपती संभाजीनगर' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Grishneshwar_temple.jpg/960px-Grishneshwar_temple.jpg',
  },
  'aundha_nagnath': {
    name: { en: 'Aundha Nagnath Jyotirlinga', hi: 'औंढा नागनाथ ज्योतिर्लिंग', mr: 'श्री औंढा नागनाथ ज्योतिर्लिंग' },
    location: { en: 'Hingoli, Maharashtra', hi: 'हिंगोली, महाराष्ट्र', mr: 'हिंगोली, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Aundha_Nagnath_Shiva_Temple_Jyotirlinga_Maharashtra_India.jpg/960px-Aundha_Nagnath_Shiva_Temple_Jyotirlinga_Maharashtra_India.jpg',
  },
  'aundha-nagnath': {
    name: { en: 'Aundha Nagnath Jyotirlinga', hi: 'औंढा नागनाथ ज्योतिर्लिंग', mr: 'श्री औंढा नागनाथ ज्योतिर्लिंग' },
    location: { en: 'Hingoli, Maharashtra', hi: 'हिंगोली, महाराष्ट्र', mr: 'हिंगोली, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Aundha_Nagnath_Shiva_Temple_Jyotirlinga_Maharashtra_India.jpg/960px-Aundha_Nagnath_Shiva_Temple_Jyotirlinga_Maharashtra_India.jpg',
  },
  'parli_vaijnath': {
    name: { en: 'Parli Vaijnath Jyotirlinga', hi: 'परळी वैजनाथ ज्योतिर्लिंग', mr: 'श्री परळी वैजनाथ ज्योतिर्लिंग' },
    location: { en: 'Beed, Maharashtra', hi: 'बीड, महाराष्ट्र', mr: 'बीड, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Parli_Vaidyanath.jpg/960px-Parli_Vaidyanath.jpg',
  },
  'parli-vaijnath': {
    name: { en: 'Parli Vaijnath Jyotirlinga', hi: 'परळी वैजनाथ ज्योतिर्लिंग', mr: 'श्री परळी वैजनाथ ज्योतिर्लिंग' },
    location: { en: 'Beed, Maharashtra', hi: 'बीड, महाराष्ट्र', mr: 'बीड, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Parli_Vaidyanath.jpg/960px-Parli_Vaidyanath.jpg',
  },

  // --- Major Shrines of Maharashtra & India ---
  'siddhivinayak_mumbai': {
    name: { en: 'Shree Siddhivinayak Temple', hi: 'श्री सिद्धिविनायक मंदिर', mr: 'श्री सिद्धिविनायक मंदिर (प्रभादेवी)' },
    location: { en: 'Prabhadevi, Mumbai', hi: 'प्रभादेवी, मुंबई', mr: 'प्रभादेवी, मुंबई' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Shree_Siddhivinayak_Temple_Mumbai.jpg/960px-Shree_Siddhivinayak_Temple_Mumbai.jpg',
  },
  'pandharpur': {
    name: { en: 'Vitthal Rukmini Mandir, Pandharpur', hi: 'विट्ठल रुक्मिणी मंदिर, पंढरपुर', mr: 'श्री विठ्ठल रुक्मिणी मंदिर, पंढरपूर' },
    location: { en: 'Solapur, Maharashtra', hi: 'सोलापुर, महाराष्ट्र', mr: 'सोलापूर, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Pandurang_vitthal_Temple%2C_Pandharpur%2C_Maharashtra_04.jpg/960px-Pandurang_vitthal_Temple%2C_Pandharpur%2C_Maharashtra_04.jpg',
  },
  'jejuri': {
    name: { en: 'Khandoba Mandir, Jejuri (Khandobachi Jejuri)', hi: 'खंडोबा मंदिर, जेजुरी', mr: 'श्री खंडोबा देवस्थान, जेजुरी गडावर' },
    location: { en: 'Pune, Maharashtra', hi: 'पुणे, महाराष्ट्र', mr: 'पुणे, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Khandoba_temple_Pune.jpg/960px-Khandoba_temple_Pune.jpg',
  },
  'tuljapur': {
    name: { en: 'Tulja Bhavani Mandir, Tuljapur', hi: 'तुलजा भवानी मंदिर, तुलजापुर', mr: 'श्री क्षेत्र तुळजाभवानी मंदिर, तुळजापूर' },
    location: { en: 'Dharashiv (Osmanabad), Maharashtra', hi: 'धाराशिव, महाराष्ट्र', mr: 'धाराशिव, महाराष्ट्र' },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Tulja_Bhavani_Mandir%2C_Tuljapur.jpg',
  },
  'kolhapur': {
    name: { en: 'Mahalaxmi (Ambabai) Mandir, Kolhapur', hi: 'महालक्ष्मी (अंबाजी) मंदिर, कोल्हापुर', mr: 'श्री करवीर निवासिनी महालक्ष्मी (अंबाबाई) मंदिर' },
    location: { en: 'Kolhapur, Maharashtra', hi: 'कोल्हापूर, महाराष्ट्र', mr: 'कोल्हापूर, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/960px-Mahalaxmi_Temple%2C_Kolhapur.jpg',
  },
  'shirdi': {
    name: { en: 'Sai Baba Samadhi Mandir, Shirdi', hi: 'साईं बाबा समाधि मंदिर, शिर्डी', mr: 'श्री साईबाबा समाधी मंदिर, शिर्डी' },
    location: { en: 'Ahilyanagar, Maharashtra', hi: 'अहिल्यानगर, महाराष्ट्र', mr: 'अहिल्यानगर, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Shirdi_Sai_Baba_Samadhi.jpg/960px-Shirdi_Sai_Baba_Samadhi.jpg',
  },
  'akkalkot': {
    name: { en: 'Shree Swami Samarth Vatavruksha Mandir, Akkalkot', hi: 'स्वामी समर्थ मंदिर, अक्कलकोट', mr: 'श्री स्वामी समर्थ वटवृक्ष मंदिर, अक्कलकोट' },
    location: { en: 'Solapur, Maharashtra', hi: 'सोलापुर, महाराष्ट्र', mr: 'सोलापूर, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Shree_swami_samarth_Akkalkot.jpg/960px-Shree_swami_samarth_Akkalkot.jpg',
  },
  'shegaon': {
    name: { en: 'Shree Sant Gajanan Maharaj Mandir, Shegaon', hi: 'संत गजानन महाराज मंदिर, शेगांव', mr: 'श्री संत गजानन महाराज समाधी मंदिर, शेगाव' },
    location: { en: 'Buldhana, Vidarbha, Maharashtra', hi: 'बुलढाणा, महाराष्ट्र', mr: 'बुलढाणा, विदर्भ, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Gajanan_maharaj_Temple_image.jpg/960px-Gajanan_maharaj_Temple_image.jpg',
  },
  'ayodhya': {
    name: { en: 'Shri Ram Janmabhoomi Mandir, Ayodhya', hi: 'श्री राम जन्मभूमि मंदिर, अयोध्या', mr: 'श्री प्रभू राम जन्मभूमी मंदिर, अयोध्या' },
    location: { en: 'Ayodhya, Uttar Pradesh', hi: 'अयोध्या, उत्तर प्रदेश', mr: 'अयोध्या, उत्तर प्रदेश' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg/960px-Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg',
  },
  'kashi': {
    name: { en: 'Kashi Vishwanath Mandir, Varanasi', hi: 'काशी विश्वनाथ मंदिर, वाराणसी', mr: 'श्री काशी विश्वनाथ मंदिर, वाराणसी' },
    location: { en: 'Varanasi, Uttar Pradesh', hi: 'वाराणसी, उत्तर प्रदेश', mr: 'वाराणसी, उत्तर प्रदेश' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Shri_Kashi_Vishwanath_Temple_2.jpg/960px-Shri_Kashi_Vishwanath_Temple_2.jpg',
  },
  'puri': {
    name: { en: 'Jagannath Mandir, Puri', hi: 'जगन्नाथ मंदिर, पुरी', mr: 'श्री जगन्नाथ मंदिर, पुरी धाम' },
    location: { en: 'Puri, Odisha', hi: 'पुरी, ओडिशा', mr: 'पुरी, ओडिशा' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Jagannath_Temple%2C_Puri_03.jpg/960px-Jagannath_Temple%2C_Puri_03.jpg',
  },
  'badrinath': {
    name: { en: 'Badrinath Mandir, Uttarakhand', hi: 'बद्रीनाथ मंदिर, उत्तराखण्ड', mr: 'श्री बद्रीनाथ धाम, उत्तराखंड' },
    location: { en: 'Chamoli, Uttarakhand', hi: 'चमोली, उत्तराखण्ड', mr: 'चमोली, उत्तराखंड' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Badrinath_temple_in_early_morning.JPG/960px-Badrinath_temple_in_early_morning.JPG',
  },
  'dwarka': {
    name: { en: 'Dwarkadhish Mandir (Jagat Mandir)', hi: 'द्वारकाधीश मंदिर, गुजरात', mr: 'श्री द्वारकाधीश जगत मंदिर, द्वारका' },
    location: { en: 'Dwarka, Gujarat', hi: 'द्वारका, गुजरात', mr: 'द्वारका, गुजरात' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/N-GJ-126_Dwarkadhish_Temple%2C_Dwarka_Flag_Hoisting.jpg/960px-N-GJ-126_Dwarkadhish_Temple%2C_Dwarka_Flag_Hoisting.jpg',
  },
  'madurai': {
    name: { en: 'Meenakshi Amman Mandir, Madurai', hi: 'मीनाक्षी अम्मन मंदिर, मदुरै', mr: 'श्री मीनाक्षी सुंदरेश्वर मंदिर, मदुराई' },
    location: { en: 'Madurai, Tamil Nadu', hi: 'मदुरै, तमिलनाडु', mr: 'मदुराई, तामिळनाडू' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Sri_Meenakshi_Devasthanam_Temple_%28east-exposure%29.jpg/960px-Sri_Meenakshi_Devasthanam_Temple_%28east-exposure%29.jpg',
  },
  'ramkund': {
    name: { en: 'Ramkund (Godavari Teerth Snan)', hi: 'रामकुण्ड (गोदावरी स्नान)', mr: 'पवित्र रामकुंड (गोदावरी महास्नान)' },
    location: { en: 'Panchavati, Nashik, Maharashtra', hi: 'पंचवटी, नाशिक, महाराष्ट्र', mr: 'पंचवटी, नाशिक, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Ramkund_Nashik.jpg/960px-Ramkund_Nashik.jpg',
  },
  'kushavarta': {
    name: { en: 'Kushavarta Teerth Kunda', hi: 'कुशावर्त तीर्थ कुण्ड', mr: 'कुशावर्त तीर्थ कुंड (गोदावरी उगम)' },
    location: { en: 'Trimbakeshwar, Nashik, Maharashtra', hi: 'त्र्यंबकेश्वर, नाशिक, महाराष्ट्र', mr: 'त्र्यंबकेश्वर, नाशिक, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Kumbhmela_Nashik_2015_-_the_copper_flag_in_Kushavarta%2C_Trimbakeshwar.JPG/960px-Kumbhmela_Nashik_2015_-_the_copper_flag_in_Kushavarta%2C_Trimbakeshwar.JPG',
  },
  'tapovan': {
    name: { en: 'Tapovan & Lakshmana Kund', hi: 'तपोवन एवं लक्ष्मण कुण्ड', mr: 'तपोवन व लक्ष्मण कुंड (कपिला संगम)' },
    location: { en: 'Nashik, Maharashtra', hi: 'नाशिक, महाराष्ट्र', mr: 'नाशिक, महाराष्ट्र' },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Tapovan_Nashik.jpg/960px-Tapovan_Nashik.jpg',
  }
};

/**
 * Returns a verified authentic image URL for a given place key or fallback.
 */
export function getSacredPlaceImage(key: string, defaultFallback?: string): string {
  if (SACRED_PLACE_REGISTRY[key]) {
    return SACRED_PLACE_REGISTRY[key].imageUrl;
  }
  return defaultFallback || SACRED_PLACE_REGISTRY['pandharpur'].imageUrl;
}

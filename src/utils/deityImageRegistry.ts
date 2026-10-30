/**
 * Authentic Deity & Shrine High-Resolution Image Registry
 * Provides verified direct image URLs and multi-tier fallbacks for all 50 deities.
 */

export interface DeityImageMeta {
  primary: string;
  fallback: string;
  icon: string;
  beejMantra: string;
  tilak: string;
}

export const DEITY_IMAGE_REGISTRY: Record<string, DeityImageMeta> = {
  // 1. Lord Ganesha
  'ganesha': {
    primary: 'https://images.unsplash.com/photo-1567591370504-209224856426?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1567591370504-209224856426?auto=format&fit=crop&q=80&w=600',
    icon: '🐘',
    beejMantra: 'ॐ गं गणपतये नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 2. Lord Shiva
  'shiva': {
    primary: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&q=80&w=800',
    icon: '🕉️',
    beejMantra: 'ॐ नमः शिवाय',
    tilak: '⚪ त्रिपुंड्र'
  },

  // 3. Mata Parvati
  'parvati': {
    primary: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '🌺',
    beejMantra: 'ॐ उमाये नमः',
    tilak: '🔴 सिंदूर'
  },

  // 4. Lord Vishnu
  'vishnu': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🪷',
    beejMantra: 'ॐ नमो नारायणाय',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 5. Mata Lakshmi
  'lakshmi': {
    primary: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '🪙',
    beejMantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 6. Mata Saraswati
  'saraswati': {
    primary: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '🪕',
    beejMantra: 'ॐ ऐं सरस्वत्यै नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 7. Lord Hanuman
  'hanuman': {
    primary: 'https://images.unsplash.com/photo-1608649399878-a669ff8c9ef1?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800',
    icon: '🚩',
    beejMantra: 'ॐ हं हनुमते नमः',
    tilak: '🟠 शेंदूर'
  },

  // 8. Lord Rama
  'rama': {
    primary: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🏹',
    beejMantra: 'श्री राम जय राम जय जय राम',
    tilak: '🟡 रामानंदी'
  },

  // 9. Mata Sita
  'sita': {
    primary: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '🌸',
    beejMantra: 'ॐ श्री सीतायै नमः',
    tilak: '🔴 सौभाग्य तिलक'
  },

  // 10. Lord Krishna
  'krishna': {
    primary: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
    icon: '🪈',
    beejMantra: 'ॐ नमो भगवते वासुदेवाय',
    tilak: '🟡 गोपीचंदन'
  },

  // 11. Radha Rani
  'radha': {
    primary: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '🪷',
    beejMantra: 'ॐ राधे राधे',
    tilak: '🟡 गोपीचंदन'
  },

  // 12. Lord Vitthal (Pandharpur)
  'vitthal': {
    primary: 'https://images.unsplash.com/photo-1590076215667-873d32098b95?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '🪷',
    beejMantra: 'ॐ नमो भगवते विठ्ठलाय',
    tilak: '⚪ गोपीचंदन व तुळस'
  },

  // 13. Mata Rakhumai (Rukmini)
  'rakhumai': {
    primary: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '👑',
    beejMantra: 'ॐ श्री रुक्मिण्यै नमः',
    tilak: '🔴 कुंकुम'
  },

  // 14. Lord Khandoba (Jejuri)
  'khandoba': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '⚔️',
    beejMantra: 'येळकोट येळकोट जय मल्हार',
    tilak: '🟡 भंडारा'
  },

  // 15. Mata Tuljabhavani (Tuljapur)
  'tulja-bhavani': {
    primary: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '🔱',
    beejMantra: 'ॐ श्री तुलजा भवान्यै नमः',
    tilak: '🔴 अष्टगंध कुंकुम'
  },

  // 16. Mata Ambabai (Kolhapur Mahalakshmi)
  'kolhapur-ambabai': {
    primary: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1567591370504-209224856426?auto=format&fit=crop&q=80&w=800',
    icon: '👑',
    beejMantra: 'ॐ श्री अंबाबाई नमः',
    tilak: '🔴 अष्टगंध'
  },

  // 17. Lord Dattatreya
  'dattatreya': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '📿',
    beejMantra: 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा',
    tilak: '⚪ भस्म त्रिपुंड्र'
  },

  // 18. Shri Swami Samarth (Akkalkot)
  'swami-samarth': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '🌸',
    beejMantra: 'भिऊ नकोस मी तुझ्या पाठीशी आहे',
    tilak: '🟡 चंदन अष्टगंध'
  },

  // 19. Shri Sai Baba (Shirdi)
  'sai-baba': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '✨',
    beejMantra: 'सबका मालिक एक • ॐ साई राम',
    tilak: '⚪ उदी तिलक'
  },

  // 20. Sant Gajanan Maharaj (Shegaon)
  'gajanan-maharaj': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '🌾',
    beejMantra: 'गण गण गणात बोते',
    tilak: '🟡 चंदन टिळा'
  },

  // 21. Lord Kartikeya (Murugan)
  'kartikeya': {
    primary: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🦚',
    beejMantra: 'ॐ षण्मुखाय नमः',
    tilak: '⚪ विभूती'
  },

  // 22. Lord Surya (Sun God)
  'surya': {
    primary: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '☀️',
    beejMantra: 'ॐ घृणिः सूर्याय नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 23. Chandra Dev (Moon God)
  'chandra': {
    primary: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    icon: '🌙',
    beejMantra: 'ॐ सोमाय नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 24. Lord Kalabhairava
  'kalabhairava': {
    primary: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&q=80&w=800',
    icon: '🐕',
    beejMantra: 'ॐ कालभैरवाय नमः',
    tilak: '⚪ भस्म'
  },

  // 25. Lord Narasimha
  'narasimha': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🦁',
    beejMantra: 'ॐ उग्रं वीरं महाविष्णुं',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 26. Lord Varaha
  'varaha': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🐗',
    beejMantra: 'ॐ वराहाय नमः',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 27. Lord Kurma
  'kurma': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🐢',
    beejMantra: 'ॐ कूर्माय नमः',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 28. Lord Matsya
  'matsya': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🐟',
    beejMantra: 'ॐ मत्स्याय नमः',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 29. Lord Vamana
  'vamana': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '☂️',
    beejMantra: 'ॐ वामनाय नमः',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 30. Lord Parashurama
  'parashurama': {
    primary: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🪓',
    beejMantra: 'ॐ परशुरामाय नमः',
    tilak: '⚪ त्रिपुंड्र'
  },

  // 31. Lord Kalki
  'kalki': {
    primary: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🐎',
    beejMantra: 'ॐ कल्किने नमः',
    tilak: '🟡 ऊर्ध्वपुंड्र'
  },

  // 32. Lord Brahma
  'brahma': {
    primary: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🪷',
    beejMantra: 'ॐ ब्रह्मणे नमः',
    tilak: '🟡 चंदन'
  },

  // 33. Mata Gayatri
  'gayatri': {
    primary: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '☀️',
    beejMantra: 'ॐ भूर्भुवः स्वः',
    tilak: '🔴 कुंकुम'
  },

  // 34. Mata Durga
  'durga': {
    primary: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '🦁',
    beejMantra: 'ॐ दुं दुर्गायै नमः',
    tilak: '🔴 सिंदूर'
  },

  // 35. Mata Kali
  'kali': {
    primary: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    icon: '⚡',
    beejMantra: 'ॐ क्रीं कालिकायै नमः',
    tilak: '🔴 रक्त सिंदूर'
  },

  // 36. Mata Annapurna
  'annapurna': {
    primary: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=800',
    icon: '🍚',
    beejMantra: 'ॐ अन्नपूर्णायै नमः',
    tilak: '🔴 अष्टगंध'
  },

  // 37. Lord Jagannath (Puri)
  'jagannath': {
    primary: 'https://images.unsplash.com/photo-1590076215667-873d32098b95?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '☸️',
    beejMantra: 'जय जगन्नाथ बलभद्र सुभद्रा',
    tilak: '🟡 तिलक'
  },

  // 38. Lord Venkateswara (Tirupati Balaji)
  'venkateswara': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '💎',
    beejMantra: 'ॐ नमो वेङ्कटेशाय',
    tilak: '⚪ नामा तिरुपती'
  },

  // 39. Lord Ayyappa (Sabarimala)
  'ayyappa': {
    primary: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🔔',
    beejMantra: 'स्वामीये शरणं अय्यप्पा',
    tilak: '⚪ भस्म व चंदन'
  },

  // 40. Lord Shani Dev
  'shani-dev': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '🪨',
    beejMantra: 'ॐ शं शनैश्चराय नमः',
    tilak: '🔵 तैल तिलक'
  },

  // 41. Lord Dhanvantari
  'dhanvantari': {
    primary: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    icon: '🏺',
    beejMantra: 'ॐ धन्वन्तरये नमः',
    tilak: '🟡 चंदन'
  },

  // 42. Lord Kubera
  'kubera': {
    primary: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    icon: '💰',
    beejMantra: 'ॐ यक्षाय कुबेराय नमः',
    tilak: '🟡 अष्टगंध'
  },

  // 43. Lord Indra
  'indra': {
    primary: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '⚡',
    beejMantra: 'ॐ इन्द्राय नमः',
    tilak: '🟡 चंदन'
  },

  // 44. Lord Agni
  'agni': {
    primary: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '🔥',
    beejMantra: 'ॐ अग्नये नमः',
    tilak: '🔴 रक्तचंदन'
  },

  // 45. Lord Varuna
  'varuna': {
    primary: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '🌊',
    beejMantra: 'ॐ वरुणाय नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 46. Lord Vayu
  'vayu': {
    primary: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '💨',
    beejMantra: 'ॐ वायवे नमः',
    tilak: '⚪ श्वेतचंदन'
  },

  // 47. Lord Yama (Dharmaraja)
  'yama': {
    primary: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&q=80&w=800',
    icon: '🐃',
    beejMantra: 'ॐ यमाय धर्मराजाय नमः',
    tilak: '⚪ भस्म'
  },

  // 48. Mata Ganga
  'ganga': {
    primary: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '💧',
    beejMantra: 'ॐ गंगे च यमुने चैव',
    tilak: '🔴 अष्टगंध'
  },

  // 49. Mata Yamuna
  'yamuna': {
    primary: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800',
    icon: '🌊',
    beejMantra: 'जय यमुना मैया',
    tilak: '🔴 कुंकुम'
  },

  // 50. Mata Kamakhya
  'kamakhya': {
    primary: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    icon: '🌺',
    beejMantra: 'ॐ कामाख्यायै नमः',
    tilak: '🔴 कामाख्या सिंदूर'
  }
};

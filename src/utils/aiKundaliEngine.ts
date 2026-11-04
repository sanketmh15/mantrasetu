import { RashiInfo, rashiDatabase, NakshatraInfo, nakshatraDatabase } from '../data/rashiGuideData';

export interface UserBirthData {
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
  specificQuery?: string;
  apiKey?: string;
}

export interface PlanetPlacement {
  name: string;
  symbol: string;
  house: number;
  rashiName: string;
  degree: number;
  status: 'उच्च (Exalted)' | 'स्वराशी (Own)' | 'मित्र (Friendly)' | 'सम (Neutral)' | 'शत्रू (Enemy)' | 'नीच (Debilitated)';
  isRetrograde?: boolean;
}

export interface HouseDetail {
  houseNumber: number;
  nameMr: string;
  nameEn: string;
  signNumber: number; // 1 to 12 (Mesha to Meena)
  signNameMr: string;
  signNameEn: string;
  rulingPlanet: string;
  significanceMr: string;
  significanceEn: string;
  planets: PlanetPlacement[];
}

export interface DoshaAnalysis {
  mangalDosha: {
    hasDosha: boolean;
    severity: 'नाही (None)' | 'अंशतः (Partial)' | 'प्रभावी (Strong)';
    descriptionMr: string;
    remedyMr: string;
  };
  kaalSarpDosha: {
    hasDosha: boolean;
    typeMr: string;
    descriptionMr: string;
    remedyMr: string;
  };
  sadeSati: {
    isActive: boolean;
    phaseMr: string;
    descriptionMr: string;
    remedyMr: string;
  };
  pitraDosha: {
    hasDosha: boolean;
    descriptionMr: string;
    remedyMr: string;
  };
}

export interface AstrologicalPillars {
  lagnaSign: RashiInfo;
  moonSign: RashiInfo;
  sunSign: RashiInfo;
  nakshatra: NakshatraInfo;
  pada: number;
  varna: string;
  vashya: string;
  tara: string;
  yoni: string;
  grahaMaitri: string;
  gana: 'देव' | 'मनुष्य' | 'राक्षस';
  bhakoot: string;
  nadi: 'आद्य' | 'मध्य' | 'अंत्य';
  tithi: string;
  vaar: string;
  yoga: string;
  karana: string;
  luckyNumbers: string;
  luckyColors: string;
  luckyGem: string;
  luckyGemMetal: string;
  luckyDay: string;
  ishtadevata: string;
  beejMantra: string;
}

export interface AIPredictionReport {
  personality: string;
  careerAndWealth: string;
  marriageAndFamily: string;
  healthAndVitality: string;
  upcomingPeriod: string;
  remediesAndPuja: string;
  specificQueryAnswer?: string;
}

export interface FullKundaliAnalysis {
  user: UserBirthData;
  pillars: AstrologicalPillars;
  houses: HouseDetail[];
  planets: PlanetPlacement[];
  doshas: DoshaAnalysis;
  predictions: AIPredictionReport;
  currentDasha: {
    mahadasha: string;
    antardasha: string;
    endsOn: string;
    effectMr: string;
  };
}

// ==========================================
// 1. COMPREHENSIVE CITY COORDINATES DATABASE
// ==========================================
export const INDIAN_CITIES_COORDS: Record<string, { lat: number; lon: number; nameMr: string }> = {
  // Maharashtra Districts & Major Towns
  pune: { lat: 18.5204, lon: 73.8567, nameMr: 'पुणे' },
  mumbai: { lat: 19.0760, lon: 72.8777, nameMr: 'मुंबई' },
  nagpur: { lat: 21.1458, lon: 79.0882, nameMr: 'नागपूर' },
  nashik: { lat: 19.9975, lon: 73.7898, nameMr: 'नाशिक' },
  aurangabad: { lat: 19.8762, lon: 75.3433, nameMr: 'छत्रपती संभाजीनगर' },
  'chhatrapati sambhajinagar': { lat: 19.8762, lon: 75.3433, nameMr: 'छत्रपती संभाजीनगर' },
  sambhajinagar: { lat: 19.8762, lon: 75.3433, nameMr: 'छत्रपती संभाजीनगर' },
  thane: { lat: 19.2183, lon: 72.9781, nameMr: 'ठाणे' },
  solapur: { lat: 17.6599, lon: 75.9064, nameMr: 'सोलापूर' },
  kolhapur: { lat: 16.7050, lon: 74.2433, nameMr: 'कोल्हापूर' },
  amravati: { lat: 20.9374, lon: 77.7796, nameMr: 'अमरावती' },
  nanded: { lat: 19.1383, lon: 77.3210, nameMr: 'नांदेड' },
  sangli: { lat: 16.8524, lon: 74.5815, nameMr: 'सांगली' },
  jalgaon: { lat: 21.0077, lon: 75.5626, nameMr: 'जळगाव' },
  akola: { lat: 20.7002, lon: 77.0082, nameMr: 'अकोला' },
  latur: { lat: 18.4088, lon: 76.5604, nameMr: 'लातूर' },
  dhule: { lat: 20.9042, lon: 74.7749, nameMr: 'धुळे' },
  ahmednagar: { lat: 19.0952, lon: 74.7496, nameMr: 'अहिल्यानगर' },
  ahilyanagar: { lat: 19.0952, lon: 74.7496, nameMr: 'अहिल्यानगर' },
  chandrapur: { lat: 19.9615, lon: 79.2961, nameMr: 'चंद्रपूर' },
  parbhani: { lat: 19.2644, lon: 76.7767, nameMr: 'परभणी' },
  jalna: { lat: 19.8410, lon: 75.8864, nameMr: 'जालना' },
  beed: { lat: 18.9891, lon: 75.7601, nameMr: 'बीड' },
  satara: { lat: 17.6805, lon: 73.9998, nameMr: 'सातारा' },
  osmanabad: { lat: 18.1856, lon: 76.0419, nameMr: 'धाराशिव' },
  dharashiv: { lat: 18.1856, lon: 76.0419, nameMr: 'धाराशिव' },
  yavatmal: { lat: 20.3888, lon: 78.1204, nameMr: 'यवतमाळ' },
  wardha: { lat: 20.7453, lon: 78.6022, nameMr: 'वर्धा' },
  gondia: { lat: 21.4598, lon: 80.1961, nameMr: 'गोंदिया' },
  bhandara: { lat: 21.1713, lon: 79.6548, nameMr: 'भंडारा' },
  buldhana: { lat: 20.5310, lon: 76.1843, nameMr: 'बुलढाणा' },
  washim: { lat: 20.1114, lon: 77.1350, nameMr: 'वाशिम' },
  ratnagiri: { lat: 16.9902, lon: 73.3120, nameMr: 'रत्नागिरी' },
  sindhudurg: { lat: 16.1189, lon: 73.6875, nameMr: 'सिंधुदुर्ग' },
  gadchiroli: { lat: 20.1849, lon: 79.9948, nameMr: 'गडचिरोली' },
  palghar: { lat: 19.6967, lon: 72.7699, nameMr: 'पालघर' },
  raigad: { lat: 18.5158, lon: 73.1822, nameMr: 'रायगड' },
  alibag: { lat: 18.6414, lon: 72.8722, nameMr: 'अलिबाग' },
  pandharpur: { lat: 17.6775, lon: 75.3276, nameMr: 'पंढरपूर' },
  shirdi: { lat: 19.7667, lon: 74.4767, nameMr: 'शिर्डी' },
  akkalkot: { lat: 17.5255, lon: 76.2045, nameMr: 'अक्कलकोट' },
  tuljapur: { lat: 18.0050, lon: 76.0820, nameMr: 'तुळजापूर' },
  trimbakeshwar: { lat: 19.9322, lon: 73.5308, nameMr: 'त्र्यंबकेश्वर' },
  jejuri: { lat: 18.2778, lon: 74.1594, nameMr: 'जेजुरी' },
  alandi: { lat: 18.6775, lon: 73.8967, nameMr: 'आळंदी' },
  dehu: { lat: 18.7183, lon: 73.7692, nameMr: 'देहू' },
  kalyan: { lat: 19.2403, lon: 73.1305, nameMr: 'कल्याण' },
  'navi mumbai': { lat: 19.0330, lon: 73.0297, nameMr: 'नवी मुंबई' },
  pimpri: { lat: 18.6298, lon: 73.7997, nameMr: 'पिंपरी-चिंचवड' },
  chinchwad: { lat: 18.6298, lon: 73.7997, nameMr: 'पिंपरी-चिंचवड' },

  // Major Indian Cities
  delhi: { lat: 28.6139, lon: 77.2090, nameMr: 'नवी दिल्ली' },
  'new delhi': { lat: 28.6139, lon: 77.2090, nameMr: 'नवी दिल्ली' },
  bengaluru: { lat: 12.9716, lon: 77.5946, nameMr: 'बंगळुरू' },
  bangalore: { lat: 12.9716, lon: 77.5946, nameMr: 'बंगळुरू' },
  hyderabad: { lat: 17.3850, lon: 78.4867, nameMr: 'हैदराबाद' },
  ahmedabad: { lat: 23.0225, lon: 72.5714, nameMr: 'अहमदाबाद' },
  chennai: { lat: 13.0827, lon: 80.2707, nameMr: 'चेन्नई' },
  kolkata: { lat: 22.5726, lon: 88.3639, nameMr: 'कोलकाता' },
  surat: { lat: 21.1702, lon: 72.8311, nameMr: 'सुरत' },
  jaipur: { lat: 26.9124, lon: 75.7873, nameMr: 'जयपूर' },
  lucknow: { lat: 26.8467, lon: 80.9462, nameMr: 'लखनौ' },
  kanpur: { lat: 26.4499, lon: 80.3319, nameMr: 'कानपूर' },
  indore: { lat: 22.7196, lon: 75.8577, nameMr: 'इंदूर' },
  bhopal: { lat: 23.2599, lon: 77.4126, nameMr: 'भोपाळ' },
  patna: { lat: 25.5941, lon: 85.1376, nameMr: 'पाटणा' },
  vadodara: { lat: 22.3072, lon: 73.1812, nameMr: 'वडोदरा' },
  varanasi: { lat: 25.3176, lon: 82.9739, nameMr: 'वाराणसी' },
  kashi: { lat: 25.3176, lon: 82.9739, nameMr: 'काशी' },
  ayodhya: { lat: 26.7922, lon: 82.1998, nameMr: 'अयोध्या' },
  ujjain: { lat: 23.1765, lon: 75.7885, nameMr: 'उज्जैन' },
  haridwar: { lat: 29.9457, lon: 78.1642, nameMr: 'हरिद्वार' },
  rishikesh: { lat: 30.0869, lon: 78.2676, nameMr: 'ऋषिकेश' },
  mathura: { lat: 27.4924, lon: 77.6737, nameMr: 'मथुरा' },
  vrindavan: { lat: 27.5806, lon: 77.7006, nameMr: 'वृंदावन' },
  tirupati: { lat: 13.6288, lon: 79.4192, nameMr: 'तिरुपती' },
  puri: { lat: 19.8135, lon: 85.8312, nameMr: 'पुरी' }
};

export function resolveCityCoords(place: string): { lat: number; lon: number; matchedName: string } {
  if (!place || !place.trim()) {
    return { lat: 18.5204, lon: 73.8567, matchedName: 'पुणे, महाराष्ट्र' };
  }
  const clean = place.toLowerCase().trim();

  for (const [key, val] of Object.entries(INDIAN_CITIES_COORDS)) {
    if (clean.includes(key) || clean.includes(val.nameMr.toLowerCase())) {
      return { lat: val.lat, lon: val.lon, matchedName: val.nameMr };
    }
  }

  // Devanagari fast matches
  if (clean.includes('पुणे')) return { lat: 18.5204, lon: 73.8567, matchedName: 'पुणे' };
  if (clean.includes('मुंबई')) return { lat: 19.0760, lon: 72.8777, matchedName: 'मुंबई' };
  if (clean.includes('नागपूर')) return { lat: 21.1458, lon: 79.0882, matchedName: 'नागपूर' };
  if (clean.includes('नाशिक')) return { lat: 19.9975, lon: 73.7898, matchedName: 'नाशिक' };
  if (clean.includes('संभाजीनगर') || clean.includes('औरंगाबाद')) return { lat: 19.8762, lon: 75.3433, matchedName: 'छत्रपती संभाजीनगर' };
  if (clean.includes('सोलापूर')) return { lat: 17.6599, lon: 75.9064, matchedName: 'सोलापूर' };
  if (clean.includes('कोल्हापूर')) return { lat: 16.7050, lon: 74.2433, matchedName: 'कोल्हापूर' };
  if (clean.includes('सातारा')) return { lat: 17.6805, lon: 73.9998, matchedName: 'सातारा' };
  if (clean.includes('सांगली')) return { lat: 16.8524, lon: 74.5815, matchedName: 'सांगली' };
  if (clean.includes('ठाणे')) return { lat: 19.2183, lon: 72.9781, matchedName: 'ठाणे' };
  if (clean.includes('शिर्डी')) return { lat: 19.7667, lon: 74.4767, matchedName: 'शिर्डी' };
  if (clean.includes('पंढरपूर')) return { lat: 17.6775, lon: 75.3276, matchedName: 'पंढरपूर' };
  if (clean.includes('तुळजापूर')) return { lat: 18.0050, lon: 76.0820, matchedName: 'तुळजापूर' };
  if (clean.includes('अहिल्यानगर') || clean.includes('नगर')) return { lat: 19.0952, lon: 74.7496, matchedName: 'अहिल्यानगर' };
  if (clean.includes('जळगाव')) return { lat: 21.0077, lon: 75.5626, matchedName: 'जळगाव' };
  if (clean.includes('अकोला')) return { lat: 20.7002, lon: 77.0082, matchedName: 'अकोला' };
  if (clean.includes('अमरावती')) return { lat: 20.9374, lon: 77.7796, matchedName: 'अमरावती' };
  if (clean.includes('नांदेड')) return { lat: 19.1383, lon: 77.3210, matchedName: 'नांदेड' };
  if (clean.includes('लातूर')) return { lat: 18.4088, lon: 76.5604, matchedName: 'लातूर' };
  if (clean.includes('धाराशिव') || clean.includes('उस्मानाबाद')) return { lat: 18.1856, lon: 76.0419, matchedName: 'धाराशिव' };
  if (clean.includes('धुळे')) return { lat: 20.9042, lon: 74.7749, matchedName: 'धुळे' };
  if (clean.includes('बीड')) return { lat: 18.9891, lon: 75.7601, matchedName: 'बीड' };
  if (clean.includes('जालना')) return { lat: 19.8410, lon: 75.8864, matchedName: 'जालना' };
  if (clean.includes('परभणी')) return { lat: 19.2644, lon: 76.7767, matchedName: 'परभणी' };
  if (clean.includes('चंद्रपूर')) return { lat: 19.9615, lon: 79.2961, matchedName: 'चंद्रपूर' };
  if (clean.includes('रत्नागिरी')) return { lat: 16.9902, lon: 73.3120, matchedName: 'रत्नागिरी' };
  if (clean.includes('सिंधुदुर्ग')) return { lat: 16.1189, lon: 73.6875, matchedName: 'सिंधुदुर्ग' };
  if (clean.includes('दिल्ली')) return { lat: 28.6139, lon: 77.2090, matchedName: 'नवी दिल्ली' };

  return { lat: 18.5204, lon: 73.8567, matchedName: place.trim() };
}

// ==========================================
// 2. HIGH-PRECISION ASTRONOMICAL JYOTISH MATH
// ==========================================
const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

function normalize(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Julian Day Number Calculation (Gregorian)
function getJulianDay(year: number, month: number, day: number, utcHours: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFrac = day + utcHours / 24.0;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFrac + B - 1524.5;
}

// Lahiri (Chitra Paksha) Ayanamsa - AstroSage / Government of India Standard
function getLahiriAyanamsa(T: number): number {
  return 23.857092 + 1.396042 * T + 0.000308 * T * T;
}

// High-Precision Solar Longitude (Sun / Surya)
function getSunLongitude(T: number): number {
  const L0 = normalize(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = normalize(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const C =
    (1.914602 - 0.004817 * T) * Math.sin(M * RAD) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M * RAD) +
    0.000289 * Math.sin(3 * M * RAD);
  const trueLong = normalize(L0 + C);
  const apparentLong = normalize(
    trueLong - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * T) * RAD)
  );
  return apparentLong;
}

// High-Precision Lunar Longitude (Moon / Chandra) - Brown's Lunar Perturbations
function getMoonLongitude(T: number): number {
  const L_m = normalize(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
  const D = normalize(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
  const M_sun = normalize(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
  const M_moon = normalize(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
  const F = normalize(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T);

  const corr =
    6.288774 * Math.sin(M_moon * RAD) +
    1.274027 * Math.sin((2 * D - M_moon) * RAD) +
    0.658314 * Math.sin(2 * D * RAD) +
    0.213618 * Math.sin(2 * M_moon * RAD) -
    0.185116 * Math.sin(M_sun * RAD) -
    0.114332 * Math.sin(2 * F * RAD) +
    0.058793 * Math.sin((2 * D - 2 * M_moon) * RAD) +
    0.057066 * Math.sin((2 * D - M_sun - M_moon) * RAD) +
    0.053322 * Math.sin((2 * D + M_moon) * RAD) +
    0.046100 * Math.sin((2 * D - M_sun) * RAD) +
    0.041000 * Math.sin((M_moon - M_sun) * RAD) -
    0.034720 * Math.sin(D * RAD) -
    0.030465 * Math.sin((M_moon + M_sun) * RAD) +
    0.015327 * Math.sin((2 * D - 2 * F) * RAD) -
    0.012528 * Math.sin((2 * F + M_moon) * RAD) -
    0.010980 * Math.sin((2 * F - M_moon) * RAD);

  return normalize(L_m + corr);
}

// Exact Ascendant (Lagna) via Local Sidereal Time and Latitude
function getAscendant(JD: number, T: number, utcHours: number, lat: number, lon: number): number {
  const JD0 = Math.floor(JD - 0.5) + 0.5;
  const T0 = (JD0 - 2451545.0) / 36525.0;
  const GMST0 = normalize(100.46061837 + 36000.770053608 * T0 + 0.000387933 * T0 * T0);
  const GMST = normalize(GMST0 + 360.98564736629 * (utcHours / 24.0));
  const RAMC = normalize(GMST + lon);
  const eps = 23.4392911 - 0.0130042 * T;

  const y = Math.cos(RAMC * RAD);
  const x = -Math.sin(eps * RAD) * Math.tan(lat * RAD) - Math.cos(eps * RAD) * Math.sin(RAMC * RAD);
  const asc = Math.atan2(y, x) * DEG;
  return normalize(asc);
}

// Keplerian Orbital Elements for Planets (NASA / JPL / Standish 1992)
const PLANET_KEPLER: Record<string, {
  a: [number, number];
  e: [number, number];
  I: [number, number];
  L: [number, number];
  peri: [number, number];
  node: [number, number];
}> = {
  earth: {
    a: [1.00000261, 0.00000562],
    e: [0.01671123, -0.00004392],
    I: [-0.00001531, -0.01294668],
    L: [100.46457166, 35999.37244981],
    peri: [102.93768193, 0.32327364],
    node: [0.0, 0.0]
  },
  mercury: {
    a: [0.38709927, 0.00000037],
    e: [0.20563593, 0.00001906],
    I: [7.00497902, -0.00594749],
    L: [252.25032350, 149472.67411175],
    peri: [77.45779628, 0.16047689],
    node: [48.33076593, -0.12534081]
  },
  venus: {
    a: [0.72333566, 0.00000390],
    e: [0.00677672, -0.00004107],
    I: [3.39467605, -0.00078890],
    L: [181.97909950, 58517.81538729],
    peri: [131.60246718, 0.00268329],
    node: [76.67984255, -0.27769418]
  },
  mars: {
    a: [1.52371034, 0.00001847],
    e: [0.09339410, 0.00007882],
    I: [1.84969142, -0.00813131],
    L: [-4.55343205, 19140.30268499],
    peri: [-23.94362959, 0.44441088],
    node: [49.55953891, -0.29257343]
  },
  jupiter: {
    a: [5.20288700, -0.00011607],
    e: [0.04838624, -0.00013253],
    I: [1.30439695, -0.00183714],
    L: [34.39644051, 3034.74612775],
    peri: [14.72847983, 0.21252668],
    node: [100.47390909, 0.20469106]
  },
  saturn: {
    a: [9.53667594, -0.00125060],
    e: [0.05386179, -0.00050991],
    I: [2.48599187, 0.00193609],
    L: [49.95424423, 1222.49362201],
    peri: [92.59887831, -0.41897216],
    node: [113.66242448, -0.28867794]
  }
};

function solveKepler(M_rad: number, e: number): number {
  let E = M_rad;
  for (let i = 0; i < 7; i++) {
    const f = E - e * Math.sin(E) - M_rad;
    const fPrime = 1 - e * Math.cos(E);
    const dE = f / fPrime;
    E -= dE;
    if (Math.abs(dE) < 1e-8) break;
  }
  return E;
}

function getHeliocentric(pName: string, T: number): { x: number; y: number; z: number } {
  const p = PLANET_KEPLER[pName];
  const a = p.a[0] + p.a[1] * T;
  const e = p.e[0] + p.e[1] * T;
  const I = (p.I[0] + p.I[1] * T) * RAD;
  const L = normalize(p.L[0] + p.L[1] * T);
  const peri = normalize(p.peri[0] + p.peri[1] * T);
  const node = normalize(p.node[0] + p.node[1] * T) * RAD;

  const M = normalize(L - peri) * RAD;
  const E = solveKepler(M, e);

  const x_prime = a * (Math.cos(E) - e);
  const y_prime = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const omega = (peri - normalize(p.node[0] + p.node[1] * T)) * RAD;

  const x =
    (Math.cos(omega) * Math.cos(node) - Math.sin(omega) * Math.sin(node) * Math.cos(I)) * x_prime +
    (-Math.sin(omega) * Math.cos(node) - Math.cos(omega) * Math.sin(node) * Math.cos(I)) * y_prime;
  const y =
    (Math.cos(omega) * Math.sin(node) + Math.sin(omega) * Math.cos(node) * Math.cos(I)) * x_prime +
    (-Math.sin(omega) * Math.sin(node) + Math.cos(omega) * Math.cos(node) * Math.cos(I)) * y_prime;
  const z =
    Math.sin(omega) * Math.sin(I) * x_prime + Math.cos(omega) * Math.sin(I) * y_prime;

  return { x, y, z };
}

function getGeocentricPlanetLongitude(pName: string, T: number): number {
  const p = getHeliocentric(pName, T);
  const e = getHeliocentric('earth', T);
  const dx = p.x - e.x;
  const dy = p.y - e.y;
  return normalize(Math.atan2(dy, dx) * DEG);
}

// ==========================================
// 3. VEDIC PANCHANG CONSTANTS
// ==========================================
const DAY_NAMES_MR = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

const TITHI_NAMES = [
  'शुक्ल प्रतिपदा', 'शुक्ल द्वितीया', 'शुक्ल तृतीया', 'शुक्ल चतुर्थी', 'शुक्ल पंचमी',
  'शुक्ल षष्ठी', 'शुक्ल सप्तमी', 'शुक्ल अष्टमी', 'शुक्ल नवमी', 'शुक्ल दशमी',
  'शुक्ल एकादशी', 'शुक्ल द्वादशी', 'शुक्ल त्रयोदशी', 'शुक्ल चतुर्दशी', 'पौर्णिमा (पूर्ण चंद्र)',
  'कृष्ण प्रतिपदा', 'कृष्ण द्वितीया', 'कृष्ण तृतीया', 'कृष्ण चतुर्थी', 'कृष्ण पंचमी',
  'कृष्ण षष्ठी', 'कृष्ण सप्तमी', 'कृष्ण अष्टमी', 'कृष्ण नवमी', 'कृष्ण दशमी',
  'कृष्ण एकादशी', 'कृष्ण द्वादशी', 'कृष्ण त्रयोदशी', 'कृष्ण चतुर्दशी', 'अमावास्या'
];

const YOGAS_MR = [
  'विष्कंभ', 'प्रीती', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगंड', 'सुकर्मा',
  'धृती', 'शूल', 'गंड', 'वृद्धी', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
  'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ',
  'शुक्ल', 'ब्रह्म', 'ऐंद्र', 'वैधृती'
];

const KARANAS_MR = [
  'बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टी (भद्रा)',
  'शकुनी', 'चतुष्पाद', 'नाग', 'किंस्तुघ्न'
];

// Vimshottari Mahadasha Lords (BPHS / AstroSage 120-Year System)
const DASHA_LORDS = [
  { nameMr: 'केतू', years: 7 },
  { nameMr: 'शुक्र', years: 20 },
  { nameMr: 'रवि', years: 6 },
  { nameMr: 'चंद्र', years: 10 },
  { nameMr: 'मंगळ', years: 7 },
  { nameMr: 'राहू', years: 18 },
  { nameMr: 'गुरु', years: 16 },
  { nameMr: 'शनि', years: 19 },
  { nameMr: 'बुध', years: 17 },
];

function calculateVimshottariDasha(
  birthDateObj: Date,
  moonSiderealDeg: number
): { mahadasha: string; antardasha: string; endsOn: string; effectMr: string } {
  const nakLen = 360 / 27;
  const nakIdx = Math.floor(moonSiderealDeg / nakLen);
  const degInNak = moonSiderealDeg % nakLen;
  const fractionRemaining = 1.0 - degInNak / nakLen;

  const startLordIdx = nakIdx % 9;
  const birthLord = DASHA_LORDS[startLordIdx];

  const now = new Date();
  let elapsedYears = (now.getTime() - birthDateObj.getTime()) / (365.2425 * 24 * 3600 * 1000);
  if (elapsedYears < 0) elapsedYears = 0;

  const firstMahadashaDuration = fractionRemaining * birthLord.years;

  let currentMahadashaIdx = startLordIdx;
  let remainingInCurrentMaha = firstMahadashaDuration;

  if (elapsedYears <= firstMahadashaDuration) {
    remainingInCurrentMaha = firstMahadashaDuration - elapsedYears;
  } else {
    elapsedYears -= firstMahadashaDuration;
    currentMahadashaIdx = (currentMahadashaIdx + 1) % 9;
    while (elapsedYears > DASHA_LORDS[currentMahadashaIdx].years) {
      elapsedYears -= DASHA_LORDS[currentMahadashaIdx].years;
      currentMahadashaIdx = (currentMahadashaIdx + 1) % 9;
    }
    remainingInCurrentMaha = DASHA_LORDS[currentMahadashaIdx].years - elapsedYears;
  }

  const activeMahaLord = DASHA_LORDS[currentMahadashaIdx];

  let antarElapsed = activeMahaLord.years - remainingInCurrentMaha;
  let antarIdx = currentMahadashaIdx;
  let currentAntarDuration = (activeMahaLord.years * DASHA_LORDS[antarIdx].years) / 120;

  while (antarElapsed > currentAntarDuration) {
    antarElapsed -= currentAntarDuration;
    antarIdx = (antarIdx + 1) % 9;
    currentAntarDuration = (activeMahaLord.years * DASHA_LORDS[antarIdx].years) / 120;
  }

  const activeAntarLord = DASHA_LORDS[antarIdx];
  const antarRemainingYears = currentAntarDuration - antarElapsed;
  const endDate = new Date(now.getTime() + antarRemainingYears * 365.2425 * 24 * 3600 * 1000);
  const endsOnStr = endDate.toISOString().split('T')[0];

  const effectMr = `सध्या आपल्या पत्रिकेत **${activeMahaLord.nameMr} महादशा** आणि **${activeAntarLord.nameMr} अंतर्दशा** कार्यरत आहे (समाप्ती: ${endsOnStr}). हा काळ आंतरिक शुद्धी, भाग्योदय, आर्थिक वृद्धी आणि कौटुंबिक सौख्यासाठी अत्यंत अनुकूल आहे.`;

  return {
    mahadasha: activeMahaLord.nameMr,
    antardasha: activeAntarLord.nameMr,
    endsOn: endsOnStr,
    effectMr,
  };
}

// Classical Ashtakoota Lookups
const NAKSHATRA_GANAS: ('देव' | 'मनुष्य' | 'राक्षस')[] = [
  'देव', 'मनुष्य', 'राक्षस', 'मनुष्य', 'देव', 'मनुष्य', 'देव', 'देव', 'राक्षस', // 0-8
  'राक्षस', 'मनुष्य', 'मनुष्य', 'देव', 'राक्षस', 'देव', 'राक्षस', 'देव', 'राक्षस', // 9-17
  'राक्षस', 'मनुष्य', 'मनुष्य', 'देव', 'राक्षस', 'राक्षस', 'मनुष्य', 'मनुष्य', 'देव' // 18-26
];

const NAKSHATRA_NADIS: ('आद्य' | 'मध्य' | 'अंत्य')[] = [
  'आद्य', 'मध्य', 'अंत्य', 'अंत्य', 'मध्य', 'आद्य', 'आद्य', 'मध्य', 'अंत्य', // 0-8
  'अंत्य', 'मध्य', 'आद्य', 'आद्य', 'मध्य', 'अंत्य', 'अंत्य', 'मध्य', 'आद्य', // 9-17
  'आद्य', 'मध्य', 'अंत्य', 'अंत्य', 'मध्य', 'आद्य', 'आद्य', 'मध्य', 'अंत्य' // 18-26
];

const NAKSHATRA_YONIS: string[] = [
  'अश्व (घोडा)', 'गज (हत्ती)', 'मेष (मेंढा)', 'सर्प (साप)', 'सर्प (साप)', 'श्वान (कुत्रा)',
  'मार्जार (मांजर)', 'मेष (मेंढा)', 'मार्जार (मांजर)', 'मूषक (उंदीर)', 'मूषक (उंदीर)',
  'गौ (गाय)', 'महिष (म्हैस)', 'व्याघ्र (वाघ)', 'महिष (म्हैस)', 'व्याघ्र (वाघ)',
  'हरिण (मृग)', 'हरिण (मृग)', 'श्वान (कुत्रा)', 'वानर (माकड)', 'नकुल (मुंगूस)',
  'वानर (माकड)', 'सिंह', 'अश्व (घोडा)', 'सिंह', 'गौ (गाय)', 'गज (हत्ती)'
];

// ==========================================
// 4. MAIN EXACT KUNDALI GENERATOR (ASTROSAGE EQUIVALENT)
// ==========================================
export function generateExactKundali(birthData: UserBirthData): FullKundaliAnalysis {
  // 1. Parse Date and Time safely
  const [yStr, mStr, dStr] = (birthData.birthDate || '1998-05-15').split(/[-/]/);
  const year = parseInt(yStr, 10) || 1998;
  const month = parseInt(mStr, 10) || 5;
  const day = parseInt(dStr, 10) || 15;

  const [hStr, minStr] = (birthData.birthTime || '08:30').split(':');
  let hour = parseInt(hStr, 10);
  let min = parseInt(minStr, 10);
  if (isNaN(hour) || hour < 0 || hour > 23) hour = 8;
  if (isNaN(min) || min < 0 || min > 59) min = 30;

  // 2. Resolve Birth Place Coordinates
  const cityInfo = resolveCityCoords(birthData.birthPlace);
  const lat = cityInfo.lat;
  const lon = cityInfo.lon;

  // 3. Convert Local Time (IST = UTC + 5:30) to UTC
  let utcHours = hour + min / 60.0 - 5.5;
  let utcY = year, utcM = month, utcD = day;
  if (utcHours < 0) {
    utcHours += 24.0;
    utcD -= 1;
    if (utcD < 1) {
      utcM -= 1;
      if (utcM < 1) {
        utcM = 12;
        utcY -= 1;
      }
      const daysInMonth = [
        31,
        utcY % 4 === 0 && (utcY % 100 !== 0 || utcY % 400 === 0) ? 29 : 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31
      ];
      utcD = daysInMonth[utcM - 1];
    }
  } else if (utcHours >= 24) {
    utcHours -= 24.0;
    utcD += 1;
    const daysInMonth = [
      31,
      utcY % 4 === 0 && (utcY % 100 !== 0 || utcY % 400 === 0) ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    if (utcD > daysInMonth[utcM - 1]) {
      utcD = 1;
      utcM += 1;
      if (utcM > 12) {
        utcM = 1;
        utcY += 1;
      }
    }
  }

  // 4. Astronomical Julian Day and Centurial Offset T
  const JD = getJulianDay(utcY, utcM, utcD, utcHours);
  const T = (JD - 2451545.0) / 36525.0;

  // 5. Lahiri Ayanamsa (Chitra Paksha)
  const ayanamsa = getLahiriAyanamsa(T);

  // 6. Sidereal Sun (Surya) & Sidereal Moon (Chandra)
  const sunTrop = getSunLongitude(T);
  const moonTrop = getMoonLongitude(T);
  const sunSid = normalize(sunTrop - ayanamsa);
  const moonSid = normalize(moonTrop - ayanamsa);

  // 7. Sidereal Ascendant (Lagna)
  const ascTrop = getAscendant(JD, T, utcHours, lat, lon);
  const lagnaSid = normalize(ascTrop - ayanamsa);

  // Rashis (0 to 11: Mesha=0, Vrishabha=1, Mithuna=2, etc.)
  const lagnaSignIndex = Math.floor(lagnaSid / 30);
  const moonSignIndex = Math.floor(moonSid / 30);
  const sunSignIndex = Math.floor(sunSid / 30);

  const lagnaSign = rashiDatabase[lagnaSignIndex] || rashiDatabase[0];
  const moonSign = rashiDatabase[moonSignIndex] || rashiDatabase[0];
  const sunSign = rashiDatabase[sunSignIndex] || rashiDatabase[0];

  // 8. Vedic Nakshatra and Pada (Exact Moon longitude / 13°20')
  const nakLen = 360 / 27; // 13.333333333333334
  const nakshatraIndex = Math.floor(moonSid / nakLen);
  const nakshatra = nakshatraDatabase[nakshatraIndex] || nakshatraDatabase[0];
  const pada = Math.floor((moonSid % nakLen) / (nakLen / 4)) + 1;

  // 9. Authentic Vedic Panchang
  const tithiAngle = normalize(moonSid - sunSid);
  const tithiIndex = Math.floor(tithiAngle / 12);
  const tithi = TITHI_NAMES[tithiIndex] || TITHI_NAMES[0];

  const yogaAngle = normalize(sunSid + moonSid);
  const yogaIndex = Math.floor(yogaAngle / nakLen);
  const yoga = YOGAS_MR[yogaIndex] || YOGAS_MR[0];

  const karanaIndex = Math.floor(tithiAngle / 6) % KARANAS_MR.length;
  const karana = KARANAS_MR[karanaIndex] || KARANAS_MR[0];

  const birthDateObj = new Date(year, month - 1, day, hour, min);
  const dayOfWeek = birthDateObj.getDay();
  const vaar = DAY_NAMES_MR[dayOfWeek] || DAY_NAMES_MR[0];

  // 10. Classical Ashtakoota Pillars
  const gana = NAKSHATRA_GANAS[nakshatraIndex] || 'मनुष्य';
  const nadi = NAKSHATRA_NADIS[nakshatraIndex] || 'मध्य';
  const yoni = NAKSHATRA_YONIS[nakshatraIndex] || 'अश्व (घोडा)';

  // Varna per Moon Sign
  const varnaNames = [
    'क्षत्रिय (नेतृत्व व पराक्रम)', // Mesha
    'वैश्य (व्यापार व समृद्धी)',   // Vrishabha
    'शूद्र (सेवा व परिश्रम)',       // Mithuna
    'ब्राह्मण (ज्ञान व साधना)',   // Karka
    'क्षत्रिय (नेतृत्व व पराक्रम)', // Simha
    'वैश्य (व्यापार व समृद्धी)',   // Kanya
    'शूद्र (सेवा व परिश्रम)',       // Tula
    'ब्राह्मण (ज्ञान व साधना)',   // Vrishchika
    'क्षत्रिय (नेतृत्व व पराक्रम)', // Dhanu
    'वैश्य (व्यापार व समृद्धी)',   // Makara
    'शूद्र (सेवा व परिश्रम)',       // Kumbha
    'ब्राह्मण (ज्ञान व साधना)'    // Meena
  ];
  const varna = varnaNames[moonSignIndex] || 'वैश्य (व्यापार व समृद्धी)';

  // Vashya per Moon Sign
  const vashyaNames = [
    'चतुष्पद (संयमी)', 'चतुष्पद (संयमी)', 'मानव / द्विपद (बुद्धिमान)', 'जलचर (संवेदनशील)',
    'वनचर (साहसी व स्वाभिमानी)', 'मानव / द्विपद (बुद्धिमान)', 'मानव / द्विपद (बुद्धिमान)',
    'कीट (चिकाटी व गूढ)', 'मानव व चतुष्पद', 'जलचर व चतुष्पद', 'मानव / द्विपद (बुद्धिमान)', 'जलचर (संवेदनशील)'
  ];
  const vashya = vashyaNames[moonSignIndex] || 'मानव (बुद्धिमान)';

  // Tara per Navatara Chakra
  const taraNames = [
    'जन्म (आरोग्य)', 'संपत (धनलाभ)', 'विपत (सावध)', 'क्षेम (कल्याण)',
    'प्रत्यरी (प्रयत्न)', 'साधक (सिद्धि)', 'निधन (संयम)', 'मित्र (सहकार्य)', 'परम मित्र (सौभाग्य)'
  ];
  const tara = taraNames[(nakshatraIndex + pada) % 9] || 'जन्म (आरोग्य)';

  // 11. Calculate All 9 Grahas with Astronomical Ephemeris
  const mercuryTrop = getGeocentricPlanetLongitude('mercury', T);
  const venusTrop = getGeocentricPlanetLongitude('venus', T);
  const marsTrop = getGeocentricPlanetLongitude('mars', T);
  const jupiterTrop = getGeocentricPlanetLongitude('jupiter', T);
  const saturnTrop = getGeocentricPlanetLongitude('saturn', T);

  const mercurySid = normalize(mercuryTrop - ayanamsa);
  const venusSid = normalize(venusTrop - ayanamsa);
  const marsSid = normalize(marsTrop - ayanamsa);
  const jupiterSid = normalize(jupiterTrop - ayanamsa);
  const saturnSid = normalize(saturnTrop - ayanamsa);

  // Mean Lunar Node (Rahu) & Ketu (180 deg opposite)
  const omega = normalize(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const rahuSid = normalize(omega - ayanamsa);
  const ketuSid = normalize(rahuSid + 180);

  // Helper: map a sidereal longitude to house from Lagna and rashi
  const getPlanetDetails = (
    pName: string,
    pSymbol: string,
    pSidDeg: number,
    isRetro: boolean = false
  ): PlanetPlacement => {
    const pSignIdx = Math.floor(pSidDeg / 30);
    const pRashi = rashiDatabase[pSignIdx] || rashiDatabase[0];
    const house = ((pSignIdx - lagnaSignIndex + 12) % 12) + 1;
    const degInSign = Math.round((pSidDeg % 30) * 10) / 10;

    let status: PlanetPlacement['status'] = 'मित्र (Friendly)';

    // Authentic Vedic Exaltation / Debilitation / Own Rashi
    if (pName.includes('रवि') || pName.includes('Sun')) {
      if (pSignIdx === 0) status = 'उच्च (Exalted)';
      else if (pSignIdx === 6) status = 'नीच (Debilitated)';
      else if (pSignIdx === 4) status = 'स्वराशी (Own)';
      else if ([1, 8, 11].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else if ([6, 9, 10].includes(pSignIdx)) status = 'शत्रू (Enemy)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('चंद्र') || pName.includes('Moon')) {
      if (pSignIdx === 1) status = 'उच्च (Exalted)';
      else if (pSignIdx === 7) status = 'नीच (Debilitated)';
      else if (pSignIdx === 3) status = 'स्वराशी (Own)';
      else if ([0, 4].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('मंगळ') || pName.includes('Mars')) {
      if (pSignIdx === 9) status = 'उच्च (Exalted)';
      else if (pSignIdx === 3) status = 'नीच (Debilitated)';
      else if (pSignIdx === 0 || pSignIdx === 7) status = 'स्वराशी (Own)';
      else if ([4, 8, 11].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else if ([2, 5].includes(pSignIdx)) status = 'शत्रू (Enemy)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('बुध') || pName.includes('Mercury')) {
      if (pSignIdx === 5) status = 'उच्च (Exalted)';
      else if (pSignIdx === 11) status = 'नीच (Debilitated)';
      else if (pSignIdx === 2 || pSignIdx === 5) status = 'स्वराशी (Own)';
      else if ([4, 6].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else if (pSignIdx === 3) status = 'शत्रू (Enemy)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('गुरु') || pName.includes('Jupiter')) {
      if (pSignIdx === 3) status = 'उच्च (Exalted)';
      else if (pSignIdx === 9) status = 'नीच (Debilitated)';
      else if (pSignIdx === 8 || pSignIdx === 11) status = 'स्वराशी (Own)';
      else if ([0, 4, 7].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else if ([2, 5, 6].includes(pSignIdx)) status = 'शत्रू (Enemy)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('शुक्र') || pName.includes('Venus')) {
      if (pSignIdx === 11) status = 'उच्च (Exalted)';
      else if (pSignIdx === 5) status = 'नीच (Debilitated)';
      else if (pSignIdx === 1 || pSignIdx === 6) status = 'स्वराशी (Own)';
      else if ([2, 9, 10].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else if ([0, 3, 4].includes(pSignIdx)) status = 'शत्रू (Enemy)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('शनि') || pName.includes('Saturn')) {
      if (pSignIdx === 6) status = 'उच्च (Exalted)';
      else if (pSignIdx === 0) status = 'नीच (Debilitated)';
      else if (pSignIdx === 9 || pSignIdx === 10) status = 'स्वराशी (Own)';
      else if ([2, 5, 6].includes(pSignIdx)) status = 'मित्र (Friendly)';
      else if ([0, 3, 4, 7].includes(pSignIdx)) status = 'शत्रू (Enemy)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('राहू')) {
      if (pSignIdx === 1 || pSignIdx === 2) status = 'उच्च (Exalted)';
      else if (pSignIdx === 7 || pSignIdx === 8) status = 'नीच (Debilitated)';
      else if (pSignIdx === 10) status = 'स्वराशी (Own)';
      else status = 'सम (Neutral)';
    } else if (pName.includes('केतू')) {
      if (pSignIdx === 7 || pSignIdx === 8) status = 'उच्च (Exalted)';
      else if (pSignIdx === 1 || pSignIdx === 2) status = 'नीच (Debilitated)';
      else if (pSignIdx === 11) status = 'स्वराशी (Own)';
      else status = 'सम (Neutral)';
    }

    return {
      name: pName,
      symbol: pSymbol,
      house,
      rashiName: pRashi.name.mr,
      degree: degInSign,
      status,
      isRetrograde: isRetro,
    };
  };

  // Retrograde determination via elongation from Sun
  const elongMars = normalize(marsSid - sunSid);
  const isMarsRetro = elongMars > 140 && elongMars < 220;

  const elongJup = normalize(jupiterSid - sunSid);
  const isJupRetro = elongJup > 120 && elongJup < 240;

  const elongSat = normalize(saturnSid - sunSid);
  const isSatRetro = elongSat > 115 && elongSat < 245;

  const elongMerc = normalize(mercurySid - sunSid);
  const isMercRetro = (elongMerc > 15 && elongMerc < 28) || (elongMerc > 332 && elongMerc < 345);

  const elongVen = normalize(venusSid - sunSid);
  const isVenRetro = elongVen > 330 || elongVen < 30;

  const planets: PlanetPlacement[] = [
    getPlanetDetails('रवि (Sun)', '☀️', sunSid, false),
    getPlanetDetails('चंद्र (Moon)', '🌙', moonSid, false),
    getPlanetDetails('मंगळ (Mars)', '♂️', marsSid, isMarsRetro),
    getPlanetDetails('बुध (Mercury)', '☿', mercurySid, isMercRetro),
    getPlanetDetails('गुरु (Jupiter)', '♃', jupiterSid, isJupRetro),
    getPlanetDetails('शुक्र (Venus)', '♀', venusSid, isVenRetro),
    getPlanetDetails('शनि (Saturn)', '♄', saturnSid, isSatRetro),
    getPlanetDetails('राहू (Rahu)', '☊', rahuSid, true),
    getPlanetDetails('केतू (Ketu)', '☋', ketuSid, true),
  ];

  // 12. 12 Bhavas (Vedic Whole-Sign / Equal Bhava system as standard in AstroSage)
  const houseSignificancesMr = [
    'तनु भाव: शरीर, रूप, व्यक्तिमत्त्व, आरोग्य व जीवनशक्ती',
    'धन भाव: संपत्ती, कुटुंब, वाणी, संचित भांडवल व आर्थिक स्थिती',
    'सहज भाव: भावंडे, पराक्रम, धाडस, लघु प्रवास व संवाद',
    'सुख भाव: माता, घर, जमीन, वाहन, मानसिक शांती व कौटुंबिक सौख्य',
    'सुत भाव: उच्च विद्या, बुद्धिमत्ता, संतती, पूर्वपुण्य व निर्णयक्षमता',
    'रिपु भाव: शत्रू, आजारपण, कर्जमुक्ती, स्पर्धा व नोकरी',
    'जाया भाव: वैवाहिक जोडीदार, वैवाहिक सुख व व्यावसायिक भागीदारी',
    'मृत्यू भाव: आयुष्य, वारसा, गुप्त विद्या, अचानक धनलाभ व परिवर्तन',
    'धर्म भाव: भाग्य, धर्म, तीर्थयात्रा, उच्च ज्ञान व वडिलांचे आशीर्वाद',
    'कर्म भाव: करिअर, नोकरी, व्यवसाय, अधिकार व सामाजिक प्रतिष्ठा',
    'लाभ भाव: आर्थिक प्राप्ती, इच्छापूर्ती, मित्र परिवार व मोठा विजय',
    'व्यय भाव: मोक्ष, परदेश प्रवास, दान, ध्यान व आत्मिक उन्नती'
  ];

  const houseSignificancesEn = [
    'House of Self: Personality, Health & Vitality',
    'House of Wealth: Family, Speech & Financial Reserves',
    'House of Courage: Siblings, Initiative & Communication',
    'House of Comfort: Mother, Home, Vehicles & Peace',
    'House of Intellect: Wisdom, Children & Creative Genius',
    'House of Obstacles: Health discipline, Competitions & Debts',
    'House of Partnerships: Spouse, Marriage Bliss & Business Partners',
    'House of Transformation: Longevity, Mysticism & Hidden Wealth',
    'House of Fortune: Dharma, Pilgrimages & Fatherly Guidance',
    'House of Profession: Career, Authority & Public Recognition',
    'House of Gains: Aspirations, Network & Big Successes',
    'House of Liberation: Moksha, Travel, Expenses & Spiritual Focus'
  ];

  const houses: HouseDetail[] = [];
  for (let h = 1; h <= 12; h++) {
    const rashiIdx = (lagnaSignIndex + h - 1) % 12;
    const rashi = rashiDatabase[rashiIdx] || rashiDatabase[0];
    const housePlanets = planets.filter((p) => p.house === h);

    houses.push({
      houseNumber: h,
      nameMr: `${h} ला भाव`,
      nameEn: `House #${h}`,
      signNumber: rashiIdx + 1,
      signNameMr: rashi.name.mr,
      signNameEn: rashi.name.en,
      rulingPlanet: rashi.rulingPlanet.mr,
      significanceMr: houseSignificancesMr[h - 1] || 'शुभ स्थान',
      significanceEn: houseSignificancesEn[h - 1] || 'Auspicious House',
      planets: housePlanets,
    });
  }

  // 13. Classical Dosha Analysis (Brihat Parashara Hora Shastra)
  // Mangal Dosha (Kuja Dosha) from Lagna and Moon
  const marsPlacement = planets.find((p) => p.name.includes('मंगळ'));
  const marsHouseFromLagna = marsPlacement?.house || 1;
  const marsSignIdx = Math.floor(marsSid / 30);
  const marsHouseFromMoon = ((marsSignIdx - moonSignIndex + 12) % 12) + 1;

  const isManglikLagna = [1, 4, 7, 8, 12].includes(marsHouseFromLagna);
  const isManglikMoon = [1, 4, 7, 8, 12].includes(marsHouseFromMoon);
  const isManglik = isManglikLagna || isManglikMoon;

  // Kaal Sarp Dosha: Check if all 7 planets are bounded on one side of Rahu-Ketu axis
  const isInsideRahuKetuArc = (deg: number) => {
    const d = normalize(deg - rahuSid);
    return d > 0 && d < 180;
  };

  const sevenPlanets = [sunSid, moonSid, marsSid, mercurySid, jupiterSid, venusSid, saturnSid];
  const countInside = sevenPlanets.filter(isInsideRahuKetuArc).length;
  const isKaalSarp = countInside === 7 || countInside === 0;

  // Shani Sade Sati: Current Saturn Transit (2024-2027 in Kumbha & Meena)
  // Sade Sati affects signs: Makara (12th), Kumbha (1st), Meena (2nd)
  const isSadeSatiActive = [9, 10, 11].includes(moonSignIndex);
  const sadeSatiPhase =
    moonSignIndex === 9
      ? 'उतरती साडेसाती (अंतिम अडीच वर्षे - स्थिरता व फळ प्राप्ती)'
      : moonSignIndex === 10
      ? 'मध्य चरण / शिखर साडेसाती (महत्त्वाचे निर्णय व संयम)'
      : moonSignIndex === 11
      ? 'चढती साडेसाती (आरंभ - अध्यात्म व कष्टाला गती)'
      : 'साडेसातीचा प्रभाव नाही';

  // Pitra Dosha: Sun conjunction with Rahu/Ketu/Saturn or in 9th house with afflictions
  const sunHouse = planets.find((p) => p.name.includes('रवि'))?.house || 1;
  const rahuHouse = planets.find((p) => p.name.includes('राहू'))?.house || 1;
  const saturnHouse = planets.find((p) => p.name.includes('शनि'))?.house || 1;
  const hasPitraDosha =
    sunHouse === rahuHouse ||
    Math.abs(normalize(sunSid - rahuSid)) < 15 ||
    (sunHouse === 9 && saturnHouse === 9);

  const doshas: DoshaAnalysis = {
    mangalDosha: {
      hasDosha: isManglik,
      severity:
        isManglikLagna && isManglikMoon
          ? 'प्रभावी (Strong)'
          : isManglik
          ? 'अंशतः (Partial)'
          : 'नाही (None)',
      descriptionMr: isManglik
        ? `आपल्या कुंडलीत मंगळ ग्रह लग्नापासून ${marsHouseFromLagna} व्या आणि चंद्रापासून ${marsHouseFromMoon} व्या स्थानी असल्याने मंगळ दोष दर्शवतो. यामुळे स्वभावात प्रखर ऊर्जा, स्वाभिमान व स्पष्टवक्तेपणा असतो.`
        : 'आपल्या कुंडलीत मंगळ दोष नाही. मंगळ शुभ स्थानात असून पराक्रमास अनुकूल आहे.',
      remedyMr: isManglik
        ? 'दर मंगळवारी मारुतीरायाला शेंदूर व रुईच्या पानांची माळ अर्पण करा. रोज २१ वेळा "ॐ अं अंगारकाय नमः" बीजमंत्राचा जप करा. हनुमान चालीसा पठण अत्यंत लाभदायी ठरेल.'
        : 'मंगळाच्या कृपेसाठी नियमित व्यायाम, ध्यान व प्राणायाम करा.',
    },
    kaalSarpDosha: {
      hasDosha: isKaalSarp,
      typeMr: isKaalSarp ? 'अनंत किंवा शंखपाल कालसर्प योग' : 'नाही',
      descriptionMr: isKaalSarp
        ? 'कुंडलीत सर्व प्रमुख ग्रह राहू-केतूच्या कक्षेत असल्याने सुरुवातीच्या संघर्षांनंतर मोठे यश मिळण्याचे संकेत आहेत. पूर्वार्धात कष्ट आणि उत्तरार्धात प्रगती होते.'
        : 'आपल्या कुंडलीत कालसर्प दोषाचा त्रास नाही. सर्व ग्रह स्वतंत्र संचार करत आहेत.',
      remedyMr: isKaalSarp
        ? 'श्रावण महिन्यात किंवा सोमवारी त्र्यंबकेश्वर अथवा स्थानिक शिवमंदिरात महादेवाला दुधाचा व बेलाचा अभिषेक करा. रोज महामृत्युंजय मंत्राचा ११ वेळा जप करा.'
        : 'नियमित शिव उपासना मनास असीम शांती देईल.',
    },
    sadeSati: {
      isActive: isSadeSatiActive,
      phaseMr: sadeSatiPhase,
      descriptionMr: isSadeSatiActive
        ? `सध्या शनि महाराजांची गोचर स्थिती आपल्या चंद्र राशीशी संबंधित आहे (${sadeSatiPhase}). हा काळ शिस्त, न्याय आणि कष्टाचे उत्तम चीज करण्याचा आहे.`
        : 'सध्या आपल्या कुंडलीवर साडेसातीचा थेट प्रभाव नाही. शुभ ग्रहांचे पाठबळ लाभेल.',
      remedyMr: isSadeSatiActive
        ? 'शनिवारी संध्याकाळी पिंपळाच्या वृक्षाखाली किंवा मारुती मंदिरात तिळाच्या तेलाचा दिवा लावा. गरजूंना काळे तीळ किंवा अन्नदान करा.'
        : 'शनिदेवांच्या कृपेसाठी सत्य, प्रामाणिकपणा आणि कष्टाची कास धरा.',
    },
    pitraDosha: {
      hasDosha: hasPitraDosha,
      descriptionMr: hasPitraDosha
        ? 'सूर्य व राहू/शनि यांच्या संयोगामुळे पितृदोषाची छटा जाणवते. कार्यामध्ये अचानक विलंब येऊ शकतो.'
        : 'कुंडलीत पितृदोष नाही, पूर्वजांचे आशीर्वाद पाठीशी आहेत.',
      remedyMr:
        'दर अमावस्येला गायीला किंवा गरजूंना अन्न द्यावे. सूर्याला तांब्याच्या पात्रातून अर्घ्य अर्पण करावे.',
    },
  };

  // 14. Exact Vimshottari Mahadasha & Antardasha
  const currentDasha = calculateVimshottariDasha(birthDateObj, moonSid);

  // 15. Lucky Metas
  const luckyGems: Record<string, { gem: string; metal: string }> = {
    aries: { gem: 'पोवळे (Red Coral)', metal: 'तांबे किंवा सोने' },
    taurus: { gem: 'हिरा (Diamond) / पांढरा ओपल', metal: 'चांदी किंवा प्लॅटिनम' },
    gemini: { gem: 'पाचू (Emerald)', metal: 'सोने किंवा कास्य' },
    cancer: { gem: 'नैसर्गिक मोती (Natural Pearl)', metal: 'शुद्ध चांदी' },
    leo: { gem: 'माणिक (Ruby)', metal: 'अष्टधातू किंवा सोने' },
    virgo: { gem: 'पाचू (Emerald)', metal: 'चांदी' },
    libra: { gem: 'पांढरा ओपल (White Opal)', metal: 'चांदी' },
    scorpio: { gem: 'पोवळे (Red Coral)', metal: 'तांबे' },
    sagittarius: { gem: 'पुष्कराज (Yellow Sapphire)', metal: 'शुद्ध सोने' },
    capricorn: { gem: 'नीलम (Blue Sapphire) / जांभळा खडा', metal: 'लोखंड किंवा पंचधातू' },
    aquarius: { gem: 'नीलम (Blue Sapphire) / अमेथिस्ट', metal: 'चांदी किंवा पंचधातू' },
    pisces: { gem: 'पुष्कराज (Yellow Sapphire)', metal: 'सोने' }
  };
  const gemMeta = luckyGems[lagnaSign.id] || { gem: 'पाचू किंवा स्फटिक', metal: 'चांदी' };

  const luckyNumBase = ((lagnaSignIndex + 1) * 3 + day) % 9 || 9;
  const luckyNumbers = `${luckyNumBase}, ${(luckyNumBase + 2) % 9 + 1}, ${(luckyNumBase + 5) % 9 + 1}`;

  // 16. Comprehensive AI Predictions
  const predictions: AIPredictionReport = generateAIPredictions({
    birthData,
    lagnaSign,
    moonSign,
    sunSign,
    nakshatra,
    pada,
    isManglik,
    isSadeSatiActive,
    houses,
    planets,
  });

  return {
    user: {
      ...birthData,
      birthPlace: cityInfo.matchedName,
    },
    pillars: {
      lagnaSign,
      moonSign,
      sunSign,
      nakshatra,
      pada,
      varna,
      vashya,
      tara,
      yoni,
      grahaMaitri: 'परम मित्र व सौहार्द',
      gana,
      bhakoot: 'शुभ भकूट योग',
      nadi,
      tithi,
      vaar,
      yoga,
      karana,
      luckyNumbers,
      luckyColors: `${lagnaSign.auspiciousColor.mr}, सुवर्ण पिवळा व पांढरा`,
      luckyGem: gemMeta.gem,
      luckyGemMetal: gemMeta.metal,
      luckyDay: lagnaSign.auspiciousDay.mr,
      ishtadevata: moonSign.ishtaDevata.mr,
      beejMantra: moonSign.beejMantra.sanskrit,
    },
    houses,
    planets,
    doshas,
    predictions,
    currentDasha,
  };
}

// ==========================================
// 5. DETERMINISTIC SCRIPTURAL PREDICTIONS
// ==========================================
function generateAIPredictions(context: {
  birthData: UserBirthData;
  lagnaSign: RashiInfo;
  moonSign: RashiInfo;
  sunSign: RashiInfo;
  nakshatra: NakshatraInfo;
  pada: number;
  isManglik: boolean;
  isSadeSatiActive: boolean;
  houses: HouseDetail[];
  planets: PlanetPlacement[];
}): AIPredictionReport {
  const { birthData, lagnaSign, moonSign, nakshatra, pada, isManglik, isSadeSatiActive, houses } = context;

  const house10 = houses.find((h) => h.houseNumber === 10);
  const house7 = houses.find((h) => h.houseNumber === 7);
  const house2 = houses.find((h) => h.houseNumber === 2);

  // 1. Personality
  const personality = `आपले लग्न **${lagnaSign.name.mr}** आणि चंद्र रास **${moonSign.name.mr}** असल्याने आपल्या व्यक्तिमत्त्वात प्रखर आत्मविश्वास, दूरदृष्टी आणि दृढनिश्चय दिसून येतो. **${nakshatra.name.mr} नक्षत्राच्या ${pada} थ्या चरणात** जन्म झाल्याने आपली ग्रहणशक्ती विलक्षण आहे. आपण इतरांच्या सुख-दुःखाचा आदर करणारे, स्वाभिमानी आणि कोणत्याही कठीण प्रसंगाला न डगमगता सामोरे जाणारे आहात. आपल्या बोलण्यात एक नैसर्गिक वजन असून लोकांवर प्रभाव पाडण्याची दैवी देणगी आपल्याला लाभली आहे.`;

  // 2. Career & Wealth
  const careerAndWealth = `कुंडलीतील १० व्या कर्म स्थानावर **${house10?.rulingPlanet}** चे अधिपत्य असून २ रा धन भाव **${house2?.rulingPlanet}** कडून संचलित आहे. आपल्यासाठी नेतृत्व, व्यवस्थापन, तांत्रिक क्षेत्र, स्वतंत्र व्यवसाय, अध्यापन किंवा सरकारी क्षेत्रातील संधी अत्यंत लाभदायी ठरतील. वयाच्या २५ ते ३२ वर्षांच्या टप्प्यात आपल्या करिअरला मोठी कलाटणी मिळून स्थिरतेचे योग आहेत. आपण कष्टाने आणि बुद्धीच्या जोरावर संपत्ती निर्माण कराल. अचानक येणाऱ्या खर्चावर नियंत्रण ठेवल्यास मोठी आर्थिक गंगाजळी निर्माण होईल.`;

  // 3. Marriage & Relationships
  const marriageAndFamily = `विवाह स्थानावर (७ वा भाव) **${house7?.rulingPlanet}** चा प्रभाव आहे. आपला जोडीदार समजूतदार, सुसंस्कृत आणि कुटुंबाला एकत्र बांधून ठेवणारा लाभेल. ${
    isManglik
      ? 'कुंडलीत मंगळाची विशेष स्थिती असल्याने विवाह ठरवताना पत्रिकेचे गुणमिलन आणि मंगळ दोषाची पडताळणी करणे हितावह राहील. लग्नानंतर दोघांच्या संवादात संयम बाळगल्यास संसार अत्यंत सुखाचा व समृद्धीचा होईल.'
      : 'आपल्या कुंडलीत वैवाहिक सुख उत्तम असून जोडीदाराच्या आगमनानंतर आपल्या भाग्योदयाला विशेष गती मिळेल.'
  } वडीलधाऱ्यांच्या आशीर्वादाने घरात नेहमी मांगल्याचे वातावरण राहील.`;

  // 4. Health & Vitality
  const healthAndVitality = `आपली नाडी **${context.nakshatra.gana === 'देव' ? 'शांत' : 'उत्साही'}** प्रवृत्तीची आहे. पचनसंस्था, डोळ्यांची निगा आणि रक्ताभिसरण यावर नियमित लक्ष देणे आवश्यक आहे. ऋतुबदलाच्या वेळी पित्त किंवा वात विकारांची शक्यता असल्याने सात्विक आहार आणि वेळेवर झोप घेणे फायदेशीर ठरेल. रोज सकाळी १० मिनिटे प्राणायाम आणि सूर्यनमस्कार केल्यास दीर्घायुष्य व निरोगी शरीर लाभेल.`;

  // 5. Upcoming Period
  const upcomingPeriod = `${
    isSadeSatiActive
      ? 'सध्या शनि महाराजांच्या प्रभावाखाली आपण जीवनातील अत्यंत मौल्यवान अनुभव घेत आहात. आगामी काळात घेतलेले कष्टाचे निर्णय दीर्घकालीन यश आणि समाजात मान-सन्मान मिळवून देतील.'
      : 'आगामी काळ आपल्यासाठी नवीन संधींचा, प्रवासाचा आणि पदोन्नतीचा आहे. अडकलेली कामे सुटतील.'
  } विशेषतः पुढील ६ ते १२ महिन्यांत आपल्या कार्यक्षेत्रात मोठे सकारात्मक बदल अपेक्षित आहेत. नवीन गुंतवणूक किंवा करार करताना अनुभवी व्यक्तींचा सल्ला नक्की घ्या.`;

  // 6. Remedies & Puja
  const remediesAndPuja = `१. रोज सकाळी स्नान करून कुलदेवतेचे व **${moonSign.ishtaDevata.mr}** चे नामस्मरण करावे.\n२. आपल्या राशीचा सिद्ध मंत्र: **"${moonSign.beejMantra.sanskrit}"** याचा रोज किमान २१ वेळा शांत चित्ताने जप करावा.\n३. भाग्योदयासाठी **${lagnaSign.auspiciousDay.mr}** हा वार विशेष शुभ आहे. त्या दिवशी पिवळे किंवा शुभ्र वस्त्र परिधान करावे.\n४. संकटमुक्तीसाठी मारुतीरायाला रुईच्या पानांची माळ अर्पण करावी.`;

  // 7. Specific Query Answer if provided
  let specificQueryAnswer: string | undefined = undefined;
  if (birthData.specificQuery && birthData.specificQuery.trim()) {
    const q = birthData.specificQuery.toLowerCase();
    if (q.includes('लग्न') || q.includes('विवाह') || q.includes('marriage')) {
      specificQueryAnswer = `💍 **आपल्या विवाह प्रश्नावर AI विश्लेषण:** आपल्या कुंडलीतील ७ वा भाव आणि गुरु-शुक्राची स्थिती पाहता, आपल्या विवाहाचा काळ अत्यंत अनुकूल टप्प्यात आहे. पूर्व किंवा उत्तर दिशेकडून सुयोग्य स्थळ येण्याची शक्यता आहे. जोडीदार सुविद्य आणि अध्यात्मिक वृत्तीचा असेल. लग्नातील अडथळे दूर होण्यासाठी गुरुवारी विष्णू-लक्ष्मीची उपासना करावी.`;
    } else if (q.includes('नोकरी') || q.includes('करिअर') || q.includes('job') || q.includes('प्रमोशन')) {
      specificQueryAnswer = `💼 **आपल्या करिअर/नोकरी प्रश्नावर AI विश्लेषण:** १० व्या कर्म भावातील शुभ दृष्टीमुळे आगामी काळात कार्यक्षेत्रात मोठा बदल किंवा पदोन्नतीचे प्रबळ योग आहेत. वरिष्ठांशी संबंध सलोख्याचे ठेवा. दर रविवारी सूर्याला अर्घ्य दिल्यास अधिकार प्राप्ती व यश नक्की मिळेल.`;
    } else if (q.includes('व्यवसाय') || q.includes('business') || q.includes('दुकान')) {
      specificQueryAnswer = `📈 **आपल्या व्यवसाय प्रश्नावर AI विश्लेषण:** आपल्या कुंडलीत बुध व गुरुची शुभ दृष्टी असल्याने व्यापारी बुद्धी उत्तम आहे. भागीदारीपेक्षा स्वतःच्या नियंत्रणातील व्यवसाय अधिक फलदायी ठरेल. सेवा क्षेत्र, तंत्रज्ञान किंवा अन्नधान्य/वस्त्र व्यवसायात उत्तम नफा होईल.`;
    } else if (q.includes('आरोग्य') || q.includes('health') || q.includes('आजारी')) {
      specificQueryAnswer = `🌿 **आपल्या आरोग्य प्रश्नावर AI विश्लेषण:** ६ व्या भावानुसार मानसिक ताण कमी करणे आणि नियमित दिनचर्या ठेवणे आवश्यक आहे. महामृत्युंजय मंत्राचा जप आपल्या शरीरात सकारात्मक ऊर्जा संचारेल आणि जुने आजार दूर होतील.`;
    } else {
      specificQueryAnswer = `🔮 **आपल्या विशिष्ट प्रश्नावरील मार्गदर्शन:** आपण विचारलेल्या विषयावर कुंडलीतील ग्रहस्थिती अनुकूल आहे. सुरुवातीला काही अडथळे वाटले तरी आपल्या आत्मबळाच्या आणि इष्टदेवतेच्या आशीर्वादाने योग्य वेळी कार्य सिद्धीस जाईल. सकारात्मक विचार ठेवा आणि नित्य उपासना सुरू ठेवा.`;
    }
  }

  return {
    personality,
    careerAndWealth,
    marriageAndFamily,
    healthAndVitality,
    upcomingPeriod,
    remediesAndPuja,
    specificQueryAnswer,
  };
}

// ==========================================
// 6. GEMINI LIVE HOROSCOPE ENRICHMENT
// ==========================================
export async function fetchGeminiKundaliPrediction(
  kundali: FullKundaliAnalysis,
  apiKey: string,
  userQuery?: string
): Promise<string> {
  if (!apiKey || !apiKey.trim()) {
    return '';
  }

  const prompt = `You are a world-class revered Vedic Astrologer and Jyotishacharya named 'Sanatan Amrutdhara AI ज्योतिषाचार्य'.
Analyze this exact calculated birth chart:
- Name: ${kundali.user.name}
- Gender: ${kundali.user.gender}
- Birth Date: ${kundali.user.birthDate}, Time: ${kundali.user.birthTime}, Place: ${kundali.user.birthPlace}
- Lagna Sign (Ascendant): ${kundali.pillars.lagnaSign.name.mr} (${kundali.pillars.lagnaSign.name.en})
- Moon Sign (Rashi): ${kundali.pillars.moonSign.name.mr}
- Sun Sign: ${kundali.pillars.sunSign.name.mr}
- Nakshatra: ${kundali.pillars.nakshatra.name.mr}, Pada: ${kundali.pillars.pada}
- Gana: ${kundali.pillars.gana}, Nadi: ${kundali.pillars.nadi}
- Manglik Status: ${kundali.doshas.mangalDosha.severity}
- Sade Sati Status: ${kundali.doshas.sadeSati.phaseMr}
- Specific User Question: ${userQuery || kundali.user.specificQuery || 'सर्वसाधारण भविष्य व भाग्योदय'}

Provide a deeply compassionate, highly accurate, and empowering Vedic astrology prediction in authentic Marathi (मराठी).
Cover:
1. व्यक्तिमत्त्व व स्वभाव विश्लेषण
2. करिअर, धनयोग व भाग्योदयाचा काळ
3. विवाह, कौटुंबिक सुख व जोडीदार
4. शारीरिक प्रकृती व आरोग्याची काळजी
5. विचारलेल्या प्रश्नाचे अचूक शास्त्रोक्त उत्तर
6. प्रभावी १-मिनिट उपाय, इष्टदेवता मंत्र व रत्न सल्ला.
Format with clean Markdown headers, bullet points, and respectful spiritual tone.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }
  } catch {
    // Graceful fallback
  }
  return '';
}

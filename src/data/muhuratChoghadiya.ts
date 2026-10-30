export interface ChoghadiyaSlot {
  name: { en: string; hi: string; mr: string };
  type: 'amrit' | 'shubh' | 'laabh' | 'char' | 'kaal' | 'rog' | 'udveg';
  quality: 'auspicious' | 'inauspicious' | 'neutral';
  rulingPlanet: string;
  significance: { en: string; hi: string; mr: string };
  startHour: number; // approximate 1.5 hr windows starting from sunrise ~6 AM
  startMin: number;
  endHour: number;
  endMin: number;
}

export interface DayMuhuratData {
  dayName: { en: string; hi: string; mr: string };
  dayIndex: number; // 0 Sun - 6 Sat
  rahuKaal: { start: string; end: string };
  yamaganda: { start: string; end: string };
  gulikaKaal: { start: string; end: string };
  brahmaMuhurta: { start: string; end: string };
  abhijitMuhurat: { start: string; end: string };
  godhuliMuhurat: { start: string; end: string };
  amritKaal: { start: string; end: string };
  dayChoghadiya: ChoghadiyaSlot[];
  nightChoghadiya: ChoghadiyaSlot[];
}

// Choghadiya qualities mapping
export const choghadiyaQualities: Record<string, { quality: 'auspicious' | 'inauspicious' | 'neutral'; color: string; badge: { en: string; hi: string; mr: string } }> = {
  amrit: { quality: 'auspicious', color: 'bg-emerald-500 text-white', badge: { en: 'Supreme Auspicious (अमृत)', hi: 'सर्वोत्तम अमृत', mr: 'सर्वोत्तम अमृत' } },
  shubh: { quality: 'auspicious', color: 'bg-green-600 text-white', badge: { en: 'Auspicious (शुभ)', hi: 'शुभ फलदायी', mr: 'मंगल शुभ' } },
  laabh: { quality: 'auspicious', color: 'bg-teal-600 text-white', badge: { en: 'Profitable (लाभ)', hi: 'धनलाभ एवं उन्नति', mr: 'उत्तम लाभ' } },
  char: { quality: 'neutral', color: 'bg-amber-500 text-white', badge: { en: 'Neutral / Travel (चर)', hi: 'यात्रा हेतु उत्तम (चर)', mr: 'प्रवासासाठी उत्तम (चर)' } },
  udveg: { quality: 'inauspicious', color: 'bg-orange-600 text-white', badge: { en: 'Anxious / Delay (उद्वेग)', hi: 'उद्वेग (कष्टकारक)', mr: 'उद्वेग (चिंताजनक)' } },
  kaal: { quality: 'inauspicious', color: 'bg-red-600 text-white', badge: { en: 'Inauspicious (काल)', hi: 'काल (हानिकारक)', mr: 'काल (हानिकारक)' } },
  rog: { quality: 'inauspicious', color: 'bg-rose-700 text-white', badge: { en: 'Disease / Loss (रोग)', hi: 'रोग (अशुभ)', mr: 'रोग (अशुभ)' } },
};

// Traditional Vedic Weekday Choghadiya sequence table
const weekdayChoghadiyaOrder: Record<number, { day: string[]; night: string[] }> = {
  // 0 Sunday (Sun)
  0: {
    day: ['udveg', 'char', 'laabh', 'amrit', 'kaal', 'shubh', 'rog', 'udveg'],
    night: ['shubh', 'amrit', 'char', 'rog', 'kaal', 'laabh', 'udveg', 'shubh'],
  },
  // 1 Monday (Moon)
  1: {
    day: ['amrit', 'kaal', 'shubh', 'rog', 'udveg', 'char', 'laabh', 'amrit'],
    night: ['char', 'rog', 'kaal', 'laabh', 'udveg', 'shubh', 'amrit', 'char'],
  },
  // 2 Tuesday (Mars)
  2: {
    day: ['rog', 'udveg', 'char', 'laabh', 'amrit', 'kaal', 'shubh', 'rog'],
    night: ['kaal', 'laabh', 'udveg', 'shubh', 'amrit', 'char', 'rog', 'kaal'],
  },
  // 3 Wednesday (Mercury)
  3: {
    day: ['laabh', 'amrit', 'kaal', 'shubh', 'rog', 'udveg', 'char', 'laabh'],
    night: ['udveg', 'shubh', 'amrit', 'char', 'rog', 'kaal', 'laabh', 'udveg'],
  },
  // 4 Thursday (Jupiter)
  4: {
    day: ['shubh', 'rog', 'udveg', 'char', 'laabh', 'amrit', 'kaal', 'shubh'],
    night: ['amrit', 'char', 'rog', 'kaal', 'laabh', 'udveg', 'shubh', 'amrit'],
  },
  // 5 Friday (Venus)
  5: {
    day: ['char', 'laabh', 'amrit', 'kaal', 'shubh', 'rog', 'udveg', 'char'],
    night: ['rog', 'kaal', 'laabh', 'udveg', 'shubh', 'amrit', 'char', 'rog'],
  },
  // 6 Saturday (Saturn)
  6: {
    day: ['kaal', 'shubh', 'rog', 'udveg', 'char', 'laabh', 'amrit', 'kaal'],
    night: ['laabh', 'udveg', 'shubh', 'amrit', 'char', 'rog', 'kaal', 'laabh'],
  },
};

const choghadiyaNames: Record<string, { name: { en: string; hi: string; mr: string }; planet: string; significance: { en: string; hi: string; mr: string } }> = {
  amrit: {
    name: { en: 'Amrit (अमृत)', hi: 'अमृत', mr: 'अमृत' },
    planet: 'Moon / चंद्रमा',
    significance: {
      en: 'Supreme auspicious nectar. Ideal for all sacred ceremonies, starting pujas, prayers, signing documents, and medical cures.',
      hi: 'सर्वोत्तम अमृत काल। नए कार्यों का शुभारंभ, पूजा-अनुष्ठान, यात्रा और व्यापार हेतु सर्वश्रेष्ठ।',
      mr: 'सर्वोत्तम पावन अमृत काळ. कोणतेही शुभ कार्य, पूजा, साधना, खरेदी व नवीन संकल्प सुरू करण्यासाठी सर्वोत्तम.'
    }
  },
  shubh: {
    name: { en: 'Shubh (शुभ)', hi: 'शुभ', mr: 'शुभ' },
    planet: 'Jupiter / गुरु',
    significance: {
      en: 'Blessed by Jupiter. Best for religious ceremonies, education, buying gold/property, and auspicious meetings.',
      hi: 'गुरु कृपा से युक्त। धार्मिक अनुष्ठान, विवाह, गृह प्रवेश एवं अध्ययन हेतु अत्यंत शुभ।',
      mr: 'देवगुरू बृहस्पतींचा आशीर्वाद. धार्मिक कार्य, विद्याभ्यास, दानधर्म व आनंदी कार्यासाठी अत्यंत मंगल.'
    }
  },
  laabh: {
    name: { en: 'Laabh (लाभ)', hi: 'लाभ', mr: 'लाभ' },
    planet: 'Mercury / बुध',
    significance: {
      en: 'Brings wealth, commercial success, and intelligence. Best for trade, new investments, and starting education.',
      hi: 'बुध ग्रह की शुभता। व्यापार, नवीन निवेश, विद्यारंभ एवं आर्थिक लाभ हेतु उत्तम।',
      mr: 'बुध देवाचा प्रभाव. व्यापार, आर्थिक देवाणघेवाण, नवीन कामे आणि समृद्धीसाठी लाभदायक.'
    }
  },
  char: {
    name: { en: 'Char (चर / गतिमान)', hi: 'चर (गतिमान)', mr: 'चर (गतिमान)' },
    planet: 'Venus / शुक्र',
    significance: {
      en: 'Dynamic energy of Venus. Ideal for travel, vehicles, shifts, speed, and communication.',
      hi: 'शुक्र का प्रभाव। यात्रा, वाहन क्रय, प्रस्थान एवं चलायमान कार्यों के लिए उत्तम।',
      mr: 'शुक्र ग्रहाची ऊर्जा. प्रवास, तीर्थयात्रा, वाहन खरेदी व हालचालींच्या कामांसाठी शुभ.'
    }
  },
  udveg: {
    name: { en: 'Udveg (उद्वेग)', hi: 'उद्वेग', mr: 'उद्वेग' },
    planet: 'Sun / सूर्य',
    significance: {
      en: 'Causes tension, anxiety, and delay. Avoid starting peaceful domestic matters. Government or administrative work can be done.',
      hi: 'मानसिक तनाव एवं बाधा। मांगलिक कार्य टालें। केवल शासकीय अथवा कोर्ट-कचहरी के कार्य किए जा सकते हैं।',
      mr: 'चिंता व मानसिक अशांती निर्माण करणारा काळ. कौटुंबिक शुभ कार्ये टाळावीत. फक्त शासकीय कामे करू शकता.'
    }
  },
  kaal: {
    name: { en: 'Kaal (काल)', hi: 'काल', mr: 'काल' },
    planet: 'Saturn / शनि',
    significance: {
      en: 'Ruled by Saturn. Highly risky for new ventures or happy gatherings. Causes friction and obstacles.',
      hi: 'शनि का अशुभ प्रभाव। कोई भी नया कार्य या यात्रा न करें। विपत्ति की संभावना।',
      mr: 'शनिदेवाचा काळ. कोणतेही नवीन कार्य, करार किंवा प्रवास टाळावा. विघ्न येण्याची शक्यता.'
    }
  },
  rog: {
    name: { en: 'Rog (रोग)', hi: 'रोग', mr: 'रोग' },
    planet: 'Mars / मंगल',
    significance: {
      en: 'Ruled by Mars. May lead to conflict, sickness, or disputes. Strictly avoid borrowing money or medical surgeries.',
      hi: 'मंगल का उग्र रूप। विवाद, रोग अथवा दुर्घटना की आशंका। शांति बनाए रखें।',
      mr: 'उग्र मंगळ प्रभाव. वादविवाद, भांडण किंवा कर्ज घेणे टाळावे. शांत राहून नामस्मरण करावे.'
    }
  }
};

// Fixed Vedic Rahu Kaal schedule for 7 days
export const weeklyRahuKaalSchedule: Record<number, { start: string; end: string }> = {
  0: { start: '16:30', end: '18:00' }, // Sunday
  1: { start: '07:30', end: '09:00' }, // Monday
  2: { start: '15:00', end: '16:30' }, // Tuesday
  3: { start: '12:00', end: '13:30' }, // Wednesday
  4: { start: '13:30', end: '15:00' }, // Thursday
  5: { start: '10:30', end: '12:00' }, // Friday
  6: { start: '09:00', end: '10:30' }, // Saturday
};

export const weeklyYamagandaSchedule: Record<number, { start: string; end: string }> = {
  0: { start: '12:00', end: '13:30' },
  1: { start: '10:30', end: '12:00' },
  2: { start: '09:00', end: '10:30' },
  3: { start: '07:30', end: '09:00' },
  4: { start: '06:00', end: '07:30' },
  5: { start: '15:00', end: '16:30' },
  6: { start: '13:30', end: '15:00' },
};

export const weeklyGulikaSchedule: Record<number, { start: string; end: string }> = {
  0: { start: '15:00', end: '16:30' },
  1: { start: '13:30', end: '15:00' },
  2: { start: '12:00', end: '13:30' },
  3: { start: '10:30', end: '12:00' },
  4: { start: '09:00', end: '10:30' },
  5: { start: '07:30', end: '09:00' },
  6: { start: '06:00', end: '07:30' },
};

/**
 * Builds the dynamic 8 Choghadiya slots for day and night based on weekday.
 */
export function getChoghadiyaSlotsForDay(dayIndex: number): { daySlots: ChoghadiyaSlot[]; nightSlots: ChoghadiyaSlot[] } {
  const order = weekdayChoghadiyaOrder[dayIndex] || weekdayChoghadiyaOrder[0];
  
  // Day time spans 06:00 to 18:00 (8 slots of 90 minutes each)
  const daySlots: ChoghadiyaSlot[] = order.day.map((typeKey, idx) => {
    const startMinutesTotal = 6 * 60 + idx * 90;
    const endMinutesTotal = startMinutesTotal + 90;
    const meta = choghadiyaNames[typeKey];
    const qualityMeta = choghadiyaQualities[typeKey];

    return {
      name: meta.name,
      type: typeKey as any,
      quality: qualityMeta.quality,
      rulingPlanet: meta.planet,
      significance: meta.significance,
      startHour: Math.floor(startMinutesTotal / 60),
      startMin: startMinutesTotal % 60,
      endHour: Math.floor(endMinutesTotal / 60),
      endMin: endMinutesTotal % 60,
    };
  });

  // Night time spans 18:00 to 06:00 (next day)
  const nightSlots: ChoghadiyaSlot[] = order.night.map((typeKey, idx) => {
    const startMinutesTotal = (18 * 60 + idx * 90) % (24 * 60);
    const endMinutesTotal = (startMinutesTotal + 90) % (24 * 60);
    const meta = choghadiyaNames[typeKey];
    const qualityMeta = choghadiyaQualities[typeKey];

    return {
      name: meta.name,
      type: typeKey as any,
      quality: qualityMeta.quality,
      rulingPlanet: meta.planet,
      significance: meta.significance,
      startHour: Math.floor(startMinutesTotal / 60),
      startMin: startMinutesTotal % 60,
      endHour: Math.floor(endMinutesTotal / 60),
      endMin: endMinutesTotal % 60,
    };
  });

  return { daySlots, nightSlots };
}

/**
 * Finds the currently active Choghadiya based on wall-clock time
 */
export function getCurrentChoghadiyaInfo(): {
  slot: ChoghadiyaSlot;
  isDay: boolean;
  timeLeftMinutes: number;
  progressPercent: number;
} {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const dayIndex = now.getDay();
  const { daySlots, nightSlots } = getChoghadiyaSlotsForDay(dayIndex);

  const isDay = currentMinutes >= 6 * 60 && currentMinutes < 18 * 60;
  const activeList = isDay ? daySlots : nightSlots;

  for (const slot of activeList) {
    let slotStart = slot.startHour * 60 + slot.startMin;
    let slotEnd = slot.endHour * 60 + slot.endMin;

    if (slotEnd < slotStart) {
      // Midnight wrap-around for night
      if (currentMinutes >= slotStart || currentMinutes < slotEnd) {
        const elapsed = currentMinutes >= slotStart ? currentMinutes - slotStart : currentMinutes + (24 * 60 - slotStart);
        const total = 90;
        return {
          slot,
          isDay,
          timeLeftMinutes: Math.max(1, total - elapsed),
          progressPercent: Math.min(100, Math.round((elapsed / total) * 100)),
        };
      }
    } else {
      if (currentMinutes >= slotStart && currentMinutes < slotEnd) {
        const elapsed = currentMinutes - slotStart;
        const total = 90;
        return {
          slot,
          isDay,
          timeLeftMinutes: Math.max(1, total - elapsed),
          progressPercent: Math.min(100, Math.round((elapsed / total) * 100)),
        };
      }
    }
  }

  // Fallback to first day slot
  return {
    slot: daySlots[0],
    isDay: true,
    timeLeftMinutes: 45,
    progressPercent: 50,
  };
}

/**
 * Checks whether Rahu Kaal is currently active right now
 */
export function isRahuKaalActiveNow(): { isActive: boolean; timeString: string; minutesRemaining: number } {
  const now = new Date();
  const dayIndex = now.getDay();
  const rahu = weeklyRahuKaalSchedule[dayIndex];
  const [startH, startM] = rahu.start.split(':').map(Number);
  const [endH, endM] = rahu.end.split(':').map(Number);

  const currentMin = now.getHours() * 60 + now.getMinutes();
  const startMin = startH * 60 + startM;
  const endMin = endH * 60 + endM;

  const isActive = currentMin >= startMin && currentMin < endMin;
  const minutesRemaining = isActive ? endMin - currentMin : 0;

  return {
    isActive,
    timeString: `${rahu.start} - ${rahu.end}`,
    minutesRemaining,
  };
}

export function getDayMuhuratData(dayIndex: number): DayMuhuratData {
  const dayNames = [
    { en: 'Sunday', hi: 'रविवार', mr: 'रविवार' },
    { en: 'Monday', hi: 'सोमवार', mr: 'सोमवार' },
    { en: 'Tuesday', hi: 'मंगलवार', mr: 'मंगळवार' },
    { en: 'Wednesday', hi: 'बुधवार', mr: 'बुधवार' },
    { en: 'Thursday', hi: 'गुरुवार', mr: 'गुरुवार' },
    { en: 'Friday', hi: 'शुक्रवार', mr: 'शुक्रवार' },
    { en: 'Saturday', hi: 'शनिवार', mr: 'शनिवार' },
  ];
  const { daySlots, nightSlots } = getChoghadiyaSlotsForDay(dayIndex);
  return {
    dayName: dayNames[dayIndex] || dayNames[0],
    dayIndex,
    rahuKaal: weeklyRahuKaalSchedule[dayIndex] || weeklyRahuKaalSchedule[0],
    yamaganda: weeklyYamagandaSchedule[dayIndex] || weeklyYamagandaSchedule[0],
    gulikaKaal: weeklyGulikaSchedule[dayIndex] || weeklyGulikaSchedule[0],
    brahmaMuhurta: { start: '04:24', end: '05:12' },
    abhijitMuhurat: { start: '11:48', end: '12:36' },
    godhuliMuhurat: { start: '18:25', end: '18:49' },
    amritKaal: { start: '19:15', end: '20:45' },
    dayChoghadiya: daySlots,
    nightChoghadiya: nightSlots,
  };
}

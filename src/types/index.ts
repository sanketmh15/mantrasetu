export type Language = 'en' | 'hi' | 'mr';
export type DeityId = 'hanuman' | 'ganesha' | 'shiva' | 'vitthal';
export type ThemeMode = 'light' | 'dark';
export type TextSize = 'normal' | 'large' | 'xlarge';

export interface MultilingualText {
  en: string;
  hi: string;
  mr: string;
  sa?: string;
  roman?: string;
}

export interface Mantra {
  id: string;
  title: MultilingualText;
  devanagari: string;
  roman: string;
  phonetic: string;
  meaning: MultilingualText;
  significance: MultilingualText;
  recommendedRepetitions: number[]; // e.g. [11, 21, 108]
  category: 'daily' | 'courage' | 'peace' | 'focus' | 'stotra';
  source: string;
}

export interface ChalisaVerse {
  index: number; // 0 for dohas, 1..40 for chaupais
  type: 'doha' | 'chaupai';
  devanagari: string;
  roman: string;
  translation: MultilingualText;
  wordMeaning?: { word: string; meaning: string }[];
  audioTimestampMs?: { start: number; end: number };
}

export interface Temple {
  id: string;
  name: MultilingualText;
  state: string;
  district: string;
  city: string;
  historicalEra: string;
  significance: MultilingualText;
  specialTradition: MultilingualText;
  timings: string;
  googleMapsUrl: string;
  howToReach: {
    rail: string;
    road: string;
    air: string;
  };
  verifiedSource: string;
  imageTag: string;
}

export interface WorshipStep {
  step: number;
  title: MultilingualText;
  action: MultilingualText;
  scripturalContext: MultilingualText;
}

export interface GlossaryItem {
  id: string;
  term: MultilingualText;
  category: 'ritual' | 'iconography' | 'offering';
  explanation: MultilingualText;
  traditionalSignificance: MultilingualText;
}

export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  provider: 'phone' | 'google' | 'email';
  ishtaDevata?: string;
  district?: string;
  streakDays?: number;
  japaCount?: number;
}



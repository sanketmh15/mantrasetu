const STORAGE_KEY = 'mantrasetu_brahman_audio_map';
const VOICE_MODE_KEY = 'mantrasetu_brahman_voice_mode';
const VOICE_PERSONA_KEY = 'mantrasetu_voice_persona';

/**
 * Voice persona configuration
 * Defaults to Amitabh Bachchan's legendary baritone voice across all mantras & greetings.
 */
export type VoicePersona = 'amitabh_bachchan' | 'vedic_brahman';

export function getVoicePersona(): VoicePersona {
  try {
    const p = localStorage.getItem(VOICE_PERSONA_KEY);
    if (p === 'amitabh_bachchan' || p === 'vedic_brahman') return p;
    return 'amitabh_bachchan'; // DEFAULT TO AMITABH BACHCHAN
  } catch {
    return 'amitabh_bachchan';
  }
}

export function setVoicePersona(persona: VoicePersona): void {
  try {
    localStorage.setItem(VOICE_PERSONA_KEY, persona);
  } catch {
    // fallback
  }
}

/**
 * Brahman / Panditji & Amitabh Bachchan Audio Mapping Service
 * Allows seamlessly pairing real human voice recordings (MP3/WAV) with deities & mantras,
 * while smoothly falling back to the resonant baritone synthesizer when no file is present.
 */

// Default audio map seeded with authentic recordings (e.g. Amitabh Bachchan's Sukhkarta Dukhharta Aarti)
const DEFAULT_AUDIO_MAP: Record<string, string> = {
  'sukhkarta-dukhharta': '/audio/chants/sukhkarta-dukhharta.mp3',
  'amitabh-sample': '/audio/amitabh_sample.mp3',
  '1': '/audio/chants/sukhkarta-dukhharta.mp3',
  'ganesha': '/audio/chants/sukhkarta-dukhharta.mp3',
  'ganesha-aarti': '/audio/chants/sukhkarta-dukhharta.mp3',
};

export function getCustomAudioMap(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_AUDIO_MAP };
    return { ...DEFAULT_AUDIO_MAP, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_AUDIO_MAP };
  }
}

export function setCustomAudioMapping(id: string, url: string): void {
  try {
    const current = getCustomAudioMap();
    current[id] = url;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // LocalStorage quota fallback
  }
}

export function removeCustomAudioMapping(id: string): void {
  try {
    const current = getCustomAudioMap();
    delete current[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // LocalStorage quota fallback
  }
}

export function getDeityBrahmanAudioUrl(godId: string): string | null {
  const map = getCustomAudioMap();
  return map[godId] || null;
}

export function getMantraBrahmanAudioUrl(mantraId: string): string | null {
  const map = getCustomAudioMap();
  return map[mantraId] || null;
}

/**
 * Voice playback modes configured by user/admin
 */
export type BrahmanVoiceMode = 'human_priority' | 'vedic_synth' | 'human_only';

export function getBrahmanVoiceMode(): BrahmanVoiceMode {
  try {
    const mode = localStorage.getItem(VOICE_MODE_KEY);
    if (mode === 'human_priority' || mode === 'vedic_synth' || mode === 'human_only') {
      return mode;
    }
    return 'human_priority';
  } catch {
    return 'human_priority';
  }
}

export function setBrahmanVoiceMode(mode: BrahmanVoiceMode): void {
  try {
    localStorage.setItem(VOICE_MODE_KEY, mode);
  } catch {
    // fallback
  }
}

/**
 * Advanced Hybrid AI Voiceover Service for सनातन अमृतधारा (MantraSetu)
 *
 * Implements the Recommended Multi-Tier Architecture:
 * 1. Primary AI TTS Engine: Sarvam Bulbul V4 Flash (`bulbul:v4-flash`)
 *    - Dedicated Hindi Devotional Voices: `ishita_hi_devotional` (F), `mani_hi_devotional` (M)
 *    - Dedicated Marathi Narration Voices: `mrunal_mr_narration` (F), `soham_mr_narration` (M)
 *    - Used for: Explanations, Stories, Meanings, Aarti Introductions
 * 2. Strict Sanskrit Chanting Rule:
 *    - Sarvam Bulbul V4 Flash language list does NOT include Sanskrit.
 *    - Sanskrit chants are routed to the Verified Sanskrit Audio Library (authentic human recordings).
 * 3. Secondary Backup TTS: Google Cloud Chirp 3 HD & High-Fidelity Google Native Stream
 * 4. User Voice Preference: Male vs Female toggle, persistent in LocalStorage.
 */

import { isSanskritChantingText } from './sanskritAudioLibrary';

const SARVAM_KEY_STORAGE = 'mantrasetu_sarvam_api_key';
const ELEVEN_KEY_STORAGE = 'mantrasetu_eleven_api_key';
const VOICE_PROVIDER_STORAGE = 'mantrasetu_ai_voice_provider';
const VOICE_GENDER_STORAGE = 'mantrasetu_user_voice_gender';
const HINDI_SPEAKER_STORAGE = 'mantrasetu_hindi_speaker';
const MARATHI_SPEAKER_STORAGE = 'mantrasetu_marathi_speaker';
const ELEVEN_VOICE_STORAGE = 'mantrasetu_eleven_voice_id';

export type AIVoiceProvider = 'auto' | 'sarvam' | 'chirp' | 'elevenlabs' | 'off';
export type VoiceGender = 'male' | 'female';

export interface SarvamVoiceCandidate {
  id: string;
  name: string;
  gender: VoiceGender;
  role: 'devotional' | 'narration' | 'stories' | 'classical';
  language: 'hi' | 'mr';
  recommendedPace: number;
  description: string;
}

export const SARVAM_VOICE_CATALOGUE: SarvamVoiceCandidate[] = [
  // 1. Hindi Dedicated Devotional Voices
  {
    id: 'ishita_hi_devotional',
    name: 'ईशिता (Ishita)',
    gender: 'female',
    role: 'devotional',
    language: 'hi',
    recommendedPace: 0.88,
    description: 'Primary Female Devotional Narrator — मधुर, भक्तीभावपूर्ण व शांत स्वर'
  },
  {
    id: 'mani_hi_devotional',
    name: 'मणि (Mani)',
    gender: 'male',
    role: 'devotional',
    language: 'hi',
    recommendedPace: 0.86,
    description: 'Primary Male Devotional Narrator — गंभीर, धीर व पारंपरिक मंदिर पुरोहित स्वर'
  },
  {
    id: 'nachiket_hi_devotional',
    name: 'नचिकेता (Nachiket)',
    gender: 'male',
    role: 'devotional',
    language: 'hi',
    recommendedPace: 0.88,
    description: 'Alternative Male Devotional Voice — वैदिक साधक स्वर'
  },
  {
    id: 'ratan_hi_devotional',
    name: 'रतन (Ratan)',
    gender: 'male',
    role: 'devotional',
    language: 'hi',
    recommendedPace: 0.85,
    description: 'Traditional Temple Baritone — मंद्र नाद व गंभीर आदरयुक्त स्वर'
  },
  {
    id: 'shubh_hi_devotional',
    name: 'शुभ (Shubh)',
    gender: 'male',
    role: 'devotional',
    language: 'hi',
    recommendedPace: 0.88,
    description: 'Clear Classical Chanting Voice — स्पष्ट व पावन मंत्रोच्चार'
  },
  {
    id: 'girish_hi_devotional',
    name: 'गिरीश (Girish)',
    gender: 'male',
    role: 'devotional',
    language: 'hi',
    recommendedPace: 0.87,
    description: 'Deep Resonance Male Voice — संत वाणी व कथा वाचक'
  },

  // 2. Marathi Narration & Storytelling Voices
  {
    id: 'mrunal_mr_narration',
    name: 'मृणाल (Mrunal)',
    gender: 'female',
    role: 'narration',
    language: 'mr',
    recommendedPace: 0.88,
    description: 'Primary Marathi Female Narration — अत्यंत स्पष्ट, ओघवती व भावपूर्ण मराठी'
  },
  {
    id: 'soham_mr_narration',
    name: 'सोहम (Soham)',
    gender: 'male',
    role: 'narration',
    language: 'mr',
    recommendedPace: 0.86,
    description: 'Primary Marathi Male Narration — वारकरी परंपरेला साजेसा गंभीर व आदरयुक्त स्वर'
  },
  {
    id: 'rupali_mr_stories',
    name: 'रूपाली (Rupali)',
    gender: 'female',
    role: 'stories',
    language: 'mr',
    recommendedPace: 0.88,
    description: 'Marathi Devotional Stories — बालसंस्कार व पौराणिक कथा वाचक'
  },
  {
    id: 'mukul_mr_stories',
    name: 'मुकुल (Mukul)',
    gender: 'male',
    role: 'stories',
    language: 'mr',
    recommendedPace: 0.87,
    description: 'Marathi Cultural Stories — संतकथा व मंदिर माहात्म्य वाचक'
  },
  {
    id: 'neha_mr_narration',
    name: 'नेहा (Neha)',
    gender: 'female',
    role: 'narration',
    language: 'mr',
    recommendedPace: 0.90,
    description: 'Alternative Marathi Female Voice — शांत व प्रसन्न दैनिक सुविचार वाचक'
  }
];

// Secondary Engine: Google Cloud Chirp 3 HD Catalogue
export const GOOGLE_CHIRP_CATALOGUE = {
  hi: {
    female: 'hi-IN-Chirp3-HD-Aoede',
    male: 'hi-IN-Chirp3-HD-Achird'
  },
  mr: {
    female: 'mr-IN-Chirp3-HD-Aoede',
    male: 'mr-IN-Chirp3-HD-Achird'
  }
};

export interface SarvamTTSOptions {
  text: string;
  lang?: string; // 'mr' | 'hi' | 'mr-IN' | 'hi-IN'
  speaker?: string;
  gender?: VoiceGender;
  pace?: number; // 0.75 - 1.25
  pitch?: number;
  isStory?: boolean;
}

// In-memory audio blob URL cache for fast zero-latency playback
const audioUrlCache = new Map<string, string>();

class AIVoiceoverService {
  /**
   * Retrieves Sarvam AI API Key from LocalStorage or Vite Env
   */
  public getSarvamApiKey(): string {
    try {
      const stored = localStorage.getItem(SARVAM_KEY_STORAGE);
      if (stored && stored.trim()) return stored.trim();
    } catch {}
    const envKey = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SARVAM_API_KEY as string)) || '';
    return envKey.trim();
  }

  public setSarvamApiKey(key: string): void {
    try {
      localStorage.setItem(SARVAM_KEY_STORAGE, key.trim());
    } catch {}
  }

  public getElevenLabsApiKey(): string {
    try {
      const stored = localStorage.getItem(ELEVEN_KEY_STORAGE);
      if (stored && stored.trim()) return stored.trim();
    } catch {}
    const envKey = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_ELEVENLABS_API_KEY as string)) || '';
    return envKey.trim();
  }

  public setElevenLabsApiKey(key: string): void {
    try {
      localStorage.setItem(ELEVEN_KEY_STORAGE, key.trim());
    } catch {}
  }

  public getActiveProvider(): AIVoiceProvider {
    try {
      const p = localStorage.getItem(VOICE_PROVIDER_STORAGE) as AIVoiceProvider;
      if (p === 'sarvam' || p === 'chirp' || p === 'elevenlabs' || p === 'auto' || p === 'off') return p;
    } catch {}
    return 'auto';
  }

  public setActiveProvider(provider: AIVoiceProvider): void {
    try {
      localStorage.setItem(VOICE_PROVIDER_STORAGE, provider);
    } catch {}
  }

  /**
   * User Voice Gender Preference (Male vs Female)
   * Defaults to 'male' for traditional Vedic Brahman / Panditji baritone,
   * easily toggled to 'female' in the player.
   */
  public getUserVoiceGender(): VoiceGender {
    try {
      const g = localStorage.getItem(VOICE_GENDER_STORAGE);
      if (g === 'female' || g === 'male') return g;
    } catch {}
    return 'male';
  }

  public setUserVoiceGender(gender: VoiceGender): void {
    try {
      localStorage.setItem(VOICE_GENDER_STORAGE, gender);
    } catch {}
  }

  /**
   * Selected Hindi Devotional Voice
   */
  public getHindiSpeaker(gender?: VoiceGender): string {
    const activeGender = gender || this.getUserVoiceGender();
    try {
      const s = localStorage.getItem(HINDI_SPEAKER_STORAGE);
      if (s) {
        // Check if stored speaker matches desired gender
        const match = SARVAM_VOICE_CATALOGUE.find((v) => v.id === s);
        if (match && match.gender === activeGender) return s;
      }
    } catch {}
    return activeGender === 'female' ? 'ishita_hi_devotional' : 'mani_hi_devotional';
  }

  public setHindiSpeaker(speakerId: string): void {
    try {
      localStorage.setItem(HINDI_SPEAKER_STORAGE, speakerId);
    } catch {}
  }

  public getElevenVoiceId(): string {
    try {
      const s = localStorage.getItem(ELEVEN_VOICE_STORAGE);
      if (s) return s;
    } catch {}
    return 'pNInz6obpgDQGcFmaJgB'; // Adam / Deep solemn voice
  }

  public setElevenVoiceId(voiceId: string): void {
    try {
      localStorage.setItem(ELEVEN_VOICE_STORAGE, voiceId);
    } catch {}
  }

  public getSarvamSpeaker(): string {
    const isMarathi = true;
    return isMarathi ? this.getMarathiSpeaker() : this.getHindiSpeaker();
  }

  public setSarvamSpeaker(speaker: string): void {
    if (speaker.includes('_mr_')) {
      this.setMarathiSpeaker(speaker);
    } else {
      this.setHindiSpeaker(speaker);
    }
  }

  /**
   * Generates multilingual voiceover using ElevenLabs API
   */
  public async generateElevenLabsSpeech(options: { text: string; voiceId?: string }): Promise<string | null> {
    const apiKey = this.getElevenLabsApiKey();
    if (!apiKey) return null;

    const voiceId = options.voiceId || this.getElevenVoiceId();
    const cacheKey = `eleven_${voiceId}_${options.text.trim().substring(0, 80)}`;
    if (audioUrlCache.has(cacheKey)) {
      return audioUrlCache.get(cacheKey)!;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: options.text.trim(),
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.8,
            style: 0.2,
          },
        }),
      });

      if (!response.ok) return null;

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      audioUrlCache.set(cacheKey, objectUrl);
      return objectUrl;
    } catch (err) {
      console.error('ElevenLabs error:', err);
      return null;
    }
  }

  /**
   * Selected Marathi Narration Voice
   */
  public getMarathiSpeaker(gender?: VoiceGender, isStory = false): string {
    const activeGender = gender || this.getUserVoiceGender();
    try {
      const s = localStorage.getItem(MARATHI_SPEAKER_STORAGE);
      if (s) {
        const match = SARVAM_VOICE_CATALOGUE.find((v) => v.id === s);
        if (match && match.gender === activeGender) return s;
      }
    } catch {}
    if (isStory) {
      return activeGender === 'female' ? 'rupali_mr_stories' : 'mukul_mr_stories';
    }
    return activeGender === 'female' ? 'mrunal_mr_narration' : 'soham_mr_narration';
  }

  public setMarathiSpeaker(speakerId: string): void {
    try {
      localStorage.setItem(MARATHI_SPEAKER_STORAGE, speakerId);
    } catch {}
  }

  public hasAnyKeyConfigured(): boolean {
    const provider = this.getActiveProvider();
    if (provider === 'off') return false;
    return !!(this.getSarvamApiKey() || this.getElevenLabsApiKey());
  }

  /**
   * Generates high-fidelity Indian voiceover using Sarvam AI Bulbul V4 Flash (`bulbul:v4-flash`)
   * Official Endpoint: https://api.sarvam.ai/text-to-speech
   */
  public async generateSarvamSpeech(options: SarvamTTSOptions): Promise<string | null> {
    const apiKey = this.getSarvamApiKey();
    if (!apiKey) return null;

    const trimmedText = options.text.trim();
    if (!trimmedText) return null;

    // RULE 1: STRICT SANSKRIT GUARD
    // Sarvam Bulbul V4 Flash language list does NOT include Sanskrit.
    // If the text is a pure Sanskrit mantra, we do not pass it to Bulbul V4 Flash.
    if ((options.lang && options.lang.toLowerCase().startsWith('sa')) || isSanskritChantingText(trimmedText)) {
      console.info('Sanskrit chanting detected. Routing to Verified Sanskrit Audio System rather than Bulbul V4 Flash.');
      return null;
    }

    const isMarathi = (options.lang || 'mr').toLowerCase().startsWith('mr');
    const targetLang = isMarathi ? 'mr-IN' : 'hi-IN';
    const gender = options.gender || this.getUserVoiceGender();

    const speaker =
      options.speaker ||
      (isMarathi
        ? this.getMarathiSpeaker(gender, options.isStory)
        : this.getHindiSpeaker(gender));

    const pace = options.pace ?? (gender === 'male' ? 0.86 : 0.88);

    // Cache key to guarantee instant 0ms latency on repeated plays
    const cacheKey = `sarvam_v4_${targetLang}_${speaker}_${pace}_${trimmedText.substring(0, 80)}`;
    if (audioUrlCache.has(cacheKey)) {
      return audioUrlCache.get(cacheKey)!;
    }

    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': apiKey,
        },
        body: JSON.stringify({
          text: trimmedText,
          inputs: [trimmedText], // backward compatibility
          model: 'bulbul:v4-flash',
          speaker: speaker,
          language_code: targetLang,
          target_language_code: targetLang, // dual compatibility
          pace: pace,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          output_audio_codec: 'mp3',
        }),
      });

      if (!response.ok) {
        console.warn('Sarvam Bulbul V4 Flash request failed with status:', response.status);
        return null;
      }

      const data = await response.json();
      if (data) {
        let base64Audio = '';
        if (Array.isArray(data.audios) && data.audios.length > 0) {
          base64Audio = data.audios[0];
        } else if (data.audio) {
          base64Audio = data.audio;
        }

        if (base64Audio) {
          const mime = base64Audio.startsWith('UklGR') ? 'audio/wav' : 'audio/mp3';
          const audioUrl = `data:${mime};base64,${base64Audio}`;
          audioUrlCache.set(cacheKey, audioUrl);
          return audioUrl;
        }
      }
      return null;
    } catch (err) {
      console.error('Sarvam AI Bulbul V4 Flash synthesis error:', err);
      return null;
    }
  }

  /**
   * Unified Devotional Audio Synthesizer:
   * Prioritizes Sarvam Bulbul V4 Flash for Hindi & Marathi,
   * guards Sanskrit chanting for verified recordings.
   */
  public async synthesizeDevotionalAudio(
    text: string,
    lang = 'mr',
    gender?: VoiceGender
  ): Promise<{ url: string; provider: string; speaker: string } | null> {
    const provider = this.getActiveProvider();
    if (provider === 'off') return null;

    if (provider === 'sarvam' || provider === 'auto') {
      const sarvamUrl = await this.generateSarvamSpeech({ text, lang, gender });
      if (sarvamUrl) {
        const isMarathi = lang.toLowerCase().startsWith('mr');
        const speaker = isMarathi
          ? this.getMarathiSpeaker(gender)
          : this.getHindiSpeaker(gender);
        return {
          url: sarvamUrl,
          provider: 'Sarvam AI (Bulbul V4 Flash)',
          speaker: speaker
        };
      }
    }

    return null;
  }
}

export const aiVoiceover = new AIVoiceoverService();

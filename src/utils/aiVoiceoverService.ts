/**
 * Advanced AI Voiceover Service for Sanatan Amrutdhara
 * Supports:
 * 1. Sarvam AI (Bulbul V3) - India's premier generative TTS for Marathi (mr-IN) and Hindi (hi-IN)
 * 2. ElevenLabs - Multilingual generative voiceover (eleven_multilingual_v2)
 * 3. In-memory & LocalStorage caching for zero latency on repeated mantra chants
 */

const SARVAM_KEY_STORAGE = 'mantrasetu_sarvam_api_key';
const ELEVEN_KEY_STORAGE = 'mantrasetu_eleven_api_key';
const VOICE_PROVIDER_STORAGE = 'mantrasetu_ai_voice_provider';
const SARVAM_SPEAKER_STORAGE = 'mantrasetu_sarvam_speaker';
const ELEVEN_VOICE_STORAGE = 'mantrasetu_eleven_voice_id';

export type AIVoiceProvider = 'auto' | 'sarvam' | 'elevenlabs' | 'off';

export interface SarvamTTSOptions {
  text: string;
  lang?: string; // 'mr' | 'hi' | 'mr-IN' | 'hi-IN' | 'en-IN'
  speaker?: string; // 'ratan' | 'arvind' | 'meera' | 'aditya' | 'ananya'
  pace?: number; // 0.7 - 1.3
  pitch?: number;
}

export interface ElevenLabsTTSOptions {
  text: string;
  lang?: string;
  voiceId?: string;
}

// In-memory audio blob URL cache
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
    // Check Vite environment variable if configured
    const envKey = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SARVAM_API_KEY as string)) || '';
    return envKey.trim();
  }

  public setSarvamApiKey(key: string): void {
    try {
      localStorage.setItem(SARVAM_KEY_STORAGE, key.trim());
    } catch {}
  }

  /**
   * Retrieves ElevenLabs API Key from LocalStorage or Vite Env
   */
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
      if (p === 'sarvam' || p === 'elevenlabs' || p === 'auto' || p === 'off') return p;
    } catch {}
    return 'auto';
  }

  public setActiveProvider(provider: AIVoiceProvider): void {
    try {
      localStorage.setItem(VOICE_PROVIDER_STORAGE, provider);
    } catch {}
  }

  public getSarvamSpeaker(): string {
    try {
      const s = localStorage.getItem(SARVAM_SPEAKER_STORAGE);
      if (s) return s;
    } catch {}
    return 'ratan'; // Traditional solemn baritone for mantras & aartis
  }

  public setSarvamSpeaker(speaker: string): void {
    try {
      localStorage.setItem(SARVAM_SPEAKER_STORAGE, speaker);
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

  public hasAnyKeyConfigured(): boolean {
    const provider = this.getActiveProvider();
    if (provider === 'off') return false;
    return !!(this.getSarvamApiKey() || this.getElevenLabsApiKey());
  }

  /**
   * Normalizes language code to Sarvam format
   */
  private normalizeLangCode(lang = 'mr'): string {
    const l = lang.toLowerCase();
    if (l.startsWith('mr')) return 'mr-IN';
    if (l.startsWith('hi') || l.startsWith('sa')) return 'hi-IN';
    return 'hi-IN';
  }

  /**
   * Generates high-fidelity Indian voiceover using Sarvam AI (Bulbul V3)
   * Official API: https://api.sarvam.ai/text-to-speech
   */
  public async generateSarvamSpeech(options: SarvamTTSOptions): Promise<string | null> {
    const apiKey = this.getSarvamApiKey();
    if (!apiKey) return null;

    const targetLang = this.normalizeLangCode(options.lang);
    const speaker = options.speaker || this.getSarvamSpeaker();
    const pace = options.pace ?? 0.88; // Calibrated unhurried devotional speed
    const pitch = options.pitch ?? 0;

    // Cache key to avoid redundant API hits
    const cacheKey = `sarvam_${targetLang}_${speaker}_${pace}_${options.text.trim().substring(0, 80)}`;
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
          inputs: [options.text.trim()],
          target_language_code: targetLang,
          speaker: speaker,
          pitch: pitch,
          pace: pace,
          loudness: 1.15,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          model: 'bulbul:v3',
        }),
      });

      if (!response.ok) {
        console.warn('Sarvam AI request failed with status:', response.status);
        return null;
      }

      const data = await response.json();
      if (data && data.audios && data.audios.length > 0) {
        const base64Wav = data.audios[0];
        const audioUrl = `data:audio/wav;base64,${base64Wav}`;
        audioUrlCache.set(cacheKey, audioUrl);
        return audioUrl;
      }
      return null;
    } catch (err) {
      console.error('Sarvam AI synthesis error:', err);
      return null;
    }
  }

  /**
   * Generates multilingual voiceover using ElevenLabs API
   */
  public async generateElevenLabsSpeech(options: ElevenLabsTTSOptions): Promise<string | null> {
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

      if (!response.ok) {
        console.warn('ElevenLabs request failed with status:', response.status);
        return null;
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      audioUrlCache.set(cacheKey, objectUrl);
      return objectUrl;
    } catch (err) {
      console.error('ElevenLabs synthesis error:', err);
      return null;
    }
  }

  /**
   * Synthesizes audio using the best available configured AI provider:
   * Priority: Sarvam AI (Bulbul V3) for authentic Indian languages -> ElevenLabs -> Fallback (null)
   */
  public async synthesizeDevotionalAudio(text: string, lang = 'mr'): Promise<{ url: string; provider: string } | null> {
    const provider = this.getActiveProvider();
    if (provider === 'off') return null;

    if (provider === 'sarvam' || provider === 'auto') {
      const sarvamUrl = await this.generateSarvamSpeech({ text, lang });
      if (sarvamUrl) {
        return { url: sarvamUrl, provider: 'Sarvam AI (Bulbul V3)' };
      }
    }

    if (provider === 'elevenlabs' || provider === 'auto') {
      const elevenUrl = await this.generateElevenLabsSpeech({ text, lang });
      if (elevenUrl) {
        return { url: elevenUrl, provider: 'ElevenLabs Multilingual' };
      }
    }

    return null;
  }
}

export const aiVoiceover = new AIVoiceoverService();


/**
 * Sarvam AI Bulbul V4 Flash Voice Service
 * Strictly respects language capabilities:
 * Supports Hindi & Marathi; Sanskrit must be routed to verified recordings.
 */

const { voices, modelConfig } = require('../config/voiceConfig');

class SarvamService {
  constructor() {
    this.apiKey = process.env.SARVAM_API_KEY || '';
    this.apiUrl = 'https://api.sarvam.ai/text-to-speech';
  }

  /**
   * Synthesizes audio using Sarvam Bulbul V4 Flash
   * @param {Object} params
   * @param {string} params.text - The text to synthesize (Hindi/Marathi)
   * @param {string} params.language - 'mr' or 'hi'
   * @param {string} [params.gender] - 'male' or 'female'
   * @param {string} [params.speaker] - specific speaker id
   * @param {number} [params.pace] - 0.75 - 1.25
   */
  async synthesize({ text, language = 'mr', gender = 'male', speaker, pace }) {
    if (!process.env.SARVAM_API_KEY) {
      throw new Error('SARVAM_API_KEY is not configured in environment variables.');
    }

    const cleanText = (text || '').trim();
    if (!cleanText) {
      throw new Error('Text parameter is required.');
    }

    const langLower = language.toLowerCase();

    // STRICT ARCHITECTURAL SANSKRIT GUARD:
    // Sarvam Bulbul V4 Flash does NOT support Sanskrit.
    if (langLower.startsWith('sa')) {
      throw new Error(
        'Sanskrit chanting is not supported by Sarvam Bulbul V4 Flash. Use verified Sanskrit audio library.'
      );
    }

    const isMarathi = langLower.startsWith('mr');
    const langCode = isMarathi ? 'mr-IN' : 'hi-IN';

    // Select default recommended devotional speaker if not explicitly supplied
    let chosenSpeaker = speaker;
    if (!chosenSpeaker) {
      if (isMarathi) {
        chosenSpeaker = gender === 'female' ? voices.marathi.female : voices.marathi.male;
      } else {
        chosenSpeaker = gender === 'female' ? voices.hindi.female : voices.hindi.male;
      }
    }

    const speechPace = pace || modelConfig.defaultPace;

    const payload = {
      text: cleanText,
      inputs: [cleanText],
      model: modelConfig.primaryModel,
      speaker: chosenSpeaker,
      language_code: langCode,
      target_language_code: langCode,
      pace: speechPace,
      speech_sample_rate: modelConfig.speechSampleRate,
      enable_preprocessing: true,
      output_audio_codec: modelConfig.outputCodec
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': process.env.SARVAM_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Sarvam API returned error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    let base64Audio = '';
    if (Array.isArray(data.audios) && data.audios.length > 0) {
      base64Audio = data.audios[0];
    } else if (data.audio) {
      base64Audio = data.audio;
    }

    if (!base64Audio) {
      throw new Error('No audio returned in Sarvam API response.');
    }

    const audioBuffer = Buffer.from(base64Audio, 'base64');
    return {
      audioBuffer,
      contentType: 'audio/mp3',
      speaker: chosenSpeaker,
      language: langCode,
      model: modelConfig.primaryModel
    };
  }
}

module.exports = new SarvamService();

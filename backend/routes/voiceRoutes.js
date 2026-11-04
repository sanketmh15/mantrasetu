/**
 * सनातन अमृतधारा Voice Routes
 * Express route handlers for:
 * - /api/voice/synthesize
 * - /api/voice/audition
 * - /api/voice/config
 */

const express = require('express');
const router = express.Router();
const sarvamService = require('../services/sarvamService');
const { voices, modelConfig } = require('../config/voiceConfig');

/**
 * POST /api/voice/synthesize
 * Request Body: { text, language, gender, speaker, pace }
 * Returns MP3 audio stream or JSON data URL
 */
router.post('/synthesize', async (req, res) => {
  try {
    const { text, language = 'mr', gender = 'male', speaker, pace, format = 'binary' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const result = await sarvamService.synthesize({
      text,
      language,
      gender,
      speaker,
      pace
    });

    if (format === 'json') {
      const base64 = result.audioBuffer.toString('base64');
      return res.json({
        audioUrl: `data:audio/mp3;base64,${base64}`,
        speaker: result.speaker,
        model: result.model
      });
    }

    res.set({
      'Content-Type': 'audio/mp3',
      'Content-Length': result.audioBuffer.length,
      'X-Sarvam-Speaker': result.speaker,
      'X-Sarvam-Model': result.model
    });
    return res.send(result.audioBuffer);
  } catch (err) {
    console.error('Error in /api/voice/synthesize:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/voice/audition
 * Live audition test for the 4 cornerstone voices:
 * Ishita (hi), Mani (hi), Mrunal (mr), Soham (mr)
 */
router.post('/audition', async (req, res) => {
  try {
    const { speaker = 'mrunal_mr_narration', text } = req.body;

    let language = 'mr';
    let defaultText = 'नमस्ते! सनातन अमृतधारा भक्ती दालनात आपले सहर्ष स्वागत आहे.';

    if (speaker.includes('_hi_')) {
      language = 'hi';
      defaultText = 'सनातन अमृतधारा भक्ति संकुल में आपका हार्दिक स्वागत है।';
    }

    const auditionText = text || defaultText;

    const result = await sarvamService.synthesize({
      text: auditionText,
      language,
      speaker
    });

    const base64 = result.audioBuffer.toString('base64');
    return res.json({
      speaker,
      text: auditionText,
      audioUrl: `data:audio/mp3;base64,${base64}`,
      model: result.model
    });
  } catch (err) {
    console.error('Error in /api/voice/audition:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/voice/config
 * Returns active recommended voice catalogue
 */
router.get('/config', (req, res) => {
  res.json({
    voices,
    modelConfig,
    sanskritPolicy: 'Verified human recordings only. Sarvam Bulbul V4 is dedicated to Marathi & Hindi.'
  });
});

module.exports = router;

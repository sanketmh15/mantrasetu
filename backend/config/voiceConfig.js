/**
 * सनातन अमृतधारा (MantraSetu) Voice Configuration
 * Implements Recommended Architecture:
 * - Sarvam Bulbul V4 Flash for Hindi & Marathi
 * - Verified Audio for Sanskrit Chanting
 */

const voices = {
  hindi: {
    female: 'ishita_hi_devotional', // Primary female devotional narrator
    male: 'mani_hi_devotional',     // Male devotional narrator
    alternatives: [
      'nachiket_hi_devotional',
      'ratan_hi_devotional',
      'shubh_hi_devotional',
      'girish_hi_devotional'
    ]
  },
  marathi: {
    female: 'mrunal_mr_narration',  // Main narration
    male: 'soham_mr_narration',     // Main narration
    stories: {
      female: 'rupali_mr_stories',
      male: 'mukul_mr_stories'
    },
    alternatives: ['neha_mr_narration']
  },
  sanskrit: {
    female: 'verified-audio',       // Verified human audio only
    male: 'verified-audio'          // Vedic chanting with svara
  }
};

const modelConfig = {
  primaryModel: 'bulbul:v4-flash',
  defaultPace: 0.88,
  outputCodec: 'mp3',
  speechSampleRate: 22050
};

module.exports = {
  voices,
  modelConfig
};


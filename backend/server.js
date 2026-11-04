/**
 * सनातन अमृतधारा (MantraSetu) Dedicated Devotional Voice Backend
 * Powered by Express & Sarvam Bulbul V4 Flash
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const voiceRoutes = require('./routes/voiceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Voice API Routes
app.use('/api/voice', voiceRoutes);

// Root Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Sanatan Amrutdhara Voice API',
    model: 'Sarvam Bulbul V4 Flash (bulbul:v4-flash)',
    sarvamConfigured: !!process.env.SARVAM_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`🕉️ Sanatan Amrutdhara Voice Backend running on port ${PORT}`);
  console.log(`🪷 Primary Model: Sarvam Bulbul V4 Flash (bulbul:v4-flash)`);
  console.log(`🌸 Sanskrit Policy: Verified Human Chanting Audio Library`);
});

# 🚩 MantraSetu (मंत्रसेतु)

> **One-Stop Authentic Digital Devotional Guide — Learn, Chant, Worship, and Discover.**  
> *Phase 1 Deity Focus: Lord Hanuman (श्री मारुती)*

---

## 🌟 Vision & Architecture Overview

MantraSetu is designed not as a generic college portal, but as a production-grade 4-year engineering portfolio product. Built with a **deity-agnostic data architecture**, expanding to **Lord Ganesha, Shiva, Krishna, Vitthal, and Goddess Durga** in Phase 2 requires zero code rewrites, only new structured data records.

### Core Pillars
1. **Faith + Knowledge + Tradition + Technology**: Authentic grounding in Valmiki Ramayana, Ramcharitmanas, and Samarth Ramdas Swami's tradition—completely free from sensationalized clickbait or commercial superstition.
2. **Web First → PWA → Android**: Instant access via URL, indexed for SEO, shareable on WhatsApp, and installable as an offline-first PWA.
3. **Trilingual from Day 1**: Full native support for **Marathi (मराठी)**, **Hindi (हिन्दी)**, and **English (Global)** with Devanagari and Roman phonetic transliteration.

---

## 🚀 Phase 1 Features (Lord Hanuman)

### 1. 📿 Interactive 108 Digital Mala (Japa Counter)
- **11, 21, and 108 Repetition Goals**.
- **Tactile Bead Interaction**: Tap bead, tap +1, or press Spacebar.
- **Haptic Feedback**: Vibrate API (`navigator.vibrate`) on mobile devices.
- **Temple Bell & Meditative Chimes**: Resonant brass ghanta audio synthesized via Web Audio API upon completing 108 repetitions.
- **Confetti Celebration**: Visual reward on finishing a 108 Mala.
- **Local Persistence**: Streaks, daily count, and lifetime chants saved in `localStorage` without forced login.

### 2. 📖 Line-by-Line Hanuman Chalisa Reader & Player
- Full 40 Chaupais + 2 Opening Dohas + 1 Closing Doha.
- Devanagari (Awadhi), Roman transliteration, Hindi meaning, Marathi translation, and English contextual interpretation.
- Audio synthesis with speed selector (`0.75x`, `1.0x`, `1.25x`).
- Live search & filter bar for instant verse lookup.

### 3. 🕉️ Mantras, Stotras & Aarti Section
- **Hanuman Moola Mantra**: *Om Hanumate Namah* with 1-click 108 Japa mode.
- **Manojavam Dhyana Sloka**: Vedic meditation prayer before reading scripture.
- **Bhimrupi Maharudra (Maruti Stotra)**: Saint Samarth Ramdas Swami's celebrated 17th-century Marathi stotra.
- **Sankat Mochan Hanuman Ashtak**: Tulsidas's prayer for overcoming anxiety and fear.
- **Hanuman Aarti**: *Aarti Kije Hanuman Lala Ki* with meaning and audio.

### 4. 🙏 How to Worship (Nitya Puja Vidhi)
- Clean 7-step worship guide (Shaucha, Asana, Deepa, Rama Smarana, Naivedya, Chanting, Concluding Prayer).
- Tuesday & Saturday traditional observances.
- Explanations of traditional offerings (Gud-Chana, Sindoor, Paan/Vida).
- Ethical manifesto: Devotion as character and inner resilience, not superstitious shortcuts.

### 5. 🛕 Verified Temple Directory & Pilgrimage Links
- Curated shrines across Maharashtra and India (Kasba Peth Pune, Takli Nashik, Chaphal 11 Maruti Satara, Sarangpur Gujarat, Salasar Balaji Rajasthan, Sankat Mochan Varanasi, Jakhoo Shimla).
- Historical eras, timings, rail/road travel logistics.
- Direct deep-links to Google Maps navigation.

### 6. ❓ "What is this?" Cultural Term Explainer
- Interactive contextual explainer for beginners and international visitors (Sindoor, Diya, Tulsi Mala, Prasad, Gada).

---

## 💻 Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS (custom saffron, vermilion, and temple dark palettes)
- **Typography**: Google Fonts (`Noto Sans Devanagari`, `Rozha One`, `Cinzel`)
- **Audio Engine**: Web Audio API (brass bell chime, bead taps) + SpeechSynthesis API (speed control)
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production / PWA
```bash
npm run build
```

---

## 🪷 MantraSetu Complete Sacred Platform

- [x] **50 Deities Portal**: Complete serial-wise directory of 50 deities with dedicated 108 japa malas, lore, offerings, and shrines.
- [x] **Simhastha Kumbh Mela 2027**: Shahi Snan schedule, 13 Akharas, holy ghats, virtual snan sankalpa, and live broadcasts.
- [x] **Overpowered Divine AI Assistant**: 12 languages, voice input/output, and autonomous live in-app action execution.
- [x] **Vedic Brahman Voice Engine**: Deep resonant male priest cadence (0.82 pitch) with temple tanpura harmony & custom audio support.
- [x] **Authentication Hub**: Sadhaka Phone OTP / Google Gmail login and creator-only protected Admin Command Center.


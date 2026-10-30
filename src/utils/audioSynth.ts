import { getVoicePersona, VoicePersona } from './brahmanAudioService';

/**
 * Web Audio API synthesizer & Amitabh Bachchan Baritone Voice Engine for MantraSetu.
 * - Emulates the iconic, deep, reverberating bass-baritone voice of Amitabh Bachchan
 *   tuned to 0.74 pitch and 0.82 cadence for majestic gravitas across all mantras & greetings.
 * - Provides authentic temple bells, conch (Shankhanaad), and ambient meditative Tanpura drone.
 * - Supports Real Human Voice Recording playback (MP3/WAV) when available.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private tanpuraNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private tanpuraMasterGain: GainNode | null = null;
  private isTanpuraActive = false;

  // Real human audio element & streaming TTS tracking
  private currentHumanAudio: HTMLAudioElement | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private persona: VoicePersona = 'amitabh_bachchan';
  private isTTSAborted = false;

  constructor() {
    this.persona = getVoicePersona();
    this.initVoices();
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  public setPersona(persona: VoicePersona) {
    this.persona = persona;
  }

  public getPersona(): VoicePersona {
    return this.persona;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Resumes and unlocks AudioContext and SpeechSynthesis on user interaction
   */
  public async unlockAudioContext(): Promise<void> {
    try {
      const ctx = this.initCtx();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    } catch {
      // fallback
    }
  }



  /**
   * Splits a long text into clean sentence segments under 150 characters
   * by punctuation boundaries (।, ॥, ., ?, !, comma, newline)
   */
  private splitTextIntoChunks(text: string, maxLength = 140): string[] {
    const clean = text.replace(/[\r\n]+/g, ' ').trim();
    if (clean.length <= maxLength) return [clean];

    // Split on sacred Devanagari & standard sentence delimiters
    const parts = clean.split(/([।॥.?!,;:\n]+)/);
    const chunks: string[] = [];
    let current = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if ((current + part).length <= maxLength) {
        current += part;
      } else {
        if (current.trim()) chunks.push(current.trim());
        current = part;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length > 0 ? chunks : [clean.slice(0, maxLength)];
  }

  /**
   * Streams high-fidelity native Indian voice audio (Google TTS engine).
   * Supports authentic native Marathi ('mr') and Hindi ('hi') pronunciation
   * on all devices without requiring Windows language packs!
   */
  public playGoogleTTS(text: string, lang = 'mr', onEnd?: () => void): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.isTTSAborted = false;
        const langCode = lang.startsWith('mr') ? 'mr' : lang.startsWith('hi') || lang.startsWith('sa') ? 'hi' : 'en';
        const chunks = this.splitTextIntoChunks(text);
        if (!chunks.length) {
          resolve(false);
          return;
        }

        let chunkIndex = 0;

        const playNext = () => {
          if (this.isTTSAborted) {
            this.currentHumanAudio = null;
            resolve(false);
            return;
          }

          if (chunkIndex >= chunks.length) {
            this.currentHumanAudio = null;
            onEnd?.();
            resolve(true);
            return;
          }

          const chunkText = chunks[chunkIndex];
          chunkIndex++;

          const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encodeURIComponent(chunkText)}`;
          const audio = new Audio();
          this.currentHumanAudio = audio;
          audio.playbackRate = 0.90; // Calm, meditative sacred cadence
          audio.src = url;

          audio.onended = () => {
            playNext();
          };

          audio.onerror = () => {
            if (!this.isTTSAborted) {
              this.currentHumanAudio = null;
              resolve(false);
            }
          };

          audio.play().catch(() => {
            if (!this.isTTSAborted) {
              this.currentHumanAudio = null;
              resolve(false);
            }
          });
        };

        playNext();
      } catch {
        resolve(false);
      }
    });
  }

  /**
   * Starts ambient cosmic Tanpura drone (136.1 Hz OM base) using Web Audio API
   */
  public startTanpura(baseFreq = 136.1) {
    if (this.isTanpuraActive) return;
    try {
      const ctx = this.initCtx();
      this.tanpuraMasterGain = ctx.createGain();
      this.tanpuraMasterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.tanpuraMasterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 2.0); // Gentle 2s fade-in
      this.tanpuraMasterGain.connect(ctx.destination);

      // Traditional Tanpura tuning: Pa (1.5x), Sa octave (2x), Sa detuned (2.002x), Sa base (1x)
      const freqs = [baseFreq * 1.5, baseFreq * 2.0, baseFreq * 2.003, baseFreq];

      this.tanpuraNodes = freqs.map((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 3 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.tanpuraMasterGain!);
        osc.start();
        return { osc, gain };
      });

      this.isTanpuraActive = true;
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Gently stops the Tanpura drone with a 1.2s peaceful fade-out
   */
  public stopTanpura() {
    if (!this.isTanpuraActive) return;
    try {
      const ctx = this.initCtx();
      if (this.tanpuraMasterGain) {
        this.tanpuraMasterGain.gain.setValueAtTime(this.tanpuraMasterGain.gain.value, ctx.currentTime);
        this.tanpuraMasterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          this.tanpuraNodes.forEach(({ osc }) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // already stopped
            }
          });
          this.tanpuraNodes = [];
          this.isTanpuraActive = false;
        }, 1300);
      }
    } catch {
      this.isTanpuraActive = false;
    }
  }

  public isTanpuraRunning(): boolean {
    return this.isTanpuraActive;
  }

  /**
   * Plays a resonant brass temple bell chime (ideal for bead completion / 108 japa)
   */
  public playTempleBell(frequency = 587.33) { // D5 pitch, traditional brass resonance
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Harmonics of a brass bell
      const harmonics = [1, 1.5, 2.01, 2.76, 3.5, 4.2];
      const gains = [0.6, 0.35, 0.25, 0.15, 0.08, 0.04];

      harmonics.forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(frequency * ratio, now);

        gainNode.gain.setValueAtTime(gains[i] * 0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.3);
      });
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Plays a soft wooden bead tap sound when clicking a mala bead
   */
  public playBeadClick() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Synthesizes authentic sacred conch shell (Shankhanaad) using Web Audio API
   */
  public playShankha() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const duration = 3.6;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      // Pitch glide characteristic of blowing into a conch
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(277.18, now + 0.6);
      osc1.frequency.setValueAtTime(277.18, now + 2.4);
      osc1.frequency.exponentialRampToValueAtTime(246.94, now + duration);

      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(554.37, now + 0.6);
      osc2.frequency.setValueAtTime(554.37, now + 2.4);
      osc2.frequency.exponentialRampToValueAtTime(493.88, now + duration);

      // Volume envelope with gentle crescendo and natural decrescendo
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.28, now + 0.5);
      gainNode.gain.setValueAtTime(0.28, now + 2.2);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Pre-tuned phonetic English strings for sacred mantras & greetings.
   * When a system only has English TTS voices (e.g. standard Windows with Microsoft Ravi),
   * this allows Ravi to speak authentic Sanskrit/Marathi mantras in deep Big B baritone
   * without skipping Devanagari characters or producing 0ms silence.
   */
  private sacredOverrides: Record<string, string> = {
    'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.':
      'MantraSetu paavan bhakti daalnaat aaple saharsha swaagat aahe. Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa aajj-chaa divas mangalmay aani shaant-te-cha jaavo.',
    'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला दिवस मंगलमय जावो.':
      'MantraSetu paavan bhakti daalnaat aaple saharsha swaagat aahe. Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa divas mangalmay jaavo.',
    'मंत्रसेतु पावन भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।':
      'MantraSetu paavan bhakti sankul mein aapka haardik swaagat hai. Bhagwan Shiv, Shri Ram evam Vithuraaya ke aasheervaad se aapka din mangalmay evam shaantimay ho.',
    'नमस्कार... ॐ गं गणपतये नमः। वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥':
      'Namaskaar... Om Gam Ganapataye Namaha. Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarva Karyeshu Sarvada.',
    'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥':
      'Om Tryambakam Yajaamahe Sugandhim Pushtivardhanam, Urvaarukamiva Bandhanaan Mrityor Muksheeya Maamritaat.',
    'राम कृष्ण हरी, जय जय राम कृष्ण हरी। पुंडलिक वरदे हरी विठ्ठल, श्री ज्ञानदेव तुकाराम। पंढरीनाथ महाराज की जय॥':
      'Ram Krishna Hari, Jai Jai Ram Krishna Hari. Pundalik Varade Hari Vitthal, Shri Dnyanadev Tukaram, Pandharinath Maharaj Ki Jai.',
    'राम कृष्ण हरि, जय जय राम कृष्ण हरि':
      'Ram Krishna Hari, Jai Jai Ram Krishna Hari.',
    'ज्ञानोबा माऊली तुकाराम, ज्ञानोबा माऊली तुकाराम':
      'Dnyanoba Mauli Tukaram, Dnyanoba Mauli Tukaram.',
    'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि। बरनऊं रघुबर बिमल जसु, जो दायकु फल चारि॥ जय हनुमान ज्ञान गुन सागर, जय कपीस तिहुं लोक उजागर॥':
      'Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhaari. Barnau Raghuvar Bimal Jasu, Jo Daayaku Phal Chaari. Jai Hanuman Gyan Gun Saagar, Jai Kapees Tihun Lok Ujaagar.'
  };

  /**
   * Translates Devanagari script to phonetic Roman text for English-only TTS engines
   */
  public toPhoneticRoman(text: string): string {
    const trimmed = text.trim();
    if (this.sacredOverrides[trimmed]) {
      return this.sacredOverrides[trimmed];
    }

    const consonants: Record<string, string> = {
      'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
      'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
      'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
      'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
      'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
      'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha',
      'स': 'sa', 'ह': 'ha', 'ळ': 'la', 'क्ष': 'ksha', 'ज्ञ': 'gya'
    };

    const vowels: Record<string, string> = {
      'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
      'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'am', 'अः': 'aha'
    };

    const matras: Record<string, string> = {
      'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri',
      'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'
    };

    let out = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];

      if (ch === 'ॐ') {
        out += 'Om ';
      } else if (vowels[ch]) {
        out += vowels[ch];
      } else if (consonants[ch]) {
        let base = consonants[ch];
        if (next === '्') {
          if (base.endsWith('a')) base = base.slice(0, -1);
          out += base;
          i++;
        } else if (matras[next]) {
          if (base.endsWith('a')) base = base.slice(0, -1);
          out += base + matras[next];
          i++;
        } else {
          out += base;
        }
      } else if (ch === 'ं') {
        out += 'm ';
      } else if (ch === 'ः') {
        out += 'h ';
      } else if (ch === '।' || ch === '॥') {
        out += '. ';
      } else {
        out += ch;
      }
    }
    return out.replace(/\s+/g, ' ').trim();
  }



  /**
   * Discovers and selects the deepest, most resonant Indian Male Voice.
   * Prioritizes low-register voices suitable for Amitabh Bachchan's heavy baritone.
   * Strictly filters out robotic female voices.
   */
  public getBestBrahmanVoice(): { voice: SpeechSynthesisVoice | null; isDevanagariCapable: boolean } {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { voice: null, isDevanagariCapable: false };
    }

    if (!this.cachedVoices || !this.cachedVoices.length) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }
    const voices = this.cachedVoices || [];
    if (!voices.length) {
      return { voice: null, isDevanagariCapable: false };
    }

    const femaleNames = [
      'female', 'zira', 'heera', 'kalpana', 'hazel', 'susan', 'samantha',
      'kavya', 'ananya', 'priya', 'veena', 'neerja', 'cortana', 'siri',
      'aarohi', 'swara', 'geeta', 'shruti', 'sunita'
    ];

    // Filter non-female voices
    const maleVoices = voices.filter((v) => {
      const nameLower = v.name.toLowerCase();
      return !femaleNames.some((f) => nameLower.includes(f));
    });

    const candidatePool = maleVoices.length > 0 ? maleVoices : voices;

    // 1. Native Hindi / Marathi male voices (Microsoft Hemant, Microsoft Madhav, Google Hindi)
    const nativeIndianDevanagari = candidatePool.find((v) => {
      const vl = v.lang.toLowerCase();
      const vn = v.name.toLowerCase();
      return (vl.startsWith('hi') || vl.startsWith('mr') || vn.includes('hindi') || vn.includes('marathi')) &&
        (vn.includes('male') || !femaleNames.some((f) => vn.includes(f)));
    });
    if (nativeIndianDevanagari) {
      return { voice: nativeIndianDevanagari, isDevanagariCapable: true };
    }

    // 2. Indian English male voice (Microsoft Ravi - English India)
    const indianEnglishMale = candidatePool.find((v) => {
      const vl = v.lang.toLowerCase();
      const vn = v.name.toLowerCase();
      return (vl.includes('in') || vn.includes('ravi') || vn.includes('india')) &&
        (vn.includes('male') || vn.includes('ravi') || !femaleNames.some((f) => vn.includes(f)));
    });
    if (indianEnglishMale) {
      // Indian English voice handles Romanized phonetic text with perfect Indian accent
      return { voice: indianEnglishMale, isDevanagariCapable: false };
    }

    // 3. Any male voice in pool (David, George, Mark)
    const anyMale = candidatePool.find((v) => v.name.toLowerCase().includes('male')) || candidatePool[0] || null;
    return { voice: anyMale, isDevanagariCapable: false };
  }

  /**
   * Plays a real human voice recording (.mp3 / .wav / .m4a).
   * Resolves true if playback starts successfully, false if file is not found or blocked.
   */
  public playHumanAudio(audioUrl: string, onEnd?: () => void): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        if (!audioUrl || typeof audioUrl !== 'string' || audioUrl.trim() === '') {
          resolve(false);
          return;
        }

        this.stopSpeaking();

        const audio = new Audio();
        this.currentHumanAudio = audio;

        let resolved = false;
        const cleanupAndResolve = (success: boolean) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            if (!success && this.currentHumanAudio === audio) {
              this.currentHumanAudio = null;
            }
            resolve(success);
          }
        };

        const timeout = setTimeout(() => {
          cleanupAndResolve(false);
        }, 1500);

        audio.onended = () => {
          this.currentHumanAudio = null;
          onEnd?.();
        };

        audio.onerror = () => {
          cleanupAndResolve(false);
        };

        audio.src = audioUrl;
        audio.play().then(() => {
          cleanupAndResolve(true);
        }).catch(() => {
          cleanupAndResolve(false);
        });
      } catch {
        resolve(false);
      }
    });
  }

  /**
   * Universal Sacred Voice Engine:
   * 1. Primary Engine: Streams authentic, pristine native Indian audio (Google TTS engine).
   *    Has 100% native support for Marathi ('mr') and Hindi ('hi') on all browsers,
   *    bypassing Windows SAPI limitations and eliminating silent playback errors completely.
   * 2. Fallback Engine: Uses Web Speech API (SpeechSynthesis) with phonetic transliteration
   *    if offline.
   */
  public async speakText(text: string, lang = 'hi-IN', rate?: number, onEnd?: () => void): Promise<void> {
    this.stopSpeaking();
    this.isTTSAborted = false;

    let ended = false;
    const safeEnd = () => {
      if (!ended) {
        ended = true;
        onEnd?.();
      }
    };

    // 1. Try high-fidelity streaming TTS engine (supports native Marathi & Hindi)
    const streamSuccess = await this.playGoogleTTS(text, lang, safeEnd);
    if (streamSuccess) {
      return;
    }

    // 2. Fallback to Web Speech API
    this.speakSynthesisFallback(text, lang, rate, safeEnd);
  }

  /**
   * Web Speech API fallback engine with unpause queue recovery and phonetic mapping
   */
  private speakSynthesisFallback(text: string, lang = 'hi-IN', rate?: number, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    const { voice: bestVoice, isDevanagariCapable } = this.getBestBrahmanVoice();

    let textToSpeak = text;
    let targetLang = lang;

    if (hasDevanagari) {
      if (isDevanagariCapable && bestVoice) {
        textToSpeak = text;
        targetLang = bestVoice.lang.toLowerCase().startsWith('mr') ? 'mr-IN' : 'hi-IN';
      } else {
        textToSpeak = this.toPhoneticRoman(text);
        targetLang = bestVoice ? bestVoice.lang : 'en-IN';
      }
    } else if (lang.toLowerCase().startsWith('en')) {
      targetLang = 'en-IN';
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = targetLang;

    if (this.persona === 'amitabh_bachchan') {
      utterance.pitch = 0.73;
      utterance.rate = rate || 0.82;
      utterance.volume = 1.0;
    } else {
      utterance.pitch = 0.82;
      utterance.rate = rate || 0.84;
      utterance.volume = 1.0;
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    let isCompleted = false;
    const safeEnd = () => {
      if (!isCompleted) {
        isCompleted = true;
        if (keepAliveTimer) clearInterval(keepAliveTimer);
        onEnd?.();
      }
    };

    utterance.onend = () => safeEnd();
    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error event:', e.error);
      safeEnd();
    };

    const keepAliveTimer = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (!window.speechSynthesis.speaking) {
          clearInterval(keepAliveTimer);
        } else if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }, 4000);

    const maxSafetyDuration = Math.max(8000, textToSpeak.length * 200 + 4000);
    setTimeout(() => {
      if (!isCompleted && typeof window !== 'undefined' && 'speechSynthesis' in window && !window.speechSynthesis.speaking) {
        safeEnd();
      }
    }, maxSafetyDuration);

    try {
      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err) {
      console.error('SpeechSynthesis.speak failed:', err);
      safeEnd();
    }
  }

  /**
   * Unified Sacred Chant Player:
   * First tries to play the real recorded audio file (MP3) if available.
   * Otherwise smoothly utilizes the Amitabh Bachchan Baritone Voice with 136.1 Hz Tanpura drone!
   */
  public async playBrahmanChant(options: {
    text: string;
    audioUrl?: string | null;
    lang?: string;
    rate?: number;
    withTanpura?: boolean;
    onEnd?: () => void;
  }): Promise<void> {
    const { text, audioUrl, lang = 'hi-IN', rate, withTanpura = false, onEnd } = options;

    if (withTanpura) {
      this.startTanpura();
    }

    let chantEnded = false;
    const handleChantEnd = () => {
      if (!chantEnded) {
        chantEnded = true;
        if (withTanpura) {
          this.stopTanpura();
        }
        onEnd?.();
      }
    };

    // 1. Try real human audio recording first if URL provided
    if (audioUrl) {
      const played = await this.playHumanAudio(audioUrl, handleChantEnd);
      if (played) return;
    }

    // 2. Seamlessly use Amitabh Bachchan Baritone Voice Engine
    this.speakText(text, lang, rate, handleChantEnd);
  }

  /**
   * Stops all active voice playback (both real human audio and speech synthesis)
   * Also safely stops any active Tanpura drone to avoid orphaned background humming.
   */
  public stopSpeaking() {
    this.isTTSAborted = true;
    if (this.currentHumanAudio) {
      try {
        this.currentHumanAudio.pause();
        this.currentHumanAudio.currentTime = 0;
      } catch {
        // fallback
      }
      this.currentHumanAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch {
        // fallback
      }
    }

    if (this.isTanpuraActive) {
      this.stopTanpura();
    }
  }

  /**
   * Checks if any speech or human audio is currently playing
   */
  public isSpeaking(): boolean {
    const isSpeechActive = typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
    const isHumanAudioActive = !!this.currentHumanAudio && !this.currentHumanAudio.paused;
    return isSpeechActive || isHumanAudioActive;
  }
}

export const audioEngine = new AudioEngine();

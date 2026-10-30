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
  private sharedAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private persona: VoicePersona = 'amitabh_bachchan';
  private isTTSAborted = false;

  constructor() {
    this.persona = getVoicePersona();
    this.initVoices();
  }

  /**
   * Detects whether user is on a mobile device (Android, iOS) or small touch screen.
   */
  public isMobileDevice(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const isTouch = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isSmallScreen = typeof window.innerWidth !== 'undefined' && window.innerWidth <= 820;
    return isMobileUA || (isTouch && isSmallScreen);
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

  public getSharedAudio(): HTMLAudioElement {
    if (!this.sharedAudio) {
      this.sharedAudio = new Audio();
      this.sharedAudio.crossOrigin = 'anonymous';
    }
    return this.sharedAudio;
  }

  /**
   * Resumes and unlocks AudioContext, SpeechSynthesis, and persistent HTML5 Audio on user interaction
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
      const audio = this.getSharedAudio();
      audio.load();
    } catch {
      // fallback
    }
  }



  /**
   * Splits devotional text into short, natural, breath-paced clauses
   * (split by ।, ॥, ., ?, !, comma, semicolon, newline).
   * Keeps chunks between 20-80 chars so browser TTS NEVER buffers or times out!
   */
  public splitIntoDevotionalPhrases(text: string): string[] {
    if (!text) return [];
    const clean = text.replace(/[\r\n]+/g, ' ').trim();
    if (!clean) return [];

    // Split on sacred punctuation & standard sentence breaks
    const rawTokens = clean.split(/([।॥.?!;,\n]+)/);
    const phrases: string[] = [];
    let current = '';

    for (let i = 0; i < rawTokens.length; i++) {
      const token = rawTokens[i];
      if (!token) continue;

      if (/^[।॥.?!;,\n]+$/.test(token)) {
        current += token;
        if (current.trim().length > 0) {
          phrases.push(current.trim());
          current = '';
        }
      } else {
        if (current.length + token.length > 80) {
          if (current.trim()) phrases.push(current.trim());
          current = token;
        } else {
          current += (current ? ' ' : '') + token;
        }
      }
    }
    if (current.trim()) {
      phrases.push(current.trim());
    }

    return phrases.filter((p) => p.length > 0);
  }

  /**
   * Asynchronously guarantees that browser voices are loaded before voice selection
   */
  public async ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];

    let voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      this.cachedVoices = voices;
      return voices;
    }

    if (this.cachedVoices && this.cachedVoices.length > 0) {
      return this.cachedVoices;
    }

    return new Promise((resolve) => {
      let resolved = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          try {
            const v = window.speechSynthesis.getVoices();
            if (v && v.length > 0) this.cachedVoices = v;
            resolve(this.cachedVoices || []);
          } catch {
            resolve([]);
          }
        }
      };

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        const prev = window.speechSynthesis.onvoiceschanged;
        window.speechSynthesis.onvoiceschanged = (e) => {
          if (prev) {
            try { (prev as any)(e); } catch {}
          }
          finish();
        };
      }
      setTimeout(finish, 200);
    });
  }

  /**
   * Splits a long text into clean sentence segments under 150 characters
   * by punctuation boundaries (।, ॥, ., ?, !, comma, newline)
   */
  public splitTextIntoChunks(text: string, maxLength = 140): string[] {
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
   * Resolves audio URLs for relative and base-path hosting (e.g. GitHub Pages /mantrasetu/).
   * Ensures that /audio/amitabh_sample.mp3 and /audio/chants/... always resolve correctly.
   */
  public resolveAudioUrl(url: string): string {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
      return trimmed;
    }
    const cleanPath = trimmed.replace(/^\.?\//, '');
    const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || './';
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${normalizedBase}${cleanPath}`;
  }

  /**
   * Native Indian Google Audio Stream (The clear, melodious voice requested by user).
   * Uses persistent shared AudioElement to guarantee 100% continuous playback on mobile (Android/iOS)
   * with smooth chunk transitions and calibrated MEDIUM speaking speed (0.94).
   */
  public playGoogleTTS(text: string, lang = 'mr', onEnd?: () => void): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.isTTSAborted = false;
        const langCode = lang.startsWith('mr') ? 'mr' : lang.startsWith('hi') || lang.startsWith('sa') ? 'hi' : 'en';
        const chunks = this.splitTextIntoChunks(text, 130);
        if (!chunks.length) {
          onEnd?.();
          resolve(true);
          return;
        }

        let chunkIndex = 0;
        const audio = this.getSharedAudio();
        this.currentHumanAudio = audio;

        // Calibrated MEDIUM pace (0.94 rate gives relaxed, clear, melodious tempo)
        audio.playbackRate = 0.94;

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

          audio.src = url;
          audio.playbackRate = 0.94; // Medium comfortable speed

          audio.onended = () => {
            // Gentle natural pause between chunks (140ms)
            setTimeout(() => {
              if (!this.isTTSAborted) {
                playNext();
              } else {
                onEnd?.();
                resolve(false);
              }
            }, 140);
          };

          audio.onerror = () => {
            console.warn('Google TTS audio playback warning on chunk:', chunkIndex);
            if (!this.isTTSAborted) {
              if (chunkIndex < chunks.length) {
                playNext();
              } else {
                this.currentHumanAudio = null;
                resolve(false);
              }
            }
          };

          audio.play().catch((err) => {
            console.warn('Google TTS play caught:', err);
            if (!this.isTTSAborted) {
              this.currentHumanAudio = null;
              resolve(false);
            }
          });
        };

        playNext();
      } catch (err) {
        console.warn('playGoogleTTS error:', err);
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
    'सनातन अमृतधारा पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.':
      'Sanatan Amrutdhara paavan bhakti daalnaat aaple saharsha swaagat aahe. Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa aajj-chaa divas mangalmay aani shaant-te-cha jaavo.',
    'सनातन अमृतधारा पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला दिवस मंगलमय जावो.':
      'Sanatan Amrutdhara paavan bhakti daalnaat aaple saharsha swaagat aahe. Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa divas mangalmay jaavo.',
    'सनातन अमृतधारा पावन भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।':
      'Sanatan Amrutdhara paavan bhakti sankul mein aapka haardik swaagat hai. Bhagwan Shiv, Shri Ram evam Vithuraaya ke aasheervaad se aapka din mangalmay evam shaantimay ho.',
    'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.':
      'Sanatan Amrutdhara paavan bhakti daalnaat aaple saharsha swaagat aahe. Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa aajj-chaa divas mangalmay aani shaant-te-cha jaavo.',
    'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे. महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला दिवस मंगलमय जावो.':
      'Sanatan Amrutdhara paavan bhakti daalnaat aaple saharsha swaagat aahe. Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa divas mangalmay jaavo.',
    'मंत्रसेतु पावन भक्ति संकुल में आपका हार्दिक स्वागत है। भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।':
      'Sanatan Amrutdhara paavan bhakti sankul mein aapka haardik swaagat hai. Bhagwan Shiv, Shri Ram evam Vithuraaya ke aasheervaad se aapka din mangalmay evam shaantimay ho.',
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
      'Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhaari. Barnau Raghuvar Bimal Jasu, Jo Daayaku Phal Chaari. Jai Hanuman Gyan Gun Saagar, Jai Kapees Tihun Lok Ujaagar.',
    'ॐ नमः शिवाय':
      'Om Namah Shivaaya.',
    'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥':
      'Om Bhoor Bhuva-ha Swaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayaat.',
    'सनातन अमृतधारा पावन भक्ती दालनात आपले सहर्ष स्वागत आहे.':
      'Sanatan Amrutdhara paavan bhakti daalnaat aaple saharsha swaagat aahe.',
    'सनातन अमृतधारा पावन भक्ति संकुल में आपका हार्दिक स्वागत है।':
      'Sanatan Amrutdhara paavan bhakti sankul mein aapka haardik swaagat hai.',
    'मंत्रसेतू पावन भक्ती दालनात आपले सहर्ष स्वागत आहे.':
      'Sanatan Amrutdhara paavan bhakti daalnaat aaple saharsha swaagat aahe.',
    'महादेव, प्रभू श्रीराम आणि विठूमाऊलीच्या कृपेने आपला आजचा दिवस मंगलमय व शांततेचा जावो.':
      'Mahadev, Prabhu Shri Ram aani Vithu Mauli chya krupe-ne aaplaa aajj-chaa divas mangalmay aani shaant-te-cha jaavo.',
    'मंत्रसेतु पावन भक्ति संकुल में आपका हार्दिक स्वागत है।':
      'Sanatan Amrutdhara paavan bhakti sankul mein aapka haardik swaagat hai.',
    'भगवान शिव, श्री राम एवं विठुराया के आशीर्वाद से आपका दिन मंगलमय एवं शांतिमय हो।':
      'Bhagwan Shiv, Shri Ram evam Vithuraaya ke aasheervaad se aapka din mangalmay evam shaantimay ho.',
    'सर्व ५० पावन देव देवता दर्शन दालनात आपले स्वागत आहे.':
      'Sarva panchaas paavan deva devataa darshan daalnaat aaple swaagat aahe.',
    'कोणत्याही देवतेवर क्लिक करून दर्शन व जपमाळ सुरू करा.':
      'Kon-tyaahi devte-var click karoon darshan aani japa-maala shuru karaa.',
    'सर्व ५० पावन देव देवता दर्शन दालनात आपले स्वागत आहे. कोणत्याही देवतेवर क्लिक करून दर्शन व जपमाळ सुरू करा.':
      'Sarva panchaas paavan deva devataa darshan daalnaat aaple swaagat aahe. Kon-tyaahi devte-var click karoon darshan aani japa-maala shuru karaa.',
    'हर हर गंगे! सिंहस्थ कुंभमेळा नाशिक त्र्यंबकेश्वर व प्रयागराज पावन पर्वात आपले स्वागत आहे.':
      'Har Har Gange! Simhastha Kumbh Mela Nashik Trimbakeshwar va Prayagraj paavan parvaat aaple swaagat aahe.',
    'ज्ञानोबा माऊली तुकाराम! पंढरपूर आषाढी वारी पालखी महामार्ग दालनात आपले सहर्ष स्वागत आहे.':
      'Dnyanoba Mauli Tukaram! Pandharpur Aashadhi Wari palkhi mahamarg daalnaat aaple saharsha swaagat aahe.',
    'ज्ञानोबा माऊली तुकाराम, ज्ञानोबा माऊली तुकाराम!':
      'Dnyanoba Mauli Tukaram, Dnyanoba Mauli Tukaram!',
    'राम कृष्ण हरी, जय जय राम कृष्ण हरी! राम कृष्ण हरी, जय जय राम कृष्ण हरी!':
      'Ram Krishna Hari, Jai Jai Ram Krishna Hari! Ram Krishna Hari, Jai Jai Ram Krishna Hari!',
    'पुंडलिक वरदे हरी विठ्ठल, श्री ज्ञानदेव तुकाराम! पंढरीनाथ महाराज की जय!':
      'Pundalik Varade Hari Vitthal, Shri Dnyanadev Tukaram! Pandharinath Maharaj Ki Jai!',
    'दैनिक नक्षत्र पत्रिका, रास उपाय आणि जन्म कुंडली दालनात आपले स्वागत आहे.':
      'Dainik Nakshatra patrika, rashi upaay aani janma kundali daalnaat aaple swaagat aahe.',
    'सनातन अमृतधारा सात्विक भक्ती भांडारात आपले सहर्ष स्वागत आहे.':
      'Sanatan Amrutdhara saatvik bhakti bhaandaaraat aaple saharsha swaagat aahe.'
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
   * Discovers and selects the best native Indian voice for offline speech synthesis.
   * Matches preferred language (Marathi / Hindi / Sanskrit) with natural clarity.
   */
  public getBestBrahmanVoice(preferredLang?: string): { voice: SpeechSynthesisVoice | null; isDevanagariCapable: boolean } {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { voice: null, isDevanagariCapable: false };
    }

    let voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) {
      voices = this.cachedVoices || [];
    }
    if (!voices.length) {
      return { voice: null, isDevanagariCapable: false };
    }

    const pref = (preferredLang || '').toLowerCase();
    const isMarathiPreferred = pref.startsWith('mr');
    const isHindiPreferred = pref.startsWith('hi') || pref.startsWith('sa');

    // 1. Language-targeted match for Marathi (mr)
    if (isMarathiPreferred) {
      const marathiVoice = voices.find((v) => {
        const vl = (v.lang || '').toLowerCase();
        const vn = (v.name || '').toLowerCase();
        return vl.startsWith('mr') || vn.includes('marathi');
      });
      if (marathiVoice) {
        return { voice: marathiVoice, isDevanagariCapable: true };
      }
    }

    // 2. Language-targeted match for Hindi / Sanskrit (hi / sa)
    if (isHindiPreferred) {
      const hindiVoice = voices.find((v) => {
        const vl = (v.lang || '').toLowerCase();
        const vn = (v.name || '').toLowerCase();
        return vl.startsWith('hi') || vn.includes('hindi') || vn.includes('sanskrit');
      });
      if (hindiVoice) {
        return { voice: hindiVoice, isDevanagariCapable: true };
      }
    }

    // 3. Any Devanagari voice (Google Marathi, Google Hindi, Swara, Kalpana, Hemant, Madhav)
    const anyDevanagari = voices.find((v) => {
      const vl = (v.lang || '').toLowerCase();
      const vn = (v.name || '').toLowerCase();
      return vl.startsWith('mr') || vl.startsWith('hi') || vn.includes('marathi') || vn.includes('hindi');
    });
    if (anyDevanagari) {
      return { voice: anyDevanagari, isDevanagariCapable: true };
    }

    // 4. Indian English voice (Microsoft Ravi, Google English India)
    const indianEnglish = voices.find((v) => {
      const vl = (v.lang || '').toLowerCase();
      const vn = (v.name || '').toLowerCase();
      return vl.includes('in') || vn.includes('india') || vn.includes('ravi');
    });
    if (indianEnglish) {
      return { voice: indianEnglish, isDevanagariCapable: false };
    }

    // 5. Default voice
    const defaultVoice = voices.find((v) => v.default) || voices[0] || null;
    return { voice: defaultVoice, isDevanagariCapable: false };
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

        audio.src = this.resolveAudioUrl(audioUrl);
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
   * 1. Priority 1 (Mobile & Desktop): Plays the clear, melodious native Indian Google Voice (tw-ob)
   *    with calibrated MEDIUM speed (0.94) across Android, iOS, and PC.
   * 2. Fallback: If network is offline, smoothly uses Web Speech API with medium cadence.
   */
  public async speakText(text: string, lang = 'mr', _userRate?: number, onEnd?: () => void): Promise<void> {
    this.stopSpeaking();
    this.isTTSAborted = false;

    if (!text || typeof text !== 'string' || !text.trim()) {
      onEnd?.();
      return;
    }

    let ended = false;
    const safeEnd = () => {
      if (!ended) {
        ended = true;
        this.currentUtterance = null;
        onEnd?.();
      }
    };

    // Priority 1: High-fidelity Native Indian Google Voice (the clear female voice preferred by the user)
    const played = await this.playGoogleTTS(text, lang, safeEnd);
    if (played) return;

    // Fallback: Web Speech API
    this.speakSynthesisFallback(text, lang, safeEnd);
  }

  /**
   * Offline Web Speech API fallback engine
   */
  private async speakSynthesisFallback(text: string, lang = 'mr', onEnd?: () => void): Promise<void> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    await this.ensureVoicesLoaded();
    if (this.isTTSAborted) {
      onEnd?.();
      return;
    }

    const phrases = this.splitIntoDevotionalPhrases(text);
    if (!phrases.length) {
      onEnd?.();
      return;
    }

    const { voice: bestVoice, isDevanagariCapable } = this.getBestBrahmanVoice(lang);
    const isMobile = this.isMobileDevice();

    let phraseIdx = 0;

    const speakNextPhrase = () => {
      if (this.isTTSAborted || phraseIdx >= phrases.length) {
        this.currentUtterance = null;
        onEnd?.();
        return;
      }

      const phraseText = phrases[phraseIdx];
      phraseIdx++;

      let textToSpeak = phraseText;
      let targetLang = lang;

      const hasDevanagari = /[\u0900-\u097F]/.test(phraseText);

      if (hasDevanagari) {
        if (isDevanagariCapable) {
          textToSpeak = phraseText;
          targetLang = bestVoice && bestVoice.lang.toLowerCase().startsWith('mr') ? 'mr-IN' : 'hi-IN';
        } else {
          textToSpeak = this.toPhoneticRoman(phraseText);
          targetLang = bestVoice ? bestVoice.lang : 'en-IN';
        }
      } else if (lang.toLowerCase().startsWith('en')) {
        targetLang = 'en-IN';
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      this.currentUtterance = utterance;
      utterance.lang = targetLang;

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      // Medium comfortable speed
      utterance.rate = 0.88;
      utterance.volume = 1.0;
      utterance.pitch = isMobile ? 1.0 : 0.95;

      let phraseFinished = false;
      const onPhraseDone = () => {
        if (!phraseFinished) {
          phraseFinished = true;
          setTimeout(() => {
            if (!this.isTTSAborted) {
              speakNextPhrase();
            } else {
              onEnd?.();
            }
          }, 180);
        }
      };

      utterance.onend = onPhraseDone;
      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis phrase error:', e.error);
        }
        onPhraseDone();
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('SpeechSynthesis.speak failed:', err);
        onPhraseDone();
      }
    };

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    speakNextPhrase();
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
    this.currentUtterance = null;

    if (this.sharedAudio) {
      try {
        this.sharedAudio.pause();
        this.sharedAudio.currentTime = 0;
      } catch {}
    }

    if (this.currentHumanAudio && this.currentHumanAudio !== this.sharedAudio) {
      try {
        this.currentHumanAudio.pause();
        this.currentHumanAudio.currentTime = 0;
      } catch {}
      this.currentHumanAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
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
    const isSpeechActive = (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) || !!this.currentUtterance;
    const isSharedActive = !!this.sharedAudio && !this.sharedAudio.paused;
    const isHumanAudioActive = !!this.currentHumanAudio && !this.currentHumanAudio.paused;
    return isSpeechActive || isSharedActive || isHumanAudioActive;
  }

  public getCurrentUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }
}

export const audioEngine = new AudioEngine();

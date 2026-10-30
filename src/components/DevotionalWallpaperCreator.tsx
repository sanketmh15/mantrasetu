import { useState } from 'react';
import { Language } from '../types';
import {
  Sparkles,
  Download,
  Smartphone,
  Monitor,
  User,
  Calendar,
  Check,
} from 'lucide-react';

interface DevotionalWallpaperCreatorProps {
  currentLang: Language;
}

interface WallpaperPreset {
  id: string;
  name: { en: string; hi: string; mr: string };
  deityName: string;
  symbol: string;
  shloka: string;
  meaning: string;
  bgGradient: [string, string, string]; // [start, middle, end]
}

const wallpaperPresets: WallpaperPreset[] = [
  {
    id: 'ganesha',
    name: { en: 'Vighnaharta Ganesha Gold', hi: 'विघ्नहर्ता गणेश', mr: 'विघ्नहर्ता श्री गणेश' },
    deityName: '॥ श्री गणेशाय नमः ॥',
    symbol: '🐘',
    shloka: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    meaning: 'May Lord Ganesha remove all obstacles from every righteous undertaking.',
    bgGradient: ['#78350f', '#c2410c', '#1c1917']
  },
  {
    id: 'shiva',
    name: { en: 'Mahadev Kailash Blue', hi: 'देवाधिदेव महादेव', mr: 'कैलासपती महादेव' },
    deityName: '॥ ॐ नमः शिवाय ॥',
    symbol: '🔱',
    shloka: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान्मृत्यowner मुक्षीय मामृतात् ॥',
    meaning: 'We meditate upon the Three-Eyed Lord who nourishes all beings and bestows immortality.',
    bgGradient: ['#0f172a', '#1e3a8a', '#020617']
  },
  {
    id: 'vitthal',
    name: { en: 'Vithu Mauli Pandharpur', hi: 'विठू माऊली पंढरपुर', mr: 'विठू माऊली व रखुमाई' },
    deityName: '॥ राम कृष्ण हरि ॥',
    symbol: '🪷',
    shloka: 'अवघा रंग एक झाला । रंगी रंगला श्रीरंग ।\nपाहता पाहता पाहणे हरपले ॥',
    meaning: 'The entire universe dissolved into one singular divine hue, immersed in Lord Vitthala.',
    bgGradient: ['#064e3b', '#115e59', '#1c1917']
  },
  {
    id: 'hanuman',
    name: { en: 'Sankatmochan Hanuman Saffron', hi: 'संकटमोचन हनुमान', mr: 'संकटमोचन श्री हनुमान' },
    deityName: '॥ जय श्री राम ॥ जय हनुमान ॥',
    symbol: '🚩',
    shloka: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥',
    meaning: 'I surrender unto the swift-as-mind Lord Hanuman, chief of vanaras and messenger of Rama.',
    bgGradient: ['#9a3412', '#ea580c', '#18181b']
  },
  {
    id: 'devi',
    name: { en: 'Mahalakshmi Ambabai Lotus', hi: 'महालक्ष्मी अम्बाबाबू', mr: 'करवीर निवासिनी महालक्ष्मी' },
    deityName: '॥ ॐ श्री महालक्ष्म्यै नमः ॥',
    symbol: '🌸',
    shloka: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥',
    meaning: 'Auspicious of all auspiciousness, fulfiller of all wishes, Goddess Narayani, we bow to Thee.',
    bgGradient: ['#831843', '#be185d', '#18181b']
  }
];

export function DevotionalWallpaperCreator({ currentLang }: DevotionalWallpaperCreatorProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ganesha');
  const [aspectRatio, setAspectRatio] = useState<'mobile' | 'desktop'>('mobile');
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [festivalGreeting, setFestivalGreeting] = useState<string>('शुभ सकाळ । मंगलमय दिन ☀️');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const activePreset =
    wallpaperPresets.find((p) => p.id === selectedPresetId) || wallpaperPresets[0];

  const handleDownload = () => {
    setIsGenerating(true);
    const canvas = document.createElement('canvas');
    const isMobile = aspectRatio === 'mobile';
    canvas.width = isMobile ? 1080 : 1920;
    canvas.height = isMobile ? 1920 : 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw rich gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, activePreset.bgGradient[0]);
    grad.addColorStop(0.5, activePreset.bgGradient[1]);
    grad.addColorStop(1, activePreset.bgGradient[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative Royal Borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = isMobile ? 14 : 16;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, w - 96, h - 96);

    // Deity Symbol (Large Center / Top)
    ctx.textAlign = 'center';
    ctx.font = isMobile ? '130px sans-serif' : '110px sans-serif';
    ctx.fillText(activePreset.symbol, w / 2, isMobile ? 360 : 250);

    // Deity Name Title
    ctx.fillStyle = '#fde68a';
    ctx.font = isMobile ? 'bold 50px sans-serif' : 'bold 54px sans-serif';
    ctx.fillText(activePreset.deityName, w / 2, isMobile ? 470 : 340);

    // Greeting Banner
    if (festivalGreeting) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.roundRect(w / 2 - 380, isMobile ? 520 : 380, 760, 80, 24);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = isMobile ? '32px sans-serif' : '30px sans-serif';
      ctx.fillText(festivalGreeting, w / 2, isMobile ? 572 : 432);
    }

    // Sacred Shloka Box
    const boxY = isMobile ? 740 : 500;
    const boxH = isMobile ? 500 : 320;
    const boxW = isMobile ? w - 160 : 1200;
    const boxX = (w - boxW) / 2;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.roundRect(boxX, boxY, boxW, boxH, 32);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Shloka Text
    ctx.fillStyle = '#ffffff';
    ctx.font = isMobile ? 'bold 40px sans-serif' : 'bold 36px sans-serif';

    const lines = activePreset.shloka.split('\n');
    let lineY = isMobile ? boxY + 120 : boxY + 100;
    lines.forEach((line) => {
      ctx.fillText(line, w / 2, lineY);
      lineY += isMobile ? 70 : 60;
    });

    // Meaning
    ctx.fillStyle = '#fde047';
    ctx.font = isMobile ? 'italic 30px sans-serif' : 'italic 26px sans-serif';
    ctx.fillText(`“${activePreset.meaning}”`, w / 2, lineY + (isMobile ? 50 : 35));

    // Personalized Devotee Name
    if (devoteeName) {
      ctx.fillStyle = '#ffffff';
      ctx.font = isMobile ? 'bold 38px sans-serif' : 'bold 34px sans-serif';
      ctx.fillText(`प्रेषक: ${devoteeName} 🙏`, w / 2, isMobile ? 1540 : 920);
    }

    // Watermark
    ctx.fillStyle = '#fef3c7';
    ctx.font = isMobile ? '28px sans-serif' : '24px sans-serif';
    ctx.fillText('📲 सनातन अमृतधारा (Sanatan Amrutdhara) — भक्ती व संस्कृतीचा पावन संगम', w / 2, isMobile ? 1820 : 1010);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Sanatan_Amrutdhara_${activePreset.id}_wallpaper_${aspectRatio}.png`;
    link.href = dataUrl;
    link.click();
    setIsGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>
            {currentLang === 'en'
              ? '4K Ultra-HD Devotional Wallpaper Generator'
              : '४K देव-देवता वॉलपेपर व सुविचार निर्मिती दालन'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Devotional Wallpaper Creator'
            : currentLang === 'hi'
            ? 'भक्ति वॉलपेपर एवं श्लोक कार्ड निर्माता'
            : 'भक्ती वॉलपेपर व श्लोक ग्रीटिंग्स निर्माता'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Create personalized mobile and desktop wallpapers with sacred Sanskrit shlokas, Saint quotes, festive greetings, and your name.'
            : 'आपल्या मोबाईल व कॉम्प्युटरसाठी संस्कृत श्लोक, सणांच्या शुभेच्छा आणि आपल्या नावासह विनामूल्य एचडी वॉलपेपर तयार करा व डाउनलोड करा.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CUSTOMIZATION CONTROLS */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Format Choice (Mobile 9:16 vs Desktop 16:9) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white mb-3 block">
              {currentLang === 'en' ? 'Select Wallpaper Format' : 'वॉलपेपर आकार निवडा'}:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAspectRatio('mobile')}
                className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border ${
                  aspectRatio === 'mobile'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>मोबाईल स्क्रीन (९:१६)</span>
              </button>
              <button
                onClick={() => setAspectRatio('desktop')}
                className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border ${
                  aspectRatio === 'desktop'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>कॉम्प्युटर / लॅपटॉप (१६:९)</span>
              </button>
            </div>
          </div>

          {/* 2. Deity Presets */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white mb-3 block">
              {currentLang === 'en' ? 'Select Deity & Sanskrit Shloka' : 'आराध्य देवता व संस्कृत श्लोक'}:
            </label>
            <div className="space-y-2">
              {wallpaperPresets.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-400/30'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{preset.symbol}</span>
                      <div>
                        <span className="font-bold text-sm text-stone-900 dark:text-white font-serifDev block">
                          {preset.name[currentLang]}
                        </span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                          {preset.deityName}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-amber-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Personalized Name & Greetings Input */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>{currentLang === 'en' ? 'Your Name (Appears at bottom)' : 'आपले नाव (वॉलपेपरवर दिसेल)'}:</span>
              </label>
              <input
                type="text"
                value={devoteeName}
                onChange={(e) => setDevoteeName(e.target.value)}
                placeholder="उदा. संकेत शिंदे"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>{currentLang === 'en' ? 'Greeting / Wish' : 'सण किंवा शुभ संदेश'}:</span>
              </label>
              <input
                type="text"
                value={festivalGreeting}
                onChange={(e) => setFestivalGreeting(e.target.value)}
                placeholder="उदा. शुभ दीपावली / शुभ प्रभात"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 1-Click Download Button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-amber-900/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            <span>{isGenerating ? 'डाउनलोड होत आहे...' : '४K वॉलपेपर डाउनलोड करा (HD PNG)'}</span>
          </button>
        </div>

        {/* RIGHT COLUMN: LIVE WALLPAPER PREVIEW */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[340px] sm:max-w-[380px]">
            {/* Device Mockup */}
            <div className="rounded-[40px] p-3 bg-stone-900 dark:bg-black border-4 border-stone-800 shadow-2xl relative">
              <div className="w-24 h-3.5 bg-black rounded-full mx-auto mb-2" />

              {/* Wallpaper Screen */}
              <div
                className={`w-full ${aspectRatio === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'} rounded-[32px] p-6 text-white flex flex-col justify-between shadow-inner relative overflow-hidden border-2 border-amber-300/40`}
                style={{
                  background: `linear-gradient(to bottom, ${activePreset.bgGradient[0]}, ${activePreset.bgGradient[1]}, ${activePreset.bgGradient[2]})`,
                }}
              >
                {/* Center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

                {/* Top Section */}
                <div className="text-center relative z-10">
                  <div className="text-4xl mb-1">{activePreset.symbol}</div>
                  <h3 className="text-sm font-extrabold font-serifDev text-amber-200">
                    {activePreset.deityName}
                  </h3>
                  {festivalGreeting && (
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-white/10 text-[10px] text-white">
                      {festivalGreeting}
                    </span>
                  )}
                </div>

                {/* Center Shloka */}
                <div className="my-auto p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-center relative z-10">
                  <p className="text-xs font-bold font-serifDev text-white leading-relaxed whitespace-pre-line">
                    {activePreset.shloka}
                  </p>
                  <p className="text-[10px] text-amber-300 mt-1 italic">
                    “{activePreset.meaning}”
                  </p>
                </div>

                {/* Bottom Branding & Name */}
                <div className="text-center relative z-10 pt-2 border-t border-white/20">
                  {devoteeName ? (
                    <div className="text-xs font-bold text-white mb-0.5">
                      प्रेषक: <span className="text-amber-200">{devoteeName}</span> 🙏
                    </div>
                  ) : (
                    <div className="text-[10px] text-stone-300 mb-0.5">(आपले नाव)</div>
                  )}
                  <span className="text-[9px] text-amber-200/80 font-mono">
                    📲 सनातन अमृतधारा
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-stone-500 mt-3">
              🖼️ १-क्लिकमध्ये ४K हाय-रिझोल्युशन इमेज तयार होईल
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

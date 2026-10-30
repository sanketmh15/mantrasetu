import { useState, useRef } from 'react';
import { Language } from '../types';
import {
  Share2,
  Download,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Palette,
  User,
  Calendar,
} from 'lucide-react';

interface DevotionalStatusCardProps {
  currentLang: Language;
}

interface SantQuote {
  saint: string;
  marathi: string;
  hindi: string;
  english: string;
}

const dailySantQuotes: SantQuote[] = [
  {
    saint: 'संत तुकाराम महाराज',
    marathi: 'जे का रंजले गांजले । त्यांसी म्हणे जो आपुले । तोचि साधू ओळखावा । देव तेथेचि जाणावा ॥',
    hindi: 'जो दुखियों और पीड़ितों को अपना मानता है, वही सच्चा संत है और ईश्वर वहीं वास करते हैं।',
    english: 'Recognize him as a true saint who embraces the distressed and downtrodden as his own; God resides there.',
  },
  {
    saint: 'संत ज्ञानेश्वर माऊली',
    marathi: 'अवघा रंग एक झाला । रंगी रंगला श्रीरंग । पाहता पाहता पाहणे हरपले ।',
    hindi: 'सारा संसार एक ही दिव्य रंग में रंग गया, परमात्मा के दर्शन में खो गया।',
    english: 'The entire universe dissolved into one singular divine hue, immersed in Lord Vitthala.',
  },
  {
    saint: 'समर्थ रामदास स्वामी',
    marathi: 'मना सज्जना भक्तिपंथेचि जावे । तरी श्रीहरी पाविजेतो स्वभावे ॥',
    hindi: 'हे मन! सदैव भक्ति और धर्म के मार्ग पर चलो, श्रीहरि स्वयं प्राप्त होंगे।',
    english: 'O noble mind, walk upon the path of true devotion; the Supreme Lord will naturally reveal Himself.',
  },
  {
    saint: 'संत कबीर दास',
    marathi: 'बुरा जो देखन मैं चला, बुरा न मिलिया कोय । जो दिल खोजा आपना, मुझसे बुरा न कोय ॥',
    hindi: 'बुरा जो देखन मैं चला, बुरा न मिलिया कोय । जो दिल खोजा आपना, मुझसे बुरा न कोय ॥',
    english: 'When I searched the world for evil, I found none; but when I searched my own heart, none was worse than me.',
  },
  {
    saint: 'संत एकनाथ महाराज',
    marathi: 'काया ही पंढरी आत्मा हा विठ्ठल । नांदतो केवल पांडुरंग ॥',
    hindi: 'यह देह ही पावन पंढरपुर है और हमारी आत्मा ही साक्षात विट्ठल हैं।',
    english: 'This body itself is the sacred holy city of Pandharpur, and our indwelling soul is Lord Panduranga.',
  },
];

// Weekday deity and color theme reference
const weekdayDeityMap: Record<number, { deity: string; marathiDay: string; colorName: string; bgGradient: string }> = {
  0: { deity: 'श्री सूर्यनारायण', marathiDay: 'रविवार (सूर्य देव)', colorName: 'सुवर्ण तांबूस (रक्तचंदन)', bgGradient: 'from-amber-600 via-orange-600 to-rose-700' },
  1: { deity: 'देवाधिदेव महादेव', marathiDay: 'सोमवार (भगवान शिव)', colorName: 'श्वेत कर्पूर व गंगाजल', bgGradient: 'from-slate-800 via-blue-900 to-indigo-950' },
  2: { deity: 'संकटमोचन हनुमान व श्रीगणेश', marathiDay: 'मंगळवार (मारुती-गणेश)', colorName: 'शेंदूरी लाल व जास्वंद', bgGradient: 'from-orange-600 via-red-600 to-amber-700' },
  3: { deity: 'विठू माऊली व श्रीकृष्ण', marathiDay: 'बुधवार (विठ्ठल-रखुमाई)', colorName: 'पाचू हिरवा व दुर्वा', bgGradient: 'from-emerald-700 via-teal-800 to-stone-900' },
  4: { deity: 'भगवान श्रीविष्णू व दत्तगुरु', marathiDay: 'गुरुवार (श्रीगुरुदेव दत्त)', colorName: 'पीतांबर पिवळा', bgGradient: 'from-amber-500 via-yellow-600 to-orange-700' },
  5: { deity: 'श्री महालक्ष्मी माता', marathiDay: 'शुक्रवार (देवी महालक्ष्मी)', colorName: 'गुलाबी कमळ व हळदी-कुंकू', bgGradient: 'from-rose-600 via-pink-700 to-amber-800' },
  6: { deity: 'शनिदेव व मारुतीराय', marathiDay: 'शनिवार (शनि-हनुमान)', colorName: 'नील वर्ण व तेल-सिंदूर', bgGradient: 'from-stone-900 via-indigo-950 to-stone-900' },
};

export function DevotionalStatusCard({ currentLang }: DevotionalStatusCardProps) {
  const now = new Date();
  const dayIndex = now.getDay();
  const todayMeta = weekdayDeityMap[dayIndex];

  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [senderName, setSenderName] = useState<string>('');
  const [selectedGradient, setSelectedGradient] = useState<string>(todayMeta.bgGradient);
  const [copied, setCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentQuote = dailySantQuotes[quoteIndex];

  const dateString = now.toLocaleDateString('mr-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const getGreetingHeader = () => {
    switch (dayIndex) {
      case 0: return 'ॐ सूर्याय नमः । शुभ प्रभात ☀️';
      case 1: return 'हर हर महादेव । शुभ सोमवार 🕉️';
      case 2: return 'जय श्री राम । जय हनुमान 🚩';
      case 3: return 'राम कृष्ण हरि । विठू माऊली 🪷';
      case 4: return 'दिगंबरा दिगंबरा श्रीपाद वल्लभ दिगंबरा 🔔';
      case 5: return 'ॐ श्री महालक्ष्म्यै नमः । शुभ शुक्रवार 🌸';
      case 6: return 'जय शनिदेव । संकटमोचन हनुमान 🛡️';
      default: return 'शुभ प्रभात । मंगलमय दिन';
    }
  };

  const handleCopyText = () => {
    const textToCopy = `🙏 ${getGreetingHeader()} 🙏\n\n📅 ${dateString} (${todayMeta.marathiDay})\n🚩 आजचे आराध्य: ${todayMeta.deity}\n\n✨ संत वचन:\n"${currentQuote.marathi}"\n— ${currentQuote.saint}\n\n${senderName ? `प्रेषक: ${senderName}\n` : ''}🌸 सनातन अमृतधारा: भक्ती व संस्कृतीचा पावन संगम https://sanketmh15.github.io/mantrasetu/`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const textToCopy = `🙏 *${getGreetingHeader()}* 🙏\n\n📅 *${dateString}* (${todayMeta.marathiDay})\n🚩 *आजचे आराध्य:* ${todayMeta.deity}\n\n📜 *संत विचार:*\n_${currentQuote.marathi}_\n— *${currentQuote.saint}*\n\n${senderName ? `🙏 प्रेषक: ${senderName}\n\n` : ''}🪔 *आपला दिवस मंगलमय जावो!*\n📲 सनातन अमृतधारा (Sanatan Amrutdhara) भक्ती ॲप`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToCopy)}`;
    window.open(url, '_blank');
  };

  // Download Card as high-resolution PNG using HTML5 Canvas
  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920; // 9:16 vertical standard
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    if (selectedGradient.includes('amber')) {
      gradient.addColorStop(0, '#78350f');
      gradient.addColorStop(0.5, '#c2410c');
      gradient.addColorStop(1, '#1c1917');
    } else if (selectedGradient.includes('blue') || selectedGradient.includes('slate')) {
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e3a8a');
      gradient.addColorStop(1, '#020617');
    } else if (selectedGradient.includes('emerald')) {
      gradient.addColorStop(0, '#064e3b');
      gradient.addColorStop(0.5, '#115e59');
      gradient.addColorStop(1, '#1c1917');
    } else {
      gradient.addColorStop(0, '#831843');
      gradient.addColorStop(0.5, '#be185d');
      gradient.addColorStop(1, '#1c1917');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Golden Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, 980, 1820);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, 940, 1780);

    // Header Branding
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('॥ श्री गणेशाय नमः ॥', 540, 180);

    // Title / Greeting
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px sans-serif';
    ctx.fillText(getGreetingHeader(), 540, 270);

    // Date & Day Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.roundRect(140, 330, 800, 130, 30);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.font = '38px sans-serif';
    ctx.fillText(`${dateString}  •  ${todayMeta.marathiDay}`, 540, 410);

    // Deity Banner
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 46px sans-serif';
    ctx.fillText(`🚩 आजचे पावन आराध्य: ${todayMeta.deity}`, 540, 560);

    // Center Sacred Mandala / Om Symbol
    ctx.font = '160px sans-serif';
    ctx.fillText('🕉️', 540, 760);

    // Quote Box
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.roundRect(100, 920, 880, 560, 40);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 920, 880, 560);

    // Quote text wrapping
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';

    const words = currentQuote.marathi.split(' ');
    let line = '';
    let y = 1040;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 760 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 65;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Saint attribution
    ctx.fillStyle = '#fde047';
    ctx.font = 'italic bold 42px sans-serif';
    ctx.fillText(`— ${currentQuote.saint}`, 540, y + 100);

    // Sender Personalized Name
    if (senderName) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(`प्रेषक: ${senderName} 🙏`, 540, 1620);
    }

    // Footer Watermark
    ctx.fillStyle = '#fef3c7';
    ctx.font = '32px sans-serif';
    ctx.fillText('📲 सनातन अमृतधारा (Sanatan Amrutdhara) — भक्ती व संस्कृतीचा पावन संगम', 540, 1790);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Sanatan_Amrutdhara_Status_${now.toISOString().split('T')[0]}.png`;
    link.href = dataUrl;
    link.click();
  };

  const gradientsList = [
    { id: 'today', name: 'आजचा रंग (Today)', gradient: todayMeta.bgGradient },
    { id: 'gold', name: 'सुवर्ण तेज (Saffron Gold)', gradient: 'from-amber-600 via-orange-600 to-rose-700' },
    { id: 'shiva', name: 'कैलास नील (Shiva Indigo)', gradient: 'from-slate-900 via-blue-900 to-indigo-950' },
    { id: 'tulsi', name: 'तुळशी हिरवा (Tulsi Emerald)', gradient: 'from-emerald-800 via-teal-900 to-stone-900' },
    { id: 'devi', name: 'कुंकुम गुलाबी (Devi Lotus)', gradient: 'from-rose-700 via-pink-800 to-amber-900' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>
            {currentLang === 'en'
              ? '1-Click WhatsApp Status & Story Generator'
              : '१-क्लिक व्हॉट्सॲप स्टेटस व सुविचार कार्ड'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Devotional Daily Status Card'
            : currentLang === 'hi'
            ? 'दैनिक भक्ति स्टेटस एवं सुविचार कार्ड'
            : 'आजचे दैनिक भक्ती स्टेटस व सुविचार कार्ड'}
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Share today’s holy day, presiding deity, and inspirational Saint quote with your name directly to WhatsApp or download as high-res 9:16 status image.'
            : 'आजचा वार, आराध्य देवता, शुभ रंग आणि तुकाराम-ज्ञानेश्वर माऊलींचे पावन विचार आपल्या नावासह १-क्लिकमध्ये व्हॉट्सॲपवर पाठवा किंवा डाऊनलोड करा.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CUSTOMIZATION CONTROLS */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Enter Your Name */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              <span>{currentLang === 'en' ? 'Your Name (Appears on Card)' : 'आपले नाव (स्टेटस कार्डवर दिसेल)'}:</span>
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={currentLang === 'en' ? 'e.g., Sanket Shinde' : 'उदा. संकेत शिंदे / आपले नाव'}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* 2. Pick Saint Quote */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{currentLang === 'en' ? 'Select Saint Quote' : 'संत वचन व अभंग निवडा'}:</span>
              </label>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {quoteIndex + 1} / {dailySantQuotes.length}
              </span>
            </div>

            <div className="space-y-2">
              {dailySantQuotes.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuoteIndex(idx)}
                  className={`w-full p-3 rounded-2xl text-left text-xs transition-all border ${
                    quoteIndex === idx
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100 font-medium'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className="font-bold block text-stone-900 dark:text-white">{q.saint}</span>
                  <span className="line-clamp-1 italic mt-0.5">“{q.marathi}”</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pick Card Color Palette */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              <span>{currentLang === 'en' ? 'Background Sacred Palette' : 'पार्श्वभूमी रंगसंगती'}:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {gradientsList.map((g) => {
                const isSelected = selectedGradient === g.gradient;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGradient(g.gradient)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-400/30 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {g.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Sharing Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>व्हॉट्सॲपवर पाठवा</span>
            </button>
            <button
              onClick={handleDownloadCard}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-sm shadow-lg shadow-amber-900/30 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>कार्ड डाउनलोड (PNG)</span>
            </button>
            <button
              onClick={handleCopyText}
              className="px-5 py-4 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              title="Copy message text"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? 'कॉपी झाले!' : 'मजकूर कॉपी'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 9:16 LIVE MOBILE PREVIEW */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[340px] sm:max-w-[380px]">
            {/* Phone Bezel Frame */}
            <div className="rounded-[40px] p-3 bg-stone-900 dark:bg-black border-4 border-stone-800 shadow-2xl relative">
              {/* Dynamic Island / Camera Notch */}
              <div className="w-28 h-4 bg-black rounded-full mx-auto mb-2" />

              {/* 9:16 Card Screen */}
              <div
                ref={cardRef}
                className={`w-full aspect-[9/16] rounded-[32px] p-6 bg-gradient-to-b ${selectedGradient} text-white flex flex-col justify-between shadow-inner relative overflow-hidden border-2 border-amber-300/40`}
              >
                {/* Background decorative glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

                {/* Top Header */}
                <div className="text-center relative z-10">
                  <div className="text-[11px] font-bold text-amber-200 tracking-widest uppercase mb-1">
                    ॥ श्री गणेशाय नमः ॥
                  </div>
                  <h3 className="text-lg font-extrabold font-serifDev text-white drop-shadow-md">
                    {getGreetingHeader()}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[11px] text-amber-200">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {dateString} • {todayMeta.marathiDay}
                    </span>
                  </div>
                </div>

                {/* Middle Deity & Sant Vachan */}
                <div className="my-auto text-center relative z-10">
                  <div className="text-4xl mb-2 filter drop-shadow">🕉️</div>
                  <div className="text-xs font-semibold text-amber-300 mb-4">
                    🚩 आजचे पावन आराध्य: <span className="text-white font-bold">{todayMeta.deity}</span>
                  </div>

                  {/* Sant Quote Box */}
                  <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/40 text-stone-100 shadow-xl">
                    <p className="text-xs sm:text-sm font-medium leading-relaxed font-serifDev italic">
                      “{currentQuote.marathi}”
                    </p>
                    <p className="text-xs font-bold text-amber-300 mt-2 text-right">
                      — {currentQuote.saint}
                    </p>
                  </div>
                </div>

                {/* Bottom Sender & Branding */}
                <div className="text-center relative z-10 pt-2 border-t border-white/20">
                  {senderName ? (
                    <div className="text-xs font-bold text-white mb-1">
                      प्रेषक: <span className="text-amber-200">{senderName}</span> 🙏
                    </div>
                  ) : (
                    <div className="text-[10px] text-stone-300 mb-1">
                      (आपले नाव टाकण्यासाठी डावीकडे नाव भरा)
                    </div>
                  )}
                  <div className="text-[10px] text-amber-200/80 font-mono">
                    📲 सनातन अमृतधारा • भक्ती व संस्कृतीचा संगम
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-stone-500 mt-3">
              📱 ९:१६ व्हॉट्सॲप स्टेटस व इन्स्टाग्राम स्टोरीसाठी अचूक प्रमाण
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

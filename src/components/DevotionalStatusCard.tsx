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
  CheckCircle2,
  Image as ImageIcon
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
    saint: 'संत ज्ञानेश्वर माऊली',
    marathi: 'अवघा रंग एक झाला । रंगी रंगला श्रीरंग । पाहता पाहता पाहणे हरपले ॥',
    hindi: 'सारा संसार एक ही दिव्य रंग में रंग गया, परमात्मा के दर्शन में खो गया।',
    english: 'The entire universe dissolved into one singular divine hue, immersed in Lord Vitthala.',
  },
  {
    saint: 'संत तुकाराम महाराज',
    marathi: 'जे का रंजले गांजले । त्यांसी म्हणे जो आपुले । तोचि साधू ओळखावा । देव तेथेचि जाणावा ॥',
    hindi: 'जो दुखियों और पीड़ितों को अपना मानता है, वही सच्चा संत है और ईश्वर वहीं वास करते हैं।',
    english: 'Recognize him as a true saint who embraces the distressed and downtrodden as his own; God resides there.',
  },
  {
    saint: 'संत नामदेव महाराज',
    marathi: 'नाचू कीर्तनाचे रंगी । ज्ञानदीप लावू जगी ॥',
    hindi: 'कीर्तन के दिव्य रंग में लीन होकर सारे संसार में ज्ञान की पावन ज्योति जगाएंगे।',
    english: 'Dancing in the ecstatic joy of divine kirtan, we shall kindle the lamp of wisdom across the world.',
  },
  {
    saint: 'समर्थ रामदास स्वामी',
    marathi: 'मना सज्जना भक्तिपंथेचि जावे । तरी श्रीहरी पाविजेतो स्वभावे ॥',
    hindi: 'हे मन! सदैव भक्ति और धर्म के मार्ग पर चलो, श्रीहरि स्वयं प्राप्त होंगे।',
    english: 'O noble mind, walk upon the path of true devotion; the Supreme Lord will naturally reveal Himself.',
  },
  {
    saint: 'संत एकनाथ महाराज',
    marathi: 'काया ही पंढरी आत्मा हा विठ्ठल । नांदतो केवल पांडुरंग ॥',
    hindi: 'यह देह ही पावन पंढरपुर है और हमारी आत्मा ही साक्षात विट्ठल हैं।',
    english: 'This body itself is the sacred holy city of Pandharpur, and our indwelling soul is Lord Panduranga.',
  },
  {
    saint: 'संत चोखामेळा',
    marathi: 'ऊस डोंगा परी रस नव्हे डोंगा । काय भुललासी वरलीया रंगा ॥',
    hindi: 'गन्ना भले टेढ़ा हो किंतु उसका रस कभी टेढ़ा नहीं होता; बाह्य रूप पर मत भूलो।',
    english: 'A sugarcane stalk may be crooked, but its sweet nectar is never crooked; do not be deceived by external appearances.',
  },
  {
    saint: 'संत जनाबाई',
    marathi: 'झाडलोट करी जाणी । केर भरी चक्रपाणी ॥',
    hindi: 'सच्ची निष्काम सेवा में भगवान स्वयं आकर अपने भक्त के संग सहभागी बनते हैं।',
    english: 'In true selfless service, the Supreme Lord Himself descends to dwell and assist His pure devotee.',
  },
  {
    saint: 'संत सावता माळी',
    marathi: 'कांदा मुळा भाजी । अवघी विठाबाई माझी ॥ लसूण मिरची कोथिंबिरी । अवघा झाला माझा हरी ॥',
    hindi: 'अपने नित्य कर्म और सेवा में ही भगवान विट्ठल के साक्षात दर्शन होते हैं।',
    english: 'In one\'s daily honest labor and devotion, every humble duty becomes an offering to Lord Hari.',
  },
  {
    saint: 'संत कबीर दास',
    marathi: 'बुरा जो देखन मैं चला, बुरा न मिलिया कोय । जो दिल खोजा आपना, मुझसे बुरा न कोय ॥',
    hindi: 'बुरा जो देखन मैं चला, बुरा न मिलिया कोय । जो दिल खोजा आपना, मुझसे बुरा न कोय ॥',
    english: 'When I searched the world for evil, I found none; but when I searched my own heart, none was worse than me.',
  },
];

// Weekday deity and color theme reference
const weekdayDeityMap: Record<number, { deity: string; marathiDay: string; colorName: string; bgGradient: string }> = {
  0: { deity: 'सूर्यदेव आणि खंडोबा', marathiDay: 'रविवार (सूर्यदेव व खंडोबा)', colorName: 'सुवर्ण तांबूस (रक्तचंदन)', bgGradient: 'from-amber-600 via-orange-600 to-rose-700' },
  1: { deity: 'भगवान शिव (महादेव)', marathiDay: 'सोमवार (महादेव)', colorName: 'श्वेत कर्पूर व गंगाजल', bgGradient: 'from-slate-800 via-blue-900 to-indigo-950' },
  2: { deity: 'श्री गणपती, हनुमान आणि देवी दुर्गा', marathiDay: 'मंगळवार (गणपती, हनुमान व दुर्गा)', colorName: 'शेंदूरी लाल व जास्वंद', bgGradient: 'from-orange-600 via-red-600 to-amber-700' },
  3: { deity: 'विठ्ठल आणि बुध ग्रह', marathiDay: 'बुधवार (विठुराया व बुध ग्रह)', colorName: 'पाचू हिरवा व दुर्वा', bgGradient: 'from-emerald-700 via-teal-800 to-stone-900' },
  4: { deity: 'दत्तगुरू आणि भगवान विष्णू', marathiDay: 'गुरुवार (दत्तगुरू व विष्णू)', colorName: 'पीतांबर पिवळा', bgGradient: 'from-amber-500 via-yellow-600 to-orange-700' },
  5: { deity: 'महालक्ष्मी आणि देवी अंबाबाई', marathiDay: 'शुक्रवार (महालक्ष्मी व अंबाबाई)', colorName: 'गुलाबी कमळ व हळदी-कुंकू', bgGradient: 'from-rose-600 via-pink-700 to-amber-800' },
  6: { deity: 'शनिदेव आणि हनुमान', marathiDay: 'शनिवार (शनिदेव व हनुमान)', colorName: 'नील वर्ण व तेल-सिंदूर', bgGradient: 'from-stone-900 via-indigo-950 to-stone-900' },
};

// Precise color palette hex values for 1080x1920 high-res status export
const gradientColorStops: Record<string, [string, string, string]> = {
  'from-amber-600 via-orange-600 to-rose-700': ['#9a3412', '#c2410c', '#1c1917'], // Sunday
  'from-slate-800 via-blue-900 to-indigo-950': ['#0f172a', '#1e3a8a', '#020617'], // Monday
  'from-orange-600 via-red-600 to-amber-700': ['#c2410c', '#b91c1c', '#1c1917'], // Tuesday
  'from-emerald-700 via-teal-800 to-stone-900': ['#065f46', '#115e59', '#0c0a09'], // Wednesday
  'from-amber-500 via-yellow-600 to-orange-700': ['#d97706', '#ca8a04', '#1c1917'], // Thursday
  'from-rose-600 via-pink-700 to-amber-800': ['#9f1239', '#be185d', '#1c1917'], // Friday
  'from-stone-900 via-indigo-950 to-stone-900': ['#18181b', '#1e1b4b', '#09090b'], // Saturday
};

// Helper for canvas rounded rectangles with universal mobile compatibility
function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

export function DevotionalStatusCard({ currentLang }: DevotionalStatusCardProps) {
  const now = new Date();
  const dayIndex = now.getDay();
  const todayMeta = weekdayDeityMap[dayIndex];

  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [senderName, setSenderName] = useState<string>('');
  const [selectedGradient, setSelectedGradient] = useState<string>(todayMeta.bgGradient);
  const [copied, setCopied] = useState<boolean>(false);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentQuote = dailySantQuotes[quoteIndex] || dailySantQuotes[0];

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

  const showToast = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  // Generate 9:16 high-resolution 1080x1920 canvas
  const generateStatusCanvas = (): HTMLCanvasElement | null => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920; // 9:16 vertical standard
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Draw luxury gradient background
    const colors = gradientColorStops[selectedGradient] || ['#78350f', '#c2410c', '#1c1917'];
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Radiant sunburst behind central OM
    const radialGrad = ctx.createRadialGradient(540, 740, 20, 540, 740, 340);
    radialGrad.addColorStop(0, 'rgba(251, 191, 36, 0.40)');
    radialGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
    radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(540, 740, 340, 0, Math.PI * 2);
    ctx.fill();

    // 3. Decorative Double Golden Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, 980, 1820);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, 940, 1780);

    // Font stacks
    const textFont = '"Noto Sans Devanagari", "Mangal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const emojiFont = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

    // 4. Header Branding
    ctx.fillStyle = '#fde68a';
    ctx.font = `bold 44px ${textFont}`;
    ctx.textAlign = 'center';
    ctx.fillText('॥ श्री गणेशाय नमः ॥', 540, 180);

    // 5. Title / Greeting
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 56px ${textFont}`;
    ctx.fillText(getGreetingHeader(), 540, 270);

    // 6. Date & Day Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    drawRoundedRect(ctx, 140, 330, 800, 130, 30);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.font = `38px ${textFont}`;
    ctx.fillText(`${dateString}  •  ${todayMeta.marathiDay}`, 540, 410);

    // 7. Deity Banner
    ctx.fillStyle = '#fbbf24';
    ctx.font = `bold 46px ${textFont}`;
    ctx.fillText(`🚩 आजचे पावन आराध्य: ${todayMeta.deity}`, 540, 560);

    // 8. Center Sacred Mandala / Om Symbol
    ctx.font = `150px ${emojiFont}`;
    ctx.fillText('🕉️', 540, 760);

    // 9. Sant Quote Box
    ctx.fillStyle = 'rgba(0, 0, 0, 0.52)';
    drawRoundedRect(ctx, 100, 900, 880, 580, 40);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3.5;
    drawRoundedRect(ctx, 100, 900, 880, 580, 40);
    ctx.stroke();

    // 10. Quote text wrapping
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 44px ${textFont}`;
    ctx.textAlign = 'center';

    const words = currentQuote.marathi.split(' ');
    let line = '';
    let y = 1030;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 760 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 68;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Saint attribution
    ctx.fillStyle = '#fde047';
    ctx.font = `italic bold 44px ${textFont}`;
    ctx.fillText(`— ${currentQuote.saint}`, 540, Math.min(y + 110, 1420));

    // 11. Sender Personalized Name
    if (senderName && senderName.trim()) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold 44px ${textFont}`;
      ctx.fillText(`प्रेषक: ${senderName.trim()} 🙏`, 540, 1610);
    }

    // 12. Footer Watermark
    ctx.fillStyle = '#fef3c7';
    ctx.font = `32px ${textFont}`;
    ctx.fillText('📲 सनातन अमृतधारा (Sanatan Amrutdhara) • भक्ती व संस्कृतीचा संगम', 540, 1785);

    return canvas;
  };

  // Download Card as high-resolution PNG using HTML5 Canvas Blob
  const handleDownloadCard = () => {
    const canvas = generateStatusCanvas();
    if (!canvas) return;

    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `Sanatan_Amrutdhara_Status_${now.toISOString().split('T')[0]}.png`;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
        showToast('✅ स्टेटस इमेज डाऊनलोड झाली! गॅलरीतून व्हॉट्सॲप स्टेटसवर सहज लावा.');
      }, 'image/png');
    } else {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Sanatan_Amrutdhara_Status_${now.toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✅ स्टेटस इमेज डाऊनलोड झाली!');
    }
  };

  // Direct 1-Click WhatsApp Status Image Share with Web Share API & Native WhatsApp Fallback
  const handleShareWhatsApp = async () => {
    const canvas = generateStatusCanvas();
    const textMsg = `🙏 *${getGreetingHeader()}* 🙏\n\n📅 *${dateString}* (${todayMeta.marathiDay})\n🚩 *आजचे आराध्य:* ${todayMeta.deity}\n\n📜 *संत विचार:*\n_${currentQuote.marathi}_\n— *${currentQuote.saint}*\n\n${senderName ? `🙏 प्रेषक: ${senderName}\n\n` : ''}🪔 *आपला दिवस मंगलमय जावो!*\n📲 सनातन अमृतधारा: https://sanketmh15.github.io/mantrasetu/`;

    // 1. Try native Web Share API with image file directly to WhatsApp Status
    if (canvas && typeof navigator !== 'undefined' && navigator.share && navigator.canShare && canvas.toBlob) {
      try {
        const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
        if (blob) {
          const file = new File([blob], `Sanatan_Status_${now.toISOString().split('T')[0]}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'सनातन अमृतधारा व्हॉट्सॲप स्टेटस',
              text: textMsg,
            });
            showToast('✅ व्हॉट्सॲप स्टेटस शेअरिंग पूर्ण झाले!');
            return;
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return; // User simply closed native share sheet
      }
    }

    // 2. Direct mobile app WhatsApp fallback (without popup blocker)
    handleDownloadCard();
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${encodeURIComponent(textMsg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(textMsg)}`;

    showToast('✅ इमेज सेव्ह झाली! व्हॉट्सॲप उघडत आहे...');
    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 450);
  };

  // Copy PNG image directly to clipboard
  const handleCopyImage = async () => {
    const canvas = generateStatusCanvas();
    if (!canvas || !canvas.toBlob) {
      handleDownloadCard();
      return;
    }

    try {
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (blob && typeof ClipboardItem !== 'undefined' && navigator.clipboard && navigator.clipboard.write) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        showToast('✅ स्टेटस इमेज क्लिपबोर्डवर कॉपी झाली! थेट व्हॉट्सॲपमध्ये पेस्ट करा.');
        return;
      }
    } catch {}

    // Fallback: download card
    handleDownloadCard();
  };

  const handleCopyText = () => {
    const textToCopy = `🙏 ${getGreetingHeader()} 🙏\n\n📅 ${dateString} (${todayMeta.marathiDay})\n🚩 आजचे आराध्य: ${todayMeta.deity}\n\n✨ संत वचन:\n"${currentQuote.marathi}"\n— ${currentQuote.saint}\n\n${senderName ? `प्रेषक: ${senderName}\n` : ''}🌸 सनातन अमृतधारा: भक्ती व संस्कृतीचा पावन संगम https://sanketmh15.github.io/mantrasetu/`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('✅ संदेश मजकूर कॉपी झाला!');
    setTimeout(() => setCopied(false), 2000);
  };

  const gradientsList = [
    { id: 'today', name: 'आजचा वार (Today)', gradient: todayMeta.bgGradient },
    { id: 'gold', name: 'सुवर्ण तेज (Saffron Gold)', gradient: 'from-amber-600 via-orange-600 to-rose-700' },
    { id: 'shiva', name: 'कैलास नील (Shiva Indigo)', gradient: 'from-slate-800 via-blue-900 to-indigo-950' },
    { id: 'maruti', name: 'शेंदूरी लाल (Hanuman Red)', gradient: 'from-orange-600 via-red-600 to-amber-700' },
    { id: 'tulsi', name: 'तुळशी हिरवा (Tulsi Emerald)', gradient: 'from-emerald-700 via-teal-800 to-stone-900' },
    { id: 'devi', name: 'कुंकुम गुलाबी (Devi Lotus)', gradient: 'from-rose-600 via-pink-700 to-amber-800' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold mb-2 shadow-sm">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>
            {currentLang === 'en'
              ? '1-Click WhatsApp Status & Story Generator'
              : '१-क्लिक व्हॉट्सॲप स्टेटस व सुविचार कार्ड'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {currentLang === 'en'
            ? 'Devotional Daily Status Card'
            : currentLang === 'hi'
            ? 'दैनिक भक्ति स्टेटस एवं सुविचार कार्ड'
            : 'आजचे दैनिक भक्ती स्टेटस व सुविचार कार्ड'}
        </h1>
        <p className="mt-1.5 text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? 'Share today’s holy day, presiding deity, and inspirational Saint quote with your name directly to WhatsApp or download as high-res 9:16 status image.'
            : 'आजचा वार, आराध्य देवता, शुभ रंग आणि तुकाराम-ज्ञानेश्वर माऊलींचे पावन विचार आपल्या नावासह १-क्लिकमध्ये व्हॉट्सॲपवर पाठवा किंवा डाऊनलोड करा.'}
        </p>

        {/* Global Toast Notification */}
        {statusNotification && (
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{statusNotification}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* RIGHT COLUMN ON DESKTOP, BUT AT TOP ON MOBILE: LIVE 9:16 PREVIEW & FAST ACTION BUTTONS */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
          
          {/* Fast Quick-Action Sharing Bar directly below/above preview */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] grid grid-cols-2 gap-2.5 mb-4">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>व्हॉट्सॲपवर पाठवा</span>
            </button>

            <button
              onClick={handleDownloadCard}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-900/30 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>इमेज डाऊनलोड</span>
            </button>
          </div>

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
                  <div className="text-xs font-semibold text-amber-300 mb-3">
                    🚩 आजचे पावन आराध्य: <span className="text-white font-bold">{todayMeta.deity}</span>
                  </div>

                  {/* Sant Quote Box */}
                  <div className="p-4 rounded-2xl bg-black/45 backdrop-blur-md border border-amber-400/40 text-stone-100 shadow-xl">
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
                      (आपले नाव खाली प्रविष्ट करा)
                    </div>
                  )}
                  <div className="text-[10px] text-amber-200/80 font-mono">
                    📲 सनातन अमृतधारा • भक्ती व संस्कृतीचा संगम
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 mt-3 text-xs">
              <button
                onClick={handleCopyImage}
                className="text-stone-600 dark:text-stone-300 hover:text-amber-600 font-bold flex items-center gap-1 hover:underline"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>इमेज कॉपी करा</span>
              </button>
              <span>•</span>
              <button
                onClick={handleCopyText}
                className="text-stone-600 dark:text-stone-300 hover:text-amber-600 font-bold flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'कॉपी झाले!' : 'मजकूर कॉपी करा'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: CUSTOMIZATION CONTROLS */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 order-2 lg:order-1">
          {/* 1. Enter Your Name */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              <span>{currentLang === 'en' ? 'Your Name (Appears on Card)' : 'आपले नाव (स्टेटस कार्डवर दिसेल)'}:</span>
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={currentLang === 'en' ? 'e.g., Sanket Shinde' : 'उदा. संकेत शिंदे / आपले नाव'}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* 2. Pick Saint Quote */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{currentLang === 'en' ? 'Select Saint Quote' : 'संत वचन व अभंग निवडा'}:</span>
              </label>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {quoteIndex + 1} / {dailySantQuotes.length}
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {dailySantQuotes.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuoteIndex(idx)}
                  className={`w-full p-3 rounded-2xl text-left text-xs transition-all border ${
                    quoteIndex === idx
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100 font-medium ring-1 ring-amber-400/40'
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
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
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

        </div>

      </div>
    </div>
  );
}

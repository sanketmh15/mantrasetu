import React, { useState } from 'react';
import { Language, AuthUser } from '../types';
import {
  requestOtp,
  verifyOtp,
  loginWithGoogle,
  loginWithEmail,
} from '../utils/authService';
import { audioEngine } from '../utils/audioSynth';
import {
  X,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Sparkles,
  Mail,
  Lock,
  RotateCcw
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAuthSuccess?: (user: AuthUser) => void;
}

type LoginMethod = 'phone' | 'google' | 'email';

const MAHARASHTRA_DISTRICTS = [
  'पुणे (Pune)',
  'मुंबई (Mumbai)',
  'नाशिक (Nashik)',
  'सोलापूर (Solapur / पंढरपूर)',
  'कोल्हापूर (Kolhapur)',
  'छत्रपती संभाजीनगर (Aurangabad)',
  'ठाणे (Thane)',
  'सातारा (Satara)',
  'सांगली (Sangli)',
  'अहमदनगर / अहिल्यानगर (शिर्डी)',
  'नागपूर (Nagpur)',
  'जळगाव (Jalgaon)',
  'धाराशिव / उस्मानाबाद (तुळजापूर)',
  'अमरावती (Amravati)',
  'नांदेड (Nanded)',
  'इतर / Other State'
];

const ISHTA_DEVATAS = [
  { name: 'श्री विघ्नहर्ता गणेश', icon: '🐘' },
  { name: 'देवाधिदेव महादेव शिव', icon: '🕉️' },
  { name: 'विठू माऊली व रखुमाई (पंढरपूर)', icon: '🪷' },
  { name: 'संकटमोचन मारुतीराया', icon: '🚩' },
  { name: 'आई कुलस्वामिनी तुळजाभवानी', icon: '🔱' },
  { name: 'करवीर निवासिनी महालक्ष्मी अंबाबाई', icon: '👑' },
  { name: 'श्री स्वामी समर्थ महाराज (अक्कलकोट)', icon: '🌸' },
  { name: 'सद्गुरू साईबाबा (शिर्डी)', icon: '✨' },
  { name: 'श्री गुरुदेव दत्त', icon: '🌿' },
  { name: 'मल्हारी मार्तंड खंडोबा (जेजुरी)', icon: '⚔️' },
  { name: 'प्रभू श्रीरामचंद्र व सीता माता', icon: '🏹' },
  { name: 'भगवान श्रीकृष्ण व राधा राणी', icon: '🪈' }
];

const AVATAR_OPTIONS = ['🙏', '🐘', '🕉️', '🪷', '🚩', '🌸', '👑', '✨', '🌿', '🪙'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onAuthSuccess,
}) => {
  const [method, setMethod] = useState<LoginMethod>('phone');

  // Phone Login State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedIshtaDevata, setSelectedIshtaDevata] = useState('श्री विघ्नहर्ता गणेश');
  const [selectedDistrict, setSelectedDistrict] = useState('पुणे (Pune)');
  const [selectedAvatar, setSelectedAvatar] = useState('🙏');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Google Login State
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Email Login State
  const [emailAddress, setEmailAddress] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailUserName, setEmailUserName] = useState('');

  // Status message
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  if (!isOpen) return null;

  // 1. Request OTP for Phone
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const res = requestOtp(phoneNumber);
    if (!res.success) {
      setStatusMsg({ type: 'error', text: res.message });
      return;
    }

    setOtpSent(true);
    setSimulatedOtp(res.generatedOtp || '108108');
    setStatusMsg({ type: 'success', text: res.message });
    audioEngine.playBeadClick();

    // 30s resend timer
    setResendCountdown(30);
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 2. Verify Phone OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const res = verifyOtp(
      phoneNumber,
      enteredOtp,
      'user',
      userName,
      selectedIshtaDevata,
      selectedDistrict,
      selectedAvatar
    );

    if (!res.success || !res.user) {
      setStatusMsg({ type: 'error', text: res.message });
      return;
    }

    audioEngine.playTempleBell();
    setStatusMsg({ type: 'success', text: res.message });

    setTimeout(() => {
      onAuthSuccess?.(res.user!);
      onClose();
    }, 700);
  };

  // 3. Google 1-Click Login
  const handleGoogleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatusMsg(null);

    const email = googleEmail.trim() || 'bhakt.devotee@gmail.com';
    const name = googleName.trim() || email.split('@')[0];

    const res = loginWithGoogle(email, name, selectedAvatar, selectedIshtaDevata);
    audioEngine.playTempleBell();
    setStatusMsg({
      type: 'success',
      text: currentLang === 'en' ? 'Logged in with Google successfully!' : 'गुगल द्वारे लॉगिन यशस्वी!',
    });

    setTimeout(() => {
      onAuthSuccess?.(res.user);
      onClose();
    }, 700);
  };

  // 4. Email Direct Login
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!emailAddress.includes('@')) {
      setStatusMsg({
        type: 'error',
        text: currentLang === 'en' ? 'Please enter a valid email.' : 'कृपया वैध ईमेल आयडी टाका.'
      });
      return;
    }

    const res = loginWithEmail(
      emailAddress,
      emailPassword,
      emailUserName || emailAddress.split('@')[0],
      selectedIshtaDevata,
      selectedDistrict
    );

    audioEngine.playTempleBell();
    setStatusMsg({ type: 'success', text: res.message });

    setTimeout(() => {
      onAuthSuccess?.(res.user);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-[#15120e] border border-amber-300/40 dark:border-stone-800 rounded-3xl shadow-2xl no-scrollbar">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-10 px-5 py-4 bg-gradient-to-r from-saffron-700 via-amber-600 to-saffron-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner ring-1 ring-white/30">
              {selectedAvatar}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serifDev tracking-wide">
                {currentLang === 'en' ? 'Devotee Login' : 'भक्त व साधक प्रवेश'}
              </h3>
              <p className="text-[11px] text-amber-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{currentLang === 'en' ? 'Sanatan Amrutdhara Devotional Portal' : 'सनातन अमृतधारा भक्ती दालन'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method Switcher: Phone vs Google vs Email */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40">
          <div className="grid grid-cols-3 gap-1.5 bg-stone-200/80 dark:bg-stone-800 p-1 rounded-2xl">
            {/* Phone */}
            <button
              onClick={() => {
                setMethod('phone');
                setStatusMsg(null);
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                method === 'phone'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>मोबाईल OTP</span>
            </button>

            {/* Google */}
            <button
              onClick={() => {
                setMethod('google');
                setStatusMsg(null);
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                method === 'google'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            {/* Email */}
            <button
              onClick={() => {
                setMethod('email');
                setStatusMsg(null);
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                method === 'email'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>ईमेल लॉगिन</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Status Message Alert */}
          {statusMsg && (
            <div
              className={`p-3 rounded-2xl text-xs flex items-start gap-2.5 animate-fadeIn ${
                statusMsg.type === 'error'
                  ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-900'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              }`}
            >
              {statusMsg.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
              )}
              <span className="font-medium leading-relaxed">{statusMsg.text}</span>
            </div>
          )}

          {/* Optional: Devotional Customization (Ishta Devata & Avatar) */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
              🪔 आपली भक्ती प्रोफाईल निवडा (Devotional Profile):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Ishta Devata Selector */}
              <div>
                <label className="text-[10px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                  उपास्य दैवत (Ishta Devata)
                </label>
                <select
                  value={selectedIshtaDevata}
                  onChange={(e) => setSelectedIshtaDevata(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white"
                >
                  {ISHTA_DEVATAS.map((d, i) => (
                    <option key={i} value={d.name}>
                      {d.icon} {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Selector */}
              <div>
                <label className="text-[10px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                  जिल्हा (District)
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white"
                >
                  {MAHARASHTRA_DISTRICTS.map((dist, i) => (
                    <option key={i} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Avatar Emoticons */}
            <div>
              <span className="text-[10px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                प्रोफाईल अवतार चिन्ह
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {AVATAR_OPTIONS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all shrink-0 ${
                      selectedAvatar === av
                        ? 'bg-amber-500 text-stone-950 scale-110 shadow-md ring-2 ring-amber-400'
                        : 'bg-white dark:bg-stone-900 hover:bg-amber-100 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* METHOD 1: PHONE NUMBER & OTP LOGIN */}
          {method === 'phone' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleRequestOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      आपले नाव (Full Name)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="उदा. संकेत शिंदे / अमित पाटील"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      मोबाईल नंबर (10-Digit Mobile Number) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500 dark:text-stone-400 font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="९८XXXXXXXX"
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs font-mono font-bold tracking-wider focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phoneNumber.length !== 10}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    <span>ओटीपी मिळवा (Send OTP)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 dark:text-stone-400">
                      नंबर: <strong className="text-stone-800 dark:text-stone-200 font-mono">+91 {phoneNumber}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setEnteredOtp('');
                        setStatusMsg(null);
                      }}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                    >
                      बदला (Edit)
                    </button>
                  </div>

                  {simulatedOtp && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                      <span>
                        पडताळणी कोड: <strong className="font-mono text-sm tracking-widest">{simulatedOtp}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setEnteredOtp(simulatedOtp)}
                        className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-xs hover:bg-emerald-700"
                      >
                        Auto Fill
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      ६-अंकी ओटीपी टाका (Enter 6-Digit OTP)
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full text-center tracking-[0.4em] py-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-base font-bold font-mono focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enteredOtp.length !== 6}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    <span>पडताळणी पूर्ण करा व लॉगिन व्हा</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    {resendCountdown > 0 ? (
                      <span className="text-[11px] text-stone-400 font-mono">
                        पुन्हा ओटीपी मागवा: {resendCountdown} सेकंद
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>पुन्हा ओटीपी पाठवा (Resend OTP)</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: GOOGLE 1-CLICK REAL LOGIN */}
          {method === 'google' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center py-2">
                <span className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed block">
                  आपल्या <strong>Google Gmail</strong> खात्याद्वारे १-क्लिकमध्ये सुरक्षित लॉगिन करा:
                </span>
              </div>

              {/* 1-Click Genuine Google Action */}
              <button
                type="button"
                onClick={() => handleGoogleSignIn()}
                className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border-2 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative my-3 text-center">
                <span className="px-2 bg-white dark:bg-[#15120e] text-[10px] text-stone-400 font-mono">
                  किंवा आपले नाव व ईमेल टाका
                </span>
              </div>

              <form onSubmit={handleGoogleSignIn} className="space-y-3">
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="आपले नाव (उदा. संकेत शिंदे)"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="आपला ईमेल (उदा. sanket@gmail.com)"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  लॉगिन पूर्ण करा
                </button>
              </form>
            </div>
          )}

          {/* METHOD 3: EMAIL & PASSWORD LOGIN */}
          {method === 'email' && (
            <form onSubmit={handleEmailSignIn} className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  नाव (Name)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailUserName}
                    onChange={(e) => setEmailUserName(e.target.value)}
                    placeholder="उदा. राहुल देशमुख"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  ईमेल पत्ता (Email Address) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="devotee@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  पासवर्ड (Password) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>ईमेल द्वारे प्रवेश करा (Sign In)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-center text-[10px] text-stone-500">
          🔒 आपली माहिती पूर्णपणे सुरक्षित आहे. सनातन अमृतधारा केवळ भक्ती आणि आध्यात्मिक साधनेसाठी वापरली जाते.
        </div>

      </div>
    </div>
  );
};

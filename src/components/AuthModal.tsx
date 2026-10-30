import React, { useState } from 'react';
import { Language, AuthUser } from '../types';
import {
  loginWithUserIdAndPassword,
  registerUserAccount,
  requestOtp,
  verifyOtp,
  loginWithGoogle,
  getDemoAccountsList,
} from '../utils/authService';
import { audioEngine } from '../utils/audioSynth';
import {
  X,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAuthSuccess?: (user: AuthUser) => void;
}

type LoginMethod = 'credentials' | 'phone' | 'google';
type CredentialsMode = 'login' | 'register';

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
  // Method: default to 'credentials' (User ID & Password)
  const [method, setMethod] = useState<LoginMethod>('credentials');
  const [credentialsMode, setCredentialsMode] = useState<CredentialsMode>('login');

  // Credentials State
  const [userIdOrContact, setUserIdOrContact] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register State
  const [regUserId, setRegUserId] = useState('');
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [selectedIshtaDevata, setSelectedIshtaDevata] = useState('श्री विघ्नहर्ता गणेश');
  const [selectedDistrict, setSelectedDistrict] = useState('पुणे (Pune)');
  const [selectedAvatar, setSelectedAvatar] = useState('🙏');

  // Phone OTP State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);

  // Google Login State
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Status & Loading State
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const demoAccounts = getDemoAccountsList();

  // 1. User ID & Password LOGIN
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsLoading(true);

    try {
      const res = await loginWithUserIdAndPassword(userIdOrContact, password);
      if (!res.success || !res.user) {
        setStatusMsg({ type: 'error', text: res.message });
        setIsLoading(false);
        return;
      }

      audioEngine.playTempleBell();
      setStatusMsg({ type: 'success', text: res.message });

      setTimeout(() => {
        onAuthSuccess?.(res.user!);
        onClose();
      }, 600);
    } catch {
      setStatusMsg({ type: 'error', text: 'लॉगिन करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. User ID & Password REGISTRATION
  const handleCredentialsRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (regPassword !== regConfirmPassword) {
      setStatusMsg({ type: 'error', text: 'पासवर्ड आणि पुष्टीकरण पासवर्ड जुळत नाहीत (Passwords do not match).' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerUserAccount({
        userId: regUserId,
        password: regPassword,
        name: regName,
        email: regEmail || undefined,
        phone: regPhone || undefined,
        ishtaDevata: selectedIshtaDevata,
        district: selectedDistrict,
        avatar: selectedAvatar,
      });

      if (!res.success || !res.user) {
        setStatusMsg({ type: 'error', text: res.message });
        setIsLoading(false);
        return;
      }

      audioEngine.playTempleBell();
      setStatusMsg({ type: 'success', text: res.message });

      setTimeout(() => {
        onAuthSuccess?.(res.user!);
        onClose();
      }, 700);
    } catch {
      setStatusMsg({ type: 'error', text: 'नोंदणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Quick 1-Click Demo Login
  const handleQuickDemoLogin = async (demoUserId: string, demoPass: string) => {
    setStatusMsg(null);
    setIsLoading(true);
    setUserIdOrContact(demoUserId);
    setPassword(demoPass);

    const res = await loginWithUserIdAndPassword(demoUserId, demoPass);
    if (res.success && res.user) {
      audioEngine.playTempleBell();
      setStatusMsg({ type: 'success', text: `चाचणी खात्यात स्वागत आहे, ${res.user.name}!` });
      setTimeout(() => {
        onAuthSuccess?.(res.user!);
        onClose();
      }, 600);
    } else {
      setStatusMsg({ type: 'error', text: res.message });
    }
    setIsLoading(false);
  };

  // 4. Phone OTP Login
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
    setStatusMsg({ type: 'success', text: `${res.message} (सत्यापन कोड: ${res.generatedOtp})` });
    audioEngine.playBeadClick();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const res = verifyOtp(
      phoneNumber,
      enteredOtp,
      'user',
      regName || undefined,
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
    }, 600);
  };

  // 5. Google 1-Click Login
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
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-[#15120e] border border-amber-300/60 dark:border-amber-800/60 rounded-3xl shadow-2xl no-scrollbar">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-10 px-5 py-4 bg-gradient-to-r from-saffron-700 via-amber-600 to-saffron-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner ring-1 ring-white/30">
              {selectedAvatar}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-serifDev tracking-wide flex items-center gap-1.5">
                <span>{currentLang === 'en' ? 'Devotee Login' : 'भक्त व साधक प्रवेश'}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </h3>
              <p className="text-[11px] text-amber-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>सनातन अमृतधारा • सुरक्षित डेटाबेस प्रणाली</span>
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

        {/* Method Switcher Tabs */}
        <div className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
          <div className="grid grid-cols-3 gap-1.5 bg-stone-200/80 dark:bg-stone-800 p-1 rounded-2xl">
            {/* User ID & Password (Default) */}
            <button
              type="button"
              onClick={() => {
                setMethod('credentials');
                setStatusMsg(null);
              }}
              className={`py-2 px-1.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                method === 'credentials'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/20'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>युझर आयडी</span>
            </button>

            {/* Mobile Direct OTP */}
            <button
              type="button"
              onClick={() => {
                setMethod('phone');
                setStatusMsg(null);
              }}
              className={`py-2 px-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                method === 'phone'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>मोबाईल OTP</span>
            </button>

            {/* Google 1-Click */}
            <button
              type="button"
              onClick={() => {
                setMethod('google');
                setStatusMsg(null);
              }}
              className={`py-2 px-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
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
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Status Message Alert */}
          {statusMsg && (
            <div
              className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 animate-fadeIn ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-300'
                  : statusMsg.type === 'error'
                  ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200 border border-rose-300'
                  : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="flex-1">{statusMsg.text}</span>
            </div>
          )}

          {/* ================= METHOD 1: USER ID & PASSWORD ================= */}
          {method === 'credentials' && (
            <div className="space-y-4">
              
              {/* Toggle Mode: Login vs Register */}
              <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800/80 p-1 border border-stone-200 dark:border-stone-700">
                <button
                  type="button"
                  onClick={() => {
                    setCredentialsMode('login');
                    setStatusMsg(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    credentialsMode === 'login'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>लॉगिन करा (Sign In)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCredentialsMode('register');
                    setStatusMsg(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    credentialsMode === 'register'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>नवीन खाते उघडा (Sign Up)</span>
                </button>
              </div>

              {/* A. SIGN IN FORM */}
              {credentialsMode === 'login' && (
                <form onSubmit={handleCredentialsLogin} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      युझर आयडी / ईमेल / मोबाईल (User ID / Email / Phone):
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={userIdOrContact}
                        onChange={(e) => setUserIdOrContact(e.target.value)}
                        placeholder="उदा. bhakt_shinde किंवा sadhak108"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      पासवर्ड (Password):
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="आपला पासवर्ड प्रविष्ट करा"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-2.5 text-stone-400 hover:text-stone-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-saffron-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{isLoading ? 'डेटाबेस पडताळणी...' : 'प्रवेश करा (Sign In to Sanctum)'}</span>
                  </button>

                  {/* Quick 1-Click Demo Accounts Box */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-2 text-center">
                      ⚡ १-क्लिक चाचणी खात्याने त्वरित लॉगिन करा (Quick Demo Logins):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      {demoAccounts.map((demo) => (
                        <button
                          key={demo.userId}
                          type="button"
                          onClick={() => handleQuickDemoLogin(demo.userId, demo.pass)}
                          className="px-2 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-left transition-all text-[11px]"
                        >
                          <span className="font-extrabold text-stone-900 dark:text-white block truncate">
                            {demo.name}
                          </span>
                          <span className="text-[10px] text-amber-700 dark:text-amber-400 block truncate">
                            ID: {demo.userId}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              )}

              {/* B. REGISTRATION FORM */}
              {credentialsMode === 'register' && (
                <form onSubmit={handleCredentialsRegister} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      युझर आयडी (User ID - अद्वितीय ओळख):
                    </label>
                    <input
                      type="text"
                      required
                      value={regUserId}
                      onChange={(e) => setRegUserId(e.target.value)}
                      placeholder="उदा. sanket_shinde किंवा sadhak_108"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      आपले पूर्ण नाव (Full Name):
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="उदा. संकेत शिंदे"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        पासवर्ड:
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="किमान ४ अक्षरे"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        पासवर्ड पुष्टीकरण:
                      </label>
                      <input
                        type="password"
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="पुन्हा पासवर्ड टाका"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        मोबाईल (वैकल्पिक):
                      </label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="१० अंकी नंबर"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        ईमेल (वैकल्पिक):
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Devotional Profile Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        इष्टदेवता (Presiding Deity):
                      </label>
                      <select
                        value={selectedIshtaDevata}
                        onChange={(e) => setSelectedIshtaDevata(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      >
                        {ISHTA_DEVATAS.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.icon} {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        जिल्हा (District):
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      >
                        {MAHARASHTRA_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Avatar Icons */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      आपले भक्ती प्रतीक (Avatar):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all ${
                            selectedAvatar === av
                              ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-400'
                              : 'bg-stone-100 dark:bg-stone-800 hover:bg-amber-100'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-saffron-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isLoading ? 'डेटाबेसमध्ये नोंद होत आहे...' : 'खाते तयार करा व प्रवेश करा (Register Account)'}</span>
                  </button>
                </form>
              )}

            </div>
          )}

          {/* ================= METHOD 2: MOBILE DIRECT OTP ================= */}
          {method === 'phone' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleRequestOtp} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      आपला मोबाईल नंबर (10-Digit Mobile):
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs font-bold text-stone-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="९८७६५४३२१०"
                        className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    सत्यापन कोड मिळवा (Get Direct Verification Code)
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        ६-अंकी पडताळणी कोड (Enter 6-Digit Code):
                      </label>
                      {simulatedOtp && (
                        <button
                          type="button"
                          onClick={() => setEnteredOtp(simulatedOtp)}
                          className="text-[10px] text-saffron-600 dark:text-saffron-400 font-extrabold hover:underline"
                        >
                          स्वयं भरा: {simulatedOtp}
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.trim())}
                      placeholder="उदा. 108108"
                      className="w-full px-4 py-2.5 text-center text-lg font-mono tracking-widest rounded-xl bg-stone-50 dark:bg-stone-900 border border-amber-400 text-stone-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    कोड पडताळा व प्रवेश करा (Verify & Enter)
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ================= METHOD 3: GOOGLE 1-CLICK ================= */}
          {method === 'google' && (
            <div className="space-y-4 text-center py-2">
              <p className="text-xs text-stone-600 dark:text-stone-300">
                आपल्या गुगल खात्याद्वारे १-क्लिक सुरक्षित प्रवेश करा:
              </p>

              <div className="space-y-2 text-left">
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="उदा. devotee@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="आपले नाव (वैकल्पिक)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="button"
                onClick={() => handleGoogleSignIn()}
                className="w-full py-3 rounded-2xl bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white font-extrabold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google द्वारे त्वरित प्रवेश</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-center">
          <p className="text-[10px] text-stone-500 dark:text-stone-400">
            🔒 १००% सुरक्षित, खाजगी व अमर्याद भक्ती साधना • सनातन अमृतधारा
          </p>
        </div>

      </div>
    </div>
  );
};

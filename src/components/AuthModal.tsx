import React, { useState } from 'react';
import { Language, AuthUser, UserRole } from '../types';
import {
  requestOtp,
  verifyOtp,
  loginWithGoogle,
  getAdminPhones,
} from '../utils/authService';
import { audioEngine } from '../utils/audioSynth';
import {
  X,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  User,
  Crown,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAuthSuccess?: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onAuthSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [userMethod, setUserMethod] = useState<'phone' | 'google'>('phone');

  // Phone & OTP states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Google Login states
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Status message
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Admin Registered Numbers
  const adminPhones = getAdminPhones();

  if (!isOpen) return null;

  const handleRequestOtp = (role: UserRole) => {
    setStatusMsg(null);
    const res = requestOtp(phoneNumber, role);

    if (!res.success) {
      setStatusMsg({ type: 'error', text: res.message });
      return;
    }

    setOtpSent(true);
    setSimulatedOtp(res.generatedOtp || null);
    setStatusMsg({ type: 'success', text: res.message });
    audioEngine.playBeadClick();

    // Start 30s resend timer
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

  const handleVerifyOtp = (role: UserRole) => {
    setStatusMsg(null);
    const res = verifyOtp(phoneNumber, enteredOtp, role, userName);

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

  const handleGoogleSignIn = (email: string, name: string) => {
    setStatusMsg(null);
    const res = loginWithGoogle(email, name);
    audioEngine.playTempleBell();
    setStatusMsg({
      type: 'success',
      text: currentLang === 'en' ? 'Signed in with Google successfully!' : 'गुगल द्वारे लॉगिन यशस्वी!',
    });

    setTimeout(() => {
      onAuthSuccess?.(res.user);
      onClose();
    }, 700);
  };

  const handleQuickFillAdminPhone = (ph: string) => {
    setPhoneNumber(ph);
    setOtpSent(false);
    setEnteredOtp('');
    setSimulatedOtp(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden bg-white dark:bg-[#15120e] border border-amber-300/40 dark:border-stone-800 rounded-3xl shadow-2xl">
        
        {/* Top Header with Divine Gradient */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-700 via-saffron-600 to-amber-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner ring-1 ring-white/30">
              {activeTab === 'admin' ? '👑' : '🙏'}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serifDev tracking-wide">
                {activeTab === 'admin'
                  ? (currentLang === 'en' ? 'Admin Portal Login' : 'अ‍ॅडमिन लॉगिन (फक्त मालकासाठी)')
                  : (currentLang === 'en' ? 'Sadhaka Portal Login' : 'साधक लॉगिन दालन')}
              </h3>
              <p className="text-[11px] text-amber-100">
                {activeTab === 'admin'
                  ? 'Secure Phone OTP for App Owner'
                  : 'Phone OTP किंवा Google Gmail द्वारे लॉगिन'}
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

        {/* Tab Switcher: User Login vs Admin Login */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-1.5 gap-1.5">
          <button
            onClick={() => {
              setActiveTab('user');
              setOtpSent(false);
              setStatusMsg(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'user'
                ? 'bg-white dark:bg-stone-800 text-saffron-700 dark:text-saffron-400 shadow-sm border border-stone-200 dark:border-stone-700'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'User / Sadhaka' : 'साधक लॉगिन'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('admin');
              setOtpSent(false);
              setStatusMsg(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-amber-600 to-saffron-600 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-300" />
            <span>{currentLang === 'en' ? 'Admin (Only for Me)' : 'अ‍ॅडमिन (Only for Me)'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
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
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* TAB 1: USER LOGIN (Phone Number OTP or Google Gmail) */}
          {activeTab === 'user' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Method Toggle: Phone vs Google */}
              <div className="flex gap-2">
                <button
                  onClick={() => setUserMethod('phone')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    userMethod === 'phone'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>मोबाईल नंबर (Phone OTP)</span>
                </button>

                <button
                  onClick={() => setUserMethod('google')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    userMethod === 'google'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google Gmail</span>
                </button>
              </div>

              {/* A. User Phone OTP Form */}
              {userMethod === 'phone' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      आपले नाव (Name - Optional):
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="उदा. राहुल शिंदे"
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      मोबाईल नंबर (10-digit Phone Number):
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 rounded-l-2xl bg-stone-200 dark:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 border border-r-0 border-stone-300 dark:border-stone-800">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-r-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={() => handleRequestOtp('user')}
                      disabled={phoneNumber.length !== 10}
                      className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>ओटीपी पाठवा (Send OTP)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-3 pt-2 animate-fadeIn">
                      {/* Simulated SMS Notification Banner */}
                      {simulatedOtp && (
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200">
                            <span>📩</span>
                            <span>SMS OTP: <strong className="font-mono text-sm tracking-wider">{simulatedOtp}</strong></span>
                          </div>
                          <button
                            onClick={() => setEnteredOtp(simulatedOtp)}
                            className="text-[11px] font-bold text-saffron-700 dark:text-saffron-400 hover:underline"
                          >
                            Auto-fill OTP
                          </button>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          ६ अंकी ओटीपी टाका (Enter 6-digit OTP):
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                          placeholder="______"
                          className="w-full px-3.5 py-2.5 text-center font-mono tracking-widest text-base rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <button
                          onClick={() => setOtpSent(false)}
                          className="text-stone-500 hover:underline"
                        >
                          नंबर बदला (Change Number)
                        </button>
                        {resendCountdown > 0 ? (
                          <span>Resend in {resendCountdown}s</span>
                        ) : (
                          <button
                            onClick={() => handleRequestOtp('user')}
                            className="text-saffron-600 dark:text-saffron-400 font-semibold hover:underline"
                          >
                            पुन्हा पाठवा (Resend OTP)
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleVerifyOtp('user')}
                        disabled={enteredOtp.length < 4}
                        className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>लॉगिन पूर्ण करा (Verify & Login)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* B. Google Gmail 1-Click Form */}
              {userMethod === 'google' && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed text-center">
                    आपल्या Google Gmail खात्याद्वारे १-क्लिक मध्ये सुरक्षित व जलद लॉगिन करा:
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleGoogleSignIn('sadhaka.devotee@gmail.com', 'Sadhaka User')}
                      className="w-full p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-saffron-500 flex items-center justify-between text-xs font-semibold text-stone-800 dark:text-stone-200 shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                          S
                        </span>
                        <div className="text-left">
                          <p className="font-bold">Sadhaka Devotee</p>
                          <p className="text-[11px] text-stone-400">sadhaka.devotee@gmail.com</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-saffron-600 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <div className="relative my-3 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-stone-200 dark:border-stone-800" />
                      </div>
                      <span className="relative px-3 bg-white dark:bg-[#15120e] text-[10px] text-stone-400 uppercase">
                        किंवा इतर ईमेल लिहा
                      </span>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={googleName}
                        onChange={(e) => setGoogleName(e.target.value)}
                        placeholder="नाव (Your Full Name)"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs"
                      />
                      <input
                        type="email"
                        value={googleEmail}
                        onChange={(e) => setGoogleEmail(e.target.value)}
                        placeholder="your.email@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs"
                      />
                      <button
                        onClick={() => handleGoogleSignIn(googleEmail.trim() || 'user@gmail.com', googleName.trim() || 'Google Devotee')}
                        disabled={!googleEmail.includes('@')}
                        className="w-full py-2.5 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-40 transition-all"
                      >
                        <span>Sign In with Gmail</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADMIN LOGIN (ONLY FOR ME WITH RESTRICTED PHONE & OTP) */}
          {activeTab === 'admin' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Admin Exclusivity Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/50 border border-amber-500/50 text-xs text-amber-200 space-y-1.5 shadow-inner">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-sm">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>॥ अ‍ॅडमिन कमांड सेंटर लॉगिन (Owner Only) ॥</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  हे लॉगिन केवळ ॲप मालक / अ‍ॅडमिनसाठी राखीव आहे. केवळ अधिकृत नोंदणीकृत मोबाईल नंबरवरच ओटीपी प्राप्त होईल.
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-stone-400 uppercase font-mono">अधिकृत नंबर:</span>
                  {adminPhones.map((ph, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickFillAdminPhone(ph)}
                      className="px-2 py-0.5 rounded-md bg-black/60 border border-amber-500/30 font-mono text-[11px] text-amber-300 hover:bg-amber-900/40"
                      title="Click to fill this registered admin number"
                    >
                      {ph}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Phone Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  नोंदणीकृत अ‍ॅडमिन मोबाईल नंबर:
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 rounded-l-2xl bg-stone-200 dark:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 border border-r-0 border-stone-300 dark:border-stone-800">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="उदा. 9820012345"
                    className="w-full px-3.5 py-2.5 rounded-r-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-mono font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={() => handleRequestOtp('admin')}
                  disabled={phoneNumber.length !== 10}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs sm:text-sm shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>अ‍ॅडमिन ओटीपी पाठवा (Send Admin OTP)</span>
                </button>
              ) : (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  {/* Master Admin OTP Banner */}
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200">
                      <span>👑</span>
                      <span>अ‍ॅडमिन ओटीपी: <strong className="font-mono text-sm tracking-wider">{simulatedOtp || '108108'}</strong></span>
                    </div>
                    <button
                      onClick={() => setEnteredOtp(simulatedOtp || '108108')}
                      className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      Auto-fill
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      ६ अंकी अ‍ॅडमिन ओटीपी टाका:
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="______"
                      className="w-full px-3.5 py-2.5 text-center font-mono tracking-widest text-lg font-bold rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-amber-600 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    onClick={() => handleVerifyOtp('admin')}
                    disabled={enteredOtp.length < 4}
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs sm:text-sm shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Crown className="w-4 h-4 text-yellow-200" />
                    <span>अ‍ॅडमिन डॅशबोर्ड उघडा (Unlock Admin Dashboard)</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

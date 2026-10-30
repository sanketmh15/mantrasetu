import React, { useState, useEffect, useRef } from 'react';
import { Language, DeityId, ThemeMode, AuthUser } from '../types';
import {
  Compass,
  Sparkles,
  BookOpen,
  MapPin,
  Heart,
  HelpCircle,
  Layers,
  Smartphone,
  Navigation,
  Calendar,
  Sun,
  Moon,
  Flame,
  Bot,
  User,
  Crown,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Search,
  ShoppingBag,
  Bookmark,
  Camera,
  Radio,
  Image,
  Smile,
  Shield
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenGlossary: () => void;
  activeDeity?: DeityId;
  onDeityChange?: (deity: DeityId) => void;
  currentTheme: ThemeMode;
  onToggleTheme: () => void;
  onOpenChatbot?: () => void;
  onOpenNamaste?: () => void;
  onOpenSearch?: () => void;
  onOpenAuthModal?: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenGlossary,
  currentTheme,
  onToggleTheme,
  onOpenChatbot,
  onOpenNamaste,
  onOpenSearch,
  onOpenAuthModal,
  currentUser,
  onLogout,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert(currentLang === 'en' 
        ? 'To install this app on your phone: Tap browser menu (⋮) and select "Add to Home Screen" or "Install App".'
        : 'मोबाईलवर ॲप इन्स्टॉल करण्यासाठी: ब्राऊझरच्या मेन्यूवर (⋮) क्लिक करून "Add to Home Screen" किंवा "Install App" निवडा.');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  // Base navigation tabs
  const baseTabs = [
    { id: 'home', label: { en: 'Dashboard', hi: 'मुख्य दालन', mr: 'मुख्य दालन' }, icon: Sparkles },
    { id: 'deities', label: { en: '50 Deities', hi: '५० देवी-देवता', mr: 'सर्व ५० देव-देवता' }, icon: Heart },
    { id: 'kumbh', label: { en: 'Kumbh Mela', hi: 'कुम्भ मेला', mr: 'कुंभमेळा' }, icon: Flame },
    { id: 'japa', label: { en: '108 Mala', hi: '१०८ जप माला', mr: '१०८ जपमाळ' }, icon: Compass },
    { id: 'chalisa', label: { en: 'Chalisa', hi: 'चालीसा व स्तोत्र', mr: 'चालीसा व स्तोत्रे' }, icon: BookOpen },
    { id: 'mantras', label: { en: 'Mantras', hi: 'मन्त्र व आरती', mr: 'मंत्र व आरती' }, icon: Layers },
    { id: 'pilgrimage', label: { en: 'Pilgrimage', hi: 'तीर्थ नियोजन', mr: 'तीर्थ नियोजन' }, icon: Navigation },
    { id: 'calendar', label: { en: 'Panchang', hi: 'पंचांग', mr: 'दिनदर्शिका' }, icon: Calendar },
    { id: 'maharashtra', label: { en: 'Maharashtra', hi: 'महाराष्ट्र दर्शन', mr: 'महाराष्ट्र दर्शन' }, icon: MapPin },
    { id: 'worship', label: { en: 'Day-Wise Puja', hi: 'वार पूजा विधि', mr: 'वारानुसार पूजा' }, icon: Calendar },
    { id: 'puja', label: { en: 'E-Puja & Aarti', hi: 'ई-पूजा एवं आरती', mr: '🪔 ई-पूजा व आरती' }, icon: Flame },
    { id: 'choghadiya', label: { en: 'Live Choghadiya', hi: 'चौघड़िया व राहुकाल', mr: '⏰ चौघडिया व राहुकाळ' }, icon: Sun },
    { id: 'meditation', label: { en: 'Meditation & Sleep', hi: 'ध्यान एवं निद्रा', mr: '🎧 अखंड ध्यान नाद' }, icon: Moon },
    { id: 'status-card', label: { en: 'Status Card', hi: 'स्टेटस कार्ड', mr: '📲 व्हॉट्सॲप स्टेटस' }, icon: Smartphone },
    { id: 'nearby-temples', label: { en: 'Nearby Temples', hi: 'समीपवर्ती मंदिर', mr: '🧭 जवळची मंदिरे' }, icon: Navigation },
    { id: 'satvik', label: { en: 'Satvik Prasad', hi: 'सात्विक प्रसाद', mr: '🍲 सात्विक प्रसाद' }, icon: Layers },
    { id: 'checklist', label: { en: 'Puja Checklist', hi: 'पूजा सामग्री सूची', mr: '🛒 पूजा साहित्य यादी' }, icon: ShoppingBag },
    { id: 'festival-prep', label: { en: 'Festival Prep', hi: 'त्योहार तैयारी', mr: '✨ सण-उत्सव पूर्वतयारी' }, icon: Sparkles },
    { id: 'vrat', label: { en: 'Vrat Guide', hi: 'व्रत मार्गदर्शक', mr: '🛡️ शास्त्रोक्त व्रत विधी' }, icon: BookOpen },
    { id: 'library', label: { en: 'My Library (Offline)', hi: 'मेरी लाइब्रेरी (ऑफलाइन)', mr: '❤️ माझे भक्ती दालन' }, icon: Bookmark },
    { id: 'temple-3d', label: { en: '3D Temples', hi: '3D मन्दिर दर्शन', mr: '🏛️ ३D मंदिर दर्शन' }, icon: Compass },
    { id: 'wallpaper', label: { en: 'Wallpaper Studio', hi: 'वॉलपेपर क्रिएटर', mr: '🖼️ वॉलपेपर स्टुडिओ' }, icon: Image },
    { id: 'scanner', label: { en: 'Shloka Scanner', hi: 'श्लोक स्कैनर', mr: '📷 श्लोक स्कॅनर' }, icon: Camera },
    { id: 'digital-library', label: { en: 'Scriptures Library', hi: 'संत साहित्य ग्रन्थालय', mr: '📜 संत साहित्य व गीता' }, icon: BookOpen },
    { id: 'stories', label: { en: 'Stories for Kids', hi: 'बाल संस्कार कथाएँ', mr: '🧒 बाल संस्कार गोष्टी' }, icon: Smile },
    { id: 'symbolism', label: { en: 'Deity Symbols', hi: 'प्रतीक मीमांसा', mr: '🔱 देव प्रतीक रहस्य' }, icon: Shield },
    { id: 'live-darshan', label: { en: 'Live Darshan', hi: 'सीधा मन्दिर दर्शन', mr: '🔴 थेट मंदिर दर्शन' }, icon: Radio },
  ];

  // If Admin is logged in, append Admin Panel tab
  const adminTab = currentUser?.role === 'admin'
    ? [
        {
          id: 'admin',
          label: { en: 'Admin Panel', hi: 'प्रशासक कक्ष', mr: '👑 ॲडमिन कक्ष' },
          icon: Crown,
        },
      ]
    : [];

  // Dedicated Login / Logout tab button for direct visibility across all screens
  const authTab = currentUser
    ? {
        id: 'auth_logout_action',
        label: { en: 'Logout', hi: 'लॉगआउट', mr: `🚪 लॉगआउट (${currentUser.role === 'admin' ? 'Admin' : currentUser.name.split(' ')[0]})` },
        icon: LogOut,
      }
    : {
        id: 'auth_login_action',
        label: { en: 'Login / Sign In', hi: 'लॉगिन / प्रवेश', mr: '👤 लॉगिन करा' },
        icon: User,
      };

  const unifiedTabs = [...baseTabs, ...adminTab, authTab];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'auth_login_action') {
      onOpenAuthModal?.();
      return;
    }
    if (tabId === 'auth_logout_action') {
      onLogout?.();
      return;
    }
    onTabChange(tabId);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#14120f]/95 backdrop-blur-md border-b border-stone-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg ring-1 cursor-pointer transition-all bg-gradient-to-tr from-saffron-700 via-saffron-500 to-amber-400 shadow-saffron-900/30 ring-amber-300/40"
              onClick={() => onTabChange('home')}
            >
              <span className="text-xl sm:text-2xl select-none">🕉️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-lg sm:text-xl font-bold tracking-tight text-white font-serifDev cursor-pointer"
                  onClick={() => onTabChange('home')}
                >
                  MantraSetu
                </span>

                {/* 50 Deities Quick Shortcut Pill */}
                <button
                  onClick={() => onTabChange('deities')}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                    activeTab === 'deities' || activeTab === 'god-detail'
                      ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white border-amber-300 shadow-sm'
                      : 'bg-stone-900 text-amber-300 border-amber-500/40 hover:bg-stone-800'
                  }`}
                >
                  <span>🪷</span>
                  <span>{currentLang === 'en' ? '50 Deities Tab' : '५० देव-देवता'}</span>
                </button>

                {/* Special Admin Indicator Pill if logged in as Admin */}
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => onTabChange('admin')}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border animate-pulse ${
                      activeTab === 'admin'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-yellow-200 shadow-md font-bold'
                        : 'bg-amber-950/80 text-amber-300 border-amber-400/60 hover:bg-amber-900'
                    }`}
                    title="Open Creator Admin Command Center"
                  >
                    <span>👑</span>
                    <span>Admin</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {currentLang === 'en' ? 'Complete 50 Deities & Simhastha Kumbh Portal' : 'सर्व ५० देव-देवता व सिंहस्थ कुंभमेळा महादालन'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {unifiedTabs.slice(0, 7).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-saffron-600/20 text-saffron-400 border border-saffron-500/30 shadow-inner'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-saffron-400' : 'text-stone-400'}`} />
                  <span>{tab.label[currentLang]}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: AI Assistant, Auth Profile, Theme Toggle, Glossary, Install App & Multilingual Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Universal Global Search Trigger Button (Ctrl + K) */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 hover:border-amber-400 shadow-sm transition-all"
                title="Search Deities, Mantras, Temples, Festivals (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline text-stone-300">
                  {currentLang === 'en' ? 'Search' : 'सर्व शोधा'}
                </span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono text-stone-400 border border-stone-800">
                  Ctrl K
                </kbd>
              </button>
            )}

            {/* Namaste Hands Greeting Video Modal Trigger */}
            {onOpenNamaste && (
              <button
                onClick={onOpenNamaste}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-200 bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 shadow-sm transition-all transform hover:scale-105"
                title={currentLang === 'en' ? 'Watch Namaste Greeting' : 'पावन नमस्ते स्वागत पहा'}
              >
                <span className="text-sm">🙏</span>
                <span className="hidden md:inline font-serifDev">
                  {currentLang === 'en' ? 'Namaste' : 'नमस्ते'}
                </span>
              </button>
            )}

            {/* Overpowered AI Assistant Trigger Button in Navbar */}
            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 shadow-md shadow-saffron-950 transition-all transform hover:scale-105 border border-amber-300/40"
                title="Divine AI Guru & Voice Assistant (12 Languages)"
              >
                <Bot className="w-3.5 h-3.5 text-amber-200" />
                <span className="hidden sm:inline">
                  {currentLang === 'en' ? 'AI Guru' : 'दिव्य AI'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
              </button>
            )}

            {/* User / Admin Authentication Trigger Button & Dropdown */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 transition-all shadow-sm"
                    title="Profile & Settings"
                  >
                    <span className="text-sm">{currentUser.avatar || (currentUser.role === 'admin' ? '👑' : '🙏')}</span>
                    <span className="max-w-[70px] sm:max-w-[90px] truncate font-medium">
                      {currentUser.role === 'admin' ? 'Admin' : currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-stone-400" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#171410] border border-amber-500/30 shadow-2xl p-3 z-50 text-white animate-fadeIn space-y-2">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                            {currentUser.role === 'admin' ? <Crown className="w-3.5 h-3.5 text-amber-400" /> : <User className="w-3.5 h-3.5" />}
                            {currentUser.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                            {currentUser.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-mono truncate">
                          {currentUser.phone || currentUser.email || 'Devotee Account'}
                        </p>
                      </div>

                      {/* Admin Panel Direct Link */}
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            onTabChange('admin');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-200" />
                          <span>अ‍ॅडमिन कमांड सेंटर उघडा</span>
                        </button>
                      )}

                      {/* Logout Button inside dropdown */}
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full py-1.5 px-3 rounded-xl bg-stone-800 hover:bg-red-950/60 hover:text-red-300 text-stone-300 text-xs font-semibold flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>लॉगआउट करा (Sign Out)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct 1-Click Logout Button in Top Bar */}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-red-100 bg-red-600/80 hover:bg-red-500 border border-red-400/50 transition-all shadow-md hover:scale-105"
                  title="लॉगआउट करा (Logout)"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-200" />
                  <span className="hidden sm:inline">लॉगआउट</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 shadow-md border border-amber-300 ring-2 ring-amber-400/40 transition-all hover:scale-105"
                title="Sadhaka Login (Phone OTP / Google) or Admin Login"
              >
                <User className="w-3.5 h-3.5 text-amber-200" />
                <span>{currentLang === 'en' ? 'Login' : 'लॉगिन करा'}</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={currentTheme === 'light' ? 'Switch to Dark Mode (रात्री ध्यान)' : 'Switch to Light Mode (प्रकाशमय)'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-500 transition-all shadow-sm"
            >
              {currentTheme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden lg:inline text-xs font-medium">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden lg:inline text-xs font-medium">Dark</span>
                </>
              )}
            </button>

            {/* Install App Button */}
            <button
              onClick={handleInstallClick}
              title="Install App on Phone / Desktop"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 shadow-md shadow-saffron-950 transition-all ${
                isInstallable ? 'animate-pulse ring-1 ring-amber-300' : ''
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">
                {currentLang === 'en' ? 'Install' : 'इन्स्टॉल'}
              </span>
            </button>

            {/* Cultural Explainer Button */}
            <button
              onClick={onOpenGlossary}
              title="What is this? Cultural term explainer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-200 bg-amber-950/40 border border-amber-800/50 hover:bg-amber-900/40 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">
                {currentLang === 'en' ? 'Help' : 'मदत'}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-stone-900 rounded-lg p-0.5 border border-stone-800">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                  currentLang === 'en'
                    ? 'bg-saffron-600 text-white shadow-sm font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                  currentLang === 'hi'
                    ? 'bg-saffron-600 text-white shadow-sm font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => onLanguageChange('mr')}
                className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                  currentLang === 'mr'
                    ? 'bg-saffron-600 text-white shadow-sm font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Navigation Bar (All Devices) */}
      <div className="flex overflow-x-auto no-scrollbar py-2 px-3 gap-2 border-t border-stone-800/80 bg-stone-950/90 max-w-7xl mx-auto">
        {unifiedTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md font-semibold'
                  : tab.id === 'auth_login_action'
                  ? 'bg-gradient-to-r from-amber-600 to-saffron-600 text-white font-bold border border-amber-300 animate-pulse'
                  : tab.id === 'auth_logout_action'
                  ? 'bg-red-950/70 text-red-200 border border-red-800 hover:bg-red-900 font-bold'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label[currentLang]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

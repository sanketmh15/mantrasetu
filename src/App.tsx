import { useState, useEffect } from 'react';
import { Language, DeityId, ThemeMode, TextSize, AuthUser } from './types';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { DeitiesDirectory } from './components/DeitiesDirectory';
import { GodDetailView } from './components/GodDetailView';
import { OverpoweredChatbot } from './components/OverpoweredChatbot';
import { WelcomeGreetingBanner } from './components/WelcomeGreetingBanner';
import { AuthModal } from './components/AuthModal';
import { Hero } from './components/Hero';
import { GaneshaHero } from './components/GaneshaHero';
import { ShivaHero } from './components/ShivaHero';
import { VitthalHero } from './components/VitthalHero';
import { IntentSelector } from './components/IntentSelector';
import { JapaCounter } from './components/JapaCounter';
import { ChalisaReader } from './components/ChalisaReader';
import { MantrasGrid } from './components/MantrasGrid';
import { WorshipGuide } from './components/WorshipGuide';
import { TempleDirectory } from './components/TempleDirectory';
import { MaharashtraDirectory } from './components/MaharashtraDirectory';
import { AshtavinayakCircuit } from './components/AshtavinayakCircuit';
import { JyotirlingaCircuit } from './components/JyotirlingaCircuit';
import { WariRouteVisualizer } from './components/WariRouteVisualizer';
import { PilgrimagePlanner } from './components/PilgrimagePlanner';
import { DevotionalCalendar } from './components/DevotionalCalendar';
import { KumbhMelaGuide } from './components/KumbhMelaGuide';
import { CulturalGlossary } from './components/CulturalGlossary';
import { DevotionalBackground } from './components/DevotionalBackground';
import { NamasteGreetingModal } from './components/NamasteGreetingModal';
import { VirtualPujaSanctum } from './components/VirtualPujaSanctum';
import { LiveMuhuratChoghadiya } from './components/LiveMuhuratChoghadiya';
import { MeditationSleepSounds } from './components/MeditationSleepSounds';
import { DevotionalStatusCard } from './components/DevotionalStatusCard';
import { NearbyTemplesGuide } from './components/NearbyTemplesGuide';
import { SatvikPrasadFastingGuide } from './components/SatvikPrasadFastingGuide';
import { PujaShoppingChecklist } from './components/PujaShoppingChecklist';
import { FestivalPrepGuide } from './components/FestivalPrepGuide';
import { VratProcedureGuide } from './components/VratProcedureGuide';
import { PersonalDevotionalLibrary } from './components/PersonalDevotionalLibrary';
import { Temple3DExplorer } from './components/Temple3DExplorer';
import { DevotionalWallpaperCreator } from './components/DevotionalWallpaperCreator';
import { ShlokaScanner } from './components/ShlokaScanner';
import { DigitalDevotionalLibrary } from './components/DigitalDevotionalLibrary';
import { StoriesForChildren } from './components/StoriesForChildren';
import { DeitySymbolismExplorer } from './components/DeitySymbolismExplorer';
import { LiveTempleDarshan } from './components/LiveTempleDarshan';
import { RashiGuideCalculator } from './components/RashiGuideCalculator';
import { AudioBhajanHub } from './components/AudioBhajanHub';
import { DailyNotificationReminder } from './components/DailyNotificationReminder';
import { SatvikDevotionalStore } from './components/SatvikDevotionalStore';
import { UniversalGlobalSearch } from './components/UniversalGlobalSearch';
import { Footer } from './components/Footer';
import { fiftyGodsList } from './data/fiftyGods';
import { ganeshaMantrasData } from './data/ganeshaMantras';
import { shivaMantrasData } from './data/shivaMantras';
import { vitthalMantrasData } from './data/vitthalMantras';
import { mantrasData } from './data/mantras';
import { audioEngine } from './utils/audioSynth';
import { getStoredTheme, saveTheme, getStoredTextSize, saveTextSize, recordChantIncrement, getStoredJapaStats, saveJapaStats } from './utils/storage';
import { getCurrentUser, logoutUser } from './utils/authService';
import { AppActionHandlers } from './utils/aiCommandInterpreter';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('mr'); // Default to Marathi
  const [activeDeity, setActiveDeity] = useState<DeityId>('hanuman');
  const [activeTab, setActiveTab] = useState<string>('home'); // Default to Home Dashboard
  const [selectedMantraId, setSelectedMantraId] = useState<string>('om-hanumate-namah');
  const [selectedGodId, setSelectedGodId] = useState<string>('hanuman');
  const [previousTab, setPreviousTab] = useState<string>('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isNamasteOpen, setIsNamasteOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('mantrasetu_namaste_dismissed') !== 'true';
    } catch {
      return true;
    }
  });
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(getCurrentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const [textSize, setTextSize] = useState<TextSize>(getStoredTextSize);

  // Sync authentication state changes across components
  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('mantrasetu_auth_change', handleAuthChange);
    return () => window.removeEventListener('mantrasetu_auth_change', handleAuthChange);
  }, []);

  // Global Ctrl + K Universal Search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync Light/Dark theme class with DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  // Sync Senior Citizen Text Size with DOM
  useEffect(() => {
    document.documentElement.classList.remove('text-size-large', 'text-size-xlarge');
    if (textSize === 'large') {
      document.documentElement.classList.add('text-size-large');
    } else if (textSize === 'xlarge') {
      document.documentElement.classList.add('text-size-xlarge');
    }
    saveTextSize(textSize);
  }, [textSize]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleChangeTextSize = (newSize: TextSize) => {
    setTextSize(newSize);
  };

  const handleDeityChange = (deity: DeityId) => {
    setActiveDeity(deity);
    setSelectedGodId(deity);
    if (deity === 'ganesha') {
      setSelectedMantraId('om-gam-ganapataye-namaha');
    } else if (deity === 'shiva') {
      setSelectedMantraId('maha-mrityunjaya-mantra');
    } else if (deity === 'vitthal') {
      setSelectedMantraId('ram-krishna-hari');
    } else {
      setSelectedMantraId('om-hanumate-namah');
    }
  };

  const handleOpenGodDetail = (godId: string, fromTab: string = activeTab) => {
    setPreviousTab(fromTab);
    setSelectedGodId(godId);
    if (['hanuman', 'ganesha', 'shiva', 'vitthal'].includes(godId)) {
      setActiveDeity(godId as DeityId);
    }
    setActiveTab('god-detail');
    audioEngine.playTempleBell();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectIntent = (targetTab: string, mantraId?: string) => {
    if (mantraId) {
      setSelectedMantraId(mantraId);
    }
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenJapaWithMantra = (mantraId: string) => {
    setSelectedMantraId(mantraId);
    setActiveTab('japa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMantrasList =
    activeDeity === 'ganesha'
      ? ganeshaMantrasData
      : activeDeity === 'shiva'
      ? shivaMantrasData
      : activeDeity === 'vitthal'
      ? vitthalMantrasData
      : mantrasData;

  const currentGodObj = fiftyGodsList.find((g) => g.id === selectedGodId) || fiftyGodsList[0];

  const appActionHandlers: AppActionHandlers = {
    navigateTab: (tab: string) => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    openGodDetail: (godId: string) => {
      setSelectedGodId(godId);
      setActiveTab('god-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    changeLanguage: (lang: Language) => {
      setCurrentLang(lang);
    },
    setTheme: (newTheme: ThemeMode) => {
      setTheme(newTheme);
    },
    setTextSize: (newSize: TextSize) => {
      setTextSize(newSize);
    },
    incrementJapa: (amount = 1) => {
      audioEngine.playBeadClick();
      const updated = recordChantIncrement(amount);
      return { count: updated.todayCount, todayTotal: updated.totalChants };
    },
    resetJapa: () => {
      const stats = getStoredJapaStats();
      stats.todayCount = 0;
      saveJapaStats(stats);
      audioEngine.playBeadClick();
    },
    playTempleBell: () => {
      audioEngine.playTempleBell();
    },
    playShankha: () => {
      audioEngine.playShankha();
    },
    startTanpura: () => {
      audioEngine.startTanpura();
    },
    stopTanpura: () => {
      audioEngine.stopTanpura();
    },
    stopAudio: () => {
      audioEngine.stopSpeaking();
      audioEngine.stopTanpura();
    },
    openGlossary: () => {
      setIsGlossaryOpen(true);
    },
    openLoginModal: () => {
      setIsAuthModalOpen(true);
    },
    logout: () => {
      logoutUser();
      if (activeTab === 'admin') {
        setActiveTab('home');
      }
    },
    getAppState: () => ({
      activeTab,
      currentLang,
      theme,
      selectedGodId,
    }),
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-transparent text-stone-900 dark:text-stone-100 selection:bg-saffron-600 selection:text-white relative transition-colors duration-200">
      {/* Live Animated Devotional Background */}
      <DevotionalBackground activeDeity={activeDeity} activeTab={activeTab} />

      {/* Main Content Area (pb-16 on mobile for bottom navigation dock) */}
      <div className="relative z-10 flex flex-col flex-grow w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
        {/* Top Navigation */}
        <Navbar
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          activeDeity={activeDeity}
          onDeityChange={handleDeityChange}
          currentTheme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onOpenNamaste={() => setIsNamasteOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          currentUser={currentUser}
          onLogout={() => {
            logoutUser();
            if (activeTab === 'admin') setActiveTab('home');
          }}
        />

      {/* Devotional Welcome Greeting Banner on Page Load / Change */}
      <WelcomeGreetingBanner
        currentLang={currentLang}
        activeTab={activeTab}
        selectedGodName={currentGodObj?.name[currentLang]}
        selectedGodGreeting={currentGodObj?.welcomeGreeting[currentLang]}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {/* 1. DEFAULT OPENING PAGE: PERSONALIZED DEVOTIONAL HOME DASHBOARD */}
        {activeTab === 'home' && (
          <HomeDashboard
            currentLang={currentLang}
            activeDeity={activeDeity}
            onSelectDeity={(deity) => {
              handleDeityChange(deity);
            }}
            onOpenGodDetail={(godId) => {
              handleOpenGodDetail(godId, 'home');
            }}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentTheme={theme}
            onToggleTheme={handleToggleTheme}
            textSize={textSize}
            onChangeTextSize={handleChangeTextSize}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenNamaste={() => setIsNamasteOpen(true)}
            onLogout={() => {
              logoutUser();
            }}
          />
        )}

        {/* 2. UNIFIED SINGLE TAB FOR ALL 50 DEITIES (SERIAL-WISE CLICKABLE CARDS) */}
        {activeTab === 'deities' && (
          <DeitiesDirectory
            currentLang={currentLang}
            onSelectGod={(godId) => {
              handleOpenGodDetail(godId, 'deities');
            }}
          />
        )}

        {/* 3. INDIVIDUAL GOD'S DEDICATED PAGE */}
        {activeTab === 'god-detail' && (
          <GodDetailView
            godId={selectedGodId}
            currentLang={currentLang}
            onBack={() => {
              setActiveTab(previousTab || 'home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2. SHRINE VIEW: INDIVIDUAL DEITY HEROS & STORY HIGHLIGHTS */}
        {activeTab === 'shrine' && (
          <>
            {activeDeity === 'hanuman' && (
              <>
                <Hero currentLang={currentLang} onNavigate={setActiveTab} />
                <IntentSelector currentLang={currentLang} onSelectIntent={handleSelectIntent} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>📿</span>
                        <span>{currentLang === 'en' ? 'Quick 108 Japa Counter' : '१०८ नामस्मरण जपमाळ'}</span>
                      </h3>
                      <JapaCounter currentLang={currentLang} preselectedMantraId="om-hanumate-namah" availableMantras={mantrasData} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>📖</span>
                        <span>{currentLang === 'en' ? 'Hanuman Chalisa Highlights' : 'हनुमान चालीसा'}</span>
                      </h3>
                      <ChalisaReader currentLang={currentLang} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDeity === 'ganesha' && (
              <>
                <GaneshaHero currentLang={currentLang} onNavigate={setActiveTab} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>📿</span>
                        <span>{currentLang === 'en' ? '108 Ganesha Japa Counter' : '१०८ गणेश जपमाळ'}</span>
                      </h3>
                      <JapaCounter currentLang={currentLang} preselectedMantraId="om-gam-ganapataye-namaha" availableMantras={ganeshaMantrasData} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>🐘</span>
                        <span>{currentLang === 'en' ? 'Ashtavinayak Circuit Preview' : 'अष्टविनायक यात्रा दर्शन'}</span>
                      </h3>
                      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-amber-900/40 text-center shadow-md">
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                          {currentLang === 'en'
                            ? 'Explore the 8 holy Swayambhu Ganeshas of Maharashtra in prescribed pilgrimage order, with route sequence, history, and Google Maps.'
                            : 'महाराष्ट्रातील आठ स्वयंभू गणपतींची पावन यात्रा, रस्ता, इतिहास आणि गुगल मॅप्स मार्गदर्शनासह एक्सप्लोर करा.'}
                        </p>
                        <button
                          onClick={() => setActiveTab('ashtavinayak')}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-md"
                        >
                          {currentLang === 'en' ? 'Open Full Ashtavinayak Guide' : 'संपूर्ण अष्टविनायक मार्गदर्शक पहा'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDeity === 'shiva' && (
              <>
                <ShivaHero currentLang={currentLang} onNavigate={setActiveTab} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>📿</span>
                        <span>{currentLang === 'en' ? 'Maha Mrityunjaya Japa Counter' : '१०८ महामृत्युंजय जपमाळ'}</span>
                      </h3>
                      <JapaCounter
                        currentLang={currentLang}
                        preselectedMantraId="maha-mrityunjaya-mantra"
                        availableMantras={shivaMantrasData}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>🔱</span>
                        <span>{currentLang === 'en' ? '5 Maharashtra Jyotirlingas' : 'महाराष्ट्रातील ५ ज्योतिर्लिंगे'}</span>
                      </h3>
                      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-blue-900/40 text-center shadow-md">
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                          {currentLang === 'en'
                            ? 'Discover Trimbakeshwar, Bhimashankar, Grishneshwar, Aundha Nagnath & Parli Vaijnath with scriptural lore, holy rivers, and Google Maps directions.'
                            : 'त्र्यंबकेश्वर, भीमाशंकर, घृष्णेश्वर, औंढा नागनाथ व परळी वैजनाथ या पाचही पावन ज्योतिर्लिंगांचे इतिहास, नद्या व गुगल मॅप्स दर्शनासह एक्सप्लोर करा.'}
                        </p>
                        <button
                          onClick={() => setActiveTab('jyotirlinga')}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md"
                        >
                          {currentLang === 'en' ? 'Explore 5 Jyotirlingas' : '५ ज्योतिर्लिंग दर्शन यात्रा पहा'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDeity === 'vitthal' && (
              <>
                <VitthalHero currentLang={currentLang} onNavigate={setActiveTab} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>📿</span>
                        <span>{currentLang === 'en' ? 'Ram Krishna Hari 108 Japa' : '१०८ रामकृष्णहरि जपमाळ'}</span>
                      </h3>
                      <JapaCounter
                        currentLang={currentLang}
                        preselectedMantraId="ram-krishna-hari"
                        availableMantras={vitthalMantrasData}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>🚩</span>
                        <span>{currentLang === 'en' ? 'Pandharpur Wari Palkhi Route' : 'पंढरपूर आषाढी वारी दर्शन'}</span>
                      </h3>
                      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-amber-900/40 text-center shadow-md">
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                          {currentLang === 'en'
                            ? 'Follow the 14 sacred halts of Sant Dnyaneshwar Maharaj Palkhi from Alandi to Pandharpur, Dive Ghat, Neera Snan, and the thrilling Ringan ceremonies.'
                            : 'आळंदी ते पंढरपूर २५५ किमीचा माऊली पालखी सोहळा, दिवे घाट आणि विहंगम अश्व रिंगणांची पावन माहिती पहा.'}
                        </p>
                        <button
                          onClick={() => setActiveTab('wari')}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-md"
                        >
                          {currentLang === 'en' ? 'Explore Wari Palkhi Marg' : 'संपूर्ण वारी पालखी मार्ग पहा'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* 3. ASHTAVINAYAK CIRCUIT TAB */}
        {activeTab === 'ashtavinayak' && (
          <AshtavinayakCircuit currentLang={currentLang} />
        )}

        {/* 4. JYOTIRLINGA CIRCUIT TAB */}
        {activeTab === 'jyotirlinga' && (
          <JyotirlingaCircuit currentLang={currentLang} />
        )}

        {/* 5. PANDHARPUR WARI TAB */}
        {activeTab === 'wari' && (
          <WariRouteVisualizer currentLang={currentLang} />
        )}

        {/* 6. HANUMAN CHALISA TAB */}
        {activeTab === 'chalisa' && (
          <ChalisaReader currentLang={currentLang} />
        )}

        {/* 7. JAPA COUNTER TAB */}
        {activeTab === 'japa' && (
          <JapaCounter
            currentLang={currentLang}
            preselectedMantraId={selectedMantraId}
            availableMantras={currentMantrasList}
          />
        )}

        {/* 8. MANTRAS TAB */}
        {activeTab === 'mantras' && (
          <MantrasGrid
            currentLang={currentLang}
            onOpenJapa={handleOpenJapaWithMantra}
            mantrasList={currentMantrasList}
            customTitle={
              activeDeity === 'ganesha'
                ? { en: 'Ganesha Mantras, Atharvashirsha & Aarti', hi: 'श्री गणेश मन्त्र, अथर्वशीर्ष एवं आरती', mr: 'श्री गणेश मंत्र, अथर्वशीर्ष व आरत्या' }
                : activeDeity === 'shiva'
                ? { en: 'Maha Mrityunjaya, Shiva Tandava & Mantras', hi: 'महामृत्युंजय मन्त्र, शिव तांडव स्तोत्र एवं आरती', mr: 'महामृत्युंजय मंत्र, शिव तांडव स्तोत्र व आरती' }
                : activeDeity === 'vitthal'
                ? { en: 'Vitthal Mantras, Haripath & Abhangas', hi: 'श्री विठ्ठल मन्त्र, हरिपाठ एवं अभंग', mr: 'श्री विठ्ठल मंत्र, हरिपाठ व संत अभंग' }
                : { en: 'Hanuman Mantras, Stotras & Aarti', hi: 'श्री हनुमान मन्त्र, स्तोत्र एवं आरती', mr: 'श्री मारुती मंत्र, स्तोत्रे व आरती' }
            }
          />
        )}

        {/* 9. PILGRIMAGE PLANNER TAB */}
        {activeTab === 'pilgrimage' && (
          <PilgrimagePlanner currentLang={currentLang} />
        )}

        {/* 10. DEVOTIONAL CALENDAR & PANCHANG TAB */}
        {activeTab === 'calendar' && (
          <DevotionalCalendar
            currentLang={currentLang}
            onOpenJapaWithMantra={handleOpenJapaWithMantra}
          />
        )}

        {/* 11. MAHARASHTRA DIRECTORY TAB */}
        {activeTab === 'maharashtra' && (
          <MaharashtraDirectory currentLang={currentLang} />
        )}

        {/* 12. WORSHIP GUIDE TAB */}
        {activeTab === 'worship' && (
          <WorshipGuide
            currentLang={currentLang}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectDeity={(godId) => {
              handleOpenGodDetail(godId, 'worship');
            }}
          />
        )}

        {/* 13. HANUMAN TEMPLES TAB */}
        {activeTab === 'temples' && (
          <TempleDirectory currentLang={currentLang} />
        )}

        {/* 14. SIMHASTHA KUMBH MELA TAB */}
        {activeTab === 'kumbh' && (
          <KumbhMelaGuide currentLang={currentLang} />
        )}

        {/* 15. DEVOTEE WELCOME (FORMER ADMIN TAB REDIRECT) */}
        {activeTab === 'admin' && (
          <div className="max-w-md mx-auto my-16 p-8 text-center bg-white dark:bg-[#16130f] rounded-3xl border border-amber-300 dark:border-amber-900 shadow-2xl">
            <span className="text-4xl">🙏</span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-3 font-serifDev">
              सनातन अमृतधारा - साधक कक्ष
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              सर्व भक्तांसाठी सनातन साधना, नित्य पूजा, थेट दर्शन व जपमाळ उपलब्ध आहे.
            </p>
            <button
              onClick={() => setActiveTab('home')}
              className="mt-5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              मुख्य पृष्ठावर जा (Go to Home)
            </button>
          </div>
        )}

        {/* 16. VIRTUAL E-PUJA & AARTI SANCTUM TAB */}
        {activeTab === 'puja' && (
          <VirtualPujaSanctum currentLang={currentLang} onNavigateTab={setActiveTab} />
        )}

        {/* 17. LIVE CHOGHADIYA & MUHURAT TAB */}
        {activeTab === 'choghadiya' && (
          <LiveMuhuratChoghadiya currentLang={currentLang} />
        )}

        {/* 18. MEDITATION & SLEEP SOUNDS TAB */}
        {activeTab === 'meditation' && (
          <MeditationSleepSounds currentLang={currentLang} />
        )}

        {/* 19. DEVOTIONAL STATUS CARD GENERATOR TAB */}
        {activeTab === 'status-card' && (
          <DevotionalStatusCard currentLang={currentLang} />
        )}

        {/* 20. NEARBY ANCIENT TEMPLES GPS GUIDE TAB */}
        {activeTab === 'nearby-temples' && (
          <NearbyTemplesGuide currentLang={currentLang} />
        )}

        {/* 21. SATVIK PRASAD & FASTING GUIDE TAB */}
        {activeTab === 'satvik' && (
          <SatvikPrasadFastingGuide currentLang={currentLang} />
        )}

        {/* 22. PUJA SHOPPING CHECKLIST TAB */}
        {activeTab === 'checklist' && (
          <PujaShoppingChecklist currentLang={currentLang} />
        )}

        {/* 23. FESTIVAL PREPARATION TAB */}
        {activeTab === 'festival-prep' && (
          <FestivalPrepGuide currentLang={currentLang} />
        )}

        {/* 24. TRADITIONAL VRAT PROCEDURES TAB */}
        {activeTab === 'vrat' && (
          <VratProcedureGuide currentLang={currentLang} />
        )}

        {/* 25. PERSONAL DEVOTIONAL LIBRARY & OFFLINE VAULT TAB */}
        {activeTab === 'library' && (
          <PersonalDevotionalLibrary
            currentLang={currentLang}
            onNavigateTab={setActiveTab}
            onOpenGodDetail={handleOpenGodDetail}
          />
        )}

        {/* 26. 3D TEMPLE EXPLORER TAB */}
        {activeTab === 'temple-3d' && (
          <Temple3DExplorer currentLang={currentLang} />
        )}

        {/* 27. DEVOTIONAL WALLPAPER CREATOR TAB */}
        {activeTab === 'wallpaper' && (
          <DevotionalWallpaperCreator currentLang={currentLang} />
        )}

        {/* 28. SHLOKA SCANNER & OCR TAB */}
        {activeTab === 'scanner' && (
          <ShlokaScanner currentLang={currentLang} />
        )}

        {/* 29. DIGITAL DEVOTIONAL LIBRARY & SCRIPTURES TAB */}
        {activeTab === 'digital-library' && (
          <DigitalDevotionalLibrary
            currentLang={currentLang}
            onNavigateTab={setActiveTab}
            onOpenGodDetail={handleOpenGodDetail}
          />
        )}

        {/* 30. STORIES FOR CHILDREN (BAL SANSKAR) TAB */}
        {activeTab === 'stories' && (
          <StoriesForChildren currentLang={currentLang} />
        )}

        {/* 31. DEITY SYMBOLISM EXPLORER TAB */}
        {activeTab === 'symbolism' && (
          <DeitySymbolismExplorer currentLang={currentLang} />
        )}

        {/* 32. LIVE TEMPLE DARSHAN TAB */}
        {activeTab === 'live-darshan' && (
          <LiveTempleDarshan currentLang={currentLang} />
        )}

        {/* 33. RASHI & ISHTA DEVATA CALCULATOR TAB */}
        {activeTab === 'rashi' && (
          <RashiGuideCalculator
            currentLang={currentLang}
            onOpenJapaWithMantra={handleOpenJapaWithMantra}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* 34. AUDIO BHAJAN & BHUPALI HUB TAB */}
        {activeTab === 'bhajan' && (
          <AudioBhajanHub currentLang={currentLang} />
        )}

        {/* 35. DAILY NOTIFICATIONS & REMINDER TAB */}
        {activeTab === 'reminders' && (
          <DailyNotificationReminder currentLang={currentLang} />
        )}

        {/* 36. SATVIK DEVOTIONAL STORE TAB */}
        {activeTab === 'store' && (
          <SatvikDevotionalStore currentLang={currentLang} />
        )}
      </main>

      {/* Cultural Explainer Modal */}
      <CulturalGlossary
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        currentLang={currentLang}
      />

      {/* Real Devotee User Login Modal (Phone OTP, Google 1-Click & Email) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLang={currentLang}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Overpowered AI Chatbot Modal (12 Languages + Voice Assistant + Autonomous App Commander) */}
      <OverpoweredChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        currentLang={currentLang}
        appActions={appActionHandlers}
      />

      {/* Grand Opening Namaste Greeting Video & Voiceover Modal */}
      <NamasteGreetingModal
        isOpen={isNamasteOpen}
        onClose={() => setIsNamasteOpen(false)}
        currentLang={currentLang}
      />

      {/* Universal Global Search Palette Modal (Ctrl + K) */}
      <UniversalGlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currentLang={currentLang}
        onNavigateTab={setActiveTab}
        onOpenGodDetail={handleOpenGodDetail}
      />

      {/* Floating Divine AI Guide Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-saffron-950/60 border border-amber-300/40 hover:scale-105 transition-all group"
        title="Ask Divine AI in 12 Languages with Voice Assistant"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🤖</span>
        <span className="font-serifDev">
          {currentLang === 'en' ? 'Divine AI Guide' : currentLang === 'hi' ? 'दिव्य AI मार्गदर्शक' : 'दिव्य AI सहाय्यक'}
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>

        {/* Footer */}
        <Footer
          currentLang={currentLang}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={() => {
            logoutUser();
            if (activeTab === 'admin') setActiveTab('home');
          }}
        />
      </div>
    </div>
  );
}

export default App;

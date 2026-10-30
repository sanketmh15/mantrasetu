import { useState, useEffect } from 'react';
import { Language } from '../types';
import { audioEngine } from '../utils/audioSynth';
import {
  Bell,
  BellRing,
  Sun,
  Moon,
  Clock,
  ShieldCheck,
  Sparkles,
  Volume2,
} from 'lucide-react';

interface DailyNotificationReminderProps {
  currentLang: Language;
}

interface ReminderConfig {
  morningSuprabhatam: boolean;
  choghadiyaAlert: boolean;
  eveningAarti: boolean;
}

const STORAGE_KEY = 'mantrasetu_reminder_settings';

export function DailyNotificationReminder({ currentLang }: DailyNotificationReminderProps) {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [reminders, setReminders] = useState<ReminderConfig>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return {
      morningSuprabhatam: true,
      choghadiyaAlert: true,
      eveningAarti: true,
    };
  });
  const [testSent, setTestSent] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert(currentLang === 'en' ? 'Notifications not supported on this browser.' : 'या ब्राऊझरवर नोटिफिकेशन्स सुविधा उपलब्ध नाही.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission === 'granted') {
        audioEngine.playTempleBell();
        // Send welcome test notification
        new Notification('🚩 मंत्रसेतू: शुभ प्रभात!', {
          body: 'दैनिक सुप्रभातम व आरती नोटिफिकेशन्स यशस्वीरीत्या सुरू झाल्या आहेत. आपला दिवस मंगलमय जावो!',
          icon: './icon.svg',
        });
        setTestSent(true);
      }
    } catch {
      // Permission blocked
    }
  };

  const handleToggleReminder = (key: keyof ReminderConfig) => {
    setReminders((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // quota
      }
      return updated;
    });
  };

  const handleTestNotification = () => {
    audioEngine.playTempleBell();
    if (permissionStatus === 'granted') {
      new Notification('🪔 मंत्रसेतू दैनिक स्मरण', {
        body: 'आजचा शुभ मुहूर्त सुरू झाला आहे. देवाचे नामस्मरण करा आणि १०८ जपमाळ पूर्ण करा.',
        icon: './icon.svg',
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      handleRequestPermission();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-[#1e1308] to-stone-950 border border-amber-600/30 p-6 sm:p-10 mb-8 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Bell className="w-4 h-4 text-amber-300" />
            <span>
              {currentLang === 'en'
                ? 'Daily Suprabhatam & Aarti Reminders'
                : currentLang === 'hi'
                ? 'दैनिक सुप्रभातम एवं आरती स्मरण'
                : 'दैनिक सुप्रभातम, चौघडिया व आरती रिमाइंडर'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serifDev tracking-wide leading-tight">
            {currentLang === 'en'
              ? 'Never Miss Your Sacred Morning & Evening Prayers'
              : currentLang === 'hi'
              ? 'प्रातः सुप्रभातम, अमृत चौघड़िया एवं संध्या आरती की सूचना'
              : 'पहाटेचे सुप्रभातम, अमृत चौघडिया व संध्या आरती सूचना'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-200/80 leading-relaxed">
            {currentLang === 'en'
              ? 'Receive gentle daily notifications at auspicious timings for Brahma Muhurta, daily deity puja, and evening Mahamangala Aarti on your mobile phone or laptop.'
              : currentLang === 'hi'
              ? 'ब्रह्म मुहूर्त, दैनिक वार पूजा एवं सायंकाल महाआरती के समय अपने मोबाइल पर पावन स्मरण प्राप्त करें।'
              : 'रोज सकाळी ब्रह्म मुहूर्तावर, आजचे अमृत चौघडिया सुरू होताना आणि संध्याकाळी महाआरतीच्या वेळी तुमच्या मोबाईलवर आपोआप पावन स्मरण संदेश मिळवा.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {permissionStatus !== 'granted' ? (
              <button
                onClick={handleRequestPermission}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-extrabold text-sm shadow-xl transition-all hover:scale-105"
              >
                <BellRing className="w-4 h-4" />
                <span>
                  {currentLang === 'en' ? 'Enable Daily Reminders' : 'दैनिक सूचना (Reminders) सुरू करा'}
                </span>
              </button>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {currentLang === 'en' ? '✓ Reminders Active on this Device' : '✓ या डिव्हाइसवर सूचना सुरू आहेत'}
              </span>
            )}

            <button
              onClick={handleTestNotification}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black/40 border border-amber-400/30 text-amber-200 hover:text-white text-xs font-semibold transition-all"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{testSent ? '✓ टेस्ट सूचना पाठवली!' : 'टेस्ट सूचना पाठवून पहा'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Schedule Cards */}
      <div className="space-y-4">
        {/* 1. Morning Suprabhatam (05:30 AM) */}
        <div className="bg-white dark:bg-[#16130f] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-2xl">
              <Sun className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  पहाटे ०५:३० वाजता
                </span>
                <span className="text-xs text-stone-500">ब्रह्म मुहूर्त</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serifDev mt-1">
                {currentLang === 'en'
                  ? 'Morning Suprabhatam & Presiding Deity Blessing'
                  : 'पहाटेचे सुप्रभातम व वारानुसार आराध्य देवता आशीर्वाद'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                आजचा वार (उदा. सोमवार महाकाल, मंगळवार मारुती), तिथी व मंगल प्रभात श्लोक.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer self-end sm:self-center">
            <input
              type="checkbox"
              checked={reminders.morningSuprabhatam}
              onChange={() => handleToggleReminder('morningSuprabhatam')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        {/* 2. Choghadiya Alert (08:00 AM) */}
        <div className="bg-white dark:bg-[#16130f] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-2xl">
              <Clock className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  सकाळी ०८:०० वाजता
                </span>
                <span className="text-xs text-stone-500">अमृत / शुभ काळ</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serifDev mt-1">
                {currentLang === 'en'
                  ? 'Daily Auspicious Choghadiya & Rahu Kaal Alert'
                  : 'आजचे शुभ चौघडिया व राहुकाळ सूचना'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                आजचा अमृत व शुभ चौघडिया कोणता आणि आजचा राहुकाळ कधी आहे याचे स्मरण.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer self-end sm:self-center">
            <input
              type="checkbox"
              checked={reminders.choghadiyaAlert}
              onChange={() => handleToggleReminder('choghadiyaAlert')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        {/* 3. Evening Sandhya Aarti (07:00 PM) */}
        <div className="bg-white dark:bg-[#16130f] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-2xl">
              <Moon className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  संध्याकाळी ०७:०० वाजता
                </span>
                <span className="text-xs text-stone-500">दीपपूजा</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serifDev mt-1">
                {currentLang === 'en'
                  ? 'Evening Sandhya Aarti & Temple Bell Chime'
                  : 'संध्याकाळची दीपपूजा व महाआरती स्मरण'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                घरातील देवघरात दिवा लावून संध्या आरती व नामस्मरणाची आठवण.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer self-end sm:self-center">
            <input
              type="checkbox"
              checked={reminders.eveningAarti}
              onChange={() => handleToggleReminder('eveningAarti')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>
      </div>

      {/* Trust & Privacy Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center gap-3 text-xs text-stone-700 dark:text-stone-300">
        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <span>
          {currentLang === 'en'
            ? '100% Private: All reminder preferences are kept strictly on your local browser. No personal data or tracking is collected.'
            : '१००% गोपनीय: तुमच्या सूचनांच्या सर्व वेळा थेट तुमच्या ब्राऊझरमध्ये स्थानिक पातळीवर जतन होतात. कोणतीही वैयक्तिक माहिती गोळा केली जात नाही.'}
        </span>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Language, AuthUser } from '../types';
import { fiftyGodsList } from '../data/fiftyGods';
import { getAdminPhones, addAdminPhone } from '../utils/authService';
import { audioEngine } from '../utils/audioSynth';
import {
  getCustomAudioMap,
  setCustomAudioMapping,
} from '../utils/brahmanAudioService';
import {
  Crown,
  Users,
  Compass,
  Flame,
  ShieldCheck,
  PlusCircle,
  Bell,
  CheckCircle,
  Sparkles,
  LogOut,
  Radio,
  Send,
  Eye,
  Mic,
  Volume2,
  Play,
  Square,
  Music
} from 'lucide-react';

interface AdminPanelProps {
  currentLang: Language;
  currentUser: AuthUser | null;
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenGodDetail?: (godId: string) => void;
}

interface BroadcastAlert {
  id: string;
  time: string;
  category: 'crowd' | 'snan' | 'palkhi' | 'seva';
  title: string;
  message: string;
  priority: 'high' | 'normal';
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentLang,
  currentUser,
  onLogout,
  onNavigateTab,
  onOpenGodDetail,
}) => {
  const [activeSection, setActiveSection] = useState<'metrics' | 'gods' | 'kumbh' | 'security' | 'voice'>('metrics');
  const [adminPhoneList, setAdminPhoneList] = useState<string[]>(getAdminPhones());
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [phoneAddStatus, setPhoneAddStatus] = useState<string | null>(null);

  // Amitabh Bachchan Voice Studio State
  const [audioMap, setAudioMap] = useState<Record<string, string>>(getCustomAudioMap);
  const [testPlayingKey, setTestPlayingKey] = useState<string | null>(null);
  const [selectedGodForAudio, setSelectedGodForAudio] = useState<string>('ganesha');
  const [customAudioInput, setCustomAudioInput] = useState<string>('');
  const [audioSaveMsg, setAudioSaveMsg] = useState<string | null>(null);

  // Search & Filter for 50 Deities
  const [godSearch, setGodSearch] = useState('');
  const [godCategoryFilter, setGodCategoryFilter] = useState('all');

  // Broadcast center state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastCategory, setBroadcastCategory] = useState<'crowd' | 'snan' | 'palkhi' | 'seva'>('snan');
  const [broadcastPriority, setBroadcastPriority] = useState<'normal' | 'high'>('high');
  const [alerts, setAlerts] = useState<BroadcastAlert[]>([
    {
      id: 'alert-1',
      time: '१०:१५ AM',
      category: 'snan',
      title: 'प्रथम शाही स्नान पर्व तयारी सूचना',
      message: 'नाशिक रामकुंड व कुशावर्त तीर्थ येथे साधू-महंतांच्या आखाड्यांसाठी विशेष सुरक्षा व्यवस्था तैनात.',
      priority: 'high',
    },
    {
      id: 'alert-2',
      time: '०९:४० AM',
      category: 'crowd',
      title: 'त्र्यंबकेश्वर दर्शन रांग नियंत्रित',
      message: 'त्र्यंबकेश्वर ज्योतिर्लिंग येथे भक्तांची गर्दी सुरळीत सुरू असून अंदाजे प्रतीक्षा वेळ ४५ मिनिटे आहे.',
      priority: 'normal',
    },
  ]);

  // Live Simulated Chanting activity feed
  const [liveActivity, setLiveActivity] = useState<Array<{ id: number; name: string; action: string; time: string }>>([
    { id: 1, name: 'राहुल शिंदे (पुणे)', action: '१०८ वेळा "राम कृष्ण हरी" जप पूर्ण केला', time: 'आत्ताच' },
    { id: 2, name: 'अमित जोशी (नाशिक)', action: 'श्री मारुती स्तोत्र पठण केले', time: '१ मिनिटापूर्वी' },
    { id: 3, name: 'प्रिया कुलकर्णी (मुंबई)', action: '१०८ वेळा "ॐ नमः शिवाय" जप पूर्ण केला', time: '३ मिनिटांपूर्वी' },
    { id: 4, name: 'गणेश पाटील (कोल्हापूर)', action: 'महालक्ष्मी अष्टकम वाचले', time: '५ मिनिटांपूर्वी' },
    { id: 5, name: 'संदीप पवार (सोलापूर)', action: 'विठ्ठल दर्शन व नामस्मरण पूर्ण केले', time: '८ मिनिटांपूर्वी' },
  ]);

  const handleAddAdminNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newAdminPhone.replace(/\D/g, '');
    if (clean.length !== 10) {
      setPhoneAddStatus('कृपया १० अंकी वैध मोबाईल नंबर प्रविष्ट करा.');
      return;
    }
    addAdminPhone(clean);
    setAdminPhoneList(getAdminPhones());
    setNewAdminPhone('');
    setPhoneAddStatus(`+91 ${clean} यशस्वीरित्या अ‍ॅडमिन म्हणून जोडला गेला!`);
    audioEngine.playTempleBell();
    setTimeout(() => setPhoneAddStatus(null), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) return;

    const newAlert: BroadcastAlert = {
      id: `alert-${Date.now()}`,
      time: new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' }),
      category: broadcastCategory,
      title: broadcastTitle.trim(),
      message: broadcastMsg.trim(),
      priority: broadcastPriority,
    };

    setAlerts([newAlert, ...alerts]);
    setBroadcastTitle('');
    setBroadcastMsg('');
    audioEngine.playShankha();
  };

  const filteredGods = fiftyGodsList.filter((god) => {
    const matchSearch =
      god.name.mr.toLowerCase().includes(godSearch.toLowerCase()) ||
      god.name.en.toLowerCase().includes(godSearch.toLowerCase()) ||
      god.name.hi.toLowerCase().includes(godSearch.toLowerCase());
    const matchCategory = godCategoryFilter === 'all' || god.category === godCategoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Admin Header & Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl text-white">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide">
              <Crown className="w-3.5 h-3.5" />
              <span>॥ अधिकृत अ‍ॅडमिन कमांड केंद्र (Creator Only) ॥</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serifDev text-white">
              {currentUser?.name || 'परम पूज्य अ‍ॅडमिन'}
            </h1>
            
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              मंत्रसेतू महापोर्टलचे सर्व ५० देव-देवता, कुंभमेळा सूचना, साधक नामस्मरण ट्रॅकिंग आणि सुरक्षेचे संपूर्ण नियंत्रण.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-black/50 border border-amber-500/30 text-xs">
              <p className="text-stone-400 text-[10px] uppercase font-mono">लॉगिन स्टेटस</p>
              <p className="text-amber-300 font-bold font-mono">
                {currentUser?.phone || currentUser?.email || '+91 9820012345'}
              </p>
            </div>

            <button
              onClick={() => {
                onLogout();
                onNavigateTab('home');
              }}
              className="px-4 py-2.5 rounded-2xl bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>लॉगआउट (Exit)</span>
            </button>
          </div>
        </div>

        {/* Real-time Quick Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-amber-500/20">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 text-xs mb-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold">एकूण साधक (Devotees)</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold font-mono text-white">१२,४५०+</p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">● २४ तासात +३४२ नवीन</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-saffron-400 text-xs mb-1">
              <Compass className="w-4 h-4" />
              <span className="font-semibold">आजचे एकूण जप (Japa)</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold font-mono text-white">१,०८,४००</p>
            <p className="text-[10px] text-amber-300 font-semibold mt-0.5">१०८ माळा: ९८४ पूर्ण</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-rose-400 text-xs mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-semibold">देव-देवता (Deities)</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold font-mono text-white">५० / ५०</p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">सर्व दालने कार्यरत</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-stone-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-400 text-xs mb-1">
              <Radio className="w-4 h-4" />
              <span className="font-semibold">कुंभमेळा २०२७</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold font-mono text-white">सक्रिय</p>
            <p className="text-[10px] text-indigo-300 font-semibold mt-0.5">थेट प्रसारण केंद्र सज्ज</p>
          </div>
        </div>
      </div>

      {/* 2. Admin Section Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800">
        <button
          onClick={() => setActiveSection('metrics')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeSection === 'metrics'
              ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>साधक कम्युनिटी व नामस्मरण</span>
        </button>

        <button
          onClick={() => setActiveSection('gods')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeSection === 'gods'
              ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>५० देव-देवता व्यवस्थापन</span>
        </button>

        <button
          onClick={() => setActiveSection('kumbh')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeSection === 'kumbh'
              ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>कुंभमेळा ब्रॉडकास्ट सेंटर</span>
        </button>

        <button
          onClick={() => setActiveSection('security')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeSection === 'security'
              ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>अ‍ॅडमिन फोन सुरक्षा</span>
        </button>

        <button
          onClick={() => setActiveSection('voice')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeSection === 'voice'
              ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4 text-amber-300" />
          <span>अमिताभ बच्चन व्हॉईस स्टुडिओ</span>
        </button>
      </div>

      {/* 3. Section Content */}
      
      {/* SECTION 1: SADHAKA COMMUNITY & JAPA METRICS */}
      {activeSection === 'metrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Live Chanting Feed */}
          <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white">
                  थेट नामस्मरण कृती प्रवाह (Live Sadhaka Feed)
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-mono">Real-time</span>
            </div>

            <div className="space-y-3">
              {liveActivity.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-xs transition-all hover:border-amber-400"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                      {act.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">{act.name}</p>
                      <p className="text-stone-500 dark:text-stone-400">{act.action}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-stone-200 dark:bg-stone-800 text-[10px] font-mono text-stone-600 dark:text-stone-300">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const newAct = {
                  id: Date.now(),
                  name: `साधक (${Math.floor(1000 + Math.random() * 9000)})`,
                  action: '१०८ वेळा "श्री गणेशाय नमः" जप पूर्ण केला',
                  time: 'आत्ताच',
                };
                setLiveActivity([newAct, ...liveActivity.slice(0, 5)]);
                audioEngine.playBeadClick();
              }}
              className="w-full py-2.5 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 text-xs font-semibold transition-colors"
            >
              + चाचणी नामस्मरण अपडेट करा (Simulate Chanting Event)
            </button>
          </div>

          {/* Top Devotional Milestones */}
          <div className="rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
              <span>🏆</span>
              <span>साधक विशेष श्रेणी (Milestones)</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">१०८ माळा पूर्ण करणारे साधक</p>
                <p className="text-lg font-bold font-mono text-saffron-600 dark:text-saffron-400 mt-1">१,४२९ साधक</p>
                <div className="w-full h-1.5 rounded-full bg-amber-200 dark:bg-amber-900 mt-2 overflow-hidden">
                  <div className="h-full bg-saffron-500 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">सलग २१ दिवस नामस्मरण सातत्य</p>
                <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">५६४ साधक</p>
                <div className="w-full h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-900 mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40">
                <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">कुंभमेळा २०२७ संकल्प साधक</p>
                <p className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">३,८९० साधक</p>
                <div className="w-full h-1.5 rounded-full bg-indigo-200 dark:bg-indigo-900 mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: 50 DEITIES MANAGEMENT */}
      {activeSection === 'gods' && (
        <div className="rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
                <span>🪷</span>
                <span>सर्व ५० देव-देवता दालन व्यवस्थापन</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                प्रत्येक देवतेची माहिती, मंत्र, चालीसा व प्रतिमांची स्थिती तपासा.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Category Filter */}
              <select
                value={godCategoryFilter}
                onChange={(e) => setGodCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200"
              >
                <option value="all">सर्व वर्ग (All Categories)</option>
                <option value="trideva">त्रिमूर्ती (Trideva)</option>
                <option value="tridevi">त्रिदेवी व महादेवी (Tridevi)</option>
                <option value="kuldaivat">महाराष्ट्र कुलदैवते (Kuldaivat)</option>
                <option value="dashavatara">दशावतार (Dashavatara)</option>
                <option value="shakti_peeth">शक्तीपीठे (Shakti Peeth)</option>
                <option value="saints">संत परंपरा (Saints)</option>
              </select>

              {/* Search */}
              <input
                type="text"
                value={godSearch}
                onChange={(e) => setGodSearch(e.target.value)}
                placeholder="देवतेचे नाव शोधा..."
                className="px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          {/* Grid of Deities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGods.map((god) => (
              <div
                key={god.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-amber-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0">
                    <img
                      src={god.image}
                      alt={god.name[currentLang] || god.name.mr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                        #{god.serialNo}
                      </span>
                      <h4 className="font-bold text-xs text-stone-900 dark:text-white">
                        {god.name[currentLang] || god.name.mr}
                      </h4>
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400">
                      {god.name.en} • {god.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenGodDetail?.(god.id);
                  }}
                  className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:border-amber-400 text-xs font-semibold transition-colors"
                  title="दालन पहा (View God Page)"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: SIMHASTHA KUMBH MELA BROADCAST CENTER */}
      {activeSection === 'kumbh' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Post New Announcement Form */}
          <div className="lg:col-span-1 rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-saffron-500 animate-pulse" />
              <span>नवीन कुंभमेळा सूचना प्रसारित करा</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  प्रकार (Category):
                </label>
                <select
                  value={broadcastCategory}
                  onChange={(e) => setBroadcastCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs"
                >
                  <option value="snan">🌊 शाही स्नान पर्व सूचना</option>
                  <option value="crowd">👥 गर्दी व घाट नियंत्रण</option>
                  <option value="palkhi">🚩 पालखी व आखाडा मिरवणूक</option>
                  <option value="seva">🩺 आरोग्य व अन्नदान सेवा</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  प्राधान्य (Priority):
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastPriority('high')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      broadcastPriority === 'high'
                        ? 'bg-red-500 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    अत्यंत महत्त्वाचे (High Alert)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastPriority('normal')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      broadcastPriority === 'normal'
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    सामान्य (Regular)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  सूचनेचे शीर्षक (Title):
                </label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="उदा. रामकुंड येथे स्नान वेळ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  सविस्तर संदेश (Detailed Alert):
                </label>
                <textarea
                  rows={3}
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="साधकांसाठी संपूर्ण सूचना..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={!broadcastTitle.trim() || !broadcastMsg.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-40 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>थेट प्रसारित करा (Broadcast Live)</span>
              </button>
            </form>
          </div>

          {/* Active Broadcasts Feed */}
          <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>सध्या सुरू असलेल्या कुंभमेळा सूचना (Active Broadcasts)</span>
            </h3>

            <div className="space-y-3">
              {alerts.map((al) => (
                <div
                  key={al.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    al.priority === 'high'
                      ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-400/60'
                      : 'bg-stone-50 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300">
                      {al.category === 'snan'
                        ? 'शाही स्नान'
                        : al.category === 'crowd'
                        ? 'गर्दी नियंत्रण'
                        : al.category === 'palkhi'
                        ? 'पालखी'
                        : 'सेवा'}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">{al.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-1">
                    {al.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {al.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ADMIN PHONE SECURITY & AUTHORIZATION */}
      {activeSection === 'security' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>अ‍ॅडमिन सुरक्षा व्यवस्थापन (Admin Phone Authorization)</span>
            </div>
            <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white">
              अधिकृत अ‍ॅडमिन मोबाईल नंबर
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              केवळ खालील नोंदणीकृत मोबाईल क्रमांकांनाच अ‍ॅडमिन पोर्टल लॉगिनसाठी ओटीपी प्राप्त होईल. अनधिकृत व्यक्तींना लॉगिन पूर्णपणे निषिद्ध आहे.
            </p>
          </div>

          {/* Phone Add Feedback */}
          {phoneAddStatus && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{phoneAddStatus}</span>
            </div>
          )}

          {/* Form to Add New Admin Number */}
          <form onSubmit={handleAddAdminNumber} className="space-y-3">
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
              नवीन अ‍ॅडमिन मोबाईल नंबर जोडा:
            </label>
            <div className="flex gap-2">
              <span className="px-3.5 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={newAdminPhone}
                onChange={(e) => setNewAdminPhone(e.target.value)}
                placeholder="१० अंकी नंबर टाका (उदा. 9820012345)"
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={newAdminPhone.replace(/\D/g, '').length !== 10}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-40 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>जोडा</span>
              </button>
            </div>
          </form>

          {/* Current Registered Admin Phones List */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              सध्याचे अधिकृत अ‍ॅडमिन नंबर ({adminPhoneList.length}):
            </h4>

            <div className="space-y-2">
              {adminPhoneList.map((ph, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-mono font-bold text-stone-900 dark:text-white">
                      +91 {ph}
                    </span>
                    {idx === 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                        मुख्य मालक (Creator)
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    सक्रिय
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: AMITABH BACHCHAN VOICE STUDIO & REAL AUDIO MANAGER */}
      {activeSection === 'voice' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="rounded-3xl bg-white dark:bg-[#16130f] border border-amber-300/40 dark:border-stone-800 p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-saffron-600 text-white text-xs font-bold mb-2 shadow-sm">
                  <Mic className="w-3.5 h-3.5" />
                  <span>॥ अमिताभ बच्चन बॅरिटोन आवाज व ध्वनी नियंत्रण केंद्र ॥</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-stone-900 dark:text-white">
                  अमिताभ बच्चन (Big B) व्हॉईस ओव्हर व ऑडिओ व्यवस्थापन
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  मंत्रसेतूमध्ये सर्व मंत्र, स्वागत अभिवादन व पठणासाठी अमिताभ बच्चन यांच्याप्रमाणेच अतिशय भारदस्त, धीरगंभीर व छातीतून गुंजणारा बॅरिटोन पुरुषी आवाज (Ultra-Deep 0.74 Pitch + 0.82 Cadence) तानपुरा संवादिनीसह डीफॉल्ट सक्रिय आहे.
                </p>
              </div>

              {/* Status Badge */}
              <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-950/80 to-stone-900 border border-amber-500/50 flex items-center gap-2 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <p className="text-[10px] text-amber-300 uppercase font-mono font-bold">व्हॉईस मॉडेल</p>
                  <p className="text-xs font-bold text-white">Amitabh Bachchan Baritone</p>
                </div>
              </div>
            </div>

            {/* Live Audio Test Bench */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>अमिताभ बच्चन आवाज थेट चाचणी (Test Amitabh Bachchan Chanting):</span>
                </h4>
                {testPlayingKey && (
                  <button
                    onClick={() => {
                      audioEngine.stopSpeaking();
                      audioEngine.stopTanpura();
                      setTestPlayingKey(null);
                    }}
                    className="px-3 py-1 rounded-lg bg-red-600/80 text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:bg-red-500 transition-all"
                  >
                    <Square className="w-3 h-3" />
                    <span>आवाज थांबवा</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setTestPlayingKey('ganesh');
                    audioEngine.playTempleBell();
                    audioEngine.playBrahmanChant({
                      text: 'नमस्कार... ॐ गं गणपतये नमः। वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
                      lang: 'hi-IN',
                      withTanpura: true,
                      onEnd: () => setTestPlayingKey(null),
                    });
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    testPlayingKey === 'ganesh'
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-white flex items-center justify-between">
                    <span>श्री गणेश महामंत्र (Big B)</span>
                    <Play className="w-3.5 h-3.5 text-amber-500" />
                  </p>
                  <p className="text-[11px] font-serifDev text-stone-500 dark:text-stone-400 mt-1">
                    "वक्रतुण्ड महाकाय सूर्यकोटि..."
                  </p>
                </button>

                <button
                  onClick={() => {
                    setTestPlayingKey('shiva');
                    audioEngine.playTempleBell();
                    audioEngine.playBrahmanChant({
                      text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
                      lang: 'hi-IN',
                      withTanpura: true,
                      onEnd: () => setTestPlayingKey(null),
                    });
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    testPlayingKey === 'shiva'
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-white flex items-center justify-between">
                    <span>महामृत्युंजय मंत्र (Big B)</span>
                    <Play className="w-3.5 h-3.5 text-indigo-400" />
                  </p>
                  <p className="text-[11px] font-serifDev text-stone-500 dark:text-stone-400 mt-1">
                    "ॐ त्र्यम्बकं यजामहे..."
                  </p>
                </button>

                <button
                  onClick={() => {
                    setTestPlayingKey('chalisa');
                    audioEngine.playTempleBell();
                    audioEngine.playBrahmanChant({
                      text: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि। बरनऊं रघुबर बिमल जसु, जो दायकु फल चारि॥ जय हनुमान ज्ञान गुन सागर, जय कपीस तिहुं लोक उजागर॥',
                      lang: 'hi-IN',
                      withTanpura: true,
                      onEnd: () => setTestPlayingKey(null),
                    });
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    testPlayingKey === 'chalisa'
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-white flex items-center justify-between">
                    <span>श्री हनुमान चालीसा (Big B)</span>
                    <Play className="w-3.5 h-3.5 text-rose-500" />
                  </p>
                  <p className="text-[11px] font-serifDev text-stone-500 dark:text-stone-400 mt-1">
                    "श्रीगुरु चरन सरोज रज..."
                  </p>
                </button>

                <button
                  onClick={() => {
                    setTestPlayingKey('vitthal');
                    audioEngine.playTempleBell();
                    audioEngine.playBrahmanChant({
                      text: 'राम कृष्ण हरी, जय जय राम कृष्ण हरी। पुंडलिक वरदे हरी विठ्ठल, श्री ज्ञानदेव तुकाराम। पंढरीनाथ महाराज की जय॥',
                      lang: 'hi-IN',
                      withTanpura: true,
                      onEnd: () => setTestPlayingKey(null),
                    });
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    testPlayingKey === 'vitthal'
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-white flex items-center justify-between">
                    <span>विठ्ठल गजर (Big B)</span>
                    <Play className="w-3.5 h-3.5 text-amber-500" />
                  </p>
                  <p className="text-[11px] font-serifDev text-stone-500 dark:text-stone-400 mt-1">
                    "राम कृष्ण हरी, जय जय..."
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Guide for Providing Sample Audio Files */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/70 border-2 border-amber-500/50 p-6 sm:p-8 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl">
                🎙️
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serifDev text-white">
                  आपल्या स्वतःच्या ऑडिओ फाईल्स (Sample Voice Files) कशा द्याव्यात?
                </h4>
                <p className="text-xs text-stone-300">
                  जर आपल्याकडे स्थानिक शास्त्री, गुरुजी किंवा पुरोहितांचे स्वतःचे ऑडिओ रेकॉर्डिंग्ज असतील तर:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono">मार्ग १: थेट फोल्डरमध्ये ठेवणे</span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  आपल्या प्रोजेक्टमधील <code className="text-amber-300 font-mono">public/audio/greetings/</code> फोल्डरमध्ये <code className="text-amber-300 font-mono">ganesha.mp3</code>, <code className="text-amber-300 font-mono">shiva.mp3</code> अशी फाईल सेव्ह करा.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono">मार्ग २: ऑनलाइन ऑडिओ लिंक (URL)</span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  आपल्या ऑडिओ फाईलची थेट लिंक (Dropbox, Google Drive किंवा इतर होस्टिंग लिंक) खालील फॉर्ममध्ये पेस्ट करून सेव्ह करा.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono">मार्ग ३: ऑडिओ फाईल पाठवणे</span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  आपण मला sample voice file चे नाव किंवा लिंक दिल्यास, मी त्वरित ते कोडमध्ये सर्व ५० देवतांशी जोडून देईन!
                </p>
              </div>
            </div>
          </div>

          {/* Deity Audio Link Assigner */}
          <div className="rounded-3xl bg-white dark:bg-[#16130f] border border-stone-200 dark:border-stone-800 p-6 shadow-xl space-y-4">
            <h4 className="text-base font-bold font-serifDev text-stone-900 dark:text-white flex items-center gap-2">
              <Music className="w-4 h-4 text-amber-500" />
              <span>देवतेसाठी मानवी ऑडिओ लिंक जोडा (Assign Real Brahman Audio to Deity):</span>
            </h4>

            {audioSaveMsg && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{audioSaveMsg}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedGodForAudio}
                onChange={(e) => {
                  setSelectedGodForAudio(e.target.value);
                  setCustomAudioInput(audioMap[e.target.value] || '');
                }}
                className="px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-semibold"
              >
                {fiftyGodsList.map((g) => (
                  <option key={g.id} value={g.id}>
                    #{g.serialNo} {g.name.mr} ({g.name.en})
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={customAudioInput}
                onChange={(e) => setCustomAudioInput(e.target.value)}
                placeholder="उदा. /audio/greetings/ganesha.mp3 किंवा https://.../audio.mp3"
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-mono"
              />

              <button
                onClick={() => {
                  if (!customAudioInput.trim()) return;
                  setCustomAudioMapping(selectedGodForAudio, customAudioInput.trim());
                  setAudioMap(getCustomAudioMap());
                  setAudioSaveMsg(`'${selectedGodForAudio}' साठी ऑडिओ लिंक यशस्वीरित्या सेव्ह झाली!`);
                  audioEngine.playTempleBell();
                  setTimeout(() => setAudioSaveMsg(null), 3000);
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
              >
                ऑडिओ जोडा (Save)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

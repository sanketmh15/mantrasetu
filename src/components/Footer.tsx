import React from 'react';
import { Language, AuthUser } from '../types';
import { User, LogOut } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  currentUser?: AuthUser | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  return (
    <footer className="mt-16 border-t border-stone-800 bg-[#0c0b0a] text-stone-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🚩</span>
            <span className="text-xl font-bold text-white font-serifDev">
              {currentLang === 'en' ? 'Sanatan Amrutdhara' : 'सनातन अमृतधारा'}
            </span>
            <span className="text-[10px] bg-amber-950/80 text-amber-300 font-semibold px-2.5 py-0.5 rounded-full border border-amber-700/60">
              {currentLang === 'en' ? '50 Deities & Kumbh Portal' : 'सर्व ५० देव-देवता व कुंभमेळा'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            {currentLang === 'en'
              ? 'One-stop digital devotional sanctuary connecting you with India\'s sacred traditions, 50 deities, Simhastha Kumbh Mela, and 108 Japa.'
              : currentLang === 'hi'
              ? 'सनातन अमृतधारा — भारतीय आध्यात्मिक परम्पराओं का प्रामाणिक डिजिटल सेतु। समस्त ५० पावन देवी-देवता, सिंहस्थ कुंभमेळा, १०८ जप एवं तीर्थ दर्शन।'
              : 'सनातन अमृतधारा — भारतीय अध्यात्म आणि संस्कृतीचा प्रामाणिक डिजिटल सेतू. सर्व ५० पावन देव-देवता, सिंहस्थ कुंभमेळा, १०८ नामस्मरण आणि तीर्थक्षेत्रे.'}
          </p>
          <div className="text-xs text-stone-500 pt-2 border-t border-stone-900">
            <p>🙏 Faith • Knowledge • Tradition • Technology</p>
          </div>
        </div>

        {/* Sacred Offerings */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-3">
            {currentLang === 'en' ? 'Sacred Offerings' : 'प्रमुख भक्तीदालने'}
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li className="flex items-center gap-2 text-stone-300">
              <span className="text-amber-500">🪷</span>
              <span>{currentLang === 'en' ? '50 Deities Portal' : 'सर्व ५० देव-देवता दर्शन'}</span>
            </li>
            <li className="flex items-center gap-2 text-stone-300">
              <span className="text-amber-500">🌊</span>
              <span>{currentLang === 'en' ? 'Simhastha Kumbh Mela' : 'सिंहस्थ कुंभमेळा २०२७'}</span>
            </li>
            <li className="flex items-center gap-2 text-stone-300">
              <span className="text-amber-500">📿</span>
              <span>{currentLang === 'en' ? '108 Japa Mala Counter' : '१०८ नामस्मरण जपमाळ'}</span>
            </li>
            <li className="flex items-center gap-2 text-stone-300">
              <span className="text-amber-500">🤖</span>
              <span>{currentLang === 'en' ? 'Divine AI & Brahman Voice' : 'दिव्य AI व वैदिक आवाज'}</span>
            </li>
          </ul>
        </div>

        {/* Scripture & Credibility Sources */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold mb-3">
            {currentLang === 'en' ? 'Verified Sources' : 'प्रामाणिक संदर्भ'}
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-400">
            <li>• Valmiki Ramayana (Sundara Kanda)</li>
            <li>• Sri Ramcharitmanas (Goswami Tulsidas)</li>
            <li>• Samarth Ramdas Swami Tradition</li>
            <li>• Maharashtra State Gazetteers</li>
            <li>• Muktika Upanishad & Vedic Agamas</li>
          </ul>
        </div>

      </div>

      {/* Account Login / Logout Quick Access Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span>🕉️</span>
          <span className="text-stone-300 font-medium">
            {currentUser
              ? `लॉगिन स्टेटस: ${currentUser.name} (${currentUser.role === 'admin' ? '👑 अ‍ॅडमिन' : '📿 साधक'})`
              : 'साधक लॉगिन: आपले नामस्मरण व संकल्प सुरक्षित ठेवा'}
          </span>
        </div>

        <div>
          {currentUser ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 font-bold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>खात्यातून लॉगआउट करा (Logout)</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold transition-all shadow-md"
            >
              <User className="w-3.5 h-3.5" />
              <span>साधक / अ‍ॅडमिन लॉगिन करा (Login)</span>
            </button>
          )}
        </div>
      </div>

      {/* Ethical Disclaimer */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-stone-900 text-center text-[11px] text-stone-500">
        <p>
          {currentLang === 'en'
            ? 'Ethical Devotion Notice: Sanatan Amrutdhara presents traditional devotional practices for spiritual reflection, peace, and cultural heritage. Content is strictly educational and non-superstitious.'
            : 'अंधविश्वास मुक्ति सूचना: सनातन अमृतधारा प्राचीन परम्परागत साधना को आत्म-शांति, शुचिता और सांस्कृतिक ज्ञान हेतु प्रस्तुत करता है।'}
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} सनातन अमृतधारा (Sanatan Amrutdhara) • Built with devotion and precision.
        </p>
      </div>
    </footer>
  );
};


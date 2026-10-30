import React, { useState } from 'react';
import { Language } from '../types';
import {
  kumbhMelaLore,
  fourKumbhSites,
  shahiSnanDays,
  thirteenAkharas,
  holyGhatsOfNashik,
  godavariStotramDevanagari,
  godavariStotramMeaning,
  AkharaInfo,
  HolyGhat,
  ShahiSnanDay
} from '../data/kumbhMela';
import { audioEngine } from '../utils/audioSynth';
import { PlaceImage } from './PlaceImage';
import {
  Flame,
  Volume2,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Compass,
  HeartHandshake
} from 'lucide-react';

interface KumbhMelaGuideProps {
  currentLang: Language;
}

export const KumbhMelaGuide: React.FC<KumbhMelaGuideProps> = ({ currentLang }) => {
  const [activeSection, setActiveSection] = useState<'shahi' | 'akharas' | 'snan' | 'fourSites' | 'safety'>('shahi');
  const [akharaFilter, setAkharaFilter] = useState<'all' | 'Shaiva' | 'Vaishnava' | 'Udasin'>('all');
  const [isPlayingStotram, setIsPlayingStotram] = useState<boolean>(false);

  const filteredAkharas: AkharaInfo[] =
    akharaFilter === 'all'
      ? thirteenAkharas
      : thirteenAkharas.filter((a) => a.sect === akharaFilter);

  const handlePlayGodavariStotram = () => {
    if (isPlayingStotram) {
      audioEngine.stopSpeaking();
      setIsPlayingStotram(false);
    } else {
      setIsPlayingStotram(true);
      const textToSpeak = 'गौतमीये तटस्थानां नराणां मुक्तिदायिनी । पापापहारिणी पुण्या गोदावरी नमोऽस्तु ते ॥ सह्यपादसमुद्भूते शङ्करस्य जटाधरे । त्र्यम्बकप्रियकल्याणि गोदावरी नमोऽस्तु ते ॥';
      audioEngine.speakText(textToSpeak, 'hi-IN', 0.9, () => {
        setIsPlayingStotram(false);
      });
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Grand Sacred Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-3">
          <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>
            {currentLang === 'en'
              ? 'World\'s Sacred Amrita Gathering'
              : currentLang === 'hi'
              ? 'अमृत कुम्भ महापर्व'
              : 'अनादी अमृतकुंभ महासोहळा'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serifDev text-stone-900 dark:text-white tracking-tight">
          {kumbhMelaLore.title[currentLang]}
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 font-medium leading-relaxed">
          {kumbhMelaLore.subtitle[currentLang]}
        </p>

        {/* Celestial Astrology Pill */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-50 dark:bg-stone-900/80 border border-amber-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">
            🪐 {currentLang === 'en' ? 'Simhastha Astrological Alignment:' : 'सिंहस्थ खगोलीय योग:'}
          </span>
          {kumbhMelaLore.celestialSignificance[currentLang]}
        </div>
      </div>

      {/* 2. Top Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveSection('shahi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'shahi'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300/60'
              : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400'
          }`}
        >
          <span>🌊</span>
          <span>{currentLang === 'en' ? 'Shahi Snan & Ghats' : 'शाही स्नान व पावन घाटे'}</span>
        </button>

        <button
          onClick={() => setActiveSection('akharas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'akharas'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300/60'
              : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400'
          }`}
        >
          <span>🚩</span>
          <span>{currentLang === 'en' ? '13 Akharas Directory' : '१३ पावन आखाडे'}</span>
        </button>

        <button
          onClick={() => setActiveSection('snan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'snan'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300/60'
              : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400'
          }`}
        >
          <span>📿</span>
          <span>{currentLang === 'en' ? 'Virtual Snan & Stotra' : 'अमृत स्नान संकल्प व स्तोत्र'}</span>
        </button>

        <button
          onClick={() => setActiveSection('fourSites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'fourSites'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300/60'
              : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400'
          }`}
        >
          <span>🗺️</span>
          <span>{currentLang === 'en' ? '4 Kumbh Melas of India' : 'भारतातील ४ कुंभमेळे'}</span>
        </button>

        <button
          onClick={() => setActiveSection('safety')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'safety'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300/60'
              : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400'
          }`}
        >
          <span>💡</span>
          <span>{currentLang === 'en' ? 'Senior Safety & Advice' : 'भाविक व ज्येष्ठ सुरक्षा'}</span>
        </button>
      </div>

      {/* 3. SECTION 1: SHAHI SNAN DATES & SACRED GHATS */}
      {activeSection === 'shahi' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Peshwa Settlement Highlight */}
          <div className="p-6 rounded-3xl bg-amber-50 dark:bg-[#171513] border border-amber-300 dark:border-amber-900/40">
            <h3 className="text-base sm:text-lg font-bold font-serifDev text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              <span>
                {currentLang === 'en'
                  ? 'The Historic Dual Bathing Tradition (Nashik & Trimbakeshwar)'
                  : currentLang === 'hi'
                  ? 'ऐतिहासिक शैव-वैष्णव शाही स्नान परम्परा'
                  : 'ऐतिहासिक शैव-वैष्णव दुहेरी शाही स्नान परंपरा'}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {kumbhMelaLore.historicPeshwaSettlement[currentLang]}
            </p>
          </div>

          {/* 3 Shahi Snan Cards */}
          <div>
            <h3 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-saffron-600" />
              <span>{currentLang === 'en' ? 'The 3 Auspicious Shahi Snan Dates' : '३ पावन शाही स्नान पर्वे'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {shahiSnanDays.map((snan: ShahiSnanDay, i: number) => (
                <div
                  key={i}
                  className="p-5 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        {snan.tithiDate[currentLang]}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-serifDev text-stone-900 dark:text-white mb-2">
                      {snan.parvName[currentLang]}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{snan.primaryLocation[currentLang]}</span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                      {snan.significance[currentLang]}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800/80 text-[11px] text-stone-600 dark:text-stone-300">
                    <span className="font-bold text-stone-900 dark:text-white block mb-0.5">
                      {currentLang === 'en' ? 'Akharas Procession:' : 'आखाड्यांची मिरवणूक:'}
                    </span>
                    {snan.participatingAkharas[currentLang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sacred Ghats & Kunds of Nashik & Trimbakeshwar */}
          <div>
            <h3 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>{currentLang === 'en' ? 'Sacred Bathing Ghats & Holy Kunds' : 'पावन स्नान कुंडे व तीर्थ घाटे'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {holyGhatsOfNashik.map((ghat: HolyGhat, idx: number) => (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col justify-between"
                >
                  {/* Holy Place Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-950">
                    <PlaceImage
                      src={ghat.image}
                      placeName={ghat.name[currentLang]}
                      districtOrRiver={ghat.river}
                      alt={ghat.name[currentLang]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-stone-950/80 backdrop-blur-sm border border-white/20">
                        📍 {ghat.location[currentLang]}
                      </span>
                      <span className="text-xs text-amber-300 font-mono bg-stone-950/80 px-2 py-0.5 rounded-lg">
                        {ghat.river}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-2">
                        {ghat.name[currentLang]}
                      </h4>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                        {ghat.speciality[currentLang]}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-stone-950/80 border border-amber-200 dark:border-amber-900/30 text-[11px] text-stone-700 dark:text-stone-300">
                      <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                        💡 {currentLang === 'en' ? 'Pilgrim Rules & Advice:' : 'स्नान नियम व सल्ला:'}
                      </span>
                      {ghat.rules[currentLang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SECTION 2: THE 13 AKHARAS DIRECTORY */}
      {activeSection === 'akharas' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Akhara Sect Filters */}
          <div className="flex items-center justify-center gap-2">
            {[
              { id: 'all', label: { en: 'All 13 Akharas', hi: 'सभी १३ अखाड़े', mr: 'सर्व १३ आखाडे' } },
              { id: 'Shaiva', label: { en: '7 Shaiva Akharas (Trimbak)', hi: '७ शैव अखाड़े (त्र्यंबक)', mr: '७ शैव आखाडे (त्र्यंबकेश्वर)' } },
              { id: 'Vaishnava', label: { en: '3 Vaishnava Akharas (Nashik)', hi: '३ वैष्णव अखाड़े (नाशिक)', mr: '३ वैष्णव आखाडे (नाशिक)' } },
              { id: 'Udasin', label: { en: '3 Udasin & Nirmal', hi: '३ उदासीन व निर्मल', mr: '३ उदासीन व निर्मल' } },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setAkharaFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  akharaFilter === f.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
                }`}
              >
                {f.label[currentLang]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAkharas.map((akhara: AkharaInfo, i: number) => (
              <div
                key={i}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        akhara.sect === 'Shaiva'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : akhara.sect === 'Vaishnava'
                          ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800'
                          : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      {akhara.sect}
                    </span>
                    <span className="text-[10px] text-stone-500">{akhara.headquarters}</span>
                  </div>

                  <h4 className="text-base font-bold font-serifDev text-stone-900 dark:text-white mb-1.5">
                    {akhara.name[currentLang]}
                  </h4>

                  <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-2">
                    🙏 {currentLang === 'en' ? 'Presiding Deity:' : 'आराध्य देवता:'} {akhara.deity[currentLang]}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    {akhara.description[currentLang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SECTION 3: VIRTUAL SNAN SANKALPA & GODAVARI STOTRA */}
      {activeSection === 'snan' && (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
          {/* Sacred Snan Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-[#1c1815] dark:to-[#12100e] border border-amber-300 dark:border-amber-900/50 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
              {currentLang === 'en' ? 'Sacred Bathing Hymn' : 'पवित्र गोदावरी अमृत स्तोत्र'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serifDev text-stone-900 dark:text-white mt-1 mb-4">
              ॥ श्री गोदावरी स्तोत्रम् ॥
            </h3>

            {/* Devanagari Verses */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-stone-950/80 border border-amber-200 dark:border-stone-800/80 my-4 text-left sm:text-center">
              <pre className="text-sm sm:text-base font-bold font-devanagari text-amber-900 dark:text-amber-300 leading-relaxed whitespace-pre-line">
                {godavariStotramDevanagari}
              </pre>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto mb-6">
              {godavariStotramMeaning[currentLang]}
            </p>

            {/* Audio Recital Button */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePlayGodavariStotram}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-md"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingStotram ? 'animate-bounce text-yellow-200' : ''}`} />
                <span>
                  {isPlayingStotram
                    ? (currentLang === 'en' ? 'Reciting Godavari Stotram...' : 'गोदावरी स्तोत्र पठण सुरू...')
                    : (currentLang === 'en' ? 'Listen Godavari Stotram' : 'ऐका गोदावरी स्तोत्र')}
                </span>
              </button>
            </div>
          </div>

          {/* Virtual Snan Sankalpa for Senior Citizens at Home */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4" />
              <span>
                {currentLang === 'en'
                  ? 'Virtual Snan Vidhi at Home (For Elders & Remote Devotees)'
                  : currentLang === 'hi'
                  ? 'घर बैठे अमृत स्नान संकल्प विधी (वरिष्ठ नागरिकों हेतु)'
                  : 'घरी बसून अमृत स्नान संकल्प विधी (ज्येष्ठ नागरिक व भाविकांसाठी)'}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
              {currentLang === 'en'
                ? 'According to the Skanda Purana, if physical travel to the Kumbh is not possible due to health or distance, bathing at home while invoking the seven sacred rivers grants identical spiritual merits.'
                : currentLang === 'hi'
                ? 'स्कंद पुराण अनुसार, स्वास्थ्य अथवा दूरी के कारण प्रत्यक्ष उपस्थित न हो सकने पर घर पर पावन सप्त नदियों का स्मरण कर स्नान करने से कुंभ स्नान सम पुण्य प्राप्त होता है।'
                : 'स्कंद पुराणातील वचनानुसार, आरोग्यामुळे किंवा वयामुळे प्रत्यक्ष सिंहस्थात जाणे शक्य नसल्यास, घरी स्नानाच्या वेळी सात पावन नद्यांचे स्मरण केल्यास कुंभस्नानाचेच पावन फळ मिळते.'}
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-stone-950 border border-amber-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
              <span className="font-bold text-saffron-700 dark:text-saffron-400 block mb-1">
                ॥ स्नान मन्त्र (Chant while pouring water): ॥
              </span>
              <p className="font-devanagari font-bold text-sm text-amber-900 dark:text-amber-300">
                गङ्गे च यमुने चैव गोदावरि सरस्वति । नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥
              </p>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-2">
                {currentLang === 'en'
                  ? 'Add a few drops of holy water or Tulsi leaf into your bath water, face east, and chant this sacred verse with pure devotion.'
                  : currentLang === 'hi'
                  ? 'स्नान जल में तुलसी दल अथवा गंगाजल मिलाकर पूर्व दिशा की ओर मुख कर यह मन्त्र जपें।'
                  : 'स्नानाच्या पाण्यात तुळशीचे पान टाकून, पूर्व दिशेकडे तोंड करून हा मंत्र म्हणावा.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECTION 4: 4 KUMBH MELAS OF INDIA */}
      {activeSection === 'fourSites' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fourKumbhSites.map((site: any) => (
              <div
                key={site.id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col justify-between"
              >
                {/* Site Photo */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                  <PlaceImage
                    src={site.image}
                    placeName={site.name[currentLang]}
                    districtOrRiver={site.river[currentLang]}
                    alt={site.name[currentLang]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-stone-950/80 backdrop-blur-sm border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                    <span>{site.imageIcon}</span>
                    <span>{site.state}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                      <span>🌊</span>
                      <span>{site.river[currentLang]}</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serifDev text-stone-900 dark:text-white mb-2">
                      {site.name[currentLang]}
                    </h3>

                    <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 mb-4">
                      <span className="font-bold block text-stone-900 dark:text-white mb-0.5">
                        🪐 {currentLang === 'en' ? 'Zodiac Alignment:' : 'खगोलीय योग:'}
                      </span>
                      {site.astrologicalSign[currentLang]}
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {site.significance[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SECTION 5: SENIOR CITIZEN SAFETY & CROWD ADVICE */}
      {activeSection === 'safety' && (
        <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-md">
            <h3 className="text-lg font-bold font-serifDev text-stone-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>
                {currentLang === 'en'
                  ? 'Essential Safety & Health Guidelines for Kumbh Pilgrims'
                  : currentLang === 'hi'
                  ? 'कुंभ यात्रियों एवं वरिष्ठ नागरिकों हेतु सुरक्षा परामर्श'
                  : 'कुंभमेळा भाविक व ज्येष्ठ नागरिकांसाठी सुरक्षा सल्ला'}
              </span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>{currentLang === 'en' ? 'Avoid Peak Hours:' : 'अति गर्दीची वेळ टाळा:'}</strong>{' '}
                  {currentLang === 'en'
                    ? 'On main Shahi Snan days, the ghats are reserved for Akharas until 11:00 AM. Devotees should bathe in afternoon slots or on adjacent tithis for safety.'
                    : 'शाही स्नानाच्या दिवशी सकाळी आखाड्यांची मिरवणूक असते. सर्वसामान्य भाविकांनी दुपारनंतर किंवा आदल्या-पुढील दिवशी शांततेत स्नान करावे.'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>{currentLang === 'en' ? 'Senior Citizen Identification Card:' : 'ज्येष्ठ नागरिकांसाठी ओळखपत्र:'}</strong>{' '}
                  {currentLang === 'en'
                    ? 'Always carry a written card with emergency phone numbers and medical prescription in the pocket in case mobile networks get congested.'
                    : 'ज्येष्ठांच्या खिशात घरचा पत्ता, फोन नंबर व आवश्यक औषधांची माहिती असलेली चिठ्ठी आवर्जून ठेवावी.'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>{currentLang === 'en' ? 'Nirmal Godavari Cleanliness Pledge:' : 'निर्मल गोदावरी संकल्प:'}</strong>{' '}
                  {currentLang === 'en'
                    ? 'Never discard plastic bottles, clothes, or chemical soaps into the Godavari. Preserve the sanctity of the mother river.'
                    : 'गोदावरीच्या पात्रात प्लास्टिक, साबण किंवा कपडे फेकू नका. पावन नदीचे पावित्र्य व स्वच्छता राखणे हे प्रत्येक भाविकाचे कर्तव्य आहे.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { Language } from '../types';
import { dnyaneshwarPalkhiRoute, vitthalLore, WariHalt } from '../data/vitthal';
import { audioEngine } from '../utils/audioSynth';
import {
  MapPin,
  ExternalLink,
  Volume2,
  Sparkles,
  Award,
  Footprints,
  Users
} from 'lucide-react';

interface WariRouteVisualizerProps {
  currentLang: Language;
}

export const WariRouteVisualizer: React.FC<WariRouteVisualizerProps> = ({ currentLang }) => {
  const [selectedHalt, setSelectedHalt] = useState<WariHalt>(dnyaneshwarPalkhiRoute[0]);
  const [isPlayingChant, setIsPlayingChant] = useState<boolean>(false);

  const handlePlayChant = () => {
    if (isPlayingChant) {
      audioEngine.stopSpeaking();
      setIsPlayingChant(false);
    } else {
      setIsPlayingChant(true);
      audioEngine.speakText('ज्ञानोबा माऊली तुकाराम, ज्ञानोबा माऊली तुकाराम', 'mr-IN', 0.95, () => {
        setIsPlayingChant(false);
      });
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Sacred Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/60 text-amber-300 text-xs font-semibold mb-3">
          <Footprints className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {currentLang === 'en'
              ? 'World\'s Largest Annual Walking Pilgrimage'
              : currentLang === 'hi'
              ? 'विश्व की विशालतम वार्षिक पदयात्रा'
              : 'जगातील सर्वात मोठी वार्षिक पायी पदयात्रा'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-white tracking-tight">
          {currentLang === 'en'
            ? 'Pandharpur Wari Palkhi Marg'
            : currentLang === 'hi'
            ? 'श्री क्षेत्र पंढरपुर वारी पालखी मार्ग'
            : 'आषाढी वारी पालखी महामार्ग दर्शन'}
        </h1>
        <p className="text-xs sm:text-base text-stone-300 mt-2 leading-relaxed">
          {currentLang === 'en'
            ? 'Experience the sacred 255-kilometer route from Alandi to Pandharpur, following Sant Dnyaneshwar Maharaj Palkhi through Dive Ghat, Neera Snan, and the thrilling Ringan ceremonies.'
            : currentLang === 'hi'
            ? 'आळंदी से पंढरपुर तक २५५ किमी का पावन मार्ग—दिवे घाट चढ़ाई, नीरा नदी स्नान एवं अद्भूत रिंगण समारोह।'
            : 'आळंदी ते पंढरपूर २५५ किमीचा पावन पालखी मार्ग—दिवे घाटाची विहंगम चढण, नीरा स्नान आणि अंगावर रोमांच उभे करणारे अश्वाचे गोल व उभे रिंगण सोहळे.'}
        </p>

        {/* Audio Chant & Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePlayChant}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-semibold text-xs sm:text-sm shadow-md"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingChant ? 'animate-bounce text-yellow-200' : ''}`} />
            <span>
              {isPlayingChant
                ? (currentLang === 'en' ? 'Chanting Dnyanoba Mauli...' : 'ज्ञानोबा माऊली गजर सुरू...')
                : (currentLang === 'en' ? 'Listen "Dnyanoba Mauli Tukaram"' : 'ऐका "ज्ञानोबा माऊली तुकाराम" गजर')}
            </span>
          </button>

          <a
            href="https://www.google.com/maps/dir/Alandi/Pune/Saswad/Jejuri/Lonand/Phaltan/Natepute/Malshiras/Velapur/Wakhari/Pandharpur"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-xs sm:text-sm transition-all"
          >
            <ExternalLink className="w-4 h-4 text-stone-400" />
            <span>{currentLang === 'en' ? 'Google Maps Palkhi Route' : 'गुगल मॅप्स पालखी मार्ग'}</span>
          </a>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="p-4 rounded-2xl bg-[#171513] border border-stone-800 text-center">
          <span className="text-xs text-stone-400 block">{currentLang === 'en' ? 'Total Distance' : 'एकूण अंतर'}</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5">255 km</p>
          <span className="text-[11px] text-stone-400">{currentLang === 'en' ? 'On Foot (पायी प्रवास)' : 'पायी वारी'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#171513] border border-stone-800 text-center">
          <span className="text-xs text-stone-400 block">{currentLang === 'en' ? 'Pilgrim Count' : 'वारकरी संख्या'}</span>
          <p className="text-xl sm:text-2xl font-bold text-saffron-400 mt-0.5">15,00,000+</p>
          <span className="text-[11px] text-stone-400">{currentLang === 'en' ? 'Varkari Devotees' : 'श्रद्धाळू माऊली'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#171513] border border-stone-800 text-center">
          <span className="text-xs text-stone-400 block">{currentLang === 'en' ? 'Tradition Age' : 'परंपरा वय'}</span>
          <p className="text-xl sm:text-2xl font-bold text-yellow-400 mt-0.5">800+ {currentLang === 'en' ? 'Years' : 'वर्षे'}</p>
          <span className="text-[11px] text-stone-400">{currentLang === 'en' ? 'Since 13th Century' : '१३ व्या शतकापासून'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#171513] border border-stone-800 text-center">
          <span className="text-xs text-stone-400 block">{currentLang === 'en' ? 'Ringan Ceremony' : 'रिंगण सोहळे'}</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5">4 {currentLang === 'en' ? 'Sites' : 'ठिकाणे'}</p>
          <span className="text-[11px] text-stone-400">३ गोल + १ उभे रिंगण</span>
        </div>
      </div>

      {/* 3. The Grand Interactive Stepper & Active Stop Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left: 14 Halts Vertical Stepper */}
        <div className="lg:col-span-5 space-y-2 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
          <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block mb-2 px-1">
            {currentLang === 'en' ? '14 Sacred Palkhi Halts' : '१४ पावन पालखी मुक्काम'}
          </span>
          {dnyaneshwarPalkhiRoute.map((halt) => {
            const isSelected = halt.stopNumber === selectedHalt.stopNumber;
            return (
              <button
                key={halt.stopNumber}
                onClick={() => setSelectedHalt(halt)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-950/70 border-amber-600/70 text-white shadow-lg'
                    : 'bg-stone-900/60 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-extrabold'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {halt.stopNumber}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-200">
                      {halt.location[currentLang]}
                    </h4>
                    <span className="text-[11px] text-stone-400">
                      {halt.district} • {halt.distanceFromStartKm} km
                    </span>
                  </div>
                </div>

                {halt.ringanType !== 'none' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-saffron-950 border border-saffron-800/60 text-saffron-400">
                    {halt.ringanType === 'gol' ? 'गोल रिंगण' : 'उभे रिंगण'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Active Halt Spotlight Card */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1c1815] to-[#12100e] border border-amber-900/40 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-700/60 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLang === 'en' ? `Stop #${selectedHalt.stopNumber} of 14` : `मुक्काम क्र. ${selectedHalt.stopNumber} / १४`}</span>
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {selectedHalt.distanceFromStartKm} km {currentLang === 'en' ? 'from Alandi' : 'आळंदीहून अंतर'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-serifDev text-white mb-2">
              {selectedHalt.location[currentLang]}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              {selectedHalt.significance[currentLang]}
            </p>

            {/* Special Ringan Details if applicable */}
            {selectedHalt.ringanType !== 'none' && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 mb-6">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    {selectedHalt.ringanType === 'gol'
                      ? (currentLang === 'en' ? 'Sacred Gol Ringan (Circular Horse Sprint)' : 'पवित्र गोल रिंगण सोहळा')
                      : (currentLang === 'en' ? 'Grand Ubhe Ringan (Vertical Sprint at Wakhari)' : 'भव्य उभे रिंगण सोहळा (वाखरी)')}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed">
                  {selectedHalt.ringanType === 'gol'
                    ? (currentLang === 'en'
                        ? 'Lakhs of Varkaris form a massive circular boundary. Sant Dnyaneshwar\'s riderless consecrated horse (Mauli\'s Ashwa) gallops at lightning speed inside the circle. Devotees take the dust touched by its hooves to their forehead as sacred prasad.'
                        : 'लाखो वारकरी शिस्तीत भव्य गोल कडे करतात. माऊलींचा स्वार नसलेला पावन अश्व विजेच्या वेगाने वर्तुळातून धाव घेतो. अश्वाच्या टापांखालील धूळ कपाळी लावण्यासाठी वारकऱ्यांची गर्दी होते.')
                    : (currentLang === 'en'
                        ? 'On the eve of Ashadhi Ekadashi at Wakhari, all Dindis stand in two parallel straight lines stretching for miles. The sacred horse bursts forth in a straight gallop straight towards Pandharpur amid thunderous cheers of "Dnyanoba Mauli Tukaram"!'
                        : 'वाखरीच्या मैदानात दोन्ही बाजूंना मैलोन्मैल वारकऱ्यांच्या रांगा उभ्या राहतात. माऊलींचा अश्व विजेच्या वेगाने सरळ पंढरपूरच्या दिशेने धाव घेतो. अवघा आसमंत "ज्ञानोबा माऊली तुकाराम" च्या जयघोषाने दुमदुमून जातो!')}
                </p>
              </div>
            )}

            {/* Varkari Traditions & Values */}
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? 'Core Varkari Values at this Halt' : 'वारकरी शिस्त व परंपरा'}</span>
              </h4>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <span className="text-saffron-400 font-bold">•</span>
                  <span>{vitthalLore.theWariTradition.varkariPrinciples[0][currentLang]}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-saffron-400 font-bold">•</span>
                  <span>{vitthalLore.theWariTradition.varkariPrinciples[1][currentLang]}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 4. Sant Tukaram Palkhi from Dehu (Twin Tradition) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {currentLang === 'en' ? 'The Twin Sacred Palkhi' : 'दुसरी महान पालखी परंपरा'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serifDev text-white mt-1">
              {currentLang === 'en'
                ? 'Jagadguru Sant Tukaram Maharaj Palkhi (Dehu to Pandharpur)'
                : currentLang === 'hi'
                ? 'जगद्गुरु संत तुकाराम महाराज पालखी (देहू ते पंढरपुर)'
                : 'जगद्गुरू संत तुकाराम महाराज पालखी (देहू ते पंढरपूर)'}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 text-stone-300">
            <Users className="w-3.5 h-3.5 text-saffron-400" />
            <span>{currentLang === 'en' ? 'Over 350 Registered Dindis' : '३५० हून अधिक मानाच्या दिंड्या'}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
          {currentLang === 'en'
            ? 'Starting from the holy Indrayani river bank in Dehu, Tukaram Maharaj\'s Palkhi travels via Akurdi, Pune (where it joins Mauli\'s Palkhi), Loni Kalbhor, Yavat, Varvand, Baramati, Sansar, Akluj, and meets Dnyaneshwar Maharaj Palkhi at Wakhari.'
            : currentLang === 'hi'
            ? 'देहू से प्रस्थान कर तुकाराम महाराज की पालखी पुणे, बारामती, अकलूज होते हुए वाखरी में ज्ञानेश्वर महाराज पालखी से मिलती है।'
            : 'देहूतील वैकुंठ गमन स्थानावरून इंद्रायणी काठावरून प्रस्थान ठेवणारी तुकोबारायांची पालखी आकुर्डी, पुणे, लोणी काळभोर, यवत, वरवंड, बारामती, सणसर, अकलूज मार्गे वाखरीत माऊलींच्या पालखीला भेटते.'}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-lg bg-stone-950 text-stone-300 border border-stone-800">
            Dehu → Akurdi → Pune → Baramati → Akluj → Wakhari → Pandharpur
          </span>
        </div>
      </div>

    </div>
  );
};

import { useState } from 'react';
import { Language } from '../types';
import {
  satvikProducts,
  storeCategories,
  StoreProduct,
} from '../data/satvikStoreData';
import { audioEngine } from '../utils/audioSynth';
import {
  ShoppingBag,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Search
} from 'lucide-react';

interface SatvikDevotionalStoreProps {
  currentLang: Language;
}

interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export function SatvikDevotionalStore({ currentLang }: SatvikDevotionalStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Devotee checkout form fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCity, setCustomerCity] = useState<string>('');

  const cartList = Object.values(cart);
  const totalItemCount = cartList.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cartList.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  const handleAddToCart = (product: StoreProduct) => {
    audioEngine.playTempleBell();
    setCart((prev) => {
      const existing = prev[product.id];
      const newQty = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: newQty,
        },
      };
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const item = prev[productId];
      if (!item) return prev;
      const nextQty = item.quantity + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return {
        ...prev,
        [productId]: {
          ...item,
          quantity: nextQty,
        },
      };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleCheckoutWhatsApp = () => {
    if (cartList.length === 0) return;

    audioEngine.playTempleBell();
    let text = `🙏 *जय श्रीराम / राम कृष्ण हरी!*\n` +
      `मला *सनातन अमृतधारा सात्विक भक्ती भांडारातून* खालील पूजा साहित्य मागवायचे आहे:\n\n` +
      `📦 *ऑर्डर यादी:*\n`;

    cartList.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name.mr} x ${item.quantity} = ₹${item.product.price * item.quantity}\n`;
    });

    text += `\n💰 *एकूण अंदाजे रक्कम:* ₹${totalAmount}\n`;
    if (customerName) text += `👤 *साधकाचे नाव:* ${customerName}\n`;
    if (customerPhone) text += `📞 *संपर्क क्रमांक:* ${customerPhone}\n`;
    if (customerCity) text += `📍 *पत्ता / गाव / शहर:* ${customerCity}\n`;

    text += `\n🚚 कृपया माझी ऑर्डर नोंदवून पाठवण्याची सोय करावी. धन्यवाद! 🙏\n` +
      `🔗 https://sanketmh15.github.io/mantrasetu/#store`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const filteredProducts = satvikProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.mr.includes(searchQuery.trim()) ||
      product.name.en.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      product.description.mr.includes(searchQuery.trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-800/60 text-amber-300 text-xs font-semibold mb-3 shadow-md">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>
            {currentLang === 'en'
              ? 'Sanatan Amrutdhara • Pure Satvik Devotional Store'
              : 'सनातन अमृतधारा • सात्विक भक्ती भांडार व पूजा साहित्य'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serifDev text-white tracking-tight">
          {currentLang === 'en'
            ? 'Pure Satvik Devotional Store & Puja Samagri'
            : 'अस्सल सात्विक पूजा साहित्य व भक्ती भांडार'}
        </h1>
        
        <p className="mt-2 text-stone-300 text-xs sm:text-base leading-relaxed">
          {currentLang === 'en'
            ? 'Temple-grade Vrindavan Tulsi malas, authentic Nepali Rudraksha, pure Cow Ghee wicks, brass temple bells, copper thali sets, and holy scriptures delivered with reverence.'
            : 'वृंदावन अस्सल तुळशी माळा, हिमालयातील ५-मुखी नेपाळी रुद्राक्ष, शुद्ध गाईच्या तुपाच्या वाती, पितळी घंटा, ज्ञानेश्वरी ग्रंथ आणि वारकरी टाळ संच.'}
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'en' ? 'Search malas, puja items, scriptures...' : 'तुळशी माळ, रुद्राक्ष, पूजा साहित्य, ग्रंथ शोधा...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 shadow-inner"
          />
        </div>
      </div>

      {/* 2. Category Filter Pills & Floating Cart Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full custom-scrollbar">
          {storeCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white border-amber-300 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label[currentLang] || cat.label.mr}</span>
              </button>
            );
          })}
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 shrink-0 transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{currentLang === 'en' ? 'View Cart' : 'माझी झोळी (Cart)'}</span>
          {totalItemCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white text-stone-950 font-black text-xs shadow-sm animate-pulse">
              {totalItemCount} (₹{totalAmount})
            </span>
          )}
        </button>
      </div>

      {/* 3. Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const cartItem = cart[product.id];
          return (
            <div
              key={product.id}
              className="p-5 rounded-3xl bg-gradient-to-b from-[#181513] to-[#100e0d] border border-stone-800 hover:border-amber-600/50 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Top Badge & Image Icon */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl p-2.5 rounded-2xl bg-stone-950 border border-stone-800 shadow-inner group-hover:scale-110 transition-transform">
                    {product.imageIcon}
                  </span>

                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/90 border border-amber-700/60 text-amber-300 shadow-sm">
                      {product.badge[currentLang] || product.badge.mr}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-stone-200">{product.rating}</span>
                  <span className="text-[11px] text-stone-500">({product.reviewsCount} परीक्षणे)</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white font-serifDev leading-snug line-clamp-2">
                  {product.name[currentLang] || product.name.mr}
                </h3>

                <p className="text-xs text-stone-300 mt-2 line-clamp-2 leading-relaxed">
                  {product.description[currentLang] || product.description.mr}
                </p>

                {/* Spiritual Benefit Pill */}
                <div className="mt-3 p-2 rounded-xl bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200/90 leading-tight">
                  <span className="font-semibold text-amber-300">✨ सात्विक लाभ: </span>
                  {product.spiritualBenefit[currentLang] || product.spiritualBenefit.mr}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-amber-400 font-mono">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-500 line-through font-mono">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold block">उपलब्ध (In Stock)</span>
                </div>

                {cartItem ? (
                  <div className="flex items-center gap-1.5 bg-amber-950 border border-amber-600 rounded-xl p-1">
                    <button
                      onClick={() => handleUpdateQuantity(product.id, -1)}
                      className="p-1 rounded-lg bg-stone-900 text-stone-200 hover:bg-stone-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-amber-300 px-1 font-mono">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(product.id, 1)}
                      className="p-1 rounded-lg bg-stone-900 text-stone-200 hover:bg-stone-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>जोडा (Add)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Trust Badges & Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800">
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">१००% अस्सल सात्विक</h4>
            <p className="text-[11px] text-stone-400">मंदिर दर्जा व शास्त्रोक्त पद्धतीने तयार केलेले साहित्य</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center gap-3">
          <Truck className="w-8 h-8 text-saffron-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">सुरक्षित घरपोच सेवा</h4>
            <p className="text-[11px] text-stone-400">संपूर्ण महाराष्ट्रात व भारतात सुरक्षित कुरिअर वितरण</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center gap-3">
          <RotateCcw className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">सात्विक भाव व मदत</h4>
            <p className="text-[11px] text-stone-400">व्हॉट्सॲपवर प्रत्यक्ष मार्गदर्शन व शंका निरसन</p>
          </div>
        </div>
      </div>

      {/* 5. Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#151210] border border-amber-800/80 rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-serifDev text-white">
                  माझी भक्ती झोळी (Puja Cart)
                </h3>
                <span className="text-xs text-stone-400 font-mono">
                  ({totalItemCount} वस्तू)
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar mb-4">
              {cartList.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold">आपली झोळी रिकामी आहे.</p>
                  <p className="text-xs text-stone-500 mt-1">आपल्या पूजेसाठी तुळशी माळ, अष्टगंध किंवा ग्रंथ निवडा.</p>
                </div>
              ) : (
                cartList.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-stone-900/70 border border-stone-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl p-2 rounded-xl bg-black border border-stone-800">
                        {product.imageIcon}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {product.name.mr}
                        </h4>
                        <span className="text-xs text-amber-400 font-mono font-bold">
                          ₹{product.price} x {quantity} = ₹{product.price * quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-black rounded-lg p-0.5 border border-stone-800">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, -1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-amber-300 px-1 font-mono">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(product.id, 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="p-1 text-stone-500 hover:text-red-400"
                        title="काढून टाका"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Devotee Info Form & Checkout */}
            {cartList.length > 0 && (
              <div className="pt-3 border-t border-stone-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="आपले नाव"
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="मोबाईल नंबर"
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="गाव / शहर"
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between text-sm pt-1">
                  <span className="text-stone-300">एकूण अंदाजे देणगी/रक्कम:</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    ₹{totalAmount}
                  </span>
                </div>

                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs sm:text-sm shadow-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>१-क्लिक व्हॉट्सॲपवर ऑर्डर पाठवा (WhatsApp Order)</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

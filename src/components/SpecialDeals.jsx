import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Tag, Clock, Copy, Check, Sparkles, Percent } from 'lucide-react';

export default function SpecialDeals() {
  const { applyCoupon, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  // Simulated countdown timer (resetting every 12 hours)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const deals = [
    {
      code: 'FOODIE20',
      badge: 'Most Popular',
      title: 'Flat 20% OFF On Orders > $15',
      desc: 'Valid on entire burger & sandwich menu. Applied instantly at checkout.',
      bgGradient: 'from-brand-600 via-rose-600 to-amber-600',
      accentColor: 'text-amber-300'
    },
    {
      code: 'FREESHIP',
      badge: 'Zero Delivery Fee',
      title: 'FREE Express Home Delivery',
      desc: 'Valid on all healthy salads, wraps, and bowls ordered above $12.',
      bgGradient: 'from-emerald-700 via-teal-700 to-cyan-700',
      accentColor: 'text-emerald-300'
    },
    {
      code: 'TASTY50',
      badge: 'First Time Foodie',
      title: '50% OFF Up To $8.00',
      desc: 'Exclusive welcome treat for new foodies. Taste culinary happiness today!',
      bgGradient: 'from-purple-700 via-indigo-700 to-brand-700',
      accentColor: 'text-purple-300'
    }
  ];

  return (
    <section id="deals" className="py-12 bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Limited Time Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              Today's Chef Deals & Promos
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="inline-flex items-center gap-3 bg-white dark:bg-stone-800 px-4 py-2.5 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
            <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Deals reset in:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-sm text-stone-900 dark:text-white">
              <span className="bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded text-xs">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded text-xs">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded text-xs text-brand-600 dark:text-brand-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* 3 Deal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const isCopied = copiedCode === deal.code;
            return (
              <div
                key={deal.code}
                className={`relative rounded-3xl p-6 text-white bg-gradient-to-br ${deal.bgGradient} shadow-xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300`}
              >
                {/* Decorative background circle */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      {deal.badge}
                    </span>
                    <Percent className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed mb-6 font-medium">
                    {deal.desc}
                  </p>
                </div>

                {/* Promo Code Box */}
                <div className="flex items-center justify-between bg-black/25 backdrop-blur-md rounded-2xl p-2 pl-4 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-white/80" />
                    <span className="font-mono font-bold text-sm tracking-wider">
                      {deal.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(deal.code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-stone-900 text-xs font-bold shadow-md hover:bg-stone-100 active:scale-95 transition-all"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


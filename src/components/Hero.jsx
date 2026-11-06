import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  UtensilsCrossed, 
  Sparkles, 
  Star, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Award,
  Calendar
} from 'lucide-react';

export default function Hero() {
  const { setIsReservationOpen } = useCart();

  const handleScrollToMenu = (e) => {
    e.preventDefault();
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg/bg-1.jpg"
          alt="Foodies gourmet background"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse-subtle"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top promotional pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
              <span className="text-amber-300 font-bold">Chef's Special:</span>
              <span className="text-stone-200">20% OFF with code</span>
              <span className="px-2 py-0.5 rounded bg-brand-600 text-white font-mono text-xs font-bold tracking-wider">
                FOODIE20
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Fresh, Delicious & <br />
              <span className="bg-gradient-to-r from-brand-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                Hot Meals Everyday
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-normal">
              Indulge in artisanal double-stacked burgers, gourmet toasted sandwiches, and organic green bowls. Crafted with farm-fresh ingredients, passion, and delivered hot to your doorstep in 30 minutes!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#menu"
                onClick={handleScrollToMenu}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Ratings & Social Proof */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-brand-500 object-cover"
                    src="/images/review/review-1.jpg"
                    alt="Customer avatar"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-brand-500 object-cover"
                    src="/images/review/review-2.jpg"
                    alt="Customer avatar"
                  />
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-brand-500 bg-stone-800 text-xs font-bold text-amber-400">
                    +12k
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="ml-1.5 font-bold text-white text-sm">4.9/5</span>
                  </div>
                  <span className="text-xs text-stone-300 font-medium">Over 12,000+ happy foodies</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Dish Showcase Card with Glass Effect */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden">
                  <img
                    src="/images/img/img-2.png"
                    alt="Gourmet Burger Feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Price & Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-600 text-white inline-block mb-1">
                        Chef's Masterpiece
                      </span>
                      <h2 className="text-xl font-bold">Gourmet Feast Platter</h2>
                      <p className="text-xs text-stone-300">Sliders, loaded fries & artisan dips</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-amber-300">$14.99</span>
                      <span className="block text-xs line-through text-stone-400">$18.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: 30 Mins Delivery */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-stone-900 text-stone-800 dark:text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-200 dark:border-stone-800 animate-float">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">Fast Delivery</p>
                  <p className="text-sm font-extrabold">25 – 35 Mins</p>
                </div>
              </div>

              {/* Floating Badge 2: 100% Fresh */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white dark:bg-stone-900 text-stone-800 dark:text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-200 dark:border-stone-800 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">Quality</p>
                  <p className="text-sm font-extrabold">100% Farm Fresh</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Feature Pillars */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Free Delivery</p>
              <p className="text-[11px] text-stone-400">On all orders above $25</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Hygienic</p>
              <p className="text-[11px] text-stone-400">Sanitized kitchen & pack</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-rose-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Master Recipes</p>
              <p className="text-[11px] text-stone-400">Handcrafted with love</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-sky-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Hot & Fresh</p>
              <p className="text-[11px] text-stone-400">Steam sealed packaging</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}


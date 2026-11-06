import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Award, 
  ChefHat, 
  ArrowRight 
} from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Leaf,
      title: 'Farm to Fork Freshness',
      desc: 'We partner directly with certified local organic farms. Crisp veggies, ripe fruits, and unbleached whole grain flour.'
    },
    {
      icon: ChefHat,
      title: 'Master Chef Recipes',
      desc: 'Slow-simmered sauces, house-cured pickling, and signature seasoning blends tested to absolute culinary perfection.'
    },
    {
      icon: ShieldCheck,
      title: 'Hygienic Sanitized Kitchen',
      desc: 'Steam-sterilized preparation surfaces, 100% contactless handling, and grade-A certified food hygiene audits.'
    },
    {
      icon: Heart,
      title: 'Cooked with Love',
      desc: 'No artificial preservatives, no shortcuts. Every single meal is freshly made upon your order, never pre-heated.'
    }
  ];

  const stats = [
    { label: 'Happy Foodies Served', value: '12,500+' },
    { label: 'Artisan Dishes', value: '25+' },
    { label: 'Average Diner Rating', value: '4.9 ★' },
    { label: 'Express Delivery Time', value: '28 Mins' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main Background Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 h-80 sm:h-96">
                <img
                  src="/images/bg/bg-3.jpg"
                  alt="Foodies dining atmosphere"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Our Sanctuary</span>
                  <h4 className="text-lg font-extrabold">Cozy Vibes & Unforgettable Flavors</h4>
                </div>
              </div>

              {/* Overlapping secondary image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-52 h-44 sm:h-52 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 hidden sm:block">
                <img
                  src="/images/img/img-5.jpg"
                  alt="Freshly baked specials"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 -left-4 sm:-left-6 bg-brand-600 text-white p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-300" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-rose-200">Award Winning</p>
                  <p className="text-sm font-black">Best Veg Spot 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Foodies Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-snug">
              Crafted with Passion, <br />
              <span className="text-brand-600 dark:text-brand-500">
                Served with Warmth.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              <strong>Foodies</strong> started with one simple mission: prove that pure vegetarian comfort food can be breathtakingly flavorful, delightfully crispy, and deeply nourishing.
            </p>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              Whether you're celebrating a weekend with our double-stacked Maharaja burger, recharging with a crisp farm salad, or sinking your teeth into an oozing cheese burst sandwich — every dish is a love letter to honest culinary craft.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              {stats.map((st, i) => (
                <div key={i} className="text-left">
                  <span className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 block">
                    {st.value}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Four Culinary Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 space-y-3 hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-stone-900 dark:text-white">
                  {pill.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
                  {pill.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


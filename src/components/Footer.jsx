import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/foodData';
import { 
  ArrowUp, 
  Heart, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Send,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showToast('Subscribed to Foodies Secret Club! Welcome discount sent to your email 🎁', 'success');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center p-1">
                <img
                  src="/images/logo.png"
                  alt="Foodies Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-2xl tracking-tight text-white font-sans">
                FOODIES
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your neighborhood culinary destination offering artisanal burgers, gourmet grilled sandwiches, and farm-fresh organic bowls. Hot, fresh, and delivered in 30 minutes.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-brand-400 transition-colors">Home Banner</a></li>
              <li><a href="#menu" className="hover:text-brand-400 transition-colors">Explore Menu</a></li>
              <li><a href="#deals" className="hover:text-brand-400 transition-colors">Special Offers</a></li>
              <li><a href="#about" className="hover:text-brand-400 transition-colors">Our Story</a></li>
              <li><a href="#reviews" className="hover:text-brand-400 transition-colors">Diner Reviews</a></li>
              <li><a href="#contact" className="hover:text-brand-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">
              Store Information
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">
              Secret Foodie Club
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to get secret weekend menu drops, flash coupons & chef recipes.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're in the club! Check inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe for 10% Off</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Foodies Restaurant Inc. Made with 
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> 
            for food lovers everywhere.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}


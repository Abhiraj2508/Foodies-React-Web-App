import React, { useState } from 'react';
import { RESTAURANT_INFO, FAQS } from '../data/foodData';
import { useCart } from '../context/CartContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ContactSection() {
  const { showToast } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Order Question',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast(`Thank you ${form.name}! We've received your message.`, 'success');
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect With Foodies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Get In Touch With Us
          </h2>
          <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm">
            Have a catering request, question about dietary options, or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* 2-Column Main Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Address */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider">Visit Our Dine-In Hub</h4>
                <p className="font-bold text-sm text-stone-900 dark:text-white mt-0.5">
                  {RESTAURANT_INFO.address}
                </p>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 block">
                  Free guest parking & outdoor terrace seating
                </span>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider">Quick Call / Hotline</h4>
                <a 
                  href={`tel:${RESTAURANT_INFO.phone}`} 
                  className="font-bold text-sm text-stone-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors mt-0.5 block"
                >
                  {RESTAURANT_INFO.phone}
                </a>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
                  ● Kitchen line open right now
                </span>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider">Email Support</h4>
                <a 
                  href={`mailto:${RESTAURANT_INFO.email}`} 
                  className="font-bold text-sm text-stone-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors mt-0.5 block"
                >
                  {RESTAURANT_INFO.email}
                </a>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 block">
                  Replies typically within 2 business hours
                </span>
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider">Opening Hours</h4>
                <p className="font-bold text-sm text-stone-900 dark:text-white mt-0.5">
                  {RESTAURANT_INFO.hours}
                </p>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 block">
                  Open every day including holidays
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-stone-50 dark:bg-stone-800/40 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-700/80">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="font-bold">{form.name}</span>. Our guest hospitality team will email you back at <span className="font-bold">{form.email}</span> promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: 'Order Question', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Maya Sharma"
                      className="w-full p-3 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-xs border border-stone-200 dark:border-stone-700 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. maya@example.com"
                      className="w-full p-3 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-xs border border-stone-200 dark:border-stone-700 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-xs border border-stone-200 dark:border-stone-700 focus:border-brand-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Order Question">Order Inquiry / Delivery Tracking</option>
                    <option value="Table Booking">Table Reservation Question</option>
                    <option value="Catering & Party">Bulk Catering & Party Orders</option>
                    <option value="Feedback">Compliment / Feedback for Chef</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can our culinary team help you today?"
                    className="w-full p-3 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-xs border border-stone-200 dark:border-stone-700 focus:border-brand-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/30 active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Foodies</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-stone-100 dark:border-stone-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-stone-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Everything you need to know about our recipes, hygiene, and orders.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-stone-900 dark:text-white focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-200/50 dark:border-stone-700/50 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


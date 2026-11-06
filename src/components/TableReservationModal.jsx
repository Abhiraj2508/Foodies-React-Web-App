import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  Utensils 
} from 'lucide-react';

export default function TableReservationModal() {
  const { isReservationOpen, setIsReservationOpen, showToast } = useCart();

  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState('2 Guests');
  const [seating, setSeating] = useState('Cozy Indoor Dining');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isReserved, setIsReserved] = useState(false);

  if (!isReservationOpen) return null;

  const timeslots = [
    '12:30 PM', '01:30 PM', '02:00 PM', 
    '07:00 PM', '07:30 PM', '08:30 PM', '09:15 PM'
  ];

  const guestOptions = [
    '1 Guest', '2 Guests', '3-4 Guests', '5-6 Guests', '7+ Guests (Party)'
  ];

  const seatingOptions = [
    'Cozy Indoor Dining', 'Garden Patio (Outdoor)', 'Private Romantic Booth'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsReserved(true);
    showToast(`Table reserved for ${name} on ${date} at ${time}!`, 'success');
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setIsReserved(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 dark:text-white leading-tight">
                Reserve a Table
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                Dine-in at Foodies Restaurant
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isReserved ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-white">
              Table Confirmed!
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xs mx-auto leading-relaxed">
              We've reserved a table for <span className="font-bold">{guests}</span> on <span className="font-bold">{date}</span> at <span className="font-bold">{time}</span> under <span className="font-bold">{name}</span>.
            </p>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-left space-y-1">
              <p><span className="text-stone-400 font-semibold">Location:</span> 123 Flavor Street, Food City</p>
              <p><span className="text-stone-400 font-semibold">Seating:</span> {seating}</p>
              <p><span className="text-stone-400 font-semibold">Confirmation SMS:</span> Sent to {phone}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-2xl bg-brand-600 text-white font-extrabold text-xs shadow-md transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">
            
            {/* Date & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                >
                  {guestOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeslots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                      time === slot
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Seating Atmosphere
              </label>
              <select
                value={seating}
                onChange={(e) => setSeating(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
              >
                {seatingOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Special Occasion or Request
              </label>
              <input
                type="text"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Birthday celebration, anniversary, quiet table..."
                className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/30 active:scale-98 transition-all"
              >
                Confirm Table Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}


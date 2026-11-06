import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Bike, 
  MapPin, 
  PhoneCall, 
  Sparkles, 
  Utensils, 
  ShoppingBag 
} from 'lucide-react';

export default function OrderTrackerModal() {
  const { 
    activeOrder, 
    isOrderTrackerOpen, 
    setIsOrderTrackerOpen, 
    showToast 
  } = useCart();

  // Progress steps: 0 = Placed, 1 = Preparing, 2 = On the way, 3 = Delivered
  const [currentStep, setCurrentStep] = useState(1);
  const [etaMinutes, setEtaMinutes] = useState(25);

  useEffect(() => {
    if (!isOrderTrackerOpen) return;
    
    // Simulate step progression
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setEtaMinutes(18);
    }, 12000);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setEtaMinutes(0);
    }, 30000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOrderTrackerOpen]);

  if (!isOrderTrackerOpen || !activeOrder) return null;

  const steps = [
    { label: 'Order Confirmed', time: 'Just now', icon: CheckCircle2 },
    { label: 'Kitchen Preparing', time: 'In progress', icon: ChefHat },
    { label: 'Out for Delivery', time: 'ETA 20 mins', icon: Bike },
    { label: 'Delivered Hot', time: 'Estimated soon', icon: Utensils },
  ];

  const handleCallPartner = () => {
    showToast('Calling delivery partner Rajesh (+91 98765 00000)...', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Live Order Tracking
              </span>
            </div>
            <h2 className="font-extrabold text-xl text-stone-900 dark:text-white">
              Order #{activeOrder.orderId}
            </h2>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Estimated Arrival Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-600 text-white flex items-center justify-between shadow-lg shadow-brand-600/20">
            <div>
              <p className="text-xs text-rose-100 font-medium">Estimated Delivery Time</p>
              <h3 className="text-2xl font-black">
                {etaMinutes > 0 ? `${etaMinutes} – ${etaMinutes + 8} Minutes` : 'Delivered! 🎉'}
              </h3>
              <p className="text-[11px] text-rose-200 mt-0.5">Freshly prepared & steam sealed</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-2">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={st.label} className="relative flex items-center gap-4">
                    <div 
                      className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/40 animate-pulse-subtle'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <h4 className={`text-sm font-bold ${
                          isPassed || isCurrent ? 'text-stone-900 dark:text-white' : 'text-stone-400'
                        }`}>
                          {st.label}
                        </h4>
                        <p className="text-xs text-stone-400">
                          {isCurrent ? 'Happening right now' : isPassed ? 'Completed' : 'Upcoming step'}
                        </p>
                      </div>

                      <span className="text-[11px] font-semibold text-stone-400">
                        {st.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Card */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/review/review-2.jpg"
                  alt="Delivery Partner"
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-800 flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">Rajesh Kumar</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Express Courier • 4.9 ⭐ (840 deliveries)
                </p>
              </div>
            </div>

            <button
              onClick={handleCallPartner}
              className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:bg-brand-100 transition-colors"
              title="Call delivery partner"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Address Summary */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Delivering To:</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 pl-5">
              {activeOrder.customer.name} • {activeOrder.customer.phone}
            </p>
            <p className="text-stone-500 dark:text-stone-400 pl-5">
              {activeOrder.customer.address}
            </p>
          </div>

          {/* Items Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Order Items ({activeOrder.items.length})
            </h4>
            <div className="space-y-1.5 divide-y divide-stone-100 dark:divide-stone-800 text-xs">
              {activeOrder.items.map((it, idx) => (
                <div key={idx} className="pt-1.5 flex justify-between text-stone-700 dark:text-stone-300">
                  <span>{it.quantity}x {it.name} ({it.sizeName})</span>
                  <span className="font-bold">${it.totalPrice.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-extrabold text-sm text-stone-900 dark:text-white">
                <span>Total Paid</span>
                <span className="text-brand-600 dark:text-brand-400">${activeOrder.finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="w-full py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-extrabold text-xs transition-all shadow-md"
          >
            Back to Foodies Store
          </button>
        </div>

      </div>
    </div>
  );
}


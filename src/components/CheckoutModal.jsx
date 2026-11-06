import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  Wallet, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  LogIn, 
  Sparkles 
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    finalTotal, 
    deliveryFee, 
    subtotal, 
    tax, 
    discountAmount, 
    clearCart, 
    setActiveOrder, 
    setIsOrderTrackerOpen,
    showToast 
  } = useCart();

  const { user, setIsAuthModalOpen, addOrderToHistory } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    instructions: '',
    paymentMethod: 'cod' // 'cod' | 'upi' | 'card'
  });

  // Autofill user info if logged in
  useEffect(() => {
    if (user) {
      const defaultAddr = user.addresses?.find(a => a.isDefault) || user.addresses?.[0];
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: defaultAddr?.address || prev.address
      }));
    }
  }, [user, isCheckoutOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectAddress = (addrText) => {
    setFormData(prev => ({ ...prev, address: addrText }));
    showToast('Saved address selected!', 'info');
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('Please fill in your name, phone, and delivery address.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulated short network delay for realism
    setTimeout(() => {
      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      const orderNumber = `FD-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderDetails = {
        orderId: orderNumber,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...cart],
        customer: { ...formData },
        subtotal,
        deliveryFee,
        tax,
        discountAmount,
        finalTotal,
        estimatedMinutes: 28,
        status: 'placed' // 'placed' -> 'preparing' -> 'on_the_way' -> 'delivered'
      };

      // Save to user history
      addOrderToHistory(orderDetails);
      setActiveOrder(orderDetails);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsOrderTrackerOpen(true);
      showToast(`Order #${orderNumber} placed successfully!`, 'success');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 dark:text-white leading-tight">
                Delivery & Checkout
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                Final step to deliciousness
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is not logged in: Banner */}
        {!user && (
          <div className="p-3 bg-brand-50 dark:bg-brand-950/30 border-b border-brand-100 dark:border-brand-900/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-xs text-brand-900 dark:text-brand-200 font-medium">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Have an account? Log in for 1-click address autofill & reward coins.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1 rounded-xl bg-brand-600 text-white font-extrabold text-[11px] shadow-sm hover:bg-brand-700 whitespace-nowrap ml-2"
            >
              Log In
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Customer Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <User className="w-4 h-4" /> 1. Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Email Address (for receipt & live updates)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. foodie@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> 2. Delivery Address
              </h3>
              
              {user && user.addresses && user.addresses.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[10px] text-stone-400 font-semibold">Saved:</span>
                  {user.addresses.map(a => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleSelectAddress(a.address)}
                      className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-[10px] font-bold"
                    >
                      {a.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Street Address / House / Flat No. *
              </label>
              <textarea
                name="address"
                required
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Flat 402, Green Valley Apartments, 12th Main Road, Food City"
                className="w-full p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Nearby Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="e.g. Near Metro Station / City Park"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Delivery Note for Rider
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="e.g. Leave at door, don't ring bell"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" /> 3. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label 
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer text-xs font-bold transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="hidden"
                />
                <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="leading-tight">Cash on Delivery</p>
                  <span className="text-[10px] text-stone-400 font-normal">Pay at doorstep</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer text-xs font-bold transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="hidden"
                />
                <Wallet className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <p className="leading-tight">Instant UPI / QR</p>
                  <span className="text-[10px] text-stone-400 font-normal">GPay, PhonePe, Paytm</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer text-xs font-bold transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="hidden"
                />
                <CreditCard className="w-5 h-5 text-purple-500 shrink-0" />
                <div>
                  <p className="leading-tight">Credit/Debit Card</p>
                  <span className="text-[10px] text-stone-400 font-normal">Visa, Mastercard</span>
                </div>
              </label>
            </div>
          </div>

          {/* Security Guarantee */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-100 dark:bg-stone-800/50 text-[11px] text-stone-500 dark:text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>256-Bit SSL Encrypted & 100% Safe Contactless Delivery Guarantee</span>
          </div>

          {/* Sticky Modal Footer */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-xl shadow-brand-600/30 active:scale-98 transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
              <span>${finalTotal.toFixed(2)}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Percent 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    deliveryFee, 
    isFreeDelivery,
    freeDeliveryThreshold,
    tax, 
    appliedPromo, 
    applyCoupon, 
    removeCoupon, 
    discountAmount, 
    finalTotal,
    totalItemCount,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const amountNeededForFreeShip = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeShipProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Click outside to close */}
      <div 
        className="flex-1 cursor-pointer" 
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Drawer Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800 animate-slide-up sm:animate-none"
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 dark:text-white leading-tight">
                Your Delicious Bag
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-bold text-stone-400 hover:text-rose-500 transition-colors px-2 py-1"
                title="Clear entire cart"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Meter */}
        {cart.length > 0 && (
          <div className="px-5 py-3 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                <Truck className="w-4 h-4 text-brand-600" />
                {isFreeDelivery ? (
                  <span className="text-emerald-600 dark:text-emerald-400">You unlocked FREE Express Delivery! 🎉</span>
                ) : (
                  <span>Add <span className="text-brand-600">${amountNeededForFreeShip.toFixed(2)}</span> more for FREE Delivery</span>
                )}
              </span>
              <span className="text-stone-400">{Math.round(freeShipProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${freeShipProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-stone-900 dark:text-white mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs leading-relaxed">
                  Satisfy your hunger! Explore our signature burgers, toasted artisan sandwiches, and fresh bowls.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold shadow-md active:scale-95 transition-all"
              >
                Browse Delicious Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.cartItemId}
                className="flex gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800 group"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5 mt-0.5">
                      <span className="font-medium">{item.sizeName}</span>
                      {item.addons && item.addons.length > 0 && (
                        <p className="line-clamp-1 text-stone-400">
                          +{item.addons.map(a => a.name).join(', ')}
                        </p>
                      )}
                      {item.specialInstructions && (
                        <p className="italic text-stone-400 text-[10px]">
                          Note: "{item.specialInstructions}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-200/50 dark:border-stone-700/50">
                    <div className="flex items-center gap-2 bg-white dark:bg-stone-900 px-2 py-0.5 rounded-lg border border-stone-200 dark:border-stone-700">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-stone-500 hover:text-stone-800 dark:hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs w-4 text-center text-stone-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-stone-500 hover:text-stone-800 dark:hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-black text-sm text-stone-900 dark:text-white">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Coupons & Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-4">
            
            {/* Promo Code Input / Active Promo */}
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300">
                      {appliedPromo.code} applied!
                    </span>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                      You saved ${discountAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-stone-400 hover:text-rose-500 text-xs font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Promo code (e.g. FOODIE20)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-900 dark:text-white uppercase focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-extrabold transition-all"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Delivery Fee</span>
                {isFreeDelivery ? (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                ) : (
                  <span className="font-semibold text-stone-800 dark:text-stone-200">${deliveryFee.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Taxes & GST (5%)</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">${tax.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Coupon Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-black text-stone-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-brand-600 dark:text-brand-400">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-xl shadow-brand-600/30 active:scale-98 transition-all"
            >
              <span>Proceed to Checkout</span>
              <div className="flex items-center gap-1">
                <span>${finalTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>

          </div>
        )}

      </div>

    </div>
  );
}


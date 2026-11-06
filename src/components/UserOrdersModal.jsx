import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  ArrowRight 
} from 'lucide-react';

export default function UserOrdersModal() {
  const { 
    isOrdersModalOpen, 
    setIsOrdersModalOpen, 
    userOrders 
  } = useAuth();

  const { 
    addToCart, 
    setActiveOrder, 
    setIsOrderTrackerOpen, 
    setIsCartOpen, 
    showToast 
  } = useCart();

  if (!isOrdersModalOpen) return null;

  const handleReorder = (order) => {
    order.items.forEach(it => {
      addToCart(it, it.quantity, { name: it.sizeName, price: it.unitPrice }, it.addons, it.specialInstructions);
    });
    setIsOrdersModalOpen(false);
    setIsCartOpen(true);
    showToast(`Added ${order.items.length} items from #${order.orderId} to your cart!`, 'success');
  };

  const handleTrack = (order) => {
    setActiveOrder(order);
    setIsOrdersModalOpen(false);
    setIsOrderTrackerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 dark:text-white leading-tight">
                My Past Orders
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {userOrders.length} {userOrders.length === 1 ? 'order' : 'orders'} placed
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {userOrders.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-stone-800 dark:text-stone-200 mb-1">
                  No orders placed yet
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
                  Treat yourself to our handcrafted burgers, crispy sandwiches, or fresh bowls!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsOrdersModalOpen(false);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            userOrders.map((ord) => (
              <div
                key={ord.orderId}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 space-y-3"
              >
                {/* Order Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-stone-900 dark:text-white">
                      #{ord.orderId}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Confirmed</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" /> {ord.createdAt || 'Recently'}
                  </span>
                </div>

                {/* Items Thumbnails & Names */}
                <div className="space-y-1.5 py-1">
                  {ord.items && ord.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                      <div className="flex items-center gap-2">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-7 h-7 rounded-lg object-cover"
                        />
                        <span className="font-semibold">{it.quantity}x {it.name}</span>
                        <span className="text-stone-400 text-[10px]">({it.sizeName})</span>
                      </div>
                      <span className="font-bold text-stone-900 dark:text-white">
                        ${(it.totalPrice || it.unitPrice * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar: Amount & Actions */}
                <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">Total Amount</span>
                    <span className="text-sm font-black text-brand-600 dark:text-brand-400">
                      ${ord.finalTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTrack(ord)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold hover:border-brand-500 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-600" />
                      <span>Track</span>
                    </button>

                    <button
                      onClick={() => handleReorder(ord)}
                      className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-Order</span>
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Star, 
  Clock, 
  Flame, 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  Info, 
  ShieldCheck 
} from 'lucide-react';

export default function FoodDetailModal() {
  const { quickViewItem, setQuickViewItem, addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults when quickViewItem changes
  useEffect(() => {
    if (quickViewItem) {
      setSelectedSize(quickViewItem.sizes ? quickViewItem.sizes[0] : { name: 'Regular', price: quickViewItem.price });
      setSelectedAddons([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [quickViewItem]);

  if (!quickViewItem) return null;

  const handleAddonToggle = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const currentSizePrice = selectedSize ? selectedSize.price : quickViewItem.price;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = currentSizePrice + addonsTotal;
  const itemTotalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(quickViewItem, quantity, selectedSize, selectedAddons, specialInstructions);
    setQuickViewItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewItem(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Header Image Showcase */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img
              src={quickViewItem.image}
              alt={quickViewItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Top Left Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {quickViewItem.isBestseller && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500 text-white shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" /> Bestseller
                </span>
              )}
              {quickViewItem.isChefPick && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-brand-600 text-white shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-white" /> Chef Pick
                </span>
              )}
            </div>

            {/* Bottom Info on Image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                  {quickViewItem.categoryLabel}
                </span>
                <h2 className="text-2xl font-black text-white">{quickViewItem.name}</h2>
              </div>
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{quickViewItem.rating}</span>
                <span className="text-stone-300">({quickViewItem.reviewsCount})</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 text-center text-xs">
            <div>
              <span className="block text-stone-400 font-medium">Prep Time</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">{quickViewItem.prepTime}</span>
            </div>
            <div className="border-x border-stone-200 dark:border-stone-700">
              <span className="block text-stone-400 font-medium">Calories</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">{quickViewItem.calories}</span>
            </div>
            <div>
              <span className="block text-stone-400 font-medium">Spice Level</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">
                {quickViewItem.spicyLevel === 0 ? 'Mild & Gentle' : `${'🌶️'.repeat(quickViewItem.spicyLevel)} (${quickViewItem.spicyLevel}/3)`}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">Description</h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {quickViewItem.description}
            </p>
          </div>

          {/* Fresh Ingredients */}
          {quickViewItem.ingredients && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Key Ingredients</h3>
              <div className="flex flex-wrap gap-1.5">
                {quickViewItem.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portion / Size Selector */}
          {quickViewItem.sizes && quickViewItem.sizes.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                Choose Portion Size
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {quickViewItem.sizes.map((size) => {
                  const isSelected = selectedSize?.name === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 shadow-sm'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-brand-600 bg-brand-600' : 'border-stone-300 dark:border-stone-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span>{size.name}</span>
                      </div>
                      <span className="font-extrabold">${size.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Add-ons */}
          {quickViewItem.addons && quickViewItem.addons.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                Delicious Add-Ons
              </h3>
              <div className="space-y-2">
                {quickViewItem.addons.map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleAddonToggle(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-stone-300 dark:border-stone-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span>+${addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Special Kitchen Notes / Instructions
            </h3>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra napkins, less spicy, no onions, dressing on the side..."
              className="w-full p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 text-xs border border-transparent focus:border-brand-500 focus:outline-none transition-all resize-none"
            />
          </div>

        </div>

        {/* Modal Sticky Footer: Quantity & Add Button */}
        <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white dark:bg-stone-800 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 disabled:opacity-40 hover:bg-stone-200 active:scale-95 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-sm w-6 text-center text-stone-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-between px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-xl shadow-brand-600/30 active:scale-98 transition-all"
          >
            <span>Add to Order</span>
            <span>${itemTotalPrice.toFixed(2)}</span>
          </button>

        </div>

      </div>
    </div>
  );
}


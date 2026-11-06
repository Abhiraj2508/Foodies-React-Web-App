import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Star, 
  Clock, 
  Flame, 
  Plus, 
  Eye, 
  Sparkles, 
  Check, 
  Heart 
} from 'lucide-react';

export default function FoodCard({ item }) {
  const { addToCart, setQuickViewItem, cart, showToast } = useCart();
  const { favorites, toggleFavorite, user, setIsAuthModalOpen } = useAuth();

  // Check if item is already in cart
  const cartMatches = cart.filter(ci => ci.id === item.id);
  const totalInCart = cartMatches.reduce((sum, ci) => sum + ci.quantity, 0);

  const isFavorited = favorites.includes(item.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item.id);
    if (!isFavorited) {
      showToast(`Saved "${item.name}" to your favorites! ❤️`, 'success');
    } else {
      showToast(`Removed from favorites`, 'info');
    }
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  const handleOpenDetail = () => {
    setQuickViewItem(item);
  };

  return (
    <div 
      onClick={handleOpenDetail}
      className="group relative bg-white dark:bg-stone-900 rounded-3xl p-4 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Gradient overlay on bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Quick View Button overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetail();
              }}
              className="px-4 py-2 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-900 dark:text-white text-xs font-bold shadow-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform"
            >
              <Eye className="w-3.5 h-3.5 text-brand-600" />
              <span>Quick View & Customize</span>
            </button>
          </div>

          {/* Top Left Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {item.isBestseller && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white shadow-md">
                <Flame className="w-3 h-3 fill-white" />
                <span>Bestseller</span>
              </span>
            )}
            {item.isChefPick && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-600 text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                <span>Chef Pick</span>
              </span>
            )}
          </div>

          {/* Top Right: Veg Emblem, Favorite Heart & Calories */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            {/* Heart Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-90"
              title={isFavorited ? "Remove from favorites" : "Save to favorites"}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFavorited ? 'fill-rose-500 text-rose-500' : 'text-white'
                }`}
              />
            </button>

            {item.isVeg && (
              <div 
                className="w-5 h-5 rounded border border-emerald-600 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
                title="100% Pure Vegetarian"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              </div>
            )}
            {item.calories && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                {item.calories}
              </span>
            )}
          </div>

          {/* Bottom Left Info on Image: Prep Time */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-semibold text-white px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md">
            <Clock className="w-3 h-3" />
            <span>{item.prepTime}</span>
          </div>

          {/* Bottom Right: Spicy indicator */}
          {item.spicyLevel > 0 && (
            <div className="absolute bottom-2 right-2 text-xs bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md" title={`Spice level: ${item.spicyLevel}/3`}>
              {'🌶️'.repeat(item.spicyLevel)}
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="space-y-1.5">
          
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              {item.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{item.rating}</span>
              <span className="text-stone-400 text-[10px]">({item.reviewsCount})</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 className="text-base font-bold text-stone-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>

        </div>
      </div>

      {/* Card Footer: Price & Add Button */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-stone-900 dark:text-white">
              ${item.price.toFixed(2)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-stone-400 font-medium">Portion options inside</span>
        </div>

        <button
          onClick={handleQuickAdd}
          aria-label={`Add ${item.name} to cart`}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm ${
            totalInCart > 0
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/20 hover:shadow-brand-600/40'
          }`}
        >
          {totalInCart > 0 ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{totalInCart} in Cart</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}

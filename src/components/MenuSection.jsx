import React, { useState, useMemo } from 'react';
import { FOOD_ITEMS, CATEGORIES } from '../data/foodData';
import FoodCard from './FoodCard';
import { 
  Search, 
  X, 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  Utensils, 
  Layers, 
  Salad, 
  Coffee,
  Check
} from 'lucide-react';

const CATEGORY_ICON_MAP = {
  Sparkles,
  Flame,
  Layers,
  Salad,
  Coffee
};

export default function MenuSection({ searchInputRef }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterBestsellerOnly, setFilterBestsellerOnly] = useState(false);
  const [filterChefPickOnly, setFilterChefPickOnly] = useState(false);
  const [filterUnder8, setFilterUnder8] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Filter & sort logic
  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryLabel.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesIngredients) {
          return false;
        }
      }
      // Dietary & feature filters
      if (filterVegOnly && !item.isVeg) return false;
      if (filterBestsellerOnly && !item.isBestseller) return false;
      if (filterChefPickOnly && !item.isChefPick) return false;
      if (filterUnder8 && item.price >= 8) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default featured
    });
  }, [
    selectedCategory,
    searchQuery,
    filterVegOnly,
    filterBestsellerOnly,
    filterChefPickOnly,
    filterUnder8,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilterVegOnly(false);
    setFilterBestsellerOnly(false);
    setFilterChefPickOnly(false);
    setFilterUnder8(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    searchQuery !== '' || 
    filterVegOnly || 
    filterBestsellerOnly || 
    filterChefPickOnly || 
    filterUnder8 || 
    sortBy !== 'featured';

  return (
    <section id="menu" className="py-20 bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Signature Selections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Explore Our Delicious Menu
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Freshly prepared gourmet meals, wholesome ingredients, and crave-worthy recipes delivered steaming hot.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200 dark:border-stone-800 mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, salads, sandwiches, ingredients..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 text-sm font-medium border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-stone-900 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold border border-transparent focus:border-brand-500 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const IconComponent = CATEGORY_ICON_MAP[cat.icon] || Sparkles;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <span className="text-stone-400 font-semibold text-[11px] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
            </span>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                filterVegOnly
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>100% Veg</span>
              {filterVegOnly && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterBestsellerOnly(!filterBestsellerOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                filterBestsellerOnly
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Bestsellers</span>
              {filterBestsellerOnly && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterChefPickOnly(!filterChefPickOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                filterChefPickOnly
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Chef's Choice</span>
              {filterChefPickOnly && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterUnder8(!filterUnder8)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                filterUnder8
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>Pocket Friendly (Under $8)</span>
              {filterUnder8 && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="ml-auto text-brand-600 dark:text-brand-400 font-bold hover:underline text-xs"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Result Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            Showing <span className="font-bold text-stone-900 dark:text-white">{filteredItems.length}</span> delicious creations
          </p>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4 text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-1">
              No matching dishes found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
              Try searching for something else or clear the active filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-md transition-all"
            >
              Show All Dishes
            </button>
          </div>
        )}

      </div>
    </section>
  );
}


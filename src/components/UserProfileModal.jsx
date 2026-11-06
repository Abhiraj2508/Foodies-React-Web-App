import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Coins, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  Plus, 
  Check, 
  Sparkles 
} from 'lucide-react';

export default function UserProfileModal() {
  const { 
    user, 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    setIsOrdersModalOpen, 
    logout, 
    favorites, 
    userOrders 
  } = useAuth();

  const { showToast } = useCart();
  const [newAddressInput, setNewAddressInput] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);

  if (!isProfileModalOpen || !user) return null;

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;
    user.addresses = [
      ...user.addresses,
      { id: `addr_${Date.now()}`, title: 'Custom Address', address: newAddressInput.trim(), isDefault: false }
    ];
    setNewAddressInput('');
    setShowAddAddress(false);
    showToast('New address saved to your profile!', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out safely.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 dark:text-white leading-tight">
                My Foodie Profile
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                Account & preferences
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* User Bio Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-stone-900 dark:text-white leading-tight">
                  {user.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  Gold Foodie
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3.5 h-3.5" /> {user.phone}
              </p>
            </div>
          </div>

          {/* Foodie Coins Wallet */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Foodie Rewards Wallet
              </span>
              <h4 className="text-2xl font-black mt-0.5">
                {user.coins || 0} Coins
              </h4>
              <p className="text-xs text-amber-100">
                Worth ${((user.coins || 0) * 0.01).toFixed(2)} savings on your next feast!
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Coins className="w-7 h-7 text-amber-200" />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsOrdersModalOpen(true);
              }}
              className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 text-left hover:border-brand-500 transition-colors"
            >
              <div className="flex items-center justify-between text-brand-600 mb-1">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-lg font-black text-stone-900 dark:text-white">
                  {userOrders.length}
                </span>
              </div>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                Orders History
              </span>
              <span className="text-[10px] text-stone-400">Click to view all</span>
            </button>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 text-left">
              <div className="flex items-center justify-between text-rose-500 mb-1">
                <Heart className="w-5 h-5 fill-rose-500" />
                <span className="text-lg font-black text-stone-900 dark:text-white">
                  {favorites.length}
                </span>
              </div>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                Saved Favorites
              </span>
              <span className="text-[10px] text-stone-400">Bookmarked dishes</span>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Saved Delivery Addresses
              </h4>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New</span>
              </button>
            </div>

            {showAddAddress && (
              <form onSubmit={handleAddAddress} className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 space-y-2 animate-fade-in">
                <input
                  type="text"
                  required
                  value={newAddressInput}
                  onChange={(e) => setNewAddressInput(e.target.value)}
                  placeholder="Enter full delivery address..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-3 py-1.5 text-xs text-stone-500 font-bold hover:text-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {user.addresses && user.addresses.map((addr) => (
                <div 
                  key={addr.id}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800 flex items-start gap-3 text-xs"
                >
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-stone-900 dark:text-white">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                      {addr.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer: Logout Action */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-xs p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}


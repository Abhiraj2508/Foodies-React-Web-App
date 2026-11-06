import React, { useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialDeals from './components/SpecialDeals';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FoodDetailModal from './components/FoodDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import TableReservationModal from './components/TableReservationModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import UserOrdersModal from './components/UserOrdersModal';
import Toast from './components/Toast';
import { ShoppingBag } from 'lucide-react';

function AppContent() {
  const { totalItemCount, finalTotal, setIsCartOpen } = useCart();
  const searchInputRef = useRef(null);

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Toast Notification Container */}
      <Toast />

      {/* Navigation */}
      <Navbar onSearchFocus={handleSearchFocus} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <SpecialDeals />
        <MenuSection searchInputRef={searchInputRef} />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <FoodDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <TableReservationModal />
      <AuthModal />
      <UserProfileModal />
      <UserOrdersModal />

      {/* Floating Bottom Quick Cart Bar (Visible on mobile/tablet when cart has items) */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-5 left-4 right-4 sm:hidden z-30 animate-slide-up">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-2xl shadow-brand-600/50 active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white text-brand-600 flex items-center justify-center text-xs font-black">
                {totalItemCount}
              </div>
              <span>View Bag</span>
            </div>
            <div className="flex items-center gap-1 font-mono">
              <span>${finalTotal.toFixed(2)}</span>
              <span className="text-xs font-normal opacity-80">➔</span>
            </div>
          </button>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

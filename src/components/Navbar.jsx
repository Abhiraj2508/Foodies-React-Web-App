import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  Sun, 
  Moon, 
  Menu as MenuIcon, 
  X, 
  Calendar, 
  Search, 
  PhoneCall, 
  Clock, 
  User, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  Package, 
  Coins 
} from 'lucide-react';

export default function Navbar({ onSearchFocus }) {
  const { 
    totalItemCount, 
    setIsCartOpen, 
    darkMode, 
    setDarkMode, 
    setIsReservationOpen 
  } = useCart();

  const { 
    user, 
    setIsAuthModalOpen, 
    setIsProfileModalOpen, 
    setIsOrdersModalOpen, 
    logout 
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Deals', href: '#deals' },
    { name: 'Our Story', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-brand-600 via-rose-600 to-amber-500 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>⚡ Express delivery in 25-35 mins across Food City!</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-rose-100">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 10:00 AM – 10:00 PM
            </span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> +91 0123456789
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-md py-3 border-b border-stone-200/50 dark:border-stone-800/50'
            : 'bg-white/95 dark:bg-stone-900/95 py-4 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')} 
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center p-1 border border-brand-200 dark:border-brand-800 group-hover:scale-105 transition-transform">
                <img 
                  src="/images/logo.png" 
                  alt="Foodies Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-brand-600 dark:text-brand-500 font-sans">
                    FOODIES
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
                </div>
                <span className="text-[10px] tracking-widest text-stone-500 uppercase font-semibold">
                  Fresh & Delicious
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 text-sm font-semibold text-stone-600 hover:text-brand-600 dark:text-stone-300 dark:hover:text-brand-400 rounded-xl hover:bg-stone-100/80 dark:hover:bg-stone-800/50 transition-all duration-150"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Quick Search Button */}
              <button
                onClick={() => {
                  onSearchFocus?.();
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Search Menu"
                className="p-2.5 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Search Food Items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle Theme"
                className="p-2.5 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
              </button>

              {/* Reserve Table Button */}
              <button
                onClick={() => setIsReservationOpen(true)}
                className="hidden xl:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-all border border-stone-200 dark:border-stone-700"
              >
                <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Book Table</span>
              </button>

              {/* User Authentication / Profile Button */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-all text-xs font-bold"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-brand-500"
                    />
                    <span className="hidden sm:inline text-stone-800 dark:text-stone-200 max-w-[80px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 py-2 z-50 animate-fade-in text-xs font-semibold">
                      <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                        <p className="font-bold text-stone-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                        <div className="mt-1 flex items-center gap-1 text-amber-500 font-bold text-[10px]">
                          <Coins className="w-3.5 h-3.5" />
                          <span>{user.coins || 0} Foodie Coins</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full px-4 py-2 text-left text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2.5 transition-colors"
                      >
                        <User className="w-4 h-4 text-brand-600" />
                        <span>My Profile & Addresses</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setIsOrdersModalOpen(true);
                        }}
                        className="w-full px-4 py-2 text-left text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2.5 transition-colors"
                      >
                        <Package className="w-4 h-4 text-emerald-600" />
                        <span>Past Orders History</span>
                      </button>

                      <div className="border-t border-stone-100 dark:border-stone-800 my-1"></div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-all border border-stone-200 dark:border-stone-700"
                >
                  <LogIn className="w-4 h-4 text-brand-600" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItemCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-extrabold bg-white text-brand-600 rounded-full shadow-sm animate-pulse-subtle">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 animate-fade-in shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-stone-700 hover:text-brand-600 hover:bg-rose-50 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 py-2.5 px-3 text-sm font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-xl"
                  >
                    <User className="w-4 h-4 text-brand-600" />
                    <span>My Profile ({user.name})</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOrdersModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 py-2.5 px-3 text-sm font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-xl"
                  >
                    <Package className="w-4 h-4 text-emerald-600" />
                    <span>My Past Orders</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/40 rounded-xl border border-brand-200 dark:border-brand-800"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-xl"
              >
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

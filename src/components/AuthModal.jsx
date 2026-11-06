import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    signup, 
    demoLogin 
  } = useAuth();

  const { showToast } = useCart();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        showToast(`Welcome back, ${res.user.name}! 👋`, 'success');
        resetForms();
      } else {
        showToast(res.message, 'error');
      }
    }, 400);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = signup(name, email, phone, password);
      setIsSubmitting(false);
      if (res.success) {
        showToast(`Welcome to Foodies, ${res.user.name}! 🎁 +200 Foodie Coins added.`, 'success');
        resetForms();
      } else {
        showToast(res.message, 'error');
      }
    }, 400);
  };

  const handleDemoClick = () => {
    const res = demoLogin();
    showToast(`Logged in as Demo User (${res.user.name})! 🚀`, 'success');
    resetForms();
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email.', 'error');
      return;
    }
    showToast(`Password reset link sent to ${email}`, 'success');
    setAuthMode('login');
  };

  const resetForms = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
      >
        
        {/* Top Decorative Banner */}
        <div className="relative bg-gradient-to-r from-brand-600 via-rose-600 to-amber-500 p-6 text-white text-center">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md mx-auto mb-2 flex items-center justify-center border border-white/30">
            <img src="/images/logo.png" alt="Foodies Logo" className="w-8 h-8 object-contain" />
          </div>

          <h3 className="text-xl font-extrabold tracking-tight">
            {authMode === 'login' && 'Welcome Back to Foodies'}
            {authMode === 'signup' && 'Create Your Foodie Account'}
            {authMode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-rose-100 mt-1 font-medium">
            {authMode === 'login' && 'Log in to track orders, redeem coins & save favorites'}
            {authMode === 'signup' && 'Get 200 free Foodie Coins on signing up today!'}
            {authMode === 'forgot' && 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* 1-Click Demo Login Pill Banner */}
        {authMode !== 'forgot' && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/60 dark:border-amber-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>Want to test quickly?</span>
            </div>
            <button
              type="button"
              onClick={handleDemoClick}
              className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[11px] shadow-sm transition-all active:scale-95 flex items-center gap-1"
            >
              <span>1-Click Demo Login</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Tab Headers */}
        {authMode !== 'forgot' && (
          <div className="flex border-b border-stone-200 dark:border-stone-800 text-xs font-bold">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 text-center transition-all ${
                authMode === 'login'
                  ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/30 dark:bg-brand-950/20'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 text-center transition-all ${
                authMode === 'signup'
                  ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/30 dark:bg-brand-950/20'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              Register / New Account
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          
          {/* LOGIN VIEW */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. abhiraj@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Keep me logged in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/30 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In to Foodies'}
              </button>
            </form>
          )}

          {/* SIGNUP VIEW */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abhiraj Singh"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
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
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/30 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Foodies Account'}
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Enter Your Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. foodie@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/30 active:scale-98 transition-all"
              >
                Send Password Reset Instructions
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full text-center text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-white transition-colors"
              >
                ← Back to Sign In
              </button>
            </form>
          )}

          {/* Security Guarantee Note */}
          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure 256-bit encrypted authentication</span>
          </div>

        </div>

      </div>
    </div>
  );
}


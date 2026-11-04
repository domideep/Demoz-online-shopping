import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, Mail, Lock, CheckCircle2, UserCheck, LogOut, ArrowRight } from 'lucide-react';
import { ScreenId, UserAccount } from '../types';

interface FooterProps {
  onSelectScreen: (screen: ScreenId) => void;
  onOpenAssistant: () => void;
  onOpenImporter: () => void;
  currentUser: UserAccount | null;
  onAuthSuccess: (user: UserAccount, message: string) => void;
  onSignOut: () => void;
  onOpenAuthModal: (mode: 'signup' | 'login') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectScreen,
  onOpenAssistant,
  onOpenImporter,
  currentUser,
  onAuthSuccess,
  onSignOut,
  onOpenAuthModal,
}) => {
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [formFeedback, setFormFeedback] = useState('');

  const handleInlineAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthError('');

    // Load registered accounts from localStorage
    const savedAccountsJson = localStorage.getItem('demoz_users_db');
    const existingAccounts: Record<string, string> = savedAccountsJson
      ? JSON.parse(savedAccountsJson)
      : {};

    if (authMode === 'signup') {
      existingAccounts[cleanEmail] = cleanPassword;
      localStorage.setItem('demoz_users_db', JSON.stringify(existingAccounts));

      const newUser: UserAccount = {
        email: cleanEmail,
        createdAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      localStorage.setItem('demoz_current_user', JSON.stringify(newUser));
      setEmail('');
      setPassword('');
      setFormFeedback(`Account created! Welcome ${cleanEmail}`);
      onAuthSuccess(newUser, `Account created successfully for ${cleanEmail}!`);
    } else {
      const storedPassword = existingAccounts[cleanEmail];
      if (storedPassword && storedPassword !== cleanPassword) {
        setAuthError('Incorrect password. Please try again.');
        return;
      }

      if (!storedPassword) {
        existingAccounts[cleanEmail] = cleanPassword;
        localStorage.setItem('demoz_users_db', JSON.stringify(existingAccounts));
      }

      const loggedInUser: UserAccount = {
        email: cleanEmail,
        createdAt: 'Member since 2026',
      };
      localStorage.setItem('demoz_current_user', JSON.stringify(loggedInUser));
      setEmail('');
      setPassword('');
      setFormFeedback(`Welcome back, ${cleanEmail}!`);
      onAuthSuccess(loggedInUser, `Welcome back, ${cleanEmail}!`);
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-850 text-stone-400 text-xs mt-16">
      {/* Value props banner */}
      <div className="border-b border-stone-850 py-8 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Nationwide Delivery</h4>
              <p className="text-stone-400 text-xs">Complimentary door-to-door delivery across Lagos, Abuja & all 36 states.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Authentic Nigerian Market Quality</h4>
              <p className="text-stone-400 text-xs">Fresh sorted grains, sealed Kings cooking oils & verified household essentials.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Shop at Your Pace and Comfort</h4>
              <p className="text-stone-400 text-xs">Instant checkout in Naira (₦), interactive AI guide & live screen previews.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-stone-950 font-bold">
              D
            </div>
            <span className="font-serif font-bold text-base text-white">Demoz shopping Nija</span>
          </div>
          <p className="text-stone-400 leading-relaxed text-xs">
            Nigeria's trusted online food market: Mama's Pride 50kg rice, SunCo 5L oil, fresh eggs, frozen Titus fish, farm vegetables, and pasta at current market prices. Shop at your pace and comfort.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-emerald-400">
              NGN (₦) Currency
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
              Lagos & Nationwide
            </span>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">Market Sections</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectScreen('explore')}
                className="hover:text-amber-300 transition-colors"
              >
                All Products (A-Z Alphabetical)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectScreen('lookbook')}
                className="hover:text-amber-300 transition-colors"
              >
                Market Visual Lookbook
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectScreen('custom-html')}
                className="hover:text-amber-300 transition-colors"
              >
                HTML Screen Engine
              </button>
            </li>
            <li>
              <button
                onClick={onOpenImporter}
                className="hover:text-amber-300 transition-colors"
              >
                Import Custom HTML
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Services */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">Client Concierge</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onOpenAssistant}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Ask AI Shopping Guide</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectScreen('cart')}
                className="hover:text-amber-300 transition-colors"
              >
                Shopping Bag & Checkout (₦)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectScreen('profile')}
                className="hover:text-amber-300 transition-colors"
              >
                My Account & Delivery Orders
              </button>
            </li>
            <li className="text-stone-400">Direct Customer Care & Inquiries</li>
          </ul>
        </div>

        {/* Shop with us today (Account Signup & Login section) */}
        <div className="space-y-3 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-white text-sm font-serif">Shop with us today</h4>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Only Email & Password
            </span>
          </div>

          {currentUser ? (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-stone-300 bg-stone-950 p-2.5 rounded-xl border border-stone-850">
                <UserCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-stone-500">Signed in as:</p>
                  <p className="font-medium text-white truncate text-xs">{currentUser.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelectScreen('profile')}
                  className="flex-1 py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="py-1.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInlineAuth} className="space-y-2.5">
              <p className="text-stone-400 text-xs leading-relaxed">
                {authMode === 'signup'
                  ? 'Sign up below with only your email and password to own and access your Demoz shopping account.'
                  : 'Log in with your email and password to access your shopping cart, orders, and saved items.'}
              </p>

              {/* Email input */}
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-stone-950 border border-stone-800 text-xs text-white rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-amber-400 transition-colors placeholder-stone-500"
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter your password (min 6 chars)"
                  className="w-full bg-stone-950 border border-stone-800 text-xs text-white rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-amber-400 transition-colors placeholder-stone-500"
                />
              </div>

              {authError && (
                <p className="text-[11px] text-rose-400 bg-rose-950/40 p-1.5 rounded-lg border border-rose-800/30">
                  {authError}
                </p>
              )}

              {formFeedback && (
                <p className="text-[11px] text-emerald-400 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-800/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span>{formFeedback}</span>
                </p>
              )}

              {/* Action Button: changed from 'Join' to 'Sign up' */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-amber-400/20"
                >
                  <span>{authMode === 'signup' ? 'Sign up' : 'Log in'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Switch between Sign up and Login */}
              <div className="text-[11px] text-center text-stone-400 pt-1">
                {authMode === 'signup' ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                        setFormFeedback('');
                      }}
                      className="text-amber-400 hover:underline font-semibold ml-0.5"
                    >
                      Log in here
                    </button>
                  </span>
                ) : (
                  <span>
                    Need an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthError('');
                        setFormFeedback('');
                      }}
                      className="text-amber-400 hover:underline font-semibold ml-0.5"
                    >
                      Sign up here
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-850 py-6 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Demoz shopping Nija. All rights reserved. Billed in Nigerian Naira (₦).</p>
          <div className="flex items-center gap-4 text-stone-400 text-xs flex-wrap">
            <span>Paystack</span>
            <span>·</span>
            <span>Flutterwave</span>
            <span>·</span>
            <span>Direct Bank Transfer</span>
            <span>·</span>
            <span>Verve / Mastercard / Visa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

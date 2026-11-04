import React, { useState } from 'react';
import { X, Lock, Mail, CheckCircle2, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'login';
  onAuthSuccess: (user: UserAccount, message: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');

    // Load registered accounts from localStorage
    const savedAccountsJson = localStorage.getItem('demoz_users_db');
    const existingAccounts: Record<string, string> = savedAccountsJson
      ? JSON.parse(savedAccountsJson)
      : {};

    if (mode === 'signup') {
      // Save new account
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
      onAuthSuccess(newUser, `Welcome to Demoz shopping Nija! Account created for ${cleanEmail}`);
      onClose();
    } else {
      // Login
      const storedPassword = existingAccounts[cleanEmail];
      if (storedPassword && storedPassword !== cleanPassword) {
        setError('Incorrect password. Please verify and try again.');
        return;
      }

      // If user had not registered in this browser before, let them in smoothly or store it
      if (!storedPassword) {
        existingAccounts[cleanEmail] = cleanPassword;
        localStorage.setItem('demoz_users_db', JSON.stringify(existingAccounts));
      }

      const loggedInUser: UserAccount = {
        email: cleanEmail,
        createdAt: 'Member since 2026',
      };
      localStorage.setItem('demoz_current_user', JSON.stringify(loggedInUser));
      onAuthSuccess(loggedInUser, `Welcome back, ${cleanEmail}!`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden ring-1 ring-amber-400/20">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-medium text-white">
                {mode === 'signup' ? 'Create Your Account' : 'Customer Login'}
              </h3>
              <p className="text-xs text-stone-400">Demoz shopping Nija · Nigerian Market</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-4 pb-0 bg-stone-900">
          <div className="flex gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Log in
            </button>
          </div>
        </div>

        {/* Form: Email & Password ONLY */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-xl">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              <span>{mode === 'signup' ? 'Sign up' : 'Log in'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-stone-400">
            {mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-amber-400 hover:underline font-semibold ml-1"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="text-amber-400 hover:underline font-semibold ml-1"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-2 border-t border-stone-850">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Only an email and password needed for your account</span>
          </div>
        </form>
      </div>
    </div>
  );
};

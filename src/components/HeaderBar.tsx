import React from 'react';
import {
  Sparkles,
  ShoppingBag,
  Compass,
  FileText,
  User,
  Code2,
  Bot,
  Link2,
  Heart,
} from 'lucide-react';
import { ScreenId } from '../types';

interface HeaderBarProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenImporter: () => void;
  onOpenHotlinks: () => void;
  onOpenAssistant: () => void;
  totalHotlinksCount: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeScreen,
  onSelectScreen,
  cartCount,
  favoritesCount,
  onOpenImporter,
  onOpenHotlinks,
  onOpenAssistant,
  totalHotlinksCount,
}) => {
  return (
    <header className="bg-stone-950/95 backdrop-blur-md border-b border-stone-850 text-stone-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div
          onClick={() => onSelectScreen('explore')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center text-stone-950 shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                Demoz shopping Nija
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                Nigeria · NGN (₦)
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Curated furniture, lighting, ceramics & luxury living
            </p>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => onSelectScreen('explore')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'explore'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => onSelectScreen('lookbook')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'lookbook'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lookbook</span>
          </button>

          <button
            onClick={() => onSelectScreen('custom-html')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'custom-html'
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Screens</span>
          </button>
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI Assistant Guide */}
          <button
            onClick={onOpenAssistant}
            title="Ask Demoz AI Shopping Guide"
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 transition-colors shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold hidden sm:inline">AI Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Hotlink Inspector */}
          <button
            onClick={onOpenHotlinks}
            title="Inspect active hotlinked CDN images"
            className="hidden lg:flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 transition-colors"
          >
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Hotlinks</span>
            <span className="text-[10px] bg-stone-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">
              {totalHotlinksCount}
            </span>
          </button>

          {/* Import Custom HTML Button */}
          <button
            onClick={onOpenImporter}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-xl transition-colors shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Import HTML</span>
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => onSelectScreen('profile')}
            title="View Wishlist & Profile"
            className={`p-2 rounded-xl transition-colors relative ${
              activeScreen === 'profile'
                ? 'bg-stone-800 text-amber-400 border border-stone-700'
                : 'text-stone-300 hover:text-white hover:bg-stone-900 border border-transparent'
            }`}
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Account Profile Link */}
          <button
            onClick={() => onSelectScreen('profile')}
            title="Account Profile & Orders"
            className={`p-2 rounded-xl transition-colors ${
              activeScreen === 'profile'
                ? 'bg-stone-800 text-amber-400 border border-stone-700'
                : 'text-stone-300 hover:text-white hover:bg-stone-900 border border-transparent'
            }`}
          >
            <User className="w-4 h-4" />
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => onSelectScreen('cart')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
              activeScreen === 'cart'
                ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20'
                : 'bg-stone-900 text-stone-200 hover:text-white border border-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span
              className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
                activeScreen === 'cart' ? 'bg-stone-950 text-amber-400' : 'bg-amber-400 text-stone-950'
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav strip for small screens */}
      <div className="md:hidden border-t border-stone-850 px-4 py-2 flex items-center justify-around bg-stone-950 text-xs">
        <button
          onClick={() => onSelectScreen('explore')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeScreen === 'explore' ? 'text-amber-400 font-semibold' : 'text-stone-400'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore</span>
        </button>

        <button
          onClick={() => onSelectScreen('lookbook')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeScreen === 'lookbook' ? 'text-amber-400 font-semibold' : 'text-stone-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lookbook</span>
        </button>

        <button
          onClick={() => onSelectScreen('custom-html')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeScreen === 'custom-html' ? 'text-amber-400 font-semibold' : 'text-stone-400'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>HTML</span>
        </button>

        <button
          onClick={onOpenImporter}
          className="flex items-center gap-1 py-1 px-2 text-stone-400 hover:text-white"
        >
          <span>+ Import</span>
        </button>
      </div>
    </header>
  );
};

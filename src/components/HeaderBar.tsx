import React from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Code2,
  ShoppingBag,
  Compass,
  FileText,
  User,
  Sparkles,
  Link2,
  Bot,
} from 'lucide-react';
import { ScreenId, DeviceFrameType } from '../types';

interface HeaderBarProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  deviceFrame: DeviceFrameType;
  onChangeDeviceFrame: (frame: DeviceFrameType) => void;
  cartCount: number;
  onOpenImporter: () => void;
  onOpenHotlinks: () => void;
  onOpenAssistant: () => void;
  totalHotlinksCount: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeScreen,
  onSelectScreen,
  deviceFrame,
  onChangeDeviceFrame,
  cartCount,
  onOpenImporter,
  onOpenHotlinks,
  onOpenAssistant,
  totalHotlinksCount,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 sticky top-0 z-50 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/10">
            <Sparkles className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm tracking-tight text-white">Demoz shopping Nija</h1>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Official Store
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Curated drops with live hotlinked images & screen navigation
            </p>
          </div>
        </div>

        {/* Screen Switcher */}
        <nav aria-label="Screen Navigation" className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => onSelectScreen('explore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'explore'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => onSelectScreen('detail')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'detail'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Product Detail</span>
          </button>

          <button
            onClick={() => onSelectScreen('lookbook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'lookbook'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lookbook</span>
          </button>

          <button
            onClick={() => onSelectScreen('cart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
              activeScreen === 'cart'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span
                className={`ml-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
                  activeScreen === 'cart' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectScreen('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'profile'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => onSelectScreen('custom-html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === 'custom-html'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Screens</span>
          </button>
        </nav>

        {/* Action Controls & Device View */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Guide Trigger */}
          <button
            onClick={onOpenAssistant}
            title="Ask AI Shopping Guide"
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 px-2.5 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 transition-colors shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">AI Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Hotlink Inspector Trigger */}
          <button
            onClick={onOpenHotlinks}
            title="Inspect active hotlinked images"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Hotlinks</span>
            <span className="text-[10px] bg-slate-900 px-1.5 py-0.2 rounded text-slate-300 font-mono">
              {totalHotlinksCount}
            </span>
          </button>

          {/* Import Custom HTML Modal Trigger */}
          <button
            onClick={onOpenImporter}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Import HTML</span>
          </button>

          {/* Frame Toggle */}
          <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onChangeDeviceFrame('mobile')}
              title="Mobile iPhone view (393px)"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceFrame === 'mobile' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeDeviceFrame('tablet')}
              title="Tablet view (768px)"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceFrame === 'tablet' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeDeviceFrame('desktop')}
              title="Desktop canvas view"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceFrame === 'desktop' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeDeviceFrame('fullscreen')}
              title="Full screen view"
              className={`p-1.5 rounded-lg transition-colors ${
                deviceFrame === 'fullscreen' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Wifi, Battery, Signal, Compass, FileText, ShoppingBag, User, Sparkles, Code2 } from 'lucide-react';
import { DeviceFrameType, ScreenId } from '../types';

interface DeviceFrameProps {
  deviceFrame: DeviceFrameType;
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  cartCount: number;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceFrame,
  activeScreen,
  onSelectScreen,
  cartCount,
  children,
}) => {
  // Fullscreen or Desktop container
  if (deviceFrame === 'fullscreen') {
    return (
      <div className="w-full min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 flex flex-col">
        <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6">{children}</div>
      </div>
    );
  }

  if (deviceFrame === 'desktop') {
    return (
      <div className="w-full min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 py-6 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-stone-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          {/* Mock Browser Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-2 bg-slate-950 px-4 py-1 rounded-lg text-xs text-slate-400 font-mono border border-slate-800/80 w-80 justify-center">
              <span>https://demoz-shopping-nija.com/{activeScreen}</span>
            </div>
            <div className="text-xs text-slate-500 font-mono">1080 × 768</div>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  }

  // Tablet frame
  if (deviceFrame === 'tablet') {
    return (
      <div className="w-full min-h-[calc(100vh-65px)] bg-slate-950 py-8 px-4 flex justify-center items-start">
        <div className="w-[720px] h-[920px] bg-slate-900 rounded-[38px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-700/80 flex flex-col relative">
          {/* Top bezel camera */}
          <div className="w-3 h-3 bg-slate-800 rounded-full mx-auto mb-2 border border-slate-700" />
          
          {/* Inner Screen */}
          <div className="flex-1 bg-stone-950 rounded-[28px] overflow-hidden flex flex-col relative border border-slate-800">
            {/* Status bar */}
            <div className="px-6 py-2 flex justify-between items-center text-xs text-slate-400 border-b border-stone-800/40 bg-stone-950/90 backdrop-blur-sm z-30">
              <span className="font-semibold text-slate-200">9:41</span>
              <div className="flex items-center gap-3">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative">{children}</div>

            {/* Bottom Nav Bar */}
            <BottomNavBar activeScreen={activeScreen} onSelectScreen={onSelectScreen} cartCount={cartCount} />
          </div>
        </div>
      </div>
    );
  }

  // Mobile iPhone 16 Pro Frame (Default)
  return (
    <div className="w-full min-h-[calc(100vh-65px)] bg-slate-950 py-8 px-4 flex justify-center items-start">
      <div className="w-[393px] h-[830px] max-h-[85vh] bg-slate-900 rounded-[52px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-700/80 flex flex-col relative ring-1 ring-white/10">
        
        {/* Hardware side buttons visual cues */}
        <div className="absolute -left-[6px] top-28 w-[3px] h-9 bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[6px] top-42 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[6px] top-58 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
        <div className="absolute -right-[6px] top-36 w-[3px] h-16 bg-slate-700 rounded-r-sm" />

        {/* Inner Screen */}
        <div className="flex-1 bg-stone-950 rounded-[44px] overflow-hidden flex flex-col relative border border-stone-800/60 shadow-inner">
          
          {/* Dynamic Island & Status Bar */}
          <div className="px-7 pt-3 pb-2 flex justify-between items-center text-xs text-slate-300 z-40 bg-stone-950 select-none">
            <span className="font-semibold text-[13px] tracking-tight">9:41</span>
            
            {/* Dynamic Island pill */}
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto -mt-0.5 shadow-md">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-[1px] flex items-center">
                <div className="w-full h-full bg-slate-200 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-stone-950 text-stone-100 flex flex-col">
            {children}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <BottomNavBar activeScreen={activeScreen} onSelectScreen={onSelectScreen} cartCount={cartCount} />

          {/* Home indicator bar */}
          <div className="w-full bg-stone-950 py-1.5 flex justify-center z-40">
            <div className="w-32 h-1 bg-stone-500/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface BottomNavBarProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  cartCount: number;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, onSelectScreen, cartCount }) => {
  return (
    <div className="bg-stone-950/95 backdrop-blur-md border-t border-stone-850 px-3 py-2 flex items-center justify-around z-30">
      <button
        onClick={() => onSelectScreen('explore')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          activeScreen === 'explore' ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>Explore</span>
      </button>

      <button
        onClick={() => onSelectScreen('lookbook')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          activeScreen === 'lookbook' ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span>Lookbook</span>
      </button>

      <button
        onClick={() => onSelectScreen('cart')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
          activeScreen === 'cart' ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-950 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>

      <button
        onClick={() => onSelectScreen('profile')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          activeScreen === 'profile' ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Profile</span>
      </button>

      <button
        onClick={() => onSelectScreen('custom-html')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          activeScreen === 'custom-html' ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Code2 className="w-4 h-4" />
        <span>HTML</span>
      </button>
    </div>
  );
};

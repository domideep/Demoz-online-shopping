import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface FloatingAssistantButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingAssistantButton: React.FC<FloatingAssistantButtonProps> = ({
  onClick,
  isOpen,
}) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <button
        onClick={onClick}
        aria-label="Open Demoz AI Shopping Assistant"
        className="flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-semibold px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ring-4 ring-amber-400/20 active:scale-95"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-stone-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-stone-950" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-none tracking-tight">Need Help?</span>
          <span className="text-[10px] text-stone-800 font-medium leading-tight">Ask Demoz AI</span>
        </div>
        <Sparkles className="w-4 h-4 ml-0.5 text-stone-900 fill-stone-900" />
      </button>
    </div>
  );
};

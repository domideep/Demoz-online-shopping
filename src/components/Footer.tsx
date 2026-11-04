import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { ScreenId } from '../types';

interface FooterProps {
  onSelectScreen: (screen: ScreenId) => void;
  onOpenAssistant: () => void;
  onOpenImporter: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectScreen,
  onOpenAssistant,
  onOpenImporter,
}) => {
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
              <p className="text-stone-400 text-xs">Complimentary shipping across Lagos, Abuja & all 36 states.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">10-Year Architectural Warranty</h4>
              <p className="text-stone-400 text-xs">Certified Scandinavian oak joinery, artisan ceramics & cast iron.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Curated Design Studio</h4>
              <p className="text-stone-400 text-xs">Hotlinked high-definition imagery with live HTML screen rendering.</p>
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
            Nigeria's curated online destination for modern Scandinavian furniture, ambient lighting, hand-thrown ceramics, and bespoke home sanctuaries.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-emerald-400">
              NGN (₦) Currency
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
              Lagos Atelier
            </span>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">Collections</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectScreen('explore')}
                className="hover:text-amber-300 transition-colors"
              >
                All Curated Items
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectScreen('lookbook')}
                className="hover:text-amber-300 transition-colors"
              >
                Visual Sanctuary Lookbook
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
                Track Order (FedEx Nigeria)
              </button>
            </li>
            <li className="text-stone-400">White-Glove Assembly & Setup</li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">Private Atelier Drops</h4>
          <p className="text-stone-400 text-xs">
            Subscribe to receive private preview access for rare artisanal ceramic and timber arrivals.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-stone-900 border border-stone-800 text-xs text-white rounded-lg px-3 py-2 flex-1 focus:outline-none focus:border-amber-400"
            />
            <button className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold px-3 py-2 rounded-lg text-xs transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-850 py-6 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Demoz shopping Nija. All rights reserved. Billed in Nigerian Naira (₦).</p>
          <div className="flex items-center gap-4 text-stone-400 text-xs">
            <span>Paystack</span>
            <span>·</span>
            <span>Flutterwave</span>
            <span>·</span>
            <span>Apple Pay</span>
            <span>·</span>
            <span>Mastercard / Visa / Verve</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

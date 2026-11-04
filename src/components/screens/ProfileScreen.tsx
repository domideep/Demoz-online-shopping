import React, { useState } from 'react';
import {
  Package,
  Heart,
  Settings,
  Bell,
  CreditCard,
  MapPin,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';
import { USER_ORDERS, PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';

interface ProfileScreenProps {
  favorites: string[];
  onSelectProduct: (product: Product) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  favorites,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="pb-16 text-stone-100 space-y-4">
      {/* Profile Header Card */}
      <div className="p-4 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-850 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Elena Vance"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/80 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-stone-950 rounded-full" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-serif font-medium text-white">Elena Vance</h2>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-xs text-stone-400">elena.vance@atelier-arch.com</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                Obsidian Circle
              </span>
              <span className="text-[11px] text-stone-500">Member since 2024</span>
            </div>
          </div>
        </div>

        {/* Member Benefits Snapshot */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/60 text-center">
          <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-850">
            <span className="block text-sm font-semibold text-white">14</span>
            <span className="text-[10px] text-stone-400">Acquisitions</span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-850">
            <span className="block text-sm font-semibold text-amber-400">2,480</span>
            <span className="text-[10px] text-stone-400">Nija Pts</span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-850">
            <span className="block text-sm font-semibold text-white">VIP</span>
            <span className="text-[10px] text-stone-400">Courier Tier</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <div className="flex gap-1.5 p-1 bg-stone-900 rounded-xl border border-stone-800">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'orders' ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm' : 'text-stone-400'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({USER_ORDERS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'wishlist' ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm' : 'text-stone-400'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Wishlist ({favoriteProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm' : 'text-stone-400'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Content based on Active Tab */}
      <div className="px-4">
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {USER_ORDERS.map((order) => (
              <div key={order.id} className="bg-stone-900/90 rounded-xl border border-stone-800 p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{order.id}</span>
                    <span className="text-stone-400 ml-2">· {order.date}</span>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      order.status === 'In Transit'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-950 border border-stone-800"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{item.title}</p>
                        <p className="text-[11px] text-stone-400">
                          Qty: {item.qty} · ${item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Step Bar */}
                {order.status === 'In Transit' && (
                  <div className="pt-2 border-t border-stone-800/60 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-300">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Clock className="w-3 h-3" />
                        <span>{order.estimatedDelivery}</span>
                      </span>
                      <span className="font-mono text-stone-400 text-[10px]">{order.trackingNumber}</span>
                    </div>

                    <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden flex">
                      <div className="w-3/4 bg-amber-400 h-full rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-3">
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-xs">
                No items saved to your wishlist yet. Tap the heart icon on any design piece.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {favoriteProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="bg-stone-900 rounded-xl overflow-hidden border border-stone-800 cursor-pointer group"
                  >
                    <div className="aspect-square relative">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-medium text-white truncate">{prod.name}</h4>
                      <p className="text-xs font-semibold text-amber-400 mt-1">${prod.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-stone-900 rounded-xl border border-stone-800 divide-y divide-stone-800 text-xs">
            <button className="w-full p-3 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>Shipping Addresses (2 saved)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button className="w-full p-3 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-2.5 text-stone-300">
                <CreditCard className="w-4 h-4 text-stone-400" />
                <span>Payment Cards & Apple Pay</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button className="w-full p-3 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-2.5 text-stone-300">
                <Bell className="w-4 h-4 text-stone-400" />
                <span>Drop & Private Sale Alerts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button className="w-full p-3 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-2.5 text-stone-300">
                <Shield className="w-4 h-4 text-stone-400" />
                <span>Demoz Nija Concierge</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

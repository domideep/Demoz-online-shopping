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
  UserCheck,
  LogOut,
  LogIn,
} from 'lucide-react';
import { USER_ORDERS, PRODUCTS } from '../../data/mockData';
import { Product, UserAccount } from '../../types';

interface ProfileScreenProps {
  favorites: string[];
  onSelectProduct: (product: Product) => void;
  currentUser: UserAccount | null;
  onOpenAuthModal: (mode: 'signup' | 'login') => void;
  onSignOut: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  favorites,
  onSelectProduct,
  currentUser,
  onOpenAuthModal,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-8 text-stone-100 pb-12">
      {/* Profile Header Hero Card */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-950 border border-stone-850 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-serif font-bold text-2xl shadow-xl">
                {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'D'}
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-stone-950 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-medium text-white truncate max-w-xs sm:max-w-md">
                  {currentUser ? currentUser.email.split('@')[0] : 'Guest Customer'}
                </h1>
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-stone-400">
                {currentUser ? currentUser.email : 'No account active yet. Sign up or log in below.'}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-0.5 rounded-full font-mono">
                  {currentUser ? 'Verified Demoz Shopper' : 'Guest Shopper'}
                </span>
                <span className="text-xs text-stone-400">
                  {currentUser?.createdAt || 'Nigeria Market'} · NGN (₦)
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons / Stats */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-semibold rounded-xl transition-colors border border-stone-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors border border-stone-700"
                >
                  Log in
                </button>
                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl transition-colors shadow-md shadow-amber-400/20"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-stone-850 pb-2">
        <div className="flex gap-2 p-1 bg-stone-900/60 rounded-2xl border border-stone-850 w-full sm:w-fit">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'orders' ? 'bg-amber-400 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Deliveries ({USER_ORDERS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'wishlist' ? 'bg-amber-400 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({favoriteProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'settings' ? 'bg-amber-400 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {USER_ORDERS.map((order) => (
              <div key={order.id} className="bg-stone-900/80 rounded-2xl border border-stone-800 p-5 sm:p-6 space-y-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-sm">{order.id}</span>
                    <span className="text-stone-400 text-xs">Placed on {order.date}</span>
                    <span className="text-stone-400 text-xs">·</span>
                    <span className="text-amber-400 font-bold text-xs">Total: ₦{order.total.toLocaleString()}</span>
                  </div>

                  <span
                    className={`text-xs font-mono font-semibold px-3 py-1 rounded-full w-fit ${
                      order.status === 'In Transit'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 bg-stone-950/70 p-3 rounded-xl border border-stone-850">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-900 border border-stone-800 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Qty: {item.qty} · <strong className="text-amber-400 font-medium">₦{item.price.toLocaleString()}</strong> each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Progress */}
                {order.status === 'In Transit' && (
                  <div className="pt-3 border-t border-stone-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Estimated Delivery: {order.estimatedDelivery} (Lagos Express Dispatch)</span>
                      </span>
                      <span className="font-mono text-stone-400 text-xs">Tracking: {order.trackingNumber}</span>
                    </div>

                    <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden flex">
                      <div className="w-3/4 bg-amber-400 h-full rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-850 text-stone-400 text-xs sm:text-sm">
                No items saved to your wishlist yet. Tap the heart icon on any market product.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 cursor-pointer group hover:border-amber-400/50 transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-square relative">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-semibold text-white truncate">{prod.name}</h4>
                      <p className="text-xs text-amber-400 font-bold">₦{prod.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-stone-900/80 rounded-2xl border border-stone-800 divide-y divide-stone-800 text-xs sm:text-sm">
            <button className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-3 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Delivery Addresses (Nigeria)</p>
                  <p className="text-xs text-stone-400">Default: Lagos, Nigeria</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-3 text-stone-300">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Payment Methods</p>
                  <p className="text-xs text-stone-400">Paystack NGN · Bank Transfer · Cards</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-3 text-stone-300">
                <Bell className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Market Restock Alerts</p>
                  <p className="text-xs text-stone-400">Rice, Kings Oil & provisions notifications active</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-850 transition-colors">
              <div className="flex items-center gap-3 text-stone-300">
                <Shield className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Security & Login</p>
                  <p className="text-xs text-stone-400">Email & Password authenticated</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Tag, ArrowLeft, Truck } from 'lucide-react';
import { CartItem } from '../../types';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onExplore: () => void;
  onOrderSuccess: (orderTotal: number) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onExplore,
  onOrderSuccess,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? (shippingMethod === 'express' ? 45 : 0) : 0;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SUMMER20' || code === 'DEMOZ' || code === 'DEMOZ20' || code === 'ATELIER') {
      setAppliedDiscount(20);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "DEMOZ20" for 20% off');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      onOrderSuccess(finalTotal);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6 text-stone-100">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/40">
            Payment Verified · NGN (₦)
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">Order Confirmed</h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Order #ORD-{Math.floor(1000 + Math.random() * 9000)} has been sent to our Lagos distribution atelier.
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between text-stone-300">
            <span>Estimated Delivery:</span>
            <span className="font-semibold text-white">Thursday, Nov 12 (Lagos & Nationwide)</span>
          </div>
          <div className="flex justify-between text-stone-300">
            <span>Payment Method:</span>
            <span className="font-semibold text-white">Debit Card / Apple Pay (NGN)</span>
          </div>
          <div className="flex justify-between text-stone-300">
            <span>Courier Service:</span>
            <span className="font-semibold text-white">FedEx Nigeria Express</span>
          </div>
          <div className="flex justify-between text-stone-300 pt-2 border-t border-stone-800 text-base font-bold">
            <span>Total Paid:</span>
            <span className="text-amber-400">₦{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false);
            onExplore();
          }}
          className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-amber-400/20"
        >
          Continue Shopping Collections
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4 text-stone-100">
        <div className="w-16 h-16 bg-stone-900 rounded-full border border-stone-800 flex items-center justify-center mx-auto text-stone-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-serif font-medium text-white">Your Shopping Bag is Empty</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Discover bespoke architectural pieces, lamps, and ceramics in our curated collection.
          </p>
        </div>
        <button
          onClick={onExplore}
          className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs px-6 py-3 rounded-xl transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-stone-100 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-850">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white">Shopping Bag</h1>
            <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
              Billed in NGN (₦)
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {cart.length} unique design objects · Free nationwide delivery in Nigeria
          </p>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors w-fit font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bag Items & Delivery Selection (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Items List */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row gap-4 bg-stone-900/80 p-4 sm:p-5 rounded-2xl border border-stone-800 sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-stone-950 border border-stone-800 flex-shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">{item.product.category}</span>
                    <h4 className="text-sm font-semibold text-white">{item.product.name}</h4>
                    <p className="text-xs text-stone-400">Finish: <strong className="text-stone-300">{item.selectedColor}</strong></p>
                    <p className="text-xs text-stone-500 font-mono">{item.product.designer}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-stone-700 rounded-xl bg-stone-950 p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg text-stone-400 hover:text-white hover:bg-stone-850 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg text-stone-400 hover:text-white hover:bg-stone-850 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 uppercase block font-mono">Total</span>
                    <span className="text-base font-bold text-amber-400">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-stone-500 hover:text-rose-400 p-2 rounded-lg hover:bg-stone-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Method Selector (Nigeria) */}
          <div className="p-5 bg-stone-900/60 rounded-2xl border border-stone-850 space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <label className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Select Delivery Method (Nigeria)
              </label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-xl text-left border transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-amber-400 bg-stone-950 text-white shadow-md'
                    : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-white">Standard Delivery</p>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                    FREE
                  </span>
                </div>
                <p className="text-xs text-stone-400">Nationwide courier across Nigeria (3-5 business days)</p>
              </button>

              <button
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-xl text-left border transition-all ${
                  shippingMethod === 'express'
                    ? 'border-amber-400 bg-stone-950 text-white shadow-md'
                    : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-white">White-Glove Priority</p>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded">
                    ₦45
                  </span>
                </div>
                <p className="text-xs text-stone-400">Next-day room setup & unboxing in Lagos and Abuja</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout (4 Cols) */}
        <div className="lg:col-span-4 space-y-5 bg-stone-900/70 p-6 rounded-3xl border border-stone-850 shadow-xl sticky top-24">
          <h3 className="text-base font-serif font-medium text-white">Order Summary</h3>

          {/* Promo Code Input */}
          <div className="space-y-1.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (try 'DEMOZ20')"
                  className="w-full bg-stone-950 text-xs text-white placeholder-stone-500 pl-8 pr-3 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                onClick={applyPromo}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
            {appliedDiscount > 0 && (
              <p className="text-[11px] text-emerald-400 font-medium">✓ Promo code applied: 20% discount</p>
            )}
            {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
          </div>

          {/* Cost Breakdown */}
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2.5 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal</span>
              <span className="text-white font-medium">₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Special Promo (20%)</span>
                <span>-₦{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-400">
              <span>Nationwide Delivery</span>
              <span className="text-white font-medium">{shippingFee === 0 ? 'Complimentary' : `₦${shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-3 border-t border-stone-850 text-white">
              <span>Total</span>
              <span className="text-amber-400 font-serif text-lg">
                ₦{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl transition-all shadow-xl shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isCheckingOut ? (
                <span>Securing transaction...</span>
              ) : (
                <>
                  <span>Pay with Card / Apple Pay · ₦{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted Demoz shopping Nija Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

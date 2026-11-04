import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
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
      <div className="p-6 text-center space-y-5 my-auto text-stone-100">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-serif font-medium text-white">Order Confirmed</h2>
          <p className="text-xs text-stone-400">Order #ORD-{Math.floor(1000 + Math.random() * 9000)} has been received.</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl text-left space-y-2 text-xs">
          <div className="flex justify-between text-stone-300">
            <span>Estimated Delivery:</span>
            <span className="font-semibold text-white">Thursday, Nov 12 (Lagos & Nationwide)</span>
          </div>
          <div className="flex justify-between text-stone-300">
            <span>Payment Method:</span>
            <span className="font-semibold text-white">Debit Card / Apple Pay (NGN)</span>
          </div>
          <div className="flex justify-between text-stone-300">
            <span>Total Paid:</span>
            <span className="font-semibold text-amber-400">₦{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setIsSuccess(false);
            onExplore();
          }}
          className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs py-3 rounded-xl transition-colors"
        >
          Continue Exploring
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center space-y-4 my-auto text-stone-100">
        <div className="w-14 h-14 bg-stone-900 rounded-full border border-stone-800 flex items-center justify-center mx-auto text-stone-500">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-serif font-medium text-white">Your Shopping Bag is Empty</h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto">
            Discover bespoke architectural pieces, lamps, and ceramics in our curated collection.
          </p>
        </div>
        <button
          onClick={onExplore}
          className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 space-y-5 text-stone-100">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-serif font-medium text-white">Shopping Bag</h2>
            <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
              NGN (₦)
            </span>
          </div>
          <p className="text-xs text-stone-400">{cart.length} unique items selected · Prices in Nigerian Naira</p>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-3 bg-stone-900/80 p-3 rounded-xl border border-stone-800/80 items-center"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-16 h-16 rounded-lg object-cover bg-stone-950 border border-stone-800"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="text-xs font-medium text-white truncate">{item.product.name}</h4>
              <p className="text-[11px] text-stone-400">Finish: {item.selectedColor}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-amber-400">₦{item.product.price.toLocaleString()}</span>

                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-700 rounded-md bg-stone-950 text-xs">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-0.5 text-stone-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-2 py-0.5 font-semibold text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-0.5 text-stone-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRemoveItem(item.product.id)}
              className="text-stone-500 hover:text-rose-400 p-1.5 transition-colors"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Shipping Method */}
      <div className="space-y-2">
        <label className="text-xs text-stone-400 font-medium">Delivery Method (Nigeria)</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShippingMethod('standard')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              shippingMethod === 'standard'
                ? 'border-amber-400 bg-stone-900 text-white shadow-sm'
                : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
            }`}
          >
            <p className="text-xs font-medium text-white">Standard Delivery</p>
            <p className="text-[10px] text-stone-400">Nationwide (3-5 Days) · FREE</p>
          </button>

          <button
            onClick={() => setShippingMethod('express')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              shippingMethod === 'express'
                ? 'border-amber-400 bg-stone-900 text-white shadow-sm'
                : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
            }`}
          >
            <p className="text-xs font-medium text-white">White-Glove Express</p>
            <p className="text-[10px] text-stone-400">Lagos/Abuja Next Day · ₦45</p>
          </button>
        </div>
      </div>

      {/* Promo Code */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code (try 'DEMOZ20')"
              className="w-full bg-stone-900 text-xs text-white placeholder-stone-500 pl-8 pr-3 py-2 rounded-lg border border-stone-800 focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            onClick={applyPromo}
            className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
        {appliedDiscount > 0 && (
          <p className="text-[11px] text-emerald-400">Promo code applied: {appliedDiscount}% discount</p>
        )}
        {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
      </div>

      {/* Order Summary Breakdown */}
      <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-2 text-xs">
        <div className="flex justify-between text-stone-400">
          <span>Subtotal</span>
          <span className="text-white">₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Special Discount (20%)</span>
            <span>-₦{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        )}
        <div className="flex justify-between text-stone-400">
          <span>Delivery (Nigeria)</span>
          <span className="text-white">{shippingFee === 0 ? 'Complimentary' : `₦${shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold pt-2 border-t border-stone-800 text-white">
          <span>Total</span>
          <span className="text-amber-400">₦{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="space-y-2">
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-semibold text-xs py-3 rounded-xl transition-all shadow-md"
        >
          {isCheckingOut ? (
            <span>Processing secure transaction...</span>
          ) : (
            <>
              <span>Pay with Card / Apple Pay · ₦{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>256-Bit Encrypted Demoz shopping Nija Checkout</span>
        </div>
      </div>
    </div>
  );
};

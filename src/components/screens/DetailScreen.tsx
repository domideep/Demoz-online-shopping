import React, { useState } from 'react';
import {
  ChevronLeft,
  Heart,
  Star,
  Check,
  Truck,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  MapPin,
  Sparkles,
  Tag,
} from 'lucide-react';
import { Product } from '../../types';

interface DetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor: string) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
  };

  return (
    <div className="space-y-6 text-stone-100 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-850">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Market</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="flex items-center gap-1.5 text-xs bg-stone-900 border border-stone-800 hover:border-amber-400/50 px-3 py-1.5 rounded-xl transition-colors text-stone-300 hover:text-amber-400"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                favorites.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
            <span>{favorites.includes(product.id) ? 'Saved' : 'Wishlist'}</span>
          </button>

          <a
            href={product.images[activeImageIndex]}
            target="_blank"
            rel="noopener noreferrer"
            title="Inspect source image in full resolution"
            className="flex items-center gap-1 text-xs bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect Photo</span>
          </a>
        </div>
      </div>

      {/* Modern 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] w-full bg-stone-950 rounded-3xl overflow-hidden border border-stone-850 relative shadow-2xl group flex items-center justify-center p-6">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Price Tag Overlay Badge */}
            <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-800/40 shadow-lg flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Current Market Price: <strong>₦{product.price.toLocaleString()}</strong></span>
            </div>

            {product.stockCount <= 20 && (
              <div className="absolute bottom-4 left-4 bg-stone-950/85 backdrop-blur-md text-xs text-amber-400 px-3 py-1.5 rounded-lg border border-stone-800 shadow-md">
                {product.stockCount} units available for same-day dispatch
              </div>
            )}
          </div>

          {/* Thumbnails Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-stone-950 p-2 flex items-center justify-center transition-all ${
                    activeImageIndex === idx
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Value Highlights Under Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-850 flex items-center gap-3">
              <Truck className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Nationwide Delivery</p>
                <p className="text-[11px] text-stone-400">Lagos, Abuja & nationwide dispatch</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-850 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Market Quality Verified</p>
                <p className="text-[11px] text-stone-400">100% authentic, fresh & clean</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-850 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Current Market Price</p>
                <p className="text-[11px] text-stone-400">Fair transparent Naira rates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Actions & Specs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 bg-stone-900/50 p-6 sm:p-8 rounded-3xl border border-stone-850 shadow-xl sticky top-24">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="text-amber-400 font-mono uppercase">{product.designer}</span>
              <span>·</span>
              <span className="capitalize">{product.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-stone-500">({product.reviewCount} reviews)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white leading-snug">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing in Naira (₦) with Market Price Tag */}
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <Tag className="w-3.5 h-3.5" />
                <span>CURRENT MARKET PRICE TAG</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full uppercase">
                In Stock (Nigeria)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-amber-400">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-500 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-400">Price in Nigerian Naira (₦) · Direct transparent food market pricing</p>
          </div>

          {/* Variant / Option Picker */}
          <div className="space-y-2.5 pt-2 border-t border-stone-850">
            <div className="flex justify-between text-xs">
              <span className="text-stone-400 font-medium">Selected Packaging / Option:</span>
              <span className="text-white font-semibold">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedColor === color.name
                      ? 'border-amber-400 scale-110 shadow-lg shadow-amber-400/20'
                      : 'border-stone-700 hover:border-stone-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <Check
                      className={`w-4 h-4 ${
                        color.hex === '#F5F5F0' || color.hex === '#E6E2DD' || color.hex === '#EBE7DE' || color.hex === '#FEF3C7' || color.hex === '#FEF08A'
                          ? 'text-stone-950'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Counter & CTA */}
          <div className="space-y-3 pt-2 border-t border-stone-850">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-700 rounded-xl bg-stone-950 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg text-stone-300 hover:text-white hover:bg-stone-850 flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-8 h-8 rounded-lg text-stone-300 hover:text-white hover:bg-stone-850 flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag (₦{(product.price * quantity).toLocaleString()})</span>
              </button>
            </div>
          </div>

          {/* Tabbed Specifications */}
          <div className="pt-2">
            <div className="flex border-b border-stone-800 text-xs">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                Specifications & Package
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="py-4 text-xs text-stone-300 leading-relaxed min-h-[100px]">
              {activeTab === 'details' && (
                <p>{product.description}</p>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2">
                  <div>
                    <span className="text-stone-500 block text-[11px] uppercase font-mono">Pack Size / Net Content</span>
                    <span className="text-white font-medium">{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px] uppercase font-mono">Ingredients & Quality Standards</span>
                    <ul className="list-disc list-inside text-stone-300 space-y-1 mt-1">
                      {product.materials.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{product.rating}</span>
                    <div>
                      <div className="flex text-amber-400">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <p className="text-[11px] text-stone-400">Based on {product.reviewCount} verified shopper purchases in Nigeria</p>
                    </div>
                  </div>
                  <p className="text-stone-400 italic">
                    "Delivered fast to my door in Lagos. Fresh and exactly as shown in the picture at honest market price!"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

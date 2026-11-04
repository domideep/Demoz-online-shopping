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
          <span>Back to Collection</span>
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
            title="Open hotlinked source image in new tab"
            className="flex items-center gap-1 text-xs bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect CDN</span>
          </a>
        </div>
      </div>

      {/* Modern 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] w-full bg-stone-950 rounded-3xl overflow-hidden border border-stone-850 relative shadow-2xl group">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.stockCount <= 5 && (
              <div className="absolute bottom-4 left-4 bg-stone-950/85 backdrop-blur-md text-xs text-amber-400 px-3 py-1.5 rounded-lg border border-stone-800 shadow-md">
                Only {product.stockCount} pieces available in Nigerian studio
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
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
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
                <p className="text-[11px] text-stone-400">Lagos, Abuja & nationwide</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-850 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">10-Year Warranty</p>
                <p className="text-[11px] text-stone-400">Architectural joinery</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-850 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Atelier Authenticity</p>
                <p className="text-[11px] text-stone-400">Numbered studio piece</p>
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

          {/* Pricing in Naira (₦) */}
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-amber-400">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-500 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full font-mono uppercase ml-auto">
                In Stock (Nigeria)
              </span>
            </div>
            <p className="text-[11px] text-stone-400">Price in Nigerian Naira · Includes VAT & transit insurance</p>
          </div>

          {/* Color Finish Picker */}
          <div className="space-y-2.5 pt-2 border-t border-stone-850">
            <div className="flex justify-between text-xs">
              <span className="text-stone-400 font-medium">Selected Finish / Material:</span>
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
                        color.hex === '#F5F5F0' || color.hex === '#E6E2DD' || color.hex === '#EBE7DE'
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
                className="flex-1 flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag · ₦{(product.price * quantity).toLocaleString()}</span>
              </button>
            </div>
          </div>

          {/* Specification Tabs */}
          <div className="pt-4 border-t border-stone-850 space-y-3">
            <div className="flex gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'details' ? 'bg-stone-850 text-white shadow-sm' : 'text-stone-400'
                }`}
              >
                Artisan Story
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'specs' ? 'bg-stone-850 text-white shadow-sm' : 'text-stone-400'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'reviews' ? 'bg-stone-850 text-white shadow-sm' : 'text-stone-400'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="text-xs text-stone-300 leading-relaxed space-y-2 p-2">
                <p>{product.description}</p>
                <p className="text-stone-400 text-[11px] pt-1">
                  Crafted by <strong className="text-white">{product.designer}</strong> using ethically harvested FSC timber and organic non-toxic dyes.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="text-xs space-y-2 p-2">
                <div className="flex justify-between py-1.5 border-b border-stone-850">
                  <span className="text-stone-400">Dimensions</span>
                  <span className="text-white font-medium text-right">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-850">
                  <span className="text-stone-400">Materials</span>
                  <span className="text-white font-medium text-right">{product.materials.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-850">
                  <span className="text-stone-400">Origin</span>
                  <span className="text-white font-medium">{product.designer}</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-2.5 p-2 text-xs">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-white">Chuka O. (Ikoyi, Lagos)</span>
                    <span className="text-stone-400">3 days ago</span>
                  </div>
                  <div className="text-amber-400 text-xs">★★★★★</div>
                  <p className="text-stone-300 leading-relaxed">
                    "Delivered flawlessly to our Ikoyi penthouse. The bouclé fabric texture and joinery are museum-quality."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

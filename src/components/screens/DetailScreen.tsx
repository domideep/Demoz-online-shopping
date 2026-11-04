import React, { useState } from 'react';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
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
    <div className="pb-24 text-stone-100 min-h-full flex flex-col justify-between">
      <div>
        {/* Navigation Top Bar */}
        <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-stone-950/90 backdrop-blur-md z-20 border-b border-stone-850">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white p-1 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Explore</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(product.id)}
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''
                }`}
              />
            </button>
            <a
              href={product.images[activeImageIndex]}
              target="_blank"
              rel="noopener noreferrer"
              title="Open hotlinked source image in new tab"
              className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/3] w-full bg-stone-900 relative overflow-hidden">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {product.stockCount <= 5 && (
              <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-md text-[11px] text-amber-400 px-2.5 py-1 rounded-md border border-stone-800">
                Only {product.stockCount} left in studio stock
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="px-4 flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span>{product.designer}</span>
              <span>·</span>
              <span className="capitalize">{product.category}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            <h1 className="text-xl font-serif font-medium text-white">{product.name}</h1>
            <p className="text-xs text-stone-300 leading-relaxed">{product.subtitle}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-500 line-through">${product.originalPrice}</span>
            )}
            <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              Ready to ship
            </span>
          </div>

          {/* Color Selector */}
          <div className="space-y-2 pt-2 border-t border-stone-850">
            <div className="flex justify-between text-xs">
              <span className="text-stone-400 font-medium">Selected Finish / Color:</span>
              <span className="text-white font-medium">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedColor === color.name
                      ? 'border-amber-400 scale-110 shadow-md'
                      : 'border-stone-700 hover:border-stone-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        color.hex === '#F5F5F0' || color.hex === '#E6E2DD' || color.hex === '#EBE7DE'
                          ? 'text-slate-900'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-850">
            <span className="text-xs text-stone-400">Quantity</span>
            <div className="flex items-center border border-stone-800 rounded-lg bg-stone-900 overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 text-xs font-semibold text-white min-w-[28px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                className="px-3 py-1 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Tab Navigation for Specs / Story */}
          <div className="pt-2 border-t border-stone-850 space-y-3">
            <div className="flex gap-2 p-1 bg-stone-900 rounded-lg">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'details' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400'
                }`}
              >
                Story & Craft
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'specs' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'reviews' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400'
                }`}
              >
                Reviews
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="text-xs text-stone-300 space-y-3">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-[11px] font-medium text-white">White Glove Delivery</p>
                      <p className="text-[10px] text-stone-400">Complimentary setup</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-[11px] font-medium text-white">10-Year Warranty</p>
                      <p className="text-[10px] text-stone-400">Architectural grade</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-stone-850">
                  <span className="text-stone-400">Dimensions</span>
                  <span className="text-white text-right">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-850">
                  <span className="text-stone-400">Materials</span>
                  <span className="text-white text-right">{product.materials.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-850">
                  <span className="text-stone-400">Studio Origin</span>
                  <span className="text-white">{product.designer}</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <div className="flex justify-between items-center text-stone-400 text-[11px]">
                    <span className="font-semibold text-white">Julian R. (Architect)</span>
                    <span>2 weeks ago</span>
                  </div>
                  <div className="flex text-amber-400">★★★★★</div>
                  <p className="text-stone-300">
                    "The wood joinery and fabric finish exceed expectations. Anchors our reading corner flawlessly."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-0 bg-stone-950/95 backdrop-blur-md p-4 border-t border-stone-850 flex items-center justify-between gap-3 z-30">
        <div>
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Price</span>
          <span className="text-lg font-bold text-white">${product.price * quantity}</span>
        </div>

        <button
          onClick={handleAdd}
          className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs py-3 px-4 rounded-xl shadow-lg transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag ({quantity})</span>
        </button>
      </div>
    </div>
  );
};

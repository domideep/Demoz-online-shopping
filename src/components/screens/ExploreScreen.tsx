import React, { useState } from 'react';
import { Search, Heart, Plus, Star, ArrowUpRight, Sparkles, Filter, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES, STORIES, PRODUCTS } from '../../data/mockData';

interface ExploreScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onNavigateLookbook: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onNavigateLookbook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.designer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProduct = PRODUCTS.find((p) => p.isFeatured) || PRODUCTS[0];

  return (
    <div className="space-y-8 text-stone-100">
      {/* Grand Full-Width Website Hero Banner */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="relative rounded-3xl overflow-hidden border border-stone-850 bg-stone-900 shadow-2xl group">
          <div className="aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] w-full overflow-hidden relative">
            <img
              src={featuredProduct.images[0]}
              alt={featuredProduct.name}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
            
            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
                  Autumn Drop · 2026
                </span>
                <span className="text-xs text-stone-300 hidden sm:inline">
                  Architectural Living in Nigeria
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight leading-tight">
                Sculptural Living & Curated Atelier Spaces
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                Experience solid white oak, Belgian bouclé, hand-thrown ceramics, and parabolic cast-iron lighting. Delivered nationwide across Lagos, Abuja, and all 36 states.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
                >
                  <span>Explore Featured Piece</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateLookbook}
                  className="bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700/80 text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Open Interactive Lookbook</span>
                </button>
              </div>
            </div>

            {/* Quick Price Badge */}
            <div className="absolute bottom-6 right-6 hidden lg:flex items-center gap-3 bg-stone-950/90 backdrop-blur-md border border-stone-800 p-3 rounded-2xl">
              <img
                src={featuredProduct.images[1] || featuredProduct.images[0]}
                alt="Thumbnail"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-xs font-medium text-white">{featuredProduct.name}</p>
                <p className="text-xs font-bold text-amber-400">₦{featuredProduct.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar & Highlights Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-2xl border border-stone-850">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chairs, lamps, ceramics, studios..."
            className="w-full bg-stone-950 text-xs text-white placeholder-stone-500 rounded-xl pl-9 pr-8 py-2.5 border border-stone-800 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-300"
            >
              ×
            </button>
          )}
        </div>

        {/* Stories / Curated Atelier Highlights */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
          {STORIES.map((story) => (
            <div key={story.id} className="flex items-center gap-2.5 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 flex-shrink-0 cursor-pointer hover:border-amber-400/60 transition-colors group">
              <div
                className={`w-7 h-7 rounded-full p-[1.5px] ${
                  story.hasUnseen
                    ? 'bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600'
                    : 'bg-stone-800'
                }`}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full border border-stone-950"
                  loading="lazy"
                />
              </div>
              <span className="text-xs text-stone-300 group-hover:text-white font-medium">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs & View Options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-850 pb-4">
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/10'
                  : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-850 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-400">
          <span>Showing <strong className="text-white">{filteredProducts.length}</strong> architectural pieces</span>
          <span>·</span>
          <span>Billed in <strong className="text-emerald-400">NGN (₦)</strong></span>
        </div>
      </div>

      {/* Product Feed Grid: Full Responsive 4-Column Desktop Layout */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-stone-900/40 rounded-3xl border border-stone-850 space-y-3">
          <p className="text-base text-stone-300">No items found matching "{searchQuery}"</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-amber-400 underline underline-offset-4"
          >
            Clear filters and browse all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800/90 hover:border-amber-400/40 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="aspect-square relative overflow-hidden bg-stone-950">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-sm text-[10px] font-mono text-amber-400 px-2.5 py-1 rounded-md border border-stone-800 shadow-sm">
                    NEW ARRIVAL
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/75 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-amber-400 transition-colors border border-stone-800/80 shadow-md"
                  aria-label="Save to wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="capitalize">{product.category}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-stone-500">({product.reviewCount})</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block font-mono">Price (NGN)</span>
                    <span className="text-base font-bold text-amber-400">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="flex items-center gap-1.5 bg-stone-800 hover:bg-amber-400 hover:text-stone-950 text-stone-200 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-sm"
                    title="Add to shopping bag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

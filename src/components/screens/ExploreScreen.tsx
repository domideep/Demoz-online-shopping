import React, { useState } from 'react';
import { Search, Heart, Plus, Star, ArrowUpRight, Sparkles } from 'lucide-react';
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
    <div className="pb-8 space-y-5 text-stone-100">
      {/* Top Header & Search */}
      <div className="px-4 pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Autumn Drop · 2026</span>
            </div>
            <h2 className="text-xl font-serif font-medium tracking-tight text-white mt-0.5">
              Demoz shopping Nija
            </h2>
          </div>
          <button
            onClick={onNavigateLookbook}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white bg-stone-900 border border-stone-800 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <span>Lookbook</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chairs, lamps, ceramics, studios..."
            className="w-full bg-stone-900/90 text-xs text-white placeholder-stone-500 rounded-xl pl-9 pr-8 py-2.5 border border-stone-800 focus:outline-none focus:border-amber-400/60 transition-colors"
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
      </div>

      {/* Stories / Curated Atelier Highlights */}
      <div className="px-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {STORIES.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
              <div
                className={`w-14 h-14 rounded-full p-[2px] transition-transform group-hover:scale-105 ${
                  story.hasUnseen
                    ? 'bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600'
                    : 'bg-stone-800'
                }`}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full border-2 border-stone-950"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] text-stone-300 group-hover:text-white truncate max-w-[60px] text-center">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs (Interactive filter controls per frontend-design guidelines) */}
      <div className="px-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Editorial Hero Card */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="px-4">
          <div
            onClick={() => onSelectProduct(featuredProduct)}
            className="group relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 cursor-pointer shadow-lg"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              
              <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-wider text-amber-400 border border-stone-800">
                Curator's Choice
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(featuredProduct.id);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/70 backdrop-blur-md flex items-center justify-center text-stone-300 hover:text-amber-400 border border-stone-800/80 transition-colors"
                aria-label="Save to favorites"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(featuredProduct.id) ? 'fill-amber-400 text-amber-400' : ''
                  }`}
                />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>{featuredProduct.designer}</span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{featuredProduct.rating}</span>
                  <span className="text-stone-500">({featuredProduct.reviewCount})</span>
                </span>
              </div>

              <h3 className="text-base font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                {featuredProduct.name}
              </h3>

              <p className="text-xs text-stone-400 line-clamp-2">{featuredProduct.subtitle}</p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-white">${featuredProduct.price}</span>
                  {featuredProduct.originalPrice && (
                    <span className="text-xs text-stone-500 line-through">
                      ${featuredProduct.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(featuredProduct);
                  }}
                  className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Feed Grid */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>Showing {filteredProducts.length} design objects</span>
            <span aria-hidden="true">·</span>
            <span>Hotlinked Assets</span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-stone-400 space-y-2">
            <p className="text-sm">No items found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-amber-400 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-stone-900/90 rounded-xl overflow-hidden border border-stone-800/90 hover:border-stone-700 flex flex-col cursor-pointer transition-all hover:shadow-md"
              >
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden bg-stone-950">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-stone-950/80 backdrop-blur-sm text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded border border-stone-800">
                      NEW
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-stone-950/70 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favorites.includes(product.id) ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-stone-400 mb-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span>·</span>
                      <span className="capitalize">{product.category}</span>
                    </div>
                    <h4 className="text-xs font-medium text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-1">{product.designer}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-800/60">
                    <span className="text-xs font-semibold text-white">${product.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-6 h-6 rounded-md bg-stone-800 hover:bg-amber-400 hover:text-stone-950 flex items-center justify-center text-stone-300 transition-colors"
                      title="Add to bag"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

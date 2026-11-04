import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { LOOKBOOK_STORIES, PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';

interface LookbookScreenProps {
  onSelectProduct: (product: Product) => void;
}

export const LookbookScreen: React.FC<LookbookScreenProps> = ({ onSelectProduct }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<{
    title: string;
    price: string;
    productId: string;
  } | null>(null);

  const handleHotspotClick = (hotspot: { title: string; price: string; productId: string }) => {
    setSelectedHotspot(hotspot);
  };

  const handleViewProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      onSelectProduct(product);
    }
  };

  return (
    <div className="space-y-8 text-stone-100 pb-12">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-stone-850 pb-6">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wider uppercase">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Visual Lookbook · 2026 Collection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white">Visual Sanctuary</h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          Explore architectural and interior spaces curated by Demoz shopping Nija. Tap the glowing <strong className="text-amber-400">+</strong> hotspot indicators to discover individual handcrafted objects in situ with Nigerian Naira pricing.
        </p>
      </div>

      {/* Lookbook Stories in 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {LOOKBOOK_STORIES.map((story) => (
          <div key={story.id} className="bg-stone-900/80 rounded-3xl overflow-hidden border border-stone-800 space-y-4 pb-4 shadow-xl flex flex-col justify-between">
            {/* Story image with interactive hotspots */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-950 group">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hotspots */}
              {story.hotspots.map((hs, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  aria-label={`Hotspot for ${hs.title}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-amber-400 text-stone-950 items-center justify-center font-bold text-xs shadow-xl border border-white/50">
                      +
                    </span>
                  </span>
                </button>
              ))}

              {/* Active Hotspot Popover */}
              {selectedHotspot && story.hotspots.some((h) => h.productId === selectedHotspot.productId) && (
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/95 backdrop-blur-md border border-amber-400/60 p-4 rounded-2xl flex items-center justify-between text-xs z-20 shadow-2xl animate-in fade-in">
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] text-amber-400 uppercase font-mono block">Featured Object</span>
                    <h4 className="font-bold text-white text-sm truncate">{selectedHotspot.title}</h4>
                    <span className="text-amber-300 font-bold text-sm">{selectedHotspot.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewProduct(selectedHotspot.productId)}
                      className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-md"
                    >
                      <span>View Item</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-850"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Story Details */}
            <div className="px-5 pt-1 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-serif font-medium text-white text-base">{story.title}</h3>
                <p className="text-stone-400 text-xs mt-0.5">Photography by {story.photographer} · {story.date}</p>
              </div>
              <span className="text-xs text-amber-400 bg-stone-950 px-3 py-1 rounded-full border border-stone-800 font-mono">
                {story.hotspots.length} Tagged Pieces
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

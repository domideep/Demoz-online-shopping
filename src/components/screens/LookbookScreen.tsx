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
    <div className="pb-16 text-stone-100 space-y-6">
      {/* Editorial Header */}
      <div className="px-4 pt-3 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Lookbook</span>
        </div>
        <h2 className="text-xl font-serif font-medium text-white">Visual Sanctuary</h2>
        <p className="text-xs text-stone-400">
          Tap the pulsing indicators on the images below to explore featured architectural objects.
        </p>
      </div>

      {/* Lookbook Stories */}
      <div className="space-y-6 px-4">
        {LOOKBOOK_STORIES.map((story) => (
          <div key={story.id} className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 space-y-3 pb-3">
            {/* Story image with interactive hotspots */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />

              {/* Hotspots */}
              {story.hotspots.map((hs, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  aria-label={`Hotspot for ${hs.title}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-400 text-stone-950 items-center justify-center font-bold text-[10px] shadow-lg border border-white/40">
                      +
                    </span>
                  </span>
                </button>
              ))}

              {/* Active Hotspot Popover */}
              {selectedHotspot && story.hotspots.some((h) => h.productId === selectedHotspot.productId) && (
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/95 backdrop-blur-md border border-amber-400/50 p-3 rounded-xl flex items-center justify-between text-xs z-20 shadow-2xl animate-in fade-in">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] text-amber-400 uppercase font-mono">Featured Object</p>
                    <h4 className="font-semibold text-white truncate">{selectedHotspot.title}</h4>
                    <span className="text-stone-300 font-medium">{selectedHotspot.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewProduct(selectedHotspot.productId)}
                      className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="p-1.5 text-stone-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Story Details */}
            <div className="px-3 pt-1 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-serif font-medium text-white text-sm">{story.title}</h3>
                <p className="text-[11px] text-stone-400">Photography: {story.photographer} · {story.date}</p>
              </div>
              <span className="text-[10px] text-amber-400 bg-stone-950 px-2 py-1 rounded border border-stone-800 font-mono">
                {story.hotspots.length} Tags
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

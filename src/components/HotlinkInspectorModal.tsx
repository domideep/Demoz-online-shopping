import React, { useState } from 'react';
import { X, Link2, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { HotlinkImageInfo } from '../types';

interface HotlinkInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: HotlinkImageInfo[];
}

export const HotlinkInspectorModal: React.FC<HotlinkInspectorModalProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Active Hotlinked Images ({images.length})</h3>
              <p className="text-xs text-stone-400">
                All external image sources hotlinked and rendered in the app screens
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {images.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-stone-950 rounded-xl border border-stone-850 flex items-center gap-3.5 hover:border-stone-700 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0">
                <img
                  src={item.url}
                  alt={item.alt || 'Hotlinked asset'}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white truncate">
                    {item.alt || `Hotlink #${index + 1}`}
                  </span>
                  {item.sourceScreen && (
                    <span className="text-[10px] bg-stone-900 px-2 py-0.5 rounded text-amber-400 border border-stone-800 font-mono">
                      {item.sourceScreen}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-mono text-stone-400 truncate">{item.url}</p>

                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="flex items-center gap-1 text-[11px] text-stone-300 hover:text-white bg-stone-900 px-2.5 py-1 rounded-md border border-stone-800"
                  >
                    {copiedUrl === item.url ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 bg-stone-900 px-2.5 py-1 rounded-md border border-stone-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
          <span>Hotlinked CDN: Unsplash High-Definition Assets</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

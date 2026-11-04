import React, { useState } from 'react';
import { X, Code2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { HTML_PRESETS } from '../data/mockData';

interface HtmlImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHtml: string;
  onSave: (newHtml: string) => void;
}

export const HtmlImportModal: React.FC<HtmlImportModalProps> = ({
  isOpen,
  onClose,
  currentHtml,
  onSave,
}) => {
  const [inputHtml, setInputHtml] = useState(currentHtml);

  if (!isOpen) return null;

  const handleApply = () => {
    onSave(inputHtml);
    onClose();
  };

  const handleSelectPreset = (content: string) => {
    setInputHtml(content);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Import HTML & Hotlinked Screens</h3>
              <p className="text-xs text-stone-400">
                Paste any HTML snippet or web page markup to extract images and render screens
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

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Ready-Made Screen Preset:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {HTML_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.htmlContent)}
                  className="p-2.5 text-left rounded-xl bg-stone-950 hover:bg-stone-850 border border-stone-800 transition-all group"
                >
                  <p className="text-xs font-semibold text-white group-hover:text-amber-400 truncate">{p.title}</p>
                  <p className="text-[10px] text-stone-400 truncate">{p.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* HTML Text Area */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="html-snippet-input" className="text-stone-300 font-medium">Your HTML / Component Code</label>
              <button
                onClick={() => setInputHtml('')}
                className="text-stone-400 hover:text-rose-400 text-[11px]"
              >
                Clear input
              </button>
            </div>
            <textarea
              id="html-snippet-input"
              value={inputHtml}
              onChange={(e) => setInputHtml(e.target.value)}
              placeholder="Paste HTML with <img src='...'> tags or Tailwind CSS classes here..."
              rows={11}
              className="w-full bg-stone-950 text-amber-200/90 font-mono text-xs p-3 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-400 leading-relaxed resize-none"
            />
          </div>

          <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-850 text-xs text-stone-400 space-y-1">
            <p className="font-semibold text-stone-200">How image hotlinking works:</p>
            <p>
              Any <code className="text-amber-300">&lt;img src="https://..."&gt;</code> or CSS{' '}
              <code className="text-amber-300">background-image: url(...)</code> in your markup will be parsed and rendered live with full hotlinking support.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950/80 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Render Screens</span>
          </button>
        </div>
      </div>
    </div>
  );
};

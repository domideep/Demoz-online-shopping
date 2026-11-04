import React, { useState, useMemo } from 'react';
import { Code2, Eye, Link2, Copy, Check, Sparkles, RefreshCw, ExternalLink } from 'lucide-react';
import { HTML_PRESETS } from '../../data/mockData';
import { HtmlPreset } from '../../types';

interface CustomHtmlScreenProps {
  currentHtml: string;
  onUpdateHtml: (newHtml: string) => void;
  onOpenModal: () => void;
}

export const CustomHtmlScreen: React.FC<CustomHtmlScreenProps> = ({
  currentHtml,
  onUpdateHtml,
  onOpenModal,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'hotlinks' | 'code'>('preview');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Extract all hotlinked image URLs from the current HTML
  const extractedImages = useMemo(() => {
    const urls: { url: string; alt: string }[] = [];
    // Match img src
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(currentHtml)) !== null) {
      const fullTag = match[0];
      const src = match[1];
      const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1] : 'Hotlinked image';
      urls.push({ url: src, alt });
    }

    // Match background-image: url(...)
    const bgRegex = /url\(['"]?([^'"\)]+)['"]?\)/gi;
    let bgMatch;
    while ((bgMatch = bgRegex.exec(currentHtml)) !== null) {
      if (bgMatch[1].startsWith('http')) {
        urls.push({ url: bgMatch[1], alt: 'Background image' });
      }
    }

    return urls;
  }, [currentHtml]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleLoadPreset = (preset: HtmlPreset) => {
    onUpdateHtml(preset.htmlContent);
  };

  // Construct iframe document that includes Tailwind CSS so pasted tailwind code styles perfectly
  const iframeDocument = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: transparent;
      color: #fafaf9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 8px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  ${currentHtml}
</body>
</html>`;
  }, [currentHtml]);

  return (
    <div className="pb-16 text-stone-100 space-y-4">
      {/* Header and Preset Switcher */}
      <div className="p-4 bg-stone-900 border-b border-stone-850 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HTML & Hotlink Screen Engine</span>
            </div>
            <h2 className="text-base font-serif font-medium text-white">Live Rendered Screens</h2>
          </div>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Paste Custom HTML</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Screen Presets:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {HTML_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleLoadPreset(p)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  currentHtml === p.htmlContent
                    ? 'bg-amber-400 text-stone-950 font-semibold'
                    : 'bg-stone-950 text-stone-300 hover:text-white border border-stone-800'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800 text-xs">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === 'preview' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Rendered Preview</span>
          </button>
          <button
            onClick={() => setViewMode('hotlinks')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === 'hotlinks' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400'
            }`}
          >
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Hotlinks ({extractedImages.length})</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === 'code' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Source</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="px-4">
        {viewMode === 'preview' && (
          <div className="space-y-3">
            <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
              <div className="px-3 py-1.5 bg-stone-900 border-b border-stone-850 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Live Rendered Container</span>
                </span>
                <span>{extractedImages.length} Hotlinked Images Active</span>
              </div>

              {/* Rendered frame with iframe for full Tailwind & responsive CSS isolation */}
              <iframe
                title="HTML Screen Sandbox"
                srcDoc={iframeDocument}
                sandbox="allow-scripts"
                className="w-full min-h-[500px] border-0"
              />
            </div>
          </div>
        )}

        {viewMode === 'hotlinks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>All images automatically detected from the HTML:</span>
              <span>{extractedImages.length} found</span>
            </div>

            {extractedImages.length === 0 ? (
              <div className="p-8 text-center bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-400">
                No &lt;img&gt; or background URLs found in this snippet. Paste HTML with image tags to hotlink!
              </div>
            ) : (
              <div className="space-y-2.5">
                {extractedImages.map((img, i) => (
                  <div
                    key={i}
                    className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center gap-3"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-16 h-16 rounded-lg object-cover bg-stone-950 border border-stone-800 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs font-medium text-white truncate">{img.alt}</p>
                      <p className="text-[11px] font-mono text-stone-400 truncate">{img.url}</p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          onClick={() => handleCopyUrl(img.url)}
                          className="flex items-center gap-1 text-[10px] text-stone-300 hover:text-white bg-stone-950 px-2 py-0.5 rounded border border-stone-800"
                        >
                          {copiedUrl === img.url ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        <a
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 bg-stone-950 px-2 py-0.5 rounded border border-stone-800"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open Image</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === 'code' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Raw HTML & Tailwind markup</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentHtml);
                  setCopiedUrl('code');
                  setTimeout(() => setCopiedUrl(null), 2000);
                }}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
              >
                {copiedUrl === 'code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl === 'code' ? 'Copied code!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] font-mono text-amber-200/90 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
              {currentHtml}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

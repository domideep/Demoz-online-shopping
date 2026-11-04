/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ScreenId, DeviceFrameType, Product, CartItem, HotlinkImageInfo } from './types';
import { PRODUCTS, STORIES, LOOKBOOK_STORIES, USER_ORDERS, HTML_PRESETS } from './data/mockData';
import { HeaderBar } from './components/HeaderBar';
import { DeviceFrame } from './components/DeviceFrame';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { CartScreen } from './components/screens/CartScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { LookbookScreen } from './components/screens/LookbookScreen';
import { CustomHtmlScreen } from './components/screens/CustomHtmlScreen';
import { HtmlImportModal } from './components/HtmlImportModal';
import { HotlinkInspectorModal } from './components/HotlinkInspectorModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { FloatingAssistantButton } from './components/FloatingAssistantButton';
import { CheckCircle2, Code2, Sparkles, X, Bot } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('explore');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrameType>('mobile');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0]?.name || 'Standard',
    },
  ]);
  const [favorites, setFavorites] = useState<string[]>(['prod-1', 'prod-3']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Assistant & Custom HTML state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [customHtml, setCustomHtml] = useState<string>(HTML_PRESETS[0].htmlContent);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isHotlinksOpen, setIsHotlinksOpen] = useState(false);
  const [showWelcomeNotice, setShowWelcomeNotice] = useState(true);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prev) => {
      const color = selectedColor || product.colors[0]?.name || 'Standard';
      const existing = prev.find((item) => item.product.id === product.id && item.selectedColor === color);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    triggerToast(`Added ${quantity}× "${product.name}" to Bag`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    triggerToast('Item removed from shopping bag');
  };

  const handleOrderSuccess = (total: number) => {
    setCart([]);
    triggerToast(`Order confirmed! Paid ₦${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveScreen('detail');
  };

  // Aggregate all hotlinked image URLs from the mock data and custom HTML
  const allHotlinkedImages = useMemo(() => {
    const list: HotlinkImageInfo[] = [];

    // Products
    PRODUCTS.forEach((p) => {
      p.images.forEach((img, idx) => {
        list.push({ url: img, alt: `${p.name} (Photo ${idx + 1})`, sourceScreen: 'Products' });
      });
    });

    // Stories
    STORIES.forEach((s) => {
      list.push({ url: s.image, alt: `Highlight: ${s.name}`, sourceScreen: 'Stories' });
    });

    // Lookbook
    LOOKBOOK_STORIES.forEach((lb) => {
      list.push({ url: lb.coverImage, alt: lb.title, sourceScreen: 'Lookbook' });
    });

    // Orders
    USER_ORDERS.forEach((o) => {
      o.items.forEach((item) => {
        if (!list.some((existing) => existing.url === item.image)) {
          list.push({ url: item.image, alt: item.title, sourceScreen: 'Orders' });
        }
      });
    });

    // Custom HTML
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(customHtml)) !== null) {
      const src = match[1];
      if (!list.some((existing) => existing.url === src)) {
        list.push({ url: src, alt: 'Custom HTML hotlinked image', sourceScreen: 'HTML Screen' });
      }
    }

    return list;
  }, [customHtml]);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Application Header */}
      <HeaderBar
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        deviceFrame={deviceFrame}
        onChangeDeviceFrame={setDeviceFrame}
        cartCount={cartTotalCount}
        onOpenImporter={() => setIsImporterOpen(true)}
        onOpenHotlinks={() => setIsHotlinksOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        totalHotlinksCount={allHotlinkedImages.length}
      />

      {/* Helpful Quick Banner for pasting HTML/images & AI Assistant */}
      {showWelcomeNotice && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-amber-500/20 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <p className="text-stone-300">
                <span className="font-semibold text-white">Need guidance or have your own HTML snippet?</span>{' '}
                Ask our <button onClick={() => setIsAssistantOpen(true)} className="text-amber-400 font-semibold underline underline-offset-2 hover:text-amber-300">AI Assistant</button> for help, or use the <span className="text-amber-400 font-medium">"Import HTML"</span> button to render custom screens.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAssistantOpen(true)}
                className="flex items-center gap-1 text-[11px] font-semibold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 px-2.5 py-1 rounded-md transition-colors"
              >
                <Bot className="w-3 h-3 text-amber-400" />
                <span>Ask AI</span>
              </button>
              <button
                onClick={() => {
                  setIsImporterOpen(true);
                }}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded-md transition-colors"
              >
                <Code2 className="w-3 h-3" />
                <span>Paste Code</span>
              </button>
              <button
                onClick={() => setShowWelcomeNotice(false)}
                className="text-stone-400 hover:text-white p-1"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device Frame & Active Screen Container */}
      <main className="flex-1 flex flex-col">
        <DeviceFrame
          deviceFrame={deviceFrame}
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          cartCount={cartTotalCount}
        >
          {activeScreen === 'explore' && (
            <ExploreScreen
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onNavigateLookbook={() => setActiveScreen('lookbook')}
            />
          )}

          {activeScreen === 'detail' && (
            <DetailScreen
              product={selectedProduct}
              onBack={() => setActiveScreen('explore')}
              onAddToCart={handleAddToCart}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeScreen === 'cart' && (
            <CartScreen
              cart={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onExplore={() => setActiveScreen('explore')}
              onOrderSuccess={handleOrderSuccess}
            />
          )}

          {activeScreen === 'profile' && (
            <ProfileScreen
              favorites={favorites}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activeScreen === 'lookbook' && (
            <LookbookScreen onSelectProduct={handleSelectProduct} />
          )}

          {activeScreen === 'custom-html' && (
            <CustomHtmlScreen
              currentHtml={customHtml}
              onUpdateHtml={setCustomHtml}
              onOpenModal={() => setIsImporterOpen(true)}
            />
          )}
        </DeviceFrame>
      </main>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-stone-900 border border-amber-400/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating AI Shopping Assistant Button */}
      <FloatingAssistantButton
        isOpen={isAssistantOpen}
        onClick={() => setIsAssistantOpen(true)}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        currentScreen={activeScreen}
        onNavigateScreen={setActiveScreen}
      />

      {/* HTML Import Modal */}
      <HtmlImportModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        currentHtml={customHtml}
        onSave={(newHtml) => {
          setCustomHtml(newHtml);
          setActiveScreen('custom-html');
        }}
      />

      {/* Hotlink Inspector Modal */}
      <HotlinkInspectorModal
        isOpen={isHotlinksOpen}
        onClose={() => setIsHotlinksOpen(false)}
        images={allHotlinkedImages}
      />
    </div>
  );
}

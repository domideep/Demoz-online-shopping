import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Compass,
  FileText,
  User,
  Code2,
} from 'lucide-react';
import { ScreenId } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: {
    type: 'navigate';
    screen: ScreenId;
    label: string;
  }[];
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onNavigateScreen: (screen: ScreenId) => void;
}

const QUICK_PROMPTS = [
  'How do I checkout & get 20% off?',
  'Where can I track my active order?',
  'How do I import HTML with hotlinks?',
  'Show me lighting and lamps',
  'How to switch to iPad or desktop view?',
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigateScreen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your **Demoz Shopping Nija Guide**. 

I can help you navigate screens, discover architectural items, apply discounts, track your delivery, or import HTML with hotlinked images. 

How can I help you today?`,
      timestamp: 'Just now',
      actions: [
        { type: 'navigate', screen: 'explore', label: 'Explore Products' },
        { type: 'navigate', screen: 'cart', label: 'Go to Shopping Bag' },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Parse action tags like [[ACTION:navigate:screen|Label]] from assistant replies
  const parseResponseActions = (rawText: string) => {
    const actionRegex = /\[\[ACTION:([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)\|([^\]]+)\]\]/g;
    const actions: { type: 'navigate'; screen: ScreenId; label: string }[] = [];
    let cleanText = rawText;

    let match;
    while ((match = actionRegex.exec(rawText)) !== null) {
      const actionType = match[1];
      const target = match[2] as ScreenId;
      const label = match[3];

      if (actionType === 'navigate') {
        actions.push({ type: 'navigate', screen: target, label });
      }
    }

    cleanText = cleanText.replace(actionRegex, '').trim();
    return { cleanText, actions };
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInputValue('');
    setIsLoading(true);

    try {
      // Call backend AI assistant API
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          currentScreen,
          history: messages.slice(-4).map((m) => ({
            role: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const { cleanText, actions } = parseResponseActions(data.text);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: cleanText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Backend assistant endpoint error, responding with fallback:', err);
      // Fallback local response
      const fallbackReply = generateClientFallback(textToSend, currentScreen);
      const { cleanText, actions } = parseResponseActions(fallbackReply);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: cleanText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateClientFallback = (text: string, screen: ScreenId): string => {
    const lower = text.toLowerCase();
    if (lower.includes('checkout') || lower.includes('bag') || lower.includes('buy') || lower.includes('cart')) {
      return `To complete your purchase in Demoz shopping Nija:
1. Tap the **Bag** tab at the bottom.
2. Select your delivery option (**Standard** is free).
3. Apply promo code **DEMOZ20** for 20% off.
4. Tap **Pay with Apple Pay** to confirm!

[[ACTION:navigate:cart|Go to Shopping Bag]]`;
    }
    if (lower.includes('discount') || lower.includes('code') || lower.includes('promo')) {
      return `Use promo code **DEMOZ20** or **SUMMER20** during checkout for an instant **20% discount** on your order!

[[ACTION:navigate:cart|Open Shopping Bag]]`;
    }
    if (lower.includes('track') || lower.includes('order') || lower.includes('status')) {
      return `You can track active deliveries in your **Profile** screen. Order #ORD-9842 is currently **In Transit** via FedEx with delivery expected tomorrow by 4:00 PM.

[[ACTION:navigate:profile|View My Orders]]`;
    }
    if (lower.includes('html') || lower.includes('image') || lower.includes('hotlink')) {
      return `You can import any HTML snippet or hotlink images:
1. Tap **"Import HTML"** in the top bar.
2. Paste your HTML with \`<img>\` tags.
3. Tap **"Render Screens"** to view the live hotlinked preview!

[[ACTION:navigate:custom-html|Open HTML Screen Engine]]`;
    }
    if (lower.includes('lookbook')) {
      return `The **Lookbook** is an editorial visual sanctuary with clickable hotspots on photographs. Tap any \`+\` badge to see product details and prices.

[[ACTION:navigate:lookbook|Open Lookbook]]`;
    }
    return `I am here to guide you across all parts of **Demoz shopping Nija**. Currently you are viewing the **${screen}** screen. You can browse collections, inspect product details, checkout, or import custom HTML with hotlinked images.

[[ACTION:navigate:explore|Explore Products]]
[[ACTION:navigate:cart|View Bag]]`;
  };

  const handleActionClick = (action: { type: 'navigate'; screen: ScreenId; label: string }) => {
    onNavigateScreen(action.screen);
    onClose();
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Chat reset. I am your **Demoz Shopping Nija Guide**. How can I help you?`,
        timestamp: 'Just now',
        actions: [
          { type: 'navigate', screen: 'explore', label: 'Explore Products' },
          { type: 'navigate', screen: 'cart', label: 'Go to Shopping Bag' },
        ],
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-400/30 rounded-2xl w-full max-w-lg h-[640px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden ring-1 ring-amber-400/20">
        {/* Header */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-tight">Demoz AI Assistant</h3>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Guiding you through Demoz shopping Nija · Context: <span className="text-amber-400 capitalize">{currentScreen}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-amber-400 text-stone-950 font-medium rounded-tr-sm shadow-md'
                    : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-sm shadow-md'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.text.split('**').map((chunk, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className={msg.sender === 'user' ? 'font-bold' : 'text-amber-300 font-semibold'}>
                        {chunk}
                      </strong>
                    ) : (
                      chunk
                    )
                  )}
                </div>

                {/* Interactive Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="pt-2 border-t border-stone-800/80 flex flex-wrap gap-1.5">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(act)}
                        className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-stone-950 font-semibold text-[11px] px-2.5 py-1.5 rounded-lg border border-amber-400/30 transition-all shadow-sm"
                      >
                        {act.screen === 'explore' && <Compass className="w-3.5 h-3.5" />}
                        {act.screen === 'cart' && <ShoppingBag className="w-3.5 h-3.5" />}
                        {act.screen === 'detail' && <FileText className="w-3.5 h-3.5" />}
                        {act.screen === 'profile' && <User className="w-3.5 h-3.5" />}
                        {act.screen === 'lookbook' && <Sparkles className="w-3.5 h-3.5" />}
                        {act.screen === 'custom-html' && <Code2 className="w-3.5 h-3.5" />}
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl w-fit">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Demoz AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts */}
        <div className="px-4 py-2 bg-stone-950 border-t border-stone-850">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <span className="text-[10px] text-stone-500 flex items-center gap-1 whitespace-nowrap">
              <HelpCircle className="w-3 h-3 text-amber-400/80" />
              <span>Suggested:</span>
            </span>
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-[11px] bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-white px-2.5 py-1 rounded-lg border border-stone-800 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask anything about Demoz shopping Nija..."
            className="flex-1 bg-stone-950 text-xs text-white placeholder-stone-500 px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-stone-950 rounded-xl transition-colors shadow-sm"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

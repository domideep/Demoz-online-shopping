import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini API client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({ apiKey });
}

const SYSTEM_INSTRUCTION = `You are the official AI Shopping Assistant for "Demoz shopping Nija" (a premium multi-screen shopping app with hotlinked photography).
Your role is to guide users if they encounter any difficulty, answer questions about shopping, navigation, features, and provide helpful quick actions.

Key App Features & Knowledge:
1. SCREENS:
   - "explore": Discover curated furniture, lighting, ceramics, textiles, and art objects. Search and filter by category.
   - "detail": View high-res photo gallery, choose colors, read specifications and artisan background, add items to bag.
   - "lookbook": Interactive visual sanctuary with clickable hotspots on photos that reveal featured products.
   - "cart": Review items in bag, select Standard (Free) or White-Glove priority shipping ($45), apply promo code DEMOZ20 or SUMMER20 for 20% off, and check out with Apple Pay.
   - "profile": Member Elena Vance (Obsidian Circle), active order tracking (order #ORD-9842 in transit), saved wishlist, and concierge settings.
   - "custom-html": HTML & Hotlink Screen Engine. Paste any HTML snippet containing <img> tags or background URLs to render screens and extract hotlinks.

2. CONTROLS:
   - Device Frame: Top bar has buttons to switch between iPhone 16 Pro, iPad Tablet, Desktop Canvas, and Fullscreen.
   - Hotlinks: "Hotlinks" button in the top bar lists all active remote image URLs with 1-click copy.
   - Import HTML: "Import HTML" button allows pasting custom HTML markup or loading ready-made presets.

3. ACTION TAGS:
   You can include special action triggers in your response by adding one or more of these tags on their own line:
   [[ACTION:navigate:explore|Go to Explore]]
   [[ACTION:navigate:detail|View Featured Product]]
   [[ACTION:navigate:lookbook|Open Lookbook]]
   [[ACTION:navigate:cart|Go to Shopping Bag]]
   [[ACTION:navigate:profile|View My Orders]]
   [[ACTION:navigate:custom-html|Import Custom HTML]]

Keep responses concise, friendly, and directly actionable. Emphasize helpfulness without robotic fluff.`;

// AI Assistant endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, currentScreen, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If Gemini API is configured, use gemini-3.8-flash
    if (ai) {
      try {
        const contents = [];
        // Add chat history if present
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.text }],
            });
          }
        }

        // Add current user prompt with context
        const contextualPrompt = `[User is currently viewing "${currentScreen}" screen]\nUser question: ${message}`;
        contents.push({
          role: 'user',
          parts: [{ text: contextualPrompt }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const replyText = response.text || "I'm here to help you navigate Demoz shopping Nija!";
        return res.json({ text: replyText });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using smart fallback engine:', geminiError?.message);
        // Fallback to local intelligent response below
      }
    }

    // Smart Local Fallback Response Engine
    const lower = message.toLowerCase();
    let reply = '';
    const actions: string[] = [];

    if (lower.includes('track') || lower.includes('where is my') || lower.includes('tracking') || lower.includes('delivery') || lower.includes('fedex') || lower.includes('package')) {
      reply = `You can track your orders in the **Profile** screen under the **Orders** tab. Your active order #ORD-9842 (Kanso Oak Chair & Vessel Vase) is currently **In Transit** via FedEx with estimated delivery tomorrow by 4:00 PM.`;
      actions.push('[[ACTION:navigate:profile|View My Orders]]');
    } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('promo') || lower.includes('code') || lower.includes('sale') || lower.includes('voucher')) {
      reply = `You can use the promo code **DEMOZ20** (or **SUMMER20**) in your Shopping Bag for **20% off** your entire order!`;
      actions.push('[[ACTION:navigate:cart|Open Bag & Apply Code]]');
    } else if (lower.includes('checkout') || lower.includes('buy') || lower.includes('cart') || lower.includes('bag') || lower.includes('purchase') || lower.includes('order')) {
      reply = `To checkout in Demoz shopping Nija:
1. Tap the **Bag** tab at the bottom (or the shopping bag icon in the top header).
2. Choose your delivery method: **Standard** (Free nationwide) or **White-Glove Express** (₦45).
3. Apply promo code **DEMOZ20** for an instant 20% discount.
4. Tap **Pay with Card / Apple Pay** to complete your order in Nigerian Naira (₦).`;
      actions.push('[[ACTION:navigate:cart|Go to Shopping Bag]]');
      actions.push('[[ACTION:navigate:profile|View My Orders]]');
    } else if (lower.includes('html') || lower.includes('hotlink') || lower.includes('paste') || lower.includes('image')) {
      reply = `You can import any custom HTML or hotlink images directly:
1. Click the **"Import HTML"** button in the top bar or switch to the **"HTML Screens"** tab.
2. Paste your code with \`<img>\` tags or choose from our pre-built presets (Nordic Living, Artisan Cafe, Villa Retreat).
3. Tap **"Render Screens"** to view the live sandbox and view all hotlinked image URLs.`;
      actions.push('[[ACTION:navigate:custom-html|Open HTML Screen Engine]]');
    } else if (lower.includes('lookbook') || lower.includes('hotspot') || lower.includes('pin') || lower.includes('magazine')) {
      reply = `The **Lookbook** is an interactive visual magazine. Tap the glowing \`+\` hotspots on the photographs to explore and view featured objects in real spaces!`;
      actions.push('[[ACTION:navigate:lookbook|Explore Lookbook]]');
    } else if (lower.includes('device') || lower.includes('phone') || lower.includes('tablet') || lower.includes('screen size') || lower.includes('mobile')) {
      reply = `You can switch device views anytime using the device icons on the right of the top header:
- **iPhone 16 Pro** (with dynamic island & bezel)
- **Tablet** (iPad frame)
- **Desktop Canvas** (browser frame)
- **Fullscreen** (maximizes canvas)`;
    } else if (lower.includes('chair') || lower.includes('lamp') || lower.includes('furniture') || lower.includes('search')) {
      reply = `You can search and filter through all furniture, lighting, ceramics, and textiles on the **Explore** screen using the top search bar or category tabs.`;
      actions.push('[[ACTION:navigate:explore|Browse Collection]]');
    } else {
      reply = `Welcome to **Demoz shopping Nija**! I can assist you with:
- **Navigating screens**: Explore items, product details, interactive lookbook, and cart.
- **Shopping & discounts**: Use promo code **DEMOZ20** for 20% off.
- **Order tracking**: Check live status and FedEx tracking in your Profile.
- **HTML & Hotlinks**: Render custom HTML screens and hotlink remote images.
- **Device views**: Preview on iPhone 16 Pro, iPad, or Desktop.

What would you like assistance with?`;
      actions.push('[[ACTION:navigate:explore|Browse Products]]');
      actions.push('[[ACTION:navigate:cart|View Shopping Bag]]');
    }

    const fullResponse = actions.length > 0 ? `${reply}\n\n${actions.join('\n')}` : reply;
    return res.json({ text: fullResponse });
  } catch (error: any) {
    console.error('Assistant error:', error);
    return res.status(500).json({ error: 'Failed to process assistant request' });
  }
});

// Mounting Vite in development or serving static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Demoz shopping Nija running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

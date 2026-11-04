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

const SYSTEM_INSTRUCTION = `You are the official AI Shopping Assistant for "Demoz shopping Nija" (Nigeria's trusted online food market featuring verified current market prices).
Your role is to guide users if they encounter any difficulty, answer questions about shopping, navigation, features, account creation, and provide helpful quick actions.

Key App Features & Knowledge:
1. STORE IDENTITY & CURRENCY:
   - Store Name: "Demoz shopping Nija"
   - Motto: "Shop at your pace and comfort"
   - Currency: Nigerian Naira (₦)
   - Delivery: Fast door-to-door delivery across Lagos, Abuja, Port Harcourt, and all 36 states of Nigeria.

2. NIGERIAN FOOD MARKET CATALOG WITH CURRENT MARKET PRICES:
   - Mama's Pride Parboiled Rice (50kg Net Bag · Olam): ₦88,500 (Market price: ₦95,000)
   - SunCo Pure Refined Vegetable Cooking Oil (5 Litres Gallon): ₦19,500 (Market price: ₦22,000)
   - Fresh Farm Eggs (Crate of 30 Jumbo Eggs): ₦5,500 (Market price: ₦6,200)
   - Fresh Frozen Titus Mackerel Fish (10kg Master Carton): ₦45,000 (Market price: ₦50,000)
   - Fresh Market Farm Produce & Soup Vegetables Basket (Tomatoes, Rodo, Onions, Carrots, Cucumbers, Greens): ₦12,500 (Market price: ₦15,000)
   - Titus Sardines in Pure Vegetable Oil (5 Cans Value Pack): ₦5,200 (Market price: ₦5,800)
   - Golden Penny Spaghetti (500g Durum Wheat Pasta · 2-Pack Bundle): ₦2,500 (Market price: ₦2,800)

3. ACCOUNT CREATION & LOGIN:
   - Customers can sign up and login under the "Shop with us today" section in the footer or by clicking "Sign up / Log in" in the top header.
   - CRITICAL: Only an email and password are required to own and access an account! No complex forms.

4. SCREENS:
   - "explore": Browse all food items with current market price tags, search by keyword, filter by categories.
   - "detail": View high-res photo gallery, ingredients, sizes, specifications, and add to bag.
   - "lookbook": Visual Nigerian food lookbook with interactive price tags.
   - "cart": Review items in bag, select delivery, apply discount code DEMOZ20 for 20% off, and checkout in Nigerian Naira (₦).
   - "profile": View active customer profile, order tracking, and saved items.
   - "custom-html": HTML & Hotlink Screen Engine to render custom HTML screens.

5. ACTION TAGS:
   You can include special action triggers in your response by adding one or more of these tags on their own line:
   [[ACTION:navigate:explore|Go to Market]]
   [[ACTION:navigate:detail|View Food Item]]
   [[ACTION:navigate:lookbook|Open Lookbook]]
   [[ACTION:navigate:cart|Go to Shopping Bag]]
   [[ACTION:navigate:profile|View My Orders]]
   [[ACTION:navigate:custom-html|Import Custom HTML]]

Keep responses concise, friendly, warm, and directly actionable. Emphasize helpfulness without robotic fluff.`;

// AI Assistant endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, currentScreen, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If Gemini API is configured, use gemini-2.5-flash
    if (ai) {
      try {
        const contents = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.text }],
            });
          }
        }

        const contextualPrompt = `[User is currently viewing "${currentScreen}" screen]\nUser question: ${message}`;
        contents.push({
          role: 'user',
          parts: [{ text: contextualPrompt }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
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
      }
    }

    // Smart Local Fallback Response Engine
    const lower = message.toLowerCase();
    let reply = '';
    const actions: string[] = [];

    if (lower.includes('signup') || lower.includes('sign up') || lower.includes('login') || lower.includes('log in') || lower.includes('account')) {
      reply = `To own and access your shopping account on **Demoz shopping Nija**:
1. Scroll down to the **"Shop with us today"** section in the footer, or tap **"Sign up"** at the top right.
2. Enter **only your email and password** (minimum 6 characters) — no complicated details needed!
3. Tap **Sign up** to instantly create and access your shopping account. If you already have an account, switch to **Log in**.`;
      actions.push('[[ACTION:navigate:explore|Shop with us today]]');
      actions.push('[[ACTION:navigate:profile|View Account]]');
    } else if (lower.includes('rice') || lower.includes('mama')) {
      reply = `**Mama's Pride Parboiled Rice (50kg Bag from Olam)**:
- Current Market Price: **₦88,500** (Regular: ₦95,000)
- 100% stone-free, parboiled long grain, non-sticky and high-yielding for family and party cooking.`;
      actions.push('[[ACTION:navigate:explore|View Mama\'s Pride Rice]]');
    } else if (lower.includes('oil') || lower.includes('sunco')) {
      reply = `**SunCo Pure Refined Vegetable Cooking Oil (5 Litres Gallon)**:
- Current Market Price: **₦19,500** (Regular: ₦22,000)
- 5x filtered, crystal clear, fortified with Vitamin A, zero cholesterol.`;
      actions.push('[[ACTION:navigate:explore|View SunCo Oil]]');
    } else if (lower.includes('egg') || lower.includes('crate')) {
      reply = `**Fresh Farm Eggs (Crate of 30 Jumbo Eggs)**:
- Current Market Price: **₦5,500** (Regular: ₦6,200)
- Golden yolk, thick egg whites, clean strong shells fresh from layer farms.`;
      actions.push('[[ACTION:navigate:explore|View Farm Eggs]]');
    } else if (lower.includes('fish') || lower.includes('titus') && lower.includes('mackerel')) {
      reply = `**Fresh Frozen Titus Mackerel Fish (10kg Master Carton)**:
- Current Market Price: **₦45,000** (Regular: ₦50,000)
- Deep-sea iced Atlantic mackerel in protective blue thermal bag. Rich in Omega-3.`;
      actions.push('[[ACTION:navigate:explore|View Titus Fish]]');
    } else if (lower.includes('veggie') || lower.includes('vegetable') || lower.includes('tomato') || lower.includes('pepper')) {
      reply = `**Fresh Market Farm Produce & Soup Vegetables Basket**:
- Current Market Price: **₦12,500** (Regular: ₦15,000)
- Includes fresh tomatoes, rodo peppers, tatase, onions, carrots, cucumbers, cabbage, sweet corn, and soup greens.`;
      actions.push('[[ACTION:navigate:explore|View Vegetables Basket]]');
    } else if (lower.includes('spaghetti') || lower.includes('pasta') || lower.includes('golden penny')) {
      reply = `**Golden Penny Spaghetti (500g Pasta · 2-Pack Bundle)**:
- Current Market Price: **₦2,500** (Regular: ₦2,800)
- Durum wheat semolina, cooks non-sticky and firm.`;
      actions.push('[[ACTION:navigate:explore|View Spaghetti Bundle]]');
    } else if (lower.includes('sardine')) {
      reply = `**Titus Sardines in Pure Vegetable Oil (5 Cans Value Pack)**:
- Current Market Price: **₦5,200** (Regular: ₦5,800)
- Authentic Moroccan Titus sardines in vegetable oil with pull-tab cans.`;
      actions.push('[[ACTION:navigate:explore|View Titus Sardines]]');
    } else if (lower.includes('price') || lower.includes('market price') || lower.includes('cost')) {
      reply = `Here are our **Current Nigerian Market Prices**:
- **Mama's Pride Rice 50kg**: ₦88,500
- **SunCo Vegetable Oil 5L**: ₦19,500
- **Fresh Farm Eggs (30-Crate)**: ₦5,500
- **Frozen Titus Fish (10kg Carton)**: ₦45,000
- **Fresh Soup Veggies Basket**: ₦12,500
- **Titus Sardines (5 Cans)**: ₦5,200
- **Golden Penny Spaghetti (2-Pack)**: ₦2,500`;
      actions.push('[[ACTION:navigate:explore|Browse All Prices]]');
    } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('promo') || lower.includes('code')) {
      reply = `Use promo code **DEMOZ20** in your Shopping Bag for an instant **20% discount** off your entire order in Naira (₦)!`;
      actions.push('[[ACTION:navigate:cart|Open Bag & Apply Code]]');
    } else {
      reply = `Welcome to **Demoz shopping Nija**! Shop at your pace and comfort.
I can assist you with:
- **Foodstuffs with Live Price Tags**: Mama's Pride 50kg rice, SunCo 5L oil, fresh eggs, frozen Titus fish, farm vegetables, pasta, and sardines.
- **Account Sign up & Login**: Only email and password needed under **"Shop with us today"**.
- **Shopping Bag & Checkout**: Current market prices billed in Nigerian Naira (₦) with nationwide delivery.
- **Order Tracking**: Track express food delivery vans across Nigeria.`;
      actions.push('[[ACTION:navigate:explore|Browse Food Items]]');
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

import { Product, UserOrder, HtmlPreset } from '../types';

export const CATEGORIES = [
  { id: 'all', label: 'All Food Items' },
  { id: 'grains', label: 'Rice & Spaghetti' },
  { id: 'oil', label: 'Cooking Oil' },
  { id: 'proteins', label: 'Fish & Poultry Eggs' },
  { id: 'fresh', label: 'Fresh Market Veggies' },
  { id: 'canned', label: 'Canned Provisions' },
];

export const STORIES = [
  {
    id: 's1',
    name: "Mama's Rice",
    image: '/assets/aistudio/ktt7_4d78c037.jpg',
    hasUnseen: true,
  },
  {
    id: 's2',
    name: 'SunCo 5L Oil',
    image: '/assets/aistudio/ktt10_1af1158d.jpg',
    hasUnseen: true,
  },
  {
    id: 's3',
    name: 'Farm Eggs',
    image: '/assets/aistudio/ktt11_d9bc365c.jpg',
    hasUnseen: false,
  },
  {
    id: 's4',
    name: 'Frozen Titus',
    image: '/assets/aistudio/ktt1_4c4ae2eb.png',
    hasUnseen: true,
  },
  {
    id: 's5',
    name: 'Fresh Veggies',
    image: '/assets/aistudio/ktt4_5294041e.jpg',
    hasUnseen: false,
  },
  {
    id: 's6',
    name: 'Titus Sardines',
    image: '/assets/aistudio/ktt3_74e9fe3f.jpg',
    hasUnseen: false,
  },
  {
    id: 's7',
    name: 'Spaghetti',
    image: '/assets/aistudio/ktt2_099e01be.jpg',
    hasUnseen: false,
  },
];

// PRODUCTS CORRESPONDING TO THE USER'S PHOTOS WITH CURRENT NIGERIAN MARKET PRICES
export const PRODUCTS: Product[] = [
  {
    id: 'prod-farm-eggs-crate',
    name: 'Fresh Farm Eggs (Crate of 30 Jumbo Eggs)',
    subtitle: 'Golden Yolk Protein-Rich Table Eggs Direct from Layer Farms',
    category: 'proteins',
    price: 5500,
    originalPrice: 6200,
    rating: 4.9,
    reviewCount: 380,
    inStock: true,
    stockCount: 150,
    description:
      'Crate of 30 carefully inspected jumbo-sized fresh table eggs. Sourced daily from bio-secure layer farms in Nigeria. Features sturdy clean shells and rich golden yolks packed with natural protein, vitamin D, and choline. Ideal for breakfast boiling, frying, baking, and family nourishment.',
    materials: ['30 Farm Fresh Grade-A Jumbo Eggs', 'Shock-Absorbent Paper Pulp Crate'],
    dimensions: 'Standard 30-Egg Cardboard Crate (30cm x 30cm)',
    designer: 'Demoz Agro Layer Farms Nigeria',
    images: [
      '/assets/aistudio/ktt11_d9bc365c.jpg',
    ],
    colors: [
      { name: 'Natural Brown Shell', hex: '#D97706' },
      { name: 'Warm Cream Shell', hex: '#FEF3C7' },
    ],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'prod-frozen-titus-mackerel',
    name: 'Fresh Frozen Titus Mackerel Fish (10kg Carton)',
    subtitle: 'Ice-Packed Deep Sea Atlantic Titus Mackerel in Protective Liner',
    category: 'proteins',
    price: 45000,
    originalPrice: 50000,
    rating: 5.0,
    reviewCount: 290,
    inStock: true,
    stockCount: 45,
    description:
      'Whole carton of premium frozen Atlantic Titus (Mackerel) fish, packed in food-grade blue thermal liner bags to retain maximum oceanic freshness and flavor. Firm silver-and-blue skin, rich in natural heart-healthy Omega-3 fatty acids. Ideal for grilling (barbecue/point-and-kill), stew boiling, smoking, or pan frying.',
    materials: ['Wild Caught Atlantic Mackerel (Scomber scombrus)', 'Thermal Poly Bag & Export Carton'],
    dimensions: '10kg Wholesale Master Carton (approx. 24-28 whole fish)',
    designer: 'Atlantic Cold Stores & Seafood Nigeria',
    images: [
      '/assets/aistudio/ktt1_4c4ae2eb.png',
    ],
    colors: [
      { name: 'Ocean Silver & Blue', hex: '#0284C7' },
    ],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'prod-market-fresh-veggies',
    name: 'Fresh Market Farm Produce & Soup Vegetables Basket',
    subtitle: 'Colorful Basket of Tomatoes, Rodo Peppers, Onions, Carrots, Cucumbers & Greens',
    category: 'fresh',
    price: 12500,
    originalPrice: 15000,
    rating: 4.9,
    reviewCount: 215,
    inStock: true,
    stockCount: 60,
    description:
      'Generous assorted family crate of hand-picked fresh garden produce from Jos and Northern farm belts. Contains firm red tomatoes, fiery Scotch bonnet rodo, tatase bell peppers, sweet carrots, crisp cucumbers, purple onions, green cabbage, sweet corn, broccoli, scallions, and fresh soup greens.',
    materials: [
      'Fresh Red Tomatoes & Scotch Bonnet Rodo Peppers',
      'Tatase Bell Peppers & Onions',
      'Crunchy Carrots, Cucumbers & Sweet Corn',
      'Garden Broccoli, Scallions & Fresh Herbs',
    ],
    dimensions: 'Jumbo Assorted Vegetable Crate (approx. 12kg total produce)',
    designer: 'Demoz Green Harvest Co-op',
    images: [
      '/assets/aistudio/ktt4_5294041e.jpg',
    ],
    colors: [
      { name: 'Vibrant Garden Mix', hex: '#16A34A' },
      { name: 'Ripe Tomato Red', hex: '#DC2626' },
      { name: 'Sunburst Yellow', hex: '#EAB308' },
    ],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'prod-golden-penny-spaghetti-2pack',
    name: 'Golden Penny Spaghetti (500g Durum Wheat Pasta · 2-Pack Bundle)',
    subtitle: 'Non-Sticky Long Strand Pasta Enriched with Vitamin A (2 x 500g Packs)',
    category: 'grains',
    price: 2500,
    originalPrice: 2800,
    rating: 4.8,
    reviewCount: 440,
    inStock: true,
    stockCount: 200,
    description:
      'Two 500g retail packs of Nigeria’s most trusted long-strand spaghetti. Milled from 100% premium durum wheat semolina. Retains firm al dente texture without sticking or breaking during boiling. Pairs effortlessly with tomato stew, fried fish, minced meat, boiled eggs, and stir-fry veggies.',
    materials: ['100% Durum Wheat Semolina', 'Enriched with Essential Vitamin A'],
    dimensions: 'Bundle of 2 x 500g Sealed Foil Packs (1kg total)',
    designer: 'Flour Mills of Nigeria Plc (Golden Penny Foods)',
    images: [
      '/assets/aistudio/ktt2_099e01be.jpg',
    ],
    colors: [
      { name: 'Golden Amber Semolina', hex: '#F59E0B' },
    ],
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'prod-mamas-pride-rice-50kg',
    name: "Mama's Pride Parboiled Rice (50kg Net Bag · Olam)",
    subtitle: 'Premium Long Grain Destoned Nigerian Parboiled Rice from Olam',
    category: 'grains',
    price: 88500,
    originalPrice: 95000,
    rating: 5.0,
    reviewCount: 520,
    inStock: true,
    stockCount: 80,
    description:
      "Original 50kg bag of Mama's Pride premium parboiled long grain rice processed by Olam Nigeria. Machine-destoned, 100% stone-free, and uniform in size. Features a high swelling ratio and does not turn soggy, yielding fluffy, aromatic, distinct grains perfect for Nigerian party jollof rice, fried rice, and white rice with pepper stew.",
    materials: ['100% Clean Parboiled Paddy Long Grain Rice', 'Machine Destoned & Polished'],
    dimensions: '50kg Heavy-Duty Woven Polypropylene Sack',
    designer: 'Olam Agri Nigeria Limited',
    images: [
      '/assets/aistudio/ktt7_4d78c037.jpg',
    ],
    colors: [
      { name: 'Classic Golden Parboiled', hex: '#FEF08A' },
    ],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'prod-sunco-oil-5l',
    name: 'SunCo Pure Refined Vegetable Cooking Oil (5 Litres Gallon)',
    subtitle: 'Crystal Clear 5x Filtered Cooking Oil Fortified with Vitamin A',
    category: 'oil',
    price: 19500,
    originalPrice: 22000,
    rating: 4.9,
    reviewCount: 340,
    inStock: true,
    stockCount: 95,
    description:
      'SunCo 5-Litre transparent golden cooking oil produced with advanced 5x refining and 2x filtration technology. Fortified with essential Vitamin A, zero cholesterol, and clear non-congealing consistency. Delivers high heat resistance for deep frying akara, dodo, chicken, and preparing mouthwatering Nigerian stews and soups without greasy residue.',
    materials: ['100% Refined Pure Palm Fruit & Vegetable Oil', 'Fortified with Vitamin A'],
    dimensions: '5 Litres Heavy Gallon with Ergonomic Pouring Handle',
    designer: 'PT Musim Mas / SunCo Superbrands',
    images: [
      '/assets/aistudio/ktt10_1af1158d.jpg',
    ],
    colors: [
      { name: 'Crystal Clear Amber', hex: '#F59E0B' },
    ],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'prod-titus-sardines-5can',
    name: 'Titus Sardines in Pure Vegetable Oil (5 Cans Value Pack)',
    subtitle: 'Original Atlantic Wild Sardines Packed in Refined Oil with Pull-Tab Lid',
    category: 'canned',
    price: 5200,
    originalPrice: 5800,
    rating: 5.0,
    reviewCount: 460,
    inStock: true,
    stockCount: 160,
    description:
      'Original Titus Sardines imported in pull-tab lithographed gold tins. Packed in nutritious refined vegetable oil and delicate natural brine. Rich in calcium, wild marine protein, and essential Omega-3. The indispensable Nigerian food staple for quick spaghetti dishes, warm agege bread, noodles, and savory stews.',
    materials: ['Wild Atlantic Sardine Fish (Sardina pilchardus)', 'Refined Vegetable Oil & Salt'],
    dimensions: 'Value Pack of 5 Metal Pull-Tab Cans (125g Net Weight each)',
    designer: 'Unimer / Titus Brand Group',
    images: [
      '/assets/aistudio/ktt3_74e9fe3f.jpg',
    ],
    colors: [
      { name: 'Heritage Gold & Red', hex: '#DC2626' },
    ],
    isFeatured: false,
    isNew: false,
  },
];

export const USER_ORDERS: UserOrder[] = [
  {
    id: 'ORD-9842',
    date: 'Nov 02, 2026',
    status: 'In Transit',
    total: 108000,
    itemsCount: 2,
    trackingNumber: 'FDX-883920194NG',
    estimatedDelivery: 'Tomorrow by 2:00 PM (Lagos Express Food Van)',
    items: [
      {
        title: "Mama's Pride Parboiled Rice (50kg Net Bag · Olam)",
        image: '/assets/aistudio/ktt7_4d78c037.jpg',
        price: 88500,
        qty: 1,
      },
      {
        title: 'SunCo Pure Refined Vegetable Cooking Oil (5 Litres Gallon)',
        image: '/assets/aistudio/ktt10_1af1158d.jpg',
        price: 19500,
        qty: 1,
      },
    ],
  },
  {
    id: 'ORD-9701',
    date: 'Oct 28, 2026',
    status: 'Delivered',
    total: 50500,
    itemsCount: 2,
    trackingNumber: 'DEL-1049285038NG',
    estimatedDelivery: 'Delivered to Lekki Phase 1, Lagos',
    items: [
      {
        title: 'Fresh Frozen Titus Mackerel Fish (10kg Carton)',
        image: '/assets/aistudio/ktt1_4c4ae2eb.png',
        price: 45000,
        qty: 1,
      },
      {
        title: 'Fresh Farm Eggs (Crate of 30 Jumbo Eggs)',
        image: '/assets/aistudio/ktt11_d9bc365c.jpg',
        price: 5500,
        qty: 1,
      },
    ],
  },
];

export const LOOKBOOK_STORIES = [
  {
    id: 'lb-1',
    title: 'Nigerian Kitchen & Pantry Essentials',
    photographer: 'Adebayo Johnson',
    date: 'Market Edition 2026',
    coverImage: '/assets/aistudio/ktt4_5294041e.jpg',
    hotspots: [
      {
        x: 35,
        y: 45,
        title: "Mama's Pride 50kg Rice",
        price: '₦88,500',
        productId: 'prod-mamas-pride-rice-50kg',
      },
      {
        x: 70,
        y: 50,
        title: 'SunCo 5L Cooking Oil',
        price: '₦19,500',
        productId: 'prod-sunco-oil-5l',
      },
    ],
  },
  {
    id: 'lb-2',
    title: 'Farm Fresh Proteins & Produce Basket',
    photographer: 'Chioma Nwosu',
    date: 'Daily Harvest',
    coverImage: '/assets/aistudio/ktt11_d9bc365c.jpg',
    hotspots: [
      {
        x: 45,
        y: 50,
        title: 'Fresh Farm Eggs (Crate of 30)',
        price: '₦5,500',
        productId: 'prod-farm-eggs-crate',
      },
      {
        x: 75,
        y: 35,
        title: 'Frozen Titus Fish (10kg Carton)',
        price: '₦45,000',
        productId: 'prod-frozen-titus-mackerel',
      },
    ],
  },
];

export const HTML_PRESETS: HtmlPreset[] = [
  {
    id: 'preset-nigerian-food',
    title: 'Demoz Fresh Nigerian Food Market',
    category: 'Market & Groceries',
    description: "Mama's Pride 50kg rice, SunCo 5L oil, fresh farm eggs, and frozen Titus fish with live photos and Naira prices.",
    htmlContent: `<div class="screen-container font-sans bg-stone-900 text-stone-100 p-5 rounded-2xl max-w-md mx-auto space-y-4">
  <div class="flex justify-between items-center border-b border-stone-850 pb-3">
    <div>
      <p class="text-xs tracking-widest uppercase text-emerald-400 font-mono">Demoz Nigerian Market</p>
      <h2 class="text-lg font-serif font-bold text-white">Current Market Price Foodstuffs</h2>
    </div>
    <span class="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 rounded-full font-mono">NGN (₦)</span>
  </div>

  <div class="relative rounded-xl overflow-hidden shadow-lg group">
    <img src="/assets/aistudio/ktt7_4d78c037.jpg" alt="Mama's Pride 50kg Rice" class="w-full h-52 object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
      <span class="text-xs text-amber-400 font-semibold uppercase font-mono">50kg Bag · Olam</span>
      <h3 class="text-lg font-medium text-white">Mama's Pride Parboiled Rice</h3>
      <p class="text-sm font-bold text-amber-400">₦88,500 <span class="line-through text-stone-400 text-xs font-normal">₦95,000</span></p>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-3">
    <div class="bg-stone-950 p-3 rounded-xl border border-stone-800">
      <img src="/assets/aistudio/ktt10_1af1158d.jpg" alt="SunCo 5L Oil" class="w-full h-28 object-contain rounded-lg mb-2" />
      <h4 class="text-xs font-medium text-white truncate">SunCo 5L Cooking Oil</h4>
      <p class="text-xs text-amber-400 font-bold">₦19,500</p>
    </div>
    <div class="bg-stone-950 p-3 rounded-xl border border-stone-800">
      <img src="/assets/aistudio/ktt11_d9bc365c.jpg" alt="Fresh Farm Eggs" class="w-full h-28 object-contain rounded-lg mb-2" />
      <h4 class="text-xs font-medium text-white truncate">Farm Eggs (30-Crate)</h4>
      <p class="text-xs text-amber-400 font-bold">₦5,500</p>
    </div>
  </div>
</div>`,
  },
  {
    id: 'preset-seafood-veggies',
    title: 'Frozen Titus Fish & Farm Vegetables',
    category: 'Fish & Fresh Farm',
    description: '10kg carton of iced Atlantic Titus fish alongside fresh soup vegetable market produce.',
    htmlContent: `<div class="screen-container bg-neutral-950 text-neutral-100 p-5 rounded-2xl max-w-md mx-auto space-y-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
      <h3 class="text-sm font-semibold text-white">Fresh Proteins & Farm Produce</h3>
    </div>
    <span class="text-xs text-amber-400 font-mono">Current Market Prices</span>
  </div>

  <div class="rounded-xl overflow-hidden relative">
    <img src="/assets/aistudio/ktt1_4c4ae2eb.png" alt="Fresh Frozen Titus Mackerel" class="w-full h-44 object-cover" />
    <div class="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs">
      <span class="text-amber-400 font-bold">10kg Carton Titus Fish:</span> ₦45,000
    </div>
  </div>

  <div class="flex items-center gap-3 p-3 bg-neutral-900 rounded-xl border border-neutral-800">
    <img src="/assets/aistudio/ktt4_5294041e.jpg" alt="Market Produce" class="w-16 h-16 object-cover rounded-lg" />
    <div class="flex-1 min-w-0">
      <h4 class="text-xs font-medium text-white truncate">Fresh Soup Vegetables Crate</h4>
      <p class="text-[11px] text-neutral-400">Tomatoes, rodo, onions, carrots</p>
      <span class="text-xs font-bold text-amber-400">₦12,500</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'preset-pasta-sardines',
    title: 'Golden Penny Spaghetti & Titus Sardines',
    category: 'Grains & Provisions',
    description: 'Golden Penny durum wheat spaghetti bundle with original Titus sardines.',
    htmlContent: `<div class="screen-container bg-slate-900 text-slate-100 p-5 rounded-2xl max-w-md mx-auto space-y-4">
  <div class="flex justify-between items-center">
    <span class="text-xs tracking-wider uppercase text-emerald-400 font-semibold">Quick Meals Bundle</span>
    <span class="text-xs text-slate-400">In Stock</span>
  </div>

  <div class="grid grid-cols-2 gap-3">
    <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
      <img src="/assets/aistudio/ktt2_099e01be.jpg" alt="Spaghetti" class="w-full h-28 object-contain rounded-lg mb-1" />
      <h4 class="text-xs font-medium text-white truncate">Golden Penny Spaghetti (2-Pack)</h4>
      <p class="text-xs text-amber-400 font-bold">₦2,500</p>
    </div>
    <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
      <img src="/assets/aistudio/ktt3_74e9fe3f.jpg" alt="Titus Sardines" class="w-full h-28 object-contain rounded-lg mb-1" />
      <h4 class="text-xs font-medium text-white truncate">Titus Sardines (5 Cans)</h4>
      <p class="text-xs text-amber-400 font-bold">₦5,200</p>
    </div>
  </div>

  <div class="flex items-center justify-between pt-2 border-t border-slate-800">
    <span class="text-xs text-stone-400">Total Bundle: <strong class="text-white">₦7,700</strong></span>
    <button class="px-3.5 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg">
      Add Both to Bag
    </button>
  </div>
</div>`,
  },
];

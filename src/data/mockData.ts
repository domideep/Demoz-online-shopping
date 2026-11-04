import { Product, UserOrder, HtmlPreset } from '../types';

export const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'ceramics', label: 'Ceramics' },
  { id: 'textiles', label: 'Textiles' },
  { id: 'objects', label: 'Art Objects' },
];

export const STORIES = [
  {
    id: 's1',
    name: 'New Drops',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
    hasUnseen: true,
  },
  {
    id: 's2',
    name: 'Milano 26',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
    hasUnseen: true,
  },
  {
    id: 's3',
    name: 'Atelier',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
    hasUnseen: false,
  },
  {
    id: 's4',
    name: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=400&q=80',
    hasUnseen: false,
  },
  {
    id: 's5',
    name: 'Lighting',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    hasUnseen: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kanso Curved Oak Lounge Chair',
    subtitle: 'Sculptural Solid White Oak with Bouclé Upholstery',
    category: 'furniture',
    price: 495,
    originalPrice: 580,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 4,
    description:
      'Engineered with organic ergonomics, the Kanso lounge chair pairs steam-bent solid white oak with high-density foam wrapped in Belgian wool-bouclé. Perfect for modern living and reading sanctuaries.',
    materials: ['Solid White Oak', 'Belgian Wool Bouclé', 'Hand-rubbed Organic Oil Finish'],
    dimensions: '32" W × 34" D × 29" H · Seat Height 16"',
    designer: 'Studio Nørrebro, Copenhagen',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Oatmeal Wool', hex: '#E6E2DD' },
      { name: 'Charcoal Slub', hex: '#2B2B2B' },
      { name: 'Terracotta', hex: '#A85D47' },
    ],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'prod-2',
    name: 'Aura Matte Cast-Iron Pendant Lamp',
    subtitle: 'Warm Ambient Diffuser with Brushed Brass Finial',
    category: 'lighting',
    price: 185,
    originalPrice: 220,
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockCount: 12,
    description:
      'Spun from raw blackened cast-iron with an interior parabolic reflector in satin gold. Casts a soft 2700K downward glow designed to anchor dining tables and kitchen islands.',
    materials: ['Blackened Cast Iron', 'Satin Brass Hardware', 'Braided Linen Cord'],
    dimensions: '14" Dia × 9" H · 72" Adjustable Drop Cord',
    designer: 'Elena Vance Atelier',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1C1C1E' },
      { name: 'Chalk White', hex: '#F5F5F0' },
      { name: 'Raw Brass', hex: '#C5A059' },
    ],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'prod-3',
    name: 'Vessel No. 4 Ribbed Stoneware Vase',
    subtitle: 'Wheel-thrown Sand Clay with Unglazed Bisque Texture',
    category: 'ceramics',
    price: 94,
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    stockCount: 8,
    description:
      'Individually thrown using coarse sand-speckled stoneware clay. Left unglazed on the exterior for a tactile stone feel with a watertight interior glaze.',
    materials: ['Speckled Stoneware Clay', 'Interior Non-porous Glaze'],
    dimensions: '7.5" Dia × 11" H · 3.2 lbs',
    designer: 'Kyoto Folk Pottery Project',
    images: [
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Bisque Sand', hex: '#DDD2C4' },
      { name: 'Smoked Sage', hex: '#8E9A8E' },
    ],
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'prod-4',
    name: 'Woven Nordic Lowland Credenza',
    subtitle: 'Smoked Walnut Frame with Hand-Woven Cane Doors',
    category: 'furniture',
    price: 890,
    originalPrice: 1050,
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    stockCount: 2,
    description:
      'Seamless media console and living credenza crafted from FSC-certified European smoked walnut. Features four cane weave doors that allow remote control IR pass-through and ventilation.',
    materials: ['European Smoked Walnut', 'Natural Rattan Cane', 'Soft-close Blum Hinges'],
    dimensions: '68" W × 19" D × 26" H',
    designer: 'Lars Halvorsen',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Smoked Walnut', hex: '#4A3728' },
      { name: 'Bleached Ash', hex: '#E4DDD3' },
    ],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'prod-5',
    name: 'Washed Belgian Linen Duvet Set',
    subtitle: 'Stone-Washed Flax with Mother of Pearl Buttons',
    category: 'textiles',
    price: 240,
    rating: 4.7,
    reviewCount: 215,
    inStock: true,
    stockCount: 15,
    description:
      'Woven from 100% French and Belgian flax linen. Pre-washed with pumice stones for an effortless, buttery-soft drape that naturally stays cool in summer and cozy in winter.',
    materials: ['100% Certified Flax Linen (175 GSM)', 'Natural Shell Closures'],
    dimensions: 'Queen (92" × 96") / King (108" × 96")',
    designer: 'Maison D’Artisan',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Pale Bone', hex: '#EBE7DE' },
      { name: 'Misty Olive', hex: '#7E8775' },
      { name: 'Warm Clay', hex: '#B8826D' },
    ],
    isFeatured: false,
    isNew: true,
  },
];

export const USER_ORDERS: UserOrder[] = [
  {
    id: 'ORD-9842',
    date: 'Oct 29, 2026',
    status: 'In Transit',
    total: 589,
    itemsCount: 2,
    trackingNumber: 'FDX-883920194US',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    items: [
      {
        title: 'Kanso Curved Oak Lounge Chair',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
        price: 495,
        qty: 1,
      },
      {
        title: 'Vessel No. 4 Ribbed Stoneware Vase',
        image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=400&q=80',
        price: 94,
        qty: 1,
      },
    ],
  },
  {
    id: 'ORD-9701',
    date: 'Oct 14, 2026',
    status: 'Delivered',
    total: 185,
    itemsCount: 1,
    trackingNumber: 'UPS-1049285038',
    estimatedDelivery: 'Delivered on front porch',
    items: [
      {
        title: 'Aura Matte Cast-Iron Pendant Lamp',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
        price: 185,
        qty: 1,
      },
    ],
  },
];

export const LOOKBOOK_STORIES = [
  {
    id: 'lb-1',
    title: 'The Kyoto Residency',
    photographer: 'Kenji Takahashi',
    date: 'Autumn 2026',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    hotspots: [
      {
        x: 48,
        y: 62,
        title: 'Kanso Oak Armchair',
        price: '₦495',
        productId: 'prod-1',
      },
      {
        x: 72,
        y: 40,
        title: 'Aura Black Pendant',
        price: '₦185',
        productId: 'prod-2',
      },
    ],
  },
  {
    id: 'lb-2',
    title: 'Organic Texture & Monolithic Forms',
    photographer: 'Astrid Lind',
    date: 'Winter Collection',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    hotspots: [
      {
        x: 35,
        y: 70,
        title: 'Nordic Lowland Credenza',
        price: '₦890',
        productId: 'prod-4',
      },
      {
        x: 60,
        y: 35,
        title: 'Vessel No. 4 Vase',
        price: '₦94',
        productId: 'prod-3',
      },
    ],
  },
];

export const HTML_PRESETS: HtmlPreset[] = [
  {
    id: 'preset-furniture',
    title: 'Nordic Studio & Living Room',
    category: 'Design & Interiors',
    description: 'Clean architectural cards with hotlinked furniture and ambient lighting photography.',
    htmlContent: `<div class="screen-container font-sans bg-stone-900 text-stone-100 p-5 rounded-2xl max-w-md mx-auto space-y-5">
  <div class="flex justify-between items-center border-b border-stone-800 pb-3">
    <div>
      <p class="text-xs tracking-widest uppercase text-stone-400">Atelier Studio</p>
      <h2 class="text-xl font-serif text-white">Nordic Living 2026</h2>
    </div>
    <span class="text-xs px-2.5 py-1 bg-stone-800 rounded-full text-stone-300">Live Edition</span>
  </div>

  <div class="relative rounded-xl overflow-hidden shadow-lg group">
    <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80" alt="Nordic Studio Living Room" class="w-full h-52 object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
      <span class="text-xs text-amber-300 font-medium">Spotlight Space</span>
      <h3 class="text-lg font-medium text-white">The Minimalist Sanctuary</h3>
      <p class="text-xs text-stone-300">Curated with natural light, bouclé textures, and warm timber tones.</p>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-3">
    <div class="bg-stone-800/70 p-3 rounded-xl border border-stone-700/50">
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80" alt="Lounge Chair" class="w-full h-28 object-cover rounded-lg mb-2" />
      <h4 class="text-sm font-medium text-white truncate">Oak Lounge Chair</h4>
      <p class="text-xs text-stone-400">$495 · In Stock</p>
    </div>
    <div class="bg-stone-800/70 p-3 rounded-xl border border-stone-700/50">
      <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80" alt="Matte Pendant Lamp" class="w-full h-28 object-cover rounded-lg mb-2" />
      <h4 class="text-sm font-medium text-white truncate">Matte Pendant Lamp</h4>
      <p class="text-xs text-stone-400">$185 · Free Delivery</p>
    </div>
  </div>
</div>`,
  },
  {
    id: 'preset-cafe',
    title: 'Artisan Cafe & Coffee Roasters',
    category: 'Food & Hospitality',
    description: 'Specialty espresso bar screens with hotlinked latte art, pastries, and barista atmosphere.',
    htmlContent: `<div class="screen-container bg-neutral-950 text-neutral-100 p-5 rounded-2xl max-w-md mx-auto space-y-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" class="w-10 h-10 rounded-full object-cover border border-amber-500/40" alt="Barista Ava" />
      <div>
        <h3 class="text-sm font-semibold text-white">Roastery Club</h3>
        <p class="text-xs text-neutral-400">Order at Table 04 · Ready in 6m</p>
      </div>
    </div>
    <button class="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">Reorder</button>
  </div>

  <div class="rounded-xl overflow-hidden relative">
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80" alt="Espresso Machine Pour" class="w-full h-44 object-cover" />
    <div class="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs">
      <span class="text-amber-400 font-semibold">Single Origin:</span> Ethiopia Yirgacheffe
    </div>
  </div>

  <div class="space-y-2">
    <div class="flex items-center gap-3 p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
      <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80" alt="Oat Cortado" class="w-14 h-14 object-cover rounded-lg" />
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-white truncate">Velvet Oat Flat White</h4>
        <p class="text-xs text-neutral-400">Double shot, steamed Minor Figures oat</p>
      </div>
      <span class="text-sm font-semibold text-amber-400">$5.50</span>
    </div>
    <div class="flex items-center gap-3 p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
      <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80" alt="Cardamom Buns" class="w-14 h-14 object-cover rounded-lg" />
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-white truncate">Swedish Cardamom Knot</h4>
        <p class="text-xs text-neutral-400">Fresh baked daily with crushed pearl sugar</p>
      </div>
      <span class="text-sm font-semibold text-amber-400">$4.75</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'preset-travel',
    title: 'Boutique Escapes & Villa Retreats',
    category: 'Travel & Stays',
    description: 'High-end travel screen with scenic photography, rate breakdown, and instant booking CTA.',
    htmlContent: `<div class="screen-container bg-slate-900 text-slate-100 p-5 rounded-2xl max-w-md mx-auto space-y-4">
  <div class="flex justify-between items-center">
    <span class="text-xs tracking-wider uppercase text-emerald-400 font-semibold">Verified Sanctuary</span>
    <span class="text-xs text-slate-400">4.96 ★ (218 reviews)</span>
  </div>

  <div class="relative rounded-2xl overflow-hidden shadow-xl">
    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80" alt="Luxury Villa Pool" class="w-full h-56 object-cover" />
    <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-white">
      Private Infinity Pool
    </div>
  </div>

  <div>
    <h3 class="text-lg font-serif font-medium text-white">Villa Caelum · Amalfi Coast</h3>
    <p class="text-xs text-slate-300 mt-1">Clifftop panoramic terrace overlooking Positano Bay with private funicular access.</p>
  </div>

  <div class="flex items-center justify-between pt-2 border-t border-slate-800">
    <div>
      <span class="text-lg font-bold text-white">$620</span>
      <span class="text-xs text-slate-400"> / night</span>
    </div>
    <button class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs rounded-xl transition-colors">
      Reserve Dates
    </button>
  </div>
</div>`,
  },
];

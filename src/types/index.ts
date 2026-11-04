export type ScreenId = 'explore' | 'detail' | 'cart' | 'profile' | 'lookbook' | 'custom-html';


export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  materials: string[];
  dimensions: string;
  designer: string;
  images: string[];
  colors: { name: string; hex: string }[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface UserOrder {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Confirmed';
  total: number;
  itemsCount: number;
  trackingNumber: string;
  estimatedDelivery: string;
  items: {
    title: string;
    image: string;
    price: number;
    qty: number;
  }[];
}

export interface HotlinkImageInfo {
  url: string;
  alt?: string;
  sourceScreen?: string;
}

export interface HtmlPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  htmlContent: string;
}

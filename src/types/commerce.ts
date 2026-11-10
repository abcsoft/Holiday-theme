export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  inStock: boolean;
  stockCount: number;
  options: { [key: string]: string }; // e.g. { "Size": "Queen", "Color": "Evergreen" }
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  currency: 'USD';
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isStaffPick?: boolean;
  isTrending?: boolean;
  isPersonalized?: boolean;
  badge?: string; // e.g. "25% OFF", "HANDMADE", "SELLING FAST"
  images: string[];
  variants?: ProductVariant[];
  budgetTier: 'under-25' | 'under-50' | 'under-100' | 'luxury-150';
  recipients?: ('her' | 'him' | 'kids' | 'home' | 'hostess' | 'family')[];
  details: string[];
  materials?: string;
  dimensions?: string;
  origin?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  giftWrap?: boolean;
  giftNote?: string;
}

export interface GiftBundle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  badge: string;
  itemsIncluded: string[];
  products: Product[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  verifiedBuyer: boolean;
  rating: number;
  date: string;
  title: string;
  content: string;
  purchasedItem: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'shipping' | 'returns' | 'gifting' | 'orders';
}

export interface ThemeConfig {
  id: string;
  name: string;
  badge: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  backgroundTone: string;
  isDefault?: boolean;
}

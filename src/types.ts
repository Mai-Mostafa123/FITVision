export type CategoryType =
  | 'Tops'
  | 'Shirts'
  | 'T-Shirts'
  | 'Pants'
  | 'Jeans'
  | 'Dresses'
  | 'Jackets'
  | 'Shoes'
  | 'Bags'
  | 'Accessories';

export type StyleType =
  | 'Casual'
  | 'Formal'
  | 'Streetwear'
  | 'Sporty'
  | 'Elegant'
  | 'Minimal'
  | 'Vintage'
  | 'Old Money'
  | 'Resort'
  | 'Smart Casual';

export type OccasionType =
  | 'University'
  | 'Work'
  | 'Party'
  | 'Wedding'
  | 'Dinner'
  | 'Date'
  | 'Casual'
  | 'Travel'
  | 'Sport';

export type SeasonType = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'All Season';

export type GenderType = 'Women' | 'Men' | 'Unisex';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  price: number; // in EGP
  originalPrice?: number;
  category: CategoryType;
  style: StyleType;
  occasion: OccasionType[];
  season: SeasonType[];
  gender: GenderType;
  colors: ProductColor[];
  sizes: string[];
  images: {
    main: string;
    model?: string;
    detail?: string;
  };
  description: string;
  material: string;
  rating: number;
  reviewCount: number;
  isAiRecommended?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  stockQuantity: number;
  tags: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  banner: string;
  tagline: string;
  description: string;
  location: string;
  rating: number;
  totalProducts: number;
  connectedSince: string;
  activeCampaigns: number;
  isFeatured?: boolean;
  website: string;
}

export interface OutfitItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
}

export interface AiOutfitRecommendation {
  id: string;
  title: string;
  prompt: string;
  occasion: OccasionType;
  season: SeasonType;
  style: StyleType;
  budget: number;
  totalCost: number;
  matchScore: number; // e.g. 98%
  reasoning: string;
  stylingTips: string[];
  colorPalette: { name: string; hex: string }[];
  items: Product[];
  createdDate: string;
  likesCount?: number;
}

export interface CartItem {
  id: string; // unique item id (product.id + color + size)
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  favoriteStyles: StyleType[];
  favoriteColors: string[];
  preferredBudget: {
    min: number;
    max: number;
  };
  preferredSizes: {
    tops: string;
    bottoms: string;
    shoes: string;
  };
  bodyFitPreference: 'Slim' | 'Regular' | 'Oversized' | 'Tailored';
  savedOutfits: AiOutfitRecommendation[];
  aiHistory: {
    id: string;
    query: string;
    timestamp: string;
    resultCount: number;
    totalCost: number;
    occasion: string;
  }[];
}

export interface TrendArticle {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  image: string;
  colorPalette: { name: string; hex: string }[];
  season: string;
  readTime: string;
  featuredProductIds: string[];
}

export interface BrandAnalytics {
  totalProducts: number;
  connectedCustomers: number;
  aiSearchesCount: number;
  recommendedOutfitsCount: number;
  savedOutfitsCount: number;
  salesRevenue: number;
  frequentCombinations: {
    title: string;
    items: string[];
    frequency: number;
    conversionRate: number;
    revenue: number;
  }[];
  searchIntentKeywords: { word: string; count: number }[];
  popularColors: { name: string; hex: string; percentage: number }[];
  popularStyles: { name: string; percentage: number }[];
}

export interface ColorAnalysisResult {
  detectedColors: {
    name: string;
    hex: string;
    percentage: number;
    undertone: 'Warm' | 'Cool' | 'Neutral';
  }[];
  recommendedPalette: {
    name: string;
    hex: string;
    rationale: string;
  }[];
  matchingProducts: Product[];
}

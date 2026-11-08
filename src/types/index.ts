export type CategoryType = 'fashion' | 'beauty' | 'curation';

export type SubCategoryType = 
  | 'tops' 
  | 'outerwear' 
  | 'bottoms' 
  | 'dresses' 
  | 'accessories' 
  | 'skincare' 
  | 'makeup' 
  | 'sets';

export interface Product {
  id: string;
  slug: string;
  nameKo: string;
  nameEn: string;
  brand: string;
  category: CategoryType;
  subCategory: SubCategoryType;
  priceKrw: number;
  originalPriceKrw?: number;
  priceUsd: number;
  originalPriceUsd?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  shortDesc: string;
  options: {
    name: string;
    values: string[];
  }[];
  tags: string[];
  isBest?: boolean;
  isNew?: boolean;
  isVegan?: boolean;
  isFeatured?: boolean; // 메인 화면 주요 상품 진열 여부
  stockCount: number; // CRO: 재고 임박 알림용 (< 5인 경우 긴급 배지)
  salesPast24h?: number; // CRO: 실시간 구매량 ("24시간 내 38명 구매")
  routineStep?: number; // K-Beauty 루틴 단계 (1: 토너/패드, 2: 앰플/세럼, 3: 크림/선케어)
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>; // 예: { Size: "M", Color: "Oatmeal" }
}

export type Currency = 'KRW' | 'USD';

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCountry: string; // "KR", "US", "JP", "FR" 등 글로벌 신뢰도
  rating: number;
  date: string;
  content: string;
  photoUrl?: string;
  verifiedPurchase: boolean;
  itemOption?: string;
}

export interface LookbookLook {
  id: string;
  titleKo: string;
  titleEn: string;
  description: string;
  imageUrl: string;
  pairedProductIds: string[];
}

// ================= USER & AUTH TYPES =================
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  address?: {
    postalCode: string;
    roadAddress: string;
    detailAddress: string;
  };
}

// ================= ORDER & CHECKOUT TYPES =================
export type OrderStatus = '결제완료' | '배송준비중' | '배송중' | '배송완료' | '주문취소';
export type PaymentMethod = 'toss' | 'portone' | 'card' | 'kakaopay' | 'naverpay' | 'paypal';

export interface ShippingInfo {
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  deliveryRequest?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  userEmail: string;
  createdAt: string;
  items: CartItem[];
  shipping: ShippingInfo;
  paymentMethod: PaymentMethod;
  totalKrw: number;
  totalUsd: number;
  currency: Currency;
  status: OrderStatus;
}

// ================= STORE SETTINGS (ADMIN) =================
export interface StoreSettings {
  topBannerText: string;
  topBannerPromoCode: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  trendingTitle: string;
  trendingSubtitle: string;
}

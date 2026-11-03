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

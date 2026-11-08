'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StoreSettings } from '@/types';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetProducts: () => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: StoreSettings = {
  topBannerText: '첫 구매 고객 전 품목 10% 웰컴 쿠폰 & $60/7만원 이상 무료 배송',
  topBannerPromoCode: 'WELCOME10',
  heroTag: 'SEOUL FLAGSHIP 2026 DROP',
  heroTitle: 'Effortless Chic,\nUnfiltered Glow.',
  heroSubtitle: '가장 지금다운 서울의 감각적인 일상 룩과\n피부 본연의 빛을 밝히는 엄선된 K-글로우 뷰티 컬렉션.',
  heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=2000&auto=format&fit=crop',
  heroPrimaryCtaText: '신규 컬렉션 탐색',
  heroSecondaryCtaText: 'K-BEAUTY 루틴 보기',
  trendingTitle: '지금 가장 사랑받는 서울 셀렉션',
  trendingSubtitle: '실시간 주문량과 리뷰 평점을 바탕으로 엄선한 다사쏘 시그니처 아이템',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('dasasso_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        localStorage.setItem('dasasso_products', JSON.stringify(MOCK_PRODUCTS));
      }

      const savedSettings = localStorage.getItem('dasasso_settings');
      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      } else {
        localStorage.setItem('dasasso_settings', JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch {
      // Ignore SSR
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('dasasso_products', JSON.stringify(newProducts));
    } catch {
      // Ignore
    }
  };

  const addProduct = (productData: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => {
    const timestamp = Date.now();
    const slug = productData.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: Product = {
      ...productData,
      id: `prod-${timestamp}`,
      slug: slug || `prod-${timestamp}`,
      rating: 5.0,
      reviewCount: 0,
      stockCount: Number(productData.stockCount) || 10,
      isFeatured: productData.isFeatured ?? true,
    };
    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const nextProducts = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    saveProducts(nextProducts);
  };

  const toggleFeatured = (id: string) => {
    const nextProducts = products.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    saveProducts(nextProducts);
  };

  const deleteProduct = (id: string) => {
    const nextProducts = products.filter((p) => p.id !== id);
    saveProducts(nextProducts);
  };

  const resetProducts = () => {
    saveProducts(MOCK_PRODUCTS);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    const next = { ...settings, ...newSettings };
    setSettings(next);
    try {
      localStorage.setItem('dasasso_settings', JSON.stringify(next));
    } catch {
      // Ignore
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem('dasasso_settings', JSON.stringify(DEFAULT_SETTINGS));
    } catch {
      // Ignore
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        resetProducts,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

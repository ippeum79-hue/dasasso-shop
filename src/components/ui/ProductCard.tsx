'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/currency';
import { useCart } from '@/context/CartContext';
import { Badge } from './Badge';
import { ShoppingBag, Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { currency, addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWished, setIsWished] = useState(false);

  // 할인율 계산
  const originalPrice = currency === 'USD' ? product.originalPriceUsd : product.originalPriceKrw;
  const currentPrice = currency === 'USD' ? product.priceUsd : product.priceKrw;
  const discountRate = originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // 첫 번째 기본 옵션으로 즉시 담기
    const defaultOptions: Record<string, string> = {};
    product.options.forEach((opt) => {
      if (opt.values.length > 0) defaultOptions[opt.name] = opt.values[0];
    });
    addItem(product, 1, defaultOptions);
  };

  return (
    <div
      className={`group relative flex flex-col cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 이미지 래퍼 (3:4 에디토리얼 비율) */}
      <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden rounded-sm">
        {/* 주 이미지 */}
        <Image
          src={product.images[0]}
          alt={product.nameKo}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 보조 이미지 (Hover 시 부드러운 전환) */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.nameKo} alternative`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* 상단 뱃지 영역 */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isBest && <Badge variant="best">BEST</Badge>}
          {product.isVegan && <Badge variant="vegan">VEGAN</Badge>}
          {discountRate > 0 && <Badge variant="discount">-{discountRate}%</Badge>}
          {product.stockCount <= 5 && (
            <Badge variant="urgent">잔여 {product.stockCount}개</Badge>
          )}
        </div>

        {/* 위시리스트 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWished(!isWished);
          }}
          aria-label="Wishlist"
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/70 backdrop-blur-md text-brand-dark hover:bg-white hover:text-brand-peach transition-all"
        >
          <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-brand-peach text-brand-peach' : ''}`} />
        </button>

        {/* 데스크톱 Quick Add 슬라이드업 버튼 */}
        <div className="hidden sm:block absolute inset-x-2 bottom-2 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-brand-dark/90 hover:bg-brand-dark backdrop-blur-sm text-white text-xs font-medium tracking-wider flex items-center justify-center gap-1.5 rounded-sm shadow-md transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            QUICK ADD
          </button>
        </div>

        {/* 모바일 원터치 장바구니 버튼 */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick Add"
          className="sm:hidden absolute bottom-2 right-2 z-10 p-2.5 bg-brand-dark/90 text-white rounded-full shadow-md"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 제품 정보 */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        <span className="text-[11px] uppercase tracking-wider text-brand-muted font-medium">
          {product.brand}
        </span>
        <h3 className="text-xs sm:text-sm font-normal text-brand-dark line-clamp-1 mt-0.5 group-hover:text-brand-peach transition-colors">
          {product.nameKo}
        </h3>
        <p className="text-[11px] text-brand-lightMuted line-clamp-1 italic font-serif">
          {product.nameEn}
        </p>

        {/* 가격 영역 */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs sm:text-sm font-semibold text-brand-dark">
            {formatPrice(product.priceKrw, product.priceUsd, currency)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="text-[11px] text-brand-lightMuted line-through">
              {formatPrice(
                product.originalPriceKrw || product.priceKrw,
                product.originalPriceUsd || product.priceUsd,
                currency
              )}
            </span>
          )}
        </div>

        {/* CRO 메타 정보: 별점 & 24시간 실시간 판매 알림 */}
        <div className="flex items-center justify-between text-[10px] text-brand-muted mt-2 pt-2 border-t border-brand-sand/60">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-brand-dark">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
          {product.salesPast24h && (
            <span className="text-brand-peach font-medium">
              🔥 24H {product.salesPast24h}개 구매
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

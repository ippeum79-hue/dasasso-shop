'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_LOOKBOOK, MOCK_REVIEWS } from '@/data/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/currency';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Droplet,
  Layers,
  Star,
  CheckCircle2,
  Globe2,
} from 'lucide-react';

export default function HomePage() {
  const { currency, addItem } = useCart();
  const { products, settings } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'fashion' | 'beauty'>('all');

  // 필터링된 상품 (실시간 StoreContext 기반, 관리자 주요 상품 진열 필터 적용)
  const filteredProducts = products
    .filter((product) => product.isFeatured !== false)
    .filter((product) => {
      if (activeTab === 'all') return true;
      return product.category === activeTab;
    });

  // K-Beauty 루틴 상품 (Step 1, 2, 3)
  const routineProducts = products.filter(
    (p) => p.category === 'beauty' && p.routineStep
  ).sort((a, b) => (a.routineStep || 0) - (b.routineStep || 0));

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 01. HERO SECTION (동적 설정 반영) */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-900">
        {/* 배경 이미지 & 오버레이 */}
        <div className="absolute inset-0 z-0">
          <Image
            src={settings.heroImageUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=2000&auto=format&fit=crop"}
            alt="DASASSO Seoul Fashion"
            fill
            priority
            className="object-cover object-center opacity-75 scale-105 animate-fadeIn"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        {/* 히어로 콘텐츠 */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-glow" />
            <span>{settings.heroTag}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide leading-tight whitespace-pre-line">
            {settings.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed whitespace-pre-line">
            {settings.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#collections">
              <Button variant="peach" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-xs sm:text-sm">
                {settings.heroPrimaryCtaText}
              </Button>
            </a>
            <a href="#beauty">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black uppercase tracking-wider text-xs sm:text-sm"
              >
                {settings.heroSecondaryCtaText}
              </Button>
            </a>
          </div>

          {/* 소셜 증명 뱃지 */}
          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-brand-sand" />
              <span>전 세계 40개국 직배송</span>
            </div>
            <div className="w-1 h-1 bg-neutral-500 rounded-full" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>평균 평점 4.9 / 5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. TRENDING NOW SECTION (FASHION & BEAUTY) */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-brand-sandDark">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-brand-peach font-semibold uppercase">
              <TrendingUp className="w-4 h-4" />
              REAL-TIME TRENDING
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-dark font-medium mt-1">
              {settings.trendingTitle || '지금 가장 사랑받는 서울 셀렉션'}
            </h2>
            {settings.trendingSubtitle && (
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                {settings.trendingSubtitle}
              </p>
            )}
          </div>

          {/* 카테고리 탭 필터 */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {[
              { id: 'all', label: '전체 (ALL)' },
              { id: 'fashion', label: '여성 패션 (FASHION)' },
              { id: 'beauty', label: 'K-뷰티 (BEAUTY)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'fashion' | 'beauty')}
                className={`text-xs tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-dark text-white font-semibold'
                    : 'bg-brand-sand text-brand-dark hover:bg-brand-sandDark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 그리드 (모바일 2열, 태블릿 3열, 데스크톱 4열) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 03. SHOP THE LOOK (LOOKBOOK & CURATION) */}
      <section id="lookbook" className="bg-brand-sand/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-muted font-medium">
              WEEKLY EDITORIAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
              Shop The Look: 서울의 일상 스타일링
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              에디터가 완성한 한 벌의 착장. 마음에 드는 룩을 선택하고 한 번에 스타일을 완성하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* 룩북 메인 컷 */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-lift group">
              <Image
                src={MOCK_LOOKBOOK[0].imageUrl}
                alt={MOCK_LOOKBOOK[0].titleKo}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs uppercase tracking-widest text-brand-sand font-medium">
                  LOOK 01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">
                  {MOCK_LOOKBOOK[0].titleKo}
                </h3>
                <p className="text-xs text-neutral-300 mt-2 max-w-md">
                  {MOCK_LOOKBOOK[0].description}
                </p>
              </div>
            </div>

            {/* 해당 룩에 매칭된 상품 목록 */}
            <div className="space-y-5">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-brand-muted">
                MATCHED ITEMS IN THIS LOOK ({MOCK_LOOKBOOK[0].pairedProductIds.length})
              </h4>

              <div className="space-y-4">
                {MOCK_LOOKBOOK[0].pairedProductIds.map((pId) => {
                  const product = products.find((p) => p.id === pId);
                  if (!product) return null;

                  return (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-sm shadow-soft flex items-center justify-between gap-4 border border-brand-sandDark/40 hover:border-brand-peach transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-16 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.nameKo}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-brand-muted">
                            {product.brand}
                          </span>
                          <h5 className="text-xs sm:text-sm font-medium text-brand-dark line-clamp-1">
                            {product.nameKo}
                          </h5>
                          <p className="text-xs font-semibold text-brand-dark mt-1">
                            {formatPrice(product.priceKrw, product.priceUsd, currency)}
                          </p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => addItem(product, 1)}
                        className="shrink-0 text-[11px]"
                      >
                        + 담기
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* 한 번에 전체 착장 담기 CTA */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={() => {
                    MOCK_LOOKBOOK[0].pairedProductIds.forEach((pId) => {
                      const p = products.find((item) => item.id === pId);
                      if (p) addItem(p, 1);
                    });
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>이 룩 전체 아이템 장바구니에 담기</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. K-BEAUTY GLASS SKIN 3-STEP ROUTINE */}
      <section id="beauty" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-brand-peach font-semibold uppercase">
              <Droplet className="w-4 h-4" />
              PURE GLOW ROUTINE
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-dark font-medium mt-1">
              투명하게 빛나는 유리알 피부 3-STEP
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              복잡한 스킨케어 대신, 확실한 수분 장벽과 광채를 채워주는 서울 시그니처 루틴.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routineProducts.map((product, idx) => (
            <div
              key={product.id}
              className="bg-white border border-brand-sandDark/60 rounded-sm p-6 shadow-soft flex flex-col justify-between relative group hover:border-brand-peach transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-brand-sand px-2.5 py-1 rounded-sm text-brand-dark">
                    STEP 0{idx + 1}
                  </span>
                  <span className="text-[11px] text-green-700 font-medium">비건 인증 포뮬러</span>
                </div>

                <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded-sm overflow-hidden mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.nameKo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-[10px] uppercase tracking-wider text-brand-muted">
                  {product.brand}
                </span>
                <h3 className="text-sm font-medium text-brand-dark mt-0.5 line-clamp-1">
                  {product.nameKo}
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
                  {product.shortDesc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-brand-sand/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-brand-dark">
                    {formatPrice(product.priceKrw, product.priceUsd, currency)}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating} ({product.reviewCount})</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addItem(product, 1)}
                  className="text-xs"
                >
                  루틴 담기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05. SOCIAL PROOF & GLOBAL REVIEWS */}
      <section id="reviews" className="bg-brand-sand/40 py-20 border-y border-brand-sandDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-muted font-medium">
              VERIFIED EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
              전 세계 고객들의 진솔한 실착 리뷰
            </h2>
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-dark ml-1.5">
                4.9 / 5.0 (2,400+ Verified Reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-sm shadow-soft flex flex-col justify-between border border-brand-sandDark/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-brand-muted font-medium uppercase px-1.5 py-0.5 bg-neutral-100 rounded">
                      {review.userCountry}
                    </span>
                  </div>

                  <p className="text-xs text-brand-charcoal leading-relaxed mb-4">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-brand-muted">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span className="font-medium text-brand-dark">{review.userName}</span>
                  </div>
                  <span>{review.itemOption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. BRAND EDITORIAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden bg-brand-dark text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-brand-peach font-semibold">
              ABOUT DASASSO
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal leading-snug">
              &ldquo;매일 입고 바르는 것에서 시작하는 <br className="hidden sm:inline" />
              가장 자연스럽고 당당한 나만의 무드&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              다사쏘는 빠르게 소비되고 사라지는 유행 대신, 오랜 시간 당신의 옷장과 화장대에 머물 수 있는 
              감도 높은 실루엣과 안전한 포뮬러만을 엄선하여 서울에서 전 세계로 전합니다.
            </p>
          </div>

          <div className="shrink-0">
            <a href="#collections">
              <Button variant="peach" size="lg" className="uppercase tracking-wider text-xs">
                EXPLORE ALL COLLECTIONS <ArrowRight className="w-4 h-4 ml-1.5 inline" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

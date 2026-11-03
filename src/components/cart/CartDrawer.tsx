'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice, calculateShippingProgress } from '@/lib/currency';
import { Button } from '@/components/ui/Button';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    currency,
    totalKrw,
    totalUsd,
    totalItems,
  } = useCart();

  if (!isOpen) return null;

  const { progress, remainingText, isFree } = calculateShippingProgress(
    totalKrw,
    totalUsd,
    currency
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 딤 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* 우측 슬라이드 패널 */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* 헤더 */}
          <div className="p-5 border-b border-brand-sandDark bg-brand-bg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-dark" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-dark">
                SHOPPING BAG ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-1 rounded-full text-brand-muted hover:text-brand-dark hover:bg-brand-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CRO 무료 배송 프로그레스 바 */}
          <div className="bg-brand-sand/50 px-5 py-3 border-b border-brand-sandDark">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className={`font-semibold ${isFree ? 'text-green-700' : 'text-brand-peach'}`}>
                {remainingText}
              </span>
              <span className="text-[11px] text-brand-muted font-medium">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFree ? 'bg-green-600' : 'bg-brand-peach'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 장바구니 아이템 리스트 */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-brand-muted">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-neutral-300 mb-3" />
                <p className="text-sm font-medium text-brand-dark">장바구니가 비어 있습니다.</p>
                <p className="text-xs text-brand-muted mt-1">
                  다사쏘의 감각적인 룩과 K-뷰티를 탐색해 보세요.
                </p>
                <Button variant="outline" size="sm" className="mt-5" onClick={closeCart}>
                  쇼핑 계속하기
                </Button>
              </div>
            ) : (
              items.map((item, index) => {
                const optString = Object.entries(item.selectedOptions)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(' / ');

                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-3.5 pb-4 border-b border-neutral-100 last:border-0"
                  >
                    {/* 이미지 */}
                    <div className="relative w-20 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.nameKo}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-brand-muted">
                            {item.product.brand}
                          </span>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs font-medium text-brand-dark line-clamp-1 mt-0.5">
                          {item.product.nameKo}
                        </h4>
                        {optString && (
                          <p className="text-[11px] text-brand-muted mt-0.5">{optString}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        {/* 수량 버튼 */}
                        <div className="flex items-center border border-neutral-200 rounded-sm">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* 가격 */}
                        <span className="text-xs font-semibold text-brand-dark">
                          {formatPrice(
                            item.product.priceKrw * item.quantity,
                            item.product.priceUsd * item.quantity,
                            currency
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 푸터 & 체크아웃 영역 (items가 있을 때) */}
          {items.length > 0 && (
            <div className="p-5 border-t border-brand-sandDark bg-brand-bg space-y-3">
              <div className="space-y-1.5 text-xs text-brand-muted">
                <div className="flex justify-between">
                  <span>소계 (Subtotal)</span>
                  <span className="font-semibold text-brand-dark text-sm">
                    {formatPrice(totalKrw, totalUsd, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>배송비 (Shipping)</span>
                  <span className={isFree ? 'text-green-700 font-semibold' : 'text-brand-dark'}>
                    {isFree
                      ? 'FREE (무료)'
                      : currency === 'USD'
                      ? '$15.00'
                      : '3,000원'}
                  </span>
                </div>
              </div>

              {/* Express Checkout CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="group flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                onClick={() => {
                  alert(
                    `[다사쏘 주문 체크아웃 시뮬레이션]\n\n총 ${totalItems}개 상품 결제 단계로 이동합니다.\n결제 금액: ${formatPrice(
                      totalKrw,
                      totalUsd,
                      currency
                    )}`
                  );
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-brand-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                <span>100% 정품 보장 • 글로벌 안심 결제 (SSL Secured)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

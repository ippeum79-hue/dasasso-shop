'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/currency';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Package, ArrowRight, Truck } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { getOrderById } = useOrders();
  const { currency } = useCart();

  const order = orderId ? getOrderById(orderId) : undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* 성공 아이콘 */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center animate-fadeIn">
        <CheckCircle2 className="w-10 h-10 stroke-[1.8]" />
      </div>

      <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-brand-peach">
        ORDER COMPLETED
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark mt-1 mb-2">
        주문 및 결제가 완료되었습니다!
      </h1>
      <p className="text-xs sm:text-sm text-brand-muted mb-8 leading-relaxed">
        고객님의 소중한 주문이 정상적으로 접수되었습니다. <br />
        서울 본사에서 꼼꼼히 검수 후 신속하고 안전하게 발송해 드리겠습니다.
      </p>

      {/* 주문 정보 카드 */}
      {order && (
        <div className="bg-white border border-brand-sandDark rounded-sm p-6 text-left shadow-soft mb-8 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-brand-sandDark pb-3">
            <span className="text-brand-muted uppercase text-[10px] tracking-wider">주문 번호</span>
            <span className="font-bold text-brand-dark">{order.orderNumber}</span>
          </div>

          {/* 주문 상품 요약 */}
          <div>
            <span className="text-brand-muted uppercase text-[10px] tracking-wider block mb-2">
              주문 상품 ({order.items.length}종류)
            </span>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.nameKo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-brand-dark line-clamp-1">{item.product.nameKo}</p>
                      <p className="text-[10px] text-brand-muted">수량 {item.quantity}개</p>
                    </div>
                  </div>
                  <span className="font-semibold text-brand-dark">
                    {formatPrice(
                      item.product.priceKrw * item.quantity,
                      item.product.priceUsd * item.quantity,
                      order.currency || currency
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 배송지 정보 */}
          <div className="border-t border-brand-sandDark pt-3">
            <span className="text-brand-muted uppercase text-[10px] tracking-wider block mb-1">
              배송지 정보
            </span>
            <p className="font-medium text-brand-dark">
              {order.shipping.recipientName} ({order.shipping.phone})
            </p>
            <p className="text-neutral-600 mt-0.5">
              [{order.shipping.postalCode}] {order.shipping.address} {order.shipping.detailAddress}
            </p>
          </div>

          {/* 총 결제 금액 */}
          <div className="border-t border-brand-sandDark pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-brand-dark">총 결제 금액</span>
            <span className="text-lg font-serif font-bold text-brand-peach">
              {formatPrice(order.totalKrw, order.totalUsd, order.currency || currency)}
            </span>
          </div>
        </div>
      )}

      {/* CTA 버튼 */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/mypage">
          <Button variant="primary" size="md" className="w-full sm:w-auto text-xs tracking-wider">
            <Package className="w-4 h-4 mr-1.5" />
            주문 내역 조회 (마이페이지)
          </Button>
        </Link>
        <Link href="/#collections">
          <Button variant="outline" size="md" className="w-full sm:w-auto text-xs tracking-wider">
            쇼핑 계속하기
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs">주문 정보를 불러오는 중...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

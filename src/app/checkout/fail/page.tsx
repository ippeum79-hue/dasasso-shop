'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { XCircle, RefreshCw, ShoppingBag, Headphones, ArrowLeft } from 'lucide-react';

function OrderFailContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || '결제 진행 중 사용자에 의해 취소되었거나 승인이 거절되었습니다.';
  const errorCode = searchParams.get('code') || 'PAYMENT_CANCELLED';

  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
      {/* 실패 아이콘 */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 text-brand-alert flex items-center justify-center animate-fadeIn">
        <XCircle className="w-10 h-10 stroke-[1.8]" />
      </div>

      <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-brand-alert">
        PAYMENT FAILED
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark mt-1 mb-2">
        결제가 완료되지 않았습니다
      </h1>
      <p className="text-xs sm:text-sm text-brand-muted mb-8 leading-relaxed">
        결제 승인 처리 중 문제가 발생하였습니다. <br />
        아래 사유를 확인하시고 다시 시도해 주시기 바랍니다.
      </p>

      {/* 에러 상세 카드 */}
      <div className="bg-white border border-brand-sandDark rounded-sm p-6 text-left shadow-soft mb-8 space-y-3 text-xs">
        <div className="flex justify-between items-center border-b border-brand-sandDark pb-3">
          <span className="text-brand-muted uppercase text-[10px] tracking-wider">오류 코드</span>
          <span className="font-mono font-semibold text-brand-alert">{errorCode}</span>
        </div>
        <div className="pt-1">
          <span className="text-brand-muted uppercase text-[10px] tracking-wider block mb-1">
            상세 사유
          </span>
          <p className="text-brand-dark font-medium leading-relaxed bg-neutral-50 p-3 rounded-sm border border-neutral-100">
            {errorMessage}
          </p>
        </div>
        <div className="pt-2 text-[11px] text-neutral-400">
          * 잔액 부족, 카드 한도 초과, 통신 오류 또는 본인 인증 취소 시 발생할 수 있습니다.
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/checkout">
          <Button variant="primary" size="md" className="w-full sm:w-auto text-xs tracking-wider flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>다시 결제 시도하기</span>
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="md" className="w-full sm:w-auto text-xs tracking-wider flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>쇼핑 계속하기</span>
          </Button>
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-brand-sandDark text-[11px] text-brand-muted flex items-center justify-center gap-2">
        <Headphones className="w-3.5 h-3.5 text-brand-peach" />
        <span>지속적인 결제 오류 발생 시 고객센터 (support@dasasso.com)로 문의해 주세요.</span>
      </div>
    </div>
  );
}

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs">결제 정보를 불러오는 중...</div>}>
      <OrderFailContent />
    </Suspense>
  );
}

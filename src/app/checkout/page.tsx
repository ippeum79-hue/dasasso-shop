'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { formatPrice, calculateShippingProgress } from '@/lib/currency';
import { requestTossPayment, requestPortOnePayment } from '@/lib/payments';
import { Button } from '@/components/ui/Button';
import { PaymentMethod } from '@/types';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronLeft,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalKrw, totalUsd, currency, clearCart } = useCart();
  const { currentUser, isAuthenticated, openAuthModal } = useAuth();
  const { createOrder } = useOrders();

  // 배송지 입력 상태
  const [recipientName, setRecipientName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [postalCode, setPostalCode] = useState(currentUser?.address?.postalCode || '');
  const [address, setAddress] = useState(currentUser?.address?.roadAddress || '');
  const [detailAddress, setDetailAddress] = useState(currentUser?.address?.detailAddress || '');
  const [deliveryRequest, setDeliveryRequest] = useState('부재 시 문 앞에 놓아주세요.');
  const [customDeliveryRequest, setCustomDeliveryRequest] = useState('');
  const [isSameAsUser, setIsSameAsUser] = useState(true);

  // 결제 수단 & 시뮬레이션 설정
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('toss');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreement, setAgreement] = useState(true);
  const [simulateFailure, setSimulateFailure] = useState(false); // 결제 실패 테스트용

  // 회원 정보 자동 반영
  useEffect(() => {
    if (currentUser && isSameAsUser) {
      if (currentUser.name) setRecipientName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.address) {
        setPostalCode(currentUser.address.postalCode);
        setAddress(currentUser.address.roadAddress);
        setDetailAddress(currentUser.address.detailAddress);
      }
    }
  }, [currentUser, isSameAsUser]);

  // 배송비 계산
  const { isFree } = calculateShippingProgress(totalKrw, totalUsd, currency);
  const shippingFeeKrw = isFree ? 0 : 3000;
  const shippingFeeUsd = isFree ? 0 : 15.0;

  const finalTotalKrw = totalKrw + shippingFeeKrw;
  const finalTotalUsd = totalUsd + shippingFeeUsd;

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-medium text-brand-dark mb-3">CHECKOUT</h1>
        <p className="text-sm text-brand-muted mb-6">주문하실 상품이 장바구니에 없습니다.</p>
        <Link href="/#collections">
          <Button variant="primary" size="md">
            쇼핑 계속하기
          </Button>
        </Link>
      </div>
    );
  }

  // 우편번호 자동 채우기 가이드
  const handleQuickAddressFill = () => {
    setPostalCode('06027');
    setAddress('서울특별시 강남구 압구정로 123');
    setDetailAddress('다사쏘 빌딩 4층');
  };

  // 결제 진행 및 PG사 연동
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim() || !phone.trim() || !address.trim()) {
      alert('배송지 정보(수령인, 연락처, 주소)를 모두 입력해 주세요.');
      return;
    }

    if (!agreement) {
      alert('주문 내용 확인 및 결제 진행에 동의해 주세요.');
      return;
    }

    setIsProcessing(true);

    const orderTitle = items.length > 1
      ? `${items[0].product.nameKo} 외 ${items.length - 1}건`
      : items[0].product.nameKo;

    const finalRequestMessage = deliveryRequest === '직접 입력' ? customDeliveryRequest : deliveryRequest;
    const tempOrderId = `DS${Date.now()}`;

    try {
      // 1. 결제 실패 시뮬레이션 테스트가 켜져 있는 경우
      if (simulateFailure) {
        await new Promise((res) => setTimeout(res, 800));
        router.push('/checkout/fail?code=USER_CANCEL&message=테스트 결제 실패 시뮬레이션이 실행되었습니다.');
        return;
      }

      // 2. PG사 연동 뼈대 실행
      if (paymentMethod === 'toss') {
        await requestTossPayment({
          orderId: tempOrderId,
          orderName: orderTitle,
          amount: currency === 'USD' ? finalTotalUsd : finalTotalKrw,
          currency,
          customerName: recipientName,
          customerEmail: currentUser?.email || 'guest@dasasso.com',
          customerPhone: phone,
          successUrl: `${window.location.origin}/checkout/success`,
          failUrl: `${window.location.origin}/checkout/fail`,
        });
      } else if (paymentMethod === 'portone') {
        await requestPortOnePayment({
          orderId: tempOrderId,
          orderName: orderTitle,
          amount: finalTotalKrw,
          currency: 'KRW',
          customerName: recipientName,
          customerEmail: currentUser?.email || 'guest@dasasso.com',
          customerPhone: phone,
          successUrl: `${window.location.origin}/checkout/success`,
          failUrl: `${window.location.origin}/checkout/fail`,
        }, 'kakaopay');
      } else {
        // 일반 카드 / PayPal 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // 3. 주문 데이터 생성 및 영속화
      const newOrder = await createOrder({
        items,
        shipping: {
          recipientName,
          phone,
          postalCode,
          address,
          detailAddress,
          deliveryRequest: finalRequestMessage,
        },
        paymentMethod,
        totalKrw: finalTotalKrw,
        totalUsd: finalTotalUsd,
        currency,
        userEmail: currentUser?.email || 'guest.customer@dasasso.com',
        userId: currentUser?.id,
      });

      // 4. 장바구니 비우기 및 성공 페이지 이동
      clearCart();
      router.push(`/checkout/success?orderId=${newOrder.orderNumber}`);
    } catch {
      router.push('/checkout/fail?code=SYSTEM_ERROR&message=결제 승인 처리 중 예기치 않은 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-xs text-brand-muted hover:text-brand-dark flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          <span>쇼핑몰로 돌아가기</span>
        </Link>
      </div>

      <div className="text-center mb-10">
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brand-peach">
          EXPRESS CHECKOUT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark mt-1">
          주문서 작성 및 결제
        </h1>
      </div>

      <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 좌측: 수령인 배송 정보 & 결제 수단 선택 (7단) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 로그인 안내 (비로그인 시) */}
          {!isAuthenticated && (
            <div className="bg-brand-sand/50 border border-brand-sandDark p-4 rounded-sm flex items-center justify-between text-xs">
              <span className="text-brand-dark">
                기존 회원이신가요? 로그인하시면 등록된 기본 배송지가 자동 입력됩니다.
              </span>
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-brand-peach font-semibold hover:underline shrink-0 ml-2"
              >
                로그인
              </button>
            </div>
          )}

          {/* 1. 수령인 배송지 정보 입력 폼 */}
          <div className="bg-white border border-brand-sandDark rounded-sm p-6 sm:p-7 shadow-soft">
            <div className="flex items-center justify-between border-b border-brand-sandDark pb-3 mb-5">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-dark flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-peach" />
                <span>1. 배송지 정보 입력</span>
              </h2>

              {isAuthenticated && (
                <label className="flex items-center gap-1.5 text-xs text-brand-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSameAsUser}
                    onChange={(e) => setIsSameAsUser(e.target.checked)}
                    className="rounded text-brand-dark"
                  />
                  <span>회원 기본 정보와 동일</span>
                </label>
              )}
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-brand-muted mb-1">
                    수령인 이름 (RECIPIENT) *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-brand-muted mb-1">
                    연락처 (MOBILE PHONE) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-brand-muted mb-1">
                  우편번호 (POSTAL CODE)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="06027"
                    className="w-32 p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark"
                  />
                  <button
                    type="button"
                    onClick={handleQuickAddressFill}
                    className="px-3.5 py-2 bg-brand-sand border border-brand-sandDark text-brand-dark text-xs font-medium rounded-sm hover:bg-brand-sandDark transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-peach" />
                    <span>샘플 주소 자동 입력</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-brand-muted mb-1">
                  기본 주소 (ROAD ADDRESS) *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="서울특별시 강남구 압구정로 123"
                  className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-brand-muted mb-1">
                  상세 주소 (DETAIL ADDRESS)
                </label>
                <input
                  type="text"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="다사쏘 빌딩 4층 401호 (상세 호수 입력)"
                  className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-brand-muted mb-1">
                  배송 요청사항 (DELIVERY NOTE)
                </label>
                <select
                  value={deliveryRequest}
                  onChange={(e) => setDeliveryRequest(e.target.value)}
                  className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark mb-2"
                >
                  <option value="부재 시 문 앞에 놓아주세요.">부재 시 문 앞에 놓아주세요.</option>
                  <option value="배송 전 미리 연락 바랍니다.">배송 전 미리 연락 바랍니다.</option>
                  <option value="경비실에 맡겨 주세요.">경비실에 맡겨 주세요.</option>
                  <option value="택배함에 넣어 주세요.">택배함에 넣어 주세요.</option>
                  <option value="직접 입력">직접 입력</option>
                </select>

                {deliveryRequest === '직접 입력' && (
                  <input
                    type="text"
                    value={customDeliveryRequest}
                    onChange={(e) => setCustomDeliveryRequest(e.target.value)}
                    placeholder="요청사항을 직접 입력해 주세요 (예: 1층 공동현관 번호 등)"
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark animate-fadeIn"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 2. 결제 수단 선택 (국내 PG사 토스페이먼츠 / 포트원 등) */}
          <div className="bg-white border border-brand-sandDark rounded-sm p-6 sm:p-7 shadow-soft">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-dark border-b border-brand-sandDark pb-3 mb-5 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-peach" />
              <span>2. 결제 수단 선택 (PG사 연동)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* 토스페이먼츠 */}
              <label
                className={`p-3.5 border rounded-sm flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'toss'
                    ? 'border-brand-dark bg-neutral-50 font-semibold ring-1 ring-brand-dark'
                    : 'border-brand-sandDark hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="toss"
                  checked={paymentMethod === 'toss'}
                  onChange={() => setPaymentMethod('toss')}
                  className="mt-0.5 text-brand-dark focus:ring-brand-dark"
                />
                <div>
                  <span className="block text-brand-dark font-medium">토스페이먼츠 (Toss)</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">
                    토스페이, 삼성페이, 모든 카드 간편결제
                  </span>
                  <span className="inline-block mt-1 text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                    PG 연동 활성화
                  </span>
                </div>
              </label>

              {/* 포트원 / 카카오페이 / 네이버페이 */}
              <label
                className={`p-3.5 border rounded-sm flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'portone'
                    ? 'border-brand-dark bg-neutral-50 font-semibold ring-1 ring-brand-dark'
                    : 'border-brand-sandDark hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="portone"
                  checked={paymentMethod === 'portone'}
                  onChange={() => setPaymentMethod('portone')}
                  className="mt-0.5 text-brand-dark focus:ring-brand-dark"
                />
                <div>
                  <span className="block text-brand-dark font-medium">포트원 (간편결제)</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">
                    카카오페이 / 네이버페이 / PAYCO
                  </span>
                  <span className="inline-block mt-1 text-[9px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                    PG 연동 활성화
                  </span>
                </div>
              </label>

              {/* 일반 신용/체크카드 */}
              <label
                className={`p-3.5 border rounded-sm flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-dark bg-neutral-50 font-semibold ring-1 ring-brand-dark'
                    : 'border-brand-sandDark hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-0.5 text-brand-dark focus:ring-brand-dark"
                />
                <div>
                  <span className="block text-brand-dark font-medium">일반 신용/체크카드</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">
                    국내외 모든 카드 무이자 할부
                  </span>
                </div>
              </label>

              {/* 글로벌 PayPal */}
              <label
                className={`p-3.5 border rounded-sm flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-brand-dark bg-neutral-50 font-semibold ring-1 ring-brand-dark'
                    : 'border-brand-sandDark hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="mt-0.5 text-brand-dark focus:ring-brand-dark"
                />
                <div>
                  <span className="block text-brand-dark font-medium">PayPal / Global Express</span>
                  <span className="text-[10px] text-brand-muted block mt-0.5">
                    해외 발급 카드 및 글로벌 간편결제
                  </span>
                </div>
              </label>
            </div>

            {/* 개발자/검증용 테스트 스위치 */}
            <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-brand-muted">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span>결제 실패 흐름 테스트 모드</span>
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className={simulateFailure ? 'text-red-600 font-semibold' : ''}>
                  {simulateFailure ? '실패 페이지(/fail)로 이동' : '정상 결제'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 우측: 주문 상품 요약 및 결제하기 버튼 (5단) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-brand-sandDark rounded-sm p-6 shadow-soft sticky top-28 space-y-5">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-dark border-b border-brand-sandDark pb-3">
              주문 상품 요약 ({items.length}개)
            </h2>

            {/* 상품 리스트 */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-neutral-100">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 pt-3 first:pt-0">
                  <div className="relative w-14 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.nameKo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-brand-muted block">
                      {item.product.brand}
                    </span>
                    <h4 className="text-xs font-medium text-brand-dark truncate">
                      {item.product.nameKo}
                    </h4>
                    <p className="text-[11px] text-brand-muted mt-0.5">수량 {item.quantity}개</p>
                  </div>
                  <div className="text-xs font-semibold text-brand-dark shrink-0">
                    {formatPrice(
                      item.product.priceKrw * item.quantity,
                      item.product.priceUsd * item.quantity,
                      currency
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 결제 금액 계산 */}
            <div className="border-t border-brand-sandDark pt-4 space-y-2 text-xs text-brand-muted">
              <div className="flex justify-between">
                <span>상품 총 금액</span>
                <span className="text-brand-dark font-medium">
                  {formatPrice(totalKrw, totalUsd, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span className={isFree ? 'text-green-700 font-semibold' : 'text-brand-dark'}>
                  {isFree ? '무료 배송' : formatPrice(shippingFeeKrw, shippingFeeUsd, currency)}
                </span>
              </div>
              <div className="border-t border-brand-sandDark pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-brand-dark">최종 결제 금액</span>
                <span className="text-xl font-serif font-semibold text-brand-peach">
                  {formatPrice(finalTotalKrw, finalTotalUsd, currency)}
                </span>
              </div>
            </div>

            {/* 동의 체크박스 */}
            <label className="flex items-start gap-2 pt-2 text-[11px] text-neutral-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                className="mt-0.5 rounded text-brand-dark focus:ring-brand-dark"
              />
              <span>
                주문 상품의 정보 및 결제 조건에 동의하며, 결제 진행에 동의합니다. (필수)
              </span>
            </label>

            {/* 결제하기 CTA */}
            <Button
              type="submit"
              variant="peach"
              size="lg"
              fullWidth
              isLoading={isProcessing}
              className="uppercase tracking-widest text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>
                {formatPrice(finalTotalKrw, finalTotalUsd, currency)} 결제하기
              </span>
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-brand-muted pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
              <span>토스페이먼츠 / 포트원 공인 256-bit SSL 보안 암호화 결제</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

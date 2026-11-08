'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/currency';
import { Button } from '@/components/ui/Button';
import {
  User as UserIcon,
  Package,
  MapPin,
  Clock,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ExternalLink,
} from 'lucide-react';

export default function MyPage() {
  const { currentUser, isAuthenticated, openAuthModal, logout, updateProfile } = useAuth();
  const { getUserOrders } = useOrders();
  const { currency } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [roadAddress, setRoadAddress] = useState(currentUser?.address?.roadAddress || '');
  const [detailAddress, setDetailAddress] = useState(currentUser?.address?.detailAddress || '');
  const [postalCode, setPostalCode] = useState(currentUser?.address?.postalCode || '');

  // 비로그인 상태일 때 안내 뷰
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark">
          <UserIcon className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-brand-dark mb-2">MY ACCOUNT</h1>
        <p className="text-sm text-brand-muted mb-6 leading-relaxed">
          주문 내역 조회 및 회원 혜택 관리를 위해 로그인이 필요합니다.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => openAuthModal('login')}>
            로그인하기
          </Button>
          <Button variant="outline" size="md" onClick={() => openAuthModal('signup')}>
            회원가입
          </Button>
        </div>
      </div>
    );
  }

  const userOrders = getUserOrders(currentUser.email);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      address: {
        postalCode,
        roadAddress,
        detailAddress,
      },
    });
    setIsEditingAddress(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case '결제완료':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '배송준비중':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case '배송중':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case '배송완료':
        return 'bg-green-50 text-green-700 border-green-200';
      case '주문취소':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* 회원 프로필 요약 카드 */}
      <div className="bg-white border border-brand-sandDark rounded-sm p-6 sm:p-8 mb-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-dark text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
            {currentUser.name.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-medium text-brand-dark">
                {currentUser.name}
              </h1>
              <span className="px-2 py-0.5 bg-brand-sand text-[10px] font-semibold text-brand-dark rounded uppercase tracking-wider">
                VIP MEMBER
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-1">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-brand-sandDark">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
              TOTAL ORDERS
            </span>
            <span className="text-lg font-semibold text-brand-dark">{userOrders.length}건</span>
          </div>
          <div className="h-8 w-px bg-brand-sandDark" />
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-600"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </Button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-brand-sandDark mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-b-2 border-brand-dark text-brand-dark'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>주문 및 배송 내역 ({userOrders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-b-2 border-brand-dark text-brand-dark'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>회원 정보 및 배송지 설정</span>
        </button>
      </div>

      {/* 탭 1: 주문 및 배송 내역 */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {userOrders.length === 0 ? (
            <div className="bg-white border border-brand-sandDark rounded-sm p-12 text-center text-brand-muted">
              <Package className="w-12 h-12 stroke-[1.2] mx-auto mb-3 text-neutral-300" />
              <p className="text-sm font-medium text-brand-dark">아직 주문 내역이 없습니다.</p>
              <p className="text-xs text-brand-muted mt-1">다사쏘의 트렌디한 서울 셀렉션을 만나보세요.</p>
              <Link href="/#collections" className="inline-block mt-5">
                <Button variant="primary" size="sm">
                  쇼핑하러 가기
                </Button>
              </Link>
            </div>
          ) : (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-brand-sandDark rounded-sm overflow-hidden shadow-soft"
              >
                {/* 주문 헤더 */}
                <div className="bg-neutral-50 px-5 py-3.5 border-b border-brand-sandDark flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-brand-muted block uppercase">ORDER NO.</span>
                      <span className="font-semibold text-brand-dark">{order.orderNumber}</span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[10px] text-brand-muted block uppercase">ORDER DATE</span>
                      <span className="text-neutral-600">{order.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadgeColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="font-semibold text-brand-dark">
                      {formatPrice(order.totalKrw, order.totalUsd, order.currency || currency)}
                    </span>
                  </div>
                </div>

                {/* 주문 상품 목록 */}
                <div className="p-5 divide-y divide-neutral-100 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 pt-4 first:pt-0">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-16 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.nameKo}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-brand-muted">
                            {item.product.brand}
                          </span>
                          <h4 className="text-xs sm:text-sm font-medium text-brand-dark line-clamp-1">
                            {item.product.nameKo}
                          </h4>
                          <p className="text-[11px] text-brand-muted mt-0.5">
                            수량 {item.quantity}개
                            {Object.keys(item.selectedOptions).length > 0 &&
                              ` | ${Object.entries(item.selectedOptions)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(', ')}`}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-semibold text-brand-dark">
                          {formatPrice(
                            item.product.priceKrw * item.quantity,
                            item.product.priceUsd * item.quantity,
                            order.currency || currency
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 배송지 & 결제 수단 요약 푸터 */}
                <div className="bg-brand-sand/30 px-5 py-3 border-t border-brand-sandDark/60 text-[11px] text-brand-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <Truck className="w-3.5 h-3.5 text-brand-peach shrink-0" />
                    <span>배송지: {order.shipping.address} {order.shipping.detailAddress} (수령인: {order.shipping.recipientName})</span>
                  </div>
                  <div className="shrink-0 text-neutral-500">
                    결제: {order.paymentMethod.toUpperCase()} 결제
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 탭 2: 회원 정보 및 배송지 관리 */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 기본 회원 정보 */}
          <div className="bg-white border border-brand-sandDark rounded-sm p-6 shadow-soft space-y-4">
            <h3 className="text-sm font-semibold text-brand-dark tracking-wider uppercase border-b border-brand-sandDark pb-3">
              기본 회원 정보
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-brand-muted block text-[11px]">이름</label>
                <p className="font-medium text-brand-dark mt-0.5">{currentUser.name}</p>
              </div>
              <div>
                <label className="text-brand-muted block text-[11px]">이메일 계정</label>
                <p className="font-medium text-brand-dark mt-0.5">{currentUser.email}</p>
              </div>
              <div>
                <label className="text-brand-muted block text-[11px]">연락처</label>
                <p className="font-medium text-brand-dark mt-0.5">{currentUser.phone || '미등록'}</p>
              </div>
              <div>
                <label className="text-brand-muted block text-[11px]">가입일</label>
                <p className="font-medium text-brand-dark mt-0.5">{currentUser.createdAt}</p>
              </div>
            </div>
          </div>

          {/* 기본 배송지 정보 */}
          <div className="bg-white border border-brand-sandDark rounded-sm p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-brand-sandDark pb-3">
              <h3 className="text-sm font-semibold text-brand-dark tracking-wider uppercase">
                기본 배송지
              </h3>
              {!isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-xs font-semibold text-brand-peach hover:underline"
                >
                  수정하기
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] text-brand-muted mb-1">우편번호</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="06027"
                    className="w-full p-2 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-brand-muted mb-1">기본 도로명 주소</label>
                  <input
                    type="text"
                    required
                    value={roadAddress}
                    onChange={(e) => setRoadAddress(e.target.value)}
                    placeholder="서울특별시 강남구 압구정로 123"
                    className="w-full p-2 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-brand-muted mb-1">상세 주소</label>
                  <input
                    type="text"
                    required
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="다사쏘 빌딩 4층"
                    className="w-full p-2 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" size="sm" variant="primary">
                    저장 완료
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditingAddress(false)}
                  >
                    취소
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-2 text-xs">
                {currentUser.address ? (
                  <>
                    <p className="text-neutral-500">[{currentUser.address.postalCode}]</p>
                    <p className="font-medium text-brand-dark">{currentUser.address.roadAddress}</p>
                    <p className="text-neutral-600">{currentUser.address.detailAddress}</p>
                  </>
                ) : (
                  <p className="text-neutral-400 py-4">등록된 기본 배송지가 없습니다.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

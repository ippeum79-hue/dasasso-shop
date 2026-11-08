'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { useOrders } from '@/context/OrderContext';
import { Product, CategoryType, SubCategoryType, OrderStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  Package,
  Sliders,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  Lock,
  LogOut,
  ExternalLink,
  RotateCcw,
  Save,
  CheckCircle2,
  Search,
  Eye,
  EyeOff,
  Star,
  Sparkles,
} from 'lucide-react';

const ADMIN_PASSWORD = 'admin'; // 또는 dasasso2026!

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    resetProducts,
    settings,
    updateSettings,
    resetSettings,
  } = useStore();
  const { orders, updateOrderStatus } = useOrders();

  // 관리자 인증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // 탭 상태: 'products' | 'settings' | 'orders'
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'orders'>('products');

  // 상품 추가/수정 모달 상태
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // 상품 폼 필드
  const [nameKo, setNameKo] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [brand, setBrand] = useState('DASASSO ATELIER');
  const [category, setCategory] = useState<CategoryType>('fashion');
  const [subCategory, setSubCategory] = useState<SubCategoryType>('tops');
  const [priceKrw, setPriceKrw] = useState(89000);
  const [priceUsd, setPriceUsd] = useState(68.0);
  const [stockCount, setStockCount] = useState(15);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [isBest, setIsBest] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);

  // 배너 및 진열 편집 폼 상태
  const [bannerText, setBannerText] = useState(settings.topBannerText);
  const [promoCode, setPromoCode] = useState(settings.topBannerPromoCode);
  const [heroTag, setHeroTag] = useState(settings.heroTag);
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);
  const [heroImageUrl, setHeroImageUrl] = useState(settings.heroImageUrl);
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState(settings.heroPrimaryCtaText);
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState(settings.heroSecondaryCtaText);
  const [trendingTitle, setTrendingTitle] = useState(settings.trendingTitle || '지금 가장 사랑받는 서울 셀렉션');
  const [trendingSubtitle, setTrendingSubtitle] = useState(
    settings.trendingSubtitle || '실시간 주문량과 리뷰 평점을 바탕으로 엄선한 다사쏘 시그니처 아이템'
  );
  const [settingsSaved, setSettingsSaved] = useState(false);

  // 상품 검색 필터
  const [productSearch, setProductSearch] = useState('');

  // 세션 스토리지에서 관리자 인증 확인
  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem('dasasso_admin_auth');
      if (isAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  // settings가 로드되면 폼 상태 동기화
  useEffect(() => {
    setBannerText(settings.topBannerText);
    setPromoCode(settings.topBannerPromoCode);
    setHeroTag(settings.heroTag);
    setHeroTitle(settings.heroTitle);
    setHeroSubtitle(settings.heroSubtitle);
    setHeroImageUrl(settings.heroImageUrl);
    setHeroPrimaryCtaText(settings.heroPrimaryCtaText);
    setHeroSecondaryCtaText(settings.heroSecondaryCtaText);
    setTrendingTitle(settings.trendingTitle || '지금 가장 사랑받는 서울 셀렉션');
    setTrendingSubtitle(settings.trendingSubtitle || '실시간 주문량과 리뷰 평점을 바탕으로 엄선한 다사쏘 시그니처 아이템');
  }, [settings]);

  // 관리자 로그인 처리
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD || passwordInput === 'dasasso2026!') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dasasso_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('관리자 비밀번호가 일치하지 않습니다. (기본 비밀번호: admin 또는 dasasso2026!)');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dasasso_admin_auth');
  };

  // 신규 상품 등록 모달 열기
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setNameKo('');
    setNameEn('');
    setBrand('DASASSO ATELIER');
    setCategory('fashion');
    setSubCategory('tops');
    setPriceKrw(89000);
    setPriceUsd(68.0);
    setStockCount(15);
    setImage1('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop');
    setImage2('');
    setShortDesc('감각적인 서울의 일상을 완성하는 에센셜 아이템');
    setDescription('부드럽고 고급스러운 소재감과 유려한 실루엣이 돋보이는 디자인입니다.');
    setIsBest(false);
    setIsNew(true);
    setIsVegan(false);
    setIsFeatured(true);
    setIsProductModalOpen(true);
  };

  // 기존 상품 수정 모달 열기
  const handleOpenEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setNameKo(p.nameKo);
    setNameEn(p.nameEn);
    setBrand(p.brand);
    setCategory(p.category);
    setSubCategory(p.subCategory);
    setPriceKrw(p.priceKrw);
    setPriceUsd(p.priceUsd);
    setStockCount(p.stockCount);
    setImage1(p.images[0] || '');
    setImage2(p.images[1] || '');
    setShortDesc(p.shortDesc);
    setDescription(p.description);
    setIsBest(!!p.isBest);
    setIsNew(!!p.isNew);
    setIsVegan(!!p.isVegan);
    setIsFeatured(p.isFeatured !== false);
    setIsProductModalOpen(true);
  };

  // 상품 저장 (추가 또는 수정)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const images = [image1.trim()];
    if (image2.trim()) images.push(image2.trim());

    if (editingProductId) {
      updateProduct(editingProductId, {
        nameKo,
        nameEn,
        brand,
        category,
        subCategory,
        priceKrw: Number(priceKrw),
        priceUsd: Number(priceUsd),
        stockCount: Number(stockCount),
        images,
        shortDesc,
        description,
        isBest,
        isNew,
        isVegan,
        isFeatured,
      });
      alert('상품 정보가 성공적으로 수정되었습니다.');
    } else {
      addProduct({
        nameKo,
        nameEn,
        brand,
        category,
        subCategory,
        priceKrw: Number(priceKrw),
        priceUsd: Number(priceUsd),
        stockCount: Number(stockCount),
        images,
        shortDesc,
        description,
        options: [{ name: 'Option', values: ['Default'] }],
        tags: [brand, category],
        isBest,
        isNew,
        isVegan,
        isFeatured,
      });
      alert('신규 상품이 쇼핑몰에 성공적으로 등록되었습니다.');
    }

    setIsProductModalOpen(false);
  };

  // 배너 및 히어로 설정 저장
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      topBannerText: bannerText,
      topBannerPromoCode: promoCode,
      heroTag,
      heroTitle,
      heroSubtitle,
      heroImageUrl,
      heroPrimaryCtaText,
      heroSecondaryCtaText,
      trendingTitle,
      trendingSubtitle,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // 1. 비밀번호 인증 전 화면 (보안 게이트)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white border border-brand-sandDark rounded-sm p-8 shadow-2xl animate-fadeIn">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-brand-dark text-white flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-6">
            <span className="font-serif text-2xl tracking-[0.2em] font-medium text-brand-dark block">
              DASASSO ADMIN
            </span>
            <p className="text-xs text-brand-muted mt-1">
              관리자 모드 접속을 위해 비밀번호를 입력해 주세요.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-brand-muted mb-1">
                관리자 비밀번호 (PASSWORD)
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호 입력 (기본: admin)"
                className="w-full p-2.5 text-xs bg-neutral-50 border border-brand-sandDark rounded-sm focus:outline-none focus:border-brand-dark"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth size="md" className="uppercase tracking-wider text-xs">
              관리자 인증 및 로그인
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-brand-sandDark text-center">
            <p className="text-[11px] text-neutral-400">
              💡 기본 관리자 암호: <strong className="text-brand-dark">admin</strong> 또는 <strong className="text-brand-dark">dasasso2026!</strong>
            </p>
            <Link href="/" className="inline-block mt-3 text-xs text-brand-peach hover:underline">
              ← 쇼핑몰 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 필터링된 상품
  const filteredProducts = products.filter(
    (p) =>
      p.nameKo.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  // 2. 인증 완료 후 관리자 메인 대시보드
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 관리자 헤더 바 */}
      <div className="bg-brand-dark text-white rounded-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-sm">
            <ShieldCheck className="w-6 h-6 text-brand-peach" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl tracking-wider font-medium">
                DASASSO CONTROL CENTER
              </h1>
              <span className="text-[10px] bg-brand-peach px-2 py-0.5 rounded uppercase font-bold">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              다사쏘 쇼핑몰 상품, 메인 배너 문구 및 주요 상품 진열 통합 관리 모드
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>쇼핑몰 화면 보기</span>
          </Link>
          <button
            onClick={handleAdminLogout}
            className="text-xs bg-red-600/80 hover:bg-red-600 px-3.5 py-2 rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>관리자 로그아웃</span>
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-brand-sandDark mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-5 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-b-2 border-brand-dark text-brand-dark'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>상품 관리 ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-5 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-b-2 border-brand-dark text-brand-dark'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>배너 & 쇼핑몰 진열 편집</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-5 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-b-2 border-brand-dark text-brand-dark'
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>실시간 주문/배송 관리 ({orders.length})</span>
        </button>
      </div>

      {/* ================= 탭 1: 상품 관리 ================= */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-brand-sandDark rounded-sm">
            {/* 검색창 */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="상품명 또는 브랜드 검색..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-brand-sandDark rounded-sm bg-neutral-50 focus:outline-none focus:border-brand-dark"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm('모든 상품을 기본 데이터로 초기화하시겠습니까?')) {
                    resetProducts();
                  }
                }}
                className="text-xs text-neutral-600"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                기본값 리셋
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenAddModal}
                className="text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>신규 상품 등록</span>
              </Button>
            </div>
          </div>

          {/* 상품 테이블 */}
          <div className="bg-white border border-brand-sandDark rounded-sm overflow-x-auto shadow-soft">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-brand-muted uppercase text-[10px] tracking-wider border-b border-brand-sandDark">
                <tr>
                  <th className="p-3.5">이미지</th>
                  <th className="p-3.5">상품명 / 영문명</th>
                  <th className="p-3.5">브랜드</th>
                  <th className="p-3.5">카테고리</th>
                  <th className="p-3.5">가격 (KRW / USD)</th>
                  <th className="p-3.5">재고</th>
                  <th className="p-3.5">메인 진열</th>
                  <th className="p-3.5">뱃지</th>
                  <th className="p-3.5 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="relative w-12 aspect-[3/4] bg-neutral-100 rounded overflow-hidden">
                        <Image src={p.images[0]} alt={p.nameKo} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <p className="font-medium text-brand-dark line-clamp-1">{p.nameKo}</p>
                      <p className="text-[11px] text-neutral-400 font-serif italic line-clamp-1">
                        {p.nameEn}
                      </p>
                    </td>
                    <td className="p-3.5 text-neutral-600">{p.brand}</td>
                    <td className="p-3.5">
                      <span className="uppercase text-[10px] px-2 py-0.5 bg-brand-sand rounded font-semibold text-brand-dark">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-brand-dark">
                      ₩{p.priceKrw.toLocaleString()} <br />
                      <span className="text-[11px] text-neutral-400 font-normal">${p.priceUsd}</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`font-semibold ${p.stockCount <= 5 ? 'text-red-600' : 'text-neutral-700'}`}>
                        {p.stockCount}개
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                          p.isFeatured !== false
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-neutral-100 text-neutral-400 border border-neutral-200'
                        }`}
                        title="클릭하여 메인 화면 진열 여부 변경"
                      >
                        {p.isFeatured !== false ? (
                          <>
                            <Eye className="w-3 h-3 text-green-600" />
                            <span>진열 중</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-neutral-400" />
                            <span>미진열</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.isBest && <Badge variant="best">BEST</Badge>}
                        {p.isNew && <Badge variant="new">NEW</Badge>}
                        {p.isVegan && <Badge variant="vegan">VEGAN</Badge>}
                      </div>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 text-neutral-500 hover:text-brand-dark rounded hover:bg-neutral-100 transition-colors"
                        title="수정"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`'${p.nameKo}' 상품을 삭제하시겠습니까?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 탭 2: 배너 & 쇼핑몰 진열 편집 ================= */}
      {activeTab === 'settings' && (
        <div className="space-y-8 animate-fadeIn">
          {/* 배너 및 문구 편집 폼 */}
          <div className="max-w-4xl bg-white border border-brand-sandDark rounded-sm p-6 sm:p-8 shadow-soft">
            <div className="flex items-center justify-between border-b border-brand-sandDark pb-4 mb-6">
              <div>
                <h2 className="text-base font-semibold text-brand-dark tracking-wider uppercase">
                  쇼핑몰 메인 화면 배너 & 문구 편집
                </h2>
                <p className="text-xs text-brand-muted mt-0.5">
                  수정 후 [설정 저장하기]를 클릭하면 쇼핑몰 메인 화면에 즉시 실시간으로 반영됩니다.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm('쇼핑몰 문구를 초기 기본값으로 리셋하시겠습니까?')) {
                    resetSettings();
                  }
                }}
                className="text-xs text-neutral-600"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                기본값 복원
              </Button>
            </div>

            {settingsSaved && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-sm flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>쇼핑몰 설정이 성공적으로 저장되었습니다! 메인 화면에서 확인하실 수 있습니다.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              {/* 1. 상단 띠배너 */}
              <div className="space-y-3 p-4 bg-neutral-50 rounded-sm border border-brand-sandDark">
                <h3 className="font-semibold text-brand-dark tracking-wider uppercase text-[11px]">
                  1. 상단 띠배너 공지 문구
                </h3>
                <div>
                  <label className="block text-brand-muted mb-1">공지 텍스트</label>
                  <input
                    type="text"
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted mb-1">프로모션 쿠폰 코드</label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                  />
                </div>
              </div>

              {/* 2. 메인 히어로 배너 */}
              <div className="space-y-3 p-4 bg-neutral-50 rounded-sm border border-brand-sandDark">
                <h3 className="font-semibold text-brand-dark tracking-wider uppercase text-[11px]">
                  2. 메인 히어로 배너 (Hero Section)
                </h3>
                <div>
                  <label className="block text-brand-muted mb-1">상단 영문 태그 뱃지</label>
                  <input
                    type="text"
                    value={heroTag}
                    onChange={(e) => setHeroTag(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted mb-1">메인 헤드라인 타이틀</label>
                  <textarea
                    rows={2}
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white font-serif text-sm"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted mb-1">서브 헤드라인 설명</label>
                  <textarea
                    rows={2}
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted mb-1">배경 이미지 URL (고해상도)</label>
                  <input
                    type="url"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-muted mb-1">주요 CTA 버튼 문구</label>
                    <input
                      type="text"
                      value={heroPrimaryCtaText}
                      onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-muted mb-1">보조 CTA 버튼 문구</label>
                    <input
                      type="text"
                      value={heroSecondaryCtaText}
                      onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. 메인 트렌딩 섹션 타이틀 설정 */}
              <div className="space-y-3 p-4 bg-neutral-50 rounded-sm border border-brand-sandDark">
                <h3 className="font-semibold text-brand-dark tracking-wider uppercase text-[11px]">
                  3. 메인 상품 진열 섹션 타이틀 & 설명
                </h3>
                <div>
                  <label className="block text-brand-muted mb-1">섹션 메인 제목</label>
                  <input
                    type="text"
                    value={trendingTitle}
                    onChange={(e) => setTrendingTitle(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted mb-1">섹션 보조 설명</label>
                  <input
                    type="text"
                    value={trendingSubtitle}
                    onChange={(e) => setTrendingSubtitle(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-white"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="md" className="flex items-center gap-1.5 uppercase tracking-wider text-xs">
                <Save className="w-4 h-4" />
                <span>배너 및 진열 설정 저장하기 (실시간 반영)</span>
              </Button>
            </form>
          </div>

          {/* 주요 상품 진열 관리 (Featured Products Manager) */}
          <div className="max-w-4xl bg-white border border-brand-sandDark rounded-sm p-6 sm:p-8 shadow-soft">
            <div className="border-b border-brand-sandDark pb-4 mb-5">
              <h2 className="text-base font-semibold text-brand-dark tracking-wider uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-peach" />
                <span>메인 화면 주요 상품 진열 관리</span>
              </h2>
              <p className="text-xs text-brand-muted mt-0.5">
                스위치를 켜면 메인 쇼핑몰 첫 화면 트렌딩 섹션에 노출되며, 끄면 카테고리 메뉴에서만 노출됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-3.5 border rounded-sm flex items-center justify-between gap-3 transition-colors ${
                    p.isFeatured !== false
                      ? 'border-brand-peach/60 bg-brand-sand/20'
                      : 'border-neutral-200 bg-neutral-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 aspect-[3/4] bg-neutral-100 rounded overflow-hidden shrink-0">
                      <Image src={p.images[0]} alt={p.nameKo} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase text-brand-muted block">{p.brand}</span>
                      <h4 className="text-xs font-medium text-brand-dark truncate">{p.nameKo}</h4>
                      <p className="text-[11px] font-semibold text-brand-dark mt-0.5">
                        ₩{p.priceKrw.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFeatured(p.id)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold shrink-0 transition-colors ${
                      p.isFeatured !== false
                        ? 'bg-brand-dark text-white'
                        : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                    }`}
                  >
                    {p.isFeatured !== false ? '진열 ON' : '진열 OFF'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 탭 3: 실시간 주문/배송 관리 ================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-brand-sandDark rounded-sm p-4 shadow-soft">
            <h2 className="text-sm font-semibold text-brand-dark tracking-wider uppercase mb-1">
              전체 고객 주문 목록 ({orders.length}건)
            </h2>
            <p className="text-xs text-brand-muted">
              주문 상태를 변경하면 해당 고객의 마이페이지에 실시간으로 반영됩니다.
            </p>
          </div>

          <div className="bg-white border border-brand-sandDark rounded-sm overflow-x-auto shadow-soft">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-brand-muted uppercase text-[10px] tracking-wider border-b border-brand-sandDark">
                <tr>
                  <th className="p-3.5">주문번호 / 일시</th>
                  <th className="p-3.5">주문자 이메일</th>
                  <th className="p-3.5">수령인 / 배송지</th>
                  <th className="p-3.5">주문 상품</th>
                  <th className="p-3.5">결제 금액</th>
                  <th className="p-3.5">결제 수단</th>
                  <th className="p-3.5">배송 상태 변경</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="p-3.5 font-medium text-brand-dark">
                      <span className="font-semibold block">{order.orderNumber}</span>
                      <span className="text-[10px] text-neutral-400 font-normal">{order.createdAt}</span>
                    </td>
                    <td className="p-3.5 text-neutral-600">{order.userEmail}</td>
                    <td className="p-3.5 max-w-xs">
                      <p className="font-medium text-brand-dark">{order.shipping.recipientName}</p>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {order.shipping.address} {order.shipping.detailAddress}
                      </p>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-brand-dark">
                        {order.items[0]?.product.nameKo}
                        {order.items.length > 1 && ` 외 ${order.items.length - 1}건`}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">
                        총 {order.items.reduce((acc, i) => acc + i.quantity, 0)}개
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-brand-dark">
                      ₩{order.totalKrw.toLocaleString()}
                    </td>
                    <td className="p-3.5 uppercase text-[11px] font-semibold text-neutral-600">
                      {order.paymentMethod}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs p-1.5 rounded font-semibold border focus:outline-none ${
                          order.status === '배송완료'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : order.status === '배송중'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : order.status === '배송준비중'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        <option value="결제완료">결제완료</option>
                        <option value="배송준비중">배송준비중</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                        <option value="주문취소">주문취소</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 상품 추가 / 수정 모달 ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white border border-brand-sandDark rounded-sm shadow-2xl p-6 sm:p-8 animate-fadeIn">
              <h2 className="text-base font-semibold text-brand-dark tracking-wider uppercase border-b border-brand-sandDark pb-3 mb-5">
                {editingProductId ? '상품 정보 수정' : '신규 상품 등록'}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">국문 상품명 *</label>
                    <input
                      type="text"
                      required
                      value={nameKo}
                      onChange={(e) => setNameKo(e.target.value)}
                      placeholder="예: 캐시미어 블레이저"
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">영문 상품명 *</label>
                    <input
                      type="text"
                      required
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="예: Cashmere Blazer"
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">브랜드명</label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">카테고리</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    >
                      <option value="fashion">여성 패션 (Fashion)</option>
                      <option value="beauty">K-뷰티 (Beauty)</option>
                      <option value="curation">큐레이션 (Curation)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">서브 카테고리</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value as SubCategoryType)}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    >
                      <option value="tops">상의 (Tops)</option>
                      <option value="outerwear">아우터 (Outerwear)</option>
                      <option value="bottoms">하의 (Bottoms)</option>
                      <option value="dresses">원피스 (Dresses)</option>
                      <option value="accessories">잡화 (Accessories)</option>
                      <option value="skincare">스킨케어 (Skincare)</option>
                      <option value="makeup">메이크업 (Makeup)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">가격 (KRW ₩) *</label>
                    <input
                      type="number"
                      required
                      value={priceKrw}
                      onChange={(e) => setPriceKrw(Number(e.target.value))}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">가격 (USD $) *</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={priceUsd}
                      onChange={(e) => setPriceUsd(Number(e.target.value))}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-muted mb-1 font-medium">재고 수량</label>
                    <input
                      type="number"
                      required
                      value={stockCount}
                      onChange={(e) => setStockCount(Number(e.target.value))}
                      className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-muted mb-1 font-medium">대표 이미지 URL *</label>
                  <input
                    type="url"
                    required
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-brand-muted mb-1 font-medium">보조 호버 이미지 URL</label>
                  <input
                    type="url"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    placeholder="마우스 호버 시 보여질 2번째 이미지"
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-brand-muted mb-1 font-medium">한줄 요약 (Short Description)</label>
                  <input
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-brand-muted mb-1 font-medium">상세 설명</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 border border-brand-sandDark rounded-sm bg-neutral-50"
                  />
                </div>

                {/* 뱃지 및 진열 옵션 */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded text-brand-dark"
                    />
                    <span className="font-semibold text-brand-dark">메인 화면 트렌딩 섹션에 진열</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBest}
                      onChange={(e) => setIsBest(e.target.checked)}
                      className="rounded text-brand-dark"
                    />
                    <span>BEST 뱃지</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                      className="rounded text-brand-dark"
                    />
                    <span>NEW 뱃지</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVegan}
                      onChange={(e) => setIsVegan(e.target.checked)}
                      className="rounded text-brand-dark"
                    />
                    <span>VEGAN 뱃지</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-brand-sandDark">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProductModalOpen(false)}
                  >
                    취소
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    {editingProductId ? '수정 완료' : '상품 등록'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

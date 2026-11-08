'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Search, ShoppingBag, User as UserIcon, Heart, Menu, X, ChevronDown, Package, LogOut, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { currentUser, isAuthenticated, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 외부 클릭 시 유저 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'ALL COLLECTIONS', href: '/#collections' },
    { label: 'FASHION', href: '/#fashion' },
    { label: 'K-BEAUTY', href: '/#beauty' },
    { label: 'LOOKBOOK', href: '/#lookbook' },
    { label: 'REVIEWS', href: '/#reviews' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-bg/95 backdrop-blur-md shadow-sm border-b border-brand-sandDark/50 py-3.5'
            : 'bg-brand-bg py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 모바일 햄버거 버튼 */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-1.5 -ml-1.5 text-brand-dark hover:text-brand-peach transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* 데스크톱 네비게이션 (좌측) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-medium tracking-[0.15em] text-brand-dark hover:text-brand-peach transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/admin"
              className="text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-brand-dark px-2 py-0.5 rounded bg-brand-sand border border-brand-sandDark/80 flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-peach" />
              <span>관리자 모드</span>
            </Link>
          </nav>

          {/* 중앙 로고 */}
          <div className="text-center">
            <Link href="/" className="group inline-block">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.18em] font-medium text-brand-dark group-hover:opacity-80 transition-opacity">
                DASASSO
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.35em] text-brand-muted uppercase font-sans -mt-1">
                SEOUL FLAGSHIP
              </span>
            </Link>
          </div>

          {/* 우측 유저 액션 툴 (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              aria-label="Search"
              className="hidden sm:inline-flex text-brand-dark hover:text-brand-peach transition-colors p-1"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* 회원/로그인 상태 UI & 드롭다운 */}
            <div className="relative" ref={dropdownRef}>
              {isAuthenticated && currentUser ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 text-xs font-medium text-brand-dark hover:text-brand-peach transition-colors p-1"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 text-xs font-medium text-brand-dark hover:text-brand-peach transition-colors p-1"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline tracking-wider">SIGN IN</span>
                </button>
              )}

              {/* 로그인 유저 드롭다운 메뉴 */}
              {userDropdownOpen && isAuthenticated && currentUser && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-brand-sandDark rounded-sm shadow-xl py-2 z-50 text-xs animate-fadeIn">
                  <div className="px-4 py-2 border-b border-brand-sandDark/60">
                    <p className="font-semibold text-brand-dark truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-brand-muted truncate">{currentUser.email}</p>
                  </div>

                  <Link
                    href="/mypage"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 hover:text-brand-peach transition-colors"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>마이페이지 (주문내역)</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 hover:text-brand-peach transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-peach" />
                    <span>관리자 대시보드</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors border-t border-brand-sandDark/60 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>로그아웃</span>
                  </button>
                </div>
              )}
            </div>

            <button
              aria-label="Wishlist"
              className="hidden sm:inline-flex text-brand-dark hover:text-brand-peach transition-colors p-1 relative"
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* 장바구니 트리거 (CRO: 실시간 카운트 배지) */}
            <button
              onClick={openCart}
              aria-label="Cart"
              className="flex items-center gap-2 p-1.5 text-brand-dark hover:text-brand-peach transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-peach text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-fadeIn">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:inline text-xs font-semibold tracking-wider">
                BAG ({totalItems})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 슬라이드 메뉴 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-brand-bg p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-sandDark">
                <span className="font-serif text-xl tracking-widest font-semibold text-brand-dark">
                  DASASSO
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-brand-dark"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 모바일 유저 상태 */}
              <div className="py-4 border-b border-brand-sandDark">
                {isAuthenticated && currentUser ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-brand-dark">{currentUser.name}님 환영합니다</p>
                    <div className="flex gap-2">
                      <Link
                        href="/mypage"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs px-2.5 py-1 bg-brand-sand text-brand-dark rounded"
                      >
                        마이페이지
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs px-2.5 py-1 bg-neutral-200 text-neutral-700 rounded"
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('login');
                      }}
                      className="text-xs font-medium px-3 py-1.5 bg-brand-dark text-white rounded"
                    >
                      로그인
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('signup');
                      }}
                      className="text-xs font-medium px-3 py-1.5 bg-brand-sand text-brand-dark rounded"
                    >
                      회원가입
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium tracking-widest text-brand-dark hover:text-brand-peach transition-colors py-1.5"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-widest text-brand-peach py-1.5 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>관리자 모드</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-sandDark text-xs text-brand-muted space-y-2">
              <p>Seoul Flagship • Worldwide Express</p>
              <p>© 2026 DASASSO. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

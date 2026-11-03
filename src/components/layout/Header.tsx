'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ALL COLLECTIONS', href: '#collections' },
    { label: 'FASHION', href: '#fashion' },
    { label: 'K-BEAUTY', href: '#beauty' },
    { label: 'LOOKBOOK', href: '#lookbook' },
    { label: 'REVIEWS', href: '#reviews' },
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

          {/* 우측 유저 액션 툴 (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              aria-label="Search"
              className="hidden sm:inline-flex text-brand-dark hover:text-brand-peach transition-colors p-1"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              aria-label="Account"
              className="hidden sm:inline-flex text-brand-dark hover:text-brand-peach transition-colors p-1"
            >
              <User className="w-4 h-4" />
            </button>

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

              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium tracking-widest text-brand-dark hover:text-brand-peach transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
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

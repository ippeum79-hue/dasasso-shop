'use client';

import React, { useState } from 'react';

interface NavbarProps {
  onOpenConsultModal?: () => void;
}

export default function Navbar({ onOpenConsultModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/images/golden-dolphin-icon.png" 
            alt="황금 돌고래 사주 로고" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight gold-gradient-text">
              황금 돌고래 사주
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase">
              Business & Destiny Consulting
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-amber-400 transition-colors">서비스 안내</a>
          <a href="#why-us" className="hover:text-amber-400 transition-colors">왜 황금돌고래인가</a>
          <a href="#portfolio" className="hover:text-amber-400 transition-colors">상담 & 제작사례</a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">고객후기</a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">자주 묻는 질문</a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenConsultModal}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] hover:scale-105 transition-all duration-300"
          >
            무료 진단 & 상담예약
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1424] border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-base font-medium text-slate-200">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">서비스 안내</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">왜 황금돌고래인가</a>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">상담 & 제작사례</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">고객후기</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">자주 묻는 질문</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenConsultModal) onOpenConsultModal();
            }}
            className="w-full mt-2 py-3 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-center"
          >
            무료 진단 & 1:1 상담 예약
          </button>
        </div>
      )}
    </header>
  );
}

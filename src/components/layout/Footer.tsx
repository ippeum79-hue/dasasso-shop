'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 mt-20 border-t border-neutral-800">
      {/* 4대 브랜드 신뢰 약속 배너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-neutral-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-brand-peach shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase">100% AUTHENTIC</h4>
              <p className="text-[11px] text-neutral-400 mt-1">엄선된 서울 본사 정품 인증 보증</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Truck className="w-6 h-6 text-brand-peach shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase">GLOBAL EXPRESS</h4>
              <p className="text-[11px] text-neutral-400 mt-1">전 세계 40여 개국 신속 안심 배송</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <RotateCcw className="w-6 h-6 text-brand-peach shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase">EASY EXCHANGE</h4>
              <p className="text-[11px] text-neutral-400 mt-1">간편하고 신속한 교환 및 반품 절차</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Headphones className="w-6 h-6 text-brand-peach shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase">VIP CONCIERGE</h4>
              <p className="text-[11px] text-neutral-400 mt-1">전문 스타일리스트 실시간 상담</p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 푸터 정보 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* 브랜드 소개 */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-serif text-3xl tracking-[0.18em] font-medium block">
            DASASSO
          </span>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            다사쏘(DASASSO)는 지금 가장 동시대적인 서울의 감각과 엄선된 K-글로우 뷰티를 제안하는 글로벌 플래그십 셀렉트 샵입니다.
          </p>
          <div className="text-[11px] text-neutral-500 pt-2 space-y-1">
            <p>DASASSO Flagship Store • Gangnam-gu, Seoul, Korea</p>
            <p>CS: support@dasasso.com | +82 (0)2-1588-0000</p>
          </div>
        </div>

        {/* 퀵 링크 */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="text-xs font-semibold tracking-widest uppercase text-neutral-300">EXPLORE</h5>
          <ul className="text-xs text-neutral-400 space-y-2">
            <li><a href="#fashion" className="hover:text-white transition-colors">Seoul Fashion</a></li>
            <li><a href="#beauty" className="hover:text-white transition-colors">Glass Skin Routine</a></li>
            <li><a href="#lookbook" className="hover:text-white transition-colors">Weekly Lookbook</a></li>
            <li><a href="#reviews" className="hover:text-white transition-colors">Global Reviews</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h5 className="text-xs font-semibold tracking-widest uppercase text-neutral-300">CUSTOMER CARE</h5>
          <ul className="text-xs text-neutral-400 space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Duties</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* 뉴스레터 구독 */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="text-xs font-semibold tracking-widest uppercase text-neutral-300">NEWSLETTER</h5>
          <p className="text-xs text-neutral-400">
            신규 컬렉션과 프라이빗 10% 시크릿 할인 코드를 받아보세요.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('뉴스레터 구독이 완료되었습니다. 웰컴 코드가 메일로 발송되었습니다!');
            }}
            className="flex items-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="bg-neutral-900 border border-neutral-700 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 rounded-l-sm focus:outline-none focus:border-brand-peach flex-1"
            />
            <button
              type="submit"
              className="bg-brand-peach hover:bg-[#D0694E] px-4 py-2.5 text-xs font-semibold rounded-r-sm transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 카피라이트 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 DASASSO Co., Ltd. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
          <a href="#" className="hover:text-neutral-400">Global Shipping Guide</a>
        </div>
      </div>
    </footer>
  );
};

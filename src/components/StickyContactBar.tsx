'use client';

import React from 'react';

interface StickyContactBarProps {
  onOpenConsultModal: () => void;
}

export default function StickyContactBar({ onOpenConsultModal }: StickyContactBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-t border-amber-400/30 px-4 py-3 sm:py-3.5 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left message (desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <img 
            src="/images/golden-dolphin-icon.png" 
            alt="돌고래" 
            className="w-7 h-7 object-contain drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]"
          />
          <div>
            <span className="text-xs font-bold text-amber-300">황금 돌고래 사주</span>
            <span className="text-xs text-slate-300 ml-2">비즈니스 운명학 & 웹/블로그 토탈 솔루션</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href="https://pf.kakao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] flex items-center justify-center gap-1.5 shadow"
          >
            <span>💬 카톡 간편 문의</span>
          </a>

          <button
            onClick={onOpenConsultModal}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:scale-102 transition-transform flex items-center justify-center gap-1.5"
          >
            <span>🐬 1:1 상담 예약하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

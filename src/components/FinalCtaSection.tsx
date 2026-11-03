'use client';

import React from 'react';

interface FinalCtaSectionProps {
  onOpenConsultModal?: () => void;
}

export default function FinalCtaSection({ onOpenConsultModal }: FinalCtaSectionProps) {
  return (
    <section className="py-24 bg-[#070b14] relative overflow-hidden">
      {/* AI Generated Dark Luxury Gold Ribbon Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/bg-final-luxury-gold.jpg"
          alt="3D 골드 리본 럭셔리 배경"
          className="w-full h-full object-cover opacity-25 filter brightness-85 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#070b14]/70 to-[#070b14]"></div>
      </div>

      {/* Center Golden Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-semibold mb-6 animate-pulse backdrop-blur-md">
          <span>⚡ 현재 이번 달 올인원 패키지 잔여 2자리</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
          "흐름을 알면 두렵지 않고,<br />
          준비된 자에게 <span className="gold-gradient-text gold-text-glow">성공은 필연입니다."</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          망설이는 하루 동안에도 기회의 시간은 흘러갑니다.<br className="hidden sm:inline" />
          황금 돌고래와 함께 당신의 인생과 비즈니스의 확실한 도약을 시작하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultModal}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:shadow-[0_0_45px_rgba(245,158,11,0.9)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🐬 1:1 심층 상담 & 견적 신청하기</span>
            <span>→</span>
          </button>

          <a
            href="https://pf.kakao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base sm:text-lg bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
          >
            <span>💬 카카오톡 1초 간편 문의</span>
          </a>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          * 1:1 상담 및 맞춤형 제작 퀄리티 유지를 위해 매월 한정 인원으로만 운영됩니다.
        </p>
      </div>
    </section>
  );
}

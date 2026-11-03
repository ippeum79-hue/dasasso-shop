'use client';

import React from 'react';
import { SITE_CONFIG } from '../data/content';
import { AetherFlow } from './ui/aether-flow';

interface HeroSectionProps {
  onOpenConsultModal?: () => void;
  onOpenDiagnosis?: () => void;
}

export default function HeroSection({ onOpenConsultModal, onOpenDiagnosis }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-universe.png" 
          alt="신비로운 우주 배경" 
          className="w-full h-full object-cover opacity-30 filter brightness-75 scale-105 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-[#070b14]/85 to-[#070b14]"></div>
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Aether Flow Hero Canvas Particle Network Layer */}
      <AetherFlow
        className="absolute inset-0 z-[1] pointer-events-auto"
        particleCount={80}
        particleColors={['#f59e0b', '#fbbf24', '#fde68a', '#14b8a6', '#6ee7b7']}
        lineColor="rgba(245, 158, 11, "
        maxDistance={125}
        mouseRadius={180}
        speed={0.65}
        interactive={true}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-auto">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6 animate-fade-in shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>운명을 읽고, 성공을 설계하는 비즈니스 운명학 연구소</span>
        </div>

        {/* Center Golden Dolphin Icon */}
        <div className="mb-6 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <img 
            src="/images/golden-dolphin-icon.png" 
            alt="황금 돌고래" 
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain relative z-10 animate-float drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight mb-6">
          당신의 <span className="gold-gradient-text gold-text-glow">길(運)</span>을 열고,<br className="hidden sm:inline" />
          세상과 연결되는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-300 to-teal-400">문(Web)</span>을 만듭니다.
        </h1>

        {/* Subcopy */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          사주로 타고난 기운과 최적의 타이밍을 명쾌하게 짚어내고,<br className="hidden sm:inline" />
          전환율 높은 <strong className="text-amber-300 font-semibold">홈페이지와 블로그</strong>로 당신의 가치를 현실의 부(富)로 증명하세요.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onOpenConsultModal}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>🐬 1:1 심층 상담 & 프로젝트 예약</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={onOpenDiagnosis}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-base sm:text-lg glass-card hover:bg-slate-800/80 text-amber-200 border border-amber-400/30 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>🔮 30초 내 사주 & 비즈니스 간이 진단</span>
          </button>
        </div>

        {/* Social Proof Stats */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-6 border-t border-white/10">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-md hover:border-amber-400/30 transition-colors">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

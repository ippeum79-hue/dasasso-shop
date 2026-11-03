'use client';

import React from 'react';

export default function SolutionSection() {
  const pillars = [
    {
      num: '01',
      title: '명쾌한 운명 분석 (Timing & Nature)',
      subtitle: '언제 치고 나가야 하는가?',
      desc: '타고난 사주오행, 재물운의 흐름, 귀인운을 분석하여 당신에게 가장 적합한 비즈니스 형태와 승부처가 될 최적의 타이밍을 명확히 짚어냅니다.',
      tag: '정통 명리학 기반 심층 컨설팅'
    },
    {
      num: '02',
      title: '전환 중심 웹 구축 (High-Converting Web)',
      subtitle: '어떻게 고객을 설득하는가?',
      desc: '화려하기만 한 껍데기가 아닙니다. 고객의 결핍을 찌르고 지갑을 열게 만드는 심리 카피라이팅과 Next.js 기반의 초고속 반응형 웹을 구현합니다.',
      tag: 'Next.js & 테크니컬 SEO'
    },
    {
      num: '03',
      title: '검색을 지배하는 블로그 (Traffic Pipeline)',
      subtitle: '어떻게 잠재 고객을 모으는가?',
      desc: '네이버 상위 노출 알고리즘과 구매 심리를 꿰뚫는 홈페이지형 블로그 디자인 및 전략 포스팅으로 매일 문의가 쏟아지는 자산형 파이프라인을 구축합니다.',
      tag: '상위 노출 & 스토리텔링 브랜딩'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#070b14] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="/images/tarot-cards-bg.png" 
          alt="타로 및 사주 배경" 
          className="w-full h-full object-cover filter blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            The Golden Dolphin Solution
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
            운(運)을 아는 자는 타이밍을 잡고,<br className="hidden sm:inline" />
            도구(Web)를 가진 자는 <span className="gold-gradient-text">부(富)를 완성합니다.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            점만 보고 끝나는 사주, 카피라이팅 없는 템플릿 웹사이트와는 근본부터 다릅니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-8 border border-white/10 hover:border-amber-400/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-amber-400/90 font-mono">
                    {item.num}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-amber-200 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-amber-300 mb-4">
                  {item.subtitle}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <span>핵심 시너지 적용 완료</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

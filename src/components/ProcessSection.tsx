'use client';

import React from 'react';

export default function ProcessSection() {
  const steps = [
    {
      num: 'STEP 01',
      title: '1:1 심층 인터뷰 & 사주 진단',
      desc: '현재의 고민, 사업 현황, 선천적 기운과 대운의 흐름을 다각도로 정밀 진단합니다.',
      icon: '🔎'
    },
    {
      num: 'STEP 02',
      title: '브랜드 전략 & 킬러 카피 기획',
      desc: '대표님의 기운에 맞는 브랜딩 톤과 고객의 지갑을 여는 설득 구조 및 카피를 도출합니다.',
      icon: '✍️'
    },
    {
      num: 'STEP 03',
      title: '감각적 디자인 & 고전환 개발',
      desc: 'Next.js & Tailwind 기반 초고속 웹페이지와 고품질 블로그 스킨 및 포스팅을 제작합니다.',
      icon: '💻'
    },
    {
      num: 'STEP 04',
      title: '런칭 & 고객 유입 최적화',
      desc: '검색 엔진(SEO) 등록 및 실시간 상담 동선 최종 점검 후 지속 가능한 운영 가이드를 제공합니다.',
      icon: '🚀'
    }
  ];

  return (
    <section className="py-24 bg-[#070b14] relative overflow-hidden">
      {/* AI Generated Dark Process Dataflow Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/bg-process-dataflow.jpg"
          alt="황금 데이터 플로우 배경"
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#070b14]/75 to-[#070b14]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            Work Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            실패 없는 <span className="gold-gradient-text">4단계 진행 프로세스</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            처음 접하시는 분도 안심하고 결과를 믿을 수 있도록 모든 과정을 투명하게 공유합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 hover:-translate-y-1 transition-all flex flex-col justify-between backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-black text-amber-400 font-mono tracking-wider">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';

export default function PainPointSection() {
  const painPoints = [
    {
      step: '01',
      title: '방향성의 혼란과 불안',
      quote: '"지금 이 사업/이직을 해도 될까? 내 대운과 재물운은 언제 터질까?"',
      desc: '열심히 달리고 있지만, 지금이 과감히 베팅할 타이밍인지 숨을 고를 때인지 몰라 매일 밤 잠 못 이루는 분',
      icon: '🧭'
    },
    {
      step: '02',
      title: '마케팅과 유입의 한계',
      quote: '"실력은 정말 자신 있는데, 왜 홈페이지와 블로그에서 문의가 안 들어올까?"',
      desc: '비싼 돈 주고 홈페이지를 만들었지만 한 달에 문의 1건도 없는 예쁜 장식품에 그쳐 속이 타들어가는 분',
      icon: '📉'
    },
    {
      step: '03',
      title: '비효율적인 분산과 피로',
      quote: '"사주 따로 보고, 웹 개발 외주 맡기고, 블로그 대행 따로... 언제 다 맞추죠?"',
      desc: '내 고유한 가치와 스토리를 온전히 이해하고, 매출이 일어나는 동선까지 통째로 책임져 줄 파트너가 절실한 분',
      icon: '⚡'
    }
  ];

  return (
    <section className="py-24 bg-[#070b14] relative overflow-hidden">
      {/* AI Generated Dark Silk Wave Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/bg-dark-silk-wave.jpg"
          alt="3D 다크 실크 웨이브 텍스처"
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-transparent to-[#070b14] opacity-90"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-sm font-bold tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            Pain Points
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-3 text-white">
            혹시 지금 이런 벽에 부딪혀 계신가요?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            방향을 모르면 에너지가 낭비되고, 도구가 없으면 기회를 놓칩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-7 relative overflow-hidden group hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 p-5 text-4xl font-black text-white/5 group-hover:text-amber-500/10 transition-colors">
                {item.step}
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <blockquote className="text-sm font-semibold text-amber-300/90 mb-4 bg-amber-500/5 p-3 rounded-lg border-l-2 border-amber-400">
                  {item.quote}
                </blockquote>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

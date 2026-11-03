'use client';

import React, { useState } from 'react';

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'saju' | 'web'>('all');

  const items = [
    {
      type: 'saju',
      category: '정통 사주 분석 리포트',
      title: '사주 원국 및 대운 세부 풀이',
      desc: '의뢰인의 선천적 오행과 10년 단위 대운 흐름을 시각적으로 알기 쉽게 해설',
      imgSrc: '/images/사주풀이.JPG'
    },
    {
      type: 'saju',
      category: '성향 & 운명 진단',
      title: '개인 맞춤형 성향과 운명 리포트',
      desc: '사업 파트너십, 재물운의 크기 및 적성 분석으로 시행착오를 원천 차단',
      imgSrc: '/images/성향과운명.JPG'
    },
    {
      type: 'saju',
      category: '테마별 집중 상담',
      title: '하반기 운세·재물성공운·취업이직운',
      desc: '현재 가장 시급한 현실의 결정을 위한 타이밍 맞춤 상담',
      imgSrc: '/images/하반기운세.재물성공운.애정운.취업이직운.JPG'
    },
    {
      type: 'web',
      category: '웹사이트 구축 사례',
      title: '고전환 반응형 메인 브랜딩 페이지',
      desc: '모바일 및 PC 최적화, 방문자가 망설임 없이 상담 신청으로 이어지는 동선',
      imgSrc: '/images/홈.JPG'
    },
    {
      type: 'web',
      category: '블로그 브랜딩 & 디자인',
      title: '전문가 프리미엄 블로그 스킨',
      desc: '첫인상에서 신뢰를 심어주는 상단 풀와이드 비주얼 및 위젯 설계',
      imgSrc: '/images/1.JPG'
    },
    {
      type: 'web',
      category: '타깃 콘텐츠 포스팅',
      title: '상위 노출 & 구매 전환 스토리텔링',
      desc: '검색 엔진 알고리즘에 최적화된 고품질 지식/후기형 포스팅',
      imgSrc: '/images/2.JPG'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.type === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-[#070b14] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            Portfolio & Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            실제 상담 리포트 & <span className="gold-gradient-text">브랜딩 제작 사례</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            황금 돌고래가 증명해 온 고품질 결과물들을 직접 눈으로 확인해 보세요.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => setActiveTab('saju')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'saju'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              사주 분석 리포트
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'web'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              웹 & 블로그 제작사례
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden flex items-center justify-center">
                <img 
                  src={item.imgSrc} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80"></div>
                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

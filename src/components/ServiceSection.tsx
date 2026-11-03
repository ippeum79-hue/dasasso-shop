'use client';

import React from 'react';
import { SERVICES, ServiceItem } from '../data/content';

interface ServiceSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export default function ServiceSection({ onSelectService }: ServiceSectionProps) {
  return (
    <section id="services" className="py-24 bg-[#090e1a] relative overflow-hidden">
      {/* AI Generated Dark Marketing Network Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/bg-marketing-network.jpg"
          alt="마케팅 데이터 네트워크 배경"
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090e1a] via-[#090e1a]/80 to-[#090e1a]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            필요에 맞게 선택하는 <span className="gold-gradient-text">맞춤 솔루션</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            단독 서비스 의뢰부터 완벽한 비즈니스 올인원 세팅까지 투명하고 전문적으로 지원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const isPopular = service.isPopular;
            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-md ${
                  isPopular
                    ? 'glass-card-gold border-amber-400/60 shadow-[0_15px_40px_rgba(245,158,11,0.2)] md:-translate-y-3'
                    : 'glass-card border-white/10 hover:border-amber-400/40 hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs tracking-wider shadow-lg whitespace-nowrap">
                    👑 BEST RECOMMEND
                  </div>
                )}

                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-400/20">
                      {service.badge}
                    </span>
                    {service.priceTag && (
                      <span className="text-xs font-semibold text-rose-400 animate-pulse">
                        {service.priceTag}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-extrabold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6 min-h-[40px] leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8 pt-4 border-t border-white/10">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="text-amber-400 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectService && onSelectService(service)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 text-center ${
                    isPopular
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-102'
                      : 'bg-white/5 hover:bg-amber-500/20 text-amber-200 border border-white/15 hover:border-amber-400/50'
                  }`}
                >
                  {service.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

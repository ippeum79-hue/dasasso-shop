'use client';

import React from 'react';
import { REVIEWS } from '../data/content';

export default function ReviewSection() {
  return (
    <section id="reviews" className="py-24 bg-[#090e1a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            Real Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            결과로 증명하는 <span className="gold-gradient-text">고객 리얼 후기</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            실제 황금 돌고래와 함께 삶의 타이밍과 비즈니스를 바꾼 대표님들의 이야기입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 border border-white/10 hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-400/20">
                    {review.category}
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-slate-200 text-sm leading-relaxed mb-6 font-normal">
                  "{review.content}"
                </p>
              </div>

              {/* Author Info & Proven Result */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{review.name}</div>
                  <div className="text-xs text-slate-400">{review.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">실제 성과</div>
                  <div className="text-xs font-black text-amber-400">{review.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

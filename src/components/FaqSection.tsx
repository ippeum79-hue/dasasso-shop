'use client';

import React, { useState } from 'react';
import { FAQS } from '../data/content';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#090e1a] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            자주 묻는 <span className="gold-gradient-text">질문과 답변</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            궁금하신 점을 빠르게 해결해 드립니다. 추가 문의는 언제든 편하게 질문해 주세요.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:text-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-amber-400 text-lg font-black font-mono">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`}>
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5 bg-slate-900/40">
                    <div className="flex gap-3">
                      <span className="text-emerald-400 font-black font-mono">A.</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

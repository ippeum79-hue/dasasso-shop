'use client';

import React from 'react';
import { SITE_CONFIG } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-[#05080f] text-slate-400 py-12 pb-24 border-t border-white/5 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <img 
              src="/images/golden-dolphin-icon.png" 
              alt="황금 돌고래 사주" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-base font-extrabold text-white">황금 돌고래 사주</span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>상담시간: {SITE_CONFIG.contact.operatingHours}</span>
            <span>대표문의: {SITE_CONFIG.contact.phone}</span>
          </div>
        </div>

        <div className="space-y-1.5 text-slate-400 leading-relaxed pt-6 border-t border-white/5 text-[11px]">
          <p>상호명: 황금 돌고래 사주 | 대표자: 원장 | 사업자등록번호: 준비중</p>
          <p>통신판매업신고번호: 준비중 | 고객센터: 010-0000-0000 | 이메일: contact@goldendolphin.kr</p>
          <p className="text-slate-400 mt-3">
            면책고지: 본 사이트에서 제공하는 사주명리 상담은 학술적 통계와 해석에 기반한 조언이며, 최종적인 삶의 결정과 사업적 선택의 책임은 본인에게 있습니다.
          </p>
          <p className="text-slate-400 mt-2">
            © 2026 황금 돌고래 사주. All rights reserved. Powered by Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

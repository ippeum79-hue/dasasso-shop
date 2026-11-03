'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Sparkles } from 'lucide-react';

export const TopBanner: React.FC = () => {
  const { currency, setCurrency } = useCart();

  return (
    <div className="w-full bg-brand-dark text-white text-[11px] sm:text-xs tracking-wider py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 좌측: 긴급 혜택 공지 */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex items-center gap-1 text-brand-glow font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            GLOBAL LAUNCH
          </span>
          <span className="hidden md:inline text-neutral-300">|</span>
          <span className="text-neutral-200">
            첫 구매 고객 전원 10% 웰컴 쿠폰 <span className="font-semibold text-white">[WELCOME10]</span>
          </span>
          <span className="hidden lg:inline text-neutral-400">
            • {currency === 'USD' ? 'Free shipping over $60' : '70,000원 이상 무료배송'}
          </span>
        </div>

        {/* 우측: 통화 스위처 */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-neutral-400 hidden sm:inline">CURRENCY:</span>
            <button
              onClick={() => setCurrency('KRW')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                currency === 'KRW'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              KRW (₩)
            </button>
            <span className="text-neutral-600">/</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                currency === 'USD'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

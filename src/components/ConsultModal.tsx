'use client';

import React, { useState } from 'react';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialConcern?: string;
  initialName?: string;
}

export default function ConsultModal({
  isOpen,
  onClose,
  initialService,
  initialConcern,
  initialName
}: ConsultModalProps) {
  const [name, setName] = useState(initialName || '');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || '올인원 성공 비즈니스 패키지');
  const [message, setMessage] = useState(initialConcern ? `[무료 진단 연계 문의]\n고민 분야: ${initialConcern}` : '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-3xl border border-amber-400/50 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-2xl">🐬</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                황금 돌고래 <span className="gold-gradient-text">1:1 맞춤 상담 신청</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                빠르고 정확한 상담을 위해 기본 정보를 남겨주시면 원장이 직접 확인 후 연락드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">성함 / 상호명 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 김민지 / 힐링연구소"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">연락처 *</label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">희망 서비스 선택 *</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="올인원 성공 비즈니스 패키지">★ [올인원] 사주 컨설팅 + 웹제작 + 블로그 세팅</option>
                  <option value="황금 돌고래 프리미엄 사주">황금 돌고래 1:1 심층 사주 상담 (사업/재물/인생)</option>
                  <option value="고전환 맞춤형 홈페이지 제작">고전환 반응형 홈페이지 구축 (Next.js)</option>
                  <option value="블로그 디자인 & 타깃 포스팅">블로그 홈페이지형 디자인 & 상위노출 포스팅 대행</option>
                  <option value="기타 맞춤 견적 문의">기타 맞춤 브랜딩 상담</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">문의 내용 및 현재 상황</label>
                <textarea
                  rows={3}
                  placeholder="생년월일(사주 상담 시)이나 현재 준비 중인 비즈니스 형태, 궁금한 점을 적어주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>🔒 개인정보는 오직 상담 예약 및 안내 목적으로만 안전하게 취급됩니다.</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-102 transition-transform"
              >
                상담 예약 신청서 전송하기
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-3xl flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-2xl font-black text-white mb-2">상담 신청이 접수되었습니다!</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              <strong className="text-amber-400">{name}</strong> 님, 남겨주신 연락처(<span className="text-white">{phone}</span>)로 
              빠른 시간 내에 원장이 직접 사전 검토 후 연락드리겠습니다.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

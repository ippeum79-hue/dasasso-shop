'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { X, Mail, Lock, User as UserIcon, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleClose = () => {
    resetForm();
    closeAuthModal();
  };

  const handleTabChange = (mode: 'login' | 'signup') => {
    resetForm();
    openAuthModal(mode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (authModalMode === 'login') {
      const res = await login(email, password);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
        setTimeout(handleClose, 800);
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('이름을 입력해 주세요.');
        setLoading(false);
        return;
      }
      const res = await signup({ email, password, name, phone });
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
        setTimeout(handleClose, 1000);
      }
    }
  };

  // 1초 데모 계정 간편 로그인
  const handleQuickDemoLogin = async () => {
    setLoading(true);
    const res = await login('seoul.shopper@dasasso.com', 'password123');
    setLoading(false);
    if (res.success) {
      setSuccessMsg('VIP 체험 계정으로 로그인되었습니다.');
      setTimeout(handleClose, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl p-6 sm:p-8 animate-fadeIn border border-brand-sandDark">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-1 rounded-full text-brand-muted hover:text-brand-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 브랜드 헤더 */}
          <div className="text-center mb-6">
            <span className="font-serif text-2xl tracking-[0.2em] font-medium text-brand-dark block">
              DASASSO
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-brand-muted font-sans">
              MEMBERSHIP CLUB
            </span>
          </div>

          {/* 로그인 / 회원가입 탭 */}
          <div className="flex border-b border-brand-sandDark mb-6">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 pb-3 text-xs tracking-wider uppercase font-medium transition-all ${
                authModalMode === 'login'
                  ? 'border-b-2 border-brand-dark text-brand-dark font-semibold'
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              로그인 (SIGN IN)
            </button>
            <button
              onClick={() => handleTabChange('signup')}
              className={`flex-1 pb-3 text-xs tracking-wider uppercase font-medium transition-all ${
                authModalMode === 'signup'
                  ? 'border-b-2 border-brand-dark text-brand-dark font-semibold'
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              회원가입 (CREATE ACCOUNT)
            </button>
          </div>

          {/* 에러 및 성공 피드백 메시지 */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-sm">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-brand-muted mb-1">
                    이름 (FULL NAME) *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-brand-sandDark rounded-sm focus:outline-none focus:border-brand-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-brand-muted mb-1">
                    연락처 (MOBILE PHONE)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-brand-sandDark rounded-sm focus:outline-none focus:border-brand-dark"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-brand-muted mb-1">
                이메일 (EMAIL ADDRESS) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-brand-sandDark rounded-sm focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-brand-muted mb-1">
                비밀번호 (PASSWORD) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-brand-sandDark rounded-sm focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={loading}
              className="mt-2 uppercase tracking-widest text-xs"
            >
              {authModalMode === 'login' ? '로그인하기' : '회원가입 완료 및 10% 쿠폰 받기'}
            </Button>
          </form>

          {/* 1초 데모 계정 체험 버튼 */}
          <div className="mt-6 pt-5 border-t border-brand-sandDark text-center">
            <button
              onClick={handleQuickDemoLogin}
              type="button"
              className="w-full py-2.5 px-3 bg-brand-sand/60 hover:bg-brand-sand text-brand-dark text-xs rounded-sm border border-brand-sandDark flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-peach" />
              <span>체험용 VIP 계정으로 1초 로그인 (테스트용)</span>
            </button>
            <p className="text-[10px] text-brand-muted mt-2">
              클릭 시 등록된 VIP 회원(주문 내역 포함)으로 즉시 로그인됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

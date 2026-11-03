'use client';

import React, { useState } from 'react';

interface SajuCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToConsult: (data: { name: string; concern: string; birth: string }) => void;
}

export default function SajuCalculatorModal({
  isOpen,
  onClose,
  onProceedToConsult
}: SajuCalculatorModalProps) {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar');
  const [birthYear, setBirthYear] = useState('1990');
  const [birthMonth, setBirthMonth] = useState('5');
  const [birthDay, setBirthDay] = useState('15');
  const [concern, setConcern] = useState('사업운 & 재물운');
  const [resultData, setResultData] = useState<{
    element: string;
    elementColor: string;
    keyword: string;
    analysis: string;
    businessTip: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Five elements simple calculation based on birth year last digit
    const lastDigit = parseInt(birthYear.slice(-1), 10);
    const elementsMap: Record<number, { element: string; elementColor: string; keyword: string; analysis: string; businessTip: string }> = {
      0: { element: '금(金) - 백색 & 골드', elementColor: 'text-amber-300', keyword: '결단력과 결실', analysis: '타고난 분석력과 추진력이 뛰어나며, 완성도 높은 완벽주의 성향을 가집니다.', businessTip: '신뢰감을 주는 고급스러운 브랜딩과 명확한 수치/포트폴리오를 앞세운 홈페이지가 최적입니다.' },
      1: { element: '금(金) - 백색 & 골드', elementColor: 'text-amber-300', keyword: '냉철한 판단과 원칙', analysis: '정의롭고 명확한 선을 지키며, 디테일에 강해 실수를 용납하지 않는 장인 기운입니다.', businessTip: '체계적인 프로세스를 보여주는 블로그 포스팅과 전문성 있는 레이아웃이 고객을 끌어당깁니다.' },
      2: { element: '수(水) - 흑색 & 딥블루', elementColor: 'text-sky-400', keyword: '유연성과 지혜', analysis: '통찰력이 깊고 흐르는 물처럼 환경에 적응하는 능력이 탁월하며 지식 비즈니스에 강합니다.', businessTip: '스토리텔링 기반의 감성 카피라이팅과 고객의 공감을 이끌어내는 콘텐츠가 매출의 열쇠입니다.' },
      3: { element: '수(水) - 흑색 & 딥블루', elementColor: 'text-sky-400', keyword: '깊은 통찰과 직관', analysis: '상대방의 마음을 꿰뚫어 보는 직관이 발달해 상담·교육·컨설팅 분야에서 두각을 나타냅니다.', businessTip: '1:1 상담 예약 위주의 심플하고 품격 있는 미니멀 랜딩페이지가 전환율을 극대화합니다.' },
      4: { element: '목(木) - 청색 & 에메랄드', elementColor: 'text-emerald-400', keyword: '성장과 개척', analysis: '새로운 씨앗을 틔우고 뻗어나가는 생명력과 진취성이 넘치는 리더형 사주입니다.', businessTip: '새로운 트렌드를 선점하는 브랜드 메시지와 역동적인 비주얼의 웹사이트가 큰 운을 부릅니다.' },
      5: { element: '목(木) - 청색 & 에메랄드', elementColor: 'text-emerald-400', keyword: '유연한 확장과 번영', analysis: '대인관계가 원만하며 사람을 모으고 팀을 이끄는 매력적인 에너지를 보유하고 있습니다.', businessTip: '소통형 블로그 운영과 고객 후기가 돋보이는 커뮤니티형 웹사이트 구성이 최고의 궁합입니다.' },
      6: { element: '화(火) - 적색 & 퍼플', elementColor: 'text-rose-400', keyword: '열정과 확산', analysis: '태양처럼 밝고 자신을 세상에 드러내는 표현력이 뛰어나 마케팅과 미디어에 탁월합니다.', businessTip: '시각적 임팩트가 강한 영상/배너와 즉각적인 클릭을 부르는 화려한 랜딩페이지가 필수입니다.' },
      7: { element: '화(火) - 적색 & 퍼플', elementColor: 'text-rose-400', keyword: '영감과 빛', analysis: '순간적인 영감과 아이디어가 반짝이며, 트렌드를 빠르게 흡수하는 감각을 가졌습니다.', businessTip: '인스타그램·블로그 연동 및 차별화된 비주얼 디자인으로 브랜드를 즉시 각인시키세요.' },
      8: { element: '토(土) - 황색 & 브라운', elementColor: 'text-yellow-400', keyword: '포용과 신용', analysis: '대지처럼 묵직한 신용과 안정감을 주어 어떤 풍파에도 흔들리지 않는 든든한 사업가 기운입니다.', businessTip: '고객 신뢰도를 높여주는 안전장치(FAQ, 실제 후기, 사업자 정보)가 탄탄한 웹사이트가 최적입니다.' },
      9: { element: '토(土) - 황색 & 브라운', elementColor: 'text-yellow-400', keyword: '중용과 실속', analysis: '실속과 알짜배기를 챙기는 능력이 비범하며, 꾸준한 누적을 통해 거대한 부를 형성합니다.', businessTip: '키워드 상위 노출 블로그를 통해 장기적인 오가닉 검색 유입 파이프라인을 구축하세요.' }
    };

    setResultData(elementsMap[lastDigit] || elementsMap[0]);
    setStep('result');
  };

  const handleApply = () => {
    onProceedToConsult({
      name: name || '고객',
      concern,
      birth: `${birthYear}.${birthMonth}.${birthDay} (${calendarType})`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-3xl border border-amber-400/40 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          ✕
        </button>

        {step === 'form' ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-2xl">🔮</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                30초 무료 <span className="gold-gradient-text">사주 & 비즈니스 진단</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                기본 생년월일을 입력하시면 타고난 주 기운과 권장 브랜딩 방향을 도출해 드립니다.
              </p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">이름 또는 닉네임</label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">성별</label>
                  <div className="flex rounded-xl bg-slate-900/80 p-1 border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${gender === 'female' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      여성
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${gender === 'male' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      남성
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">양력 / 음력</label>
                  <div className="flex rounded-xl bg-slate-900/80 p-1 border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setCalendarType('solar')}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${calendarType === 'solar' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      양력
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalendarType('lunar')}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${calendarType === 'lunar' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      음력
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">생년월일</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="년 (1990)"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm text-center focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    placeholder="월"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm text-center focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    placeholder="일"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm text-center focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">가장 풀고 싶은 핵심 고민</label>
                <select
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="사업운 & 재물운 (타이밍 진단)">사업운 & 재물운 (타이밍 진단)</option>
                  <option value="온라인 홈페이지 & 블로그 전환율 개선">온라인 홈페이지 & 블로그 전환율 개선</option>
                  <option value="1인 창업 & 비즈니스 브랜딩 패키지">1인 창업 & 비즈니스 브랜딩 패키지</option>
                  <option value="취업, 이직 및 직무 적성">취업, 이직 및 직무 적성</option>
                  <option value="대인관계 및 동업 궁합">대인관계 및 동업 궁합</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all"
              >
                🔮 지금 바로 분석 결과 보기
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <span className="text-3xl">✨</span>
            <h3 className="text-xl font-extrabold text-white mt-2">
              <span className="text-amber-400">{name || '고객'}</span> 님의 오행 분석 결과
            </h3>

            {resultData && (
              <div className="mt-5 text-left space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                  <div className="text-xs text-amber-300 font-semibold mb-1">핵심 오행 에너지</div>
                  <div className={`text-lg font-black ${resultData.elementColor}`}>
                    {resultData.element}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    키워드: <strong className="text-white">{resultData.keyword}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                  <div>
                    <span className="text-amber-400 font-bold">▶ 기운 분석: </span>
                    {resultData.analysis}
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold">▶ 비즈니스 성공 전략: </span>
                    {resultData.businessTip}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 text-[11px] text-slate-400 text-center border border-white/5">
                  ※ 위 내용은 연도 기반 간이 오행 풀이이며, 태어난 '시(時)'와 정밀 사주원국에 따른 심층 진단은 1:1 상담에서 완성됩니다.
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={handleApply}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-102 transition-transform"
              >
                🐬 이 결과 바탕으로 1:1 심층 상담 예약하기
              </button>
              <button
                onClick={() => setStep('form')}
                className="py-2 text-xs text-slate-400 hover:text-white"
              >
                ← 다시 계산하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

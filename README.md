# 🛍️ DASASSO (다사쏘) - Flagship Store

> **"Effortless Chic, Unfiltered Glow"**  
> 감각적인 동시대 서울의 일상 패션과 K-글로우 뷰티를 제안하는 글로벌 플래그십 이커머스 스토어

---

## 🌟 주요 특징 (Key Features)

- **🎨 High-End Visual Mood**: Warm Minimal Modernism 디자인 시스템 (Tailwind CSS 커스텀 컬러 및 에디토리얼 비율 3:4 적용)
- **🌍 Global Ready**: 원클릭 통화 스위처 (KRW ₩ ↔ USD $) 실시간 가격 및 배송료 자동 재계산
- **🛒 CRO 최적화 장바구니 드로어 (Slide-over Cart Drawer)**:
  - 페이지 이동 없는 원터치 'QUICK ADD'
  - 무료 배송 잔여 금액 실시간 프로그레스 바
  - 원클릭 수량 조절 및 즉시 체크아웃
- **👗 Shop The Look (Lookbook Curation)**: 에디터 추천 착장 세트를 한 번에 장바구니에 담는 일괄 담기 기능
- **✨ K-Beauty 3-Step Routine**: 토너 패드 ➔ 히알루론 세럼 ➔ 선 에센스로 이어지는 스텝형 큐레이션
- **💬 Social Proof**: 글로벌 실구매자 평점 4.9★ 포토 리뷰 섹션

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API (Cart & Currency state with LocalStorage persistence)
- **Deployment**: Vercel ready

---

## 🚀 시작하기 (Getting Started)

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 브라우저 접속
# http://localhost:3000
```

---

## 📁 디렉터리 구조 (Directory Structure)

```
src/
├── app/
│   ├── globals.css              # 커스텀 폰트 & 스크롤바 스타일링
│   ├── layout.tsx               # 글로벌 레이아웃 & Context Provider
│   └── page.tsx                 # 메인 플래그십 쇼룸 페이지
├── components/
│   ├── cart/                    # CartDrawer (슬라이드 장바구니)
│   ├── layout/                  # Header, TopBanner, Footer
│   └── ui/                      # ProductCard, Button, Badge
├── context/                     # CartContext (글로벌 상태)
├── data/                        # mockProducts, lookbook, reviews
├── lib/                         # currency formatter & utils
└── types/                       # TypeScript 타입 인터페이스
```

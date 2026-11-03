/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF8F5',         // 따뜻한 캔버스 오프화이트
          surface: '#FFFFFF',    // 카드/패널 서피스 화이트
          sand: '#F2EDE4',       // 웜 샌드 베이지 (구분선, 배경 서브)
          sandDark: '#E4DCD0',   // 보더 및 라인
          dark: '#141414',       // 메인 타이포그래피 (소프트 딥블랙)
          charcoal: '#2B2B2B',   // 서브 타이포
          muted: '#737373',      // 부가 설명 및 메타 텍스트
          lightMuted: '#A3A3A3', // 비활성화/보조 텍스트
          peach: '#E07A5F',      // 시그니처 테라코타 피치 (패션 포인트 & 뱃지)
          rose: '#DDA196',       // 뮤트 로즈 (K-뷰티 립&치크 톤)
          glow: '#E9C46A',       // 샴페인 글로우 (하이라이터/베스트 뱃지)
          sage: '#8F9E8B',       // 소프트 세이지 (비건/클린뷰티 뱃지)
          alert: '#D62828',      // 긴급/품절임박 알림
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Didot', 'Georgia', 'serif'],
        sans: ['var(--font-pretendard)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      aspectRatio: {
        'fashion': '3 / 4',     // 하이엔드 룩북 및 패션 카드 표준 비율
        'banner': '16 / 9',
        'square': '1 / 1',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'lift': '0 14px 40px rgba(0, 0, 0, 0.08)',
        'drawer': '-10px 0 40px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        fadeIn: 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideLeft: 'slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

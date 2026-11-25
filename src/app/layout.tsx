import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { OrderProvider } from '@/context/OrderContext';
import { StoreProvider } from '@/context/StoreContext';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wooselect.com'),
  title: '다사쏘 (DASASSO) - K-뷰티 공식 온라인 스토어 | 우셀렉트',
  description: '글로벌 K-뷰티 및 올리브영 인기 화장품 전문 스토어 다사쏘(DASASSO) 공식 홈페이지입니다.',
  keywords: ['DASASSO', '다사쏘', '우셀렉트', 'WooSelect', 'K뷰티', '화장품'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '다사쏘 (DASASSO) - K-뷰티 공식 온라인 스토어 | 우셀렉트',
    description: '글로벌 K-뷰티 및 올리브영 인기 화장품 전문 스토어 다사쏘(DASASSO) 공식 홈페이지입니다.',
    url: 'https://www.wooselect.com',
    siteName: '다사쏘 (DASASSO)',
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    other: {
      // 네이버 서치어드바이저 소유확인 메타 태그 (인증키를 발급받으신 경우 content 값을 교체해 주세요)
      'naver-site-verification': '네이버_서치어드바이저_인증키_입력',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* 네이버 서치어드바이저 소유확인 메타 태그 */}
        <meta name="naver-site-verification" content="네이버_서치어드바이저_인증키_입력" />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-dark antialiased">
        <StoreProvider>
          <AuthProvider>
            <OrderProvider>
              <CartProvider>
                <TopBanner />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <AuthModal />
              </CartProvider>
            </OrderProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

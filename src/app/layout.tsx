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
  title: 'DASASSO (다사쏘) | Effortless Chic & K-Glow Flagship',
  description: '동시대 서울의 감각적인 패션 룩과 엄선된 K-뷰티 글래스 스킨 에센셜. 글로벌 특송 및 전 상품 100% 정품 보증.',
  keywords: ['다사쏘', 'DASASSO', 'K-Fashion', 'K-Beauty', 'Glass Skin', '여성패션', '한국 뷰티', '역직구'],
  openGraph: {
    title: 'DASASSO | Seoul Fashion & K-Beauty Flagship',
    description: 'Effortless Chic, Unfiltered Glow. 당신의 일상을 빛낼 서울의 셀렉션.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'DASASSO',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
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

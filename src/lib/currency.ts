import { Currency } from '@/types';

export const FREE_SHIPPING_THRESHOLD_KRW = 70000;
export const FREE_SHIPPING_THRESHOLD_USD = 60;

export function formatPrice(amountKrw: number, amountUsd: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${amountUsd.toFixed(2)}`;
  }
  return `₩${amountKrw.toLocaleString('ko-KR')}`;
}

export function calculateShippingProgress(
  totalKrw: number,
  totalUsd: number,
  currency: Currency
): { progress: number; remainingText: string; isFree: boolean } {
  if (currency === 'USD') {
    const isFree = totalUsd >= FREE_SHIPPING_THRESHOLD_USD;
    const progress = Math.min(100, Math.round((totalUsd / FREE_SHIPPING_THRESHOLD_USD) * 100));
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - totalUsd);
    return {
      progress,
      remainingText: isFree ? '무료 배송 혜택 적용!' : `$${remaining.toFixed(2)} 더 담으면 무료 배송!`,
      isFree,
    };
  }

  const isFree = totalKrw >= FREE_SHIPPING_THRESHOLD_KRW;
  const progress = Math.min(100, Math.round((totalKrw / FREE_SHIPPING_THRESHOLD_KRW) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_KRW - totalKrw);
  return {
    progress,
    remainingText: isFree ? '무료 배송 혜택 적용!' : `${remaining.toLocaleString('ko-KR')}원 더 담으면 무료 배송!`,
    isFree,
  };
}

/**
 * DASASSO (다사쏘) 결제 시스템 PG사 연동 뼈대 모듈
 * 지원 PG사: 토스페이먼츠(Toss Payments), 포트원(PortOne / 구 아임포트)
 */

export interface PaymentRequestData {
  orderId: string;
  orderName: string;
  amount: number;
  currency: 'KRW' | 'USD';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  successUrl: string;
  failUrl: string;
}

/**
 * 1. 토스페이먼츠 (Toss Payments) 결제창 호출 뼈대
 * - 실제 사용 시: npm i @tosspayments/payment-sdk 또는 CDN 스크립트 로드
 * - 테스트 클라이언트 키: test_ck_...
 */
export async function requestTossPayment(
  data: PaymentRequestData,
  clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
): Promise<{ success: boolean; error?: string }> {
  console.log('[TossPayments] 결제 요청 시작:', {
    clientKey,
    amount: data.amount,
    orderId: data.orderId,
    orderName: data.orderName,
    customerName: data.customerName,
  });

  // 실제 SDK 로드 및 연동 예시:
  /*
  if (typeof window !== 'undefined' && (window as any).TossPayments) {
    const tossPayments = (window as any).TossPayments(clientKey);
    return tossPayments.requestPayment('카드', {
      amount: data.amount,
      orderId: data.orderId,
      orderName: data.orderName,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      successUrl: data.successUrl,
      failUrl: data.failUrl,
    });
  }
  */

  // 개발 및 시뮬레이션 모드: 1초 후 성공 응답
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true };
}

/**
 * 2. 포트원 / 아임포트 (PortOne) 결제창 호출 뼈대
 * - 카카오페이, 네이버페이, 페이코 및 일반 신용카드
 * - 실제 사용 시: CDN https://cdn.iamport.kr/v1/iamport.js 로드 후 window.IMP.request_pay()
 */
export async function requestPortOnePayment(
  data: PaymentRequestData,
  pgProvider: 'kakaopay' | 'naverpay' | 'html5_inicis' = 'kakaopay',
  userCode = 'imp00000000'
): Promise<{ success: boolean; error?: string }> {
  console.log('[PortOne] 결제 요청 시작:', {
    userCode,
    pg: pgProvider,
    pay_method: 'card',
    merchant_uid: data.orderId,
    name: data.orderName,
    amount: data.amount,
    buyer_name: data.customerName,
    buyer_email: data.customerEmail,
    buyer_tel: data.customerPhone,
  });

  // 실제 SDK 로드 및 연동 예시:
  /*
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).IMP) {
      const { IMP } = window as any;
      IMP.init(userCode);
      IMP.request_pay(
        {
          pg: pgProvider,
          pay_method: 'card',
          merchant_uid: data.orderId,
          name: data.orderName,
          amount: data.amount,
          buyer_name: data.customerName,
          buyer_email: data.customerEmail,
          buyer_tel: data.customerPhone,
        },
        (rsp: any) => {
          if (rsp.success) {
            resolve({ success: true });
          } else {
            resolve({ success: false, error: rsp.error_msg });
          }
        }
      );
    }
  });
  */

  // 개발 및 시뮬레이션 모드
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true };
}

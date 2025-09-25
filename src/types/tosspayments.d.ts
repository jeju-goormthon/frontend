// 토스페이먼츠 SDK 타입 정의

declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPaymentsInstance;
  }

  interface TossPaymentsInstance {
    requestPayment(
      paymentMethod: '카드' | 'CARD' | '계좌이체' | '휴대폰' | '상품권' | '간편결제' | '해외간편결제',
      paymentInfo: PaymentRequestOptions,
    ): Promise<void>;
    requestBillingAuth(paymentMethod: '카드' | 'CARD', billingInfo: BillingAuthOptions): Promise<void>;
  }

  interface PaymentRequestOptions {
    amount: number;
    orderId: string;
    orderName: string;
    customerName?: string;
    customerEmail?: string;
    customerMobilePhone?: string;
    successUrl: string;
    failUrl: string;
    currency?: string;
    country?: string;
    provider?: string;
    taxFreeAmount?: number;
    metadata?: Record<string, string>;
    flowMode?: 'DEFAULT' | 'DIRECT';
    easyPay?: 'TOSSPAY' | 'KAKAOPAY' | 'PAYCO' | 'NAVERPAY';
    cardCompany?: string;
  }

  interface BillingAuthOptions {
    customerKey: string;
    successUrl: string;
    failUrl: string;
    customerName?: string;
    customerEmail?: string;
  }
}

// TossPayments 전역 함수
declare const TossPayments: (clientKey: string) => TossPaymentsInstance;

export {};

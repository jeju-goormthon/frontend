import { HStack, Text, VStack } from '@vapor-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

interface PaymentError {
  code: string;
  message: string;
  orderId?: string;
}

export default function PaymentFailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentError, setPaymentError] = useState<PaymentError | null>(null);

  useEffect(() => {
    // URL 파라미터에서 오류 정보 추출
    const code = searchParams.get('code') || 'UNKNOWN_ERROR';
    const message = searchParams.get('message') || '결제 중 오류가 발생했습니다.';
    const orderId = searchParams.get('orderId') || undefined;

    setPaymentError({ code, message, orderId });
  }, [searchParams]);

  const handleRetryPayment = () => {
    // 결제 재시도 - 이전 노선 확인 페이지로 돌아가기
    navigate('/route/confirm');
  };

  const handleGoToRouteSelect = () => {
    // 노선 선택 페이지로 돌아가기
    navigate('/route');
  };

  const handleGoToHome = () => {
    // 홈으로 이동
    navigate('/');
  };

  const getErrorDisplayMessage = (code: string, message: string) => {
    // 사용자에게 보여줄 친화적인 오류 메시지
    switch (code) {
      case 'USER_CANCEL':
        return '결제가 취소되었습니다.';
      case 'INVALID_CARD':
        return '유효하지 않은 카드입니다. 다른 카드로 시도해주세요.';
      case 'INSUFFICIENT_FUNDS':
        return '잔액이 부족합니다. 다른 결제 수단을 이용해주세요.';
      case 'CARD_COMPANY_ERROR':
        return '카드사 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case 'INVALID_CARD_EXPIRY':
        return '카드 유효기간을 확인해주세요.';
      case 'INVALID_CARD_NUMBER':
        return '카드번호를 다시 확인해주세요.';
      case 'NETWORK_ERROR':
        return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
      case 'TIMEOUT':
        return '결제 시간이 초과되었습니다. 다시 시도해주세요.';
      default:
        return message || '결제 중 오류가 발생했습니다.';
    }
  };

  const isRetryable = (code: string) => {
    // 재시도 가능한 오류인지 확인
    const nonRetryableCodes = ['USER_CANCEL'];
    return !nonRetryableCodes.includes(code);
  };

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='결제 실패' />
      </div>

      <div className='flex flex-1 items-center justify-center px-6'>
        <VStack alignItems='center' className='gap-6' paddingY='$500'>
          {/* 실패 아이콘 */}
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-red-100'>
            <svg className='h-10 w-10 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path d='M6 18L18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
            </svg>
          </div>

          {/* 실패 메시지 */}
          <VStack alignItems='center' className='gap-2'>
            <Text className='text-center font-bold' foreground='normal' typography='heading3'>
              결제에 실패했습니다
            </Text>
            <Text className='text-center' foreground='muted' typography='body2'>
              {paymentError && getErrorDisplayMessage(paymentError.code, paymentError.message)}
            </Text>
          </VStack>

          {/* 오류 정보 (개발용) */}
          {paymentError && paymentError.orderId && (
            <VStack className='w-full gap-4 rounded-lg bg-gray-50 p-4'>
              <Text className='font-semibold' foreground='normal' typography='subtitle2'>
                오류 정보
              </Text>

              <VStack className='gap-2'>
                {paymentError.orderId && (
                  <HStack justifyContent='space-between'>
                    <Text foreground='muted' typography='body2'>
                      주문번호
                    </Text>
                    <Text className='font-mono text-sm' foreground='normal' typography='body2'>
                      {paymentError.orderId}
                    </Text>
                  </HStack>
                )}

                <HStack justifyContent='space-between'>
                  <Text foreground='muted' typography='body2'>
                    오류코드
                  </Text>
                  <Text className='font-mono text-sm' foreground='normal' typography='body2'>
                    {paymentError.code}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          )}
        </VStack>
      </div>

      {/* 하단 버튼 */}
      <div className='sticky bottom-0 z-50 border-t border-gray-100 bg-white px-6 pt-2.5 pb-12'>
        <VStack className='gap-3'>
          {paymentError && isRetryable(paymentError.code) && (
            <NavButton label='다시 결제하기' onClick={handleRetryPayment} />
          )}
          <NavButton
            label='노선 다시 선택하기'
            variant={paymentError && isRetryable(paymentError.code) ? 'secondary' : 'primary'}
            onClick={handleGoToRouteSelect}
          />
          <NavButton label='홈으로 가기' variant='secondary' onClick={handleGoToHome} />
        </VStack>
      </div>
    </div>
  );
}

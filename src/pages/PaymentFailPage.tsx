import { Text, VStack } from '@vapor-ui/core';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

export default function PaymentFailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  console.log('결제 실패:', { errorCode, errorMessage, orderId });

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  // 에러 메시지 변환
  const getDisplayMessage = (code: string | null, message: string | null) => {
    if (!code && !message) {
      return '알 수 없는 오류가 발생했습니다.';
    }

    // 자주 발생하는 에러 코드들에 대한 사용자 친화적 메시지
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '결제가 취소되었습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제가 중단되었습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다. 카드 상태를 확인해주세요.';
      case 'INVALID_CARD_EXPIRATION':
        return '카드 유효기간이 올바르지 않습니다.';
      case 'INVALID_STOPPED_CARD':
        return '정지된 카드입니다.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.';
      case 'NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_OR_MERCHANT':
        return '할부를 지원하지 않는 카드이거나 가맹점입니다.';
      case 'INVALID_CARD_INSTALLMENT_PLAN':
        return '올바르지 않은 할부 개월 수입니다.';
      default:
        return message || '결제 중 오류가 발생했습니다.';
    }
  };

  const displayMessage = getDisplayMessage(errorCode, errorMessage);

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='결제 실패' />
      </div>
      <div className='flex flex-1 items-center justify-center px-6'>
        <VStack alignItems='center' className='gap-6'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <Text className='text-2xl text-red-600'>✕</Text>
          </div>
          <VStack alignItems='center' className='gap-2'>
            <Text className='text-red-600' typography='heading5'>
              결제 실패
            </Text>
            <Text className='text-center text-gray-600' typography='body2'>
              {displayMessage}
            </Text>
            {errorCode && (
              <Text className='text-gray-400' typography='body3'>
                오류 코드: {errorCode}
              </Text>
            )}
          </VStack>
        </VStack>
      </div>
      <div className='sticky bottom-0 z-50 space-y-3 bg-white px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='다시 시도' onClick={handleGoBack} />
        <button className='w-full py-3 text-center text-gray-600' onClick={handleGoToHome}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

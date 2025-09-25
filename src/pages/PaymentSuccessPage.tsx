import { HStack, Text, VStack } from '@vapor-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { createReservation } from '@/apis/reservations';
import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';
import { useRouteStore } from '@/stores/routeStore';

interface PaymentResult {
  paymentKey: string;
  orderId: string;
  amount: string;
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedRoute, selectedDate, clearRoute } = useRouteStore();

  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [reservationCompleted, setReservationCompleted] = useState(false);

  useEffect(() => {
    // URL 파라미터에서 결제 결과 정보 추출
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount) {
      setPaymentResult({ paymentKey, orderId, amount });
      // 결제 성공 후 예약 생성 처리
      handleReservationCreation(paymentKey, orderId, amount);
    } else {
      alert('결제 정보가 올바르지 않습니다.');
      navigate('/route');
    }
  }, [searchParams, navigate]);

  const handleReservationCreation = async (paymentKey: string, orderId: string, amount: string) => {
    if (!selectedRoute || !selectedDate) {
      alert('노선 정보가 없습니다. 노선 선택 페이지로 이동합니다.');
      navigate('/route');
      return;
    }

    setLoading(true);

    try {
      // 백엔드에 예약 생성 요청 (결제 정보와 함께)
      const reservation = await createReservation({
        routeId: selectedRoute.id,
        reservationDate: selectedDate,
        paymentKey,
        orderId,
        amount: parseInt(amount),
      });

      setReservationCompleted(true);
      console.log('예약 생성 완료:', reservation);
    } catch (error: any) {
      console.error('예약 생성 실패:', error);
      alert('결제는 완료되었지만 예약 생성에 실패했습니다. 고객센터에 문의해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToReservation = () => {
    // 예약 완료 페이지 또는 예약 목록으로 이동
    navigate('/reservations');
    clearRoute(); // 노선 선택 상태 초기화
  };

  const handleGoToHome = () => {
    navigate('/');
    clearRoute(); // 노선 선택 상태 초기화
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <VStack alignItems='center' className='gap-4'>
          <Text foreground='normal' typography='subtitle1'>
            예약을 생성하는 중입니다...
          </Text>
          <Text foreground='muted' typography='body2'>
            잠시만 기다려주세요.
          </Text>
        </VStack>
      </div>
    );
  }

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='결제 완료' />
      </div>

      <div className='flex flex-1 items-center justify-center px-6'>
        <VStack alignItems='center' className='gap-6' paddingY='$500'>
          {/* 성공 아이콘 */}
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
            <svg className='h-10 w-10 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path d='M5 13l4 4L19 7' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
            </svg>
          </div>

          {/* 결제 완료 메시지 */}
          <VStack alignItems='center' className='gap-2'>
            <Text className='text-center font-bold' foreground='normal' typography='heading3'>
              {reservationCompleted ? '예약이 완료되었습니다!' : '결제가 완료되었습니다!'}
            </Text>
            <Text className='text-center' foreground='muted' typography='body2'>
              {reservationCompleted ? '셔틀 탑승 시 QR코드를 준비해주세요.' : '예약 정보를 생성하고 있습니다.'}
            </Text>
          </VStack>

          {/* 결제 정보 */}
          {paymentResult && (
            <VStack className='w-full gap-4 rounded-lg bg-gray-50 p-4'>
              <Text className='font-semibold' foreground='normal' typography='subtitle2'>
                결제 정보
              </Text>

              <VStack className='gap-2'>
                <HStack justifyContent='space-between'>
                  <Text foreground='muted' typography='body2'>
                    주문번호
                  </Text>
                  <Text className='font-mono text-sm' foreground='normal' typography='body2'>
                    {paymentResult.orderId}
                  </Text>
                </HStack>

                <HStack justifyContent='space-between'>
                  <Text foreground='muted' typography='body2'>
                    결제금액
                  </Text>
                  <Text className='font-semibold' foreground='normal' typography='body2'>
                    {parseInt(paymentResult.amount).toLocaleString()}원
                  </Text>
                </HStack>

                {selectedRoute && (
                  <>
                    <HStack justifyContent='space-between'>
                      <Text foreground='muted' typography='body2'>
                        노선
                      </Text>
                      <Text foreground='normal' typography='body2'>
                        {selectedRoute.pickupLocation} → {selectedRoute.hospitalName}
                      </Text>
                    </HStack>

                    <HStack justifyContent='space-between'>
                      <Text foreground='muted' typography='body2'>
                        출발시간
                      </Text>
                      <Text foreground='normal' typography='body2'>
                        {selectedRoute.startAt.substring(0, 5)}
                      </Text>
                    </HStack>
                  </>
                )}
              </VStack>
            </VStack>
          )}
        </VStack>
      </div>

      {/* 하단 버튼 */}
      <div className='sticky bottom-0 z-50 border-t border-gray-100 bg-white px-6 pt-2.5 pb-12'>
        <VStack className='gap-3'>
          {reservationCompleted && <NavButton label='예약 확인하기' onClick={handleGoToReservation} />}
          <NavButton
            label='홈으로 가기'
            variant={reservationCompleted ? 'secondary' : 'primary'}
            onClick={handleGoToHome}
          />
        </VStack>
      </div>
    </div>
  );
}

import { Text, VStack } from '@vapor-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { confirmPayment } from '@/apis/payments';
import { createReservation } from '@/apis/reservations';
import type { PaymentConfirmRequest } from '@/apis/types';
import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

interface ReservationData {
  routeId: number;
  reservationDate: string;
  paymentMethod: string;
  amount: number;
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // URL에서 결제 정보 추출
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (!paymentKey || !orderId || !amount) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        // sessionStorage에서 예약 정보 가져오기
        const pendingReservationStr = sessionStorage.getItem('pendingReservation');
        if (!pendingReservationStr) {
          throw new Error('예약 정보를 찾을 수 없습니다.');
        }

        const reservationData: ReservationData = JSON.parse(pendingReservationStr);

        // 백엔드에서 결제 승인
        const paymentConfirmData: PaymentConfirmRequest = {
          paymentKey,
          orderId,
          amount: parseInt(amount),
        };

        console.log('결제 승인 요청:', paymentConfirmData);
        const paymentResult = await confirmPayment(paymentConfirmData);
        console.log('결제 승인 성공:', paymentResult);

        // 결제 승인 성공 후 예약 생성
        const reservation = await createReservation({
          routeId: reservationData.routeId,
          reservationDate: reservationData.reservationDate,
        });

        console.log('예약 생성 성공:', reservation);

        // 성공 시 sessionStorage 정리
        sessionStorage.removeItem('pendingReservation');
        setSuccess(true);
      } catch (err) {
        console.error('결제 처리 실패:', err);
        setError(err instanceof Error ? err.message : '결제 처리 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams]);

  const handleGoToReservation = () => {
    navigate('/reservation-result');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className='relative flex min-h-screen flex-col'>
        <div className='sticky top-0 z-60'>
          <BackHeader title='결제 처리' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <VStack alignItems='center' className='gap-4'>
            <Text typography='heading5'>결제를 처리하고 있습니다...</Text>
            <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600' />
          </VStack>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='relative flex min-h-screen flex-col'>
        <div className='sticky top-0 z-60'>
          <BackHeader title='결제 오류' />
        </div>
        <div className='flex flex-1 items-center justify-center px-6'>
          <VStack alignItems='center' className='gap-6'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
              <Text className='text-2xl text-red-600'>✕</Text>
            </div>
            <VStack alignItems='center' className='gap-2'>
              <Text className='text-red-600' typography='heading5'>
                결제 처리 실패
              </Text>
              <Text className='text-center text-gray-600' typography='body2'>
                {error}
              </Text>
            </VStack>
          </VStack>
        </div>
        <div className='sticky bottom-0 z-50 bg-white px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
          <NavButton label='홈으로 돌아가기' onClick={handleGoToHome} />
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className='relative flex min-h-screen flex-col'>
        <div className='sticky top-0 z-60'>
          <BackHeader title='결제 완료' />
        </div>
        <div className='flex flex-1 items-center justify-center px-6'>
          <VStack alignItems='center' className='gap-6'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
              <Text className='text-2xl text-green-600'>✓</Text>
            </div>
            <VStack alignItems='center' className='gap-2'>
              <Text className='text-green-600' typography='heading5'>
                결제가 완료되었습니다
              </Text>
              <Text className='text-center text-gray-600' typography='body2'>
                셔틀 예약이 정상적으로 완료되었습니다.
              </Text>
            </VStack>
          </VStack>
        </div>
        <div className='sticky bottom-0 z-50 bg-white px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
          <NavButton label='예약 내역 확인' onClick={handleGoToReservation} />
        </div>
      </div>
    );
  }

  return null;
}

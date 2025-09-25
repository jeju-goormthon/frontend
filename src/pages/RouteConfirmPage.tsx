import { HStack, Text, VStack } from '@vapor-ui/core';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkActivePass, getActivePass } from '@/apis/passes';
import { createReservation } from '@/apis/reservations';
import type { PassResponse } from '@/apis/types';
import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';
import PaymentMethodSection from '@/components/PaymentMethodSection';
import RouteSummaryCard from '@/components/RouteSummaryCard';
import { useRouteStore } from '@/stores/routeStore';

export default function RouteConfirmPage() {
  const navigate = useNavigate();
  const { selectedRoute, selectedDate, clearRoute } = useRouteStore();

  // ═══════════════ 결제 관련 상태 관리 ═══════════════
  const [paymentMethod, setPaymentMethod] = useState<'ticket' | 'general'>('general'); // 정기권/일반결제 선택
  const [paymentService, setPaymentService] = useState<'kakao' | 'toss'>('kakao'); // 카카오페이/토스페이 선택

  // 정기권 관련 상태
  const [hasTicket, setHasTicket] = useState(false);
  const [activePass, setActivePass] = useState<PassResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // 페이지 진입 시 선택된 노선이 없으면 이전 페이지로 이동
  useEffect(() => {
    if (!selectedRoute || !selectedDate) {
      alert('노선 정보가 없습니다. 노선 선택 페이지로 이동합니다.');
      navigate('/route');
      return;
    }

    // 정기권 보유 여부 확인
    checkPassStatus();
  }, [selectedRoute, selectedDate, navigate]);

  const checkPassStatus = async () => {
    try {
      const hasActivePass = await checkActivePass();
      setHasTicket(hasActivePass);

      if (hasActivePass) {
        const pass = await getActivePass();
        setActivePass(pass);
        setPaymentMethod('ticket'); // 정기권이 있으면 정기권 결제로 기본 설정
      }
    } catch (error) {
      console.error('정기권 상태 확인 실패:', error);
      setHasTicket(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedRoute || !selectedDate) {
      alert('노선 정보가 없습니다.');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'ticket') {
        // 정기권으로 예약 생성 (결제 불필요)
        const reservation = await createReservation({
          routeId: selectedRoute.id,
          reservationDate: selectedDate,
        });

        alert('정기권으로 예약이 완료되었습니다!');

        // 예약 완료 후 결과 페이지로 이동
        navigate('/reservation-result');
      } else {
        // 일반 결제 - 토스페이/카카오페이
        if (paymentService === 'toss') {
          // 토스페이 결제 로직
          initiateTossPayment();
        } else {
          // 카카오페이 결제는 현재 백엔드 미구현
          alert('카카오페이는 아직 준비 중입니다. 토스페이를 이용해주세요.');
        }
      }
    } catch (error: any) {
      console.error('결제/예약 실패:', error);
      alert(error.message || '결제/예약에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const initiateTossPayment = () => {
    // TODO: 토스페이 결제 연동
    // 실제 구현 시에는 토스페이 SDK를 사용하여 결제 요청
    alert('토스페이 결제를 시작합니다. (실제 구현 예정)');
  };

  // 로딩 상태나 데이터가 없으면 로딩 표시
  if (!selectedRoute || !selectedDate) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Text>노선 정보를 불러오는 중...</Text>
      </div>
    );
  }

  // 시간 형식 변환
  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  // 날짜 형식 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy.MM.dd(E)', {
      locale: { localize: { day: (n: number) => ['일', '월', '화', '수', '목', '금', '토'][n] } },
    });
  };
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='노선 확인/결제' />
      </div>
      <div className='flex-1 overflow-y-auto'>
        {/* 노선 + 요일 시간 */}
        <VStack className='gap-5' paddingX='$300' paddingY='$250'>
          <HStack alignItems='center' justifyContent='space-between'>
            <Text
              className='leading-[137.5%] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'
              foreground='normal'
            >
              노선
            </Text>
            <Text foreground='normal' typography='body1'>
              {formatDate(selectedDate)}
            </Text>
          </HStack>
          {/* 출발지 + 도착지 */}
          <RouteSummaryCard
            arriveName={selectedRoute.hospitalName}
            arriveTime={`${formatTime(selectedRoute.endAt)}`}
            departName={selectedRoute.pickupLocation}
            departTime={`${formatTime(selectedRoute.startAt)}`}
          />
        </VStack>
        <div className='h-2.5 bg-[#F7F7F7]' />

        {/* 결제 수단 선택 */}
        <VStack className='gap-5' paddingX='$300' paddingY='$250'>
          <Text
            className='leading-[137.5%] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'
            foreground='normal'
          >
            결제수단
          </Text>

          {/* ═══════════════ 결제 수단 선택 컴포넌트 ═══════════════ */}
          <PaymentMethodSection
            hasTicket={hasTicket}
            selected={paymentMethod}
            selectedPaymentService={paymentService}
            ticketName={
              activePass
                ? `${activePass.passType === 'ONE_MONTH' ? '1개월권' : activePass.passType === 'THREE_MONTHS' ? '3개월권' : '6개월권'}`
                : ''
            }
            ticketPeriod={activePass ? `${activePass.startDate}–${activePass.endDate}` : ''}
            onPaymentMethodChange={setPaymentMethod}
            onPaymentServiceChange={setPaymentService}
          />
        </VStack>
      </div>
      <div className='sticky bottom-0 z-50 px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton
          disabled={loading}
          label={loading ? '처리 중...' : paymentMethod === 'ticket' ? '예약하기' : '결제하기'}
          onClick={handlePayment}
        />
      </div>
    </div>
  );
}

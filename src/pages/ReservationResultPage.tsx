// src/pages/ReservationResultPage.tsx
import { Badge, Button, Card, Flex, HStack, Text, VStack } from '@vapor-ui/core';
import { InfoCircleOutlineIcon } from '@vapor-ui/icons';
import { differenceInDays, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getReservationDetail } from '@/apis/reservations';
import type { ReservationResponse } from '@/apis/types';
import Header from '@/components/Header';
import { useRouteStore } from '@/stores/routeStore';

import SuccessIcon from '../assets/icons/SuccessIcon.svg';

export default function ReservationResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearAll } = useRouteStore();
  const [reservation, setReservation] = useState<ReservationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservation() {
      try {
        setLoading(true);
        setError(null);

        const reservationId = searchParams.get('reservationId');
        if (!reservationId) {
          throw new Error('예약 ID가 필요합니다.');
        }

        const reservationData = await getReservationDetail(Number(reservationId));
        setReservation(reservationData);
      } catch (err) {
        console.error('Failed to fetch reservation:', err);
        setError(err instanceof Error ? err.message : '예약 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchReservation();
  }, [searchParams]);

  // Calculate days until reservation
  const getDaysUntilReservation = (reservationDate: string) => {
    const today = new Date();
    const resDate = parseISO(reservationDate);
    return differenceInDays(resDate, today);
  };

  // Format reservation date for display
  const formatReservationDate = (dateString: string) => {
    return format(parseISO(dateString), 'yyyy-MM-dd', { locale: ko });
  };

  // Handle navigation to ticket page
  const handleViewTicket = () => {
    if (reservation) {
      navigate(`/reservations/${reservation.id}/ticket`);
    }
  };

  // Handle home navigation and clear route store
  const handleGoHome = () => {
    clearAll();
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <div className='sticky top-0 z-50 bg-white'>
          <Header />
        </div>
        <Flex alignItems='center' flexDirection='column' paddingX='$300' paddingY='$700'>
          <Text>예약 정보를 불러오는 중...</Text>
        </Flex>
      </>
    );
  }

  if (error || !reservation) {
    return (
      <>
        <div className='sticky top-0 z-50 bg-white'>
          <Header />
        </div>
        <Flex alignItems='center' flexDirection='column' paddingX='$300' paddingY='$700'>
          <Text style={{ color: '#D92D20' }}>{error || '예약 정보를 찾을 수 없습니다.'}</Text>
          <Button style={{ marginTop: 16 }} onClick={handleGoHome}>
            홈으로 돌아가기
          </Button>
        </Flex>
      </>
    );
  }

  const daysUntil = getDaysUntilReservation(reservation.reservationDate);
  const badgeText = daysUntil === 0 ? '오늘' : daysUntil === 1 ? '내일' : `${daysUntil}일전`;
  const badgeColor = daysUntil <= 1 ? '#D92D20' : '#EF6F25';

  return (
    <>
      <div className='sticky top-0 z-50 bg-white'>
        <Header />
      </div>
      <Flex alignItems='center' flexDirection='column' paddingX='$300' paddingY='$700'>
        {/* 완료 아이콘 (커스텀 SVG) */}
        <img alt='예약 완료' height={32} src={SuccessIcon} width={32} />
        {/* 타이틀 */}
        <Text className='tracking-v-300 leading-v-400 pt-3 text-center' typography='heading3'>
          탑승 예약이 완료되었습니다.
        </Text>

        {/* 예약 카드 */}
        <Card.Root style={{ width: '100%', marginTop: 40, borderRadius: 16, borderColor: '#F0F0F0' }}>
          <VStack alignItems='start' paddingX='$250' paddingY='$200'>
            <HStack alignItems='center' paddingBottom='$150'>
              <Text className='text-base font-medium'>{formatReservationDate(reservation.reservationDate)}</Text>
              <Badge className='mx-1.5 bg-[#FFF6F1] font-medium' shape='square' size='sm' style={{ color: badgeColor }}>
                {badgeText}
              </Badge>
            </HStack>

            <Text className='leading-v-75 tracking-v-100 mb-1 text-base' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>탑승시간</span> {reservation.startTime.substring(0, 5)}
            </Text>
            <Text className='leading-v-75 tracking-v-100 mb-1 text-base' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>출발장소</span> {reservation.pickupLocation}
            </Text>
            <Text className='leading-v-75 tracking-v-100 mb-1 text-base' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>병원</span> {reservation.hospitalName}
            </Text>
            <Text className='leading-v-75 tracking-v-100 text-base' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>예약번호</span> {reservation.reservationNumber}
            </Text>

            <HStack alignContent='center' alignItems='center' gap='$075' paddingTop='$200'>
              <InfoCircleOutlineIcon className='text-[#3174DC]' />
              <Text className='tracking-v-100 text-[#3174DC]' typography='subtitle1'>
                탑승 시 기사님에게 QR 화면을 보여주세요
              </Text>
            </HStack>
          </VStack>
        </Card.Root>

        {/* 버튼 영역 */}
        <VStack style={{ width: '100%', gap: 10, paddingTop: 40 }}>
          <Button stretch className='rounded-xl bg-[#CEE3FF] py-7' size='xl' onClick={handleViewTicket}>
            <Text className='text-[#0E47A3]' typography='heading6'>
              예약 정보 자세히 보기
            </Text>
          </Button>
          <Button stretch className='rounded-xl bg-[#F7F7F7] py-7' size='xl' onClick={handleGoHome}>
            <Text typography='heading6'>홈으로 돌아가기</Text>
          </Button>
        </VStack>
      </Flex>
    </>
  );
}

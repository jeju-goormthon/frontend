import { Badge, Box, Button, HStack, Text, VStack } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyReservations } from '@/apis/reservations';
import type { ReservationResponse } from '@/apis/types';
import { useAuthStore } from '@/stores/authStore';

export default function UpcomingReservationCard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [upcomingReservation, setUpcomingReservation] = useState<ReservationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUpcomingReservation = async () => {
      try {
        setLoading(true);
        const reservations = await getMyReservations();

        // 가장 가까운 예약 찾기 (오늘 이후)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = reservations
          .filter((r) => new Date(r.reservationDate) >= today)
          .filter((r) => r.status !== 'CANCELLED')
          .sort((a, b) => new Date(a.reservationDate).getTime() - new Date(b.reservationDate).getTime())[0];

        setUpcomingReservation(upcoming || null);
      } catch (error) {
        console.error('예약 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingReservation();
  }, [isAuthenticated]);

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'yyyy.MM.dd(E)', { locale: ko });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${displayHour.toString().padStart(2, '0')}:${minutes}`;
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reservationDate = new Date(dateString);
    reservationDate.setHours(0, 0, 0, 0);
    const diffTime = reservationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const onClick = () => {
    if (upcomingReservation) {
      navigate(`/reservations/${upcomingReservation.id}/ticket`);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  // 로그인하지 않은 경우
  if (!isAuthenticated) {
    return (
      <VStack alignItems='flex-start' gap='$150' paddingX='$300' paddingY='$150' width='100%'>
        <Text className='leading-[var(--vapor-typography-lineHeight-075)] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'>
          곧 다가올 탑승 예약
        </Text>
        <Box
          alignItems='center'
          borderRadius='$500'
          className='h-[106px] self-stretch border-[1.5px] border-[#F0F0F0] bg-white'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          paddingX='$300'
          paddingY='$225'
          textAlign='center'
          width='100%'
        >
          <VStack className='items-center gap-[10px]'>
            <Text className='text-center leading-[var(--vapor-typography-lineHeight-075)] font-medium tracking-[var(--vapor-typography-letterSpacing-100)] text-[#959595]'>
              로그인 후 탑승 예약을 확인해 주세요
            </Text>
            <Button className='rounded-4xl bg-[#3174DC] text-white' size='md' onClick={handleLoginClick}>
              로그인하기
            </Button>
          </VStack>
        </Box>
      </VStack>
    );
  }

  // 로그인했지만 예약이 없는 경우
  if (loading) {
    return (
      <VStack alignItems='flex-start' gap='$150' paddingX='$300' paddingY='$150' width='100%'>
        <Text className='leading-[var(--vapor-typography-lineHeight-075)] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'>
          곧 다가올 탑승 예약
        </Text>
        <Box
          alignItems='center'
          borderRadius='$500'
          className='h-[106px] self-stretch border-[1.5px] border-[#F0F0F0] bg-white'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          paddingX='$300'
          paddingY='$225'
          textAlign='center'
          width='100%'
        >
          <Text className='text-center leading-[var(--vapor-typography-lineHeight-075)] font-medium tracking-[var(--vapor-typography-letterSpacing-100)] text-[#959595]'>
            예약 정보를 불러오는 중...
          </Text>
        </Box>
      </VStack>
    );
  }

  if (!upcomingReservation) {
    return (
      <VStack alignItems='flex-start' gap='$150' paddingX='$300' paddingY='$150' width='100%'>
        <Text className='leading-[var(--vapor-typography-lineHeight-075)] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'>
          곧 다가올 탑승 예약
        </Text>
        <Box
          alignItems='center'
          borderRadius='$500'
          className='h-[106px] self-stretch border-[1.5px] border-[#F0F0F0] bg-white'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          paddingX='$300'
          paddingY='$225'
          textAlign='center'
          width='100%'
        >
          <Text className='text-center leading-[var(--vapor-typography-lineHeight-075)] font-medium tracking-[var(--vapor-typography-letterSpacing-100)] text-[#959595]'>
            탑승 예약이 등록되지 않았어요
          </Text>
        </Box>
      </VStack>
    );
  }

  // 로그인하고 예약이 있는 경우
  return (
    <VStack alignItems='flex-start' gap='$150' paddingX='$300' paddingY='$150' width='100%'>
      <Text className='leading-[var(--vapor-typography-lineHeight-075)] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'>
        곧 다가올 탑승 예약
      </Text>
      <Box
        alignItems='center'
        aria-label='예약 상세 보기'
        borderRadius='$500'
        className='h-[106px] cursor-pointer self-stretch border-[1.5px] border-[#F0F0F0] bg-white hover:brightness-95 active:brightness-90'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        paddingX='$300'
        paddingY='$225'
        role='button'
        tabIndex={0}
        textAlign='center'
        width='100%'
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <VStack className='gap-0.5 text-sm leading-[var(--vapor-typography-lineHeight-075)] tracking-[var(--vapor-typography-letterSpacing-100)] text-[#262626]'>
          <HStack alignItems='center' gap='$075'>
            <Text className='font-semibold'>{formatDate(upcomingReservation.reservationDate)}</Text>{' '}
            <Badge className='bg-v-orange-50 text-v-orange-400' size='sm'>
              {getDaysUntil(upcomingReservation.reservationDate) === 0
                ? '오늘'
                : getDaysUntil(upcomingReservation.reservationDate) === 1
                  ? '내일'
                  : `${getDaysUntil(upcomingReservation.reservationDate)}일전`}
            </Badge>
          </HStack>
          <HStack gap='$050'>
            <Text className='font-semibold text-[#959595]'>탑승시간</Text>{' '}
            <Text className='font-semibold'>{formatTime(upcomingReservation.startTime)}</Text>
          </HStack>
          <HStack gap='$050'>
            <Text className='font-semibold text-[#959595]'>출발장소</Text>{' '}
            <Text className='font-semibold'>{upcomingReservation.pickupLocation} </Text>
          </HStack>
        </VStack>
        <ChevronRightOutlineIcon className='text-[var(--vapor-color-hint)]' size={20} />
      </Box>
    </VStack>
  );
}

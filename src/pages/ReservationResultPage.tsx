// src/pages/ReservationResultPage.tsx
import { Badge, Button, Card, Flex, HStack, Text, VStack } from '@vapor-ui/core';
import { InfoCircleOutlineIcon } from '@vapor-ui/icons';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';

import SuccessIcon from '../assets/icons/SuccessIcon.svg';

type Reservation = {
  date: string;
  time: string;
  departure: string;
  department: string;
};

export default function ReservationResultPage() {
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    // 🚨 실제 API 요청으로 교체
    async function fetchReservation() {
      // 예시 응답
      const data = {
        date: '2025-09-26',
        time: '오전 09:00',
        departure: '애월읍사무소 앞',
        department: '내과(제주대학교병원)',
      };
      setReservation(data);
    }
    fetchReservation();
  }, []);

  if (!reservation) return null;

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
              <Text className='text-base font-medium'>{reservation.date}</Text>
              <Badge className='mx-1.5 bg-[#FFF6F1] font-medium text-[#EF6F25]' shape='square' size='sm'>
                2일전
              </Badge>
            </HStack>

            <Text className='leading-v-75 tracking-v-100 mb-1' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>탑승시간</span> {reservation.time}
            </Text>
            <Text className='leading-v-75 tracking-v-100 mb-1' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>출발장소</span> {reservation.departure}
            </Text>
            <Text className='leading-v-75 tracking-v-100' typography='subtitle1'>
              <span className='pr-2 text-[#959595]'>진료과목</span> {reservation.department}
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
          <Button stretch className='rounded-xl bg-[#CEE3FF] py-7' size='xl'>
            <Text className='text-[#0E47A3]' typography='heading6'>
              예약 정보 자세히 보기
            </Text>
          </Button>
          <Button stretch className='rounded-xl bg-[#F7F7F7] py-7' size='xl'>
            <Text typography='heading6'>홈으로 돌아가기</Text>
          </Button>
        </VStack>
      </Flex>
    </>
  );
}

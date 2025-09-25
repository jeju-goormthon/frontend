import { HStack, Text, VStack } from '@vapor-ui/core';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';
import RouteSummaryCard from '@/components/RouteSummaryCard';

export default function RouteConfirmPage() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-50'>
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
              2025.09.26(금)
            </Text>
          </HStack>
          {/* 출발지 + 도착지 */}
          <RouteSummaryCard
            arriveName='제주대학교병원-내과'
            arriveTime='오후 09:30'
            departName='애월읍사무소 앞'
            departTime='오전 09:00'
          />
        </VStack>
        <div className='h-2.5 bg-[#F7F7F7]' />
        <VStack className='gap-5' paddingX='$300' paddingY='$250'>
          <Text
            className='leading-[137.5%] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'
            foreground='normal'
          >
            결제수단
          </Text>
          {/* 출발지 + 도착지 */}
          <Text>테스트</Text>
        </VStack>
      </div>
      <div className='sticky bottom-0 z-50 px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='결제하기' onClick={() => alert('결제하기')} />
      </div>
    </div>
  );
}

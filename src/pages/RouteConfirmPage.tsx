import { HStack, Text, VStack } from '@vapor-ui/core';
import { useState } from 'react';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';
import PaymentMethodSection from '@/components/PaymentMethodSection';
import RouteSummaryCard from '@/components/RouteSummaryCard';
import TermsAgreement from '@/components/terms/TermsAgreement';

export default function RouteConfirmPage() {
  // ═══════════════ 결제 관련 상태 관리 ═══════════════
  const [paymentMethod, setPaymentMethod] = useState<'ticket' | 'general'>('general'); // 정기권/일반결제 선택
  const [paymentService, setPaymentService] = useState<'kakao' | 'toss'>('kakao'); // 카카오페이/토스페이 선택

  // 임시 데이터 - 실제로는 API나 props로 받아올 예정
  const hasTicket = false; // 정기권 보유 여부
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
            ticketName='1개월권'
            ticketPeriod='25.09.01–25.10.01'
            onPaymentMethodChange={setPaymentMethod}
            onPaymentServiceChange={setPaymentService}
          />
        </VStack>
        <div className='h-2.5 bg-[#F7F7F7]' />
        <TermsAgreement />
      </div>
      <div className='sticky bottom-0 z-50 px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton
          label='결제하기'
          onClick={() => {
            // 선택된 결제 방법에 따른 결제 로직
            if (paymentMethod === 'ticket') {
              alert('정기권으로 결제합니다.');
            } else {
              alert(`${paymentService === 'kakao' ? '카카오페이' : '토스페이'}로 결제합니다.`);
            }
          }}
        />
      </div>
    </div>
  );
}

import { Badge, Box, Text, VStack } from '@vapor-ui/core';
import { useState } from 'react';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

type Plan = '1m' | '3m' | '6m';

// 정기권 정보 타입
interface TicketInfo {
  name: string;
  price: string;
  monthlyPrice?: string;
  originalPrice?: string;
  discount?: string;
}

const baseCard = 'h-23 rounded-2xl px-5 py-4 transition flex items-center justify-between cursor-pointer select-none';
const selectedCard = 'ring-2 ring-[#4B84FF] bg-white';
const unselectedCard = 'border border-[#F0F0F0]';

export default function SeasonTicketPage() {
  const [plan, setPlan] = useState<Plan>('1m');

  // 임시 데이터 - 실제로는 API나 props로 받아올 예정
  const hasTicket = true; // 정기권 보유 여부
  const currentTicket = {
    name: '1개월권',
    period: '2025. 10. 26',
    price: '15,000원',
    paymentMethod: '카카오페이',
  };

  // 정기권 정보 매핑
  const getTicketInfo = (planType: Plan): TicketInfo => {
    switch (planType) {
      case '1m':
        return {
          name: '1개월권',
          price: '₩15,000',
          monthlyPrice: '/월',
        };
      case '3m':
        return {
          name: '3개월권',
          price: '₩40,000',
          monthlyPrice: '₩13,333/월',
          originalPrice: '₩45,000',
          discount: '11% 할인',
        };
      case '6m':
        return {
          name: '6개월권',
          price: '₩75,000',
          monthlyPrice: '₩12,500/월',
          originalPrice: '₩100,000',
          discount: '25% 할인',
        };
    }
  };

  const handleKey = (v: Plan) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setPlan(v);
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='정기권 관리' />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <VStack gap='$100' padding='$300'>
          {/* ═══════════════ 정기권 보유자 섹션 ═══════════════ */}
          {hasTicket && (
            <div>
              <div className='leading-v-75 tracking-v-100 py-5 font-semibold text-[#262626]'>나의 정기권</div>
              <Box className='rounded-2xl bg-[#F7F7F7] px-5 py-4'>
                <div className='mb-3 flex items-center justify-between border-b border-[#E0E0E0] pb-3'>
                  <Text typography='heading5'>{currentTicket.name}</Text>
                  <Badge className='rounded-full px-1.5'>이용중</Badge>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Text foreground='hint' typography='subtitle1'>
                      결제 예정일
                    </Text>
                    <Text typography='subtitle1'>{currentTicket.period}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text foreground='hint' typography='subtitle1'>
                      결제 예정금액
                    </Text>
                    <Text typography='subtitle1'>{currentTicket.price}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text foreground='hint' typography='subtitle1'>
                      결제 수단
                    </Text>
                    <Text typography='subtitle1'>{currentTicket.paymentMethod}</Text>
                  </div>
                </div>
              </Box>
            </div>
          )}

          {/* ═══════════════ 정기권 구매 섹션 (정기권 미보유자용) ═══════════════ */}
          {!hasTicket && (
            <>
              <Text typography='heading3'>
                정기권으로 동행이음버스를 <br /> 저렴하게 이용해 보세요!
              </Text>
              <Text typography='body1'>
                정기권은 전용 좌석을 선점할 수 있어요.
                <br /> 장기 구독 시 더 큰 할인 혜택을 제공해요
              </Text>
              <div aria-label='정기권 요금제' className='mt-8 space-y-3' role='radiogroup'>
                {/* 1개월권 */}
                <div
                  aria-checked={plan === '1m'}
                  className={`${baseCard} ${plan === '1m' ? selectedCard : unselectedCard}`}
                  role='radio'
                  tabIndex={0}
                  onClick={() => setPlan('1m')}
                  onKeyDown={handleKey('1m')}
                >
                  <Text typography='heading5'>1개월권</Text>
                  <Text className='leading-v-100 tracking-v-100 font-semibold'>₩15,000/월</Text>
                </div>

                {/* 3개월권 */}
                <div
                  aria-checked={plan === '3m'}
                  className={`${baseCard} ${plan === '3m' ? selectedCard : unselectedCard}`}
                  role='radio'
                  tabIndex={0}
                  onClick={() => setPlan('3m')}
                  onKeyDown={handleKey('3m')}
                >
                  <div className='flex items-center gap-2'>
                    <Text typography='heading5'>3개월권</Text>
                    <Badge className='px-1.5'>11% 할인</Badge>
                  </div>
                  <div className='text-right'>
                    <VStack>
                      <Text className='line-through' typography='body3'>
                        ₩45,000원
                      </Text>
                      <Text className='leading-v-100 tracking-v-100 font-semibold'>₩40,000원</Text>
                      <Text typography='body3'>₩13,333/월</Text>
                    </VStack>
                  </div>
                </div>

                {/* 6개월권 */}
                <div
                  aria-checked={plan === '6m'}
                  className={`${baseCard} ${plan === '6m' ? selectedCard : unselectedCard}`}
                  role='radio'
                  tabIndex={0}
                  onClick={() => setPlan('6m')}
                  onKeyDown={handleKey('6m')}
                >
                  <div className='flex items-center gap-2'>
                    <Text typography='heading5'>6개월권</Text>
                    <Badge className='px-1.5'>25% 할인</Badge>
                  </div>
                  <div className='text-right'>
                    <VStack>
                      <Text className='line-through' typography='body3'>
                        ₩100,000원
                      </Text>
                      <Text className='leading-v-100 tracking-v-100 font-semibold'>₩75,000/월</Text>
                      <Text typography='body3'>₩12,500/월</Text>
                    </VStack>
                  </div>
                </div>
              </div>
            </>
          )}
        </VStack>
      </div>

      {/* ═══════════════ 결제하기 버튼 (정기권 미보유자용) ═══════════════ */}
      {!hasTicket && (
        <div className='sticky bottom-0 z-50 bg-white px-6 pt-3 pb-3 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
          <NavButton
            label='결제하기'
            onClick={() => {
              const selectedTicket = getTicketInfo(plan);

              // 결제 정보 콘솔 출력
              console.log('=== 정기권 결제 정보 ===');
              console.log('선택된 정기권:', selectedTicket.name);
              console.log('결제 금액:', selectedTicket.price);
              if (selectedTicket.monthlyPrice) {
                console.log('월 단가:', selectedTicket.monthlyPrice);
              }
              if (selectedTicket.discount) {
                console.log('할인율:', selectedTicket.discount);
                console.log('원래 가격:', selectedTicket.originalPrice);
              }

              // Alert로 사용자에게 확인
              let alertMessage = `${selectedTicket.name} ${selectedTicket.price}`;
              if (selectedTicket.discount) {
                alertMessage += ` (${selectedTicket.discount})`;
              }
              alertMessage += '으로 결제합니다.';

              alert(alertMessage);
            }}
          />
        </div>
      )}
    </div>
  );
}

import { Badge, Text, VStack } from '@vapor-ui/core';
import { useState } from 'react';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

type Plan = '1m' | '3m' | '6m';

const baseCard = 'h-23 rounded-2xl px-5 py-4 transition flex items-center justify-between cursor-pointer select-none';
const selectedCard = 'ring-2 ring-[#4B84FF] bg-white';
const unselectedCard = 'border border-[#F0F0F0]';

export default function SeasonTicketPage() {
  const [plan, setPlan] = useState<Plan>('1m');

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
          <Text typography='heading3'>정기권으로 동행이음버스를 저렴하게 이용해 보세요!</Text>
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
        </VStack>
      </div>
      <div className='sticky bottom-0 z-50 bg-white px-6 pt-3 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='결제하기' onClick={() => alert('결제하기')} />
      </div>
    </div>
  );
}

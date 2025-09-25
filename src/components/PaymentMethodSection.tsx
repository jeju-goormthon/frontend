import { Button, Radio, RadioGroup, Text } from '@vapor-ui/core';

import KakaoPayIcon from '@/assets/icons/KakaoPayIcon';
import discount_message from '@/assets/images/discount_message.webp';
import toss_logo from '@/assets/images/toss_logo.webp';

interface Props {
  /** 'ticket' = 정기권 사용, 'general' = 일반결제 */
  selected: 'ticket' | 'general';
  /** 정기권 보유 여부 */
  hasTicket?: boolean;
  ticketName?: string; // 예: "1개월권"
  ticketPeriod?: string; // 예: "25.09.01–25.10.01"
  /** 일반결제 시 선택된 결제 방법 ('kakao' | 'toss') */
  selectedPaymentService?: 'kakao' | 'toss';
  /** 결제 수단 변경 콜백 함수 */
  onPaymentMethodChange: (method: 'ticket' | 'general') => void;
  /** 일반결제 방법 변경 콜백 함수 */
  onPaymentServiceChange?: (service: 'kakao' | 'toss') => void;
}

export default function PaymentMethodSection({
  selected = 'general',
  hasTicket = false,
  ticketName = '1개월권',
  ticketPeriod = '25.09.01–25.10.01',
  selectedPaymentService = 'kakao',
  onPaymentMethodChange,
  onPaymentServiceChange,
}: Props) {
  return (
    <section className='space-y-3'>
      {/* ═══════════════ 결제 수단 선택 RadioGroup ═══════════════ */}
      {/* Vapor UI RadioGroup을 사용하여 정기권/일반결제 선택 */}
      <RadioGroup.Root
        className='space-y-3'
        name='payment-method'
        orientation='vertical'
        value={selected}
        onValueChange={(value) => onPaymentMethodChange(value as 'ticket' | 'general')}
      >
        {/* ───────── 정기권 사용 (ticket) 라디오 옵션 ───────── */}
        <label className='flex cursor-pointer items-center gap-2'>
          <Radio.Root value='ticket' />
          <Text
            className='text-sm leading-[157.143%] tracking-[var(--vapor-typography-letterSpacing-100)]'
            typography='subtitle1'
          >
            정기권 사용
          </Text>

          {/* 할인 배지 */}
          <img height={22} src={discount_message} />
        </label>

        {/* ticket 선택 시: 정기권 상태 표시 카드 */}
        {selected === 'ticket' && (
          <div className='rounded-2xl border border-[#F0F0F0] px-4 py-4'>
            {hasTicket ? (
              <div className='flex items-center justify-between'>
                <p className='flex items-center gap-2 text-sm text-[#5B5B5B]'>
                  <span>나의 정기권</span>
                  <span>
                    <span className='text-[#3174DC]'>{ticketName}</span>{' '}
                    <span className='text-[#959595]'>({ticketPeriod})</span>
                  </span>
                </p>
              </div>
            ) : (
              <div className='flex items-center justify-between'>
                <p className='leading-v-75 tracking-v-100 text-sm text-[#262626]'>이용 중인 정기권이 없습니다</p>
                <Button className='leading-v-75 tracking-v-100 rounded-lg border border-[#1D5ABA] bg-[#CEE3FF] px-2 py-0.5 font-medium text-[#0E47A3]'>
                  정기권 구매
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ───────── 일반결제 (general) 라디오 옵션 ───────── */}
        <label className='flex cursor-pointer items-center gap-2'>
          <Radio.Root value='general' />
          <Text
            className='text-sm leading-[157.143%] tracking-[var(--vapor-typography-letterSpacing-100)]'
            typography='subtitle1'
          >
            일반 결제
          </Text>
        </label>

        {/* general 선택 시: 결제 서비스 선택 카드 */}
        {selected === 'general' && (
          <div className='rounded-2xl border border-[#F0F0F0] px-4 py-4'>
            {/* ═══════ 결제 서비스 선택 RadioGroup (카카오페이/토스페이) ═══════ */}
            <RadioGroup.Root
              className='grid grid-cols-2 gap-3'
              name='payment-service'
              orientation='horizontal'
              value={selectedPaymentService}
              onValueChange={(value) => onPaymentServiceChange?.(value as 'kakao' | 'toss')}
            >
              {/* 카카오페이 옵션 */}
              <label className='flex cursor-pointer items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Radio.Root value='kakao' />
                  <span className='inline-flex items-center gap-2'>
                    <KakaoPayIcon />
                    <span className='leading-v-75 tracking-v-100 text-sm font-medium text-[#262626]'>카카오페이</span>
                  </span>
                </div>
              </label>

              {/* 토스페이 옵션 */}
              <label className='flex cursor-pointer items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Radio.Root value='toss' />
                  <span className='inline-flex items-center gap-2'>
                    <img height={20} src={toss_logo} />
                    <span className='leading-v-75 tracking-v-100 text-sm font-medium text-[#262626]'>토스페이</span>
                  </span>
                </div>
              </label>
            </RadioGroup.Root>
          </div>
        )}
      </RadioGroup.Root>
    </section>
  );
}

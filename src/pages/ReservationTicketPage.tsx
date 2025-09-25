import { Badge, Box, Button, HStack, Text, VStack } from '@vapor-ui/core';
import QRCode from 'react-qr-code';

import BackHeader from '@/components/BackHeader';

export default function ReservationTicketPage() {
  // TODO: 서버에서 받은 QR 코드 데이터로 교체
  const qrCodeData = 'RESERVATION-1234-5678-2025092609';
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='탑승권 확인' />
      </div>

      <div
        className='flex-1 overflow-y-auto p-6'
        style={{
          background: 'linear-gradient(180deg, #F1F7FF 53.85%, #FFF 81.73%)',
        }}
      >
        {/* 상단 예약번호 카드 */}
        {/* 예약번호 카드 */}
        <section
          className='mt-6 mb-1 rounded-2xl bg-white px-5 py-4'
          style={{ boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.05)' }}
        >
          <div className='flex items-center justify-between'>
            <div className='my-1 flex gap-2'>
              <Text className='text-[#959595]' typography='subtitle1'>
                예약번호
              </Text>
              <Text typography='subtitle1'>1234-5678</Text>
            </div>

            <Badge color='success'>확정</Badge>
          </div>

          {/* divider */}
          <div className='my-4 h-px bg-[#E9EEF7]' />

          {/* QR + 날짜 + 승차번호 */}
          <div className='flex flex-col items-center gap-4'>
            {/* QR Code */}
            <div className='flex h-40 w-40 items-center justify-center rounded-lg bg-white p-2'>
              <QRCode size={152} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={qrCodeData} />
            </div>

            <div className='mb-2'>
              <Text typography='subtitle1'>2025.09.26 (금)</Text>
              <HStack justifyContent='space-between' paddingX='$100'>
                <Text className='text-[#959595]' typography='subtitle1'>
                  승차번호
                </Text>
                <Text className='text-[#3174DC]' typography='subtitle1'>
                  B-12
                </Text>
              </HStack>
            </div>
          </div>
        </section>

        {/* 상세 정보 카드 */}
        <Box
          backgroundColor='$white'
          borderRadius='$500'
          display='flex'
          flexDirection='column'
          gap='$100'
          paddingX='$250'
          paddingY='$300'
          style={{ boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.05)' }}
        >
          <VStack gap='$100'>
            <HStack gap='$200'>
              <Text className='text-[#959595]' typography='subtitle1'>
                탑승시간
              </Text>
              <Text typography='subtitle1'>오전 09:00</Text>
            </HStack>

            <HStack gap='$200'>
              <Text className='text-[#959595]' typography='subtitle1'>
                출발장소
              </Text>
              <Text typography='subtitle1'>애월읍사무소 앞</Text>
            </HStack>
            <HStack gap='$200'>
              <Text className='text-[#959595]' typography='subtitle1'>
                진료과목
              </Text>
              <Text typography='subtitle1'>내과(제주대학교병원)</Text>
            </HStack>
          </VStack>
        </Box>

        {/* 하단 액션 버튼 */}
        <HStack className='mt-20 flex gap-2.5'>
          <Button stretch className='h-14 rounded-xl bg-[#CEE3FF] text-[#0E47A3]'>
            <Text className='text-[#0E47A3]' typography='heading6'>
              진료과목 변경
            </Text>
          </Button>
          <Button stretch className='h-14 rounded-xl bg-[#F7F7F7] text-[#393939]'>
            <Text className='text-[#393939]' typography='heading6'>
              예약 취소
            </Text>
          </Button>
        </HStack>
      </div>
    </div>
  );
}

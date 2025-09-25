import { Box, Text, VStack } from '@vapor-ui/core';

export default function UpcomingReservationCard() {
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

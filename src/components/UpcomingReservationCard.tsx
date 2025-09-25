import { Badge, Box, HStack, Text, VStack } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';

export default function UpcomingReservationCard() {
  const onClick = () => console.log('예약 카드 눌림');
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <VStack alignItems='flex-start' gap='$150' paddingX='$300' paddingY='$150' width='100%'>
      <Text className='leading-[var(--vapor-typography-lineHeight-075)] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'>
        곧 다가올 탑승 예약
      </Text>
      <Box
        alignItems='center'
        aria-label='예약 상세 보기'
        borderRadius='$500'
        className='h-[106px] cursor-pointer self-stretch border-[1.5px] border-[#A4C9FF] bg-white hover:brightness-95 active:brightness-90'
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
            <Text className='font-semibold'>2025.09.27(목)</Text>{' '}
            <Badge className='bg-v-orange-50 text-v-orange-400' size='sm'>
              2일전
            </Badge>
          </HStack>
          <HStack gap='$050'>
            <Text className='font-semibold text-[#959595]'>탑승시간</Text>{' '}
            <Text className='font-semibold'>테스트1</Text>
          </HStack>
          <HStack gap='$050'>
            <Text className='font-semibold text-[#959595]'>출발장소</Text>{' '}
            <Text className='font-semibold'>애월읍사무소 앞 </Text>
          </HStack>
        </VStack>
        <ChevronRightOutlineIcon className='text-[var(--vapor-color-hint)]' size={20} />
      </Box>
    </VStack>
  );
}

{
  /* TODO: 로그인 O / 등록된 예약 X 일 때 */
}
{
  /* <Text className='text-center leading-[var(--vapor-typography-lineHeight-075)] font-medium tracking-[var(--vapor-typography-letterSpacing-100)] text-[#959595]'>
  탑승 예약이 등록되지 않았어요
</Text> */
}

{
  /* TODO: 로그인 X  일 때 */
}
{
  {
    /* <VStack className='items-center gap-[10px]'>
  <Text className='text-center leading-[var(--vapor-typography-lineHeight-075)] font-medium tracking-[var(--vapor-typography-letterSpacing-100)] text-[#959595]'>
    로그인 후 탑승 예약을 확인해 주세요
  </Text>
  <Button className='text-v-primary rounded-4xl bg-[#CEE3FF]' color='secondary' size='md'>
    로그인하기
  </Button>
</VStack> */
  }
}

{
  /* 로그인 X / 로그인 O + 등록된 예약 X 일 때 레이아웃 */
}
// import { Box, Button, Text, VStack } from '@vapor-ui/core';

// export default function UpcomingReservationCard() {
//   return (
//     <VStack alignItems='flex-start' gap='$150' paddingX='$300' paddingY='$150' width='100%'>
//       <Text className='leading-[var(--vapor-typography-lineHeight-075)] font-semibold tracking-[var(--vapor-typography-letterSpacing-100)]'>
//         곧 다가올 탑승 예약
//       </Text>
//       <Box
//         alignItems='center'
//         borderRadius='$500'
//         className='h-[106px] self-stretch border-[1.5px] border-[#F0F0F0] bg-white'
//         display='flex'
//         flexDirection='column'
//         justifyContent='center'
//         paddingX='$300'
//         paddingY='$225'
//         textAlign='center'
//         width='100%'
//       >
//         <VStack className='items-center gap-[10px]'>

//         </VStack>
//       </Box>
//     </VStack>
//   );
// }

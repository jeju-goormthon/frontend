// RouteSummaryCard.tsx
import { Badge, Box, Text } from '@vapor-ui/core';

import DottedLineIcon from '@/assets/icons/DottedLineIcon';

type Props = {
  departName: string;
  departTime: string; // 예: "오전 09:00"
  arriveName: string;
  arriveTime: string; // 예: "오후 09:30"
  note?: string;
};

export default function RouteSummaryCard({
  departName,
  departTime,
  arriveName,
  arriveTime,
  note = '약 30분간 이동 예정입니다. 교통 상황에 따라 도착 예정 시간보다 지연될 수 있습니다.',
}: Props) {
  return (
    <Box className='rounded-2xl border-1 border-[#F0F0F0]' paddingX='$200' paddingY='$200'>
      {/* ✅ 2열 그리드: col1 = 배지/점선, col2 = 우측 내용. 행 간격 8px(gap-2) */}
      <div className='grid grid-cols-[max-content_1fr] gap-x-2 gap-y-2'>
        {/* 1행: 출발 배지 + 우측 출발 내용 */}
        <Badge className='self-center rounded-full px-2 py-1 text-xs font-medium'>출발</Badge>
        <Text className='leading-[var(--vapor-typography-lineHeight-100)] font-bold tracking-[var(--vapor-typography-letterSpacing-100)]'>
          {departName} ({departTime})
        </Text>
        {/* 2행: 점선만 (우측 칸은 비움) */}
        <DottedLineIcon className='self-center justify-self-center text-[#C6C6C6]' />
        <div />
        {/* 3행: 도착 배지 + 우측 도착 내용 */}
        <Badge className='self-center rounded-full px-2 py-1 text-xs font-medium' color='success'>
          도착
        </Badge>
        <Text className='leading-[var(--vapor-typography-lineHeight-100)] font-bold tracking-[var(--vapor-typography-letterSpacing-100)]'>
          {arriveName} ({arriveTime})
        </Text>
        {/* 4행: 노트 - 우측 내용 시작선(col 2)과 동일 정렬 */}
        <div /> {/* col-1 비움 */}
        <Text className='text-sm leading-[var(--vapor-typography-lineHeight-050)] font-medium tracking-[var(--vapor-typography-letterSpacing-100)] text-[#959595]'>
          {note}
        </Text>
      </div>
    </Box>
  );
}

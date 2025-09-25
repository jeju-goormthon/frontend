// RouteSelectPage.tsx
import { Box, Flex, Radio, RadioGroup, Text, Tooltip } from '@vapor-ui/core';
import { LocationOutlineIcon } from '@vapor-ui/icons';
import { useMemo, useState } from 'react';

import RightShootIcon from '@/assets/icons/RightShootIcon';

type RouteItem = {
  id: string;
  title: string;
  walkMin: number;
  depart: string;
  arrive: string;
  durationMin: number;
  seatsLeft: number;
};

const MOCK_ROUTES: RouteItem[] = [
  { id: 'r1', title: '애월읍사무소 앞', walkMin: 5, depart: '09:00', arrive: '09:30', durationMin: 30, seatsLeft: 12 },
  {
    id: 'r2',
    title: '고성1리 사무소 버스정류장',
    walkMin: 7,
    depart: '10:15',
    arrive: '10:45',
    durationMin: 30,
    seatsLeft: 2,
  },
  {
    id: 'r3',
    title: '고내 지발해변 정류장',
    walkMin: 9,
    depart: '11:30',
    arrive: '12:10',
    durationMin: 40,
    seatsLeft: 5,
  },
];

type SortKey = 'fast' | 'nearest';

export default function RouteSelectList() {
  const [value, setValue] = useState<string>(MOCK_ROUTES[0].id);

  // ✅ 단일 선택(라디오처럼)
  const [sortKey, setSortKey] = useState<SortKey>('fast');

  // 정렬 (API 연동 시 sortKey만 서버로 보내면 됨)
  const list = useMemo(() => {
    const arr = [...MOCK_ROUTES];
    if (sortKey === 'fast') arr.sort((a, b) => a.depart.localeCompare(b.depart));
    if (sortKey === 'nearest') arr.sort((a, b) => a.walkMin - b.walkMin);
    return arr;
  }, [sortKey]);

  return (
    <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      {/* 필터 영역: 알약 버튼 2개 (단일 선택) */}
      <Flex alignItems='center' gap='$075' style={{ paddingBottom: 24 }}>
        <PillButton active={sortKey === 'fast'} ariaLabel='빠른 출발순으로 정렬' onClick={() => setSortKey('fast')}>
          빠른 출발순
        </PillButton>
        <PillButton
          active={sortKey === 'nearest'}
          ariaLabel='최단 거리순으로 정렬'
          onClick={() => setSortKey('nearest')}
        >
          최단 거리순
        </PillButton>
      </Flex>

      {/* 라디오 리스트 */}
      <RadioGroup.Root aria-label='노선 선택' value={value} onValueChange={(newValue) => setValue(String(newValue))}>
        <Flex flexDirection='column' gap='$150'>
          {list.map((item) => (
            <RouteOptionCard key={item.id} checked={value === item.id} item={item} onSelect={() => setValue(item.id)} />
          ))}
        </Flex>
      </RadioGroup.Root>
    </Box>
  );
}

/* ===== Sub Components ===== */

/** 알약 버튼 (단일 선택용) */
function PillButton({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`leading-v-75 tracking-v-100 inline-flex h-8 items-center rounded-full border px-3 text-sm font-medium transition ${
        active
          ? 'border-[#393939] bg-[#393939] text-white shadow-sm'
          : 'border-[var(--vapor-color-border-subtle)] bg-white text-[#9AA2AE]'
      } `}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/** 라디오 카드 — 합성 컴포넌트: RadioGroup.Item + RadioGroup.Indicator */
function RouteOptionCard({ item, checked, onSelect }: { item: RouteItem; checked: boolean; onSelect: () => void }) {
  const shadow = checked
    ? '0 0 0 1px rgba(49,116,220,0.04), 0 8px 20px rgba(0,0,0,0.04)'
    : 'inset 0 0 0 1px rgba(0,0,0,0.02)';
  return (
    <Box
      style={{
        background: '#fff',
        border: checked ? '1.5px solid #3174DC' : '1.5px solid #F0F0F0',
        borderColor: checked ? '#3174DC' : '#F0F0F0',
        borderRadius: 'var(--vapor-size-borderRadius-500)',
        backgroundColor: checked ? '#F1F7FF' : '#fff',
        boxShadow: shadow,
        padding: 16,
        cursor: 'pointer',
        outline: 'none',
      }}
      onClick={onSelect}
    >
      <Flex alignItems='center' gap={12}>
        {/* 좌측 라디오: Item만 사용 */}
        <RadioGroup.Root defaultValue='v1' name='route' value={item.id} onClick={(e) => e.stopPropagation()} />
        {/* 본문 */} <Radio.Root value={item.id} />
        <Flex alignItems='center' className='pl-3.5' justifyContent='between' style={{ flex: 1 }}>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{item.title}</Text>

              {/* ⬇️ 아이콘을 버튼으로, Tooltip 적용 */}
              <Tooltip.Root delay={0}>
                <Tooltip.Trigger
                  render={
                    <button
                      aria-label='정류장 위치를 확인할 수 있어요'
                      className='inline-grid h-8 w-8 place-items-center rounded-sm hover:bg-black/5 focus:ring-2 focus:ring-[#3174DC]/50 focus:outline-none'
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation(); // 카드 선택 이벤트와 분리
                        // TODO: 실제 지도로 이동할 경로로 바꿔주세요
                        window.location.href = `/map?station=${encodeURIComponent(item.id)}`;
                      }}
                    >
                      <LocationOutlineIcon className='text-[#393939]' />
                    </button>
                  }
                />
                <Tooltip.Portal>
                  <Tooltip.Positioner align='end' side='top'>
                    <Tooltip.Content
                      // 말풍선(회색 알약 + 꼬리) 스타일
                      className='rounded-sm bg-[#4A4A4A] px-3 py-1 text-xs font-normal text-white shadow-lg'
                    >
                      정류장 위치를 확인할 수 있어요
                    </Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Flex>

            <Text style={{ marginTop: 4, color: 'var(--vapor-color-fg-muted)', fontSize: 12, fontWeight: 500 }}>
              <span className='font-medium text-[#959595] select-none'>정류장까지</span> 도보 {item.walkMin}분
            </Text>
            <Flex alignItems='center' className='select-none' gap={8}>
              <Text style={{ color: '#3174DC' }} typography='subtitle2'>
                출발 <span className='pr-1 text-sm font-bold text-[#262626] select-none'>{item.depart}</span>
              </Text>
              <RightShootIcon className='text-[#B4B4B4]' />
              <Text style={{ color: '#3174DC', padding: '0 4px' }} typography='subtitle2'>
                도착 <span className='text-sm font-bold text-[#262626] select-none'>{item.arrive}</span>
              </Text>
              <Text className='pl-v-150 select-none' typography='subtitle2'>
                {item.durationMin}분
              </Text>
            </Flex>
            <Text style={{ color: item.seatsLeft <= 5 ? '#D92D20' : '#12B76A' }} typography='subtitle2'>
              {item.seatsLeft}/20 석
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

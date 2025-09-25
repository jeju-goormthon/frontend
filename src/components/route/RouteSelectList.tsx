// RouteSelectPage.tsx
import { Box, Checkbox, Flex, Radio, RadioGroup, Text } from '@vapor-ui/core';
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

export default function RouteSelectList() {
  const [value, setValue] = useState<string>(MOCK_ROUTES[0].id);

  // 필터(정렬) UI 상태
  const [byFast, setByFast] = useState(true);
  const [byNearest, setByNearest] = useState(true);

  // 정렬 적용(실제 정렬/필터링은 추후 API 연동)
  const list = useMemo(() => {
    const arr = [...MOCK_ROUTES];
    if (byFast) arr.sort((a, b) => a.depart.localeCompare(b.depart));
    if (byNearest) arr.sort((a, b) => a.walkMin - b.walkMin);
    return arr;
  }, [byFast, byNearest]);

  return (
    <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      {/* 필터 영역 */}
      <Flex alignItems='center' gap='$200' style={{ paddingBottom: 24 }}>
        <FilterCheckbox checked={byFast} id='fast' label='빠른 출발순' onCheckedChange={(v) => setByFast(v === true)} />
        <FilterCheckbox
          checked={byNearest}
          id='nearest'
          label='최단 거리순'
          onCheckedChange={(v) => setByNearest(v === true)}
        />
      </Flex>

      {/* 라디오 리스트 */}
      <RadioGroup.Root
        aria-label='노선 선택'
        value={value}
        onValueChange={(newValue, _evt) => setValue(String(newValue))}
      >
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

/** 필터 체크박스(알약 형태 라벨) — 합성 컴포넌트 사용 */
function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
  disabled,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean | 'indeterminate') => void;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        borderRadius: 9999,
        border: checked ? '1px #3174DC' : '1px var(--vapor-color-border-subtle)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <Checkbox.Root
        checked={checked}
        disabled={disabled}
        id={id}
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: '1px solid var(--vapor-color-border)',
          display: 'grid',
          placeItems: 'center',
          background: checked ? '#3174DC' : '#EEF2F6', // ✅ 항상 네모 보이게
        }}
        onCheckedChange={onCheckedChange}
      />

      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: checked ? '#3174DC' : '#98A2B3',
        }}
      >
        {label}
      </span>
    </label>
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
        padding: 16, // 내부 패딩 16px
        cursor: 'pointer',
        outline: 'none',
      }}
      onClick={onSelect}
    >
      <Flex alignItems='center' gap={12}>
        {/* 좌측 라디오: Item만 사용 */}
        <RadioGroup.Root
          defaultValue='v1'
          name='route'
          //   style={{
          //     width: 16,
          //     height: 16,
          //     borderRadius: '50%',
          //     border: checked ? '5px solid #3174DC' : '1.5px solid var(--vapor-color-border)',
          //     background: '#fff',
          //     flex: '0 0 auto',
          //   }}
          value={item.id}
          onClick={(e) => e.stopPropagation()} // 카드 onClick과 중복 방지
        />

        {/* 본문 */}
        <Radio.Root value={item.id} />
        <Flex alignItems='center' className='pl-3.5' justifyContent='between' style={{ flex: 1 }}>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{item.title}</Text>
              <LocationOutlineIcon className='text-[#393939]' />
            </Flex>

            <Text style={{ marginTop: 4, color: 'var(--vapor-color-fg-muted)', fontSize: 12, fontWeight: 500 }}>
              <span className='font-medium text-[#959595]'>정류장까지</span> 도보 {item.walkMin}분
            </Text>

            <Flex alignItems='center' gap={8}>
              <Text style={{ color: '#3174DC' }} typography='subtitle2'>
                출발 <span className='pr-1 text-sm font-bold text-[#262626]'>{item.depart}</span>
              </Text>
              <RightShootIcon className='text-[#B4B4B4]' />
              <Text style={{ color: '#3174DC', padding: '0 4px' }} typography='subtitle2'>
                도착 <span className='text-sm font-bold text-[#262626]'>{item.arrive}</span>
              </Text>

              <Text className='pl-v-150' typography='subtitle2'>
                {item.durationMin}분
              </Text>
            </Flex>

            <Text
              style={{
                color: item.seatsLeft <= 5 ? '#D92D20' : '#12B76A',
              }}
              typography='subtitle2'
            >
              {item.seatsLeft}/20 석
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

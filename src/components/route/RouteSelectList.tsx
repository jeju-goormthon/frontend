// RouteSelectPage.tsx
import { Box, Checkbox, Flex, IconButton, RadioGroup, Text } from '@vapor-ui/core';
import { LocationOutlineIcon } from '@vapor-ui/icons';
import { useMemo, useState } from 'react';

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
    <Box style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      {/* 필터 영역 */}
      <Flex alignItems='center' gap={12} style={{ padding: 8, paddingBottom: 12 }}>
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
        <Flex flexDirection='column' gap={12}>
          {list.map((item) => (
            <RouteOptionCard
              key={item.id}
              checked={value === item.id}
              item={item}
              onLocate={() => console.log('locate:', item.id)}
              onSelect={() => setValue(item.id)}
            />
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
  // ✅ 라벨 opacity는 제거하고 색상만 조절
  const pillBorder = checked ? '1px solid #3174DC' : '1px solid var(--vapor-color-border-subtle)';
  const textColor = disabled ? 'var(--vapor-color-fg-muted)' : checked ? '#3174DC' : '#959595'; // 회색(항상 보이도록)

  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 9999,
        border: pillBorder,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
    >
      <Checkbox.Root
        checked={checked}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
        // ✅ hover 없이도 상시 보이게: unchecked에도 회색 배경 + 테두리 유지
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          display: 'grid',
          placeItems: 'center',
          border: checked ? '1px solid #3174DC' : '1px solid #E5E7EB',
          background: checked ? '#3174DC' : '#959595', // <- 회색 네모 항상 보임
          transition: 'background 120ms, border-color 120ms, box-shadow 120ms',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.02)',
        }}
      >
        <Checkbox.Indicator>
          {/* 체크 상태에서만 보이는 흰 점 */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: '#fff',
            }}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <Text style={{ fontWeight: 600, color: textColor }}>{label}</Text>
    </label>
  );
}

/** 라디오 카드 — 합성 컴포넌트: RadioGroup.Item + RadioGroup.Indicator */
function RouteOptionCard({
  item,
  checked,
  onSelect,
  onLocate,
}: {
  item: RouteItem;
  checked: boolean;
  onSelect: () => void;
  onLocate: () => void;
}) {
  const border = checked ? '1.5px solid #3174DC' : '1px solid var(--vapor-color-border-subtle)';
  const shadow = checked
    ? '0 0 0 1px rgba(49,116,220,0.04), 0 8px 20px rgba(0,0,0,0.04)'
    : 'inset 0 0 0 1px rgba(0,0,0,0.02)';

  return (
    <Box
      style={{
        background: '#fff',
        border,
        borderRadius: 'var(--vapor-size-borderRadius-500)',
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
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: checked ? '5px solid #3174DC' : '1.5px solid var(--vapor-color-border)',
            background: '#fff',
            flex: '0 0 auto',
          }}
          value={item.id}
          onClick={(e) => e.stopPropagation()} // 카드 onClick과 중복 방지
        />

        {/* 본문 */}
        <Flex alignItems='center' justifyContent='between' style={{ flex: 1 }}>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Flex alignItems='center' justifyContent='between'>
              <Text style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{item.title}</Text>
              <IconButton aria-label='정류장 위치 보기' className='bg-white' size='sm'>
                <LocationOutlineIcon className='bg-white text-[#393939]' />
              </IconButton>
            </Flex>

            <Text style={{ marginTop: 4, color: 'var(--vapor-color-fg-muted)', fontSize: 13 }}>
              정류장까지 도보 {item.walkMin}분
            </Text>

            <Flex alignItems='center' gap={8} style={{ marginTop: 8 }}>
              <Text style={{ color: '#3174DC', fontWeight: 700 }}>출발 {item.depart}</Text>
              <Text aria-hidden>→</Text>
              <Text style={{ color: '#3174DC', fontWeight: 700 }}>도착 {item.arrive}</Text>

              <Flex alignItems='center' gap={4} style={{ marginLeft: 8 }}>
                <Text style={{ color: 'var(--vapor-color-fg-muted)' }}>{item.durationMin}분</Text>
              </Flex>
            </Flex>

            <Text
              style={{
                marginTop: 8,
                fontWeight: 600,
                color: item.seatsLeft <= 3 ? '#D92D20' : '#12B76A',
              }}
            >
              {item.seatsLeft}석 남음
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

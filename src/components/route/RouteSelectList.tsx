// RouteSelectPage.tsx
import { Box, Checkbox, Flex, Radio, RadioGroup, Text } from '@vapor-ui/core';
import { LocationOutlineIcon } from '@vapor-ui/icons';
import { useEffect, useMemo, useState } from 'react';

import { getRoutes } from '@/apis/routes';
import type { RouteResponse } from '@/apis/types';
import RightShootIcon from '@/assets/icons/RightShootIcon';
import { useRouteStore } from '@/stores/routeStore';

interface RouteSelectListProps {
  selectedDate: Date | null;
}

export default function RouteSelectList({ selectedDate }: RouteSelectListProps) {
  const { selectedRoute, setSelectedRoute } = useRouteStore();
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 필터(정렬) UI 상태
  const [byFast, setByFast] = useState(true);
  const [byNearest, setByNearest] = useState(true);

  // 노선 목록 가져오기
  useEffect(() => {
    const fetchRoutes = async () => {
      if (!selectedDate) return;

      setLoading(true);
      setError(null);

      try {
        let sortBy = 'default';
        if (byFast && byNearest) {
          sortBy = 'time_distance';
        } else if (byFast) {
          sortBy = 'time';
        } else if (byNearest) {
          sortBy = 'distance';
        }

        const data = await getRoutes(sortBy);
        setRoutes(data);
      } catch (err: any) {
        setError(err.message);
        console.error('노선 목록 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [selectedDate, byFast, byNearest]);

  // 정렬 적용
  const list = useMemo(() => {
    const arr = [...routes];
    if (byFast) {
      arr.sort((a, b) => a.startAt.localeCompare(b.startAt));
    }
    return arr;
  }, [routes, byFast]);

  const handleRouteSelect = (route: RouteResponse) => {
    setSelectedRoute(route);
  };

  // 로딩 상태 표시
  if (loading) {
    return (
      <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24, textAlign: 'center' }}>
        <Text>노선 목록을 불러오는 중...</Text>
      </Box>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24, textAlign: 'center' }}>
        <Text style={{ color: 'red' }}>오류: {error}</Text>
      </Box>
    );
  }

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

      {/* 노선이 없을 때 */}
      {list.length === 0 && !loading && (
        <Box style={{ textAlign: 'center', padding: 40 }}>
          <Text>선택한 날짜에 운행하는 노선이 없습니다.</Text>
        </Box>
      )}

      {/* 라디오 리스트 */}
      {list.length > 0 && (
        <RadioGroup.Root
          aria-label='노선 선택'
          value={selectedRoute?.id?.toString() || ''}
          onValueChange={(newValue) => {
            const route = list.find((r) => r.id.toString() === newValue);
            if (route) handleRouteSelect(route);
          }}
        >
          <Flex flexDirection='column' gap='$150'>
            {list.map((item) => (
              <RouteOptionCard
                key={item.id}
                checked={selectedRoute?.id === item.id}
                item={item}
                onSelect={() => handleRouteSelect(item)}
              />
            ))}
          </Flex>
        </RadioGroup.Root>
      )}
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

/** 라디오 카드 — API 데이터 기반 */
function RouteOptionCard({ item, checked, onSelect }: { item: RouteResponse; checked: boolean; onSelect: () => void }) {
  const shadow = checked
    ? '0 0 0 1px rgba(49,116,220,0.04), 0 8px 20px rgba(0,0,0,0.04)'
    : 'inset 0 0 0 1px rgba(0,0,0,0.02)';

  // 시간 형식 변환 (HH:mm:ss -> HH:mm)
  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

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
        {/* 좌측 라디오 */}
        <Radio.Root value={item.id.toString()} />

        <Flex alignItems='center' className='pl-3.5' justifyContent='between' style={{ flex: 1 }}>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{item.pickupLocation}</Text>
              <LocationOutlineIcon className='text-[#393939]' />
            </Flex>

            <Text style={{ marginTop: 4, color: 'var(--vapor-color-fg-muted)', fontSize: 12, fontWeight: 500 }}>
              <span className='font-medium text-[#959595]'>병원:</span> {item.hospitalName}
            </Text>

            <Flex alignItems='center' gap={8} style={{ marginTop: 8 }}>
              <Text style={{ color: '#3174DC' }} typography='subtitle2'>
                출발 <span className='pr-1 text-sm font-bold text-[#262626]'>{formatTime(item.startAt)}</span>
              </Text>
              <RightShootIcon className='text-[#B4B4B4]' />
              <Text style={{ color: '#3174DC', padding: '0 4px' }} typography='subtitle2'>
                도착 <span className='text-sm font-bold text-[#262626]'>{formatTime(item.endAt)}</span>
              </Text>

              <Text style={{ marginLeft: 'auto' }} typography='subtitle2'>
                {item.expectedTime}분
              </Text>
            </Flex>

            <Text
              style={{
                color: item.remainedSeat <= 5 ? '#D92D20' : '#12B76A',
                marginTop: 4,
              }}
              typography='subtitle2'
            >
              {item.remainedSeat}석 남음 / {item.totalSeat}석
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

// RouteSelectList.tsx
import { Box, Flex, Radio, RadioGroup, Text, Tooltip } from '@vapor-ui/core';
import { LocationOutlineIcon } from '@vapor-ui/icons';
import { useEffect, useState } from 'react';

import { getRoutes } from '@/apis/routes';
import type { RouteResponse } from '@/apis/types';
import RightShootIcon from '@/assets/icons/RightShootIcon';
import { useRouteStore } from '@/stores/routeStore';

type SortKey = 'fast' | 'nearest';

export default function RouteSelectList() {
  const { selectedRoute, setSelectedRoute, setSortBy } = useRouteStore();

  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKeyLocal] = useState<SortKey>('fast');

  // Fetch routes from API
  useEffect(() => {
    async function fetchRoutes() {
      try {
        setLoading(true);
        setError(null);
        const sortParam = sortKey === 'fast' ? 'startTime' : 'location';
        const response = await getRoutes(sortParam);
        console.log('API Response:', response); // Debug log

        // Handle different API response formats
        let routeData: RouteResponse[] = [];
        if (Array.isArray(response)) {
          routeData = response;
        } else if (response && (response as any).data && Array.isArray((response as any).data)) {
          routeData = (response as any).data;
        } else if (response && (response as any).success && Array.isArray((response as any).data)) {
          routeData = (response as any).data;
        } else if (response && typeof response === 'object') {
          // Check if response has route-like properties
          const keys = Object.keys(response);
          if (keys.includes('id') && keys.includes('hospitalName')) {
            // Single route object, wrap in array
            routeData = [response as RouteResponse];
          } else {
            console.error('Unexpected API response format:', response);
            routeData = [];
          }
        } else {
          console.error('Unexpected API response format:', response);
          routeData = [];
        }

        console.log('Processed route data:', routeData); // Debug log
        setRoutes(routeData);
      } catch (err) {
        console.error('Failed to fetch routes:', err);
        // Use mock data as fallback for development/testing
        const mockRoutes: RouteResponse[] = [
          {
            id: 1,
            hospitalName: '제주대학교병원',
            startAt: '09:00:00',
            endAt: '09:30:00',
            expectedTime: 30,
            remainedSeat: 12,
            totalSeat: 20,
            pickupLocation: '애월읍사무소 앞',
          },
          {
            id: 2,
            hospitalName: '제주대학교병원',
            startAt: '10:15:00',
            endAt: '10:45:00',
            expectedTime: 30,
            remainedSeat: 2,
            totalSeat: 20,
            pickupLocation: '고성1리 사무소 버스정류장',
          },
          {
            id: 3,
            hospitalName: '제주대학교병원',
            startAt: '11:30:00',
            endAt: '12:10:00',
            expectedTime: 40,
            remainedSeat: 5,
            totalSeat: 20,
            pickupLocation: '고내 지발해변 정류장',
          },
        ];

        console.log('Using mock data due to API error');
        setRoutes(mockRoutes);
        setError(`API 연결 실패 - 테스트 데이터로 동작 중: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchRoutes();
  }, [sortKey]);

  // Handle sort key change
  const handleSortKeyChange = (newSortKey: SortKey) => {
    setSortKeyLocal(newSortKey);
    const sortParam = newSortKey === 'fast' ? 'startTime' : 'location';
    setSortBy(sortParam);
  };

  // Handle route selection
  const handleRouteSelect = (route: RouteResponse) => {
    setSelectedRoute(route);
  };

  // Loading state
  if (loading) {
    return (
      <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        <Text>노선을 불러오는 중...</Text>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        <Text style={{ color: '#D92D20' }}>❌ {error}</Text>
      </Box>
    );
  }

  // Empty state
  if (routes.length === 0) {
    return (
      <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        <Text>선택 가능한 노선이 없습니다.</Text>
      </Box>
    );
  }

  return (
    <Box style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      {/* 필터 영역: 알약 버튼 2개 (단일 선택) */}
      <Flex alignItems='center' gap='$075' style={{ paddingBottom: 24 }}>
        <PillButton
          active={sortKey === 'fast'}
          ariaLabel='빠른 출발순으로 정렬'
          onClick={() => handleSortKeyChange('fast')}
        >
          빠른 출발순
        </PillButton>
        <PillButton
          active={sortKey === 'nearest'}
          ariaLabel='최단 거리순으로 정렬'
          onClick={() => handleSortKeyChange('nearest')}
        >
          최단 거리순
        </PillButton>
      </Flex>

      {/* 라디오 리스트 */}
      <RadioGroup.Root
        aria-label='노선 선택'
        value={selectedRoute?.id.toString() || ''}
        onValueChange={(newValue) => {
          const route = routes.find((r) => r.id.toString() === newValue);
          if (route) handleRouteSelect(route);
        }}
      >
        <Flex flexDirection='column' gap='$150'>
          {routes.map((route) => (
            <RouteOptionCard
              key={route.id}
              checked={selectedRoute?.id === route.id}
              route={route}
              onSelect={() => handleRouteSelect(route)}
            />
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
function RouteOptionCard({
  route,
  checked,
  onSelect,
}: {
  route: RouteResponse;
  checked: boolean;
  onSelect: () => void;
}) {
  // Format time from "HH:mm:ss" to "HH:mm"
  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  // Calculate walking time (mock data for now)
  const walkMin = Math.floor(Math.random() * 10) + 3; // 3-12 minutes
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
        {/* 좌측 라디오 */}
        <Radio.Root value={route.id.toString()} />
        <Flex alignItems='center' className='pl-3.5' justifyContent='between' style={{ flex: 1 }}>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{route.pickupLocation}</Text>

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
                        window.location.href = `/map?station=${encodeURIComponent(route.id.toString())}`;
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
              <span className='font-medium text-[#959595] select-none'>정류장까지</span> 도보 {walkMin}분
            </Text>
            <Flex alignItems='center' className='select-none' gap={8}>
              <Text style={{ color: '#3174DC' }} typography='subtitle2'>
                출발{' '}
                <span className='pr-1 text-sm font-bold text-[#262626] select-none'>{formatTime(route.startAt)}</span>
              </Text>
              <RightShootIcon className='text-[#B4B4B4]' />
              <Text style={{ color: '#3174DC', padding: '0 4px' }} typography='subtitle2'>
                도착 <span className='text-sm font-bold text-[#262626] select-none'>{formatTime(route.endAt)}</span>
              </Text>
              <Text className='pl-v-150 select-none' typography='subtitle2'>
                {route.expectedTime}분
              </Text>
            </Flex>
            <Text style={{ color: route.remainedSeat <= 5 ? '#D92D20' : '#12B76A' }} typography='subtitle2'>
              {route.remainedSeat}/{route.totalSeat} 석
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

// ReservationHistoryPage.tsx
import { Badge, Box, Card, Flex, HStack, Text, VStack } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyReservations } from '@/apis/reservations';
import type { ReservationResponse } from '@/apis/types';

function PillButton({
  active,
  children,
  onClick,
  ariaLabel,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={
        'leading-v-75 tracking-v-100 inline-flex h-8 items-center rounded-full px-3 text-sm transition ' +
        (active
          ? 'bg-[#393939] text-[#FFFFFF]'
          : 'border border-[#E1E1E1] bg-[#FFFFFF] text-[#5D5D5D] hover:bg-[#ECEEF2]')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type FilterKey = 'upcoming' | 'past';

export default function ReservationHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>('upcoming');
  const [data, setData] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- util: 날짜/시간 파싱 & 포맷 ---
  const toDate = (dateStr: string, timeStr: string) => {
    // ReservationResponse의 reservationDate와 startTime을 조합
    return new Date(`${dateStr}T${timeStr}`);
  };

  const formatKoreanDate = (d: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const yy = d.getFullYear();
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const dd = `${d.getDate()}`.padStart(2, '0');
    const w = days[d.getDay()];
    return `${yy}.${mm}.${dd}(${w})`;
  };

  const formatKoreanTime = (d: Date) => {
    let h = d.getHours();
    const m = `${d.getMinutes()}`.padStart(2, '0');
    const ap = h < 12 ? '오전' : '오후';
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${ap} ${`${h}`.padStart(2, '0')}:${m}`;
    // 요구사항이 "오전 09:00" 형태라면 padStart 유지
  };

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = startOfDay(new Date());

  // --- 상대 배지 ---
  const relativeBadge = (rideDate: Date) => {
    const dOnly = startOfDay(rideDate);
    const diffDays = Math.round((dOnly.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return {
        text: '오늘',
        bg: '#EAF2FF',
        color: '#3174DC',
      };
    }
    if (diffDays > 0) {
      return {
        text: `${diffDays}일 뒤`,
        bg: '#EAF2FF',
        color: '#3174DC',
      };
    }
    // 과거
    return {
      text: `${Math.abs(diffDays)}일 전`,
      bg: '#FFF6F1',
      color: '#EF6F25',
    };
  };

  // --- fetch ---
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const reservations = await getMyReservations();

        if (mounted) {
          setData(reservations);
        }
      } catch (e) {
        console.error('예약 목록 조회 실패:', e);
        if (mounted) {
          setError(e instanceof Error ? e.message : '예약 목록을 불러올 수 없습니다.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // --- 필터링 & 정렬 ---
  const filtered = useMemo(() => {
    const list = data
      .map((r) => {
        const d = toDate(r.reservationDate, r.startTime);
        return {
          ...r,
          _date: d,
          displayDate: formatKoreanDate(d),
          displayTime: formatKoreanTime(d),
          badge: relativeBadge(d),
        };
      })
      .filter((r) => {
        const rideDay = startOfDay(r._date).getTime();
        const t = today.getTime();
        return filter === 'upcoming' ? rideDay >= t : rideDay < t;
      })
      .filter((r) => r.status !== 'CANCELLED')
      .sort((a, b) =>
        filter === 'upcoming' ? a._date.getTime() - b._date.getTime() : b._date.getTime() - a._date.getTime(),
      );

    return list;
  }, [data, filter]);

  const goDetail = (id: number) => {
    navigate(`/reservations/${id}/ticket`);
  };

  return (
    <Box style={{ width: '100%' }}>
      {/* 필터: 하나만 선택 */}
      <Flex alignItems='center' gap='$075' style={{ paddingTop: 20, paddingBottom: 20 }}>
        <PillButton active={filter === 'upcoming'} ariaLabel='다가올 예약만 보기' onClick={() => setFilter('upcoming')}>
          다가올 예약
        </PillButton>
        <PillButton active={filter === 'past'} ariaLabel='지난 예약만 보기' onClick={() => setFilter('past')}>
          지난 예약
        </PillButton>
      </Flex>

      {/* 리스트 */}
      {loading ? (
        <Text className='text-[#6B7280]'>불러오는 중…</Text>
      ) : error ? (
        <Box className='rounded-2xl' style={{ background: '#F7F8FA', padding: 24, textAlign: 'center' }}>
          <Text className='text-[#D92D20]'>{error}</Text>
        </Box>
      ) : filtered.length === 0 ? (
        <Box className='rounded-2xl' style={{ background: '#F7F8FA', padding: 24, textAlign: 'center' }}>
          <Text className='text-[#6B7280]'>표시할 예약이 없습니다.</Text>
        </Box>
      ) : (
        filtered.map((reservation, idx) => (
          <Card.Root
            key={reservation.id}
            style={{
              width: '100%',
              marginTop: idx === 0 ? 8 : 12,
              borderRadius: 16,
              borderColor: '#F0F0F0',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => goDetail(reservation.id)}
          >
            <VStack alignItems='start' paddingX='$250' paddingY='$200'>
              <HStack alignItems='center' paddingBottom='$150'>
                <Text className='text-base font-medium'>{reservation.displayDate}</Text>
                <Badge
                  className='mx-1.5 font-medium'
                  shape='square'
                  size='sm'
                  style={{
                    background: reservation.badge.bg,
                    color: reservation.badge.color,
                  }}
                >
                  {reservation.badge.text}
                </Badge>
              </HStack>

              <Text className='mb-1 text-[#959595]' typography='subtitle1'>
                탑승시간<span className='pl-3 text-base text-[#262626]'>{reservation.displayTime} </span>
              </Text>
              <Text className='mb-1 text-[#959595]' typography='subtitle1'>
                출발장소<span className='pl-3 text-base text-[#262626]'>{reservation.pickupLocation}</span>
              </Text>
              <Text className='mb-1 text-[#959595]' typography='subtitle1'>
                병원<span className='pl-3 text-base text-[#262626]'>{reservation.hospitalName}</span>
              </Text>
            </VStack>

            {/* 우측 화살표 */}
            <Box
              aria-hidden
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronRightOutlineIcon className='h-5 w-5 text-[#5D5D5D]' />
            </Box>
          </Card.Root>
        ))
      )}
    </Box>
  );
}

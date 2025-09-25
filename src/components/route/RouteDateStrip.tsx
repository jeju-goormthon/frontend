// src/features/route/RouteDateStrip.tsx
import {
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  month: Date; // 기준 월
  value: Date | null; // 선택된 날짜
  onChange: (d: Date) => void; // 날짜 선택 콜백
  onMonthChange?: (m: Date) => void; // 월 변경 콜백(상위 state)
  minDate?: Date;
  maxDate?: Date;
  weekStartsOn?: 0 | 1; // 0: 일요일, 1: 월요일(기본)
};

/** 월의 주(월~일) 배열 생성 */
function buildWeeksInMonth(month: Date, weekStartsOn: 0 | 1) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  let cursor = startOfWeek(monthStart, { weekStartsOn });
  const last = endOfWeek(monthEnd, { weekStartsOn });
  const weeks: Date[][] = [];
  while (cursor <= last) {
    const start = cursor;
    const end = endOfWeek(start, { weekStartsOn });
    weeks.push(eachDayOfInterval({ start, end }));
    cursor = addWeeks(cursor, 1);
  }
  return weeks;
}

/** 초기 화면 전용: '오늘부터 7일(연속)' */
function forward7FromToday(allWeeks: Date[][], today: Date): Date[] {
  const flat = allWeeks.flat();
  const base = flat.findIndex((d) => isSameDay(d, today));
  if (base === -1) return allWeeks[0] ?? [];
  return flat.slice(base, base + 7);
}

export default function RouteDateStrip({
  month,
  value,
  onChange,
  onMonthChange,
  minDate,
  maxDate,
  weekStartsOn = 1,
}: Props) {
  // ── 데이터 준비 ───────────────────────────────────────────────
  const weeks = useMemo(() => buildWeeksInMonth(month, weekStartsOn), [month, weekStartsOn]);
  const todayStart = startOfDay(new Date());
  const todayWeekIndex = useMemo(
    () => weeks.findIndex((w) => w.some((d) => isSameDay(d, todayStart))),
    [weeks, todayStart],
  );

  // ── Embla(수평 슬라이더) ─────────────────────────────────────
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
  const [page, setPage] = useState(0); // 현재 페이지(주) 인덱스
  const [primeTodayLeft, setPrimeTodayLeft] = useState(true); // 첫 진입에만 '오늘 왼쪽' 연출

  // ── 드롭다운 상태 ────────────────────────────────────────────
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        popRef.current &&
        triggerRef.current &&
        !popRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  // Embla: 페이지 인덱스 동기화(무한 스크롤 제거 → 월 전환 로직 없음)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const sel = emblaApi.selectedScrollSnap();
      setPage(sel);
      if (sel !== todayWeekIndex) setPrimeTodayLeft(false); // 다른 주로 이동하면 초기 연출 해제
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, todayWeekIndex]);

  // 첫 진입/선택 변경 시: 선택된 날짜가 속한 주로 스크롤
  useEffect(() => {
    if (!emblaApi || !value) return;

    const idx = weeks.findIndex((w) => w.some((d) => isSameDay(d, value)));
    if (idx >= 0) {
      emblaApi.scrollTo(idx, true);
      setPage(idx);
      if (idx !== todayWeekIndex) setPrimeTodayLeft(false);
    }
  }, [emblaApi, value, weeks, todayWeekIndex]);

  // 현재 페이지에서 보여줄 주(헤더/바디 공통)
  const currentWeekRaw = weeks[page] ?? weeks[0] ?? [];
  const currentWeekForView =
    primeTodayLeft && page === todayWeekIndex ? forward7FromToday(weeks, todayStart) : currentWeekRaw;

  // 드롭다운 월 목록(현재 기준 -2 ~ +8)
  const monthOptions = useMemo(() => {
    const base = startOfMonth(month);
    return Array.from({ length: 11 }, (_, i) => addMonths(base, i - 2));
  }, [month]);

  // 월 수동 변경: 이번 달이면 오늘, 그 외에는 1일을 자동 선택
  const changeMonth = (next: Date) => {
    const first = startOfMonth(next);
    const autoSelect = isSameMonth(todayStart, next) && first < todayStart ? todayStart : first;
    onMonthChange?.(first);
    onChange(autoSelect);
    setOpen(false);
    setPrimeTodayLeft(true); // 사용자가 점프했을 때 다시 최초 연출 허용
  };

  // ── UI ───────────────────────────────────────────────────────
  return (
    <div className='w-full'>
      {/* 상단: 월 + 드롭다운 */}
      <div className='relative mb-4 flex items-center gap-0 pl-6'>
        <div className='text-sm font-semibold'>{format(month, 'M월', { locale: ko })}</div>

        <button
          ref={triggerRef}
          aria-expanded={open}
          aria-haspopup='listbox'
          className='inline-flex items-center gap-1 rounded-md px-1 py-1 text-[12px] text-[var(--vapor-color-text-secondary,#6b7280)] hover:bg-gray-50'
          type='button'
          onClick={() => setOpen((s) => !s)}
        >
          <svg aria-hidden fill='none' height='14' viewBox='0 0 24 24' width='14'>
            <path d='M6 9l6 6 6-6' stroke='currentColor' strokeLinecap='round' strokeWidth='1.6' />
          </svg>
        </button>

        {open && (
          <div
            ref={popRef}
            className='absolute top-7 left-[35px] z-20 w-36 overflow-hidden rounded-lg bg-white shadow-lg'
            role='listbox'
          >
            <div className='max-h-64 overflow-y-auto py-1'>
              {monthOptions.map((m) => {
                const active = isSameMonth(m, month);
                return (
                  <button
                    key={m.toISOString()}
                    className={[
                      'flex w-full items-center justify-between px-2 py-2 text-left text-[13px]',
                      active
                        ? 'bg-[var(--vapor-color-primary-50,#eff6ff)] text-[#3174DC]'
                        : 'text-[var(--vapor-color-text-primary,#111827)] hover:bg-gray-50',
                    ].join(' ')}
                    onClick={() => changeMonth(m)}
                  >
                    <span>{format(m, 'yyyy년 M월', { locale: ko })}</span>
                    {active && (
                      <svg aria-hidden fill='none' height='16' viewBox='0 0 24 24' width='16'>
                        <path d='M20 6L9 17l-5-5' stroke='currentColor' strokeLinecap='round' strokeWidth='1.8' />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 퀵 액션 */}
            <div className='flex border-t border-[var(--vapor-color-border,#e5e7eb)]'>
              <button
                className='flex-1 px-1 py-2 text-[10px] hover:bg-gray-50'
                onClick={() => changeMonth(subMonths(month, 1))}
              >
                이전
              </button>
              <button
                className='flex-1 border-l border-[var(--vapor-color-border,#e5e7eb)] px-1 py-1 text-[10px] font-bold text-[#3174DC] hover:bg-gray-50'
                onClick={() => changeMonth(new Date())}
              >
                이번 달
              </button>
              <button
                className='flex-1 border-l border-[var(--vapor-color-border,#e5e7eb)] px-1 py-2 text-[10px] hover:bg-gray-50'
                onClick={() => changeMonth(addMonths(month, 1))}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 현재 페이지의 요일 헤더 (오늘이면 '오늘' + 파란색) */}
      <div className='mb-1 grid grid-cols-7 justify-items-center px-4 text-center text-[12px]'>
        {currentWeekForView.length === 7
          ? currentWeekForView.map((d) => (
              <div
                key={d.toISOString()}
                className={
                  isToday(d) ? 'font-bold text-[#3174DC]' : 'text-[var(--vapor-color-foreground-normal,#2B2D36)]'
                }
              >
                {isToday(d) ? '오늘' : format(d, 'E', { locale: ko })}
              </div>
            ))
          : ['월', '화', '수', '목', '금', '토', '일'].map((w) => (
              <div key={w} className='text-[var(--vapor-color-foreground-normal,#2B2D36)]'>
                {w}
              </div>
            ))}
      </div>

      {/* 주 단위 슬라이드 (무한 스크롤 없음) */}
      <div ref={emblaRef} className='overflow-hidden'>
        <div className='flex touch-pan-x'>
          {weeks.map((week, i) => {
            // '오늘 주' & 최초 진입이면 오늘부터 7일, 그 외엔 주(월~일) 원형
            const weekPage = primeTodayLeft && i === todayWeekIndex ? forward7FromToday(weeks, todayStart) : week;

            const pageKey = week[0]?.toISOString() ?? `page-${i}`;
            return (
              <div key={pageKey} className='min-w-full px-4'>
                <div className='grid grid-cols-7 justify-items-center gap-x-0'>
                  {weekPage.map((d) => {
                    const selected = value && isSameDay(d, value);
                    const disabled =
                      d < todayStart || (minDate && d < startOfDay(minDate)) || (maxDate && d > startOfDay(maxDate));

                    // (선택) 교차-월은 살짝 옅게 보이게
                    const isOtherMonth = !isSameMonth(d, month);
                    const today = isToday(d);

                    return (
                      <button
                        key={d.toISOString()}
                        className={[
                          'flex h-8 w-8 flex-col items-center justify-center rounded-full transition-colors',
                          isOtherMonth ? 'opacity-70' : '',
                          disabled
                            ? 'cursor-not-allowed border-gray-200 text-gray-400 opacity-40'
                            : selected
                              ? 'bg-[#3174DC] text-[#FFFFFF]'
                              : 'border-[var(--vapor-color-border,#e5e7eb)] hover:bg-gray-50',
                        ].join(' ')}
                        disabled={disabled}
                        onClick={() => {
                          if (disabled) return;

                          // 교차-월 날짜를 탭하면 헤더(month)를 해당 월로 변경
                          if (!isSameMonth(d, month)) {
                            onMonthChange?.(startOfMonth(d));
                          }

                          console.log('[RouteDateStrip] 선택:', format(d, 'yyyy-MM-dd (EEE)', { locale: ko }));
                          onChange(d);
                        }}
                      >
                        <span
                          className={[
                            'text-[14px] font-medium',
                            selected
                              ? 'text-white' // 선택된 날은 흰색 유지
                              : disabled
                                ? 'text-gray-400' // 비활성 회색
                                : today
                                  ? 'text-[#3174DC]' // ⬅️ 오늘은 파란색
                                  : 'text-[var(--vapor-color-foreground-normal,#2B2D36)]',
                          ].join(' ')}
                        >
                          {format(d, 'd')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  month: Date; // 기준 월
  value: Date | null; // 선택된 날짜
  onChange: (d: Date) => void;
  onMonthChange?: (m: Date) => void; // 월 변경 콜백
  minDate?: Date;
  maxDate?: Date;
  weekStartsOn?: 0 | 1;
};

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

export default function RouteDateStrip({
  month,
  value,
  onChange,
  onMonthChange,
  minDate,
  maxDate,
  weekStartsOn = 1,
}: Props) {
  const weeks = useMemo(() => buildWeeksInMonth(month, weekStartsOn), [month, weekStartsOn]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
  const [page, setPage] = useState(0);

  // ----- 드롭다운 상태 -----
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 닫기
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
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  // Embla 페이지 인덱스 동기화
  useEffect(() => {
    if (!emblaApi) return; // 아무것도 등록하지 않으면 cleanup 없음(OK)

    const onSelect = () => setPage(emblaApi.selectedScrollSnap());

    // 구독
    emblaApi.on('select', onSelect);

    // cleanup 함수만 반환해야 함
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]); // 다른 의존성 불필요

  // 첫 진입/선택 변경 시: 해당 주로 이동
  useEffect(() => {
    if (!emblaApi || !value) return;
    const idx = weeks.findIndex((w) => w.some((d) => isSameDay(d, value)));
    if (idx >= 0) {
      emblaApi.scrollTo(idx, true);
      setPage(idx); // ← 초기에도 헤더가 올바르게 뜨도록 보장
    }
  }, [emblaApi, value, weeks]);

  // ── 변경: 오늘 이전 비활성화(다른 조건은 그대로 사용 가능) ──
  const todayStart = startOfDay(new Date());
  const isDisabled = useCallback(
    (d: Date) => {
      if (d < todayStart) return true; // 이전 날짜 불가
      if (minDate && d < startOfDay(minDate)) return true;
      if (maxDate && d > startOfDay(maxDate)) return true;
      return false;
    },
    [minDate, maxDate, todayStart],
  );

  // 드롭다운에 노출할 월 목록 (현재 기준 -2 ~ +8)
  const monthOptions = useMemo(() => {
    const base = startOfMonth(month);
    return Array.from({ length: 11 }, (_, i) => addMonths(base, i - 2));
  }, [month]);

  // 드롭다운에서 월 변경 시: 해당 월의 1일을 기본 선택
  const changeMonth = (next: Date) => {
    const first = startOfMonth(next);

    // 이번 달을 선택했고 1일이 과거라면 '오늘'을 선택, 그 외에는 1일 선택
    const autoSelect = isSameMonth(todayStart, next) && first < todayStart ? todayStart : first;

    onMonthChange?.(startOfMonth(next));
    onChange(autoSelect); // ⬅️ 선택 날짜도 같이 바꿔줌
    setOpen(false);
  };

  return (
    <div className='w-full'>
      {/* 상단: 월 + 드롭다운 */}
      <div className='relative mb-4 flex items-center gap-0 pl-6'>
        <div className='text-sm font-semibold text-[var(--vapor-typography-fontSize-075)]'>
          {format(month, 'M월', { locale: ko })}
        </div>

        {/* 드롭다운 트리거 */}
        <button
          ref={triggerRef}
          aria-expanded={open}
          aria-haspopup='listbox'
          className='inline-flex items-center gap-1 rounded-md bg-[var(--vapor-color-surface,#ffffff)] px-1 py-1 text-[12px] text-[var(--vapor-color-text-secondary,#6b7280)] hover:bg-gray-50'
          type='button'
          onClick={() => setOpen((s) => !s)}
        >
          <svg aria-hidden fill='none' height='14' viewBox='0 0 24 24' width='14'>
            <path d='M6 9l6 6 6-6' stroke='currentColor' strokeLinecap='round' strokeWidth='1.6' />
          </svg>
        </button>

        {/* 드롭다운 패널 */}
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

      {/* ── 변경: 현재 주 기준 요일 헤더(오늘이면 '오늘' + 파란색) ── */}
      <div className='mb-1 grid grid-cols-7 justify-items-center px-4 text-center text-[12px]'>
        {(weeks[page] ?? weeks[0] ?? []).length === 7
          ? (weeks[page] ?? weeks[0] ?? []).map((d) => (
              <div
                key={d.toISOString()}
                className={
                  isToday(d) ? 'font-semibold text-[#3174DC]' : 'text-[var(--vapor-color-foreground-normal,#2B2D36)]'
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

      {/* 주 단위 슬라이드 */}
      <div ref={emblaRef} className='overflow-hidden'>
        <div className='flex touch-pan-x'>
          {weeks.map((week, i) => (
            <div key={i} className='min-w-full px-4'>
              <div className='grid grid-cols-7 justify-items-center gap-x-0'>
                {week.map((d) => {
                  const selected = value && isSameDay(d, value);
                  const disabled = isDisabled(d) || !isSameMonth(d, month);
                  const today = isToday(d);
                  return (
                    <button
                      key={d.toISOString()}
                      className={[
                        'flex h-8 w-8 flex-col items-center justify-center rounded-full transition-colors',
                        disabled
                          ? 'cursor-not-allowed border-gray-200 text-gray-400 opacity-40'
                          : selected
                            ? 'bg-[#3174DC] text-[#FFFFFF]'
                            : 'border-[var(--vapor-color-border,#e5e7eb)] hover:bg-gray-50',
                      ].join(' ')}
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;
                        console.log('[RouteDateStrip] 선택:', format(d, 'yyyy-MM-dd (EEE)', { locale: ko }));
                        onChange(d);
                      }}
                    >
                      {/* 아래 라벨은 날짜만 노출 */}
                      <span className={today ? 'text-[14px] font-semibold' : 'text-[10px] text-gray-500'} />
                      <span className='text-[14px] font-medium'>{format(d, 'd')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

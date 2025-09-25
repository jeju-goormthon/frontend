// src/features/home/HomePrimaryActionsGrid.tsx
import { Box, Button } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';
import { useNavigate } from 'react-router-dom';

import busPng from '../../assets/images/home/bus.png';
import busWebp from '../../assets/images/home/bus.webp';
import ticketPng from '../../assets/images/home/ticket.png';
import ticketWebp from '../../assets/images/home/ticket.webp';

export default function HomePrimaryActionsGrid() {
  const navigate = useNavigate();

  const labelTypography: React.CSSProperties = {
    fontFamily: 'var(--vapor-typography-fontFamily-sans)',
    fontSize: 'var(--vapor-typography-fontSize-100)',
    lineHeight: 'var(--vapor-typography-lineHeight-100)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
    fontWeight: 700,
    fontStyle: 'normal',
  };

  const cardRadius: React.CSSProperties = {
    borderRadius: 'var(--vapor-size-borderRadius-500)',
  };

  // ✅ 모든 카드 공통: relative + p-4 유지
  const cardBase = 'relative w-full min-h-[97px] p-4 overflow-hidden';
  // 상단(1,2번) 카드만 높이 업
  const tallCard = `${cardBase} min-h-[178px]`;

  // ✅ 제목은 전부 같은 위치
  const titlePos = 'absolute left-4 top-4';

  return (
    <Box aria-label='주요 기능 바로가기' className='w-full'>
      <Box className='grid grid-cols-2 gap-2'>
        {/* 1) 노선 선택 */}
        <Button
          className={tallCard}
          style={{
            ...cardRadius,
            background: 'linear-gradient(140deg, #3174DC 0%, #F1F7FF 129.14%)',
          }}
          onClick={() => navigate('/routes')}
        >
          <span className={titlePos} style={{ ...labelTypography, color: 'var(--vapor-color-white)' }}>
            노선 선택
          </span>

          <picture aria-hidden>
            <source srcSet={busWebp} type='image/webp' />
            <img
              alt=''
              className='pointer-events-none absolute right-1 bottom-2 h-auto w-[120px]'
              decoding='async'
              loading='lazy'
              src={busPng}
            />
          </picture>
        </Button>

        {/* 2) 탑승권 확인 */}
        <Button
          className={tallCard}
          style={{
            ...cardRadius,
            background: 'linear-gradient(157deg, #CEE3FF 14.83%, #B5D4FF 55.94%, #3174DC 127%)',
          }}
          onClick={() => navigate('/tickets')}
        >
          <span className={titlePos} style={{ ...labelTypography, color: 'var(--vapor-color-foreground-normal)' }}>
            탑승권 확인
          </span>

          <picture aria-hidden>
            <source srcSet={ticketWebp} type='image/webp' />
            <img
              alt=''
              className='pointer-events-none absolute right-0 bottom-2 h-auto w-[120px]'
              decoding='async'
              loading='lazy'
              src={ticketPng}
            />
          </picture>
        </Button>

        {/* 3) 정기권 관리 */}
        <Button
          className={cardBase}
          style={{ ...cardRadius, background: '#F1F7FF' }}
          onClick={() => navigate('/passes')}
        >
          <span className={titlePos} style={{ ...labelTypography, color: 'var(--vapor-color-foreground-normal)' }}>
            정기권 관리
          </span>

          {/* 아이콘도 절대 위치로 고정 */}
          <ChevronRightOutlineIcon
            aria-hidden
            className='absolute right-4 bottom-4 h-5 w-5 text-[var(--vapor-color-foreground-normal)]'
          />
        </Button>

        {/* 4) 진료과목 변경 */}
        <Button
          className={cardBase}
          style={{ ...cardRadius, background: '#F1F7FF' }}
          onClick={() => navigate('/department')}
        >
          <span className={titlePos} style={{ ...labelTypography, color: 'var(--vapor-color-foreground-normal)' }}>
            진료과목 변경
          </span>

          <ChevronRightOutlineIcon
            aria-hidden
            className='absolute right-4 bottom-4 h-5 w-5 text-[var(--vapor-color-foreground-normal)]'
          />
        </Button>
      </Box>
    </Box>
  );
}

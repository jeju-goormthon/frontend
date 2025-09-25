// src/pages/season-ticket/SeasonTicketCheckoutSuccessPage.tsx
import { Box, Button, Text } from '@vapor-ui/core';
import { AnimatePresence, motion } from 'framer-motion';
import { type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import calenderPng from '@/assets/images/seasonTicket/calender.png';
import calenderWebp from '@/assets/images/seasonTicket/calender.webp';
import checkoutIconPng from '@/assets/images/seasonTicket/checkoutIcon.png';
// 이미지(웹P 우선, PNG 폴백)
import checkoutIconWebp from '@/assets/images/seasonTicket/checkoutIcon.webp';

type Step = 'checkout' | 'reminder';

const pageWrap: React.CSSProperties = {
  minHeight: '100dvh',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
};

const centerWrap: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const block: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
};

const slideVariants: Variants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: -dir * 24, // dir=1 -> 오른쪽에서, dir=-1 -> 왼쪽에서
    scale: 0.98,
  }),
  enter: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * 24,
    scale: 0.98,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
};

const iconVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.36 } },
};

const textVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, delay: 0.05 } },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SeasonTicketCheckoutSuccessPage() {
  const [step, setStep] = useState<Step>('checkout');
  const navigate = useNavigate();

  // 1.5초 후 checkout 화면이 왼쪽으로 사라지고 reminder로 전환
  useEffect(() => {
    const t = setTimeout(() => setStep('reminder'), 1500);
    return () => clearTimeout(t);
  }, []);

  const goReminderSetting = () => {
    // TODO: 알림 권한/설정 페이지로 이동 로직
    // 예시: navigate('/settings/notifications');
    navigate(-1); // 임시
  };

  return (
    <Box style={pageWrap}>
      {/* 중앙 컨텐츠 영역 */}
      <Box style={centerWrap}>
        <AnimatePresence custom={step === 'checkout' ? 1 : -1} mode='wait'>
          {step === 'checkout' ? (
            <motion.div
              key='checkout'
              animate='enter'
              custom={1}
              exit='exit'
              initial='initial'
              style={block}
              variants={slideVariants}
            >
              <motion.picture animate='show' initial='initial' variants={iconVariants}>
                <source srcSet={checkoutIconWebp} type='image/webp' />
                <img
                  alt='결제 완료 아이콘'
                  height={100}
                  src={checkoutIconPng}
                  style={{ display: 'block' }}
                  width={100}
                />
              </motion.picture>

              <motion.div animate='show' initial='initial' variants={textVariants}>
                <Text
                  style={{
                    color: 'var(--vapor-color-fg)',
                    textAlign: 'center',
                  }}
                  typography='heading3'
                >
                  정기권 결제 완료
                </Text>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key='reminder'
              animate='enter'
              custom={-1}
              exit='exit'
              initial='initial'
              style={block}
              variants={slideVariants}
            >
              <motion.picture animate='show' initial='initial' variants={iconVariants}>
                <source srcSet={calenderWebp} type='image/webp' />
                <img alt='캘린더' height={110} src={calenderPng} style={{ display: 'block' }} width={110} />
              </motion.picture>

              <motion.div animate='show' initial='initial' style={{ textAlign: 'center' }} variants={textVariants}>
                <Text
                  style={{
                    color: 'var(--vapor-color-fg)',
                  }}
                  typography='heading3'
                >
                  다음 진료 전 탑승 예약을
                  <br />
                  놓치지 않도록 알려드릴게요
                </Text>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* 하단 CTA: 두 번째 단계에서 위로 등장 */}
      <motion.div
        animate={step === 'reminder' ? 'visible' : 'hidden'}
        initial='hidden'
        style={{
          position: 'sticky',
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 20%, #fff 38%)',
        }}
        variants={ctaVariants}
      >
        <Box style={{ padding: '16px 20px 28px' }}>
          <Button
            className='py-7'
            size='xl'
            style={{ width: '100%', backgroundColor: '#3174DC', color: '#fff', borderRadius: 12 }}
            onClick={goReminderSetting}
          >
            예약 알림 설정하기
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}

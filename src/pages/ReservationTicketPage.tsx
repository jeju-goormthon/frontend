import { Badge, Box, Button, HStack, Text, VStack } from '@vapor-ui/core';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';

import { cancelReservation, getReservationDetail } from '@/apis/reservations';
import type { ReservationResponse } from '@/apis/types';
import BackHeader from '@/components/BackHeader';

export default function ReservationTicketPage() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<ReservationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchReservation() {
      if (!reservationId) {
        setError('예약 ID가 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getReservationDetail(Number(reservationId));
        setReservation(data);
      } catch (err) {
        console.error('예약 정보 조회 실패:', err);
        setError(err instanceof Error ? err.message : '예약 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchReservation();
  }, [reservationId]);

  const handleCancel = async () => {
    if (!reservation || cancelling) return;

    const confirmed = window.confirm('예약을 취소하시겠습니까?');
    if (!confirmed) return;

    try {
      setCancelling(true);
      await cancelReservation(reservation.id);
      alert('예약이 취소되었습니다.');
      navigate('/reservations');
    } catch (err) {
      console.error('예약 취소 실패:', err);
      alert(err instanceof Error ? err.message : '예약 취소에 실패했습니다.');
    } finally {
      setCancelling(false);
    }
  };

  const handleDepartmentChange = () => {
    navigate('/department');
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'yyyy.MM.dd (E)', { locale: ko });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const minute = minutes;
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${displayHour.toString().padStart(2, '0')}:${minute}`;
  };

  if (loading) {
    return (
      <div className='relative flex min-h-screen flex-col'>
        <div className='sticky top-0 z-60'>
          <BackHeader title='탑승권 확인' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <Text>로딩 중...</Text>
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className='relative flex min-h-screen flex-col'>
        <div className='sticky top-0 z-60'>
          <BackHeader title='탑승권 확인' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <VStack alignItems='center' gap='$200'>
            <Text style={{ color: '#D92D20' }}>{error || '예약 정보를 찾을 수 없습니다.'}</Text>
            <Button onClick={() => navigate('/reservations')}>예약 목록으로 돌아가기</Button>
          </VStack>
        </div>
      </div>
    );
  }
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='탑승권 확인' />
      </div>

      <div
        className='flex-1 overflow-y-auto p-6'
        style={{
          background: 'linear-gradient(180deg, #F1F7FF 53.85%, #FFF 81.73%)',
        }}
      >
        {/* 상단 예약번호 카드 */}
        {/* 예약번호 카드 */}
        <section
          className='mt-6 mb-1 rounded-2xl bg-white px-5 py-4'
          style={{ boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.05)' }}
        >
          <div className='flex items-center justify-between'>
            <div className='my-1 flex gap-2'>
              <Text className='text-[#959595]' typography='subtitle1'>
                예약번호
              </Text>
              <Text typography='subtitle1'>{reservation.reservationNumber}</Text>
            </div>

            <Badge color={reservation.status === 'CONFIRMED' ? 'success' : 'warning'}>
              {reservation.status === 'CONFIRMED' ? '확정' : reservation.status === 'CANCELLED' ? '취소됨' : '완료'}
            </Badge>
          </div>

          {/* divider */}
          <div className='my-4 h-px bg-[#E9EEF7]' />

          {/* QR + 날짜 + 승차번호 */}
          <div className='flex flex-col items-center gap-4'>
            {/* QR Code */}
            <div className='flex h-40 w-40 items-center justify-center rounded-lg bg-white p-2'>
              <QRCode
                size={152}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={reservation.qrCode}
              />
            </div>

            <div className='mb-2'>
              <Text typography='subtitle1'>{formatDate(reservation.reservationDate)}</Text>
              <HStack justifyContent='space-between' paddingX='$100'>
                <Text className='text-[#959595]' typography='subtitle1'>
                  예약 ID
                </Text>
                <Text className='text-[#3174DC]' typography='subtitle1'>
                  #{reservation.id}
                </Text>
              </HStack>
            </div>
          </div>
        </section>

        {/* 상세 정보 카드 */}
        <Box
          backgroundColor='$white'
          borderRadius='$500'
          display='flex'
          flexDirection='column'
          gap='$100'
          paddingX='$250'
          paddingY='$300'
          style={{ boxShadow: '0 4px 40px 0 rgba(0, 0, 0, 0.05)' }}
        >
          <VStack gap='$100'>
            <HStack gap='$200'>
              <Text className='text-[#959595]' typography='subtitle1'>
                탑승시간
              </Text>
              <Text typography='subtitle1'>{formatTime(reservation.startTime)}</Text>
            </HStack>

            <HStack gap='$200'>
              <Text className='text-[#959595]' typography='subtitle1'>
                출발장소
              </Text>
              <Text typography='subtitle1'>{reservation.pickupLocation}</Text>
            </HStack>
            <HStack gap='$200'>
              <Text className='text-[#959595]' typography='subtitle1'>
                진료과목
              </Text>
              <Text typography='subtitle1'>{reservation.hospitalName}</Text>
            </HStack>
          </VStack>
        </Box>

        {/* 하단 액션 버튼 */}
        <HStack className='mt-20 flex gap-2.5'>
          <Button stretch className='h-14 rounded-xl bg-[#CEE3FF] text-[#0E47A3]' onClick={handleDepartmentChange}>
            <Text className='text-[#0E47A3]' typography='heading6'>
              진료과목 변경
            </Text>
          </Button>
          <Button
            stretch
            className='h-14 rounded-xl bg-[#F7F7F7] text-[#393939]'
            disabled={cancelling}
            onClick={handleCancel}
          >
            <Text className='text-[#393939]' typography='heading6'>
              {cancelling ? '취소 중...' : '예약 취소'}
            </Text>
          </Button>
        </HStack>
      </div>
    </div>
  );
}

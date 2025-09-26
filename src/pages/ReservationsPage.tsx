import BackHeader from '@/components/BackHeader';
import ReservationHistory from '@/components/ReservationHistory';

export default function RoutePage() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='예약 확인' />
      </div>
      <div className='flex-1 overflow-y-auto px-6'>
        <ReservationHistory />
      </div>
    </div>
  );
}

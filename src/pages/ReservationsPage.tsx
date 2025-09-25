import BackHeader from '@/components/BackHeader';

export default function RoutePage() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='탑승 예약 내역' />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <span>테스트</span>
      </div>
    </div>
  );
}

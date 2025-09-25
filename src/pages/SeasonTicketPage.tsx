import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

export default function SeasonTicketPage() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='정기권 관리' />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <span>테스트</span>
      </div>
      <div className='sticky bottom-0 z-50 bg-white px-6 pt-3 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='결제하기' onClick={() => alert('결제하기')} />
      </div>
    </div>
  );
}

import { Text } from '@vapor-ui/core';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';

export default function RouteConfirmPage() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-50'>
        <BackHeader title='노선 확인/결제' />
      </div>
      <div className='flex-1 overflow-y-auto px-4 py-4'>
        <Text>테스트</Text>
      </div>
      <div className='sticky bottom-0 z-50 px-6 pt-2.5 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='결제하기' onClick={() => alert('결제하기')} />
      </div>
    </div>
  );
}

import { startOfMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';
import RouteDateStrip from '@/components/route/RouteDateStrip';
import RouteSelectList from '@/components/route/RouteSelectList';
import { useRouteStore } from '@/stores/routeStore';

export default function RoutePage() {
  const navigate = useNavigate();
  const { selectedDate, selectedRoute, setSelectedDate, resetRouteSelection } = useRouteStore();

  const [month, setMonth] = useState(startOfMonth(selectedDate || new Date()));

  // Reset route selection when entering route page
  useEffect(() => {
    resetRouteSelection();
  }, [resetRouteSelection]);

  // Update selected date in store when local date changes
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  // Check if user can proceed to confirm page
  const canProceed = selectedRoute !== null && selectedDate !== null;

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-70'>
        <BackHeader title='노선 선택' />
      </div>
      <div className='sticky top-0 z-60 bg-white'>
        <RouteDateStrip
          month={month}
          value={selectedDate}
          weekStartsOn={1}
          onChange={handleDateChange}
          onMonthChange={setMonth} // ⬅️ 드롭다운에서 월 변경 반영
        />
      </div>
      <div className='flex-1 overflow-y-auto'>
        {/* 아래엔 선택된 날짜의 노선 리스트 */}
        <RouteSelectList />
      </div>
      <div className='sticky bottom-0 z-50 bg-white px-6 pt-3 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton
          disabled={!canProceed}
          label='다음'
          onClick={() => {
            if (canProceed) {
              navigate('/route/confirm');
            }
          }}
        />
      </div>
    </div>
  );
}

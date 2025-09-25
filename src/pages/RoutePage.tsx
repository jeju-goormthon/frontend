import { format, startOfMonth } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/BackHeader';
import NavButton from '@/components/NavButton';
import RouteDateStrip from '@/components/route/RouteDateStrip';
import RouteSelectList from '@/components/route/RouteSelectList';
import { useRouteStore } from '@/stores/routeStore';

export default function RoutePage() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [date, setDate] = useState<Date | null>(new Date());

  const { selectedRoute, setSelectedDate } = useRouteStore();

  const handleNext = () => {
    if (!selectedRoute) {
      alert('노선을 선택해주세요.');
      return;
    }
    if (!date) {
      alert('날짜를 선택해주세요.');
      return;
    }

    // 선택된 날짜를 ISO string으로 저장
    setSelectedDate(format(date, 'yyyy-MM-dd'));
    navigate('/route/confirm');
  };

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='노선 선택' />
      </div>
      <div className='sticky top-0 z-60 bg-white'>
        <RouteDateStrip
          month={month}
          value={date}
          weekStartsOn={1}
          onChange={setDate}
          onMonthChange={setMonth} // ⬅️ 드롭다운에서 월 변경 반영
        />
      </div>
      <div className='flex-1 overflow-y-auto'>
        {/* 아래엔 선택된 날짜의 노선 리스트 */}
        <RouteSelectList selectedDate={date} />
      </div>
      <div className='sticky bottom-0 z-50 bg-white px-6 pt-3 pb-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton label='다음' onClick={handleNext} />
      </div>
    </div>
  );
}

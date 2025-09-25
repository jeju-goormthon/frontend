// src/pages/RoutePage.tsx
import { startOfMonth } from 'date-fns';
import { useState } from 'react';

import RouteDateStrip from '@/components/route/RouteDateStrip';
import RouteSelectList from '@/components/route/RouteSelectList';

export default function RoutePage() {
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div className='min-h-screen bg-white'>
      <div className='sticky top-0 bg-white pt-4 pb-3'>
        <RouteDateStrip
          month={month}
          value={date}
          weekStartsOn={1}
          onChange={setDate}
          onMonthChange={setMonth} // ⬅️ 드롭다운에서 월 변경 반영
        />
      </div>
      {/* 아래엔 선택된 날짜의 노선 리스트 */}
      <RouteSelectList />
    </div>
  );
}

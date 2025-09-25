import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import UpcomingReservationCard from '@/components/UpcomingReservationCard';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { isAuthenticated, user, medicalDepartment } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인되어 있지만 의료과목이 없는 경우 의료과목 선택 페이지로 리다이렉트
    if (isAuthenticated && user && !medicalDepartment) {
      navigate('/department');
    }
  }, [isAuthenticated, user, medicalDepartment, navigate]);

  return (
    <div>
      <div className='sticky top-0 z-60 bg-white'>
        <Header />
      </div>
      <HomeHeroSection />
      <UpcomingReservationCard />
    </div>
  );
}

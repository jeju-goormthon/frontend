import Header from '@/components/Header';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import UpcomingReservationCard from '@/components/UpcomingReservationCard';

export default function HomePage() {
  return (
    <div>
      <div className='sticky top-0 z-50 bg-white'>
        <Header />
      </div>
      <HomeHeroSection />
      <UpcomingReservationCard />
    </div>
  );
}

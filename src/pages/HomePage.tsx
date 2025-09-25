import Header from '@/components/Header';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import UpcomingReservationCard from '@/components/UpcomingReservationCard';

export default function HomePage() {
  return (
    <div>
      <Header />
      <HomeHeroSection />
      <UpcomingReservationCard />
    </div>
  );
}

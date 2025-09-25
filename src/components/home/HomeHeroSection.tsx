import { Box } from '@vapor-ui/core';

import HomeHeroText from '@/components/home/HomeHeroText';
import HomePrimaryActionsGrid from '@/components/home/HomePrimaryActionsGrid';

export default function HomeHeroSection() {
  return (
    <Box display='flex' flexDirection='column' gap='$300' padding='$300'>
      <HomeHeroText />
      <HomePrimaryActionsGrid />
    </Box>
  );
}

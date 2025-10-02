'use client'

import { ShowCard } from '@/components/ShowCard';
import { CustomWrapper } from '@/components/CustomWrapper'
import { MenubarDemo } from '@/components/Bar';

function Home() {
  return (
    <>
      <MenubarDemo />
      <div className = "h-15 w-screen bg-transparent "> </div>
      <CustomWrapper> 
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard dot={true} />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard dot={true} />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
        <ShowCard />
      </CustomWrapper>
    </>
  );
}

export default Home;
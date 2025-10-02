'use client'
import { MenubarDemo } from '@/components/Bar';
import { ShowCard } from '@/components/ShowCard';
import { CustomWrapper } from '@/components/CustomWrapper'

function savePost() {
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

export default savePost;
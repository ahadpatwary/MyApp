'use client'

import { MenubarDemo } from '@/components/Bar';
import { ShowCard } from '@/components/ShowCard';
import { CustomWrapper } from '@/components/CustomWrapper'
import useFeed from '@/hooks/useFeed';

function SavePost() {
  const { data } = useFeed("likedCards");
  return (
    <>
      <MenubarDemo />
      <div className = "h-15 w-screen bg-transparent "> </div>
      <CustomWrapper>
        {
          data.map((card) => ( 
            <ShowCard key={card._id} name={card.name} picture={card.proPic?.url} title={card.title} image={card.image?.url} description={card.description} dot ={false} />
          )
        )}
      </CustomWrapper>
    </>
  );
}

export default SavePost;
'use client'

import { ShowCard } from '@/components/ShowCard';
import { CustomWrapper } from '@/components/CustomWrapper'
import { MenubarDemo } from '@/components/Bar';
import { useCards }  from '@/hooks/useFetchCards';

function Home() {
  const {session ,activeCards} = useCards();
  return (
    <>
      <MenubarDemo />
      <div className = "h-15 w-screen bg-transparent "> </div>
      <CustomWrapper> 
        {
          activeCards.map((card) => ( 
            <ShowCard 
              key = {card._id} 
              cardId = {card._id} 
              name = {card.name} 
              picture = {card.proPic} 
              title = {card.title} 
              image = {card.image} 
              description = {card.description} 
              dot = { (session == card.user) } 
            />
          )
        )} 
      </CustomWrapper>
    </>
  );
}

export default Home;
'use client'
import { MenubarDemo } from '@/components/Bar'
import {ShowCard} from '@/components/ShowCard'
import { CustomWrapper } from '@/components/CustomWrapper'
import { useCards } from '@/hooks/fetchCards';

function Home() {
  const { likedCards } = useCards();

  return (
    <>
      <MenubarDemo />
      <div className = "h-15 w-screen bg-transparent "> </div>
      <CustomWrapper> 
        {
          likedCards.map((card) => ( 
            <ShowCard key={card._id} name={card.name} picture={card.proPic} title={card.title} image={card.image} description={card.description} dot ={false} />
          )
        )}
      </CustomWrapper>
    </>
  );
}

export default Home;
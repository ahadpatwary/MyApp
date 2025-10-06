'use client'

import { ShowCard } from '@/components/ShowCard';
import { CustomWrapper } from '@/components/CustomWrapper'
import { MenubarDemo } from '@/components/Bar';
import { useCards } from '@/hooks/fetchCards';

function Home() {
  const {session ,activeCards} = useCards();
  return (
    <>
      <MenubarDemo />
      <div className = "h-15 w-screen bg-transparent "> </div>
      <CustomWrapper> 
        {
          activeCards.map((card) => ( 
            (session == card.user) ? (
              <ShowCard key={card._id} name="ahad" title={card.title} image={card.image} description={card.description} dot ={true} />
            ) : (
              <ShowCard key={card._id} name="ahad" title={card.title} image={card.image} description={card.description} dot = {false} />
            )
          )
        )}
      </CustomWrapper>
    </>
  );
}

export default Home;


        // <ShowCard />
        // <ShowCard />
        // <ShowCard dot={true} />
        // <ShowCard />
        // <ShowCard />
        // <ShowCard />
        // <ShowCard />
        // <ShowCard />
        // <ShowCard dot={true} />
        // <ShowCard />
        // <ShowCard />
        // <ShowCard />
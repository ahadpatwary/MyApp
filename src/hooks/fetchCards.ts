import { useState, useEffect } from "react"
import { Types } from "mongoose"


interface UseCardsReturn {
  profilePic : string | undefined;
  session: Types.ObjectId | undefined;
  activeCards: ICard[];
  myPost: ICard[];
  myActivePost: ICard[];
  likedCards: ICard[];
  savedCards: ICard[];
  loading: boolean;
  error: string | null;
}

export const useCards = (): UseCardsReturn => {
  const [profilePic, setProfilePic] = useState();
  const [session, setSession] = useState();
  const [activeCards, setActiveCards] = useState<ICard[]>([]);
  const [myPost, setMyPost] = useState<ICard[]>([]);
  const [myActivePost, setMyActivePost] = useState<ICard[]>([]);
  const [likedCards, setLikedCards] = useState<ICard[]>([]);
  const [savedCards, setSavedCards] = useState<ICard[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/fetchCard`); // frontend থেকে কোনো param নেই
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data = await res.json();

        setProfilePic(data.picture);

        setSession(data.session);

        // all active cards(somosto user)
        setActiveCards(data.activeCards || []);

        // active and deactive cards (ami ja post korechi)
        setMyPost(data.myPost || []);

        // active cards (ami ja post korechi)
        setMyActivePost(data.myActivePost || []);

        // liked cards (ami ja like korechi)
        setLikedCards(data.likedCards || []);

        //saved cards (ja ami saved korechi)
        setSavedCards(data.savedCards || []);

      } catch (err) {
        if(err instanceof Error){
          setError(err.message || "Failed to fetch cards");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return {profilePic,session, activeCards, myPost, myActivePost, likedCards, savedCards, loading, error };
};
import { useState, useEffect } from "react";
import { Types } from "mongoose";

interface FetchCardResponse {
  picture?: string;
  session?: Types.ObjectId;
  activeCards?: ICard[];
  myPost?: ICard[];
  myActivePost?: ICard[];
  likedCards?: ICard[];
  savedCards?: ICard[];
}

interface UseCardsReturn {
  profilePic: string | undefined;
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
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);
  const [session, setSession] = useState<Types.ObjectId | undefined>(undefined);
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
        const res = await fetch(`/api/fetchCard`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data: FetchCardResponse = await res.json();

        setProfilePic(data.picture);
        setSession(data.session);
        setActiveCards(data.activeCards || []);
        setMyPost(data.myPost || []);
        setMyActivePost(data.myActivePost || []);
        setLikedCards(data.likedCards || []);
        setSavedCards(data.savedCards || []);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unexpected error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return {
    profilePic,
    session,
    activeCards,
    myPost,
    myActivePost,
    likedCards,
    savedCards,
    loading,
    error,
  };
};

import { getData } from "@/lib/getData";
import { urlToFile } from "@/lib/urlToFile";
import { useEffect, useState } from "react";

interface ICard {
  title: string;
  description: string;
  image: {
        url: string;
        public_id: string;
    }; 
}

export const useUpdateCard = (cardId: string) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: ICard = await getData(cardId, "Card", ["title", "description", "image"]);
        if (!data) {
          setError("Data not present");
          return;
        }

        setTitle(data.title);
        setContent(data.description);
        console.log("ahadkdjf");

        // যদি চাই picture state set করতে
        // এখানে URL থেকে File বানাতে হবে
        // const file = await urlToFile(data.image);
        // const file = await urlToFile(data.image.url);
        // if(file.success) setPicture(file);
        console.log( data.image.url);

      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cardId]); // cardId change হলে আবার fetch হবে

  const handleUpdate = async () => {
    try {
      setLoading(true);
      // API call করে update করো
      // await updateCard(cardId, { title, content, picture });
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return { title, setTitle, content, setContent, picture, setPicture, loading, error, handleUpdate };
};
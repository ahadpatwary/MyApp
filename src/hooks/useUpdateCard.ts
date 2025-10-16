import { getData } from "@/lib/getData";
import { urlToFile } from "@/lib/urlToFile";
import { useEffect, useRef, useState } from "react";

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
  const oldPublicId = useRef<string | null>(null);
  const file = useRef<File | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data: ICard = await getData(cardId, "Card", ["title", "description", "image"]);
        if (!data) {
          setError("Data not present");
          return;
        }

        setTitle(data.title);
        setContent(data.description);
        oldPublicId.current = data.image.public_id;

        if (data.image?.url) {
          const fileRes = await urlToFile(data.image.url);
          if (fileRes.success && fileRes.file) {
            file.current = fileRes.file; // ✅ fixed
            setPicture(fileRes.file);
          }
        }

      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    })();
  }, [cardId]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("id", cardId);
      formData.append("title", title);
      formData.append("description", content);
      if (oldPublicId.current) formData.append("oldPublicId", oldPublicId.current);
      if (file.current) formData.append("picture", file.current);
      formData.append("property", "image");

      const res = await fetch("/api/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");

    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return { title, setTitle, content, setContent, picture, setPicture, loading, error, handleUpdate };
};
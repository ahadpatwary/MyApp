"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib/getData";
import { userIdClient } from "@/lib/userId";


// Type for getData response (যেটা object return করে)
interface GetDataResult {
  [key: string]: any; // dynamic properties যেমন cards, likedCards etc.
}

export default function useFeed(property: "cards" | "likedCards" | "savedCards") {

  const [data, setData] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {

        const id = await userIdClient(); // ✅ এখন client-safe call
        if (!id) throw new Error("User ID missing");

        const result: GetDataResult = await getData(id, "User", [property]);

        // ✅ result[property] dynamically access করা
        const cards: ICard[] = Array.isArray(result[property])
          ? result[property]
          : [];

        if(property == "cards") {
          setData(cards);
          return;
        }

        // ✅ শুধু public post filter করা
        const post = cards.filter(
          (card: ICard) => card.videoPrivacy === "public"
        );

        setData(post);
      } catch (err) {
        console.error("useFeed error:", err);
          if (err instanceof Error) {
          setError(err.message || "Failed to fetch feed");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [property]); // dependency properly set করা হলো ✅

  return { data, loading, error };
}
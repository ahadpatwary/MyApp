"use client";
import { useState, useEffect } from "react";
import { useToggleArray } from "@/hooks/useToggleArray";
import { useCheckArray } from "@/hooks/useCheckArray";

export const LikeButton = ({ cardId }: { cardId?: string }) => {
  const [liked, setLiked] = useState(false);
  const { toggleArray, loading } = useToggleArray();

  // ✅ Hook টা টপ লেভেলে কল করতে হবে (useEffect এর ভিতরে না)
  const exists = useCheckArray(cardId, "likedCards");

  // ✅ exists change হলে state update করো
  useEffect(() => {
    if (exists !== liked) {
      setLiked(exists);
    }
  }, [exists]);

  // ✅ click handler
  const handleToggle = async () => {
    setLiked(prev => !prev); // instant UI update
    const res = await toggleArray(cardId, "likedCards");
    if (res?.liked === undefined) {
      setLiked(prev => !prev); // revert if failed
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded transition-colors ${
        liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
};
// import { useState } from "react";
// import { updateCard } from "@/lib/api";

// export const useUpdateCard = (id, initialTitle = "", initialContent = "") => {
//   const [title, setTitle] = useState(initialTitle);
//   const [content, setContent] = useState(initialContent);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return setError("Title is required");

//     setError("");
//     setLoading(true);
//     try {
//       const res = await updateCard(id, { title, content });
//       console.log("Updated:", res);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { title, setTitle, content, setContent, loading, error, handleUpdate };
// };
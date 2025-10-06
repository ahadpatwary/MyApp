// import { useState } from "react";
// import { deleteCard } from "@/lib/api";

// export const useDeleteCard = () => {
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this card?")) return;

//     setLoading(true);
//     try {
//       const res = await deleteCard(id);
//       console.log("Deleted:", res);
//     } catch (err) {
//       console.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, handleDelete };
// };
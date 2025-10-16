import { getData } from "@/lib/getData";
import { useState } from "react";

export const useUpdateCard = (cardId: string) => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpdate = async () => {
        try {

            const data: ICard = await getData(cardId, "Card", ["title", "description", "image"]);

            if(!data){
                setError("data not present");
                return;
            }
            setTitle(data.title);
            setContent(data.description);

            // const res = await updateCard(id, { title, content });
            // console.log("Updated:", res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { title, setTitle, content, setContent, picture, setPicture, loading, error, handleUpdate };
};
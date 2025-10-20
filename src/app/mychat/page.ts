import ChatCard from "@/components/ChatCard"
import { useSearchParams } from "next/navigation";



export default function Home(){
    const params = useSearchParams();
    const userId = params.get("userId");
    const chatWith = params.get("chatWith");

    return (
        <ChatCard userId = {userId} chatWith = {chatWith}  />
    )
}
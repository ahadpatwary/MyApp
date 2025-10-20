'use client'
import ChatCard from "@/components/ChatCard"
import { useSearchParams } from "next/navigation";



export default function Home(){
    const params = useSearchParams();
    const userId = params.get("userId");
    const chatWith = params.get("chatWith");

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <ChatCard userId = {userId as string} chatWith = {chatWith as string}  />
        </div>
    )
}
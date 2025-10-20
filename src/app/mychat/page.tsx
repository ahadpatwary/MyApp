'use client'
import ChatCard from "@/components/ChatCard"
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home(){
    const params = useSearchParams();
    const userId = params.get("userId");
    const chatWith = params.get("chatWith");

    return (
        <Suspense fallback={<div>Loading chat...</div>}>
            <div className="h-screen w-screen flex justify-center items-center">
                <ChatCard userId={userId as string} chatWith={chatWith as string} />
            </div>
        </Suspense>
    )
}

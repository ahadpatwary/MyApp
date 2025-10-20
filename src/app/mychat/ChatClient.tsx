'use client';
import { useSearchParams } from 'next/navigation';
import ChatCard from '@/components/ChatCard';

export default function ChatClient() {
  const params = useSearchParams();
  const userId = params.get('userId');
  const chatWith = params.get('chatWith');

  if (!userId || !chatWith) {
    return <div className="text-gray-500">Missing chat parameters</div>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ChatCard userId={userId} chatWith={chatWith} />
    </div>
  );
}
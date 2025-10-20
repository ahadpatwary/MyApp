// src/app/mychat/ChatPage.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import ChatCard from '@/components/ChatCard';
import { Suspense } from 'react';

export default function ChatPage() {
  const params = useSearchParams();
  const userId = params.get('userId');
  const chatWith = params.get('chatWith');

  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <div className="h-screen w-screen flex justify-center items-center">
        {userId && chatWith ? (
          <ChatCard userId={userId} chatWith={chatWith} />
        ) : (
          <div className="text-gray-500">No chat selected</div>
        )}
      </div>
    </Suspense>
  );
}
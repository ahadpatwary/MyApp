// ✅ Force Client Component
'use client';

// ✅ Prevent Next.js from generating static pages
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Suspense } from 'react';
import ChatClient from './ChatClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatClient />
    </Suspense>
  );
}
// src/app/mychat/page.tsx
'use client';
import ChatPage from './ChatPage';

// ⚡️ Force Next.js to treat this page as dynamic
export const dynamic = 'force-dynamic';

export default function Page() {
  return <ChatPage />;
}
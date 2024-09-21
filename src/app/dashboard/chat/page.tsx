// src/app/dashboard/chat/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import AuthProvider from '@/components/AuthProvider';

const DynamicChatContent = dynamic(() => import('@/components/ChatContent'), {
  ssr: false,
});

export default function ChatPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicChatContent />
      </Suspense>
    </AuthProvider>
  );
}

// src/app/layout.tsx
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'An advanced AI chatbot application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text-primary`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

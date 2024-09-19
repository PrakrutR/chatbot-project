// src/app/layout.tsx
import { AuthProvider } from '../components/AuthProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'An advanced AI chatbot application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
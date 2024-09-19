// src/app/layout.tsx
import { AuthProvider } from '../components/AuthProvider'
import ErrorBoundary from '../components/ErrorBoundary'
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
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
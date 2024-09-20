// src/components/Layout.tsx
import React from 'react'
import Link from 'next/link'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="bg-background-light shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-primary hover:text-primary-hover transition-colors">Home</Link></li>
            <li><Link href="/login" className="text-primary hover:text-primary-hover transition-colors">Login</Link></li>
            <li><Link href="/signup" className="text-primary hover:text-primary-hover transition-colors">Signup</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-background-light mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-text-secondary">
          © 2024 AI Chatbot. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout
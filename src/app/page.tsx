// src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to AI Chatbot</h1>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </nav>
    </div>
  )
}
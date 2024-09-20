// src/app/page.tsx
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-primary mb-6">Welcome to AI Chatbot</h1>
      <p className="text-text-secondary mb-8 text-lg">
        Experience the future of conversation with our advanced AI chatbot.
      </p>
      <div className="space-x-4">
        <a href="/login" className="bg-primary text-background px-6 py-3 rounded-md hover:bg-primary-hover transition-colors">
          Login
        </a>
        <a href="/signup" className="bg-secondary text-background px-6 py-3 rounded-md hover:bg-secondary-hover transition-colors">
          Sign Up
        </a>
      </div>
    </Layout>
  )
}
// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      console.error('Supabase client is not initialized')
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-primary mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-6 max-w-md">
        <div>
          <label htmlFor="email" className="block text-text-secondary mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-secondary border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-text-secondary mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-secondary border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            required
          />
        </div>
        <button type="submit" className="w-full bg-primary text-secondary px-6 py-3 rounded-md hover:bg-primary-dark transition-colors font-semibold">
          Log In
        </button>
      </form>
    </Layout>
  )
}
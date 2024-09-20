// src/app/signup/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (!supabase) {
      console.error('Supabase client is not initialized')
      setError('An error occurred. Please try again later.')
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else if (data?.user) {
      alert('Check your email for the confirmation link!')
      router.push('/login')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logo-placeholder.svg"
            alt="AI Chatbot Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h1 className="text-4xl font-bold text-primary mt-4">Create Account</h1>
          <p className="text-text-secondary mt-2">Join AI Chatbot today</p>
        </div>
        <form onSubmit={handleSignup} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="displayName">
              Display Name
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-text-primary leading-tight focus:outline-none focus:shadow-outline"
                id="displayName"
                type="text"
                placeholder="Enter your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-text-primary leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-text-primary leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
          {error && <p className="text-accent text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-text-secondary text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary-dark">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <footer className="mt-8 text-text-secondary text-sm">
        © 2024 AI Chatbot. All rights reserved.
      </footer>
    </div>
  )
}
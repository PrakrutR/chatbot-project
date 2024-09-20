// src/app/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);
    if (!supabase) {
      console.error('Supabase client is not initialized');
      setIsLoading(false);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the password reset link');
    }
    setIsLoading(false);
  };

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
          <h1 className="text-4xl font-bold text-primary mt-4">
            Forgot Password
          </h1>
          <p className="text-text-secondary mt-2">
            Enter your email to reset your password
          </p>
        </div>
        <form
          onSubmit={handleResetPassword}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-text-secondary text-sm font-bold mb-2"
              htmlFor="email"
            >
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
          {error && <p className="text-accent text-xs italic mb-4">{error}</p>}
          {message && (
            <p className="text-green-500 text-xs italic mb-4">{message}</p>
          )}
          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/login"
            className="text-primary hover:text-primary-dark text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-text-secondary text-sm">
        © 2024 AI Chatbot. All rights reserved.
      </footer>
    </div>
  );
}

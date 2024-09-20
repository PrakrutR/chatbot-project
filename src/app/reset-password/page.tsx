// src/app/reset-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (i.e., came from a valid reset link)
    const checkSession = async () => {
      if (!supabase) {
        console.error('Supabase client is not initialized');
        router.push('/login');
        return;
      }
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };
    checkSession();
  }, [router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!supabase) {
      console.error('Supabase client is not initialized');
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password updated successfully');
      setTimeout(() => router.push('/login'), 3000);
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
            Reset Password
          </h1>
          <p className="text-text-secondary mt-2">Enter your new password</p>
        </div>
        <form
          onSubmit={handleResetPassword}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-text-secondary text-sm font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
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
            <label
              className="block text-text-secondary text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
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
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
      <footer className="mt-8 text-text-secondary text-sm">
        © 2024 AI Chatbot. All rights reserved.
      </footer>
    </div>
  );
}

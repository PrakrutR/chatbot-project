// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return;
    }
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(error.message);
    } else if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      setMessage('An account with this email already exists.');
    } else {
      setMessage('Check your email for the confirmation link!');
      // Redirect to login page after successful signup
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-primary mb-6">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-6 max-w-md">
        <div>
          <label htmlFor="email" className="block text-text-secondary mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-background-light border border-text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-text-secondary mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-background-light border border-text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-secondary text-background px-6 py-3 rounded-md hover:bg-secondary-hover transition-colors font-semibold"
        >
          Sign Up
        </button>
        {message && <p className="text-accent mt-4">{message}</p>}
      </form>
    </Layout>
  );
}

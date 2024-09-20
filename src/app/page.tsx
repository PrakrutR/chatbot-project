// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <Image
            src="/logo-placeholder.svg"
            alt="AI Chatbot Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold text-primary mb-6">
          Welcome to AI Chatbot
        </h1>
        <p className="text-text-secondary mb-8 text-xl">
          Experience the future of conversation with our advanced AI chatbot.
          Powered by cutting-edge technology, our chatbot provides intelligent
          responses and learns from every interaction.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link
            href="/login"
            className="bg-primary text-secondary px-8 py-3 rounded-md hover:bg-primary-dark transition-colors text-lg font-semibold"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-accent text-secondary px-8 py-3 rounded-md hover:bg-accent-dark transition-colors text-lg font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <footer className="mt-16 text-text-secondary text-sm">
        © 2024 AI Chatbot. All rights reserved.
      </footer>
    </div>
  );
}

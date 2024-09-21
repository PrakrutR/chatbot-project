// src/components/ChatContent.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  timestamp: Date;
}

export default function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();

  const loadMessages = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages(data || []);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    setIsLoading(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      message: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');

    // TODO: Implement actual API call to AI model here
    // For now, we'll just simulate a response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        message: `I received your message: "${inputMessage.trim()}"`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 1000);

    // Save messages to Supabase
    await supabase.from('messages').insert([
      {
        user_id: user.id,
        role: newMessage.role,
        message: newMessage.message,
        timestamp: newMessage.timestamp,
      },
    ]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading auth state...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Please log in to access the chat.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className="mb-4 flex justify-center">
                <div className="w-4/5">
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary bg-opacity-80 text-secondary'
                        : 'bg-secondary bg-opacity-80 text-text-primary'
                    }`}
                  >
                    <p className="text-left">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="bg-background-alt border-t border-primary px-4 py-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 rounded-l-lg border border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary text-secondary p-2 rounded-r-lg hover:bg-primary-dark transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

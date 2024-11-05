'use client';
import { useChat } from 'ai/react';
import { SendIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });
  const [showChat, setShowChat] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const suggestedQuestions = [
    "Quais são as atrações principais?",
    "Como funciona o eco-copo?",
    "Qual é a política de idade mínima?",
    "O que não posso levar para o festival?",
  ];

  const handleSubmitWithAnimation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showChat) {
      setShowChat(true);
    }
    handleSubmit(e);
  };

  const handleQuestionClick = async (question: string) => {
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>);
    await new Promise(resolve => setTimeout(resolve, 50));
    if (!showChat) {
      setShowChat(true);
    }
    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(submitEvent);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden relative h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className={`text-center p-8 transition-all duration-700 ease-in-out ${
          showChat ? 'transform -translate-y-4' : ''
        }`}>
          <div className="mx-auto w-32 h-32 relative mb-4">
            <Image
              src="/rockthemountain.gif"
              alt="Rock The Mountain Logo"
              fill
              priority
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xl text-white/80">Como posso ajudar?</p>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-8">
            <div 
              className={`transition-all duration-700 ease-in-out ${
                showChat && messages.length > 0
                  ? 'opacity-100'
                  : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
              }`}
            >
              <div className="scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg break-words mb-4 ${
                      message.role === 'assistant'
                        ? 'bg-[#f438f5] text-white ml-4'
                        : 'bg-[#fec61d] text-black mr-4'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="p-4 rounded-lg bg-[#f438f5] text-white ml-4">
                    Pensando...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Bottom Section with Input and Suggestions */}
          <div className="px-8 pb-4">
            {/* Input Form */}
            <form onSubmit={handleSubmitWithAnimation} className="mb-4">
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Pergunte sobre o Rock The Mountain Festival..."
                  className="w-full pr-12 py-4 px-4 rounded-lg border-2 border-[#fec61d] bg-white text-black"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#fec61d] text-black rounded-lg hover:opacity-90 disabled:opacity-50"
                  disabled={isLoading}
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Suggestions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/80">Sugestões:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full p-3 text-left justify-start text-sm bg-[#fec61d] text-black rounded-lg hover:opacity-90 cursor-pointer active:scale-95 transition-transform"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';
import { useChat } from 'ai/react';
import { SendIcon } from 'lucide-react';
import Image from 'next/image';
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

  const handleSubmitWithAnimation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showChat) {
      setShowChat(true);
    }
    handleSubmit(e);
  };

  const handleQuestionClick = (question: string) => {
    const fakeEvent = {
      target: { value: question }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent);
    handleSubmit(new Event('submit') as any);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <div 
          className={`transition-all duration-700 ease-in-out ${
            showChat ? '-translate-y-[20vh]' : 'translate-y-0'
          }`}
        >
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="w-32 h-32 relative">
              <Image
                src="/rockthemountain.gif"
                alt="Rock The Mountain Logo"
                width={128}
                height={128}
                priority
                className="rounded-full"
              />
            </div>
            <h1 className="text-4xl font-bold text-[#fec61d]">Walee</h1>
            <p className="text-xl text-white">Como posso ajudar?</p>
          </div>

          {/* Chat Messages Container */}
          <div 
            className={`transition-all duration-700 ease-in-out ${
              showChat && messages.length > 0
                ? 'max-h-[400px] opacity-100 mb-8'
                : 'max-h-0 opacity-0'
            } bg-white/10 rounded-lg overflow-hidden`}
          >
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg break-words ${
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

          {/* Input Form */}
          <div className="space-y-4">
            <form onSubmit={handleSubmitWithAnimation}>
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
                  <SendIcon className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Sugestões:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full p-3 text-left justify-start text-sm bg-[#fec61d] text-black rounded-lg hover:opacity-90"
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
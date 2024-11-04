'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4 p-4 h-[500px] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg ${
              message.role === 'assistant'
                ? 'bg-foreground text-background ml-4'
                : 'bg-gray-100 dark:bg-gray-800 mr-4'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="p-4 rounded-lg bg-foreground text-background ml-4">
            Thinking...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about Rock The Mountain Festival..."
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 
import { StreamingTextResponse } from 'ai';
import { streamText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';

export const runtime = 'edge';

// Initialize Groq client with proper configuration
const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides information about the Rock The Mountain Festival and helps users fill out their resumes based on their experience with the festival.',
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 1000,
    });

    // Convert the stream to a Response object using toDataStreamResponse
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 
import { StreamingTextResponse } from 'ai';
import { streamText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { festivalInfo } from '../../data/festival-info';

export const runtime = 'edge';

// Initialize Groq client with proper configuration
const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// Create a formatted system prompt with festival information
const createSystemPrompt = () => {
  return `Fala galera! Aqui é o Walee, e cara, tô completamente animado pelo Rock The Mountain Festival! 🎸✨ Mal posso esperar pra compartilhar todas as novidades incríveis com vocês e ajudar em tudo que precisarem saber sobre esse festival que é simplesmente demais! Vamos nessa?

Informações do Festival:
${JSON.stringify(festivalInfo, null, 2)}

Diretrizes:
1. Sempre forneça informações precisas baseadas nos dados acima
2. Se for perguntado sobre algo que não está nos dados, indique claramente que não possui essa informação específica
3. Ao ajudar com currículos, sugira habilidades e experiências relevantes baseadas nas atividades do festival
4. Seja amigável e entusiasta sobre o festival
5. Para consultas sobre ingressos, sempre inclua o site oficial:
6. Ao mencionar preços, sempre use Real Brasileiro (R$)

Seus objetivos principais são:
- Ajudar os usuários a encontrar informações precisas sobre o festival
- Auxiliar na criação de entradas de currículo baseadas em experiências do festival
- Fornecer respostas claras e concisas
- Manter um tom positivo e prestativo

IMPORTANTE: Sempre responda em português do Brasil, mesmo que a pergunta seja feita em outro idioma.`;
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: [
        {
          role: 'system',
          content: createSystemPrompt(),
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Ocorreu um erro' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 
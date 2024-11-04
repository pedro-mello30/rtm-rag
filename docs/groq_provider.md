Groq Provider
The Groq provider contains language model support for the Groq API.

Setup
The Groq provider is available via the @ai-sdk/groq module. You can install it with

pnpm
npm
yarn
pnpm add @ai-sdk/groq
Provider Instance
You can import the default provider instance groq from @ai-sdk/groq:


import { groq } from '@ai-sdk/groq';
If you need a customized setup, you can import createGroq from @ai-sdk/groq and create a provider instance with your settings:


import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
  // custom settings
});
You can use the following optional settings to customize the Groq provider instance:

baseURL string

Use a different URL prefix for API calls, e.g. to use proxy servers. The default prefix is https://api.groq.com/openai/v1.

apiKey string

API key that is being send using the Authorization header. It defaults to the GROQ_API_KEY environment variable.

headers Record<string,string>

Custom headers to include in the requests.

fetch (input: RequestInfo, init?: RequestInit) => Promise<Response>

Custom fetch implementation. Defaults to the global fetch function. You can use it as a middleware to intercept requests, or to provide a custom fetch implementation for e.g. testing.

Language Models
You can create Groq models using a provider instance. The first argument is the model id, e.g. gemma2-9b-it.


const model = groq('gemma2-9b-it');
Example
You can use Groq language models to generate text with the generateText function:


import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const { text } = await generateText({
  model: groq('gemma2-9b-it'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
Model Capabilities
Groq offers a variety of models with different capabilities, including:

Model	Image Input	Object Generation	Tool Usage	Tool Streaming
llama-3.1-70b-versatile				
llama-3.1-8b-instant				
gemma2-9b-it				
mixtral-8x7b-32768				

/*
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const json = await req.json()
  const { messages, previewToken } = json

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}

*/


import { StreamingTextResponse } from 'ai'
import { google } from '@ai-sdk/google'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'

export const runtime = 'edge'

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const json = await req.json()
  const { messages, previewToken } = json

  // Get a language model
  const model = google('models/gemini-1.5-flash-latest')

  // Call the language model with the prompt
  const result = await model.generateContent({
    contents: messages.map((message: any) => ({
      role: message.role,
      parts: [{ text: message.content }]
    })),
    generationConfig: {
      temperature: 0.7,
      topP: 0.4,
      maxOutputTokens: 4096,
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ]
  })

  // Create a ReadableStream from the result
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        controller.enqueue(text)
      }
      controller.close()
    }
  })

  return new StreamingTextResponse(stream)
}

//https://github.com/ai-sdk/google
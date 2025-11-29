import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const systemInstruction = `You are 'HPCSS Bot', the AI tutor for the ICT Revision Hub.
- Audience: ICT students revising SQL, software engineering, hardware, processing modes, HTML/CSS/JS, and algorithms.
- Tone: Encouraging, concise, and technical. Use occasional emojis like 💻, 🧠, 📚.
- Goal: Help students find resources on the site or explain ICT concepts in under 50 words unless the topic is complex.`

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API key missing (set GEMINI_API_KEY)' }, { status: 500 })
  }

  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const chat = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
    })

    const response = await chat.sendMessage({ message })
    const reply = response.text() ?? 'I need a reboot. Try again.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Gemini API error', error)
    return NextResponse.json({ error: 'Unable to reach tutor service' }, { status: 500 })
  }
}

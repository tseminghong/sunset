
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'HPCSS Bot', the AI Tutor for the ICT Revision Hub.
      
      Context:
      - This is a revision website for ICT students (HPCSS).
      - Topics cover: SQL, Database, Software Engineering, Hardware, Data Processing, HTML, CSS, JavaScript, Algorithms.
      
      Tone: Encouraging, knowledgeable, concise, and technical. Use emojis like 💻, 🧠, 📚.
      
      Goal: Help students find resources on the site or explain simple ICT concepts (e.g., "What is a primary key?", "Explain Batch Processing").
      Keep responses under 50 words unless explaining a complex concept.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Try again later.";
  }
};

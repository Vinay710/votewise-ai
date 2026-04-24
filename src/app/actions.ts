"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are VoteWise AI, a friendly election awareness assistant.
Rules:
- Stay politically neutral at all times
- Explain things in simple, easy-to-understand language
- Use bullet points for clarity
- Help users understand the election process
- Use India election examples where relevant
- Keep answers short and useful
- Maintain a friendly, encouraging tone`;

export async function generateElectionResponse(
  message: string,
  lang: string = "en"
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });
      const prompt = `Please respond in this language: ${lang}\n\nUser Question: ${message}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return "I'm sorry, the AI service is currently unavailable. Please try again in a few moments.";
    }
  }

  // Fallback to basic message if API is missing or fails
  return "I'm VoteWise AI. Please configure a valid Gemini API key to get smart responses! For now, remember to check your voter ID and polling booth before election day.";
}

export async function detectFakeNews(
  content: string,
  lang: string = "en"
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: "You are a Fake News Detector for elections. Analyze the provided news, claim, or WhatsApp forward. Determine if it is likely True, likely False, or Misleading based on general knowledge of Indian elections. Provide a brief explanation. Keep it politically neutral.",
      });
      const prompt = `Please respond in this language: ${lang}\n\nAnalyze this claim:\n${content}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return "I'm sorry, the AI service is currently unavailable. Please try again in a few moments.";
    }
  }

  return "Please configure a valid Gemini API key to use the Fake News Detector.";
}

export async function compareCandidates(
  candidates: string,
  lang: string = "en"
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: "You are an AI that provides publicly available, neutral comparison between political figures or parties. Provide factual background, key policies, and general focus areas. Never take sides or endorse anyone. If the figures are not recognizable, state that.",
      });
      const prompt = `Please respond in this language: ${lang}\n\nCompare these candidates or parties:\n${candidates}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return "I'm sorry, the AI service is currently unavailable. Please try again in a few moments.";
    }
  }

  return "Please configure a valid Gemini API key to compare candidates.";
}

# VoteWise AI 🗳️

> **AI-Powered Election Awareness Assistant** — Understand elections in minutes!

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-purple)](https://framer.com/motion)

---

## 🎯 About

VoteWise AI is a production-ready web application that helps first-time voters, citizens, students, and senior citizens understand the election process through an AI-powered chat interface.

**Key highlights:**
- 🤖 AI-powered chat with election knowledge (mock Gemini API, plug in your key)
- 🗓️ Visual election timeline with all 7 phases explained
- 🧙 Step-by-step wizard for first-time voters
- 🌐 Multilingual: English, Hindi, Kannada
- 🌙 Dark mode support
- 📱 Fully responsive design

---

## 🚀 Quick Start

```bash
cd votewise-ai
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your key at [Google AI Studio](https://aistudio.google.com/app/apikey).

> The app ships with a **mock AI** that works without a real API key.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (/)
│   ├── chat/page.tsx        # Chat page (/chat)
│   ├── timeline/page.tsx    # Timeline (/timeline)
│   └── first-voter/page.tsx # First Voter Wizard (/first-voter)
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ChatBox.tsx
│   ├── SidebarMenu.tsx
│   ├── FeatureCard.tsx
│   ├── TimelineCard.tsx
│   ├── StateSelector.tsx
│   └── LoadingSpinner.tsx
├── hooks/useLanguage.tsx
└── lib/
    ├── gemini.ts
    └── translations.ts
```

---

## 🌐 Connecting Real Gemini AI

In `src/lib/gemini.ts`, replace the mock:

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateElectionResponse(message: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent([SYSTEM_PROMPT, message]);
  return result.response.text();
}
```

```bash
npm install @google/generative-ai
```

---

## 🏗️ Build for Production

```bash
npm run build && npm start
```

---

⚖️ **Disclaimer:** VoteWise AI is neutral and does not endorse any political party or candidate.

Built with ❤️ for democracy 🇮🇳

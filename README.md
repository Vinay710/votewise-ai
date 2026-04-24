# VoteWise AI 🗳️

> **AI-Powered Election Awareness Assistant** — Understand elections in minutes!

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-purple)](https://framer.com/motion)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-blue)](https://aistudio.google.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Testing-green)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-orange)](https://playwright.dev/)

---

## 🎯 About The Project

VoteWise AI is a politically neutral, multilingual web application built to educate citizens about the election process. It uses AI to answer questions, detect fake news, compare candidates, guide first-time voters, and break down complex electoral procedures into easy-to-understand formats.

The app supports **English, Hindi, and Kannada**, and features a responsive design with Light/Dark mode support.

---

## ⚙️ How It Works (Project Architecture & Flow)

VoteWise AI is divided into several main functional modules powered by **Next.js Server Actions**:

### 1. Home / Landing Page (`/`)
- Serves as the entry point, introducing the core features of the platform.
- Displays key statistics about the elections and highlights the multilingual support.
- Provides quick CTAs to start chatting with the AI or explore the platform.

### 2. AI Chat & Voice Assistant (`/chat`)
- **Working:** Powered by the Google Gemini API securely through Server Actions, this interface allows users to ask open-ended questions about voting, election rules, etc.
- **Voice Assistant:** Integrated Web Speech API allows users to dictate their questions instead of typing.
- **Features:** Suggests predefined topics, returns clear, jargon-free answers in the user's selected language.

### 3. Fake News Detector (`/fake-news`)
- **Working:** Users can paste any suspicious WhatsApp forward or news headline.
- The AI analyzes the claim and returns a neutral, factual assessment on its validity.

### 4. Candidate Compare (`/candidates`)
- **Working:** Enter two political parties or candidates to receive a completely neutral, factual comparison and summary directly from the AI.

### 5. First-Time Voter Wizard (`/first-voter`)
- **Working:** An interactive, step-by-step wizard to assess a user's voting readiness based on Age, State, and Voter ID status, returning a personalized checklist.

### 6. Election Timeline (`/timeline`)
- **Working:** A visual chronological guide explaining the entire lifecycle of an election (Notification, Polling, Counting, etc.).

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx           # Root layout, theme providers, language context
│   ├── page.tsx             # Home page (/)
│   ├── actions.ts           # Server Actions for secure Gemini AI calls
│   ├── chat/page.tsx        # Chat page with Voice Assistant
│   ├── fake-news/page.tsx   # Fake News Detector
│   ├── candidates/page.tsx  # Candidate Compare UI
│   ├── timeline/page.tsx    # Election Timeline UI
│   └── first-voter/page.tsx # First Voter Wizard Flow
├── components/
│   ├── Navbar.tsx           # Navigation & Theme toggle
│   ├── ChatBox.tsx          # Chat interface & Voice logic
│   └── ...                  # Other UI components
├── hooks/
│   └── useLanguage.tsx      # Custom hook managing localization context
└── lib/
    ├── gemini.ts            # Legacy/Utility AI functions
    └── translations.ts      # Dictionary for i18n
__tests__/                   # Vitest Unit & Integration Tests
e2e/                         # Playwright End-to-End Tests
```

---

## 🧪 Testing Suite

VoteWise AI comes with a robust testing setup ensuring production readiness:
- **Unit & Integration Tests:** Powered by Vitest & React Testing Library.
- **E2E Tests:** Powered by Playwright to simulate real user flows.

**Test Commands:**
- `npm run test` — Run Vitest unit/integration tests.
- `npm run test:coverage` — Run Vitest with coverage report.
- `npm run test:e2e` — Run Playwright End-to-End tests.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
cd votewise-ai
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your secrets.

Inside `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get your key at [Google AI Studio](https://aistudio.google.com/app/apikey). The app handles API missing gracefully with fallback responses).*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Technology Stack
- **Framework:** Next.js (React) App Router
- **Backend:** Next.js Server Actions
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **AI Integration:** `@google/generative-ai`
- **Testing:** Vitest, React Testing Library, Playwright

---

## 🏗️ Build for Production

```bash
npm run build && npm start
```

---

⚖️ **Disclaimer:** VoteWise AI is purely educational and politically neutral. It does not endorse any political party or candidate.

Built with ❤️ for democracy 🇮🇳

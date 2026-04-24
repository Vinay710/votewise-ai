# VoteWise AI 🗳️

> **AI-Powered Election Awareness Assistant** — Understand elections in minutes!

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-purple)](https://framer.com/motion)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-blue)](https://aistudio.google.com/)

---

## 🎯 About The Project

VoteWise AI is a politically neutral, multilingual web application built to educate citizens about the election process. It uses AI to answer questions, guide first-time voters, and break down complex electoral procedures into easy-to-understand formats.

The app supports **English, Hindi, and Kannada**, and features a responsive design with Light/Dark mode support.

---

## ⚙️ How It Works (Project Architecture & Flow)

VoteWise AI is divided into four main functional modules:

### 1. Home / Landing Page (`/`)
- Serves as the entry point, introducing the core features of the platform.
- Displays key statistics about the elections and highlights the multilingual support.
- Provides quick CTAs to start chatting with the AI or view the election timeline.

### 2. AI Chat Assistant (`/chat`)
- **Working:** Powered by the Google Gemini API, this interface allows users to ask open-ended questions about voting, election rules, polling booths, etc.
- **Features:** 
  - Suggests predefined topics/prompts in a sidebar.
  - Returns clear, jargon-free answers in the user's selected language.
  - Includes a mock Gemini integration for testing without an API key, which can be swapped for the real API.

### 3. First-Time Voter Wizard (`/first-voter`)
- **Working:** An interactive, step-by-step wizard to assess a user's voting readiness.
- **Flow:**
  - **Step 1:** Asks for the user's age (validates if they are 18+).
  - **Step 2:** Asks for their home state (to provide state-specific links/guidance).
  - **Step 3:** Asks if they already possess a Voter ID (EPIC) card.
  - **Result:** Generates a personalized checklist (e.g., how to register if they don't have an ID, or a reminder to check the polling booth if they do).

### 4. Election Timeline (`/timeline`)
- **Working:** A visual chronological guide explaining the entire lifecycle of an election.
- Breaks down the process into phases (e.g., Notification, Nomination, Scrutiny, Campaigning, Polling, Counting, Result Declaration).

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx           # Root layout, theme providers, language context
│   ├── page.tsx             # Home page (/)
│   ├── chat/page.tsx        # Chat page with Gemini integration (/chat)
│   ├── timeline/page.tsx    # Election Timeline UI (/timeline)
│   └── first-voter/page.tsx # First Voter Wizard Flow (/first-voter)
├── components/
│   ├── Navbar.tsx           # Navigation & Theme toggle
│   ├── ChatBox.tsx          # Chat interface & AI message rendering
│   ├── StateSelector.tsx    # Dropdown for Indian states
│   └── ...                  # Other UI components
├── hooks/
│   └── useLanguage.tsx      # Custom hook managing localization context
└── lib/
    ├── gemini.ts            # Google Generative AI integration logic
    └── translations.ts      # Dictionary for i18n
```

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
```
*(Get your key at [Google AI Studio](https://aistudio.google.com/app/apikey). The app can also run with a mock AI if you don't provide a key).*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Technology Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Integration:** `@google/generative-ai`

---

## 🏗️ Build for Production

```bash
npm run build && npm start
```

---

⚖️ **Disclaimer:** VoteWise AI is purely educational and politically neutral. It does not endorse any political party or candidate.

Built with ❤️ for democracy 🇮🇳

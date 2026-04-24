// Gemini AI response generator using @google/generative-ai
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

const mockResponses: Record<string, string> = {
  default: `I'm VoteWise AI! 🗳️ I'm here to help you understand elections clearly and simply.

Here's what I can help you with:
• **Voter Registration** — How to register and verify your name
• **Voting Day Guide** — What to bring and how the process works
• **Election Timeline** — Key dates and phases of an election
• **Vote Counting** — How votes are secured and counted
• **FAQs** — Common questions answered simply

Feel free to ask me anything about elections!`,

  registration: `**Voter Registration in India** 🗳️

Here's how to register:
• **Age requirement**: You must be 18+ years old
• **Online**: Visit [voterportal.eci.gov.in](https://voterportal.eci.gov.in)
• **Form**: Fill Form 6 (new voter) or Form 8 (corrections)
• **Documents needed**:
  - Age proof (Aadhaar, birth certificate)
  - Address proof (utility bill, bank passbook)
  - Passport-size photo

**After submission:**
• Booth Level Officer (BLO) verifies your details
• Voter ID card (EPIC) is issued within 30 days
• You can also use the Voter Helpline App (Android/iOS)

*Tip: Register at least 5 weeks before election day!*`,

  "first time": `**First-Time Voter Guide** 🌟

Welcome to democracy! Here's everything you need:

**Before Election Day:**
• ✅ Check your name on the electoral roll
• ✅ Know your polling booth address (check Voter Helpline App)
• ✅ Carry your Voter ID card (EPIC) or any approved photo ID

**Approved Photo IDs (if Voter ID unavailable):**
• Aadhaar Card
• Passport
• Driving License
• PAN Card
• Bank Passbook with photo
• Smart Card issued by MGNREGS

**On Election Day:**
• 🕐 Polling booths open 7 AM – 6 PM (may vary by state)
• Follow the queue patiently
• Press the EVM button for your chosen candidate
• Get your finger inked — proof you voted!
• VVPAT slip will show your vote for 7 seconds

*Voting is your right and responsibility. Use it wisely!*`,

  documents: `**Documents Needed for Voting** 📄

**Primary ID (preferred):**
• Voter ID Card (EPIC) — issued by Election Commission

**Alternative Photo IDs accepted:**
• Aadhaar Card
• Passport
• Driving License
• PAN Card
• MGNREGS Job Card
• Bank / Post Office Passbook with photo
• Smart Cards by Labour Ministry
• Pension Documents with photo
• Service Photo ID cards (Govt employees)
• MP/MLA/MLC official identity cards

**Important:**
• The ID must have your photo
• Your name must appear on the electoral roll
• Carry original documents, not photocopies

*Pro Tip: Download the Voter Helpline App to check your voter details!*`,

  counted: `**How Are Votes Counted?** 🔢

India uses **Electronic Voting Machines (EVMs)**:

**Counting Day Process:**
1. **Counting starts** at 8 AM (usually day after voting)
2. Strong rooms are opened in presence of candidates/agents
3. **Postal ballots** counted first
4. EVMs are unsealed and results tabulated
5. Returning Officer announces winner

**Security measures:**
• EVMs are stored in sealed strong rooms with CCTV
• Multiple layers of security personnel
• Candidates' agents can observe the entire process
• Random EVM verification via VVPAT count

**VVPAT (Voter Verifiable Paper Audit Trail):**
• Paper slip shows your vote for 7 seconds
• Acts as backup verification
• Randomly selected booths matched with EVM counts

*India's EVM system is praised globally for its security and reliability!*`,

  conducted: `**How Are Elections Conducted in India?** 🇮🇳

The **Election Commission of India (ECI)** oversees all elections.

**Key Phases:**
1. **Election Notification** — Schedule announced, Model Code of Conduct activated
2. **Nominations** — Candidates file nomination papers
3. **Scrutiny** — Papers checked for eligibility
4. **Campaign Period** — Candidates campaign (ends 48hrs before polling)
5. **Polling Day** — Citizens vote using EVMs
6. **Counting Day** — Votes counted, results announced

**Types of Elections:**
• **Lok Sabha** — Every 5 years (National Parliament)
• **State Assembly (Vidhan Sabha)** — Every 5 years per state
• **Local Body** — Municipal/Panchayat elections

**Key Bodies:**
• Chief Election Commissioner leads the ECI
• Returning Officers manage each constituency
• Booth Level Officers maintain voter rolls

*India conducts the world's largest democratic elections!*`,

  "voter id": `**Voter ID Card (EPIC) Information** 🪪

**Getting Your Voter ID:**
• Apply online at voterportal.eci.gov.in
• Fill Form 6 for new registration
• Submit age proof + address proof + photo

**Features of EPIC:**
• Full name, photo, address
• Unique EPIC number
• QR code (newer versions)

**Lost Voter ID?**
• Apply for duplicate via Form 002 on Voter Portal
• Or visit your Electoral Registration Officer
• Download e-EPIC (digital Voter ID) from the portal — free!

**What if name is wrong?**
• File Form 8 for corrections
• Submit supporting documents

**Checking Status:**
• Visit voterportal.eci.gov.in
• Use the Voter Helpline: **1950**
• Use the Voter Helpline App (Android/iOS)`,
};

function getResponseKey(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("register") || lower.includes("registration")) return "registration";
  if (lower.includes("first time") || lower.includes("first-time") || lower.includes("new voter")) return "first time";
  if (lower.includes("document") || lower.includes("id proof") || lower.includes("carry")) return "documents";
  if (lower.includes("count") || lower.includes("counted") || lower.includes("evm") || lower.includes("vvpat")) return "counted";
  if (lower.includes("conduct") || lower.includes("how") && lower.includes("election")) return "conducted";
  if (lower.includes("voter id") || lower.includes("epic") || lower.includes("id card")) return "voter id";
  return "default";
}

export async function generateElectionResponse(
  message: string,
  lang: string = "en"
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT
      });
      const prompt = `Please respond in this language: ${lang}\n\nUser Question: ${message}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      // Fallback to mock responses if API fails
    }
  }

  // Fallback: Simulate network delay (1–2 seconds)
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000)
  );

  const key = getResponseKey(message);
  return mockResponses[key] || mockResponses["default"];
}

export { SYSTEM_PROMPT };

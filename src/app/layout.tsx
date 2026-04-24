import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VoteWise AI — Understand Elections with AI",
  description:
    "An AI-powered election awareness assistant. Learn about voter registration, voting day, election timelines, and more in simple, clear language.",
  keywords: ["elections", "voting", "India", "voter registration", "election process", "AI"],
  openGraph: {
    title: "VoteWise AI",
    description: "Understand elections in minutes with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen bg-inherit">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "var(--toast-bg)",
                  color: "var(--toast-color)",
                  borderRadius: "12px",
                  fontSize: "14px",
                  padding: "12px 16px",
                  boxShadow:
                    "0 4px 24px -4px rgba(0,0,0,0.15)",
                },
              }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Vote,
  Shield,
  Clock,
  BookOpen,
  Globe2,
  CheckCircle2,
  Users,
  BarChart3,
  MessageCircle,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { useLanguage } from "@/hooks/useLanguage";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "AI-Powered Q&A",
    description:
      "Get instant answers to your election questions in simple, clear language. No jargon, just clarity.",
    color: "primary",
  },
  {
    icon: Clock,
    title: "Election Timeline",
    description:
      "Understand every phase of an election — from notification to result announcement.",
    color: "accent",
  },
  {
    icon: CheckCircle2,
    title: "Voter Checklist",
    description:
      "Personalized checklist based on your age, state, and voter ID status.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Politically Neutral",
    description:
      "VoteWise AI never endorses any party or candidate. Pure, unbiased election education.",
    color: "teal",
  },
  {
    icon: Globe2,
    title: "Multilingual",
    description:
      "Available in English, Hindi, and Kannada — reach every citizen in their language.",
    color: "orange",
  },
  {
    icon: BookOpen,
    title: "Easy to Understand",
    description:
      "Complex election rules explained in bullet points and simple words for everyone.",
    color: "pink",
  },
];

const STEPS = [
  { icon: "📝", title: "Register", desc: "Add your name to the electoral roll" },
  { icon: "📋", title: "Verify", desc: "Check voter list before election day" },
  { icon: "🗳️", title: "Vote", desc: "Cast your vote on polling day" },
  { icon: "🎉", title: "Result", desc: "Watch results and celebrate democracy" },
];

const STATS = [
  { value: "96.8 Cr", label: "Registered Voters", icon: Users },
  { value: "543", label: "Lok Sabha Seats", icon: BarChart3 },
  { value: "10 Lakh+", label: "Polling Stations", icon: Vote },
  { value: "24/7", label: "AI Assistance", icon: Sparkles },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative hero-gradient pattern-dots overflow-hidden min-h-[92vh] flex items-center">
        {/* Glow blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">
                AI-Powered Election Awareness
              </span>
              <span className="bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                NEW
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-6 leading-tight"
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
            >
              {t("heroDesc")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/chat"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary-700 font-bold text-base px-8 py-4 rounded-2xl hover:bg-white/95 hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                <MessageCircle className="w-5 h-5" />
                {t("startChat")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/timeline"
                className="w-full sm:w-auto flex items-center justify-center gap-2 glass text-white font-bold text-base px-8 py-4 rounded-2xl hover:bg-white/15 hover:scale-105 transition-all duration-200"
              >
                <Clock className="w-5 h-5" />
                {t("viewTimeline")}
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-4 text-center hover:bg-white/15 transition-all"
                >
                  <Icon className="w-5 h-5 text-accent-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-4 py-1.5 rounded-full mb-4">
              Features
            </span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              {t("featuresTitle")}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <FeatureCard key={i} {...feat} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/30 px-4 py-1.5 rounded-full mb-4">
              Election Process
            </span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              {t("whyTitle")}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t("whySubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="text-center p-6 rounded-2xl border-2 border-gray-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 bg-white dark:bg-slate-800 hover:shadow-card transition-all duration-300 cursor-default"
              >
                <div
                  className={`text-4xl mb-4 transition-transform duration-300 ${hovered === i ? "scale-125" : ""}`}
                >
                  {step.icon}
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multilingual Banner */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-accent-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-700/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe2 className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Available in Your Language
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              VoteWise AI speaks to every citizen in their language — English,
              हिंदी, and ಕನ್ನಡ.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { flag: "🇬🇧", lang: "English" },
                { flag: "🇮🇳", lang: "हिंदी" },
                { flag: "🇮🇳", lang: "ಕನ್ನಡ" },
              ].map((l) => (
                <div
                  key={l.lang}
                  className="glass rounded-2xl px-8 py-4 text-white font-bold text-lg hover:bg-white/20 transition-all cursor-default"
                >
                  {l.flag} {l.lang}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Ready to Become a Smarter Voter?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
              Ask VoteWise AI anything about elections — it&apos;s free, neutral, and
              always ready.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold px-10 py-4 rounded-2xl hover:from-primary-700 hover:to-primary-800 hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with VoteWise AI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

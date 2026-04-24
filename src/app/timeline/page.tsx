"use client";

import { motion } from "framer-motion";
import TimelineCard from "@/components/TimelineCard";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar } from "lucide-react";

const TIMELINE = [
  {
    step: 1,
    icon: "📢",
    title: "Election Notification",
    description:
      "The Election Commission of India officially announces the election schedule. The Model Code of Conduct comes into effect immediately, restricting party activities to ensure fair elections.",
    date: "Phase 1",
    color: "primary",
  },
  {
    step: 2,
    icon: "📋",
    title: "Nominations Open",
    description:
      "Candidates file their nomination papers with the Returning Officer. Independents, party candidates, and local leaders can contest. A security deposit is required.",
    date: "Phase 2",
    color: "accent",
  },
  {
    step: 3,
    icon: "🔍",
    title: "Scrutiny of Papers",
    description:
      "The Returning Officer examines all nomination papers for validity. Candidates must meet eligibility criteria including age (25+ for Lok Sabha), citizenship, and no criminal disqualifications.",
    date: "Phase 3",
    color: "purple",
  },
  {
    step: 4,
    icon: "📣",
    title: "Campaign Period",
    description:
      "Candidates and parties actively campaign — rallies, door-to-door outreach, media campaigns. Strict spending limits apply. Campaigning stops 48 hours before polling begins.",
    date: "Phase 4",
    color: "orange",
  },
  {
    step: 5,
    icon: "🗳️",
    title: "Polling Day",
    description:
      "Citizens cast their votes using Electronic Voting Machines (EVMs) at designated polling booths. Booths open at 7 AM and close at 6 PM. A VVPAT slip verifies your choice.",
    date: "Phase 5",
    color: "teal",
  },
  {
    step: 6,
    icon: "🔢",
    title: "Vote Counting",
    description:
      "Counting begins on a designated day (usually the day after polling). Postal ballots counted first, then EVM results tabulated under close supervision by all candidates' agents.",
    date: "Phase 6",
    color: "rose",
  },
  {
    step: 7,
    icon: "🏆",
    title: "Results Declared",
    description:
      "The Returning Officer announces the winner. The winning candidate receives a certificate of election. The new government is formed and the swearing-in ceremony takes place.",
    date: "Phase 7",
    color: "indigo",
  },
];

export default function TimelinePage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 min-h-screen bg-slate-50 dark:bg-slate-900 page-section">
      {/* Header */}
      <section className="hero-gradient pattern-dots py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
              <Calendar className="w-4 h-4 text-white/80" />
              <span className="text-white/90 text-sm font-medium">
                Election Process Guide
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              {t("timelineTitle")}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t("timelineSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Phase legend */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700 shadow-card"
          >
            <p className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">
              🗓️ Indian General Election Phases
            </p>
            <div className="flex flex-wrap gap-2">
              {["Multi-phase voting", "35–40 day campaign", "Results on counting day", "ECI administered"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          <div>
            {TIMELINE.map((item, i) => (
              <TimelineCard
                key={item.step}
                {...item}
                isLast={i === TIMELINE.length - 1}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 bg-accent-50 dark:bg-emerald-900/20 border border-accent-200 dark:border-emerald-800 rounded-2xl p-5 text-center"
          >
            <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
              🇮🇳 India holds the world's largest democratic elections, involving
              over 968 million eligible voters!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

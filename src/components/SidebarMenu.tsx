"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import {
  User,
  ClipboardList,
  CalendarCheck,
  BarChart2,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const TOPICS = [
  { icon: User, key: "firstTimeVoter", label: "First Time Voter", prompt: "How do I vote for the first time?" },
  { icon: ClipboardList, key: "registration", label: "Registration Help", prompt: "How do I register to vote?" },
  { icon: CalendarCheck, key: "votingDay", label: "Voting Day Guide", prompt: "What happens on voting day?" },
  { icon: BarChart2, key: "counting", label: "Counting Process", prompt: "How are votes counted?" },
  { icon: HelpCircle, key: "faqs", label: "FAQs", prompt: "What documents are needed to vote?" },
];

interface SidebarMenuProps {
  onSelectTopic: (prompt: string) => void;
  activeTopic?: string;
}

export default function SidebarMenu({ onSelectTopic, activeTopic }: SidebarMenuProps) {
  return (
    <aside className="w-full h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col">
      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-200 dark:border-slate-700">
        <h2 className="font-bold text-gray-900 dark:text-white text-base">Topics</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Pick a topic to explore</p>
      </div>

      {/* Topics */}
      <nav className="flex-1 px-3 py-4 space-y-1 bg-white dark:bg-slate-900">
        {TOPICS.map((topic, i) => {
          const Icon = topic.icon;
          const isActive = activeTopic === topic.prompt;
          return (
            <motion.button
              key={topic.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => onSelectTopic(topic.prompt)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-sm"
                  : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isActive
                    ? "bg-primary-100 dark:bg-primary-800/60 text-primary-600 dark:text-primary-300"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                } transition-all`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="flex-1 text-left">{topic.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary-500" />}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="text-xs text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
          <p className="font-medium text-gray-600 dark:text-slate-400 mb-1">🇮🇳 India Elections</p>
          <p>Powered by VoteWise AI. Neutral &amp; helpful.</p>
        </div>
      </div>
    </aside>
  );
}

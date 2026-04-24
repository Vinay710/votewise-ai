"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SidebarMenu from "@/components/SidebarMenu";
import ChatBox from "@/components/ChatBox";
import { MessageCircle, X, Menu } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function ChatPage() {
  const { t } = useLanguage();
  const [activeTopic, setActiveTopic] = useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectTopic = (prompt: string) => {
    setActiveTopic(prompt);
    setSidebarOpen(false);
  };

  return (
    <div className="pt-16 h-screen flex flex-col bg-slate-50 dark:bg-slate-900 page-section">
      {/* Page header (mobile only) */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-gray-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary-600" />
          <span className="font-bold text-gray-900 dark:text-white">{t("chatTitle")}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar — desktop always visible, mobile overlay */}
        <div
          className={`
            fixed md:static inset-0 z-40 md:z-auto
            w-72 flex-shrink-0
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          `}
        >
          {/* Mobile backdrop */}
          {sidebarOpen && (
            <div
              className="absolute inset-0 bg-black/40 md:hidden -z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="h-full border-r border-gray-200 dark:border-slate-700">
            <SidebarMenu
              onSelectTopic={handleSelectTopic}
              activeTopic={activeTopic}
            />
          </div>
        </div>

        {/* Chat area */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-800"
        >
          <ChatBox initialPrompt={activeTopic} />
        </motion.main>
      </div>
    </div>
  );
}

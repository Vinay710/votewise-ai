"use client";

import { motion } from "framer-motion";

interface TimelineCardProps {
  step: number;
  title: string;
  description: string;
  date?: string;
  icon?: string;
  isLast?: boolean;
  delay?: number;
  color?: string;
}

export default function TimelineCard({
  step,
  title,
  description,
  date,
  icon = "📋",
  isLast = false,
  delay = 0,
  color = "primary",
}: TimelineCardProps) {
  const colorMap: Record<string, string> = {
    primary: "from-primary-500 to-primary-700 border-primary-200 dark:border-primary-800",
    accent: "from-accent-500 to-accent-700 border-accent-200 dark:border-accent-800",
    purple: "from-purple-500 to-purple-700 border-purple-200 dark:border-purple-800",
    orange: "from-orange-400 to-orange-600 border-orange-200 dark:border-orange-800",
    teal: "from-teal-400 to-teal-600 border-teal-200 dark:border-teal-800",
    rose: "from-rose-500 to-rose-700 border-rose-200 dark:border-rose-800",
    indigo: "from-indigo-500 to-indigo-700 border-indigo-200 dark:border-indigo-800",
  };

  const gradientClass = colorMap[color] || colorMap["primary"];
  const [gradientPart] = gradientClass.split(" border");

  return (
    <motion.div
      initial={{ opacity: 0, x: step % 2 === 0 ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className="flex gap-6 relative"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600 dark:to-transparent" />
      )}

      {/* Step indicator */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientPart} flex items-center justify-center shadow-lg text-xl`}
        >
          {icon}
        </div>
        <span className="mt-1 text-xs font-bold text-gray-400 dark:text-gray-500">
          {String(step).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <div
          className={`bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card hover:shadow-card-hover border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1`}
        >
          {date && (
            <span className="inline-block text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full mb-3">
              {date}
            </span>
          )}
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

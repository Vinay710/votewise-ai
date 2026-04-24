"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  color?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  color = "primary",
}: FeatureCardProps) {
  const colorMap: Record<string, string> = {
    primary: "from-primary-500 to-primary-700",
    accent: "from-accent-500 to-accent-700",
    purple: "from-purple-500 to-purple-700",
    orange: "from-orange-400 to-orange-600",
    pink: "from-pink-500 to-rose-600",
    teal: "from-teal-400 to-teal-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 dark:border-slate-700 transition-all duration-300"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
          colorMap[color] || colorMap["primary"]
        } flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

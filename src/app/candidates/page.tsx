"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Search, Users } from "lucide-react";
import { compareCandidates } from "@/app/actions";
import { useLanguage } from "@/hooks/useLanguage";

export default function CandidateComparePage() {
  const { lang } = useLanguage();
  const [candidate1, setCandidate1] = useState("");
  const [candidate2, setCandidate2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!candidate1.trim() || !candidate2.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Candidate 1: ${candidate1}\nCandidate 2: ${candidate2}`;
      const response = await compareCandidates(prompt, lang);
      setResult(response);
    } catch (error) {
      setResult("Error comparing candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-6 shadow-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Candidate Compare
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare political candidates or parties based on factual data, history, and general policies. Completely neutral and unbiased.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Candidate or Party 1
              </label>
              <input
                type="text"
                value={candidate1}
                onChange={(e) => setCandidate1(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                placeholder="E.g., Party A or Politician Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Candidate or Party 2
              </label>
              <input
                type="text"
                value={candidate2}
                onChange={(e) => setCandidate2(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                placeholder="E.g., Party B or Politician Name"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCompare}
              disabled={loading || !candidate1.trim() || !candidate2.trim()}
              className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition-all shadow-md active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Scale className="w-5 h-5" />
              )}
              {loading ? "Comparing..." : "Compare"}
            </button>
          </div>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Comparison Report</h2>
            </div>
            <div
              className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

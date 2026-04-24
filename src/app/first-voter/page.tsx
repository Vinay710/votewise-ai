"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import StateSelector from "@/components/StateSelector";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  CreditCard,
  ListChecks,
  PartyPopper,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface WizardData {
  age: string;
  state: string;
  hasVoterId: string;
}

function generateChecklist(data: WizardData): { text: string; done: boolean }[] {
  const age = parseInt(data.age, 10);
  const isEligible = age >= 18;
  const hasId = data.hasVoterId === "yes";

  if (!isEligible) {
    return [
      { text: "You must be 18 years or older to vote in India.", done: false },
      {
        text: `You are currently ${age} years old. You will be eligible to vote when you turn 18.`,
        done: false,
      },
      {
        text: "Pre-register your voter ID at voterportal.eci.gov.in when you approach 18.",
        done: false,
      },
    ];
  }

  const list: { text: string; done: boolean }[] = [
    { text: "You are eligible to vote! 🎉", done: true },
  ];

  if (hasId) {
    list.push({ text: "You have a Voter ID card (EPIC) ✅", done: true });
    list.push({
      text: `Verify your name on the electoral roll for ${data.state}`,
      done: true,
    });
    list.push({ text: "Check your polling booth address (Voter Helpline App)", done: false });
    list.push({ text: "Carry your Voter ID card on election day", done: false });
    list.push({ text: "Vote on polling day (7 AM – 6 PM)", done: false });
  } else {
    list.push({
      text: "You don't have a Voter ID yet — apply online now",
      done: false,
    });
    list.push({
      text: "Visit voterportal.eci.gov.in and fill Form 6",
      done: false,
    });
    list.push({
      text: "Upload age proof + address proof + passport photo",
      done: false,
    });
    list.push({
      text: `Verify registration for ${data.state} state roll`,
      done: false,
    });
    list.push({ text: "Carry alternative photo ID if Voter ID not yet received", done: false });
    list.push({ text: "Vote on polling day (7 AM – 6 PM)", done: false });
  }

  return list;
}

const STEPS = [
  { icon: User, label: "Your Age" },
  { icon: MapPin, label: "Your State" },
  { icon: CreditCard, label: "Voter ID" },
  { icon: ListChecks, label: "Checklist" },
];

export default function FirstVoterPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({ age: "", state: "", hasVoterId: "" });

  const checklist = step === 3 ? generateChecklist(data) : [];
  const isEligible = parseInt(data.age, 10) >= 18;

  const canNext = () => {
    if (step === 0) return data.age !== "" && parseInt(data.age, 10) > 0;
    if (step === 1) return data.state !== "";
    if (step === 2) return data.hasVoterId !== "";
    return false;
  };

  const next = () => {
    if (!canNext()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="pt-16 min-h-screen bg-slate-50 dark:bg-slate-900 page-section">
      {/* Header */}
      <section className="hero-gradient pattern-dots py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
              {t("wizardTitle")}
            </h1>
            <p className="text-lg text-white/70">{t("wizardSubtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-16">
        <div className="max-w-lg mx-auto px-4">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isCompleted = i < step;
              const isCurrent = i === step;
              return (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-accent-500 shadow-lg"
                          : isCurrent
                          ? "bg-primary-600 shadow-lg scale-110"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Icon
                          className={`w-5 h-5 ${
                            isCurrent ? "text-white" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-medium hidden sm:block ${
                        isCurrent
                          ? "text-primary-600 dark:text-primary-400"
                          : isCompleted
                          ? "text-accent-600 dark:text-accent-400"
                          : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                        i < step
                          ? "bg-accent-400"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card border border-gray-100 dark:border-slate-700 overflow-hidden">
            <AnimatePresence mode="wait">
              {/* Step 0: Age */}
              {step === 0 && (
                <motion.div
                  key="age"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 shadow-lg">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("age")}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    You must be 18 or older to vote in Indian elections.
                  </p>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={data.age}
                    onChange={(e) =>
                      setData((d) => ({ ...d, age: e.target.value }))
                    }
                    placeholder="Enter your age (e.g. 22)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm transition-all"
                  />
                  {data.age && parseInt(data.age) < 18 && (
                    <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-red-600 dark:text-red-400 text-xs">
                        You must be 18+ to vote. Continue to see what steps to take now.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 1: State */}
              {step === 1 && (
                <motion.div
                  key="state"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center mb-6 shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("state")}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Select your home state to get state-specific voter guidance.
                  </p>
                  <StateSelector
                    value={data.state}
                    onChange={(v) => setData((d) => ({ ...d, state: v }))}
                  />
                </motion.div>
              )}

              {/* Step 2: Voter ID */}
              {step === 2 && (
                <motion.div
                  key="voterid"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 shadow-lg">
                    <CreditCard className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("hasVoterId")}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    A Voter ID card (EPIC) is the primary document for voting. You
                    can also use alternative photo IDs.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {["yes", "no"].map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setData((d) => ({ ...d, hasVoterId: option }))
                        }
                        className={`py-5 rounded-2xl border-2 font-bold text-lg transition-all duration-200 ${
                          data.hasVoterId === option
                            ? option === "yes"
                              ? "border-accent-500 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400"
                              : "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                            : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                      >
                        {option === "yes" ? `✅ ${t("yes")}` : `❌ ${t("no")}`}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Checklist */}
              {step === 3 && (
                <motion.div
                  key="checklist"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mb-6 shadow-lg">
                    {isEligible ? (
                      <PartyPopper className="w-7 h-7 text-white" />
                    ) : (
                      <ListChecks className="w-7 h-7 text-white" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {t("yourChecklist")}
                  </h2>
                  {data.state && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Personalized for{" "}
                      <strong className="text-primary-600 dark:text-primary-400">
                        {data.state}
                      </strong>
                    </p>
                  )}
                  <div className="space-y-3">
                    {checklist.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-start gap-3 p-3 rounded-xl border ${
                          item.done
                            ? "bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800"
                            : "bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <span className="text-xl flex-shrink-0 mt-0.5">
                          {item.done ? "✅" : "📌"}
                        </span>
                        <p
                          className={`text-sm leading-relaxed ${
                            item.done
                              ? "text-accent-800 dark:text-accent-300 font-medium"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {item.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/chat"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all text-sm"
                    >
                      Ask VoteWise AI for more help →
                    </Link>
                    <button
                      onClick={() => {
                        setStep(0);
                        setData({ age: "", state: "", hasVoterId: "" });
                      }}
                      className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-medium text-sm hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {step < 3 && (
              <div className="px-8 pb-8 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t("back")}
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={next}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold px-6 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all text-sm shadow-lg active:scale-95"
                >
                  {step === 2 ? t("getChecklist") : t("next")}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Progress text */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
      </section>
    </div>
  );
}

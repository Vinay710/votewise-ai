"use client";

import Link from "next/link";
import { Vote, Code2, Share2, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "/", label: t("home") },
    { href: "/chat", label: t("chat") },
    { href: "/timeline", label: t("timeline") },
    { href: "/first-voter", label: t("firstVoter") },
  ];

  return (
    <footer className="bg-slate-950 text-gray-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">VoteWise AI</span>
            </Link>
            <p className="text-sm leading-relaxed">{t("footerDesc")}</p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white font-semibold mb-4">Important Note</h3>
            <p className="text-sm leading-relaxed bg-white/5 rounded-xl p-4 border border-white/10">
              {t("disclaimer")}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} VoteWise AI. Built for electoral
            awareness.
          </p>
          <p className="text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for
            democracy
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AboutSectionProps {
  profile: {
    name: string;
    bio: string;
    avatar?: string | null;
    github?: string | null;
    linkedin?: string | null;
    email: string;
  } | null;
}

const stats = [
  { label: "Years of Experience", value: "10+", icon: "⟨/⟩" },
  { label: "Projects Delivered", value: "50+", icon: "◈" },
  { label: "AI Models in Workflow", value: "4", icon: "◎" },
];

const stack = [
  { label: "Frontend", items: "React · Next.js · TypeScript" },
  { label: "Backend", items: "Java · Spring Boot · Node.js" },
  { label: "Mobile", items: "React Native · Expo" },
  { label: "AI Tools", items: "Claude · GPT-4 · Kimi · MiniMax" },
];

export default function AboutSection({ profile }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const name = profile?.name || "Andreas Billy Sutandi";
  const bio =
    profile?.bio ||
    "A passionate fullstack developer with deep expertise in building modern web and mobile applications.";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-0 ai-grid-bg opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase">
            — 01. About —
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The Developer Behind
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              the Machine
            </span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Left: Avatar + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Avatar card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-500/20 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-5 rounded-2xl border border-cyan-500/10 bg-[#060d1f] p-6">
                <div className="relative flex-shrink-0">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/20">
                    {initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#060d1f] bg-emerald-400 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white text-base leading-tight">{name}</p>
                  <p className="text-xs text-cyan-400/70 mt-0.5 font-mono">AI-Powered Dev</p>
                  <p className="text-xs text-slate-500 mt-1">Based in Indonesia</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="rounded-xl border border-cyan-500/10 bg-[#060d1f] p-4 text-center"
                >
                  <div className="font-mono text-lg text-cyan-400/50 mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {profile?.github && (
                <a
                  href={profile.github?.startsWith("http") ? profile.github : `https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-xs text-slate-400 transition-all hover:border-cyan-500/30 hover:text-cyan-400"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin?.startsWith("http") ? profile.linkedin : `https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-xs text-slate-400 transition-all hover:border-cyan-500/30 hover:text-cyan-400"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Bio + stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Bio — terminal style */}
            <div className="rounded-2xl border border-cyan-500/10 bg-[#060d1f] overflow-hidden">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/10 bg-cyan-500/5">
                <span className="h-3 w-3 rounded-full bg-rose-500/60" />
                <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="ml-3 font-mono text-xs text-slate-500">about.md</span>
              </div>
              <div className="p-6">
                <p className="text-slate-300 leading-relaxed text-base">{bio}</p>
              </div>
            </div>

            {/* Tech stack grid */}
            <div className="grid grid-cols-2 gap-3">
              {stack.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className={`rounded-xl border p-4 ${
                    item.label === "AI Tools"
                      ? "border-violet-500/20 bg-violet-500/5"
                      : "border-cyan-500/10 bg-[#060d1f]"
                  }`}
                >
                  <p className={`mb-1.5 text-xs font-semibold tracking-wider uppercase ${
                    item.label === "AI Tools" ? "text-violet-400" : "text-cyan-400/70"
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.items}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

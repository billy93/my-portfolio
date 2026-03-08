"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryConfig: Record<string, {
  label: string;
  accent: string;
  border: string;
  bg: string;
  bar: string;
  icon: string;
}> = {
  FRONTEND: {
    label: "Frontend",
    icon: "⟨/⟩",
    accent: "text-cyan-400",
    border: "border-cyan-500/15",
    bg: "bg-cyan-500/5",
    bar: "from-cyan-500 to-cyan-400",
  },
  BACKEND: {
    label: "Backend",
    icon: "⟦⟧",
    accent: "text-blue-400",
    border: "border-blue-500/15",
    bg: "bg-blue-500/5",
    bar: "from-blue-500 to-blue-400",
  },
  MOBILE: {
    label: "Mobile",
    icon: "◱",
    accent: "text-sky-400",
    border: "border-sky-500/15",
    bg: "bg-sky-500/5",
    bar: "from-sky-500 to-sky-400",
  },
  DEVOPS: {
    label: "DevOps",
    icon: "⚙",
    accent: "text-amber-400",
    border: "border-amber-500/15",
    bg: "bg-amber-500/5",
    bar: "from-amber-500 to-amber-400",
  },
  TOOLS: {
    label: "AI Tools",
    icon: "◎",
    accent: "text-violet-300",
    border: "border-violet-500/25",
    bg: "bg-violet-500/8",
    bar: "from-violet-500 to-fuchsia-400",
  },
};

const defaultSkills: Record<string, Skill[]> = {
  FRONTEND: [
    { id: "1", name: "React", category: "FRONTEND", proficiency: 90 },
    { id: "2", name: "Next.js", category: "FRONTEND", proficiency: 90 },
    { id: "3", name: "TypeScript", category: "FRONTEND", proficiency: 85 },
    { id: "4", name: "Tailwind CSS", category: "FRONTEND", proficiency: 85 },
  ],
  BACKEND: [
    { id: "5", name: "Java", category: "BACKEND", proficiency: 85 },
    { id: "6", name: "Spring Boot", category: "BACKEND", proficiency: 80 },
    { id: "7", name: "Node.js", category: "BACKEND", proficiency: 80 },
    { id: "8", name: "PostgreSQL", category: "BACKEND", proficiency: 75 },
  ],
  MOBILE: [
    { id: "9", name: "React Native", category: "MOBILE", proficiency: 85 },
  ],
  DEVOPS: [
    { id: "10", name: "Docker", category: "DEVOPS", proficiency: 70 },
    { id: "11", name: "Git", category: "DEVOPS", proficiency: 90 },
  ],
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const grouped =
    skills.length > 0
      ? skills.reduce<Record<string, Skill[]>>((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {})
      : defaultSkills;

  // Put TOOLS last so it can span full width or be highlighted
  const categoryOrder = ["FRONTEND", "BACKEND", "MOBILE", "DEVOPS", "TOOLS"];
  const orderedCategories = categoryOrder.filter((c) => grouped[c]);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 ai-grid-bg opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_70%)]" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase">
            — 02. Skills —
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Tech Stack &amp;
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              AI Toolkit
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orderedCategories.map((category, catIdx) => {
            const cfg = categoryConfig[category] || categoryConfig.TOOLS;
            const categorySkills = grouped[category];
            const isAI = category === "TOOLS";

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className={`relative rounded-2xl border ${cfg.border} ${cfg.bg} p-6 overflow-hidden ${
                  isAI ? "lg:col-span-1 ring-1 ring-violet-500/10" : ""
                }`}
              >
                {/* AI glow */}
                {isAI && (
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Category header */}
                <div className="mb-5 flex items-center gap-2.5">
                  <span className={`font-mono text-base ${cfg.accent}`}>{cfg.icon}</span>
                  <h3 className={`text-sm font-semibold tracking-wider uppercase ${cfg.accent}`}>
                    {cfg.label}
                  </h3>
                  {isAI && (
                    <span className="ml-auto rounded-full bg-violet-500/15 border border-violet-500/20 px-2 py-0.5 font-mono text-[10px] text-violet-300">
                      AI
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.1 + i * 0.06,
                      }}
                    >
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-200">
                          {skill.name}
                        </span>
                        <span className={`font-mono text-xs ${cfg.accent} opacity-70`}>
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${skill.proficiency}%` } : { width: 0 }
                          }
                          transition={{
                            duration: 1.2,
                            delay: catIdx * 0.1 + i * 0.06 + 0.3,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full bg-gradient-to-r ${cfg.bar}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

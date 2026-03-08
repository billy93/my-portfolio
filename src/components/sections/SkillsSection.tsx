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

const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  FRONTEND: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", glow: "shadow-cyan-500/5" },
  BACKEND: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", glow: "shadow-blue-500/5" },
  MOBILE: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", glow: "shadow-violet-500/5" },
  DEVOPS: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "shadow-amber-500/5" },
  TOOLS: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/5" },
};

const categoryLabels: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  MOBILE: "Mobile",
  DEVOPS: "DevOps",
  TOOLS: "Tools",
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const defaultSkills: Record<string, Skill[]> =
    skills.length > 0
      ? grouped
      : {
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

  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)]" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase">
            Skills
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Tech Stack
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(defaultSkills).map(([category, categorySkills], catIdx) => {
            const colors = categoryColors[category] || categoryColors.TOOLS;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className={`rounded-2xl border ${colors.border} bg-zinc-900/50 p-6 shadow-lg ${colors.glow} backdrop-blur-sm`}
              >
                <h3 className={`mb-5 text-sm font-semibold tracking-wider uppercase ${colors.text}`}>
                  {categoryLabels[category] || category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.1 + i * 0.05,
                      }}
                    >
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-300">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-zinc-600">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView
                              ? { width: `${skill.proficiency}%` }
                              : { width: 0 }
                          }
                          transition={{
                            duration: 1,
                            delay: catIdx * 0.1 + i * 0.05 + 0.3,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full ${colors.bg.replace("/10", "")} bg-gradient-to-r from-current to-current opacity-60`}
                          style={{
                            background: `linear-gradient(90deg, currentColor, currentColor)`,
                          }}
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

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="relative py-32">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_60%)]" />

      <div ref={ref} className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase">
            Experience
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent sm:left-1/2 sm:-translate-x-px" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative mb-12 flex items-start ${
                  isLeft
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                } flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:left-1/2">
                  <div className="h-3 w-3 rounded-full border-2 border-cyan-500 bg-zinc-950" />
                  {exp.current && (
                    <div className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-500 opacity-40" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`ml-10 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    isLeft ? "sm:pr-4 sm:text-right" : "sm:pl-4"
                  }`}
                >
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur-sm">
                    <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
                      <span>{formatDate(exp.startDate)}</span>
                      <span>-</span>
                      <span>
                        {exp.current
                          ? "Present"
                          : exp.endDate
                            ? formatDate(exp.endDate)
                            : ""}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-cyan-400">
                      {exp.company}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

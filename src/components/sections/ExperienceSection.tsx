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

function duration(start: string, end?: string | null, current?: boolean): string {
  const s = new Date(start);
  const e = current ? new Date() : end ? new Date(end) : new Date();
  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y}y`);
  if (m > 0) parts.push(`${m}m`);
  return parts.join(" ") || "< 1m";
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 ai-grid-bg opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.04),transparent_60%)]" />

      <div ref={ref} className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase">
            — 04. Experience —
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Where I&apos;ve
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Shipped Work
            </span>
          </h2>
        </motion.div>

        <div className="relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Timeline node */}
              <div className="absolute -left-8 top-5 flex items-center justify-center">
                <div className="relative">
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-cyan-500 bg-[#030712]" />
                  {exp.current && (
                    <div className="absolute inset-0 rounded-full bg-cyan-500/40 animate-ping" />
                  )}
                </div>
              </div>

              {/* Card */}
              <div className="group rounded-2xl border border-cyan-500/10 bg-[#060d1f] p-6 transition-all duration-300 hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5">
                {/* Top row */}
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white leading-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-cyan-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {exp.current && (
                      <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                    <span className="rounded-full border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1 font-mono text-[10px] text-zinc-500">
                      {duration(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                </div>

                {/* Date range */}
                <p className="mb-4 font-mono text-xs text-slate-500">
                  {formatDate(exp.startDate)}
                  <span className="mx-2 text-slate-700">—</span>
                  {exp.current ? (
                    <span className="text-emerald-500/70">Present</span>
                  ) : exp.endDate ? (
                    formatDate(exp.endDate)
                  ) : (
                    ""
                  )}
                </p>

                <p className="text-sm leading-relaxed text-slate-400">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

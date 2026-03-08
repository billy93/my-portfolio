"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "@/components/3d/TiltCard";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string | null;
  techStack: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-0 ai-grid-bg opacity-25" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase">
            — 03. Portfolio —
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Featured
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-md text-center"
          >
            <div className="rounded-2xl border border-cyan-500/10 bg-[#060d1f] p-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5">
                <svg className="h-7 w-7 text-cyan-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <p className="text-slate-400">Projects coming soon.</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <TiltCard className="group h-full">
                  <Link href={`/projects/${project.slug}`} className="block h-full">
                    <div className="relative h-full rounded-xl border border-cyan-500/10 bg-[#060d1f] transition-all duration-300 group-hover:border-cyan-500/25 group-hover:shadow-lg group-hover:shadow-cyan-500/5 overflow-hidden">

                      {/* Corner accent lines */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/30 rounded-tl-xl pointer-events-none" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30 rounded-tr-xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/10 rounded-bl-xl pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/10 rounded-br-xl pointer-events-none" />

                      {/* Thumbnail */}
                      <div className="relative h-44 overflow-hidden bg-[#030712]">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/5 to-violet-500/5">
                            {/* Circuit pattern placeholder */}
                            <div className="relative opacity-20">
                              <div className="text-5xl font-bold text-cyan-400/30 font-mono">
                                {project.title.charAt(0)}
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#060d1f] to-transparent" />

                        {project.featured && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            <span className="font-mono text-[10px] text-cyan-300">Featured</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-cyan-300">
                          {project.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-slate-500 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-cyan-500/10 bg-cyan-500/5 px-2 py-0.5 font-mono text-[10px] text-cyan-400/70"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="rounded border border-zinc-700/50 bg-zinc-800/50 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

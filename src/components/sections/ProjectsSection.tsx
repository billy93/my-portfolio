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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase">
            Portfolio
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Featured Projects
          </h2>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-md text-center"
          >
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                <svg className="h-8 w-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <p className="text-zinc-400">Projects coming soon.</p>
              <p className="mt-2 text-sm text-zinc-600">
                Add projects via the admin panel or OpenCode CLI.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TiltCard className="group h-full">
                  <Link href={`/projects/${project.slug}`} className="block h-full">
                    <div className="h-full rounded-xl border border-zinc-800 bg-zinc-900/80 transition-colors group-hover:border-cyan-500/30">
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden rounded-t-xl bg-zinc-800">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/10 to-violet-500/10">
                            <span className="text-4xl font-bold text-zinc-700">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        {project.featured && (
                          <div className="absolute top-3 right-3 rounded-full bg-cyan-500/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
                          {project.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-zinc-500">
                          {project.description}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-500">
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

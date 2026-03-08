"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-zinc-950" />,
});

interface HeroSectionProps {
  profile: {
    name: string;
    title: string;
    bio: string;
    github?: string | null;
    email: string;
  } | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.name || "Andreas Billy Sutandi";
  const title = profile?.title || "Fullstack Developer";
  const bio =
    profile?.bio ||
    "Building modern web & mobile experiences with cutting-edge technology.";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <HeroScene />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="mb-4 font-mono text-sm font-medium tracking-[0.3em] text-cyan-400 uppercase"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {name.split(" ").map((word, i) => (
              <span key={i}>
                {i === name.split(" ").length - 1 ? (
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mb-4 text-xl font-medium text-zinc-300 sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {title}
          </motion.p>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {bio}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-zinc-700 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-cyan-500/50 hover:text-cyan-400"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-zinc-700 p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-[#030712]" />,
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

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="cursor-blink inline-block w-[2px] h-[1em] bg-cyan-400 ml-0.5 align-middle" />
      )}
    </span>
  );
}

function DataStream({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none select-none"
      style={{ left: `${x}%` }}
      initial={{ y: "-10%", opacity: 0 }}
      animate={{ y: "110%", opacity: [0, 0.5, 0.5, 0] }}
      transition={{
        duration: 4 + Math.random() * 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8,
        ease: "linear",
      }}
    >
      <div className="font-mono text-[10px] text-cyan-500/40 leading-tight whitespace-nowrap rotate-0">
        {Array.from({ length: 20 }, () =>
          Math.random() > 0.5
            ? Math.floor(Math.random() * 2).toString()
            : String.fromCharCode(65 + Math.floor(Math.random() * 26))
        ).join("\n")}
      </div>
    </motion.div>
  );
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.name || "Andreas Billy Sutandi";
  const title = profile?.title || "AI-Powered Fullstack Developer";
  const bio =
    profile?.bio ||
    "Building modern web & mobile experiences with cutting-edge AI and technology.";

  const streams = [5, 12, 22, 35, 48, 60, 72, 85, 93];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden ai-grid-bg"
      style={{ background: "#030712" }}
    >
      {/* Deep radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(6,182,212,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_20%,rgba(139,92,246,0.06),transparent)]" />

      {/* Data streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {streams.map((x, i) => (
          <DataStream key={i} x={x} delay={i * 0.7} />
        ))}
      </div>

      <HeroScene />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* AI badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
            AI-Augmented Developer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="mb-5 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {name.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span
                key={i}
                className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </motion.h1>

        {/* Title — typewriter */}
        <motion.div
          className="mb-6 text-xl font-medium text-cyan-300/80 sm:text-2xl font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <span className="text-cyan-600/60 mr-2">&gt;</span>
          <TypewriterText text={title} delay={1000} />
        </motion.div>

        {/* Bio */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          {bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <a
            href="#contact"
            className="group rounded-full border border-cyan-500/20 bg-cyan-500/5 px-8 py-3.5 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* AI tools strip */}
        <motion.div
          className="mt-14 flex items-center justify-center gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <span className="font-mono text-xs text-slate-600 mr-2">
            AI stack:
          </span>
          {["Claude", "GPT-4", "Kimi", "MiniMax"].map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3 + i * 0.1 }}
              className="rounded-md border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 font-mono text-xs text-violet-300/70"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5 p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-cyan-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

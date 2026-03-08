"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ContactSectionProps {
  email: string;
}

export default function ContactSection({ email }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />

      <div ref={ref} className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase">
            Contact
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Get In Touch
          </h2>
          <p className="mt-4 text-zinc-500">
            Have a project in mind? Let&apos;s build something great together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid gap-12 lg:grid-cols-5"
        >
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <p className="mb-1 text-sm font-medium text-zinc-400">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-white transition-colors hover:text-cyan-400"
                >
                  {email}
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-zinc-400">Based in</p>
                <p className="text-white">Indonesia</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-zinc-400">
                  Availability
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-white">Open for opportunities</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-zinc-400">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-zinc-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-zinc-400">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 sm:w-auto"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                  ? "Message Sent!"
                  : "Send Message"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-400">
                Failed to send. Please try again or email me directly.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

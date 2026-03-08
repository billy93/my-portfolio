"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ContactSectionProps {
  email: string;
}

export default function ContactSection({ email }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-0 ai-grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-cyan-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase">
            — 05. Contact —
          </p>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let&apos;s Build
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
          <p className="mt-5 text-slate-500 max-w-md mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid gap-10 lg:grid-cols-5"
        >
          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              {
                label: "Email",
                value: email,
                href: `mailto:${email}`,
                mono: true,
              },
              {
                label: "Based in",
                value: "Indonesia",
                mono: false,
              },
              {
                label: "Status",
                value: "Open to opportunities",
                dot: true,
                mono: false,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl border border-cyan-500/10 bg-[#060d1f] p-4"
              >
                <p className="mb-1.5 font-mono text-[10px] tracking-wider text-cyan-400/50 uppercase">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className={`text-sm text-slate-300 hover:text-cyan-400 transition-colors ${item.mono ? "font-mono" : ""}`}
                  >
                    {item.value}
                  </a>
                ) : item.dot ? (
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-slate-300">{item.value}</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-300">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-mono text-xs text-cyan-400/50 tracking-wider uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="terminal-input w-full rounded-lg px-4 py-3 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs text-cyan-400/50 tracking-wider uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="terminal-input w-full rounded-lg px-4 py-3 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs text-cyan-400/50 tracking-wider uppercase">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="terminal-input w-full resize-none rounded-lg px-4 py-3 text-sm"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                      ? "Message Sent!"
                      : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {status === "error" && (
                <p className="text-sm text-rose-400 font-mono">
                  Failed. Try emailing directly.
                </p>
              )}
              {status === "sent" && (
                <p className="text-sm text-emerald-400 font-mono">
                  ✓ Message received!
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

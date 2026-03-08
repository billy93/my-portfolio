"use client";

import { useEffect, useState } from "react";

interface ProfileForm {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resume: string;
}

const emptyProfile: ProfileForm = {
  name: "",
  title: "",
  bio: "",
  avatar: "",
  email: "",
  github: "",
  linkedin: "",
  twitter: "",
  resume: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<ProfileForm>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setForm({
            name: data.name || "",
            title: data.title || "",
            bio: data.bio || "",
            avatar: data.avatar || "",
            email: data.email || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            twitter: data.twitter || "",
            resume: data.resume || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function updateField<K extends keyof ProfileForm>(
    key: K,
    value: ProfileForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Update your profile information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            Profile updated successfully!
          </div>
        )}

        {/* Personal Info */}
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                  placeholder="Andreas Billy Sutandi"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                  Title / Role
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                  placeholder="Fullstack Developer"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                Bio
              </label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                placeholder="Tell visitors about yourself..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                Avatar URL
              </label>
              <input
                type="url"
                value={form.avatar}
                onChange={(e) => updateField("avatar", e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Contact & Social Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                  GitHub
                </label>
                <input
                  type="url"
                  value={form.github}
                  onChange={(e) => updateField("github", e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                  Twitter
                </label>
                <input
                  type="url"
                  value={form.twitter}
                  onChange={(e) => updateField("twitter", e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                  Resume URL
                </label>
                <input
                  type="url"
                  value={form.resume}
                  onChange={(e) => updateField("resume", e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                  placeholder="https://example.com/resume.pdf"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

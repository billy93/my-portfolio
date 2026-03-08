"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface SkillForm {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  order: number;
}

const emptyForm: SkillForm = {
  name: "",
  category: "FRONTEND",
  proficiency: 80,
  icon: "",
  order: 0,
};

const categories = [
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "MOBILE", label: "Mobile" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "TOOLS", label: "Tools" },
];

export default function SkillFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== "new";

  const [form, setForm] = useState<SkillForm>(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/skills/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name || "",
            category: data.category || "FRONTEND",
            proficiency: data.proficiency ?? 80,
            icon: data.icon || "",
            order: data.order || 0,
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load");
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  function updateField<K extends keyof SkillForm>(
    key: K,
    value: SkillForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEdit ? `/api/skills/${id}` : "/api/skills";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/skills");
      router.refresh();
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
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {isEdit ? "Edit Skill" : "Add Skill"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="React"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Category *
          </label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Proficiency ({form.proficiency}%)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={form.proficiency}
            onChange={(e) =>
              updateField("proficiency", parseInt(e.target.value))
            }
            className="w-full accent-cyan-500"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-600">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Icon (optional)
          </label>
          <input
            type="text"
            value={form.icon}
            onChange={(e) => updateField("icon", e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="Icon name or URL"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Order
          </label>
          <input
            type="number"
            value={form.order}
            onChange={(e) =>
              updateField("order", parseInt(e.target.value) || 0)
            }
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Skill" : "Add Skill"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-zinc-700 px-6 py-2.5 text-sm text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

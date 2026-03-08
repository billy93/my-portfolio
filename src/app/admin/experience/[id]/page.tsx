"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface ExperienceForm {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  order: number;
}

const emptyForm: ExperienceForm = {
  company: "",
  role: "",
  description: "",
  startDate: "",
  endDate: "",
  current: false,
  order: 0,
};

export default function ExperienceFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== "new";

  const [form, setForm] = useState<ExperienceForm>(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/experience/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            company: data.company || "",
            role: data.role || "",
            description: data.description || "",
            startDate: data.startDate ? data.startDate.substring(0, 10) : "",
            endDate: data.endDate ? data.endDate.substring(0, 10) : "",
            current: data.current || false,
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

  function updateField<K extends keyof ExperienceForm>(
    key: K,
    value: ExperienceForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = {
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      };

      const url = isEdit ? `/api/experience/${id}` : "/api/experience";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/experience");
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
    <div className="mx-auto max-w-2xl">
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
          {isEdit ? "Edit Experience" : "Add Experience"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              Company *
            </label>
            <input
              type="text"
              required
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              Role *
            </label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Description
          </label>
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="Describe your role and achievements..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              Start Date *
            </label>
            <input
              type="date"
              required
              value={form.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              End Date
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
              disabled={form.current}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50 disabled:opacity-40 [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.current}
                onChange={(e) => {
                  updateField("current", e.target.checked);
                  if (e.target.checked) updateField("endDate", "");
                }}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 accent-cyan-500"
              />
              <span className="text-sm text-zinc-300">Currently working here</span>
            </label>
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
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : isEdit
              ? "Update Experience"
              : "Add Experience"}
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

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import slugify from "slugify";

interface ProjectForm {
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  order: number;
}

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  description: "",
  content: "",
  thumbnail: "",
  images: [],
  techStack: [],
  liveUrl: "",
  repoUrl: "",
  featured: false,
  order: 0,
};

export default function ProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== "new";

  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.title || "",
            slug: data.slug || "",
            description: data.description || "",
            content: data.content || "",
            thumbnail: data.thumbnail || "",
            images: data.images || [],
            techStack: data.techStack || [],
            liveUrl: data.liveUrl || "",
            repoUrl: data.repoUrl || "",
            featured: data.featured || false,
            order: data.order || 0,
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load project");
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  function updateField<K extends keyof ProjectForm>(
    key: K,
    value: ProjectForm[K]
  ) {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "title" && !isEdit) {
        updated.slug = slugify(value as string, { lower: true, strict: true });
      }
      return updated;
    });
  }

  function addTech() {
    const tech = techInput.trim();
    if (tech && !form.techStack.includes(tech)) {
      updateField("techStack", [...form.techStack, tech]);
    }
    setTechInput("");
  }

  function removeTech(tech: string) {
    updateField(
      "techStack",
      form.techStack.filter((t) => t !== tech)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEdit ? `/api/projects/${id}` : "/api/projects";
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

      router.push("/admin/projects");
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
          {isEdit ? "Edit Project" : "New Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Title *
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="My Awesome Project"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="my-awesome-project"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Description *
          </label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="Brief description of the project"
          />
        </div>

        {/* Content */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Content
          </label>
          <textarea
            rows={8}
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            placeholder="Detailed project description..."
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Tech Stack
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech();
                }
              }}
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
              placeholder="Add technology (press Enter)"
            />
            <button
              type="button"
              onClick={addTech}
              className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400"
            >
              Add
            </button>
          </div>
          {form.techStack.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-0.5 text-zinc-500 hover:text-red-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* URLs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              Live URL
            </label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => updateField("liveUrl", e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
              placeholder="https://myproject.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              Repository URL
            </label>
            <input
              type="url"
              value={form.repoUrl}
              onChange={(e) => updateField("repoUrl", e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
              placeholder="https://github.com/user/repo"
            />
          </div>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">
            Thumbnail URL
          </label>
          <input
            type="url"
            value={form.thumbnail}
            onChange={(e) => updateField("thumbnail", e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Featured + Order */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">
              Order
            </label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => updateField("order", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-cyan-500 accent-cyan-500"
              />
              <span className="text-sm text-zinc-300">Featured Project</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
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

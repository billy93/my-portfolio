"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  order: number;
}

const categoryLabels: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  MOBILE: "Mobile",
  DEVOPS: "DevOps",
  TOOLS: "Tools",
};

const categoryColors: Record<string, string> = {
  FRONTEND: "bg-cyan-500/10 text-cyan-400",
  BACKEND: "bg-violet-500/10 text-violet-400",
  MOBILE: "bg-emerald-500/10 text-emerald-400",
  DEVOPS: "bg-amber-500/10 text-amber-400",
  TOOLS: "bg-pink-500/10 text-pink-400",
};

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setSkills)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) setSkills((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-500" />
      </div>
    );
  }

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Skills
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your technical skills
          </p>
        </div>
        <Link
          href="/admin/skills/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 py-16 text-center">
          <p className="text-zinc-500">No skills added yet</p>
          <Link
            href="/admin/skills/new"
            className="mt-3 inline-block text-sm text-cyan-400 hover:underline"
          >
            Add your first skill
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                {categoryLabels[category] || category}
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          categoryColors[skill.category] || "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {skill.proficiency}%
                      </span>
                      <span className="text-sm font-medium text-white">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/skills/${skill.id}`}
                        className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        disabled={deleting === skill.id}
                        className="rounded p-1 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [projectCount, skillCount, experienceCount, messageCount] =
      await Promise.all([
        prisma.project.count(),
        prisma.skill.count(),
        prisma.experience.count(),
        prisma.contactMessage.count({ where: { read: false } }),
      ]);
    return { projectCount, skillCount, experienceCount, messageCount };
  } catch {
    return {
      projectCount: 0,
      skillCount: 0,
      experienceCount: 0,
      messageCount: 0,
    };
  }
}

const statCards = [
  {
    name: "Projects",
    href: "/admin/projects",
    color: "from-cyan-500 to-blue-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    name: "Skills",
    href: "/admin/skills",
    color: "from-violet-500 to-purple-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    name: "Experience",
    href: "/admin/experience",
    color: "from-emerald-500 to-teal-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    name: "Unread Messages",
    href: "/admin",
    color: "from-amber-500 to-orange-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default async function AdminDashboard() {
  const stats = await getStats();
  const counts = [
    stats.projectCount,
    stats.skillCount,
    stats.experienceCount,
    stats.messageCount,
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Overview of your portfolio content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Link
            key={card.name}
            href={card.href}
            className="group rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} text-white`}
              >
                {card.icon}
              </div>
              <span className="text-3xl font-bold text-white">
                {counts[i]}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-zinc-400">
              {card.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/projects?action=new"
            className="flex items-center gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-4 text-sm text-zinc-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Project
          </Link>
          <Link
            href="/admin/experience?action=new"
            className="flex items-center gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-4 text-sm text-zinc-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Experience
          </Link>
          <Link
            href="/admin/skills?action=new"
            className="flex items-center gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-4 text-sm text-zinc-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Skill
          </Link>
        </div>
      </div>
    </div>
  );
}

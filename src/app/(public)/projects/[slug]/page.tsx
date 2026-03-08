import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} | Andreas Billy Sutandi`,
      description: project.description,
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  let project;
  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch {
    notFound();
  }

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-cyan-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-6 py-16">
        {/* Project Header */}
        <div className="mb-12">
          {project.featured && (
            <span className="mb-4 inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              Featured Project
            </span>
          )}
          <h1
            className="mb-4 text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.title}
          </h1>
          <p className="mb-6 text-lg text-zinc-400">{project.description}</p>

          {/* Tech Stack */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-zinc-800">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full"
            />
          </div>
        )}

        {/* Content */}
        {project.content && (
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-a:text-cyan-400">
            {project.content.split("\n").map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Gallery */}
        {project.images.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.map((image: string, i: number) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-zinc-800"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

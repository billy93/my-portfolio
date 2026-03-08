import { tool } from "@opencode-ai/plugin";

const getBase = (context: { worktree: string }) => {
  // Try PORTFOLIO_URL env var, fall back to localhost
  return process.env.PORTFOLIO_URL || "http://localhost:3000";
};

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.PORTFOLIO_API_KEY}`,
});

export const list = tool({
  description: "List all portfolio projects",
  args: {},
  async execute(_args, context) {
    const res = await fetch(`${getBase(context)}/api/projects`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const create = tool({
  description: "Create a new portfolio project",
  args: {
    title: tool.schema.string().describe("Project title"),
    description: tool.schema.string().describe("Short project description"),
    techStack: tool.schema
      .string()
      .optional()
      .describe("Comma-separated list of technologies, e.g. 'Next.js,TypeScript,PostgreSQL'"),
    liveUrl: tool.schema.string().optional().describe("Live demo URL"),
    repoUrl: tool.schema.string().optional().describe("GitHub/source repo URL"),
    featured: tool.schema.boolean().optional().describe("Mark as featured project"),
    content: tool.schema.string().optional().describe("Long-form project content/markdown"),
  },
  async execute(args, context) {
    const body = {
      title: args.title,
      description: args.description,
      techStack: args.techStack ? args.techStack.split(",").map((s) => s.trim()) : [],
      liveUrl: args.liveUrl || "",
      repoUrl: args.repoUrl || "",
      featured: args.featured ?? false,
      content: args.content || "",
    };
    const res = await fetch(`${getBase(context)}/api/projects`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const update = tool({
  description: "Update an existing portfolio project by ID",
  args: {
    id: tool.schema.string().describe("Project ID"),
    title: tool.schema.string().optional().describe("New title"),
    description: tool.schema.string().optional().describe("New description"),
    techStack: tool.schema.string().optional().describe("Comma-separated tech stack"),
    liveUrl: tool.schema.string().optional().describe("Live demo URL"),
    repoUrl: tool.schema.string().optional().describe("Repo URL"),
    featured: tool.schema.boolean().optional().describe("Featured flag"),
    content: tool.schema.string().optional().describe("Long-form content"),
  },
  async execute(args, context) {
    const { id, techStack, ...rest } = args;
    const body: Record<string, unknown> = { ...rest };
    if (techStack) body.techStack = techStack.split(",").map((s) => s.trim());
    const res = await fetch(`${getBase(context)}/api/projects/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const remove = tool({
  description: "Delete a portfolio project by ID",
  args: {
    id: tool.schema.string().describe("Project ID to delete"),
  },
  async execute(args, context) {
    const res = await fetch(`${getBase(context)}/api/projects/${args.id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

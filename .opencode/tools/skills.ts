import { tool } from "@opencode-ai/plugin";

const getBase = (context: { worktree: string }) =>
  process.env.PORTFOLIO_URL || "http://localhost:3000";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.PORTFOLIO_API_KEY}`,
});

export const list = tool({
  description: "List all skills in the portfolio",
  args: {},
  async execute(_args, context) {
    const res = await fetch(`${getBase(context)}/api/skills`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const create = tool({
  description: "Add a new skill to the portfolio",
  args: {
    name: tool.schema.string().describe("Skill name, e.g. 'React'"),
    category: tool.schema
      .enum(["FRONTEND", "BACKEND", "MOBILE", "DEVOPS", "TOOLS"])
      .describe("Skill category"),
    proficiency: tool.schema
      .number()
      .min(1)
      .max(100)
      .optional()
      .describe("Proficiency percentage 1-100 (default 80)"),
    icon: tool.schema.string().optional().describe("Icon name or URL"),
    order: tool.schema.number().optional().describe("Display order"),
  },
  async execute(args, context) {
    const body = {
      name: args.name,
      category: args.category,
      proficiency: args.proficiency ?? 80,
      icon: args.icon || "",
      order: args.order ?? 0,
    };
    const res = await fetch(`${getBase(context)}/api/skills`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const remove = tool({
  description: "Delete a skill by ID",
  args: {
    id: tool.schema.string().describe("Skill ID to delete"),
  },
  async execute(args, context) {
    const res = await fetch(`${getBase(context)}/api/skills/${args.id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

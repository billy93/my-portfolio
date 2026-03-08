import { tool } from "@opencode-ai/plugin";

const getBase = (context: { worktree: string }) =>
  process.env.PORTFOLIO_URL || "http://localhost:3000";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.PORTFOLIO_API_KEY}`,
});

export const list = tool({
  description: "List all work experience entries in the portfolio",
  args: {},
  async execute(_args, context) {
    const res = await fetch(`${getBase(context)}/api/experience`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const create = tool({
  description: "Add a new work experience entry to the portfolio",
  args: {
    company: tool.schema.string().describe("Company name"),
    role: tool.schema.string().describe("Job title/role"),
    description: tool.schema.string().describe("Description of responsibilities and achievements"),
    startDate: tool.schema.string().describe("Start date in YYYY-MM-DD format"),
    endDate: tool.schema
      .string()
      .optional()
      .describe("End date in YYYY-MM-DD format (omit if current)"),
    current: tool.schema.boolean().optional().describe("Is this the current job? (default false)"),
  },
  async execute(args, context) {
    const body = {
      company: args.company,
      role: args.role,
      description: args.description,
      startDate: args.startDate,
      endDate: args.endDate || null,
      current: args.current ?? false,
    };
    const res = await fetch(`${getBase(context)}/api/experience`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const remove = tool({
  description: "Delete a work experience entry by ID",
  args: {
    id: tool.schema.string().describe("Experience ID to delete"),
  },
  async execute(args, context) {
    const res = await fetch(`${getBase(context)}/api/experience/${args.id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

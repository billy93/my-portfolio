import { tool } from "@opencode-ai/plugin";

const getBase = (context: { worktree: string }) =>
  process.env.PORTFOLIO_URL || "http://localhost:3000";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.PORTFOLIO_API_KEY}`,
});

export const get = tool({
  description: "Get the current portfolio profile (name, title, bio, social links)",
  args: {},
  async execute(_args, context) {
    const res = await fetch(`${getBase(context)}/api/profile`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

export const update = tool({
  description: "Update the portfolio profile",
  args: {
    name: tool.schema.string().optional().describe("Full name"),
    title: tool.schema.string().optional().describe("Job title/tagline"),
    bio: tool.schema.string().optional().describe("Biography / about text"),
    email: tool.schema.string().optional().describe("Contact email"),
    github: tool.schema.string().optional().describe("GitHub profile URL"),
    linkedin: tool.schema.string().optional().describe("LinkedIn profile URL"),
    twitter: tool.schema.string().optional().describe("Twitter/X profile URL"),
    avatar: tool.schema.string().optional().describe("Avatar image URL"),
    resume: tool.schema.string().optional().describe("Resume/CV download URL"),
  },
  async execute(args, context) {
    const res = await fetch(`${getBase(context)}/api/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(args),
    });
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
});

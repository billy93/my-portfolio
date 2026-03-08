import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function apiAuth(req: NextRequest) {
  // Check API key first (for OpenCode tools / external access)
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const apiKey = authHeader.substring(7);
    if (apiKey === process.env.PORTFOLIO_API_KEY) {
      return { authenticated: true, method: "api_key" as const };
    }
  }

  // Fallback to session auth (for admin panel)
  const session = await auth();
  if (session?.user) {
    return { authenticated: true, method: "session" as const, user: session.user };
  }

  return { authenticated: false, method: null };
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

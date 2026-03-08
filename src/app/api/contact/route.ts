import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return badRequest("Name, email, and message are required");
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message", details: String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { apiAuth, unauthorized } = await import("@/lib/api-auth");
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages", details: String(error) }, { status: 500 });
  }
}

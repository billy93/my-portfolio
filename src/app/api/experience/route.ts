import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences", details: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const body = await req.json();
    const { company, role, description, startDate, endDate, current, order } = body;

    if (!company || !role || !description || !startDate) {
      return badRequest("Company, role, description, and startDate are required");
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        role,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        order: order || 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience", details: String(error) }, { status: 500 });
  }
}

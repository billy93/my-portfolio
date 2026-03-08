import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills", details: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const body = await req.json();
    const { name, category, icon, proficiency, order } = body;

    if (!name || !category) {
      return badRequest("Name and category are required");
    }

    const validCategories = ["FRONTEND", "BACKEND", "MOBILE", "DEVOPS", "TOOLS"];
    if (!validCategories.includes(category)) {
      return badRequest(`Category must be one of: ${validCategories.join(", ")}`);
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        icon: icon || null,
        proficiency: proficiency || 80,
        order: order || 0,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill", details: String(error) }, { status: 500 });
  }
}

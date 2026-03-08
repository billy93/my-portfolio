import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skill", details: String(error) }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, category, icon, proficiency, order } = body;

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (icon !== undefined) updateData.icon = icon;
    if (proficiency !== undefined) updateData.proficiency = proficiency;
    if (order !== undefined) updateData.order = order;

    if (Object.keys(updateData).length === 0) {
      return badRequest("No fields to update");
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill", details: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const { id } = await params;
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ message: "Skill deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill", details: String(error) }, { status: 500 });
  }
}

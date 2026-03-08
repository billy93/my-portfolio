import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience", details: String(error) }, { status: 500 });
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
    const { company, role, description, startDate, endDate, current, order } = body;

    const updateData: Record<string, unknown> = {};
    if (company !== undefined) updateData.company = company;
    if (role !== undefined) updateData.role = role;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;
    if (current !== undefined) updateData.current = current;
    if (order !== undefined) updateData.order = order;

    if (Object.keys(updateData).length === 0) {
      return badRequest("No fields to update");
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience", details: String(error) }, { status: 500 });
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
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ message: "Experience deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience", details: String(error) }, { status: 500 });
  }
}

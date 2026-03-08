import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";
import slugify from "slugify";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project", details: String(error) }, { status: 500 });
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
    const { title, description, content, thumbnail, images, techStack, liveUrl, repoUrl, featured, order } = body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = slugify(title, { lower: true, strict: true });
    }
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (images !== undefined) updateData.images = images;
    if (techStack !== undefined) updateData.techStack = techStack;
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl;
    if (repoUrl !== undefined) updateData.repoUrl = repoUrl;
    if (featured !== undefined) updateData.featured = featured;
    if (order !== undefined) updateData.order = order;

    if (Object.keys(updateData).length === 0) {
      return badRequest("No fields to update");
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project", details: String(error) }, { status: 500 });
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
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project", details: String(error) }, { status: 500 });
  }
}

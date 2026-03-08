import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";
import slugify from "slugify";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects", details: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const body = await req.json();
    const { title, description, content, thumbnail, images, techStack, liveUrl, repoUrl, featured, order } = body;

    if (!title || !description) {
      return badRequest("Title and description are required");
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Check for duplicate slug
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return badRequest("A project with a similar title already exists");
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        content: content || null,
        thumbnail: thumbnail || null,
        images: images || [],
        techStack: techStack || [],
        liveUrl: liveUrl || null,
        repoUrl: repoUrl || null,
        featured: featured || false,
        order: order || 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project", details: String(error) }, { status: 500 });
  }
}

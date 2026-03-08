import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth, unauthorized, badRequest } from "@/lib/api-auth";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile", details: String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authResult = await apiAuth(req);
  if (!authResult.authenticated) return unauthorized();

  try {
    const body = await req.json();
    const { name, title, bio, avatar, email, github, linkedin, twitter, resume } = body;

    if (!name && !title && !bio && !email) {
      return badRequest("At least one field is required");
    }

    // Upsert - create if not exists, update if exists
    let profile = await prisma.profile.findFirst();

    if (profile) {
      const updateData: Record<string, unknown> = {};
      if (name !== undefined) updateData.name = name;
      if (title !== undefined) updateData.title = title;
      if (bio !== undefined) updateData.bio = bio;
      if (avatar !== undefined) updateData.avatar = avatar;
      if (email !== undefined) updateData.email = email;
      if (github !== undefined) updateData.github = github;
      if (linkedin !== undefined) updateData.linkedin = linkedin;
      if (twitter !== undefined) updateData.twitter = twitter;
      if (resume !== undefined) updateData.resume = resume;

      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: updateData,
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          name: name || "Andreas Billy Sutandi",
          title: title || "Fullstack Developer",
          bio: bio || "",
          email: email || "billyfebram@gmail.com",
          github: github || "billy93",
          linkedin: linkedin || null,
          twitter: twitter || null,
          avatar: avatar || null,
          resume: resume || null,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile", details: String(error) }, { status: 500 });
  }
}

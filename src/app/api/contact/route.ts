import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest } from "@/lib/api-auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const portfolioEmail = "billyfebram@gmail.com";
    const subject = `Portfolio Contact: ${name}`;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: portfolioEmail,
        replyTo: email,
        subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #06b6d4; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
              New Contact Message
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #06b6d4;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message:</td>
                <td style="padding: 12px 0; color: #374151; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
              Sent from your portfolio website · <a href="https://www.andreasbilly.com" style="color: #06b6d4;">andreasbilly.com</a>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
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

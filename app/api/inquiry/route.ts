import { NextResponse } from "next/server";
import { site, whatsappUrl } from "@/lib/site";

type InquiryBody = {
  name?: string;
  company?: string;
  country?: string;
  email?: string;
  phone?: string;
  product?: string;
  message?: string;
  locale?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryBody;
  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const message = body.message?.trim() || "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const text = [
    "New export inquiry — Eksporin Coco",
    `Name: ${name}`,
    `Company: ${body.company || "-"}`,
    `Country: ${body.country || "-"}`,
    `Email: ${email}`,
    `Phone: ${body.phone || "-"}`,
    `Product: ${body.product || "-"}`,
    `Message: ${message}`,
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (key) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM || "Eksporin Coco <onboarding@resend.dev>",
        to: [process.env.INQUIRY_TO || site.email],
        subject: `Inquiry from ${name}${body.product ? ` — ${body.product}` : ""}`,
        text,
      }),
    });
  }

  return NextResponse.json({
    ok: true,
    whatsappUrl: whatsappUrl(text),
  });
}

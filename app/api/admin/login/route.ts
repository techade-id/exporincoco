import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionCookieOptions, verifyPassword, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { user?: string; password?: string };
  if (!verifyPassword(body.user?.trim() || "", body.password || "")) {
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());
  return response;
}

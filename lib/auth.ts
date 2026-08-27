import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "eksporin_admin";
const WEEK = 60 * 60 * 24 * 7;

export function adminCredentials() {
  const user = process.env.ADMIN_USER?.trim() || "admin";
  const password = process.env.ADMIN_PASSWORD?.trim() || (process.env.VERCEL ? "" : "eksporinaja");
  return { user, password };
}

function secret() {
  return process.env.ADMIN_SECRET?.trim() || adminCredentials().password || "eksporin-dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const exp = Date.now() + WEEK * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function sessionValid(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(sign(payload), signature)) return false;
  return Number(payload) > Date.now();
}

export function verifyPassword(user: string, password: string) {
  const creds = adminCredentials();
  if (!creds.password) return false;
  return safeEqual(user, creds.user) && safeEqual(password, creds.password);
}

export async function isLoggedIn() {
  const store = await cookies();
  return sessionValid(store.get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  };
}

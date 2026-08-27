"use client";

import { useState, type FormEvent } from "react";

export function LoginForm({ configured }: { configured: boolean }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSending(true);
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: data.get("user"),
        password: data.get("password"),
      }),
    });
    setSending(false);
    if (!response.ok) {
      setError("Wrong username or password.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="mx-auto flex min-h-full max-w-sm flex-col justify-center px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">Editorial</p>
      <h1 className="mt-2 text-2xl font-semibold">Sign in to edit the site</h1>
      {!configured ? (
        <p className="mt-4 text-sm text-red-300">
          Set ADMIN_USER and ADMIN_PASSWORD in the host environment before using this page.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input
            name="user"
            defaultValue="admin"
            placeholder="Username"
            className="w-full rounded-md border border-white/15 bg-white px-3 py-2.5 text-sm text-neutral-900"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-md border border-white/15 bg-white px-3 py-2.5 text-sm text-neutral-900"
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-md bg-orange px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
          >
            {sending ? "Signing in…" : "Sign in"}
          </button>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
        </form>
      )}
    </div>
  );
}

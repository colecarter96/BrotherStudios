"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MediaKitLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/mediakit";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/mediakit/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Unable to sign in.");
        return;
      }

      router.replace(from.startsWith("/mediakit") ? from : "/mediakit");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f4f2] text-black flex flex-col px-6">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Bryce & Cole Carter&apos;s Media Kit</h1>
          <p className="mt-2 text-sm text-black/60">Enter the password to view kit and audience metrics.</p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="mediakit-password" className="sr-only">
                Password
              </label>
              <input
                id="mediakit-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white border border-black/10 text-sm md:text-base outline-none focus:border-black/30"
                required
              />
            </div>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 bg-black text-white font-semibold text-sm rounded-sm md:text-base disabled:opacity-60"
            >
              {loading ? "Checking…" : "View media kit"}
            </button>
          </form>
        </div>
      </div>
      <p className="pb-8 text-center text-sm text-black/60">We&apos;re excited to work with you!</p>
    </main>
  );
}

"use client";

import { useRef, useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: honeypotRef.current?.value ?? "",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list!");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold mb-3">(NEWSLETTER)</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 max-w-xs">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email for newsletter
        </label>
        <div className="flex gap-2">
          <input
            id="footer-newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="min-w-0 flex-1 border-b-2 bg-white px-3 py-2 text-sm font-medium placeholder:opacity-40 focus:outline-none focus:border-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 border-2 border-black px-4 py-2 text-sm font-semibold tracking-tight text-white bg-black"
          >
            {status === "loading" ? "…" : "JOIN"}
          </button>
        </div>
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />
      </form>
      {message ? (
        <p
          className={`mt-2 text-xs font-medium ${status === "error" ? "text-red-700" : "opacity-70"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

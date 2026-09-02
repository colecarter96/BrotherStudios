"use client";

import { useState } from "react";

type Props = {
  email: string;
};

export default function CopyEmailButton({ email }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-label={copied ? "Email copied" : "Copy email address"}
      title={copied ? "Copied!" : "Copy email"}
      className="mt-2 block text-left px-0 py-0 pl-1 bg-transparent text-black font-semibold text-sm md:text-base underline underline-offset-4 hover:no-underline"
    >
      {copied ? "✓" : "copy email"}
    </button>
  );
}

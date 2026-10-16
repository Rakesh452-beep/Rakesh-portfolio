"use client";

import { useState } from "react";

export default function CopyEmail({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="micro border border-ink px-4 py-3 text-ink transition-colors hover:border-terra hover:bg-terra hover:text-paper"
    >
      {copied ? "Copied ✓" : "Copy address"}
    </button>
  );
}

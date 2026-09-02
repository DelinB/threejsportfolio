"use client";

import { useEffect } from "react";

/**
 * Route error boundary — no stack traces or internal details are
 * exposed; the error digest is logged for diagnostics only.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main
      id="top"
      tabIndex={-1}
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-[6vw] text-center bg-paper"
    >
      <p className="font-mono font-bold text-[11px] tracking-[.16em] uppercase">
        ( 500 ) — SOMETHING BROKE
      </p>
      <h1 className="font-bricolage font-extrabold uppercase text-[clamp(2.4rem,8vw,5rem)] leading-[.95] -tracking-[.03em]">
        Well, this is <em className="font-serif italic font-normal normal-case tracking-normal text-accent">awkward.</em>
      </h1>
      <p className="font-serif italic font-normal text-[1.15rem] leading-[1.5] max-w-[46ch] opacity-90">
        A component threw a tantrum. No internals were harmed — try again, and if it keeps happening,
        the email on the contact section still works.
      </p>
      <button
        type="button"
        onClick={reset}
        className="font-mono font-bold text-[11px] tracking-[.14em] uppercase border-2 border-ink rounded-full px-[1.6em] py-[.8em] transition-colors duration-250 hover:bg-accent hover:border-accent hover:text-paper"
      >
        Try again
      </button>
    </main>
  );
}

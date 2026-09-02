"use client";

import { useRef } from "react";
import { OWNER } from "@/lib/site";
import { showToast } from "@/components/effects/toast";
import { CopyIcon } from "@/components/ui/icons";

const TOASTS = [
  "COPIED. I REPLY FASTER THAN THIS SITE LOADS.",
  "STILL ON YOUR CLIPBOARD. NO PRESSURE.",
  "THREE TIMES? FLATTERED. NOW ACTUALLY EMAIL ME.",
];

/**
 * Copy-email button — ported from the original (Clipboard API with
 * execCommand fallback, escalating toast messages). The accessible
 * name announces the copy action, not just the address.
 */
export function EmailButton() {
  const copies = useRef(0);

  async function copyEmail() {
    const em = OWNER.email;
    try {
      await navigator.clipboard.writeText(em);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = em;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    copies.current += 1;
    showToast(TOASTS[Math.min(copies.current - 1, 2)]);
  }

  return (
    <button
      type="button"
      className="email-btn inline-flex items-center gap-[.7rem] mt-[2.6rem] font-mono font-bold text-[clamp(1.15rem,3vw,2.1rem)] -tracking-[.02em] border-b-[3px] border-paper pb-[.25em] text-paper transition-colors duration-250 hover:bg-paper hover:text-accent rv"
      style={{ "--d": ".24s" } as React.CSSProperties}
      aria-label={`Copy email address ${OWNER.email}`}
      onClick={copyEmail}
    >
      {OWNER.email}
      <CopyIcon className="w-[.85em] h-[.85em]" />
    </button>
  );
}

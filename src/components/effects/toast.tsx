"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Toast host — ported from the original `#toast` element
 * (role="status" / aria-live="polite", 2.6s auto-dismiss).
 *
 * Decoupled from callers via a tiny custom event so the email-copy
 * button, the easter egg and any future feature can raise a toast
 * without prop drilling:  showToast("MESSAGE")
 */
export function showToast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>("show-toast", { detail: message }));
}

export function ToastHost() {
  const elRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const el = elRef.current;
    if (!el) return;

    const onToast = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      setMessage(msg);
      el.classList.add("show");
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("show"), 2600);
    };

    window.addEventListener("show-toast", onToast);
    return () => {
      window.removeEventListener("show-toast", onToast);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="toast"
      ref={elRef}
      role="status"
      aria-live="polite"
      className="font-mono font-bold text-[11.5px] tracking-[.1em] uppercase"
    >
      {message}
    </div>
  );
}

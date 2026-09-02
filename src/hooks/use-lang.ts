"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * Subscribes a Client Component to language changes dispatched by
 * the header's language switcher (custom `langchange` event).
 * Initial render is English, which matches the server-rendered
 * markup — no hydration mismatch.
 */
export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<Lang>).detail;
      if (detail === "en" || detail === "ar") setLang(detail);
    };
    window.addEventListener("langchange", onChange);
    return () => window.removeEventListener("langchange", onChange);
  }, []);

  return lang;
}

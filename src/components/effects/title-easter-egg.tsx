"use client";

import { useEffect } from "react";

/**
 * Tab-title easter egg — ported from the original visibilitychange
 * handler ("WAIT — COME BACK, I HAVE JOKES").
 *
 * Reads `document.visibilityState` (the spec's source of truth)
 * instead of the derived `document.hidden`: in some embedded/CDP
 * contexts `hidden` can lag behind the dispatched event, leaving the
 * joke title stuck after the page becomes visible again.
 */
export function TitleEasterEgg() {
  useEffect(() => {
    const baseTitle = document.title;
    function onVisibility() {
      document.title =
        document.visibilityState === "hidden" ? "WAIT — COME BACK, I HAVE JOKES" : baseTitle;
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = baseTitle;
    };
  }, []);

  return null;
}

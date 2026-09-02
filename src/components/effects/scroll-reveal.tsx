"use client";

import { useEffect } from "react";

/**
 * Scroll reveals — one IntersectionObserver for the entire page
 * (the original observed every `.rv` element the same way).
 * `[data-hero]` elements are excluded: the loader orchestrates
 * those with a stagger. No scroll handlers are attached.
 */
export function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".rv:not([data-hero])");
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("on"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

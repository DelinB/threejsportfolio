"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor dot — ported from the original (difference blend,
 * lerped follow, scale-up over interactive elements, hidden on
 * coarse pointers and when the pointer leaves the document).
 *
 * The rAF loop only spins on fine-pointer devices; on touch the
 * component is inert (the CSS also hides it via `hover: none`).
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur) return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let vis = false;
    let cx = mx;
    let cy = my;
    let cs = 1;
    let cts = 1;
    let rafId = 0;

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      vis = true;
    }
    function onMouseLeave() {
      vis = false;
    }
    function onMouseOver(e: MouseEvent) {
      cts = (e.target as Element | null)?.closest?.(
        "a, button, input, .work-row, .clip, .svc-head",
      )
        ? 2.3
        : 1;
    }

    const loop = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      cs += (cts - cs) * 0.15;
      cur.style.transform =
        "translate(" + cx + "px," + cy + "px) translate(-50%,-50%) scale(" + cs + ")";
      cur.classList.toggle("vis", vis);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return <div id="cursor" ref={cursorRef} aria-hidden="true" />;
}

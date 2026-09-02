"use client";

import { useEffect, useRef } from "react";
import { StarIcon } from "@/components/ui/icons";

const LINES = [
  "warming up the components",
  "aligning things to nothing in particular",
  "hiding the 2005 hit counter",
  "negotiating with the grid",
  "ok. it is just a website. go.",
];
const TH = [0, 26, 54, 80, 97];

/**
 * Intro loader — ported from the original (same lines, thresholds,
 * randomized progress cadence, click-to-skip, slide-away).
 *
 * Accessibility improvement over the original: while the loader is
 * visible the <main> region gets `inert` and the body scroll lock,
 * so keyboard focus can never land on content hidden behind the
 * overlay. Reduced-motion users skip the loader entirely.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = rootRef.current;
    const lPct = pctRef.current;
    const lLine = lineRef.current;
    const lBar = barRef.current;
    if (!loader || !lPct || !lLine || !lBar) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const main = document.getElementById("top");
    let prog = 0;
    let li = 0;
    let done = false;
    let iv: ReturnType<typeof setInterval> | undefined;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const updLine = () => {
      while (li < TH.length - 1 && prog >= TH[li + 1]) li++;
      lLine.textContent = LINES[li];
    };

    const heroIn = () => {
      document.querySelectorAll("[data-hero]").forEach((el, i) => {
        timeouts.push(setTimeout(() => el.classList.add("on"), 380 + i * 95));
      });
    };

    const releasePage = () => {
      loader.classList.add("done");
      document.body.classList.remove("lock");
      main?.removeAttribute("inert");
    };

    const finish = () => {
      if (done) return;
      done = true;
      lPct.textContent = "100%";
      lBar.style.transform = "scaleX(1)";
      lLine.textContent = LINES[LINES.length - 1];
      timeouts.push(
        setTimeout(() => {
          releasePage();
          heroIn();
        }, 300),
      );
    };

    /* Lock the page while the overlay is visible. */
    document.body.classList.add("lock");
    main?.setAttribute("inert", "");

    const skip = () => {
      if (iv) clearInterval(iv);
      finish();
    };

    if (reduced) {
      releasePage();
      document.querySelectorAll("[data-hero]").forEach((el) => el.classList.add("on"));
    } else {
      updLine();
      iv = setInterval(() => {
        prog = Math.min(100, prog + Math.random() * 7 + 2.5);
        lPct.textContent = Math.floor(prog) + "%";
        lBar.style.transform = "scaleX(" + prog / 100 + ")";
        updLine();
        if (prog >= 100) {
          if (iv) clearInterval(iv);
          timeouts.push(setTimeout(finish, 320));
        }
      }, 70);
      loader.addEventListener("click", skip);
    }

    return () => {
      if (iv) clearInterval(iv);
      timeouts.forEach(clearTimeout);
      loader.removeEventListener("click", skip);
      document.body.classList.remove("lock");
      main?.removeAttribute("inert");
    };
  }, []);

  return (
    <div className="loader" id="loader" ref={rootRef} aria-hidden="true">
      <div className="loader-inner h-full flex flex-col justify-center items-center gap-5 transition-opacity duration-300">
        <StarIcon className="loader-star w-[38px] h-[38px] text-accent animate-spin" />
        <div
          className="loader-line font-mono font-bold text-[11px] tracking-[.18em] uppercase min-h-[1.2em]"
          ref={lineRef}
        >
          warming up the components
        </div>
        <div
          className="loader-pct font-bricolage font-extrabold text-[clamp(4rem,14vw,10rem)] leading-none -tracking-[.04em] tabular-nums"
          ref={pctRef}
        >
          0%
        </div>
      </div>
      <span className="loader-skip absolute bottom-[26px] right-[30px] font-mono font-bold text-[10px] tracking-[.16em] opacity-60">
        CLICK TO SKIP THE DRAMA
      </span>
      <div className="loader-bar absolute bottom-0 left-0 w-full h-[6px]">
        <i ref={barRef} className="block h-full origin-left" />
      </div>
    </div>
  );
}

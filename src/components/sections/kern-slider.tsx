"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/hooks/use-lang";

const BANDS: Array<{ max: number; label: string }> = [
  { max: 4, label: "VISUAL CRIME" },
  { max: 9, label: "TIGHT BUT LEGAL" },
  { max: 15, label: "AS GOD INTENDED" },
  { max: 40, label: "BREATHING ROOM" },
  { max: 68, label: "AIRY. FRENCH, EVEN." },
  { max: 88, label: "BOLD CHOICE" },
  { max: 101, label: "CONGRATS, IT'S A SENTENCE AGAIN" },
];

const DEFAULT_VALUE = 11;

function bandFor(value: number): string {
  for (const b of BANDS) {
    if (value < b.max) return b.label;
  }
  return BANDS[BANDS.length - 1].label;
}

/**
 * Kerning slider — ported from the original. It pokes
 * `#nameLast`'s inline letter-spacing imperatively (the h1 is a
 * server component and never re-renders, so there is no conflict
 * with React). The label is React state so it can follow the
 * active language (the original reverted band labels to English
 * while dragging — preserved).
 */
export function KernSlider() {
  const lang = useLang();
  const [value, setValue] = useState(DEFAULT_VALUE);

  useEffect(() => {
    const nameLast = document.getElementById("nameLast");
    if (nameLast) {
      const k = -0.06 + (value / 100) * 0.42;
      nameLast.style.letterSpacing = k + "em";
    }
  }, [value]);

  const band = bandFor(value);
  const bandText = band === "AS GOD INTENDED" && lang === "ar" ? "كما أراد الله" : band;
  const prefix = lang === "ar" ? "التباعد: " : "KERNING: ";

  return (
    <div
      className="kern max-w-[430px] justify-self-start lg:justify-self-end w-full rv"
      data-hero
      style={{ "--d": ".48s" } as React.CSSProperties}
    >
      <span className="kern-label block font-mono font-bold text-[10.5px] tracking-[.14em] mb-[.7rem] min-h-[1.2em]">
        {prefix}
        <b className="text-accent">{bandText}</b>
      </span>
      <div className="kern-track relative h-[34px]">
        <div className="kern-ticks" aria-hidden="true" />
        <input
          type="range"
          id="kern"
          min={0}
          max={100}
          defaultValue={DEFAULT_VALUE}
          aria-label="Adjust the kerning of my last name. Go on."
          onChange={(e) => setValue(Number(e.currentTarget.value))}
        />
      </div>
      <div className="kern-ends flex justify-between font-mono font-bold text-[9px] tracking-[.14em] opacity-65 mt-[.4rem] uppercase">
        <span>{lang === "ar" ? "منضغط" : "SQUISHED"}</span>
        <span>{lang === "ar" ? "مسافة اجتماعية" : "SOCIAL DISTANCING"}</span>
      </div>
    </div>
  );
}

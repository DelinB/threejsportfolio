"use client";

import { useState } from "react";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/i18n";
import { PlusIcon } from "@/components/ui/icons";

const SERVICES = [
  { nameKey: "skills.s1", descKey: "skills.s1d", chips: ["React 19", "Next.js", "Hooks"] },
  { nameKey: "skills.s2", descKey: "skills.s2d", chips: ["Tailwind", "Ant Design", "WCAG"] },
  { nameKey: "skills.s3", descKey: "skills.s3d", chips: ["Redux Toolkit", "RTK Query", "Zustand"] },
  { nameKey: "skills.s4", descKey: "skills.s4d", chips: ["React.lazy", "Lighthouse", "Bundle analysis"] },
  { nameKey: "skills.s5", descKey: "skills.s5d", chips: ["Jest", "RTL", "Vitest"] },
] as const;

/**
 * Skills accordion — ported from the original (single-open
 * behaviour, grid-rows transition, rotating plus sign). Now driven
 * by React state instead of classList toggling, and each toggle
 * carries proper aria-expanded / aria-controls wiring.
 */
export function Services() {
  const lang = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-[7.5rem] px-[4vw]">
      <div className="shead mb-[3.5rem] max-w-[1100px]">
        <span className="kicker inline-block font-mono font-bold text-[11px] leading-none tracking-[.16em] border-[1.5px] border-current rounded-full px-[1em] py-[.6em] mb-[1.7rem] uppercase rv">
          {t(lang, "skills.kicker")}
        </span>
        <h2
          className="font-bricolage font-extrabold uppercase text-[clamp(2.7rem,7.5vw,7rem)] leading-[.95] -tracking-[.03em] rv"
          style={{ "--d": ".08s" } as React.CSSProperties}
        >
          <span>{t(lang, "skills.title1")}</span>
          <em className="font-serif italic font-normal text-[.95em] normal-case tracking-normal text-accent">
            {t(lang, "skills.title2")}
          </em>
        </h2>
        <p
          className="aside font-serif italic font-normal text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.45] opacity-90 max-w-[52ch] mt-[1.2rem] rv"
          style={{ "--d": ".16s" } as React.CSSProperties}
        >
          {t(lang, "skills.desc")}
        </p>
      </div>

      {SERVICES.map((svc, i) => {
        const open = openIdx === i;
        return (
          <div
            key={svc.nameKey}
            className={`svc group border-t-2 ${i === SERVICES.length - 1 ? "border-b-2" : ""} border-ink rv${open ? " open" : ""}`}
            style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}
          >
            <button
              type="button"
              className="svc-head w-full grid grid-cols-[2.2rem_1fr_auto] md:grid-cols-[3.6rem_1fr_auto] gap-4 md:gap-6 items-center px-4 py-[1.7rem] text-left"
              aria-expanded={open}
              aria-controls={`svc-body-${i}`}
              onClick={() => setOpenIdx(open ? null : i)}
            >
              <span className="svc-idx font-mono font-bold text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="svc-name font-bricolage font-extrabold text-[clamp(1.5rem,4vw,3.1rem)] leading-none uppercase -tracking-[.02em] transition-transform duration-300 ease-custom group-hover:translate-x-3">
                {t(lang, svc.nameKey)}
              </span>
              <PlusIcon className="svc-plus w-[30px] h-[30px] transition-transform duration-400 ease-custom flex-none" />
            </button>
            <div
              className="svc-body grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-custom"
              id={`svc-body-${i}`}
              aria-hidden={!open}
            >
              <div className="overflow-hidden">
                <div className="svc-inner px-4 md:px-[calc(3.6rem+1.6rem+1rem)] pb-[2rem] max-w-[70ch]">
                  <p className="text-[1.05rem] opacity-90">{t(lang, svc.descKey)}</p>
                  <div className="inc flex flex-wrap gap-[.5rem] mt-4">
                    {svc.chips.map((chip) => (
                      <span
                        key={chip}
                        className="font-mono font-bold text-[9.5px] tracking-[.14em] border-[1.5px] border-ink rounded-full px-[.9em] py-[.45em] uppercase"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

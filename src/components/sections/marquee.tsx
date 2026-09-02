import { StarIcon } from "@/components/ui/icons";

const MARQUEE_ITEMS = [
  { key: "marquee.exp", label: "2 years experience" },
  { key: "marquee.react", label: "React 19" },
  { key: "marquee.ts", label: "TypeScript" },
  { key: "marquee.tailwind", label: "Tailwind CSS" },
  { key: "marquee.redux", label: "Redux Toolkit" },
  { key: "marquee.gsap", label: "GSAP" },
  { key: "marquee.agile", label: "Agile" },
  { key: "marquee.perf", label: "Performance obsessed" },
] as const;

function MarqueeSet() {
  return (
    <div className="marquee-set flex items-center gap-[2.6rem] py-[.95rem] pr-[1.3rem] pl-[2.6rem]">
      {MARQUEE_ITEMS.flatMap((item) => [
        <span
          key={item.key}
          className="font-bricolage font-extrabold text-[1.3rem] uppercase tracking-[.01em] whitespace-nowrap"
          data-i18n={item.key}
        >
          {item.label}
        </span>,
        <StarIcon key={item.key + "-icon"} className="w-[17px] h-[17px] flex-none animate-spin" />,
      ])}
    </div>
  );
}

/**
 * Skills marquee — ported from the original. The track is
 * duplicated at build time (server-rendered) instead of cloned by
 * runtime JavaScript; the CSS `marq` keyframe translates -50% for a
 * seamless loop. Marked decorative per the original.
 */
export function Marquee() {
  return (
    <div className="marquee-wrap overflow-hidden py-[2.6rem] relative" aria-hidden="true">
      <div className="marquee w-[106vw] -ml-[3vw] -rotate-[1.4deg] bg-accent text-paper border-y-2 border-ink overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee" id="marqTrack">
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>
    </div>
  );
}

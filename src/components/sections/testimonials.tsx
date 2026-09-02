const QUOTES = [
  {
    key: "proof.q1",
    whoKey: "proof.q1who",
    quote: "Anish said 'it depends' for forty-five minutes. Then fixed it in five.",
    who: "— A REAL CLIENT *",
  },
  {
    key: "proof.q2",
    whoKey: "proof.q2who",
    quote: "We asked for a dashboard. We received a dashboard, a lecture on performance, and our best quarter ever.",
    who: "— HAPPY, SOMEWHAT",
  },
  {
    key: "proof.q3",
    whoKey: "proof.q3who",
    quote: "He refused to use jQuery. He was right.",
    who: "— STILL SCARRED",
  },
  {
    key: "proof.q4",
    whoKey: "proof.q4who",
    quote: "Our app loads before we finish saying 'our app loads'.",
    who: "— IMPATIENT INC.",
  },
  {
    key: "proof.q5",
    whoKey: "proof.q5who",
    quote: "10/10. Would argue about CSS specificity again.",
    who: "— GRAYSCALE LLC",
  },
  {
    key: "proof.q6",
    whoKey: "proof.q6who",
    quote: "He optimized our bundle. Page speed is up 40%. Coincidence? Probably. We don't care.",
    who: "— FONT ENTHUSIASTS MONTHLY",
  },
] as const;

/**
 * Testimonials — ported verbatim. The footnote opacity was nudged
 * from .60 to .70 so the 10px mono text passes 4.5:1 on paper2.
 */
export function Testimonials() {
  return (
    <section id="proof" className="proof-sec py-[7.5rem] px-[4vw] bg-paper2">
      <div className="shead mb-[3.5rem] max-w-[1100px]">
        <span
          className="kicker inline-block font-mono font-bold text-[11px] leading-none tracking-[.16em] border-[1.5px] border-current rounded-full px-[1em] py-[.6em] mb-[1.7rem] uppercase rv"
          data-i18n="proof.kicker"
        >
          ( 05 ) — PROOF
        </span>
        <h2
          className="font-bricolage font-extrabold uppercase text-[clamp(2.7rem,7.5vw,7rem)] leading-[.95] -tracking-[.03em] rv"
          style={{ "--d": ".08s" } as React.CSSProperties}
        >
          <span data-i18n="proof.title1">PEOPLE </span>
          <em
            className="font-serif italic font-normal text-[.95em] normal-case tracking-normal text-accent"
            data-i18n="proof.title2"
          >
            talk.
          </em>
        </h2>
        <p
          className="aside font-serif italic font-normal text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.45] opacity-90 max-w-[52ch] mt-[1.2rem] rv"
          style={{ "--d": ".16s" } as React.CSSProperties}
          data-i18n="proof.desc"
        >
          Real quotes from real clients and colleagues. No further questions, your honour.
        </p>
      </div>

      <div className="clips columns-1 md:columns-2 lg:columns-3 gap-8">
        {QUOTES.map((item, i) => (
          <figure
            key={item.key}
            className="clip relative bg-paper px-[1.8rem] pt-[2.4rem] pb-[1.7rem] break-inside-avoid mb-8 shadow-[5px_6px_0_rgba(74,59,50,.13)] transition-all duration-350 ease-custom hover:rotate-0 hover:-translate-y-1 hover:shadow-[8px_10px_0_rgba(74,59,50,.18)] odd:-rotate-[1.6deg] even:rotate-[1.3deg] even:translate-y-2.5 lg:[&:nth-child(3n)]:-rotate-[.6deg] lg:[&:nth-child(3n)]:translate-y-[18px] rv"
            style={{ "--d": `${[0, 0.06, 0.12, 0.06, 0.12, 0.18][i]}s` } as React.CSSProperties}
          >
            <q className="font-serif italic font-normal text-[1.3rem] leading-[1.4]" data-i18n={item.key}>
              {item.quote}
            </q>
            <figcaption
              className="who block mt-[1.1rem] font-mono font-bold text-[10px] tracking-[.16em] uppercase"
              data-i18n={item.whoKey}
            >
              {item.who}
            </figcaption>
          </figure>
        ))}
      </div>

      <p
        className="clips-note font-mono font-bold text-[10px] tracking-[.16em] uppercase opacity-70 mt-4 rv"
        data-i18n="proof.note"
      >
        * names withheld for legal reasons (mine)
      </p>
    </section>
  );
}

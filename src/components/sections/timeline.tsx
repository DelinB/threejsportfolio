const TIMELINE = [
  {
    year: "2024",
    titleKey: "timeline.t1",
    textKey: "timeline.t1d",
    title: "Graduation & First Internship",
    text: "Completed B.E. in Electronics and Communication Engineering. Joined Spangles Infotech as a frontend apprentice, discovered my love for React.",
    current: false,
  },
  {
    year: "2024–2025",
    titleKey: "timeline.t2",
    textKey: "timeline.t2d",
    title: "Frontend Developer (Apprenticeship)",
    text: "Built hospital admin panels, learned React performance optimization, and wrote my first test suites with Jest and React Testing Library.",
    current: false,
  },
  {
    year: "2025",
    titleKey: "timeline.t3",
    textKey: "timeline.t3d",
    title: "Frontend Software Engineer",
    text: "Joined Tech Technologies Pvt Ltd. Improved checkout performance, integrated Razorpay, and worked with Redux Toolkit & RTK Query.",
    current: false,
  },
  {
    year: "2026",
    titleKey: "timeline.t4",
    textKey: "timeline.t4d",
    title: "You Are Here",
    text: "Still building, still learning, still arguing about the best state management library. This website is proof of life.",
    current: true,
  },
] as const;

/** Career timeline — ported verbatim from the original. */
export function Timeline() {
  return (
    <section id="timeline" className="py-[7.5rem] px-[4vw]">
      <div className="shead mb-[3.5rem] max-w-[1100px]">
        <span
          className="kicker inline-block font-mono font-bold text-[11px] leading-none tracking-[.16em] border-[1.5px] border-current rounded-full px-[1em] py-[.6em] mb-[1.7rem] uppercase rv"
          data-i18n="timeline.kicker"
        >
          ( 03 ) — CAREER TIMELINE
        </span>
        <h2
          className="font-bricolage font-extrabold uppercase text-[clamp(2.7rem,7.5vw,7rem)] leading-[.95] -tracking-[.03em] rv"
          style={{ "--d": ".08s" } as React.CSSProperties}
        >
          <span data-i18n="timeline.title1">A BRIEF HISTORY OF </span>
          <em
            className="font-serif italic font-normal text-[.95em] normal-case tracking-normal text-accent"
            data-i18n="timeline.title2"
          >
            my growth
          </em>
        </h2>
        <p
          className="aside font-serif italic font-normal text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.45] opacity-90 max-w-[52ch] mt-[1.2rem] rv"
          style={{ "--d": ".16s" } as React.CSSProperties}
          data-i18n="timeline.desc"
        >
          Two years of frontend development, from internship to full-time engineer. The learning never
          stops.
        </p>
      </div>

      <ol className="tl border-b-[1.5px] border-ink">
        {TIMELINE.map((entry, i) => (
          <li
            key={entry.year}
            className="tl-row grid grid-cols-1 md:grid-cols-[minmax(96px,150px)_1fr] gap-2 md:gap-8 border-t-[1.5px] border-ink px-[.6rem] py-[2rem] transition-transform duration-300 ease-custom hover:translate-x-2.5 rv"
            style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}
          >
            <span className="tl-year font-mono font-bold text-[1.05rem] text-accent">{entry.year}</span>
            <div>
              <h3 className="tl-title font-bricolage font-extrabold text-[1.4rem] uppercase -tracking-[.01em] flex items-center gap-[.8rem] flex-wrap">
                <span data-i18n={entry.titleKey}>{entry.title}</span>
                {entry.current && (
                  <span
                    className="here-tag font-mono font-bold text-[9px] tracking-[.16em] border-[1.5px] border-accent text-accent rounded-full px-[.8em] py-[.35em]"
                    data-i18n="timeline.current"
                  >
                    CURRENT LOCATION
                  </span>
                )}
              </h3>
              <p
                className="tl-text max-w-[62ch] mt-[.45rem] text-[1.02rem] opacity-88"
                data-i18n={entry.textKey}
              >
                {entry.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

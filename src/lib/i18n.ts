/**
 * i18n dictionary — ported verbatim from the original site's
 * translation system (English + Arabic, with full RTL support).
 *
 * Architecture change vs. the original:
 * - Server Components keep their `data-i18n` attributes; the
 *   language switcher swaps their text imperatively (the page is
 *   statically rendered in English, so crawlers always get full
 *   content and nothing is hidden behind JS).
 * - Client Components translate themselves by subscribing to the
 *   `langchange` event (see src/hooks/use-lang.ts) — they never
 *   carry `data-i18n`, so React never fights the DOM swap.
 *
 * Bug fix vs. the original: the language cycle was
 * ['en', 'ar', 'ta'] but no Tamil dictionary existed, so the third
 * click threw a TypeError. The switch is now a clean EN ↔ AR toggle.
 */

export type Lang = "en" | "ar";

export const LANGS: Lang[] = ["en", "ar"];

type Dict = Record<string, string>;

const en: Dict = {
  // loader
  "loader.line1": "warming up the components",
  "loader.skip": "CLICK TO SKIP THE DRAMA",
  // nav
  "nav.work": "Work",
  "nav.receipt": "Receipt",
  "nav.timeline": "Timeline",
  "nav.proof": "Proof",
  "nav.contact": "Contact",
  "nav.hire": "Hire me",
  // menu tags
  "menu.workTag": "the projects",
  "menu.receiptTag": "the damage report",
  "menu.timelineTag": "career path",
  "menu.proofTag": "people talk",
  "menu.contactTag": "say hi",
  "menu.foot": "EST. 2024 · STILL KERNING",
  // hero
  "hero.meta1": "PORTFOLIO — FRONTEND UI DEVELOPER",
  "hero.meta2": "EST. 2024",
  "hero.intro1":
    'Frontend <em class="font-serif italic font-normal text-[1.1em]">UI Developer</em> with 2 years of experience building React.js web applications. I specialize in core front-end technologies and modern React development.',
  "hero.intro2": "( Anish is my real name. So is the kerning obsession. Drag the slider — I insist. )",
  "hero.kernLabel": 'KERNING: <b class="text-accent">AS GOD INTENDED</b>',
  "hero.kernEnd1": "SQUISHED",
  "hero.kernEnd2": "SOCIAL DISTANCING",
  "hero.scroll": "SCROLL — IT GETS BETTER",
  "hero.stats": "2 YRS · 3+ PROJECTS · 0 REGRETS* (*ZERO)",
  "hero.badge": "OPEN TO FRONTEND ROLES · REACT SPECIALIST ·",
  // marquee
  "marquee.exp": "2 years experience",
  "marquee.react": "React 19",
  "marquee.ts": "TypeScript",
  "marquee.tailwind": "Tailwind CSS",
  "marquee.redux": "Redux Toolkit",
  "marquee.gsap": "GSAP",
  "marquee.agile": "Agile",
  "marquee.perf": "Performance obsessed",
  // work
  "work.kicker": "( 01 ) — SELECTED PROJECTS",
  "work.title1": "THE ",
  "work.title2": "projects",
  "work.desc": "Three projects that showcase my frontend engineering skills, from e-commerce platforms to admin dashboards and educational portals.",
  "work.proj1.title": "E-Commerce Platform",
  "work.proj1.meta": "FRONTEND / E-COMMERCE",
  "work.proj2.title": "Admin Panel & Dashboard",
  "work.proj2.meta": "DASHBOARD / UI",
  "work.proj3.title": "Educational Portal",
  "work.proj3.meta": "PORTAL / PAYMENTS",
  // receipt
  "receipt.kicker": "( 02 ) — THE DAMAGE REPORT",
  "receipt.title1": "TWO YEARS, ",
  "receipt.title2": "itemized.",
  "receipt.desc":
    "Every pull request tells a story. Mine screams. All figures verified by my team lead, who laughed, then asked for more features.",
  "receipt.fine": "* NO REFUNDS · ALL SALES FINAL · COME AGAIN",
  "receipt.head": "CAREER RECEIPT",
  "receipt.item1": "Projects delivered",
  "receipt.item2": "React components built",
  "receipt.item2val": "hundreds",
  "receipt.item3": "Bugs fixed",
  "receipt.item3val": "many",
  "receipt.item4": "Console errors shipped",
  "receipt.item5": "npm packages installed",
  "receipt.item5val": "thousands",
  "receipt.item6": "Redux slices created",
  "receipt.item7": "Coffee (litres)",
  "receipt.item8": "Meetings survived",
  "receipt.item8val": "countless",
  "receipt.subtotal": "SUBTOTAL",
  "receipt.subtotalVal": "EXPERIENCE",
  "receipt.vat": "VAT (TRAUMA, IE11)",
  "receipt.vatVal": "INCLUDED",
  "receipt.total": "TOTAL",
  "receipt.totalVal": "2 YEARS",
  "receipt.stamp": "2 yrs service",
  "receipt.code": "ANISH-2024-∞ · VALID IN THIS DIMENSION",
  "receipt.legal": "* NO REFUNDS · THANK YOU · COME AGAIN *",
  // timeline
  "timeline.kicker": "( 03 ) — CAREER TIMELINE",
  "timeline.title1": "A BRIEF HISTORY OF ",
  "timeline.title2": "my growth",
  "timeline.desc": "Two years of frontend development, from internship to full-time engineer. The learning never stops.",
  "timeline.t1": "Graduation & First Internship",
  "timeline.t1d":
    "Completed B.E. in Electronics and Communication Engineering. Joined Spangles Infotech as a frontend apprentice, discovered my love for React.",
  "timeline.t2": "Frontend Developer (Apprenticeship)",
  "timeline.t2d":
    "Built hospital admin panels, learned React performance optimization, and wrote my first test suites with Jest and React Testing Library.",
  "timeline.t3": "Frontend Software Engineer",
  "timeline.t3d":
    "Joined Tech Technologies Pvt Ltd. Improved checkout performance, integrated Razorpay, and worked with Redux Toolkit & RTK Query.",
  "timeline.t4": "You Are Here",
  "timeline.current": "CURRENT LOCATION",
  "timeline.t4d":
    "Still building, still learning, still arguing about the best state management library. This website is proof of life.",
  // skills
  "skills.kicker": "( 04 ) — SKILLS",
  "skills.title1": "WHAT I DO ",
  "skills.title2": "(my toolkit)",
  "skills.desc": "Click around. Everything is expandable, including the skill set.",
  "skills.s1": "React Development",
  "skills.s1d":
    "Building scalable, maintainable interfaces with React 19, Next.js, and modern patterns. Reusable components, hooks, and performance-conscious code.",
  "skills.s2": "UI Engineering & Accessibility",
  "skills.s2d":
    "Crafting responsive, WCAG-compliant interfaces with Tailwind CSS, Ant Design, and Material UI. Clean HTML5, modern CSS3, and ARIA best practices.",
  "skills.s3": "State Management",
  "skills.s3d":
    "Managing complex state with Redux Toolkit, RTK Query, Zustand, and TanStack Query. Efficient data fetching, caching, and normalized stores.",
  "skills.s4": "Performance Optimization",
  "skills.s4d":
    "Improving load times and Core Web Vitals through code splitting, lazy loading, bundle analysis, and caching strategies. Performance is a feature.",
  "skills.s5": "Testing & Quality",
  "skills.s5d": "Writing robust test suites with Jest, React Testing Library, and Vitest to catch bugs early and ensure UI stability.",
  // proof
  "proof.kicker": "( 05 ) — PROOF",
  "proof.title1": "PEOPLE ",
  "proof.title2": "talk.",
  "proof.desc": "Real quotes from real clients and colleagues. No further questions, your honour.",
  "proof.q1": "Anish said 'it depends' for forty-five minutes. Then fixed it in five.",
  "proof.q1who": "— A REAL CLIENT *",
  "proof.q2": "We asked for a dashboard. We received a dashboard, a lecture on performance, and our best quarter ever.",
  "proof.q2who": "— HAPPY, SOMEWHAT",
  "proof.q3": "He refused to use jQuery. He was right.",
  "proof.q3who": "— STILL SCARRED",
  "proof.q4": "Our app loads before we finish saying 'our app loads'.",
  "proof.q4who": "— IMPATIENT INC.",
  "proof.q5": "10/10. Would argue about CSS specificity again.",
  "proof.q5who": "— GRAYSCALE LLC",
  "proof.q6": "He optimized our bundle. Page speed is up 40%. Coincidence? Probably. We don't care.",
  "proof.q6who": "— FONT ENTHUSIASTS MONTHLY",
  "proof.note": "* names withheld for legal reasons (mine)",
  // contact
  "contact.kicker": "( 06 ) — CONTACT",
  "contact.title1": "SAY ",
  "contact.title2": "hi.",
  "contact.desc":
    "Good briefs welcome. Dancing babies are not. I reply faster than this website loads — which, admittedly, is a low bar while the kerning slider is involved.",
  "contact.note": 'CURRENTLY OPEN TO: FRONTEND ROLES · CURRENTLY AVOIDING: "QUICK FIXES"',
  // footer
  "footer.copyright": "© 2024–2026 DELIN B ANISH. ALL RIGHTS RESERVED, INCLUDING THE RIGHT TO REMAIN KERNING.",
  "footer.dontPress": "DO NOT PRESS",
  // modal
  "modal.close": "CLOSE — RUN AWAY",
  "modal.brief": "THE BRIEF",
  "modal.outcome": "THE OUTCOME",
  "modal.quote": "CLIENT QUOTE",
  "modal.lesson": "LESSON LEARNED",
  "modal.ask": "ASK ME ABOUT IT — SERIOUSLY",
};

const ar: Dict = {
  // loader
  "loader.line1": "تسخين المكونات",
  "loader.skip": "انقر لتخطي الدراما",
  // nav
  "nav.work": "الأعمال",
  "nav.receipt": "الإيصال",
  "nav.timeline": "الجدول الزمني",
  "nav.proof": "الإثبات",
  "nav.contact": "اتصل",
  "nav.hire": "وظّفني",
  // menu tags
  "menu.workTag": "المشاريع",
  "menu.receiptTag": "تقرير الأضرار",
  "menu.timelineTag": "المسار المهني",
  "menu.proofTag": "قالوا عني",
  "menu.contactTag": "قل مرحباً",
  "menu.foot": "تأسس ٢٠٢٤ · ما زلت أضبط التباعد",
  // hero
  "hero.meta1": "معرض — مطور واجهات أمامية",
  "hero.meta2": "تأسس ٢٠٢٤",
  "hero.intro1":
    'مطور <em class="font-serif italic font-normal text-[1.1em]">واجهات أمامية</em> بخبرة سنتين في بناء تطبيقات React.js. أتخصص في تقنيات الواجهة الأمامية الأساسية وتطوير React الحديث.',
  "hero.intro2": "( أنيش هو اسمي الحقيقي. كذلك هوسي بضبط التباعد. اسحب الشريط — أنا أصرّ على ذلك. )",
  "hero.kernLabel": 'التباعد: <b class="text-accent">كما أراد الله</b>',
  "hero.kernEnd1": "منضغط",
  "hero.kernEnd2": "مسافة اجتماعية",
  "hero.scroll": "مرر — يصبح أفضل",
  "hero.stats": "سنتان · ٣+ مشاريع · ٠ ندم* (*صفر)",
  "hero.badge": "مفتوح لأدوار الواجهة الأمامية · متخصص في React ·",
  // marquee
  "marquee.exp": "سنتان خبرة",
  "marquee.react": "React 19",
  "marquee.ts": "TypeScript",
  "marquee.tailwind": "Tailwind CSS",
  "marquee.redux": "Redux Toolkit",
  "marquee.gsap": "GSAP",
  "marquee.agile": "Agile",
  "marquee.perf": "مهووس بالأداء",
  // work
  "work.kicker": "( ٠١ ) — مشاريع مختارة",
  "work.title1": "الـ ",
  "work.title2": "مشاريع",
  "work.desc": "ثلاثة مشاريع تعرض مهاراتي في هندسة الواجهات، من منصات التجارة الإلكترونية إلى لوحات الإدارة وبوابات التعليم.",
  "work.proj1.title": "منصة تجارة إلكترونية",
  "work.proj1.meta": "واجهة أمامية / تجارة إلكترونية",
  "work.proj2.title": "لوحة الإدارة ولوحة التحكم",
  "work.proj2.meta": "لوحة تحكم / واجهة",
  "work.proj3.title": "بوابة تعليمية",
  "work.proj3.meta": "بوابة / مدفوعات",
  // receipt
  "receipt.kicker": "( ٠٢ ) — تقرير الأضرار",
  "receipt.title1": "سنتان، ",
  "receipt.title2": "بالتفصيل.",
  "receipt.desc": "كل طلب دمج يحكي قصة. قصتي تصرخ. جميع الأرقام تحقق منها قائد فريقي، الذي ضحك ثم طلب المزيد من الميزات.",
  "receipt.fine": "* لا استرداد · جميع المبيعات نهائية · عد مرة أخرى",
  "receipt.head": "إيصال مهني",
  "receipt.item1": "مشاريع سُلّمت",
  "receipt.item2": "مكونات React بنيت",
  "receipt.item2val": "مئات",
  "receipt.item3": "أخطاء أُصلحت",
  "receipt.item3val": "كثيرة",
  "receipt.item4": "أخطاء كونسول صدرت",
  "receipt.item5": "حزم npm مثبتة",
  "receipt.item5val": "آلاف",
  "receipt.item6": "شرائح Redux أنشئت",
  "receipt.item7": "قهوة (لتر)",
  "receipt.item8": "اجتماعات نجوت منها",
  "receipt.item8val": "لا تُحصى",
  "receipt.subtotal": "المجموع الفرعي",
  "receipt.subtotalVal": "الخبرة",
  "receipt.vat": "ضريبة القيمة المضافة (صدمة IE11)",
  "receipt.vatVal": "مشمول",
  "receipt.total": "الإجمالي",
  "receipt.totalVal": "سنتان",
  "receipt.stamp": "خدمة سنتين",
  "receipt.code": "ANISH-2024-∞ · صالح في هذا البعد",
  "receipt.legal": "* لا استرداد · شكراً · عد مرة أخرى *",
  // timeline
  "timeline.kicker": "( ٠٣ ) — الجدول الزمني المهني",
  "timeline.title1": "نبذة تاريخية عن ",
  "timeline.title2": "نموّي",
  "timeline.desc": "سنتان من تطوير الواجهة الأمامية، من التدريب إلى مهندس بدوام كامل. التعلم لا يتوقف.",
  "timeline.t1": "التخرج والتدريب الأول",
  "timeline.t1d":
    "أكملت بكالوريوس الهندسة في الإلكترونيات والاتصالات. انضممت إلى Spangles Infotech كمتدرب في الواجهة الأمامية واكتشفت حبي لـ React.",
  "timeline.t2": "مطور واجهات أمامية (تدريب مهني)",
  "timeline.t2d":
    "بنيت لوحات إدارة للمستشفيات، تعلمت تحسين أداء React، وكتبت أول مجموعات اختبار باستخدام Jest و React Testing Library.",
  "timeline.t3": "مهندس برمجيات واجهات أمامية",
  "timeline.t3d": "انضممت إلى Tech Technologies Pvt Ltd. حسّنت أداء الدفع، ودمجت Razorpay، وعملت مع Redux Toolkit و RTK Query.",
  "timeline.t4": "أنت هنا",
  "timeline.current": "الموقع الحالي",
  "timeline.t4d": "ما زلت أبني، ما زلت أتعلم، ما زلت أجادل حول أفضل مكتبة لإدارة الحالة. هذا الموقع دليل على الحياة.",
  // skills
  "skills.kicker": "( ٠٤ ) — المهارات",
  "skills.title1": "ما أفعله ",
  "skills.title2": "(عدّتي)",
  "skills.desc": "انقر حولك. كل شيء قابل للتوسيع، بما في ذلك مجموعة المهارات.",
  "skills.s1": "تطوير React",
  "skills.s1d": "بناء واجهات قابلة للتوسع والصيانة باستخدام React 19 و Next.js والأنماط الحديثة. مكونات قابلة لإعادة الاستخدام، وخطافات، ووعي بالأداء.",
  "skills.s2": "هندسة الواجهة وإمكانية الوصول",
  "skills.s2d": "صياغة واجهات متجاوبة ومتوافقة مع WCAG باستخدام Tailwind CSS و Ant Design و Material UI. HTML5 نظيف، CSS3 حديث، وأفضل ممارسات ARIA.",
  "skills.s3": "إدارة الحالة",
  "skills.s3d": "إدارة الحالة المعقدة مع Redux Toolkit و RTK Query و Zustand و TanStack Query. جلب بيانات فعال، وتخزين مؤقت، ومخازن طبيعية.",
  "skills.s4": "تحسين الأداء",
  "skills.s4d": "تحسين أوقات التحميل و Core Web Vitals عبر تقسيم الكود، والتحميل الكسول، وتحليل الحزم، واستراتيجيات التخزين المؤقت. الأداء ميزة.",
  "skills.s5": "الاختبار والجودة",
  "skills.s5d": "كتابة مجموعات اختبار قوية مع Jest و React Testing Library و Vitest لاكتشاف الأخطاء مبكراً وضمان استقرار الواجهة.",
  // proof
  "proof.kicker": "( ٠٥ ) — الإثبات",
  "proof.title1": "الناس ",
  "proof.title2": "يتكلمون.",
  "proof.desc": "اقتباسات حقيقية من عملاء وزملاء حقيقيين. لا مزيد من الأسئلة، حضرة القاضي.",
  "proof.q1": "قال أنيش 'يعتمد' لمدة خمس وأربعين دقيقة. ثم أصلحها في خمس.",
  "proof.q1who": "— عميل حقيقي *",
  "proof.q2": "طلبنا لوحة تحكم. حصلنا على لوحة تحكم، ومحاضرة عن الأداء، وأفضل ربع لنا على الإطلاق.",
  "proof.q2who": "— سعيد، إلى حد ما",
  "proof.q3": "رفض استخدام jQuery. كان محقاً.",
  "proof.q3who": "— ما زال يعاني",
  "proof.q4": "تطبيقنا يُحمَّل قبل أن ننتهي من قول 'تطبيقنا يُحمَّل'.",
  "proof.q4who": "— شركة نفاد الصبر",
  "proof.q5": "10/10. سأجادل حول خصوصية CSS مرة أخرى.",
  "proof.q5who": "— GRAYSCALE LLC",
  "proof.q6": "قام بتحسين حزمة ملفاتنا. سرعة الصفحة ارتفعت 40٪. مصادفة؟ ربما. لا يهمنا.",
  "proof.q6who": "— مجلة عشاق الخطوط الشهرية",
  "proof.note": "* الأسماء محذوفة لأسباب قانونية (أسبابي)",
  // contact
  "contact.kicker": "( ٠٦ ) — اتصال",
  "contact.title1": "قل ",
  "contact.title2": "مرحباً.",
  "contact.desc":
    "الموجزات الجيدة مرحب بها. الأطفال الراقصون لا. أرد أسرع من تحميل هذا الموقع — وهو معترف به كمعيار منخفض عندما يكون شريط التباعد متورطاً.",
  "contact.note": 'مفتوح حالياً لـ: أدوار الواجهة الأمامية · يتجنب حالياً: "إصلاحات سريعة"',
  // footer
  "footer.copyright": "© 2024–2026 DELIN B ANISH. جميع الحقوق محفوظة، بما في ذلك الحق في البقاء في حالة ضبط تباعد.",
  "footer.dontPress": "لا تضغط",
  // modal
  "modal.close": "إغلاق — اهرب",
  "modal.brief": "الموجز",
  "modal.outcome": "النتيجة",
  "modal.quote": "اقتباس العميل",
  "modal.lesson": "الدرس المستفاد",
  "modal.ask": "اسألني عنه — بجدية",
};

export const translations: Record<Lang, Dict> = { en, ar };

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}

/**
 * Imperatively swaps text on server-rendered `[data-i18n]` nodes.
 * Mirrors the original site's approach so that statically
 * server-rendered content (visible to crawlers in English) can be
 * translated without making every section a Client Component.
 * The dictionary is first-party static data, so the innerHTML path
 * is XSS-safe.
 */
export function applyServerTranslations(lang: Lang): void {
  if (typeof document === "undefined") return;
  const dict = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key === null || dict[key] === undefined) return;
    const trans = dict[key];
    if (trans.includes("<")) {
      el.innerHTML = trans;
    } else {
      el.textContent = trans;
    }
  });
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
}

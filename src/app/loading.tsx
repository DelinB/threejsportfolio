import { StarIcon } from "@/components/ui/icons";

/**
 * Route-level loading UI. The home page is fully static so this
 * only paints during streaming/route transitions, never on a normal
 * first visit.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[300] bg-paper flex flex-col items-center justify-center gap-5"
      role="status"
      aria-label="Loading"
    >
      <StarIcon className="w-[38px] h-[38px] text-accent animate-spin" />
      <span className="font-mono font-bold text-[11px] tracking-[.18em] uppercase">
        warming up the components
      </span>
    </div>
  );
}

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  children: ReactNode;
}

export function HorizScrollShelf({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hovered, setHovered] = useState(false);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    const ro = new ResizeObserver(updateState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateState);
      ro.disconnect();
    };
  }, [updateState]);  // Native wheel listener — must be non-passive to call preventDefault()
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const canScrollLeft = el.scrollLeft > 1;
      const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

      const scrollingLeft = e.deltaY < 0;
      const scrollingRight = e.deltaY > 0;

      if ((scrollingLeft && canScrollLeft) || (scrollingRight && canScrollRight)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const scroll = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -480 : 480, behavior: "smooth" });
  }, []);

  const showLeft = hovered && canScrollLeft;
  const showRight = hovered && canScrollRight;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0"
      >
        {children}
      </div>

      {/* Left edge — fade + button */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center transition-opacity duration-200 sm:-left-1 ${showLeft ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "linear-gradient(to right, var(--surface-base) 40%, transparent)",
          width: "4rem",
        }}
      >
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="pointer-events-auto ml-0 hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex"
        >
          <ChevronLeft className="size-3.5" />
        </button>
      </div>

      {/* Right edge — fade + button */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-end transition-opacity duration-200 sm:-right-1 ${showRight ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "linear-gradient(to left, var(--surface-base) 40%, transparent)",
          width: "4rem",
        }}
      >
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="pointer-events-auto mr-0 hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * Thin accent beam at the very top that tracks read progress.
 *
 * Plain rAF instead of a motion library: `scrollY` is a cheap read, and the
 * scrollable distance is cached (recomputed only on resize) so the scroll
 * handler never touches layout. Only `transform` is written, so the beam stays
 * on the compositor.
 *
 * The initial measurement deliberately does NOT run synchronously in this
 * effect. Reading `scrollHeight` right after this component's own DOM node was
 * just inserted forces the browser to flush layout for the entire document
 * immediately, instead of on its own schedule — a forced reflow, and one the
 * perf audit could point at by line number. ResizeObserver's callback fires
 * once on its own (queued by the browser, not us) right after `.observe()`, so
 * routing the first read through it gets the same result without forcing
 * anything.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let maxScroll = 1;
    let ticking = false;

    const paint = () => {
      ticking = false;
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      el.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      paint();
    });
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transform: "scaleX(0)" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent will-change-transform"
      aria-hidden
    />
  );
}

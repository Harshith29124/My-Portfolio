import { useEffect, useRef, useState } from "react";

/**
 * Adds an `is-in` trigger when the element scrolls into view. Pairs with the
 * `.reveal` CSS animation. Pure IntersectionObserver + CSS — no animation
 * library, so it can't be suppressed by reduced-motion or motion-lib quirks.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  opts?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...opts },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return { ref, inView };
}

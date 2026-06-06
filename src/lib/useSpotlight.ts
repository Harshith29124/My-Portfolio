import { useRef, useCallback } from "react";

/**
 * Tracks the cursor inside an element and writes --mx/--my CSS variables,
 * driving the `.spotlight` border highlight. Writes straight to the DOM node
 * (no React state) so it never re-renders on pointer move.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}

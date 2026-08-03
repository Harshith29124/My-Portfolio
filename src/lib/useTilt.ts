import { useRef } from "react";
import { useReduce } from "./useReduce";

/**
 * Cursor-driven 3D tilt for cards. Also writes --mx/--my so a `.spotlight`
 * highlight can share the same pointer move.
 *
 * Writes transforms directly to the node — no motion values, no re-render, and
 * nothing but `transform` changing, so the tilt stays on the compositor.
 */
export function useTilt(max = 7) {
  const reduce = useReduce();
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduce) return;
    const ry = (px - 0.5) * max * 2;
    const rx = (0.5 - py) * max * 2;
    el.style.transition = "transform 0.15s linear";
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return { ref, onMouseMove, onMouseLeave };
}

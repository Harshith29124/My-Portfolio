import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Cursor-driven 3D tilt for cards. Also writes --mx/--my so a `.spotlight`
 * highlight can share the same pointer move. Motion values only (no re-render).
 */
export function useTilt(max = 7) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 200, damping: 18, mass: 0.4 };
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduce) return;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return { ref, onMouseMove, onMouseLeave, rotateX, rotateY };
}

import { useRef, type ReactNode } from "react";
import { useReduce } from "../lib/useReduce";

/**
 * Wraps an interactive element so it drifts toward the cursor (magnetic pull),
 * then springs back on leave.
 *
 * Writes the offset straight to the DOM node as a transform (no React state, no
 * animation library). The release uses a slight-overshoot easing so it still
 * reads as a spring, and only `transform` changes, so it stays composited.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReduce();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (reduce || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    // Track the cursor tightly; the springy easing is only wanted on release.
    el.style.transition = "transform 0.12s linear";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {children}
    </div>
  );
}

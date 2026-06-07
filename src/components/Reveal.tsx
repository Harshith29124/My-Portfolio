import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../lib/useInView";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Scroll-reveal. CSS animation triggered by IntersectionObserver — works on
 * every device/browser and is immune to reduced-motion suppression.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className ?? ""}`}
      style={{ "--delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

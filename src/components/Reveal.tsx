import { motion } from "motion/react";
import { useReduce } from "../lib/useReduce";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Lightweight scroll-reveal. Transform + opacity only (no filter animation) so
 * it stays GPU-composited and smooth. Honors reduced-motion (renders static).
 */
export default function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  const reduce = useReduce();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

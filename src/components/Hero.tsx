import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import Magnetic from "./Magnetic";

// Headline split so each word rises on its own beat (transform-only mask reveal).
const HEAD_LEAD = "I build AI systems that turn manual work into".split(" ");

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const goTo = (id: string) => lenis?.scrollTo(`#${id}`, { offset: -80 });

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const wordDelay = (i: number) => 0.15 + i * 0.04;

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-28 md:pt-32">
      <div className="shell relative z-10 flex flex-1 flex-col justify-center">
        {/* Eyebrow: a substantial role line + an availability marker.
            Real type weight, not slim wide-tracked caps. */}
        <motion.div
          {...rise(0)}
          className="mb-9 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="text-base font-semibold tracking-tight text-ink">
            AI Workflow Engineer
          </span>
          <span className="h-4 w-px bg-line-strong" aria-hidden />
          <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent-ink">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            Available for freelance work
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-[16ch] text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-ink lg:max-w-[18ch]">
          {HEAD_LEAD.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: wordDelay(i),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="accent-shimmer inline-block"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.85,
                delay: wordDelay(HEAD_LEAD.length),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              reliable automation.
            </motion.span>
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          {...rise(0.55)}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-dim md:text-lg"
        >
          Concretely: multi-model pipelines, LLM apps, and structured output that
          holds up in production, not just in a demo.
        </motion.p>

        {/* CTAs */}
        <motion.div {...rise(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic className="inline-block">
            <button
              onClick={() => goTo("work")}
              className="btn-accent group inline-flex items-center gap-2.5 rounded-full py-3 pl-6 pr-3 text-sm font-semibold"
              style={{ touchAction: "manipulation" }}
            >
              See my work
              <span className="cta-icon">
                <ArrowDown weight="bold" size={14} />
              </span>
            </button>
          </Magnetic>
          <Magnetic className="inline-block">
            <button
              onClick={() => goTo("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent active:translate-y-px"
              style={{ touchAction: "manipulation" }}
            >
              Get in touch
              <ArrowUpRight weight="bold" size={16} className="text-dim" />
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll cue — anchored at the bottom of the viewport (mobile + desktop) */}
      <motion.button
        onClick={() => goTo("work")}
        aria-label="Scroll to work"
        {...rise(0.9)}
        className="relative z-10 mx-auto mt-12 flex flex-col items-center gap-1.5 text-faint transition-colors hover:text-accent-ink"
      >
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em]">
          Scroll
        </span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ArrowDown weight="bold" size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}

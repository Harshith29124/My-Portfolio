import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import PipelineRun from "./PipelineRun";
import Magnetic from "./Magnetic";

// Headline split so each word can rise on its own beat (staggered reveal).
const HEAD_LEAD = "I build AI systems that turn manual work into".split(" ");

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const goTo = (id: string) => lenis?.scrollTo(`#${id}`, { offset: -80 });

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16">
      {/* breathing ambient glow, subtle, not neon */}
      <motion.div
        aria-hidden
        animate={reduce ? {} : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-1/4 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(198,255,58,0.12), transparent 65%)",
        }}
      />

      <div className="shell grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left: message */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            {HEAD_LEAD.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: "0.5em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + i * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
            <motion.span
              className="accent-shimmer inline-block"
              initial={reduce ? false : { opacity: 0, y: "0.5em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.08 + HEAD_LEAD.length * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              reliable automation.
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-dim md:text-lg"
          >
            Concretely: multi-model pipelines, LLM apps, and structured output
            that holds up in production, not just in a demo.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic className="inline-block">
              <button
                onClick={() => goTo("work")}
                className="btn-accent group inline-flex items-center gap-2.5 rounded-full py-2.5 pl-5 pr-2.5 text-sm font-semibold"
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
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent active:translate-y-px"
              >
                Get in touch
                <ArrowUpRight weight="bold" size={16} className="text-dim" />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: the signature live pipeline */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="relative"
        >
          <motion.div
            animate={reduce ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="bezel-shell elev-soft relative h-[360px] w-full sm:h-[420px] lg:h-[500px]"
          >
            <div className="bezel-core h-full">
              <PipelineRun />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, FlowArrow } from "@phosphor-icons/react";
import NodeGraph from "./NodeGraph";
import Magnetic from "./Magnetic";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// The five stages every pipeline in the work shares. The hero panel narrates a
// brief travelling through them, so the visual states what I actually build.
const STAGES = ["Capture", "Understand", "Compose", "Verify", "Publish"] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // Advance the active stage so the panel reads as a live run, not decoration.
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % STAGES.length),
      1500,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

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
          <motion.h1
            {...rise(0.08)}
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
          >
            I build AI systems that turn manual work into{" "}
            <span className="text-accent-ink">reliable automation.</span>
          </motion.h1>

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
                onClick={() => scrollTo("work")}
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
                onClick={() => scrollTo("contact")}
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
            className="bezel-shell elev-soft relative h-[320px] w-full sm:h-[380px] lg:h-[500px]"
          >
            <div className="bezel-core flex h-full flex-col">
              {/* console header: states what this is + that it is running */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-[8px] bg-accent-dim text-accent-ink">
                    <FlowArrow weight="bold" size={14} />
                  </span>
                  <span className="font-mono text-[12px] tracking-tight text-ink">
                    AI pipeline
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-dim px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-ink">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-accent"
                      animate={reduce ? {} : { scale: [1, 2.6], opacity: [0.7, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  live
                </span>
              </div>

              {/* the flowing graph */}
              <div className="relative flex-1 overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 100% 0%, rgba(198,255,58,0.06), transparent 55%)",
                  }}
                />
                <NodeGraph />
                {/* current-stage readout: narrates the run in plain words */}
                <div className="pointer-events-none absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  run{" "}
                  <span className="text-accent-ink transition-colors duration-300">
                    {STAGES[active].toLowerCase()}
                  </span>
                </div>
              </div>

              {/* stage rail: the active stage lights up in sequence */}
              <div className="flex items-center justify-between gap-1 border-t border-line px-3 py-3">
                {STAGES.map((s, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={s}
                      className="flex flex-1 flex-col items-center gap-1.5"
                    >
                      <span
                        className={`h-1 w-full rounded-full transition-colors duration-500 ${
                          on ? "bg-accent" : "bg-line-strong"
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`font-mono text-[8.5px] uppercase tracking-[0.1em] transition-colors duration-500 sm:text-[9.5px] ${
                          on ? "text-accent-ink" : "text-faint"
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FlowArrow, Check } from "@phosphor-icons/react";

/**
 * The hero's signature visual: a concrete AI pipeline executing a real job,
 * not an abstract node cloud. It mirrors the work itself — a structured brief
 * routed across tiered models, generated under a schema, checked by QA gates,
 * and shipped as an approved, on-brand asset. Each stage lights as the run
 * advances; hover or tap a stage (desktop + touch) to inspect it.
 */
type Stage = { name: string; detail: string };

const STAGES: Stage[] = [
  { name: "Intake", detail: "Structured brief in" },
  { name: "Route", detail: "Tiered model routing" },
  { name: "Generate", detail: "Schema-constrained" },
  { name: "Verify", detail: "Validate + QA gate" },
  { name: "Ship", detail: "Approved asset out" },
];

export default function PipelineRun() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  // Auto-advance the run, unless a stage is pinned by hover/tap or motion is off.
  useEffect(() => {
    if (reduce || pinned !== null) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % STAGES.length),
      1300,
    );
    return () => window.clearInterval(id);
  }, [reduce, pinned]);

  const cur = pinned ?? active;
  const progress = (cur / (STAGES.length - 1)) * 100;

  return (
    <div className="flex h-full flex-col">
      {/* Console header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-[8px] bg-accent-dim text-accent-ink">
            <FlowArrow weight="bold" size={14} />
          </span>
          <span className="font-mono text-[12px] tracking-tight text-ink">
            content-pipeline
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-[6px] border border-line bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
          <span className="flex h-3 items-end gap-[2px]" aria-hidden>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-[1px] bg-accent"
                animate={reduce ? { height: 7 } : { height: [4, 12, 6, 10, 4] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.18,
                }}
              />
            ))}
          </span>
          Live
        </span>
      </div>

      {/* Stage flow */}
      <div className="relative flex-1 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 100% 0%, rgba(198,255,58,0.07), transparent 55%)",
          }}
        />
        <ul className="relative flex h-full flex-col px-3 py-2">
          {STAGES.map((s, i) => {
            const done = i < cur;
            const running = i === cur;
            const last = i === STAGES.length - 1;
            return (
              <li
                key={s.name}
                onPointerEnter={() => setPinned(i)}
                onPointerLeave={() => setPinned(null)}
                className={`group/row relative flex flex-1 cursor-default items-stretch gap-3 rounded-[10px] px-2 transition-colors duration-300 ${
                  running ? "bg-surface/70" : "hover:bg-surface/50"
                }`}
              >
                {/* active-stage left edge */}
                <span
                  className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                    running ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />

                {/* node + connector */}
                <div className="relative flex w-7 shrink-0 flex-col items-center pt-3">
                  <span
                    className={`z-10 grid h-7 w-7 shrink-0 place-items-center rounded-[8px] border transition-colors duration-500 ${
                      running
                        ? "border-accent bg-accent-dim text-accent-ink"
                        : done
                          ? "border-accent/40 bg-accent/10 text-accent-ink"
                          : "border-line bg-elevated text-faint"
                    }`}
                  >
                    {done ? (
                      <Check weight="bold" size={13} />
                    ) : (
                      <span className="font-mono text-[11px]">{i + 1}</span>
                    )}
                  </span>
                  {!last && (
                    <span className="relative mt-1 w-px flex-1 overflow-hidden bg-line">
                      <motion.span
                        className="absolute inset-0 origin-top bg-accent/60"
                        initial={false}
                        animate={{ scaleY: done ? 1 : running ? 1 : 0 }}
                        transition={{
                          duration: running ? 1.1 : 0.4,
                          ease: "linear",
                        }}
                      />
                    </span>
                  )}
                </div>

                {/* label */}
                <div className="min-w-0 flex-1 self-center py-1">
                  <span
                    className={`block font-mono text-[13px] tracking-tight transition-colors duration-300 ${
                      running || done ? "text-ink" : "text-dim"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-faint">
                    {s.detail}
                  </span>
                </div>

                {/* status */}
                <div className="flex shrink-0 items-center self-center">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-[5px] border px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                      done
                        ? "border-accent/30 bg-accent/5 text-accent-ink"
                        : running
                          ? "border-accent/40 bg-accent-dim text-accent-ink"
                          : "border-line bg-elevated text-faint"
                    }`}
                  >
                    {running && (
                      <motion.span
                        className="h-1 w-1 rounded-full bg-accent"
                        animate={reduce ? {} : { opacity: [1, 0.25, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden
                      />
                    )}
                    {done ? "done" : running ? "run" : "queued"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer: input -> output + progress */}
      <div className="border-t border-line px-4 py-3">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="text-faint">
            in <span className="text-dim">·</span> brief
          </span>
          <span className="text-accent-ink">
            out <span className="text-dim">·</span> on-brand asset
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

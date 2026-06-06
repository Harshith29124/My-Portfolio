import Reveal from "./Reveal";

const facts = [
  { k: "Now", v: "AI Workflow Engineer" },
  { k: "Studying", v: "CSE, final semester" },
  { k: "Building since", v: "2022" },
];

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-28 md:py-40">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Portrait + facts */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="group elev relative aspect-square w-full max-w-xs overflow-hidden rounded-[var(--radius-lg)] border border-line bg-elevated">
              <img
                src="/profile.jpg"
                alt="Harshith Nayaka L"
                width={800}
                height={800}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(198,255,58,0.10), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint mix-blend-difference">
                harshith
              </div>
            </div>

            <dl className="mt-6 max-w-xs space-y-px">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between border-t border-line py-3"
                >
                  <dt className="font-mono text-[12px] uppercase tracking-wider text-faint">
                    {f.k}
                  </dt>
                  <dd className="text-sm text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.08}>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-dim px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Open to select freelance projects
            </span>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
              About
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-dim md:text-lg">
              <p>
                I'm Harshith. I'm in the final semester of a Computer Science
                degree, and I spend my working days as an AI Workflow Engineer
                building production AI pipelines.
              </p>
              <p>
                I've been building with code since 2022. That isn't years of
                production ML, and I won't pretend it is. It's a few years of
                actually shipping things, breaking them, and learning what
                reliable looks like up close.
              </p>
              <p>
                What I care about is the unglamorous part: making AI systems
                behave the same way on the hundredth run as the first. That gap,
                between a demo and something a business can lean on, is most of
                the job, and it's the part I'm good at.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";
import { EMAIL, LINKEDIN, GITHUB } from "../data/projects";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const socials = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "GitHub", href: GITHUB },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-28 border-t border-line bg-surface/40"
    >
      <div className="shell relative py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Have a manual process that should be a reliable system? Tell me about
            it.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dim md:text-lg">
            The clearest way to reach me is email. Send a couple of lines about
            the problem and I'll tell you honestly whether I'm the right person
            to build it.
          </p>

          <div className="glass-card mt-10 w-full max-w-2xl rounded-[var(--radius-lg)] p-5 sm:p-7 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Magnetic className="inline-block w-full sm:w-auto">
                <a
                  href={`mailto:${EMAIL}?subject=Project%20enquiry`}
                  className="btn-accent group inline-flex w-full items-center justify-center gap-2.5 rounded-full py-3 pl-5 pr-3 text-sm font-semibold sm:w-auto sm:justify-start sm:py-2.5"
                >
                  Get in touch
                  <span className="cta-icon">
                    <EnvelopeSimple weight="bold" size={14} />
                  </span>
                </a>
              </Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="min-w-0 break-all font-mono text-sm font-medium text-dim transition-colors hover:text-accent-ink sm:break-normal"
              >
                {EMAIL}
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-dim transition-colors hover:text-accent-ink"
                >
                  {s.label}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

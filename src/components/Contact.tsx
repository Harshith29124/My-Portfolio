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
      <div className="shell relative py-24 md:py-36">
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

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic className="inline-block">
              <a
                href={`mailto:${EMAIL}?subject=Project%20enquiry`}
                className="btn-accent group inline-flex items-center gap-2.5 rounded-full py-2.5 pl-5 pr-2.5 text-sm font-semibold"
              >
                Get in touch
                <span className="cta-icon">
                  <EnvelopeSimple weight="bold" size={14} />
                </span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-sm font-medium text-dim transition-colors hover:text-accent-ink"
            >
              {EMAIL}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-8">
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
        </Reveal>
      </div>
    </section>
  );
}

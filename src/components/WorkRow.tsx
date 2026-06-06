import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "../data/projects";
import NodeGlyph from "./NodeGlyph";

/**
 * Editorial work row. Each project reads as a full-width index entry — title,
 * outcome, tags — rather than a boxed card. A left accent bar grows on hover
 * and the whole row is a tap target into the case study (touch + mouse).
 */
export default function WorkRow({ project }: { project: Project }) {
  const { title, kicker, outcome, tags, links, hasCaseStudy, status, slug } = project;
  const inProgress = status === "in-progress";

  return (
    <article className="group relative border-t border-line">
      {hasCaseStudy && (
        <Link
          to={`/work/${slug}`}
          aria-label={`Open ${title} case study`}
          className="absolute inset-0 z-0"
          tabIndex={-1}
        />
      )}

      {/* left accent bar grows on hover/active */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-y-100 group-focus-within:scale-y-100"
      />

      <div className="pointer-events-none relative grid gap-6 py-9 pl-5 transition-[padding] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:pl-7 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:py-11">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              {kicker}
            </span>
            {inProgress && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                In progress
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-[1.7rem] font-semibold leading-[1.1] tracking-tight text-ink transition-colors duration-300 group-hover:text-accent-ink md:text-4xl">
            {title}
          </h3>

          <p className="mt-3 max-w-xl text-pretty leading-relaxed text-dim md:text-lg">
            {outcome}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-[6px] border border-line px-2.5 py-0.5 font-mono text-[11px] text-faint"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* right rail: motif + actions */}
        <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-end">
          <NodeGlyph
            seed={slug}
            className="text-faint transition-colors duration-500 group-hover:text-accent-ink"
          />
          <div className="pointer-events-auto relative z-10 flex items-center gap-5">
            {links.map((l) => (
              <a
                key={l.href + l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-dim transition-colors hover:text-ink"
              >
                {l.label}
                <ArrowUpRight size={14} weight="bold" />
              </a>
            ))}
            {hasCaseStudy && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
                {inProgress ? "Preview" : "Case study"}
                <ArrowRight
                  weight="bold"
                  size={15}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import type { Project } from "../data/projects";
import { useTilt } from "../lib/useTilt";
import NodeGlyph from "./NodeGlyph";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-faint"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function WorkCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { title, kicker, outcome, tags, links, hasCaseStudy, status, slug } = project;
  const { ref, onMouseMove, onMouseLeave, rotateX, rotateY } = useTilt(6);

  return (
    <article className="group relative h-full [perspective:1100px]">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="bezel-shell spotlight elev h-full"
      >
        <div
          className={`bezel-core flex h-full flex-col p-6 md:p-7 ${featured ? "md:p-9" : ""}`}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              {kicker}
            </span>
            <div className="flex items-center gap-3">
              {status === "in-progress" && (
                <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  <span className="h-1.5 w-1.5 rounded-[1.5px] bg-accent" aria-hidden />
                  In progress
                </span>
              )}
              <NodeGlyph
                seed={slug}
                className="text-faint transition-colors duration-500 group-hover:text-dim"
              />
            </div>
          </div>

          <h3
            className={`font-semibold tracking-tight text-ink ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-3 max-w-2xl text-pretty leading-relaxed text-dim ${
              featured ? "text-base md:text-lg" : "text-[15px]"
            }`}
          >
            {outcome}
          </p>

          <div className="mt-6">
            <Tags tags={tags} />
          </div>

          <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6">
            {hasCaseStudy && (
              <Link
                to={`/work/${slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink transition-colors hover:text-ink"
              >
                {status === "in-progress" ? "Preview the build" : "Read the case study"}
                <ArrowRight
                  weight="bold"
                  size={15}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                />
              </Link>
            )}
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
          </div>
        </div>
      </motion.div>

      {/* full-card affordance for internal case studies */}
      {hasCaseStudy && (
        <Link
          to={`/work/${slug}`}
          aria-label={`Open ${title} case study`}
          className="absolute inset-0 z-0 rounded-xl"
          tabIndex={-1}
        />
      )}
    </article>
  );
}

import type { ReactNode } from "react";

/** Stacked heading (no split-header, no eyebrow by default). */
export default function SectionHeading({
  title,
  intro,
  id,
}: {
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="max-w-2xl scroll-mt-24">
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-dim md:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}

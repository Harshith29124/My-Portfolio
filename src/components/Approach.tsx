import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statement =
  "Most AI demos work once. The hard part is the hundredth run: the malformed response, the model that drifts, the edge case nobody tested. I build for that run. Validation at every boundary, gates that catch drift, and failures that save their work instead of losing it.";

export default function Approach() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const words = statement.split(" ");

  useGSAP(
    () => {
      if (reduce || !ref.current) return;
      const wordEls = gsap.utils.toArray<HTMLElement>(".approach-word");
      const mm = gsap.matchMedia();

      // Desktop: cinematic pinned scrub through the statement.
      mm.add("(min-width: 768px)", () => {
        gsap.set(wordEls, { opacity: 0.16 });
        gsap.to(wordEls, {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6,
          },
        });
      });

      // Mobile: no pin (avoids janky voids) — words simply brighten as the
      // block passes through the viewport.
      mm.add("(max-width: 767px)", () => {
        gsap.set(wordEls, { opacity: 0.2 });
        gsap.to(wordEls, {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-surface/30">
      <div className="shell relative flex min-h-[56vh] max-w-4xl flex-col justify-center py-24 md:min-h-[70vh] md:py-40">
        <h2 className="sr-only">How I think about reliability</h2>
        <p className="text-balance text-2xl font-medium leading-[1.35] tracking-tight md:text-[2.6rem] md:leading-[1.3]">
          {words.map((w, i) => (
            <span key={i} className="approach-word mr-[0.28em] inline-block">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

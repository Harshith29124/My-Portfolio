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
      // No pin (a pinned scrub reserves ~1.3 viewports of empty scroll). The
      // words simply brighten as the section passes through the viewport.
      gsap.set(wordEls, { opacity: 0.18 });
      gsap.to(wordEls, {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-surface/30">
      <div className="shell relative flex max-w-4xl flex-col justify-center py-24 md:py-32">
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

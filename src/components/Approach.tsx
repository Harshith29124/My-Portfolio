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
      gsap.set(wordEls, { opacity: 0.14 });
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
    },
    { scope: ref, dependencies: [reduce] },
  );

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(0,212,170,0.06), transparent 70%)",
        }}
      />
      <div className="shell relative flex min-h-[70vh] max-w-4xl flex-col justify-center py-28 md:py-40">
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

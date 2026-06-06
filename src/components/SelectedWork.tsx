import { projects } from "../data/projects";
import WorkCard from "./WorkCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function SelectedWork() {
  const [flagship, ...rest] = projects;

  return (
    <section className="shell scroll-mt-24 py-28 md:py-40" aria-labelledby="work-heading">
      <Reveal>
        <SectionHeading
          id="work"
          title={<span id="work-heading">Selected work</span>}
          intro="A few systems worth showing. Each one is about an outcome, less manual work, faster operations, output you can rely on, not a list of features."
        />
      </Reveal>

      <div className="mt-12 flex flex-col gap-5 md:mt-16">
        <Reveal>
          <WorkCard project={flagship} featured />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <WorkCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

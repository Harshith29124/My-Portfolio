import Hero from "../components/Hero";
import TechMarquee from "../components/TechMarquee";
import SelectedWork from "../components/SelectedWork";
import Capabilities from "../components/Capabilities";
import Approach from "../components/Approach";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <SelectedWork />
      <Capabilities />
      <Approach />
      <About />
      <Contact />
    </>
  );
}

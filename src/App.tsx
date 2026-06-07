import { Suspense, lazy, useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";

gsap.registerPlugin(ScrollTrigger);

// Case study lives behind a route the landing page never needs up front, so it
// is code-split — the initial bundle stays lean and the homepage paints sooner.
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Legal = lazy(() => import("./pages/Legal"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) return; // let in-page anchors handle themselves
    lenis?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname, hash, lenis]);
  return null;
}

// Pages glide in/out as a unit, so route changes feel like a deliberate
// transition rather than a hard cut. Transform + opacity only (GPU-composited,
// no filter animation) so it stays smooth.
const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
};

function Page({ children }: { children: React.ReactNode }) {
  return <motion.div {...pageMotion}>{children}</motion.div>;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname.split("/")[1] || "home"}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route
          path="/work/:slug"
          element={
            <Page>
              <Suspense fallback={<div className="min-h-[60vh]" />}>
                <CaseStudy />
              </Suspense>
            </Page>
          }
        />
        <Route
          path="/legal/:doc"
          element={
            <Page>
              <Suspense fallback={<div className="min-h-[60vh]" />}>
                <Legal />
              </Suspense>
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const lenisRef = useRef<LenisRef>(null);

  // Unify Lenis + GSAP under a single rAF loop and feed scroll into
  // ScrollTrigger. Without this the pinned/scrubbed sections desync from the
  // smooth scroll and stutter — this is what makes the motion buttery.
  useEffect(() => {
    function onFrame(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onFrame);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.12, smoothWheel: true, autoRaf: false }}
    >
      <ScrollManager />
      <ScrollProgress />
      <Nav />
      <main id="top" className="w-full max-w-full overflow-x-hidden">
        <AnimatedRoutes />
      </main>
      <Footer />
    </ReactLenis>
  );
}

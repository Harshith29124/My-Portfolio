import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";

// Case study lives behind a route the landing page never needs up front, so it
// is code-split — the initial bundle stays lean and the homepage paints sooner.
const CaseStudy = lazy(() => import("./pages/CaseStudy"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) return; // let in-page anchors handle themselves
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, hash, lenis]);
  return null;
}

// Pages glide in/out as a unit, so route changes feel like a deliberate
// transition rather than a hard cut. Transform + opacity only (GPU-cheap).
const pageMotion = {
  initial: { opacity: 0, y: 10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
  transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const },
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}>
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

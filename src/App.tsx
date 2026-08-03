import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";

// Case study + legal live behind routes the landing page never needs up front,
// so they are code-split — the initial bundle stays lean.
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Legal = lazy(() => import("./pages/Legal"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let in-page anchors handle themselves
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

// Pages glide in/out as a unit. Transform + opacity only.
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
  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <Nav />
      <main id="top" className="w-full max-w-full overflow-x-hidden">
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
}

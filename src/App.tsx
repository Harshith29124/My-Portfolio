import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let in-page anchors handle themselves
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <Nav />
      <main id="top" className="w-full max-w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

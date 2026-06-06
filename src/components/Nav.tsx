import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  // Toggle the nav background once the page has scrolled past the top.
  // IntersectionObserver on a sentinel avoids a per-frame scroll listener.
  useEffect(() => {
    const sentinel = document.createElement("div");
    Object.assign(sentinel.style, {
      position: "absolute",
      top: "12px",
      left: "0",
      height: "1px",
      width: "1px",
      pointerEvents: "none",
    });
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  const goTo = useCallback(
    (id: string) => {
      // Drive the scroll through Lenis so it shares the same eased, rAF-synced
      // motion as the rest of the page (no jarring native jump).
      const scroll = () =>
        lenis?.scrollTo(id === "top" ? 0 : `#${id}`, {
          offset: id === "top" ? 0 : -80,
        });
      if (pathname === "/") {
        scroll();
      } else {
        navigate("/");
        // wait for home to mount before scrolling
        window.setTimeout(scroll, 120);
      }
    },
    [pathname, navigate, lenis],
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between">
        <Link
          to="/"
          onClick={() => pathname === "/" && goTo("top")}
          className="group flex items-center gap-2 font-mono text-sm tracking-tight text-ink"
          aria-label="Harshith, home"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-[4px] bg-accent transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="font-medium">harshith</span>
          <span className="text-faint">/ ai engineer</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className="group relative rounded px-3 py-2 font-mono text-[13px] text-dim transition-colors hover:text-ink"
            >
              {s.label}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100 group-active:scale-x-100"
              />
            </button>
          ))}
          <span className="ml-1 hidden h-5 w-px bg-line sm:inline-block" aria-hidden />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

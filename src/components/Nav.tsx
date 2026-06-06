import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const [active, setActive] = useState("");

  // Track which section is in view to light the matching nav link.
  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }
    const ids = sections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const goTo = useCallback(
    (id: string) => {
      const scroll = () =>
        lenis?.scrollTo(id === "top" ? 0 : `#${id}`, {
          offset: id === "top" ? 0 : -90,
        });
      if (pathname === "/") scroll();
      else {
        navigate("/");
        window.setTimeout(scroll, 120);
      }
    },
    [pathname, navigate, lenis],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <nav
        className="flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border border-line bg-canvas/70 py-2 pl-4 pr-2 backdrop-blur-xl"
        style={{
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 12px 40px -20px rgba(0,0,0,0.6)",
        }}
      >
        <Link
          to="/"
          onClick={() => pathname === "/" && goTo("top")}
          className="group flex shrink-0 items-center gap-2 font-mono text-sm tracking-tight text-ink"
          aria-label="Harshith, home"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-[3px] bg-accent transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="hidden font-medium sm:inline">harshith</span>
        </Link>

        <div className="flex items-center gap-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className={`relative rounded-full px-2.5 py-1.5 font-mono text-[12px] transition-colors duration-300 sm:px-3 ${
                s.id === "capabilities" ? "hidden md:inline-block" : ""
              } ${active === s.id ? "text-ink" : "text-faint hover:text-ink"}`}
              style={{ touchAction: "manipulation" }}
            >
              {active === s.id && (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-accent-dim"
                />
              )}
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <span className="hidden h-5 w-px bg-line sm:inline-block" aria-hidden />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

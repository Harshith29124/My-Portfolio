/**
 * Native smooth scroll to a section (or top). Sections carry `scroll-mt-*` so
 * the fixed-nav offset is handled by CSS. No scroll library — native scrolling
 * is reliable on every device and never hijacks the mouse wheel.
 */
export function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

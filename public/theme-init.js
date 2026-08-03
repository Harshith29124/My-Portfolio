// Set theme before first paint (no flash). Stored choice wins, otherwise
// follow the OS preference. External file (not inline) so it's covered by a
// strict script-src 'self' CSP with no per-script hash to maintain.
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (!t)
      t = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    if (t === "dark") document.documentElement.classList.add("dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();

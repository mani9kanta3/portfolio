"use client";

import { useEffect, useState } from "react";

/**
 * Reads the theme the inline script in layout.tsx already applied, so the
 * button label matches what is on screen from the first render.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode or blocked storage — the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      className="label border-2 border-edge px-3 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {/* Render a stable placeholder until mounted so SSR and client agree. */}
      <span className={ready ? "" : "invisible"}>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-divider bg-bg">
      <div className="flex items-center gap-6 px-5 py-4 md:gap-12 md:px-14 md:py-[22px]">
        <Link
          href="/"
          className="flex items-baseline gap-1 text-xl font-extrabold tracking-[-0.02em] text-ink"
        >
          manikanta
          <span className="text-2xl leading-[0.6] text-accent">.</span>
        </Link>

        <nav className="hidden gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label font-semibold tracking-[0.12em] text-ink transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <a
          href="mailto:pudimanikanta3@gmail.com"
          className="hidden text-label font-semibold tracking-[0.08em] text-muted transition-colors hover:text-accent xl:inline"
        >
          pudimanikanta3@gmail.com
        </a>

        <ThemeToggle />

        <Link
          href="/#contact"
          className="label hidden bg-accent px-5 py-[13px] text-on-accent transition-colors hover:bg-accent-hover sm:inline-block"
        >
          Get in touch
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="label border-2 border-edge px-3 py-2 text-ink lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t-2 border-edge lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="label block border-b border-edge px-5 py-4 text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="label block px-5 py-4 text-accent"
          >
            Get in touch
          </Link>
        </nav>
      )}
    </header>
  );
}

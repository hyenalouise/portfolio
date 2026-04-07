"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";

const NAV = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-ink/6" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="font-black text-sm text-ink tracking-tight hover:text-red transition-colors">
          ILM<span className="text-red">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map(({ label, href }) => (
            <a key={label} href={href}
              className="px-4 py-2 rounded-full text-sm font-medium text-muted hover:text-ink hover:bg-ink/5 transition-all duration-200">
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href={`mailto:${PERSONAL_INFO.email}`}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow text-ink text-xs font-bold hover:bg-red hover:text-white transition-all duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green" />
          Hire me
        </a>

        {/* Mobile */}
        <button type="button" onClick={() => setOpen(v => !v)} aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-ink hover:bg-ink/5">
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-ink/8 px-6 pb-5 pt-3">
          <nav className="flex flex-col gap-1">
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-ink">
                {label}
              </a>
            ))}
            <a href={`mailto:${PERSONAL_INFO.email}`} onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl bg-yellow text-ink text-sm font-bold text-center hover:bg-red hover:text-white transition-colors">
              Hire me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

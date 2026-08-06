
"use client";

import Link from "next/link";
import { useState } from "react";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-black sm:px-8 lg:px-16">
      <Link href="/" onClick={closeMenu} className="flex items-center gap-3" aria-label="Jocomfy International School home">
        <span className="grid size-10 place-items-center rounded-full border-2 border-[#f2c500] font-[Manrope] text-xl font-extrabold text-[#f2c500]">
          J
        </span>
        <span className="grid gap-1 leading-none">
          <strong className="font-[Manrope] text-sm font-extrabold uppercase tracking-wider">Jocomfy</strong>
          <span className="text-[10px] uppercase tracking-[0.14em] text-black/70">International School</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex" aria-label="Main navigation">
        {navigationLinks.map((link) => (
          <Link key={link.href} href={link.href} className="transition-colors hover:text-[#17186b]">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link href="#admissions" className="hidden min-h-12 items-center justify-center bg-[#f2c500] px-6 text-sm font-bold text-[#0d104c] transition-transform hover:-translate-y-0.5 sm:inline-flex">
          Apply Now
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="grid size-12 place-items-center bg-[#f2c500] lg:hidden"
        >
          <span className="grid w-5 gap-1">
            <span className="h-0.5 bg-[#0d104c]" />
            <span className="h-0.5 bg-[#0d104c]" />
            <span className="h-0.5 bg-[#0d104c]" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute inset-x-5 top-20 grid gap-1 bg-white p-4 text-[#0d104c] shadow-2xl lg:hidden" aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className="px-3 py-4 font-semibold">
              {link.label}
            </Link>
          ))}
          <Link href="#admissions" onClick={closeMenu} className="mt-2 flex min-h-12 items-center justify-center bg-[#f2c500] font-bold">
            Apply Now
          </Link>
        </nav>
      )}
    </header>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { UserCircle, Menu, X } from "lucide-react";

const navigationLinks = [
  { label: "About", href: "/#about" },
  { label: "Academics", href: "/#academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-black sm:px-8 lg:px-16">
      {/* 1. Logo */}
      <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border-2 border-[#f2c500] font-[Manrope] text-xl font-extrabold text-[#f2c500]">J</span>
        <span className="grid gap-1 leading-none">
          <strong className="font-[Manrope] text-sm font-extrabold uppercase tracking-wider text-black">Jocomfy</strong>
          <span className="text-[10px] uppercase tracking-[0.14em] text-black/70">International School</span>
        </span>
      </Link>

      {/* 2. Desktop Navigation */}
      <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
        {navigationLinks.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-[#17186b]">{l.label}</Link>
        ))}
      </nav>

      {/* 3. Action Buttons Group */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Parent Portal Link */}
        <Link 
          href="/portal/login" 
          className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#001f54] hover:text-[#facc15] transition-colors"
        >
          <UserCircle size={18} />
          Parent Portal
        </Link>
        
        {/* The "Agency Style" Apply Now Button */}
        <Link 
          href="/admissions" 
          className="hidden sm:flex bg-[#facc15] px-6 py-2 text-xs font-black uppercase tracking-widest text-[#001f54] shadow-[4px_4px_0px_0px_#001f54] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          Apply Now
        </Link>

        {/* Mobile Toggle (Inside the same group) */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center bg-[#f2c500] lg:hidden">
          {menuOpen ? <X size={20} className="text-[#0d104c]" /> : <Menu size={20} className="text-[#0d104c]" />}
        </button>
      </div>

      {/* 4. Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="absolute inset-x-5 top-20 grid gap-1 bg-white p-4 text-[#0d104c] shadow-2xl lg:hidden border-2 border-[#001f54]">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className="px-3 py-4 font-black uppercase text-xs tracking-widest border-b border-gray-50">
              {link.label}
            </Link>
          ))}
          <Link href="/portal/login" onClick={closeMenu} className="px-3 py-4 font-black uppercase text-xs tracking-widest text-blue-600 flex items-center gap-2">
            <UserCircle size={16} /> Parent Portal
          </Link>
          <Link href="/admissions" onClick={closeMenu} className="mt-4 flex min-h-12 items-center justify-center bg-[#f2c500] font-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_#001f54]">
            Apply Now
          </Link>
        </nav>
      )}
    </header>
  );
}
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, GraduationCap, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/portal", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { href: "/portal/finance", icon: <Wallet size={20} />, label: "Finance" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fffdf7] text-[#001f54]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#001f54] text-white flex-col p-6 fixed h-full z-50">
        <div className="mb-12 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#facc15]" />
          <span className="font-black text-xl tracking-tighter italic uppercase">Jocomfy OS</span>
        </div>
        <nav className="space-y-2 flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`flex items-center gap-4 p-4 transition-all font-bold text-xs uppercase tracking-widest ${pathname === link.href ? 'bg-[#facc15] text-[#001f54]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="flex items-center gap-4 p-4 text-red-400 font-bold text-xs uppercase tracking-widest"><LogOut size={20}/> Exit</Link>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full bg-[#001f54] text-white p-4 z-[60] flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#facc15]" />
            <span className="font-black italic text-sm uppercase">Jocomfy OS</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#001f54] z-50 flex flex-col p-20 space-y-8 animate-in fade-in zoom-in duration-200">
           {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-4xl font-black text-white uppercase italic">{link.label}</Link>
          ))}
           <Link href="/" className="text-2xl font-black text-red-500 uppercase italic">Logout</Link>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 mt-16 md:mt-0 p-4 md:p-12 transition-all">
        {children}
      </main>
    </div>
  );
}
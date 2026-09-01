"use client";

import {
  GraduationCap,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  {
    href: "/portal",
    icon: LayoutDashboard,
    label: "Overview",
  },
  {
    href: "/portal/academics",
    icon: GraduationCap,
    label: "Academics",
  },
  {
    href: "/portal/finance",
    icon: Wallet,
    label: "Finance",
  },
  {
    href: "/portal/password",
    icon: KeyRound,
    label: "Password",
  },
];

export default function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isLoginPage =
    pathname === "/portal/login";

  const isPasswordPage =
    pathname === "/portal/password";

  useEffect(() => {
    if (
      !isLoginPage &&
      !isLoading &&
      !user
    ) {
      router.replace("/portal/login");
      return;
    }

    if (
      !isLoading &&
      user?.mustChangePassword &&
      !isPasswordPage
    ) {
      router.replace("/portal/password");
    }
  }, [
    isLoading,
    isLoginPage,
    isPasswordPage,
    router,
    user,
  ]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#001f54] p-6 text-sm font-black uppercase tracking-widest text-white">
        Verifying student session…
      </main>
    );
  }

  if (
    user.mustChangePassword &&
    !isPasswordPage
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#001f54] p-6 text-center text-sm font-black uppercase tracking-widest text-white">
        Preparing secure password update…
      </main>
    );
  }

  if (
    isPasswordPage &&
    user.mustChangePassword
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#fffdf7] text-[#001f54]">
      <aside className="fixed z-50 hidden h-full w-64 flex-col bg-[#001f54] p-6 text-white md:flex">
        <div className="mb-12 flex items-center gap-3">
          <div className="h-8 w-8 bg-[#facc15]" />

          <span className="text-xl font-black uppercase italic tracking-tighter">
            Jocomfy OS
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active =
              pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 p-4 text-xs font-bold uppercase tracking-widest transition-all ${
                  active
                    ? "bg-[#facc15] text-[#001f54]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="flex items-center gap-4 p-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white"
        >
          <Home size={20} />
          School website
        </Link>

        <button
          type="button"
          onClick={() => void logout()}
          className="flex items-center gap-4 p-4 text-left text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
        >
          <LogOut size={20} />
          Sign out
        </button>
      </aside>

      <header className="fixed top-0 z-[60] flex w-full items-center justify-between bg-[#001f54] p-4 text-white shadow-xl md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-[#facc15]" />

          <span className="text-sm font-black uppercase italic">
            Jocomfy OS
          </span>
        </div>

        <button
          type="button"
          aria-label={
            isOpen
              ? "Close navigation"
              : "Open navigation"
          }
          onClick={() =>
            setIsOpen((current) => !current)
          }
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col space-y-8 bg-[#001f54] p-20 pt-28 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black uppercase italic text-white"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-xl font-black uppercase text-white/70"
          >
            School website
          </Link>

          <button
            type="button"
            onClick={() => void logout()}
            className="text-left text-xl font-black uppercase text-red-400"
          >
            Sign out
          </button>
        </div>
      )}

      <main className="mt-16 flex-1 p-4 transition-all md:ml-64 md:mt-0 md:p-12">
        {children}
      </main>
    </div>
  );
}

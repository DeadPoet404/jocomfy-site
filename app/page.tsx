"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";


const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf7] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-black sm:px-8 lg:px-16">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
          aria-label="Jocomfy International School home"
        >
          <span className="grid size-10 place-items-center rounded-full border-2 border-[#f2c500] font-[Manrope] text-xl font-extrabold text-[#f2c500]">
            J
          </span>

          <span className="grid gap-1 leading-none">
            <strong className="font-[Manrope] text-sm font-extrabold uppercase tracking-wider">
              Jocomfy
            </strong>

            <span className="text-[10px] uppercase tracking-[0.14em] text-black/70">
              International School
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-semibold lg:flex"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#17186b]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#admissions"
            className="hidden min-h-12 items-center justify-center bg-[#f2c500] px-6 text-sm font-bold text-[#0d104c] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
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
          <nav
            className="absolute inset-x-5 top-20 grid gap-1 bg-white p-4 text-[#0d104c] shadow-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="px-3 py-4 font-semibold"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="#admissions"
              onClick={closeMenu}
              className="mt-2 flex min-h-12 items-center justify-center bg-[#f2c500] font-bold"
            >
              Apply Now
            </Link>
          </nav>
        )}
      </header>

      <section className="relative isolate grid min-h-[700px] h-svh max-h-[960px] place-items-center overflow-hidden text-center sm:min-h-[760px]">
        <div
          className="absolute inset-0 -z-10 bg-[url('/background-hero.webp')] bg-cover bg-center bg-no-repeat"
          aria-hidden="true"
        />

        <div className="w-[92%] max-w-5xl pt-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#f2c500]">
            Knowledge &amp; Wisdom
          </p>

          <h1 className="font-[Manrope] text-[clamp(4rem,10vw,8.75rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-[#f2c500]">
            Curious minds.
            <br />
            Confident futures.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-black sm:text-lg">
            A bright and welcoming learning community where every child is
            encouraged to learn, create, lead, and grow.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#about"
              className="inline-flex min-h-12 items-center justify-center bg-[#f2c500] px-6 text-sm font-bold text-[#0d104c] transition-transform hover:-translate-y-0.5"
            >
              Discover Jocomfy
            </Link>

            <Link
              href="#admissions"
              className="inline-flex min-h-12 items-center justify-center border border-black px-6 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              Book a Visit
            </Link>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-7 grid justify-items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-black"
          aria-label="Explore Jocomfy"
        >
          <span>Explore</span>
          <span className="text-3xl leading-none text-[#f2c500]">↓</span>
        </a>
      </section>

      <section
        id="about"
        className="bg-[#fffdf7] px-5 pb-0 pt-24 sm:px-8 sm:pb-0 sm:pt-32 lg:px-16"
      >
        <div className="mx-0 grid max-w-[1320px] grid-cols-1 gap-20 lg:ml-8 lg:grid-cols-[34%_minmax(0,680px)] lg:gap-[18%]">
          <div className="max-w-none">
            <p className="max-w-none text-base leading-7 text-black sm:text-lg sm:leading-8">
              At Jocomfy International School, every child is encouraged to
              explore their potential, develop strong foundations, and grow
              into a confident learner. We create a warm and purposeful
              environment where children feel known, supported, and inspired
              to take on new challenges.
              
            </p>

            <Link
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#0d104c] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              About Jocomfy
            </Link>
          </div>

          <h2 className="font-[Poppins] text-[clamp(3rem,5.8vw,5.375rem)] font-normal leading-none tracking-[-0.065em] text-black">
            A strong beginning
            <br />
            for every future.
          </h2>
        </div>
      </section>
          <section
        className="bg-[#fffdf7] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-0 lg:px-16"
        aria-label="Jocomfy school life"
      >
        <div className="relative mt-16 mx-0 grid max-w-[1320px] grid-cols-1 items-end gap-5 md:ml-[18%] md:grid-cols-3">
          <Card className="school-life-cards h-72 overflow-hidden rounded-3xl border-0 bg-transparent p-0 shadow-none sm:h-64">
            <div className="flex h-full w-full items-center justify-center bg-[#d5d5d5] text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#17186b]/70">
                Image placeholder
              </span>
            </div>
          </Card>

          <Card className="school-life-cards h-56 overflow-hidden rounded-3xl border-0 bg-transparent p-0 shadow-none sm:h-80">
            <div className="flex h-full w-full items-center justify-center bg-[#c9c9c9] text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#17186b]/70">
                Image placeholder
              </span>
            </div>
          </Card>

          <Card className="school-life-cards h-96 overflow-hidden rounded-3xl border-0 bg-transparent p-0 shadow-none sm:h-[30rem]">
            <div className="flex h-full w-full items-center justify-center bg-[#bdbdbd] text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#17186b]/70">
                Image placeholder
              </span>
            </div>
          </Card>
        </div>
      
        <div className="mx-5 mt-10 h-px bg-black sm:mx-8 lg:mx-16" />
</section>


</main>
  );
}

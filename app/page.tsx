"use client";

import Link from "next/link";
import { useState } from "react";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} image placeholder`}
      className={`flex items-center justify-center bg-[#d1d1d1] bg-[repeating-linear-gradient(45deg,#d1d1d1,#d1d1d1_14px,#c3c3c3_14px,#c3c3c3_28px)] text-center ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#17186b]/65">
        Image placeholder
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17186b]">
      {children}
    </p>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf7] text-[#111111]">
      {/* Header */}
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

      {/* Hero — preserved */}
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

      {/* Introduction */}
      <section
        id="about"
        className="bg-[#fffdf7] px-5 pb-0 pt-24 sm:px-8 sm:pt-32 lg:px-16"
      >
        <div className="mx-0 grid max-w-[1320px] grid-cols-1 gap-20 lg:ml-8 lg:grid-cols-[34%_minmax(0,680px)] lg:gap-[18%]">
          <div>
            <p className="text-base leading-7 text-black sm:text-lg sm:leading-8">
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

      {/* Image rhythm */}
      <section
        className="bg-[#fffdf7] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-0 lg:px-16"
        aria-label="Jocomfy school life"
      >
        <div className="relative mt-16 mx-0 grid max-w-[1320px] grid-cols-1 items-end gap-5 md:ml-[18%] md:grid-cols-3">
          <ImagePlaceholder
            label="School community"
            className="h-72 rounded-3xl sm:h-64"
          />

          <ImagePlaceholder
            label="Learning together"
            className="h-56 rounded-3xl sm:h-80"
          />

          <ImagePlaceholder
            label="Jocomfy school life"
            className="h-96 rounded-3xl sm:h-[30rem]"
          />
        </div>

        <div className="mx-5 mt-10 h-px bg-black sm:mx-8 lg:mx-16" />
      </section>

      {/* Academic overview */}
      <section
        id="academics"
        className="bg-[#fffdf7] px-5 py-28 sm:px-8 sm:py-36 lg:px-16"
      >
        <div className="mx-0 grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(480px,560px)] lg:gap-10">
          <h2 className="font-[Poppins] text-[clamp(2.75rem,3.8vw,4.75rem)] font-normal leading-[0.94] tracking-[-0.075em] text-black">
            A learning journey
            <br />
            for every stage.
          </h2>

          <div className="w-full max-w-[560px] justify-self-end pt-2 lg:pt-8">
            <p className="text-sm leading-6 text-black sm:text-base sm:leading-7">
              From first steps to bold new beginnings, Jocomfy helps every
              learner grow with confidence through caring guidance, meaningful
              learning, strong relationships, and a community that encourages
              children to discover their strengths.
            </p>

            <Link
              href="#contact"
              className="mt-9 inline-flex min-h-12 items-center justify-center bg-black px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Explore academics
            </Link>
          </div>
        </div>
      </section>

      {/* Academic stages */}
      <section className="bg-[#eaf8ff] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <SectionLabel>Academic pathways</SectionLabel>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="min-h-[320px] rounded-3xl bg-[#a8cdf8] p-8">
              <span className="text-sm font-bold text-[#17186b]">01</span>
              <h3 className="mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] text-[#17186b]">
                Preschool
              </h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#17186b]">
                Curious beginnings and joyful discovery.
              </p>
            </article>

            <article className="min-h-[320px] rounded-3xl bg-[#f5eee2] p-8">
              <span className="text-sm font-bold text-[#ed4545]">02</span>
              <h3 className="mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] text-[#111111]">
                Primary
              </h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#111111]">
                Strong foundations for confident learners.
              </p>
            </article>

            <article className="min-h-[320px] rounded-3xl bg-[#0d104c] p-8 text-white">
              <span className="text-sm font-bold text-[#f2c500]">03</span>
              <h3 className="mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] text-[#f2c500]">
                Junior High
              </h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
                Independence, purpose, and leadership.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Learning approach */}
      <section
        id="learning-approach"
        className="bg-[#fffdf7] px-5 py-24 sm:px-8 sm:py-32 lg:px-8"
      >
        <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
          <div className="grid gap-4">
            <article className="min-h-[390px] rounded-3xl bg-[#0d0d0d] p-8 text-white sm:p-10">
              <SectionLabel>Our approach</SectionLabel>

              <h2 className="mt-20 max-w-sm font-[Poppins] text-4xl font-medium leading-[0.98] tracking-[-0.06em] text-[#f2c500] sm:text-5xl">
                Learning with purpose.
              </h2>

              <p className="mt-12 max-w-md text-sm leading-6 text-[#b8cef0] sm:text-base sm:leading-7">
                We give children the support, structure, and encouragement they
                need to explore ideas, build strong foundations, and become
                confident learners.
              </p>
            </article>

            <article className="min-h-[390px] rounded-3xl bg-[#a8cdf8] p-8 text-[#111111] sm:p-10">
              <SectionLabel>Student development</SectionLabel>

              <h2 className="mt-20 max-w-sm font-[Poppins] text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-5xl">
                Growing beyond the classroom.
              </h2>

              <p className="mt-12 max-w-md text-sm leading-6 sm:text-base sm:leading-7">
                Through relationships, creativity, activities, and leadership,
                every child has space to discover their strengths and find
                their voice.
              </p>
            </article>
          </div>

          <ImagePlaceholder
            label="Learning environment"
            className="min-h-[650px] rounded-3xl"
          />
        </div>
      </section>

      {/* Student life collage */}
      <section
        id="student-life"
        className="relative z-10 -mt-16 bg-[#fffdf7] px-5 py-5 sm:-mt-24 sm:px-8 sm:py-8 lg:-mt-32 lg:px-8"
      >
        <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <ImagePlaceholder
            label="Jocomfy school community"
            className="min-h-[620px] rounded-3xl"
          />

          <article className="flex min-h-[620px] flex-col justify-between rounded-3xl bg-[#f5eee2] p-8 text-[#ed4545] sm:p-12 lg:p-10">
            <div>
              <SectionLabel>Student life</SectionLabel>

              <h2 className="mt-7 max-w-lg font-[Poppins] text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-[4.2rem]">
                A community that grows together.
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-sm leading-6 sm:text-base sm:leading-7">
                Learning becomes more meaningful when children feel connected.
                Friendships, activities, creativity, and shared experiences
                help every learner feel that they belong.
              </p>

              <Link
                href="#contact"
                className="mt-8 block text-right text-4xl leading-none transition-transform hover:translate-x-2"
                aria-label="Explore student life"
              >
                →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Growth marquee */}
      <section
        id="growth"
        className="overflow-hidden bg-[#fffdf7] px-5 py-28 sm:px-8 sm:py-36 lg:px-8"
      >
        <div className="mx-auto max-w-[1450px] text-center">
          <SectionLabel>Growth at every stage</SectionLabel>

          <div className="growth-marquee" aria-label="Growth at every stage">
            <div className="growth-track growth-track-left">
              <span className="font-baloo">Curiosity</span>
              <span className="font-fredoka">Character</span>
              <span className="font-patrick">Confidence</span>
              <span className="font-lilita">Creativity</span>
              <span className="font-bubblegum">Community</span>
              <span className="font-comic">Kindness</span>
            </div>

            <div className="growth-track growth-track-right">
              <span className="font-lilita">Preschool</span>
              <span className="font-bubblegum">Primary</span>
              <span className="font-comic">Junior High</span>
              <span className="font-baloo">Explore</span>
              <span className="font-fredoka">Learn</span>
              <span className="font-patrick">Lead</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guidance */}
      <section
        id="guidance"
        className="bg-[#fffdf7] px-5 py-20 sm:px-8 sm:py-28 lg:px-8"
      >
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid min-h-[620px] grid-cols-1 overflow-visible rounded-3xl bg-[#f5eee2] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between p-8 text-[#ed4545] sm:p-12 lg:p-14">
              <div>
                <SectionLabel>Caring guidance</SectionLabel>

                <h2 className="mt-7 max-w-xl font-[Poppins] text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.07em]">
                  Helping every child find their way.
                </h2>
              </div>

              <div className="max-w-lg">
                <p className="text-sm leading-6 sm:text-base sm:leading-7">
                  Every learner deserves encouragement that feels personal.
                  Through patient guidance, thoughtful teaching, and strong
                  relationships, we help children move forward with confidence.
                </p>

                <Link
                  href="#contact"
                  className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#ed4545] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  Discover our approach
                </Link>
              </div>
            </div>

            <ImagePlaceholder
              label="Guidance and learning"
              className="min-h-[420px] rounded-3xl lg:-translate-y-16 lg:min-h-[700px]"
            />
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section
        id="admissions"
        className="bg-[#f2c500] px-5 py-20 sm:px-8 sm:py-24 lg:px-16"
      >
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d104c]">
              Start the journey
            </p>

            <h2 className="mt-5 max-w-3xl font-[Poppins] text-[clamp(2.75rem,5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.07em] text-[#0d104c]">
              Find the right beginning for your child.
            </h2>
          </div>

          <Link
            href="#contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#0d104c] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Send an enquiry
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-[#0d104c] px-5 py-14 text-white sm:px-8 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1320px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <strong className="font-[Manrope] text-lg">Jocomfy</strong>
            <p className="mt-3 text-sm text-white/65">
              Knowledge &amp; Wisdom
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f2c500]">
              Explore
            </p>
            <div className="mt-4 grid gap-2 text-sm text-white/75">
              <Link href="#about">About</Link>
              <Link href="#academics">Academics</Link>
              <Link href="#student-life">Student life</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f2c500]">
              Admissions
            </p>
            <div className="mt-4 grid gap-2 text-sm text-white/75">
              <Link href="#admissions">Apply now</Link>
              <Link href="#contact">Book a visit</Link>
              <Link href="#contact">Contact us</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f2c500]">
              Location
            </p>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Ghana
              <br />
              Contact details coming soon
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[1320px] border-t border-white/20 pt-5 text-xs text-white/50">
          © {new Date().getFullYear()} Jocomfy International School
        </div>
      </footer>
    </main>
  );
}

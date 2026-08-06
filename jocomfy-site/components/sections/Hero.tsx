
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate grid min-h-[700px] h-svh max-h-[960px] place-items-center overflow-hidden text-center sm:min-h-[760px]">
      <div className="absolute inset-0 -z-10 bg-[url('/background-hero.webp')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="w-[92%] max-w-5xl pt-16">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#f2c500]">Knowledge & Wisdom</p>
        <h1 className="font-[Manrope] text-[clamp(4rem,10vw,8.75rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-[#f2c500]">
          Curious minds.<br />Confident futures.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-black sm:text-lg">
          A bright and welcoming learning community where every child is encouraged to learn, create, lead, and grow.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="#about" className="inline-flex min-h-12 items-center justify-center bg-[#f2c500] px-6 text-sm font-bold text-[#0d104c] transition-transform hover:-translate-y-0.5">
            Discover Jocomfy
          </Link>
          <Link href="#admissions" className="inline-flex min-h-12 items-center justify-center border border-black px-6 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white">
            Book a Visit
          </Link>
        </div>
      </div>
      <a href="#about" className="absolute bottom-7 grid justify-items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-black" aria-label="Explore Jocomfy">
        <span>Explore</span>
        <span className="text-3xl leading-none text-[#f2c500]">↓</span>
      </a>
    </section>
  );
}


import Link from "next/link";

export function Academics() {
  return (
    <section id="academics" className="bg-[#fffdf7] px-5 py-28 sm:px-8 sm:py-36 lg:px-16">
      <div className="mx-0 grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(480px,560px)] lg:gap-10">
        <h2 className="font-[Poppins] text-[clamp(2.75rem,3.8vw,4.75rem)] font-normal leading-[0.94] tracking-[-0.075em] text-black">
          A learning journey<br />for every stage.
        </h2>
        <div className="w-full max-w-[560px] justify-self-end pt-2 lg:pt-8">
          <p className="text-sm leading-6 text-black sm:text-base sm:leading-7">
            From first steps to bold new beginnings, Jocomfy helps every learner grow with confidence through caring guidance, meaningful learning, strong relationships, and a community that encourages children to discover their strengths.
          </p>
          <Link href="#contact" className="mt-9 inline-flex min-h-12 items-center justify-center bg-black px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
            Explore academics
          </Link>
        </div>
      </div>
    </section>
  );
}

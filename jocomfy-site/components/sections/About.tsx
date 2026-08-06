
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="bg-[#fffdf7] px-5 pb-0 pt-24 sm:px-8 sm:pt-32 lg:px-16">
      <div className="mx-0 grid max-w-[1320px] grid-cols-1 gap-20 lg:ml-8 lg:grid-cols-[34%_minmax(0,680px)] lg:gap-[18%]">
        <div>
          <p className="text-base leading-7 text-black sm:text-lg sm:leading-8">
            At Jocomfy International School, every child is encouraged to explore their potential, develop strong foundations, and grow into a confident learner. We create a warm and purposeful environment where children feel known, supported, and inspired to take on new challenges.
          </p>
          <Link href="#contact" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#0d104c] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
            About Jocomfy
          </Link>
        </div>
        <h2 className="font-[Poppins] text-[clamp(3rem,5.8vw,5.375rem)] font-normal leading-none tracking-[-0.065em] text-black">
          A strong beginning<br />for every future.
        </h2>
      </div>
    </section>
  );
}

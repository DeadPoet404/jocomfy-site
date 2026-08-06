import Link from "next/link";
import { SectionLabel } from "../shared/SectionLabel";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
export function StudentLife() {
  return (
    <section id="student-life" className="relative z-10 -mt-16 bg-[#fffdf7] px-5 py-5 sm:-mt-24 sm:px-8 sm:py-8 lg:-mt-32 lg:px-8">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <ImagePlaceholder label="Jocomfy school community" className="min-h-[620px] rounded-3xl" />
        <article className="flex min-h-[620px] flex-col justify-between rounded-3xl bg-[#f5eee2] p-8 text-[#ed4545] sm:p-12 lg:p-10">
          <div>
            <SectionLabel>Student life</SectionLabel>
            <h2 className="mt-7 max-w-lg font-[Poppins] text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-[4.2rem]">A community that grows together.</h2>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-6 sm:text-base sm:leading-7">Learning becomes more meaningful when children feel connected through shared experiences.</p>
            <Link href="#contact" className="mt-8 block text-right text-4xl leading-none transition-transform hover:translate-x-2">→</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
import Link from "next/link";
import { SectionLabel } from "../shared/SectionLabel";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
export function Guidance() {
  return (
    <section id="guidance" className="bg-[#fffdf7] px-5 py-20 sm:px-8 sm:py-28 lg:px-8">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid min-h-[620px] grid-cols-1 rounded-3xl bg-[#f5eee2] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between p-8 text-[#ed4545] sm:p-12 lg:p-14">
            <div>
              <SectionLabel>Caring guidance</SectionLabel>
              <h2 className="mt-7 max-w-xl font-[Poppins] text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.07em]">Helping every child find their way.</h2>
            </div>
            <div className="max-w-lg">
              <p className="text-sm leading-6 sm:text-base sm:leading-7">Every learner deserves encouragement that feels personal. We help children move forward with confidence.</p>
              <Link href="#contact" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#ed4545] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Discover our approach</Link>
            </div>
          </div>
          <ImagePlaceholder label="Guidance and learning" className="min-h-[420px] rounded-3xl lg:-translate-y-16 lg:min-h-[700px]" />
        </div>
      </div>
    </section>
  );
}
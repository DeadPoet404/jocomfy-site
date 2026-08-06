
import { SectionLabel } from "../shared/SectionLabel";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";

export function LearningApproach() {
  return (
    <section id="learning-approach" className="bg-[#fffdf7] px-5 py-24 sm:px-8 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div className="grid gap-4">
          <article className="min-h-[390px] rounded-3xl bg-[#0d0d0d] p-8 text-white sm:p-10">
            <SectionLabel>Our approach</SectionLabel>
            <h2 className="mt-20 max-w-sm font-[Poppins] text-4xl font-medium leading-[0.98] tracking-[-0.06em] text-[#f2c500] sm:text-5xl">Learning with purpose.</h2>
            <p className="mt-12 max-w-md text-sm leading-6 text-[#b8cef0] sm:text-base sm:leading-7">
              We give children the support, structure, and encouragement they need to explore ideas, build strong foundations, and become confident learners.
            </p>
          </article>
          <article className="min-h-[390px] rounded-3xl bg-[#a8cdf8] p-8 text-[#111111] sm:p-10">
            <SectionLabel>Student development</SectionLabel>
            <h2 className="mt-20 max-w-sm font-[Poppins] text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-5xl">Growing beyond the classroom.</h2>
            <p className="mt-12 max-w-md text-sm leading-6 sm:text-base sm:leading-7">
              Through relationships, creativity, activities, and leadership, every child has space to discover their strengths and find their voice.
            </p>
          </article>
        </div>
        <ImagePlaceholder label="Learning environment" className="min-h-[650px] rounded-3xl" />
      </div>
    </section>
  );
}

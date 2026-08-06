
import { SectionLabel } from "../shared/SectionLabel";

export function AcademicStages() {
  return (
    <section className="bg-[#eaf8ff] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <SectionLabel>Academic pathways</SectionLabel>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="min-h-[320px] rounded-3xl bg-[#a8cdf8] p-8">
            <span className="text-sm font-bold text-[#17186b]">01</span>
            <h3 className="mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] text-[#17186b]">Preschool</h3>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#17186b]">Curious beginnings and joyful discovery.</p>
          </article>
          <article className="min-h-[320px] rounded-3xl bg-[#f5eee2] p-8">
            <span className="text-sm font-bold text-[#ed4545]">02</span>
            <h3 className="mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] text-[#111111]">Primary</h3>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#111111]">Strong foundations for confident learners.</p>
          </article>
          <article className="min-h-[320px] rounded-3xl bg-[#0d104c] p-8 text-white">
            <span className="text-sm font-bold text-[#f2c500]">03</span>
            <h3 className="mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] text-[#f2c500]">Junior High</h3>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">Independence, purpose, and leadership.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

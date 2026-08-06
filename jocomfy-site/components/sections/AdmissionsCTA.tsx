
import Link from "next/link";

export function AdmissionsCTA() {
  return (
    <section id="admissions" className="bg-[#f2c500] px-5 py-20 sm:px-8 sm:py-24 lg:px-16">
      <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d104c]">Start the journey</p>
          <h2 className="mt-5 max-w-3xl font-[Poppins] text-[clamp(2.75rem,5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.07em] text-[#0d104c]">
            Find the right beginning for your child.
          </h2>
        </div>
        <Link href="#contact" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#0d104c] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
          Send an enquiry
        </Link>
      </div>
    </section>
  );
}

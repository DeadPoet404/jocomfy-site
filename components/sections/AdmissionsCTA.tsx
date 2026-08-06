import Link from "next/link";

export function AdmissionsCTA() {
  return (
    <section className="bg-[#f2c500] px-5 py-24 text-center">
      <h2 className="font-[Poppins] text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#0d104c] leading-tight">Find the right beginning<br />for your child.</h2>
      <Link href="/admissions" className="mt-10 inline-flex min-h-14 items-center justify-center bg-[#0d104c] px-10 text-base font-bold text-white hover:-translate-y-1 transition-transform rounded-xl">
        Start Your Application
      </Link>
    </section>
  );
}
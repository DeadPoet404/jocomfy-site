import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Admissions | Jocomfy International School",
  description:
    "Admissions information for Jocomfy International School.",
};

const preparationSteps = [
  {
    icon: GraduationCap,
    title: "Programme information",
    description:
      "Class availability and entry requirements are being finalized.",
  },
  {
    icon: ShieldCheck,
    title: "Secure applications",
    description:
      "The application workflow is being prepared to protect family and child information.",
  },
  {
    icon: CheckCircle2,
    title: "Clear next steps",
    description:
      "Application dates, required documents, and assessment guidance will be published here.",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-[#fffdf7] text-[#001f54]">
      <Header />

      <section className="relative overflow-hidden px-6 pb-24 pt-24">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
          <span className="select-none whitespace-nowrap text-[20vw] font-black leading-none text-[#001f54]/[0.03]">
            ADMISSIONS
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 bg-[#facc15] px-4 py-2 text-xs font-black uppercase tracking-[0.25em]">
            <Clock3 size={16} />
            Admissions update
          </div>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
            Online applications are being{" "}
            <span className="text-[#facc15]">
              prepared.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-gray-600">
            Jocomfy International School is preparing a
            secure online admissions process. Application
            dates and instructions will be published here
            when the service is ready.
          </p>

          <div className="mt-8 border-l-4 border-[#facc15] bg-[#001f54] p-6 text-white">
            <p className="text-sm font-bold leading-relaxed">
              No personal information or application data
              is currently accepted through this website.
              Please check back for the official admissions
              announcement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {preparationSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="border-2 border-[#001f54] p-8"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-[#facc15]">
                  <Icon size={24} />
                </div>

                <h2 className="text-xl font-black uppercase tracking-tight">
                  {step.title}
                </h2>

                <p className="mt-4 text-sm font-medium leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#001f54] px-6 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#facc15]">
              Current families
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight">
              Access the student portal
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="border-2 border-white px-7 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#001f54]"
            >
              Return home
            </Link>

            <Link
              href="/portal/login"
              className="flex items-center gap-3 bg-[#facc15] px-7 py-4 text-xs font-black uppercase tracking-widest text-[#001f54] hover:bg-white"
            >
              Student portal
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

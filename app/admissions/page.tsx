"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, ClipboardList, FileCheck, UserPlus, CheckCircle } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-[#fffdf7] text-[#001f54]">
      <Header />

      {/* Hero Section - Matching your "JOCOMFY" overlap style */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/dot-grid.png')] bg-repeat">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="relative">
             {/* Large Background Text */}
            <h2 className="text-[80px] md:text-[180px] font-black text-blue-900/5 leading-none absolute -top-10 -left-5 select-none">
              JOIN US
            </h2>
            <div className="relative z-10 pt-10">
              <span className="text-[#facc15] font-bold tracking-[0.2em] text-sm uppercase">Admissions 2024/2025</span>
              <h1 className="text-5xl md:text-8xl font-black mt-4 leading-[0.9]">
                Curious minds. <br />
                <span className="text-[#facc15]">Confident</span> <br />
                futures.
              </h1>
              <p className="max-w-lg mt-8 text-lg font-medium text-gray-600">
                Begin your journey at JOCOMFY. We seek students who are ready to explore, lead, and grow in a community that values character as much as academics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase">How to Apply</h2>
            <div className="h-2 w-24 bg-[#facc15] mt-2"></div>
          </div>
          <p className="text-gray-500 font-medium">Follow these four simple steps to join our family.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-l border-t border-gray-200">
          {[
            { step: "01", title: "Application", desc: "Complete the online application form with parent and student details.", icon: <ClipboardList /> },
            { step: "02", title: "Documents", desc: "Submit birth certificates and academic transcripts from previous schools.", icon: <FileCheck /> },
            { step: "03", title: "Assessment", desc: "A friendly interaction to understand the student's unique potential.", icon: <UserPlus /> },
            { step: "04", title: "Welcome", desc: "Receive your admission letter and join the JOCOMFY community.", icon: <CheckCircle /> },
          ].map((item, index) => (
            <div key={index} className="p-10 border-r border-b border-gray-200 hover:bg-[#facc15] transition-colors group">
              <span className="text-4xl font-black text-gray-200 group-hover:text-blue-900/20 transition-colors">{item.step}</span>
              <div className="mt-8 mb-4 text-[#001f54]">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4 uppercase">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 group-hover:text-blue-900 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before You Apply - High Contrast Section */}
      <section className="bg-[#001f54] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase mb-12 italic">Things to Know <span className="text-[#facc15]">Before</span> Applying</h2>
          
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {[
              "Minimum age for Kindergarten is 4 years by September.",
              "A non-refundable application fee of $50 applies to all submissions.",
              "Official transcripts must be translated into English.",
              "Immunization records are mandatory for all grade levels.",
              "School uniforms are purchased exclusively through our campus shop.",
              "Bus services are available for a 15km radius around the campus."
            ].map((text, i) => (
              <div key={i} className="flex gap-6 items-start border-b border-white/10 pb-6">
                <span className="text-[#facc15] font-black text-xl">/</span>
                <p className="font-medium text-lg text-blue-50">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center justify-center p-12 bg-[#facc15] text-[#001f54]">
             <h3 className="text-3xl font-black uppercase mb-6 text-center">Ready to join the community?</h3>
             <Link href="/admissions/apply" className="bg-[#001f54] text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-4">
                Start Application <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
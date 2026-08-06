"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, Send, Info } from "lucide-react";

export default function ApplyFormPage() {
  return (
    <main className="min-h-screen bg-[#fffdf7] text-[#001f54]">
      <Header />

      <section className="pt-20 pb-10 bg-[url('https://www.transparenttextures.com/patterns/dot-grid.png')]">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/admissions" className="inline-flex items-center gap-2 font-bold uppercase text-sm mb-10 hover:text-[#facc15] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to info
          </Link>
          
          <div className="border-l-8 border-[#facc15] pl-8">
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none">Apply <br /> Online</h1>
            <p className="mt-4 text-gray-500 font-medium">Admission Form - Academic Session 2024/2025</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <form className="space-y-16">
          
          {/* Section 1: Parent Info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#001f54] text-white w-8 h-8 flex items-center justify-center font-bold">01</span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Parent / Guardian Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="uppercase text-xs font-black mb-2 tracking-widest">Full Name</label>
                <input type="text" className="border-2 border-[#001f54] p-4 focus:bg-[#facc15]/10 outline-none font-medium" placeholder="Enter name" />
              </div>
              <div className="flex flex-col">
                <label className="uppercase text-xs font-black mb-2 tracking-widest">Email Address</label>
                <input type="email" className="border-2 border-[#001f54] p-4 focus:bg-[#facc15]/10 outline-none font-medium" placeholder="email@example.com" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="uppercase text-xs font-black mb-2 tracking-widest">Phone Number</label>
                <input type="tel" className="border-2 border-[#001f54] p-4 focus:bg-[#facc15]/10 outline-none font-medium" placeholder="+233..." />
              </div>
            </div>
          </div>

          {/* Section 2: Student Info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#001f54] text-white w-8 h-8 flex items-center justify-center font-bold">02</span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Student Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="uppercase text-xs font-black mb-2 tracking-widest">Student Full Name</label>
                <input type="text" className="border-2 border-[#001f54] p-4 focus:bg-[#facc15]/10 outline-none font-medium" />
              </div>
              <div className="flex flex-col">
                <label className="uppercase text-xs font-black mb-2 tracking-widest">Grade Applying For</label>
                <select className="border-2 border-[#001f54] p-4 bg-transparent outline-none font-bold appearance-none">
                  <option>Select Grade</option>
                  <option>Kindergarten</option>
                  <option>Grade 1</option>
                  <option>Grade 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notice Box */}
          <div className="bg-blue-50 p-6 border-l-4 border-blue-500 flex gap-4">
            <Info className="text-blue-500 flex-shrink-0" />
            <p className="text-sm text-blue-800 font-medium">
              After clicking submit, you will be redirected to our document upload portal. 
              Please ensure you have a scanned copy of the student's birth certificate ready.
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#facc15] py-6 text-[#001f54] font-black uppercase text-xl tracking-[0.2em] hover:bg-[#001f54] hover:text-white transition-all flex items-center justify-center gap-4 group">
            Submit Application <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
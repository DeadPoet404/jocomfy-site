"use client";

import { useState } from "react";

export function AdmissionForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SMS_API_URL || 'http://localhost:5000/api'}/admissions/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="admissions" className="bg-[#f2c500] px-5 py-24 text-center">
        <h2 className="font-[Poppins] text-4xl font-bold text-[#0d104c]">Application Received!</h2>
        <p className="mt-4 text-[#0d104c]">We have received your application. Our team will contact you shortly.</p>
        <button onClick={() => setStatus("idle")} className="mt-8 font-bold underline text-[#0d104c]">Submit another application</button>
      </section>
    );
  }

  return (
    <section id="admissions" className="bg-[#f2c500] px-5 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[800px]">
        <h2 className="font-[Poppins] text-4xl font-normal tracking-[-0.05em] text-[#0d104c] mb-10">Admission Application</h2>
        
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="childFirstName" placeholder="Child's First Name" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
            <input name="childLastName" placeholder="Child's Last Name" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="dateOfBirth" type="date" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
            <select name="gender" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]">
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <input name="desiredGrade" placeholder="Desired Grade/Class (e.g. JHS 1)" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
          
          <div className="border-t border-[#0d104c]/20 my-4" />
          
          <input name="parentName" placeholder="Parent/Guardian Full Name" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
          <input name="parentEmail" type="email" placeholder="Email Address" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
          <input name="parentPhone" placeholder="Phone Number" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c]" />
          <textarea name="parentAddress" placeholder="Residential Address" required className="p-4 rounded-xl bg-white/50 border-none outline-none focus:ring-2 focus:ring-[#0d104c] h-32" />

          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="mt-4 bg-[#0d104c] text-white p-5 rounded-xl font-bold transition-transform hover:-translate-y-1 disabled:opacity-50"
          >
            {status === "submitting" ? "Submitting..." : "Submit Application"}
          </button>

          {status === "error" && <p className="text-red-700 font-bold text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}

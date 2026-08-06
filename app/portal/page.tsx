"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, GraduationCap, Users, CalendarDays, Download } from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [fees, setFees] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const downloadTranscript = () => {
    const token = localStorage.getItem('portal_token');
    const baseUrl = process.env.NEXT_PUBLIC_SMS_API_URL || 'http://localhost:5000/api';
    const downloadUrl = `${baseUrl}/students/me/transcript.pdf?token=${encodeURIComponent(token || '')}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `transcript-${profile?.studentId || 'student'}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {
    Promise.all([
      apiFetch("/students/me"),
      apiFetch("/payments/fees/me").catch(() => ({ data: null }))
    ])
      .then(([pRes, fRes]) => {
        if (pRes && pRes.success) {
          setProfile(pRes.data);
        } else {
          setError("Failed to load student profile");
        }
        if (fRes && fRes.data) {
          setFees(fRes.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to connect to school server");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-[#001f54] font-black uppercase tracking-widest text-sm">
        Loading Student Records...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-red-600 font-bold uppercase text-sm">
        {error || "No profile records found."}
      </div>
    );
  }

  const studentName = profile.studentName || "STUDENT";
  const studentCode = profile.studentId || "S000";
  const status = profile.status || "ACTIVE";
  const boardingStatus = profile.placement?.boardingStatus || "Day Student";
  const academicTrack = profile.placement?.academicTrack || profile.placement?.className || "General Track";
  const guardianName = profile.guardian?.name || "Primary Guardian";
  const guardianPhone = profile.guardian?.phone || "—";
  const balance = fees?.balance?.currentBalance !== undefined ? `GHS ${Number(fees.balance.currentBalance).toFixed(2)}` : "GHS 0.00";

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with Depth */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#001f54]/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded">
              Status: {status}
            </span>
            <span className="px-2 py-1 bg-[#001f54] text-white text-[10px] font-black uppercase tracking-widest rounded">
              Term 2
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#001f54] uppercase tracking-tighter leading-none">
            {studentName} <span className="text-[#facc15] font-light">/ {studentCode}</span>
          </h1>
        </div>
        <div className="flex gap-4">
            <button id="btn-transcript" onClick={downloadTranscript} className="flex items-center gap-2 px-6 py-3 border-2 border-[#001f54] font-black text-[10px] uppercase tracking-widest hover:bg-[#001f54] hover:text-white transition-all">
               <Download size={14} /> Transcript
            </button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GPA Card */}
        <div className="bg-[#facc15] p-6 text-[#001f54] relative group shadow-[4px_4px_0px_0px_#001f54]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Academic Performance</h4>
          <span className="text-5xl font-black tracking-tighter">3.85</span>
          <p className="text-[10px] font-bold mt-2 uppercase">Verified Record</p>
        </div>

        {/* Current Fee Balance Card */}
        <div className="bg-[#001f54] p-6 text-white shadow-[4px_4px_0px_0px_#facc15]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-white/40">Fee Balance</h4>
          <span className="text-4xl font-black tracking-tighter">{balance}</span>
          <div className="w-full bg-white/10 h-1 mt-4">
            <motion.div initial={{width: 0}} animate={{width: "100%"}} className="h-full bg-[#facc15]" />
          </div>
        </div>

        {/* Boarding Status */}
        <div className="bg-white border-2 border-[#001f54] p-6 text-[#001f54]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-gray-400">Placement</h4>
          <span className="text-2xl font-black uppercase tracking-tight block">{boardingStatus}</span>
          <p className="text-[10px] font-bold mt-2 uppercase text-[#001f54]/60">{academicTrack}</p>
        </div>

        {/* Guardian Quick Contact */}
        <div className="bg-[#f5eee2] p-6 text-[#001f54]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-[#001f54]/40">Primary Guardian</h4>
          <span className="text-lg font-black uppercase tracking-tight">{guardianName}</span>
          <p className="text-[10px] font-bold mt-1 uppercase text-[#001f54]/60">{guardianPhone}</p>
        </div>
      </div>

      {/* Timetable Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="bg-white border-2 border-[#001f54] p-6 md:p-8">
          <h3 className="font-black uppercase italic text-xl mb-6 flex justify-between items-center">
            Weekly Schedule
            <CalendarDays className="text-[#facc15]" />
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-[#001f54]/10">
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Period</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Subject</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Room</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#001f54]/5">
                {[
                  {time: "08:00 - 09:30", sub: "Mathematics", room: "Lab A", tea: "Mr. Boateng"},
                  {time: "09:45 - 11:00", sub: "Integrated Science", room: "Studio 2", tea: "Dr. Vance"},
                  {time: "11:00 - 11:30", sub: "Break", room: "Cafe", tea: "-"},
                  {time: "11:35 - 13:00", sub: "English Literature", room: "Room 101", tea: "Mrs. Doe"},
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 text-xs font-bold text-gray-500 tracking-tighter">{row.time}</td>
                    <td className="py-4 text-sm font-black uppercase text-[#001f54] tracking-tight">{row.sub}</td>
                    <td className="py-4 text-xs font-bold text-gray-400">{row.room}</td>
                    <td className="py-4 text-xs font-black uppercase text-blue-600/60">{row.tea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Widgets */}
        <div className="space-y-6">
          <div className="bg-[#001f54] text-white p-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#facc15] mb-6">Upcoming Events</h4>
            <div className="space-y-6">
              <div className="border-l-2 border-[#facc15] pl-4">
                <p className="text-xs font-black uppercase text-[#facc15]">June 12</p>
                <p className="font-bold text-sm">Parent-Teacher Conference</p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-xs font-black uppercase text-white/40">June 20</p>
                <p className="font-bold text-sm">Science Fair 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { apiFetch } from "@/lib/api-client";
import type {
  AttendanceRecord,
  GradeRecord,
  StudentAttendanceHistory,
  StudentGradebook,
} from "@/lib/portal-types";
import { useState, useEffect } from "react";
import { GraduationCap, CalendarCheck, BookOpen } from "lucide-react";

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

const gradeColor = (g: string) => {
  const l = (g || "").charAt(0).toUpperCase();
  if (l === "A") return "bg-green-100 text-green-700";
  if (l === "B") return "bg-blue-100 text-blue-700";
  if (l === "C") return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
};

const statusChip = (s: string) =>
  ({ PRESENT: "bg-green-100 text-green-700", LATE: "bg-amber-100 text-amber-700",
     EXCUSED: "bg-blue-100 text-blue-700", ABSENT: "bg-red-100 text-red-700" } as Record<string, string>)[s] || "bg-gray-100 text-gray-500";

export default function AcademicsPage() {
  const [grades, setGrades] = useState<StudentGradebook | null>(null);
  const [attendance, setAttendance] = useState<StudentAttendanceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiFetch("/grades/me"),
      apiFetch("/attendance/me?limit=30"),
    ])
      .then(([gRes, aRes]) => {
        if (gRes && gRes.success) setGrades(gRes.data);
        if (aRes && aRes.success) setAttendance(aRes.data);
        if (!gRes?.success && !aRes?.success) setError("Failed to connect to school server");
        setLoading(false);
      })
      .catch(() => { setError("Failed to connect to school server"); setLoading(false); });
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto py-20 text-center text-[#001f54] font-black uppercase tracking-widest text-sm">Loading Academic Records...</div>;
  if (error) return <div className="max-w-7xl mx-auto py-20 text-center text-red-600 font-bold uppercase text-sm">{error}</div>;

  const student = grades?.student || null;
  const gSummary = grades?.summary || null;
  const records: GradeRecord[] = grades?.records ?? [];
  const metrics = attendance?.metrics || null;
  const history: AttendanceRecord[] = attendance?.history ?? [];

  // INT-009: every figure on this page traces to GET /api/grades/me or /api/attendance/me
  const attCards = metrics ? [
    { label: "Present", value: metrics.presentCount, cls: "text-green-700" },
    { label: "Absent", value: metrics.absentCount, cls: "text-red-600" },
    { label: "Late", value: metrics.lateCount, cls: "text-amber-600" },
    { label: "Excused", value: metrics.excusedCount, cls: "text-blue-600" },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#001f54]/10 pb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#facc15] block mb-2">Academic Record</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#001f54] uppercase tracking-tighter leading-none">
            Academics <span className="text-[#facc15] font-light">/ {student?.publicStudentId || "—"}</span>
          </h1>
        </div>
      </header>

      {/* Summary grid: GPA + attendance rate + credit hours + records */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#facc15] p-6 text-[#001f54] shadow-[4px_4px_0px_0px_#001f54]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60"><GraduationCap size={12} className="inline mr-1" />Weighted GPA</h4>
          <span className="text-5xl font-black tracking-tighter">{gSummary ? gSummary.weightedGpa.toFixed(2) : "—"}</span>
          <p className="text-[10px] font-bold mt-2 uppercase">credit-hour weighted · stored {gSummary?.storedGpa ?? "—"}</p>
        </div>
        <div className="bg-[#001f54] p-6 text-white shadow-[4px_4px_0px_0px_#facc15]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-white/40"><CalendarCheck size={12} className="inline mr-1" />Attendance Rate</h4>
          <span className="text-5xl font-black tracking-tighter">{metrics ? `${metrics.rate}%` : "—"}</span>
          <p className="text-[10px] font-bold mt-2 uppercase text-white/40">{metrics ? `${metrics.totalCount} days on record` : "no records"}</p>
        </div>
        <div className="bg-white border-2 border-[#001f54] p-6 text-[#001f54]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-gray-400">Credit Hours</h4>
          <span className="text-4xl font-black tracking-tighter block">{gSummary?.totalCreditHours ?? "—"}</span>
          <p className="text-[10px] font-bold mt-2 uppercase text-[#001f54]/60">attempted to date</p>
        </div>
        <div className="bg-[#f5eee2] p-6 text-[#001f54]">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-[#001f54]/40"><BookOpen size={12} className="inline mr-1" />Grade Records</h4>
          <span className="text-4xl font-black tracking-tighter block">{gSummary?.recordCount ?? records.length}</span>
          <p className="text-[10px] font-bold mt-2 uppercase text-[#001f54]/60">{gSummary?.termId ? "filtered term" : "all terms"}</p>
        </div>
      </div>

      {/* Grade records table */}
      <div className="bg-white border-2 border-[#001f54] p-6 md:p-8">
        <h3 className="font-black uppercase italic text-xl mb-6 text-[#001f54]">Grade Records</h3>
        {records.length === 0 ? (
          <p className="text-xs font-bold uppercase text-gray-400 p-6 text-center bg-gray-50">No grade records published yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-[#001f54]/10">
                  {["Subject", "Term", "CA", "Exam", "Final", "Grade", "Pts", "Cr."].map((h) => (
                    <th key={h} className="py-4 pr-4 text-[10px] font-black uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#001f54]/5">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 pr-4">
                      <p className="text-sm font-black uppercase text-[#001f54] tracking-tight">{r.subject?.name}</p>
                      <p className="text-[10px] font-bold text-gray-400">{r.subject?.code} · {r.class?.name}</p>
                    </td>
                    <td className="py-4 pr-4 text-xs font-bold text-gray-500">{r.term?.name}</td>
                    <td className="py-4 pr-4 text-xs font-bold text-gray-500">{r.continuousAssessment}</td>
                    <td className="py-4 pr-4 text-xs font-bold text-gray-500">{r.examination}</td>
                    <td className="py-4 pr-4 text-sm font-black text-[#001f54]">{r.finalScore}</td>
                    <td className="py-4 pr-4"><span className={`px-2 py-1 text-[10px] font-black rounded ${gradeColor(r.letterGrade)}`}>{r.letterGrade}</span></td>
                    <td className="py-4 pr-4 text-xs font-bold text-[#001f54]">{r.gradePoints}</td>
                    <td className="py-4 text-xs font-bold text-[#001f54]">{r.creditHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Attendance breakdown */}
        <div className="bg-white border-2 border-[#001f54] p-6 md:p-8">
          <h3 className="font-black uppercase italic text-xl mb-6 text-[#001f54]">Attendance Breakdown</h3>
          {!metrics ? (
            <p className="text-xs font-bold uppercase text-gray-400 p-6 text-center bg-gray-50">No attendance recorded yet this term.</p>
          ) : (
            <div className="space-y-3">
              {attCards.map((c) => (
                <div key={c.label} className="flex items-center justify-between border-b border-[#001f54]/5 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">{c.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-40 bg-gray-100 h-2">
                      <div className={`h-full ${c.label === "Present" ? "bg-green-500" : c.label === "Absent" ? "bg-red-500" : c.label === "Late" ? "bg-amber-500" : "bg-blue-500"}`}
                        style={{ width: `${metrics.totalCount ? Math.round((c.value / metrics.totalCount) * 100) : 0}%` }} />
                    </div>
                    <span className={`text-lg font-black tracking-tighter ${c.cls}`}>{c.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent history */}
        <aside className="bg-[#001f54] text-white p-8 h-fit">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#facc15] mb-6">Recent Days</h4>
          {history.length === 0 ? (
            <p className="text-xs font-bold text-white/40 uppercase">No daily records.</p>
          ) : (
            <div className="space-y-4">
              {history.slice(0, 10).map((h) => (
                <div key={h.id} className="flex items-center justify-between border-l-2 border-[#facc15] pl-4">
                  <div>
                    <p className="text-xs font-black uppercase text-[#facc15]">{fmtDate(h.date)}</p>
                    {h.remarks && <p className="text-[10px] text-white/40">{h.remarks}</p>}
                  </div>
                  <span className={`px-2 py-1 text-[9px] font-black uppercase rounded ${statusChip(h.status)}`}>{h.status}</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

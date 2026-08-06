"use client";
import { apiFetch } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
export default function DashboardPage() {
  const { logout } = useAuth();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    Promise.all([apiFetch("/students/me"), apiFetch("/payments/fees/me")]).then(([p, f]) => setData({ profile: p.data, fees: f.data }));
  }, []);
  if (!data) return <div>Loading records...</div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-xl font-bold">Dashboard</h1><button onClick={logout} className="text-red-500">Logout</button></div>
      <section className="bg-white p-4 border rounded"><h2 className="text-xs font-bold text-gray-400 mb-2 uppercase">Balance</h2><div className="text-2xl font-bold text-[#0d104c]">GHS {data.fees?.balance?.currentBalance || "0.00"}</div><button onClick={() => window.location.href = '/portal/fees'} className="mt-4 text-sm underline">View Full Statement</button></section>
      <section className="bg-white p-4 border rounded"><h2 className="text-xs font-bold text-gray-400 mb-2 uppercase">Raw Data Placeholder</h2><pre className="text-[10px] bg-gray-50 p-2 overflow-auto max-h-32">{JSON.stringify(data.profile, null, 2)}</pre></section>
    </div>
  );
}

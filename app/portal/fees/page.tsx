"use client";
import { apiFetch } from "@/lib/api-client";
import { useState, useEffect } from "react";
export default function FeesPage() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { apiFetch("/payments/fees/me").then(res => setData(res.data)); }, []);
  const handlePayNow = async () => {
    const res = await apiFetch("/payments/intents/me", { method: "POST", body: JSON.stringify({ amount: Number(data?.balance?.currentBalance), payerEmail: data?.profile?.parentEmail }) });
    if (res.success) window.location.href = res.data.authorizationUrl;
  };
  if (!data) return <div className="p-10">Loading...</div>;
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end"><div><h1 className="text-2xl font-bold">Fees</h1><p className="text-sm">Balance: GHS {data.balance?.currentBalance}</p></div><button onClick={handlePayNow} className="bg-[#0d104c] text-white px-6 py-2 rounded">Pay Now</button></div>
      <pre className="text-[10px] p-4 bg-white border">{JSON.stringify(data.invoices, null, 2)}</pre>
    </div>
  );
}

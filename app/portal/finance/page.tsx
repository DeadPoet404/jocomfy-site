"use client";
import { apiFetch } from "@/lib/api-client";
import type {
  ApiEnvelope,
  FeeInvoice,
  FeePayment,
  PaymentIntentInitialization,
  PaymentIntentSummary,
  StudentFeesSummary,
} from "@/lib/portal-types";
import { useAuth } from "@/lib/auth-context";
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const fmt = (n: number) => `GHS ${n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function FinancePage() {
  const { user } = useAuth();
  const [data, setData] = useState<StudentFeesSummary | null>(null);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [payer, setPayer] = useState(""); // INT-004b: paying parent's email (gateway rejects seed .local TLDs)

  useEffect(() => {
    apiFetch("/payments/fees/me")
      .then((res) => { if (res && res.success) setData(res.data); else setError(res?.message || "Failed to load fee records"); })
      .catch(() => setError("Failed to connect to school server"));
  }, []);

  if (error) return <div className="max-w-6xl mx-auto p-10 text-red-600 font-bold uppercase text-sm">{error}</div>;
  if (!data) return <div className="max-w-6xl mx-auto p-10 font-black uppercase tracking-widest text-sm text-[#001f54]">Loading Financial Records...</div>;

  // INT-004: SMS returns `balance` as a BARE NUMBER; invoices/payments are live arrays.
  const balance = typeof data.balance === "number" ? data.balance : 0;
  const invoices: FeeInvoice[] = data.invoices;
  const payments: FeePayment[] = data.payments;
  const totalBilled = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
  const pending: PaymentIntentSummary | null = data.pendingIntent;
  const pendingAuthorizationUrl = pending?.authorizationUrl ?? null;
  // INT-004 ROOT FIX: payerEmail comes from the authenticated session, not a nonexistent data.profile
  const payerEmail = payer.trim() || user?.email || "";

  const handlePayNow = async () => {
    setPayError("");
    const amt = Number(amount);
    if (!amt || amt <= 0) { setPayError("Enter an amount greater than zero."); return; }
    if (amt > balance) { setPayError(`Amount exceeds the outstanding balance of ${fmt(balance)}.`); return; }
    if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(payerEmail)) { setPayError("Enter a valid payer email — the Paystack receipt is sent there. Seeded .local addresses are rejected by the gateway."); return; }
    setPaying(true);
    try {
      const res = await apiFetch("/payments/intents/me", { method: "POST", body: JSON.stringify({ payerEmail, amount: amt }) }) as ApiEnvelope<PaymentIntentInitialization>;
      if (res && res.success && res.data?.authorizationUrl) {
        window.location.href = res.data.authorizationUrl; // → Paystack checkout
      } else {
        setPayError(res?.message || "Could not initialize payment.");
        setPaying(false);
      }
    } catch {
      setPayError("Network error reaching the school server.");
      setPaying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Finance Hero — live balance */}
      <div className="bg-[#001f54] text-white p-8 md:p-16 relative overflow-hidden shadow-[8px_8px_0px_0px_#facc15]">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
                <span className="text-xs font-black text-[#facc15] uppercase tracking-[0.4em] block mb-4">Financial Status</span>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{fmt(balance)}</h2>
                <p className="text-sm font-bold text-white/40 mt-2 uppercase tracking-widest italic">
                  Current Outstanding — {data.student?.studentName} ({data.student?.studentId})
                </p>
            </div>
            {pending && pendingAuthorizationUrl ? (
              <button onClick={() => { window.location.href = pendingAuthorizationUrl; }}
                className="bg-[#facc15] text-[#001f54] p-6 text-left hover:bg-white transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Pending Checkout</p>
                <p className="text-xl font-black tracking-tighter">{fmt(Number(pending.amount))} →</p>
                <p className="text-[10px] font-bold opacity-60 uppercase">Resume {pending.reference}</p>
              </button>
            ) : (
              <div className="bg-white/5 p-6 backdrop-blur-md border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Payments Made</p>
                <p className="text-xl font-black italic tracking-tighter text-green-400">{fmt(totalPaid)}</p>
              </div>
            )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15] opacity-5 -mr-20 -mt-20 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
            {/* Payment Center — wired */}
            <div className="bg-white border-2 border-[#001f54] p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Initialize Payment</h3>
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-blue-500">Paystack Gateway Ready</span>
                    </div>
                </div>

                {pending && (
                  <div className="mb-8 bg-amber-50 border-l-4 border-amber-400 p-4 text-xs font-medium">
                    <span className="font-black uppercase text-[10px] block mb-1">Pending payment exists:</span>
                    A checkout for <b>{fmt(Number(pending.amount))}</b> (ref {pending.reference}) is already open.
                    Starting a different amount replaces it; the same amount resumes it.
                  </div>
                )}

                <div className="space-y-8">
                    <div className="group relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] block mb-4 text-gray-400 group-focus-within:text-[#facc15] transition-colors">Enter Amount (GHS)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-[#001f54] py-4 text-5xl md:text-6xl font-black outline-none focus:border-[#facc15] transition-all"
                          placeholder="0.00" disabled={balance <= 0} />
                        {balance > 0 && (
                          <button onClick={() => setAmount(String(balance))}
                            className="mt-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-[#001f54] underline">
                            Pay full balance ({fmt(balance)})
                          </button>
                        )}
                    </div>

                    <div className="group relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] block mb-2 text-gray-400 group-focus-within:text-[#facc15] transition-colors">Payer Email — receipt goes here</label>
                        <input type="email" value={payer || user?.email || ""} onChange={(e) => setPayer(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-[#001f54]/30 py-2 text-lg font-bold outline-none focus:border-[#facc15] transition-all"
                          placeholder="parent@example.com" />
                    </div>

                    {balance <= 0 && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 text-xs font-bold uppercase text-green-700">
                        No outstanding balance — nothing to pay. 🎉
                      </div>
                    )}
                    {payError && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs font-bold text-red-700">{payError}</div>
                    )}

                    <div className="bg-[#f5eee2] p-6 flex gap-4 items-start border-l-4 border-[#001f54]">
                        <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                        <p className="text-xs font-medium leading-relaxed">
                            <span className="font-black uppercase text-[10px] block mb-1">Important Notice:</span>
                            Payments are processed via Paystack as <b>{payerEmail || "—"}</b>. Once successful, your balance updates automatically and a receipt is emailed to your portal email.
                        </p>
                    </div>

                    <button onClick={handlePayNow} disabled={paying || balance <= 0}
                      className="w-full bg-[#001f54] text-white py-6 md:py-8 font-black uppercase text-lg tracking-[0.4em] hover:bg-[#facc15] hover:text-[#001f54] transition-all shadow-[12px_12px_0px_0px_#facc15] hover:shadow-none hover:translate-x-2 hover:translate-y-2 disabled:opacity-40 disabled:cursor-not-allowed">
                        {paying ? "Contacting Gateway…" : "Process Payment →"}
                    </button>
                </div>
            </div>

            {/* Invoice History — live */}
            <div>
                <h3 className="text-sm font-black uppercase mb-6 tracking-widest text-gray-400">Invoice History</h3>
                <div className="space-y-4">
                    {invoices.length === 0 && <p className="text-xs font-bold uppercase text-gray-400 p-6 bg-white border">No invoices on file.</p>}
                    {invoices.map((inv) => (
                        <div key={inv.id} className="bg-white border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#001f54] transition-all group">
                            <div>
                                <h5 className="font-black uppercase tracking-tight text-lg group-hover:text-blue-600 transition-colors">{inv.description}</h5>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{inv.invoiceNo} · due {fmtDate(inv.dueDate)}</p>
                            </div>
                            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                                <p className="text-xl font-black tracking-tighter text-[#001f54]">{fmt(Number(inv.amount))}</p>
                                <div className={`flex items-center gap-1 ${inv.status === "PAID" ? "text-green-600" : "text-red-500"} text-[10px] font-black uppercase tracking-widest`}>
                                    {inv.status === "PAID" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                    {inv.status}{inv.status === "PAID" ? "" : ` · ${fmt(Number(inv.amount) - Number(inv.paidAmount || 0))} outstanding`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment History — live */}
            <div>
                <h3 className="text-sm font-black uppercase mb-6 tracking-widest text-gray-400">Payment History</h3>
                <div className="space-y-4">
                    {payments.length === 0 && <p className="text-xs font-bold uppercase text-gray-400 p-6 bg-white border">No payments recorded yet.</p>}
                    {payments.map((p) => (
                        <div key={p.id} className="bg-white border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h5 className="font-black uppercase tracking-tight">{p.receiptNumber || p.referenceNo || "Payment"}</h5>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.paymentMethod} · {fmtDate(p.dateProcessed)} · {p.allocationTarget}</p>
                            </div>
                            <p className="text-xl font-black tracking-tighter text-green-700">- {fmt(Number(p.amountPaid))}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Sidebar Session Summary — derived from live data */}
        <aside className="hidden lg:block space-y-6 sticky top-8 h-fit">
            <div className="bg-[#facc15] p-8 text-[#001f54] shadow-[4px_4px_0px_0px_#001f54]">
                <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-50">Session Summary</h4>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-[#001f54]/10 pb-2">
                        <span className="text-xs font-bold uppercase">Total Billed</span>
                        <span className="font-black tracking-tighter">{fmt(totalBilled)}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#001f54]/10 pb-2 text-green-700">
                        <span className="text-xs font-bold uppercase">Payments Made</span>
                        <span className="font-black tracking-tighter">- {fmt(totalPaid)}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="text-xs font-black uppercase italic underline">Net Balance</span>
                        <span className="text-2xl font-black tracking-tighter">{fmt(balance)}</span>
                    </div>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
}

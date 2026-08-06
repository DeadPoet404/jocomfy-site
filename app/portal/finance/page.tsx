"use client";
import { CreditCard, History, AlertCircle, CheckCircle2 } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Finance Hero */}
      <div className="bg-[#001f54] text-white p-8 md:p-16 relative overflow-hidden shadow-[8px_8px_0px_0px_#facc15]">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
                <span className="text-xs font-black text-[#facc15] uppercase tracking-[0.4em] block mb-4">Financial Status</span>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                    GHS 2,400.00
                </h2>
                <p className="text-sm font-bold text-white/40 mt-2 uppercase tracking-widest italic">Total Outstanding for Term 2</p>
            </div>
            <div className="flex gap-4">
                <div className="bg-white/5 p-6 backdrop-blur-md border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Scholarship Applied</p>
                    <p className="text-xl font-bold italic tracking-tighter">15% Discount</p>
                </div>
            </div>
        </div>
        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15] opacity-5 -mr-20 -mt-20 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Payment Center */}
        <div className="space-y-8">
            <div className="bg-white border-2 border-[#001f54] p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Initialize Payment</h3>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-blue-500">Paystack Gateway Ready</span>
                    </div>
                </div>
                
                <div className="space-y-8">
                    <div className="group relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] block mb-4 text-gray-400 group-focus-within:text-[#facc15] transition-colors">Enter Amount (GHS)</label>
                        <input type="number" className="w-full bg-transparent border-b-2 border-[#001f54] py-4 text-5xl md:text-6xl font-black outline-none focus:border-[#facc15] transition-all" placeholder="0.00" />
                    </div>

                    <div className="bg-[#f5eee2] p-6 flex gap-4 items-start border-l-4 border-[#001f54]">
                        <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                        <p className="text-xs font-medium leading-relaxed">
                            <span className="font-black uppercase text-[10px] block mb-1">Important Notice:</span>
                            Payments are processed via Paystack. Once successful, your balance will be updated instantly and a PDF receipt will be sent to your student portal email.
                        </p>
                    </div>

                    <button className="w-full bg-[#001f54] text-white py-6 md:py-8 font-black uppercase text-lg tracking-[0.4em] hover:bg-[#facc15] hover:text-[#001f54] transition-all shadow-[12px_12px_0px_0px_#facc15] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
                        Process Payment →
                    </button>
                </div>
            </div>

            {/* Invoices List - Fixed for Mobile (Card style) */}
            <div>
                <h3 className="text-sm font-black uppercase mb-6 tracking-widest text-gray-400">Invoice History</h3>
                <div className="space-y-4">
                    {[
                        { title: "Tuition Fee - Term 2", id: "INV-001", amt: "2,000", status: "Unpaid", color: "text-red-500" },
                        { title: "Lab & Library Fees", id: "INV-002", amt: "400", status: "Unpaid", color: "text-red-500" },
                        { title: "Sports Equipment", id: "INV-003", amt: "1,200", status: "Verified", color: "text-green-500" },
                    ].map((inv, i) => (
                        <div key={i} className="bg-white border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#001f54] transition-all cursor-pointer group">
                            <div>
                                <h5 className="font-black uppercase tracking-tight text-lg group-hover:text-blue-600 transition-colors">{inv.title}</h5>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{inv.id}</p>
                            </div>
                            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                                <p className="text-xl font-black tracking-tighter text-[#001f54]">GHS {inv.amt}</p>
                                <div className={`flex items-center gap-1 ${inv.color} text-[10px] font-black uppercase tracking-widest`}>
                                    {inv.status === "Verified" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                    {inv.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Floating Sidebar (Desktop only for balance breakdown) */}
        <aside className="hidden lg:block space-y-6 sticky top-8 h-fit">
            <div className="bg-[#facc15] p-8 text-[#001f54] shadow-[4px_4px_0px_0px_#001f54]">
                <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-50">Session Summary</h4>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-[#001f54]/10 pb-2">
                        <span className="text-xs font-bold uppercase">Tuition</span>
                        <span className="font-black tracking-tighter">GHS 5,000</span>
                    </div>
                    <div className="flex justify-between border-b border-[#001f54]/10 pb-2 text-green-700">
                        <span className="text-xs font-bold uppercase">Payments Made</span>
                        <span className="font-black tracking-tighter">- GHS 2,600</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="text-xs font-black uppercase italic underline">Net Balance</span>
                        <span className="text-2xl font-black tracking-tighter">GHS 2,400</span>
                    </div>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
}
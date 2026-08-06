"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { apiFetch } from "@/lib/api-client";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    if (reference) {
      apiFetch(`/payments/intents/${reference}/status?verify=true`)
        .then(res => setStatus(res.data));
    }
  }, [reference]);

  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-4">
      <h1 className="text-3xl font-bold">Payment Status</h1>
      <div className="p-6 bg-white border-2 border-dashed rounded-2xl">
        {status ? (
          <div>
            <div className="text-lg font-bold uppercase">{status.status}</div>
            <p className="text-sm text-gray-500">Ref: {reference}</p>
          </div>
        ) : <div className="text-gray-400">Verifying Transaction...</div>}
      </div>
      <Link href="/portal/dashboard" className="block text-blue-600 underline">Return to Dashboard</Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

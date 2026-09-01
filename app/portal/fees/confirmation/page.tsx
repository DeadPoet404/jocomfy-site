"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useState,
} from "react";
import { apiFetch } from "@/lib/api-client";
import type {
  ApiEnvelope,
  PaymentIntentStatusDetails,
} from "@/lib/portal-types";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] =
    useState<PaymentIntentStatusDetails | null>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      if (!reference) {
        setError("Payment reference is missing.");
        return;
      }

      try {
        const response = await apiFetch(
          `/payments/intents/${encodeURIComponent(reference)}/status?verify=true`,
        ) as ApiEnvelope<PaymentIntentStatusDetails>;

        if (cancelled) return;

        if (response.success && response.data) {
          setStatus(response.data);
        } else {
          setError(
            response.message ||
              "Unable to verify this payment.",
          );
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to reach the school payment service.",
          );
        }
      }
    }

    void verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <h1 className="text-3xl font-bold">
        Payment Status
      </h1>

      <div className="rounded-2xl border-2 border-dashed bg-white p-6">
        {error ? (
          <div
            className="font-bold text-red-600"
            role="alert"
          >
            {error}
          </div>
        ) : status ? (
          <div>
            <div className="text-lg font-bold uppercase">
              {status.status}
            </div>

            <p className="text-sm text-gray-500">
              Ref: {status.reference}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              GHS {status.amount.toFixed(2)}
            </p>
          </div>
        ) : (
          <div className="text-gray-400">
            Verifying Transaction...
          </div>
        )}
      </div>

      <Link
        href="/portal/finance"
        className="block text-blue-600 underline"
      >
        Return to Finance
      </Link>
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

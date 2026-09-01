"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { apiFetch } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import type { ApiEnvelope } from "@/lib/portal-types";

const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 128;

export default function PasswordPage() {
  const { logout, user } = useAuth();
  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] =
    useState(false);
  const logoutTimer = useRef<number | null>(null);

  const isForced =
    Boolean(user?.mustChangePassword);

  useEffect(() => {
    return () => {
      if (logoutTimer.current !== null) {
        window.clearTimeout(logoutTimer.current);
      }
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Enter your current password.");
      return;
    }

    if (
      newPassword.length < MIN_PASSWORD_LENGTH ||
      newPassword.length > MAX_PASSWORD_LENGTH
    ) {
      setError(
        "Your new password must be between 12 and 128 characters.",
      );
      return;
    }

    if (newPassword === currentPassword) {
      setError(
        "Your new password must be different from your current password.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await apiFetch(
        "/auth/password",
        {
          method: "PATCH",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      ) as ApiEnvelope<Record<string, never>>;

      if (!response.success) {
        setError(
          response.message ||
            "Unable to change your password.",
        );
        setSubmitting(false);
        return;
      }

      setSuccess(
        "Password changed. Redirecting you to sign in again…",
      );

      logoutTimer.current = window.setTimeout(
        () => void logout(),
        1200,
      );
    } catch {
      setError(
        "Unable to reach the school server. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#001f54] p-5 sm:p-8">
      <section className="w-full max-w-xl bg-[#fffdf7] p-7 shadow-[12px_12px_0_0_#facc15] sm:p-12">
        {!isForced && (
          <Link
            href="/portal"
            className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#001f54]/60 hover:text-[#001f54]"
          >
            <ArrowLeft size={14} />
            Return to portal
          </Link>
        )}

        <div className="mb-8 flex h-12 w-12 items-center justify-center bg-[#facc15] text-[#001f54]">
          <KeyRound aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-black uppercase tracking-tight text-[#001f54] sm:text-4xl">
          {isForced
            ? "Secure your account"
            : "Change password"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {isForced
            ? "Your school issued a temporary password. Replace it before opening your student records."
            : "Update your student portal password. You will sign in again after the change."}
        </p>

        {isForced && (
          <div className="mt-6 flex gap-3 border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
            <ShieldCheck
              className="mt-0.5 shrink-0"
              size={19}
              aria-hidden="true"
            />
            <p>
              This update is required. Other portal pages remain locked until it is completed.
            </p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 flex gap-3 border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"
          >
            <AlertCircle
              className="shrink-0"
              size={19}
              aria-hidden="true"
            />
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mt-6 flex gap-3 border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700"
          >
            <CheckCircle2
              className="shrink-0"
              size={19}
              aria-hidden="true"
            />
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#001f54]">
              Current password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              disabled={submitting || Boolean(success)}
              required
              className="w-full border-2 border-[#001f54] bg-white p-4 text-sm font-bold outline-none focus:border-[#facc15] disabled:opacity-60"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#001f54]">
              New password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
              maxLength={MAX_PASSWORD_LENGTH}
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              disabled={submitting || Boolean(success)}
              required
              className="w-full border-2 border-[#001f54] bg-white p-4 text-sm font-bold outline-none focus:border-[#facc15] disabled:opacity-60"
              aria-describedby="password-requirements"
            />
            <span
              id="password-requirements"
              className="mt-2 block text-xs text-gray-500"
            >
              Use 12–128 characters. A long, memorable phrase is recommended.
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#001f54]">
              Confirm new password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
              maxLength={MAX_PASSWORD_LENGTH}
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              disabled={submitting || Boolean(success)}
              required
              className="w-full border-2 border-[#001f54] bg-white p-4 text-sm font-bold outline-none focus:border-[#facc15] disabled:opacity-60"
            />
          </label>

          <button
            type="submit"
            disabled={submitting || Boolean(success)}
            className="w-full bg-[#001f54] px-5 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#facc15] hover:text-[#001f54] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Updating password…"
              : "Update password securely"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => void logout()}
          className="mt-7 w-full text-center text-xs font-bold text-gray-500 underline hover:text-[#001f54]"
        >
          Sign out instead
        </button>
      </section>
    </main>
  );
}

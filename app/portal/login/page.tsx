"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useAuth } from "@/lib/auth-context";

export default function PortalLoginPage() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(
        user.mustChangePassword
          ? "/portal/password"
          : "/portal",
      );
    }
  }, [isLoading, router, user]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const authenticatedUser =
        await login(email, password);

      router.replace(
        authenticatedUser.mustChangePassword
          ? "/portal/password"
          : "/portal",
      );
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to sign in.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#001f54] p-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <h1 className="text-[20vw] font-black leading-none text-white">
          PORTAL
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-[#fffdf7] p-8 shadow-2xl sm:p-12"
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#001f54]/60 hover:text-[#001f54]"
        >
          <ArrowLeft size={14} />
          School website
        </Link>

        <div className="mb-10">
          <div className="mb-6 h-1 w-12 bg-[#facc15]" />

          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#001f54]">
            Student
            <br />
            Portal
          </h2>

          <p className="mt-4 text-sm font-medium text-gray-500">
            Sign in with the student login issued by
            the school.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 border border-red-300 bg-red-50 p-3 text-xs font-bold text-red-700"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
              Student email
            </span>

            <span className="flex items-center border-2 border-[#001f54] bg-white px-4 focus-within:border-[#facc15]">
              <Mail size={18} aria-hidden="true" />

              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                className="w-full bg-transparent px-3 py-4 text-sm font-bold outline-none"
                placeholder="student@students.jocomfy.com"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
              Password
            </span>

            <span className="flex items-center border-2 border-[#001f54] bg-white px-4 focus-within:border-[#facc15]">
              <LockKeyhole
                size={18}
                aria-hidden="true"
              />

              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                className="w-full bg-transparent px-3 py-4 text-sm font-bold outline-none"
                placeholder="Enter password"
              />
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full bg-[#001f54] py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#facc15] hover:text-[#001f54] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Signing in…"
              : "Sign in securely"}
          </button>
        </form>

        <p className="mt-8 border-t border-gray-200 pt-6 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Contact the school office if you cannot
          access your account.
        </p>
      </motion.div>
    </main>
  );
}

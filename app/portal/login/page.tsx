"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";

// Real Google G Logo - no library needed
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function PortalLoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  // INT-008b: Google Identity Services is INITIALIZED invisibly; Google's own
  // button is NOT rendered. Our custom-styled button (original design) raises
  // the Google account chooser (One Tap) via prompt(). Falls back to the dev
  // credential when GIS is not configured (NEXT_PUBLIC_GOOGLE_CLIENT_ID empty).
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const gisReady = useRef(false);

  const handleGoogleCredential = async (response: any) => {
    setError("");
    setLoading(true);
    try {
      await login(response.credential); // the ID token — exactly what POST /api/auth/google expects
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!googleClientId) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const g = (window as any).google;
      if (!g?.accounts?.id) return;
      g.accounts.id.initialize({ client_id: googleClientId, callback: handleGoogleCredential });
      gisReady.current = true;
    };
    document.head.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleClientId]);

  // Primary button: original design. Real Google flow when configured.
  const handleLogin = async () => {
    setError("");
    setNotice("");
    const g = (window as any).google;
    if (googleClientId && gisReady.current && g?.accounts?.id) {
      g.accounts.id.prompt((n: any) => {
        if (n.isNotDisplayed() || n.isSkippedMoment()) {
          setNotice("Google's account chooser didn't appear (popup blocked or One Tap cooldown). Try again shortly, or use Dev Sign-In below.");
        }
      });
      return;
    }
    await handleDevLogin(); // no GIS configured → dev path behaves exactly like the old button
  };

  // INT-002/INT-008: dev bypass. portalEmail was rebound to the operator's real
  // Gmail in INT-008 (psql) — this stays deterministic on the same student.
  const handleDevLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login("dev:rolandhodavid@gmail.com");
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#001f54] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <h1 className="text-[20vw] font-black text-white leading-none">PORTAL</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#fffdf7] p-12 relative z-10 shadow-2xl"
      >
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#facc15] mb-6"></div>
          <h2 className="text-4xl font-black text-[#001f54] uppercase tracking-tighter">
            The <br /> Command.
          </h2>
          <p className="text-gray-500 mt-4 font-medium text-sm">
            Parent & Student Access.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs font-bold rounded">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-300 text-amber-700 text-xs font-bold rounded">
            {notice}
          </div>
        )}

        <button 
           onClick={handleLogin}
           disabled={loading}
           className="w-full flex items-center justify-center gap-4 bg-[#001f54] text-white py-5 font-bold uppercase tracking-widest hover:bg-[#facc15] hover:text-[#001f54] transition-all group disabled:opacity-50"
        >
          <GoogleIcon />
          {loading ? "Authenticating..." : "Sign in with Google"}
        </button>

        {googleClientId && (
          <div className="mt-6 text-center">
            <button
              onClick={handleDevLogin}
              disabled={loading}
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#001f54] underline decoration-dotted underline-offset-4 disabled:opacity-50"
            >
              Dev Sign-In (sandbox)
            </button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <span>JOCOMFY OS v1.0</span>
          <span className="text-[#facc15]">Secure Link</span>
        </div>
      </motion.div>
    </main>
  );
}

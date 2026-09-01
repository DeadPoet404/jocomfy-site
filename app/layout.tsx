import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource-variable/geist";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { EnvironmentBanner } from "@/components/shared/EnvironmentBanner";

export const viewport: Viewport = {
  themeColor: "#0d104c",
};

export const metadata: Metadata = {
  title: "Jocomfy International School",
  description: "Knowledge & Wisdom for every child.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body>
        <AuthProvider>
          {children}
          <EnvironmentBanner />
        </AuthProvider>
      </body>
    </html>
  );
}

// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/menu/menu";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Vanesa Carrillo",
  description: "A safe space where Jesus is the center.",
};

// Mark layout as async because params is now a Promise in Next 16
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "es" | "en" }>; // params is a Promise
}) {
  // Await params to extract the locale
  const { locale } = await params;

  return (
    // Only a div wrapper, no <html> or <body> here
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Toaster position="top-right" richColors expand closeButton />
      <Navbar locale={locale} />
      {children}
    </div>
  );
}

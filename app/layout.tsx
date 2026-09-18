import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata: Metadata = {
  title: {
    default: "Teman Digital — Website & Solusi Berbasis Web",
    template: "%s — Teman Digital",
  },
  description:
    "Jasa pembuatan landing page, website portofolio, company profile, website UMKM, organisasi, komunitas, dan aplikasi web sederhana.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppFloat />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: {
    default: "Teman Digital — Website, Dashboard & Web Application",
    template: "%s — Teman Digital",
  },
  description:
    "Website, landing page, dashboard, dan aplikasi web yang dirancang untuk terlihat menarik, bekerja cepat, dan membantu bisnis berkembang.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

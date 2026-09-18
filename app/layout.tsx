import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata: Metadata = {
  title:{default:"Teman Digital — Website Mulai Rp300 Ribu",template:"%s — Teman Digital"},
  description:"Jasa website, portofolio, dashboard, sistem web, dan LMS sederhana dengan harga Rp300–500 ribu.",
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://teman-digital.vercel.app"),
};

export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="id"><body><SmoothScroll>{children}</SmoothScroll><WhatsAppFloat/></body></html>;
}

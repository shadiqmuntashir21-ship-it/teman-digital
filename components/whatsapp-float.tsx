"use client";

import { usePathname } from "next/navigation";

const WA="https://wa.me/6282258687238?text=Halo%20Teman%20Digital%2C%20saya%20ingin%20konsultasi%20tentang%20website%20atau%20sistem%20berbasis%20web.";

export function WhatsAppFloat(){
  const pathname=usePathname();
  if(pathname.startsWith("/admin")) return null;

  return <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Chat Teman Digital lewat WhatsApp">
    <span className="wa-dot">WA</span>
    <span className="wa-label">Chat</span>
  </a>;
}

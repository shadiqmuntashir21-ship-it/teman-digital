import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

type LeadBody = {
  name?: string; business_name?: string; email?: string; phone?: string; service?: string;
  goal?: string; features?: string[]; design_style?: string; timeline?: string; budget?: string; notes?: string;
};

function clean(value: unknown, max = 500) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export async function POST(request: Request) {
  const supabase = createPublicClient();
  if (!supabase) return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });

  let body: LeadBody;
  try { body = (await request.json()) as LeadBody; }
  catch { return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 }); }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 80);
  if (!name || name.length < 2 || !phone || phone.length < 6 || !service) {
    return NextResponse.json({ error: "Nama, WhatsApp, dan jenis project wajib diisi." }, { status: 400 });
  }

  const features = Array.isArray(body.features)
    ? body.features.filter((item): item is string => typeof item === "string").slice(0, 20).map(item => item.slice(0, 80))
    : [];

  const { error } = await supabase.from("leads").insert({
    name, phone, service,
    business_name: clean(body.business_name, 160),
    email: clean(body.email, 180),
    goal: clean(body.goal, 220),
    features,
    design_style: clean(body.design_style, 80),
    timeline: clean(body.timeline, 80),
    budget: clean(body.budget, 80),
    notes: clean(body.notes, 1200),
    status: "new",
    source: "website",
  });

  if (error) {
    console.error("lead_insert_failed", { code: error.code, message: error.message });
    return NextResponse.json({ error: "Project belum berhasil dikirim. Silakan coba lagi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

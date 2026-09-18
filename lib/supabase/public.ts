import { createClient } from "@supabase/supabase-js";

const FALLBACK_SUPABASE_URL = "https://souakvmuoygvsugxmpwd.supabase.co";
// Publishable key only. This is intentionally safe for browser/server public clients.
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_--u2P-Gm5qaogeuV1KD05g_X3q1-eMA";

export function createPublicClient(extraHeaders?: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: extraHeaders ? { headers: extraHeaders } : undefined,
  });
}

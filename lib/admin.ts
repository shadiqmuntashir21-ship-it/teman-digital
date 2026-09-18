import { cookies } from "next/headers";
import { createPublicClient } from "@/lib/supabase/public";

export async function createAdminClient(){
  const token=(await cookies()).get("td_admin")?.value;
  if(!token) return null;
  const supabase=createPublicClient({"x-admin-token":token});
  if(!supabase) return null;
  const {error}=await supabase.from("leads").select("id",{head:true,count:"exact"});
  if(error) return null;
  return supabase;
}

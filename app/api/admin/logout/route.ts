import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createPublicClient } from "@/lib/supabase/public";

export async function POST(){
  const store=await cookies();
  const token=store.get("td_admin")?.value;
  if(token){
    const supabase=createPublicClient();
    if(supabase) await supabase.rpc("admin_logout",{p_token:token});
  }
  const response=NextResponse.json({ok:true});
  response.cookies.set("td_admin","",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});
  return response;
}

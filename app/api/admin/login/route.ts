import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export async function POST(request: Request){
  const supabase=createPublicClient();
  if(!supabase) return NextResponse.json({error:"Supabase belum dikonfigurasi."},{status:503});
  const {pin}=await request.json().catch(()=>({pin:""}));
  if(typeof pin!=="string"||pin.length<4||pin.length>20) return NextResponse.json({error:"PIN tidak valid."},{status:400});

  const {data,error}=await supabase.rpc("admin_login",{p_pin:pin});
  if(error||!data) return NextResponse.json({error:"PIN salah atau akses sementara dikunci."},{status:401});

  const response=NextResponse.json({ok:true});
  response.cookies.set("td_admin",String(data),{
    httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:60*60*12
  });
  return response;
}

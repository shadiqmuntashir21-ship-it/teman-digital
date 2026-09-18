import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/admin";

export async function GET(){
  const supabase=await createAdminClient();
  if(!supabase) return NextResponse.json({error:"Unauthorized"},{status:401});

  const [settings,services,pricing,process,values,projects,testimonials,leads]=await Promise.all([
    supabase.from("site_settings").select("*").eq("id",1).maybeSingle(),
    supabase.from("services").select("*").order("display_order"),
    supabase.from("pricing_packages").select("*").order("display_order"),
    supabase.from("process_steps").select("*").order("display_order"),
    supabase.from("value_points").select("*").order("display_order"),
    supabase.from("portfolio_projects").select("*").order("display_order"),
    supabase.from("testimonials").select("*").order("display_order"),
    supabase.from("leads").select("*").order("created_at",{ascending:false}),
  ]);

  const firstError=[settings,services,pricing,process,values,projects,testimonials,leads].find(x=>x.error)?.error;
  if(firstError) return NextResponse.json({error:firstError.message},{status:500});

  return NextResponse.json({
    settings:settings.data,
    services:services.data??[],pricing:pricing.data??[],process:process.data??[],values:values.data??[],
    projects:projects.data??[],testimonials:testimonials.data??[],leads:leads.data??[]
  });
}

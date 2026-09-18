import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/admin";

const config={
  services:["slug","title","eyebrow","short_description","description","features","starting_price","icon","display_order","active"],
  pricing_packages:["slug","name","description","price_label","features","cta_label","featured","active","display_order"],
  process_steps:["step_no","title","description","display_order","active"],
  value_points:["label","title","description","display_order","active"],
  portfolio_projects:["slug","title","category","excerpt","description","challenge","solution","year","technologies","cover_url","preview_url","repository_url","featured","published","display_order","seo_title","seo_description"],
  testimonials:["name","company","role","quote","avatar_url","project_id","published","display_order"],
  site_settings:["brand_name","hero_eyebrow","hero_title","hero_description","final_cta_title","final_cta_description","footer_tagline","whatsapp","email","instagram_url","linkedin_url","github_url","seo_title","seo_description"],
  leads:["status"],
} as const;

type Resource=keyof typeof config;

function pick(resource:Resource,input:Record<string,unknown>){
  const out:Record<string,unknown>={};
  for(const key of config[resource]) if(key in input) out[key]=input[key];
  for(const key of ["preview_url","cover_url","repository_url"]){
    const value=out[key];
    if(typeof value==="string"&&value&& !/^https?:\/\//i.test(value)) throw new Error(`${key} harus berupa URL http/https`);
  }
  return out;
}

export async function POST(request:Request){
  const supabase=await createAdminClient();
  if(!supabase) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await request.json();
  const resource=body.resource as Resource;
  if(!(resource in config)||resource==="leads"||resource==="site_settings") return NextResponse.json({error:"Resource tidak valid"},{status:400});
  try{
    const payload=pick(resource,body.data??{});
    const {data,error}=await supabase.from(resource).insert(payload).select().single();
    if(error) throw error;
    return NextResponse.json({data});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Gagal menyimpan"},{status:400});}
}

export async function PATCH(request:Request){
  const supabase=await createAdminClient();
  if(!supabase) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await request.json();
  const resource=body.resource as Resource;
  if(!(resource in config)) return NextResponse.json({error:"Resource tidak valid"},{status:400});
  try{
    const payload=pick(resource,body.data??{});
    let query=supabase.from(resource).update(payload);
    query=resource==="site_settings"?query.eq("id",1):query.eq("id",body.id);
    const {data,error}=await query.select().single();
    if(error) throw error;
    return NextResponse.json({data});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Gagal memperbarui"},{status:400});}
}

export async function DELETE(request:Request){
  const supabase=await createAdminClient();
  if(!supabase) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await request.json();
  const resource=body.resource as Resource;
  if(!(resource in config)||resource==="site_settings"||resource==="leads") return NextResponse.json({error:"Resource tidak valid"},{status:400});
  const {error}=await supabase.from(resource).delete().eq("id",body.id);
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({ok:true});
}

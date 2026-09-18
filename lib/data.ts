import { createPublicClient } from "@/lib/supabase/public";

export type Service = {
  id:string; slug:string; title:string; eyebrow:string|null; short_description:string;
  description:string|null; features:string[]; starting_price:string|null; display_order:number;
};
export type Pricing = {
  id:string; slug:string; name:string; description:string; price_label:string;
  features:string[]; cta_label:string; featured:boolean; display_order:number;
};
export type Project = {
  id:string; slug:string; title:string; category:string; excerpt:string; description:string|null;
  challenge:string|null; solution:string|null; year:number|null; technologies:string[];
  cover_url:string|null; preview_url:string|null; repository_url:string|null;
  featured:boolean; published:boolean; display_order:number;
};
export type ProcessStep = { id:string; step_no:number; title:string; description:string; display_order:number; };
export type ValuePoint = { id:string; label:string; title:string; description:string; display_order:number; };
export type SiteSettings = {
  brand_name:string; hero_eyebrow:string; hero_title:string; hero_description:string;
  final_cta_title:string; final_cta_description:string; footer_tagline:string;
  whatsapp:string|null; email:string|null; instagram_url:string|null; linkedin_url:string|null; github_url:string|null;
};

const fallbackServices: Service[] = [
  {id:"1",slug:"landing-page",title:"Landing Page",eyebrow:"CONVERT",short_description:"Halaman fokus untuk campaign, produk, event, dan penawaran yang ingin menghasilkan tindakan.",description:null,features:[],starting_price:"Mulai dari Rp2,5 jt",display_order:1},
  {id:"2",slug:"business-website",title:"Business Website",eyebrow:"TRUST",short_description:"Website profesional yang membuat bisnis terlihat lebih serius dan mudah dipercaya.",description:null,features:[],starting_price:"Mulai dari Rp4,5 jt",display_order:2},
  {id:"3",slug:"dashboard",title:"Dashboard & System",eyebrow:"CONTROL",short_description:"Ubah data dan proses manual menjadi dashboard yang lebih sederhana dan terukur.",description:null,features:[],starting_price:"Custom",display_order:3},
  {id:"4",slug:"web-application",title:"Web Application",eyebrow:"BUILD",short_description:"Produk digital dengan alur, fitur, dan logic yang dibuat sesuai ide bisnis.",description:null,features:[],starting_price:"Custom",display_order:4},
];
const fallbackPricing: Pricing[] = [
  {id:"1",slug:"starter",name:"Starter",description:"Untuk bisnis yang ingin mulai hadir secara profesional.",price_label:"Mulai Rp2,5 jt",features:["Landing page","Responsive design","WhatsApp integration","Basic SEO","Deployment"],cta_label:"Pilih Starter",featured:false,display_order:1},
  {id:"2",slug:"business",name:"Business",description:"Untuk bisnis yang membutuhkan website lebih lengkap dan fleksibel.",price_label:"Mulai Rp4,5 jt",features:["Multi-page website","Custom UI","CMS ready","Analytics","SEO setup"],cta_label:"Pilih Business",featured:true,display_order:2},
  {id:"3",slug:"custom",name:"Custom",description:"Untuk dashboard, web app, dan sistem dengan kebutuhan khusus.",price_label:"Mari diskusi",features:["Dashboard","Database","Authentication","API integration","Custom workflow"],cta_label:"Diskusikan Project",featured:false,display_order:3},
];
const fallbackProcess: ProcessStep[] = [
  {id:"1",step_no:1,title:"Kenalan dulu",description:"Kami pahami bisnis, target, karakter brand, dan apa yang benar-benar ingin dicapai.",display_order:1},
  {id:"2",step_no:2,title:"Susun arah",description:"Struktur, konsep visual, dan pengalaman pengguna dirancang supaya semuanya terasa masuk akal.",display_order:2},
  {id:"3",step_no:3,title:"Mulai dibangun",description:"Desain diubah menjadi website atau sistem fullstack yang responsive dan terintegrasi.",display_order:3},
  {id:"4",step_no:4,title:"Review detail",description:"Kami cek alur, tampilan, performa, dan merapikan bagian yang masih terasa kurang.",display_order:4},
  {id:"5",step_no:5,title:"Siap diluncurkan",description:"Project dideploy, dicek kembali, lalu siap digunakan dan ditunjukkan ke dunia.",display_order:5},
];
const fallbackValues: ValuePoint[] = [
  {id:"1",label:"01",title:"Desain yang punya alasan",description:"Bukan sekadar mengikuti tren. Setiap bagian disusun untuk membantu orang memahami dan mempercayai bisnis Anda.",display_order:1},
  {id:"2",label:"02",title:"Teknologi modern",description:"Struktur yang bersih, cepat, dan fleksibel untuk berkembang ketika kebutuhan bisnis bertambah.",display_order:2},
  {id:"3",label:"03",title:"Halus saat digunakan",description:"Animasi, scrolling, dan interaksi dibuat terasa hidup tanpa membuat website berat atau melelahkan.",display_order:3},
  {id:"4",label:"04",title:"Fokus ke bisnis",description:"Tujuan akhirnya bukan hanya terlihat keren, tetapi membuat pengunjung ingin lanjut, bertanya, dan mengambil tindakan.",display_order:4},
];
const fallbackSettings: SiteSettings = {
  brand_name:"Teman Digital",
  hero_eyebrow:"DESAIN • DEVELOPMENT • DIGITAL EXPERIENCE",
  hero_title:"Bikin bisnis terlihat lebih serius di dunia digital.",
  hero_description:"Website, landing page, dashboard, dan aplikasi web yang dirancang dengan detail — modern, cepat, dan dibuat supaya orang betah melihat lebih jauh.",
  final_cta_title:"Punya ide? Mari kita bikin serius.",
  final_cta_description:"Ceritakan kebutuhanmu. Kami bantu mengubahnya menjadi pengalaman digital yang rapi, menarik, dan siap dipakai.",
  footer_tagline:"Design • Development • Digital Experience",
  whatsapp:null,email:null,instagram_url:null,linkedin_url:null,github_url:null,
};

export function projectThumbnail(project: Pick<Project,"cover_url"|"preview_url">) {
  if (project.cover_url) return project.cover_url;
  if (!project.preview_url) return null;
  return `https://image.thum.io/get/width/1200/crop/800/noanimate/${project.preview_url}`;
}

export async function getHomeData() {
  const supabase=createPublicClient();
  if(!supabase) return {services:fallbackServices,pricing:fallbackPricing,projects:[] as Project[],process:fallbackProcess,values:fallbackValues,settings:fallbackSettings};

  const [servicesResult,pricingResult,projectsResult,processResult,valuesResult,settingsResult]=await Promise.all([
    supabase.from("services").select("*").eq("active",true).order("display_order"),
    supabase.from("pricing_packages").select("*").eq("active",true).order("display_order"),
    supabase.from("portfolio_projects").select("*").eq("published",true).order("featured",{ascending:false}).order("display_order"),
    supabase.from("process_steps").select("id,step_no,title,description,display_order").eq("active",true).order("display_order"),
    supabase.from("value_points").select("id,label,title,description,display_order").eq("active",true).order("display_order"),
    supabase.from("site_settings").select("*").eq("id",1).maybeSingle(),
  ]);

  return {
    services:(servicesResult.data as Service[]|null)??fallbackServices,
    pricing:(pricingResult.data as Pricing[]|null)??fallbackPricing,
    projects:(projectsResult.data as Project[]|null)??[],
    process:(processResult.data as ProcessStep[]|null)??fallbackProcess,
    values:(valuesResult.data as ValuePoint[]|null)??fallbackValues,
    settings:(settingsResult.data as SiteSettings|null)??fallbackSettings,
  };
}

export async function getProjects(){
  const supabase=createPublicClient(); if(!supabase) return [] as Project[];
  const {data}=await supabase.from("portfolio_projects").select("*").eq("published",true).order("featured",{ascending:false}).order("display_order");
  return (data as Project[]|null)??[];
}

export async function getProject(slug:string){
  const supabase=createPublicClient(); if(!supabase) return null;
  const {data}=await supabase.from("portfolio_projects").select("*").eq("slug",slug).eq("published",true).maybeSingle();
  return data as Project|null;
}

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
  {id:"1",slug:"landing-page",title:"Landing Page",eyebrow:"PROMOSI",short_description:"Satu halaman fokus untuk promosi, campaign, produk, event, atau informasi penting.",description:null,features:[],starting_price:"Mulai Rp300 ribu",display_order:1},
  {id:"2",slug:"company-profile",title:"Website Company Profile",eyebrow:"PROFESIONAL",short_description:"Website profil usaha, lembaga, sekolah, atau layanan agar terlihat lebih rapi dan terpercaya.",description:null,features:[],starting_price:"Mulai Rp400 ribu",display_order:2},
  {id:"3",slug:"business-website",title:"Website UMKM & Bisnis",eyebrow:"USAHA",short_description:"Website untuk usaha lokal yang ingin menjelaskan produk, layanan, dan kontak dengan lebih jelas.",description:null,features:[],starting_price:"Mulai Rp500 ribu",display_order:3},
  {id:"4",slug:"portfolio-website",title:"Website Portofolio",eyebrow:"PERSONAL",short_description:"Website untuk menampilkan karya, pengalaman, project, profil profesional, atau personal branding.",description:null,features:[],starting_price:"Mulai Rp350 ribu",display_order:4},
  {id:"5",slug:"organization-website",title:"Website Organisasi & Komunitas",eyebrow:"KOMUNITAS",short_description:"Website untuk komunitas, organisasi, himpunan, yayasan, sekolah, atau kelompok kegiatan.",description:null,features:[],starting_price:"Mulai Rp450 ribu",display_order:5},
  {id:"6",slug:"web-app-dashboard",title:"Aplikasi Web & Dashboard",eyebrow:"SISTEM WEB",short_description:"Solusi berbasis web sederhana untuk kebutuhan data, form, dashboard, atau alur kerja tertentu.",description:null,features:[],starting_price:"Mulai Rp700 ribu",display_order:6},
];
const fallbackPricing: Pricing[] = [
  {id:"1",slug:"hemat",name:"Hemat",description:"Untuk kebutuhan sederhana yang ingin cepat online dan tetap terlihat rapi.",price_label:"Rp300 ribu",features:["1 halaman utama","Responsive mobile","CTA WhatsApp","Basic SEO","Deploy"],cta_label:"Tanya Paket Hemat",featured:false,display_order:1},
  {id:"2",slug:"standar",name:"Standar",description:"Untuk website yang butuh lebih banyak informasi, section, dan tampilan lebih lengkap.",price_label:"Rp500 ribu",features:["Beberapa section/halaman","Responsive mobile","WhatsApp & kontak","Galeri/layanan","Revisi ringan"],cta_label:"Pilih Paket Standar",featured:true,display_order:2},
  {id:"3",slug:"lengkap",name:"Lengkap",description:"Untuk kebutuhan yang lebih kompleks dalam batas project web sederhana.",price_label:"Rp700 ribu",features:["Struktur lebih lengkap","Komponen interaktif","Form atau data sederhana","Responsive mobile","Pendampingan setup"],cta_label:"Diskusikan Paket Lengkap",featured:false,display_order:3},
];
const fallbackProcess: ProcessStep[] = [
  {id:"1",step_no:1,title:"Kenalan dulu",description:"Kami pahami kebutuhan, target, dan hasil yang benar-benar ingin dicapai.",display_order:1},
  {id:"2",step_no:2,title:"Susun arah",description:"Struktur, konsep visual, dan pengalaman pengguna dirancang supaya semuanya terasa masuk akal.",display_order:2},
  {id:"3",step_no:3,title:"Mulai dibangun",description:"Desain diubah menjadi website atau sistem berbasis web yang responsive dan rapi.",display_order:3},
  {id:"4",step_no:4,title:"Review detail",description:"Kami cek alur, tampilan, performa, dan merapikan bagian yang masih terasa kurang.",display_order:4},
  {id:"5",step_no:5,title:"Siap diluncurkan",description:"Project dideploy, dicek kembali, lalu siap digunakan dan dibagikan.",display_order:5},
];
const fallbackValues: ValuePoint[] = [
  {id:"1",label:"01",title:"Desain yang punya alasan",description:"Bukan sekadar mengikuti tren. Setiap bagian disusun supaya pengunjung cepat paham dan nyaman.",display_order:1},
  {id:"2",label:"02",title:"Sesuai kebutuhan",description:"Kami mulai dari masalah dan tujuan, lalu pilih bentuk web yang paling masuk akal.",display_order:2},
  {id:"3",label:"03",title:"Nyaman di HP",description:"Layout, tombol, teks, dan alur dipikirkan untuk layar portrait, bukan hanya desktop.",display_order:3},
  {id:"4",label:"04",title:"Mudah dihubungi",description:"WhatsApp menjadi jalur utama supaya calon pengguna tidak bingung harus mulai dari mana.",display_order:4},
];
const fallbackSettings: SiteSettings = {
  brand_name:"Teman Digital",
  hero_eyebrow:"WEBSITE • PORTOFOLIO • SISTEM BERBASIS WEB",
  hero_title:"Punya kebutuhan digital? Biar kami bantu bikin lebih rapi, menarik, dan siap dipakai.",
  hero_description:"Dari landing page, website portofolio, company profile, website komunitas, sampai aplikasi web sederhana — kami bantu pilih solusi yang pas tanpa bikin prosesnya ribet.",
  final_cta_title:"Ada yang ingin dibuat? Ceritakan saja dulu.",
  final_cta_description:"Konsultasi santai lewat WhatsApp. Kami bantu arahkan kebutuhanmu dan menyesuaikan solusi dengan budget yang masuk akal.",
  footer_tagline:"Website • Portfolio • Web Solution",
  whatsapp:"082258687238",email:null,instagram_url:null,linkedin_url:null,github_url:null,
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

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
  {id:"1",slug:"landing-page",title:"Landing Page",eyebrow:"PROMOSI",short_description:"Untuk promosi, campaign, produk, event, atau satu penawaran utama.",description:null,features:[],starting_price:"Mulai Rp300 ribu",display_order:1},
  {id:"2",slug:"company-profile",title:"Website Company Profile",eyebrow:"PROFIL",short_description:"Profil usaha, lembaga, sekolah, jasa, atau brand agar lebih mudah dipercaya.",description:null,features:[],starting_price:"Mulai Rp400 ribu",display_order:2},
  {id:"3",slug:"portfolio-website",title:"Website Portofolio",eyebrow:"PORTOFOLIO",short_description:"Menampilkan karya, project, pengalaman, dan personal branding secara rapi.",description:null,features:[],starting_price:"Mulai Rp350 ribu",display_order:3},
  {id:"4",slug:"business-catalog",title:"Website UMKM & Katalog",eyebrow:"USAHA",short_description:"Menampilkan produk, layanan, katalog, lokasi, dan kontak dalam satu website.",description:null,features:[],starting_price:"Mulai Rp500 ribu",display_order:4},
  {id:"5",slug:"organization-community",title:"Website Organisasi & Komunitas",eyebrow:"ORGANISASI",short_description:"Profil organisasi, kepengurusan, kegiatan, berita, dan dokumentasi.",description:null,features:[],starting_price:"Mulai Rp450 ribu",display_order:5},
  {id:"6",slug:"dashboard-system",title:"Dashboard & Sistem Informasi",eyebrow:"SISTEM CUSTOM",short_description:"Mengelola data, formulir, laporan, admin, dan alur kerja internal.",description:null,features:[],starting_price:"Rp700 ribu",display_order:6},
  {id:"7",slug:"lms-elearning",title:"LMS / E-Learning",eyebrow:"PEMBELAJARAN",short_description:"Materi, tugas, progress, kelas, dan pengelolaan pembelajaran berbasis web.",description:null,features:[],starting_price:"Rp700 ribu",display_order:7},
];

const fallbackPricing: Pricing[] = [
  {id:"1",slug:"dasar",name:"Web Dasar",description:"Untuk landing page atau kebutuhan satu halaman yang ingin cepat tayang.",price_label:"Rp300 ribu",features:["Landing page / 1 halaman","Responsive mobile","CTA WhatsApp","Basic SEO","Deploy"],cta_label:"Tanya Paket Dasar",featured:false,display_order:1},
  {id:"2",slug:"lengkap",name:"Website Lengkap",description:"Untuk profil, katalog, portofolio, organisasi, atau kebutuhan multi-section.",price_label:"Rp500 ribu",features:["Beberapa section/halaman","Responsive mobile","WhatsApp & kontak","Galeri / katalog","Revisi ringan"],cta_label:"Pilih Website Lengkap",featured:true,display_order:2},
  {id:"3",slug:"sistem-custom",name:"Sistem Custom",description:"Untuk dashboard, sistem informasi, LMS, admin panel, atau aplikasi web sederhana.",price_label:"Rp700 ribu",features:["Dashboard / LMS sederhana","Login & admin","Database / form data","Responsive mobile","Setup & pendampingan"],cta_label:"Diskusikan Sistem Custom",featured:false,display_order:3},
];

const fallbackProcess: ProcessStep[] = [
  {id:"1",step_no:1,title:"Ceritakan kebutuhan",description:"Sampaikan tujuan, target pengguna, dan apa yang ingin dibuat.",display_order:1},
  {id:"2",step_no:2,title:"Tentukan scope",description:"Kami rapikan halaman, fitur, timeline, dan batas pekerjaan.",display_order:2},
  {id:"3",step_no:3,title:"Desain & build",description:"Tampilan dan fungsi dikerjakan sesuai arah yang sudah disepakati.",display_order:3},
  {id:"4",step_no:4,title:"Review",description:"Kamu cek hasilnya, lalu kami rapikan bagian yang perlu revisi.",display_order:4},
  {id:"5",step_no:5,title:"Launch",description:"Setelah siap, project dideploy dan bisa langsung digunakan.",display_order:5},
];

const fallbackValues: ValuePoint[] = [
  {id:"1",label:"01",title:"Tampilan yang meyakinkan",description:"Desain dibuat rapi dan terasa profesional tanpa harus terlihat berlebihan.",display_order:1},
  {id:"2",label:"02",title:"Scope jelas dari awal",description:"Halaman, fitur, revisi, dan batas pekerjaan disepakati sebelum mulai.",display_order:2},
  {id:"3",label:"03",title:"Nyaman di semua layar",description:"Desktop maupun HP tetap enak dibaca, disentuh, dan dinavigasi.",display_order:3},
  {id:"4",label:"04",title:"Siap dikembangkan",description:"Fondasi dibuat agar mudah dilanjutkan ketika kebutuhan bertambah.",display_order:4},
];

const fallbackSettings: SiteSettings = {
  brand_name:"Teman Digital",
  hero_eyebrow:"WEBSITE • DASHBOARD • SISTEM BERBASIS WEB",
  hero_title:"Website yang rapi, meyakinkan, dan tetap terjangkau.",
  hero_description:"Untuk UMKM, sekolah, organisasi, komunitas, portofolio, dan kebutuhan sistem berbasis web.",
  final_cta_title:"Punya ide project?",
  final_cta_description:"Ceritakan singkat. Kami bantu pilih bentuk web yang paling pas.",
  footer_tagline:"Website • Dashboard • Sistem Web",
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

import { createPublicClient } from "@/lib/supabase/public";

export type Service = {
  id: string; slug: string; title: string; eyebrow: string | null;
  short_description: string; starting_price: string | null; display_order: number;
};
export type Pricing = {
  id: string; slug: string; name: string; description: string; price_label: string;
  features: string[]; cta_label: string; featured: boolean; display_order: number;
};
export type Project = {
  id: string; slug: string; title: string; category: string; excerpt: string;
  description: string | null; challenge: string | null; solution: string | null;
  year: number | null; technologies: string[]; cover_url: string | null;
  preview_url: string | null; repository_url: string | null; featured: boolean; display_order: number;
};
export type SiteSettings = {
  brand_name: string; hero_eyebrow: string; hero_title: string; hero_description: string;
};

const fallbackServices: Service[] = [
  { id: "1", slug: "landing-page", title: "Landing Page", eyebrow: "CONVERT", short_description: "Halaman fokus untuk campaign dan penawaran yang ingin menghasilkan tindakan.", starting_price: "Mulai dari Rp2,5 jt", display_order: 1 },
  { id: "2", slug: "business-website", title: "Business Website", eyebrow: "TRUST", short_description: "Website profesional yang membuat bisnis terlihat lebih serius dan mudah dipercaya.", starting_price: "Mulai dari Rp4,5 jt", display_order: 2 },
  { id: "3", slug: "dashboard", title: "Dashboard & System", eyebrow: "CONTROL", short_description: "Ubah data dan proses manual menjadi dashboard yang lebih sederhana dan terukur.", starting_price: "Custom", display_order: 3 },
  { id: "4", slug: "web-application", title: "Web Application", eyebrow: "BUILD", short_description: "Produk digital dengan alur, fitur, dan logic yang dibuat sesuai ide bisnis.", starting_price: "Custom", display_order: 4 },
];
const fallbackPricing: Pricing[] = [
  { id: "1", slug: "starter", name: "Starter", description: "Untuk bisnis yang ingin mulai hadir secara profesional.", price_label: "Mulai Rp2,5 jt", features: ["Landing page","Responsive design","WhatsApp integration","Basic SEO","Deployment"], cta_label: "Pilih Starter", featured: false, display_order: 1 },
  { id: "2", slug: "business", name: "Business", description: "Untuk bisnis yang membutuhkan website lebih lengkap dan fleksibel.", price_label: "Mulai Rp4,5 jt", features: ["Multi-page website","Custom UI","CMS ready","Analytics","SEO setup"], cta_label: "Pilih Business", featured: true, display_order: 2 },
  { id: "3", slug: "custom", name: "Custom", description: "Untuk dashboard, web app, dan sistem dengan kebutuhan khusus.", price_label: "Let’s talk", features: ["Dashboard","Database","Authentication","API integration","Custom workflow"], cta_label: "Diskusikan Project", featured: false, display_order: 3 },
];
const fallbackSettings: SiteSettings = {
  brand_name: "Teman Digital",
  hero_eyebrow: "DESIGN • DEVELOPMENT • DIGITAL EXPERIENCE",
  hero_title: "Ide bagus pantas punya pengalaman digital yang bagus.",
  hero_description: "Website, landing page, dashboard, dan aplikasi web yang dirancang untuk terlihat menarik, bekerja cepat, dan membantu bisnis berkembang.",
};

export async function getHomeData() {
  const supabase = createPublicClient();
  if (!supabase) return { services: fallbackServices, pricing: fallbackPricing, projects: [] as Project[], settings: fallbackSettings };

  const [servicesResult, pricingResult, projectsResult, settingsResult] = await Promise.all([
    supabase.from("services").select("id,slug,title,eyebrow,short_description,starting_price,display_order").eq("active", true).order("display_order"),
    supabase.from("pricing_packages").select("id,slug,name,description,price_label,features,cta_label,featured,display_order").eq("active", true).order("display_order"),
    supabase.from("portfolio_projects").select("id,slug,title,category,excerpt,description,challenge,solution,year,technologies,cover_url,preview_url,repository_url,featured,display_order").eq("published", true).order("featured", { ascending: false }).order("display_order"),
    supabase.from("site_settings").select("brand_name,hero_eyebrow,hero_title,hero_description").eq("id", 1).maybeSingle(),
  ]);

  return {
    services: (servicesResult.data as Service[] | null) ?? fallbackServices,
    pricing: (pricingResult.data as Pricing[] | null) ?? fallbackPricing,
    projects: (projectsResult.data as Project[] | null) ?? [],
    settings: (settingsResult.data as SiteSettings | null) ?? fallbackSettings,
  };
}

export async function getProjects() {
  const supabase = createPublicClient();
  if (!supabase) return [] as Project[];
  const { data } = await supabase
    .from("portfolio_projects")
    .select("id,slug,title,category,excerpt,description,challenge,solution,year,technologies,cover_url,preview_url,repository_url,featured,display_order")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("display_order");
  return (data as Project[] | null) ?? [];
}

export async function getProject(slug: string) {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("portfolio_projects")
    .select("id,slug,title,category,excerpt,description,challenge,solution,year,technologies,cover_url,preview_url,repository_url,featured,display_order")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data as Project | null;
}

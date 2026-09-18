import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const projects = await getProjects();
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/start-project`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map(project => ({ url: `${base}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}

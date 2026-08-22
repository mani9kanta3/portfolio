import type { MetadataRoute } from "next";
import { VISIBLE_PROJECTS } from "@/lib/projects";

const BASE = "https://manikanta.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...VISIBLE_PROJECTS.map((project) => ({
      url: `${BASE}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

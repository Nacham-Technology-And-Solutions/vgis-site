import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";

/** Bump when content changes materially; avoids every deploy claiming every page changed. */
const CONTENT_UPDATED = new Date("2026-11-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, s.discipline === "3d" ? 0.9 : 0.8)),
    page("/work", 0.8, "weekly"),
    ...projects.map((p) => page(`/work/${p.slug}`, 0.6)),
    page("/process", 0.6),
    page("/insights", 0.7, "weekly"),
    ...insights.map((p) => ({ ...page(`/insights/${p.slug}`, 0.6), lastModified: new Date(p.date) })),
    page("/about", 0.7),
    page("/faq", 0.7),
    page("/contact", 0.8, "yearly"),
    page("/privacy", 0.2, "yearly"),
    // /offers/* are ad landing pages: noindex and deliberately not listed.
  ];
}

import type { Metadata } from "next";
import { SITE_URL, company } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the page title verbatim (no " | VGIS" suffix). */
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

/** Builds consistent per-page metadata: canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path, absoluteTitle, ogType = "website" }: PageMeta): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${company.shortName}®`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url, type: ogType },
    twitter: { title: fullTitle, description },
  };
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

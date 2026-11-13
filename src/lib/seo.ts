import type { Metadata } from "next";
import { SITE_URL, company } from "@/content/site";

/**
 * Next.js replaces (does not merge) nested metadata objects, so every page that sets
 * openGraph/twitter must spread these defaults or it loses the share image, site name and card.
 */
export const ogDefaults = {
  siteName: "VGIS®",
  locale: "en_NG",
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VGIS®: Bridging the gap between imagination and reality" }],
};
export const twitterDefaults = {
  card: "summary_large_image" as const,
  site: "@3dvgis",
  creator: "@3dvgis",
  images: ["/opengraph-image"],
};

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
    openGraph: { ...ogDefaults, title: fullTitle, description, url, type: ogType },
    twitter: { ...twitterDefaults, title: fullTitle, description },
  };
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

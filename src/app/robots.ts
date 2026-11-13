import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Production: open to search engines and AI answer engines (being cited by ChatGPT, Perplexity,
 * Gemini, Claude etc. is the point of AEO). Preview deployments are blocked so they never
 * compete with 3dvgis.com.
 */
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  if (!isProd) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Explicitly welcome answer-engine and AI search crawlers.
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "Bingbot"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

import type { NextConfig } from "next";

/**
 * Permanent (308) redirects from the old cPanel site (vgis-web) so existing rankings and
 * backlinks on 3dvgis.com carry over at domain cutover. Keep these for at least 12 months.
 */
const legacy: [string, string][] = [
  ["/index.html", "/"],
  // 3D studio
  ["/3d", "/services"],
  ["/3d/index.html", "/services"],
  ["/3d/services.html", "/services"],
  ["/3d/portfolio.html", "/work"],
  ["/3d/portfolio-story.html", "/work/castries-redevelopment"],
  ["/3d/team.html", "/about"],
  ["/3d/blog.html", "/faq"],
  ["/3d/blog-post.html", "/skyframe-xr"],
  ["/3d/contact.html", "/contact"],
  // 2D studio
  ["/2d", "/services"],
  ["/2d/index.html", "/services"],
  ["/2d/services.html", "/services/brand-identity"],
  ["/2d/portfolio.html", "/work"],
  ["/2d/portfolio-details.html", "/work/nacham"],
  ["/2d/team.html", "/about"],
  ["/2d/blog.html", "/faq"],
  ["/2d/blog-post.html", "/services/brand-identity"],
  ["/2d/contact.html", "/contact"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Plan uploads on the enquiry form (Vercel caps request bodies at ~4.5 MB).
  experimental: { serverActions: { bodySizeLimit: "4.5mb" } },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Skyframe XR is a product area on the main site.
      { source: "/services/skyframe-xr", destination: "/skyframe-xr", permanent: true },
      ...legacy.flatMap(([from, to]) => [
        { source: from, destination: to, permanent: true },
        // also catch trailing-slash variants (e.g. /3d/)
        ...(from.endsWith(".html") ? [] : [{ source: `${from}/`, destination: to, permanent: true }]),
      ]),
      // Old static asset paths
      { source: "/assets/vgis-logo.:ext(png|jpg)", destination: "/brand/vgis-logo.png", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;

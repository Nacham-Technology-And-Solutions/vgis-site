# vgis-site

The VGIS® (Visual Graphics Illustration Services Limited) website, built with Next.js and hosted on Vercel.
It replaces the cPanel static site (`vgis-web`) at **https://3dvgis.com**.

See **[docs/REBUILD-PLAN.md](docs/REBUILD-PLAN.md)** for the review, architecture, SEO/AEO plan and cutover checklist.

## Develop

```bash
npm install
cp .env.example .env.local   # optional: contact form keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Where things live

| Path | What |
|---|---|
| `src/content/` | **All site facts and copy.** Edit here, not in pages: company, services, projects, team, FAQs, process. |
| `src/lib/schema.ts` | JSON-LD builders (Organization, offices, Service, FAQPage, etc.) |
| `src/lib/seo.ts` | Per-page metadata helper (canonical, OG, Twitter) |
| `src/app/` | Routes, `sitemap.ts`, `robots.ts`, `llms.txt`, `opengraph-image.tsx` |
| `next.config.ts` | Legacy URL redirects and security headers |
| `public/brand/` | Official logo |

## Content rules

- Brand: Bebas Neue headings, Inter body, black and white with VGIS Orange (`#FF6600`) as an accent only. Use the official logo in black and white with a subtle drop shadow. Use ®.
- Publish only facts the company can stand behind: no invented stats, people, testimonials or third-party images.
- To add project images, put files in `public/work/<slug>/` and add them to `images` in `src/content/projects.ts`.

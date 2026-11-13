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

## Ad landing pages (`/offers`)

One page per offer at `/offers/<slug>`, for paid traffic. Each has a minimal header with no main navigation, the quote form above the fold, and WhatsApp as the main action. They are `noindex` and left out of the sitemap so they don't compete with the service pages; ad platform crawlers can still read them.

- **Edit offers** in `src/content/offers.ts`. Page copy and ad copy live together so they always match.
- **Ad kit:** open `/offers` (internal, not indexed) for each offer's URL, tracking links per platform, keywords, audiences, headlines, descriptions and primary text. Character counts are checked against Google limits.
- **Attribution:** `utm_*`, `gclid`, `fbclid` and `li_fat_id` are stored for the session on arrival. WhatsApp messages end with `(Ref: <offer> · <source>/<medium>/<campaign>)`, and form emails include every tag, so each lead can be traced to its ad.
- **Conversions:** set `NEXT_PUBLIC_META_PIXEL_ID` and/or `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` (and optionally `NEXT_PUBLIC_GA4_ID`) in Vercel. A lead fires on every WhatsApp click (Meta `Contact`) and form submission (Meta `Lead`, Google Ads conversion). Nothing third-party loads until these are set.
- `/privacy` is the privacy policy that Google Ads and Meta require for lead-collecting pages.

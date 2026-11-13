# 3dvgis.com rebuild plan

Moving the VGIS® website from the static cPanel site (`vgis-web`) to a Next.js app on Vercel
(`vgis-site`). The new site will take over **https://3dvgis.com** at cutover.

Sources, in priority order: the VGIS Brand Guide artifact (Nov 2026), the Brand Guidelines PDF,
and the Company Profile PDF. Owner decision (13 Nov 2026): use **®**, not ™.

---

## 1. Review of the current site (`vgis-web`)

| Area | Finding | Action in rebuild |
|---|---|---|
| Structure | Two parallel mini-sites (`/3d/*.html`, `/2d/*.html`) with duplicated team, blog, contact and portfolio pages. Thin, overlapping pages compete with each other for the same queries. | One site, one URL per topic. Every old URL 301s to its new equivalent (`next.config.ts`). |
| Unverified content | 20 AI-generated team portraits of people who are not in the company profile (e.g. David Park, Sarah Lindqvist, Marcus Chen). Stats (240+ projects, 14 years, 97% repeat clients, 11 specialists), unattributed testimonials, and blog posts credited to these people. Joshua Nwambe is called "founder in 2011"; the profile names Precious Chikezie as Director/CEO. | Removed. Only facts from the profile are published. Fabricated people, stats and reviews breach Google's spam and review policies and undermine E-E-A-T and AI-answer trust. |
| Portfolio images | Several images look like third-party work (e.g. a *Science* magazine cover, editorial spreads, abstract stock renders). Ownership can't be verified. | Not carried over. Projects use a branded plan-sheet panel until the owner supplies real VGIS renders (see §6). |
| Brand | Fonts were right (Bebas Neue and Inter), but the palette drifted and the dark 3D / paper 2D themes split the brand. | One system: Obsidian Black, Pure White, VGIS Orange accent only. Official logo in black and white with a subtle drop shadow, clear space of one "V". |
| Technical SEO | Relative `og:image`, so social shares break. JSON-LD `sameAs` points to wrong profiles (`instagram.com/vgis_3d`, `linkedin.com/company/vgis`). No per-page structured data. The sitemap lists placeholder pages (`blog-post.html`). | Absolute OG image generated per site, correct `sameAs`, full entity graph, generated sitemap. |
| Performance | Unoptimised images up to 7680×4320 and 1.8 MB, and 0.6 to 0.8 MB team PNGs. | `next/image` (AVIF/WebP, responsive sizes, lazy loading), self-hosted fonts, about 112 kB first-load JS. |
| Hosting | rsync to cPanel on push to `main`. | Vercel Git integration: preview per PR, production on `main`. |

## 2. Stack

- **Next.js 15 (App Router), TypeScript, Tailwind CSS v4.** Every page is statically generated (SSG), so HTML is complete for crawlers and AI bots without running JavaScript.
- **Content as typed data** in `src/content/*`. One source of truth feeds pages, JSON-LD, sitemap and `llms.txt`, so facts can't drift between them.
- `next/font` self-hosts Bebas Neue and Inter (no layout shift, no third-party request).
- **Vercel Analytics and Speed Insights** for real-user Core Web Vitals.
- **Contact form:** a server action sends through Resend's API. If the keys aren't set, the form falls back to `info@3dvgis.com`.

## 3. Information architecture

```
/                                   Home: definition, both disciplines, work, FAQ
/services                           Hub: 3D core + 2D support
/services/architectural-visualization
/services/product-visualization
/services/cinematic-walkthroughs
/services/skyframe-xr
/services/brand-identity
/services/graphic-design
/services/motion-graphics
/work                               Signature projects (3D, 2D)
/work/[7 projects]                  Castries, Cavacha Garden, Cedarwood City, Nâcham, Gethsemane, Infra-Tech, Bliss
/process                            The three VGIS workflows (3D, XR, 2D)
/about                              Story (VG3DS → VGIS), vision, mission, leadership, credentials
/faq                                All Q&A, grouped
/contact                            Form, emails, phones, both offices
/llms.txt  /sitemap.xml  /robots.txt  /opengraph-image  /manifest.webmanifest
```

Phase 2 adds: `/insights` (articles) and location landing pages (see §5).

## 4. SEO: implemented in phase 1

- **Per-page metadata:** unique title (keyword first, then "| VGIS®"), a 140 to 160 character description, a self-referencing canonical on `https://3dvgis.com`, and Open Graph and Twitter tags.
- **Structured data (JSON-LD `@graph` with stable `@id`s):**
  - On every page: `Organization` (legal name, former name VG3DS, RC number, logo, `sameAs`, `areaServed`, `contactPoint`, `knowsAbout`), two `ProfessionalService` offices (Abuja, Bida), four `Person` entries for leadership, and `WebSite`.
  - On specific pages: `Service` with `OfferCatalog` for each service, `CreativeWork` for each project, `FAQPage`, `BreadcrumbList`, `HowTo` for each process, and `AboutPage`, `ContactPage` and `CollectionPage`.
- **Sitemap:** generated from content, with a fixed `lastModified` so it isn't bumped on every deploy.
- **Robots:** production is open, and preview deployments are fully disallowed so they never compete with the live domain.
- **Redirects:** every legacy URL gets a permanent redirect (`/3d/portfolio-story.html` → `/work/castries-redevelopment`, `/2d/portfolio-details.html` → `/work/nacham`, and so on).
- **Internal linking:** service ↔ project ↔ related services, breadcrumbs, a full footer sitemap, and a 404 page that links to every service.
- **Accessibility:** one `h1` per page, semantic landmarks, a skip link, native `<details>` FAQs with no JS, visible focus, and reduced-motion support. VGIS Orange text on white uses `#B34700` to pass AA contrast.
- **Security headers:** HSTS, `nosniff`, frame and referrer policy, permissions policy.

## 5. AEO (answer-engine optimisation) and GEO

Goal: when someone asks ChatGPT, Perplexity, Gemini, Google AI Overviews or Claude "who does 3D architectural visualisation in Abuja?", they should name VGIS correctly and cite 3dvgis.com.

Implemented:
- **Entity definition sentence** (`company.definition`), repeated word for word in the meta description, the home "What is VGIS?" box, `/about`, `Organization.description` and `llms.txt`. Consistent wording helps models resolve the entity.
- **Answer-first blocks:** every service page opens with a 40 to 60 word "What is X?" answer that can be quoted on its own.
- **FAQs written as standalone answers.** The first sentence answers the question.
- **`/llms.txt`:** a plain-language map of the company, services, projects, leadership and facts for AI crawlers.
- **AI crawlers explicitly allowed** in `robots.txt`: GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended and others.
- **Disambiguation:** `alternateName` covers VG3DS, Visual Graphics 3D Services and 3D VGIS. The RC number is a verifiable identifier, and `sameAs` links to the official socials.

Phase 2 (after launch):
1. **Google Business Profile** for the Abuja office: same name, address and phone (NAP) as the schema, category "Architectural visualisation service" or "Graphic designer", and real photos. Ebere and Revival Claude are already doing this for Nâcham, so reuse that playbook.
2. **Bing Places** and **Apple Business Connect** with the same NAP.
3. **Citations and consistency:** update Instagram, Facebook, YouTube, LinkedIn and Behance bios to the same definition sentence and link to `https://3dvgis.com`.
4. **Location pages** (only with real substance): `/3d-visualisation-abuja`, `/3d-visualisation-lagos`, with projects and clients from each city.
5. **Insights:** 1 to 2 expert articles a month by named leadership (Joshua on rendering, Henry on branding, Precious on XR), using `Article` schema with `author` → `Person`. Real authors only.
6. **Reviews:** collect genuine, attributable client testimonials (name, role, company, with permission). Then add `Review` markup on the GBP side.
7. **Media:** embed the YouTube walkthroughs on project pages (`VideoObject` schema). Video is heavily used in AI and Google results for visualisation queries.
8. **Monitoring:** Google Search Console and Bing Webmaster Tools (verification env vars are wired in), Vercel Speed Insights, and a monthly check of how AI assistants describe VGIS.

## 6. Content needed from the owner (blocking a polished launch)

1. **Real project images:** 3 to 6 high-resolution renders or artwork per signature project, plus any other approved work. Drop them in `public/work/<slug>/` and list them in `src/content/projects.ts` (`images`).
2. **Project details:** location, client type, a one-line brief and outcome per project, and years for the 2D projects.
3. **Leadership photos** (real, approved) for `/about`.
4. **Testimonials:** genuine and attributable only.
5. **Skyframe XR:** should `skyframexr.3dvgis.com` stay a separate site, or redirect to `/services/skyframe-xr`? Should `2d.3dvgis.com` redirect to `/services`? (Recommended: redirect both, to consolidate authority.)
6. Opening hours for GBP and schema. (TikTok @3d.vgis and X @3d_vgis were confirmed by Geburah on 13 Nov and added.)
7. A **logo master** as a transparent PNG or SVG (current file is a flattened PNG).

## 7. Cutover checklist (3dvgis.com → Vercel)

1. Import `vgis-site` into Vercel (framework: Next.js, root: repo root). Set env vars from `.env.example`.
2. Verify the domain `web@3dvgis.com` (or similar) in Resend, then test the contact form on a preview.
3. Run Lighthouse and the Rich Results Test on the preview URL. Validate `/sitemap.xml` and `/llms.txt`.
4. Back up the old site in cPanel. Lower the DNS TTL to 300 s a day before cutover.
   Context from Revival Claude (13 Nov): 3dvgis.com is an addon domain on the nachamtns Namecheap cPanel and currently sits
   behind Namecheap's HTTPS proxy. For nachamtns.com they changed only `A @` and `CNAME www`, left mail records alone, and email kept working.
   Make sure the Namecheap proxy is turned off for the apex, so Vercel can issue the certificate.
5. Add `3dvgis.com` and `www.3dvgis.com` in Vercel. Set **apex as primary** and redirect `www` → apex.
6. At the DNS host (cPanel or registrar): apex `A` → `76.76.21.21`, and `www` `CNAME` → `cname.vercel-dns.com`, or whatever Vercel shows. **Keep the MX, SPF, DKIM and DMARC records unchanged** so `info@3dvgis.com` email keeps working.
7. Subdomains: point `2d` to Vercel and redirect to `/services`, if approved. Leave `skyframexr` until decided.
8. After DNS propagates: check HTTPS, spot-check the legacy redirects, submit the sitemap in Search Console and Bing, and request indexing for the home and service pages.
9. Disable the cPanel rsync workflow in `vgis-web` (`.github/workflows/deploy.yml`) and archive the repo.
10. Watch Search Console coverage and 404s for 4 weeks. Add redirects for any old URLs that appear.

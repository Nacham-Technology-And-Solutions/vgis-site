/**
 * Brand identity work shown on /services/brand-identity.
 *
 * Facts only, taken from each brand's own design system or guide:
 * - FluraVest: the FluraVest design system (logos, tokens.json, README).
 * - Skyframe XR: docs/skyframe-brand/ (brand guide, tokens.json, logo files).
 * - Nâcham Technology & Solutions: the Nâcham design system and stationery (logos, tokens, README, print previews).
 * - Consulate of Saint Lucia in Nigeria: the Consulate design system (logos, tokens, README).
 * - ComfortEdu: the ComfortEdu Brand Guidelines v1.0 (logos, tokens, README).
 * - Infra-Tech Capital and Tusnny: the owner's portfolio files (docs/portfolio-manifest.json, public/work/*).
 *   Infra-Tech colours are sampled from its logo files; Tusnny's come from its own colour board.
 * - VGIS: the VGIS Brand Guidelines (Nov 2026) and public/brand/vgis-logo.png.
 * Colours are the brands' exact hex values. Logos are the brands' own files, never redrawn.
 */

export type BrandImage = { src: string; width: number; height: number; alt: string };
export type BrandSwatch = { name: string; hex: string; role: string };

export type BrandCase = {
  slug: string;
  name: string;
  sector: string;
  /** The brand's own tagline, verbatim. */
  tagline: string;
  /** One or two plain sentences on what the brand is and what the identity has to do. */
  summary: string;
  /** Logo shown on the board, on `ground`. */
  logo: BrandImage;
  /** Board background behind the logo: a colour from the brand's own palette. */
  ground: string;
  swatches: BrandSwatch[];
  /** Typefaces named in the brand guide; `font` is the CSS variable loaded for the specimen. Empty when the files don't name them. */
  type: { family: string; role: string; font: BrandFont }[];
  /** Large mockups (billboards, stationery), shown full width under the board. */
  mockups?: BrandImage[];
  /** The /work project page for this brand, when there is one. */
  project?: string;
  /** What the identity system includes, from the brand's files. */
  system: string[];
  /** Applications from the brand's own files (stationery, cards), shown under the board. */
  applications?: BrandImage[];
  /** Attribution required by a licence on part of the artwork. */
  credit?: string;
  href?: string;
};

export type BrandFont = "jakarta" | "montserrat" | "inter" | "intertight" | "instrument" | "bebas" | "barlow" | "dmsans";

export const brandCases: BrandCase[] = [
  {
    slug: "nacham",
    project: "nacham",
    name: "Nâcham Technology & Solutions",
    sector: "Software and enterprise technology",
    tagline: "Your vision, engineered.",
    summary:
      "Nâcham builds intelligent software, enterprise networks and industry platforms from Abuja. The name means a deep sigh of relief, so the identity has to feel calm, exact and quietly confident: a gear around a lightbulb, coloured with the Tabernacle gradient.",
    logo: { src: "/brands/nacham/nacham-reverse-horizontal.png", width: 1200, height: 342, alt: "Nâcham Technology & Solutions logo, reversed on ink" },
    ground: "#07060B",
    swatches: [
      { name: "Scarlet", hex: "#A60067", role: "Tabernacle gradient, left" },
      { name: "Royal Purple", hex: "#5B00A4", role: "Tabernacle gradient, middle" },
      { name: "Infrastructure Blue", hex: "#1000C7", role: "Tabernacle gradient, right" },
      { name: "Magenta", hex: "#E2136E", role: "Screen accent" },
    ],
    type: [
      { family: "Inter Tight", role: "Headlines", font: "intertight" },
      { family: "Inter", role: "Body", font: "inter" },
      { family: "Instrument Serif", role: "Italic accent", font: "instrument" },
    ],
    system: [
      "Logo suite: colour, reverse, white and black versions in horizontal, vertical, wordmark and icon forms, plus an app icon",
      "The Tabernacle gradient and a screen palette for the website and apps",
      "Typography for screen, with fallbacks for Word, Docs and email",
      "Voice and terminology: Comfort Discovery, the Nâcham Methodology, Artisan Precision",
      "Stationery: business cards, staff and visitor ID cards, letterhead, invoice, compliment slip, envelope and email signature",
      "Brand pattern, imagery and iconography rules",
    ],
    applications: [
      { src: "/brands/nacham/business-card-front.jpg", width: 674, height: 386, alt: "Nâcham business card, front: ink with the magenta mark and the tagline" },
      { src: "/brands/nacham/letterhead.jpg", width: 900, height: 1271, alt: "Nâcham letterhead with an example letter" },
      { src: "/brands/nacham/id-card-staff.jpg", width: 410, height: 650, alt: "Nâcham staff ID card with a magenta band" },
    ],
  },
  {
    slug: "infra-tech-capital",
    project: "infra-tech-capital-services",
    name: "Infra-Tech Capital Services",
    sector: "Corporate finance and infrastructure",
    tagline: "End-to-end corporate branding.",
    summary:
      "A corporate identity for Infra-Tech Capital Services Limited, designed as one consistent visual ecosystem: an ITC monogram cut by a crimson bar, set in charcoal, and carried onto a patterned business card.",
    logo: { src: "/brands/infra-tech/itc-logo-horizontal.png", width: 1200, height: 172, alt: "Infra-Tech Capital Services Limited horizontal logo: the ITC monogram with a crimson bar beside the name" },
    ground: "#F2F3F3",
    swatches: [
      { name: "Charcoal", hex: "#2E383A", role: "Logo and type" },
      { name: "Crimson", hex: "#A01833", role: "The bar in the monogram" },
      { name: "White", hex: "#FFFFFF", role: "Reversed logo" },
    ],
    type: [],
    system: [
      "Horizontal and vertical logo lockups",
      "The ITC symbol for use on its own",
      "A monogram pattern for print",
      "Business cards and corporate stationery",
    ],
    mockups: [
      { src: "/work/infra-tech-capital/04-business-card-front.jpg", width: 2116, height: 1216, alt: "Front of an Infra-Tech Capital business card: the white ITC logo on charcoal, over a tonal ITC monogram pattern" },
    ],
  },
  {
    slug: "tusnny",
    project: "tusnny",
    name: "Tusnny",
    sector: "Technology and youth",
    tagline: "Tech-United Solutions for Networking, Nurturing, and Youth.",
    summary:
      "An identity built from the name itself: Tusnny spells out what it stands for, and the t in the wordmark is drawn as a raised hand. Deep teal leads, with black, white and a red accent, applied from a billboard to a full stationery set.",
    logo: { src: "/brands/tusnny/tusnny-logo-reversed.png", width: 1200, height: 341, alt: "Tusnny wordmark in white on teal, the letter t drawn as a raised hand" },
    ground: "#1D647D",
    swatches: [
      { name: "Teal", hex: "#1D647D", role: "Primary" },
      { name: "Red", hex: "#A20202", role: "Accent" },
      { name: "Black", hex: "#000000", role: "Type" },
      { name: "White", hex: "#FFFFFF", role: "Reversed logo" },
    ],
    type: [],
    system: [
      "Primary logo, an alternate on teal, and a secondary lockup with the full name",
      "Colour board with RGB, CMYK and HEX values and tints",
      "Billboard and outdoor advertising",
      "Stationery set: folder, letterhead, cards, ID badge and branded merchandise",
    ],
    mockups: [
      { src: "/work/tusnny/01-billboard-mockup.jpg", width: 2400, height: 1800, alt: "A teal Tusnny billboard on a sunlit brick wall, spelling out what the name stands for" },
      { src: "/work/tusnny/06-stationery-mockup.jpg", width: 2400, height: 1800, alt: "Tusnny stationery set: folder, letterheads, business cards, ID badge, lanyard and gift box" },
    ],
  },
  {
    slug: "saint-lucia-consulate",
    name: "Consulate of Saint Lucia in Nigeria",
    sector: "Diplomatic mission",
    tagline: "Bridging the Caribbean and West Africa.",
    summary:
      "The Honorary Consulate of Saint Lucia in Nigeria serves Saint Lucian nationals and visitors, and builds trade, investment, tourism and cultural ties between the two nations. The identity takes its colours from the Saint Lucia flag and has to read as official, trustworthy and proudly Caribbean.",
    logo: { src: "/brands/saint-lucia-consulate/consulate-lockup-horizontal.svg", width: 744, height: 200, alt: "Consulate of Saint Lucia in Nigeria horizontal logo: the consulate seal beside the wordmark" },
    ground: "#EDFAFF",
    swatches: [
      { name: "Cerulean", hex: "#67CBFF", role: "From the national flag" },
      { name: "Gold", hex: "#FED116", role: "Accent only" },
      { name: "Seal Black", hex: "#000000", role: "Seal band and wordmark" },
      { name: "Ink", hex: "#2E383A", role: "Body text" },
    ],
    type: [
      { family: "Barlow Condensed", role: "Wordmark and headings", font: "barlow" },
      { family: "DM Sans", role: "Body", font: "dmsans" },
    ],
    system: [
      "The consulate seal, with the Saint Lucia coat of arms, and a horizontal lockup",
      "Flag-derived colour system with proportion and contrast rules",
      "The tricolour rule, dashed ring and partner strip as graphic elements",
      "Diplomatic voice, key messages and boilerplate",
      "Templates: business card, letterhead, presentation slide and website",
    ],
    credit: "Coat of arms in the seal traced from \u201cCoat of arms of Saint Lucia.svg\u201d by Diafora, Wikimedia Commons, CC BY-SA 3.0.",
  },
  {
    slug: "comfortedu",
    name: "ComfortEdu",
    sector: "School management software",
    tagline: "Run your school with peace of mind.",
    summary:
      "ComfortEdu is a school management platform for Nigerian schools, from crèche to university: fees, results, parent messages and safety in one place. The identity promises relief to proprietors and has to look premium enough for an elite school while staying warm and plain-spoken.",
    logo: { src: "/brands/comfortedu/comfortedu-logo-horizontal-reversed.svg", width: 346, height: 64, alt: "ComfortEdu logo, reversed on ink: the Sunrise Book mark beside the wordmark" },
    ground: "#14213D",
    swatches: [
      { name: "Comfort Teal", hex: "#136E64", role: "Primary" },
      { name: "Marigold", hex: "#F9AE2B", role: "Accent: the sun" },
      { name: "Ink", hex: "#14213D", role: "Text" },
      { name: "Paper", hex: "#FBF9F5", role: "Background" },
    ],
    type: [
      { family: "Plus Jakarta Sans", role: "Headings and logo", font: "jakarta" },
      { family: "Inter", role: "Interface and body", font: "inter" },
    ],
    system: [
      "The Sunrise Book mark: horizontal, stacked, wordmark and icon versions in four colourways",
      "App icon, favicon and a \u201cPowered by ComfortEdu\u201d badge for school portals",
      "Teal and marigold colour scales with semantic design tokens",
      "Strategy, personality, voice and tone",
      "Interface principles for low-cost Android phones and white-label rules for each school\u2019s own brand",
    ],
  },
  {
    slug: "fluravest",
    name: "FluraVest",
    sector: "Personal finance",
    tagline: "Invest. Grow. Prosper.",
    summary:
      "FluraVest helps people organise their money, find verified opportunities and build toward owning productive assets. The identity has to read as trustworthy first and ambitious second: a navy foundation for stability, with green kept for growth and progress.",
    logo: { src: "/brands/fluravest/fluravest-horizontal-reversed.svg", width: 437, height: 116, alt: "FluraVest logo, reversed on navy" },
    ground: "#0A2A4A",
    swatches: [
      { name: "Navy 900", hex: "#0A2A4A", role: "Primary brand navy" },
      { name: "Bright Green", hex: "#22C55E", role: "Actions and progress" },
      { name: "Dark Green", hex: "#16A34A", role: "Logo greens and icons" },
      { name: "Soft White", hex: "#F4F8F7", role: "Page ground" },
    ],
    type: [{ family: "Plus Jakarta Sans", role: "One family, weights 200 to 800", font: "jakarta" }],
    system: [
      "Logo suite: horizontal, stacked and symbol lockups in colour, reversed and one-colour versions",
      "App icons and favicon",
      "Navy-led colour system with light and dark themes and accessible contrast rules",
      "Typography scale, including tabular figures for money",
      "Voice and content guidelines, iconography, imagery and motion rules",
      "Design tokens for web and mobile (CSS, Tailwind and TypeScript)",
    ],
  },
  {
    slug: "skyframe-xr",
    name: "Skyframe XR",
    sector: "Real estate technology",
    tagline: "Walk Through Tomorrow, Today.",
    summary:
      "Skyframe XR lets buyers walk through off-plan homes and bare plots at real size before a brick is laid. The brand idea is proof before the brick: precise line, warm daylight and one bold orange signal.",
    logo: { src: "/skyframe/brand/skyframe-xr-horizontal-white.png", width: 802, height: 172, alt: "Skyframe XR logo, white on charcoal" },
    ground: "#292929",
    swatches: [
      { name: "Frame Orange", hex: "#FEA000", role: "Signature colour" },
      { name: "Ink", hex: "#111111", role: "Text and logo letters" },
      { name: "Charcoal", hex: "#292929", role: "Dark bands" },
      { name: "Paper", hex: "#FFFBF7", role: "Page ground" },
    ],
    type: [
      { family: "Montserrat", role: "Display", font: "montserrat" },
      { family: "Inter", role: "Body", font: "inter" },
    ],
    system: [
      "The headset-frame mark: horizontal, stacked and badge lockups, black and white",
      "Colour system built around Frame Orange",
      "Display and body typography",
      "Brand voice and naming rules",
      "Applications: pitch deck, website, in-headset app, sales gallery, social and print",
    ],
    href: "/skyframe-xr",
  },
  {
    slug: "vgis",
    name: "VGIS",
    sector: "Our own identity",
    tagline: "Bridging the gap between imagination and reality.",
    summary:
      "Visual Graphics Illustration Services: high-end 3D visualisation alongside 2D illustration, branding and motion. The identity is built on Artisan Precision: black and white dominate, orange stays a small accent, and the voice is authoritative and exact.",
    logo: { src: "/brand/vgis-logo.png", width: 490, height: 640, alt: "VGIS official logo: geometric 3D mark above the VGIS wordmark" },
    ground: "#000000",
    swatches: [
      { name: "Obsidian Black", hex: "#000000", role: "Primary" },
      { name: "Pure White", hex: "#FFFFFF", role: "Primary" },
      { name: "VGIS Orange", hex: "#FF6600", role: "Accent" },
    ],
    type: [
      { family: "Bebas Neue", role: "Headings", font: "bebas" },
      { family: "Inter", role: "Body", font: "inter" },
    ],
    system: [
      "Official logo with clear-space and usage rules",
      "Black, white and VGIS Orange colour system",
      "Typography: Bebas Neue headings, Inter body",
      "Brand voice, imagery rules and a pre-publish checklist",
      "This website, built on the same system",
    ],
  },
];

export const getBrandCase = (slug: string) => brandCases.find((b) => b.slug === slug);
/** The brand board for a /work project, if it has one. */
export const brandForProject = (projectSlug: string) => brandCases.find((b) => b.project === projectSlug);
/** Where a brand lives on the site: its project page, else its board on the branding page. */
export const brandHref = (b: BrandCase) => (b.project ? `/work/${b.project}` : `/services/brand-identity#${b.slug}`);

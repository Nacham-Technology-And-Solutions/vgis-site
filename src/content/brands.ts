/**
 * Brand identity work shown on /services/brand-identity.
 *
 * Facts only, taken from each brand's own design system or guide:
 * - FluraVest: the FluraVest design system (logos, tokens.json, README).
 * - Skyframe XR: docs/skyframe-brand/ (brand guide, tokens.json, logo files).
 * Colours are the brands' exact hex values. Logos are the brands' own files, never redrawn.
 */

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
  logo: { src: string; width: number; height: number; alt: string };
  /** Board background behind the logo: a colour from the brand's own palette. */
  ground: string;
  swatches: BrandSwatch[];
  /** Typefaces named in the brand guide; `font` is the CSS variable loaded for the specimen. */
  type: { family: string; role: string; font: "jakarta" | "montserrat" | "inter" }[];
  /** What the identity system includes, from the brand's files. */
  system: string[];
  href?: string;
};

export const brandCases: BrandCase[] = [
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
];

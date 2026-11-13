import type { Discipline } from "./services";
import { manifestProjects, type ManifestProject } from "./work.generated";

/**
 * Projects from the Company Profile, updated with owner answers (13 Nov 2026, channel #111):
 * Kavacha (not Cavacha); Down Town Castries = Castries Redevelopment; signature set =
 * Down Town Castries, St Helen Hotel, White Avenue Real Estate (Cedarwood City and Colour Code are White Avenue work).
 * `images` is intentionally empty until the owner supplies verified VGIS renders/artwork.
 * Pages render a branded plan-sheet panel when no image exists.
 */
export type Project = {
  slug: string;
  name: string;
  year?: number;
  discipline: Discipline;
  category: string;
  scope: string;
  summary: string;
  services: string[]; // service slugs
  images: { src: string; alt: string; width: number; height: number }[];
  /** Featured in the signature-work section. */
  signature?: boolean;
  location?: string;
  client?: { name: string; url?: string };
  /** Other names this project has been published under (kept for search and redirects). */
  aka?: string[];
  /** YouTube walkthrough/film IDs (@3DVGIS). */
  youtubeIds?: string[];
  /** Partner credit line, e.g. Justking Solutions. */
  credit?: string;
};

const curated: Project[] = [
  {
    slug: "down-town-castries",
    name: "Down Town Castries",
    aka: ["Castries Redevelopment"],
    year: 2026,
    location: "Castries, Saint Lucia",
    signature: true,
    discipline: "3d",
    category: "3D visualisation",
    scope: "Design, visualisation and complete structural rendering.",
    summary:
      "The redevelopment of downtown Castries, Saint Lucia: a complete structural rendering programme taking the scheme from design through visualisation to a full set of rendered views.",
    services: ["architectural-visualization"],
    images: [],
  },
  {
    slug: "st-helen-hotel",
    name: "St Helen Hotel",
    year: 2026,
    signature: true,
    discipline: "3d",
    category: "Concept, design & 3D visualisation",
    scope: "Concept, design and visualisation before construction.",
    summary:
      "A hotel taken from concept and design through to photorealistic visualisation, all before construction began.",
    services: ["architectural-design", "architectural-visualization"],
    images: [],
  },
  {
    slug: "white-avenue-real-estate",
    name: "White Avenue Real Estate",
    signature: true,
    client: { name: "White Avenue Real Estate", url: "https://whiteavenuegroup.com" },
    discipline: "3d",
    category: "3D visualisation",
    scope: "Real estate rendering for White Avenue developments, including Cedarwood City and Colour Code.",
    summary:
      "Real estate visualisation for White Avenue Real Estate across its developments, including Cedarwood City and Colour Code.",
    services: ["architectural-visualization"],
    images: [],
  },
  {
    slug: "kavacha-garden",
    name: "Kavacha Garden",
    year: 2024,
    discipline: "3d",
    category: "3D visualisation",
    scope: "Design, architectural visualisation and high-fidelity rendering.",
    summary:
      "Architectural visualisation and high-fidelity rendering for Kavacha Garden, from design development to final photorealistic views.",
    services: ["architectural-visualization"],
    images: [],
  },
  {
    slug: "cedarwood-city-estate",
    name: "Cedarwood City Estate",
    year: 2022,
    client: { name: "White Avenue Real Estate", url: "https://whiteavenuegroup.com" },
    discipline: "3d",
    category: "3D visualisation",
    scope: "Design, visualisation, rendering and an interactive game walkthrough.",
    summary:
      "Design, visualisation and rendering for Cedarwood City Estate, plus an interactive game-engine walkthrough that lets buyers explore the estate freely.",
    services: ["architectural-visualization", "skyframe-xr"],
    images: [],
  },
  {
    slug: "nacham",
    name: "Nâcham",
    discipline: "2d",
    category: "2D branding",
    scope: "Comprehensive brand identity, design execution and visual strategy.",
    summary: "A comprehensive brand identity for Nâcham, covering visual strategy and full design execution.",
    services: ["brand-identity"],
    images: [],
  },
  {
    slug: "gethsemane",
    name: "Gethsemane",
    discipline: "2d",
    category: "2D branding",
    scope: "Full brand identity creation and marketing asset development.",
    summary: "A full brand identity for Gethsemane, with the marketing assets to launch and run it.",
    services: ["brand-identity", "graphic-design"],
    images: [],
  },
  {
    slug: "infra-tech-capital-services",
    name: "Infra-Tech Capital Services",
    discipline: "2d",
    category: "2D branding",
    scope: "End-to-end corporate branding and visual ecosystem design.",
    summary: "End-to-end corporate branding for Infra-Tech Capital Services, designed as one consistent visual ecosystem.",
    services: ["brand-identity"],
    images: [],
  },
  {
    slug: "bliss-mental-health-clinic",
    name: "Bliss Mental Health Clinic",
    discipline: "2d",
    category: "2D branding",
    scope: "Complete brand identity establishing a professional and trusting visual presence.",
    summary: "A complete brand identity that gives Bliss Mental Health Clinic a professional, trustworthy presence.",
    services: ["brand-identity"],
    images: [],
  },
];

/* ---------------- Merge with the owner's portfolio manifest ---------------- */

/** Manifest project names that map onto curated records above. */
const MANIFEST_TO_SLUG: Record<string, string> = {
  "Down Town Castries": "down-town-castries",
  "St Helen Hotel": "st-helen-hotel",
  "Cedarwood City": "cedarwood-city-estate",
  "Kavacha Garden": "kavacha-garden",
  "Infra-Tech Capital": "infra-tech-capital-services",
};
/** Manifest groups that are not standalone projects. */
const NOT_PROJECTS = new Set(["Skyframe XR"]);

const SCOPE_LABEL: Record<string, string> = {
  concept: "concept",
  design: "design",
  "space-design": "space design",
  "working-drawings": "working drawings",
  interior: "interior visualisation",
  visualization: "3D visualisation",
  "signage-permit": "signage permit visualisation",
  permit: "permit visualisation",
  renovation: "renovation",
};
const DESIGN_TAGS = ["concept", "design", "space-design", "working-drawings"];

const sentence = (parts: string[]) => {
  const p = [...new Set(parts)];
  const txt = p.length > 1 ? `${p.slice(0, -1).join(", ")} and ${p.at(-1)}` : (p[0] ?? "");
  return txt ? txt[0].toUpperCase() + txt.slice(1) + "." : "";
};

function servicesFor(m: ManifestProject): string[] {
  if (m.category === "2d") return m.name.toLowerCase().includes("graphic") ? ["graphic-design"] : ["brand-identity"];
  const out: string[] = [];
  if (m.scope.some((t) => DESIGN_TAGS.includes(t))) out.push("architectural-design");
  out.push("architectural-visualization");
  if (m.youtubeIds.length) out.push("cinematic-walkthroughs");
  return out;
}

function fromManifest(m: ManifestProject): Project {
  const scope = sentence(m.scope.map((t) => SCOPE_LABEL[t] ?? t)) || (m.category === "2d" ? "Brand identity and design." : "3D visualisation.");
  const design = m.scope.some((t) => DESIGN_TAGS.includes(t));
  return {
    slug: m.folder,
    name: m.name === "Graphics Design Portfolio" ? "Graphic design portfolio" : m.name,
    year: m.year ?? undefined,
    discipline: m.category === "2d" ? "2d" : "3d",
    category: m.category === "2d" ? (m.name.toLowerCase().includes("graphic") ? "Graphic design" : "2D branding") : design ? "Design & 3D visualisation" : "3D visualisation",
    scope,
    summary: scope,
    services: servicesFor(m),
    images: [],
    signature: m.signature,
  };
}

function attach(p: Project, m: ManifestProject): Project {
  return {
    ...p,
    year: p.year ?? m.year ?? undefined,
    images: m.images.map(({ src, width, height, alt }) => ({ src, width, height, alt })),
    youtubeIds: m.youtubeIds.length ? m.youtubeIds : p.youtubeIds,
    credit: m.credit ?? p.credit,
    client: p.client ?? (m.client && m.client !== m.name ? { name: m.client } : undefined),
  };
}

const bySlug = new Map(curated.map((p) => [p.slug, p]));
const extra: Project[] = [];
for (const m of manifestProjects) {
  if (NOT_PROJECTS.has(m.name)) continue;
  const slug = MANIFEST_TO_SLUG[m.name];
  if (slug && bySlug.has(slug)) bySlug.set(slug, attach(bySlug.get(slug)!, m));
  else extra.push(attach(fromManifest(m), m));
}

// White Avenue Real Estate: aggregates its developments (Cedarwood City, Colour Code).
const whiteAvenueParts = [bySlug.get("cedarwood-city-estate"), extra.find((e) => e.name === "Colour Code")].filter(
  (x): x is Project => !!x,
);
const wa = bySlug.get("white-avenue-real-estate");
if (wa) {
  bySlug.set("white-avenue-real-estate", {
    ...wa,
    images: whiteAvenueParts.flatMap((x) => x.images),
    youtubeIds: [...new Set(whiteAvenueParts.flatMap((x) => x.youtubeIds ?? []))],
  });
}
// Colour Code is White Avenue work, like Cedarwood City; neither is a separate signature.
for (const e of extra) if (e.name === "Colour Code") { e.client = { name: "White Avenue Real Estate", url: "https://whiteavenuegroup.com" }; e.signature = false; }
const cw = bySlug.get("cedarwood-city-estate");
if (cw) bySlug.set("cedarwood-city-estate", { ...cw, signature: false });

/** Signature first, then curated order, then manifest projects with images (newest first). */
export const projects: Project[] = [
  ...curated.map((p) => bySlug.get(p.slug)!),
  ...extra.filter((e) => e.images.length).sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const signatureProjects = () => projects.filter((p) => p.signature);
export const projectsForService = (slug: string) => projects.filter((p) => p.services.includes(slug));

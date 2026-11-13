import type { Discipline } from "./services";

/**
 * Signature projects from the Company Profile.
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
};

export const projects: Project[] = [
  {
    slug: "castries-redevelopment",
    name: "Castries Redevelopment",
    year: 2026,
    discipline: "3d",
    category: "3D visualisation",
    scope: "Design, visualisation and complete structural rendering.",
    summary:
      "A complete structural rendering programme for the Castries Redevelopment, taking the scheme from design through visualisation to a full set of rendered views.",
    services: ["architectural-visualization"],
    images: [],
  },
  {
    slug: "cavacha-garden",
    name: "Cavacha Garden",
    year: 2024,
    discipline: "3d",
    category: "3D visualisation",
    scope: "Design, architectural visualisation and high-fidelity rendering.",
    summary:
      "Architectural visualisation and high-fidelity rendering for Cavacha Garden, from design development to final photorealistic views.",
    services: ["architectural-visualization"],
    images: [],
  },
  {
    slug: "cedarwood-city-estate",
    name: "Cedarwood City Estate",
    year: 2022,
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

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsForService = (slug: string) => projects.filter((p) => p.services.includes(slug));

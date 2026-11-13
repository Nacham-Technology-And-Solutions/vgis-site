import type { ProcessKey } from "./process";

export type Discipline = "3d" | "2d";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  discipline: Discipline;
  name: string;
  /** Title-tag keyword phrase. Keep under ~45 chars; the layout appends " | VGIS". */
  seoTitle: string;
  /** 140–160 character meta description. */
  description: string;
  /** Answer-first paragraph (40–60 words). Written to be quotable by answer engines. */
  answer: string;
  deliverables: string[];
  forWho: string[];
  process: ProcessKey;
  faqs: Faq[];
};

export const disciplines: Record<Discipline, { name: string; label: string; intro: string }> = {
  "3d": {
    name: "3D visualisation",
    label: "Core",
    intro:
      "High-fidelity, immersive 3D for architecture, civil projects and products: advanced modelling, photorealistic rendering, cinematic walkthroughs and interactive AR and VR.",
  },
  "2d": {
    name: "2D branding & design",
    label: "Support",
    intro:
      "Brand identity, graphic design, 2D ad animation and motion graphics, designed to package, present and sell the spaces and products we visualise.",
  },
};

export const services: Service[] = [
  {
    slug: "architectural-visualization",
    discipline: "3d",
    name: "3D architectural visualisation",
    seoTitle: "3D Architectural Visualisation in Nigeria",
    description:
      "Photorealistic 3D architectural renders of exteriors, interiors and masterplans for developers and civil engineers, from VGIS in Abuja, Nigeria.",
    answer:
      "3D architectural visualisation turns plans and drawings into photorealistic images of a building before it exists. VGIS models the structure, applies accurate materials and physically plausible lighting, and renders exteriors, interiors and masterplans that developers use to sell, secure approvals and win investment.",
    deliverables: [
      "Photorealistic exterior renders",
      "Interior renders",
      "Masterplan and aerial views",
      "Civil and infrastructure visualisation",
      "Marketing-ready image sets",
    ],
    forWho: ["Real estate developers", "Architects", "Civil engineers"],
    process: "3d",
    faqs: [
      {
        q: "What do you need from me to start an architectural render?",
        a: "Send the architectural plans, elevations or a 3D model if you have one, the site location and any reference images. In the Discovery stage we assess the location, environment and project parameters, then confirm the plan in the Blueprint & agreement stage.",
      },
      {
        q: "Can I review the model before final rendering?",
        a: "Yes. Every 3D project includes a Sketch preview stage where you review the initial model and composition before we move to final lighting, materials and rendering.",
      },
      {
        q: "Do you visualise civil and infrastructure projects?",
        a: "Yes. VGIS visualises buildings, products and civil projects. The geometric mark in our logo stands for the structural base of our 3D and civil work.",
      },
    ],
  },
  {
    slug: "product-visualization",
    discipline: "3d",
    name: "3D product visualisation",
    seoTitle: "3D Product Rendering & Visualisation",
    description:
      "Photorealistic 3D product renders for manufacturers: accurate materials, studio lighting and launch-ready imagery, produced by VGIS in Nigeria.",
    answer:
      "3D product visualisation creates photorealistic images of a product from CAD files, drawings or reference photos, without a physical sample or photo studio. VGIS models the product, matches its materials and lighting exactly, and delivers imagery that manufacturers use for launches, catalogues, packaging and advertising.",
    deliverables: [
      "Photorealistic product stills",
      "Material and colour variants",
      "Exploded and detail views",
      "Launch and campaign imagery",
    ],
    forWho: ["Product manufacturers", "Corporate organisations", "Marketing teams"],
    process: "3d",
    faqs: [
      {
        q: "Do you need a physical sample of the product?",
        a: "No. We can work from CAD files, technical drawings or reference photographs. A sample helps us match materials precisely, but it is not required.",
      },
      {
        q: "Can product renders be used for packaging and advertising?",
        a: "Yes. Our 2D studio can take the renders straight into packaging, brand and campaign design, so the product and its marketing come from one team.",
      },
    ],
  },
  {
    slug: "cinematic-walkthroughs",
    discipline: "3d",
    name: "Cinematic video walkthroughs",
    seoTitle: "3D Animation & Cinematic Walkthroughs",
    description:
      "Cinematic 3D walkthrough and flythrough videos of developments before they are built, for sales launches and investor presentations, by VGIS.",
    answer:
      "A cinematic walkthrough is an animated 3D film that moves through a building or development before it is built. VGIS combines photorealistic rendering with planned camera paths and pacing, so buyers and investors can experience the space, its scale and its context in a short, shareable video.",
    deliverables: [
      "Exterior flythroughs",
      "Interior walkthroughs",
      "Development and masterplan films",
      "Social and presentation cut-downs",
    ],
    forWho: ["Real estate developers", "Sales and marketing teams", "Investors"],
    process: "3d",
    faqs: [
      {
        q: "What is the difference between a walkthrough video and a VR walkthrough?",
        a: "A walkthrough video follows a fixed, cinematic camera path and plays on any screen. A VR or interactive walkthrough, delivered through Skyframe XR, lets the viewer move freely through the space in real time.",
      },
    ],
  },
  {
    slug: "skyframe-xr",
    discipline: "3d",
    name: "Skyframe XR: interactive AR & VR",
    seoTitle: "Skyframe XR: VR & AR Real Estate Experiences",
    description:
      "Skyframe XR by VGIS builds interactive virtual and augmented reality experiences, so buyers can explore developments before construction.",
    answer:
      "Skyframe XR is VGIS's interactive 3D experience service. It turns architectural plans into real-time virtual reality (VR) and augmented reality (AR) environments that people can explore freely, so buyers, investors and stakeholders can walk through a development and understand it before construction begins.",
    deliverables: [
      "Interactive VR walkthroughs",
      "Augmented reality (AR) experiences",
      "Real-time 3D environments",
      "Game-engine walkthroughs for sales suites",
    ],
    forWho: ["Real estate developers", "Architects", "Sales suites and showrooms"],
    process: "xr",
    faqs: [
      {
        q: "What is Skyframe XR?",
        a: "Skyframe XR is the VGIS service line for interactive 3D experiences in extended reality (XR): virtual reality, augmented reality and real-time walkthroughs of buildings and developments.",
      },
      {
        q: "How is an XR project delivered?",
        a: "In five stages: Discovery & plan review, Blueprint & agreement, Scene modelling & composition, Development & post-production, and Delivery of the final interactive experience.",
      },
    ],
  },
  {
    slug: "brand-identity",
    discipline: "2d",
    name: "Brand identity",
    seoTitle: "Brand Identity Design in Abuja, Nigeria",
    description:
      "Brand identity design by VGIS: strategy, logo, typography, colour systems and brand guidelines for companies, developments and organisations.",
    answer:
      "Brand identity is the complete visual and verbal system a business uses to present itself: its logo, typography, colour, narrative and the guidelines that keep them consistent. VGIS builds identities through a six-stage process, from a discovery questionnaire and interview to a full guideline and asset package.",
    deliverables: [
      "Brand strategy and narrative",
      "Logo and visual identity",
      "Typography and colour systems",
      "Brand guidelines",
      "Stationery and launch collateral",
    ],
    forWho: ["Corporate organisations", "Real estate developments", "Founders and growing businesses"],
    process: "2d",
    faqs: [
      {
        q: "What do I receive at the end of a branding project?",
        a: "Comprehensive brand guidelines and an asset package, including logos, typography and colour systems, ready for your team, agencies and printers.",
      },
      {
        q: "Can you brand a real estate development as well as visualise it?",
        a: "Yes. That is the reason VGIS offers both. The same team can create the renders and the brand, signage and marketing that sell the development.",
      },
    ],
  },
  {
    slug: "graphic-design",
    discipline: "2d",
    name: "Graphic design & illustration",
    seoTitle: "Graphic Design & Illustration Services",
    description:
      "Graphic design and illustration from VGIS: marketing collateral, proposals, brochures and social content that present your projects with precision.",
    answer:
      "VGIS provides tailored graphic design and 2D illustration that package and present a project or product: brochures, proposals, sales decks, signage, print collateral and social media content. Every layout follows a strict grid and the client's brand rules, so marketing materials are as compelling as the work they describe.",
    deliverables: [
      "Brochures and sales decks",
      "Proposals and presentations",
      "Print and signage",
      "Social media content",
      "2D illustration",
    ],
    forWho: ["Real estate developers", "Corporate organisations", "Marketing teams"],
    process: "2d",
    faqs: [
      {
        q: "Can you design marketing materials using our existing renders?",
        a: "Yes. We design brochures, decks and campaigns around renders we produce or that you supply.",
      },
    ],
  },
  {
    slug: "motion-graphics",
    discipline: "2d",
    name: "2D ad animation & motion graphics",
    seoTitle: "Motion Graphics & 2D Ad Animation",
    description:
      "2D ad animation and motion graphics by VGIS: animated adverts, logo animation and social video that bring brands and developments to life.",
    answer:
      "Motion graphics and 2D ad animation bring a brand or project to life on screen. VGIS produces animated adverts, logo animations, explainer sequences and social video that use your brand system, and can combine them with 3D renders and walkthroughs into one campaign.",
    deliverables: ["2D animated adverts", "Logo animation", "Social video", "Explainer animation"],
    forWho: ["Marketing teams", "Corporate organisations", "Product launches"],
    process: "2d",
    faqs: [
      {
        q: "Can motion graphics be combined with 3D walkthroughs?",
        a: "Yes. We can integrate 2D titles, motion graphics and branding into 3D walkthrough films, so the campaign is delivered as one consistent piece.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesBy = (d: Discipline) => services.filter((s) => s.discipline === d);

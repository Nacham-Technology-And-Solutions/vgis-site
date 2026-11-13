/**
 * Single source of truth for company facts.
 * Every value here comes from the owner-supplied Company Profile or Brand Guidelines
 * (Nov 2026). Do not add claims (stats, years, awards, testimonials) without a source.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://3dvgis.com").replace(/\/$/, "");

export const company = {
  shortName: "VGIS",
  legalName: "Visual Graphics Illustration Services Limited",
  formerName: "VG3DS (Visual Graphics 3D Services)",
  tagline: "Bridging the gap between imagination and reality.",
  philosophy: "Artisan Precision",
  rcNumber: "7371371",
  natureOfBusiness: "Architectural visualisation, product visualisation and graphic design firm",
  /** One-sentence entity definition: used for meta descriptions, llms.txt and schema. */
  definition:
    "VGIS (Visual Graphics Illustration Services Limited) is a Nigerian 3D visualisation and design studio, headquartered in Abuja, that produces photorealistic architectural and product renders, cinematic walkthroughs and interactive AR/VR experiences, supported by brand identity, graphic design and motion graphics.",
  trademark: {
    mark: "VGIS AND DEVICE",
    symbol: "®",
    applications: ["NG/TM/O/2024/265289", "NG/TM/O/2024/265290", "NG/TM/O/2024/265294"],
    classes: [9, 35, 42],
  },
  emails: { primary: "3d.vgis.ltd@gmail.com", secondary: "info@3dvgis.com" },
  phones: [
    { display: "+234 811 285 3404", e164: "+2348112853404", whatsapp: true },
    { display: "+234 707 247 5996", e164: "+2347072475996", whatsapp: false },
  ],
  offices: [
    {
      id: "abuja",
      name: "Abuja head office",
      streetAddress: "16 Usuma Street, Maitama",
      addressLocality: "Abuja",
      addressRegion: "Federal Capital Territory",
      addressCountry: "NG",
      countryName: "Nigeria",
    },
    {
      id: "bida",
      name: "Bida studio",
      streetAddress: "No. 7 Hajisaf Lodge, opposite Federal Polytechnic Bida, Bida–Doko Road",
      addressLocality: "Bida",
      addressRegion: "Niger State",
      addressCountry: "NG",
      countryName: "Nigeria",
    },
  ],
  hubs: ["Abuja", "Lagos", "Bida"],
  areaServed: ["Nigeria", "Canada", "United States", "Saint Lucia"],
  audiences: [
    "Real estate developers",
    "Civil engineers",
    "Product manufacturers",
    "Corporate organisations",
  ],
  social: {
    instagram: "https://www.instagram.com/3dvgis/",
    facebook: "https://www.facebook.com/3DVGIS",
    youtube: "https://www.youtube.com/@3DVGIS",
    linkedin: "https://www.linkedin.com/company/3d-vgis/",
    behance: "https://www.behance.net/gallery/223756599/Visual-Graphics-Illustration-Services-LTD",
    tiktok: "https://www.tiktok.com/@3dvgis",
    x: "https://x.com/3dvgis",
  },
  behanceGalleries: [
    { label: "Company gallery", url: "https://www.behance.net/gallery/223756599/Visual-Graphics-Illustration-Services-LTD" },
    { label: "Company profile", url: "https://www.behance.net/gallery/90846595/Company-Profile" },
    { label: "Graphic design portfolio", url: "https://www.behance.net/gallery/229036837/Graphics-Design-Portfolio" },
  ],
  skyframeUrl: "https://skyframexr.3dvgis.com",
  story: [
    "VGIS was founded as VG3DS (Visual Graphics 3D Services), with a focus on structural rendering and high-end 3D architectural visualisation.",
    "As client needs grew, the company became Visual Graphics Illustration Services Limited (VGIS) and added 2D design, brand identity and motion graphics, so it could offer one complete visual ecosystem.",
    "Today VGIS pairs 3D visualisation, its core, with 2D branding that packages, presents and sells the work.",
  ],
  vision:
    "To bridge the gap between imagination and reality with complete visual solutions for buildings, products and civil projects: high-end 3D architectural and product visualisation at the core, supported by 2D illustration, branding and motion graphics. We give clients a complete visual ecosystem, from viewing and experiencing a model to marketing it to the world.",
  mission: [
    {
      title: "Pioneering 3D innovation",
      body: "Set new standards in immersive 3D architectural environments, product rendering and virtual reality.",
    },
    {
      title: "Elevating visual marketing",
      body: "Go beyond the 3D model with 2D illustration, graphic design and brand identity that package and communicate the project.",
    },
    {
      title: "Driving unified excellence",
      body: "Deliver the same quality in technical visualisation and creative illustration, so the marketing is as compelling as the architectural plans.",
    },
    {
      title: "Empowering clients",
      body: "Provide end-to-end visual campaigns that communicate ideas, support collaboration and drive commercial success.",
    },
  ],
} as const;

/** WhatsApp chat link with a prefilled greeting. */
export const whatsapp = {
  display: company.phones.find((p) => p.whatsapp)!.display,
  url: `https://wa.me/${company.phones.find((p) => p.whatsapp)!.e164.replace("+", "")}?text=${encodeURIComponent(
    "Hello VGIS, I'd like to discuss a project.",
  )}`,
};

export const sameAs = [
  company.social.instagram,
  company.social.facebook,
  company.social.youtube,
  company.social.linkedin,
  company.social.behance,
  company.social.tiktok,
  company.social.x,
];

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

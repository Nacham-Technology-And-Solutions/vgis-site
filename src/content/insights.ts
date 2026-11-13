/**
 * Insights (blog). Rules from the owner (13 Nov 2026):
 * - Source material: the 80-reasons knowledge base (src/content/knowledge/80-reasons.ts) and the company profile.
 * - No invented statistics, client names or quotes.
 * - Every post links to its service page and ends with a WhatsApp/contact call to action.
 * - Images are placeholders from src/content/portfolio.ts until real work is supplied.
 *
 * `keyPoints` are reason numbers rendered verbatim from the knowledge base.
 */
export type InsightSection = { heading: string; body: string[]; keyPoints?: number[] };

export type Insight = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  service: string; // primary service slug
  related?: string[]; // other service slugs
  image: string; // portfolio item id
  readingMinutes: number;
  intro: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "why-visualise-before-you-build",
    title: "Why every construction project should be visualised before it is built",
    description:
      "How 3D architectural visualisation helps owners, architects and developers make better decisions, avoid costly changes and approve designs with confidence.",
    date: "2026-11-13",
    service: "architectural-visualization",
    related: ["skyframe-xr"],
    image: "residential-exterior-1",
    readingMinutes: 5,
    intro:
      "A construction project begins as drawings: plans, sections and elevations that professionals can read and most clients cannot. Photorealistic 3D visualisation closes that gap. It shows the finished building, in its setting, before a single block is laid, so every decision that follows is made with the result in view.",
    sections: [
      {
        heading: "Drawings describe a building. Visualisation shows it.",
        body: [
          "Technical drawings are precise, but they ask the reader to assemble the building in their head. Different people assemble it differently. A client imagines one facade; the architect has designed another.",
          "A photorealistic render removes that interpretation. Everyone (client, architect, engineer, contractor) looks at the same image of the same building.",
        ],
        keyPoints: [2, 6, 7],
      },
      {
        heading: "Better decisions, made earlier",
        body: [
          "The cheapest time to change a building is before it exists. In 3D, a layout, a colour, a cladding material or a window proportion can be changed and re-rendered. On site, the same change means demolition, rework and delay.",
          "Visualisation also exposes problems that drawings hide: awkward proportions, clashing finishes and spaces that feel smaller than intended.",
        ],
        keyPoints: [3, 4, 5, 52],
      },
      {
        heading: "Materials, light and context, tested in advance",
        body: [
          "Floors, wall finishes, roofing and facade materials can be compared side by side. Natural and artificial lighting can be studied at different times of day. Landscaping, parking, fences and neighbouring structures can be placed around the building, so it is judged in its real context rather than in isolation.",
        ],
        keyPoints: [10, 15, 16, 68],
      },
      {
        heading: "Approve with confidence",
        body: [
          "When a client approves a render, they approve exactly what they see. That clarity reduces disputes, shortens decision cycles and gives the whole team a shared reference through construction.",
          "At VGIS, every 3D project includes a sketch preview stage: you review the model and composition before final lighting, materials and rendering, so the approval happens at the point where changes are still easy.",
        ],
        keyPoints: [8, 48, 30],
      },
    ],
  },
  {
    slug: "sell-off-plan-with-3d-renders",
    title: "How 3D renders help developers sell off-plan",
    description:
      "Off-plan buyers cannot visit a building that does not exist yet. How photorealistic renders and walkthroughs let developers market, pre-sell and attract investors before completion.",
    date: "2026-11-13",
    service: "architectural-visualization",
    related: ["cinematic-walkthroughs", "brand-identity"],
    image: "living-interior-1",
    readingMinutes: 5,
    intro:
      "Selling off-plan means asking buyers and investors to commit to a building they cannot visit. Floor plans and artist's sketches leave too much to the imagination. Photorealistic visualisation gives them something concrete to commit to: the finished home, its interiors, its amenities and its surroundings.",
    sections: [
      {
        heading: "Start marketing while construction is underway",
        body: [
          "With a complete set of renders, a development can be promoted from the day the design is fixed: on billboards, in brochures, on the website and across social media. Marketing no longer waits for a show home.",
        ],
        keyPoints: [31, 32, 60],
      },
      {
        heading: "Help buyers imagine living there",
        body: [
          "Exterior renders establish quality and status. Interior renders do something more personal: they let a buyer picture their own life in the space. Unfurnished units can be shown furnished, and amenities such as pools, gyms, lounges and gardens can be presented before they physically exist.",
        ],
        keyPoints: [36, 37, 39, 72],
      },
      {
        heading: "Give investors a clearer picture",
        body: [
          "Investment decisions are usually made from financial models and technical documents. Visualisation adds the dimension those documents lack: what the asset will actually look like and how it will be perceived by its future market.",
        ],
        keyPoints: [33, 57, 58, 59],
      },
      {
        heading: "Stand out in a crowded market",
        body: [
          "For many buyers, the visualisation is their first encounter with the project. Consistent, high-quality visuals give a development a professional identity and differentiate it from competing schemes. That is why VGIS pairs its 3D work with brand identity: the renders and the brand are designed to work as one visual system.",
        ],
        keyPoints: [40, 41, 42],
      },
    ],
  },
  {
    slug: "what-a-walkthrough-film-shows",
    title: "What a walkthrough film shows that drawings and stills cannot",
    description:
      "Cinematic 3D walkthroughs show sequence, scale and atmosphere. When to choose a walkthrough film, and how it supports launches, presentations and social media.",
    date: "2026-11-13",
    service: "cinematic-walkthroughs",
    related: ["property-adverts", "skyframe-xr"],
    image: "launch-film",
    readingMinutes: 4,
    intro:
      "A still render answers the question: what does it look like? A walkthrough film answers a different one: what is it like to move through it? For developments, hospitality projects and complex buildings, that second question often decides the sale.",
    sections: [
      {
        heading: "Sequence and scale",
        body: [
          "A film shows how spaces connect: the approach, the entrance, the transition from lobby to living space, the view that opens up at the end of a corridor. Scale and spatial relationships that are hard to describe in words become obvious when the camera moves through them.",
        ],
        keyPoints: [22, 21, 70],
      },
      {
        heading: "Atmosphere and time of day",
        body: [
          "Light changes how a building feels. A walkthrough can move from daylight to sunset to evening, showing the warmth of interior lighting and the character of each space: luxurious, minimalist, corporate or inviting.",
        ],
        keyPoints: [68, 72],
      },
      {
        heading: "One film, many uses",
        body: [
          "A single walkthrough serves launch events, sales suites, investor presentations and the website. Cut down into short clips, it becomes social media content and adverts. VGIS delivers the full film alongside the cut-downs, and our motion team can add titles and branding so every version carries your identity.",
        ],
        keyPoints: [71, 77],
      },
    ],
  },
  {
    slug: "interactive-vr-walkthroughs-skyframe-xr",
    title: "Interactive VR walkthroughs: letting clients explore before construction",
    description:
      "How Skyframe XR, VGIS's interactive VR and AR service, lets buyers, investors and clients walk through a building freely before it is built.",
    date: "2026-11-13",
    service: "skyframe-xr",
    related: ["cinematic-walkthroughs", "architectural-visualization"],
    image: "xr-experience",
    readingMinutes: 4,
    intro:
      "A walkthrough film follows a path chosen by the director. An interactive experience hands control to the viewer. With Skyframe XR, buyers, investors and clients explore a building at their own pace, in virtual or augmented reality, and look closely at what matters to them.",
    sections: [
      {
        heading: "From viewers to participants",
        body: [
          "When clients can move through a space themselves, they stop being an audience and become participants. They compare options, point to exactly what they want changed and give informed feedback, instead of accepting a design they cannot fully understand.",
        ],
        keyPoints: [50, 47, 53],
      },
      {
        heading: "A sales suite without a show home",
        body: [
          "An interactive walkthrough can be presented at a sales office, an exhibition or a meeting abroad. The finished development travels to the buyer, rather than the buyer travelling to a site that is still under construction.",
        ],
        keyPoints: [71, 79],
      },
      {
        heading: "How a Skyframe XR project runs",
        body: [
          "Every XR project follows five stages: discovery and plan review, blueprint and agreement on scope and terms, scene modelling with assets optimised for real-time engines, development and post-production with quality assurance, and final deployment of the interactive experience. VGIS has delivered interactive work before: our Cedarwood City Estate project included an interactive game walkthrough of the estate.",
        ],
      },
    ],
  },
  {
    slug: "product-renders-before-the-product-exists",
    title: "Product renders: marketing a product before it is manufactured",
    description:
      "How 3D product visualisation lets manufacturers create photorealistic launch, catalogue and packaging imagery from CAD files, drawings or photos.",
    date: "2026-11-13",
    service: "product-visualization",
    related: ["product-adverts", "graphic-design"],
    image: "product-footwear-1",
    readingMinutes: 4,
    intro:
      "Traditional product photography needs a finished product, a studio and a reshoot every time a colour or finish changes. 3D product visualisation needs none of them. From CAD files, technical drawings or reference photos, a product can be modelled once and rendered in any finish, from any angle, before it leaves the factory.",
    sections: [
      {
        heading: "Ready for launch day",
        body: [
          "Because the imagery is created from design data, marketing can begin while manufacturing is still being planned. Launch campaigns, catalogues, e-commerce listings and packaging can all be prepared in parallel.",
        ],
      },
      {
        heading: "Every variant, consistently",
        body: [
          "Once a product is modelled, colour and material variants are rendered under identical lighting. The range looks consistent across the catalogue, and adding a new finish does not mean organising a new shoot.",
        ],
      },
      {
        heading: "Detail that photography struggles with",
        body: [
          "Exploded views, cut-aways and close-ups of materials and mechanisms show what makes a product better. These views are difficult or impossible to photograph, but routine in 3D.",
        ],
      },
      {
        heading: "From render to packaging and adverts",
        body: [
          "At VGIS the renders do not stop at the image. Our 2D studio takes them into packaging, brand and campaign design, and our campaigns team turns them into product adverts and launch videos, so the product and its marketing come from one team.",
        ],
      },
    ],
  },
  {
    slug: "your-development-needs-a-brand",
    title: "Why your development needs a brand, not just a name",
    description:
      "How brand identity gives a real estate development or company a professional, consistent presence, and why renders and branding work best from one studio.",
    date: "2026-11-13",
    service: "brand-identity",
    related: ["graphic-design", "architectural-visualization"],
    image: "brand-system-1",
    readingMinutes: 4,
    intro:
      "A development is a product, and buyers judge products by how they are presented. A name and a logo are a start. A brand identity (narrative, logo, typography, colour and the rules that hold them together) is what makes every brochure, hoarding, advert and render feel like it belongs to the same serious, organised project.",
    sections: [
      {
        heading: "First impressions are visual",
        body: [
          "For many prospective buyers and partners, the first encounter with a project is a single image or advert. If that encounter feels considered and consistent, the project feels credible.",
        ],
        keyPoints: [40, 41, 62],
      },
      {
        heading: "Consistency across every touchpoint",
        body: [
          "Brand guidelines make sure the website, brochures, site signage, social media and sales documents all use the same logo, colours and type. Without them, each supplier interprets the project differently and the brand drifts.",
        ],
        keyPoints: [45, 44],
      },
      {
        heading: "Stand out and be remembered",
        body: [
          "In a crowded market, a clear identity differentiates a development from competing schemes and makes proposals more memorable. For contractors and developers, it also strengthens the company's own portfolio and presentation.",
        ],
        keyPoints: [42, 76, 73],
      },
      {
        heading: "Why one studio for renders and brand",
        body: [
          "VGIS builds brand identities through a six-stage process, from a discovery questionnaire and interview to complete guidelines and an asset package. Because the same studio produces the 3D visualisation, the renders and the brand share one art direction from the start.",
        ],
      },
    ],
  },
  {
    slug: "one-project-many-formats",
    title: "One project, many formats: turning visualisation into a campaign",
    description:
      "How a single 3D visualisation project becomes stills, carousels, reels, adverts, concept films and billboards, and how to plan a campaign around it.",
    date: "2026-11-13",
    service: "property-adverts",
    related: ["motion-graphics", "cinematic-walkthroughs"],
    image: "concept-film",
    readingMinutes: 4,
    intro:
      "A visualisation project produces a 3D model of the development. From that one model, a campaign can draw stills, carousels, reels, walkthrough clips, concept films, billboards and presentation material. Planning the campaign at the start gets far more from the same investment.",
    sections: [
      {
        heading: "From one model to every channel",
        body: [
          "New camera angles, times of day and scenes can be rendered from the same model as the campaign needs them. Social media, the website, outdoor advertising and print each get assets designed for their format, not cropped from a single image.",
        ],
        keyPoints: [77, 63, 43, 46],
      },
      {
        heading: "Adverts and concept films",
        body: [
          "High-quality renders become the centrepiece of property advertising. For larger schemes and building programmes, a concept film presents the whole vision to stakeholders, investors and the public in a few minutes.",
        ],
        keyPoints: [34, 59],
      },
      {
        heading: "Assets that keep working",
        body: [
          "Visual assets stay useful through each stage of a development, from pre-launch to sales to handover, and remain a digital record of the project after construction begins.",
        ],
        keyPoints: [64, 78],
      },
      {
        heading: "How a VGIS campaign runs",
        body: [
          "Campaign and motion projects follow five stages: brief, script and storyboard, production, edit, and delivery with cut-downs for every format. The 3D, motion graphics and branding are produced under one art direction, so the campaign reads as one system.",
        ],
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((p) => p.slug === slug);
export const insightsForService = (slug: string) => insights.filter((p) => p.service === slug || p.related?.includes(slug));

// Build-time integrity check: every post must point at a real portfolio image and service.
import { portfolio as _portfolio } from "./portfolio";
import { services as _services } from "./services";
for (const p of insights) {
  if (!_portfolio.some((w) => w.id === p.image)) throw new Error(`Insight "${p.slug}": unknown image id "${p.image}"`);
  for (const s of [p.service, ...(p.related ?? [])])
    if (!_services.some((x) => x.slug === s)) throw new Error(`Insight "${p.slug}": unknown service "${s}"`);
}

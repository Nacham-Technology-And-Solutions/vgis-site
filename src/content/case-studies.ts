import { isHidden } from "./hidden";

/**
 * Case studies for the signature projects.
 *
 * Rule: facts only. Everything here comes from the portfolio manifest (docs/portfolio-manifest.json: image titles,
 * scope tags, location, client, videos) or from site data already approved (projects.ts). No invented results,
 * quotes, figures or timelines. A section with no data is left out, and the page skips it.
 *
 * Images are referenced by file name inside the project's own image set; the build fails if one is missing,
 * so a renamed file can't silently break a page.
 */

export type CaseStage = { title: string; body: string; images: string[] };
export type CasePart = { name: string; slug?: string; body: string; images: string[] };

export type CaseStudy = {
  slug: string;
  /** One-line headline for cards and the hero. */
  headline: string;
  /** The brief, as the work itself shows it. */
  brief: string;
  /** VGIS scope, in delivery order. */
  scope: string[];
  /** Process stages, only where the project's own assets show them. */
  process?: CaseStage[];
  /** Sub-projects (White Avenue: Cedarwood City and Colour Code). */
  parts?: CasePart[];
  /** What was delivered, counted from the assets we hold. */
  deliverables: string[];
};

const allCaseStudies: CaseStudy[] = [
  {
    slug: "down-town-castries",
    headline: "A new mixed-use quarter for downtown Castries, shown street by street.",
    brief:
      "Visualise the redevelopment of downtown Castries, Saint Lucia: a new block of homes, shops, a convention centre and hotel rooftop spaces, set into the existing street grid around Lewis Street and Castries Market.",
    scope: ["Design", "3D visualisation", "Complete structural rendering"],
    process: [
      {
        title: "Context",
        body: "The proposed block is placed into an aerial photograph of Castries, so the scheme is read against the real town and harbour.",
        images: ["10-map-new-castries.jpg"],
      },
      {
        title: "Massing",
        body: "A top-down massing sets out the block: buildings around a central courtyard pool and garden, tied into the surrounding streets.",
        images: ["11-aerial-massing.jpg"],
      },
      {
        title: "Street level",
        body: "Views along Lewis Street and past Castries Market show the shopfronts, balconies and planting at eye level.",
        images: ["13-lewis-street-axis.jpg", "12-lewis-street-corner.jpg"],
      },
      {
        title: "Day to night",
        body: "The same balcony view toward the convention centre, rendered by day and at dusk.",
        images: ["06-luxury-to-convention-center.jpg", "07-convention-center-night.jpg"],
      },
    ],
    deliverables: [
      "15 rendered views: streets, courtyards, rooftops and the convention centre",
      "Context and massing views of the block within Castries",
      "Day and dusk versions of key views",
    ],
  },
  {
    slug: "st-helen-hotel",
    headline: "A hotel designed and visualised, inside and out, before construction.",
    brief:
      "Take a new hotel from concept to photorealistic visualisation before construction, covering the exterior, the rooftop pool, the reception, the banquet hall and the guest rooms.",
    scope: ["Concept", "Design", "3D visualisation"],
    process: [
      {
        title: "Exterior",
        body: "The building is established from above and from the street: terracotta cladding, stone end frames and a glazed corner.",
        images: ["01-establishing-exterior.jpg", "04-street-facade.jpg"],
      },
      {
        title: "Arrival",
        body: "The entrance sequence, from the reception doors to the banquet hall frontage.",
        images: ["05-reception-entrance.jpg", "06-corner-banquet-hall.jpg"],
      },
      {
        title: "Inside",
        body: "The banquet hall set for an event, and a guest room ready for arrival.",
        images: ["07-banquet-hall-band.jpg", "08-guest-room-208.jpg"],
      },
    ],
    deliverables: ["8 rendered views covering exterior, rooftop pool, reception, banquet hall and a guest room"],
  },
  {
    slug: "white-avenue-real-estate",
    headline: "Visualisation across White Avenue's developments, from colour options to an interactive estate tour.",
    brief:
      "Visualise White Avenue Real Estate's developments, Cedarwood City Estate and Colour Code, from estate-wide views to facade colour options.",
    scope: ["Design", "3D visualisation", "Interactive walkthrough", "Walkthrough film"],
    parts: [
      {
        name: "Cedarwood City Estate",
        slug: "cedarwood-city-estate",
        body: "Estate views of the houses, streets, park, pond and sports courts, an aerial of the estate, a tour film, and an interactive game walkthrough that lets buyers explore the estate freely.",
        images: ["04-set1-7.jpg", "01-estate-park.jpg", "02-street-of-houses.jpg"],
      },
      {
        name: "Colour Code",
        slug: "colour-code",
        body: "One row of houses, rendered in three colour treatments (mixed accents, all-blue and all-orange) so the facade options can be compared side by side.",
        images: ["01-mixed-facade-row.jpg", "03-all-blue.jpg", "04-all-orange.jpg"],
      },
    ],
    deliverables: [
      "Cedarwood City Estate: 7 rendered views, a tour film and an interactive game walkthrough",
      "Colour Code: 4 rendered views, including three colourway options",
    ],
  },
  {
    slug: "spicy-kingdom",
    headline: "A restaurant and its grounds for Spicy Palace in Bida, from concept to working drawings, and the base for our Skyframe XR demo.",
    brief:
      "Design Spicy Kingdom for Spicy Palace in Bida, Niger State: the dining room, plus the grounds around it, with a lawn and outdoor stage and a children's play area.",
    scope: ["Concept", "Design", "Working drawings", "3D visualisation"],
    process: [
      {
        title: "Site plan",
        body: "A top-down view sets out the whole site: the restaurant building, the lawns, the play area and the boundary walls.",
        images: ["07-dining-night-38.jpg"],
      },
      {
        title: "Dining room, day to dusk",
        body: "The dining room is rendered in daylight and again at dusk, with the pendant lights on, to show the space by day and in the evening.",
        images: ["01-dining-day.jpg", "05-dining-night.jpg"],
      },
      {
        title: "Outdoor spaces",
        body: "Outside, a walled lawn leads to a covered stage, and a play area with a bouncy castle sits under a large shade tree.",
        images: ["02-dining-day-17.jpg", "03-dining-day-24.jpg"],
      },
    ],
    deliverables: [
      "Working drawings (not shown publicly)",
      "7 rendered views: site plan, dining room by day and at dusk, lawn and stage, and play area",
      "A walkthrough film",
      "A Skyframe XR VR demo built on the project",
    ],
  },
  {
    slug: "kavacha-garden",
    headline: "Pavilions, planting and arrival at Kavacha Garden, designed and visualised.",
    brief:
      "Concept, design and visualisation for Kavacha Garden: timber-clad pavilions, the entrance drive and car park, and the boundary wall carrying the Kavacha crest.",
    scope: ["Concept", "Design", "3D visualisation"],
    process: [
      {
        title: "Site plan",
        body: "A top-down view sets out the car park, the main building and the pavilions within a planted boundary.",
        images: ["06-garden-20.jpg"],
      },
      {
        title: "Arrival",
        body: "From the road, the timber wall and gold crest mark the entrance; the drive then runs between the pavilions and green walls.",
        images: ["04-garden-12.jpg", "05-garden-19.jpg"],
      },
    ],
    deliverables: ["6 rendered views: site plan, crest wall, entrance drive, car park and pavilion walks", "A walkthrough film"],
  },
];

/** Published case studies, in loop order. Hidden projects (see hidden.ts) are left out. */
export const caseStudies: CaseStudy[] = allCaseStudies.filter((c) => !isHidden(c.slug));

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

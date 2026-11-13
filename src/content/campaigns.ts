import type { Offer } from "./offers";
import type { Faq } from "./services";

/**
 * Campaign: "Before You Build: 80 Reasons to Visualize" (Nigeria first).
 * All reason text comes verbatim from the owner's knowledge base (src/content/knowledge/80-reasons.ts),
 * referenced by number so wording never drifts.
 */
export type Audience = { id: string; label: string; message: string; reasons: number[] };

export const beforeYouBuild = {
  slug: "before-you-build",
  name: "Before You Build: 80 reasons to visualise",
  campaign: "before-you-build",
  eyebrow: "Before You Build · 80 reasons to visualise",
  headline: "See it before you build it.",
  subhead:
    "Photorealistic 3D visualisation turns your drawings into the finished project before construction starts, so you can study it, improve it, present it and market it, then build it.",
  waMessage: "Hello VGIS, I saw your 'Before You Build' campaign and I'd like to see my project before I build it.",
  ctaLabel: "Get a visualisation quote",
  audiences: [
    { id: "developers", label: "Developers", message: "I'm a developer.", reasons: [31, 32, 33] },
    { id: "architects", label: "Architects", message: "I'm an architect.", reasons: [6, 9, 49] },
    { id: "contractors", label: "Contractors", message: "I'm a contractor.", reasons: [27, 75, 26] },
    { id: "real-estate", label: "Real estate", message: "I work in real estate.", reasons: [34, 35, 36] },
    { id: "homeowners", label: "Homeowners", message: "I'm building my own home.", reasons: [11, 13, 52] },
  ] satisfies Audience[],
  weeks: [
    { id: "see", week: 1, title: "See better", intro: "Turn drawings into something everyone can understand.", reasons: [1, 2, 9, 12] },
    { id: "plan", week: 2, title: "Plan better", intro: "Decide and change things before money is spent.", reasons: [4, 5, 52, 57] },
    { id: "build", week: 3, title: "Build better", intro: "Keep the team building the same vision.", reasons: [18, 20, 26, 27] },
    { id: "sell", week: 4, title: "Sell better", intro: "Market the project before it is complete.", reasons: [31, 32, 36, 46] },
  ],
  faqs: [
    {
      q: "What do I need to send to get started?",
      a: "Your floor plans and elevations, or a 3D model if you have one, plus the site location and any reference images. Send them on WhatsApp or through the form and we will confirm the scope and quote before production.",
    },
    {
      q: "Is this only for large developments?",
      a: "No. Developers, architects, contractors, real estate teams and people building their own homes all use visualisation to see the result before construction.",
    },
    {
      q: "Can I see the model before the final images?",
      a: "Yes. You review a sketch preview of the 3D model before we move to final lighting, materials and rendering.",
    },
  ] satisfies Faq[],
  meta: {
    title: "See It Before You Build It | Before You Build by VGIS®",
    description:
      "Turn your drawings into photorealistic 3D visuals before construction. See, plan, build and sell better. Message VGIS on WhatsApp to start.",
  },
  ads: {
    keywords: ["3d rendering abuja", "house design 3d nigeria", "building plan 3d visualization", "3d render of my house plan", "architectural visualization nigeria", "see building before construction"],
    audiences: [
      "Nigeria first: Abuja, Lagos, Port Harcourt, Enugu, Kano",
      "Developers, architects, contractors, estate agents (job titles / interests)",
      "Homeowners: interests in building a house, home design, land purchase",
      "Retarget: visitors to any /offers page",
    ],
    headlines: ["See It Before You Build It", "Before You Build: Visualise", "Your Plans in Photoreal 3D", "80 Reasons to Visualise", "Study It, Then Build It", "3D Visuals From Your Drawings", "WhatsApp Your Plans Today", "VGIS 3D Visualisation"],
    descriptions: [
      "Turn your drawings into photorealistic 3D before construction starts.",
      "See it, study it, improve it, present it, market it. Then build it. Chat on WhatsApp.",
      "For developers, architects, contractors, real estate and homeowners in Nigeria.",
    ],
    primaryText:
      "A construction project should not have to remain an idea in someone's head until the building is completed. See it. Study it. Improve it. Present it. Market it. Then build it. Send your plans to VGIS on WhatsApp.",
  } satisfies Offer["ads"],
};

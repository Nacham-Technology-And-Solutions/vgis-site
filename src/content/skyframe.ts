import { manifestProjects, skyframeWalkthrough } from "./work.generated";

function skyframeAsset(name: string) {
  const img = manifestProjects.find((m) => m.name === "Skyframe XR")?.images.find((i) => i.src.includes(`/skyframe/${name}`));
  return img ? { src: img.src, width: img.width, height: img.height } : undefined;
}

/**
 * SKYFRAME XR product content.
 *
 * Source: the Skyframe XR brief Geburah compiled from Precious's files (Arkfield brochure, Skyframe XR 2.0
 * pitch deck, Real Forte proposal, cover, logos), 13 Nov 2026, channel messages #95-#98, plus the owner's
 * instruction (#99/#100) to present it as a PARTNERSHIP of Arkfield Realty and VGIS, credited equally.
 *
 * Rules: public-safe content only. No figures (market size, client counts, LOIs), client names,
 * pricing/commercial terms, investor material or team members beyond what the owner approves.
 * Spelling convention: "Skyframe XR" (owner, #94). Source typos (SYKFRAME, WALKTHROUG) are not reused.
 * Quotes marked `verbatim` keep the source wording, with spelling normalised to "Skyframe".
 */

export const skyframe = {
  name: "Skyframe XR",
  partnership: "A partnership between Arkfield Realty & VGIS",
  partnershipLong:
    "Skyframe XR is a partnership between Arkfield Realty and Visual Graphics Illustration Services Ltd (VGIS).",
  category: "Real Estate Technology", // cover subtitle

  /** Pitch deck tagline (verbatim). */
  tagline: "Walk Through Tomorrow, Today.",
  /** Proposal definition (verbatim, spelling normalised). */
  definition:
    "Skyframe XR is a real estate virtual experience that enables live, on-the-go previews of your property offerings, whether off-plan developments or bare plots. It grants clients a firsthand, 360° visual experience of the project in its completed form before a single block is laid.",
  /** Pitch deck value proposition (verbatim). */
  valueProposition:
    "We empower real estate developers to sell faster, eliminate costly errors, and attract global investment by allowing anyone, anywhere, to experience a property before a single brick is laid.",

  /** Brochure hook lines (verbatim). */
  hooks: {
    imagine: "Imagine standing on bare land… and seeing the future built before your eyes.",
    confidence: "With Skyframe, we can now bring 3D estate designs to life on-site in real time. No more guesswork — only confidence.",
    show: "Why explain our vision when we can show it on the ground?",
    trust: "Skyframe gives our clients something they can see, experience and trust.",
    precision: "Every window, every wall, every walkway mapped out in real-time. Skyframe makes sure nothing is left to the imagination.",
  },

  /** Pitch deck problem statements (headings + explanations verbatim; the market-size figure is omitted). */
  problems: [
    {
      title: "Lengthy & inefficient sales cycles",
      body: "Selling off-plan properties with 2D blueprints and basic images fails to create an emotional connection, leading to buyer hesitation and lost sales.",
    },
    {
      title: "Costly rework & misunderstandings",
      body: "Communication gaps between clients and architects lead to mid-construction changes that cost developers millions in rework and delays.",
    },
    {
      title: "Geographical barriers to investment",
      body: "High-net-worth buyers, especially in the diaspora, cannot physically visit multiple sites, creating friction that slows down investment and limits the market.",
    },
  ],

  /** Features grouped as the sources group them. `v2` marks Skyframe XR 2.0 platform features. */
  features: [
    {
      title: "Estate masterplan projection",
      body: "From raw land, project entire estate layouts block by block, with community features like clubhouses, playgrounds, schools and shopping areas. Clients can walk from plot 10A to the gate, or from the gate to house 27B.",
    },
    {
      title: "1:1 scale virtual walkthrough",
      body: "A true-to-size, fully immersive walkthrough of the estate and individual units. Clients enter rooms, walk around furniture, evaluate room sizes and layouts, and experience natural lighting and movement through space.",
    },
    {
      title: "Customisation & visualisation",
      body: "Clients personalise designs (wall colours, tile patterns, kitchen styles) and see their changes reflected instantly in AR. They don't just buy a home; they co-create it before a single block is laid.",
    },
    {
      title: "Standalone VR experience",
      body: "No expensive PC, no cables, no complicated setup. Fully accessible on the Meta Quest 3 headset.",
      v2: true,
    },
    {
      title: "Secure cloud delivery",
      body: "Properties are hosted on a secure, scalable cloud infrastructure, accessible globally via a unique code.",
      v2: true,
    },
    {
      title: "Intuitive exploration",
      body: "Users can freely walk through properties with natural, easy-to-learn VR locomotion and controls.",
      v2: true,
    },
  ],

  /** Two delivery models, kept separate as the brief requires. */
  models: {
    onSite: {
      title: "On-site AR/VR experience",
      intro:
        "With Skyframe ARO or VRO glasses (augmented or virtual reality optics), clients go to the physical location of the land, wear the glasses, and instantly see what will be built there. As they move, the glasses respond in real time, giving a life-sized, immersive walkthrough of the development.",
      setup: "Setup: a high-performance PC, a VR headset and a Wi-Fi 6 (6 GHz) router, plus the VR content built from your architectural details.",
      steps: [
        "Identify the project to be Sky-Framed.",
        "Submit the architectural plan and a written description of any special specifications to capture.",
        "Agree and sign the deliverables.",
        "We develop and build the VR scenarios: the core of the work.",
        "We share a preview with your team.",
        "We make basic adjustments within the agreed specifications.",
        "We package it as an executable integrated into the Skyframe application.",
        "We set it up at your office or site, with basic staff training.",
        "Final handoff.",
      ],
    },
    v2: {
      title: "Skyframe XR 2.0: from blueprint to VR in three simple steps",
      intro: "The new standalone platform: no PC and no cables, delivered from the cloud to a Meta Quest 3 headset.",
      steps: [
        { title: "Onboarding", body: "The developer provides their standard architectural files (e.g. AutoCAD, Revit)." },
        { title: "Optimisation", body: "Our team uses our proprietary pipeline to build and optimise a photorealistic, high-performance virtual model." },
        { title: "Access", body: "The developer receives a unique Property Code. Their clients download the Skyframe XR app from the Meta Quest Store, enter the code, and begin their immersive tour." },
      ],
      note: "Ask us about availability of Skyframe XR 2.0 for your project.",
    },
  },

  audiences: {
    platform: ["Real estate developers", "Architectural firms", "Real estate companies focused on trust, innovation and client experience"],
    clients: ["Off-plan and bare-plot buyers", "Diaspora buyers who cannot visit the site", "High-end clients", "Skeptical buyers"],
  },

  faqs: [
    {
      q: "What is Skyframe XR?",
      a: "Skyframe XR is a real estate virtual experience that lets clients preview a property, whether an off-plan development or a bare plot, in its completed form before a single block is laid. It is a partnership between Arkfield Realty and VGIS.",
    },
    {
      q: "Who is behind Skyframe XR?",
      a: "Skyframe XR is a partnership between Arkfield Realty and Visual Graphics Illustration Services Ltd (VGIS).",
    },
    {
      q: "What equipment do clients need?",
      a: "For the on-site experience, clients wear Skyframe ARO or VRO glasses at the location, running on a high-performance PC with a VR headset and Wi-Fi 6 router. Skyframe XR 2.0 is designed to run standalone on a Meta Quest 3 headset, with no PC or cables.",
    },
    {
      q: "Can buyers abroad use it?",
      a: "Yes. Removing geographical barriers is one of Skyframe XR's goals. With Skyframe XR 2.0, properties are hosted in the cloud and accessed globally with a unique Property Code.",
    },
    {
      q: "What do you need from me to start?",
      a: "Your architectural plans (for example AutoCAD or Revit files) and a written description of any special specifications you want captured. We then agree the deliverables before development begins.",
    },
  ],

  /** Media from the owner's asset PR (public/skyframe/...), picked up automatically from the manifest import. */
  media: {
    logo: skyframeAsset("logo-horizontal"),
    video: skyframeWalkthrough ? { mp4: skyframeWalkthrough, poster: skyframeAsset("cover")?.src } : undefined,
  } as {
    logo?: { src: string; width: number; height: number };
    video?: { mp4?: string; youtubeId?: string; poster?: string };
  },
};

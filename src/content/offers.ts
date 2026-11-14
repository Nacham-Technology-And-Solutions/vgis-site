import type { Faq } from "./services";
import type { ProcessKey } from "./process";

/**
 * Ad landing pages ("offers"). One audience, one promise, one action per page.
 * Claims must stay within the company profile: no prices, discounts, turnaround
 * guarantees or results we cannot prove. `ads` is the matching ad kit (shown on /offers).
 */
export type Offer = {
  slug: string;
  /** Short internal and ad-manager name. */
  name: string;
  audience: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  /** What the visitor gets when they reach out. */
  ctaLabel: string;
  /** Prefilled WhatsApp text (the offer reference is appended automatically). */
  waMessage: string;
  why: { title: string; body: string }[];
  includes: string[];
  process: ProcessKey;
  projects: string[]; // project slugs
  services: string[]; // service slugs, for "learn more" links
  faqs: Faq[];
  meta: { title: string; description: string };
  ads: {
    /** Google Search: keyword themes (use phrase/exact match). */
    keywords: string[];
    /** Meta / LinkedIn: who to target. */
    audiences: string[];
    /** Google RSA headlines, max 30 characters each. */
    headlines: string[];
    /** Google RSA descriptions, max 90 characters each. */
    descriptions: string[];
    /** Meta / LinkedIn primary text. */
    primaryText: string;
  };
};

export const offers: Offer[] = [
  {
    slug: "off-plan-renders",
    name: "Off-plan property renders",
    audience: "Real estate developers",
    eyebrow: "For real estate developers",
    headline: "Sell your development before the first block is laid.",
    subhead:
      "Photorealistic 3D renders of exteriors, interiors and the full masterplan, accurate enough for buyers, investors and approval boards to trust.",
    ctaLabel: "Send your plans for a quote",
    waMessage: "Hello VGIS, I'd like a quote for 3D renders of a development.",
    why: [
      { title: "Buyers commit to what they can see", body: "Plans and elevations ask buyers to imagine. A photorealistic render shows them the finished home, in its setting, at the right scale." },
      { title: "Investors and boards need confidence", body: "Accurate materials, lighting and context make your proposal credible to investors, partners and approval authorities." },
      { title: "One image set, every channel", body: "The same renders power brochures, billboards, social media, sales decks and site hoardings." },
    ],
    includes: ["Photorealistic exterior renders", "Interior renders", "Masterplan and aerial views", "Sketch preview before final rendering", "Marketing-ready image files"],
    process: "3d",
    projects: ["down-town-castries", "kavacha-garden", "cedarwood-city-estate"],
    services: ["architectural-visualization"],
    faqs: [
      { q: "What do you need from me?", a: "Your architectural plans and elevations, or a 3D model if you have one, plus the site location and any reference images. We confirm the scope with you in the Blueprint & agreement stage." },
      { q: "Do I get to review the work before it is final?", a: "Yes. You review an initial 3D model and composition at the Sketch preview stage, before final lighting, materials and rendering." },
      { q: "Can you also design the brochure and adverts?", a: "Yes. Our 2D studio can turn the renders into your brand, brochures, billboards and social content, so everything comes from one team." },
      { q: "Do you work with developers outside Abuja?", a: "Yes. We work from Abuja, Lagos and Bida and serve clients in Nigeria, Canada, the United States and Saint Lucia. Briefs and reviews work remotely." },
    ],
    meta: {
      title: "3D Renders for Off-Plan Developments | VGIS®",
      description: "Photorealistic 3D renders of exteriors, interiors and masterplans to sell off-plan property. Send your plans to VGIS in Abuja for a quote.",
    },
    ads: {
      keywords: ["3d rendering abuja", "architectural rendering nigeria", "3d architectural visualization lagos", "off plan property renders", "3d exterior render", "real estate 3d rendering", "3d visualization company nigeria"],
      audiences: ["Job titles: real estate developer, property developer, architect, estate manager", "Interests: real estate development, construction, architecture", "Locations: Abuja, Lagos, Port Harcourt; diaspora in UK, US, Canada", "LinkedIn: company size 11+, industry real estate / construction"],
      headlines: ["Photorealistic 3D Renders", "Sell Off-Plan With Renders", "3D Rendering in Abuja", "Exterior & Interior Renders", "Masterplan & Aerial Views", "Review Before Final Render", "Send Your Plans for a Quote", "VGIS 3D Visualisation"],
      descriptions: [
        "Photorealistic renders of your development, accurate enough for buyers and investors.",
        "Exteriors, interiors and masterplans from one Abuja studio. Send your plans today.",
        "Review a sketch preview before final rendering. Chat with us on WhatsApp.",
      ],
      primaryText: "Your buyers can't walk through a building that isn't built yet. Show them. VGIS creates photorealistic 3D renders of exteriors, interiors and masterplans for real estate developers. Send your plans on WhatsApp for a quote.",
    },
  },
  {
    slug: "walkthrough-video",
    name: "Cinematic walkthrough video",
    audience: "Developers and marketing teams",
    eyebrow: "For launches and sales campaigns",
    headline: "A film of your development before it exists.",
    subhead:
      "Cinematic 3D walkthroughs and flythroughs that move buyers and investors through the space, its scale and its setting, ready for launches, social media and presentations.",
    ctaLabel: "Request a walkthrough quote",
    waMessage: "Hello VGIS, I'd like a quote for a 3D walkthrough video.",
    why: [
      { title: "Video holds attention", body: "A walkthrough shows how spaces connect, how light moves and how the development sits in its surroundings, in a way still images cannot." },
      { title: "Built for launch events and social media", body: "One production gives you a full film for launch screens and short cut-downs for social media and adverts." },
      { title: "Branded from the first frame", body: "Our 2D team can add your titles, logo animation and motion graphics, so the film carries your brand." },
    ],
    includes: ["Exterior flythrough", "Interior walkthrough", "Development or masterplan film", "Social media cut-downs", "Titles and motion graphics on request"],
    process: "3d",
    projects: ["cedarwood-city-estate", "down-town-castries", "kavacha-garden"],
    services: ["cinematic-walkthroughs", "motion-graphics"],
    faqs: [
      { q: "How is a walkthrough video different from VR?", a: "A walkthrough video follows a planned, cinematic camera path and plays on any screen. A VR or interactive walkthrough (Skyframe XR) lets the viewer move freely in real time." },
      { q: "Can I get short versions for social media?", a: "Yes. We can deliver cut-downs for social media and adverts alongside the full film." },
      { q: "What do you need to start?", a: "Plans and elevations or a 3D model, the site location, and references for the mood you want. We agree the scope and deliverables in the Blueprint & agreement stage." },
    ],
    meta: {
      title: "3D Walkthrough Videos for Developments | VGIS®",
      description: "Cinematic 3D walkthrough and flythrough films of your development for launches, investors and social media. Request a quote from VGIS.",
    },
    ads: {
      keywords: ["3d walkthrough video", "architectural animation nigeria", "3d flythrough", "real estate walkthrough video", "3d animation company abuja", "property launch video"],
      audiences: ["Job titles: developer, marketing manager, sales director (real estate)", "Interests: real estate marketing, property investment, construction", "Retarget: visitors to /services and /work", "Lookalike: website leads (when available)"],
      headlines: ["3D Walkthrough Videos", "Film Your Development Now", "Cinematic 3D Flythroughs", "Launch-Ready Property Films", "Social Cut-Downs Included", "Request a Walkthrough Quote", "VGIS 3D Animation", "Abuja 3D Animation Studio"],
      descriptions: [
        "Cinematic walkthroughs that show buyers your development before it is built.",
        "Full launch film plus social cut-downs, with your branding. Chat on WhatsApp.",
        "Exterior flythroughs and interior walkthroughs from VGIS in Abuja.",
      ],
      primaryText: "Give your launch a film buyers remember. VGIS produces cinematic 3D walkthroughs of developments before they are built, with cut-downs ready for social media. Message us on WhatsApp for a quote.",
    },
  },
  {
    slug: "vr-property-tours",
    name: "Skyframe XR: AR & VR property walkthroughs",
    audience: "Developers and real estate companies",
    eyebrow: "Skyframe XR by VGIS",
    headline: "Walk through tomorrow, today.",
    subhead:
      "Skyframe XR lets clients stand on bare land, or step into an off-plan home, and see the finished development at life size in AR or VR, before a single block is laid.",
    ctaLabel: "Book a Skyframe XR demo",
    waMessage: "Hello, I'd like to know more about Skyframe XR for my development.",
    why: [
      { title: "No more selling ideas or promises", body: "Clients stand on the actual plot and see the estate: streets, houses, green areas, everything, right where the property will stand." },
      { title: "Walk through it at life size", body: "A 1:1 scale walkthrough lets clients enter their future home, walk through every room and feel the space and layout before committing." },
      { title: "No geographical barriers", body: "Diaspora and remote buyers can experience the property without visiting the site." },
    ],
    includes: ["On-site AR/VR walkthrough on the actual land", "1:1 scale virtual walkthrough", "Estate masterplan projection", "Finish customisation and visualisation in AR", "Setup at your office or site, with basic staff training"],
    process: "xr",
    projects: ["cedarwood-city-estate"],
    services: ["skyframe-xr"],
    faqs: [
      { q: "What is Skyframe XR?", a: "Skyframe XR by VGIS is a real estate virtual experience. Clients preview an off-plan development or a bare plot in its completed form before a single block is laid." },
      { q: "What do you need from me?", a: "Your architectural plans and a written description of any special specifications you want captured. We agree the deliverables with you before development begins." },
      { q: "What is Skyframe XR 2.0?", a: "The new standalone platform: properties are optimised and hosted in the cloud, and clients tour them on a Meta Quest 3 headset with a unique Property Code. Ask us about availability for your project." },
    ],
    meta: {
      title: "Skyframe XR: AR & VR Walkthroughs for Developers | VGIS®",
      description: "Let buyers walk through off-plan developments and bare land at life size in AR and VR. Skyframe XR by VGIS.",
    },
    ads: {
      keywords: ["vr property tour", "virtual reality real estate nigeria", "off plan virtual walkthrough", "ar real estate", "vr walkthrough estate", "virtual site visit nigeria"],
      audiences: ["Job titles: developer, sales director, marketing director (real estate)", "Interests: virtual reality, proptech, real estate investment", "Real estate companies and architectural firms in Lagos and Abuja", "Diaspora investors: UK, US, Canada"],
      headlines: ["Walk Through Tomorrow, Today", "Skyframe XR by VGIS", "See Your Estate on Bare Land", "1:1 Scale VR Walkthroughs", "AR & VR for Developers", "No More Selling Promises", "Book a Skyframe XR Demo", "Virtual Site Visits Abroad"],
      descriptions: [
        "Clients stand on bare land and see the finished estate at life size in AR or VR.",
        "1:1 walkthroughs and estate masterplans before a single block is laid.",
        "Skyframe XR by VGIS. Message us on WhatsApp to book a demo.",
      ],
      primaryText: "Imagine standing on bare land… and seeing the future built before your eyes. Skyframe XR by VGIS lets your buyers walk through your development at life size before construction. Message us for a demo.",
    },
  },
  {
    slug: "product-renders",
    name: "3D product renders",
    audience: "Product manufacturers",
    eyebrow: "For manufacturers and brands",
    headline: "Studio-quality product images, without the studio.",
    subhead:
      "Photorealistic 3D product renders from CAD files, drawings or photos, with exact materials and lighting, ready for launches, catalogues, packaging and adverts.",
    ctaLabel: "Get a product render quote",
    waMessage: "Hello VGIS, I'd like a quote for 3D product renders.",
    why: [
      { title: "No sample, no photoshoot", body: "We work from CAD files, technical drawings or reference photos, so you can market a product before it is manufactured." },
      { title: "Every variant, consistently", body: "Show every colour, finish and material option under identical lighting, without reshooting." },
      { title: "From render to packaging", body: "Our 2D studio can take the renders straight into packaging, brand and campaign design." },
    ],
    includes: ["Photorealistic product stills", "Material and colour variants", "Exploded and detail views", "Launch and campaign imagery", "Packaging and advert design on request"],
    process: "3d",
    projects: [],
    services: ["product-visualization", "graphic-design"],
    faqs: [
      { q: "Do you need a physical product?", a: "No. CAD files, technical drawings or reference photographs are enough. A sample helps us match materials exactly, but it is not required." },
      { q: "Can you show different colours and finishes?", a: "Yes. Once the product is modelled, we can render material and colour variants under the same lighting." },
      { q: "Can the renders go straight into packaging and ads?", a: "Yes. Our 2D team designs packaging, campaigns and social content around the renders." },
    ],
    meta: {
      title: "3D Product Rendering for Manufacturers | VGIS®",
      description: "Photorealistic 3D product renders from CAD, drawings or photos, for launches, catalogues, packaging and ads. Get a quote from VGIS.",
    },
    ads: {
      keywords: ["3d product rendering", "product visualization nigeria", "3d product animation", "cgi product images", "product render from cad", "3d packaging mockup"],
      audiences: ["Job titles: brand manager, product manager, marketing manager (manufacturing, FMCG)", "Interests: manufacturing, product design, e-commerce", "LinkedIn industries: consumer goods, manufacturing, furniture", "Locations: Lagos, Abuja, Kano, Onitsha/Aba industrial hubs"],
      headlines: ["Photorealistic Product Renders", "No Photoshoot Needed", "3D Renders From Your CAD", "Every Colour, One Render", "Product CGI for Launches", "Packaging-Ready Images", "Get a Product Render Quote", "VGIS 3D Product Studio"],
      descriptions: [
        "Studio-quality product images from CAD files, drawings or photos. No sample needed.",
        "Material and colour variants, detail views and launch imagery from VGIS.",
        "Renders that go straight into packaging and adverts. Chat with us on WhatsApp.",
      ],
      primaryText: "Launching a product? Skip the photoshoot. VGIS creates photorealistic 3D renders from your CAD files, drawings or photos, with every colour and finish, ready for packaging and ads. Message us for a quote.",
    },
  },
  {
    slug: "civil-infrastructure-visualisation",
    name: "Civil & infrastructure visualisation",
    audience: "Civil engineers and project teams",
    eyebrow: "For civil engineers and project teams",
    headline: "Show stakeholders the project, not just the drawings.",
    subhead:
      "3D visualisation of roads, bridges, public buildings and civil works, so communities, financiers and approval bodies understand what will be built.",
    ctaLabel: "Discuss your project",
    waMessage: "Hello VGIS, I'd like to discuss 3D visualisation for a civil/infrastructure project.",
    why: [
      { title: "Clarity for non-specialists", body: "Communities, financiers and officials rarely read engineering drawings. A photorealistic visual shows them the finished project." },
      { title: "Structural accuracy", body: "Our work starts from your drawings and parameters, and you review the model before final rendering." },
      { title: "Ready for proposals and reports", body: "Visuals for bids, funding proposals, stakeholder briefings and public announcements." },
    ],
    includes: ["Structural and site visualisation", "Aerial and context views", "Walkthrough or flythrough video", "Presentation and proposal graphics"],
    process: "3d",
    projects: ["st-helen-hotel", "down-town-castries"],
    services: ["architectural-visualization", "cinematic-walkthroughs"],
    faqs: [
      { q: "What kinds of civil projects do you visualise?", a: "VGIS provides visual solutions for buildings, products and civil projects. Share your drawings and we will confirm the scope in the Discovery stage." },
      { q: "Can visuals be used in bids and funding proposals?", a: "Yes. We deliver stills, video and presentation graphics suited to proposals, stakeholder briefings and public announcements." },
    ],
    meta: {
      title: "3D Visualisation for Civil & Infrastructure Projects | VGIS®",
      description: "Photorealistic 3D visuals of civil and infrastructure projects for bids, funding proposals and stakeholder engagement. Talk to VGIS.",
    },
    ads: {
      keywords: ["infrastructure visualization", "civil engineering 3d rendering", "road project 3d render", "bridge visualization", "3d rendering for tender", "public project visualization nigeria"],
      audiences: ["Job titles: civil engineer, project manager, procurement officer, consultant", "LinkedIn industries: civil engineering, construction, government administration", "Locations: Abuja (FCT), state capitals", "Interests: infrastructure, construction management"],
      headlines: ["Infrastructure Visualisation", "3D Visuals for Civil Works", "Win Bids With Clear Visuals", "Roads, Bridges & Buildings", "Structurally Accurate 3D", "Stakeholder-Ready Visuals", "Discuss Your Project", "VGIS Civil Visualisation"],
      descriptions: [
        "Photorealistic visuals that help communities, financiers and officials see your project.",
        "From your drawings to stakeholder-ready stills and video. Review before final render.",
        "Visuals for bids, funding proposals and briefings. Message VGIS on WhatsApp.",
      ],
      primaryText: "Engineering drawings don't win public support. Clear visuals do. VGIS creates photorealistic 3D visualisation of civil and infrastructure projects for bids, funding proposals and stakeholder briefings.",
    },
  },
  {
    slug: "brand-identity",
    name: "Brand identity",
    audience: "Businesses and organisations",
    eyebrow: "For businesses, clinics and firms",
    headline: "A brand that looks as serious as your business.",
    subhead:
      "Strategy, logo, typography, colour and complete brand guidelines, built through a structured six-stage process and delivered as a ready-to-use asset package.",
    ctaLabel: "Start your brand project",
    waMessage: "Hello VGIS, I'd like to discuss a brand identity project.",
    why: [
      { title: "First impressions are visual", body: "Clients judge credibility before they read a word. A coherent identity signals that you are established and trustworthy." },
      { title: "Consistency everywhere", body: "Brand guidelines keep your team, agencies and printers using the same logo, colours and type." },
      { title: "A process, not a guess", body: "Discovery questionnaire and interview, agreed direction, concepts, refinement, then delivery of every asset." },
    ],
    includes: ["Brand discovery questionnaire and interview", "Brand narrative and strategy", "Logo and visual identity", "Typography and colour system", "Brand guidelines and asset package"],
    process: "2d",
    projects: ["nacham", "infra-tech-capital-services", "bliss-mental-health-clinic", "gethsemane"],
    services: ["brand-identity", "graphic-design"],
    faqs: [
      { q: "What do I receive at the end?", a: "Comprehensive brand guidelines and an asset package, including logos, typography and colour systems, ready for your team, agencies and printers." },
      { q: "How involved will I be?", a: "Very. It starts with a discovery questionnaire and interview, and you approve the direction and concept before we refine and complete the assets." },
      { q: "Can you design our stationery and marketing too?", a: "Yes. Our graphic design and motion team can roll the identity out across stationery, brochures, social media and adverts." },
    ],
    meta: {
      title: "Brand Identity Design in Abuja | VGIS®",
      description: "Brand strategy, logo, typography, colour and brand guidelines for businesses and organisations. Start your brand project with VGIS.",
    },
    ads: {
      keywords: ["brand identity design abuja", "logo design company nigeria", "branding agency abuja", "brand guidelines design", "corporate branding lagos", "rebrand company nigeria"],
      audiences: ["Job titles: founder, CEO, managing director, marketing manager (SMEs)", "Interests: entrepreneurship, small business, startups", "Recently registered businesses / new page admins (Meta)", "Locations: Abuja, Lagos, Port Harcourt"],
      headlines: ["Brand Identity Design", "Look As Serious As You Are", "Logo, Colour & Guidelines", "Abuja Branding Studio", "A 6-Stage Brand Process", "Start Your Brand Project", "Corporate Branding by VGIS", "Complete Brand Guidelines"],
      descriptions: [
        "Strategy, logo, typography, colour and brand guidelines, delivered as one package.",
        "A structured process: discovery, concepts, refinement and full asset delivery.",
        "Brand identities for businesses, clinics and firms. Message VGIS on WhatsApp.",
      ],
      primaryText: "Your clients judge your business before they read a word. VGIS builds complete brand identities: strategy, logo, typography, colour and brand guidelines, through a structured six-stage process. Message us to start.",
    },
  },
  {
    slug: "development-launch-package",
    name: "Development launch package (3D + brand)",
    audience: "Real estate developers",
    eyebrow: "3D + branding · One studio",
    headline: "Visualise, brand and launch your development with one team.",
    subhead:
      "Renders, walkthrough film, project branding and marketing collateral, produced under one art direction so every asset in your launch looks like it belongs together.",
    ctaLabel: "Plan your launch with us",
    waMessage: "Hello VGIS, I'd like to discuss a full launch package (3D + branding) for a development.",
    why: [
      { title: "One art direction", body: "When renders and branding come from different suppliers, the campaign looks stitched together. With VGIS it is one visual system." },
      { title: "One brief, one point of contact", body: "No juggling a render studio, a design agency and a video team. We coordinate everything from plans to launch." },
      { title: "From viewing to marketing", body: "This is the VGIS model: a complete visual ecosystem, from seeing the model to selling it." },
    ],
    includes: ["Photorealistic renders", "Cinematic walkthrough film", "Development name, logo and brand identity", "Brochure, signage and site hoarding design", "Social media and advert creatives", "Optional Skyframe XR experience"],
    process: "3d",
    projects: ["cedarwood-city-estate", "down-town-castries", "kavacha-garden", "nacham"],
    services: ["architectural-visualization", "cinematic-walkthroughs", "brand-identity", "graphic-design", "motion-graphics"],
    faqs: [
      { q: "What does the package include?", a: "It is tailored to your launch. Typically renders, a walkthrough film, the development's brand identity, brochure and signage design, and social media creatives. Skyframe XR can be added." },
      { q: "Why use one studio instead of several?", a: "One team means one art direction and one point of contact, so every asset in your launch reads as one visual system." },
      { q: "How is it priced?", a: "We scope the package with you in the Blueprint & agreement stage and confirm the deliverables and quote before production begins." },
    ],
    meta: {
      title: "Development Launch Package: 3D Renders + Branding | VGIS®",
      description: "Renders, walkthrough film, project branding and marketing for your development launch, from one studio and one art direction. Talk to VGIS.",
    },
    ads: {
      keywords: ["real estate marketing agency abuja", "property launch marketing nigeria", "estate branding and renders", "real estate branding agency", "off plan marketing package", "property development marketing"],
      audiences: ["Job titles: developer, CEO, MD (real estate, construction)", "Interests: real estate development, property investment", "Retarget: visitors to off-plan-renders and walkthrough-video offers", "LinkedIn: real estate companies, 11-500 employees"],
      headlines: ["Renders + Branding, One Team", "Launch Your Development", "One Studio, One Art Direction", "3D, Brand & Marketing", "Property Launch Package", "Plan Your Launch With Us", "From Plans to Launch", "VGIS Launch Package"],
      descriptions: [
        "Renders, walkthrough film, project branding and collateral from one studio.",
        "One art direction and one point of contact for your entire development launch.",
        "From viewing the model to marketing it. Message VGIS on WhatsApp to plan your launch.",
      ],
      primaryText: "Launching a development? Don't hire three suppliers. VGIS produces your renders, walkthrough film, project branding and marketing under one art direction, so your whole launch looks like one confident brand.",
    },
  },
];

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);

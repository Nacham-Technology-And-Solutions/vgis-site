import type { Faq } from "./services";
import { services, serviceHref } from "./services";

/**
 * Company-level questions. Answers are written answer-first (the first sentence answers
 * the question on its own) so search and answer engines can quote them accurately.
 */
export const companyFaqs: Faq[] = [
  {
    q: "What is VGIS?",
    a: "VGIS (Visual Graphics Illustration Services Limited) is a 3D visualisation and design studio headquartered in Abuja, Nigeria. It produces photorealistic architectural and product renders, cinematic walkthroughs and interactive AR/VR experiences, supported by brand identity, graphic design and motion graphics.",
  },
  {
    q: "Where is VGIS located?",
    a: "VGIS's head office is at 16 Usuma Street, Maitama, Abuja, Nigeria, with a second studio in Bida, Niger State. The team works across Abuja, Lagos and Bida and serves clients in Nigeria, Canada, the United States and Saint Lucia.",
  },
  {
    q: "Who does VGIS work with?",
    a: "VGIS works with real estate developers, civil engineers, product manufacturers and corporate organisations that need premium visuals to plan, present and market their projects.",
  },
  {
    q: "Was VGIS previously called VG3DS?",
    a: "Yes. VGIS began as VG3DS (Visual Graphics 3D Services), focused on 3D architectural visualisation, and became Visual Graphics Illustration Services Limited to add 2D design, brand identity and motion graphics.",
  },
  {
    q: "Why use one studio for both 3D visualisation and branding?",
    a: "Because the renders and the marketing then come from one team with one art direction. VGIS calls this a unified visual ecosystem: the same studio helps you view and experience a model, then brand and market it.",
  },
  {
    q: "What is Skyframe XR?",
    a: "Skyframe XR by VGIS is a real estate virtual experience. Clients walk through an off-plan development or a bare plot in AR or VR, in its completed form, before a single block is laid.",
  },
  {
    q: "How does a VGIS project start?",
    a: "Every project starts with Discovery, where we study your idea, site and goals, followed by a Blueprint & agreement stage that fixes the plan, deliverables and terms. Send a brief through the contact page, WhatsApp +234 811 285 3404 or email info@3dvgis.com.",
  },
  {
    q: "Does VGIS design buildings, or only visualise them?",
    a: "Both. VGIS does the concept, the design and full working drawings (architectural, mechanical and electrical), and then the 3D visualisation. Some projects are the full package from one team.",
  },
  {
    q: "How long does a project take?",
    a: "From idea to full plans to 3D visualisation typically takes 2–5 days, all together. Timelines depend on the size and complexity of the project and are confirmed when we agree the scope.",
  },
  {
    q: "How much does 3D visualisation cost?",
    a: "Pricing depends on the scope: the number of views or the length of an animation, the level of detail, and whether interactivity is needed. VGIS confirms a fixed scope and quote in the Blueprint & agreement stage, before production begins.",
  },
  {
    q: "Does VGIS work with clients outside Nigeria?",
    a: "Yes. VGIS serves clients in Nigeria, Canada, the United States and Saint Lucia. Briefs, reviews and delivery all work remotely.",
  },
  {
    q: "Is VGIS a registered company?",
    a: "Yes. Visual Graphics Illustration Services Limited is registered with Nigeria's Corporate Affairs Commission under RC 7371371.",
  },
];

/** All FAQs on the site, grouped. Used by /faq and llms.txt. */
export const allFaqGroups = [
  { title: "About VGIS", faqs: companyFaqs },
  ...services.map((s) => ({ title: s.name, faqs: s.faqs, href: serviceHref(s) })),
];

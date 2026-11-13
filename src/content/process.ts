/** Delivery workflows, verbatim in substance from the Company Profile ("The VGIS Process"). */

export type ProcessKey = "design" | "3d" | "xr" | "2d" | "campaign";

export type Process = {
  key: ProcessKey;
  name: string;
  summary: string;
  steps: { title: string; body: string }[];
};

export const processes: Record<ProcessKey, Process> = {
  design: {
    key: "design",
    name: "Concept to visualisation (full package)",
    summary: "From an idea to full plans in 2–4 days, then photorealistic 3D visualisation in 2–5 days.",
    steps: [
      { title: "Concept", body: "We develop the concept from your brief, site and budget." },
      { title: "Design", body: "We design the building: layouts, elevations and the look of the finished project." },
      { title: "Working drawings", body: "We produce full architectural, mechanical and electrical working drawings, typically in 2–4 days." },
      { title: "3D visualisation", body: "We turn the design into photorealistic renders, typically in 2–5 days." },
      { title: "Delivery", body: "You receive the complete package: drawings for construction and visuals to approve, present and market." },
    ],
  },
  "3d": {
    key: "3d",
    name: "Standard 3D visualisation",
    summary: "Five stages take a project from first conversation to final renders.",
    steps: [
      { title: "Discovery", body: "We study the core idea, the location, the environment and the project's parameters." },
      { title: "Blueprint & agreement", body: "We turn the idea into a visualisation plan, define the expected outcome and formalise the agreement." },
      { title: "Sketch preview", body: "We build the initial 3D model and draft the structural composition for your review." },
      { title: "Rendering & production", body: "We finalise composition, lighting and materials, then produce high-fidelity renders." },
      { title: "Delivery", body: "We hand over the final, polished visual assets." },
    ],
  },
  xr: {
    key: "xr",
    name: "3D experience in XR (Skyframe XR)",
    summary: "Five stages take an interactive AR or VR experience from plan review to deployment.",
    steps: [
      { title: "Discovery & plan review", body: "We analyse spatial requirements and interactivity goals, and review the structural plans." },
      { title: "Blueprint & agreement", body: "We set the technical architecture, the user-experience scope and the project terms." },
      { title: "Scene modelling & composition", body: "We build the immersive environment and optimise 3D assets for real-time engines." },
      { title: "Development & post-production", body: "We programme interactivity, apply visual polish and run quality assurance." },
      { title: "Delivery", body: "We deploy the final interactive XR experience." },
    ],
  },
  campaign: {
    key: "campaign",
    name: "Campaigns & motion",
    summary: "Five stages take an advert or film from brief to finished files and cut-downs.",
    steps: [
      { title: "Brief", body: "We agree the goal, audience, message, channels and formats the campaign must deliver." },
      { title: "Script & storyboard", body: "We write the script and storyboard the key frames, so you approve the story before production." },
      { title: "Production", body: "We produce the 3D scenes, animation, motion graphics and any AI-assisted elements under one art direction." },
      { title: "Edit", body: "We edit, grade and add sound, titles and your branding, with a review round on the cut." },
      { title: "Delivery & cut-downs", body: "We deliver the master film plus cut-downs and formats for social media, TV, screens and adverts." },
    ],
  },
  "2d": {
    key: "2d",
    name: "2D branding & identity",
    summary: "Six stages take a brand from discovery to a complete guideline and asset package.",
    steps: [
      { title: "Discovery questionnaire & interview", body: "We uncover your core brand values, target audience and market position." },
      { title: "Blueprint & agreement", body: "We set the creative direction and agree the scope of deliverables." },
      { title: "Foundation", body: "We develop the brand narrative and present initial visual concepts." },
      { title: "Further development", body: "We refine the chosen concept and finalise the brand narrative once you approve it." },
      { title: "Completion of assets", body: "We finalise all brand collateral, including logos, typography and colour systems." },
      { title: "Delivery", body: "We hand over the brand guidelines and the full asset package." },
    ],
  },
};

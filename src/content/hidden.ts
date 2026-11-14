/**
 * Projects hidden from the public site until the client approves (owner, 14 Nov 2026).
 *
 * A hidden project keeps all its content and data in the repo (manifest, images, case study, films),
 * but is left out of every list, page, link, sitemap entry and JSON-LD node, and its /work page 404s.
 * Its films go with it. To unhide, remove the slug here.
 */
export const HIDDEN_PROJECTS = new Set<string>(["down-town-castries"]);

export const isHidden = (slug: string) => HIDDEN_PROJECTS.has(slug);

/**
 * Owner (Precious, 14 Nov 2026): do not advertise 2D branding. While false, the brand identity
 * service and offer, the "3D + brand" launch offer, the brand-identity article, every brand board
 * and the 2D brand projects are left out of the site (their pages 404), and copy no longer
 * promotes branding. All data stays in the repo; set to true to bring it all back.
 */
export const SHOW_2D_BRANDING = false;
export const BRANDING_SERVICES = new Set(["brand-identity"]);
export const BRANDING_OFFERS = new Set(["brand-identity", "development-launch-package"]);
export const BRANDING_INSIGHTS = new Set(["your-development-needs-a-brand"]);

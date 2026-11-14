/**
 * Projects hidden from the public site until the client approves (owner, 14 Nov 2026).
 *
 * A hidden project keeps all its content and data in the repo (manifest, images, case study, films),
 * but is left out of every list, page, link, sitemap entry and JSON-LD node, and its /work page 404s.
 * Its films go with it. To unhide, remove the slug here.
 */
export const HIDDEN_PROJECTS = new Set<string>(["down-town-castries"]);

export const isHidden = (slug: string) => HIDDEN_PROJECTS.has(slug);

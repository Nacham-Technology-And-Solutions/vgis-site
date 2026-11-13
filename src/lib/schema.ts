import { SITE_URL, company, sameAs } from "@/content/site";
import { leadership } from "@/content/team";
import { services, type Faq, type Service } from "@/content/services";
import type { Project } from "@/content/projects";

/** Stable @id values let every page reference the same entities (entity consistency for search/AI). */
export const ids = {
  org: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  office: (id: string) => `${SITE_URL}/#office-${id}`,
  person: (id: string) => `${SITE_URL}/about#${id}`,
};

const postal = (o: (typeof company.offices)[number]) => ({
  "@type": "PostalAddress",
  streetAddress: o.streetAddress,
  addressLocality: o.addressLocality,
  addressRegion: o.addressRegion,
  addressCountry: o.addressCountry,
});

export function organizationSchema() {
  const [hq] = company.offices;
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: company.shortName,
    legalName: company.legalName,
    alternateName: ["Visual Graphics Illustration Services", "VG3DS", "Visual Graphics 3D Services", "3D VGIS"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/vgis-logo.png`, width: 490, height: 640 },
    image: `${SITE_URL}/opengraph-image`,
    description: company.definition,
    slogan: company.tagline,
    email: company.emails.primary,
    telephone: company.phones[0].e164,
    address: postal(hq),
    identifier: { "@type": "PropertyValue", propertyID: "CAC RC Number", value: company.rcNumber },
    areaServed: company.areaServed.map((name) => ({ "@type": "Country", name })),
    knowsAbout: [
      "3D architectural visualisation",
      "Photorealistic rendering",
      "3D product visualisation",
      "Cinematic walkthrough animation",
      "Virtual reality",
      "Augmented reality",
      "Brand identity design",
      "Graphic design",
      "Motion graphics",
    ],
    contactPoint: company.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      email: company.emails.primary,
      contactType: "sales",
      areaServed: ["NG", "CA", "US", "LC"],
      availableLanguage: ["English"],
    })),
    employee: leadership.map((p) => ({ "@id": ids.person(p.id) })),
    department: company.offices.map((o) => ({ "@id": ids.office(o.id) })),
    sameAs,
  };
}

/** Each office as a local business, for local search (e.g. "3D visualisation Abuja"). */
export function officeSchemas() {
  return company.offices.map((o) => ({
    "@type": "ProfessionalService",
    "@id": ids.office(o.id),
    name: `${company.shortName}®, ${o.name}`,
    parentOrganization: { "@id": ids.org },
    url: SITE_URL,
    image: `${SITE_URL}/brand/vgis-logo.png`,
    telephone: company.phones[0].e164,
    email: company.emails.primary,
    address: postal(o),
    priceRange: "₦₦₦",
  }));
}

export function personSchemas() {
  return leadership.map((p) => ({
    "@type": "Person",
    "@id": ids.person(p.id),
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    ...(p.photo ? { image: `${SITE_URL}${p.photo}` } : {}),
    worksFor: { "@id": ids.org },
  }));
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: SITE_URL,
    name: `${company.shortName}®`,
    alternateName: company.legalName,
    publisher: { "@id": ids.org },
    inLanguage: "en",
  };
}

export function serviceSchema(s: Service) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.answer,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": ids.org },
    areaServed: company.areaServed.map((name) => ({ "@type": "Country", name })),
    audience: s.forWho.map((a) => ({ "@type": "BusinessAudience", audienceType: a })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.name} deliverables`,
      itemListElement: s.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}

export function serviceListSchema() {
  return {
    "@type": "ItemList",
    name: "VGIS services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/services/${s.slug}`,
      name: s.name,
    })),
  };
}

export function projectSchema(p: Project) {
  return {
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${p.slug}#work`,
    name: p.name,
    description: p.summary,
    genre: p.category,
    ...(p.year ? { dateCreated: String(p.year) } : {}),
    url: `${SITE_URL}/work/${p.slug}`,
    creator: { "@id": ids.org },
    ...(p.images[0] ? { image: `${SITE_URL}${p.images[0].src}` } : {}),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function webPageSchema(opts: { path: string; name: string; description: string; type?: string }) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${SITE_URL}${opts.path}#webpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.org },
    inLanguage: "en",
  };
}

/** Wraps nodes into one @graph document. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

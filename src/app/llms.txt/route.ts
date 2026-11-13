import { SITE_URL, company, whatsapp } from "@/content/site";
import { services, disciplines } from "@/content/services";
import { projects } from "@/content/projects";
import { leadership } from "@/content/team";
import { companyFaqs } from "@/content/faqs";

export const dynamic = "force-static";

/** llms.txt (https://llmstxt.org): a plain-language map of the site for AI assistants and answer engines. */
export function GET() {
  const svc = (d: "3d" | "2d") =>
    services
      .filter((s) => s.discipline === d)
      .map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.answer}`)
      .join("\n");

  const body = `# ${company.shortName}® (${company.legalName})

> ${company.definition}

Tagline: "${company.tagline}" Formerly ${company.formerName}. CAC RC ${company.rcNumber}.
Head office: ${company.offices[0].streetAddress}, ${company.offices[0].addressLocality}, ${company.offices[0].countryName}. Second studio: ${company.offices[1].addressLocality}, ${company.offices[1].addressRegion}.
Hubs: ${company.hubs.join(", ")}. Clients in: ${company.areaServed.join(", ")}.
Serves: ${company.audiences.join(", ")}.
Contact: ${company.emails.primary} (also ${company.emails.secondary}), phone ${company.phones.map((p) => p.display).join(", ")}, WhatsApp ${whatsapp.display} (${whatsapp.url.split("?")[0]}).

## ${disciplines["3d"].name} (core)
${svc("3d")}

## ${disciplines["2d"].name} (support)
${svc("2d")}

## Signature projects
${projects.map((p) => `- [${p.name}${p.year ? ` (${p.year})` : ""}](${SITE_URL}/work/${p.slug}): ${p.category}. ${p.scope}`).join("\n")}

## Leadership
${leadership.map((p) => `- ${p.name}: ${p.role}. ${p.bio}`).join("\n")}

## Key facts (FAQ)
${companyFaqs.map((f) => `- **${f.q}** ${f.a}`).join("\n")}

## Pages
- [About](${SITE_URL}/about)
- [Process](${SITE_URL}/process)
- [FAQ](${SITE_URL}/faq)
- [Contact](${SITE_URL}/contact)

## Elsewhere
${Object.entries(company.social).map(([k, v]) => `- ${k}: ${v}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

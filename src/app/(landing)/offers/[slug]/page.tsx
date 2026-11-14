import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOffer, offers } from "@/content/offers";
import { getProject } from "@/content/projects";
import { getService, serviceHref } from "@/content/services";
import { processes } from "@/content/process";
import { company } from "@/content/site";
import { FaqList, ProjectCard, ProcessSteps } from "@/components/blocks";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { graph, ids, webPageSchema } from "@/lib/schema";
import { ogDefaults, twitterDefaults } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const o = getOffer((await params).slug);
  if (!o) return {};
  return {
    title: { absolute: o.meta.title },
    description: o.meta.description,
    alternates: { canonical: `/offers/${o.slug}` },
    // Ad landing pages overlap the service pages, so keep them out of organic search.
    // Ad platforms' crawlers (AdsBot, facebookexternalhit) still read them.
    robots: { index: false, follow: true },
    openGraph: { ...ogDefaults, title: o.meta.title, description: o.meta.description, url: `/offers/${o.slug}` },
    twitter: { ...twitterDefaults, title: o.meta.title, description: o.meta.description },
  };
}

const trust = [
  `Registered company · RC ${company.rcNumber}`,
  "Head office in Maitama, Abuja",
  `Clients in ${company.areaServed.join(", ")}`,
  "Renders and walkthroughs from one studio",
];

export default async function OfferPage({ params }: Props) {
  const o = getOffer((await params).slug);
  if (!o) notFound();
  const projects = o.projects.map(getProject).filter((p) => p !== undefined);
  const svcs = o.services.map(getService).filter((s) => s !== undefined);
  const primaryService = svcs[0]?.name ?? "";
  const process = processes[o.process];

  const WaButton = ({ label = "Chat on WhatsApp" }: { label?: string }) => (
    <WhatsAppLink className="btn border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851]">
      <WhatsAppIcon size={20} /> <span>{label}</span>
    </WhatsAppLink>
  );

  return (
    <>
      <JsonLd data={graph({ ...webPageSchema({ path: `/offers/${o.slug}`, name: o.meta.title, description: o.meta.description }), about: { "@id": ids.org } })} />

      {/* Hero with the quote form above the fold on desktop */}
      <section className="band plan-grid">
        <div className="wrap grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="lg:pt-6">
            <p className="eyebrow">{o.eyebrow}</p>
            <h1 className="mt-4 text-6xl sm:text-8xl">{o.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">{o.subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WaButton />
              <a href="#quote" className="btn btn-ghost lg:hidden"><span>{o.ctaLabel}</span></a>
            </div>
            <ul className="mt-10 grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div id="quote" className="scroll-mt-24 bg-paper p-6 text-ink sm:p-8">
            <h2 className="text-4xl">{o.ctaLabel}</h2>
            <p className="mt-2 text-sm text-muted">Tell us about the project. We reply by email or WhatsApp.</p>
            <div className="mt-6">
              <ContactForm offer={o.slug} defaultService={primaryService} submitLabel={`${o.ctaLabel} →`} />
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="wrap py-20">
        <p className="eyebrow">Why it matters</p>
        <div className="mt-6 grid border-l border-t border-line md:grid-cols-3">
          {o.why.map((w, i) => (
            <div key={w.title} className="border-b border-r border-line p-6">
              <span className="font-display text-4xl text-orange-ink">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-3xl">{w.title}</h2>
              <p className="mt-2 text-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Included */}
      <section className="border-t border-line">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">What you get</p>
            <h2 className="mt-3 text-5xl sm:text-6xl">{o.name}</h2>
            <p className="mt-4 text-muted">Scope and quote are confirmed with you in writing before production starts.</p>
            <div className="mt-8"><WaButton label="Ask a question on WhatsApp" /></div>
          </div>
          <ul className="h-fit divide-y divide-line border-y border-line">
            {o.includes.map((d) => (
              <li key={d} className="flex items-center gap-4 py-4 text-lg">
                <span className="h-2 w-2 shrink-0 bg-orange" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      {projects.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-20">
            <p className="eyebrow">Signature projects</p>
            <h2 className="mt-3 text-5xl">Work we have delivered</h2>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="border-t border-line">
        <div className="wrap py-20">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-5xl">{process.name}</h2>
          <p className="mt-3 max-w-2xl text-muted">{process.summary}</p>
          <div className="mt-10"><ProcessSteps process={process} /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="wrap py-20">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 text-5xl">Before you get in touch</h2>
          <div className="mt-10"><FaqList faqs={o.faqs} /></div>
          {svcs.length > 0 && (
            <p className="mt-8 text-sm text-muted">
              More detail:{" "}
              {svcs.map((s, i) => (
                <span key={s.slug}>
                  <Link href={serviceHref(s)} className="link-underline">{s.name}</Link>
                  {i < svcs.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="band">
        <div className="wrap grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">{o.audience}</p>
            <h2 className="mt-3 text-5xl sm:text-7xl">{o.headline}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <WaButton />
            <a href="#quote" className="btn btn-primary">{o.ctaLabel} →</a>
          </div>
        </div>
      </section>
    </>
  );
}

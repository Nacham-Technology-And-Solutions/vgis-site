import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, services, disciplines } from "@/content/services";
import { processes } from "@/content/process";
import { projectsForService } from "@/content/projects";
import { portfolio } from "@/content/portfolio";
import { insightsForService } from "@/content/insights";
import { PortfolioTile } from "@/components/portfolio";
import { company } from "@/content/site";
import { AnswerBox, CtaBand, FaqList, PageHero, ProcessSteps, ProjectCard, SectionHead, ServiceCard } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.filter((s) => !s.path).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const related = projectsForService(s.slug);
  const siblings = services.filter((x) => x.slug !== s.slug && x.discipline === s.discipline).slice(0, 3);
  const process = processes[s.process];
  // Related visual work; AI-assisted pieces only ever appear on the AI-assisted service.
  const reading = insightsForService(s.slug).slice(0, 3);
  const work = portfolio.filter((w) => w.service === s.slug && (!w.aiAssisted || s.slug === "ai-assisted-content")).slice(0, 3);

  return (
    <>
      <JsonLd data={graph(webPageSchema({ path, name: s.seoTitle, description: s.description }), serviceSchema(s), faqSchema(s.faqs))} />
      <PageHero
        eyebrow={`${disciplines[s.discipline].name} · ${disciplines[s.discipline].label}`}
        title={s.name}
        lede={s.description}
        crumbs={[{ name: "Services", path: "/services" }, { name: s.name, path }]}
      >
        <Link href="/contact" className="btn btn-primary">Request a quote →</Link>
      </PageHero>

      <section className="wrap py-20">
        <AnswerBox question={`What is ${s.name.toLowerCase()}?`}>{s.answer}</AnswerBox>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl">What you receive</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-4 py-3">
                  <span className="h-2 w-2 bg-orange" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-4xl">Who it is for</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {s.forWho.map((d) => (
                <li key={d} className="flex items-center gap-4 py-3">
                  <span className="h-2 w-2 bg-ink" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Delivered from Abuja and Bida for clients in {company.areaServed.slice(0, -1).join(", ")} and {company.areaServed.at(-1)}.
            </p>
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-20">
            <SectionHead eyebrow="Work" title="Examples" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((w) => <PortfolioTile key={w.id} item={w} />)}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line">
        <div className="wrap py-20">
          <SectionHead eyebrow="How it works" title={process.name} intro={process.summary} />
          <div className="mt-10"><ProcessSteps process={process} /></div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-20">
            <SectionHead eyebrow="Related work" title="Signature projects" />
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line">
        <div className="wrap py-20">
          <SectionHead eyebrow="Questions" title={`${s.name}: FAQ`} />
          <div className="mt-10"><FaqList faqs={s.faqs} /></div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-20">
            <SectionHead eyebrow="Insights" title="Further reading" />
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {reading.map((r) => (
                <li key={r.slug}>
                  <Link href={`/insights/${r.slug}`} className="group block h-full border border-line p-6 hover:border-ink">
                    <h3 className="text-2xl group-hover:link-underline">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted">{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-20">
            <SectionHead eyebrow="Also from VGIS" title="Related services" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((x, i) => <ServiceCard key={x.slug} s={x} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

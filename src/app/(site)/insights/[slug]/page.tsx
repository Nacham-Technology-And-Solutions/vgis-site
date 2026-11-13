import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInsight, insights } from "@/content/insights";
import { reason } from "@/content/knowledge/80-reasons";
import { portfolio } from "@/content/portfolio";
import { getService } from "@/content/services";
import { company, whatsapp } from "@/content/site";
import { Breadcrumbs } from "@/components/blocks";
import { SampleBadge } from "@/components/portfolio";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { graph, ids, webPageSchema } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getInsight((await params).slug);
  if (!p) return {};
  const m = pageMetadata({ title: p.title, description: p.description, path: `/insights/${p.slug}`, ogType: "article" });
  return { ...m, openGraph: { ...m.openGraph, type: "article", publishedTime: p.date } };
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightPage({ params }: Props) {
  const p = getInsight((await params).slug);
  if (!p) notFound();
  const path = `/insights/${p.slug}`;
  const svc = getService(p.service)!;
  const related = (p.related ?? []).map(getService).filter((s) => s !== undefined);
  const img = portfolio.find((w) => w.id === p.image);
  const more = insights.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(webPageSchema({ path, name: p.title, description: p.description }), {
          "@type": "Article",
          "@id": `${absoluteUrl(path)}#article`,
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.date,
          author: { "@id": ids.org },
          publisher: { "@id": ids.org },
          mainEntityOfPage: absoluteUrl(path),
          about: { "@id": `${absoluteUrl(`/services/${svc.slug}`)}#service` },
          ...(img ? { image: absoluteUrl(img.image.src) } : {}),
          inLanguage: "en",
        })}
      />

      <section className="band plan-grid">
        <div className="wrap max-w-4xl pb-14 pt-10">
          <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: p.title, path }]} />
          <p className="eyebrow mt-10">
            <Link href={`/services/${svc.slug}`} className="hover:text-paper">{svc.name}</Link>
          </p>
          <h1 className="mt-4 text-5xl sm:text-7xl">{p.title}</h1>
          <p className="mt-6 text-sm text-ink-muted">
            {company.shortName}® · {fmt(p.date)} · {p.readingMinutes} min read
          </p>
        </div>
      </section>

      <article className="wrap max-w-4xl py-14">
        {img && (
          <figure className="relative mb-12 aspect-[16/9] overflow-hidden bg-ink">
            <Image src={img.image.src} alt={img.image.alt} fill priority sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
            {img.placeholder && <SampleBadge className="absolute left-3 top-3" />}
          </figure>
        )}

        <p className="text-xl leading-relaxed">{p.intro}</p>

        {p.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="text-4xl sm:text-5xl">{s.heading}</h2>
            <div className="prose-vgis mt-4 text-lg text-muted">
              {s.body.map((b) => <p key={b.slice(0, 40)}>{b}</p>)}
            </div>
            {s.keyPoints && (
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {s.keyPoints.map((n) => {
                  const r = reason(n);
                  return (
                    <li key={n} className="flex gap-4 py-4">
                      <span className="mt-2 h-2 w-2 shrink-0 bg-orange" aria-hidden="true" />
                      <span>
                        <strong className="block font-semibold">{r.title}</strong>
                        <span className="text-muted">{r.body}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}

        {/* Service link + CTA */}
        <aside className="mt-16 border-l-4 border-orange bg-panel p-6 sm:p-8">
          <p className="eyebrow">Work with VGIS</p>
          <h2 className="mt-2 text-4xl">{svc.name}</h2>
          <p className="mt-3 text-muted">{svc.answer}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppLink offerSlug={`insight-${p.slug}`} message={`Hello VGIS, I read "${p.title}" and I'd like to discuss ${svc.name.toLowerCase()}.`} className="btn border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851]">
              <WhatsAppIcon size={20} /> <span>WhatsApp {whatsapp.display}</span>
            </WhatsAppLink>
            <Link href={`/services/${svc.slug}`} className="btn btn-ghost"><span>About this service</span></Link>
            <Link href="/contact" className="btn btn-primary">Send a brief →</Link>
          </div>
          {related.length > 0 && (
            <p className="mt-6 text-sm text-muted">
              Related:{" "}
              {related.map((r, i) => (
                <span key={r.slug}>
                  <Link href={`/services/${r.slug}`} className="link-underline">{r.name}</Link>
                  {i < related.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </aside>
      </article>

      <section className="border-t border-line">
        <div className="wrap py-16">
          <p className="eyebrow">More insights</p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/insights/${m.slug}`} className="group block border border-line p-6 hover:border-ink">
                  <h3 className="text-2xl group-hover:link-underline">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted">{m.readingMinutes} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

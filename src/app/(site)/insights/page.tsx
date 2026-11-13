import Image from "next/image";
import Link from "next/link";
import { insights } from "@/content/insights";
import { portfolio } from "@/content/portfolio";
import { getService } from "@/content/services";
import { CtaBand, PageHero } from "@/components/blocks";
import { SampleBadge } from "@/components/portfolio";
import { JsonLd } from "@/components/JsonLd";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

const description =
  "Insights from VGIS on 3D architectural visualisation, off-plan marketing, walkthroughs, Skyframe XR, product rendering, branding and campaigns.";

export const metadata = pageMetadata({ title: "Insights: Visualisation, Branding & Campaigns", description, path: "/insights" });

export default function InsightsIndex() {
  const posts = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <JsonLd
        data={graph(webPageSchema({ path: "/insights", name: "VGIS insights", description, type: "CollectionPage" }), {
          "@type": "ItemList",
          itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/insights/${p.slug}`), name: p.title })),
        })}
      />
      <PageHero
        eyebrow="Insights"
        title="See it, study it, then build it."
        lede="Practical thinking on visualisation, branding and campaigns for developers, architects, contractors and manufacturers."
        crumbs={[{ name: "Insights", path: "/insights" }]}
      />
      <section className="wrap py-16 sm:py-20">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const img = portfolio.find((w) => w.id === p.image);
            const svc = getService(p.service);
            return (
              <article key={p.slug} className="group">
                <Link href={`/insights/${p.slug}`} className="block">
                  {img && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                      <Image src={img.image.src} alt={img.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      {img.placeholder && <SampleBadge className="absolute left-3 top-3" />}
                    </div>
                  )}
                  <p className="eyebrow mt-5">{svc?.name}</p>
                  <h2 className="mt-2 text-3xl group-hover:link-underline">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                  <p className="mt-3 text-xs text-muted">{p.readingMinutes} min read</p>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

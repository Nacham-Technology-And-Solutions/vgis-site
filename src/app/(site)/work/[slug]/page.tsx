import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { CtaBand, PageHero, ProjectCard, ProjectVisual, SectionHead } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { graph, projectSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name}${p.year ? ` (${p.year})` : ""}: ${p.category}`,
    description: `${p.summary} A VGIS ${p.category.toLowerCase()} project.`.slice(0, 160),
    path: `/work/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const path = `/work/${p.slug}`;
  const svc = p.services.map(getService).filter((s) => s !== undefined);
  const more = projects.filter((x) => x.slug !== p.slug && x.discipline === p.discipline).slice(0, 3);

  return (
    <>
      <JsonLd data={graph(webPageSchema({ path, name: p.name, description: p.summary }), projectSchema(p))} />
      <PageHero
        eyebrow={`${p.category}${p.year ? ` · ${p.year}` : ""}`}
        title={p.name}
        lede={p.summary}
        crumbs={[{ name: "Work", path: "/work" }, { name: p.name, path }]}
      />

      <section className="wrap grid gap-12 py-20 lg:grid-cols-[2fr_1fr]">
        <div>
          <ProjectVisual p={p} priority sizes="(min-width: 1024px) 66vw, 100vw" />
          {p.images.slice(1).map((img) => (
            <div key={img.src} className="relative mt-6 aspect-[4/3] overflow-hidden bg-ink">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <dl className="h-fit divide-y divide-line border-y border-line text-sm">
          <div className="py-4"><dt className="eyebrow">Client project</dt><dd className="mt-1 text-base font-medium">{p.name}</dd></div>
          {p.year && <div className="py-4"><dt className="eyebrow">Year</dt><dd className="mt-1 text-base">{p.year}</dd></div>}
          <div className="py-4"><dt className="eyebrow">Service category</dt><dd className="mt-1 text-base">{p.category}</dd></div>
          <div className="py-4"><dt className="eyebrow">Scope of work</dt><dd className="mt-1 text-base">{p.scope}</dd></div>
          <div className="py-4">
            <dt className="eyebrow">Services</dt>
            <dd className="mt-1 space-y-1">
              {svc.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block text-base link-underline">{s.name}</Link>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {more.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-20">
            <SectionHead eyebrow="More work" title={`More ${p.category.toLowerCase()}`} />
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((x) => <ProjectCard key={x.slug} p={x} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { getService, serviceHref } from "@/content/services";
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
          {p.images.length === 0 ? (
            <ProjectVisual p={p} priority sizes="(min-width: 1024px) 66vw, 100vw" />
          ) : (
            <>
              {/* Lead image, native aspect ratio (logos and posters are never cropped) */}
              <figure className={p.discipline === "2d" ? "bg-panel" : "bg-ink"}>
                <Image src={p.images[0].src} alt={p.images[0].alt} width={p.images[0].width} height={p.images[0].height} priority sizes="(min-width: 1024px) 66vw, 100vw" className="h-auto w-full" />
              </figure>
              {p.images.length > 1 && (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {p.images.slice(1).map((img) => (
                    <figure key={img.src} className={p.discipline === "2d" ? "bg-panel" : "bg-ink"}>
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
                    </figure>
                  ))}
                </div>
              )}
            </>
          )}
          {(p.videos ?? []).map((v) => (
            <div key={v.mp4} className="mt-10">
              <p className="eyebrow">{v.title}</p>
              <div className="mx-auto mt-3 aspect-[9/16] w-full max-w-[360px] overflow-hidden bg-ink">
                <video src={v.mp4} poster={v.poster} controls playsInline preload="metadata" className="h-full w-full object-cover" />
              </div>
              {v.href && (
                <p className="mt-3 text-center text-sm">
                  <Link href={v.href} className="link-underline">See Skyframe XR by VGIS →</Link>
                </p>
              )}
            </div>
          ))}
          {(p.youtubeIds ?? []).map((id) => (
            <div key={id} className="mt-10">
              <p className="eyebrow">Walkthrough film</p>
              <div className="relative mt-3 aspect-video bg-ink">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
                  title={`${p.name}: walkthrough film`}
                  loading="lazy"
                  allow="fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
        <dl className="h-fit divide-y divide-line border-y border-line text-sm">
          <div className="py-4"><dt className="eyebrow">Project</dt><dd className="mt-1 text-base font-medium">{p.name}</dd></div>
          {p.year && <div className="py-4"><dt className="eyebrow">Year</dt><dd className="mt-1 text-base">{p.year}</dd></div>}
          {p.location && <div className="py-4"><dt className="eyebrow">Location</dt><dd className="mt-1 text-base">{p.location}</dd></div>}
          {p.client && (
            <div className="py-4">
              <dt className="eyebrow">Client</dt>
              <dd className="mt-1 text-base">
                {p.client.url ? <a href={p.client.url} target="_blank" rel="noopener noreferrer" className="link-underline">{p.client.name}</a> : p.client.name}
              </dd>
            </div>
          )}
          {p.credit && p.credit !== p.client?.name && (
            <div className="py-4"><dt className="eyebrow">In collaboration with</dt><dd className="mt-1 text-base">{p.credit}</dd></div>
          )}
          {p.aka && <div className="py-4"><dt className="eyebrow">Also known as</dt><dd className="mt-1 text-base">{p.aka.join(", ")}</dd></div>}
          <div className="py-4"><dt className="eyebrow">Service category</dt><dd className="mt-1 text-base">{p.category}</dd></div>
          <div className="py-4"><dt className="eyebrow">Scope of work</dt><dd className="mt-1 text-base">{p.scope}</dd></div>
          <div className="py-4">
            <dt className="eyebrow">Services</dt>
            <dd className="mt-1 space-y-1">
              {svc.map((s) => (
                <Link key={s.slug} href={serviceHref(s)} className="block text-base link-underline">{s.name}</Link>
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

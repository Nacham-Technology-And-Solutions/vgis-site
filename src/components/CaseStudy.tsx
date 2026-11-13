import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { caseStudies } from "@/content/case-studies";
import { getProject, type Project } from "@/content/projects";
import { getService, serviceHref } from "@/content/services";
import { CtaBand, PageHero, ProjectVisual, SectionHead } from "./blocks";

type Img = Project["images"][number];

/** Resolve a manifest file name to one of the project's images. Fails the build if it is missing or ambiguous. */
function pick(p: Project, file: string): Img {
  const hits = p.images.filter((i) => i.src.endsWith(`/${file}`));
  if (hits.length !== 1) throw new Error(`Case study "${p.slug}": image "${file}" matched ${hits.length} files`);
  return hits[0];
}

function Shot({ img, sizes, priority }: { img: Img; sizes: string; priority?: boolean }) {
  return (
    <figure className="bg-ink">
      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} priority={priority} className="h-auto w-full" />
    </figure>
  );
}

function Shots({ imgs }: { imgs: Img[] }) {
  if (imgs.length === 1) return <Shot img={imgs[0]} sizes="(min-width: 1200px) 1136px, 100vw" />;
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${imgs.length >= 3 ? "lg:grid-cols-3" : ""}`}>
      {imgs.map((i) => <Shot key={i.src} img={i} sizes="(min-width: 1024px) 50vw, 100vw" />)}
    </div>
  );
}

export function CaseStudyView({ p, cs }: { p: Project; cs: CaseStudy }) {
  const lead = p.images[0];
  const processImgs = (cs.process ?? []).map((s) => ({ ...s, imgs: s.images.map((f) => pick(p, f)) }));
  const parts = (cs.parts ?? []).map((part) => ({ ...part, imgs: part.images.map((f) => pick(p, f)) }));
  const shown = new Set([lead?.src, ...processImgs.flatMap((s) => s.imgs.map((i) => i.src)), ...parts.flatMap((x) => x.imgs.map((i) => i.src))]);
  const gallery = p.images.filter((i) => !shown.has(i.src));
  const films = p.youtubeIds ?? [];
  const videos = p.videos ?? [];
  const svc = p.services.map(getService).filter((s) => s !== undefined);

  const i = caseStudies.findIndex((c) => c.slug === cs.slug);
  const nextCs = caseStudies[(i + 1) % caseStudies.length];
  const next = getProject(nextCs.slug);

  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  const facts: [string, ReactNode][] = [];
  if (p.client)
    facts.push([
      "Client",
      <>
        {p.client.url ? <a href={p.client.url} target="_blank" rel="noopener noreferrer" className="link-underline">{p.client.name}</a> : p.client.name}
        {p.client.contact && <span className="block text-sm text-ink-muted">Contact: {p.client.contact}</span>}
      </>,
    ]);
  if (p.location) facts.push(["Location", p.location]);
  if (p.year) facts.push(["Year", p.year]);
  if (p.credit && p.credit !== p.client?.name) facts.push(["In collaboration with", p.credit]);
  if (p.aka) facts.push(["Also known as", p.aka.join(", ")]);

  return (
    <>
      <PageHero
        eyebrow={`Case study · ${p.category}`}
        title={p.name}
        lede={cs.headline}
        crumbs={[{ name: "Work", path: "/work" }, { name: p.name, path: `/work/${p.slug}` }]}
      >
        {facts.length > 0 && (
          <dl className="grid w-full gap-x-10 gap-y-5 border-t border-ink-line pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1 text-base text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </PageHero>

      {lead ? (
        <section className="wrap pt-10"><Shot img={lead} priority sizes="(min-width: 1200px) 1136px, 100vw" /></section>
      ) : (
        <section className="wrap pt-10"><ProjectVisual p={p} priority /></section>
      )}

      <section className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[3fr_2fr]">
        <div>
          <SectionHead num={num()} eyebrow="The brief" title="What we were asked to show" />
          <p className="mt-6 max-w-2xl text-lg">{cs.brief}</p>
        </div>
        <div>
          <SectionHead num={num()} eyebrow="VGIS scope" title="What we did" />
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {cs.scope.map((s, k) => (
              <li key={s} className="flex items-baseline gap-4 py-3">
                <span className="font-display text-xl text-orange-ink">{String(k + 1).padStart(2, "0")}</span>
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ol>
          {svc.length > 0 && (
            <p className="mt-4 text-sm text-muted">
              Services:{" "}
              {svc.map((s, k) => (
                <span key={s.slug}>
                  <Link href={serviceHref(s)} className="link-underline">{s.name}</Link>
                  {k < svc.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      {processImgs.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-16 sm:py-20">
            <SectionHead num={num()} eyebrow="Process" title="How the project came together" />
            <ol className="mt-12 space-y-16">
              {processImgs.map((s, k) => (
                <li key={s.title} className="grid gap-6 lg:grid-cols-[1fr_3fr]">
                  <div>
                    <span className="font-display text-4xl text-orange-ink">{String(k + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-3xl">{s.title}</h3>
                    <p className="mt-3 text-muted">{s.body}</p>
                  </div>
                  <Shots imgs={s.imgs} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {parts.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-16 sm:py-20">
            <SectionHead num={num()} eyebrow="The developments" title="Project by project" />
            <div className="mt-12 space-y-16">
              {parts.map((part) => (
                <div key={part.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="text-4xl">{part.name}</h3>
                    {part.slug && <Link href={`/work/${part.slug}`} className="text-sm font-semibold link-underline">See all {part.name} views →</Link>}
                  </div>
                  <p className="mt-3 max-w-2xl text-muted">{part.body}</p>
                  <div className="mt-6"><Shots imgs={part.imgs} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="band">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
          <SectionHead num={num()} eyebrow="Outcome" title="What was delivered" />
          <ul className="divide-y divide-ink-line border-y border-ink-line">
            {cs.deliverables.map((d) => (
              <li key={d} className="py-4 text-lg">{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {(films.length > 0 || videos.length > 0) && (
        <section className="wrap py-16 sm:py-20">
          <SectionHead num={num()} eyebrow="Video" title={films.length + videos.length > 1 ? "Watch the project" : "Watch the film"} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[2fr_1fr]">
            {films.length > 0 && (
              <div className="space-y-8">
                {films.map((id) => (
                  <div key={id} className="relative aspect-video bg-ink">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
                      title={`${p.name}: walkthrough film`}
                      loading="lazy"
                      allow="fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                ))}
              </div>
            )}
            {videos.map((v) => (
              <div key={v.mp4}>
                <p className="eyebrow">{v.title}</p>
                <div className="mt-3 aspect-[9/16] w-full max-w-[360px] overflow-hidden bg-ink">
                  <video src={v.mp4} poster={v.poster} controls playsInline preload="metadata" className="h-full w-full object-cover" />
                </div>
                {v.href && (
                  <p className="mt-3 text-sm">
                    <Link href={v.href} className="link-underline">See Skyframe XR by VGIS →</Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-16 sm:py-20">
            <SectionHead num={num()} eyebrow="Gallery" title="More views" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {gallery.map((img) => <Shot key={img.src} img={img} sizes="(min-width: 640px) 50vw, 100vw" />)}
            </div>
          </div>
        </section>
      )}

      {next && next.slug !== p.slug && (
        <section className="border-t border-line">
          <Link href={`/work/${next.slug}`} className="group wrap grid items-center gap-8 py-16 sm:py-20 md:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">Next case study</p>
              <h2 className="mt-3 text-5xl sm:text-6xl group-hover:link-underline">{next.name}</h2>
              <p className="mt-3 text-muted">{nextCs.headline}</p>
            </div>
            <ProjectVisual p={next} />
          </Link>
        </section>
      )}
      <CtaBand />
    </>
  );
}

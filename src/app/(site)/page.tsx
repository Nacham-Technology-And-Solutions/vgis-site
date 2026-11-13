import Link from "next/link";
import { company } from "@/content/site";
import { disciplineOrder, disciplines, servicesBy } from "@/content/services";
import { projects } from "@/content/projects";
import { companyFaqs } from "@/content/faqs";
import { beforeAfter, featuredWork } from "@/content/portfolio";
import { AnswerBox, CtaBand, FaqList, ProjectCard, SectionHead } from "@/components/blocks";
import { BeforeAfterSlider, FeaturedGrid } from "@/components/portfolio";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, graph, serviceListSchema, webPageSchema } from "@/lib/schema";

const homeFaqs = companyFaqs.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: "VGIS® | 3D Architectural Visualisation & Branding Studio", description: company.definition }),
          serviceListSchema(),
          faqSchema(homeFaqs),
        )}
      />

      <Hero />

      {/* Who we serve */}
      <section className="border-b border-line">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-sm">
          <span className="eyebrow">Built for</span>
          {company.audiences.map((a) => <span key={a} className="font-medium">{a}</span>)}
        </div>
      </section>

      {/* Work first: show, then tell */}
      <section className="wrap py-16 sm:py-24">
        <SectionHead num="01" eyebrow="Selected work" title="See it before it's built" intro="Architecture, interiors, products, XR, campaigns and brand systems." />
        <div className="mt-10"><FeaturedGrid items={featuredWork()} /></div>
      </section>

      {/* Drawing → model → render */}
      <section className="band">
        <div className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="eyebrow">From drawing to reality</p>
            <h2 className="mt-3 text-5xl sm:text-7xl">Slide from plans to a photorealistic render.</h2>
            <p className="mt-4 max-w-md text-ink-muted">
              Every project moves from your drawings to a 3D model you review, then to final lighting, materials and rendering.
            </p>
            <Link href="/process" className="mt-6 hidden font-semibold link-underline sm:inline-block">How we work →</Link>
          </div>
          <BeforeAfterSlider {...beforeAfter} />
        </div>
      </section>

      {/* Services, compact: three groups */}
      <section className="wrap py-16 sm:py-24">
        <SectionHead num="02" eyebrow="Services" title="One studio, from model to market" intro="3D visualisation at the core, supported by branding and campaigns." />
        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          {disciplineOrder.map((d, i) => (
            <div key={d} className="bg-paper p-6 sm:p-8">
              <span className="font-display text-4xl text-orange-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-4xl">{disciplines[d].name}</h3>
              <p className="mt-2 text-sm text-muted">{disciplines[d].intro}</p>
              <ul className="mt-6 space-y-2">
                {servicesBy(d).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="font-medium hover:link-underline">{s.name} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Answer-first definition (AEO) */}
      <section className="wrap pb-16 sm:pb-24">
        <AnswerBox question="What is VGIS?">{company.definition}</AnswerBox>
      </section>

      {/* Signature projects: desktop only to keep mobile short (full list on /work) */}
      <section className="hidden border-t border-line sm:block">
        <div className="wrap py-24">
          <SectionHead num="03" eyebrow="Signature projects" title="Hallmark projects" />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
          <Link href="/work#signature" className="mt-12 inline-block font-semibold link-underline">All signature projects →</Link>
        </div>
      </section>

      {/* FAQ: 3 on mobile, 6 on desktop */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-24">
          <SectionHead num="04" eyebrow="Questions" title="Frequently asked" />
          <div className="mt-10 md:ml-[120px]">
            <FaqList faqs={homeFaqs} mobileLimit={3} />
            <Link href="/faq" className="mt-8 inline-block font-semibold link-underline">All questions →</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

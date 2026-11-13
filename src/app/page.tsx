import Link from "next/link";
import { company } from "@/content/site";
import { disciplines, servicesBy } from "@/content/services";
import { projects } from "@/content/projects";
import { companyFaqs } from "@/content/faqs";
import { AnswerBox, CtaBand, FaqList, ProjectCard, SectionHead, ServiceCard } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { faqSchema, graph, serviceListSchema, webPageSchema } from "@/lib/schema";

const homeFaqs = companyFaqs.slice(0, 6);

export default function HomePage() {
  const featured = projects.slice(0, 6);
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: "VGIS® | 3D Architectural Visualisation & Branding Studio", description: company.definition }),
          serviceListSchema(),
          faqSchema(homeFaqs),
        )}
      />

      {/* Hero */}
      <section className="band plan-grid">
        <div className="wrap grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">3D visualisation · XR · Branding · Abuja, Nigeria</p>
            <h1 className="mt-5 text-[64px] sm:text-[104px] lg:text-[128px]">
              Bridging the gap between <span className="text-orange">imagination</span> and reality.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              VGIS creates photorealistic 3D renders, cinematic walkthroughs and interactive AR/VR for buildings,
              products and civil projects, then builds the brand and marketing that sell them.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">Start a project →</Link>
              <Link href="/work" className="btn btn-ghost"><span>See signature projects</span></Link>
            </div>
          </div>
          <div className="hidden bg-white p-8 lg:block">
            <Logo height={300} priority />
          </div>
        </div>
      </section>

      {/* Who we serve strip */}
      <section className="border-b border-line">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-sm">
          <span className="eyebrow">Built for</span>
          {company.audiences.map((a) => <span key={a} className="font-medium">{a}</span>)}
        </div>
      </section>

      {/* Answer-first definition (AEO) */}
      <section className="wrap py-20">
        <AnswerBox question="What is VGIS?">{company.definition}</AnswerBox>
      </section>

      {/* Services, grouped by discipline */}
      {(["3d", "2d"] as const).map((d, di) => (
        <section key={d} className={di === 0 ? "wrap pb-20" : "wrap pb-24"}>
          <SectionHead
            num={di === 0 ? "01" : "02"}
            eyebrow={`${disciplines[d].label} · ${d.toUpperCase()}`}
            title={disciplines[d].name}
            intro={disciplines[d].intro}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesBy(d).map((s, i) => <ServiceCard key={s.slug} s={s} index={i} />)}
          </div>
        </section>
      ))}

      {/* Unified ecosystem */}
      <section className="band">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">One visual ecosystem</p>
            <h2 className="mt-3 text-5xl sm:text-7xl">From viewing the model to marketing it.</h2>
          </div>
          <div className="space-y-4 text-ink-muted">
            <p>
              Most projects need two studios: one to visualise the building or product, and another to brand and market it.
              VGIS does both, with one art direction and one team.
            </p>
            <p>
              Our 3D core delivers photorealistic stills, walkthrough films and Skyframe XR experiences. Our 2D studio packages
              them into brand identities, brochures, adverts and motion graphics, so every asset reads as one system.
            </p>
            <p className="text-paper">
              Our standard is <strong>{company.philosophy}</strong>: photorealistic lighting, accurate materials, strict composition
              and a sense of real scale.
            </p>
          </div>
        </div>
      </section>

      {/* Signature projects */}
      <section className="wrap py-24">
        <SectionHead num="03" eyebrow="Signature projects" title="Selected work" intro="Hallmark projects across 3D visualisation and 2D branding." />
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
        <Link href="/work" className="mt-12 inline-block font-semibold link-underline">All signature projects →</Link>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="wrap py-24">
          <SectionHead num="04" eyebrow="Questions" title="Frequently asked" />
          <div className="mt-10 md:ml-[120px]">
            <FaqList faqs={homeFaqs} />
            <Link href="/faq" className="mt-8 inline-block font-semibold link-underline">All questions →</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

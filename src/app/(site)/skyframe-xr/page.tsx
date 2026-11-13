import Image from "next/image";
import Link from "next/link";
import { getService, serviceHref } from "@/content/services";
import { processes } from "@/content/process";
import { getProject } from "@/content/projects";
import { portfolioFor } from "@/content/portfolio";
import { insightsForService } from "@/content/insights";
import { reason } from "@/content/knowledge/80-reasons";
import { AnswerBox, Breadcrumbs, CtaBand, FaqList, ProcessSteps, ProjectCard, SectionHead } from "@/components/blocks";
import { PortfolioTile, SampleBadge } from "@/components/portfolio";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Skyframe XR product area. PROVISIONAL: the owner will supply Skyframe XR specifics; until then
 * every claim must trace to the company profile or the 80-reasons knowledge base. No invented
 * features, pricing or clients. Owner decision (13 Nov 2026): Skyframe XR lives on the main site,
 * not on a subdomain. Copy draws on the service record and the 80-reasons knowledge base.
 */
const s = getService("skyframe-xr")!;
const path = serviceHref(s);
const description =
  "Skyframe XR by VGIS: interactive VR and AR walkthroughs that let buyers, investors and clients explore a development before it is built.";

export const metadata = pageMetadata({ title: "Skyframe XR: Interactive VR & AR Walkthroughs", description, path });

const experiences = [
  { title: "Interactive VR walkthroughs", body: "Walk through the finished building in virtual reality, at your own pace." },
  { title: "Augmented reality", body: "Place the proposed building or interior into the real world, so it can be judged in its real context." },
  { title: "Real-time 3D environments", body: "Explore freely on a screen, with no fixed camera path, and look closely at what matters to you." },
  { title: "Sales-suite walkthroughs", body: "Game-engine walkthroughs built for sales offices, showrooms and launch events." },
];

const uses = [
  { title: "Sales suites without a show home", reason: 71 },
  { title: "Buyers and investors abroad", reason: 79 },
  { title: "Design reviews with clients", reason: 50 },
  { title: "Walkthroughs of what does not exist yet", reason: 70 },
];

const extraFaqs = [
  {
    q: "Do viewers need special equipment?",
    a: "It depends on the experience. VR walkthroughs use a headset; other formats can be delivered for screens and mobile devices. We agree the delivery format with you in the Blueprint & agreement stage.",
  },
  {
    q: "Can Skyframe XR be combined with renders and a walkthrough film?",
    a: "Yes. The same 3D model can produce photorealistic renders, a cinematic walkthrough film and the interactive Skyframe XR experience, under one art direction.",
  },
];

export default function SkyframePage() {
  const process = processes[s.process];
  const cedarwood = getProject("cedarwood-city-estate");
  const work = portfolioFor("xr");
  const reading = insightsForService(s.slug).slice(0, 3);
  const faqs = [...s.faqs, ...extraFaqs];

  const Wa = ({ label = "Book a Skyframe XR consultation" }: { label?: string }) => (
    <WhatsAppLink
      offerSlug="skyframe-xr"
      message="Hello VGIS, I'd like to book a Skyframe XR consultation (VR/AR walkthrough)."
      className="btn border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851]"
    >
      <WhatsAppIcon size={20} /> <span>{label}</span>
    </WhatsAppLink>
  );

  return (
    <>
      <JsonLd data={graph(webPageSchema({ path, name: "Skyframe XR by VGIS", description }), { ...serviceSchema(s), brand: { "@type": "Brand", name: "Skyframe XR" } }, faqSchema(faqs))} />

      {/* Product hero */}
      <section className="band plan-grid relative overflow-hidden">
        <div className="wrap grid gap-12 pb-16 pt-10 sm:pb-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Breadcrumbs items={[{ name: "Skyframe XR", path }]} />
            <p className="mt-10 font-display text-3xl tracking-wide">
              SKYFRAME <span className="text-orange">XR</span> <span className="text-base text-ink-muted">by VGIS®</span>
            </p>
            <h1 className="mt-4 text-6xl sm:text-8xl">Walk through it before it&apos;s built.</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">
              Interactive virtual and augmented reality that turns your plans into a place people can explore freely, before
              construction begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Wa />
              <Link href="/contact" className="btn btn-ghost"><span>Send your plans</span></Link>
            </div>
          </div>
          {work[0] && (
            <div className="relative aspect-square overflow-hidden bg-paper">
              <Image src={work[0].image.src} alt={work[0].image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              {work[0].placeholder && <SampleBadge className="absolute left-3 top-3" />}
            </div>
          )}
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <AnswerBox question="What is Skyframe XR?">{s.answer}</AnswerBox>
      </section>

      {/* Experiences */}
      <section className="wrap pb-16 sm:pb-20">
        <SectionHead num="01" eyebrow="Experiences" title="Four ways to step inside" />
        <div className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e) => (
            <div key={e.title} className="border-b border-r border-line p-6">
              <h3 className="text-3xl">{e.title}</h3>
              <p className="mt-2 text-sm text-muted">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases, from the knowledge base */}
      <section className="band">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Where it works</p>
          <h2 className="mt-3 text-5xl sm:text-6xl">Built for the moments that sell a project</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {uses.map((u) => {
              const r = reason(u.reason);
              return (
                <div key={u.title}>
                  <h3 className="text-3xl">{u.title}</h3>
                  <p className="mt-2 text-ink-muted">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof */}
      {cedarwood && (
        <section className="wrap py-16 sm:py-20">
          <SectionHead num="02" eyebrow="Delivered" title="Interactive work we have built" intro="Cedarwood City Estate included an interactive game walkthrough of the estate." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard p={cedarwood} />
            {work.slice(1, 3).map((w) => <PortfolioTile key={w.id} item={w} />)}
          </div>
        </section>
      )}

      {/* Process */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-20">
          <SectionHead num="03" eyebrow="How it works" title={process.name} intro={process.summary} />
          <div className="mt-10"><ProcessSteps process={process} /></div>
          <div className="mt-10"><Wa label="Talk to us on WhatsApp" /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-20">
          <SectionHead num="04" eyebrow="Questions" title="Skyframe XR: FAQ" />
          <div className="mt-10"><FaqList faqs={faqs} /></div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-16">
            <p className="eyebrow">Insights</p>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
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

      <CtaBand title="See your development in XR before it is built." />
    </>
  );
}

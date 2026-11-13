import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getService, serviceHref } from "@/content/services";
import { getProject } from "@/content/projects";
import { portfolioFor } from "@/content/portfolio";
import { insightsForService } from "@/content/insights";
import { skyframe as x } from "@/content/skyframe";
import { AnswerBox, Breadcrumbs, FaqList, ProjectCard } from "@/components/blocks";
import { SampleBadge } from "@/components/portfolio";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Skyframe XR product area, in the Skyframe XR brand (docs/skyframe-brand/): Paper ground, Charcoal bands,
 * Frame Orange fills, Montserrat 800 display. Credited "Skyframe XR by VGIS" (owner: VGIS is the sole owner).
 * Copy comes only from src/content/skyframe.ts.
 */
const montserrat = Montserrat({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

const s = getService("skyframe-xr")!;
const path = serviceHref(s);
const description =
  "Skyframe XR by VGIS: on-site AR/VR and 1:1 virtual walkthroughs that let buyers experience a property before a single block is laid.";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Skyframe XR: Walk Through Tomorrow, Today", description, path }),
  // Brand rule: the badge is the app icon / favicon.
  icons: { icon: "/skyframe/brand/skyframe-xr-badge.png", apple: "/skyframe/brand/skyframe-xr-badge.png" },
};

const LOGO_WHITE = { src: "/skyframe/brand/skyframe-xr-horizontal-white.png", width: 802, height: 172 };
const LOGO_BLACK = { src: "/skyframe/brand/skyframe-xr-horizontal-black.png", width: 802, height: 172 };

function Wa({ label = "Book a demo on WhatsApp" }: { label?: string }) {
  return (
    <WhatsAppLink offerSlug="skyframe-xr" message="Hello, I'd like to book a Skyframe XR demo for my project." className="btn btn-primary">
      <WhatsAppIcon size={20} /> <span>{label}</span>
    </WhatsAppLink>
  );
}

export default function SkyframePage() {
  const cedarwood = getProject("cedarwood-city-estate");
  const sample = portfolioFor("xr").find((p) => p.placeholder);
  const reading = insightsForService(s.slug).slice(0, 3);
  const video = x.media.video;

  return (
    <div className={`${montserrat.variable} theme-skyframe`}>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: "Skyframe XR by VGIS", description }),
          { ...serviceSchema(s), brand: { "@type": "Brand", name: x.name, slogan: x.tagline, logo: `https://3dvgis.com${LOGO_BLACK.src}` } },
          faqSchema(x.faqs),
        )}
      />

      {/* Hero: Charcoal band, white horizontal logo, master tagline with the page's one orange highlight bar */}
      <section className="band relative overflow-hidden">
        <div className="sky-halftone pointer-events-none absolute inset-y-0 right-0 w-2/3" aria-hidden="true" />
        <div className="wrap relative grid gap-12 pb-16 pt-10 sm:pb-24 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <Breadcrumbs items={[{ name: "Skyframe XR", path }]} />
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Image src={LOGO_WHITE.src} alt="Skyframe XR" width={LOGO_WHITE.width} height={LOGO_WHITE.height} priority className="h-12 w-auto sm:h-14" />
              <span className="border-l border-white/30 pl-5 text-sm font-semibold text-ink-muted">{x.byline}</span>
            </div>
            <h1 className="mt-10">
              Walk Through <span className="sky-highlight">Tomorrow</span>, Today.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">{x.hooks.imagine}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Wa />
              <Link href="/contact" className="btn btn-ghost"><span>Send your plans</span></Link>
            </div>
          </div>
          <div className={`relative overflow-hidden rounded-2xl bg-ink ${video?.mp4 ? "mx-auto aspect-[9/16] w-full max-w-[340px]" : "aspect-square"}`}>
            {video?.mp4 ? (
              <video src={video.mp4} poster={video.poster} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
            ) : x.media.mark ? (
              <div className="absolute inset-0 bg-paper">
                <Image src="/skyframe/brand/skyframe-xr-stacked.png" alt="Skyframe XR logo" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain p-10" />
              </div>
            ) : (
              sample && (
                <>
                  <Image src={sample.image.src} alt={sample.image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                  <SampleBadge className="absolute left-3 top-3" />
                </>
              )
            )}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <AnswerBox question="What is Skyframe XR?">{x.definition}</AnswerBox>
        <p className="mt-10 max-w-4xl font-display text-2xl font-extrabold leading-snug sm:text-3xl">&ldquo;{x.hooks.confidence}&rdquo;</p>
      </section>

      {/* The problem: Charcoal feature bar with numbered orange step markers */}
      <section className="band">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-3 max-w-3xl">Why off-plan selling needs more than blueprints</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {x.problems.map((p, i) => (
              <div key={p.title}>
                <span className="sky-step">{i + 1}</span>
                <h3 className="mt-4">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features: outlined cards with orange pill labels */}
      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow">Powered by precision</p>
        <h2 className="mt-3 max-w-3xl">Nothing left to the imagination</h2>
        <p className="mt-4 max-w-2xl text-muted">{x.hooks.precision}</p>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {x.features.map((f) => (
            <div key={f.title} className="sky-card relative p-6 pt-8">
              {f.v2 && <span className="sky-pill absolute -top-3 left-6">Skyframe XR 2.0</span>}
              <h3>{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works: the two delivery models, kept separate. Concrete ground. */}
      <section className="border-t border-line" style={{ background: "#EDEBE8" }}>
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3">Two ways to experience Skyframe XR</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="sky-card p-6 sm:p-8">
              <span className="sky-pill" style={{ background: "#292929", color: "#FFFBF7" }}>On site</span>
              <h3 className="mt-4" style={{ fontSize: 24 }}>{x.models.onSite.title}</h3>
              <p className="mt-3 text-muted">{x.models.onSite.intro}</p>
              <p className="mt-3 text-sm text-muted">{x.models.onSite.setup}</p>
              <ol className="mt-6 space-y-3">
                {x.models.onSite.steps.map((st, i) => (
                  <li key={st} className="flex items-start gap-3">
                    <span className="sky-step shrink-0 text-sm" style={{ height: 28, width: 28 }}>{i + 1}</span>
                    <span className="pt-0.5">{st}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="band rounded-2xl p-6 sm:p-8">
              <span className="sky-pill">Skyframe XR 2.0</span>
              <h3 className="mt-4" style={{ fontSize: 24 }}>{x.models.v2.title}</h3>
              <p className="mt-3 text-ink-muted">{x.models.v2.intro}</p>
              <ol className="mt-6 space-y-6">
                {x.models.v2.steps.map((st, i) => (
                  <li key={st.title} className="flex items-start gap-4">
                    <span className="sky-step shrink-0">{i + 1}</span>
                    <span>
                      <h4>{st.title}</h4>
                      <span className="text-ink-muted">{st.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-ink-muted">{x.models.v2.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="wrap grid gap-10 py-16 sm:py-20 md:grid-cols-2">
        <div>
          <p className="eyebrow">For</p>
          <h2 className="mt-3">Developers & firms</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {x.audiences.platform.map((a) => <li key={a} className="py-3">{a}</li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">And their clients</p>
          <h2 className="mt-3">Buyers who need to see it</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {x.audiences.clients.map((a) => <li key={a} className="py-3">{a}</li>)}
          </ul>
        </div>
      </section>

      {/* Related VGIS work */}
      {cedarwood && (
        <section className="border-t border-line">
          <div className="wrap py-16 sm:py-20">
            <p className="eyebrow">From the VGIS studio</p>
            <h2 className="mt-3">Interactive walkthroughs</h2>
            <p className="mt-3 max-w-2xl text-muted">Cedarwood City Estate included an interactive game walkthrough of the estate.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard p={cedarwood} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3">Skyframe XR: FAQ</h2>
          <div className="mt-10"><FaqList faqs={x.faqs} /></div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="border-t border-line">
          <div className="wrap py-16">
            <p className="eyebrow">Insights</p>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {reading.map((r) => (
                <li key={r.slug}>
                  <Link href={`/insights/${r.slug}`} className="sky-card group block h-full p-6">
                    <h3 className="group-hover:link-underline">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted">{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Closing Charcoal band: white logo, tagline, credit line, CTA */}
      <section className="band">
        <div className="wrap grid gap-8 py-16 sm:py-20 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Image src={LOGO_WHITE.src} alt="Skyframe XR" width={LOGO_WHITE.width} height={LOGO_WHITE.height} className="h-10 w-auto" />
            <h2 className="mt-6">{x.tagline}</h2>
            <p className="mt-3 text-ink-muted">{x.ownership}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Wa />
            <Link href="/contact" className="btn btn-ghost"><span>Send your plans</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

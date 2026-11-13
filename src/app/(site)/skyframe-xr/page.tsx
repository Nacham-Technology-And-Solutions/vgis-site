import Image from "next/image";
import Link from "next/link";
import { getService, serviceHref } from "@/content/services";
import { getProject } from "@/content/projects";
import { portfolioFor } from "@/content/portfolio";
import { insightsForService } from "@/content/insights";
import { skyframe as x } from "@/content/skyframe";
import { AnswerBox, Breadcrumbs, CtaBand, FaqList, ProjectCard, SectionHead } from "@/components/blocks";
import { SampleBadge } from "@/components/portfolio";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, graph, ids, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Skyframe XR product area (owner: product section on the main site, not a subdomain).
 * All copy comes from src/content/skyframe.ts, which is limited to the owner-approved brief.
 */
const s = getService("skyframe-xr")!;
const path = serviceHref(s);
const description =
  "Skyframe XR, a partnership between Arkfield Realty & VGIS: on-site AR/VR and 1:1 virtual walkthroughs that let buyers experience a property before a single block is laid.";

export const metadata = pageMetadata({ title: "Skyframe XR: Walk Through Tomorrow, Today", description, path });

function Wa({ label = "Book a Skyframe XR demo on WhatsApp" }: { label?: string }) {
  return (
    <WhatsAppLink
      offerSlug="skyframe-xr"
      message="Hello, I'd like to know more about Skyframe XR for my project."
      className="btn border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851]"
    >
      <WhatsAppIcon size={20} /> <span>{label}</span>
    </WhatsAppLink>
  );
}

export default function SkyframePage() {
  const cedarwood = getProject("cedarwood-city-estate");
  const sample = portfolioFor("xr")[0];
  const reading = insightsForService(s.slug).slice(0, 3);
  const video = x.media.video;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: "Skyframe XR", description }),
          {
            ...serviceSchema(s),
            brand: { "@type": "Brand", name: x.name, slogan: x.tagline },
            // Partnership: both parties credited equally.
            provider: [{ "@type": "Organization", name: "Arkfield Realty" }, { "@id": ids.org }],
          },
          faqSchema(x.faqs),
        )}
      />

      {/* Hero */}
      <section className="band plan-grid">
        <div className="wrap grid gap-12 pb-16 pt-10 sm:pb-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Breadcrumbs items={[{ name: "Skyframe XR", path }]} />
            {x.media.logo ? (
              <span className="mt-10 inline-block bg-paper px-4 py-3">
                <Image src={x.media.logo} alt="Skyframe XR" width={240} height={60} className="h-10 w-auto" />
              </span>
            ) : (
              <p className="mt-10 font-display text-4xl tracking-wide">
                SKYFRAME <span className="text-orange">XR</span>
              </p>
            )}
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">{x.partnership}</p>
            <h1 className="mt-6 text-6xl sm:text-8xl">{x.tagline}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">{x.hooks.imagine}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Wa />
              <Link href="/contact" className="btn btn-ghost"><span>Send your plans</span></Link>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden bg-ink lg:aspect-square">
            {video?.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                title="Skyframe XR walkthrough"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : video?.mp4 ? (
              <video src={video.mp4} poster={video.poster} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
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
        <blockquote className="mt-10 max-w-4xl font-display text-4xl leading-tight sm:text-5xl">&ldquo;{x.hooks.confidence}&rdquo;</blockquote>
      </section>

      {/* The problem */}
      <section className="band">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-3 text-5xl sm:text-6xl">Why off-plan selling needs more than blueprints</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {x.problems.map((p, i) => (
              <div key={p.title}>
                <span className="font-display text-4xl text-orange">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-3xl">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="wrap py-16 sm:py-20">
        <SectionHead num="01" eyebrow="Features" title="Nothing left to the imagination" intro={x.hooks.precision} />
        <div className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {x.features.map((f) => (
            <div key={f.title} className="border-b border-r border-line p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-3xl">{f.title}</h3>
                {f.v2 && <span className="shrink-0 bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-paper">2.0</span>}
              </div>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works: two delivery models */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-20">
          <SectionHead num="02" eyebrow="How it works" title="Two ways to experience Skyframe XR" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="border border-line p-6 sm:p-8">
              <h3 className="text-4xl">{x.models.onSite.title}</h3>
              <p className="mt-3 text-muted">{x.models.onSite.intro}</p>
              <p className="mt-3 text-sm text-muted">{x.models.onSite.setup}</p>
              <ol className="mt-6 space-y-2">
                {x.models.onSite.steps.map((st, i) => (
                  <li key={st} className="flex gap-3">
                    <span className="w-6 shrink-0 font-display text-xl text-orange-ink">{i + 1}</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="band p-6 sm:p-8">
              <span className="bg-orange px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">Skyframe XR 2.0</span>
              <h3 className="mt-4 text-4xl">{x.models.v2.title}</h3>
              <p className="mt-3 text-ink-muted">{x.models.v2.intro}</p>
              <ol className="mt-6 space-y-5">
                {x.models.v2.steps.map((st, i) => (
                  <li key={st.title}>
                    <span className="font-display text-3xl text-orange">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="font-display text-2xl">{st.title}</h4>
                    <p className="text-ink-muted">{st.body}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-ink-muted">{x.models.v2.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line">
        <div className="wrap grid gap-10 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">For</p>
            <h2 className="mt-3 text-4xl">Developers & firms</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {x.audiences.platform.map((a) => <li key={a} className="py-3">{a}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">And their clients</p>
            <h2 className="mt-3 text-4xl">Buyers who need to see it</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {x.audiences.clients.map((a) => <li key={a} className="py-3">{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="band">
        <div className="wrap grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">The partnership</p>
            <h2 className="mt-3 text-5xl sm:text-6xl">Arkfield Realty & VGIS</h2>
          </div>
          <div>
            <p className="text-lg text-ink-muted">{x.partnershipLong}</p>
            <p className="mt-4 font-display text-3xl">&ldquo;{x.hooks.trust}&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Related VGIS work */}
      {cedarwood && (
        <section className="wrap py-16 sm:py-20">
          <SectionHead eyebrow="Related VGIS work" title="Interactive walkthroughs" intro="Cedarwood City Estate included an interactive game walkthrough of the estate." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard p={cedarwood} />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-20">
          <SectionHead num="03" eyebrow="Questions" title="Skyframe XR: FAQ" />
          <div className="mt-10"><FaqList faqs={x.faqs} /></div>
          <div className="mt-10"><Wa label="Ask us on WhatsApp" /></div>
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

      <CtaBand title="Let buyers walk through it before it's built." body="Send your architectural plans and a short description of the project. We'll agree the deliverables with you before development begins." />
    </>
  );
}

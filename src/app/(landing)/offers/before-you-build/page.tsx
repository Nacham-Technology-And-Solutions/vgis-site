import type { Metadata } from "next";
import { beforeYouBuild as c } from "@/content/campaigns";
import { reason, reasonsClosing } from "@/content/knowledge/80-reasons";
import { beforeAfter } from "@/content/portfolio";
import { company } from "@/content/site";
import { FaqList } from "@/components/blocks";
import { BeforeAfterSlider } from "@/components/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { AudiencePicker, AudienceReasons } from "@/components/Audience";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { graph, ids, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: c.meta.title },
  description: c.meta.description,
  alternates: { canonical: `/offers/${c.slug}` },
  robots: { index: false, follow: true },
  openGraph: { title: c.meta.title, description: c.meta.description, url: `/offers/${c.slug}` },
  twitter: { title: c.meta.title, description: c.meta.description },
};

/** Only the reasons this page uses are serialised (the full 80 stay internal). */
const usedNumbers = [...new Set([...c.weeks.flatMap((w) => w.reasons), ...c.audiences.flatMap((a) => a.reasons)])];
const reasonsById = Object.fromEntries(usedNumbers.map((n) => [n, reason(n)]));

function WaButton({ label = "Send your plans on WhatsApp", big = false }: { label?: string; big?: boolean }) {
  return (
    <WhatsAppLink offerSlug={c.slug} className={`btn border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851] ${big ? "!px-6 !py-4 text-base" : ""}`}>
      <WhatsAppIcon size={big ? 24 : 20} /> <span>{label}</span>
    </WhatsAppLink>
  );
}

export default function BeforeYouBuildPage() {
  const [, punch] = reasonsClosing; // "See it. Study it. Improve it. Present it. Market it. Then build it."
  return (
    <>
      <JsonLd data={graph({ ...webPageSchema({ path: `/offers/${c.slug}`, name: c.meta.title, description: c.meta.description }), about: { "@id": ids.org } })} />

      {/* Hero: WhatsApp first (Nigeria), audience buttons feed attribution */}
      <section className="band plan-grid">
        <div className="wrap grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="mt-4 text-7xl sm:text-9xl">{c.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">{c.subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WaButton big />
              <a href="#quote" className="btn btn-ghost"><span>{c.ctaLabel}</span></a>
            </div>
            <p className="eyebrow mt-10">I am a…</p>
            <div className="mt-3"><AudiencePicker audiences={c.audiences} /></div>
          </div>
          <BeforeAfterSlider {...beforeAfter} />
        </div>
      </section>

      {/* Tailored reasons */}
      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow">Why visualise</p>
        <h2 className="mt-3 text-5xl sm:text-6xl">The reasons that matter to you</h2>
        <div className="mt-8"><AudienceReasons audiences={c.audiences} reasonsById={reasonsById} /></div>
      </section>

      {/* Four weeks: See / Plan / Build / Sell better */}
      {c.weeks.map((w, i) => (
        <section key={w.id} id={w.id} className={`scroll-mt-20 ${i % 2 === 0 ? "border-t border-line" : "band"}`}>
          <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow">Week {w.week}</p>
              <h2 className="mt-3 text-6xl sm:text-7xl">{w.title}</h2>
              <p className={`mt-3 ${i % 2 === 0 ? "text-muted" : "text-ink-muted"}`}>{w.intro}</p>
              <div className="mt-6"><WaButton label="Talk to us on WhatsApp" /></div>
            </div>
            <ol className="grid gap-6 sm:grid-cols-2">
              {w.reasons.map((n) => (
                <li key={n}>
                  <span className={`font-display text-3xl ${i % 2 === 0 ? "text-orange-ink" : "text-orange"}`}>{String(n).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-3xl">{reasonsById[n].title}</h3>
                  <p className={`mt-2 ${i % 2 === 0 ? "text-muted" : "text-ink-muted"}`}>{reasonsById[n].body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* The line the campaign is built on */}
      <section className="border-t border-line">
        <div className="wrap py-16 text-center sm:py-24">
          <p className="mx-auto max-w-4xl font-display text-5xl leading-none sm:text-7xl">{punch}</p>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="band scroll-mt-20">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Start now</p>
            <h2 className="mt-3 text-5xl sm:text-6xl">{c.ctaLabel}</h2>
            <p className="mt-4 text-ink-muted">Send your plans and a few details. We confirm the scope and quote with you before production.</p>
            <div className="mt-8"><WaButton /></div>
            <p className="mt-6 text-sm text-ink-muted">
              Or call <a href={`tel:${company.phones[0].e164}`} className="text-paper link-underline">{company.phones[0].display}</a>
            </p>
          </div>
          <div className="bg-paper p-6 text-ink sm:p-8">
            <ContactForm offer={c.slug} defaultService="3D architectural visualisation" submitLabel={`${c.ctaLabel} →`} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-3 text-5xl">Before you get in touch</h2>
        <div className="mt-8"><FaqList faqs={c.faqs} /></div>
      </section>
    </>
  );
}

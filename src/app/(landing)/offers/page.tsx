import Link from "next/link";
import type { Metadata } from "next";
import { offers } from "@/content/offers";
import { SITE_URL } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Offer pages & ad kit | VGIS®" },
  description: "Internal: VGIS ad landing pages with tracking links, keywords, audiences and ad copy.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/offers" },
};

/** UTM templates per platform. {{...}} are the platforms' own dynamic macros. */
const utm = (slug: string) => {
  const base = `${SITE_URL}/offers/${slug}`;
  return [
    { platform: "Google Ads (final URL suffix)", url: `${base}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}` },
    { platform: "Meta (Facebook / Instagram)", url: `${base}?utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}` },
    { platform: "LinkedIn", url: `${base}?utm_source=linkedin&utm_medium=paid_social&utm_campaign=${slug}` },
    { platform: "WhatsApp status / broadcast", url: `${base}?utm_source=whatsapp&utm_medium=social&utm_campaign=${slug}` },
  ];
};

const Count = ({ text, max }: { text: string; max: number }) => (
  <span className={`ml-2 text-xs tabular-nums ${text.length > max ? "font-bold text-orange-ink" : "text-muted"}`}>
    {text.length}/{max}
  </span>
);

export default function OffersKit() {
  return (
    <>
      <section className="band plan-grid">
        <div className="wrap py-16">
          <p className="eyebrow">Internal · not indexed</p>
          <h1 className="mt-4 text-6xl sm:text-8xl">Offer pages & ad kit</h1>
          <p className="mt-6 max-w-2xl text-ink-muted">
            One landing page per offer, built for paid traffic. Use the tracking links so every WhatsApp chat and form lead
            shows which ad it came from. Copy here matches the page, which keeps ad relevance and Quality Score high.
          </p>
        </div>
      </section>

      <div className="wrap space-y-20 py-16">
        <nav aria-label="Offers" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {offers.map((o) => (
            <a key={o.slug} href={`#${o.slug}`} className="link-underline">{o.name}</a>
          ))}
        </nav>

        {offers.map((o) => (
          <section key={o.slug} id={o.slug} className="scroll-mt-8 border-t-4 border-ink pt-8">
            <p className="eyebrow">{o.audience}</p>
            <h2 className="mt-2 text-5xl">{o.name}</h2>
            <p className="mt-3">
              <Link href={`/offers/${o.slug}`} className="font-semibold link-underline">{`${SITE_URL}/offers/${o.slug}`}</Link>
            </p>

            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl">Tracking links</h3>
                <ul className="mt-3 space-y-3 text-sm">
                  {utm(o.slug).map((u) => (
                    <li key={u.platform}>
                      <span className="font-semibold">{u.platform}</span>
                      <code className="mt-1 block break-all bg-panel p-2 text-xs">{u.url}</code>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-2xl">Search keywords</h3>
                <p className="mt-1 text-xs text-muted">Use phrase or exact match. Add &ldquo;free&rdquo;, &ldquo;jobs&rdquo;, &ldquo;course&rdquo;, &ldquo;tutorial&rdquo; and &ldquo;software&rdquo; as negatives.</p>
                <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                  {o.ads.keywords.map((k) => <li key={k} className="border border-line px-2 py-1">{k}</li>)}
                </ul>

                <h3 className="mt-8 text-2xl">Audiences (Meta / LinkedIn)</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {o.ads.audiences.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl">Google headlines</h3>
                <ul className="mt-3 space-y-1 text-sm">
                  {o.ads.headlines.map((h) => <li key={h}>{h}<Count text={h} max={30} /></li>)}
                </ul>
                <h3 className="mt-8 text-2xl">Google descriptions</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {o.ads.descriptions.map((d) => <li key={d}>{d}<Count text={d} max={90} /></li>)}
                </ul>
                <h3 className="mt-8 text-2xl">Meta / LinkedIn primary text</h3>
                <p className="mt-3 bg-panel p-4 text-sm">{o.ads.primaryText}</p>
                <p className="mt-2 text-xs text-muted">Headline: {o.headline} · Button: &ldquo;Send WhatsApp message&rdquo; or &ldquo;Get quote&rdquo;</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

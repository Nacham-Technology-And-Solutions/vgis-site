import { company, whatsapp } from "@/content/site";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";
import { PageHero } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { graph, ids, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";

const description =
  "Contact VGIS in Abuja for 3D architectural visualisation, product rendering, XR and branding. WhatsApp or call +234 811 285 3404, or email info@3dvgis.com.";

export const metadata = pageMetadata({ title: "Contact VGIS: Start a Project", description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph({ ...webPageSchema({ path: "/contact", name: "Contact VGIS", description, type: "ContactPage" }), mainEntity: { "@id": ids.org } })} />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        lede="Share your plans, drawings or brief. Every project starts with Discovery, then a written Blueprint & agreement before production."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="wrap grid gap-16 py-20 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-5xl">Send a brief</h2>
          <div className="mt-8"><ContactForm /></div>
        </div>
        <aside className="space-y-10">
          <div>
            <h2 className="eyebrow">WhatsApp</h2>
            <WhatsAppLink className="btn mt-3 border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851]">
              <WhatsAppIcon size={20} /> <span>Chat {whatsapp.display}</span>
            </WhatsAppLink>
            <p className="mt-2 text-sm text-muted">The fastest way to reach us.</p>
          </div>
          <div>
            <h2 className="eyebrow">Email</h2>
            <p className="mt-2 space-y-1">
              <a href={`mailto:${company.emails.primary}`} className="block text-lg link-underline">{company.emails.primary}</a>
              <a href={`mailto:${company.emails.secondary}`} className="block text-muted hover:link-underline">{company.emails.secondary}</a>
            </p>
          </div>
          <div>
            <h2 className="eyebrow">Phone</h2>
            <p className="mt-2 space-y-1">
              {company.phones.map((p) => (
                <a key={p.e164} href={`tel:${p.e164}`} className="block text-lg hover:link-underline">{p.display}</a>
              ))}
            </p>
          </div>
          {company.offices.map((o) => (
            <div key={o.id}>
              <h2 className="eyebrow">{o.name}</h2>
              <address className="mt-2 not-italic">
                {o.streetAddress}
                <br />
                {o.addressLocality}, {o.addressRegion}, {o.countryName}
              </address>
              <a
                className="mt-2 inline-block text-sm link-underline"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.streetAddress}, ${o.addressLocality}, ${o.countryName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}

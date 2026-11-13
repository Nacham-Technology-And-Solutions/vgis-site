import Link from "next/link";
import { company, whatsapp } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="band">
      <div className="wrap py-16">
        <p className="font-display text-5xl leading-none sm:text-7xl">{company.tagline}</p>

        <div className="mt-14 grid gap-10 border-t border-ink-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow">Services</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className="hover:text-paper" href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Company</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li><Link className="hover:text-paper" href="/about">About VGIS</Link></li>
              <li><Link className="hover:text-paper" href="/work">Signature projects</Link></li>
              <li><Link className="hover:text-paper" href="/process">Our process</Link></li>
              <li><Link className="hover:text-paper" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-paper" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Offices</h2>
            {company.offices.map((o) => (
              <address key={o.id} className="mt-4 text-sm not-italic text-ink-muted">
                <span className="font-semibold text-paper">{o.name}</span>
                <br />
                {o.streetAddress}, {o.addressLocality}, {o.addressRegion}, {o.countryName}
              </address>
            ))}
          </div>
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li><a className="hover:text-paper" href={whatsapp.url} target="_blank" rel="noopener noreferrer">WhatsApp {whatsapp.display}</a></li>
              <li><a className="hover:text-paper" href={`mailto:${company.emails.primary}`}>{company.emails.primary}</a></li>
              <li><a className="hover:text-paper" href={`mailto:${company.emails.secondary}`}>{company.emails.secondary}</a></li>
              {company.phones.map((p) => (
                <li key={p.e164}><a className="hover:text-paper" href={`tel:${p.e164}`}>{p.display}</a></li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {(
                [
                  ["Instagram", company.social.instagram],
                  ["Facebook", company.social.facebook],
                  ["YouTube", company.social.youtube],
                  ["LinkedIn", company.social.linkedin],
                  ["TikTok", company.social.tiktok],
                  ["X", company.social.x],
                  ["Behance", company.social.behance],
                ] as const
              ).map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer me" className="link-underline">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-line pt-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© {year} {company.legalName} · RC {company.rcNumber}</p>
          <p>VGIS® is a trademark of {company.legalName}.</p>
        </div>
      </div>
    </footer>
  );
}

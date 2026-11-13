import Link from "next/link";
import { company, whatsapp } from "@/content/site";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsApp";

/**
 * Minimal chrome for ad landing pages: no main navigation, so visitors stay on the offer.
 * The only actions are WhatsApp, the quote form and the phone number.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-paper">
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="VGIS® home">
            <span className="bg-white p-1"><Logo height={44} priority /></span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-2xl tracking-wide">VGIS®</span>
              <span className="block text-[11px] text-muted">Visual Graphics Illustration Services Ltd</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a href={`tel:${company.phones[0].e164}`} className="hidden text-sm font-semibold md:inline hover:link-underline">
              {company.phones[0].display}
            </a>
            <WhatsAppLink className="btn !gap-2 !px-4 !py-2.5 border-[#25D366] bg-[#25D366] text-sm text-white hover:bg-[#1da851]">
              <WhatsAppIcon size={18} /> <span>WhatsApp</span>
            </WhatsAppLink>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="band">
        <div className="wrap flex flex-col gap-3 py-10 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName} · RC {company.rcNumber} · {company.offices[0].streetAddress},{" "}
            {company.offices[0].addressLocality}
          </p>
          <p className="flex gap-4">
            <a href={`mailto:${company.emails.primary}`} className="hover:text-paper">{company.emails.primary}</a>
            <WhatsAppLink className="hover:text-paper">WhatsApp {whatsapp.display}</WhatsAppLink>
            <Link href="/privacy" className="hover:text-paper">Privacy</Link>
          </p>
        </div>
      </footer>
    </>
  );
}

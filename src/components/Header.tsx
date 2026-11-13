import Link from "next/link";
import { company, nav } from "@/content/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="VGIS® home">
          {/* Logo is white-backed; the panel keeps clear space on any background */}
          <span className="bg-white p-1">
            <Logo height={44} priority />
          </span>
          <span className="hidden leading-tight xl:block">
            <span className="block font-display text-2xl tracking-wide">VGIS®</span>
            <span className="block text-[11px] text-muted">Visual Graphics Illustration Services Ltd</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Tap-to-call: icon on small screens, number on large */}
          <a href={`tel:${company.phones[0].e164}`} aria-label={`Call VGIS on ${company.phones[0].display}`} className="flex h-10 w-10 items-center justify-center border border-ink lg:h-auto lg:w-auto lg:border-0 lg:text-sm lg:font-semibold lg:hover:link-underline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="lg:hidden"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
            <span className="hidden lg:inline">{company.phones[0].display}</span>
          </a>
          <Link href="/contact" className="btn btn-primary !px-4 !py-2.5 text-sm">
            Start a project
          </Link>
          {/* Mobile menu without client JS */}
          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-ink [&::-webkit-details-marker]:hidden" aria-label="Open menu">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" /></svg>
            </summary>
            <nav aria-label="Mobile" className="absolute right-0 top-12 w-56 border border-ink bg-paper shadow-lg">
              <ul className="py-2">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="block px-4 py-2.5 font-medium hover:bg-panel">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="block px-4 py-2.5 font-medium hover:bg-panel">Contact</Link>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { nav } from "@/content/site";
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
          <span className="hidden leading-tight sm:block">
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

import Image from "next/image";
import Link from "next/link";
import { Inter, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import type { BrandCase } from "@/content/brands";

const jakarta = Plus_Jakarta_Sans({ weight: ["800"], subsets: ["latin"], variable: "--font-brand-jakarta", display: "swap" });
const montserrat = Montserrat({ weight: ["800"], subsets: ["latin"], variable: "--font-brand-montserrat", display: "swap" });
const inter = Inter({ weight: ["600"], subsets: ["latin"], variable: "--font-brand-inter", display: "swap" });
const fontVar = { jakarta: "var(--font-brand-jakarta)", montserrat: "var(--font-brand-montserrat)", inter: "var(--font-brand-inter)" };

/** A brand board: logo on the brand's own ground, palette, type specimen and what the system includes. */
function BrandBoard({ b }: { b: BrandCase }) {
  return (
    <article className="grid border border-line lg:grid-cols-[1.1fr_1fr]">
      <div className="flex min-h-64 items-center justify-center p-10 sm:p-14" style={{ background: b.ground }}>
        <Image src={b.logo.src} alt={b.logo.alt} width={b.logo.width} height={b.logo.height} unoptimized className="h-auto w-full max-w-[340px]" />
      </div>

      <div className="p-6 sm:p-8">
        <p className="eyebrow">{b.sector}</p>
        <h3 className="mt-2 text-4xl">{b.name}</h3>
        <p className="mt-1 font-semibold">{b.tagline}</p>
        <p className="mt-4 text-muted">{b.summary}</p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label={`${b.name} colour palette`}>
          {b.swatches.map((s) => (
            <li key={s.hex}>
              <span className="block h-12 border border-line" style={{ background: s.hex }} aria-hidden="true" />
              <span className="mt-2 block text-sm font-semibold">{s.name}</span>
              <span className="block font-mono text-xs text-muted">{s.hex}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-6">
          {b.type.map((t) => (
            <div key={t.family} className="flex items-baseline gap-3">
              <span className="text-4xl leading-none" style={{ fontFamily: fontVar[t.font] }} aria-hidden="true">Aa</span>
              <span className="text-sm"><span className="font-semibold">{t.family}</span><span className="block text-muted">{t.role}</span></span>
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
          {b.system.map((x) => (
            <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />{x}</li>
          ))}
        </ul>

        {b.href && (
          <p className="mt-5 text-sm"><Link href={b.href} className="font-semibold link-underline">See {b.name} →</Link></p>
        )}
      </div>
    </article>
  );
}

export function BrandBoards({ brands }: { brands: BrandCase[] }) {
  return (
    <div className={`${jakarta.variable} ${montserrat.variable} ${inter.variable} space-y-10`}>
      {brands.map((b) => <BrandBoard key={b.slug} b={b} />)}
    </div>
  );
}

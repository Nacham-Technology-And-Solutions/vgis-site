import Image from "next/image";
import Link from "next/link";
import { Barlow_Condensed, DM_Sans, EB_Garamond, Inter, Inter_Tight, Instrument_Serif, Montserrat, Plus_Jakarta_Sans, Poppins, Roboto_Slab, Rubik } from "next/font/google";
import type { BrandCase, BrandFont } from "@/content/brands";

const jakarta = Plus_Jakarta_Sans({ weight: ["800"], subsets: ["latin"], variable: "--font-brand-jakarta", display: "swap" });
const montserrat = Montserrat({ weight: ["800"], subsets: ["latin"], variable: "--font-brand-montserrat", display: "swap" });
const inter = Inter({ weight: ["600"], subsets: ["latin"], variable: "--font-brand-inter", display: "swap" });
const interTight = Inter_Tight({ weight: ["600"], subsets: ["latin"], variable: "--font-brand-intertight", display: "swap" });
const instrument = Instrument_Serif({ weight: ["400"], style: ["italic"], subsets: ["latin"], variable: "--font-brand-instrument", display: "swap" });
const barlow = Barlow_Condensed({ weight: ["700"], subsets: ["latin"], variable: "--font-brand-barlow", display: "swap" });
const dmsans = DM_Sans({ weight: ["500"], subsets: ["latin"], variable: "--font-brand-dmsans", display: "swap" });
const rubik = Rubik({ weight: ["500"], subsets: ["latin"], variable: "--font-brand-rubik", display: "swap" });
const garamond = EB_Garamond({ weight: ["400"], style: ["italic"], subsets: ["latin"], variable: "--font-brand-garamond", display: "swap" });
const robotoSlab = Roboto_Slab({ weight: ["700"], subsets: ["latin"], variable: "--font-brand-robotoslab", display: "swap" });
const poppins = Poppins({ weight: ["500"], subsets: ["latin"], variable: "--font-brand-poppins", display: "swap" });
const fontVar: Record<BrandFont, string> = {
  rubik: "var(--font-brand-rubik)",
  garamond: "var(--font-brand-garamond)",
  robotoslab: "var(--font-brand-robotoslab)",
  poppins: "var(--font-brand-poppins)",
  barlow: "var(--font-brand-barlow)",
  dmsans: "var(--font-brand-dmsans)",
  jakarta: "var(--font-brand-jakarta)",
  montserrat: "var(--font-brand-montserrat)",
  inter: "var(--font-brand-inter)",
  intertight: "var(--font-brand-intertight)",
  instrument: "var(--font-brand-instrument)",
  bebas: "var(--font-bebas)",
};

/** A brand board: logo on the brand's own ground, palette, type specimen and what the system includes. */
function BrandBoard({ b, linkProject }: { b: BrandCase; linkProject: boolean }) {
  return (
    <article id={b.slug} className="scroll-mt-24">
    <div className="grid border border-line lg:grid-cols-[1.1fr_1fr]">
      <div className="flex min-h-64 flex-col justify-center gap-10 p-10 sm:p-14" style={{ background: b.ground }}>
        <Image
          src={b.logo.src}
          alt={b.logo.alt}
          width={b.logo.width}
          height={b.logo.height}
          unoptimized={b.logo.src.endsWith(".svg")}
          sizes="340px"
          className={`mx-auto h-auto ${b.logo.height > b.logo.width ? "w-40" : "w-full max-w-[340px]"}`}
        />
        {b.family && (
          <ul className="grid grid-cols-2 items-center gap-6 sm:grid-cols-4" aria-label={`${b.name} family of marks`}>
            {b.family.map((f) => (
              <li key={f.src} className="flex justify-center">
                <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="160px" className="h-auto max-h-24 w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
        )}
        {b.applications && (
          <ul className="grid grid-cols-3 items-end gap-3" aria-label={`${b.name} stationery`}>
            {b.applications.map((a) => (
              <li key={a.src}>
                <Image src={a.src} alt={a.alt} width={a.width} height={a.height} sizes="(min-width: 1024px) 200px, 33vw" className="h-auto w-full shadow-lg" />
              </li>
            ))}
          </ul>
        )}
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

        {b.type.length > 0 && <div className="mt-6 flex flex-wrap gap-6">
          {b.type.map((t) => (
            <div key={t.family} className="flex items-baseline gap-3">
              <span className={`text-4xl leading-none ${t.font === "instrument" || t.font === "garamond" ? "italic" : ""}`} style={{ fontFamily: fontVar[t.font] }} aria-hidden="true">Aa</span>
              <span className="text-sm"><span className="font-semibold">{t.family}</span><span className="block text-muted">{t.role}</span></span>
            </div>
          ))}
        </div>}

        <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
          {b.system.map((x) => (
            <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />{x}</li>
          ))}
        </ul>

        {b.credit && <p className="mt-5 text-xs text-muted">{b.credit}</p>}

        {linkProject && b.project && (
          <p className="mt-5 text-sm"><Link href={`/work/${b.project}`} className="font-semibold link-underline">See the full {b.name} project →</Link></p>
        )}
        {b.href && (
          <p className="mt-5 text-sm"><Link href={b.href} className="font-semibold link-underline">See {b.name} →</Link></p>
        )}
      </div>
    </div>
    {b.mockups && b.mockups.length > 0 && (
      <div className={`mt-4 grid gap-4 ${b.mockups.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-4xl"}`}>
        {b.mockups.map((m) => (
          <figure key={m.src} className="bg-panel">
            <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes={b.mockups!.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1200px) 1136px, 100vw"} className="h-auto w-full" />
          </figure>
        ))}
      </div>
    )}
    </article>
  );
}

const fontVars = `${jakarta.variable} ${montserrat.variable} ${inter.variable} ${interTight.variable} ${instrument.variable} ${barlow.variable} ${dmsans.variable} ${rubik.variable} ${garamond.variable} ${robotoSlab.variable} ${poppins.variable}`;

/** Brand boards. `linkProject` adds a link to each brand's /work page (off on the project page itself). */
export function BrandBoards({ brands, linkProject = true }: { brands: BrandCase[]; linkProject?: boolean }) {
  return (
    <div className={`${fontVars} space-y-14`}>
      {brands.map((b) => <BrandBoard key={b.slug} b={b} linkProject={linkProject} />)}
    </div>
  );
}

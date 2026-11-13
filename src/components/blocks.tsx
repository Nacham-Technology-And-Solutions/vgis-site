import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Faq, Service } from "@/content/services";
import type { Project } from "@/content/projects";
import type { Process } from "@/content/process";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { company, whatsapp } from "@/content/site";
import { WhatsAppLink } from "./WhatsApp";
import { serviceHref } from "@/content/services";

/* ---------- Breadcrumbs (visible + BreadcrumbList schema) ---------- */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
        <ol className="flex flex-wrap gap-2">
          {all.map((it, i) => (
            <li key={it.path} className="flex gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={it.path} className="hover:text-paper">{it.name}</Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page" className="text-paper">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbSchema(all))} />
    </>
  );
}

/* ---------- Page hero (black band) ---------- */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="band plan-grid">
      <div className="wrap pb-16 pt-10 sm:pb-24">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-6xl sm:text-8xl">{title}</h1>
        {lede && <div className="mt-6 max-w-2xl text-lg text-ink-muted">{lede}</div>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({ num, eyebrow, title, intro }: { num?: string; eyebrow?: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[96px_1fr] md:items-end">
      {num ? <span className="font-display text-7xl leading-[0.8] text-orange-ink" aria-hidden="true">{num}</span> : <span className="hidden md:block" />}
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-5xl sm:text-6xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
      </div>
    </div>
  );
}

/* ---------- Answer box: the quotable, answer-first summary (AEO) ---------- */
export function AnswerBox({ question, children }: { question: string; children: ReactNode }) {
  return (
    <div className="border-l-4 border-orange bg-panel p-6 sm:p-8">
      <p className="eyebrow">{question}</p>
      <p className="mt-3 text-lg leading-relaxed sm:text-xl">{children}</p>
    </div>
  );
}

/* ---------- FAQ list (native details/summary: accessible, no JS, crawlable) ---------- */
export function FaqList({ faqs, mobileLimit }: { faqs: Faq[]; mobileLimit?: number }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f, i) => (
        <details key={f.q} className={`group py-5 ${mobileLimit !== undefined && i >= mobileLimit ? "hidden sm:block" : ""}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-lg font-semibold leading-snug tracking-normal">{f.q}</h3>
            <span className="mt-1 text-orange-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Service card ---------- */
export function ServiceCard({ s, index }: { s: Service; index: number }) {
  return (
    <Link href={serviceHref(s)} className="group flex h-full flex-col border border-line p-6 transition-colors hover:border-ink">
      <span className="font-display text-3xl text-orange-ink">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-6 text-3xl">{s.name}</h3>
      <p className="mt-3 flex-1 text-sm text-muted">{s.description}</p>
      <span className="mt-6 text-sm font-semibold group-hover:link-underline">Explore service →</span>
    </Link>
  );
}

/* ---------- Project visual: real image if supplied, otherwise a branded plan-sheet panel ---------- */
export function ProjectVisual({ p, priority = false, sizes = "(min-width: 1024px) 33vw, 100vw" }: { p: Project; priority?: boolean; sizes?: string }) {
  const img = p.images[0];
  if (img) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    );
  }
  return (
    <div className="band plan-grid relative flex aspect-[4/3] flex-col justify-between p-5" role="img" aria-label={`${p.name}, ${p.category}`}>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        <span>{p.category}</span>
        <span>{p.year ?? "VGIS"}</span>
      </div>
      <span className="font-display text-5xl leading-none">{p.name}</span>
      <span className="absolute bottom-0 left-0 h-1 w-16 bg-orange" />
    </div>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <ProjectVisual p={p} />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-3xl">{p.name}</h3>
        {p.year && <span className="text-sm text-muted">{p.year}</span>}
      </div>
      {(p.location || p.client) && (
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange-ink">
          {[p.location, p.client && p.client.name !== p.name ? `For ${p.client.name}` : undefined].filter(Boolean).join(" · ")}
        </p>
      )}
      <p className="mt-1 text-sm text-muted">{p.scope}</p>
    </Link>
  );
}

/* ---------- Process steps ---------- */
export function ProcessSteps({ process }: { process: Process }) {
  return (
    <ol className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
      {process.steps.map((st, i) => (
        <li key={st.title} className="border-b border-r border-line bg-paper p-6">
          <span className="font-display text-4xl text-orange-ink">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-2xl">{st.title}</h3>
          <p className="mt-2 text-sm text-muted">{st.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Closing call to action ---------- */
export function CtaBand({ title = "Bring your project to life before it is built.", body }: { title?: string; body?: string }) {
  return (
    <section className="band">
      <div className="wrap grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow">Start a project</p>
          <h2 className="mt-3 text-5xl sm:text-7xl">{title}</h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            {body ?? "Send your plans, drawings or brief. We will review the scope and reply with a plan and quote."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">Send a brief →</Link>
          <WhatsAppLink className="btn btn-ghost"><span>WhatsApp {whatsapp.display}</span></WhatsAppLink>
          <a href={`mailto:${company.emails.primary}`} className="btn btn-ghost"><span>{company.emails.primary}</span></a>
        </div>
      </div>
    </section>
  );
}

import { projects } from "@/content/projects";
import { portfolio } from "@/content/portfolio";
import { company } from "@/content/site";
import { CtaBand, PageHero, ProjectCard, SectionHead } from "@/components/blocks";
import { PortfolioGrid } from "@/components/portfolio";
import { JsonLd } from "@/components/JsonLd";
import { graph, projectSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "VGIS work: signature projects Down Town Castries (Saint Lucia), St Helen Hotel and White Avenue Real Estate, plus architectural design, 3D visualisation, XR, campaigns and branding.";

export const metadata = pageMetadata({ title: "Work: 3D Visualisation, XR, Campaigns & Branding", description, path: "/work" });

export default function WorkPage() {
  const signature = projects.filter((p) => p.signature);
  const groups = [
    { key: "3d", title: "More 3D projects", items: projects.filter((p) => p.discipline === "3d" && !p.signature) },
    { key: "2d", title: "2D branding", items: projects.filter((p) => p.discipline === "2d") },
  ];
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: "/work", name: "VGIS work", description, type: "CollectionPage" }), ...projects.map(projectSchema))} />
      <PageHero
        eyebrow="Work"
        title="Work that shows every side of VGIS."
        lede="Design and 3D visualisation, XR, adverts and motion, AI-assisted content and brand systems."
        crumbs={[{ name: "Work", path: "/work" }]}
      />

      <section id="signature" className="wrap scroll-mt-24 py-16 sm:py-20">
        <SectionHead num="01" eyebrow="Signature work" title="Hallmark projects" />
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {signature.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="wrap border-t border-line py-16 sm:py-20">
        <SectionHead num="02" eyebrow="Portfolio" title="Browse by discipline" />
        <div className="mt-10"><PortfolioGrid items={portfolio} /></div>
        <p className="mt-8 text-xs text-muted">
          Items marked &ldquo;Sample&rdquo; are placeholder images shown while our portfolio is being updated. They are not client work.
        </p>
      </section>

      <div className="border-t border-line">
        {groups.map((g, i) => (
          <section key={g.key} className="wrap py-16 sm:py-20">
            <SectionHead num={String(i + 3).padStart(2, "0")} eyebrow="Projects" title={g.title} />
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </section>
        ))}
      </div>

      <section className="wrap pb-20">
        <p className="text-muted">
          More of our portfolio is on{" "}
          {company.behanceGalleries.map((b, i) => (
            <span key={b.url}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="link-underline">Behance ({b.label.toLowerCase()})</a>
              {i < company.behanceGalleries.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          and{" "}
          <a href={company.social.youtube} target="_blank" rel="noopener noreferrer" className="link-underline">YouTube</a>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}

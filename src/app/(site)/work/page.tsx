import { projects } from "@/content/projects";
import { portfolio } from "@/content/portfolio";
import { company } from "@/content/site";
import { CtaBand, PageHero, ProjectCard, SectionHead } from "@/components/blocks";
import { PortfolioGrid } from "@/components/portfolio";
import { JsonLd } from "@/components/JsonLd";
import { graph, projectSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "VGIS work: 3D architectural and product visualisation, Skyframe XR, adverts and motion, and 2D branding, plus signature projects such as Castries Redevelopment and Cedarwood City Estate.";

export const metadata = pageMetadata({ title: "Work: 3D Visualisation, XR, Campaigns & Branding", description, path: "/work" });

export default function WorkPage() {
  const groups = [
    { key: "3d", title: "3D visualisation", items: projects.filter((p) => p.discipline === "3d") },
    { key: "2d", title: "2D branding", items: projects.filter((p) => p.discipline === "2d") },
  ];
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: "/work", name: "VGIS work", description, type: "CollectionPage" }), ...projects.map(projectSchema))} />
      <PageHero
        eyebrow="Work"
        title="Work that shows every side of VGIS."
        lede="3D visualisation, XR, adverts and motion, AI-assisted content and brand systems. Filter by discipline."
        crumbs={[{ name: "Work", path: "/work" }]}
      />

      <section className="wrap py-16 sm:py-20">
        <PortfolioGrid items={portfolio} />
        <p className="mt-8 text-xs text-muted">
          Items marked &ldquo;Sample&rdquo; are placeholder images shown while our portfolio is being updated. They are not client work.
        </p>
      </section>

      <div id="signature" className="scroll-mt-24 border-t border-line">
        {groups.map((g, i) => (
          <section key={g.key} className="wrap py-16 sm:py-20">
            <SectionHead num={String(i + 1).padStart(2, "0")} eyebrow="Signature projects" title={g.title} />
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

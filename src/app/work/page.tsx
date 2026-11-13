import { projects } from "@/content/projects";
import { company } from "@/content/site";
import { CtaBand, PageHero, ProjectCard, SectionHead } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { graph, projectSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Signature VGIS projects: Castries Redevelopment, Cavacha Garden and Cedarwood City Estate in 3D, and brand identities for Nâcham, Gethsemane and more.";

export const metadata = pageMetadata({ title: "Signature Projects: 3D Visualisation & Branding", description, path: "/work" });

export default function WorkPage() {
  const groups = [
    { key: "3d", title: "3D visualisation", items: projects.filter((p) => p.discipline === "3d") },
    { key: "2d", title: "2D branding", items: projects.filter((p) => p.discipline === "2d") },
  ];
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: "/work", name: "VGIS signature projects", description, type: "CollectionPage" }), ...projects.map(projectSchema))} />
      <PageHero
        eyebrow="Signature projects"
        title="Work that shows both sides of VGIS."
        lede="A selection of hallmark projects across 3D visualisation and 2D branding."
        crumbs={[{ name: "Work", path: "/work" }]}
      />
      {groups.map((g, i) => (
        <section key={g.key} className="wrap py-20">
          <SectionHead num={String(i + 1).padStart(2, "0")} eyebrow={g.key.toUpperCase()} title={g.title} />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>
      ))}
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

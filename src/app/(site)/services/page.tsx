import { disciplineOrder, disciplines, servicesBy } from "@/content/services";
import { CtaBand, PageHero, SectionHead, ServiceCard } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { graph, serviceListSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "3D architectural and product visualisation, cinematic walkthroughs, Skyframe XR, brand identity, graphic design and motion graphics from VGIS, Abuja.";

export const metadata = pageMetadata({ title: "3D Visualisation, XR & Branding Services", description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: "/services", name: "VGIS services", description, type: "CollectionPage" }), serviceListSchema())} />
      <PageHero
        eyebrow="Services"
        title="Every service a project needs to be seen, experienced and sold."
        lede="3D visualisation is our core. 2D branding and design support it, so the renders and the marketing come from one team."
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      {disciplineOrder.map((d, i) => (
        <section key={d} className="wrap py-20">
          <SectionHead num={String(i + 1).padStart(2, "0")} eyebrow={disciplines[d].label} title={disciplines[d].name} intro={disciplines[d].intro} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesBy(d).map((s, j) => <ServiceCard key={s.slug} s={s} index={j} />)}
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}

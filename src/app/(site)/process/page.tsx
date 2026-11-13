import { processes } from "@/content/process";
import { CtaBand, PageHero, ProcessSteps, SectionHead } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

const description =
  "How VGIS delivers 3D visualisation, Skyframe XR experiences, brand identity and campaign films, stage by stage, from brief to final delivery.";

export const metadata = pageMetadata({ title: "Our Process: How VGIS Delivers Projects", description, path: "/process" });

export default function ProcessPage() {
  const list = Object.values(processes);
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/process", name: "The VGIS process", description }),
          // HowTo-style structure helps answer engines quote the steps in order.
          ...list.map((p) => ({
            "@type": "HowTo",
            name: `${p.name} at VGIS`,
            description: p.summary,
            url: absoluteUrl(`/process#${p.key}`),
            step: p.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
          })),
        )}
      />
      <PageHero
        eyebrow="The VGIS process"
        title="Precise at every stage."
        lede="Each workflow is structured for precision, clarity and quality. You see and approve the work before final production."
        crumbs={[{ name: "Process", path: "/process" }]}
      />
      {list.map((p, i) => (
        <section key={p.key} id={p.key} className="scroll-mt-24 border-b border-line">
          <div className="wrap py-20">
            <SectionHead num={["I", "II", "III", "IV"][i]} eyebrow="Workflow" title={p.name} intro={p.summary} />
            <div className="mt-10"><ProcessSteps process={p} /></div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}

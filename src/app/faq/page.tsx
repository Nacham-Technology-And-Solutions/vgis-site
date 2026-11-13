import Link from "next/link";
import { allFaqGroups } from "@/content/faqs";
import { CtaBand, FaqList, PageHero } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Answers about VGIS, 3D architectural visualisation, product rendering, walkthroughs, Skyframe XR, branding, pricing, process and working with us.";

export const metadata = pageMetadata({ title: "FAQ: 3D Visualisation, XR & Branding", description, path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: "/faq", name: "VGIS FAQ", description }), faqSchema(allFaqGroups.flatMap((g) => g.faqs)))} />
      <PageHero eyebrow="FAQ" title="Questions, answered plainly." lede="Short, exact answers about VGIS and how we work." crumbs={[{ name: "FAQ", path: "/faq" }]} />
      <div className="wrap grid gap-16 py-20 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ topics" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 text-sm">
            {allFaqGroups.map((g, i) => (
              <li key={g.title}><a href={`#topic-${i}`} className="hover:link-underline">{g.title}</a></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16">
          {allFaqGroups.map((g, i) => (
            <section key={g.title} id={`topic-${i}`} className="scroll-mt-28">
              <h2 className="text-4xl">{g.title}</h2>
              <div className="mt-6"><FaqList faqs={g.faqs} /></div>
              {"href" in g && g.href && (
                <Link href={g.href} className="mt-4 inline-block text-sm font-semibold link-underline">About this service →</Link>
              )}
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}

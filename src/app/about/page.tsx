import { company } from "@/content/site";
import { leadership } from "@/content/team";
import { AnswerBox, CtaBand, PageHero, SectionHead } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { graph, ids, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "About VGIS (Visual Graphics Illustration Services Limited): our story from VG3DS, vision, mission and leadership team, based in Abuja, Nigeria.";

export const metadata = pageMetadata({ title: "About VGIS: Story, Vision & Leadership", description, path: "/about" });

const initials = (n: string) => n.split(" ").filter((_, i, a) => i === 0 || i === a.length - 1).map((w) => w[0]).join("");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph({ ...webPageSchema({ path: "/about", name: "About VGIS", description, type: "AboutPage" }), mainEntity: { "@id": ids.org } })} />
      <PageHero
        eyebrow="About VGIS"
        title="A twofold studio: 3D at the core, branding in support."
        lede={company.tagline}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="wrap py-20">
        <AnswerBox question="Who is VGIS?">{company.definition}</AnswerBox>
      </section>

      <section className="wrap pb-20">
        <SectionHead num="01" eyebrow="Our story" title="From VG3DS to VGIS" />
        <div className="prose-vgis mt-8 max-w-3xl text-lg text-muted md:ml-[120px]">
          {company.story.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="band">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Vision</p>
            <h2 className="mt-3 text-5xl">Imagination, made real.</h2>
          </div>
          <p className="text-lg text-ink-muted">{company.vision}</p>
        </div>
      </section>

      <section className="wrap py-20">
        <SectionHead num="02" eyebrow="Mission" title="What we commit to" />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
          {company.mission.map((m) => (
            <div key={m.title} className="bg-paper p-6">
              <h3 className="text-3xl">{m.title}</h3>
              <p className="mt-2 text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20">
          <SectionHead num="03" eyebrow="Leadership" title="The people behind the work" intro="Decades of combined experience across creative direction, 3D artistry and technical delivery." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((p) => (
              <article key={p.id} id={p.id} className="scroll-mt-24 border border-line p-6">
                <div className="band flex h-20 w-20 items-center justify-center font-display text-4xl" aria-hidden="true">{initials(p.name)}</div>
                <h3 className="mt-6 text-3xl">{p.name}</h3>
                <p className="eyebrow mt-1">{p.role}</p>
                <p className="mt-3 text-sm text-muted">{p.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap grid gap-12 py-20 md:grid-cols-2">
          <div>
            <SectionHead num="04" eyebrow="How we work" title={company.philosophy} />
            <p className="mt-6 text-muted md:ml-[120px]">
              Every deliverable is crafted to the highest industry standard, with a Diamond Tier client experience and end-to-end
              support that turns concepts into marketable assets.
            </p>
          </div>
          <dl className="h-fit divide-y divide-line border-y border-line text-sm">
            <div className="py-4"><dt className="eyebrow">Registered name</dt><dd className="mt-1 text-base">{company.legalName}</dd></div>
            <div className="py-4"><dt className="eyebrow">CAC registration</dt><dd className="mt-1 text-base">RC {company.rcNumber}</dd></div>
            <div className="py-4"><dt className="eyebrow">Trademark</dt><dd className="mt-1 text-base">{company.trademark.mark}®, classes {company.trademark.classes.join(", ")}</dd></div>
            <div className="py-4"><dt className="eyebrow">Hubs</dt><dd className="mt-1 text-base">{company.hubs.join(" · ")}</dd></div>
            <div className="py-4"><dt className="eyebrow">Clients in</dt><dd className="mt-1 text-base">{company.areaServed.join(" · ")}</dd></div>
          </dl>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

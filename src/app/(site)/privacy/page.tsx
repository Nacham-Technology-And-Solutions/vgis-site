import { company } from "@/content/site";
import { PageHero } from "@/components/blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Visual Graphics Illustration Services Limited (VGIS) collects, uses and protects personal information submitted through 3dvgis.com.",
  path: "/privacy",
});

const UPDATED = "13 November 2026";

/** Plain-language privacy notice. Required by Google Ads and Meta for pages that collect leads. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" lede={`Last updated ${UPDATED}.`} crumbs={[{ name: "Privacy", path: "/privacy" }]} />
      <article className="wrap max-w-3xl space-y-8 py-16 [&_h2]:text-4xl [&_p]:mt-3 [&_p]:text-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-muted">
        <section>
          <h2>Who we are</h2>
          <p>
            This website is operated by {company.legalName} (&ldquo;VGIS&rdquo;), registered in Nigeria under RC {company.rcNumber},
            with its head office at {company.offices[0].streetAddress}, {company.offices[0].addressLocality}, {company.offices[0].countryName}.
          </p>
        </section>
        <section>
          <h2>What we collect</h2>
          <ul>
            <li>Details you send us through our forms, by email or on WhatsApp: your name, email address, phone number, company and project brief.</li>
            <li>How you reached us: the page you landed on and advertising campaign tags (for example utm parameters or ad click identifiers).</li>
            <li>Anonymous usage statistics from Vercel Web Analytics, which does not use cookies.</li>
            <li>When our advertising tags are active, Meta and Google may set cookies or collect device information to measure ad performance.</li>
          </ul>
        </section>
        <section>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and prepare proposals and quotes.</li>
            <li>To deliver and administer projects you engage us for.</li>
            <li>To understand which pages and advertisements are useful, so we can improve them.</li>
          </ul>
          <p>We do not sell your personal information.</p>
        </section>
        <section>
          <h2>Who we share it with</h2>
          <p>
            Only service providers that help us run the website and communicate with you: our hosting provider (Vercel), our email
            delivery provider (Resend), Google and WhatsApp (Meta) for email and messaging, and, when active, Meta and Google
            advertising measurement. They process data on our behalf or under their own privacy terms.
          </p>
        </section>
        <section>
          <h2>How long we keep it</h2>
          <p>We keep enquiry details for as long as needed to respond and, if we work together, for the life of the project and our legal record-keeping obligations.</p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p>
            Under the Nigeria Data Protection Act 2023 and other applicable laws, you can ask to access, correct or delete your personal
            information, or object to its use. Email{" "}
            <a href={`mailto:${company.emails.primary}`} className="link-underline">{company.emails.primary}</a> and we will respond promptly.
          </p>
        </section>
        <section>
          <h2>Changes</h2>
          <p>We may update this policy. The date at the top shows when it last changed.</p>
        </section>
      </article>
    </>
  );
}

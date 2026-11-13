import Link from "next/link";
import { services, serviceHref } from "@/content/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
    <Header />
    <main id="main">
    <section className="band plan-grid">
      <div className="wrap py-28">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-7xl sm:text-9xl">This page is not on the plan.</h1>
        <p className="mt-6 max-w-xl text-ink-muted">The page may have moved when we rebuilt the site. Try one of these instead.</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li><Link href="/" className="link-underline">Home</Link></li>
          <li><Link href="/work" className="link-underline">Signature projects</Link></li>
          <li><Link href="/contact" className="link-underline">Contact</Link></li>
          {services.map((s) => (
            <li key={s.slug}><Link href={serviceHref(s)} className="link-underline">{s.name}</Link></li>
          ))}
        </ul>
      </div>
    </section>
    </main>
    <Footer />
    </>
  );
}

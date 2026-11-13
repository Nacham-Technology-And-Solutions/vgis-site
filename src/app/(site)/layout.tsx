import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** Full-site chrome: main navigation and footer. Offer landing pages use their own minimal layout. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

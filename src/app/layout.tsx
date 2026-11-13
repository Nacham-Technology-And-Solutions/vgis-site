import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFab } from "@/components/WhatsApp";
import { SITE_URL, company } from "@/content/site";
import { graph, organizationSchema, officeSchemas, personSchemas, websiteSchema } from "@/lib/schema";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VGIS® | 3D Architectural Visualisation & Branding Studio, Abuja",
    template: "%s | VGIS®",
  },
  description:
    "VGIS is an Abuja-based studio creating photorealistic 3D architectural and product renders, cinematic walkthroughs, AR/VR and brand identity for developers and businesses.",
  applicationName: "VGIS®",
  authors: [{ name: company.legalName, url: SITE_URL }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "Architectural visualisation",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    siteName: "VGIS®",
    locale: "en_NG",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
          ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${bebas.variable} ${inter.variable}`}>
      <body>
        {/* Site-wide entity graph: Organization, offices, leadership, WebSite */}
        <JsonLd data={graph(organizationSchema(), ...officeSchemas(), ...personSchemas(), websiteSchema())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

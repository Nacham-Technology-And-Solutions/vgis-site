"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // e.g. AW-123456789
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID; // e.g. G-XXXXXXX

/**
 * Ad pixels load only when their IDs are set in Vercel env, so nothing third-party runs by default.
 * Conversions are fired by trackLead() in src/lib/attribution.ts.
 */
export function Tracking() {
  useEffect(() => {
    captureAttribution();
  }, []);

  const gtagId = GOOGLE_ADS_ID || GA4_ID;
  return (
    <>
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${
              GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""
            }${GA4_ID ? `gtag('config','${GA4_ID}');` : ""}`}
          </Script>
        </>
      )}
    </>
  );
}

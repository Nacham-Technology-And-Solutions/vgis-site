"use client";

import { track } from "@vercel/analytics";

/**
 * First-touch ad attribution. On arrival we store utm_* and click IDs for the session, then
 * attach them to WhatsApp messages and form submissions so every lead can be traced to its ad.
 */
const KEY = "vgis_attr";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "li_fat_id"] as const;
export type Attribution = Partial<Record<(typeof PARAMS)[number] | "landing" | "audience", string>>;

export function captureAttribution() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const p of PARAMS) {
      const v = q.get(p);
      if (v) found[p] = v.slice(0, 120);
    }
    // Only overwrite when a new ad click arrives; otherwise keep first touch.
    if (Object.keys(found).length || !sessionStorage.getItem(KEY)) {
      found.landing = window.location.pathname;
      sessionStorage.setItem(KEY, JSON.stringify(found));
    }
  } catch {
    /* storage blocked: attribution is best-effort */
  }
}

export function getAttribution(): Attribution {
  try {
    // Components may read before <Tracking> has run its effect: capture on first read.
    if (!sessionStorage.getItem(KEY)) captureAttribution();
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Records the visitor's self-selected audience (e.g. "developers") alongside the UTM fields. */
export function setAudience(audience: string) {
  try {
    const a = getAttribution();
    a.audience = audience;
    sessionStorage.setItem(KEY, JSON.stringify(a));
    window.dispatchEvent(new CustomEvent("vgis:audience", { detail: audience }));
  } catch {}
}

/** Short human-readable reference for WhatsApp, e.g. "off-plan-renders · facebook/paid/nov-launch". */
export function attributionRef(offer?: string) {
  const a = getAttribution();
  const src = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join("/");
  return [offer, a.audience, src || (a.gclid ? "google-ads" : a.fbclid ? "meta-ads" : "")].filter(Boolean).join(" · ");
}

type Win = Window & { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };

/** Fires a lead conversion to Vercel Analytics, Meta Pixel and Google Ads (whichever are configured). */
export function trackLead(channel: "whatsapp" | "form" | "phone" | "email", offer?: string) {
  const w = window as Win;
  const data = { channel, offer: offer ?? "site", ...getAttribution() };
  try {
    track("lead", { channel, offer: offer ?? "site", source: data.utm_source ?? "" });
  } catch {}
  w.fbq?.("track", channel === "whatsapp" ? "Contact" : "Lead", { content_name: offer ?? "site", content_category: channel });
  const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
    ? `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL}`
    : undefined;
  if (sendTo) w.gtag?.("event", "conversion", { send_to: sendTo });
  w.gtag?.("event", "generate_lead", { method: channel, offer: offer ?? "site" });
}

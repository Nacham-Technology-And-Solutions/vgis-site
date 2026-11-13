"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { company, whatsapp } from "@/content/site";
import { offers } from "@/content/offers";
import { attributionRef, getAttribution, trackLead } from "@/lib/attribution";
import { beforeYouBuild } from "@/content/campaigns";

/** Campaign pages that are not in the offers list (currently Before You Build). */
const onCampaign = () => typeof window !== "undefined" && window.location.pathname.startsWith(`/offers/${beforeYouBuild.slug}`);
const campaignSlug = () => (onCampaign() ? beforeYouBuild.slug : undefined);
const campaignMessage = () => (onCampaign() ? beforeYouBuild.waMessage : undefined);

/** Adds the visitor's chosen audience line (e.g. "I'm a developer.") to campaign messages. */
function withAudience(msg: string, slug?: string) {
  if (slug !== beforeYouBuild.slug) return msg;
  const a = beforeYouBuild.audiences.find((x) => x.id === getAttribution().audience);
  return a ? `${msg} ${a.message}` : msg;
}

const number = company.phones.find((p) => p.whatsapp)!.e164.replace("+", "");
const DEFAULT_MSG = "Hello VGIS, I'd like to discuss a project.";

/** Builds the wa.me URL at click time so the message carries the offer and ad reference. */
function waUrl(message: string, offer?: string) {
  const ref = attributionRef(offer);
  const text = ref ? `${message}\n\n(Ref: ${ref})` : message;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Offer currently in view, from /offers/<slug>. */
function useOffer() {
  const path = usePathname() ?? "";
  const slug = path.startsWith("/offers/") ? path.split("/")[2] : undefined;
  return offers.find((o) => o.slug === slug);
}

/** WhatsApp glyph (Simple Icons, CC0). */
export function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Any WhatsApp link on the site. Uses the offer's own message on offer pages, appends the ad
 * reference, and records a lead on click. Without JS it still opens a plain chat.
 */
export function WhatsAppLink({
  children,
  className,
  message,
  ariaLabel,
  offerSlug,
}: {
  children: ReactNode;
  className?: string;
  message?: string;
  ariaLabel?: string;
  /** For campaign pages outside the standard offers list. */
  offerSlug?: string;
}) {
  const offer = useOffer();
  const slug = offerSlug ?? offer?.slug ?? campaignSlug();
  const msg = message ?? offer?.waMessage ?? campaignMessage() ?? DEFAULT_MSG;
  return (
    <a
      href={whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = waUrl(withAudience(msg, slug), slug);
        trackLead("whatsapp", slug);
      }}
    >
      {children}
    </a>
  );
}

/**
 * Floating WhatsApp button, fixed bottom-right on every page.
 * WhatsApp green for instant recognition; a white ring keeps it visible on black bands.
 */
export function WhatsAppFab() {
  return (
    <WhatsAppLink
      ariaLabel={`Chat with VGIS on WhatsApp, ${whatsapp.display}`}
      className="fixed z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_6px_20px_rgb(0_0_0/0.28)] ring-2 ring-white transition-transform hover:scale-105 focus-visible:outline-offset-4 sm:px-5 [bottom:max(16px,env(safe-area-inset-bottom,0px))] [right:max(16px,env(safe-area-inset-right,0px))]"
    >
      <WhatsAppIcon size={28} />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </WhatsAppLink>
  );
}

"use client";

import { useActionState, useEffect, useState } from "react";
import { sendEnquiry, type ContactState } from "@/lib/contact-action";
import { services } from "@/content/services";
import { getAttribution, trackLead } from "@/lib/attribution";

const field = "mt-2 w-full border border-line bg-paper px-4 py-3 text-base outline-none focus:border-ink";
const label = "text-sm font-semibold";

/**
 * Enquiry form. On offer pages pass `offer` (slug) and `defaultService` so the lead is labelled;
 * ad attribution is attached automatically.
 */
export function ContactForm({ offer, defaultService = "", submitLabel = "Send brief →" }: { offer?: string; defaultService?: string; submitLabel?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });
  const [attribution, setAttribution] = useState("{}");
  useEffect(() => setAttribution(JSON.stringify(getAttribution())), []);
  useEffect(() => {
    if (state.status === "ok") trackLead("form", offer);
  }, [state.status, offer]);

  if (state.status === "ok") {
    return (
      <div className="border-l-4 border-orange bg-panel p-8" role="status">
        <h2 className="text-4xl">Brief received.</h2>
        <p className="mt-3 text-muted">{state.message ?? "Thank you. We will reply shortly."}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2" noValidate={false}>
      <label className="block">
        <span className={label}>Name *</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Email *</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className={label}>Company or project</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Service</span>
        <select name="service" className={field} defaultValue={defaultService}>
          <option value="">Select a service</option>
          {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Your brief *</span>
        <textarea name="message" required rows={6} className={field} placeholder="Tell us about the project, location, timeline and what you need delivered." />
      </label>
      <input type="hidden" name="offer" value={offer ?? ""} />
      <input type="hidden" name="attribution" value={attribution} />
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
          {pending ? "Sending…" : submitLabel}
        </button>
        {state.status === "error" && <p role="alert" className="text-sm font-medium text-orange-ink">{state.message}</p>}
      </div>
    </form>
  );
}

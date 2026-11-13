"use client";

import { useEffect, useState } from "react";
import { getAttribution, setAudience } from "@/lib/attribution";
import type { Audience } from "@/content/campaigns";
import type { Reason } from "@/content/knowledge/80-reasons";

/**
 * "I am a…" buttons. The choice is stored with the UTM fields, so it travels into the WhatsApp
 * message ("I'm a developer.") and the form email, and it tailors the reasons shown below.
 */
export function AudiencePicker({ audiences, tone = "dark" }: { audiences: Audience[]; tone?: "dark" | "light" }) {
  const [active, setActive] = useState<string | undefined>();
  useEffect(() => {
    setActive(getAttribution().audience);
    const on = (e: Event) => setActive((e as CustomEvent<string>).detail);
    window.addEventListener("vgis:audience", on);
    return () => window.removeEventListener("vgis:audience", on);
  }, []);
  const base = tone === "dark" ? "border-white/40 text-paper hover:border-paper" : "border-line hover:border-ink";
  const on = tone === "dark" ? "border-orange bg-orange text-ink" : "border-ink bg-ink text-paper";
  return (
    <div role="group" aria-label="I am a…" className="flex flex-wrap gap-2">
      {audiences.map((a) => (
        <button
          key={a.id}
          type="button"
          aria-pressed={active === a.id}
          onClick={() => setAudience(a.id)}
          className={`border px-4 py-2 text-sm font-semibold transition-colors ${active === a.id ? on : base}`}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

/** Three reasons tailored to the chosen audience (defaults to the first). */
export function AudienceReasons({ audiences, reasonsById }: { audiences: Audience[]; reasonsById: Record<number, Reason> }) {
  const [active, setActive] = useState(audiences[0].id);
  useEffect(() => {
    const a = getAttribution().audience;
    if (a) setActive(a);
    const on = (e: Event) => setActive((e as CustomEvent<string>).detail);
    window.addEventListener("vgis:audience", on);
    return () => window.removeEventListener("vgis:audience", on);
  }, []);
  const aud = audiences.find((a) => a.id === active) ?? audiences[0];
  return (
    <div>
      <AudiencePicker audiences={audiences} tone="light" />
      <ol className="mt-8 grid border-l border-t border-line md:grid-cols-3" aria-live="polite">
        {aud.reasons.map((n) => (
          <li key={n} className="border-b border-r border-line p-6">
            <span className="font-display text-4xl text-orange-ink">{String(n).padStart(2, "0")}</span>
            <h3 className="mt-3 text-3xl">{reasonsById[n].title}</h3>
            <p className="mt-2 text-muted">{reasonsById[n].body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

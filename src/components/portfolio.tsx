"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AI_LABEL, categories, type PortfolioCategory, type PortfolioItem } from "@/content/portfolio";

/** "Sample" marker shown on every placeholder, so samples are never mistaken for client work. */
export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper ${className}`}>
      Sample
    </span>
  );
}

function PlayIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-ink shadow-lg transition-transform group-hover:scale-110" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
    </span>
  );
}

/**
 * One portfolio tile in the standard VGIS frame.
 * - video: poster image, muted looping preview (if an MP4 is set), click-to-load YouTube/Vimeo embed.
 * - AI-assisted: labelled inside the frame; the frame and type stay VGIS.
 */
export function PortfolioTile({ item, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", priority = false }: { item: PortfolioItem; sizes?: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const v = item.video;
  const playable = !!(v?.youtubeId || v?.vimeoId || v?.mp4);
  const embed = v?.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`
    : v?.vimeoId
      ? `https://player.vimeo.com/video/${v.vimeoId}?autoplay=1`
      : undefined;

  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;
    if (hover) el.play().catch(() => {});
    else el.pause();
  }, [hover]);

  return (
    <figure className="group border border-line bg-paper">
      <div
        className={`relative overflow-hidden bg-ink ${v?.vertical ? "aspect-[9/16]" : "aspect-[4/3]"}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {playing && v?.mp4 && !embed ? (
          <video src={v.mp4} poster={item.image.src} controls autoPlay playsInline className="absolute inset-0 h-full w-full bg-ink object-contain" />
        ) : playing && embed ? (
          <iframe
            src={embed}
            title={item.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {item.ground ? (
              <div className="absolute inset-0 p-[12%]" style={{ background: item.ground }}>
                <div className="relative h-full w-full">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={sizes}
                    priority={priority}
                    unoptimized={item.image.src.endsWith(".svg")}
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            ) : (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            {v?.previewMp4 && (
              <video
                ref={vidRef}
                src={v.previewMp4}
                muted
                loop
                playsInline
                preload="none"
                poster={item.image.src}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity ${hover ? "opacity-100" : "opacity-0"}`}
              />
            )}
            {v && (
              <button
                type="button"
                onClick={() => playable && setPlaying(true)}
                disabled={!playable}
                aria-label={playable ? `Play ${item.title}` : `${item.title}: video coming soon`}
                className="absolute inset-0 flex items-center justify-center disabled:cursor-default"
              >
                <PlayIcon />
              </button>
            )}
            {item.href && !v && <Link href={item.href} className="absolute inset-0" aria-label={`View ${item.title}`} />}
            {item.placeholder && <SampleBadge className="absolute left-3 top-3" />}
            {v && !playable && (
              <span className="absolute bottom-3 right-3 bg-paper/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">Video placeholder</span>
            )}
          </>
        )}
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 px-4 py-3">
        {item.href ? (
          <Link href={item.href} className="font-display text-2xl leading-none hover:link-underline">{item.title}</Link>
        ) : (
          <span className="font-display text-2xl leading-none">{item.title}</span>
        )}
        <span className="shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted">
          {categories.find((c) => c.id === item.category)?.label}
        </span>
      </figcaption>
      {item.aiAssisted && (
        <p className="border-t border-line bg-panel px-4 py-2 text-xs font-medium text-ink">{AI_LABEL}</p>
      )}
    </figure>
  );
}

/** Filterable grid. Filter state lives in ?filter= so posts and ads can deep-link (e.g. /work?filter=xr). */
export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all");

  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("filter");
    if (f && categories.some((c) => c.id === f)) setFilter(f as PortfolioCategory);
  }, []);

  const choose = (f: PortfolioCategory | "all") => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", f);
    window.history.replaceState(null, "", url);
  };

  const opts: { id: PortfolioCategory | "all"; label: string }[] = [{ id: "all", label: "All" }, ...categories.filter((c) => items.some((i) => i.category === c.id))];
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter work" className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => choose(o.id)}
            aria-pressed={filter === o.id}
            className={`border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === o.id ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
            }`}
          >
            {o.label}
            <span className="ml-2 text-xs font-normal opacity-70">
              {o.id === "all" ? items.length : items.filter((i) => i.category === o.id).length}
            </span>
          </button>
        ))}
      </div>
      {filter === "ai" && (
        <p className="mt-4 max-w-2xl text-sm text-muted">
          AI-assisted pieces are concepts and campaign content, {AI_LABEL.toLowerCase()}. They are not 3D renders or built projects.
        </p>
      )}
      <div className="mt-8 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => <PortfolioTile key={item.id} item={item} />)}
      </div>
    </div>
  );
}

/** Home teaser grid: no filters, links to /work. */
export function FeaturedGrid({ items, mobileLimit = 4 }: { items: PortfolioItem[]; mobileLimit?: number }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div key={item.id} className={i >= mobileLimit ? "hidden sm:block" : undefined}>
            <PortfolioTile item={item} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
          </div>
        ))}
      </div>
      <Link href="/work" className="mt-8 inline-block font-semibold link-underline">See all work →</Link>
    </>
  );
}

/** Drawing → 3D model → render comparison. Placeholder images until real project passes are supplied. */
export function BeforeAfterSlider({
  stages,
  width,
  height,
  placeholder,
}: {
  stages: { label: string; src: string }[];
  width: number;
  height: number;
  placeholder?: boolean;
}) {
  const [t, setT] = useState(100);
  const segs = stages.length - 1;
  const opacity = (i: number) => (i === 0 ? 1 : Math.min(1, Math.max(0, (t / 100) * segs - (i - 1))));
  const active = Math.min(segs, Math.round((t / 100) * segs));

  return (
    <figure>
      <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: `${width} / ${height}` }}>
        {stages.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={`${s.label} stage`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            style={{ opacity: opacity(i) }}
          />
        ))}
        <span className="absolute bottom-3 left-3 bg-ink px-3 py-1.5 font-display text-xl tracking-wide text-paper">{stages[active].label}</span>
        {placeholder && <SampleBadge className="absolute left-3 top-3" />}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        aria-label="Slide from drawing to 3D model to final render"
        className="mt-4 w-full accent-[#FF6600]"
      />
      <div className="mt-2 flex justify-between gap-2">
        {stages.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setT((i / segs) * 100)}
            aria-pressed={active === i}
            className={`text-sm font-semibold ${active === i ? "link-underline" : "opacity-60 hover:opacity-100"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </figure>
  );
}

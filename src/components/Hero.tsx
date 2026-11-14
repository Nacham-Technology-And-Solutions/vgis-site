import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/portfolio";
import { SampleBadge } from "./portfolio";

/**
 * Full-bleed hero: a render (or a muted looping reel when `hero.reelMp4` is set) behind the headline.
 * The image is `priority` so it is the LCP element and loads first.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {hero.reelMp4 && (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={hero.reelMp4}
          poster={hero.image.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
      {/* Legibility: dark gradient from the text side, plus drafting grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/20" aria-hidden="true" />
      <div className="plan-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="wrap flex min-h-[78svh] flex-col justify-end pb-14 pt-24 sm:min-h-[86svh] sm:pb-20">
        <p className="eyebrow">Design · 3D visualisation · XR · Campaigns · Abuja</p>
        <h1 className="mt-5 max-w-5xl text-[60px] sm:text-[104px] lg:text-[128px]">
          Bridging the gap between <span className="text-orange">imagination</span> and reality.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          Concept, design and working drawings, then photorealistic 3D renders, walkthrough films and interactive AR/VR, plus
          the brand and campaigns that sell them.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">Start a project →</Link>
          <Link href="/work" className="btn btn-ghost"><span>See the work</span></Link>
        </div>
      </div>
      {hero.placeholder && <SampleBadge className="absolute bottom-4 right-4 hidden sm:block" />}
    </section>
  );
}

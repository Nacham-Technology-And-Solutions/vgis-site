import Image from "next/image";

/** Official VGIS logo, black and white only, with the subtle on-screen drop shadow the guidelines require. */
export function Logo({ height = 56, priority = false, className = "" }: { height?: number; priority?: boolean; className?: string }) {
  const width = Math.round((height * 490) / 640);
  return (
    <Image
      src="/brand/vgis-logo.png"
      alt="VGIS® logo"
      width={width}
      height={height}
      priority={priority}
      className={`logo-shadow ${className}`}
    />
  );
}

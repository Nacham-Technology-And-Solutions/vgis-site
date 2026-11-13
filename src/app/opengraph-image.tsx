import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "VGIS®: Bridging the gap between imagination and reality";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function bebas() {
  // ImageResponse needs TTF/OTF; Google serves TTF to non-browser user agents.
  const css = await (await fetch("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap")).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  return url ? (await fetch(url)).arrayBuffer() : undefined;
}

export default async function OgImage() {
  const [font, logo] = await Promise.all([
    bebas().catch(() => undefined),
    readFile(join(process.cwd(), "public/brand/vgis-logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#fff", padding: 72, fontFamily: "Bebas" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#FF6600" }}>3D VISUALISATION · XR · BRANDING</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: 0.95 }}>
            <span>Bridging the gap between</span>
            <span><span style={{ color: "#FF6600" }}>imagination</span>&nbsp;and reality.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#B5B5B5", letterSpacing: 2 }}>VISUAL GRAPHICS ILLUSTRATION SERVICES LTD · ABUJA</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 48 }}>
          <div style={{ display: "flex", background: "#fff", padding: 24 }}>
            <img src={logoSrc} width={245} height={320} alt="" />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Bebas", data: font, style: "normal", weight: 400 }] : [] },
  );
}

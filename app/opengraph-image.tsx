import { ImageResponse } from "next/og";
import { BRAND, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/**
 * The layout advertised Open Graph and Twitter cards but shipped no image, so
 * every share rendered as a bare text link. This generates a real 1200×630
 * card at build time, in the site's own palette.
 */
export const alt = "Aestora — Your cloud, beautifully simple.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BRAND.mint,
          backgroundImage: `radial-gradient(900px circle at 85% -10%, rgba(232,106,16,0.28), transparent 60%), radial-gradient(700px circle at 5% 110%, rgba(42,90,42,0.22), transparent 60%)`,
          color: BRAND.forest,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: BRAND.forest,
              color: BRAND.mint,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            Your cloud, beautifully simple.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#46603f",
              maxWidth: 860,
              lineHeight: 1.35,
            }}
          >
            {SITE_DESCRIPTION.replace("Aestora — Your cloud, beautifully simple. ", "")}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              borderRadius: 999,
              background: BRAND.pumpkin,
              color: "#fff",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            1 GB free — no credit card
          </div>
          <div style={{ fontSize: 26, color: "#74906f" }}>cloud.aestora.cc</div>
        </div>
      </div>
    ),
    size
  );
}

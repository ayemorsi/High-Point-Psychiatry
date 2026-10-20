import { ImageResponse } from "next/og"

import { site } from "@/lib/site"

export const alt = `${site.name}. ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// The share card: the practice name on the brand's ivory, so links never show a stock photo.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#f4f1ea",
        color: "#1c1a17",
      }}
    >
      <div style={{ fontSize: 88, letterSpacing: -2, lineHeight: 1.05 }}>
        {site.name}
      </div>
      <div style={{ marginTop: 28, fontSize: 40, color: "#6b655c" }}>
        {site.tagline}
      </div>
    </div>,
    size
  )
}

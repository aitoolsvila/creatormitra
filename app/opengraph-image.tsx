export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const alt = "Creator Mitra — Find your people.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f7f6f2",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        color: "#24232b",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 32,
          color: "#6652d6",
          fontWeight: 700,
        }}
      >
        creatormitra.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 80,
          fontWeight: 700,
          marginTop: 70,
          lineHeight: 1.1,
        }}
      >
        Find the right creators.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 80,
          color: "#6652d6",
          fontWeight: 700,
        }}
      >
        Create something great.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          marginTop: 40,
          color: "#727079",
        }}
      >
        Your Mitra in the Creator Economy.
      </div>
    </div>,
    size,
  );
}

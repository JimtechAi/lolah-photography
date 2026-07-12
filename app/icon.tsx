import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050403",
          color: "#f0cf84",
          fontSize: 36,
          fontFamily: "Georgia, serif",
          letterSpacing: "0.08em",
          position: "relative",
          border: "2px solid rgba(240, 207, 132, 0.28)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 6,
            border: "1px solid rgba(240, 207, 132, 0.15)",
            borderRadius: 14,
          }}
        />
        <span style={{ transform: "translateY(-1px)" }}>LP</span>
      </div>
    ),
    size
  );
}
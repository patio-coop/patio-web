import { ImageResponse } from "next/og";

export const socialImageAlt =
  "Patio — a global network of tech cooperatives";

export const socialImageSize = {
  width: 1200,
  height: 630
};

export const socialImageContentType = "image/png";

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#00103b",
          color: "#f7f7f7",
          display: "flex",
          height: "100%",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            borderRight: "2px dashed rgba(247, 247, 247, 0.35)",
            display: "flex",
            flex: "0 0 31%",
            position: "relative"
          }}
        >
          <div
            style={{
              background: "#35ff38",
              height: 18,
              left: 0,
              position: "absolute",
              right: 0,
              top: 94
            }}
          />
          <div
            style={{
              background: "#96d8fd",
              bottom: 0,
              display: "flex",
              height: 146,
              left: 0,
              position: "absolute",
              right: 0
            }}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              fontFamily: "monospace",
              fontSize: 76,
              fontWeight: 700,
              height: 130,
              justifyContent: "center",
              letterSpacing: -7,
              position: "absolute",
              top: 165,
              width: "100%"
            }}
          >
            PATIO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "68px 72px"
          }}
        >
          <div
            style={{
              color: "rgba(247, 247, 247, 0.55)",
              display: "flex",
              fontFamily: "monospace",
              fontSize: 22,
              marginBottom: 32,
              textTransform: "uppercase"
            }}
          >
            ID:12024 · PATIO.COOP
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.02,
              textTransform: "uppercase"
            }}
          >
            A global network of tech cooperatives
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 23,
              lineHeight: 1.4,
              marginTop: 34,
              maxWidth: 650
            }}
          >
            Cooperatives working together to build technology for a more
            democratic economy.
          </div>
        </div>

        <div
          style={{
            borderTop: "2px dashed rgba(247, 247, 247, 0.35)",
            bottom: 70,
            left: 0,
            position: "absolute",
            right: 0
          }}
        />
      </div>
    ),
    socialImageSize
  );
}
